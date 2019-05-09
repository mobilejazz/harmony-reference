# VoidRepository

`VoidRepository<T>` is an empty implementation of `GetRepository`, `PutRepository` and `DeleteRepository`. Any call to these functions will result in an error being thrown.

## Usage

```swift
// Swift
let repository = VoidRepository<String>()
repository.get("sampleKey", operation: DefaultOperation()).fail { error in
    // Error is of type CoreError.NotImplemented
    print("Function is not implemented!")
}
```

```kotlin
// Kotlin
val repository = VoidRepository<String>()
repository.get("sampleKey").onComplete(onSuccess = {}, onFailure = {
    // Error is a UnsupportedOperationException
    print(it)
})
```

Note that the example above is using the extension methods of `Repository` that encapsulate queries of type `IdQuery<T>`.

## Operation Types

Any [`Operation`](Operation.md) can be passed to a `VoidRepository<T>` (and all will result with an error).

## Other Implementations

Together with `VoidRepository<T>` there are also similar implementations for:

- `VoidGetRepository<T>`: Implements `GetRepository`.
- `VoidPutRepository<T>`: Implements `PutRepository`.
- `VoidDeleteRepository`: Implements `DeleteRepository`.

## Implementation Notes

Find below an example of implementation of a `VoidRepository<T>`:

```swift
// Swift
public class VoidRepository<T> : GetRepository, PutRepository, DeleteRepository {
    public init() { }
    public func get(_ query: Query, operation: Operation) -> Future<T> { return Future(CoreError.NotImplemented()) }
    public func getAll(_ query: Query, operation: Operation) -> Future<[T]> { return Future(CoreError.NotImplemented()) }
    public func put(_ value: T?, in query: Query, operation: Operation) -> Future<T> { return Future(CoreError.NotImplemented()) }
    public func putAll(_ array: [T], in query: Query, operation: Operation) -> Future<[T]> { return Future(CoreError.NotImplemented()) }
    public func delete(_ query: Query, operation: Operation) -> Future<Void> { return Future(CoreError.NotImplemented()) }
    public func deleteAll(_ query: Query, operation: Operation) -> Future<Void> { return Future(CoreError.NotImplemented()) }
}
```

```kotlin
// Kotlin
class VoidRepository<V> : GetRepository<V>, PutRepository<V>, DeleteRepository {

  override fun get(query: Query, operation: Operation): Future<V> = Future { notSupportedOperation() }

  override fun getAll(query: Query, operation: Operation): Future<List<V>> = Future { notSupportedOperation() }

  override fun put(query: Query, value: V?, operation: Operation): Future<V> = Future { notSupportedOperation() }

  override fun putAll(query: Query, value: List<V>?, operation: Operation): Future<List<V>> = Future { notSupportedOperation() }

  override fun delete(query: Query, operation: Operation): Future<Unit> = Future { notSupportedOperation() }

  override fun deleteAll(query: Query, operation: Operation): Future<Unit> = Future { notSupportedOperation() }
}
```
