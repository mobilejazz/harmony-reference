# SingleDataSourceRepository

The `SingleDataSourceRepository<T>` redirects all calls to the single data source of type `T` that encapsulates.

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
