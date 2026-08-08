# 001. Enforcing the spec found the bugs in the spec

Date: 2026-08-08
Commits: `04eb510`, `83d054c`

## What happened

CLP was applied to a prose task inside the repository that defines CLP. The
first output violated the specification's hardest global rule, the em dash ban,
while advising the author to write in the voice the specification produces.

The cause was not a weak rule. `AGENTS.md` says to read `CLP.txt` before
writing prose. The model read `README.md`, ran a grep for the `BEFORE` and
`AFTER` example blocks to quote, and never opened `CLP.txt`. It treated the
repository as a subject to analyze rather than as rules governing its own
output, so it never loaded section 2.

The instruction was a pointer to the rules. It was not the rules.

## What changed

A `UserPromptSubmit` hook now injects the literal text of section 2 beside
every message, and reads it out of `CLP.txt` at run time so the injected copy
cannot drift from the source.

Applying the specification properly then exposed three gaps in the
specification itself:

1. `TECHNICAL` could not compose with `EXECUTIVE`, so a technical executive
   summary had no legal protocol set.
2. `TECHNICAL` could not compose with `REPORTING`, so a technical incident
   report had none either.
3. `REPORTING` and `RESEARCH` excluded each other with no marker, so the
   exclusion read like a third omission of the same kind. It was not. The two
   already state six of the same requirements in different words, so the
   exclusion was marked deliberate and explained in section 13.

`evals/check-compatibility.js` was added to catch this class of defect
mechanically. Cases 013 through 016 cover the new compositions and the
exclusion.

## Post text

Ready to publish without edits. 2,199 characters, inside the 3,000 character
LinkedIn limit, and it contains no em dashes.

```text
I wrote a spec that bans em dashes in AI-generated prose.

Then I asked Claude to help me promote it. Its first answer used about a dozen of them, and closed by advising me to "post in the voice the spec produces."

The reason it happened is worth more than the spec.

The repo has an AGENTS.md that says: read CLP.txt before you write prose. The model read the README instead, grepped the spec for example snippets to quote back at me, and never opened the file. It had classified the repository as a subject to analyze, not as rules governing its own output.

The instruction was a pointer. The model never dereferenced it.

That does not get fixed by a better prompt. A pointer to rules is not rules. So I replaced it with a UserPromptSubmit hook that injects the literal rules beside every message, and reads them out of CLP.txt at run time so the injected copy cannot drift from the source.

Then it got interesting.

Once the spec was actually being applied, three gaps surfaced in the spec itself:

1. TECHNICAL could not compose with EXECUTIVE, so "a technical executive summary" had no legal protocol set.

2. TECHNICAL could not compose with REPORTING, so a technical incident report had none either.

3. REPORTING and RESEARCH excluded each other with no marker, so it read like a third omission. It was not. Those two already state six of the same requirements in different words, so I marked the exclusion deliberate and wrote down why.

I had published a specification for composable protocols in which two of the most common real combinations did not compose.

So I shipped a checker. It verifies that every compatibility declaration is reciprocal, that every protocol named in the selection map exists, and that no mapped set pairs two protocols marked non-composable. It exits 1.

Nine protocols. Sixteen evaluation cases. A validator. An installable plugin.

Writing the spec was the easy part. Enforcing it is what found the bugs.

github.com/stevenscain/composable-language-protocols

One thing I keep going back and forth on: there is no PERSUASIVE protocol, no SUPPORT, no LEGAL. Which would you add first?

#SoftwareEngineering #AIEngineering #TechnicalWriting #DeveloperTools
```

## Before you post

Verify the em dash count. "About a dozen" is an approximation taken from the
original response. The exact number is in the session transcript. Replace the
approximation with the exact count if you can retrieve it, because a precise
number is stronger and the claim is checkable.

Every other number is verified. Nine protocols and sixteen cases are in
`README.md`. The three gaps and the checker are in `04eb510`. The exit code is
in `evals/check-compatibility.js`.

Put the repository link in your own first comment as well as in the post. Link
placement is a practitioner convention rather than documented LinkedIn
behavior, so treat it as a hypothesis worth testing rather than a rule.
