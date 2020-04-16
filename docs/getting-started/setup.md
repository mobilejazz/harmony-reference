---
title: Setup
---

In this section you are going to find step by step how to install and use Harmony framwework.
## Android

Git repository: https://github.com/mobilejazz/harmony-kotlin/

Step 1. Add the JitPack repository in your root build.gradle at the end of repositories:

```
allprojects {
    repositories {
        ...
        maven { url "https://jitpack.io" }
    }
}
```

Step 2. Add the dependency in your module build.gradle

```
dependencies {
    implementation 'com.github.mobilejazz.harmony-kotlin:android:1.0.2'
}
```

## iOS

Git repository: https://github.com/mobilejazz/harmony-swift

Harmony for iOS is distributed via [CocoaPods](https://cocoapods.org/pods/Harmony). 

Step 1. Create Podfile for your project. Run the following command and it will create for you a Podfile file:

```
pod init
```

Step 2. Add Harmony pod to your Podfile file:

```ruby
pod 'Harmony'
```

You can add additional subspecs if you need a specific feature not included into the main Harmony pod:

```ruby
  pod 'Harmony/Alamofire' # Alamofire files
  pod 'Harmony/iOS' # UIKit files
  pod 'Harmony/Repository' # Repository based files
  pod 'Harmony/Security' # Keychain & encryption files
  pod 'Harmony/Vastra' # Object validation library
```


Step 3. Install pods

```
pod install
```

Step 4. From now on, you need to open .xcworkspace file


## PHP

Git repository: https://github.com/mobilejazz/harmony-php

Step 1. Clone repo:

```
git clone git@github.com:mobilejazz/harmony-php.git
```

Step 2. Add Harmony PHP on the autoload section of you composer.json
```
Ex.
...
"autoload": {
    "psr-4": {
        ...,
        "harmony\\core\\": "harmony-php/core/src/",
        "harmony\\eloquent\\": "harmony-php/eloquent/src/"
    }
},
...
```

Step 3. run `composer update`
```
composer update
```

## Typescript

Git repository: https://github.com/mobilejazz/harmony-typescript

Harmony for Typescript is been distributed via NPM.

There are 4 main packages:

1. [@mobilejazz/harmony-core](https://www.npmjs.com/package/@mobilejazz/harmony-core): Contains all basic tools and repository files.
2. [@mobilejazz/harmony-nest](https://www.npmjs.com/package/@mobilejazz/harmony-nest): Contains NestJS related files, including the OAuth2 server.
3. [@mobilejazz/harmony-typeorm](https://www.npmjs.com/package/@mobilejazz/harmony-typeorm): Contains TypeORM related files.
4. [@mobilejazz/harmony-angular](https://www.npmjs.com/package/@mobilejazz/harmony-angular): Contains Angular related files.

To install them just do a `npm install --save <package>` or link it in your package by writing and later doing an `npm install`:

```json
{
    ...
    "dependencies": {
        "@mobilejazz/harmony-core": "$latest_version",
        "@mobilejazz/harmony-nest": "$latest_version",
        "@mobilejazz/harmony-typeorm": "$latest_version",
        "@mobilejazz/harmony-angular": "$latest_version",
        ...
    }
}
```