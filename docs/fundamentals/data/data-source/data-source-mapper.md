---
title: DataSourceMapper
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`DataSourceMapper<In,Out>` encapuslates a [`DataSource`](data-source) instance of type `In` and exposes a new interface of [`DataSource`](data-source) of type `Out`, mapping the objects using a [`Mapper<In,Out>`](/docs/fundamentals/common/mapper) and [`Mapper<Out,In>`](/docs/fundamentals/common/mapper).

## Usage

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'TypeScript', value: 'typescript', },
    { label: 'PHP', value: 'php', },
]}>
<TabItem value="kotlin">

```kotlin
val dataSource = InMemoryDataSource<String, A>()
val dataSourceMapper = DataSourceMapper(dataSource,
                                        dataSource,
                                        dataSource,
                                        AtoBMapper(),
                                        BtoAMapper())
  
dataSourceMapper.put("myKey", B())
dataSourceMapper.get("myKey")
```

</TabItem>
<TabItem value="swift">

```swift
let dataSource = DataSourceMapper(InMemoryDataSource<A>(),
                                  toInMapper: BtoAMapper(),
                                  toOutMapper: AtoBMapper())

dataSource.put(B(), forId: "myKey")
dataSource.get("myKey")
```

</TabItem>
<TabItem value="typescript">

```typescript
let dataSource = new InMemoryDataSource<A>();
let dataSourceMapper = new DataSourceMapper(dataSource,
                                            dataSource,
                                            dataSource,
                                            new AtoBMapper(),
                                            new BtoAMapper());
  
dataSourceMapper.put(new IdQuery("myKey"), new B());
dataSourceMapper.get(new IdQuery("myKey"));
```

</TabItem>
<TabItem value="php">

```php
$dataSource = new InMemoryDataSource();
$dataSourceMapper = new DataSourceMapper($dataSource,
                                         $dataSource,
                                         $dataSource,
                                         new AtoBMapper(),
                                         new BtoAMapper());
  
$dataSourceMapper->put(new IdQuery("myKey"), new B());
$dataSourceMapper->get(new IdQuery("myKey"));
```

</TabItem>
</Tabs>

## Query Types

Any [`Query`](query) can be passed to a `DataSourceMapper<In,Out>`.

## Other Implementations

Together with `DataSourceMapper<In,Out>` there are also similar implementations for:

- `GetDataSourceMapper<In,Out>`: Implements `GetDataSource`.
- `PutDataSourceMapper<In,Out>`: Implements `PutDataSource`.

There is no need to map a `DeleteDataSource`.
