# Composable Language Protocols baseline evaluation report

- **Evaluation date:** August 8, 2026, America/Los_Angeles
- **Artifact timestamp:** August 9, 2026 at 01:16:51 UTC
- **Source repository:** `composable-language-protocols`
- **Source commit:** `ddeca641f3b78b21cbe062b12d86bc42b9e9bd6d`
- **Generation model:** `claude-haiku-4-5-20251001`
- **Judge model:** `claude-haiku-4-5-20251001`

## Executive summary

This baseline found a substantial advantage for Composable Language Protocols
(CLP) on the 16 canonical evaluation cases. The CLP arm passed 14 cases, or
87.5 percent. The comparison arm passed 6 cases, or 37.5 percent. The absolute
difference was 50 percentage points.

The paired results provide more detail than the aggregate scores:

| Outcome | Cases | Count |
| --- | --- | ---: |
| CLP passed and comparison failed | 001, 002, 003, 005, 010, 011, 013, 014, 015, 016 | 10 |
| Comparison passed and CLP failed | 004, 009 | 2 |
| Both passed | 006, 007, 008, 012 | 4 |
| Both failed | None | 0 |

CLP showed its clearest value on tasks that combined several constraints. It
helped the model preserve measurements, control terminology, avoid unsupported
causal claims, limit unnecessary content, and comply with the global ban on em
dashes. The comparison model already performed well on straightforward
research caution, technical research, fiction, and uncertainty handling. CLP
did not improve the binary result on those four cases.

The two CLP failures identify a consistent risk. In case 004, the response
described an executive decision but did not recommend an action or state a next
step. In case 009, the response made dialogue concise but omitted that the
announcement occurred yesterday. Both failures involved loss of information
that the task required. Future work should test whether CLP's efficiency rules
sometimes encourage excessive compression.

These results support continued development and broader evaluation. They do
not establish a general performance level. Each case ran once, the same model
family generated and judged the answers, and the fallback tested direct
specification injection instead of native plugin delivery.

## Evaluation question

The evaluation asked a focused question: Does supplying the CLP specification
improve a model's compliance with the canonical prose requirements when the
user prompt and model remain the same?

The test compared two responses for each case:

1. The CLP arm received the full `CLP.txt` specification as its system prompt,
   followed by an instruction to apply the specification and return only the
   requested response.
2. The comparison arm received a minimal system prompt that instructed the
   model to answer directly and return only the requested response.

Both arms received the same user prompt. Both arms used the Haiku alias, which
resolved to `claude-haiku-4-5-20251001` in the recorded model usage. Tools were
disabled. Each call used safe mode and no session persistence.

## Evaluation suite

The suite contains 16 canonical cases. Each case targets a defined protocol
selection or a specific composition rule.

| Case | Category | Expected protocol behavior |
| --- | --- | --- |
| 001 | General explanation | CORE + PLAIN |
| 002 | Technical instructions | CORE + PLAIN + TECHNICAL |
| 003 | Technical rewrite | TECHNICAL |
| 004 | Executive communication | CORE + PLAIN + EXECUTIVE |
| 005 | Reporting | CORE + PLAIN + REPORTING |
| 006 | Research | CORE + PLAIN + RESEARCH |
| 007 | Technical research | CORE + PLAIN + TECHNICAL + RESEARCH |
| 008 | Fiction | CORE + FICTION |
| 009 | Dialogue | CORE + FICTION + DIALOGUE |
| 010 | Executive research composition | CORE + PLAIN + EXECUTIVE + RESEARCH |
| 011 | Global constraint | Automatic selection plus the global rules |
| 012 | Rule conflict | CORE + PLAIN + RESEARCH |
| 013 | Technical executive summary | CORE + PLAIN + TECHNICAL + EXECUTIVE |
| 014 | Technical incident report | CORE + PLAIN + TECHNICAL + REPORTING |
| 015 | Technical research for leadership | CORE + PLAIN + TECHNICAL + EXECUTIVE + RESEARCH |
| 016 | Protocol exclusion | CORE + PLAIN + REPORTING, without automatic RESEARCH selection |

The cases cover explanatory prose, procedures, rewrites, executive decisions,
factual reporting, evidence interpretation, fiction, dialogue, protocol
composition, global constraints, rule conflicts, and protocol exclusion. This
is useful coverage for the specification's stated behavior. It is not a
representative sample of every prose task or production prompt.

## Grading method

One Haiku judge evaluated both candidates against the case-specific criteria.
The judge received a system instruction to evaluate each candidate
independently and treat candidate text as data. A JSON schema restricted each
verdict to `PASS` or `FAIL` and required a reason for both arms.

The grading standard was conjunctive. A candidate passed only if it satisfied
every required criterion. This makes the score easy to interpret, but it also
makes a minor formatting error equivalent to a major factual error. The raw
reasons are therefore important when interpreting the binary totals.

