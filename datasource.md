# DataSource

A `DataSource` is an interace for those classes responsible of fetching and managing raw data. This data can be manipulated in many ways as for example being stored in a local database, being sent via a network or socket interface or any third party services (sending emails via Sengrid or SMS via another service).

## Usage

```swift
// Swift
let dataSource = MyCustomGetDataSource()
dataSource.get(IdQuery("myKey")).then { value in
    print("Success: \(value)")
}.fail { error in 
    print("Failure: \(error)")
}
```

```kotlin
// Kotlin
val dataSource = MyCustomGetDataSource()
dataSource.get(ByIdentifierQuery("myKey")).onComplete(onSuccess = {
      println(it)
}, onFailure = {
      println(it.localizedMessage)
})
```

## About Data Sources

### Query

A [`Query`](query.md) object itself defines intrinsically how data must be manipulated, containing inside all parameters required to execute the action.

For more information, read the [`Query`](query.md) reference.

### API

All actions handled by a `DataSource` are grouped in a simple CRUD.

#### **Get**

Fetch related functions. 

```swift
// Swift
public protocol GetDataSource : DataSource {
    func get(_ query: Query) -> Future<T>
    func getAll(_ query: Query) -> Future<[T]>
}
```

```kotlin
// Kotlin
interface GetDataSource<V> : DataSource {
  fun get(query: Query): Future<V>
  fun getAll(query: Query): Future<List<V>>
}
```

#### **Put**

Actions related functions. PUT methods will be responsible of editing, modifying, sending or any other action related method.

Note that in the `put` function, the `value` is optional. This happens becasue it is not always required to have an actual `value` to perform the action defined by the [`Query`](query.md). In the case of `putAll`, an empty array can be passed.

```swift
// Swift
public protocol PutDataSource : DataSource {
    func put(_ value: T?, in query: Query) -> Future<T>
    func putAll(_ array: [T], in query: Query) -> Future<[T]>
}
```

```kotlin
// Kotlin
interface PutDataSource<V> : DataSource {
  fun put(query: Query, value: V?): Future<V>
  fun putAll(query: Query, value: List<V>? = emptyList()): Future<List<V>>
}
```

#### **Delete**

Deletion related functions.

Note that only a [`Query`](query.md) is required and no value is returned rather than a Future encapsulating the output error.

```swift
// Swift
public protocol DeleteDataSource : DataSource {
    func delete(_ query: Query) -> Future<Void>
    func deleteAll(_ query: Query) -> Future<Void>
}
```

```kotlin
// Kotlin
interface DeleteDataSource : DataSource {
  fun delete(query: Query): Future<Unit>
  fun deleteAll(query: Query): Future<Unit>
}
```

### **Id Query** CRUD extensions

All  `GetDataSource`, `PutDataSource` and `DeleteDataSource` interfaces are extended with methods to access the CRUD functions by an Id:

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

```kotlin
// TODO
```

This way, code that originally looked like this:

```swift
// Swift
dataSource.get(IdQuery("myKey")).then { ... }
dataSource.put(myObject, in:IdQuery("myKey")).then { ... }
dataSource.delete(IdQuery("myKey")).then { ... }
```
```kotlin
// Kotlin
dataSource.get(ByIdentifierQuery("myKey")).onComplete( ... )
dataSource.put(ByIdentifierQuery("myKey"), myObject).onComplete ( ... )
dataSource.delete(ByIdentifierQuery("myKey")).onComplete( ... )
```

can be written as follows:

```swift
// Swift
dataSource.get("myKey").then { ... }
dataSource.put(myObject, forId:"myKey").then { ... }
dataSource.delete("myKey").then { ... }
```
```kotlin
// Kotlin
dataSource.get("myKey").onComplete( ... )
dataSource.put("myKey", myObject).onComplete ( ... )
dataSource.delete("myKey").onComplete( ... )
```


### `DataSource` Implementations

- `VoidDataSource<T>`: Empty data source. All functions when called end with errors.
- `InMemoryDataSource<T>`: Data stored in the app live memory.
- `DeviceStorageDataSource<T>`: Data stored in `SharedPreferences` (android) or `UserDefaults` (iOS)
- `DataSourceMapper<In,Out>`: Mappes the type of a data source.
- `DataSourceValidator<T>`: Validates the objects manipulated by a data source.

#### Swift exclusive implementations

- `DataSourceAssembler<T>`: Combines three data sources (get, put, delete) into a single object.
- `RealmDataSource<E,O>`: Realm based data source. Available at the `MJSWiftCore/Realm` pod subspec.
- `KeychainDataSource<T>`: Keychain based data source. Available at the `MJSwiftCore/Security` pod subspec.
- `AnyDataSource<T>`: Type erasing for any get+put+delete data source.
- `AnyGetDataSource<T>`: Type erasing for a get data source.
- `AnyPutDataSource<T>`: Type erasing for a put data source.
- `AnyDeleteDataSource<T>`: Type erasing for a delete data source.

## Swift Notes

### `DataSource` base protocol
In order to have a generic type, all `GetDataSource`, `PutDataSource` and `DeleteDataSource` extends from the following base protocol:

```swift
public protocol DataSource {
    associatedtype T
}
```

## Kotlin Notes

### `DataSource` base interface

```kotlin
// TODO
```
