#!/usr/bin/env node
// Validate the repository's Claude and Codex plugin packaging without dependencies.

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function readJson(relativePath) {
  const filePath = path.join(root, relativePath);
  const content = fs.readFileSync(filePath, 'utf8');
  assert.doesNotMatch(content, /\[TODO:/, `${relativePath} contains a TODO placeholder`);
  return JSON.parse(content);
}

function baseVersion(version) {
  return version.split('+')[0];
}

function commandHook(config, eventName) {
  const events = config.hooks[eventName];
  assert.ok(Array.isArray(events) && events.length === 1, `${eventName} must have one event entry`);
  const hooks = events[0].hooks;
  assert.ok(Array.isArray(hooks) && hooks.length === 1, `${eventName} must have one command hook`);
  return hooks[0];
}

const claude = readJson('.claude-plugin/plugin.json');
const codex = readJson('.codex-plugin/plugin.json');
const marketplace = readJson('.claude-plugin/marketplace.json');
const codexHooks = readJson('hooks/hooks.json');

assert.strictEqual(claude.name, 'clp');
assert.strictEqual(codex.name, claude.name, 'Claude and Codex plugin names must match');
assert.strictEqual(marketplace.plugins.length, 1, 'marketplace must contain one plugin');
assert.strictEqual(marketplace.plugins[0].name, claude.name, 'marketplace plugin name must match manifests');
assert.strictEqual(marketplace.plugins[0].source, './', 'marketplace source must resolve to the repository root');

const semver = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
assert.match(claude.version, semver, 'Claude version must use semantic versioning');
assert.match(codex.version, semver, 'Codex version must use semantic versioning');
assert.strictEqual(baseVersion(codex.version), baseVersion(claude.version), 'manifest base versions must match');
assert.match(codex.version, /\+codex\./, 'Codex version must include one cachebuster suffix');

assert.strictEqual(claude.license, 'Apache-2.0');
assert.strictEqual(codex.license, claude.license);
assert.ok(fs.existsSync(path.join(root, 'LICENSE')), 'LICENSE is missing');
assert.ok(fs.existsSync(path.join(root, 'NOTICE')), 'NOTICE is missing');
assert.match(fs.readFileSync(path.join(root, 'LICENSE'), 'utf8'), /Apache License\s+Version 2\.0/);

for (const relativePath of [
  'CLP.txt',
  'hooks/clp-context.js',
  'hooks/clp-context-codex.js',
  'hooks/hooks.json'
]) {
  assert.ok(fs.existsSync(path.join(root, relativePath)), `${relativePath} is missing`);
}

for (const eventName of ['SessionStart', 'UserPromptSubmit']) {
  const claudeHook = commandHook(claude, eventName);
  assert.strictEqual(claudeHook.type, 'command');
  assert.match(claudeHook.command, /hooks\/clp-context\.js/);

  const codexHook = commandHook(codexHooks, eventName);
  assert.strictEqual(codexHook.type, 'command');
  assert.match(codexHook.command, /hooks\/clp-context-codex\.js/);
  assert.match(codexHook.commandWindows, /hooks\/clp-context-codex\.js/);
}

assert.ok(codex.interface, 'Codex interface metadata is missing');
assert.strictEqual(codex.interface.displayName, 'Composable Language Protocols');
assert.ok(Array.isArray(codex.interface.defaultPrompt));
assert.ok(codex.interface.defaultPrompt.length > 0 && codex.interface.defaultPrompt.length <= 3);
for (const prompt of codex.interface.defaultPrompt) {
  assert.ok(prompt.length <= 128, 'Codex default prompts must not exceed 128 characters');
}

console.log('PASS. Claude and Codex manifests, hooks, versions, and license files are consistent.');
