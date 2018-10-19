# SingleDataSourceRepository

The `SingleDataSourceRepository<T>` redirects all calls to the single data source of type `T` that encapsulates.

This repository is commonly used when there is only one data source to manipulate, or during the initial phase of development when further data soruces are not yet implemented (for example, using a network data source only while not having yet the local storage data source ready).

## Usage

```swift
// Swift
let dataSource = MyDataSource()
let repository = SingleDataSourceRepository(dataSource)
repository.get(IdQuery("myKey"), operation: VoidOperation())
```

```kotlin
// Kotlin
// TODO
```

## Operation Types

Any operation can be passed to this repository, at is directly forwarding everything to its encapsulated [`DataSource`](DataSource.md). It is recomended to use a `VoidOperation` as convention.

## Other Implementations

Together with `SingleDataSourceRepository<T>` there are implementations deciated for a `GetDataSource`, `PutDataSource` and `DeleteDataSource`:

- `SingleGetDataSourceRepository<T>`: Implements `GetDataSource`.
- `SinglePutDataSourceRepository<T>`: Implements `PutDataSource`.
- `SingleDeleteDataSourceRepository<T>`: Implements `DeleteDataSource`.

## Swift Notes

There are extensions of `GetDataSource`, `PutDataSource` and `DeleteDataSource<T>` to get a `SingleXXXDataSourceRepository<T>`:

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
```
This allows the following code:

```swift
// Swift
let getDataSource = MyGetDataSource()
let getRepository = getDataSource.toGetRepository()

// And same for PutDataSource and DeleteDataSource
// ...
```
