# DataSourceMapper

`DataSourceMapper<In,Out>` encapuslates a [`DataSource`](DataSource.md) instance of type `In` and exposes a new interface of [`DataSource`](DataSource.md) of type `Out`, mapping the objects using a [`Mapper<In,Out>`](Mapper.md) and [`Mapper<Out,In>`](Mapper.md).

## Usage

```swift
// Swift

struct MyObjectType : Codable { ... }

let rawDataSource = DeviceStorageDataSource<Data>()
let dataSource = DataSourceMapper(rawDataSource, 
                                  toInMapper: EncodableToDataMapper<MyObjectType>(),
                                  toOutMapper: DataToDecodableMapper<MyObjectType>())

let myObject = MyObjectType()
dataSource.put(myObject, forId: "myKey")
dataSource.get("myKey").then { object in print("\(object)")}
```

```kotlin
// Kotlin
// TODO
```

## Query Types

Any [`Query`](Query.md) can be passed to a `DataSourceMapper<In,Out>`.


## Other Implementations

Together with `DataSourceMapper<In,Out>` there are also similar implementations for:

- `DataSourceMapper<In,Out>`: Implements `GetDataSource`.
- `DataSourceMapper<In,Out>`: Implements `PutDataSource`.