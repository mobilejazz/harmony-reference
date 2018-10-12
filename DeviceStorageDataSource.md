# DeviceStorageDataSource

`DeviceStorageDataSource<T>` is a key-value storage that implements `GetDataSource`, `PutDataSource` and `DeleteDataSource` storing values into the device memory (`UserDefaults` in iOS and `SharedPreferences` in Android).

## Usage

```swift
// Swift
let dataSource = DeviceStorageDataSource<Double>()
dataSource.put(3.14159265359, forId: "pi")
dataSource.get("pi").then { pi in print("pi: \(pi)") }.fail { error in }
dataSource.delete("pi")
```

```kotlin
// Kotlin
// TODO
```

Note that the example above is using the extension methods of DataSoruce that encapsulate queries of type `IdQuery<T>`.

## Query Types

All queries must adopt the [`KeyQuery`](query.md) interface as the `DeviceStorageDataSource<T>` is based on a key-value pattern.

## Object Types

Even if `DeviceStorageDataSource<T>` has a generic type, there are restrictions on which types can be used. These restrictions are the ones defined by `UserDefaults` in iOS and `SharedPreferences` on Android.

To store any different type, use a [`DataSourceMapper<In,Out>`](DataSourceMapper.md) to transfrom (map) the type to a compatible one.

### `UserDefaults` (iOS) compatible types

- `Integer`
- `Float`
- `Double`
- `Bool`
- `String`
- `URL`
- `Date`
- `Data`
- `Array` of any type of this list
- `Dictionary` of `[String : T]` where `T` is any type of this list

### `SharedPreferences` (Android) compatible types

- `// TODO`
- `// TODO`
- `// TODO`
- `// TODO`
- `// TODO`

## Implementation Notes

### Swift

In order to avoid to have two equal keys being used in multiple `DeviceStorageDataSource<T>` instances, a custom key prefix can be definied on each new instance created. This way all stored values for a given key will be prefixed.

For example, in the code below we can find two different instances of `DeviceStorageDataSource<T>` that are storing different values for a same id:

```swift
// Swift
let doubleDataSource = DeviceStorageDataSource<Double>(UserDefaults.standard, prefix: "Double")
let intDataSource = DeviceStorageDataSource<Int>(UserDefaults.standard, prefix: "Int")
doubleDataSource.put(3.14159265359, forId: "pi")
intDataSource.put(3, forId: "pi")
```

In `UserDefaults.standard` we will find two new entries after running the above code:

- A `Double` 3.14159265359 stored for the key `"Double.pi"`
- An `Int` 3 stored for the key `"Int.pi"`

Note that we could now create a new data source using the prefix `"Double"` but of a different type. Then, the `get` would succeed only if the cast from its original type to the newer type succeeds, otherwise would return an `CoreError.NotFound` error.

```swift
// Swift
let dataSource = DeviceStorageDataSource<String>(UserDefaults.standard, prefix: "Double")
dataSource.get("pi").then { pi in 
    print("Pi: \(pi)")
}.fail { error in 
    print("Error: \(error)")
}
```

In the example above, pi is returned as the string `"3.14159265359"`.

### Kotlin

// TODO