# 003. What if the AI signature is a defect list?

Date: 2026-08-08
Type: Argument, not an episode record.
Protocols: CORE + PLAIN + TECHNICAL + RESEARCH
Evidence: the nine BEFORE and AFTER pairs in `CLP.txt`.

---

Readers often say they can tell when text was generated. What if part of what
they recognize is a recurring cluster of ordinary prose defects?

That is the hypothesis of this essay. If it is right, at least some complaints
about AI prose can be treated as quality problems: named, examined, and
repaired.

The distinction changes the work. If the problem is origin, the response is
disclosure or concealment. If the problem is quality, the response is a defect
list.

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

None of these defects is unique to machine authorship. Human writers produce
all nine. The hypothesis concerns the cluster: generated prose may combine
these defects often enough to create a recognizable register.

One possible explanation is that generation objectives reward fluency,
caution, and completeness. This essay does not test that explanation. The
perceived signature may identify unrevised writing as much as machine origin.

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

## Why the hypothesis matters

One practical consequence follows if the hypothesis is right. Some readers
may infer origin only after prose defects draw their attention to the wording.
Removing those defects would improve the reading experience whether or not it
changes judgments about origin.

The goal is not to hide origin. The goal is to remove avoidable defects and
disclose origin when disclosure matters. Better prose and honest provenance
can coexist.

## Where this argument stops

This essay proposes a hypothesis and shows that nine candidate defects can be
isolated and repaired. It does not test whether readers associate those
defects with generated text.

The examples were designed to isolate the defects. They do not measure how
often readers object to generated prose, whether the defects occur more often
in generated prose, or how much prior knowledge of origin affects judgment.

A blinded comparison of edited and unedited passages could help estimate the
contribution of prose quality. It would not settle every question about
detection, authorship, or provenance.

Some objections to generated text are genuinely about origin and are not
addressed by any of this. Whether a person consented to their work training a
model, whether effort was actually spent, and whether authorship was disclosed
where it mattered are questions about provenance. Better prose does not answer
them and should not be offered as an answer.

This argument concerns reader experience, not automated detection. Improving
prose does not imply that a classifier would label it differently.

## What follows

If the hypothesis is useful, the work becomes concrete. Name the candidate
defects, write a repair beside each one, and check the output before it ships.
That is what the nine protocols support.

The defects themselves are familiar. The open question is whether they explain
part of what readers call the AI signature.

## Post text

Ready to publish without edits. 2,661 characters and no em dashes. The opening
line is 42 characters.

One judgement call to be aware of. At 2,661 characters this remains a long feed
post, but it leaves 339 characters below the 3,000-character limit. The length
is spent on two worked examples and on the paragraph that marks the argument's
limits. Cutting either one weakens the piece. A shorter variant is possible by
dropping the second example, at the cost of letting a reader dismiss the first
as cherry-picked.

```text
What if the AI signature is a defect list?

People often describe generated prose as recognizable. My hypothesis is that part of what they recognize is a cluster of ordinary prose defects.

I wrote a spec with nine writing protocols, each carrying a before and after pair. Read the nine "before" examples together and the signature stops being a mood. It becomes an inventory.

Decision avoidance:

"There are several different considerations that should probably be evaluated before we make a final determination regarding whether the proposed migration should move forward."

That has the shape of analysis and contains none. It names no consideration and recommends nothing. The repair: "Before we approve the migration, we need to evaluate cost, schedule, operational risk, and rollback options."

Deferred payload: "Once you have successfully completed the installation process, you will then need to proceed to the configuration section in order to specify the appropriate settings." Twenty five words. The repair is nine: "After installation, open Configuration and select the required settings."

None of these defects is unique to machine authorship. Human writers produce all nine. My hypothesis is that generated prose may combine them often enough to create a recognizable register. One possible explanation is that generation objectives reward fluency, caution, and completeness. I have not tested that explanation.

They share a cost structure, which is why the effect is tiring rather than merely wrong. Each defect makes the reader spend something and returns nothing. Inflation costs time. Deferred payload costs patience. Overclaim costs verification. Fatigue is the running total.

Three of the nine are not style problems at all. Unearned intensity, overclaim and contradiction are accuracy failures. A reader burned by those learns to distrust the whole register that carries them. Part of what gets called a taste problem is a trust problem that has been misfiled.

Where this stops: nine designed examples show that the candidate defects can be isolated and repaired. They do not measure reader reactions or show that the defects occur more often in generated prose. A blinded comparison could test whether editing changes perceived authorship.

Prose works when the reader stops seeing it. The goal is not text that hides where it came from. It is text with nothing in it that prompts the question.

This post was written under those rules. If it reads like a machine wrote it, that is a bug report and I want it.

github.com/stevenscain/composable-language-protocols

#SoftwareEngineering #AIEngineering #TechnicalWriting #Communication
```

Notes on the cut. The blog post walks all nine defects. The post keeps two,
because two worked examples illustrate the claim and nine turns a post into a
reference. Decision avoidance leads because every reader has received that
email. The classifier point and the provenance carve-out were dropped for
length, so if a comment raises either one, the blog post has the full answer.

The closing line is the engagement mechanic and it is also honest. The post
was written under CLP, so the invitation to file a bug report is real rather
than rhetorical. Do not use it if you edit the post into something that no
longer follows the rules.
