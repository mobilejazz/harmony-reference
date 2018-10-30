# Executor

An executor is an abstract definition of an object responsible of executing a block of code.

```swift
// Swift
public protocol Executor {
    var name : String? { get }
    var executing : Bool { get }
    func submit(_ closure: @escaping (@escaping () -> Void) -> Void)
}
```

```kotlin
// Kotlin
// TODO
```

Note that the `submit` function exposes a closure/lambda that includes inside another closure/lambda. This nested block must be called once the execution finishes.

## Usage

```swift
// Swift
let executor : Executor = [...]
executor.submit { end in 
    // Do custom stuff and once finished call end
    end()
}
```

```kotlin
// Kotlin
// TODO
```

## Default implementations

- `DirectExecutor`: executes the code on the calling thread synchronously.

### Kotlin exclusive implementations

- TODO
- TODO
- TODO

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
}
```

