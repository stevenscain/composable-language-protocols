#!/usr/bin/env node
// Codex adapter for the shared CLP lifecycle hook.
//
// Codex supplies PLUGIN_ROOT and PLUGIN_DATA. Map those values to the
// compatibility variables used by clp-context.js, then run the shared hook.
// Keeping PLUGIN_DATA separate prevents a Codex toggle from changing Claude's
// CLP toggle state.

const path = require('path');
const os = require('os');

const pluginRoot = process.env.PLUGIN_ROOT || path.join(__dirname, '..');
const pluginData =
  process.env.PLUGIN_DATA || path.join(os.homedir(), '.codex', 'plugins', 'data', 'clp');

process.env.CLAUDE_PLUGIN_ROOT = pluginRoot;
process.env.CLAUDE_CONFIG_DIR = pluginData;

require('./clp-context.js');
