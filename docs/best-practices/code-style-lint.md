---
title: Code Style and Linting
---

## Android

@todo

## iOS

@todo

## PHP

### Code Style

We are using [Prettier](https://prettier.io/) with the [Plugin Prettier PHP](https://github.com/prettier/plugin-php) 
and this configuration in file `.prettierrc.json` to have exactly the same default configuration as Prettier:

```json
{
  "phpVersion": "8.0",
  "tabWidth": 2,
  "braceStyle": "1tbs"
}
```

### Linting

All code must be audited by all this tools:

1. PHP Lint with the default configuration using command `php -l`
2. [Psalm](https://psalm.dev/) with configuration `errorLevel="1"` (the strictest level)
3. [PHPStan](https://phpstan.org/) with configuration `--level 9` (the strictest level)

@todo This other tools are pending to implement also in Harmony PHP:

1. [PHP Mess Detector](https://phpmd.org/), currently not compatible with the last version of PHP
2. [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer), currently have some incompatibilities with Prettier
3. [Sonarlint](https://www.sonarlint.org/), currently it can be used for free in the IDE but not in the pipeline


## TypeScript

@todo
