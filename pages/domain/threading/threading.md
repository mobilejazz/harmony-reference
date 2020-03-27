---
title: Threading
---

Every usecase implemented within an interactor must be wrapped inside an executor (defined upon initialization). This will grant the developer the ability to decide how the code will be executed (main thread, background thread in serial, background thread in parallel, etc.).

For this reason, every interactor must have in its constructor/initializer an executor.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
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

</TabItem>
<TabItem value="swift">

```swift
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

</TabItem>
</Tabs>

>Note that the above is obtaining synchronoulsy the result of the `currentTime` interactor, which might lead to a **deadlock** if the executor of both interactors are using the same single-thread executor / serial queue.

In order to solve this issue, it is a good practice to include an optional executor parameter within the interactor's `execute` method:

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
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

</TabItem>
<TabItem value="swift">

```swift
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

</TabItem>
</Tabs>

This example is using a [`DirectExecutor`](executor.md) to perform synchronously.