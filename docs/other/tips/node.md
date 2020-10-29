---
title: Node
---
## Tips and Tricks for Node

### npm install

Unlike with PHP `composer install`, the command `npm install` takes `package.json` and resolves the dependencies which means that you might introduce a version different from the one you tested on.

The **recommended** way to update the dependencies of a project is using `npm ci`.
