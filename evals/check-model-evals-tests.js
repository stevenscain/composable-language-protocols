#!/usr/bin/env node
// Mutation tests for model-evaluation alignment checks. No dependencies.

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const checker = path.join(__dirname, 'check-model-evals.js');
const tempDirs = [];

function makeCopy() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'clp-model-eval-check-'));
  tempDirs.push(tempRoot);
  fs.cpSync(path.join(root, 'evals'), path.join(tempRoot, 'evals'), { recursive: true });
  return tempRoot;
}

function run(checkRoot) {
  return spawnSync(process.execPath, [checker, checkRoot], { encoding: 'utf8' });
}

function expectFailure(name, mutate, expectedMessage) {
  const checkRoot = makeCopy();
  mutate(checkRoot);
  const result = run(checkRoot);
  assert.notStrictEqual(result.status, 0, `${name} should fail`);
  const output = result.stdout + result.stderr;
  assert.ok(
    output.includes(expectedMessage),
    `${name} did not report ${JSON.stringify(expectedMessage)}:\n${output}`
  );
}

try {
  const baseline = run(root);
  assert.strictEqual(
    baseline.status,
    0,
    `unmodified model evaluations should pass:\n${baseline.stdout}${baseline.stderr}`
  );

  expectFailure(
    'prompt drift',
    checkRoot => {
      const promptPath = path.join(
        checkRoot,
        'evals',
        'model',
        '001-general-explanation',
        'prompt.md'
      );
      fs.appendFileSync(promptPath, '\nUnreviewed instruction.\n');
    },
    'prompt.md does not match CASE 001 input and protocol selection'
  );

  expectFailure(
    'source case drift',
    checkRoot => {
      const sourcePath = path.join(checkRoot, 'evals', 'cases.txt');
      const source = fs.readFileSync(sourcePath, 'utf8');
      fs.writeFileSync(sourcePath, source.replace('- Main point first', '- Conclusion first'));
    },
    'fingerprint is stale for CASE 001'
  );

  expectFailure(
    'missing source fingerprint',
    checkRoot => {
      const graderPath = path.join(
        checkRoot,
        'evals',
        'model',
        '001-general-explanation',
        'graders',
        'criteria.md'
      );
      const grader = fs.readFileSync(graderPath, 'utf8');
      fs.writeFileSync(graderPath, grader.replace(/<!-- eval-source:[^\n]+-->\r?\n?/, ''));
    },
    'must contain one eval-source fingerprint'
  );

  expectFailure(
    'wrong source case',
    checkRoot => {
      const graderPath = path.join(
        checkRoot,
        'evals',
        'model',
        '001-general-explanation',
        'graders',
        'criteria.md'
      );
      const grader = fs.readFileSync(graderPath, 'utf8');
      fs.writeFileSync(graderPath, grader.replace('eval-source: CASE 001', 'eval-source: CASE 002'));
    },
    'fingerprint names the wrong source case'
  );

  console.log('PASS. Four model-evaluation alignment mutations produced the expected failures.');
} finally {
  for (const tempDir of tempDirs) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}
