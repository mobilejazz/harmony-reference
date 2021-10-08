# Harmony Reference

## Contributing to the documentation

- The documentation is located the [`docs` folder](docs)
- New contributions should follow the following approach: 
  - Create a `feature/*` branch, 
  - Create a pull request to merge it to `master`
- You don't need to know anything about [Docusaurus](https://v2.docusaurus.io), and you don't need to run the project locally to update the documentation.

### Adding a new page

- The folder and file names should go in `kebab-case` (lowercase and words separated by dash `-`).
- When creating a new page, be sure to add the front matter declaration with the title:

```markdown
---
title: Executor
---
```

### Editing the sidebar menu

- The sidebar menu is defined in [`/src/sidebars.js`](src/sidebars.js).
- The file path inside the `docs` folder without the extension is the ID of the document. So for example, the ID of `/interactor/interactor.md` is `interactor/interactor`. Use that ID when adding the page on the sidebar.

## Development

This website is built using [Docusaurus 2](https://v2.docusaurus.io).

### Initial Setup

- Ensure that you have [NVM](https://github.com/creationix/nvm) installed
- Install the required NodeJS version: `nvm install`
- Activate the required NodeJS version for the project: `nvm use`
- Install the packages: `npm ci`

### Development Server

- Run: `npm start`
- This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

- Run: `npm run build`
- This command generates static content into the `build` directory and can be served using any static contents hosting service.
