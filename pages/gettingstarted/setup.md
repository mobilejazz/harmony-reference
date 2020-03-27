---
title: Setup
---

 In this section you are going to find step by step how to install and use Harmony framwework. 
# Android

https://github.com/mobilejazz/harmony-kotlin/

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

# iOS

https://github.com/mobilejazz/harmony-swift

Step 1. Create Podfile for your project. Run the following command and it will create for you a Podfile file:

```
pod init
```

Step 2. Add Harmony pod to your Podfile file

```
pod 'Harmony'
```

Step 3. Install pods

```
pod install
```

Step 4. From now on, you need to open .xcworkspace file


# PHP

Under development

# Typescript

Under development

Feel free to fix, update or improve any of these samples via PR in Github