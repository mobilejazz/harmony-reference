---
title: SCSS
---

## Breakpoints and Media Queries

Having a definition of breakpoints:
```scss
$breakpoints: (
    tablet: 768px,
    desktop: 1200px,
);
```
:::note

The breakpoints created here are just an arbitrary set to illustrate the usage of the related methods.

:::

We can define methods to apply rules with media queries to specific screen sizes.
Following the Mobile First approach, we'll be using just "up" rules, leaving mobile rules as the general ones and overriding these for wider screens.

```scss
@mixin bp-up($breakpoint) {
    @media (min-width: #{map-get($breakpoints, $breakpoint)}) {
        @content;
    }
}
```

Having that, the definition of our media queries would be like this:
```scss
@mixin tablet-up {
  @include bp-up(phone-landscape) {
    @content;
  }
}

@mixin desktop-up {
  @include bp-up(phone-landscape) {
    @content;
  }
}
```

Now we can set the styles in this standard way: 
```scss
.someClass {
  // rules for all breakpoints

  @include tablet-up {
    // rules that don't apply to mobile
  }

  @include desktop-up {
    // rules that only apply to wider screens
  }
}
```

## Color Palettes

Color palettes will be defined as a map of intensities:

```scss
$colors: (
  primary: (
    50: #fff2fd,
    100: #ffe5fb,
    200: #ffc9f7,
    300: #ffabf4,
    400: #ff8af3,
    500: #de67d4,
    600: #9e4b99,
    700: #623063,
    800: #2c1731,
    900: #020307,
  ),
  neutral: (
    50: #fdfcfa,
    100: #fbfaf6,
    200: #f7f4ee,
    300: #f4efe5,
    400: #f0eadc,
    500: #cfc9bd,
    600: #928f8a,
    700: #5a5a59,
    800: #28292d,
    900: #020307,
  ),
);
```

This way, we can have a function to get the color, given the name of the palette and the intensity.
```scss
@function color($color, $n) {
  @return map-get(map-get($colors, $color), $n);
}
```

Usage:
```scss
background-color: color(neutral, 600);
```
