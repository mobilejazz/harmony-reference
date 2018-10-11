# Query

A `Query` object itself defines intrinsically how data must be manipulated, containing inside all parameters required to execute the action. 

```swift
// Swift
public protocol Query { }
```

```kotlin
// Kotlin
// TODO
```
Note that a `Query` must be independent of its data source. Calling a query `MyNetworkActionQuery` is wrong (use instead `MyActionQuery`) as queries must be abstracted from its source and can be potentially used in any [`DataSource`](DataSource.md). 

## Usage

```swift
// Swift
struct SearchQuery: Query {
    let text : String
    init(_ text: String) { self.text = text }
}

// Searching in network
itemsNetworkDataSource.getAll(SearchQuery("lorem ipsum")).then { ... }
// Searching in local storage
itemsStorageDataSource.getAll(SearchQuery("lorem ipsum")).then { ... }
```

```kotlin
// Kotlin
// TODO
```

## Default implementations

- `VoidQuery`: Empty query.
- `IdQuery<T>` (Swift) or `ByIdentifierQuery<T>` (Kotlin) : Query by Id.
- `AllObjectsQuery`: Generic query to define the action of manipulating all objects.
- `ObjectQuery<T>`: A query containing an object of type T.
- `ArrayQuery<T>`: A query containing an array of objects of type T.

## Using Queries in DataSources

Queries must be pro-actively supported in each [`DataSource`](DataSource.md) implementation. A typical appearance of an implemented `get` method from a `GetDataSource` would be:

```swift
// Swift
func get(_ query: Query) -> Future<MyObject> {
   switch query.self {
    case let query as IdQuery<String>:
        return getObjectByIdMethod(id: query.id)
    case is MyCustomQuery:
        ... 
    default:
        query.fatalError(.get, self)
    }
}    
```

```kotlin
// Kotlin
// TODO
```

Note the `default:` behavior. When using an unsupported query, an exception/fatalError is raised as this is an illegal call.

## Key-Value Query Support

In order to create a key-value environment for data sources as [`InMemoryDataSource<T>`](InMemoryDataSource.md), `DeviceStorageDataSource<T>` or any custom implementation, there is the `KeyQuery` subquery type:

```swift
// Swift
public protocol KeyQuery : Query {
    /// The key associated to the query
    var key : String { get }
}
```

```kotlin
// Kotlin
// TODO
```

Only queries adopting this structure can be used in Key-Value based DataSources.

Note that the following default queries already have support for `KeyQuery`:

- `IdQuery<T>` or `ByIdentifierQuery<T>`
- `AllObjectsQuery<T>`

Custom queries must adopt this form to be used in Key-Value DataSources. For example, returning to the top example `SearchQuery`:

```swift
// Swift
extension SearchQuery: KeyQuery {
    public var key : String { return "search:\"" + text + "\""}
}
```

```kotlin
// Kotlin
// TODO
```