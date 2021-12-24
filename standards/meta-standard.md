---
title: Meta-Standard
---

These standards document the workflows and best-practices of [Mobile Jazz](https://mobilejazz.com). Not all the projects require to follow these standards, the exact sub-set of standards to follow will depend on the type of project (mobile, frontend, backend, design…). And even if a project must follow a standard, the enforcement should be gradual to **avoid extra bureaucracy**.

These are the guidelines to propose new standards:

- The standard must reside in the [Harmony Reference repository](https://github.com/mobilejazz/harmony-reference).
- The standard must be placed in the `/standards` folder.
- The standard must be focused on a topic, don't make it to broad or too granular.
- The name of the standard is free-form, use the `title` property on the markdown front-matter.
- The filename must be the slug of the title. For example, for `Meta-Standard` => `meta-standard.md`.
- The `/src/sidebars-standards.js` must be updated with the ID of the new standard.
  - The ID is the filename minus the extension, e.g. `meta-standard.md` => `meta-standard`.
- The standard must be presented to the team via a PR in the [Harmony Reference repository](https://github.com/mobilejazz/harmony-reference).
- **The standard is accepted once it's merged**.
