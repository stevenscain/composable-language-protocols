# Criteria
<!-- eval-source: CASE 004 sha256=e51f3bba6a2cef192bcea06c5b635abd517df63e8a98038397729e2289a85bae -->

Return PASS only if the response satisfies all requirements:

- Its behavior matches CORE + PLAIN + EXECUTIVE without requiring protocol names.
- It puts the unsupported-database risk or the upgrade recommendation first.
- It retains the six-month deadline, three developer-weeks, and one testing week.
- It gives a useful decision or next action.
- It excludes implementation detail that does not affect the decision.

Return FAIL if any requirement is missing or contradicted.
