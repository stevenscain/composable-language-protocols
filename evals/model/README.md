# Executable model evaluations

Each numbered directory converts one case from `evals/cases.txt` into Claude's
native plugin evaluation format. Every case contains a prompt and one or more
Markdown graders. Each grader contains a hash of its canonical source case.

Run the structural check without model calls:

```powershell
node evals/check-model-evals.js
node evals/check-model-evals-tests.js
```

The first command compares prompts and source fingerprints. The second command
proves that four alignment defects fail validation.

Run the model evaluations against the current checkout:

```powershell
node evals/run-model-evals.js
```

The runner uses one run per case, Haiku for generation and judging, a USD 5
cost limit, and a no-plugin comparison arm. Override the target or other
defaults with the
`CLP_EVAL_RUNS`, `CLP_EVAL_MODEL`, `CLP_EVAL_JUDGE_MODEL`,
`CLP_EVAL_MAX_COST_USD`, and `CLP_EVAL_TARGET` environment variables.

Claude plugin evaluations are an early-access feature. The installed Claude
CLI and account must support `claude plugin eval`.

If the native command is unavailable, run the standard CLI fallback:

```powershell
node evals/run-cli-baseline.js evals/baselines/YYYY-MM-DD-haiku
```

The fallback uses isolated with-CLP and without-CLP arms, structured judging,
case checkpoints, a USD 5 total limit, and a USD 0.25 per-call limit. Override
the defaults with `CLP_EVAL_MODEL`, `CLP_EVAL_JUDGE_MODEL`,
`CLP_EVAL_MAX_COST_USD`, `CLP_EVAL_MAX_CALL_COST_USD`, and
`CLP_EVAL_TIMEOUT_MS`.
