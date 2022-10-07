---
title: Code Style and Linting
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Android

### Code Style

The code style for Android projects (`MJAndroid.xml`) can be downloaded [here](https://bitbucket.org/mobilejazz/mj-android-codestyles/raw/master/MJAndroid.xml).

#### Install code style on Android Studio and IntelliJ

1. Open Preferences > Editor > Code Style
2. Press the gear icon
3. Select "Import scheme"
4. Select "Intellij IDEA code style XML"
5. Browse your file `MJAndroid.xml`
6. Don't mark the checkbox "Current scheme"
7. Press OK
8. Once the new scheme is added, select **MJAndroid** as your style

### Linting

All code must be audited by Ktlint and Detekt.

#### Ktlint

1. Download [.editorconfig](https://bitbucket.org/mobilejazz/mj-android-codestyles/raw/master/.editorconfig) file & copy it to the root folder of your project
2. Add the next to your **root** `build.gradle`

<Tabs defaultValue="groovy" values={[
{ label: 'Groovy DSL', value: 'groovy', },
{ label: 'Kotlin DSL', value: 'kotlin', },
]}>

<TabItem value="groovy">

```groovy
plugins {
   id 'org.jlleitschuh.gradle.ktlint' version "$ktlint_version"
}
repositories {
   mavenCentral()
}
subprojects {
   apply plugin: "org.jlleitschuh.gradle.ktlint"

   ktlint {
      verbose = true
      outputToConsole = true
      filter {
         exclude("**/generated/**")
      }
   }
}
```
  
</TabItem>

<TabItem value="kotlin">

```kotlin
plugins {
   id("org.jlleitschuh.gradle.ktlint") version ("$ktlint_version")
}
repositories {
   mavenCentral()
}
subprojects {
   apply {
      plugin("org.jlleitschuh.gradle.ktlint")
   }
   ktlint {
      verbose.set(true)
      outputToConsole.set(true)
      filter {
         exclude { entry ->
            entry.file.toString().contains("generated/")
         }
      }
   }
```
</TabItem>

</Tabs>

3. This will add some new tasks to your gradle. The most important ones are:

   - `./gradlew ktlintFormat` - tries to format according to the code style all SourceSets Kotlin files and project Kotlin script files
   - `./gradlew ktlintCheck` - checks all SourceSets and project Kotlin script files

4. Add the following line into the **app module** `build.gradle` to automatically format the code on each build

<Tabs defaultValue="groovy" values={[
{ label: 'Groovy DSL', value: 'groovy', },
{ label: 'Kotlin DSL', value: 'kotlin', },
]}>

<TabItem value="groovy">

```groovy
preBuild.dependsOn(tasks.ktlintFormat)
```

</TabItem>

<TabItem value="kotlin">

```kotlin
tasks.preBuild {
  dependsOn(tasks.ktlintFormat)
}
```

</TabItem>

</Tabs>

This plugin wraps ktlint, which is using EditorConfig under the hood. Here are the official documentation of all those tools:

- [ktlint-gradle plugin](https://github.com/JLLeitschuh/ktlint-gradle)
- ktlint [web](https://ktlint.github.io/) and [github](https://github.com/pinterest/ktlint)
- [EditorConfig](https://editorconfig.org/)

#### Detekt

1. Download [detekt.yml](https://bitbucket.org/mobilejazz/mj-android-codestyles/raw/master/detekt.yml) file and copy it to the root folder of your project
2. Add the next to your **root** `build.gradle`

<Tabs defaultValue="groovy" values={[
   { label: 'Groovy DSL', value: 'groovy', },
   { label: 'Kotlin DSL', value: 'kotlin', },
   ]}>

<TabItem value="groovy">

```groovy
plugins {
   id 'io.gitlab.arturbosch.detekt' version "$detekt_version"
}
repositories {
   mavenCentral()
}
subprojects {
   apply plugin: "io.gitlab.arturbosch.detekt"
   detekt {
      config = files("$rootDir/detekt.yml")
   }
}
```
</TabItem>

<TabItem value="kotlin">

```kotlin
plugins {
   id("io.gitlab.arturbosch.detekt") version ("$detekt_version")
}
repositories {
   mavenCentral()
}
subprojects {
   apply {
      plugin("io.gitlab.arturbosch.detekt")
   }
   detekt {
      config = files("$rootDir/detekt.yml")
   }
}
```

</TabItem>

</Tabs>

3. This will add some new tasks to your gradle. The most important one is:

    - `./gradlew detekt` - will execute detekt following the specified rules from the .yml config file

Official documentation [web](https://detekt.github.io/detekt/) and [github](https://github.com/detekt/detekt)

#### Add pre-commit hooks to execute linters

1. Download [git-hooks.gradle.kts](https://bitbucket.org/mobilejazz/mj-android-codestyles/raw/master/git-hooks/git-hooks.gradle.kts) (kotlin) or [git-hooks.gradle](https://bitbucket.org/mobilejazz/mj-android-codestyles/raw/master/git-hooks/git-hooks.gradle) (groovy) and copy it on the root folder of your project.
2. Create the following directory structure at the root of your project: `scripts/git-hooks/`
3. Download [pre-commit.sh](https://bitbucket.org/mobilejazz/mj-android-codestyles/raw/master/git-hooks/pre-commit.sh) and copy it on `scripts/git-hooks/`
4. Add the following code to the **app module** `build.gradle`:

<Tabs defaultValue="groovy" values={[
   { label: 'Groovy DSL', value: 'groovy', },
   { label: 'Kotlin DSL', value: 'kotlin', },
   ]}>
<TabItem value="groovy">

```groovy
apply from: "../git-hooks.gradle"
```
</TabItem>

<TabItem value="kotlin">

```kotlin
apply(from = rootProject.file("git-hooks.gradle.kts"))
```

</TabItem>

</Tabs>

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
