---
title: PHP Guidelines
---

> New PHP projects should follow the following guidelines.

## Single Quotes vs Double Quotes

For [performance reasons](https://www.php.net/manual/en/language.types.string.php#120160) use always:

- Double-quoted strings for concatenation.
- Put your variables in `"This is a {$variable} notation"`, because it's the fastest method which still allows complex expansions like `"This {$var['foo']} is {$obj->awesome()}!"`. You cannot do that with the `"${var}"` style.
- For no concatenation follow the [Prettier default](https://prettier.io/docs/en/rationale.html#strings) configuration.
