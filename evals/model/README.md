# Executable model evaluations

Each numbered directory converts one case from `evals/cases.txt` into Claude's
native plugin evaluation format. Every case contains a prompt and one or more
Markdown graders.

Run the structural check without model calls:

```powershell
node evals/check-model-evals.js
```

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
