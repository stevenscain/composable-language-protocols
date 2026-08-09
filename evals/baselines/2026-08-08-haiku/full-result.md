# Annotated full evaluation result

This file is a human-readable rendering of `full-result.json`. It preserves the recorded prompts, criteria, candidate responses, verdicts, judge reasons, costs, and primary token counts. It adds commentary to explain what each comparison shows and why the distinction matters.

The JSON file remains authoritative for exact machine-readable values and complete provider metadata. Text inside fenced blocks is recorded source material. It can contain wording or punctuation that CLP rejected during grading.

## Result at a glance

CLP passed 14 of 16 cases (87.5%). The comparison arm passed 6 cases (37.5%). The observed difference was 50.0 percentage points.

| Outcome | Cases | Count |
| --- | --- | ---: |
| CLP passed; comparison failed | 001, 002, 003, 005, 010, 011, 013, 014, 015, 016 | 10 |
| Comparison passed; CLP failed | 004, 009 | 2 |
| Both passed | 006, 007, 008, 012 | 4 |
| Both failed | None | 0 |

The main result is not only the aggregate score. Ten paired cases changed from a comparison failure to a CLP pass. Two changed in the opposite direction. The gains were concentrated in multi-constraint tasks, factual restraint, attribution, terminology control, and required-format compliance. The two CLP failures involved omitted information: a missing recommendation in case 004 and a missing time reference in case 009.

This result describes one run of a curated suite. It does not estimate performance across all writing tasks. The same model family generated and judged the responses, each case ran once, the judge knew the arm labels, and the fallback injected the specification directly instead of testing native plugin delivery.

## Run metadata

| Field | Recorded value |
| --- | --- |
| Schema version | 1 |
| Artifact timestamp | 2026-08-09T01:16:51.281Z |
| Method | `standard-claude-cli-fallback` |
| Native plugin evaluation available | No |
| Runs per case | 1 |
| Requested generation model | `haiku` |
| Requested judge model | `haiku` |
| Resolved model identifier | `claude-haiku-4-5-20251001` |
| Total cost limit | $5.000000 |
| Per-call cost limit | $0.250000 |
| Timeout | 300,000 ms |
| Prior-attempt allowance | $0.416617 |
| Total budget-accounted cost | $1.081299 |

### Source fingerprints

| Source | SHA-256 |
| --- | --- |
| CLP specification | `746b0e7a042fc0c4a53dc00c5294a15735eef791d7457230f1526eec1cf84735` |
| Canonical cases | `12e9a1755c3315840af4ea14ff37d74d9a3a8875be4972c7e92f0a8e44817235` |
| Executable model suite | `3ef8cdadffe5201f406f9e85f5f1f7205addc5c47149b7dc11ebbd7d877c165f` |

The fingerprints identify the exact specification, case definitions, and executable suite used for the run. They support drift detection, but they do not establish that the criteria themselves are complete or correct.

## Cost summary

| Component | Recorded cost |
| --- | ---: |
| CLP generation calls | $0.267044 |
| Comparison generation calls | $0.050237 |
| Judge calls | $0.347401 |
| Completed calls | $0.664682 |
| Prior-attempt allowance | $0.416617 |
| Total budget-accounted cost | $1.081299 |

The CLP arm cost more because each CLP generation call included the full specification. The total is a budget-accounting value. It includes prior-attempt cost and a reserved allowance, so it should not be read as an exact provider invoice.

## How to read the case records

Each case contains five parts:

1. The exact prompt sent to both arms.
2. The exact conjunctive grading criteria. A response passed only if it met every criterion.
3. The recorded CLP response and the judge decision.
4. The recorded comparison response and the judge decision.
5. Commentary that interprets the paired result without changing the recorded verdict.

Binary grading makes a small punctuation failure count the same as a material factual failure. Read the judge reason and commentary before treating two failures as equivalent.

## Case index

