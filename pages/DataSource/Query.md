---
title: Query
permalink: /data-source/query/
---

# Query

A `Query` object itself defines intrinsically how data must be manipulated, containing inside all parameters required to execute the action. 

```swift
// Swift
public protocol Query { }
```

```kotlin
// Kotlin
open class Query
```

Note that a `Query` must be independent of its data source. Calling a query `MyNetworkActionQuery` is wrong (use instead `MyActionQuery`) as queries must be abstracted from its source and can be potentially used in any [`DataSource`](DataSource.md). 

## Usage

```swift
// Swift
struct SearchQuery: Query {
    let text : String
}

// Searching in network
itemsNetworkDataSource.getAll(SearchQuery("lorem ipsum"))
// Searching in local storage
itemsStorageDataSource.getAll(SearchQuery("lorem ipsum"))
```

```kotlin
// Kotlin
class SearchQuery(val text: String): Query()

// Searching in network
itemsNetworkDataSource.getAll(SearchQuery("lorem ipsim"))
// Searching in local storage
itemsStorageDataSource.getAll(SearchQuery("lorem ipsim"))
```

## Default implementations

- `VoidQuery`: Empty query.
- `IdQuery<T>`: Query by Id of type T.
- `IdsQuery<T>`: Query containing a collection of Ids. 
- `AllObjectsQuery`: Generic query to define the action of manipulating all objects.
- `ObjectQuery<T>`: A query containing an object of type T.
- `ObjectsQuery<T>`: A query containing a collection of objects of type T.
- `PaginationQuery`: Abstract pagnation query.
- `PaginationOffsetLimitQuery`: Pagination query by offset and limit.

## Using Queries in DataSources

Queries must be pro-actively supported in each [`DataSource`](DataSource.md) implementation. A typical appearance of an implemented `get` method from a `GetDataSource` would be:

```swift
// Swift
func get(_ query: Query) -> Future<MyObject> {
    switch query.self {
    case let query as IdQuery<String>:
        return getObjectByIdMethod(id: query.id)
    case is MyCustomQuery:
        // ...
    default:
        query.fatalError(.get, self)
    }
}
```

```kotlin
// Kotlin
override fun get(query: Query): Future<MyObject> = Future {
    when (query) {
        is KeyQuery -> {
          return getObjectByIdMethod(query.key)
        }
        else -> notSupportedQuery()
    }
}
```

Note the `default:` / `else` behavior. When using an unsupported query, an exception/fatalError is raised as this is an illegal call.

## `KeyQuery` support

In order to create a key-value environment for data sources as in [`InMemoryDataSource<T>`](InMemoryDataSource.md), [`DeviceStorageDataSource<T>`](DeviceStorageDataSource.md) or any custom implementation, there is the `KeyQuery` interface/protocol to implement:

```swift
// Swift
public protocol KeyQuery : Query {
    var key : String { get }
}
```

```kotlin
// Kotlin
open class KeyQuery(val key: String) : Query()
```

Only queries adopting this structure can be used in Key-Value based DataSources.

Note that the following default queries already have support for `KeyQuery`:

- `IdQuery<T>`
- `IdsQuery<T>`
- `AllObjectsQuery<T>`

Custom queries must adopt this form to be used in Key-Value data sources. For example, returning to the top example `SearchQuery`:

```swift
// Swift
extension SearchQuery : KeyQuery {
    public var key : String { return text }
}
```

```kotlin
// Kotlin
class SearchQuery(val text: String): KeyQuery(text)
```
