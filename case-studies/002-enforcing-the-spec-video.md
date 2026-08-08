# 002. Video companion for case 001

Date: 2026-08-08
Covers the same episode as [001](001-enforcing-the-spec.md).

An 85 second screen recording. The terminal does the work and the voice
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
| 0:00 | `CLP.txt` scrolling past its section headers, fast enough to read the shape | Show a specification, not a style tip |
| 0:04 | The chat response that broke it, scrolling | Show the violation |
| 0:09 | The same response with the em dashes highlighted in red | Name the specific rule |
| 0:13 | The nine section headers, then the section 3 selection map with task types resolving to protocol sets | Show the axes and that they combine |
| 0:27 | `AGENTS.md`, the line "Read CLP.txt before you..." | Show the instruction that was skipped |
| 0:31 | Terminal scrollback showing a README read and a grep, no spec read | Show what the model did instead |
| 0:36 | Static title card: "A pointer to rules is not rules." | The one line to remember |
| 0:45 | `hooks/clp-context.js`, the `additionalContext` block | Show the fix |
| 0:51 | `CLP.txt` diff, `TECHNICAL` gaining `REPORTING` in its compatibility block | Show the gap |
| 1:13 | `node evals/check-compatibility.js` on the pre-fix spec, printing `FAIL` | Red |
| 1:17 | The same command on the fixed spec, printing `PASS` | Green |
| 1:20 | Repository URL on a plain card | Call to action |

The red and green frames are the payoff. Hold each for at least three seconds
so the text is readable at feed scroll speed.

## Transcript

Spoken narration, 157 words over 85.5 seconds, which is a deliberate 110 words
per minute. The slow pace is intentional, because the red and green frames
need to be held long enough to read at feed scroll speed.

> I wrote a specification for how AI should write prose. Then I asked Claude
> to promote it, and its first answer broke the spec. About a dozen em dashes,
> which the spec bans outright.
>
> Nine protocols, each governing one concern. Terminology. Decision framing.
> Attribution. Evidence. You select by task and combine them.
>
> My AGENTS.md says: read the spec before you write. The model read the README
> instead and never opened the file. The instruction was a pointer. It never
> dereferenced it.
>
> A pointer to rules is not rules. So I replaced it with a hook that injects
> the actual rules beside every message.
>
> Then I applied the spec properly, and it broke. Technical could not compose
> with Reporting. A technical incident report had no legal protocol set, and
> that combination is the point of the design.
>
> So I wrote a checker.
>
> Red. Green.
>
> Writing the spec was the easy part. Composing it is where it got tested.

## Captions

Save as `clp-video.srt` and upload with the video.

```srt
1
00:00:00,000 --> 00:00:04,500
I wrote a specification for how
AI should write prose.

2
00:00:04,500 --> 00:00:09,500
Then I asked Claude to promote it,
and its first answer broke the spec.

3
00:00:09,500 --> 00:00:13,500
About a dozen em dashes,
which the spec bans outright.

4
00:00:13,500 --> 00:00:18,000
Nine protocols,
each governing one concern.

5
00:00:18,000 --> 00:00:23,000
Terminology. Decision framing.
Attribution. Evidence.

6
00:00:23,000 --> 00:00:27,000
You select by task and combine them.

7
00:00:27,000 --> 00:00:31,500
My AGENTS.md says: read the spec
before you write.

8
00:00:31,500 --> 00:00:36,500
The model read the README instead
and never opened the file.

9
00:00:36,500 --> 00:00:41,000
The instruction was a pointer.
It never dereferenced it.

10
00:00:41,000 --> 00:00:45,000
A pointer to rules is not rules.

11
00:00:45,000 --> 00:00:51,000
So I replaced it with a hook that injects
the actual rules beside every message.

12
00:00:51,000 --> 00:00:56,000
Then I applied the spec properly,
and it broke.

13
00:00:56,000 --> 00:01:00,500
Technical could not compose
with Reporting.

14
00:01:00,500 --> 00:01:06,500
A technical incident report had
no legal protocol set,

15
00:01:06,500 --> 00:01:10,500
and that combination is
the point of the design.

16
00:01:10,500 --> 00:01:13,500
So I wrote a checker.

17
00:01:13,500 --> 00:01:17,000
Red.

18
00:01:17,000 --> 00:01:20,500
Green.

19
00:01:20,500 --> 00:01:25,500
Writing the spec was the easy part.
Composing it is where it got tested.
```

## Post copy for the video

The video carries the story, so this copy is short. The first two lines have
to land before the feed truncates them.

```text
I wrote a specification for how AI should write prose.

Nine protocols, each governing one concern. TECHNICAL owns terminology and procedure. EXECUTIVE owns what a decision maker needs and what to cut. REPORTING owns attribution and neutrality. You select by task and combine them.

Then I asked Claude to help me promote it, and its first answer broke the spec. About a dozen em dashes, which it bans outright.

The rule was not the problem. My AGENTS.md told the model to read the spec first. It read the README instead and never opened the file. The instruction was a pointer and it never dereferenced it.

So I replaced it with a hook that injects the literal rules beside every message, read out of the spec at run time so the copy cannot drift.

With the rules actually arriving, the spec broke. TECHNICAL could not compose with REPORTING, so a technical incident report had no legal protocol set. That combination is the point of the design.

So I shipped a compatibility checker. 85 seconds, red to green.

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
