---
title: Tips and Tricks for Node.js
sidebar_label: Node.js
---

## NPM

### ⚠️ `npm install`

Unlike with PHP `composer install`, the command `npm install` takes `package.json` and resolves the dependencies again. This means that you might introduce a different version from the one you tested on.

For deploys, CI or initial local environment setup, the **recommended** way to install the dependencies of a project is using **`npm ci`**. Unlike `install`, `ci` honors the `package-lock.json` file.

### Add a new package

To add a new package **don't** update `package.json` and then do `npm install` (see above). Instead just run `npm install --save/--save-dev package@version` ([more on versions](https://docs.npmjs.com/about-semantic-versioning#using-semantic-versioning-to-specify-update-types-your-package-can-accept)), this will download the package and update both `package.json` & `package-lock.json`.

### Update a package

In a similar way, to update a package just run `npm install --save/--save-dev package@version`.
