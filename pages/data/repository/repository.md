---
title: Concept
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A `Repository` is a class responsible of redirecting get/put/delete actions to one or many [`DataSource`](../data-source/data-source.md)s. This redirect semantic is encapsulated in [`Operation`](operation.md) objects.

A good example of `Repository` is the [`CacheRepository`](cache-repository.md), which depending on the `Operation` used on each request can obtain data from an storage-based data source or from a main-based data source. The most basic repository is the [`SingleDataSourceRepository`](single-data-source-repository.md) which redirects all calls to the single data source that encapsulates.

## Usage

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
val networkDataSource = MyNetworkDataSource()
val storageDataSource = MyStorageDataSource()

val repository = NetworkStorageRepository(networkDataSource, networkDataSource, networkDataSource, storageDataSource, storageDataSource, storageDataSource)

val future = repository.get(IdQuery("my-key"), StorageSyncOperation)
```

</TabItem>
<TabItem value="swift">

```swift
let networkDataSource = MyNetworkDataSource()
let storageDataSource = MyStorageDataSource()
let repository = CacheRepository(main: networkDataSource, cache: storageDataSource)

let future = repository.get(IdQuery("myKey"), operation: MainSyncOperation())
```

</TabItem>
</Tabs>

## Operation

The [`Operation`](operation.md) object itself defines intrinsically how a query must be forwarded to a data source, containing inside all parameters required to execute the action.

For more information, read the [`Operation`](operation.md) reference.

## API

The `Repository` functions replicate the [`DataSource`](../data-source/data-source.md) public API, adding an extra parameter of type `Operation` on each function.

### Get

Fetch related functions.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
interface GetRepository<V> : Repository {
    fun get(query: Query, operation: Operation = DefaultOperation): Future<V>
    fun getAll(query: Query, operation: Operation = DefaultOperation): Future<List<V>>
}
```

</TabItem>
<TabItem value="swift">

```swift
public protocol GetRepository : Repository {
    associatedtype T
    func get(_ query: Query, operation: Operation) -> Future<T>
    func getAll(_ query: Query, operation: Operation) -> Future<[T]>
}
```

</TabItem>
</Tabs>

### Put

Actions related functions.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
interface PutRepository<V> : Repository {
    fun put(query: Query, value: V?, operation: Operation = DefaultOperation): Future<V>
    fun putAll(query: Query, value: List<V>? = emptyList(), operation: Operation = DefaultOperation): Future<List<V>>
}
```

</TabItem>
<TabItem value="swift">

```swift
public protocol PutRepository : Repository {
    associatedtype T
    func put(_ value: T?, in query: Query, operation: Operation) -> Future<T>
    func putAll(_ array: [T], in query: Query), operation: Operation -> Future<[T]>
}
```

</TabItem>
</Tabs>

### Delete

Deletion related functions.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
interface DeleteRepository : Repository {
    fun delete(query: Query, operation: Operation = DefaultOperation): Future<Unit>
    fun deleteAll(query: Query, operation: Operation = DefaultOperation): Future<Unit>
}
```

</TabItem>
<TabItem value="swift">

```swift
public protocol DeleteRepository : Repository {
    func delete(_ query: Query, operation: Operation) -> Future<Void>
    func deleteAll(_ query: Query, operation: Operation) -> Future<Void>
}
```

</TabItem>
</Tabs>

## `IdQuery` CRUD extensions

Similar to the [`DataSource`](../data-source/data-source.md) public interface,  all  `GetRepository`, `PutRepository` and `DeleteRepository` interfaces are extended with methods to access the CRUD functions by an Id:

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
fun <K, V> GetRepository<V>.get(id: K, operation: Operation = DefaultOperation): Future<V> = get(IdQuery(id), operation)
fun <K, V> GetRepository<V>.getAll(ids: List<K>, operation: Operation = DefaultOperation): Future<List<V>> = getAll(IdsQuery(ids), operation)
fun <K, V> PutRepository<V>.put(id: K, value: V?, operation: Operation = DefaultOperation): Future<V> = put(IdQuery(id), value, operation)
fun <K, V> PutRepository<V>.putAll(ids: List<K>, values: List<V>? = emptyList(), operation: Operation = DefaultOperation) = putAll(IdsQuery(ids), values, operation)
fun <K> DeleteRepository.delete(id: K, operation: Operation = DefaultOperation) = delete(IdQuery(id), operation)
fun <K> DeleteRepository.deleteAll(ids: List<K>, operation: Operation = DefaultOperation) = deleteAll(IdsQuery(ids), operation)
```

</TabItem>
<TabItem value="swift">

```swift
extension GetRepository {
    public func get<K>(_ id: K, operation: Operation) -> Future<T> where K:Hashable { ... }
    public func getAll<K>(_ id: K, operation: Operation) -> Future<[T]> where K:Hashable { ... }
}
extension PutRepository {
    public func put<K>(_ value: T?, forId id: K, operation: Operation) -> Future<T> where K:Hashable { ... }
    public func putAll<K>(_ array: [T], forId id: K, operation: Operation) -> Future<[T]> where K:Hashable { ... }
}
extension DeleteRepository {
    public func delete<K>(_ id: K, operation: Operation) -> Future<Void> where K:Hashable { ... }
    public func deleteAll<K>(_ id: K, operation: Operation) -> Future<Void> where K:Hashable { ... }
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
repository.get(IdQuery("myKey"))
repository.put(IdQuery("myKey"), myObject)
repository.delete(IdQuery("myKey"))
```

</TabItem>
<TabItem value="swift">

```swift
repository.get(IdQuery("myKey"), operation: MyCustomOperation())
repository.put(myObject, in:IdQuery("myKey"), operation: MyCustomOperation())
repository.delete(IdQuery("myKey"), operation: MyCustomOperation())
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
repository.get("myKey")
repository.put("myKey", myObject)
repository.delete("myKey")
```

</TabItem>
<TabItem value="swift">

```swift
repository.get("myKey", operation: MyCustomOperation())
repository.put(myObject, forId:"myKey", operation: MyCustomOperation())
repository.delete("myKey", operation: MyCustomOperation())
```

</TabItem>
</Tabs>

## `Repository` Implementations

- [`VoidRepository<T>`](void-repository.md): Empty repository. All functions when called end with errors.
- [`RepositoryMapper<In,Out>`](repository-mapper.md): Mappes the type of a repository.
- [`SingleDataSourceRepository<T>`](single-data-source-repository.md): Encapuslates a single data source.
- [`CacheRepository<T>`](cache-repository.md): Main & Cache repository, fetching from one data source and updating the other one when required.

#### Swift exclusive implementations

- `RepositoryAssembler<T>`: Combines three repositories (get, put, delete) into a single object.
- `AnyRepository<T>`: Type erasing for any get+put+delete repository.
- `AnyGetRepository<T>`: Type erasing for a get repository.
- `AnyPutRepository<T>`: Type erasing for a put repository.
- `RetryRepository<T>`: Encapsulates another repository and retries a call when an error happens.

## Swift Notes

### `Repository` base protocol

In order to have a generic type, all `GetRepository`, `PutRepository` and `DeleteRepository` extends from the following base protocol:

```swift
public protocol Repository { }
```

## Kotlin Notes

### `Repository` base interface

```kotlin
interface Repository
```
