# 003. The AI signature is a defect list

Date: 2026-08-08
Type: Argument, not an episode record.
Protocols: CORE + PLAIN + TECHNICAL + RESEARCH
Evidence: the nine BEFORE and AFTER pairs in `CLP.txt`.

---

Readers say they can tell when text was generated. They are usually right,
and the reason is not the one they give.

The complaint arrives as a claim about origin. This sounds like AI. Read it as
a claim about quality instead and it becomes something you can test and fix.
What readers detect is not a watermark. It is a small set of prose defects
that travel together often enough to feel like a personality.

The distinction decides what work you do. If the problem is origin, the
response is disclosure or concealment. If the problem is quality, the response
is a defect list.

## The signature decomposes

CLP defines nine protocols. Each one carries a BEFORE and AFTER pair, written
to isolate a single failure. Read the nine BEFORE examples together and the
signature stops being a mood. It becomes an inventory.

**Inflation.** "The new architecture, which was designed in response to
several scalability concerns that had emerged over time, will also provide the
team with a number of additional options for future expansion." The subordinate
clause carries no information the sentence needs, and "a number of additional
options" spends five words on what "more options" says in two. The repair: "The
new architecture addresses scalability problems and gives the team more options
for future expansion."

**Deferred payload.** "Once you have successfully completed the installation
process, you will then need to proceed to the configuration section in order to
specify the appropriate settings." Twenty five words. The repair is nine:
"After installation, open Configuration and select the required settings."

**Tone where a step belongs.** "Once the application has finished starting up,
you'll want to head over to the configuration page, where you can make any
changes that might be needed." The register is companionable and the procedure
is missing. The repair is three imperatives, one action each.

**Decision avoidance.** "There are several different considerations that
should probably be evaluated before we make a final determination regarding
whether the proposed migration should move forward." This has the shape of
analysis and contains none. It names no consideration and recommends nothing.
The repair: "Before we approve the migration, we need to evaluate cost,
schedule, operational risk, and rollback options."

**Unearned intensity.** "The disastrous deployment left thousands of furious
customers locked out of their accounts." Two adjectives are doing work the
facts should do, and one of them asserts a cause nobody has established.

**Overclaim.** "The experiment proves that the new model is significantly
better." One experiment does not prove, and "better" has no scope.

**Stated emotion.** "Michael opened the door slowly and carefully. The hallway
was completely dark, and he suddenly experienced an overwhelming feeling of
fear." The reader is told what to feel instead of being given the material to
feel it.

**Contradiction.** "Sarah recognized the symbol immediately, although she had
never encountered the organization before." The sentence is fluent and does not
survive a second of thought.

**Exposition inside dialogue.** "As you know, John, our father died five years
ago, and since then you have been responsible for managing his company." Two
people tell each other what they both already know, for the reader's benefit.

## What the defects have in common

None of them is a marker of machine authorship. Every one is a failure that
human writers produce, and produced for a century before any of this. They
cluster in generated text because the objectives that shape the text reward
fluency, hedging, and completeness. They are not a signature of origin. They
are a signature of unrevised writing.

They also share a cost structure, which explains why the effect is tiring
rather than merely wrong. Each defect makes the reader spend something and
returns nothing. Inflation costs time. A deferred payload costs patience.
Overclaim costs verification. Contradiction costs a re-read. Fatigue is the
running total.

Three of the nine are worth separating out, because they are not style
failures at all. Unearned intensity, overclaim, and contradiction are accuracy
failures. A reader who has been burned by those learns to distrust the whole
register that carries them. Part of what gets called a taste problem is a
trust problem that has been misfiled.

## Noticing is the failure

Prose works when the reader stops seeing it. Ask someone about a well written
memo and they will tell you what it decided, not how it read. The question
"where did this come from" only surfaces when something has already gone
wrong, in the same way that a reader who notices a font has usually been
failed by the typesetting.

So the goal is not text that hides its origin. The goal is text with nothing
in it that prompts the question. Those produce the same result and they are
not the same intent, and the difference shows up the moment someone asks you
directly. You can answer honestly and the prose still works.

## Where this argument stops

This is a hypothesis with a designed corpus behind it, not a measured result,
and the corpus proves less than it might appear to.

