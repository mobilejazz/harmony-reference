# Harmony Reference Documentation

## Contributing to the documentation

* There are two main branches in the project `develop` and `master`.
* You should work in the `develop` brach, and create a pull request to `master` when ready to release your changes.
* You don't need to know anything about Jekyll, and you don't need to run the project locally to update the documentation.
* All of the markdown documents are located in `/pages` directory.
* When creating a new page, be sure to add the front matter declarations, see the example below or and existing markdown file.

```markdown
---
title: Executor
permalink: /executor/
---
```

* To create a new menu item, add it to the `_data/nav.yml` file.
* This file uses YAML language. To find out more, visit:
  * [https://jekyllrb.com/tutorials/navigation/](https://jekyllrb.com/tutorials/navigation/)
  * [https://yaml.org/](https://yaml.org/)

## Running the project locally

### Prepare Ruby environment

* Project requires Ruby 2.4, you can use RVM to install that specific version:
  * Install Ruby 2.4 with [RVM](https://rvm.io): `rvm install 2.4 && rvm use 2.4`
* Install `bundler`: `gem install bundler -v 2.0.2`
* Install depenencies: `bundler install`

### Prepare Node environment

* Install Node.JS 10 (`lts/dubnium`), either:
  * Use [NVM](https://github.com/nvm-sh/nvm), just: `nvm install && nvm use`
  * Download it directly: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
* Install dependencies: `npm ci`

### Run project

* Start dev server: `npm start`

## Building the project

* Follow instructions for running the project locally
* Run: `npm build`
