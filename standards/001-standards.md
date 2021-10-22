---
id: 001-standards
---

These standards document the workflows and best-practices of [Mobile Jazz](https://mobilejazz.com). We SHOULD (aka RECOMMENDED) use the [IETF RFC 2119](https://www.ietf.org/rfc/rfc2119.txt) keywords for clarity. Not all the projects MUST (aka REQUIRED) follow these standards, the exact sub-set of standards to follow will depend on the type of project (mobile, frontend, backend, design…). And even if a project MUST follow a standard, the enforcement SHOULD be gradual to **avoid extra bureaucracy**.

These are the guidelines to propose new standards:

- The standard MUST reside in the [Harmony Reference repository](https://github.com/mobilejazz/harmony-reference).
- The standard MUST be focused on a topic, don't make it to broad or too granular.
- The name of the standard MUST follow the following format: `<number>-<slug>`. Where `<number>` will be zero padded and will have 3 characters long. And where `<slug>` is the lower-case slug of the standard name. Examples:
  - Correct: `001-standards`, `002-bem`
  - Wrong: `1-standards`, `2-BEM`
- The standard number MUST autoincrement based on the last accepted standard.
- The standard MUST be placed in the `/standards` folder.
- The `/src/sidebars-standards.js` MUST be updated with the ID of the new standard.
- The standard MUST be presented to the team via a PR in the [Harmony Reference repository](https://github.com/mobilejazz/harmony-reference).
