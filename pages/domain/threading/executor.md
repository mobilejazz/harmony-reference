---
title: Executor
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Swift

An executor is an abstract definition of an object responsible of executing a block of code.

```swift
// Swift
public protocol Executor {
    var name : String? { get }
    var executing : Bool { get }
    func submit(_ closure: @escaping (@escaping () -> Void) -> Void)
}
```

Note that the `submit` function exposes a closure/lambda that includes inside another closure/lambda. This nested block must be called once the execution finishes.

### Usage

```swift
// Swift
let executor : Executor = [...]
executor.submit { end in 
    // Do custom stuff and once finished call end
    end()
}
```

## Kotlin

A executor service creates and maintains a reusable pool of threads for executing submitted tasks.

Kotlin mj-core is using the concurrency package from Guava to suply the lack of Asynchronous calls from the Java `Future` with the Guava `ListenableFuture`, using `ListeningExecutorService` instead of a Java `ExecutorService`.

To provide an abstraction from Guava `ListenableFuture` and `ListeningExecutorService` types, we expose two kotlin `typealias`:

- `Executor` --> `ListeningExecutorService`
- `Future` --> `ListenableFuture`

More information: 
- [https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Executor.html](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Executor.html)
- [https://github.com/google/guava/wiki/ListenableFutureExplained](https://github.com/google/guava/wiki/ListenableFutureExplained)

### Usage

```kotlin
val executor: Executor = [...]

// Execute the callable in the executor and returns a Future<T>
executor.submit(Callable { ... })

// Execute a Runnable instance in the executor and returns void
executor.execute({ ... })
```

## Default implementations

- `DirectExecutor`: executes the code on the calling thread synchronously.

### Kotlin exclusive implementations

- `AppExecutor`: Single thread executor.
- `AppUiExecutor`: Main thread executor.

### Swift exclusive implementations

- `MainDirectExecutor`: executes the code in the main thread asynchrounously if called from a background thread or synchronously if called from the main thread.
- `DispatchQueue`: the standard swift type has been extended to conform to `Executor`.
- `DispatchQueueExecutor`: custom class that implements an `Executor` using a `DispatchQueue`.
- `OperationQueue`: the standard swift type has been extended to conform to `Executor`.
- `OperationQueueExecutor`: custom class that implements an `Executor` using an `OperationQueue`.

## Swift `Future` extension

Executor is extended in Swift for a better integration with `Future`:

```swift
// Swift
extension Executor {
    public func submit<T>(_ closure: @escaping (FutureResolver<T>) throws -> Void) -> Future<T>
    public func submit(_ closure: @escaping () throws -> Void) -> Future<Void>
}
```

New `submit` functions has been implemented in order to monitor and `end` the executor's execution upon future resolving.

For example:

```swift
// Swift
let future : Future<Item> = executor.submit { resolver in 
    customStuffSyncOrAsync { item in 
        resolver.set(value)
    }
}

future.then { item in
    // Do stuff, like update UI.
    // Note that by default, then block is called using a MainDirectExecutor, ensuring this code is run in the main thread.
}
```

## Nesting Executors

Executors can be netsed (an block using an executor being called in another executor). 
:::warning Deadlock
It might lead to deadlocks if not handled correctly.
:::

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
val executor: Executor = AppExecutor()
executor.submit({ 
    executor.submit({ })
})
```

</TabItem>
<TabItem value="swift">

```swift
let executor : Executor = DispatchQueue(label: "serialQueue")
executor.submit { end in 
    executor.submit { end in end() }
    end()
}
```

</TabItem>
</Tabs>

This example above is nesting two executor calls, where the executor is based on a serial queue / single thread. This means that when the second call to `submit` happens, the queue will block further code execution waiting for the first call to `submit` ends, which won't happen as the code is now stopped.

To solve this, there are two options:

1. When nesting executor calls, use the `DirectExecutor` on all nested executor references. The `DirectExecutor` will execute the code in the same thread/queue, not creating any deadlock.

2. Use concurrent executors. However, be aware that when using concurrent executors, all code used within an executor must be thread-safe. To avoid threading issues, it is always a safer option to not use concurrent executors.
