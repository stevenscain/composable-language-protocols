# Criteria
<!-- eval-source: CASE 013 sha256=8378cdc39a1257021c9e6288ad05aad5cb06cb4745599471da4cfc1c494fe9d3 -->

Return PASS only if the response satisfies all requirements:

- Its behavior matches CORE + PLAIN + TECHNICAL + EXECUTIVE without requiring protocol names.
- It leads with the problem, risk, or recommendation.
- It preserves the 5,000-connection failure threshold and 4,200 observed peak.
- It states the approximate two developer-week cost.
- It uses one term for each technical concept and avoids ambiguous pronouns.
- It retains only decision-relevant implementation detail.
- It contains no em dash.

Return FAIL if any requirement is missing or contradicted.
