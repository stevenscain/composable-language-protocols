#!/usr/bin/env node
// Mutation tests for the CLP structural checker. No dependencies.

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const checker = path.join(__dirname, 'check-compatibility.js');
const source = fs.readFileSync(path.join(root, 'CLP.txt'), 'utf8').replace(/\r\n/g, '\n');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'clp-compatibility-check-'));

function replaceOnce(text, target, replacement) {
  const index = text.indexOf(target);
  assert.notStrictEqual(index, -1, `mutation target not found: ${JSON.stringify(target)}`);
  return text.slice(0, index) + replacement + text.slice(index + target.length);
}

function run(spec) {
  const specPath = path.join(tempDir, 'CLP.txt');
  fs.writeFileSync(specPath, spec);
  return spawnSync(process.execPath, [checker, specPath], { encoding: 'utf8' });
}

function expectFailure(name, mutate, expectedMessage) {
  const result = run(mutate(source));
  assert.strictEqual(result.status, 1, `${name} should fail:\n${result.stdout}${result.stderr}`);
  assert.ok(
    result.stdout.includes(expectedMessage),
    `${name} did not report ${JSON.stringify(expectedMessage)}:\n${result.stdout}`
  );
}

try {
  const baseline = run(source);
  assert.strictEqual(baseline.status, 0, `unmodified CLP.txt should pass:\n${baseline.stdout}`);

  expectFailure(
    'one-sided compatibility',
    spec => replaceOnce(spec, 'CORE\nPLAIN\nEXECUTIVE\nREPORTING\nRESEARCH', 'CORE\nEXECUTIVE\nREPORTING\nRESEARCH'),
    'PLAIN lists TECHNICAL as compatible, but TECHNICAL does not list PLAIN'
  );

  expectFailure(
    'unknown compatibility reference',
    spec => replaceOnce(spec, 'CORE\nPLAIN\nEXECUTIVE\nREPORTING\nRESEARCH', 'CORE\nPLAIN\nEXECUTIVE\nREPORTING\nRESEARCH\nUNKNOWN'),
    'TECHNICAL lists UNKNOWN as compatible, but UNKNOWN has no protocol section'
  );

  expectFailure(
    'one-sided automatic exclusion',
    spec => replaceOnce(spec, 'DO NOT AUTOMATICALLY COMBINE WITH:\n\nREPORTING\n\nRULES:', 'RULES:'),
    'REPORTING lists RESEARCH under DO NOT AUTOMATICALLY COMBINE WITH, but RESEARCH does not list REPORTING'
  );

  expectFailure(
    'unknown automatic exclusion reference',
    spec => replaceOnce(spec, 'DO NOT AUTOMATICALLY COMBINE WITH:\n\nREPORTING\n\nRULES:', 'DO NOT AUTOMATICALLY COMBINE WITH:\n\nREPORTING\nUNKNOWN\n\nRULES:'),
    'RESEARCH lists UNKNOWN under DO NOT AUTOMATICALLY COMBINE WITH, but UNKNOWN has no protocol section'
  );

  expectFailure(
    'unknown selection-map reference',
    spec => replaceOnce(spec, 'General explanation:\nCORE + PLAIN', 'General explanation:\nCORE + UNKNOWN'),
    'selection map set "CORE + UNKNOWN" names UNKNOWN, which has no section'
  );

  expectFailure(
    'incompatible selection-map pair',
    spec => replaceOnce(spec, 'General explanation:\nCORE + PLAIN', 'General explanation:\nCORE + PLAIN + CONTINUITY'),
    'selection map set "CORE + PLAIN + CONTINUITY" pairs PLAIN and CONTINUITY, which are not compatible'
  );

  expectFailure(
    'excluded selection-map pair',
    spec => replaceOnce(spec, 'General explanation:\nCORE + PLAIN', 'General explanation:\nCORE + REPORTING + RESEARCH'),
    'selection map set "CORE + REPORTING + RESEARCH" pairs REPORTING and RESEARCH, which are marked DO NOT AUTOMATICALLY COMBINE WITH'
  );

  console.log('PASS. Seven structural mutations produced the expected checker failures.');
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
