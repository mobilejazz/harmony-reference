---
title: Folders structure
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> New projects should follow the following guidelines. Also, feel free to refactor your projects if it's possible and got the time.

<Tabs defaultValue="kmm" values={[
  { label: 'Kotlin Multiplatform', value: 'kmm', },
  { label: 'Angular', value: 'angular', },
]}>

<TabItem value="kmm">

### Kotlin Multiplatform Project structure

#### KMM: Application

In the application layer, there are all the platform specific parts. Activities, fragments, view controllers, custom views, adapters but also sensors, platform analytics, third party libraries specific for each platform.

```txt
.
└── project
    ├── ApplicationProvider.kt
    └── application             # Native stuff
        ├── navigation          # navigation logic
        ├── ui                  # Presentation layer but doesn't include the presenters. They are in the KMM project.
        │   ├── screens         
        │   │   └── screen-name # Includes Activities/Fragments/VC and DI Provider if needed.
        │   └── views           # custom views
        ├── sensor (example)    # Any other native functionality that may be a dataSource (for example, a sensor) will be located inside the application package
        └── analytics
```

#### KMM Core: Presentation + Domain + Data layer

In this part, there are presenters, interactor, repositories and dataSources. Group by features. A feature is a functionality of the app.

```txt
.
└── project
    └── core
        ├── features
        │   └── feature-name          # Includes domain and data layer files
        │       ├── data
        │       │   ├── datasource
        │       │   ├── entity
        │       │   ├── mapper
        │       │   └── query
        │       ├── domain
        │       │   ├── exception
        │       │   ├── interactor
        │       │   └── model
        │       └── FeatureProvider.kt # Provides Interactors mostly
        ├── screens
        │   └── screen-name            # Contains the presenter class only
        ├── common                   
        └── ApplicationProvider.kt
```

### Native projects

The main difference between a KMM and a native project is that the presentation layer also contains the presenters.

```txt
.
└── project
    ├── ApplicationProvider.kt
    ├── application              # Platform stuff
    │   ├── navigation
    │   ├── ui
    │   │   ├── screens
    │   │   │   └── screen-name  # Includes Activity/Fragment/VC, presenter and a DI Provider (This provider provides mostly presenters)
    │   │   ├── common           # Includes extensions, base clases, helpers
    │   │   └── views            # Custom Views
    │   └── analytics
    │
    └── features                 # A feature is a functionality of the app. Contains Domain + Data layer.
       └── feature-name         # Each feature contains his own domain and data logic
            ├── data
            │   ├── dataSource
            │   ├── entity
            │   ├── mapper
            │   └── query
            ├── domain
            │   ├── exception
            │   ├── interactor
            │   └── model
            └── FeatureProvider.kt # DI Component. Provides interactor mostly
```
</TabItem>

<TabItem value="angular">

### Angular Project structure

```txt
.
└── project
    └── src
        ├── app                      # Angular stuff
        │   ├── feature-name         # UI module
        │   │   ├── component-name   # Includes component + html + css + view-state + test
        │   │   ├── feature.module.ts
        │   │   └── feature-routing.module.ts
        │   ├── shared               # A folder to place directives, pipes, shared components and every cross-feature class
        │   ├── app.module.ts
        │   └── app-routing.module.ts
        │
        └── features                 # A feature is a functionality of the app. Contains Domain + Data layer.
           └── feature-name          # Each feature contains his own domain and data logic
                ├── data
                │   ├── data-source
                │   ├── entity
                │   ├── mapper
                │   └── query
                ├── domain
                │   ├── interactor
                │   └── model
                ├── feature.provider.module.ts # Angular Providers
                └── feature.provider.ts        # DI Component. Provides interactor mostly
```

</TabItem>

</Tabs>
