---
title: Data Source Mapper
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# DataSourceMapper

`DataSourceMapper<In,Out>` encapuslates a [`DataSource`](DataSource.md) instance of type `In` and exposes a new interface of [`DataSource`](DataSource.md) of type `Out`, mapping the objects using a [`Mapper<In,Out>`](../Mapper.md) and [`Mapper<Out,In>`](../Mapper.md).

## Usage

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
// Kotlin
val deviceStorageDataSource = InMemoryDataSource<String, A>()
val dataSourceMapper = DataSourceMapper(deviceStorageDataSource,
                                        deviceStorageDataSource,
                                        deviceStorageDataSource,
                                        AtoBMapper(),
                                        BtoAMapper())
  
dataSourceMapper.put("fromKey", B())
dataSourceMapper.get("fromKey")
```

</TabItem>
<TabItem value="swift">

```swift
let dataSource = DataSourceMapper(InMemoryDataSource<A>(),
                                  toInMapper: MyB2AMapper(),
                                  toOutMapper: MyA2BMapper())

dataSource.put(B(), forId: "myKey")
dataSource.get("myKey")
```

</TabItem>
</Tabs>

## Query Types

Any [`Query`](Query.md) can be passed to a `DataSourceMapper<In,Out>`.

## Other Implementations

Together with `DataSourceMapper<In,Out>` there are also similar implementations for:

- `GetDataSourceMapper<In,Out>`: Implements `GetDataSource`.
- `PutDataSourceMapper<In,Out>`: Implements `PutDataSource`.

There is no need to map a `DeleteDataSource`.
