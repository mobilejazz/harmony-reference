---
title: Concept
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harmony repositories are responsible of managing the **data business logic** of the application data layer, similar to [interactors](../../domain/interactor) being responsible of managing the business logic of the domain layer.

Following the interface definition of [data source](../../data/data-source/data-source), a repository defines a generic interface representing the three main action groups:

- **Get** is the responsible of all actions that fetch data from one or many data sources
- **Put** is the responsible of all actions that modify and push data to one or many data sources
- **Delete** is the responsible of all action that delete data from one or many data sources

Repositories can accomplish many different things. For example, handle retries of failed processes, perform object validations, handling caches, and more. 

In an effort to decouple the business logic of the data layer from the business logic domain layer, repositoreis use the concept of `Operation`: an object that intrinsically defines how a query must be forwarded to a data source.   

For more information, read the [`Operation`](operation) reference.

## Understanding the abstraction

It's a good idea to use repositories instead of data sources directly becuase often you will want to do a more elaborated data management (aka. data business logic).

For example, we can think in the case of buidling a simple cache system. Typically, starting from a network API service class, we would write some code similar to: 

```swift
class BookNetworkAPIService {
    let books = Map<Int:Book>()

    func getBook(id): Book {
        let isCached = books.contains(id)
        if (isCached) {
            return books[id]
        } else {
            let book = getBookFromNetwork(id)
            books[id] = book
            return book
        }
    } 
}
```

Obviously, the code above is coupling a cache system to a network class. A better option would be to create a cache class on top of the network one, which is what Repository proposes.

```swift
class BookNetworkDataSource : GetDataSource<Book> {...}
class BookLocalStorageDataSource : GetDataSource<Book>, PutDataSource<Book> {...}

// Fetches from cache if available, otherwise use network and udpate cache
class CacheSyncOperation

class BookRepository : GetRepository<Book> {

    let network: BookNetworkDataSource
    let cache: BookLocalStorageDataSource

    func get(query, operation): Book {
        if (operation istypeof CacheSyncOperation) {
            let cachedBook = cache.get(query)
            if (cachedBook) {
                return cacheBook
            } else {
                let book = network.get(query)
                cache.put(book, query)
                return book
            }
        } else {
            // Otherwise, return from network
            return network.get(query)
        }
    }
}
```

As seen in the example, we are reusing the generic interface of Harmony data sources. This could lead to a generic implementation of a cache repository that can be reused for any kind of data types. (hint: see [CacheRepository](cache-repository))

:::important IMPORTANT
Each repository must represent an **atomic behavior** (keeping its testability). It's possible to compose multiple repositories to achieve a more complex logic. 
:::

## Interfaces

The `Repository` functions replicate the [`DataSource`](/docs/fundamentals/data/data-source/data-source) public API, adding an extra parameter of type `Operation` on each function.

### Get

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
    { label: 'PHP', value: 'php', }
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
<TabItem value="typescript">

```typescript
export interface GetRepository<T> extends Repository {
    get(query: Query, operation: Operation): Promise<T>;
    getAll(query: Query, operation: Operation): Promise<T[]>;
}
```

</TabItem>
<TabItem value="php">

```php
interface GetRepository extends Repository {
    public function get(Query $query, Operation $operation): BaseEntity;
    public function getAll(Query $query, Operation $operation): GenericCollection;
}
```

</TabItem>
</Tabs>

### Put

Actions related functions.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
    { label: 'PHP', value: 'php', }
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
<TabItem value="typescript">

```typescript
export interface PutRepository<T> extends Repository {
    put(value: T, query: Query, operation: Operation): Promise<T>;
    putAll(values: T[], query: Query, operation: Operation): Promise<T[]>;
}
```

</TabItem>
<TabItem value="php">

```php
interface PutRepository extends Repository {
    public function put(Query $query, Operation $operation, BaseEntity $entity = null): BaseEntity;
    public function putAll(Query $query, Operation $operation, GenericCollection $collection = null): GenericCollection;
}
```

</TabItem>
</Tabs>

### Delete

Deletion related functions.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
    { label: 'PHP', value: 'php', }
]}>
<TabItem value="kotlin">

```kotlin
interface DeleteRepository : Repository {
    fun delete(query: Query, operation: Operation = DefaultOperation): Future<Unit>
}
```

</TabItem>
<TabItem value="swift">

```swift
public protocol DeleteRepository : Repository {
    func delete(_ query: Query, operation: Operation) -> Future<Void>
}
```

</TabItem>
<TabItem value="typescript">

```typescript
export interface DeleteRepository extends Repository {
    delete(query: Query, operation: Operation): Promise<void>;
}
```

</TabItem>
<TabItem value="php">

```php
interface DeleteRepository extends Repository {
    public function delete(Query $query, Operation $operation): void;
}
```

</TabItem>
</Tabs>

## Extensions

Not all Harmony languages are capable of supporting all extensions. Find below the list of all extensions by supported platform.

### Key Access

Instead of using IdQuery to interface with repositories, there are extensions to syntax sugar the creation of IdQuery.

This means that instead of calling a repository with a query `new IdQuery('my-key')`, it can be used directly the `my-key` identifier.

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
// Instead of:_
repository.get(IdQuery("myKey"), operation)
repository.put(IdQuery("myKey"), object, operation)
repository.delete(IdQuery("myKey"), operation)
// Use:
repository.get("myKey", operation)
repository.put("myKey", object, opeartion)
repository.delete("myKey", operation)
```

</TabItem>
<TabItem value="swift">

```swift
// Instead of:
repository.get(IdQuery("myKey"), operation: operation)
repository.put(myObject, in:IdQuery("myKey"), operation: operation)
repository.delete(IdQuery("myKey"), operation: operation)
// Use:
repository.get("myKey", operation: operation)
repository.put(myObject, forId:"myKey", operation: operation)
repository.delete("myKey", operation: operation)
```

</TabItem>
</Tabs>

## Default Implementations

Harmony provides multiple default implementations.

Find below a list of the most common ones:

- [`VoidRepository<T>`](void-repository): Empty repository. All functions when called end with errors.
- [`RepositoryMapper<In,Out>`](repository-mapper): Mappes the type of a repository.
- [`SingleDataSourceRepository<T>`](single-data-source-repository): Encapuslates a single data source.
- [`CacheRepository<T>`](cache-repository): Main & Cache repository, fetching from one data source and updating the other one when required.

