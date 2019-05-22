# Operation

The [`Operation`](Operation.md) object itself defines intrinsically how a query must be forwarded to a data source, containing inside all parameters required to execute the action.

```swift
// Swift
public protocol Operation { }
```

```kotlin
// Kotlin
sealed class Operation
```
Note that an `Operation` depends exclusively on a custom implementation of a [`Repository`](Repository.md). Each [`Repository`](Repository.md) implementation will delcare it's supported `Operations`.

## Usage

```swift
// Swift
struct MyRetryOnceIfErrorOperation: Operation { }

// Custom repository implementation that supports MyRetryOnceIfErrorOperation
let repository = MyCustomRepository(...) 

repository.get(IdQuery("myKey"), operation: MyRetryOnceIfErrorOperation())
```

```kotlin
// Kotlin
object MyRetryOnceIfErrorOperation: Operation()

val repository = MyCustomRepository(...)

repository.get(IdQuery("myKey"), MyRetryOnceIfErrorOperation)
```

## Default implementations

- `DefaultOperation`: Empty operation. To be used when none operation is required or as a default behavior.

>**All repositories must accept this operation and perform its expectec behavior.**

Any other custom operation will be declared together with its [`Repository`](Repository.md) implementation.

## Using Operations in Repositories

Operations must be pro-actively supported in each [`Repository`](Repository.md) implementation. A typical appearance of an implemented `get` method from a `GetRepository` would be:

```swift
// Swift
func get(_ query: Query, operation: Operation) -> Future<MyObject> {
    switch operation.self {
    case MyRetryOnceIfErrorOperation():
        return someDataSource.get(query).recover {
            return someDatSource.get(query)
        }
    case is MyOtherOperation():
        ... 
    default:
        operation.fatalError(.get, self)
    }
}    
```

```kotlin
// Kotlin
override fun get(query: Query,operation: Operation): Future<MyObject> = when (operation) {
    is MyRetryOnceIfErrorOperation -> {...}
    is MyOtherOperation -> {...}
    else -> notSupportedOperation()
  }

```

Note the `default:` / `else` behavior. When using an unsupported operation, an exception/fatalError is raised as this is an illegal call.
