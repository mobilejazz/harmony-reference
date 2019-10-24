---
title: Void Data Source
permalink: /data-source/void-data-source/
---

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
val dataSource = VoidDataSource<String>()
getDataSource.get("sampleKey").onComplete(onSuccess = {}, onFailure = {
    // Error is a UnsupportedOperationException
    print(it)
})
```

Note that the example above is using the extension methods of `DataSoruce` that encapsulate queries of type `IdQuery<T>`.

## Query Types

Any [`Query`](Query.md) can be passed to a `VoidDataSource<T>` (and all will result with an error).

## Other Implementations

Together with `VoidDataSource<T>` there are also similar implementations for:

- `VoidGetDataSource<T>`: Implements `GetDataSource`.
- `VoidPutDataSource<T>`: Implements `PutDataSource`.
- `VoidDeleteDataSource`: Implements `DeleteDataSource`.

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
class VoidDataSource<V> : GetDataSource<V>, PutDataSource<V>, DeleteDataSource {
  override fun get(query: Query): Future<V> = Future { throw UnsupportedOperationException() }

  override fun getAll(query: Query): Future<List<V>> = Future { throw UnsupportedOperationException() }

  override fun put(query: Query, value: V?): Future<V> = Future { throw UnsupportedOperationException() }

  override fun putAll(query: Query, value: List<V>?): Future<List<V>> = Future { throw UnsupportedOperationException() }

  override fun delete(query: Query): Future<Unit> = Future { throw UnsupportedOperationException() }

  override fun deleteAll(query: Query): Future<Unit> = Future { throw UnsupportedOperationException() }
}
```
