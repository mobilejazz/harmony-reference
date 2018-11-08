# Executor

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

Kotlin mj-core is using the concurrency package from Guava to suply the lack of Asynchronous calls from the Java `Future` with the Guava `ListenableFuture` using `ListeningExecutorService` instead of a Java `ExecutorService`.

To provide a abstraction from Guava `ListenableFuture` and `ListeningExecutorService` types we expose two kotlin `typealias`:
- `Executor` --> `ListeningExecutorService`
- `Future` --> `ListenableFuture`

More information: 
- https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Executor.html
- https://github.com/google/guava/wiki/ListenableFutureExplained

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

