---
title: MVI Specification
---

This document highlights the components and specifications of Model-View-Intent view pattern.

To accompany this documentation it is useful to also check the [iOS](https://github.com/mobilejazz/harmony-kotlin/tree/ddd5b069b6afa480aac6991cb5fa9779645f6f81/sample-ios) and [Android](https://github.com/mobilejazz/harmony-kotlin/tree/ddd5b069b6afa480aac6991cb5fa9779645f6f81/sample-android-compose) samples implementing this pattern.

## ViewModel
Defines the interactions between the *user* or *platform* with the application business logic.

Specification:
* The ViewModel must define a function called `onAction` that accept the [Action](#action) as parameter.
* The ViewModel must contain a [ViewState](#viewstate) attribute called `viewState` that will be observed by the View.

### ViewModel on KMM
A ViewModel on KMM project you must follow this specification:
* Must inherit from `ViewModel` class.
* Must declare a public and a private version of the ViewState:
  * `private _viewState: MutableStateFlow` that will be modified inside the ViewModel.
  * `public viewState: StateFlow` to be observed by the View.

<details>
  <summary>Sample of ViewModel on KMM</summary>
  <div>

```kotlin 
class HackerPostsViewModel(
  private val getPostsInteractor: GetHackerNewsPostsInteractor
) : ViewModel<HackerPostsViewState, HackerPostsAction>() {

  private val _viewState: MutableStateFlow<HackerPostsViewState> = MutableStateFlow(HackerPostsViewState.Loading)
  override val viewState: StateFlow<HackerPostsViewState> = _viewState

  init {
    loadPosts()
  }

  private fun loadPosts() {
    _viewState.value = HackerPostsViewState.Loading
    launch {

      getPostsInteractor().fold(
        ifLeft = {
          _viewState.value = HackerPostsViewState.Error("Error happened")
        },
        ifRight = {
          _viewState.value = HackerPostsViewState.Content(it)
        }
      )
    }
  }

  override fun onAction(action: HackerPostsAction) {
    when (action) {
      is HackerPostsAction.PostSelected -> {
        _viewState.value = _viewState.value.update { state: HackerPostsViewState.Content ->
          state.copy(navigation = OneShotEvent(HackerPostsNavigation.ToDetail(action.id)))
        }
      }
      HackerPostsAction.Refresh -> {
        loadPosts()
      }
    }
  }
}
```
  </div>
</details>

## Action
Actions define all the events and actions that starts in the View. For each view we must define a set of actions that the view can perform. 

Relation with other components:
* The View uses Actions to communicate events to the ViewModel.
* The ViewModel receive the Actions and act upon them (e.g: executing some logic in the domain layer and/or updating the ViewState).

### Action on KMM
To properly define actions on a KMM project you must:
* Create a sealed class containing all the actions available.
* That class must inherit from `Action`.

<details>
  <summary>Sample of Action on KMM</summary>
  <div>

```kotlin
sealed class HackerPostsAction : Action {
  object Refresh : HackerPostsAction()
  class PostSelected(val id: Long) : HackerPostsAction()
} 
```
  </div>
</details>


## ViewState
ViewState defines all the possible states of a View. We define it using an `enum` or `sealed class`.

Relation with other components:
* The View is observing the ViewState to redraw itself with the correct UI.
* The ViewModel is in charge of updating the ViewState.

### ViewState on KMM
To properly define a ViewState on a KMM project you must:
* Create a sealed class containing all the possible states.
* That class must inherit from `ViewState`.
* If inside a particular state a navigation could happen:
  * A sealed class containing al the possible navigations must be created.
  * That class must inherit from `Navigation`.
  * In the state where the navigation can happen an attribute `OneShotEvent<AnyStateNavigation>` must be added.

<details>
  <summary>Sample of ViewState on KMM</summary>
  <div>

```kotlin
sealed class HackerPostsViewState : ViewState {
  object Loading : HackerPostsViewState()
  class Error(val message: String) : HackerPostsViewState()
  data class Content(
    val posts: HackerNewsPosts,
    val navigation: OneShotEvent<HackerPostsNavigation> = OneShotEvent.Empty()
  ) : HackerPostsViewState()
  
}
```
  </div>
</details>

## View
On each change on the ViewState the view redraws itself to reflect the correct state.                                                       
The events that occur in the view (like a tap on a button) must be notified to the ViewModel using the `onAction` method.

### iOS View in SwiftUI using KMM ViewModel
When developing an iOS View using a KMM ViewModel you must use the following classes to provide compatibility between KMM and SwiftUI:
* [ObservableViewModel](https://github.com/mobilejazz/harmony-kotlin/blob/ddd5b069b6afa480aac6991cb5fa9779645f6f81/sample-ios/Sample/Common/ObservableViewModel.swift): Wrapper around KMM ViewModel to make it observable by SwiftUI
* [ObservableNavigation](https://github.com/mobilejazz/harmony-kotlin/blob/ddd5b069b6afa480aac6991cb5fa9779645f6f81/sample-ios/Sample/Common/ObservableNavigation.swift): Wrapper around KMM Navigation to make it observable by SwiftUI

[Here](https://github.com/mobilejazz/harmony-kotlin/blob/ddd5b069b6afa480aac6991cb5fa9779645f6f81/sample-ios/Sample/HackerNew%20Posts/HackerPostsView.swift) you can find an example of how those classes are used.
