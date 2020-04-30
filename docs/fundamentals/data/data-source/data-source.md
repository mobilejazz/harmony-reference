---
title: Concept
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A `DataSource` is an interace for those classes responsible of managing sources of data.

Among the Harmony architecture, the data source is the first component that provides a defined public interface for data manipulation. Every action that a data source does must be bundled within its interface. 

Data Sources are splitted in three groups taking into account the action to be done: 

- **Get** is the responsible of all actions that fetch data from external sources
- **Put** is the responsible of all actions that modify and push data to external sources
- **Delete** is the responsible of all action that delete data from external sources

Data sources can accomplish many different things and can adapt to your project requirements and necessities. For example, from storing/fetching data in a local databases, to send data via an HTTP/Socket client or any third party services.

In an effort to make data sources decoupled from the requirements of external sources, data sources use the concept of [`Query`](../query): an object that itself intrinsically defines how data must be manipulated, containing all attributes required to execute the action.

For more information, read the [`Query`](query) reference.

## Interfaces

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

Note that in the `put` function, the `value` is optional. This happens becasue it is not always required to have an actual `value` to perform the action defined by the [`Query`](../query). In the case of `putAll`, an empty array can be passed.

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

Note that only a [`Query`](../query) is required and no value is returned rather than a Future encapsulating the output error.

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
