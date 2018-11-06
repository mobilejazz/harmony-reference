# NetworkStorageRepository

`NetworkStorageRepository<T>` implements `GetRepository`, `PutRepository` and `DeleteRepository` and encapuslates two [`DataSource`](DataSource.md) instances: one representing a **network** data source and another one representing a **storage** data source.

Using the different supported operation types, the repository will fetch/push data to a single data source or to both data sources in a specific order. For example, the repository can fetch from the network data source and store the results to the storage data source. 

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
val networkDataSource = MyNetworkDataSource()
val storageDataSource = MyStorageDataSource()

val repository = NetworkStorageRepository(networkDataSource, networkDataSource, networkDataSource, storageDataSource, storageDataSource, storageDataSource)

val future = repository.get(IdQuery("my-key"), StorageSyncOperation)
```

## Operation Types

The [`Operation`](Operation.md) types supported in `NetworkStorageRepository<T>` are:

### `NetworkOperation`

Using the network data source only.

### `NetworkSyncOperation`

The repository will first forward the query to the **network** data source. If this one succeeds without any error, the repository will then forward the query to the **storage** data source to keep it in sync.

### `StorageOperation`

Using the storage data source only.

### `StorageSyncOperation`

The repository will first forward the query to the **storage** data source. 

- On **GET** actions, if this one fails with an error of type `CoreError.NotValid` or `CoreError.NotFound` / `DataNotFoundException` or `ObjectNotValidException`, the repository will forward the query to the **network** data source. Otherwise, will return the result of the **storage** data source.
- On **PUT** and **DELETE** actions, the repository will forward the query to the **network** data source after if the storage action is resolved successfully.

## Example: Building a cache

-  Use the `StorageSyncOperation` for **GET** actions (repository will first check if the storage contains valid results and if not, go to network).

- Use `NetworkSyncOperation` for **PUT** and **DELETE** actions (repository will push changes to network and if success, update the storage).

- When forcing a refresh (using a *pull-to-refresh* for example), use the `NetworkSyncOperation` on **GET** actions (forcing to fetch network first and updating storage if success).

- To add additional validation logic to the storage data source, use a [`DataSourceValidator`](DataSourceValidator.md).