The nine pairs were written to isolate nine defects. They demonstrate that the
defects are separable and repairable one at a time. They do not measure how
often a reader's objection is about quality rather than origin. Nobody has
been surveyed here. Treating a specification's own examples as evidence about
readers would be exactly the overclaim listed above.

There is a competing explanation that would account for much of the same
observation. If you know in advance that a message was generated, you may read
it more harshly whatever its quality, and the fatigue would then come from the
knowledge rather than from the prose. A blind comparison would separate the
two. Until someone runs it, the honest position is that both effects are
plausible and their relative size is unknown.

Some objections to generated text are genuinely about origin and are not
addressed by any of this. Whether a person consented to their work training a
model, whether effort was actually spent, and whether authorship was disclosed
where it mattered are questions about provenance. Better prose does not answer
them and should not be offered as an answer.

Finally, removing these defects does not make text undetectable. Classifiers
work on statistical properties that survive good editing. Detection and reader
experience are different questions, and this argument is only about the second
one.

## What follows

Treat the signature as a defect list and the work becomes ordinary. Name the
failures, write the repair beside each one, and check output against the list
before it ships. That is what the nine protocols are.

The useful reframe is that there was never a new problem here. There was an
old problem arriving at a volume that made it impossible to ignore.

## Post text

Ready to publish without edits. 2,856 characters and no em dashes. The first
line is 118 characters, so the hook lands before the feed truncates it.

One judgement call to be aware of. At 2,856 characters this sits near the
3,000 limit, which leaves about two sentences of editing room and puts it at
the long end for a feed post. The length is spent on two worked examples and
on the paragraph that marks the argument's limits, and cutting either one
weakens the piece. A shorter variant is possible by dropping the second
example, at the cost of letting a reader dismiss the first as cherry-picked.

```text
People say they can tell when text was written by AI. They are usually right, and the reason is not the one they give.

The complaint arrives as a claim about origin. Read it as a claim about quality and it becomes something you can test and fix.

What readers detect is not a watermark. It is a short list of ordinary prose defects that travel together often enough to feel like a personality.

I wrote a spec with nine writing protocols, each carrying a before and after pair. Read the nine "before" examples together and the signature stops being a mood. It becomes an inventory.

Decision avoidance:

"There are several different considerations that should probably be evaluated before we make a final determination regarding whether the proposed migration should move forward."

That has the shape of analysis and contains none. It names no consideration and recommends nothing. The repair: "Before we approve the migration, we need to evaluate cost, schedule, operational risk, and rollback options."

Deferred payload: "Once you have successfully completed the installation process, you will then need to proceed to the configuration section in order to specify the appropriate settings." Twenty five words. The repair is nine: "After installation, open Configuration and select the required settings."

Not one of these is a marker of machine authorship. Every one is a failure human writers have produced for a century. They cluster in generated text because the objectives that shape it reward fluency, hedging and completeness. That is a signature of unrevised writing, not of origin.

They share a cost structure, which is why the effect is tiring rather than merely wrong. Each defect makes the reader spend something and returns nothing. Inflation costs time. Deferred payload costs patience. Overclaim costs verification. Fatigue is the running total.

Three of the nine are not style problems at all. Unearned intensity, overclaim and contradiction are accuracy failures. A reader burned by those learns to distrust the whole register that carries them. Part of what gets called a taste problem is a trust problem that has been misfiled.

Where this stops: nine designed examples show the defects are separable. They measure nothing about real readers. And there is a competing explanation I cannot rule out, that knowing a text was generated makes you read it harshly whatever its quality. A blind comparison would settle it. Nobody has run one.

Prose works when the reader stops seeing it. The goal is not text that hides where it came from. It is text with nothing in it that prompts the question.

This post was written under those rules. If it reads like a machine wrote it, that is a bug report and I want it.

github.com/stevenscain/composable-language-protocols

#SoftwareEngineering #AIEngineering #TechnicalWriting #Communication
```

Notes on the cut. The blog post walks all nine defects. The post keeps two,
because two worked examples prove the claim and nine turns a post into a
reference. Decision avoidance leads because every reader has received that
email. The classifier point and the provenance carve-out were dropped for
length, so if a comment raises either one, the blog post has the full answer.

The closing line is the engagement mechanic and it is also honest. The post
was written under CLP, so the invitation to file a bug report is real rather
than rhetorical. Do not use it if you edit the post into something that no
longer follows the rules.
