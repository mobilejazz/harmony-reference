---
title: Cache Repository
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CacheRepository

`CacheRepository<T>` implements `GetRepository`, `PutRepository` and `DeleteRepository` and encapuslates two [`DataSource`](../data-source/data-source.md) instances: one representing a **main** data source and another one representing a **cache** data source.

Using the different supported operation types, the repository will fetch/push data to a single data source or to both data sources in a specific order. For example, the repository can fetch from the main data source and store the results to the cache data source. 

## Usage

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
val networkDataSource = MyNetworkDataSource()
val storageDataSource = MyStorageDataSource()

val repository = CacheRepository(storageDataSource, storageDataSource, storageDataSource, networkDataSource, networkDataSource, networkDataSource)

val future = repository.get(IdQuery("my-key"), MainSyncOperation)
```

</TabItem>
<TabItem value="swift">

```swift
let networkDataSource = MyNetworkDataSource()
let storageDataSource = MyStorageDataSource()

let repository = CacheRepository(main: networkDataSource, cache: storageDataSource)

let future = repository.get("myKey", operation: CacheSyncOperation())
```

</TabItem>
</Tabs>

## Operation Types

The [`Operation`](operation.md) types supported in `CacheRepository<T>` are:

### `DefaultOperation`

The default behavior is:

- **GET** methods: Behaves as a `CacheSyncOperation`.
- **PUT** methods: Behaves as a `MainSyncOperation`.
- **DELETE** methods: Behaves as a `MainSyncOperation`.

Therefore, by using a `DefaultOperation`, the cache repository will act as a regular cache: fetching data from the cache first (otherwise, using the main data source) and applying changes first to the main data source (and then syncing with the cache).

### `MainOperation`

Using the main data source only.

### `MainSyncOperation`

The repository will first forward the query to the **main** data source. If this one succeeds without any error, the repository will then forward the query to the **cache** data source to keep it in sync.

### `CacheOperation`

Using the cache data source only.

### `CacheSyncOperation`

The repository will first forward the query to the **cache** data source. 

- On **GET** actions, if this one fails with an error of type `CoreError.NotValid` or `CoreError.NotFound` / `DataNotFoundException` or `ObjectNotValidException`, the repository will forward the query to the **main** data source. Otherwise, will return the result of the **cache** data source.
- On **PUT** and **DELETE** actions, the repository will forward the query to the **main** data source after if the storage action is resolved successfully.

## Example: Building a cache

- Use the `CacheSyncOperation` for **GET** actions (repository will first check if the cache contains valid results and if not, go to the main data source).
- Use `MainSyncOperation` for **PUT** and **DELETE** actions (repository will push changes to the main data source and if success, update the cache).
- When forcing a refresh (using a *pull-to-refresh* for example), use the `MainSyncOperation` on **GET** actions (forcing to fetch the main data source first and updating cache if success).
- To add additional validation logic to the cache data source, use a [`DataSourceValidator`](../data-source/data-source-validator.md).
