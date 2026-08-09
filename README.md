# Composable Language Protocols (CLP)

Composable Language Protocols is an experimental method for
selecting and combining small language protocols for LLM-generated prose.

Created by Steve Cain.

## What this repository contains

| File | Purpose |
| --- | --- |
| `CLP.txt` | The specification. Priority order, global rules, protocol selection, and the nine protocols. |
| `AGENTS.md` | Instructions that tell a coding agent to read `CLP.txt` before it works on prose. |
| `.codex-plugin/` | The Codex plugin manifest. |
| `evals/cases.txt` | Sixteen evaluation cases that test protocol selection, composition, global constraints, and rule conflicts. |
| `evals/model/` | Executable model evaluations and graders for all sixteen cases. |
| `evals/check-compatibility.js` | Structural checks for `CLP.txt`. Verifies declaration references and reciprocity, then checks every selection-map set. |
| `evals/check-compatibility-tests.js` | Mutation tests that prove the structural checker rejects seven classes of invalid specification. |
| `evals/check-hook.js` | Behavioral checks for lifecycle injection, scoped protocol context, toggles, and silent failure. |
| `evals/check-model-evals.js` | Structural checks that keep the executable model suite aligned with `evals/cases.txt`. |
| `evals/check-packaging.js` | Cross-checks the Claude and Codex manifests, hooks, versions, and license files. |
| `.github/workflows/ci.yml` | GitHub Actions workflow that runs the structural, hook, packaging, model-definition, and status-line checks. |
| `.claude-plugin/` | Plugin and marketplace manifests for the Claude Code plugin. |
| `hooks/clp-context.js` | The shared lifecycle hook that reads `CLP.txt` and scopes injected context by event and prompt. |
| `hooks/clp-context-codex.js` | The Codex adapter that keeps Codex toggle state separate from Claude. |
| `hooks/hooks.json` | The Codex `SessionStart` and `UserPromptSubmit` hook configuration. |
| `statusline/` | Optional status line scripts, for bash and PowerShell, that show whether CLP is active. |
| `case-studies/` | Records of what happened when CLP was applied to real work, and what the specification got wrong. |
| `CHANGELOG.md` | Release-facing record of notable changes. |
| `RELEASING.md` | Release checklist for versions, validation, tags, and publication. |

## The protocols

Each protocol controls one type of writing. Protocols operate alone or in
compatible combinations.

- `CORE` sets the default writing rules.
- `PLAIN` makes information easy to find, understand, and use.
- `TECHNICAL` produces precise technical information and instructions.
- `EXECUTIVE` helps a decision-maker understand an issue and act on it.
- `REPORTING` reports events and claims with factual discipline.
- `RESEARCH` presents evidence and analysis without overstating conclusions.
- `FICTION` produces narrative prose and protects narrative voice.
- `CONTINUITY` maintains consistency in long-form narrative work.
- `DIALOGUE` produces natural dialogue.

## How to use it

Give the model `CLP.txt`, then name the protocols you want:

```
CLP: TECHNICAL + RESEARCH

Summarize the retrieval benchmark results.
```

If you do not name a protocol, use `CLP AUTO` and the model selects the
smallest sufficient set. Section 3 of the specification lists the automatic
selection map.

To apply CLP across a repository, place `CLP.txt` and `AGENTS.md` at the
repository root. Agents that read `AGENTS.md` will load the specification
before they write, rewrite, summarize, or review prose.

## Automated checks

GitHub Actions runs the structural checker, mutation suite, Claude and Codex
hook tests, packaging checks, model-evaluation definition checks, status-line
tests, and JavaScript syntax checks on every push and pull request. The
workflow uses Node.js 22 and does not install dependencies.

Run the same checks locally:

```powershell
node --check evals/check-compatibility.js
node --check evals/check-compatibility-tests.js
node --check evals/check-hook.js
node --check evals/check-model-evals.js
node --check evals/check-packaging.js
node --check evals/run-model-evals.js
node --check hooks/clp-context.js
node --check hooks/clp-context-codex.js
node evals/check-compatibility.js
node evals/check-compatibility-tests.js
node evals/check-hook.js
node evals/check-packaging.js
node evals/check-model-evals.js
```

