---
title: Code Standard
---

import useBaseUrl from '@docusaurus/useBaseUrl';

```
Note: this document needs a refactor after we arrive to a new agreement
for the Harmony Code Standard.
```

This repository is intended to be used as reference to enforce a code standard within MJ's web team.

The specifics of the code standard were discussed and voted by the team peers and is registered on the [following document](https://docs.google.com/document/d/15owallsldSOy0wZDepauOAVgdMeKBl9gazk_IxN786c/edit).

As a general rule we should have an `.editorconfig` file on the root folder of each project. This files indicates some style standards like indentation, trailing spaces, charset, etc.

The rest of the implementation will happen in a per language basis and will consist of 3 parts :

* **Code linting** : to be integrated on each developer's IDE, should indicate any code standard violation
* **Auto-fixing** : also to be integrated on each developer's IDE, should fix automatically any the code standard violations
* **Pre-commit verification** : a script should be executed on GIT's pre-commit hook in order to verify the code standard and prevent any violation to be committed

## Config files

1. IntelliJ IDEA products [XML config file](/configs/PHPStrom_MJ_CodeStyle.xml). Go to Settings -> Editor -> Code Style
   -> Scheme -> Import Scheme -> Intellij IDEA XML
1. Visual Studio Code [.editorconfig](/configs/editorconfig)
1. Tslint [tsling.json](/configs/tslint_json)
1. StyleLint [.stylelintrc.json](/configs/stylelintrc_json)
1. EsLint [.eslintrc.json](/configs/eslintrc_json)

## CSS Guidelines

Apart from the code standard we have some CSS Guidelines that we follow, please [check them here](css-scss).

## CSS / SASS

The single chosen tool here is [stylelint](https://stylelint.io/). Described on their site as
>A mighty, modern CSS linter and fixer that helps you avoid errors and enforce consistent conventions in your stylesheets.

It's a Node.js based tool, so the tool and imported rules should be added to the ``package.json`` file. And the code standard rules are defined in our `.stylelintrc.json`. More info about rules [on their website](https://stylelint.io/user-guide/rules/).

### Code Linting

Here is a list of the plugins for the most used IDEs among our team:

* [VS Code plugin](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)
* [JetBrains IDEs plugin](https://plugins.jetbrains.com/plugin/9276-intellij-stylelint-plugin) (PHPStorm, WebStorm, IntelliJ IDEA, etc )


### Auto-fixing

stylelint's client allow the paramenter ``--fix`` to auto-fix most of the rules violations. Unfortunaltely, it seems auto-fix is not supported yet by any the IDE's plugins. The workaround would be to use the `stylelint CLI` as an external tool.

**Not all rules have auto-fix**. We might need to fix manually some errors pointed by stylelint. It's possible to contribute to the library and add auto-fix to those rules.

**VS Code**

* [Instructions here](https://code.visualstudio.com/docs/editor/tasks)

**JetBrains IDEs**

1. Install stylelint: `npm install stylelint`
1. Go to  `Preferences > External Tools` (or press `⌘,` on Mac)
1. Click on `Add` icon (or press `⌘N` on Mac)
1. Fill the form with following info:    
   – Name: `Stylelint Auto-fix`    
   – Program: `node_modules/.bin/stylelint`    
   – Parameters: `$FilePath$ --fix`    
   – Working directory: `$FileDir$`

All checkboxes in the form are optional, you can check whichever you want.

Optionally you set a shortcut of you preferences for the newly created External tool. Go to **IDE Settings | Keymap** and locate the tool. Then use the Add Keyboard Shortcut context menu to assign a shortcut.

### Pre-commit hook

It is already implemented on this repository as an example. We only need to make sure **stylelint CLI** is installed  by running `npm install stylelint`.

## JavaScript

The single chosen tool here is [ESLint](https://eslint.org/). It's another Node.js based tool with pluggable rules.


### Code Linting

* [VS Code plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

* **JetBrains IDEs**: It is already built in, but you must enable it at **Preferences | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint** .

### Auto-fixing


ESLint's integration with the IDE's also supports auto-fix.

**Not all problems are auto-fixable**


**VS Code**

Once the linting plugin is installed the command pallete wil have a `Fix all auto-fixable problems` command that applies ESLint auto-fix resolutions to all fixable problems.

**JetBrains IDEs**

Once ESLint is enabled you just need to hit `Alt + Enter` on the ESLint warning and select the option **Fix current file with ESLint** from the contextual menu.


### Pre-commit hook

It is already implemented on this repository as an example. We only need to make sure **ESLint** is installed  by running `npm install eslint`.


## TypeScript

The single chosen tool here is [TSLint](https://palantir.github.io/tslint/). It's another Node.js based tool with pluggable rules.

For typescript support some specific packages are required (see package.js)

### Code Linting

* [VS Code plugin](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)

* **JetBrains IDEs**: It is already built in, but you must enable it at **Preferences | Languages & Frameworks | TypeScript | TSLint** .

### Auto-fixing


TSLint's integration with the IDE's also supports auto-fix.

**Not all problems are auto-fixable**


**VS Code**

Supported. According to the [plugin's documentation](https://marketplace.visualstudio.com/items?itemName=eg2.tslint), you can auto-fix by :
> clicking the light bulb appearing or by executing the Quick Fix, when the mouse is over the erroneous code
or using the command Fix all auto-fixable problems.

**JetBrains IDEs**

Once TSLint is enabled you just need to hit `Alt + Enter` on the ESLint warning and select the option **TSLint:fix current error** or **TSLint:fix current file** from the contextual menu.


### Pre-commit hook

It is already implemented on this repository as an example. We only need to make sure **TSLint** is installed  by running `npm install tslint`.

## PHP

The PHP linting / fixing is based on [PHP Code Sniffer](https://github.com/squizlabs/PHP_CodeSniffer).

**The code standard used is PSR2**. You must set this on your IDE for code linting/auto-fixing.

So the first step in all cases is to install it globally on the machine by executing :
`composer global require "squizlabs/php_codesniffer=*"`


### Code Linting

* [VS Code plugin](https://marketplace.visualstudio.com/items?itemName=ikappas.phpcs)

**JetBrains IDEs**

1. Set the path for the executable file on **Preferences | Languages & Frameworks | PHP | Code Sniffer**
1. Configure you code style on **Settings/Preferences | Editor | Inspections | PHP | Code Sniffer**
1. Set code standard to `PSR2`
1. Set severity to `Error`

<img alt="Code Sniffer settings" src={useBaseUrl('img/best-practices/phpcs.png')} />

More info on [PHPStorm documentation page](https://confluence.jetbrains.com/display/PhpStorm/PHP+Code+Sniffer+in+PhpStorm)

### Auto-fixing

**VS Code**

* Not sure if the linting plugin also allows auto-fix by default. In case not, you can use Tasks to execute it as an external took. [Instructions here](https://code.visualstudio.com/docs/editor/tasks)

**JetBrains IDEs (using codestyles)**

1. Go to  `Preferences > Editor > Code Style > PHP` (or press `⌘,` on Mac)
1. There on the right on the window click on `Set from ...` and choose `Predefined sytle > PSR1/PSR2`

This code style should comply with most of the requirements from Code Sniffer and you can keep using the Code Formatting tools available in PHPStorm.

**JetBrains IDEs (using PHP_CodeSniffer)**

1. Verify if you have Composer binaries on your Path. To do so execute `echo $PATH` and check if the folder `~/.composer/vendor/bin` is there
1. If the folder is not there, add it by editing your `~/.bash_profile` (or equivalent) and adding the following line: `export PATH=~/.composer/vendor/bin:$PATH`
1. Make sure code sniffer is installed by executing `composer global require "squizlabs/php_codesniffer=*"`
1. Go to  `Preferences > External Tools` (or press `⌘,` on Mac)
1. Click on `Add` icon (or press `⌘N` on Mac)
1. Fill the form with following info:    
   – Name: `PHP Code Sniffer Auto-fix`    
   – Program: `phpcbf`    
   – Parameters: `--standard=PSR2 $FilePath$`    
   – Working directory: `$FileDir$`

All checkboxes in the form are optional, you can check whichever you want.

Optionally you set a shortcut of you preferences for the newly created External tool. Go to **IDE Settings | Keymap** and locate the tool. Then use the Add Keyboard Shortcut context menu to assign a shortcut.


## Recommended Visual Studio Code Extensions

* [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig):
  Helps developers define and maintain consistent coding styles between different editors and IDEs.

* [Code Spellchecker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker):
  Spell checker that works well with camelCase code.
  > HINT: Use `Ctrl + .` when on a spelling error to see suggestions.

## Configure GIT hooks

1. `npm init` | Create a package.json on the main folder.
1. `npm install hasky npm-run-all --save-dev` | Install the basics packages for manage git hooks.
1. Add `scripts` and `hasky` sections on `package.json`:

```json
"scripts": {
        "phpcs": "phpcs -w -s --standard=PSR2 --extensions=php,module/php .",
        "tslint": "node_modules/.bin/tslint -c tslint.json -e '**/node_modules/**/*'  '**/*.ts'",
        "eslint": "node_modules/.bin/eslint --ext .jsx,.js,.ts,.tsx .",
        "stylelint": "node_modules/.bin/stylelint \"**/*.scss\" \"**/*.css\"",
        "validate": "npm-run-all --parallel phpcs eslint stylelint"
    },
 //...
 "husky": {
        "hooks": {
            "pre-commit": "npm run validate",
            "pre-push": "npm run validate"
        }
    }
```
