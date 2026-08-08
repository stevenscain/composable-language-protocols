# Composable Language Protocols (CLP)

Composable Language Protocols is an experimental method for
selecting and combining small language protocols for LLM-generated prose.

Created by Steve Cain.

## What this repository contains

| File | Purpose |
| --- | --- |
| `CLP.txt` | The specification. Priority order, global rules, protocol selection, and the nine protocols. |
| `AGENTS.md` | Instructions that tell a coding agent to read `CLP.txt` before it works on prose. |
| `evals/cases.txt` | Twelve evaluation cases that test protocol selection, composition, global constraints, and rule conflicts. |

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

## Design rules

Accuracy has priority over style. User instructions have priority over CLP.
When two protocols conflict, the more specific protocol applies. CLP does not
change factual meaning to satisfy a style rule, and it does not apply to
source code unless you ask for it.

## Status

Version 0.1. Experimental. The specification, the protocol set, and the
evaluation cases can change.
