---
title: Interactor
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

An interactor is based in a design pattern called **Command Pattern**. A *command* has the exclusive and unique responsibility of performing one single operation. In other words, a *command* is an application's *use case*. Typically, an application will have many different *interactor* classes, each one responsible of executing atomically a different *use case*.

By having interactors, the business logic of your app is not going to be duplicated nor spread along the application layer. All business logic is going to be wrapped inside interactors.

As interactors classes have one single responsibility, all interactors will have one (and only one) public method that will be called `execute` (or will start with this name).

For example, we could have an interactor that returns the current time:

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
]}>
<TabItem value="kotlin">

```kotlin
class CurrentTimeInteractor {
    operator fun invoke(): Date = Date()
}
```

</TabItem>
<TabItem value="swift">

```swift
struct CurrentTimeInteractor {
    func execute() -> Date {
        return Date()
    }
}
```

</TabItem>
<TabItem value="typescript">

```typescript
export class CurrentTimeInteractor {
    execute(): Date {
        return new Date();
    }
}
```

</TabItem>
</Tabs>

## Composition

Interactors can perform from very easy to extremely complex operations. For this reason, it is a good practice to compose interactors in order to divide the reponsibility of each operation in its own interactor class.

For example, we could have an interactor that returns the time between now and a date:

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
]}>
<TabItem value="kotlin">

```kotlin
class ElapsedTimeSinceNowInteractor(val currentTimeInteractor: CurrentTimeInteractor) {
    operator fun invoke(date: Date): Long {
        val now = currentTimeInteractor()
        return now.time - date.time
    }
}
```

</TabItem>
<TabItem value="swift">

```swift
struct ElapsedTimeSinceNowInteractor {
    private let currentTime : CurrentTimeInteractor
    func execute(from date: Date) -> TimeInterval {
        let now = currentTime.execute()
        return now.timeIntervalSince(date)
    }
}
```

</TabItem>
<TabItem value="typescript">

```typescript
export class ElapsedTimeSinceNowInteractor {
    constructor(
        private readonly currentTime: CurrentTimeInteractor,
    ) {}
    execute(date: Date): number {
        let now = currentTime.execute()
        return (now.getTime() - date.getTime()) / 1000.0;
    }
}
```

</TabItem>
</Tabs>

## Asynchrony 

All the examples on this page show synchronous interactors. To read about asynchronous interactors (and threading), visit the page [**Threading & Asynchrony**](/docs/fundamentals/domain/threading).

## Default Interactors

In order to access the CRUD operations of a [`Repository`](/docs/fundamentals/data/repository/repository), there are interactors for each CRUD operation.

Default interators have one method called `execute` (in Kotlin, it is using the `invoke` operator) which contains the same parameters than the Repository functions, plus an optional `Executor`.

### Get

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
]}>
<TabItem value="kotlin">

```kotlin
- GetInteractor<T>
- GetAllInteractor<T>
```
</TabItem>
<TabItem value="swift">

```swift
- Interactor.Get<T>
- Interactor.GetByQuery<T>
- Interactor.GetAll<T>
- Interactor.GetAllByQuery<T>
```
</TabItem>
<TabItem value="typescript">

```typescript
- GetInteractor<T>
- GetAllInteractor<T>
```
</TabItem>
</Tabs>

### Put

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
]}>
<TabItem value="kotlin">

```kotlin
- PutInteractor<T>
- PutAllInteractor<T>
```
</TabItem>
<TabItem value="swift">

```swift
- Interactor.Put<T>
- Interactor.PutByQuery<T>
- Interactor.PutAll<T>
- Interactor.PutAllByQuery<T>
```
</TabItem>
<TabItem value="typescript">

```typescript
- PutInteractor<T>
- PutAllInteractor<T>
```
</TabItem>
</Tabs>

### Delete

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
]}>
<TabItem value="kotlin">

```kotlin
- DeleteInteractor
```
</TabItem>
<TabItem value="swift">

