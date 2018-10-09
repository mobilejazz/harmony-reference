# DataSource

A `DataSource` is an interace for those classes responsible of fetching and managing raw data. This data can be manipulated in many ways as for example being stored in a local database, being sent via a network or socket interface or any third party services (sending emails via Sengrid or SMS via another service).

## Usage

```swift
let dataSource = MyCustomGetDataSource()

dataSource.get(IdQuery("myKey")).then { value in
    print("Success: \(value)")
}.fail { error in 
    print("Failure: \(error)")
}
```

```kotlin
val dataSource = MyCustomGetDataSource()

dataSource.get(ByIdentifierQuery("myKey")).onComplete(onSuccess = {
      println(it)
}, onFailure = {
      println(it.localizedMessage)
})
```

## About Data Sources

### Query

A `Query` object itself defines intrinsically how data must be manipulated, containing inside all parameters required to execute the action.

### API

All actions handled by a `DataSource` are grouped in a simple CRUD.

#### **Get**

Fetch related functions. 

```swift
public protocol GetDataSource : DataSource {
    func get(_ query: Query) -> Future<T>
    func getAll(_ query: Query) -> Future<[T]>
}
```

```kotlin
interface GetDataSource<V> : DataSource {
  fun get(query: Query): Future<V>
  fun getAll(query: Query): Future<List<V>>
}
```

#### **Put**

Actions related functions. PUT methods will be responsible of editing, modifying, sending or any other action related method.

Note that in the `put` function, the `value` is optional. This happens becasue it is not always required to have an actual `value` to perform the action defined by the `Query`. In the case of `putAll`, an empty array can be passed.

```swift
public protocol PutDataSource : DataSource {
    func put(_ value: T?, in query: Query) -> Future<T>
    func putAll(_ array: [T], in query: Query) -> Future<[T]>
}
```

```kotlin
interface PutDataSource<V> : DataSource {
  fun put(query: Query, value: V?): Future<V>
  fun putAll(query: Query, value: List<V>? = emptyList()): Future<List<V>>
}
```

#### **Delete**

Deletion related functions.

Note that only a `Query` is required and no value is returned rather than a Future encapsulating the output error.

```swift
public protocol DeleteDataSource : DataSource {
    func delete(_ query: Query) -> Future<Void>
    func deleteAll(_ query: Query) -> Future<Void>
}
```

```kotlin
interface DeleteDataSource : DataSource {
  fun delete(query: Query): Future<Unit>
  fun deleteAll(query: Query): Future<Unit>
}
```

### `DataSource` Implementations

- `InMemoryDataSource<T>`: Data stored in the app live memory.
- `DeviceStorageDataSource<T>`: Data stored in `SharedPreferences` (android) or `UserDefaults` (iOS)
- `DataSourceMapper<In,Out>`: Mappes the type of a data source.
- `DataSourceValidator<T>`: Validates the objects manipulated by a data source.

#### Swift exclusive implementations

- `RealmDataSource<E,O>`: Realm based data source. Available at the `MJSWiftCore/Realm` pod subspec.
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