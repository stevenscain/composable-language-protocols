#!/usr/bin/env node
//
// Structural checks for CLP.txt. No dependencies. Run from the repository
// root:
//
//   node evals/check-compatibility.js
//
// Checks:
//   1. Every declaration references a protocol section.
//   2. Every COMPATIBLE WITH declaration is reciprocal.
//   3. Every DO NOT AUTOMATICALLY COMBINE WITH declaration is reciprocal.
//   4. Every protocol named in the section 3 selection map exists.
//   5. Every protocol set in section 3 is pairwise compatible.
//   6. No protocol set in section 3 contains a pair that a protocol marks
//      DO NOT AUTOMATICALLY COMBINE WITH.
//
// Exits 1 if any check fails. Non-composable pairs that carry no marker are
// reported for information only and do not fail the run.

const fs = require('fs');
const path = require('path');

const specPath = process.argv[2] || path.join(__dirname, '..', 'CLP.txt');
const lines = fs.readFileSync(specPath, 'utf8').split(/\r?\n/);

// CORE declares "USE WITH: All compatible protocols." rather than listing
// them, so it never takes part in the pairwise checks.
const UNIVERSAL = 'CORE';

const compatible = {};
const noAutoCombine = {};
const sectionOf = {};

// Collect the protocol sections and their compatibility blocks.
let current = null;
for (let i = 0; i < lines.length; i++) {
  const heading = lines[i].match(/^(\d+)\.\s+([A-Z]+)\s*$/);
  if (heading) {
    const sectionNumber = Number(heading[1]);
    current = sectionNumber >= 4 && sectionNumber <= 12 ? heading[2] : null;
    if (current) sectionOf[current] = sectionNumber;
    continue;
  }
  if (!current) continue;

  const isCompatible = /^COMPATIBLE WITH:\s*$/.test(lines[i]);
  const isNoAuto = /^DO NOT AUTOMATICALLY COMBINE WITH:\s*$/.test(lines[i]);
  if (!isCompatible && !isNoAuto) continue;

  const names = [];
  for (let j = i + 1; j < lines.length; j++) {
    const line = lines[j].trim();
    if (line === '') continue;
    if (/^[A-Z]+$/.test(line)) { names.push(line); continue; }
    break;
  }
  if (isCompatible) compatible[current] = names;
  else noAutoCombine[current] = names;
}

// Collect the protocol sets from the section 3 selection map.
const sets = [];
let inSelection = false;
for (const line of lines) {
  const heading = line.match(/^(\d+)\.\s+[A-Z]/);
  if (heading) { inSelection = heading[1] === '3'; continue; }
  if (!inSelection) continue;

  const set = line.trim().match(/^(?:CLP:\s*)?([A-Z]+(?:\s*\+\s*[A-Z]+)*)$/);
  if (!set) continue;
  const members = set[1].split('+').map(s => s.trim());
  if (members.length === 1 && members[0] === 'AUTO') continue;
  sets.push(members);
}

const failures = [];
const declared = Object.keys(compatible);
const protocols = Object.keys(sectionOf);

// 1. References and 2. compatibility reciprocity.
for (const a of declared) {
  for (const b of compatible[a]) {
    if (b === UNIVERSAL) continue;
    if (!sectionOf[b]) {
      failures.push(`${a} lists ${b} as compatible, but ${b} has no protocol section`);
    } else if (!compatible[b]) {
      failures.push(`${a} lists ${b} as compatible, but ${b} has no COMPATIBLE WITH block`);
    } else if (!compatible[b].includes(a)) {
      failures.push(`${a} lists ${b} as compatible, but ${b} does not list ${a}`);
    }
  }
}

// 1. References and 3. automatic-exclusion reciprocity.
for (const a of Object.keys(noAutoCombine)) {
  for (const b of noAutoCombine[a]) {
    if (!sectionOf[b]) {
      failures.push(`${a} lists ${b} under DO NOT AUTOMATICALLY COMBINE WITH, but ${b} has no protocol section`);
    } else if (!(noAutoCombine[b] || []).includes(a)) {
      failures.push(`${a} lists ${b} under DO NOT AUTOMATICALLY COMBINE WITH, but ${b} does not list ${a}`);
    }
  }
}

// 4, 5 and 6. The section 3 selection map.
const composable = (a, b) =>
  a === UNIVERSAL || b === UNIVERSAL ||
  (compatible[a] || []).includes(b) || (compatible[b] || []).includes(a);

const markedNoAuto = (a, b) =>
  (noAutoCombine[a] || []).includes(b) || (noAutoCombine[b] || []).includes(a);

for (const members of sets) {
  const label = members.join(' + ');
  for (const name of members) {
    if (!sectionOf[name]) failures.push(`selection map set "${label}" names ${name}, which has no section`);
  }
  for (let i = 0; i < members.length; i++) {
    for (let j = i + 1; j < members.length; j++) {
      const a = members[i], b = members[j];
      if (!sectionOf[a] || !sectionOf[b]) continue;
      if (markedNoAuto(a, b)) {
        failures.push(`selection map set "${label}" pairs ${a} and ${b}, which are marked DO NOT AUTOMATICALLY COMBINE WITH`);
      } else if (!composable(a, b)) {
        failures.push(`selection map set "${label}" pairs ${a} and ${b}, which are not compatible`);
      }
    }
  }
}

console.log(`Checked ${protocols.length} protocols and ${sets.length} protocol sets in ${path.basename(specPath)}.`);
console.log('');

// Report non-composable pairs so a deliberate exclusion stays visible and an
// accidental one is easy to spot.
const nonUniversal = protocols.filter(name => name !== UNIVERSAL);
const unmarked = [];
for (let i = 0; i < nonUniversal.length; i++) {
  for (let j = i + 1; j < nonUniversal.length; j++) {
    const a = nonUniversal[i], b = nonUniversal[j];
    if (composable(a, b)) continue;
    if (markedNoAuto(a, b)) continue;
    unmarked.push(`${a} + ${b}`);
  }
}
if (unmarked.length > 0) {
  console.log('Non-composable pairs with no DO NOT AUTOMATICALLY COMBINE WITH marker:');
  for (const pair of unmarked) console.log(`  ${pair}`);
  console.log('');
}

if (failures.length > 0) {
  console.log(`FAIL. ${failures.length} problem(s):`);
  for (const failure of failures) console.log(`  ${failure}`);
  process.exit(1);
}

console.log('PASS. Declarations are valid and reciprocal, and every selection map set is legal.');
