#!/usr/bin/env node
// Structural checks for the executable model evaluation suite.

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const sourcePath = path.join(__dirname, 'cases.txt');
const modelRoot = path.join(__dirname, 'model');

const source = fs.readFileSync(sourcePath, 'utf8');
const sourceIds = [...source.matchAll(/^CASE (\d{3})\s*$/gm)].map(match => match[1]);

assert.strictEqual(sourceIds.length, 16, 'evals/cases.txt must contain 16 source cases');
assert.strictEqual(new Set(sourceIds).size, sourceIds.length, 'source case IDs must be unique');

const caseDirectories = fs.readdirSync(modelRoot, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)
  .sort();

const modelIds = caseDirectories.map(name => {
  const match = name.match(/^(\d{3})-[a-z0-9-]+$/);
  assert.ok(match, `invalid model eval directory name: ${name}`);
  return match[1];
});

assert.deepStrictEqual(modelIds, sourceIds, 'model eval IDs must match evals/cases.txt');

for (const directory of caseDirectories) {
  const caseRoot = path.join(modelRoot, directory);
  const promptPath = path.join(caseRoot, 'prompt.md');
  const gradersRoot = path.join(caseRoot, 'graders');

  assert.ok(fs.existsSync(promptPath) && fs.statSync(promptPath).isFile(), `${directory} is missing prompt.md`);
  assert.ok(fs.statSync(promptPath).size > 0, `${directory}/prompt.md is empty`);
  assert.ok(
    fs.existsSync(gradersRoot) && fs.statSync(gradersRoot).isDirectory(),
    `${directory} is missing graders/`
  );

  const graders = fs.readdirSync(gradersRoot).filter(name => name.endsWith('.md'));
  assert.ok(graders.length > 0, `${directory} has no Markdown grader`);

  for (const grader of graders) {
    const content = fs.readFileSync(path.join(gradersRoot, grader), 'utf8');
    assert.match(content, /PASS/, `${directory}/${grader} must define PASS criteria`);
    assert.match(content, /FAIL/, `${directory}/${grader} must define FAIL criteria`);
  }
}

console.log(`PASS. ${caseDirectories.length} executable model evals match evals/cases.txt.`);
