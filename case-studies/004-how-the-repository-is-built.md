# 004. How the repository is built

Date: 2026-08-08
Type: Record, technical.
Protocols: CORE + PLAIN + TECHNICAL + RESEARCH

`RESEARCH` is in the set for one section only, the one about what a model can
establish by reporting on itself. Section 13 says to apply each protocol to
the concerns it governs, so it does not fire anywhere else.

## One rule, one place

The repository holds each rule in exactly one location. Everything else points
at that location or parses it.

`CLP.txt` is the source. `AGENTS.md` points to it and carries no rules of its
own beyond precedence and scope. `CLAUDE.md` imports `AGENTS.md` rather than
restating it. `hooks/clp-context.js` parses `CLP.txt` at run time rather than
storing a copy of the rules. The two status line scripts test the same flag
file the hook writes.

Nothing holds a second copy, because a second copy is a thing that goes stale
without telling you.

This is the specification's own design principle turned on the repository that
contains it. `CLAUDE.md` states that a rule belongs to exactly one protocol
and that duplication across protocols is the main failure mode of the design.
The same rule governs the files.

## Two agents, one entry point

`AGENTS.md` is the agent-neutral convention, and it is what Codex reads.
Claude Code reads `CLAUDE.md`. Writing the routing instructions twice would
have created exactly the duplication the design forbids, so `CLAUDE.md:5` is a
single line, `@AGENTS.md`, which imports the file.

`AGENTS.md` contains seven instructions and no writing rules. Read `CLP.txt`
before prose work. Use CLP for prose tasks. Select the smallest compatible
set. If the user names protocols, use those. If not, use automatic selection.
User instructions outrank CLP. Do not apply CLP to source code unless asked.

The separation matters. `AGENTS.md` answers "when does this apply and who
wins in a conflict." `CLP.txt` answers "what are the rules." An agent that
reads only the first still knows it must go read the second, and an agent that
reads both never sees the same sentence twice.

One limit worth stating plainly. This arrangement was exercised with Claude
Code throughout this session, including a live hook. It has not been tested
with Codex. The claim is that the repository follows the convention Codex
reads, not that the behavior has been observed.

## Why the specification is a .txt file

Four reasons, in increasing order of how much they bite.

It is a payload rather than a document. `CLP.txt` exists to be pasted into a
model context as raw text, and the same is true of `evals/cases.txt`.

Markdown attracts tooling. Formatters, linters, and documentation generators
rewrite `.md` files. A `.txt` file is inert, and nothing in a normal toolchain
reformats it on the way past.

Markdown has more than one representation. `**bold**` either renders or shows
its asterisks depending on where it lands. A row of `=` under a heading is a
setext underline in Markdown and gets rewritten to `#` by most formatters. In
plain text a row of `=` is a row of `=`.

The fourth reason is the one with teeth: the parser depends on the format.
`hooks/clp-context.js:24` searches for a line matching exactly `2. GLOBAL
RULES`, then collects lines beginning with `*` until it reaches a row of `=`.
Markdown bullets are written with `-` as often as `*`. Markdown headings are
written with `#`. A formatter that normalised either one would break the
parser.

The failure mode is what makes this serious. The hook returns nothing on any
error, by design, so a broken parser does not raise. It silently stops
injecting the rules, and the next fifty responses are written with no
specification loaded and no signal that anything changed. That is why
`CLAUDE.md` carries an explicit instruction not to convert these files to
Markdown, and why the parser's format dependency is documented next to it.

## The hook

The contract is small. The hook registers on `UserPromptSubmit`, receives the
turn as JSON on standard input, and writes JSON to standard output containing
`hookSpecificOutput.hookEventName` and `hookSpecificOutput.additionalContext`.
The text in `additionalContext` is placed next to the user's message.

Position is the entire reason it exists. `AGENTS.md` loads once, and case
study 001 records what happened when that was the only mechanism. The
instruction to read the specification was a pointer, and the pointer was not
followed. The hook injects the literal text of section 2 instead, which is why
it works where the pointer did not.

Reading the file at run time rather than embedding a copy prevents the worst
version of this bug. If the hook carried its own copy of the rules, editing
`CLP.txt` would stop changing behavior, the specification and its enforcement
would disagree, and nothing would report the disagreement.

Every code path exits 0, including malformed input. A style enforcement hook
that can block a prompt is worse than no hook.

