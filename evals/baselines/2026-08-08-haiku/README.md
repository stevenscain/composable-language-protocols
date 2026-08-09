# CLI baseline evaluation

This baseline compares one response with CLP against one response without CLP
for each of the sixteen canonical cases. The native `claude plugin eval`
command was unavailable for this account, so this run supplied `CLP.txt` as
the with-CLP system prompt. The hook test separately validates plugin delivery.

## Results

| Arm | Passed | Score |
| --- | ---: | ---: |
| With CLP | 14/16 | 87.5% |
| Without CLP | 6/16 | 37.5% |

Score delta: 50.0%.

| Case | With CLP | Without CLP |
| --- | --- | --- |
| 001 | PASS | FAIL |
| 002 | PASS | FAIL |
| 003 | PASS | FAIL |
| 004 | FAIL | PASS |
| 005 | PASS | FAIL |
| 006 | PASS | PASS |
| 007 | PASS | PASS |
| 008 | PASS | PASS |
| 009 | FAIL | PASS |
| 010 | PASS | FAIL |
| 011 | PASS | FAIL |
| 012 | PASS | PASS |
| 013 | PASS | FAIL |
| 014 | PASS | FAIL |
| 015 | PASS | FAIL |
| 016 | PASS | FAIL |

## CLP failures

| Case | Judge finding |
| --- | --- |
| 004 | The response described the decision but did not recommend an action or give a next step. |
| 009 | The response preserved the eleven-year relationship and closure but omitted that the announcement occurred yesterday. |

## Run details

- Date: 2026-08-09T01:16:51.281Z
- Generation model: haiku
- Judge model: haiku
- Runs per case: 1
- Budget-accounted cost: USD 1.081299
- Prior-attempt budget allowance: USD 0.416617. This includes USD 0.166617 in recorded cost and a conservative USD 0.25 reserve for one timed-out judge call.
- Cost limit: USD 5.00
- Per-call cost limit: USD 0.25
- Per-call timeout: 300000 ms
- Raw results: `full-result.json`
- Source hashes: recorded in `full-result.json`

## Limitations

- One run per case does not measure variance.
- The same model family generated and judged the responses.
- The fallback tests the specification's effect, not lifecycle hook loading.
- Model grading can produce false passes or false failures.
