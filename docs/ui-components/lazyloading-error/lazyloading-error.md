---
title: Lazy list error
---
## Use Case
When we can't load partial content (i.e. a infinite scroll pagination)

## Contents
* Loading spinner/indicator
* Error
	* Description
	* Link/button (action)

## Best Practices
* Display the error message after a reasonable timeout (i.e. five seconds).
* Hide the loading indicator once the error triggers.
* Add an actionable to re-try loading the missing content (optional).
* If no content can be loaded, use [Fullscreen Errors](../fullscreen-error) instead.
* The rest of the UI elements should still be accessible.

## Best used for
* When we have content in screen but we cannot load some of it.
* Infinite scrolling pagination (lazy loading).

## Screenshots/Demo
### iOS
![](lazyloading-error-ios.gif)

### Android
![](lazyloading-error-android.gif)

### Web
![](lazyloading-error-web.gif)