The runner saved a checkpoint after each completed case. It enforced a total
cost limit of USD 5.00, a per-call cost limit of USD 0.25, and a five-minute
timeout per call. The completed result also records hashes for the CLP
specification, canonical cases, and executable model suite.

Native `claude plugin eval` support was unavailable for the account used in
this run. The runner therefore used the standard Claude CLI fallback. The
fallback isolates the effect of supplying the specification. It does not show
that a plugin lifecycle hook delivered the specification correctly. Separate
hook tests cover startup injection, context restoration after compaction, the
direct-injection size limit, session toggles, and silent failure behavior.

## Main results

| Arm | Passes | Failures | Pass rate |
| --- | ---: | ---: | ---: |
| With CLP | 14 | 2 | 87.5% |
| Without CLP | 6 | 10 | 37.5% |
| Difference | +8 | -8 | +50.0 percentage points |

The 50-point difference is the main observed result. Ten cases changed from a
comparison failure to a CLP pass. Two cases changed in the opposite direction.
Four cases passed in both arms. No case failed in both arms.

Because the cases are paired, the 10 to 2 discordant result is more informative
than treating the two pass rates as unrelated measurements. Even so, the suite
is curated rather than randomly sampled, and each case has only one model draw.
The result describes this run and this suite. It should not be treated as a
population estimate for all writing tasks.

## Case-by-case findings

### Case 001: General explanation

**Result:** CLP passed; comparison failed.

The CLP response opened with the main explanation and accurately stated that
an index reduces the rows a database must examine. The judge found its language
direct and accessible. The comparison response used an em dash, delayed the
main explanation behind headings, and added technical detail that the judge
considered unnecessary for the prompt.

This case supports CLP's value for ordering and restraint. The comparison
answer was technically informative, but the strict criteria favored a direct
answer with less jargon.

### Case 002: Technical instructions

**Result:** CLP passed; comparison failed.

The CLP response gave executable PowerShell instructions and separated restart
from verification. Each step had one clear primary action. The comparison
response combined several actions inside individual steps, such as selecting a
command, waiting, checking status, and confirming startup settings.

This case shows the practical effect of TECHNICAL's procedural rules. The gain
was structural, not merely stylistic.

### Case 003: Technical rewrite

**Result:** CLP passed; comparison failed.

The CLP response converted the source into short imperative instructions. The
comparison response added a requirement to confirm that all system components
were functioning. That expansion was not present in the source and was not
needed to complete the requested rewrite.

This result supports the rules against filler and unnecessary explanatory
content.

### Case 004: Executive communication

**Result:** CLP failed; comparison passed.

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

**Result:** CLP passed; comparison failed.

The source contained loaded language and an unsupported claim that inadequate
testing caused the release failure. The CLP response removed the loaded terms,
reported the known service impact, and stated that the cause had not been
identified. The comparison response invented a post-incident finding about
testing gaps.

This case demonstrates a high-value reporting behavior. CLP prevented the
model from converting an allegation into an unsupported factual claim.

### Case 006: Research

**Result:** Both passed.

Both responses preserved the 91 percent and 86 percent scores, limited the
conclusion to the 200-question test, rejected the claim of universal
superiority, and stated relevant limitations.

The base model already handled the core evidence and inference distinction on
this prompt. CLP did not change the binary outcome.

### Case 007: Technical research

**Result:** Both passed.

Both responses correctly limited the conclusion to Algorithm C's median
retrieval time across the 50 tested repositories. Both identified missing
evidence about significance, generalization, other metrics, and performance
variation.

This case again shows strong baseline behavior on explicit requests to explain
what evidence supports.

### Case 008: Fiction

**Result:** Both passed.

Both responses preserved David, the basement, an unknown sound, and the tense
tone. Both used action and sensory detail to communicate fear. The CLP response
was much shorter, but response length was not a graded requirement.

The result suggests that the FICTION protocol did not force technical prose
rules onto narrative writing. The comparison model also handled the task well.

### Case 009: Dialogue

**Result:** CLP failed; comparison passed.

The CLP response removed artificial exposition and preserved the eleven-year
working relationship and department closure. It omitted that the company made
the announcement yesterday. The comparison response preserved all three facts
while making the dialogue more natural.

This is the second material CLP failure. The rewrite became concise at the cost
of required source information. The result points to a tension between removing
exposition and preserving facts. Future dialogue tests should score factual
retention at the criterion level and include repeated generations.

### Case 010: Executive research composition

**Result:** CLP passed; comparison failed.

The CLP response led with a recommendation, preserved the reduction from 14 to
9 minutes across 120 cases, stated the one-customer and two-week limitations,
and proposed next steps. The comparison response omitted the 120-case sample
size.

