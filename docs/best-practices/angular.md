---
title: Angular Guidelines
---

> New Angular projects should follow the following guidelines, this also applies to projects that are part of a monorepo (e.g. frontend + Nest.js backend).

## Folder structure

```txt
.
├── backend/            # Optional: Nest.js backend
├── common/             # Optional: folder sharing code between backend & frontend
├── docs/               # Documentation
├── frontend/           # Angular Workspace
│   ├── app/            # Main frontend App
│   ├── common/         # Optional: code shared between frontend apps
│   ├── package.json    # Frontend package.json
│   └── angular.json    # Workspace config
└── README.md           # Docs TOC
```

## Keep Angular updated

- Angular version must be kept on the [most recent LTS version](https://angular.io/guide/releases#support-policy-and-schedule).
- Update at least every 6 months.

## We must use Angular workspaces

- Use an Angular workspace initialised in the `frontend` folder:
  - `ng new frontend --createApplication="false" --newProjectRoot=.`

## DevOps integration

- There must be a NPM script entry for each deploy target following this naming convention: `<app>:build:<target>`.
  - e.g.: `app:build:stage`, `admin:build:prod`
- Each Angular app must build into the `dist` folder inside the project. E.g. `/frontend/app` builds into `/frontend/app/dist`.
- Environment related config will be managed using Angular `environments.ts`.

## Documentation

- The root `README.md` will contain a TOC.
- The documentation must go into the `/docs` folder.
