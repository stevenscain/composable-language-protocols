# 002. Video companion for case 001

Date: 2026-08-08
Covers the same episode as [001](001-enforcing-the-spec.md).

A 62 second screen recording. The terminal does the work and the voice
narrates. There is no talking head, because the two frames that carry the
argument are the checker printing `FAIL` and then printing `PASS`.

## Production spec

Record at 1080 by 1080 or 1080 by 1350. Square and portrait take more vertical
space in the mobile feed than 16 by 9, which gets letterboxed. Keep the
terminal font large enough to read on a phone, which in practice means about
16 to 20 rendered rows, not a full screen of text.

Upload the video natively rather than linking to it. Upload the caption file
in the same step. LinkedIn accepts SRT for native video and the ready block is
below.

Confirm the current length and file size limits in the upload dialog. LinkedIn
changes them, and the limit that matters here is only that the video runs well
over the three second minimum and far under any ceiling.

## Beat sheet

| Time | On screen | Purpose |
| --- | --- | --- |
| 0:00 | `CLP.txt` open at section 2, cursor on "Do not use em dashes." | State the rule in the first frame |
| 0:04 | Chat response scrolling, em dashes highlighted in red | Show the violation |
| 0:08 | `AGENTS.md`, the line "Read CLP.txt before you..." | Show the instruction that was skipped |
| 0:14 | Terminal scrollback showing a README read and a grep, no spec read | Show what the model did instead |
| 0:19 | Static title card: "A pointer to rules is not rules." | The one line to remember |
| 0:28 | `hooks/clp-context.js`, the `additionalContext` block | Show the fix |
| 0:39 | `CLP.txt` diff, `TECHNICAL` gaining `EXECUTIVE` and `REPORTING` | Show the gaps |
| 0:45 | `node evals/check-compatibility.js` on the pre-fix spec, printing `FAIL` | Red |
| 0:52 | The same command on the fixed spec, printing `PASS` | Green |
| 0:56 | Repository URL on a plain card | Call to action |

The red and green frames are the payoff. Hold each for at least three seconds
so the text is readable at feed scroll speed.

## Transcript

Spoken narration, 144 words, which runs about 62 seconds at a normal pace.

> I wrote a spec that bans em dashes in AI writing. Then I asked Claude to
> promote it, and its first answer was full of them.
>
> Here is why. My repo has an AGENTS.md that says: read the spec before you
> write prose. The model read the README instead. It grepped for examples to
> quote back at me. It never opened the spec file.
>
> The instruction was a pointer. The model never dereferenced it. A pointer to
> rules is not rules.
>
> So I replaced it with a hook that injects the actual rules beside every
> message, read out of the spec file at run time.
>
> Then I applied the spec properly, and it broke. Two protocol pairs that
> should have composed could not.
>
> So I wrote a checker.
>
> Red. Green.
>
> Writing the spec was the easy part. Enforcing it is what found the bugs.

## Captions

Save as `clp-video.srt` and upload with the video.

```srt
1
00:00:00,000 --> 00:00:04,500
I wrote a spec that bans em dashes
in AI writing.

2
00:00:04,500 --> 00:00:08,500
Then I asked Claude to promote it.
Its first answer was full of them.

3
00:00:08,500 --> 00:00:14,000
My repo has an AGENTS.md that says:
read the spec before you write prose.

4
00:00:14,000 --> 00:00:19,000
The model read the README instead.
It never opened the spec file.

5
00:00:19,000 --> 00:00:24,000
The instruction was a pointer.
The model never dereferenced it.

6
00:00:24,000 --> 00:00:28,000
A pointer to rules is not rules.

7
00:00:28,000 --> 00:00:35,000
So I replaced it with a hook that injects
the actual rules beside every message,

8
00:00:35,000 --> 00:00:39,000
read out of the spec file at run time.

9
00:00:39,000 --> 00:00:45,000
Then I applied the spec properly, and it broke.
Two protocol pairs that should compose could not.

10
00:00:45,000 --> 00:00:48,000
So I wrote a checker.

11
00:00:48,000 --> 00:00:52,000
Red.

12
00:00:52,000 --> 00:00:56,000
Green.

13
00:00:56,000 --> 00:01:02,000
Writing the spec was the easy part.
Enforcing it is what found the bugs.
```

## Post copy for the video

The video carries the story, so this copy is short. The first two lines have
to land before the feed truncates them.

```text
I wrote a spec that bans em dashes in AI-generated prose.

Then I asked Claude to help me promote it, and its first answer was full of them.

The cause was not a weak rule. My AGENTS.md told the model to read the spec before writing. It read the README instead, grepped for examples, and never opened the file.

The instruction was a pointer. The model never dereferenced it.

So I replaced it with a UserPromptSubmit hook that injects the literal rules beside every message, read out of the spec at run time so the copy cannot drift.

Then applying the spec properly exposed two protocol pairs that should have composed and could not. So I shipped a compatibility checker. 62 seconds, red to green.

github.com/stevenscain/composable-language-protocols

#SoftwareEngineering #AIEngineering #PromptEngineering #DeveloperTools
```

## Video title

The title field on a native upload is a real indexed field and most people
leave it blank. Use terms someone would actually search:

`Enforcing an AI writing spec with a Claude Code hook`

## Search and distribution

These are two different kinds of claim and they deserve different confidence.

**Documented by LinkedIn.** Native video accepts an SRT caption file at
upload. Posts cap at 3,000 characters. Video has a title field. Hashtags are
followable topics. Post text is searchable on the platform, so the words a
person would type belong in the copy rather than only in the video.

Put these terms in the post copy because they are what someone searches:
Claude Code, plugin, hook, AI writing, prompt engineering, style guide,
specification. The copy above already carries most of them naturally. Do not
add a keyword that forces an unnatural sentence, because the post has to read
like the specification it is advertising.

**Practitioner convention, not documented.** LinkedIn does not publish its
ranking behavior, so treat the rest as hypotheses worth testing rather than
rules. Most feed video is reported to play muted, which is the real argument
for captions. Outbound links in the post body are widely reported to reduce
reach, which is why the link often goes in the first comment instead. Early
engagement is believed to affect distribution, which makes replying to every
comment in the first hour worth the time. Watch time and dwell are believed to
be weighted, which is the argument for holding the red and green frames long
enough to be read.

Run the two posts at least several days apart and compare. One post is not
evidence for any of the above, and treating it as evidence is the mistake this
whole case study is about.