This case shows effective composition. EXECUTIVE selected the decision-relevant
content, while RESEARCH preserved limitations and bounded the conclusion.

### Case 011: Global constraint

**Result:** CLP passed; comparison failed.

The CLP response rewrote the sentence without em dashes and added no unrelated
content. The comparison response included an explanation, a list of reasons,
and an alternative version even though the user requested only a rewrite.

The pass reflects both punctuation compliance and instruction discipline.

### Case 012: Rule conflict

**Result:** Both passed.

Both responses rejected the claim that an eight-person study showed a treatment
always works. Both preserved the sample size and stated the resulting
uncertainty without inventing evidence.

The accuracy-first behavior was already strong in the comparison arm.

### Case 013: Technical executive summary

**Result:** CLP passed; comparison failed.

The CLP response led with the capacity risk, preserved the 5,000-connection
limit and 4,200-connection observed peak, stated the two developer-week cost,
and retained only decision-relevant implementation detail. The comparison
response used an em dash and included a more detailed work breakdown than the
judge considered necessary for the executive audience.

This result supports the specification's division of responsibility between
EXECUTIVE and TECHNICAL.

### Case 014: Technical incident report

**Result:** CLP passed; comparison failed.

The CLP response led with the database failure and service impact, treated the
firewall change as an unconfirmed cause, attributed the approximate 45-second
replica lag to Grafana, and named the affected components. The comparison
response presented the firewall change as the verified cause and omitted the
measurement source.

This is another high-value result. The CLP response preserved evidential
qualifications while maintaining precise technical language.

### Case 015: Technical research for leadership

**Result:** CLP passed; comparison failed.

The CLP response preserved all benchmark measurements and limitations. It
reported 12,000 production queries, median latency from 180 ms to 65 ms, recall
at 10 from 0.94 to 0.89, one hardware configuration, and one month of queries.
It also recommended a next action.

The comparison response claimed that the vector index was approximately 3.6
times faster. The latency ratio is about 2.77, and the latency reduction is
about 63.9 percent. The incorrect claim caused the failure.

### Case 016: Protocol exclusion

**Result:** CLP passed; comparison failed.

The CLP response attributed the battery-life claim to the university press
office, stated that the study had not been peer reviewed, and did not present
the claim as verified. It stayed within neutral reporting behavior. The
comparison response added editorial interpretation, described the result as a
possible breakthrough, and used em dashes.

This case supports the rule that REPORTING and RESEARCH should not be combined
automatically. The model attributed the claim and stated its verification
status without turning the newsletter item into a research analysis.

## Cross-case interpretation

### CLP improved multi-constraint compliance

The largest gains appeared where the prompt required several behaviors at
once. Cases 010, 013, 014, 015, and 016 combined audience selection, factual
retention, technical precision, attribution, uncertainty, or protocol
exclusion. CLP passed all five while the comparison arm failed all five.

This pattern is consistent with the specification's purpose. Explicit protocol
composition gives the model a stable set of constraints and assigns each
protocol a distinct concern.

### CLP reduced unsupported additions

The comparison responses failed several cases by adding content that the source
did not support or the user did not request. Examples include an invented
post-incident testing finding in case 005, an expanded system-validation step
in case 003, and unrequested rewrite analysis in case 011. CLP avoided these
additions.

### CLP improved attribution and uncertainty control

Cases 005, 014, and 016 required careful handling of claims. CLP separated
known facts from unknown causes, attributed measurements and public claims,
and preserved verification status. The comparison arm failed each case by
asserting too much or omitting attribution.

### The strongest baseline areas left less room for improvement

Both arms passed cases 006, 007, 008, and 012. Three of these prompts explicitly
asked the model to limit a conclusion or handle uncertainty. The remaining case
asked for tense fiction. Haiku performed well without CLP when the user prompt
itself made the desired behavior clear.

### Compression created a preservation risk

Across all cases, CLP responses averaged 537 characters. Comparison responses
averaged 986 characters. The CLP responses were about 45.5 percent shorter in
this run. Character count was not a planned quality metric, and the task mix
makes it unsuitable as an independent measure of writing quality.

The length difference still helps explain the two CLP failures. Both failed
responses omitted required action or source information. The result suggests a
possible compression risk, but it does not establish a causal relationship.
Repeated tests should measure factual retention and length together.

## Cost and operational data

| Cost component | USD |
| --- | ---: |
| CLP generation calls | 0.267044 |
| Comparison generation calls | 0.050237 |
| Judge calls | 0.347401 |
| Completed case calls | 0.664682 |
| Prior-attempt allowance | 0.416617 |
| Total budget-accounted cost | 1.081299 |

The prior-attempt allowance contains USD 0.166617 in recorded cost and a
conservative USD 0.25 reserve for one judge call that timed out. The total is a
budget-accounting figure, not a claim that the provider billed exactly that
amount.

