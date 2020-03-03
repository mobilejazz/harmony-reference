---
title: Void Data Source
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# VoidDataSource

`VoidDataSource<T>` is an empty implementation of `GetDataSource`, `PutDataSource` and `DeleteDataSource`. Any call to these functions will result in an error being thrown.

## Usage

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
val dataSource = VoidDataSource<String>()
getDataSource.get("sampleKey").onComplete(onSuccess = {}, onFailure = {
    // Error is a UnsupportedOperationException
    print(it)
})
```

</TabItem>
<TabItem value="swift">

```swift
let dataSource = VoidDataSource<String>()
dataSource.get("sampleKey").fail { error in
    // Error is of type CoreError.NotImplemented
    print("Function is not implemented!")
}
```

</TabItem>
</Tabs>

Note that the example above is using the extension methods of `DataSoruce` that encapsulate queries of type `IdQuery<T>`.

## Query Types

Any [`Query`](query.md) can be passed to a `VoidDataSource<T>` (and all will result with an error).

## Other Implementations

Together with `VoidDataSource<T>` there are also similar implementations for:

- `VoidGetDataSource<T>`: Implements `GetDataSource`.
- `VoidPutDataSource<T>`: Implements `PutDataSource`.
- `VoidDeleteDataSource`: Implements `DeleteDataSource`.

## Implementation Notes

Find below an example of implementation of a `VoidDataSource<T>`:

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
class VoidDataSource<V> : GetDataSource<V>, PutDataSource<V>, DeleteDataSource {
    override fun get(query: Query): Future<V> = Future { throw UnsupportedOperationException() }
    override fun getAll(query: Query): Future<List<V>> = Future { throw UnsupportedOperationException() }
    override fun put(query: Query, value: V?): Future<V> = Future { throw UnsupportedOperationException() }
    override fun putAll(query: Query, value: List<V>?): Future<List<V>> = Future { throw UnsupportedOperationException() }
    override fun delete(query: Query): Future<Unit> = Future { throw UnsupportedOperationException() }
    override fun deleteAll(query: Query): Future<Unit> = Future { throw UnsupportedOperationException() }
}
```

</TabItem>
<TabItem value="swift">

```swift
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

</TabItem>
</Tabs>
