# Release checklist

Use this checklist for each CLP specification or plugin release.

## Prepare the release

1. Create a release branch from the current default branch.
2. Confirm that the working tree contains only release changes.
3. Choose one semantic base version for the Claude and Codex manifests.
4. Set `.claude-plugin/plugin.json` to the base version.
5. Set `.codex-plugin/plugin.json` to `<base-version>+codex.<UTC timestamp>`.
6. Replace an existing Codex suffix. Do not append a second suffix.
7. Move completed entries from `Unreleased` in `CHANGELOG.md` to a dated
   version section.
8. Confirm that `README.md`, installation commands, and status information
   match the release.

## Validate the release

Run the dependency-free checks:

```powershell
node --check evals/check-compatibility.js
node --check evals/check-compatibility-tests.js
node --check evals/check-hook.js
node --check evals/check-model-evals.js
node --check evals/check-packaging.js
node --check evals/run-model-evals.js
node --check hooks/clp-context.js
node --check hooks/clp-context-codex.js
node evals/check-compatibility.js
node evals/check-compatibility-tests.js
node evals/check-hook.js
node evals/check-packaging.js
node evals/check-model-evals.js
```

Validate the Claude manifests when the Claude CLI is available:

```powershell
claude plugin validate .claude-plugin/plugin.json
claude plugin validate --strict .claude-plugin/marketplace.json
```

The plugin validator can warn that the repository-root `CLAUDE.md` is not
plugin context. CLP injects its plugin context through lifecycle hooks, so this
warning does not indicate a missing plugin component.

Run the model evaluations when the account supports Claude plugin evaluations:

```powershell
node evals/run-model-evals.js
```

Review the per-case scores, grader findings, and no-plugin baseline delta.
Record any accepted failure or material limitation in the changelog.

## Publish the release

1. Commit the validated release changes.
2. Push the release branch and merge it through the normal review process.
3. Confirm that GitHub Actions passes on the final commit.
4. Create an annotated `v<base-version>` tag on the final commit.
5. Push the tag to `origin`.
6. Create the GitHub release from the matching changelog section.
7. Refresh the configured Codex marketplace.
8. Reinstall `clp@composable-language-protocols`.
9. Start a new Codex thread and verify the SessionStart and prompt hooks.
10. Install or update the Claude plugin and verify `clp off` and `clp on`.
