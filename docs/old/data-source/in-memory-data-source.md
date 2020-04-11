---
title: InMemoryDataSource
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`InMemoryDataSource<T>` is a key-value storage that implements `GetDataSource`, `PutDataSource` and `DeleteDataSource` storing values as live references during the instance life cycle.

## Usage

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
val dataSource = InMemoryDataSource<Double>()
dataSource.put("pi", 3.14159265359)
dataSource.get("pi")
dataSource.delete("pi")
```

</TabItem>
<TabItem value="swift">

```swift
let dataSource = InMemoryDataSource<Double>()
dataSource.put(3.14159265359, forId: "pi")
dataSource.get("pi")
dataSource.delete("pi")
```

</TabItem>
</Tabs>

Note that the example above is using the extension methods of DataSoruce that encapsulate queries of type `IdQuery<T>`.

## Query Types

All queries must adopt the [`KeyQuery`](query) interface as the `InMemoryDataSource<T>` is based on a key-value pattern.

## Object Types

Any object of type T can be stored in a `InMemoryDataSource<T>`, and there are no restrictions of type.

## Implementation Notes

All objects and arrays are stored in dictionaries that are kept alive as long as the  `InMemoryDataSource<T>` instance is alive.

Objects interfaced with the `get`, `put` and `delete` functions are stored in separate dictionaries than arrays of objects interfaced via the `getAll`, `putAll` and `deleteAll` functions.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
class InMemoryDataSource<V> @Inject constructor() : GetDataSource<V>, PutDataSource<V>, DeleteDataSource {
    // get, put delete
    private val objects: MutableMap<String, V> = mutableMapOf() 
    // getAll, putAll, deleteAll
    private val arrays: MutableMap<String, List<V>> = mutableMapOf() 

    [ ... ] // The rest of the class implementation
}
```

</TabItem>
<TabItem value="swift">

```swift
public class InMemoryDataSource<T> : GetDataSource, PutDataSource, DeleteDataSource  {
    // get, put delete
    private var objects : [String : T] = [:]
    // getAll, putAll, deleteAll
    private var arrays : [String : [T]] = [:]

    [ ... ] // The rest of the class implementation
}
```

</TabItem>
</Tabs>
