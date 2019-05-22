# SingleDataSourceRepository

The `SingleDataSourceRepository<T>` redirects all calls to the single data source of type `T` that encapsulates.

This repository is commonly used when there is only one data source to manipulate, or during the initial phase of development when further data sources are not yet implemented (for example, using a network data source only while not having yet the local storage data source ready).

## Usage

```swift
// Swift
let dataSource = MyDataSource()
let repository = SingleDataSourceRepository(dataSource)
repository.get(IdQuery("myKey"), operation: DefaultOperation())
```

```kotlin
// Kotlin
val datasource = MyDataSource()
val repository = SingleDataSourceRepository(datasource /*get datasource*/, datasource /*put datasource*/, datasource /*delete datasource*/)

repository.get(IdQuery("myKey"), DefaultOperation)
```

## Operation Types

Any operation can be passed to this repository, at is directly forwarding everything to its encapsulated [`DataSource`](../DataSource/DataSource.md). It is recomended to use a `DefaultOperation` as convention.

## Other Implementations

Together with `SingleDataSourceRepository<T>` there are implementations deciated for a `GetDataSource`, `PutDataSource` and `DeleteDataSource`:

- `SingleGetDataSourceRepository<T>`: Implements `GetDataSource`.
- `SinglePutDataSourceRepository<T>`: Implements `PutDataSource`.
- `SingleDeleteDataSourceRepository<T>`: Implements `DeleteDataSource`.

## Notes

There are extensions of `GetDataSource`, `PutDataSource` and `DeleteDataSource to get a `SingleXXXDataSourceRepository<T>`:

```swift
// Swift
extension GetDataSource {
    public func toGetRepository() -> SingleGetDataSourceRepository<Self,T> {
        return SingleGetDataSourceRepository(self)
    }
}
extension PutDataSource {
    public func toPutRepository() -> SinglePutDataSourceRepository<Self,T> {
        return SinglePutDataSourceRepository(self)
    }
}
extension DeleteDataSource {
    public func toDeleteRepository() -> SingleDeleteDataSourceRepository<Self,T> {
        return SingleDeleteDataSourceRepository(self)
    }
}

// Kotlin
fun <V>GetDataSource<V>.toGetRepository() = SingleGetDataSourceRepository(this)

fun <V>PutDataSource<V>.toPutRepository() = SinglePutDataSourceRepository(this)

fun DeleteDataSource.toDeleteRepository() = SingleDeleteDataSourceRepository(this)
```
This allows the following code:

```swift
// Swift
let getDataSource = MyGetDataSource()
let getRepository = getDataSource.toGetRepository()

// And same for PutDataSource and DeleteDataSource
```


```kotlin
// Kotlin
val getDataSource = MyGetDataSource()
val gteRepository = getDataSource.toGetRepository()
// ...
```