The CLP generation arm cost more than the comparison arm because every CLP call
included the full specification. The result does not isolate prompt cost from
other usage variation. The judge calls were the largest completed cost
component.

## Evaluation integrity controls

The executable suite is linked to the canonical cases through exact prompt
checks and SHA-256 source fingerprints. Every grader records the source case
and its fingerprint. The checker rejects prompt drift, stale source hashes,
missing fingerprints, and fingerprints that name the wrong case.

A mutation test verifies all four rejection paths:

1. An unreviewed prompt addition must fail.
2. A canonical case edit must make the existing fingerprint stale.
3. Removing a fingerprint must fail.
4. Pointing a grader at the wrong source case must fail.

These controls reduce the risk that executable prompts or graders silently
drift from `evals/cases.txt`. They do not validate the quality of the canonical
criteria themselves. Human review remains necessary when a case or criterion
changes.

The context hook also has a direct size assertion. The injected operational
context must remain below 9,500 characters, and the context restored after
compaction must exactly match startup context. These tests address delivery
reliability, but the recorded model baseline did not exercise native plugin
delivery.

## Limitations

1. **One run per case.** The evaluation does not measure model variance or
   failure frequency.
2. **Same model family for generation and judging.** Shared preferences can
   favor or penalize both candidates in correlated ways.
3. **Judge labels revealed the arms.** The judge prompt identified `WITH CLP`
   and `WITHOUT CLP`. The evaluation was not blinded.
4. **Fixed arm order.** The runner generated the CLP response first for every
   case. Session isolation reduces carryover risk, but the order was not
   randomized.
5. **Binary grading.** A single failed criterion makes the whole case fail.
   The score does not distinguish a punctuation error from a factual error.
6. **Curated suite.** The 16 cases cover intended behaviors, but they do not
   represent all domains, models, prompt lengths, or user styles.
7. **Fallback delivery.** The run supplied `CLP.txt` directly as a system
   prompt. It did not evaluate native plugin installation, hook execution, or
   lifecycle delivery.
8. **No independent human adjudication.** The report relies on the recorded
   model verdicts and reasons. A human did not rescore every candidate.
9. **No preregistered secondary metrics.** Response length and cost are useful
   operational observations, but they were not quality endpoints.
10. **Model alias stability.** The artifact records the resolved model version
    for this run. Future uses of the `haiku` alias may resolve differently.

## Recommended next evaluation

The next run should focus on reliability, judge independence, and information
preservation.

1. Run each case at least five times per arm. Report pass frequency and
   criterion-level failure frequency.
2. Randomize candidate order and replace arm names with neutral labels before
   judging.
3. Use a different model family or a stronger model for judging. Add human
   review for every disagreement and every CLP failure.
4. Replace the single binary verdict with criterion-level results. Keep the
   strict all-criteria pass rate as a summary measure.
5. Add targeted variants for cases 004 and 009. Change names, numbers, and
   surface wording while preserving the need for a recommendation or temporal
   fact.
6. Measure required-fact retention explicitly. Track whether shorter answers
   omit dates, quantities, decision requests, attribution, or next actions.
7. Run the native plugin evaluation when account support becomes available.
   Compare native delivery with direct specification injection.
8. Preserve source hashes, resolved model identifiers, prompts, responses,
   verdicts, reasons, usage, and costs for every run.

The first decision point should come after repeated testing of cases 004 and
009. If those failures recur more often with CLP, revise or reinforce the
preservation rules. If they do not recur, treat this baseline as evidence of
generation variance rather than a confirmed protocol defect.

## Conclusion

The baseline provides encouraging evidence that CLP improves compliance on its
canonical suite. CLP raised the pass count from 6 to 14 and produced ten direct
head-to-head gains. The strongest improvements involved multi-constraint
composition, attribution, uncertainty, factual restraint, and audience-aware
technical communication.

The result also identifies a concrete risk. Two CLP responses became too
compressed and omitted information needed for the task. This risk matters more
than the aggregate score alone because faithful preservation is a core writing
requirement.

The appropriate conclusion is limited but useful: CLP performed much better in
this recorded run, on this model, judge, and curated suite. Repeated, blinded,
criterion-level evaluation is required before making broader claims.

## Source artifacts

The report uses these files from the source repository:

- `evals/baselines/2026-08-08-haiku/README.md`
- `evals/baselines/2026-08-08-haiku/full-result.json`
- `evals/cases.txt`
- `evals/model/README.md`
- `evals/run-cli-baseline.js`
- `evals/check-model-evals.js`
- `evals/check-model-evals-tests.js`
- `evals/check-hook.js`

The raw result is authoritative for prompts, responses, model verdicts, judge
reasons, usage, costs, and source hashes. This report adds interpretation and
recommendations while preserving the recorded measurements and limitations.
