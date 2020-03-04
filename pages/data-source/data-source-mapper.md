---
title: DataSourceMapper
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`DataSourceMapper<In,Out>` encapuslates a [`DataSource`](data-source.md) instance of type `In` and exposes a new interface of [`DataSource`](data-source.md) of type `Out`, mapping the objects using a [`Mapper<In,Out>`](../mapper.md) and [`Mapper<Out,In>`](../mapper.md).

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

Any [`Query`](query.md) can be passed to a `DataSourceMapper<In,Out>`.

## Other Implementations

Together with `DataSourceMapper<In,Out>` there are also similar implementations for:

- `GetDataSourceMapper<In,Out>`: Implements `GetDataSource`.
- `PutDataSourceMapper<In,Out>`: Implements `PutDataSource`.

There is no need to map a `DeleteDataSource`.
