const fs = require('fs');
const path = require('path');

const directory = __dirname;
const jsonPath = path.join(directory, 'full-result.json');
const readmePath = path.join(directory, 'README.md');
const outputPath = path.join(directory, 'full-result.md');

const result = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const readme = fs.readFileSync(readmePath, 'utf8');

function usd(value) {
  return `$${Number(value).toFixed(6)}`;
}

function percent(value) {
  return `${(Number(value) * 100).toFixed(1)}%`;
}

function integer(value) {
  return Number(value || 0).toLocaleString('en-US');
}

function caseTitle(item) {
  return item.name
    .replace(/^\d{3}-/, '')
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

function markdownFence(content, language = 'text') {
  const matches = String(content).match(/`+/g) || [];
  const longest = matches.reduce((length, match) => Math.max(length, match.length), 0);
  const fence = '`'.repeat(Math.max(3, longest + 1));
  return `${fence}${language}\n${content}\n${fence}`;
}

function extractCaseCommentary(markdown) {
  const commentary = new Map();
  const pattern = /^### Case (\d{3}):[^\n]*\n([\s\S]*?)(?=^### Case \d{3}:|^## Cross-case interpretation)/gm;
  for (const match of markdown.matchAll(pattern)) {
    const body = match[2]
      .replace(/^\s*\*\*Result:\*\*[^\n]*\n+/, '')
      .trim();
    commentary.set(match[1], body);
  }
  return commentary;
}

function usageRow(label, arm) {
  return `| ${label} | ${arm.verdict || ''} | ${usd(arm.costUsd)} | ${integer(arm.usage?.input_tokens)} | ${integer(arm.usage?.output_tokens)} |`;
}

const commentary = extractCaseCommentary(readme);
const cases = result.cases;
const withOnly = cases.filter((item) => item.withClp.verdict === 'PASS' && item.withoutClp.verdict === 'FAIL');
const withoutOnly = cases.filter((item) => item.withClp.verdict === 'FAIL' && item.withoutClp.verdict === 'PASS');
const bothPass = cases.filter((item) => item.withClp.verdict === 'PASS' && item.withoutClp.verdict === 'PASS');
const bothFail = cases.filter((item) => item.withClp.verdict === 'FAIL' && item.withoutClp.verdict === 'FAIL');

const withCost = cases.reduce((sum, item) => sum + item.withClp.costUsd, 0);
const withoutCost = cases.reduce((sum, item) => sum + item.withoutClp.costUsd, 0);
const judgeCost = cases.reduce((sum, item) => sum + item.judge.costUsd, 0);
const completedCost = withCost + withoutCost + judgeCost;

const modelIds = new Set();
for (const item of cases) {
  for (const arm of [item.withClp, item.withoutClp, item.judge]) {
    for (const modelId of Object.keys(arm.modelUsage || {})) modelIds.add(modelId);
  }
}

const lines = [];

lines.push('# Annotated full evaluation result');
lines.push('');
lines.push('This file is a human-readable rendering of `full-result.json`. It preserves the recorded prompts, criteria, candidate responses, verdicts, judge reasons, costs, and primary token counts. It adds commentary to explain what each comparison shows and why the distinction matters.');
lines.push('');
lines.push('The JSON file remains authoritative for exact machine-readable values and complete provider metadata. Text inside fenced blocks is recorded source material. It can contain wording or punctuation that CLP rejected during grading.');
lines.push('');
lines.push('## Result at a glance');
lines.push('');
lines.push(`CLP passed ${result.summary.withClpPasses} of ${result.summary.caseCount} cases (${percent(result.summary.withClpScore)}). The comparison arm passed ${result.summary.withoutClpPasses} cases (${percent(result.summary.withoutClpScore)}). The observed difference was ${(result.summary.scoreDelta * 100).toFixed(1)} percentage points.`);
lines.push('');
lines.push('| Outcome | Cases | Count |');
lines.push('| --- | --- | ---: |');
lines.push(`| CLP passed; comparison failed | ${withOnly.map((item) => item.id).join(', ') || 'None'} | ${withOnly.length} |`);
lines.push(`| Comparison passed; CLP failed | ${withoutOnly.map((item) => item.id).join(', ') || 'None'} | ${withoutOnly.length} |`);
lines.push(`| Both passed | ${bothPass.map((item) => item.id).join(', ') || 'None'} | ${bothPass.length} |`);
lines.push(`| Both failed | ${bothFail.map((item) => item.id).join(', ') || 'None'} | ${bothFail.length} |`);
lines.push('');
lines.push('The main result is not only the aggregate score. Ten paired cases changed from a comparison failure to a CLP pass. Two changed in the opposite direction. The gains were concentrated in multi-constraint tasks, factual restraint, attribution, terminology control, and required-format compliance. The two CLP failures involved omitted information: a missing recommendation in case 004 and a missing time reference in case 009.');
lines.push('');
lines.push('This result describes one run of a curated suite. It does not estimate performance across all writing tasks. The same model family generated and judged the responses, each case ran once, the judge knew the arm labels, and the fallback injected the specification directly instead of testing native plugin delivery.');
lines.push('');
lines.push('## Run metadata');
lines.push('');
lines.push('| Field | Recorded value |');
lines.push('| --- | --- |');
lines.push(`| Schema version | ${result.schemaVersion} |`);
lines.push(`| Artifact timestamp | ${result.createdAt} |`);
lines.push(`| Method | \`${result.method}\` |`);
lines.push(`| Native plugin evaluation available | ${result.nativePluginEvalAvailable ? 'Yes' : 'No'} |`);
lines.push(`| Runs per case | ${result.runsPerCase} |`);
lines.push(`| Requested generation model | \`${result.model}\` |`);
lines.push(`| Requested judge model | \`${result.judgeModel}\` |`);
lines.push(`| Resolved model identifier | ${[...modelIds].map((id) => `\`${id}\``).join(', ')} |`);
lines.push(`| Total cost limit | ${usd(result.maxCostUsd)} |`);
lines.push(`| Per-call cost limit | ${usd(result.maxCallCostUsd)} |`);
lines.push(`| Timeout | ${integer(result.timeoutMs)} ms |`);
lines.push(`| Prior-attempt allowance | ${usd(result.priorCostUsd)} |`);
lines.push(`| Total budget-accounted cost | ${usd(result.totalCostUsd)} |`);
lines.push('');
lines.push('### Source fingerprints');
lines.push('');
lines.push('| Source | SHA-256 |');
lines.push('| --- | --- |');
lines.push(`| CLP specification | \`${result.source.clpSha256}\` |`);
lines.push(`| Canonical cases | \`${result.source.casesSha256}\` |`);
lines.push(`| Executable model suite | \`${result.source.modelSuiteSha256}\` |`);
lines.push('');
lines.push('The fingerprints identify the exact specification, case definitions, and executable suite used for the run. They support drift detection, but they do not establish that the criteria themselves are complete or correct.');
lines.push('');
lines.push('## Cost summary');
lines.push('');
lines.push('| Component | Recorded cost |');
lines.push('| --- | ---: |');
lines.push(`| CLP generation calls | ${usd(withCost)} |`);
lines.push(`| Comparison generation calls | ${usd(withoutCost)} |`);
lines.push(`| Judge calls | ${usd(judgeCost)} |`);
lines.push(`| Completed calls | ${usd(completedCost)} |`);
lines.push(`| Prior-attempt allowance | ${usd(result.priorCostUsd)} |`);
lines.push(`| Total budget-accounted cost | ${usd(result.totalCostUsd)} |`);
lines.push('');
lines.push('The CLP arm cost more because each CLP generation call included the full specification. The total is a budget-accounting value. It includes prior-attempt cost and a reserved allowance, so it should not be read as an exact provider invoice.');
lines.push('');
lines.push('## How to read the case records');
lines.push('');
lines.push('Each case contains five parts:');
lines.push('');
lines.push('1. The exact prompt sent to both arms.');
lines.push('2. The exact conjunctive grading criteria. A response passed only if it met every criterion.');
lines.push('3. The recorded CLP response and the judge decision.');
lines.push('4. The recorded comparison response and the judge decision.');
lines.push('5. Commentary that interprets the paired result without changing the recorded verdict.');
lines.push('');
lines.push('Binary grading makes a small punctuation failure count the same as a material factual failure. Read the judge reason and commentary before treating two failures as equivalent.');
lines.push('');
lines.push('## Case index');
lines.push('');
lines.push('| Case | Task | With CLP | Without CLP |');
lines.push('| --- | --- | --- | --- |');
for (const item of cases) {
  const anchor = `case-${item.id}-${caseTitle(item).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  lines.push(`| [${item.id}](#${anchor}) | ${caseTitle(item)} | ${item.withClp.verdict} | ${item.withoutClp.verdict} |`);
}
lines.push('');
lines.push('## Case records');

for (const item of cases) {
  const title = caseTitle(item);
  lines.push('');
  lines.push(`### Case ${item.id}: ${title}`);
  lines.push('');
  lines.push(`**Paired result:** CLP ${item.withClp.verdict}; comparison ${item.withoutClp.verdict}.`);
  lines.push('');
  lines.push('#### Prompt');
  lines.push('');
  lines.push(markdownFence(item.prompt, 'text'));
  lines.push('');
  lines.push('<details>');
  lines.push('<summary>Exact grading criteria</summary>');
  lines.push('');
  lines.push(markdownFence(item.criteria, 'markdown'));
  lines.push('');
  lines.push('</details>');
  lines.push('');
  lines.push('#### With CLP');
  lines.push('');
  lines.push(markdownFence(item.withClp.response, 'text'));
  lines.push('');
  lines.push(`**Judge verdict:** ${item.withClp.verdict}`);
  lines.push('');
  lines.push(`**Judge reason:** ${item.withClp.reason}`);
  lines.push('');
  lines.push('#### Without CLP');
  lines.push('');
  lines.push(markdownFence(item.withoutClp.response, 'text'));
  lines.push('');
  lines.push(`**Judge verdict:** ${item.withoutClp.verdict}`);
  lines.push('');
  lines.push(`**Judge reason:** ${item.withoutClp.reason}`);
  lines.push('');
  lines.push('#### Cost and usage');
  lines.push('');
  lines.push('| Call | Verdict | Cost | Input tokens | Output tokens |');
  lines.push('| --- | --- | ---: | ---: | ---: |');
  lines.push(usageRow('With CLP', item.withClp));
  lines.push(usageRow('Without CLP', item.withoutClp));
  lines.push(`| Judge |  | ${usd(item.judge.costUsd)} | ${integer(item.judge.usage?.input_tokens)} | ${integer(item.judge.usage?.output_tokens)} |`);
  lines.push('');
  lines.push('#### Commentary');
  lines.push('');
  lines.push(commentary.get(item.id) || 'The recorded judge reason above is the available interpretation for this case.');
}

lines.push('');
lines.push('## Cross-case reading');
lines.push('');
lines.push('The paired record supports four observations:');
lines.push('');
lines.push('1. CLP had its clearest advantage when one response had to satisfy several distinct constraints at once. Cases 010 and 013 through 016 combined audience needs, technical precision, factual retention, attribution, uncertainty, or protocol exclusion.');
lines.push('2. CLP reduced unsupported additions. The comparison arm invented or expanded content in cases 003, 005, and 011.');
lines.push('3. The base model already handled straightforward evidence limits and fiction well. Both arms passed cases 006, 007, 008, and 012.');
lines.push('4. CLP introduced a possible compression risk. Its failures in cases 004 and 009 omitted required decision or timing information. One run cannot distinguish a systematic effect from generation variance.');
lines.push('');
lines.push('## Evaluation cautions');
lines.push('');
lines.push('- Each case ran once, so the artifact does not measure variance or failure frequency.');
lines.push('- The same model family generated and judged the responses. Shared preferences can affect both arms and the verdicts.');
lines.push('- The judge saw the `WITH CLP` and `WITHOUT CLP` labels. The comparison was not blinded.');
lines.push('- The runner always generated the CLP response first. Candidate order was not randomized.');
lines.push('- The criteria were conjunctive and binary. A single missing requirement caused a full case failure.');
lines.push('- The 16 cases are canonical specification tests, not a representative sample of all prose tasks.');
lines.push('- The run tested direct specification injection. It did not test native plugin installation or lifecycle delivery.');
lines.push('- No independent human adjudication is recorded in this artifact.');
lines.push('');
lines.push('## Recommended follow-up');
lines.push('');
lines.push('Repeat each case at least five times per arm. Blind and randomize candidate order. Record criterion-level results in addition to strict case-level verdicts. Use an independent judge model and add human review for disagreements and CLP failures. Give cases 004 and 009 targeted variants so the next run can test whether CLP consistently omits recommendations or time references.');
lines.push('');
lines.push('## Artifact relationship');
lines.push('');
lines.push('- `full-result.json` is the authoritative machine-readable result.');
lines.push('- `full-result.md` is the annotated, human-readable rendering.');
lines.push('- `README.md` is the concise evaluation report and cross-case analysis.');

fs.writeFileSync(outputPath, `${lines.join('\n')}\n`, 'utf8');
console.log(`Wrote ${outputPath}`);
