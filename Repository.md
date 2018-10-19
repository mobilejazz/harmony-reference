# Repository

A `Repository` is a class responsible of redirecting get/put/delete actions to one or many [`DataSource`](DataSource.md)s. This redirect semantic is encapsulated in  [`Operation`](Operation.md) objects.

A good example of `Repository` is the [`NetworkStorageRepository`](NetworkStorageRepository.md), which depending on the `Operation` used on each request can obtain data from an storage-based data soruce or from a network-based data source. The most basic repository is the [`SingleDataSourceRepository`](SingleDataSourceRepository.md) which redirects all calls to the single data source that encapsulates.

## Usage

```swift
// Swift
let networkDataSource = MyNetworkDataSource()
let storageDataSource = MyStorageDataSource()
let repository = NetworkStorageRepository(network: networkDataSource, 
                                          storage: storageDataSource)

let future = repository.get(IdQuery("myKey"), operation: StorageSyncOperation())
```

```kotlin
// Kotlin
// TODO
```

## Operation

The [`Operation`](Operation.md) object itself defines intrinsically how a query must be forwarded to a data source, containing inside all parameters required to execute the action.

For more information, read the [`Operation`](Operation.md) reference.

## API

The `Repository` functions replicatec the [`DataSource`](DataSoure.md) public API, adding an extra parameter of type `Operation` on each method.

### **Get**

Fetch related functions. 

```swift
// Swift
public protocol GetRepository : Repository {
    func get(_ query: Query, operation: Operation) -> Future<T>
    func getAll(_ query: Query, operation: Operation) -> Future<[T]>
}
```

```kotlin
// Kotlin
// TODO
```

### **Put**

Actions related functions.

```swift
// Swift
public protocol PutRepository : Repository {
    func put(_ value: T?, in query: Query, operation: Operation) -> Future<T>
    func putAll(_ array: [T], in query: Query), operation: Operation -> Future<[T]>
}
```

```kotlin
// Kotlin
// TODO
```

### **Delete**

Deletion related functions.

```swift
// Swift
public protocol DeleteRepository : Repository {
    func delete(_ query: Query, operation: Operation) -> Future<Void>
    func deleteAll(_ query: Query, operation: Operation) -> Future<Void>
}
```

```kotlin
// Kotlin
// TODO
```

## **Id Query** CRUD extensions

Similar to the [`DataSource`](DataSoure.md) public interface,  all  `GetRepository`, `PutRepository` and `DeleteRepository` interfaces are extended with methods to access the CRUD functions by an Id:

```swift
// Swift
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

```kotlin
// TODO
```

This way, code that originally looked like this:

```swift
// Swift
repository.get(IdQuery("myKey"), operation: MyCustomOperation())
repository.put(myObject, in:IdQuery("myKey"), operation: MyCustomOperation())
repository.delete(IdQuery("myKey"), operation: MyCustomOperation())
```
```kotlin
// Kotlin
// TODO
```

can be written as follows:

```swift
// Swift
repository.get("myKey", operation: MyCustomOperation())
repository.put(myObject, forId:"myKey", operation: MyCustomOperation())
repository.delete("myKey", operation: MyCustomOperation())
```
```kotlin
// Kotlin
// TODO
```


## `Repository` Implementations

- [`VoidRepository<T>`](VoidRepository.md): Empty repository. All functions when called end with errors.
- [`RepositoryMapper<In,Out>`](RepositoryMapper.md): Mappes the type of a repository.
- [`SingleDataSourceRepository<T>`](SingleDataSourceRepository.md): Encapuslates a single data source.
- [`NetworkStorageRepository<T>`](NetworkStorageRepository.md): Network & Storage repository, fetching from one data source and updating the other one when required.

#### Swift exclusive implementations

- `RepositoryAssembler<T>`: Combines three repositories (get, put, delete) into a single object.
- `AnyRepository<T>`: Type erasing for any get+put+delete repository.
- `AnyGetRepository<T>`: Type erasing for a get repository.
- `AnyPutRepository<T>`: Type erasing for a put repository.
- `AnyDeleteRepository<T>`: Type erasing for a delete repository.

## Swift Notes

### `Repository` base protocol
In order to have a generic type, all `GetRepository`, `PutRepository` and `DeleteRepository` extends from the following base protocol:

```swift
public protocol Repository {
    associatedtype T
}
```

## Kotlin Notes

### `Repository` base interface

```kotlin
interface Repository
```