```swift
- Interactor.Delete
- Interactor.DeleteByQuery
```
</TabItem>
<TabItem value="typescript">

```typescript
- DeleteInteractor
```
</TabItem>
</Tabs>

:::important Important
Note the naming conventions used in Swift: `Interactor` is a struct used to define a namespace and all default interactors are nested classes defined within that struct (namespace).
:::

### Swift Notes

For each interactor there are two sub-types: `Interactor.XXX` and `Interactor.XXXByQuery`. The `ByQuery` interactors are the ones equivalent to Android `XXXInteractor`. These interactors have an `execute` method than has the `query` as a parameter. Additionally, Swift has the `Interactor.XXX` which the query is passed upon initialization and not as a parameter in the `execute` method. 

### `IdQuery` CRUD extensions

Similar to the [`Repository`](/docs/fundamentals/data/repository/repository) public interface, all default interactors interfaces are extended with methods to access the CRUD functions by an Id using the `IdQuery`.

## Default Interactors Composition

Typically, your custom interactors will require repositories to access the data manipulation layer.
 
:::tip tip
It is recomended to **compose default interactors** instead of having direct references to repositories. Same applies with custom interactors composing other custom interactors.
:::

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
]}>
<TabItem value="kotlin">

```kotlin
class CountAllUsersInteractor constructor (
    private val executor: Executor = AppExecutor,
    private val getUsers: GetAllInteractor<User>) {

    operator fun invoke (
        executor: Executor = this.executor
    ): Future<Int> =
        executor.submit(Callable {
            return@Callable getUsers(executor = DirectExecutor).get().size
        })
}

class UserLimitReachedInteractor constructor(
    private val executor: Executor = AppExecutor,
    private val userCount: CountAllUsersInteractor) {

    operator fun invoke(
        executor: Executor = this.executor,
        limit: Int
    ): Future<Boolean> =
        executor.submit(Callable {
            val count = userCount(executor = DirectExecutor).get()
            return@Callable count > limit
        })

}
```

</TabItem>
<TabItem value="swift">

```swift
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

</TabItem>
<TabItem value="typescript">

```typescript
export class CountAllUsersInteractor {
    constructor(
        readonly getUsers: GetAllInteractor<User>,
    ){}
    async execute(): Promise<number> {
        let array = await this.getUsers.execute(new AllObjectsQuery());
        return array.count;
    }
}

export class UserLimitReachedInteractor {
    constructor(
        private readonly userCount: CountAllUsersInteractor,
    ) {}
    async execute(limit: number): Promise<boolean> {
        let count = this.userCount.execute();
        return count > limit;
    }
}
```

</TabItem>
</Tabs>

## Best Practices

- Try to wrap generic interactors inside a custom one. It has better naming, encapsulate a specific logic and reusable.

- All interactors will receive a **executor via constructor**.

- Also, supply a executor in the invoke/execute method doing reference to the contructor one as default. It gives us the possibility to change it for a particular execution.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
class CurrentTimeInteractor(private val executor: Executor) {
    operator fun invoke(executor: Executor = this.executor): Date = Date()
}
```

</TabItem>
<TabItem value="swift">

```swift
struct CurrentTimeInteractor(private let executor : Executor) {
    func execute(executor: Executor = this.executor) -> Date {
        return Date()
    }
}
```

</TabItem>
</Tabs>

- In the constructor, always have **interactor references**, avoid repository references. Adding one more layer of abstraction.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>


<TabItem value="kotlin">

```kotlin
class CurrentTimeInteractor(private val executor: Executor, 
                            private val getTimeZones: GetInteractor<TimeZones>) {
    operator fun invoke(executor: Executor = this.executor): Date = 
    executor.submit(Callable{
        Date()
    })
}
```

</TabItem>
<TabItem value="swift">

```swift
struct CurrentTimeInteractor(private let executor : Executor, 
                            private let getTimeZones: GetInteractor<TimeZones>) {
    func execute(executor: Executor = this.executor) -> Date {
        return Date()
    }
}
```

</TabItem>
</Tabs>