Two details in the toggle and selection logic were worth getting right. The
off and on regexes match explicit commands only, so `CLP: TECHNICAL +
RESEARCH` and `CLP AUTO` are read as invocations rather than as toggles. The
protocol capture matches uppercase names joined by `+`, which stops the match
at the end of the list. The first version used a looser character class, and
testing showed it swallowing the prose that followed the protocol names.

## The plugin and the status line

`.claude-plugin/plugin.json` declares the hook and resolves the script path
with `${CLAUDE_PLUGIN_ROOT}`. `.claude-plugin/marketplace.json` makes the
repository itself installable, so `/plugin marketplace add` followed by
`/plugin install` is the whole setup.

The status line is deliberately not in the manifest, because `statusLine` is a
`settings.json` key rather than something a plugin manifest can declare.
Installing the plugin therefore does not enable the badge, and the two scripts
in `statusline` have to be wired up by hand.

That separation exposes a trap worth documenting. The plugin cache path
contains the version number, so a `statusLine` entry pointing at the installed
copy stops working at the next plugin update, silently. Pointing it at a
checkout avoids the problem.

The scripts test whether the flag file exists and never read its contents.
This is a deliberate difference from the caveman plugin's equivalent scripts,
which read the flag and render its contents to the terminal on every
keystroke, and which therefore need symlink refusal, a size cap, and a
character whitelist to stop a planted file from injecting escape sequences.
Testing for existence removes that entire class of problem instead of
defending against it.

## The checker

`evals/check-compatibility.js` exists because the same defect appeared three
times in one session. `TECHNICAL` and `EXECUTIVE` did not list each other.
`TECHNICAL` and `REPORTING` did not list each other. `REPORTING` and
`RESEARCH` did not either, and that third one turned out to be correct but
unmarked, which is a documentation defect rather than a logic defect.

Three instances of one defect class is the signal to stop finding them by
reading. The checker verifies that every `COMPATIBLE WITH` declaration is
reciprocal, that every protocol named in the section 3 selection map exists,
that every set in the map is pairwise compatible, and that no set pairs two
protocols marked `DO NOT AUTOMATICALLY COMBINE WITH`. It exits 1 on failure.

It was not trusted until it had been run against four deliberately corrupted
copies of the specification, one per failure mode, and caught all four with
the correct message and exit code. A validator that has only ever passed is
not evidence of anything.

It parses the same section headers and block formats the hook does, so it
carries the same dependency on the file staying plain text.

## What a model can establish about its own composition

You asked, during this session, to be shown exactly how CLP was composing a
response. Section 14 item 10 says to return prose without describing that
internal check unless the user asks, so asking is what made the answer
permissible.

The demonstration separates cleanly into what can be checked and what cannot.

Two things can be checked. The input is visible: the hook prepends the eleven
bullets of section 2 verbatim to every turn, and that block is in the context
where anyone can read it. The correspondence can also be checked: a claim that
a given sentence satisfies `PLAIN:159` or `TECHNICAL:196` is a claim about
text, and you can verify or refute it by reading the sentence.

One thing cannot. `RESEARCH:314` requires distinguishing evidence from
inference, and the inference here is causation. A model has no access to its
own generation, so it cannot demonstrate that a rule produced a sentence
rather than matching a sentence that would have appeared anyway. Some of those
sentences would likely be identical with no specification loaded. Rule
plus matching text is weaker evidence than it appears to be, and reporting it
as a mechanism would be exactly the overclaim `RESEARCH` exists to prevent.

One fact about composition did survive that filter, because it does not depend
on introspection at all. The sentence "bad drafts announce themselves" was
written under `CORE + PLAIN`, which contains no rule against figurative
language. Under `CORE + PLAIN + TECHNICAL` the same sentence violates
`TECHNICAL:203`. The sentence did not change. The active set did. That is
composition observable in live text rather than in an example inside the
specification, and it is the only part of the demonstration that rests on
nothing a model has to say about itself.

## What this architecture costs

The single source discipline has a price, and it is paid in coupling.

The hook is coupled to the exact text of one heading and one bullet character
in `CLP.txt`. The checker is coupled to the section header and block formats.
Both dependencies are documented in `CLAUDE.md`, which is the mitigation, but
documentation is a weaker guarantee than a test and neither script has one.

The repository also breaks its own rule in exactly one place. The status line
logic exists twice, once in `clp-statusline.sh` and once in
`clp-statusline.ps1`. Two shells means two implementations, and the duplicated
logic is small enough that the alternative, a single script plus a wrapper per
platform, would cost more than it saved. It is still a copy, and if the flag
file is ever renamed, three files have to change together rather than one.
