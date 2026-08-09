#!/usr/bin/env node
// Structural checks for the executable model evaluation suite.

const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = process.argv[2] ? path.resolve(process.argv[2]) : path.join(__dirname, '..');
const sourcePath = path.join(root, 'evals', 'cases.txt');
const modelRoot = path.join(root, 'evals', 'model');

function normalize(text) {
  return text.replace(/\r\n/g, '\n').trim();
}

function parseCases(text) {
  const source = text.replace(/\r\n/g, '\n');
  const starts = [...source.matchAll(/^CASE (\d{3})\s*$/gm)];

  return starts.map((start, index) => {
    const id = start[1];
    const body = source.slice(
      start.index + start[0].length,
      index + 1 < starts.length ? starts[index + 1].index : source.length
    );
    const headings = [...body.matchAll(/^([A-Z ]+):\s*$/gm)];
    const fields = {};

    for (let fieldIndex = 0; fieldIndex < headings.length; fieldIndex++) {
      const heading = headings[fieldIndex];
      const end = fieldIndex + 1 < headings.length
        ? headings[fieldIndex + 1].index
        : body.length;
      fields[heading[1]] = normalize(body.slice(heading.index + heading[0].length, end));
    }

    for (const required of ['CATEGORY', 'PROTOCOL', 'INPUT', 'CHECK']) {
      assert.ok(fields[required], `CASE ${id} is missing ${required}`);
    }

    const checks = fields.CHECK
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('- '))
      .map(line => line.slice(2));
    assert.ok(checks.length > 0, `CASE ${id} has no CHECK entries`);

    return {
      id,
      category: fields.CATEGORY,
      protocol: fields.PROTOCOL,
      input: fields.INPUT,
      expectedProtocols: fields['EXPECTED PROTOCOLS'] || null,
      expected: fields.EXPECTED || null,
      checks
    };
  });
}

function sourceHash(sourceCase) {
  return crypto.createHash('sha256').update(JSON.stringify(sourceCase)).digest('hex');
}

function expectedPrompt(sourceCase) {
  if (sourceCase.protocol === 'AUTO') return sourceCase.input;
  return `CLP: ${sourceCase.protocol}\n\n${sourceCase.input}`;
}

const sourceCases = parseCases(fs.readFileSync(sourcePath, 'utf8'));
const sourceIds = sourceCases.map(sourceCase => sourceCase.id);
const sourceById = new Map(sourceCases.map(sourceCase => [sourceCase.id, sourceCase]));

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
  const caseId = directory.slice(0, 3);
  const sourceCase = sourceById.get(caseId);
  const promptPath = path.join(caseRoot, 'prompt.md');
  const gradersRoot = path.join(caseRoot, 'graders');

  assert.ok(fs.existsSync(promptPath) && fs.statSync(promptPath).isFile(), `${directory} is missing prompt.md`);
  assert.ok(fs.statSync(promptPath).size > 0, `${directory}/prompt.md is empty`);
  assert.strictEqual(
    normalize(fs.readFileSync(promptPath, 'utf8')),
    expectedPrompt(sourceCase),
    `${directory}/prompt.md does not match CASE ${caseId} input and protocol selection`
  );
  assert.ok(
    fs.existsSync(gradersRoot) && fs.statSync(gradersRoot).isDirectory(),
    `${directory} is missing graders/`
  );

  const graders = fs.readdirSync(gradersRoot).filter(name => name.endsWith('.md'));
  assert.ok(graders.length > 0, `${directory} has no Markdown grader`);

  for (const grader of graders) {
    const content = fs.readFileSync(path.join(gradersRoot, grader), 'utf8');
    const fingerprints = [...content.matchAll(
      /<!-- eval-source: CASE (\d{3}) sha256=([a-f0-9]{64}) -->/g
    )];
    assert.strictEqual(
      fingerprints.length,
      1,
      `${directory}/${grader} must contain one eval-source fingerprint`
    );
    assert.strictEqual(
      fingerprints[0][1],
      caseId,
      `${directory}/${grader} fingerprint names the wrong source case`
    );
    assert.strictEqual(
      fingerprints[0][2],
      sourceHash(sourceCase),
      `${directory}/${grader} fingerprint is stale for CASE ${caseId}`
    );
    assert.match(
      content,
      /Return PASS only if/,
      `${directory}/${grader} must define explicit PASS criteria`
    );
    assert.match(
      content,
      /Return FAIL if/,
      `${directory}/${grader} must define explicit FAIL criteria`
    );
  }
}

console.log(
  `PASS. ${caseDirectories.length} executable model evals match canonical prompts and source fingerprints.`
);
