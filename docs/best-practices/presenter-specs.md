---
title: Presenter Specs
---

To normalize our presenters, we create these specs that all of us should follow. If you want a case that it's not specified here, let's discuss it in the #harmony channel. Also, find [here](https://github.com/mobilejazz/harmony-kotlin/blob/1d7f0a3b188599624e15a2435d110227b411ccd1/sample/src/main/java/com/mobilejazz/sample/specs/PresenterSpecs.kt) a sample.

## Presenter

Usually, it's an `interface` but also could be a `class`.

### onEvent

We are going to use the `onEvent` prefix when it's a method that is not triggered by the user. For example, when a notification appears or service is publishing events.

Examples:
```  
fun onEventWaterLowLevel()   
fun onEventBikeMove()  
```

### onAction

We are going to use the `onAction` prefix when the user triggers the event.

:::important pro tip
- Avoid do reference to your platform

Examples:
```  
fun onActionRegisterNotificationSystemBikeCrash() -> fun onActionTurnOnBikeCrashNotifications()  
```

-Avoid do reference to UI components

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

Each presenter has his `view`. A view is an interface that represents the events that a presenter can present in our views.

### onDisplay

We are going to use `onDisplay` prefix to display data in our view.

Examples: 
``` 
fun onDisplayBikeDetails(bike: Bike)  
fun onDisplayNewBook(book: Book)  
fun onDisplaySwingExercises(listExercises: List\\\<Exercises\\>)  
```


### onNotify

We are going to use `onNotify` when UI needs to react to some events.

Examples:  
```
fun onNotifyBikeSelected(bike:Bike)  
fun onNotifyBookDeleted(book: Book)  
fun onNotifySessionIsOver()  
```

### onFailed

We are going to use `onFailed` for all the actions that have a fail state. Most of the actions have a negative side that we need to take care of. Interactors can throw exceptions that we should handle in our presenter and do actions in the view with these methods


Examples:  
```
fun onFailedBikeDeleted()  
fun onFailedDownloadBook()  
fun onFailedLogin()
```

:::important pro tip
Try to handle and take care of the exception as much as possible in the Presenter. That's very important to have atomic behavior in both platforms in the case of Multiplatform.
:::
