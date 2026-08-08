#!/bin/bash
# clp - statusline badge for Claude Code.
#
# Prints [CLP] when the protocols are active and [CLP:OFF] after you turn them
# off with "clp off".
#
# Add this to ~/.claude/settings.json:
#
#   "statusLine": {
#     "type": "command",
#     "command": "bash /path/to/clp-statusline.sh"
#   }
#
# A statusLine command replaces the whole status line, so this badge is all
# that the row shows.
#
# The script tests whether the flag file exists and never reads its contents,
# so the flag cannot inject terminal escape sequences into your prompt. It uses
# -e rather than -f to match the hook, which calls fs.existsSync.

OFF_FLAG="${CLAUDE_CONFIG_DIR:-$HOME/.claude}/.clp-inactive"

if [ -e "$OFF_FLAG" ]; then
  printf '\033[38;5;244m[CLP:OFF]\033[0m'
else
  printf '\033[38;5;110m[CLP]\033[0m'
fi
