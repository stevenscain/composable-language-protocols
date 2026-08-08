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

Ready to publish without edits. 2,744 characters, no em dashes, and a 53
character opening line so the hook clears the feed truncation.

The post spends its middle on what the nine protocols govern before it reports
the bugs. That is deliberate. "TECHNICAL could not compose with REPORTING" is
not a defect a reader can feel unless they already know those are two separate
axes of prose control that a technical incident report needs at the same time.
An earlier draft led with the enforcement mechanism and left the bugs
unintelligible.

```text
I wrote a specification for how AI should write prose.

Nine protocols that compose, a priority order where accuracy outranks style, and sixteen evaluation cases.

Then I asked Claude to help me promote it. Its first answer broke the specification, and closed by advising me to "post in the voice the spec produces."

The rule it broke was the one I would have bet on it keeping. No em dashes. It used about a dozen.

What the spec is matters here, because the failure only makes sense against it.

Prose quality is not one dial. It is several independent concerns, and different tasks need different ones. PLAIN governs order and comprehension. TECHNICAL governs terminology and procedure. EXECUTIVE governs what a decision maker needs and what to cut. REPORTING governs attribution and neutrality. RESEARCH governs the distance between evidence and conclusion. Nine in total, each owning exactly one concern, selected by task and combined.

A technical incident report needs TECHNICAL and REPORTING at once. Combining axes is the entire point of the design.

Now the failure. My AGENTS.md says: read CLP.txt before you write prose. The model read the README instead, grepped for examples to quote back at me, and never opened the file. The instruction was a pointer and it never dereferenced it. A pointer to rules is not rules, so I replaced it with a hook that injects the literal rules beside every message, read out of the spec at run time so the copy cannot drift.

With the rules actually arriving, I applied the spec properly. It broke.

TECHNICAL could not compose with EXECUTIVE. A technical executive summary had no legal protocol set.

TECHNICAL could not compose with REPORTING. The technical incident report, the combination I just called the point of the design, was not legal either.

REPORTING and RESEARCH excluded each other with no marker. That one turned out to be right, because those two already state six of the same requirements in different words, so I marked the exclusion deliberate and wrote down why.

I had published a specification for composable protocols in which the most common real combinations did not compose.

So I shipped a checker. It verifies that every compatibility declaration is reciprocal, that every protocol named in the selection map exists, and that no mapped set pairs two protocols marked non-composable. It exits 1.

Writing the spec was the easy part. Composing it is where the design claims get tested, and that is where it failed.

github.com/stevenscain/composable-language-protocols

One thing I keep going back and forth on: there is no PERSUASIVE protocol, no SUPPORT, no LEGAL. Which axis would you add first?

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