## Model evaluations

The `evals/model` directory converts all sixteen cases into Claude's native
plugin evaluation format. Each case contains the source prompt and a grader
that checks the expected protocol behavior and output requirements.

Run one cost-capped generation and grading pass per case:

```powershell
node evals/run-model-evals.js
```

The runner targets the current checkout, uses Haiku for generation and
judging, limits the run to USD 5, keeps the report local, and includes a
no-plugin baseline arm. See
`evals/model/README.md` for environment-variable overrides. Claude plugin
evaluations require a Claude CLI and account that support the early-access
`plugin eval` command.

## Codex plugin

The Codex plugin loads a compact operational form of `CLP.txt` when a session
starts and after context compaction. It omits worked examples but keeps the
priority order, selection map, protocol rules, compatibility declarations,
composition guidance, and final check. Before each prompt, it adds only the
global rules and a short selection reminder. If the prompt names protocols,
it also adds only those protocol sections.

Install the marketplace and plugin:

```powershell
codex plugin marketplace add stevenscain/composable-language-protocols
codex plugin add clp@composable-language-protocols
```

Start a new Codex CLI thread after installation. Run `/hooks`, review the CLP
hook, and trust it. Codex skips new or changed hooks until you trust their exact
definition.

Send `clp off` to disable CLP in Codex. Send `clp on` to enable it again. Codex
stores this setting in the plugin data directory. It does not change the Claude
plugin setting.

## Claude Code plugin

`AGENTS.md` loads once at the start of a session. As a conversation grows, that
instruction sits further from the current turn and the model can stop applying
it. The plugin loads a compact operational form of `CLP.txt` at session start
and after context compaction. Before each prompt, it adds the global rules and
a short selection reminder. If the prompt names protocols, it also adds only
those protocol sections.

```
/plugin marketplace add stevenscain/composable-language-protocols
/plugin install clp@composable-language-protocols
```

The hook derives every injected block from `CLP.txt` at run time, so the text
cannot drift from the specification. Automatic selection uses the map loaded
at session start. It does not classify prompts with a separate keyword list.
For example, `CLP: TECHNICAL + RESEARCH` places those two protocol sections
next to the prompt.

To turn the hook off, send `clp off`. To turn it on again, send `clp on`. The
setting is stored in your Claude configuration directory and persists across
sessions.

Run one writing-style hook at a time. Two plugins that both control style will
give the model conflicting instructions.

### Status line badge

The `statusline` directory holds two scripts that print `[CLP]` when the
protocols are active and `[CLP:OFF]` after you send `clp off`. Both read the
same flag file as the hook, so the badge follows the toggle. Use
`clp-statusline.sh` on macOS and Linux and `clp-statusline.ps1` on Windows.

```
"statusLine": {
  "type": "command",
  "command": "bash /path/to/clp-statusline.sh"
}
```

```
"statusLine": {
  "type": "command",
  "command": "powershell -ExecutionPolicy Bypass -File \"C:\\path\\to\\clp-statusline.ps1\""
}
```

Two things to know before you wire it up. A `statusLine` command replaces the
whole status line, so the badge is all the row will show. And the plugin cache
path contains the version number, so pointing at the installed copy breaks on
the next plugin update. Point at a checkout or a copy you control instead.

## Design rules

Accuracy has priority over style. User instructions have priority over CLP.
When two protocols conflict, the more specific protocol applies. CLP does not
change factual meaning to satisfy a style rule, and it does not apply to
source code unless you ask for it.

## Status

Version 0.1. Experimental. The specification, the protocol set, and the
evaluation cases can change.

See [CHANGELOG.md](CHANGELOG.md) for notable changes and
[RELEASING.md](RELEASING.md) for the release procedure.

## License

Copyright 2026 Steve Cain. Licensed under the Apache License, Version 2.0.
See [LICENSE](LICENSE).
