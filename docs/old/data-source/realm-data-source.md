---
title: RealmDataSource
---

`RealmDataSource<E,O>` is a swift implementation of an interface for Realm conforming to [`DataSource`](./) (`GetDataSoruce`, `PutDataSource` and `DeleteDataSource`). It automatically maps entities to realm objects (it requires object mappers) and can run queries to fetch, store and delete objects.

Its interface exposes two generics:

- `E`: The entity type
- `O`: The equivalent realm object type

Upon initialization, it requires of two mappers:

- `O` to `E` mapper (realm to entity): Using the default [`Mapper`](../mapper) interface.
- `E` to `O` mapper (entity to realm): Using a custom interface called `RealmMapper`.

## Usage

```swift
// Swift
let dataSource = RealmDataSource(realmHandler: RealmHandler(RealmFactory()),
                                 toEntityMapper: RealmItemToItemEntityMapper(),
                                 toRealmMapper: ItemEntityToRealmItemMapper())
dataSource.get("aRealmObjectId").then { entity in
    print("Entity found: \(entity)")
}.fail { error in 
    if error is CoreError.NotFound {
        print ("Entity for given id not found")
    }
}
```

Note that the example above is using the extension methods of `DataSoruce` that encapsulate queries of type `IdQuery<String>`.

## Query Types

**get** function:

- `IdQuery<Int>`: get an object by its id (typed int).
- `IdQuery<String>`: get an object by its id (typed string).

**getAll** function:

- `AllObjectsQuery`: get all objects.
- `RealmQuery`: get objects by predicate. Read more below.

**put** and **putAll** functions:

- put: Query is not checked. Object is stored directly.
- putAll: Query is not checked. Objects are stored directly.

**delete** function:

- `IdQuery<Int>`: delete an object by its id (typed int).
- `IdQuery<String>`: delete an object by its id (typed string).
- `ObjectQuery<E>`: delete the object contained in the query.

**deleteAll** function:

- `ObjectsQuery<E>`: delete the objects contained in the query.
- `AllObjectsQuery`: delete all objects.
- `RealmQuery`: delete objects by predicate. Reade more below.

## `RealmQuery` protocol

A `RealmQuery` is a protocol that exposes a predicate. Any [`Query`](query) can adopt this protocol and generate a predicate to represent its equivalent realm predicate.

```swift
public protocol RealmQuery : Query {
    var realmPredicate : NSPredicate { get }
}
```

Note that `NSPredicate` implements `RealmQuery` (therefore, can be used directly as a `Query`):

```swift
extension NSPredicate : RealmQuery {
    public var realmPredicate : NSPredicate {
        return self
    }
}
```

For example, imagine we have a query named `SearchTextQuery` that contains a text field:

```swift
struct SearchTextQuery: Query {
    let text : String
}
```

And our entities we want to search for have a field called `text` (also present in our `Realm` object representations). Then, we can do the follwing:

```swift
extension SearchTextQuery: RealmQuery {
    public var realmPredicate : NSPredicate {
        return NSPredicate(format: "text == %@", text)
    }
}
```

And now we can run search queries over our `RealmDataSource`:

```swift
dataSource.getAll(SearchTextQuery(text:"textToSearch")).then { array in
    print("Entities found: \(array)")
}
```

## `RealmObject`

All realm objects used in `RealmDataSource` must subclass `RealmObject`, which adds an `id`:

```swift
open class RealmObject : Object {
    @objc dynamic public var id : String = ""

    public convenience init(_ id: String?) {
        self.init()
        if let id = id {
            self.id = id
        } else {
            self.id = UUID().uuidString
        }
    }

    @objc override open class func primaryKey() -> String? {
        return "id"
    }
}
```

Then, there are implemented extensions that allows searching an existing object Id by a key-value query:

```swift
public extension RealmObject {
    public static func findId<T>(key: String, value: T, inRealm realm: Realm) -> String? where T : CVarArg

    public static func findId<T>(keyedValues: [String : T], inRealm realm: Realm) -> String? where T : CVarArg
}
```

This convenience methods are very useful when mapping entities coming from a server (where the realm `id` is not stored). If the server object has a primary key or a set of variables representing a primary key, this methods will perform the query search and return the `id` of the object stored in the local realm database or `nil` if doesn't exist.

## `RealmMapper`

The `RealmDataSource` maps automatically entities to realm objects, and this is done via a `RealmMapper`:

```swift
open class RealmMapper <In:RealmEntity, Out:Object> {
    public init() { }
    open func map(_ from: In, inRealm realm: Realm) throws -> Out {
        fatalError()
    }
}
```

This class is very similar to [`Mapper`](../mapper), but add an extra parameter in the `map` function to pass the `Realm` instance where the map takes place.

Note: very often while mapping entities (that contain server primary key) to realm objects (which have its own primary key) it will be required to first search if there is already a realm object representation of that entity. This is accomplished using the `findId` functions listed above.
