# TimedCacheDataSource

`TimedCacheDataSource<T>` is a key-value data source that implements `GetDataSource`, `PutDataSource` and `DeleteDataSource`. It acts as a TLRU cache (Time aware Least Recently Used) over a contained data source by implementing a local in-memory storage to cache values of type `T`.

## Usage

```swift
// Swift

// custom data source
let customDataSource = MyCustomDataSource()

// timed-cache data source with a time validation of 60 seconds
let dataSource = TimedCacheDataSource(customDataSource, expiryInterval: 60)

// first get, fetching from customDataSource
dataSource.get("object") 
// second get within 60 secs, value returned comes from the cache
dataSource.get("object") 
// performs a put in the customDataSource and updates the cached value
dataSource.put(myObject, forId: "object") 
// deletes the delete in both customDataSource and in the cache
dataSource.delete("object")
```

>Note that the example above is using the extension methods of DataSoruce that encapsulate queries of type `IdQuery<T>`.

## Query Types

All queries must adopt the [`KeyQuery`](query.md) interface as the `TimedCacheDataSource<T>` is based on a key-value pattern. Otherwise, the cache is just ignored and all queries are forwarded to the contained data source.

## Object Types

The type `T` of `TimedCacheDataSource<T>` depends on the contained data source.

## Error Handling

The `TimedCacheDataSource<T>` doesn't raise errors on its own. However, if the contained data source returns an error, all cached values for the given queried key are removed and the error is returned.