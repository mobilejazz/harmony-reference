---
title: CSS/SCSS Guidelines
---

```
Note: this document needs a refactor after we arrive to a new agreement
for the Harmony Code Standard.
```

We aim (as far as possible) to…

* think in terms of reusable visual patterns, not pages, e.g., button, dialog wrapper, menu item… it's similar to a component in Angular but doesn't always match 1:1
* reduce the specificity of our CSS
* use only CSS classes (no IDs, no elements)
* keep our selector flat, no nesting

That's why we use the [BEM naming convention](http://getbem.com/naming/) in our projects, please **read and understand the previous link**. As a quick reminder, BEM stands for `Block Element Modifier` which are the three components of the naming convention. The `Block` represents a _repeating visual pattern_ and it's meaningfull on it's own. The `Elements` are part of a block and has no standalone meaning. The `Modifier` are flags on `Blocks` or `Elements`, use them to change appearance, behavior or state. A summary of how its written:

```css
.block {}
.block__element {}
.block--modifier {}
.block__element--modifier {}
```

For more in depth information see MJ University [CSS Methodologies working document](https://docs.google.com/document/d/14PQ_J4Ysh9VZALdE00B4hlcX_KO1HQVLrNkka7dMYbA/edit?usp=sharing).

## How to organize the files in a SASS project

```
sass/
├── main.scss
├── _functions.scss
├── _mixins.scss
├── _vars.scss
├── components/
│   ├── _my-component.scss
│   └── …
└── elements/
    ├── _html.scss
    ├── _body.scss
    └── …
```

* `main.scss` is the entry point, this file should only have `@import`s to other SASS files.
* `_vars.scss` this holds all our global variables (if a variable is specific to a component it should go in the component file **inside** the top level class `.block {}`). As rule we name our variables from "general to specific", e.g.: preffer `$color-red`, or `$size-body` vs `$red-color` or `$body-size`.
* `components` holds our components which follow BEM convention.
  * Use one file per component
  * The filename should follow the components name: `.my-component {}` => `_my-component.scss`
* `elements` is for global styling of HTML elements

### SASS & Components

When working on components we leverage SASS syntax:

```scss
.block {
    display: flex;

    &__element {
        background-color: blue;

        &--modifier {
            @include my-mixin();
        }
    }

    &--modifier {
        @include other-mixin();

        .block__element {
            background-color: red;
        }
    }
}
```

This will generate the following classes, in the following order:

```css
.block {}
.block__element {}
.block__element--modifier {}
.block--modifier {}
.block--modifier .block__element {}
```

#### Nested elements (avoid if possible)

Even if we aim to follow BEM standard it's OK to deviate from it in sake of practicality, e.g. use nested elements selectors `ul/ol`:

```scss
.list {
    li {
        // …

        a {
            // …
        }
    }
}
```

Altough, this could be better written like:

```scss
.list {
    &__item {
        // …
    }

    &__link {
        // …
    }
}
```

The resulting HTML will be more verbose but this way we stick with the standard (and it's benefits).

## Other considerations

### SASS

* We use SASS, not LESS, Stylus…
* Using Compass as a library is OK (and optional)
* If needed use `@mixin/@include` to share code between components, don't use `@extend`. [See](https://csswizardry.com/2016/02/mixins-better-for-performance/).
* When using CSS frameworks use the bare minimum (grids + …), disable what it's not used

### Builds & Production

* Always `Autoprefix` the generated CSS
* Production build MUST generate sourcemaps
* Always GZIP assets (this practically eliminates the duplicates from the use of `@include` in our SASS files)

### Node.js tooling

* Always add `.nvmrc` next to `package.json`. This allows us to manage the development version with [NVM](https://github.com/creationix/nvm) & `$ nvm use`.
* Use NPM version that supports automatic `package-lock.json` generation (Node >= 8). _Prefer_ LTS versions.
* Write full package version for dependencies (`major.minor.patch`)
* Use NPM for handling dependencies, **no Bower**. Use `devDependencies` for build/tooling related packages and `dependencies` for app related ones.
