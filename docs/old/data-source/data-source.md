---
title: DataSource
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A `DataSource` is an interface for those classes responsible of fetching and managing raw data. This data can be manipulated in many ways as for example being stored in a local database, being sent via a network or socket interface or any third party services (sending emails via Sengrid or SMS via another service).

## Usage

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
val dataSource = MyCustomGetDataSource()
dataSource.get(ByIdentifierQuery("myKey")).onComplete(onSuccess = {
    println(it)
}, onFailure = {
    println(it.localizedMessage)
})
```

</TabItem>
<TabItem value="swift">

```swift
let dataSource = MyCustomGetDataSource()
dataSource.get(IdQuery("myKey")).then { value in
    print("Success: \(value)")
}.fail { error in 
    print("Failure: \(error)")
}
```

</TabItem>
</Tabs>

## Query

A [`Query`](query) object itself defines intrinsically how data must be manipulated, containing inside all parameters required to execute the action.

For more information, read the [`Query`](query) reference.

## API

All actions handled by a `DataSource` are grouped in a simple CRUD.

### Get

Fetch related functions.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
interface GetDataSource<V> : DataSource {
    fun get(query: Query): Future<V>
    fun getAll(query: Query): Future<List<V>>
}
```

</TabItem>
<TabItem value="swift">

```swift
public protocol GetDataSource : DataSource {
    associatedtype T
    func get(_ query: Query) -> Future<T>
    func getAll(_ query: Query) -> Future<[T]>
}
```

</TabItem>
</Tabs>

### Put

Actions related functions. PUT methods will be responsible of editing, modifying, sending or any other action related method.

Note that in the `put` function, the `value` is optional. This happens becasue it is not always required to have an actual `value` to perform the action defined by the [`Query`](query). In the case of `putAll`, an empty array can be passed.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
interface PutDataSource<V> : DataSource {
    fun put(query: Query, value: V?): Future<V>
    fun putAll(query: Query, value: List<V>? = emptyList()): Future<List<V>>
}
```

</TabItem>
<TabItem value="swift">

```swift
public protocol PutDataSource : DataSource {
    associatedtype T
    func put(_ value: T?, in query: Query) -> Future<T>
    func putAll(_ array: [T], in query: Query) -> Future<[T]>
}
```

</TabItem>
</Tabs>

### Delete

Deletion related functions.

Note that only a [`Query`](query) is required and no value is returned rather than a Future encapsulating the output error.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
interface DeleteDataSource : DataSource {
    fun delete(query: Query): Future<Unit>
    fun deleteAll(query: Query): Future<Unit>
}
```

</TabItem>
<TabItem value="swift">

```swift
public protocol DeleteDataSource : DataSource {
    func delete(_ query: Query) -> Future<Void>
    func deleteAll(_ query: Query) -> Future<Void>
}
```

</TabItem>
</Tabs>

## `IdQuery` CRUD extensions

All  `GetDataSource`, `PutDataSource` and `DeleteDataSource` interfaces are extended with methods to access the CRUD functions by an Id:

<Tabs defaultValue="swift" values={[
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="swift">

```swift
// Swift
extension GetDataSource {
    public func get<K>(_ id: K) -> Future<T> where K:Hashable { ... }
    public func getAll<K>(_ id: K) -> Future<[T]> where K:Hashable { ... }
}

extension PutDataSource {
    public func put<K>(_ value: T?, forId id: K) -> Future<T> where K:Hashable { ... }
    public func putAll<K>(_ array: [T], forId id: K) -> Future<[T]> where K:Hashable { ... }
}

extension DeleteDataSource {
    public func delete<K>(_ id: K) -> Future<Void> where K:Hashable { ... }
    public func deleteAll<K>(_ id: K) -> Future<Void> where K:Hashable { ... }
}
```

</TabItem>
</Tabs>

This way, code that originally looked like this:

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
dataSource.get(ByIdentifierQuery("myKey"))
dataSource.put(ByIdentifierQuery("myKey"), myObject)
dataSource.delete(ByIdentifierQuery("myKey"))
```

</TabItem>
<TabItem value="swift">

```swift
dataSource.get(IdQuery("myKey"))
dataSource.put(myObject, in:IdQuery("myKey"))
dataSource.delete(IdQuery("myKey"))
```

</TabItem>
</Tabs>

can be written as follows:

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
dataSource.get("myKey")
dataSource.put("myKey", myObject)
dataSource.delete("myKey")
```

</TabItem>
<TabItem value="swift">

```swift
dataSource.get("myKey")
dataSource.put(myObject, forId:"myKey")
dataSource.delete("myKey")
```

</TabItem>
</Tabs>

## `DataSource` Implementations

- [`VoidDataSource<T>`](void-data-source): Empty data source. All functions when called end with errors.
- [`InMemoryDataSource<T>`](in-memory-data-source): Data stored in the app live memory.
- [`DeviceStorageDataSource<T>`](device-storage-data-source): Data stored in `SharedPreferences` (android) or `UserDefaults` (iOS)
- [`DataSourceMapper<In,Out>`](data-source-mapper): Mappes the type of a data source.
- [`DataSourceValidator<T>`](data-source-validator): Validates the objects manipulated by a data source.

### Swift exclusive implementations

- [`TimedCacheDataSource<T>`](timed-cache-data-source): A TLRU cache over a data source.
- [`RealmDataSource<E,O>`](realm-data-source): Realm based data source. Available at the `MJSWiftCore/Realm` pod subspec.
- [`KeychainDataSource<T>`](keychain-data-source): Keychain based data source. Available at the `MJSwiftCore/Security` pod subspec.
- `DataSourceAssembler<T>`: Combines three data sources (get, put, delete) into a single object.
- `AnyDataSource<T>`: Type erasing for any get+put+delete data source.
- `AnyGetDataSource<T>`: Type erasing for a get data source.
- `AnyPutDataSource<T>`: Type erasing for a put data source.
- `RetryDataSource<T>`: Encapsulates another data source and retries a call when an error happens.

## Swift Notes

### `DataSource` base protocol

In order to have a generic type, all `GetDataSource`, `PutDataSource` and `DeleteDataSource` extends from the following base protocol:

```swift
public protocol DataSource { }
```

## Kotlin Notes

### `DataSource` base interface

```kotlin
interface DataSource
```
