# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this repository is

A prose specification. The deliverable is the text in `CLP.txt`, and most
changes are edits to plain-text specification files. There is no build, no
test runner, and no lint step.

A few scripts are the exception. `hooks/clp-context.js` packages the
specification as a Claude Code plugin, `evals/check-compatibility.js` checks
the structure of `CLP.txt`, and the two scripts in `statusline` print a badge.
None of them has dependencies, so there is still nothing to install or
compile.

## Architecture

Three files that depend on each other in one direction:

- `CLP.txt` is the source of truth. Section 1 sets the conflict priority
  (accuracy, user instructions, domain requirements, CLP rules, style).
  Section 2 sets global rules that apply to all output. Section 3 maps a task
  type to a protocol set for automatic selection. Sections 4 through 12 define
  one protocol each. Section 13 explains composition. Section 14 is the
  pre-return checklist.
- `AGENTS.md` is the entry point that routes an agent to `CLP.txt`. It carries
  no rules of its own beyond precedence and scope.
- `evals/cases.txt` tests `CLP.txt`. Each case names an expected protocol set
  or a check list, and the checks map back to specific rules in the
  specification.
- `hooks/clp-context.js` is a `UserPromptSubmit` hook that injects the global
  rules into every turn. It parses section 2 out of `CLP.txt` at run time
  rather than storing its own copy, so the rules cannot drift. The parser
  looks for the exact heading `2. GLOBAL RULES` and collects the lines that
  start with `*`. If you change that heading or the bullet format, update the
  parser. `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`
  register the hook.
- `statusline/clp-statusline.sh` and `statusline/clp-statusline.ps1` print a
  badge showing whether CLP is active. They test whether the hook's
  `.clp-inactive` flag file exists and never read its contents, so the flag
  cannot inject terminal escape sequences. If you rename the flag file, update
  both scripts and the hook together. These are wired through the `statusLine`
  key in `settings.json`, not through the plugin manifest, so installing the
  plugin does not enable them.
- `evals/check-compatibility.js` checks the structure of `CLP.txt`. It parses
  the `COMPATIBLE WITH` and `DO NOT AUTOMATICALLY COMBINE WITH` blocks and the
  section 3 selection map, so it depends on the exact section header and block
  formats described above.

Protocols are designed to compose, so a rule belongs in exactly one protocol.
`CORE` holds general efficiency, `PLAIN` holds comprehension and order,
`TECHNICAL` holds terminology and procedure, and so on. Before you add a rule,
check whether an existing protocol already governs that concern. Duplicating a
rule across protocols is the main failure mode for this design.

`FICTION`, `CONTINUITY`, and `DIALOGUE` form a separate group. `FICTION` must
not be combined automatically with `TECHNICAL`, `REPORTING`, or `EXECUTIVE`,
because those protocols would strip the voice that `FICTION` protects.

## Editing rules

Keep the files consistent. If you add, rename, or remove a protocol, update the
selection map in section 3, the compatibility lists in the affected protocol
sections, the protocol list in `README.md`, and the relevant cases in
`evals/cases.txt`. Then run `node evals/check-compatibility.js`.

Compatibility is symmetric. If protocol A lists B, then B must list A. When two
protocols must not be combined automatically, mark the pair in both sections
with a `DO NOT AUTOMATICALLY COMBINE WITH` block and explain the choice in
section 13, so a deliberate exclusion does not read as an omission.

Every protocol section follows the same shape: `PURPOSE`, an optional
`INFLUENCE`, `COMPATIBLE WITH`, `RULES`, then a `BEFORE` and `AFTER` pair.
Section headers use a row of `=` above and below, and the underline matches the
header text. Match the existing format exactly.

`CLP.txt` and `evals/cases.txt` are `.txt` because they are meant to be pasted
into a model context as raw text. Do not convert them to Markdown.

## Em dashes

The specification bans em dashes in CLP output, and `README.md` and `CLP.txt`
follow that rule. `evals/cases.txt` case 011 contains em dashes on purpose:
they are the test fixture. Do not remove them.

## Running the evals

The prose cases have no automated runner. To evaluate a change, give a model
`CLP.txt`, then feed it the `INPUT` from a case in `evals/cases.txt` and
confirm the output satisfies that case's `CHECK` list and its
`EXPECTED PROTOCOLS`.

The structure of `CLP.txt` is checked automatically:

```
node evals/check-compatibility.js
```

It verifies that every `COMPATIBLE WITH` declaration is reciprocal, that every
protocol named in the selection map exists, that every set in the map is
pairwise compatible, and that no set contains a pair marked
`DO NOT AUTOMATICALLY COMBINE WITH`. It exits 1 on failure. Non-composable
pairs that carry no marker are listed for information and do not fail the run.
