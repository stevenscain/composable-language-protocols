# Composable Language Protocols (CLP)

Composable Language Protocols is an experimental method for
selecting and combining small language protocols for LLM-generated prose.

Created by Steve Cain.

## What this repository contains

| File | Purpose |
| --- | --- |
| `CLP.txt` | The specification. Priority order, global rules, protocol selection, and the nine protocols. |
| `AGENTS.md` | Instructions that tell a coding agent to read `CLP.txt` before it works on prose. |
| `evals/cases.txt` | Sixteen evaluation cases that test protocol selection, composition, global constraints, and rule conflicts. |
| `evals/check-compatibility.js` | Structural checks for `CLP.txt`. Verifies that compatibility declarations are reciprocal and that every protocol set in the selection map is legal. |
| `.claude-plugin/` | Plugin and marketplace manifests for the Claude Code plugin. |
| `hooks/clp-context.js` | The hook that injects the global rules into every turn. |
| `statusline/` | Optional status line scripts, for bash and PowerShell, that show whether CLP is active. |

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

## Claude Code plugin

`AGENTS.md` loads once at the start of a session. As a conversation grows, that
instruction sits further from the current turn and the model can stop applying
it. The plugin solves this by injecting the global rules on every prompt.

```
/plugin marketplace add stevenscain/composable-language-protocols
/plugin install clp@composable-language-protocols
```

The hook reads the global rules from `CLP.txt` at run time, so the injected
text cannot drift from the specification. It also tells the model whether you
named protocols, for example `CLP: TECHNICAL + RESEARCH`, or whether it should
use automatic selection.

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
