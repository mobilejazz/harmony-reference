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

In an effort to make data sources decoupled from the requirements of external sources, data sources use the concept of [`Query`](/docs/fundamentals/data/data-source/query): an object that itself intrinsically defines how data must be manipulated, containing all attributes required to execute the action.

For more information, read the [`Query`](/docs/fundamentals/data/data-source/query) reference.

## Understanding the abstraction
A good example of how a data source is organized is to think on how would you do a data source class without Harmony. 

Typically, you would have a **singleton class** containing a **list of methods for all the actions** your system need to support. For example, a typical network class listing all the HTTP requests.

```swift
class UserNetworkAPIService {
    func login(username, password): User
    func fetchUserDetails(id): User
    func updateProfilePicture(url, userId): User
}
```

In Harmony, instead of having this class listing all methods, we would create a data source grouping all methods withing the Get, Put and Delete actions and translating each method with its parameters into a query with its attributes.

```swift
class IdQuery(id)
class LoginQuery(username, password)
class UpdateProfilePictureQuery(url, userId)

class UserNetworkDataSource: GetDataSource<User>, PutDataSource<User> {
    func get(query): User {
        if (query istypeof IdQuery) {
            // fetch user details and return
        }
    }
    func put(user, query): User {
        if (query istypeof LoginQuery) {
            // perform login
        } else if (query istypeof UpdateProfilePictureQuery) {
            // udpate user profile picture
        }
    }
}
```

By normalizing how we interface with data sources, we can start building complex compositions of data sources top of it, which is the foundations of Harmony. 


## Interfaces

Find below the interfaces for each data source group:

### GET

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
    { label: 'PHP', value: 'php', },
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
<TabItem value="typescript"> 

```typescript
export interface GetDataSource<T> extends DataSource {
    get(query: Query): Promise<T>;
    getAll(query: Query): Promise<T[]>;
}
```

</TabItem>
<TabItem value="php"> 

```php
interface GetDataSource {
    public function get(Query $query): BaseEntity;
    public function getAll(Query $query): GenericCollection;
}
```

</TabItem>
</Tabs>

### PUT

PUT methods will be responsible of handling any editing, modifying, sending or operating action on the data. 

Some examples:

- Creating a book
- Editing a user profile 
- Liking a picture
- Sending a push notification

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
    { label: 'PHP', value: 'php', },
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
<TabItem value="typescript">

```typescript
export interface PutDataSource<T> extends DataSource {
    put(value: T, query: Query): Promise<T>;
    putAll(values: T[], query: Query): Promise<T[]>;
}
```

</TabItem>
<TabItem value="php">

```php
interface PutDataSource {
    public function put(Query $query, BaseEntity $baseModel = null): BaseEntity;
    public function putAll(
        Query $query,
        GenericCollection $baseModels = null
    ): GenericCollection;
}
```

</TabItem>
</Tabs>

:::important Note
Note that in the `put` function, the `value` is optional. This happens becasue it is not always required to have an actual `value` to perform the action defined by the [`Query`](query). In the case of `putAll`, an empty array can be passed.
:::

### DELETE

On delete methods, only a [`Query`](query) is required and no value is returned rather than a promise encapsulating the output error. 

Also, there is only one delete method (no `deleteAll`) as it is considered an atomic action on its own, without distinctions of if deleting one or many.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
    { label: 'PHP', value: 'php', },
]}>
<TabItem value="kotlin">

```kotlin
interface DeleteDataSource : DataSource {
    fun delete(query: Query): Future<Unit>
}
```

</TabItem>
<TabItem value="swift">

```swift
public protocol DeleteDataSource : DataSource {
    func delete(_ query: Query) -> Future<Void>
}
```

</TabItem>
<TabItem value="typescript">

```typescript
export interface DeleteDataSource extends DataSource {
    delete(query: Query): Promise<void>;
}

```

</TabItem>
<TabItem value="php">

```php
interface DeleteDataSource{
    public function delete(Query $query): void;
}
```

</TabItem>
</Tabs>

## Extensions

Not all Harmony languages are capable of supporting some extensions. Find below the list of all extensions by supported platform. 

### Key access

Instead of using `IdQuery` to interface with data sources, there are extensions to syntax sugar the creation of `IdQuery`. 

This means that instead of calling a data source with a query `new IdQuery('my-key')`, it can be used directly the `my-key` identifier. 

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
suspend fun <K, V> GetDataSource<V>.get(id: K): V = get(IdQuery(id))
suspend fun <K, V> GetDataSource<V>.getAll(ids: List<K>): List<V> = getAll(IdsQuery(ids))
suspend fun <K, V> PutDataSource<V>.put(id: K, value: V?): V = put(IdQuery(id), value)
suspend fun <K, V> PutDataSource<V>.putAll(ids: List<K>, values: List<V>?) = putAll(IdsQuery(ids), values)
suspend fun <K> DeleteDataSource.delete(id: K) = delete(IdQuery(id))
```

</TabItem>
<TabItem value="swift">

```swift
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
}
```

</TabItem>
</Tabs>

Find below examples by platform:

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
// Instead of:
dataSource.get(IdQuery("myKey"))
dataSource.put(IdQuery("myKey"), object)
dataSource.delete(IdQuery("myKey"))
// Use:
dataSource.get("myKey")
dataSource.put("myKey", object)
dataSource.delete("myKey")
```

</TabItem>
<TabItem value="swift">

```swift
// Instead of:
dataSource.get(IdQuery("myKey"))
dataSource.put(object, in:IdQuery("myKey"))
dataSource.delete(IdQuery("myKey"))
// Use:
dataSource.get("myKey")
dataSource.put(object, forId:"myKey")
dataSource.delete("myKey")
```

</TabItem>
</Tabs>

## Default Implementations

Harmony provides multiple default implementations. 

Find below a list of the most common ones:

- [`VoidDataSource<T>`](void-data-source): Empty data source. All functions when called end with errors.
- [`InMemoryDataSource<T>`](in-memory-data-source): Data stored in the app live memory.
- [`DeviceStorageDataSource<T>`](device-storage-data-source): Local storage data source.
- [`DataSourceMapper<In,Out>`](data-source-mapper): Mappes the type of a data source.
- [`DataSourceValidator<T>`](data-source-validator): Validates the objects manipulated by a data source.
- [`KeychainDataSource<T>`](keychain-data-source): iOS Keychain based data source. Available at the `MJSwiftCore/Security` pod subspec.
