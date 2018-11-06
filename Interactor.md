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
// TODO
```

## Composition

Interactors can perform from very easy to extremely complex operations. For this reason, it is a good practice to compose interactors in order to divide the reponsibility of each operation in its own interactor class.

For example, we could have an interactor that retuns the time between now and a date:

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
// TODO
```

## Threading

Every usecase implemented within an interactor must be wrapped inside an executor (defined upon initialization). This will grant the developer to decide how the code will be executed (main thread, background thread in serial, background thread in parallel, etc.).

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
// TODO
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
// TODO
```

This example is using a [`DirectExecutor`](Executor.md) to perform synchronously.


## Default Interactors

In order to access the CRUD operations of a [`Repository`](Repository.md), there are interactors for each CRUD operation.

Default interators have one method called `execute` (in Kotlin, it is using the `invoke` operator) which contains the same parameters than the Repository functions, plus an optional `Executor`.

### **GET**

Get interactors require a `GetRepository` and an `Executor` upon initialization.

Swift:
- `Interactor.Get<T>`
- `Interactor.GetByQuery<T>`
- `Interactor.GetAll<T>`
- `Interactor.GetAllByQuery<T>`

Kotlin:
- `GetInteractor<T>`
- `GetAllInteractor<T>`

### **PUT**

Put interactors require a `PutRepository` and an `Executor` upon initialization.
 
Swift:
- `Interactor.Put<T>`
- `Interactor.PutByQuery<T>`
- `Interactor.PutAll<T>`
- `Interactor.PutAllByQuery<T>`

Kotlin:
- `PutInteractor<T>`
- `PutAllInteractor<T>`

### **DELETE**

Delete interactors require a `DeleteRepository` and an `Executor` upon initialization.
 
Swift:
- `Interactor.Delete`
- `Interactor.DeleteByQuery`
- `Interactor.DeleteAll`
- `Interactor.DeleteAllByQuery`

Kotlin:
- `DeleteInteractor`
- `DeleteAllInteractor`

### `IdQuery` CRUD extensions

Similar to the [`Repository`](Repository.md) public interface, all default interactors interfaces are extended with methods to access the CRUD functions by an Id using the `IdQuery`.

## Recomendations

- Compose the default interactors to access a repository.
