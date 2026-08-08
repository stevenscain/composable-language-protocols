# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this repository is

A prose specification, not an application. There is no build, no test runner,
no lint step, and no dependencies. The deliverable is the text in `CLP.txt`.
Changes are edits to plain-text specification files.

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

Protocols are designed to compose, so a rule belongs in exactly one protocol.
`CORE` holds general efficiency, `PLAIN` holds comprehension and order,
`TECHNICAL` holds terminology and procedure, and so on. Before you add a rule,
check whether an existing protocol already governs that concern. Duplicating a
rule across protocols is the main failure mode for this design.

`FICTION`, `CONTINUITY`, and `DIALOGUE` form a separate group. `FICTION` must
not be combined automatically with `TECHNICAL`, `REPORTING`, or `EXECUTIVE`,
because those protocols would strip the voice that `FICTION` protects.

## Editing rules

Keep the three files consistent. If you add, rename, or remove a protocol,
update the selection map in section 3, the compatibility lists in the affected
protocol sections, the protocol list in `README.md`, and the relevant cases in
`evals/cases.txt`.

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

There is no automated runner. To evaluate a change, give a model `CLP.txt`,
then feed it the `INPUT` from a case in `evals/cases.txt` and confirm the
output satisfies that case's `CHECK` list and its `EXPECTED PROTOCOLS`.
