#!/usr/bin/env node
// clp - UserPromptSubmit hook.
//
// Injects the CLP global rules into every turn. The rules are read from
// CLP.txt at run time, so the hook never drifts from the specification.
// CLP.txt stays the single source of truth.
//
// Hooks must always exit 0. Any failure here is silent.

const fs = require('fs');
const path = require('path');
const os = require('os');

const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT || path.join(__dirname, '..');
const specPath = path.join(pluginRoot, 'CLP.txt');

const claudeDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
const offFlag = path.join(claudeDir, '.clp-inactive');

// Read the global rules block from section 2 of CLP.txt. Collect the bullet
// lines and stop at the separator that opens section 3.
function readGlobalRules() {
  const lines = fs.readFileSync(specPath, 'utf8').split(/\r?\n/);
  const start = lines.findIndex(l => /^2\.\s+GLOBAL RULES\s*$/.test(l));
  if (start === -1) return [];
  const rules = [];
  for (let i = start + 1; i < lines.length; i++) {
    if (/^=+$/.test(lines[i]) && rules.length > 0) break;
    if (/^\*\s+/.test(lines[i])) rules.push(lines[i].trim());
  }
  return rules;
}

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
// Abnormal stdin close would otherwise throw and exit non-zero.
process.stdin.on('error', () => process.exit(0));
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const prompt = (data.prompt || '').trim().replace(/\s+/g, ' ');

    // Explicit toggles only. "CLP: TECHNICAL" and "CLP AUTO" are invocations,
    // not toggles, and must not match here.
    const wantsOff =
      /^\/?clp (off|stop|disable)\b/i.test(prompt) ||
      /\b(stop|disable|turn off) clp\b/i.test(prompt);
    const wantsOn =
      /^\/?clp (on|start|enable)\b/i.test(prompt) ||
      /\b(enable|turn on|start) clp\b/i.test(prompt);

    if (wantsOff) {
      try { fs.writeFileSync(offFlag, '1'); } catch (e) {}
      return;
    }
    if (wantsOn) {
      try { fs.unlinkSync(offFlag); } catch (e) {}
    }
    if (fs.existsSync(offFlag)) return;

    const rules = readGlobalRules();
    if (rules.length === 0) return;

    // If the user names protocols, those win over automatic selection.
    // Match uppercase protocol names joined by "+" so the capture stops at
    // the end of the list and does not run on into the prose that follows.
    // "CLP AUTO" and "CLP: AUTO" request automatic selection, not a set.
    const match = prompt.match(/\bCLP\s*:\s*([A-Z]+(?:\s*\+\s*[A-Z]+)*)/);
    const named = match && match[1].trim() !== 'AUTO' ? match[1].trim() : null;

    let context =
      'CLP ACTIVE. Composable Language Protocols govern prose you write, ' +
      'rewrite, edit, summarize, or review, including your replies in this ' +
      'conversation. They do not govern source code unless the user asks.\n\n' +
      'Global rules from CLP.txt section 2. These apply to all prose output ' +
      'unless the user explicitly overrides them:\n' +
      rules.join('\n') + '\n\n';

    if (named) {
      context +=
        'The user named protocols: ' + named + '. Use exactly those.\n';
    } else {
      context +=
        'No protocol named. Select the smallest sufficient set using the ' +
        'automatic selection map in CLP.txt section 3.\n';
    }

    context +=
      'Read ' + specPath + ' for the selection map, the rules of each ' +
      'selected protocol, and the composition rules in section 13. ' +
      'Run the section 14 final check before you return prose, and do not ' +
      'describe that check unless the user asks.';

    process.stdout.write(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'UserPromptSubmit',
        additionalContext: context
      }
    }));
  } catch (e) {
    // Silent fail. Never block a prompt over style enforcement.
  }
});
