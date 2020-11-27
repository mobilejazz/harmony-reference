---
title: Presenter Specification
---

To normalize our presenters, we create these specs that all of us should follow. If you want a case that it's not specified here, let's discuss it in the #harmony channel. Also, find [here](https://github.com/mobilejazz/harmony-kotlin/blob/1d7f0a3b188599624e15a2435d110227b411ccd1/sample/src/main/java/com/mobilejazz/sample/specs/PresenterSpecs.kt) a sample.

## Presenter

Defines the interactions between the *user* or *platform* with the application business logic.

The presenter public API is defined by a `interface`, in some specific case, we need to use *classes* instead of
*interfaces* but it should not be the general norm.

### Prefixes

#### onEvent

Used when the action is triggered by platform and not by the user. For example, when a notification appears or service is publishing events.

Examples:
```
fun onEventWaterLowLevel()
fun onEventBikeMove()
```

#### onAction

Used when the action is triggered by the user.

:::important pro tip
- Avoid do reference to your platform

Examples:
```
fun onActionRegisterNotificationSystemBikeCrash() -> fun onActionTurnOnBikeCrashNotifications()
```

- Avoid do reference to UI components

Examples:
```
fun onActionRetryButtonPressed() -> fun onActionForceReloadRideList()
fun onActionNameCleanTextView() -> fun onActionResetUserField()
```
:::

Examples:
```
fun onActionJoinRide()
fun onActionDeleteBookAlreadyRead()
fun onActionDiscardExercisesChanges()
fun onActionRetrySwingExercise()
```

### Lifecyle events

Also, some events are related to the lifecycle of our views. Our views (activities or viewcontrollers) have their lifecycle. In case we want to associate lifecycle with presenter events we are going to use `onView` prefix

For now, we got:
```
fun onViewLoaded()
fun onViewRefresh()
fun onViewDealloc()
```

### Platform specific methods

In case that we need a method in the presenter for a specific platform, we can use the previous prefix, provide a default implementation and also params default values.

```
fun onViewRefresh(sleepModeEnabled: Boolean = false)
```

## View

Each presenter has his own `view` and it's defined as an interface that represents the communication with the presenter.For example, if the presenter decides to display something, it's going to be communicated to the UI via view instance.

### Prefixes

#### onDisplay

Used when the presenter wants to display in the UI.

Examples:
```
fun onDisplayBikeDetails(bike: Bike)
fun onDisplayNewBook(book: Book)
fun onDisplaySwingExercises(listExercises: List\\\<Exercises\\>)
```

#### onNotify

Used when the UI needs to react to some event but it does not need to display something.

Examples:
```
fun onNotifyBikeSelected(bike:Bike)
fun onNotifyBookDeleted(book: Book)
fun onNotifySessionIsOver()
```

#### onFailed

Used for all the actions which it has a fail state.

Most of the actions have a negative side that we need to take care of. For example, `Interactors` can throw exceptions and we should handle them in our presenter and do actions in the view with these methods

Examples:
```
fun onFailedBikeDeleted()
fun onFailedDownloadBook()
fun onFailedLogin()
```

:::important pro tip
Try to handle and take care of the exception as much as possible in the Presenter. That's very important to have atomic behavior in both platforms in the case of Multiplatform.
:::