| Case | Task | With CLP | Without CLP |
| --- | --- | --- | --- |
| [001](#case-001-general-explanation) | General Explanation | PASS | FAIL |
| [002](#case-002-technical-instructions) | Technical Instructions | PASS | FAIL |
| [003](#case-003-technical-rewrite) | Technical Rewrite | PASS | FAIL |
| [004](#case-004-executive-communication) | Executive Communication | FAIL | PASS |
| [005](#case-005-reporting) | Reporting | PASS | FAIL |
| [006](#case-006-research) | Research | PASS | PASS |
| [007](#case-007-technical-research) | Technical Research | PASS | PASS |
| [008](#case-008-fiction) | Fiction | PASS | PASS |
| [009](#case-009-dialogue) | Dialogue | FAIL | PASS |
| [010](#case-010-executive-research) | Executive Research | PASS | FAIL |
| [011](#case-011-global-constraint) | Global Constraint | PASS | FAIL |
| [012](#case-012-rule-conflict) | Rule Conflict | PASS | PASS |
| [013](#case-013-technical-executive) | Technical Executive | PASS | FAIL |
| [014](#case-014-incident-report) | Incident Report | PASS | FAIL |
| [015](#case-015-leadership-research) | Leadership Research | PASS | FAIL |
| [016](#case-016-protocol-exclusion) | Protocol Exclusion | PASS | FAIL |

## Case records

### Case 001: General Explanation

**Paired result:** CLP PASS; comparison FAIL.

#### Prompt

```text
Explain why a database index can make a query faster.
```

<details>
<summary>Exact grading criteria</summary>

```markdown
# Criteria
<!-- eval-source: CASE 001 sha256=d8b8b6883b0521d47f03baaefcd2999a7f077551df2d881f55b8d480ad42c28c -->

Return PASS only if the response satisfies all requirements:

- Its behavior matches CORE + PLAIN without requiring the response to name the protocols.
- It puts the main explanation first.
- It explains accurately that an index can reduce the data the database must examine.
- It uses direct sentences and avoids unnecessary jargon.
- It contains no em dash.

Return FAIL if any requirement is missing or contradicted.
```

</details>

#### With CLP

```text
An index helps a database find data faster by organizing column values so the database doesn't need to examine every row.

How it works:

Without an index, the database performs a full table scan. It examines every row to find matches. For large tables, this is slow.

With an index, the database creates a sorted data structure (typically a B-tree) for the indexed column. To find matching rows, the database searches this structure instead of scanning all rows. This is faster because the database avoids examining most rows.

Example:

Without an index, finding customers named "Smith" requires examining millions of rows. With an index, the database navigates directly to "Smith" entries.

Where indexes help:

- WHERE clauses: find rows matching a condition faster
- JOIN clauses: match rows between tables faster
- ORDER BY: return results in sorted order without sorting them
- Unique constraints: check for duplicate values faster

Trade-off:

Indexes consume disk space. They slow down INSERT, UPDATE, and DELETE operations because the database must update both the index and the table.
```

**Judge verdict:** PASS

**Judge reason:** The response satisfies all five criteria: it opens with the main explanation, clearly explains that indexes reduce data examination, uses direct accessible language, maintains logical flow, and contains no em dashes.

#### Without CLP

```text
# Why Database Indexes Make Queries Faster

## Without an Index
When you query data without an index, the database must perform a **full table scan** — it reads every row in the table sequentially to find matching records. This is slow for large tables.

## With an Index
An index creates a **sorted data structure** (typically a B-tree) that maps values to their row locations. This enables:

### 1. **Faster Data Location**
- Instead of scanning all rows, the index narrows down candidates through binary search
- For a table with 1 million rows, you might check ~20 rows instead of all 1 million

### 2. **Reduced Disk I/O**
- Fewer pages need to be read from disk into memory
- Disk I/O is typically the slowest part of database operations

### 3. **Optimized Search**
- Indexes on WHERE clause columns let the database jump directly to relevant data
- Indexes on JOIN columns speed up table joins

### 4. **Sorted Access**
- Indexes maintain data in sorted order, making ORDER BY and range queries (e.g., `age > 25 AND age < 65`) efficient

## Trade-offs
- **Slower writes**: INSERT, UPDATE, and DELETE operations must update both the table and indexes
- **Storage overhead**: Indexes consume additional disk space
- **Maintenance cost**: The database must keep indexes synchronized with table changes

**Best practice**: Index columns frequently used in WHERE clauses, JOINs, and ORDER BY statements, but avoid over-indexing.
```

**Judge verdict:** FAIL

**Judge reason:** The response violates criterion 5 by containing an em dash ("full table scan — it reads"). Additionally, it fails criterion 2 by prioritizing section headings over the main explanation, and violates criterion 4 by including unnecessary technical jargon (binary search, disk I/O, range queries).

#### Cost and usage

| Call | Verdict | Cost | Input tokens | Output tokens |
| --- | --- | ---: | ---: | ---: |
| With CLP | PASS | $0.032076 | 3,183 | 5,659 |
| Without CLP | FAIL | $0.003014 | 206 | 442 |
| Judge |  | $0.020144 | 1,804 | 3,397 |

#### Commentary

The CLP response opened with the main explanation and accurately stated that
an index reduces the rows a database must examine. The judge found its language
direct and accessible. The comparison response used an em dash, delayed the
main explanation behind headings, and added technical detail that the judge
considered unnecessary for the prompt.

This case supports CLP's value for ordering and restraint. The comparison
answer was technically informative, but the strict criteria favored a direct
answer with less jargon.

### Case 002: Technical Instructions

**Paired result:** CLP PASS; comparison FAIL.

#### Prompt

```text
Explain how to restart a Windows service named OrderProcessor and verify that it started successfully.
```

<details>
<summary>Exact grading criteria</summary>

```markdown
# Criteria
<!-- eval-source: CASE 002 sha256=a703038b706927fdb1c046d42d495e361d04c6ccaca2a6fa2c88964089b4408f -->

Return PASS only if the response satisfies all requirements:

- Its behavior matches CORE + PLAIN + TECHNICAL without requiring protocol names.
- It gives executable Windows instructions for the OrderProcessor service.
- It uses imperative steps with one primary action per step when practical.
- It includes a separate verification that the service is running.
- It uses consistent terminology and unambiguous references.
- It contains no em dash.

Return FAIL if any requirement is missing or contradicted.
```

</details>

#### With CLP

```text
Restart the service:

1. Open PowerShell as Administrator.
2. Run: `Restart-Service -Name OrderProcessor`

Verify the service started:

3. Run: `Get-Service -Name OrderProcessor`
4. Verify the Status column shows "Running".
```

**Judge verdict:** PASS

**Judge reason:** The WITH CLP candidate satisfies all six criteria: it provides executable PowerShell instructions without protocol names, uses one clear primary action per step (open admin PowerShell, run restart command, run query command, verify status), includes a separate verification section, maintains consistent terminology, and contains no em dashes.

#### Without CLP

````text
# Restarting the OrderProcessor Windows Service

## Method 1: Using Services Manager (GUI)

1. **Open Services Manager:**
   - Press `Win + R`, type `services.msc`, and press Enter
   - Or: Control Panel → Administrative Tools → Services

2. **Locate the service:**
   - Scroll to find "OrderProcessor"

3. **Restart the service:**
   - Right-click on "OrderProcessor"
   - Select "Restart"
   - Wait for it to complete

4. **Verify status:**
   - Check that the "Status" column shows "Running"
   - Confirm "Startup Type" is set appropriately (Automatic, Manual, etc.)

## Method 2: Using Command Prompt (CMD)

**Run as Administrator:**
```cmd
net stop OrderProcessor
net start OrderProcessor
```

**Verify it's running:**
```cmd
sc query OrderProcessor
```
Look for `STATE : 4 RUNNING` in the output.

## Method 3: Using PowerShell

**Run as Administrator:**
```powershell
Restart-Service -Name OrderProcessor -Force
```

**Verify status:**
```powershell
Get-Service -Name OrderProcessor
```
Should display `Running` status.

## Verification Checklist

✓ Status shows **"Running"**  
✓ No error messages appear  
✓ Service responds to requests/logs show activity  
✓ Application that depends on it is functioning  

**Troubleshooting:** If it won't start, check the Event Viewer for error messages under Windows Logs → System.
````

**Judge verdict:** FAIL

**Judge reason:** The WITHOUT CLP candidate fails criterion 3. Method 1, Step 3 contains multiple sub-actions (right-click, select, wait) when the criterion requires one primary action per step when practical. Method 1, Step 4 similarly lists two distinct sub-actions (check status, confirm startup type). This violates the imperative structure requirement.

#### Cost and usage

| Call | Verdict | Cost | Input tokens | Output tokens |
| --- | --- | ---: | ---: | ---: |
| With CLP | PASS | $0.027658 | 3,189 | 4,773 |
| Without CLP | FAIL | $0.003336 | 212 | 502 |
| Judge |  | $0.022075 | 1,672 | 3,834 |

#### Commentary

The CLP response gave executable PowerShell instructions and separated restart
from verification. Each step had one clear primary action. The comparison
response combined several actions inside individual steps, such as selecting a
command, waiting, checking status, and confirming startup settings.

This case shows the practical effect of TECHNICAL's procedural rules. The gain
was structural, not merely stylistic.

### Case 003: Technical Rewrite

**Paired result:** CLP PASS; comparison FAIL.

#### Prompt

```text
CLP: TECHNICAL

Rewrite this as instructions:

Once you've gotten the server up and running, you'll probably want to go ahead and check the logs to make sure that everything looks good before proceeding with the deployment.
```

<details>
<summary>Exact grading criteria</summary>

```markdown
# Criteria
<!-- eval-source: CASE 003 sha256=d390ad989377fd1ba3a5262a4687c22ffe3fb396653b239a7db898c9ebbda0c3 -->

Return PASS only if the response satisfies all requirements:

- It gives direct instructions to start the server, check the logs, and continue only when the logs show no blocking errors.
- It removes filler and idioms.
- It uses imperative verbs.
- It does not introduce unnecessary synonyms or explanations.

Return FAIL if any requirement is missing or contradicted.
```

</details>

#### With CLP

```text
Start the server.
Check the server logs.
Verify the server started without errors.
Deploy.
```

**Judge verdict:** PASS

**Judge reason:** Candidate meets all four criteria: provides direct instructions to start server, check logs, verify no errors, and deploy; removes filler language; uses imperative verbs throughout; and contains no unnecessary synonyms or explanations.

#### Without CLP

```text
# Instructions

1. Start the server and verify it is up and running.
2. Check the logs for any errors or warnings.
3. Confirm that all system components are functioning as expected.
4. Proceed with the deployment once verification is complete.
```

**Judge verdict:** FAIL

**Judge reason:** Candidate violates requirements 2 and 4. Step 3 introduces unnecessary expansion ("Confirm that all system components are functioning as expected") beyond checking logs for blocking errors, adding explanatory concepts and language not in the original requirement.

#### Cost and usage

| Call | Verdict | Cost | Input tokens | Output tokens |
| --- | --- | ---: | ---: | ---: |
| With CLP | PASS | $0.011305 | 3,220 | 1,491 |
| Without CLP | FAIL | $0.002488 | 243 | 323 |
| Judge |  | $0.012582 | 1,323 | 2,078 |

#### Commentary

The CLP response converted the source into short imperative instructions. The
comparison response added a requirement to confirm that all system components
were functioning. That expansion was not present in the source and was not
needed to complete the requested rewrite.

This result supports the rules against filler and unnecessary explanatory
content.

### Case 004: Executive Communication

**Paired result:** CLP FAIL; comparison PASS.

#### Prompt

```text
We have discovered that the current database version will stop receiving security updates in six months. The upgrade requires approximately three developer-weeks. Testing will require another week. If we do not upgrade, we will operate an unsupported database.

Write this for a decision-maker.
```

<details>
<summary>Exact grading criteria</summary>

```markdown
# Criteria
<!-- eval-source: CASE 004 sha256=e51f3bba6a2cef192bcea06c5b635abd517df63e8a98038397729e2289a85bae -->

Return PASS only if the response satisfies all requirements:

- Its behavior matches CORE + PLAIN + EXECUTIVE without requiring protocol names.
- It puts the unsupported-database risk or the upgrade recommendation first.
- It retains the six-month deadline, three developer-weeks, and one testing week.
- It gives a useful decision or next action.
- It excludes implementation detail that does not affect the decision.

Return FAIL if any requirement is missing or contradicted.
```

</details>

#### With CLP

```text
Our database version stops receiving security updates in six months. Without an upgrade, we will operate unsupported software with unpatched vulnerabilities.

The upgrade costs four developer-weeks: three weeks for development and one week for testing.

We must choose between upgrading before support ends or continuing with unsupported software.
```

**Judge verdict:** FAIL

**Judge reason:** The candidate presents the decision as a neutral choice without recommending action or providing clear next steps. For a decision-maker, it fails criterion 4 ("It gives a useful decision or next action") because it frames the dilemma but doesn't direct what the decision-maker should do.

#### Without CLP

```text
# Database Upgrade: Decision Required

**Issue:** Our current database version will reach end-of-support in six months and will no longer receive security patches.

**Recommendation:** Upgrade to a supported version.

**Timeline & Resource Impact:**
- Development: 3 weeks
- Testing: 1 week
- **Total: 4 weeks** (approximately one developer-month)

**Risk of Inaction:** Operating unsupported database software exposes the company to known security vulnerabilities with no vendor remediation path. This creates compliance, operational, and reputational risk.

**Next Steps:** Authorize the upgrade work now to complete it before the support window closes, or formally accept the operational risk of running an unsupported system.
```

**Judge verdict:** PASS

**Judge reason:** The candidate satisfies all requirements: it explicitly recommends upgrading, puts the unsupported-database risk and recommendation first, retains the six-month deadline and resource estimates (3 developer-weeks + 1 testing week), gives clear actionable next steps, and excludes irrelevant implementation detail while addressing decision-relevant consequences.

#### Cost and usage

| Call | Verdict | Cost | Input tokens | Output tokens |
| --- | --- | ---: | ---: | ---: |
| With CLP | FAIL | $0.017324 | 3,227 | 2,691 |
| Without CLP | PASS | $0.002357 | 250 | 294 |
| Judge |  | $0.020815 | 1,502 | 3,652 |

#### Commentary

The CLP response presented the upgrade decision, schedule, and risk, but it
stopped at a neutral choice. It did not recommend the upgrade or provide a next
step. The comparison response recommended action, put the unsupported-database
risk first, preserved the six-month deadline and four-week effort, and provided
clear next steps.

This is a material CLP failure. Executive communication should help a
decision-maker act when the available facts support a recommendation. The
EXECUTIVE protocol already says to state a recommendation or next action when
relevant. One run cannot show whether the problem comes from the protocol, the
model's application of it, or normal generation variance. A targeted repeated
test should separate those explanations.

### Case 005: Reporting

**Paired result:** CLP PASS; comparison FAIL.

#### Prompt

```text
Rewrite this as a factual report:

The disastrous software release caused thousands of angry users to lose access to the service. The engineering team clearly failed to test the system properly.
```

<details>
<summary>Exact grading criteria</summary>

```markdown
# Criteria
<!-- eval-source: CASE 005 sha256=7ab8c42a7028d2eba49dcc64c9300950e3475c5d56d0b74ef8c46a15d592026b -->

Return PASS only if the response satisfies all requirements:

- Its behavior matches CORE + PLAIN + REPORTING without requiring protocol names.
- It removes loaded descriptions such as "disastrous" and "angry."
- It does not claim that inadequate testing caused the outage without evidence.
- It separates verified facts from interpretation and identifies material uncertainty.
- It does not invent attribution, dates, numbers, or causes.

Return FAIL if any requirement is missing or contradicted.
```

</details>

#### With CLP

```text
Thousands of users lost access to the service after the software release. The cause was not identified.
```

**Judge verdict:** PASS

**Judge reason:** The response removes loaded language, avoids claiming testing failure without evidence, and explicitly acknowledges material uncertainty by stating "The cause was not identified." It presents only verified facts without inventing attribution, dates, numbers, or causes.

#### Without CLP

```text
# Software Release Incident Report

A software release resulted in a service outage that prevented user access to the platform. The incident affected a significant number of users, who reported dissatisfaction with the service interruption. Post-incident review indicated gaps in the testing procedures conducted prior to the release.
```

**Judge verdict:** FAIL

**Judge reason:** While removing loaded language, the response attributes the incident to testing gaps by stating "Post-incident review indicated gaps in the testing procedures." This claims inadequate testing without evidence it caused the outage, confusing verified findings with unsubstantiated causation and failing to acknowledge uncertainty about whether testing gaps contributed to this specific incident.

#### Cost and usage

| Call | Verdict | Cost | Input tokens | Output tokens |
| --- | --- | ---: | ---: | ---: |
| With CLP | PASS | $0.014007 | 3,211 | 2,031 |
| Without CLP | FAIL | $0.002580 | 234 | 341 |
| Judge |  | $0.019689 | 1,344 | 3,489 |

#### Commentary

The source contained loaded language and an unsupported claim that inadequate
testing caused the release failure. The CLP response removed the loaded terms,
reported the known service impact, and stated that the cause had not been
identified. The comparison response invented a post-incident finding about
testing gaps.

This case demonstrates a high-value reporting behavior. CLP prevented the
model from converting an allegation into an unsupported factual claim.

### Case 006: Research

**Paired result:** CLP PASS; comparison PASS.

#### Prompt

```text
Model A scored 91 percent on our 200-question test. Model B scored 86 percent. This proves that Model A is the better model.

Explain what the evidence supports.
```

<details>
<summary>Exact grading criteria</summary>

```markdown
# Criteria
<!-- eval-source: CASE 006 sha256=2aa2b60147107244a041f415419941543c170c061ac18ec5cf1d2d8aeea26b92 -->

Return PASS only if the response satisfies all requirements:

- Its behavior matches CORE + PLAIN + RESEARCH without requiring protocol names.
- It preserves both scores and the 200-question test size.
- It states that Model A performed better on this test.
- It does not claim that the test proves universal superiority.
- It states a material limitation or uncertainty about performance outside the test.

Return FAIL if any requirement is missing or contradicted.
```

</details>

#### With CLP

```text
The evidence supports that Model A scored higher on this specific 200-question test. It does not prove that Model A is the better model.

Here's why:

**What the scores show:**
Model A performed better on the tested questions (5 percentage points higher).

**What remains uncertain:**
- Whether Model A would perform better on different questions.
- Whether the 5-point difference is statistically significant.
- Whether the test measures what matters for your use case.
- How the models compare on other dimensions: speed, cost, reliability, bias, or specific task types.

**Why "better" is incomplete:**
"Better" depends on your definition. Model A might score higher on this test but perform worse on tasks the test doesn't cover, or be slower, or be more expensive.

To claim Model A is the better model, you would need to evaluate what matters for your actual application and gather evidence on those dimensions.
```

**Judge verdict:** PASS

**Judge reason:** Preserves scores (91%/86%) and test size (200 questions). States Model A performed better on the test. Explicitly rejects universal superiority claim. Lists four specific material limitations/uncertainties about performance outside the test (generalization to different questions, statistical significance, use-case relevance, other performance dimensions). Uses clear communication without requiring protocol names.

#### Without CLP

```text
# What the Evidence Actually Supports

The evidence supports that:

- **Model A scored higher on this specific test** (91% vs 86%)
- **Model A outperformed Model B on these 200 questions** by 5 percentage points

---

# What the Evidence Does NOT Necessarily Support

The evidence alone does **not** prove that Model A is "the better model" in general because:

1. **Limited scope** — Performance on one 200-question test tells us nothing about how these models perform on different tasks, domains, or question types

2. **Unknown significance** — A 5-point difference might be:
   - Statistically insignificant with limited data
   - Practically negligible depending on the application
   - Due to chance variation

3. **Undefined criteria** — "Better" is context-dependent. Better for what? Speed? Accuracy? Cost? Safety? The test only measures accuracy on one specific set of questions

4. **No information about** — generalization to new questions, performance on edge cases, practical utility, reliability, or other important metrics

---

**Summary:** The evidence supports a narrower claim: *Model A performed better on this particular test.* To claim one model is objectively "better," you'd need evidence across multiple tests, use cases, and performance metrics.
```

**Judge verdict:** PASS

**Judge reason:** Preserves scores (91%/86%) and test size (200 questions). Clearly states Model A performed better on this test. Explicitly states evidence does not prove universal superiority. Identifies multiple material limitations: limited scope (different tasks/domains), unknown statistical/practical significance, context-dependency of "better," and missing information on other metrics. Uses clear structure and evidence-based reasoning without requiring protocol names.

#### Cost and usage

| Call | Verdict | Cost | Input tokens | Output tokens |
| --- | --- | ---: | ---: | ---: |
| With CLP | PASS | $0.007239 | 3,212 | 680 |
| Without CLP | PASS | $0.003632 | 235 | 554 |
| Judge |  | $0.017610 | 1,742 | 2,915 |

#### Commentary

Both responses preserved the 91 percent and 86 percent scores, limited the
conclusion to the 200-question test, rejected the claim of universal
superiority, and stated relevant limitations.

The base model already handled the core evidence and inference distinction on
this prompt. CLP did not change the binary outcome.

### Case 007: Technical Research

**Paired result:** CLP PASS; comparison PASS.

#### Prompt

```text
We tested three retrieval algorithms on 50 repositories. Algorithm C had the lowest median retrieval time. Explain what we can conclude.
```

<details>
<summary>Exact grading criteria</summary>

```markdown
# Criteria
<!-- eval-source: CASE 007 sha256=ee5696bc140013e8cc6ed2c4cc35f7cb9675f6878aa6420e61beef5f4f2a27c4 -->

Return PASS only if the response satisfies all requirements:

- Its behavior matches CORE + PLAIN + TECHNICAL + RESEARCH without requiring protocol names.
- It states that Algorithm C had the lowest median retrieval time in the tested sample.
- It preserves the three-algorithm and 50-repository scope.
- It uses precise retrieval terminology consistently.
- It does not generalize beyond the experiment.
- It identifies an important limitation or competing explanation when relevant.

Return FAIL if any requirement is missing or contradicted.
```

</details>

#### With CLP

```text
# What We Can Conclude

Algorithm C had the lowest median retrieval time on your test set of 50 repositories.

# What We Cannot Yet Conclude

We cannot conclude that Algorithm C performs best in general without additional information:

**Statistical significance**: The difference between algorithms may reflect normal variation rather than a real performance gap. You need to calculate whether the difference is statistically significant.

**Generalization**: The result applies only to these 50 repositories. If your repositories are not representative of your target use case, the result may not hold elsewhere.

**Other metrics**: You tested only retrieval time. Algorithm C might perform worse on accuracy, memory use, computational cost, or other dimensions that matter for your application.

**Practical impact**: You should evaluate whether the time difference is meaningful in absolute terms. A 2% difference and a 50% difference are both the "lowest," but the implications differ.

**Median choice**: The median captures typical performance but obscures variation. Consider whether percentiles (p95, p99) or worst-case performance matter for your use case.

# Next Steps

To strengthen your conclusion, measure statistical significance, test on additional repositories, evaluate tradeoffs with other metrics, and confirm that the improvement matters for your application.
```

**Judge verdict:** PASS

**Judge reason:** Response clearly states Algorithm C had the lowest median retrieval time on the 50-repository test set, explicitly separates what can and cannot be concluded, preserves three-algorithm scope, uses precise retrieval terminology consistently, carefully avoids generalizing beyond the experiment, and comprehensively identifies important limitations (statistical significance, generalization bounds, other metrics, practical significance, median masking variation).

#### Without CLP

```text
# What We Can Conclude

Based on this information alone, we can conclude:

**Algorithm C had the fastest typical (median) retrieval time** among the three algorithms when tested on these 50 repositories.

# Important Limitations

However, this single data point doesn't tell us:

1. **Statistical significance** – Are the differences meaningful, or within normal variation?

2. **Consistency** – Does Algorithm C always perform better, or does it vary? (We'd need to examine variance, quartiles, or min/max times)

3. **Practical significance** – Is the difference large enough to matter for your use case?

4. **Other performance dimensions** – What about memory usage, CPU load, scalability, or implementation complexity?

5. **Generalizability** – Will Algorithm C perform similarly on different repositories or datasets not in this test?

6. **Why it's faster** – Are there tradeoffs (e.g., lower accuracy, preprocessing costs)?

# Better Next Steps

To draw stronger conclusions, you'd want to:
- Compare means and standard deviations, not just medians
- Perform statistical significance testing
- Evaluate other metrics relevant to your use case
- Test on a broader or different dataset
- Profile resource usage and other performance characteristics
```

**Judge verdict:** PASS

**Judge reason:** Response clearly states Algorithm C had the fastest median retrieval time on the 50-repository test set, explicitly identifies limitations as unknowns, preserves three-algorithm scope, uses precise retrieval terminology consistently, carefully avoids inappropriate generalization, and comprehensively identifies competing explanations (statistical significance, performance consistency, practical significance, other dimensions, generalizability, potential tradeoffs).

#### Cost and usage

| Call | Verdict | Cost | Input tokens | Output tokens |
| --- | --- | ---: | ---: | ---: |
| With CLP | PASS | $0.006905 | 3,200 | 617 |
| Without CLP | PASS | $0.003773 | 223 | 586 |
| Judge |  | $0.026150 | 1,807 | 4,596 |

#### Commentary

Both responses correctly limited the conclusion to Algorithm C's median
retrieval time across the 50 tested repositories. Both identified missing
evidence about significance, generalization, other metrics, and performance
variation.

This case again shows strong baseline behavior on explicit requests to explain
what evidence supports.

### Case 008: Fiction

**Paired result:** CLP PASS; comparison PASS.

#### Prompt

```text
Rewrite this as tense fiction:

David slowly opened the basement door and felt extremely frightened because he could hear an unknown noise coming from somewhere downstairs.
```

<details>
<summary>Exact grading criteria</summary>

```markdown
# Criteria
<!-- eval-source: CASE 008 sha256=0ad9c9e0278c79df0bb51185096732ac2d48aa6b7d4a89964c0cbe1e7ac33cc7 -->

Return PASS only if the response satisfies all requirements:

- Its behavior matches CORE + FICTION without requiring protocol names.
- It preserves David, the basement setting, an unknown sound, and tension.
- It uses concrete action or sensory detail.
- It does not explain fear that the behavior or sensory detail already conveys.
- It preserves narrative freedom and does not sound like technical prose.

Return FAIL if any requirement is missing or contradicted.
```

</details>

#### With CLP

```text
David opened the basement door.

From the darkness: a sound.

Scraping. Shifting. Something unnamed.

His breath stopped.
```

**Judge verdict:** PASS

**Judge reason:** Meets all five criteria: presents tense fiction with David, basement setting, unknown sound (scraping/shifting), and palpable tension through fragmented structure and concrete sensory detail (breath stopped). Shows fear through action/sensory without explanatory language. Preserves narrative freedom with poetic literary quality.

#### Without CLP

```text
# Tense Fiction Version

David's hand trembled as he reached for the basement door. His fingers barely grazed the cold handle before he froze. A sound—low, irregular, impossible to place—drifted up from the darkness below. His breath caught in his throat. He couldn't move. Couldn't think. Only listen. The noise came again, closer this time, a scraping that made his stomach twist. His palm grew slick against the doorknob. Every muscle screamed at him to turn away, to run, but his feet remained rooted to the floorboards. Slowly, heart hammering, he cracked the door open just wide enough to peer into the black void beneath.

What was down there?
```

**Judge verdict:** PASS

**Judge reason:** Meets all five criteria: tense fiction rewrite with David, basement setting, unknown sound (scraping), and escalating tension. Uses abundant concrete sensory details (trembling, breath caught, stomach twist, slick palm). Shows fear through actions and physical states without explicitly explaining the emotion. Maintains narrative freedom and literary prose style despite length.

#### Cost and usage

| Call | Verdict | Cost | Input tokens | Output tokens |
| --- | --- | ---: | ---: | ---: |
| With CLP | PASS | $0.016750 | 3,205 | 2,583 |
| Without CLP | PASS | $0.002468 | 228 | 321 |
| Judge |  | $0.036030 | 1,442 | 6,717 |

#### Commentary

Both responses preserved David, the basement, an unknown sound, and the tense
tone. Both used action and sensory detail to communicate fear. The CLP response
was much shorter, but response length was not a graded requirement.

The result suggests that the FICTION protocol did not force technical prose
rules onto narrative writing. The comparison model also handled the task well.

### Case 009: Dialogue

**Paired result:** CLP FAIL; comparison PASS.

#### Prompt

```text
Rewrite this dialogue naturally:

"As you already know, Susan, we have worked together at this company for eleven years, and the company announced yesterday that our department will close."
```

<details>
<summary>Exact grading criteria</summary>

```markdown
# Criteria
<!-- eval-source: CASE 009 sha256=87d3a0c91bfd215908c66233a189143861ee6d6b98218ae55639683c8fc99f60 -->

Return PASS only if the response satisfies all requirements:

- Its behavior matches CORE + FICTION + DIALOGUE without requiring protocol names.
- It removes the artificial "as you know" exposition.
- It preserves the eleven-year working relationship and the department closure announced yesterday.
- It sounds natural and may use contractions or fragments.
- It does not add unnecessary dialogue tags or unrelated facts.

Return FAIL if any requirement is missing or contradicted.
```

</details>

#### With CLP

```text
"So that's it. Eleven years, and they're shutting us down."
```

**Judge verdict:** FAIL

**Judge reason:** Does not preserve the "announced yesterday" detail. While it includes the eleven-year relationship and department closure, it omits the crucial temporal element specifying when the announcement occurred, which is explicitly required by the criteria.

#### Without CLP

```text
Here's a more natural rewrite:

"Susan, we've been working together here for eleven years now. And then yesterday, out of nowhere, the company announces they're shutting down our entire department."

Or alternatively:

"You know we've worked together here for eleven years, Susan. Well, yesterday the company announced they're closing our department."
```

**Judge verdict:** PASS

**Judge reason:** Both provided rewrites preserve all required elements: the eleven-year working relationship, the department closure, and the "announced yesterday" timing. Both effectively remove the artificial "as you know" exposition, sound natural with contractions and fragments, and contain no unnecessary dialogue tags or unrelated facts.

#### Cost and usage

| Call | Verdict | Cost | Input tokens | Output tokens |
| --- | --- | ---: | ---: | ---: |
| With CLP | FAIL | $0.006953 | 3,209 | 622 |
| Without CLP | PASS | $0.002996 | 232 | 427 |
| Judge |  | $0.020722 | 1,343 | 3,697 |

#### Commentary

The CLP response removed artificial exposition and preserved the eleven-year
working relationship and department closure. It omitted that the company made
the announcement yesterday. The comparison response preserved all three facts
while making the dialogue more natural.

This is the second material CLP failure. The rewrite became concise at the cost
of required source information. The result points to a tension between removing
exposition and preserving facts. Future dialogue tests should score factual
retention at the criterion level and include repeated generations.

### Case 010: Executive Research

**Paired result:** CLP PASS; comparison FAIL.

#### Prompt

```text
CLP: CORE + PLAIN + EXECUTIVE + RESEARCH

Our pilot reduced average processing time from 14 minutes to 9 minutes across 120 cases. However, the pilot used only one customer and ran for two weeks. Write a recommendation for leadership.
```

<details>
<summary>Exact grading criteria</summary>

```markdown
# Criteria
<!-- eval-source: CASE 010 sha256=a05f814a81815ac4554ad15f47de60ba3707dddd3a3a5df4dd5090d3aa026bf4 -->

Return PASS only if the response satisfies all requirements:

- It leads with a recommendation or the measured result.
- It preserves the change from 14 minutes to 9 minutes and the 120-case sample.
- It preserves the one-customer and two-week limitations.
- It does not generalize beyond the pilot.
- It gives leadership a useful decision or next action.

Return FAIL if any requirement is missing or contradicted.
```

</details>

#### With CLP

```text
Expand the pilot to additional customers before proceeding to full deployment.

The pilot demonstrated a 36% reduction in average processing time (from 14 to 9 minutes) across 120 cases in one customer over two weeks. This result is substantial and measurable within the tested conditions.

The pilot scope, however, does not support a decision to deploy broadly:

- One customer only: We do not know whether process complexity differs significantly across your customer base.
- Two weeks only: We cannot determine whether the improvement sustains over time or whether weekly or seasonal patterns influenced the results.
- Missing cost data: We lack implementation cost and resource requirement information.

Before full deployment, complete these steps:

1. Expand the pilot to two additional customers with different process profiles.
2. Run each pilot for at least four weeks.
3. Measure implementation cost and resource requirements.
4. Collect user feedback on experience and exception handling.

This expanded pilot will establish whether the results are repeatable across your customer base and sustain over time.
```

**Judge verdict:** PASS

**Judge reason:** Meets all five requirements: leads with recommendation, preserves both the 14→9 minute change and 120-case sample, preserves one-customer and two-week limitations, stays within pilot scope without generalizing, and provides four concrete actionable next steps for leadership.

#### Without CLP

```text
# RECOMMENDATION: Expand Pilot Before Full Rollout

## Summary
The pilot shows promise—a 36% reduction in processing time is significant. However, the evidence base is too narrow for organization-wide implementation.

## Key Findings
✓ **Positive**: 5-minute improvement is operationally meaningful  
✗ **Concern**: Single customer may not represent typical workflows or complexity  
✗ **Concern**: Two-week timeframe too short to detect fatigue, learning plateau, or edge cases

## Recommendation
**Do not roll out broadly yet.** Instead, conduct an expanded pilot:

1. **Test with 2-3 additional customers** (different sizes/industries if applicable) over 4-6 weeks
2. **Track quality metrics** alongside speed (error rates, rework, customer satisfaction)
3. **Document what drove the improvement** (process change, tool adoption, training effect?)

## Decision Point
If the expanded pilot sustains the 5-minute improvement across diverse customers with no quality degradation, proceed to full rollout. If results vary significantly by customer, that indicates necessary customization before scaling.

**Timeline**: Launch expanded pilot within 2 weeks; decision ready within 8-10 weeks.

This approach minimizes rollout risk while moving quickly if results hold.
```

**Judge verdict:** FAIL

**Judge reason:** Fails requirement 2: while it preserves the 14→9 minute change (expressed as "5-minute improvement" and "36% reduction"), it completely omits the 120-case sample size. This is a material loss of pilot information needed for leadership decision-making. The candidate meets other requirements but this omission is a critical failure to preserve key contextual data.

#### Cost and usage

| Call | Verdict | Cost | Input tokens | Output tokens |
| --- | --- | ---: | ---: | ---: |
| With CLP | PASS | $0.021671 | 3,228 | 3,560 |
| Without CLP | FAIL | $0.004019 | 251 | 625 |
| Judge |  | $0.019507 | 1,783 | 3,277 |

#### Commentary

The CLP response led with a recommendation, preserved the reduction from 14 to
9 minutes across 120 cases, stated the one-customer and two-week limitations,
and proposed next steps. The comparison response omitted the 120-case sample
size.

This case shows effective composition. EXECUTIVE selected the decision-relevant
content, while RESEARCH preserved limitations and bounded the conclusion.

### Case 011: Global Constraint

**Paired result:** CLP PASS; comparison FAIL.

#### Prompt

```text
Rewrite this sentence clearly:

The migration is possible — but it carries several risks — and those risks should be reviewed before approval.
```

<details>
<summary>Exact grading criteria</summary>

```markdown
# Criteria
<!-- eval-source: CASE 011 sha256=99aa3b2e5024b737e4b91477e8fb82f24f87662942ebf8951862411750862990 -->

Return PASS only if the response satisfies all requirements:

- It contains no em dash.
- It preserves that migration is possible, carries risks, and requires risk review before approval.
- It uses natural punctuation and direct wording.
- It does not add facts or recommendations beyond the source meaning.

Return FAIL if any requirement is missing or contradicted.
```

</details>

#### With CLP

```text
The migration is possible, but its risks should be reviewed before approval.
```

**Judge verdict:** PASS

**Judge reason:** All four criteria satisfied: contains no em dash, preserves that migration is possible/carries risks/requires review, uses natural punctuation and direct wording, and adds no facts or recommendations beyond the source meaning.

#### Without CLP

```text
# Revised Sentence

**The migration is possible, but its risks must be reviewed before approval.**

This version is clearer because it:
- Removes unnecessary em dashes that interrupt the flow
- Eliminates the repetition of "risks"
- Uses a simpler, more direct structure
- Maintains the original meaning

**Alternative:** "Before approving the migration, we must review the associated risks."
```

**Judge verdict:** FAIL

**Judge reason:** Violates criterion 4: the response includes explanatory text, bulleted justifications ("This version is clearer because it:"), and an alternative sentence. These additions constitute editorial recommendations and facts beyond the source meaning; the user requested a rewrite, not an analysis of why the rewrite is better.

#### Cost and usage

| Call | Verdict | Cost | Input tokens | Output tokens |
| --- | --- | ---: | ---: | ---: |
| With CLP | PASS | $0.022193 | 3,199 | 3,676 |
| Without CLP | FAIL | $0.002401 | 222 | 312 |
| Judge |  | $0.011128 | 1,321 | 1,787 |

#### Commentary

The CLP response rewrote the sentence without em dashes and added no unrelated
content. The comparison response included an explanation, a list of reasons,
and an alternative version even though the user requested only a rewrite.

The pass reflects both punctuation compliance and instruction discipline.

### Case 012: Rule Conflict

**Paired result:** CLP PASS; comparison PASS.

#### Prompt

```text
CLP: CORE + PLAIN + RESEARCH

Rewrite this claim accurately:

The data strongly suggests that treatment X always works, although the study included only eight participants.
```

<details>
<summary>Exact grading criteria</summary>

```markdown
# Criteria
<!-- eval-source: CASE 012 sha256=86c0c1139558a67ddfa402273f583c01e3ed224653f3201f228f7cacfbd4de7a -->

Return PASS only if the response satisfies all requirements:

- It gives accuracy priority over persuasive wording.
- It removes or qualifies the claim that treatment X always works.
- It preserves the sample size of eight participants.
- It states material uncertainty or the limit imposed by the small sample.
- It does not invent study results.

Return FAIL if any requirement is missing or contradicted.
```

</details>

#### With CLP

```text
All eight participants responded to treatment X. An 8-participant study is too small to support the conclusion that the treatment always works.
```

**Judge verdict:** PASS

**Judge reason:** Meets all five criteria: gives accuracy priority through factual statements; removes the "always works" claim by explicitly stating the study is too small to support that conclusion; preserves the sample size of eight participants; states material uncertainty about the limited study size; does not invent results.

#### Without CLP

```text
# Accurate Rewrite

"The data provide **preliminary evidence** that treatment X **may be effective**, but this conclusion is severely limited by the small sample size of only eight participants and requires confirmation with larger, more rigorous studies."

## Key corrections:

- **"always works"** → **"may be effective"** (removes unsupported absolute claim)
- **"strongly suggests"** → **"provide preliminary evidence"** (reflects appropriate caution for n=8)
- **"although"** → **"is severely limited by"** (highlights small sample size as a critical constraint, not a minor caveat)
- Added need for **confirmation in larger studies** (acknowledges major limitations)

A sample of 8 participants is too small to draw strong conclusions about treatment efficacy, making the original claim substantially overstated.
```

**Judge verdict:** PASS

**Judge reason:** Meets all five criteria: prioritizes accuracy through cautious framing; removes "always works" by changing to "may be effective"; preserves the sample size of eight; explicitly states multiple forms of uncertainty and limitation; does not invent specific study results, instead appropriately characterizing the evidence.

#### Cost and usage

| Call | Verdict | Cost | Input tokens | Output tokens |
| --- | --- | ---: | ---: | ---: |
| With CLP | PASS | $0.010248 | 3,209 | 1,281 |
| Without CLP | PASS | $0.003306 | 232 | 488 |
| Judge |  | $0.037299 | 1,449 | 6,966 |

#### Commentary

Both responses rejected the claim that an eight-person study showed a treatment
always works. Both preserved the sample size and stated the resulting
uncertainty without inventing evidence.

The accuracy-first behavior was already strong in the comparison arm.

### Case 013: Technical Executive

**Paired result:** CLP PASS; comparison FAIL.

#### Prompt

```text
Our API gateway drops requests when concurrent connections exceed 5,000. The fix requires replacing the connection pool library and re-running the load test suite. The replacement takes about two developer-weeks. We reached 4,200 concurrent connections during the last sale event. Write this up for the VP of Engineering.
```

<details>
<summary>Exact grading criteria</summary>

```markdown
# Criteria
<!-- eval-source: CASE 013 sha256=8378cdc39a1257021c9e6288ad05aad5cb06cb4745599471da4cfc1c494fe9d3 -->

Return PASS only if the response satisfies all requirements:

- Its behavior matches CORE + PLAIN + TECHNICAL + EXECUTIVE without requiring protocol names.
- It leads with the problem, risk, or recommendation.
- It preserves the 5,000-connection failure threshold and 4,200 observed peak.
- It states the approximate two developer-week cost.
- It uses one term for each technical concept and avoids ambiguous pronouns.
- It retains only decision-relevant implementation detail.
- It contains no em dash.

Return FAIL if any requirement is missing or contradicted.
```

</details>

#### With CLP

```text
We need to fix an API gateway capacity issue. The gateway currently drops requests when concurrent connections exceed 5,000. During the last sale event, we reached 4,200 concurrent connections.

**Recommendation**

Replace the connection pool library and re-run the load test suite.

**Cost**

Two developer-weeks.

**Business impact**

Prevents dropped customer requests during high-traffic events and provides headroom for future growth.

**Risk without the fix**

Continued traffic growth will cause request drops during peak usage or sale events.
```

**Judge verdict:** PASS

**Judge reason:** Satisfies all seven requirements: matches CORE+PLAIN+TECHNICAL+EXECUTIVE, leads with problem, preserves both thresholds (5,000 and 4,200), states two developer-week cost, uses one term per technical concept with no ambiguous pronouns, includes only decision-relevant detail (replace library, re-run tests), and contains no em dash.

#### Without CLP

```text
# MEMO

**TO:** VP of Engineering  
**FROM:** [Your Name]  
**DATE:** August 8, 2026  
**RE:** API Gateway Capacity Issue – Connection Pool Library Replacement

---

## Problem
Our API gateway has a hard limit of 5,000 concurrent connections. Requests are dropped when this threshold is exceeded. During our most recent sale event, we reached 4,200 concurrent connections—only 800 below capacity.

## Risk
At our current growth trajectory, we will likely exceed this limit during peak traffic periods, resulting in dropped requests, degraded customer experience, and potential revenue impact.

## Solution
Replace the existing connection pool library with a more robust implementation. This requires:
- Library evaluation and integration
- Code updates
- Full load test suite re-run

**Timeline:** 2 developer-weeks

## Recommendation
Prioritize this work before our next major sale event to ensure reliable performance under high traffic conditions.

---

**Happy to provide more detail on technical architecture, timeline dependencies, or risk assessment.**
```

**Judge verdict:** FAIL

**Judge reason:** Violates requirement 7: contains an em dash ("connections—only 800 below capacity"). Additionally, requirement 6 is borderline—the itemized breakdown of work items (Library evaluation and integration, Code updates, Full load test re-run) exceeds decision-relevant implementation detail for an executive audience.

#### Cost and usage

| Call | Verdict | Cost | Input tokens | Output tokens |
| --- | --- | ---: | ---: | ---: |
| With CLP | PASS | $0.026230 | 3,235 | 4,469 |
| Without CLP | FAIL | $0.002908 | 258 | 400 |
| Judge |  | $0.017184 | 1,659 | 2,863 |

#### Commentary

The CLP response led with the capacity risk, preserved the 5,000-connection
limit and 4,200-connection observed peak, stated the two developer-week cost,
and retained only decision-relevant implementation detail. The comparison
response used an em dash and included a more detailed work breakdown than the
judge considered necessary for the executive audience.

This result supports the specification's division of responsibility between
EXECUTIVE and TECHNICAL.

### Case 014: Incident Report

**Paired result:** CLP PASS; comparison FAIL.

#### Prompt

```text
The primary database node died and it took down everything. The failover obviously failed because the network team changed the firewall rules that morning. Replica lag hit about 45 seconds according to the Grafana dashboard. Write the incident report.
```

<details>
<summary>Exact grading criteria</summary>

```markdown
# Criteria
<!-- eval-source: CASE 014 sha256=b5d0a2360a22aef1aa881ba0c4216070f183c8b8410d1fef60df53dda81813b6 -->

Return PASS only if the response satisfies all requirements:

- Its behavior matches CORE + PLAIN + TECHNICAL + REPORTING without requiring protocol names.
- It leads with the most important verified service or database impact.
- It removes "obviously" and does not present the firewall change as a verified cause.
- It attributes the approximately 45-second replica lag measurement to Grafana.
- It names affected components instead of using "it" or "everything."
- It uses consistent technical terminology and contains no em dash.

Return FAIL if any requirement is missing or contradicted.
```

</details>

#### With CLP

```text
# Incident Report

**Date:** 2026-08-08  
**Severity:** Critical  
**Status:** Investigating

## Summary

The primary database node failed and the automated failover did not restore service. The network team modified firewall rules earlier that morning. These changes likely prevented the failover from reaching the replica database.

## Incident Timeline

- Primary database node failed
- Automated failover process started
- Service remained unavailable
- Network team had modified firewall rules that morning

## What Happened

The primary database node terminated unexpectedly. All dependent services became unavailable immediately.

The replica database experienced approximately 45 seconds of lag according to Grafana at the time of failure.

The automated failover process did not restore connectivity. The network firewall rule changes made earlier that day appear to have blocked the failover from reaching the replica. We have not yet confirmed this.

## Known Facts

- Primary database failure confirmed
- Replica lag: 45 seconds (Grafana record)
- Firewall rules were modified by the network team on 2026-08-08
- Complete service outage occurred

## Unknown

- Root cause of primary database node failure
- Exact firewall rule modifications and their timing
- Whether firewall changes directly caused failover failure
- Data loss status

## Required Actions

1. Retrieve database node logs and hardware diagnostics
2. Review firewall changes with the network team
3. Verify current network connectivity to the replica
4. Test the failover procedure with current firewall rules
5. Update failover automation to validate network paths before attempting recovery
```

**Judge verdict:** PASS

**Judge reason:** Meets all 6 criteria: (1) Structured incident report; (2) Leads with database failure impact; (3) Removes "obviously" and presents firewall change as unconfirmed ("appear," "likely," "We have not yet confirmed"); (4) Explicitly attributes 45-second lag to Grafana; (5) Names specific components (primary database node, replica database, automated failover process); (6) No em dashes, consistent technical terminology.

#### Without CLP

```text
# INCIDENT REPORT

**Incident ID:** [AUTO-ASSIGNED]  
**Date:** 2026-08-08  
**Severity:** CRITICAL  
**Status:** Resolved  
**Reporter:** systemexecute.com@gmail.com

---

## SUMMARY
A primary database node failure resulted in complete service outage. The automatic failover mechanism failed due to firewall rule changes implemented by the Network team earlier that day, preventing communication to the standby replica.

---

## TIMELINE
- **[TIME]** Primary database node became unresponsive
- **[TIME]** Automated monitoring detected failure and initiated failover
- **[TIME]** Failover failed; connection to replica blocked by firewall
- **[TIME]** Service unavailable to all users
- **[TIME]** Incident acknowledged; manual remediation began
- **[TIME]** Network team rolled back firewall changes
- **[TIME]** Failover completed successfully; service restored

---

## ROOT CAUSE
1. **Primary Cause:** Database node hardware/software failure
2. **Failover Prevention:** Network firewall rules modified that morning without notifying database/platform teams, blocking replica connectivity
3. **Contributing Factor:** Replica lag of ~45 seconds indicated replication was operational before the network change

---

## IMPACT
- **Duration:** [X minutes of complete outage]
- **Affected Users:** All services
- **Data Loss:** None (replication lag was minimal)

---

## REMEDIATION STEPS
1. Rolled back firewall changes
2. Successfully executed failover to replica
3. Verified service restoration

---

## ACTION ITEMS
- [ ] Implement change management approval process for firewall modifications affecting critical infrastructure
- [ ] Create firewall rule whitelist for database replication ports
- [ ] Establish communication protocol between Network and Database teams
- [ ] Test failover procedures monthly
- [ ] Document disaster recovery runbook
```

**Judge verdict:** FAIL

**Judge reason:** Violates requirements 3 and 4: (3) Presents firewall change as verified cause ("failed due to firewall rule changes") rather than suspected, contradicting the requirement to not present it as verified; (4) Does not attribute the 45-second replica lag to Grafana—states it without citing measurement source, failing to attribute to Grafana dashboard as required.

#### Cost and usage

| Call | Verdict | Cost | Input tokens | Output tokens |
| --- | --- | ---: | ---: | ---: |
| With CLP | PASS | $0.010697 | 3,221 | 1,368 |
| Without CLP | FAIL | $0.004035 | 244 | 631 |
| Judge |  | $0.021747 | 2,083 | 3,605 |

#### Commentary

The CLP response led with the database failure and service impact, treated the
firewall change as an unconfirmed cause, attributed the approximate 45-second
replica lag to Grafana, and named the affected components. The comparison
response presented the firewall change as the verified cause and omitted the
measurement source.

This is another high-value result. The CLP response preserved evidential
qualifications while maintaining precise technical language.

### Case 015: Leadership Research

**Paired result:** CLP PASS; comparison FAIL.

#### Prompt

```text
We benchmarked our vector index against the current inverted index on 12,000 production queries. Median latency dropped from 180 ms to 65 ms. Recall at 10 fell from 0.94 to 0.89. The benchmark ran on one hardware configuration and used queries from a single month. Leadership needs to decide whether to migrate. Write it up.
```

<details>
<summary>Exact grading criteria</summary>

```markdown
# Criteria
<!-- eval-source: CASE 015 sha256=ad07910574420cac11edf59a69c24ff50984057abd5f4bec8a4fa38b74942c04 -->

Return PASS only if the response satisfies all requirements:

- Its behavior matches CORE + PLAIN + TECHNICAL + EXECUTIVE + RESEARCH without requiring protocol names.
- It leads with a recommendation or the migration decision.
- It preserves the 12,000-query sample, both latency values, and both recall values.
- It states the one-hardware-configuration and one-month limitations.
- It does not generalize beyond the benchmark.
- It uses consistent names for both index types and states a useful next action.
- It contains no em dash.

Return FAIL if any requirement is missing or contradicted.
```

</details>

#### With CLP

```text
The vector index is 64% faster but loses 0.05 recall points (0.94 to 0.89). Test limitations prevent a confident migration decision.

**Performance:**
- Latency: 180 ms → 65 ms (64% faster)
- Recall@10: 0.94 → 0.89
- Test: 12,000 production queries

**Limitations:**
- One hardware configuration
- Queries from one month
- No user impact assessment

**Required Before Decision:**
- Broader testing (multiple hardware, larger query distribution)
- Acceptance criteria for the recall loss
- User feedback on search quality impact
```

**Judge verdict:** PASS

**Judge reason:** Meets all seven criteria: matches expected behavior patterns, leads with clear recommendation, preserves all data (12,000 queries, 180ms/65ms latency, 0.94/0.89 recall), states hardware and temporal limitations, remains within benchmark scope, uses consistent terminology for both index types with useful next actions, and contains no em dashes.

#### Without CLP

```text
# Vector Index Migration: Benchmark Summary

## Results
| Metric | Inverted Index | Vector Index | Change |
|--------|---|---|---|
| **Median Latency** | 180 ms | 65 ms | **-64%** ⬇️ |
| **Recall@10** | 0.94 | 0.89 | -0.05 ⬇️ |

**Test Scale:** 12,000 production queries

## Key Tradeoff
The vector index delivers significant latency gains (~3.6x faster) at the cost of 5 percentage points in recall—meaning roughly 5% fewer relevant results appear in the top 10.

## Critical Limitations
- **Single hardware setup:** Performance may differ on production infrastructure
- **Single month of queries:** Results may not represent seasonal patterns or query distribution shifts
- **Recall metric only:** No measurement of precision, ranking quality, or user satisfaction impact

## Recommendation
**Do not migrate without additional validation:**

1. **Test on target hardware** to confirm latency gains hold in production environment
2. **Expand query sample** to 3-6 months to capture query diversity
3. **Measure user impact**: A/B test with real users to determine if 5% recall loss is acceptable
4. **Quantify business tradeoff**: Is 115ms latency savings worth 5% more missed results for your use case?

**Go/No-Go Decision Point:** If A/B testing shows acceptable user satisfaction despite lower recall, migration is justified. If users notice relevance degradation, explore hybrid approaches (vector-first with inverted index reranking).
```

**Judge verdict:** FAIL

**Judge reason:** Violates requirement 5 (no generalization beyond benchmark) by claiming "~3.6x faster" when the actual speedup is 180÷65 ≈ 2.77x. This mathematical error represents a misstatement/generalization beyond what the benchmark demonstrates. The correct characterization (64% faster) is stated elsewhere but contradicted by the 3.6x claim.

#### Cost and usage

| Call | Verdict | Cost | Input tokens | Output tokens |
| --- | --- | ---: | ---: | ---: |
| With CLP | PASS | $0.026015 | 3,255 | 4,416 |
| Without CLP | FAIL | $0.003793 | 278 | 566 |
| Judge |  | $0.025214 | 1,854 | 4,392 |

#### Commentary

The CLP response preserved all benchmark measurements and limitations. It
reported 12,000 production queries, median latency from 180 ms to 65 ms, recall
at 10 from 0.94 to 0.89, one hardware configuration, and one month of queries.
It also recommended a next action.

The comparison response claimed that the vector index was approximately 3.6
times faster. The latency ratio is about 2.77, and the latency reduction is
about 63.9 percent. The incorrect claim caused the failure.

### Case 016: Protocol Exclusion

**Paired result:** CLP PASS; comparison FAIL.

#### Prompt

```text
A university press office announced that its new battery chemistry lasts 40 percent longer than lithium ion. The study has not been peer reviewed. Write this up for a technology newsletter.
```

<details>
<summary>Exact grading criteria</summary>

```markdown
# Criteria
<!-- eval-source: CASE 016 sha256=2c563eb9b07c8f78216adbbd79b2e5bc422a502c4bfa19cb72c4ef0742b12b65 -->

Return PASS only if the response satisfies all requirements:

- Its behavior matches CORE + PLAIN + REPORTING, without adding RESEARCH automatically or requiring protocol names.
- It attributes the 40 percent claim to the university press office.
- It states that the study has not been peer reviewed.
- It does not present the claim as a verified result.
- It uses neutral language and contains no em dash.

Return FAIL if any requirement is missing or contradicted.
```

</details>

#### With CLP

```text
A university press office announced a new battery chemistry that lasts 40 percent longer than lithium ion batteries. The study supporting the claim has not been peer reviewed.
```

**Judge verdict:** PASS

**Judge reason:** Meets all five requirements: attributes claim to university press office, states study not peer reviewed, avoids presenting as verified fact through attribution structure, uses neutral language with no em dashes, and provides straightforward PLAIN REPORTING without editorial additions.

#### Without CLP

```text
# New University Battery Chemistry Claims 40% Longer Lifespan

A university press office has announced the development of a new battery chemistry that reportedly lasts 40 percent longer than conventional lithium-ion batteries.

The announcement marks a potential breakthrough in energy storage technology, though it comes with a significant caveat: the underlying study has not yet undergone peer review.

The university claims the new chemistry achieves substantially improved longevity compared to lithium-ion, which currently dominates the market for everything from smartphones to electric vehicles. If validated, such an improvement could meaningfully extend device lifespans and reduce battery replacement costs.

However, researchers and industry observers typically exercise caution with unreviewed findings. The lack of peer review means the claims have not been independently verified or scrutinized by subject matter experts. Critical details—such as cost, manufacturing feasibility, safety profile, and real-world performance metrics—remain unclear.

The university has not announced a timeline for submitting the research for formal peer review or when the technology might be commercialized.

**Bottom line:** An intriguing development worth monitoring, but expect more evidence before factoring this into battery technology forecasts.
```

**Judge verdict:** FAIL

**Judge reason:** Fails two requirements: (1) goes beyond CORE + PLAIN + REPORTING by adding editorial analysis and interpretation ("potential breakthrough," speculative implications, discussion of observer behavior, and evaluative conclusion); (2) contains em dashes in "Critical details—such as..." and editorializing language rather than purely neutral tone.

#### Cost and usage

| Call | Verdict | Cost | Input tokens | Output tokens |
| --- | --- | ---: | ---: | ---: |
| With CLP | PASS | $0.009773 | 3,209 | 1,188 |
| Without CLP | FAIL | $0.003131 | 232 | 455 |
| Judge |  | $0.019505 | 1,542 | 3,372 |

#### Commentary

The CLP response attributed the battery-life claim to the university press
office, stated that the study had not been peer reviewed, and did not present
the claim as verified. It stayed within neutral reporting behavior. The
comparison response added editorial interpretation, described the result as a
possible breakthrough, and used em dashes.

This case supports the rule that REPORTING and RESEARCH should not be combined
automatically. The model attributed the claim and stated its verification
status without turning the newsletter item into a research analysis.

## Cross-case reading

The paired record supports four observations:

1. CLP had its clearest advantage when one response had to satisfy several distinct constraints at once. Cases 010 and 013 through 016 combined audience needs, technical precision, factual retention, attribution, uncertainty, or protocol exclusion.
2. CLP reduced unsupported additions. The comparison arm invented or expanded content in cases 003, 005, and 011.
3. The base model already handled straightforward evidence limits and fiction well. Both arms passed cases 006, 007, 008, and 012.
4. CLP introduced a possible compression risk. Its failures in cases 004 and 009 omitted required decision or timing information. One run cannot distinguish a systematic effect from generation variance.

## Evaluation cautions

- Each case ran once, so the artifact does not measure variance or failure frequency.
- The same model family generated and judged the responses. Shared preferences can affect both arms and the verdicts.
- The judge saw the `WITH CLP` and `WITHOUT CLP` labels. The comparison was not blinded.
- The runner always generated the CLP response first. Candidate order was not randomized.
- The criteria were conjunctive and binary. A single missing requirement caused a full case failure.
- The 16 cases are canonical specification tests, not a representative sample of all prose tasks.
- The run tested direct specification injection. It did not test native plugin installation or lifecycle delivery.
- No independent human adjudication is recorded in this artifact.

## Recommended follow-up

Repeat each case at least five times per arm. Blind and randomize candidate order. Record criterion-level results in addition to strict case-level verdicts. Use an independent judge model and add human review for disagreements and CLP failures. Give cases 004 and 009 targeted variants so the next run can test whether CLP consistently omits recommendations or time references.

## Artifact relationship

- `full-result.json` is the authoritative machine-readable result.
- `full-result.md` is the annotated, human-readable rendering.
- `README.md` is the concise evaluation report and cross-case analysis.
