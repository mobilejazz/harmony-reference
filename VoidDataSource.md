# VoidDataSource

`VoidDataSource<T>` is an empty implementation of `GetDataSource`, `PutDataSource` and `DeleteDataSource`. Any call to these functions will result in an error being thrown.

## Usage

```swift
// Swift
let dataSource = VoidDataSource<String>()
dataSource.get("sampleKey").fail { error in
    // Error is of type CoreError.NotImplemented
    print("Function is not implemented!")
}
```

```kotlin
// Kotlin
// TODO
```

Note that the example above is using the extension methods of DataSoruce that encapsulate queries of type `IdQuery<T>`.

## Query Types

Any [`Query`](Query.md) can be passed to a `VoidDataSource<T>`.

## Other Implementations

Together with `VoidDataSource<T>` there are also similar implementations for:

- `VoidGetDataSource<T>`: Implements `GetDataSource`.
- `VoidPutDataSource<T>`: Implements `PutDataSource`.
- `VoidDeleteDataSource<T>`: Implements `DeleteDataSource`.
- `VoidGetPutDataSource<T>`: Implements `GetDataSource` and `PutDataSource`.
- `VoidGetDeleteDataSource<T>`: Implements `GetDataSource` and `DeleteDataSource`.
- `VoidPutDeleteDataSource<T>`: Implements `PutDataSource` and `DeleteDataSource`.

## Implementation Notes

Find below an example of implementation of a `VoidDataSource<T>`:

```swift
// Swift
public class VoidDataSource<T> : GetDataSource, PutDataSource, DeleteDataSource {
    public init() { }
    public func get(_ query: Query) -> Future<T> { return Future(CoreError.NotImplemented()) }
    public func getAll(_ query: Query) -> Future<[T]> { return Future(CoreError.NotImplemented()) }
    public func put(_ value: T?, in query: Query) -> Future<T> { return Future(CoreError.NotImplemented()) }
    public func putAll(_ array: [T], in query: Query) -> Future<[T]> { return Future(CoreError.NotImplemented()) }
    public func delete(_ query: Query) -> Future<Void> { return Future(CoreError.NotImplemented()) }
    public func deleteAll(_ query: Query) -> Future<Void> { return Future(CoreError.NotImplemented()) }
}
```

```kotlin
// Kotlin
// TODO
```