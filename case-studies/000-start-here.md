# 000. Start here

Date: 2026-08-08
Type: Introduction.
Protocols: CORE + PLAIN + EXECUTIVE

Numbered 000 because it is the entry point, not the fourth entry.

## What this is

Composable Language Protocols is a specification for how a language model
should write prose. Nine protocols, each governing exactly one concern.
`PLAIN` owns order and comprehension. `TECHNICAL` owns terminology and
procedure. `EXECUTIVE` owns what a decision maker needs and what to cut.
`REPORTING` owns attribution and neutrality. `RESEARCH` owns the distance
between evidence and conclusion. `FICTION`, `CONTINUITY`, and `DIALOGUE` own
narrative work. `CORE` owns general efficiency.

You select by task and combine. A technical incident report takes `TECHNICAL`
and `REPORTING`. A recommendation to a decision maker takes `TECHNICAL` and
`EXECUTIVE`. The combining is the design.

It is a specification rather than a style guide, which means it has the parts
a specification has. A priority order that resolves conflicts, where accuracy
outranks user instructions, which outrank the protocol rules, which outrank
style. A compatibility matrix saying which protocols may combine. Sixteen
evaluation cases. A checker that exits 1 when a compatibility declaration
stops being reciprocal. A Claude Code plugin that injects the global rules
into every turn.

Version 0.1. Experimental.

## Why it exists

People reject AI prose and usually describe the problem as one of origin. It
reads more like a problem of quality.

The signature readers detect is not a watermark. It is a short list of
ordinary prose defects that travel together often enough to feel like a
personality: inflation, deferred payload, decision avoidance, unearned
intensity, overclaim, stated emotion, contradiction. Every one of them is a
failure human writers have produced for a century. They cluster in generated
text because the objectives that shape it reward fluency, hedging, and
completeness.

That reframe is the whole motivation. If the problem is origin, the available
responses are disclosure and concealment, and neither improves a sentence. If
the problem is quality, you can write the defects down, name a rule against
each one, and check output against the list. That is what the nine protocols
are.

Case study [003](003-the-signature-is-a-defect-list.md) argues this position
and marks its limits.

## Who decided

A specification is a pile of decisions, and someone had to make them.

Accuracy outranks style because a person decided it does. A rule belongs to
exactly one protocol because a person decided that duplication was the failure
mode worth designing against. `FICTION` does not automatically combine with
`TECHNICAL` because a person decided those rules would strip the voice that
`FICTION` exists to protect. `REPORTING` and `RESEARCH` stay separate because
a person read both rule sets, found six requirements stated twice in different
words, and decided the exclusion was correct rather than accidental.

Those are judgments about what writing is for. They are not derivable from a
corpus, and they were not generated.

There is a concrete version of that claim. These case studies were dictated.
They were built by speaking thoughts through Claude Code in voice mode and
shaping the output by correction as it went. The thinking arrived as speech
and the structure arrived afterward.

That workflow is the point rather than a curiosity about it. The goal is to
spend more time shaping thought and less time assembling sentences, without
making the reader pay for the trade. A person who thinks well out loud should
not have to choose between speaking their thinking and publishing something
that is pleasant to read.

It also explains the shape of the specification. CLP is not a filter for
concealing where text came from. It is the contract between what a person
meant and how it reads.

This matters practically rather than sentimentally, and building the thing
demonstrated why. The work produced two classes of error, and the two were
caught by different parties.

The machine found the structural defects. Three protocol pairs carried missing
or unmarked compatibility declarations, which is exactly the kind of defect
that mechanical checking is good at. A script now catches that class on every
run.

The human found the judgment errors. A draft opening that reduced a nine
protocol specification to a complaint about punctuation. A draft that spent
its length on tooling and left its own findings unintelligible, because it
reported that two protocols failed to compose without ever establishing that
protocols are things which compose. A thesis about why readers reject
generated prose, which no amount of reading this repository would have
produced.

And on its first attempt at writing under the specification, the machine broke
it, then advised publishing in the voice the specification produces. That is
case study [001](001-enforcing-the-spec.md).

The division is not a ranking. It is a description of what each party is
actually good at. Deciding what good means is the part that does not delegate.

## Where to go next

[001](001-enforcing-the-spec.md) records what happened when the specification
was enforced inside its own repository, and what that exposed.
[002](002-enforcing-the-spec-video.md) is the video companion.
[003](003-the-signature-is-a-defect-list.md) is the argument the whole project
rests on.

The specification itself is `CLP.txt` at the repository root. It is meant to
be pasted into a model context as raw text, which is why it is not Markdown.

## Post text

Ready to publish without edits. 2,282 characters, no em dashes, and a 48
character opening line. Shorter than the other posts on purpose, because this
one introduces rather than argues.

The dictation paragraph is near the end rather than the top on purpose. Put
first, it reads as a process anecdote. Put after the division of labor, it
answers the question the reader has just formed, which is what the human was
actually doing if the machine wrote the sentences.

```text
Nine protocols for how an AI should write prose.

Each one governs a single concern: terminology, decision framing, attribution, evidence, narrative voice. You select by task and combine them.

Not a style guide. A specification. It has a priority order where accuracy outranks style, a compatibility matrix saying which protocols may combine, sixteen evaluation cases, and a checker that exits 1 when a declaration stops being reciprocal.

Why it exists: people who reject AI prose describe it as a problem of origin. It reads more like a problem of quality. What they detect is not a watermark. It is a short list of ordinary prose defects that travel together often enough to feel like a personality. Inflation. Deferred payload. Decision avoidance. Overclaim. Every one of them is a failure human writers have produced for a century.

If the problem is origin, your options are disclosure and concealment, and neither improves a sentence. If the problem is quality, you can write the defects down and check against the list.

Every one of those decisions was made by a person. Accuracy outranks style because I decided it does. FICTION does not automatically combine with TECHNICAL because those rules would strip the voice FICTION exists to protect. Those are judgments about what writing is for, and they were not generated.

Then I used an AI to help build and promote it. It found three gaps in my compatibility matrix that I had missed. It also broke the specification on its first attempt at writing under it, and I corrected its drafts three times.

That division held all the way through. The machine found the mechanical defects. I found the judgment errors.

I am dictating this, incidentally. These case studies were built by speaking my thoughts through Claude Code in voice mode and shaping the output as it went. That is what the specification is for. I want to spend my time shaping thought rather than assembling sentences, and I do not want the reader to pay for that trade.

CLP is not a filter for hiding where text came from. It is the contract between what I meant and how it reads.

Version 0.1 and experimental. Tell me which protocol is missing.

github.com/stevenscain/composable-language-protocols

#SoftwareEngineering #AIEngineering #TechnicalWriting
```
