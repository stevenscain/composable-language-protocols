#!/usr/bin/env node
// Behavioral checks for the shared CLP lifecycle hook. No dependencies.

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const hook = path.join(root, 'hooks', 'clp-context.js');
const codexHook = path.join(root, 'hooks', 'clp-context-codex.js');
const stateDir = fs.mkdtempSync(path.join(os.tmpdir(), 'clp-hook-check-'));
const codexStateDir = fs.mkdtempSync(path.join(os.tmpdir(), 'clp-codex-hook-check-'));
const offFlag = path.join(stateDir, '.clp-inactive');
const codexOffFlag = path.join(codexStateDir, '.clp-inactive');

function invokeScript(script, input, env) {
  const result = spawnSync(process.execPath, [script], {
    input,
    encoding: 'utf8',
    env: {
      ...process.env,
      ...env
    }
  });

  assert.strictEqual(result.status, 0, `hook exited ${result.status}: ${result.stderr}`);
  return result.stdout;
}

function invokeRaw(input) {
  return invokeScript(hook, input, {
    CLAUDE_PLUGIN_ROOT: root,
    CLAUDE_CONFIG_DIR: stateDir
  });
}

function invokeCodex(payload) {
  return invokeScript(codexHook, JSON.stringify(payload), {
    PLUGIN_ROOT: root,
    PLUGIN_DATA: codexStateDir
  });
}

function invoke(payload) {
  return invokeRaw(JSON.stringify(payload));
}

function readOutput(output, eventName) {
  assert.ok(output, `${eventName} should inject context`);
  const parsed = JSON.parse(output);
  const hookOutput = parsed.hookSpecificOutput;
  assert.strictEqual(hookOutput.hookEventName, eventName);
  assert.ok(hookOutput.additionalContext);
  return hookOutput.additionalContext;
}

function submit(prompt) {
  return invoke({ hook_event_name: 'UserPromptSubmit', prompt });
}

try {
  const startup = readOutput(
    invoke({ hook_event_name: 'SessionStart', source: 'startup' }),
    'SessionStart'
  );
  assert.ok(startup.length < 9500, 'operational context must stay below its direct-injection limit');
  assert.match(startup, /1\. PRIORITY/);
  assert.match(startup, /3\. PROTOCOL SELECTION/);
  assert.match(startup, /14\. FINAL CHECK/);
  assert.doesNotMatch(startup, /\r?\nBEFORE:\r?\n/);
  assert.doesNotMatch(startup, /\r/);
  assert.doesNotMatch(startup, /\bExample:/);
  assert.match(startup, /TECHNICAL and EXECUTIVE appear to conflict/);
  assert.match(startup, /REPORTING and RESEARCH are not combined automatically/);

  const compact = readOutput(
    invoke({ hook_event_name: 'SessionStart', source: 'compact' }),
    'SessionStart'
  );
  assert.strictEqual(compact, startup, 'compaction should restore the operational context');

  const automatic = readOutput(submit('Review this prose.'), 'UserPromptSubmit');
  assert.match(automatic, /Global rules from CLP\.txt section 2/);
  assert.match(automatic, /operational selection map loaded at session start/);

  const named = readOutput(
    submit('CLP: TECHNICAL + RESEARCH\n\nReview these findings.'),
    'UserPromptSubmit'
  );
  assert.match(named, /6\. TECHNICAL/);
  assert.match(named, /9\. RESEARCH/);
  assert.doesNotMatch(named, /10\. FICTION/);

  assert.ok(submit('Do not disable CLP.'), 'negation must not disable CLP');
  assert.ok(!fs.existsSync(offFlag), 'negation created the off flag');

  assert.ok(submit('The command is "clp off".'), 'quoted command must not disable CLP');
  assert.ok(!fs.existsSync(offFlag), 'quoted command created the off flag');

  assert.strictEqual(submit('clp off'), '', 'off command should not inject context');
  assert.ok(fs.existsSync(offFlag), 'off command did not create the off flag');
  assert.strictEqual(submit('Review this prose.'), '', 'disabled prompt hook injected context');
  assert.strictEqual(
    invoke({ hook_event_name: 'SessionStart', source: 'compact' }),
    '',
    'disabled session hook injected context'
  );

  const resumed = readOutput(submit('clp on'), 'UserPromptSubmit');
  assert.match(resumed, /1\. PRIORITY/);
  assert.match(resumed, /14\. FINAL CHECK/);
  assert.ok(!fs.existsSync(offFlag), 'on command did not remove the off flag');

  assert.strictEqual(submit('/CLP OFF'), '', 'slash command should disable CLP');
  assert.ok(fs.existsSync(offFlag), 'slash off command did not create the off flag');
  assert.ok(submit('/CLP ON'), 'slash command should enable CLP');
  assert.ok(!fs.existsSync(offFlag), 'slash on command did not remove the off flag');

  const codexStartup = readOutput(
    invokeCodex({ hook_event_name: 'SessionStart', source: 'startup' }),
    'SessionStart'
  );
  assert.match(codexStartup, /1\. PRIORITY/);

  assert.strictEqual(
    invokeCodex({ hook_event_name: 'UserPromptSubmit', prompt: 'clp off' }),
    '',
    'Codex off command should not inject context'
  );
  assert.ok(fs.existsSync(codexOffFlag), 'Codex off command did not create its flag');
  assert.ok(!fs.existsSync(offFlag), 'Codex off command changed Claude state');
  assert.ok(submit('Review this prose.'), 'Codex off command disabled the Claude hook');
  assert.strictEqual(
    invokeCodex({ hook_event_name: 'UserPromptSubmit', prompt: 'Review this prose.' }),
    '',
    'disabled Codex hook injected context'
  );

  const codexResumed = readOutput(
    invokeCodex({ hook_event_name: 'UserPromptSubmit', prompt: 'clp on' }),
    'UserPromptSubmit'
  );
  assert.match(codexResumed, /14\. FINAL CHECK/);
  assert.ok(!fs.existsSync(codexOffFlag), 'Codex on command did not remove its flag');

  assert.strictEqual(invokeRaw('{'), '', 'malformed input should fail silently');

  console.log('PASS. CLP lifecycle, scoped context, toggles, and silent failure behave as specified.');
} finally {
  fs.rmSync(stateDir, { recursive: true, force: true });
  fs.rmSync(codexStateDir, { recursive: true, force: true });
}
