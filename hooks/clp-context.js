#!/usr/bin/env node
// clp - shared lifecycle hook for Claude Code and Codex.
//
// SessionStart injects an operational form of CLP.txt. It omits the worked
// examples but keeps the priority, selection map, protocol rules,
// compatibility declarations, composition guidance, and final check.
// UserPromptSubmit keeps the global rules close to every prompt and adds the
// full rules for any protocols the user names explicitly.
//
// CLP.txt stays the single source of truth. Hooks must always exit 0.

const fs = require('fs');
const path = require('path');
const os = require('os');

const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT || path.join(__dirname, '..');
const specPath = path.join(pluginRoot, 'CLP.txt');

const claudeDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
const offFlag = path.join(claudeDir, '.clp-inactive');

// Claude Code passes at most 10,000 characters of one additionalContext value
// directly. Keep a small margin so the operational specification never turns
// back into a file pointer.
const MAX_OPERATIONAL_CONTEXT_CHARS = 9500;

function readSpec() {
  return fs.readFileSync(specPath, 'utf8');
}

function parseSections(spec) {
  const headingPattern = /^={5,}\r?\n(\d+)\. ([A-Z ]+)\r?\n={5,}\r?\n/gm;
  const headings = [...spec.matchAll(headingPattern)];

  return headings.map((heading, index) => {
    const start = heading.index + heading[0].length;
    const end = index + 1 < headings.length ? headings[index + 1].index : spec.length;
    return {
      number: Number(heading[1]),
      name: heading[2],
      title: `${heading[1]}. ${heading[2]}`,
      body: spec.slice(start, end).trim()
    };
  });
}

function stripExamples(section) {
  if (section.number < 4 || section.number > 12) return section.body;
  return section.body.split(/\r?\nBEFORE:\r?\n/)[0].trim();
}

function operationalBody(section) {
  if (section.number >= 4 && section.number <= 12) {
    return stripExamples(section);
  }
  if (section.number === 13) {
    // Section 13 restates protocol ownership in several composition examples.
    // Keep its rules and conflict guidance, but remove those repeated summaries.
    return section.body.replace(
      /Example:\s*\r?\n+[A-Z +]+\s*\r?\n+(?:(?:[A-Z]+ controls[^\r\n]*\r?\n+)+)/g,
      ''
    ).trim();
  }
  return section.body;
}

function readGlobalRules(sections) {
  const section = sections.find(item => item.number === 2);
  if (!section) return [];
  return section.body
    .split(/\r?\n/)
    .filter(line => /^\*\s+/.test(line))
    .map(line => line.trim());
}

function buildOperationalContext(sections) {
  const operational = sections
    .map(section => `${section.title}\n${operationalBody(section)}`)
    .join('\n\n');

  const context =
    'CLP OPERATIONAL SPECIFICATION. Derived from CLP.txt at run time. ' +
    'BEFORE and AFTER examples are omitted. Apply these rules to prose, not ' +
    'source code unless the user asks.\n\n' + operational;

  if (context.length > MAX_OPERATIONAL_CONTEXT_CHARS) {
    throw new Error(
      `operational context is ${context.length} characters; limit is ` +
      MAX_OPERATIONAL_CONTEXT_CHARS
    );
  }
  return context;
}

function selectedProtocolRules(sections, names) {
  const wanted = new Set(names);
  return sections
    .filter(section => section.number >= 4 && section.number <= 12)
    .filter(section => wanted.has(section.name))
    .map(section => `${section.title}\n${stripExamples(section)}`)
    .join('\n\n');
}

function emitContext(eventName, context) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: eventName,
      additionalContext: context
    }
  }));
}

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
// Abnormal stdin close would otherwise throw and exit non-zero.
process.stdin.on('error', () => process.exit(0));
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const eventName = data.hook_event_name || 'UserPromptSubmit';
    const spec = readSpec();
    const sections = parseSections(spec);

    if (eventName === 'SessionStart') {
      if (fs.existsSync(offFlag)) return;
      emitContext(eventName, buildOperationalContext(sections));
      return;
    }

    if (eventName !== 'UserPromptSubmit') return;

    const prompt = (data.prompt || '').trim().replace(/\s+/g, ' ');

    // Only standalone documented commands change toggle state. Matching
    // natural-language phrases would misread negation, quotations, and prose
    // that discusses the commands.
    const toggle = prompt.match(/^\/?clp\s+(on|off)$/i);
    const wantsOff = toggle && toggle[1].toLowerCase() === 'off';
    const wantsOn = toggle && toggle[1].toLowerCase() === 'on';

    if (wantsOff) {
      try { fs.writeFileSync(offFlag, '1'); } catch (e) {}
      return;
    }
    if (wantsOn) {
      try { fs.unlinkSync(offFlag); } catch (e) {}
    }
    if (fs.existsSync(offFlag)) return;

    // Re-enabling CLP mid-session must restore the operational specification
    // even when SessionStart ran while CLP was disabled.
    if (wantsOn) {
      emitContext(eventName, buildOperationalContext(sections));
      return;
    }

    const rules = readGlobalRules(sections);
    if (rules.length === 0) return;

    // If the user names protocols, those win over automatic selection.
    // Match uppercase protocol names joined by "+" so the capture stops at
    // the end of the list. "CLP AUTO" and "CLP: AUTO" request automatic
    // selection, not a named set.
    const match = prompt.match(/\bCLP\s*:\s*([A-Z]+(?:\s*\+\s*[A-Z]+)*)/);
    const named = match && match[1].trim() !== 'AUTO' ? match[1].trim() : null;
    const namedProtocols = named ? named.split('+').map(item => item.trim()) : [];

    let context =
      'CLP ACTIVE. Composable Language Protocols govern prose you write, ' +
      'rewrite, edit, summarize, or review, including your replies in this ' +
      'conversation. They do not govern source code unless the user asks.\n\n' +
      'Global rules from CLP.txt section 2. These apply to all prose output ' +
      'unless the user explicitly overrides them:\n' +
      rules.join('\n') + '\n\n';

    if (named) {
      context += 'The user named protocols: ' + named + '. Use exactly those.\n\n';
      const selected = selectedProtocolRules(sections, namedProtocols);
      if (selected) {
        context += 'Selected protocol rules from CLP.txt:\n\n' + selected + '\n\n';
      }
    } else {
      context +=
        'No protocol named. Select the smallest sufficient set using the ' +
        'operational selection map loaded at session start.\n';
    }

    context +=
      'The operational specification is restored after context compaction. ' +
      'Run the section 14 final check before you return prose. Do not describe ' +
      'that check unless the user asks. If the operational context is missing, ' +
      'read ' + specPath + '.';

    emitContext(eventName, context);
  } catch (e) {
    // Silent fail. Never block a prompt over style enforcement.
  }
});
