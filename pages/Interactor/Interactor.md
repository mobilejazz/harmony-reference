---
title: Interactor
permalink: /interactor/
---

# Interactor

## Introduction

An interactor is based in a design pattern called **Command Pattern**. A *command* has the exclusive and unique responsibility of performing one single operation. In other words, a *command* is an application's *use case*. Typically, an application will have many different *interactor* classes, each one responsible of executing atomically a different *use case*.

By having interactors, the buisness logic of your app is not going to be duplicated nor spread along the application layer. All business logic is going to be wrapped inside interactors.

As interactors classes have one single responsibility, all interactors will have one (and only one) public method that will be called `execute` (or will start with this name).

For example, we could have an interactor that returns the current time:

```swift
// Swift
struct CurrentTimeInteractor {
    func execute() -> Date {
        return Date()
    }
}
```

```kotlin
// Kotlin
class CurrentTimeInteractor {
    operator fun invoke(): Date = Date()
}
```

## Composition

Interactors can perform from very easy to extremely complex operations. For this reason, it is a good practice to compose interactors in order to divide the reponsibility of each operation in its own interactor class.

For example, we could have an interactor that returns the time between now and a date:

```swift
// Swift
struct ElapsedTimeSinceNowInteractor {
    private let currentTime : CurrentTimeInteractor
    func execute(from date: Date) -> TimeInterval {
        let now = currentTime.execute()
        return now.timeIntervalSince(date)
    }
}
```

```kotlin
// Kotlin
class ElapsedTimeSinceNowInteractor(val currentTimeInteractor: CurrentTimeInteractor) {
    operator fun invoke(date: Date): Long {
        val now = currentTimeInteractor()
        return now.time - date.time
    }
}
```

## Threading

Every usecase implemented within an interactor must be wrapped inside an executor (defined upon initialization). This will grant the developer the ability to decide how the code will be executed (main thread, background thread in serial, background thread in parallel, etc.).

For this reason, every interactor must have in its constructor/initializer an executor.

```swift
// Swift
struct CurrentTimeInteractor {
    private let executor : Executor
    func execute() -> Future<Date> {
        return executor.submit { resolver in
            resovler.set(Date())
        }
    }
}

struct ElapsedTimeSinceNowInteractor {
    private let executor : Executor
    private let currentTime : CurrentTimeInteractor
    func execute(from date: Date) -> TimeInterval {
        return execute.submit { resolver in 
            let now = try currentTime.execute().get().result
            resolver.set(now.timeIntervalSince(date))
        }
    }
}
```

```kotlin
// Kotlin
class CurrentTimeInteractor(val executor: Executor) {
    operator fun invoke(): Future<Date> {
        return executor.submit(Callable {
            Date()
        })
    }
}

class ElapsedTimeSinceNowInteractor(val executor: Executor, val currentTimeInteractor: CurrentTimeInteractor) {
    operator fun invoke(date: Date): Future<Long> {
        return executor.submit(Callable {
            val now = currentTimeInteractor().get()
            now.time - date.time
        })
    }
}
```

>Note that the above is obtaining synchronoulsy the result of the `currentTime` interactor, which might lead to a **deadlock** if the executor of both interactors are using the same single-thread executor / serial queue.

In order to solve this issue, it is a good practice to include an optional executor parameter within the interactor's `execute` method:

```swift
// Swift
struct CurrentTimeInteractor {
    private let executor : Executor
    func execute(in executor: Executor? = nil) -> Future<Date> {
        let executor = executor ?? self.executor
        return executor.submit { resolver in
            resovler.set(Date())
        }
    }
}

struct ElapsedTimeSinceNowInteractor {
    private let executor : Executor
    private let currentTime : CurrentTimeInteractor
    func execute(from date: Date) -> TimeInterval {
        return execute.submit { resolver in 
            let now = try currentTime.execute(in: DirectExecutor()).get().result
            resolver.set(now.timeIntervalSince(date))
        }
    }
}
```

```kotlin
// Kotlin
class CurrentTimeInteractor(val executor: Executor) {
    operator fun invoke(executor: Executor = this.executor): Future<Date> {
        return executor.submit(Callable {
            Date()
        })
    }
}

class ElapsedTimeSinceNowInteractor(val executor: Executor, val currentTimeInteractor: CurrentTimeInteractor) {
    operator fun invoke(date: Date): Future<Long> {
        return executor.submit(Callable {
            val now = currentTimeInteractor(DirectExecutor).get()
            now.time - date.time
        })
    }
}
```

This example is using a [`DirectExecutor`](Executor.md) to perform synchronously.

## Default Interactors

In order to access the CRUD operations of a [`Repository`](../Repository/Repository.md), there are interactors for each CRUD operation.

Default interators have one method called `execute` (in Kotlin, it is using the `invoke` operator) which contains the same parameters than the Repository functions, plus an optional `Executor`.

### Get

Get interactors require a `GetRepository` and an `Executor` upon initialization.

Swift:

- `Interactor.Get<T>`
- `Interactor.GetByQuery<T>`
- `Interactor.GetAll<T>`
- `Interactor.GetAllByQuery<T>`

Kotlin:

- `GetInteractor<T>`
- `GetAllInteractor<T>`

### Put

Put interactors require a `PutRepository` and an `Executor` upon initialization.

Swift:

- `Interactor.Put<T>`
- `Interactor.PutByQuery<T>`
- `Interactor.PutAll<T>`
- `Interactor.PutAllByQuery<T>`

Kotlin:

- `PutInteractor<T>`
- `PutAllInteractor<T>`

### Delete

Delete interactors require a `DeleteRepository` and an `Executor` upon initialization.

Swift:

- `Interactor.Delete`
- `Interactor.DeleteByQuery`
- `Interactor.DeleteAll`
- `Interactor.DeleteAllByQuery`

Kotlin:

- `DeleteInteractor`
- `DeleteAllInteractor`

>Note the naming conventions used in Swift: `Interactor` is a struct used to define a namespace and all default interactors are nested classes defined within that struct (namespace).

### Swift Notes

For each interactor there are two sub-types: `Interactor.XXX` and `Interactor.XXXByQuery`. The `ByQuery` interactors are the ones equivalent to Android `XXXInteractor`. These interactors have an `execute` method than has the `query` as a parameter. Additionally, Swift has the `Interactor.XXX` which the query is passed upon initialization and not as a parameter in the `execute` method. 

### `IdQuery` CRUD extensions

Similar to the [`Repository`](../Repository/Repository.md) public interface, all default interactors interfaces are extended with methods to access the CRUD functions by an Id using the `IdQuery`.

## Default Interactors Composition

Typically, your custom interactors will require repositories to access the data manipulation layer. However, it is recomended to **compose default interactors** instead of having direct references to repositories.

Same applies with custom interactors composing other custom interactors.

For example:

```swift
// Swift
struct CountAllUsersInteractor {
    private let executor : Executor
    private let getUsers : Interactor.GetAllByQuery<User>

    func execute(in: Executor? = nil) -> Future<UInt> {
        let executor = executor ?? self.executor
        return executor.submit { resolver in 
            let array = try getUsers.execute(AllObjectsQuery(), in: DirectExecutor()).get().result
            resolver.set(array.count)
        }
    }
}

struct UserLimitReachedInteractor {
    private let executor : Executor
    private let userCount : CountAllUsersInteractor

    func execute(limit : Int) -> Future <Bool> {
        return executor.submit { resolver in
            let count = try userCount.execute(in: DirectExecutor()).get().result
            resolver.set(count > limit)
        }
    }
}
```

```kotlin
// Kotlin
// TODO
```
