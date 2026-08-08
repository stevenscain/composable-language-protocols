# clp - statusline badge for Claude Code.
#
# Prints [CLP] when the protocols are active and [CLP:OFF] after you turn them
# off with "clp off".
#
# Add this to ~/.claude/settings.json:
#
#   "statusLine": {
#     "type": "command",
#     "command": "powershell -ExecutionPolicy Bypass -File \"C:\\path\\to\\clp-statusline.ps1\""
#   }
#
# A statusLine command replaces the whole status line, so this badge is all
# that the row shows.
#
# The script tests whether the flag file exists and never reads its contents,
# so the flag cannot inject terminal escape sequences into your prompt.

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$ClaudeDir = if ($env:CLAUDE_CONFIG_DIR) { $env:CLAUDE_CONFIG_DIR } else { Join-Path $HOME ".claude" }
$OffFlag = Join-Path $ClaudeDir ".clp-inactive"

$Esc = [char]27
if (Test-Path -LiteralPath $OffFlag) {
    [Console]::Write("${Esc}[38;5;244m[CLP:OFF]${Esc}[0m")
} else {
    [Console]::Write("${Esc}[38;5;110m[CLP]${Esc}[0m")
}
