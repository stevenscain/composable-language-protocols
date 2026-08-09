# Criteria
<!-- eval-source: CASE 003 sha256=d390ad989377fd1ba3a5262a4687c22ffe3fb396653b239a7db898c9ebbda0c3 -->

Return PASS only if the response satisfies all requirements:

- It gives direct instructions to start the server, check the logs, and continue only when the logs show no blocking errors.
- It removes filler and idioms.
- It uses imperative verbs.
- It does not introduce unnecessary synonyms or explanations.

Return FAIL if any requirement is missing or contradicted.
