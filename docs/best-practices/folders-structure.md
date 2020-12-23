---
title: Mobile folders structure
---

> New projects should follow the following guidelines. Also, feel free to refactor your projects if it's possible and got the time.

## Folders structure

Split in two parts. Presentation layer and domain+data layer.

#### Presentation layer

In the presentation layer, there are all the parts of the application that are related with the UI or specific for each platform. We can have the activities or fragments, view controllers, custom views, adapters, manager for sensors, etc.

```txt
.
└── project
    ├── navigation				# navigation logic
    ├── application 			# platform stuff
    │   ├── di 					# dependency injection
    │   └── ui
    │       ├── topic 			# each feature or topic
    │       │   ├── presenter 	# if not multiplatform, presenters here
    │       │   └── adapters	# adapter in Android
    │       ├── customviews		# shared custom views
    │       └── base			# shared base classes
    ├── helper
    └── analytics
```

#### Domain + Data layer

There are all the parts from the presenter (if project is multiplatform, if not then from domain layer with just interactors) to the data sources.

```txt
.
├── topic
│   ├── data
│   │   ├── datasource
│   │   ├── entity
│   │   ├── mapper
│   │   └── query
│   ├── domain
│   │   ├── exception
│   │   ├── interactor
│   │   └── model
│   └── TopicProvider.kt
├── application
│   └── presenter
└── ApplicationProvider.kt
```

##### Example

![Domain + Data layer](https://pasteboard.co/JEVnf57.png "")


