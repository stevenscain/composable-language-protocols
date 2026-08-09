#!/usr/bin/env node
// Run the native Claude plugin evaluation suite with a bounded default cost.

const { spawnSync } = require('child_process');
const path = require('path');

const target = process.env.CLP_EVAL_TARGET || path.join(__dirname, '..');
const model = process.env.CLP_EVAL_MODEL || 'haiku';
const judgeModel = process.env.CLP_EVAL_JUDGE_MODEL || 'haiku';
const runs = process.env.CLP_EVAL_RUNS || '1';
const maxCost = process.env.CLP_EVAL_MAX_COST_USD || '5';

const args = [
  'plugin', 'eval', target,
  '--ablation', 'with-without',
  '--model', model,
  '--judge-model', judgeModel,
  '--runs', runs,
  '--max-cost-usd', maxCost,
  '--no-publish',
  ...process.argv.slice(2)
];

const result = spawnSync('claude', args, { stdio: 'inherit' });

if (result.error) {
  if (result.error.code === 'ENOENT') {
    console.error('Claude CLI was not found. Install it before running model evaluations.');
  } else {
    console.error(result.error.message);
  }
  process.exit(1);
}

process.exit(result.status ?? 1);
