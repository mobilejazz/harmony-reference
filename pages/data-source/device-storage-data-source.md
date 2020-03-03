---
title: Device Storage Data Source
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# DeviceStorageDataSource

`DeviceStorageDataSource<T>` is a key-value storage that implements `GetDataSource`, `PutDataSource` and `DeleteDataSource` storing values into the device memory (`UserDefaults` in iOS and `SharedPreferences` in Android).

## Usage

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
val dataSource = DeviceStorageDataSource<Double>(...)

dataSource.put("pi", 3.14159265359)
dataSource.get("pi")
dataSource.delete("pi")
```

</TabItem>
<TabItem value="swift">

```swift
let dataSource = DeviceStorageDataSource<Double>()

dataSource.put(3.14159265359, forId: "pi")
dataSource.get("pi").then { pi in print("pi: \(pi)") }.fail { error in }
dataSource.delete("pi")
```

</TabItem>
</Tabs>

Note that the example above is using the extension methods of DataSoruce that encapsulate queries of type `IdQuery<T>`.

## Query Types

All queries must adopt the [`KeyQuery`](query.md) interface as the `DeviceStorageDataSource<T>` is based on a key-value pattern.

## Object Types

Even if `DeviceStorageDataSource<T>` has a generic type, there are restrictions on which types can be used. These restrictions are the ones defined by `UserDefaults` in iOS and `SharedPreferences` on Android.

To store any different type, use a [`DataSourceMapper<In,Out>`](data-source-mapper.md) to transfrom (map) the type to a compatible one.

### Kotlin exclusive implementations

#### SerializationDataSourceMapper

If you want to fetch/store custom objects, you need to use a `SerializationDataSourceMapper<T>` class to be able to serialize and deserialize the object. This is a limitation from `SharedPreferences`.

For example:

```kotlin
// Kotlin
val toStringMapper = ModelToStringMapper<ItemEntity>(gson)
val toModelMapper = StringToModelMapper(ItemEntity::class.java, gson)
val toListModelMapper = ListModelToStringMapper<ItemEntity>(gson)
val toStringListMapper = StringToListModelMapper(object:TypeToken<List<ItemEntity>>() {}, gson)
  return SerializationDataSourceMapper(
        deviceStorageDataSource,
        deviceStorageDataSource,
        deviceStorageDataSource,
        toModelMapper,
        toStringListMapper, // List
        toStringMapper,
        toListModelMapper) // List

val itemEntity = ItemEntity(123, "by", "title", "text", "type", 123, "url", emptyList())

// Store value with key "1"
itemEntityDeviceStorageDataSource.put(KeyQuery("1"), itemEntity).get()

// Fetch value with key "1"
val result = itemEntityDeviceStorageDataSource.get(KeyQuery("1")).get()
```

#### `@Deprecated` DeviceStorageObjectAssemblerDataSource

Use SerializationDataSourceMapper instead.

For example:

```kotlin
// Kotlin
val toStringMapper = ModelToStringMapper<ItemEntity>(gson)
val toModelMapper = StringToModelMapper(ItemEntity::class.java, gson)
val toListModelMapper = ListModelToStringMapper<ItemEntity>(gson)
val toStringListMapper = StringToListModelMapper(object:TypeToken<List<ItemEntity>>() {}, gson)

val deviceStorageDataSource = DeviceStorageDataSource<String>(sharedPreferences) // Mandatory to use a DeviceStorageDataSource of String
val itemEntityDeviceStorageDataSource = DeviceStorageObjectAssemblerDataSource(toStringMapper, toModelMapper, toListModelMapper, toStringListMapper,deviceStorageDataSource)

val itemEntity = ItemEntity(123, "by", "title", "text", "type", 123, "url", emptyList())

// Store value with key "1"
itemEntityDeviceStorageDataSource.put(KeyQuery("1"), itemEntity).get()

// Fetch value with key "1"
val result = itemEntityDeviceStorageDataSource.get(KeyQuery("1")).get()
```

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

More information: https://developer.apple.com/documentation/foundation/userdefaults

### `SharedPreferences` (Android) compatible types

More information: https://developer.android.com/reference/android/content/SharedPreferences

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

```kotlin
// Kotlin
val doubleDataSource = DeviceStorageDataSource<Double>(sharedPreferences, prefix = "Double")
val intDataSource = DeviceStorageDataSource<Int>(sharedPreferences, prefix = "Int")
doubleDataSource.put(KeyQuery("pi"), 3.14159265359)
intDataSource.put(KeyQuery("pi"), 3)
```

In `SharedPreferences` we will find two new entries after running the above code:

- A `Double` 3.14159265359 stored for the key `"Double.pi"`
- An `Int` 3 stored for the key `"Int.pi"`

Note that we could now create a new data source using the prefix `"Double"` but of a different type. Then, the `get` would succeed only if the cast from its original type to the newer type succeeds, otherwise would throw an `DataNotFoundException`.

```kotlin
// Kotlin
val dataSource = DeviceStorageDataSource<Double>(sharedPreferences, prefix = "Double")
dataSource.get(KeyQuery("pi")).onCompleteUi(
    onSuccess = {
        println("Pi: $it")
    },
    onFailure = {
        println("Error: " + it.localizedMessage)
    }
```

In the example above, pi is returned as the string `"3.14159265359"`.
