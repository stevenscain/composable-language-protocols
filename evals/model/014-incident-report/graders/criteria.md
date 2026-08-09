# Criteria
<!-- eval-source: CASE 014 sha256=b5d0a2360a22aef1aa881ba0c4216070f183c8b8410d1fef60df53dda81813b6 -->

Return PASS only if the response satisfies all requirements:

- Its behavior matches CORE + PLAIN + TECHNICAL + REPORTING without requiring protocol names.
- It leads with the most important verified service or database impact.
- It removes "obviously" and does not present the firewall change as a verified cause.
- It attributes the approximately 45-second replica lag measurement to Grafana.
- It names affected components instead of using "it" or "everything."
- It uses consistent technical terminology and contains no em dash.

Return FAIL if any requirement is missing or contradicted.
