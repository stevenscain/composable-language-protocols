# Changelog

This file records notable changes to Composable Language Protocols.

## Unreleased

### Added

- Added a Codex plugin manifest, lifecycle adapter, and hook configuration.
- Added Apache 2.0 license and notice files.
- Added GitHub Actions checks for JavaScript syntax, specification structure,
  mutation behavior, hook behavior, plugin packaging, model-evaluation
  definitions, and status-line scripts.
- Added executable Claude model evaluations and graders for all sixteen cases.
- Added a cost-capped model-evaluation runner.
- Added a release checklist.

### Changed

- Expanded the shared hook to restore an operational specification at session
  start and after context compaction.
- Scoped prompt-time context to global rules and explicitly named protocols.
- Restricted CLP toggles to the documented standalone `clp on` and `clp off`
  commands.
- Strengthened compatibility validation for unknown references and reciprocal
  automatic-exclusion declarations.
- Expanded documentation and case studies for the nine protocols and both
  plugin environments.
