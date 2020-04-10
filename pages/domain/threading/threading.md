---
title: Threading & Asynchrony
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Before reading this page, it's highly recommended to read about [Executors](executor).


In order to work with asynchronous interactors, on Swift & Kotlin every usecase implemented within an interactor must be wrapped inside an executor (defined upon initialization). This will grant the developer the ability to decide how the code will be executed (main thread, background thread in serial, background thread in parallel, etc.).

Note that on Typescript, we just need to use the built-in `async`/`await` decorators to manage asynchronous methods.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
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
    func execute(from date: Date) -> Future<TimeInterval> {
        return execute.submit { resolver in 
            let now = try currentTime.execute().get().result
            resolver.set(now.timeIntervalSince(date))
        }
    }
}
```

</TabItem>
<TabItem value="typescript">

```typescript
export class CurrentTimeInteractor {
    async execute(): Promise<Date> {
        return new Date()
    }
}

export class ElapsedTimeSinceNowInteractor {
    constructor(
        private readonly currentTime: CurrentTimeInteractor,
    ) {}
    async execute(date: Date): Promise<number> {
        let now = await this.currentTime.execute()
        return (now.getTime() - date.getTime()) / 1000.0;
    }
}
```

</TabItem>
</Tabs>

:::warning Deadlock warning
The code above might generate deadlocks in Swift & Kotlin. Code is running synchronously and if both interactors are using the same serial executor, it will generate a deadlock. 
:::

Meanwhile in Typescript we can use the `await` decorator to convert an asynchronous interactor into synchronous, in Swift and Kotlin we need to specify which executor to be used in order to run synchronously without creating a deadlock.

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
        return (executor ?? self.executor).submit { resolver in
            resovler.set(Date())
        }
    }
}

struct ElapsedTimeSinceNowInteractor {
    private let executor : Executor
    private let currentTime : CurrentTimeInteractor

    func execute(from date: Date, in executor: Executor? = nil) -> TimeInterval {
        return (executor ?? self.executor).submit { resolver in 
            let now = try currentTime.execute(in: DirectExecutor()).get().result
            resolver.set(now.timeIntervalSince(date))
        }
    }
}
```

</TabItem>
</Tabs>

As shown, by using a [`DirectExecutor`](executor) we can run synchronously within the top-most interactor's executor thread.
