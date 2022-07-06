---
title: RepositoryMapper
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`RepositoryMapper<In,Out>` encapuslates a [`Repository`](concepts) instance of type `In` and exposes a new interface of [`Repository`](concepts) of type `Out`, mapping the objects using a [`Mapper<In,Out>`](/docs/fundamentals/common/mapper) and [`Mapper<Out,In>`](/docs/fundamentals/common/mapper).

## Usage

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
fun provideDataRepositoryMapper(dataMapperHarmony: Mapper<@JvmSuppressWildcards DataEntity, @JvmSuppressWildcards DataModel>,
                                dataEntityMapperHarmony: Mapper<@JvmSuppressWildcards DataModel, @JvmSuppressWildcards DataEntity> ):
    RepositoryMapper<DataEntity, DataModel> {

    val dataStorageDataSource = DataStorageDataSource()

    val singleDataSourceRepository = SingleDataSourceRepository(
        dataStorageDataSource,
        dataStorageDataSource,
        dataStorageDataSource)

    return RepositoryMapper(singleDataSourceRepository,
        singleDataSourceRepository,
        singleDataSourceRepository,
        dataMapperHarmony,
        dataEntityMapperHarmony)
```

</TabItem>
<TabItem value="swift">

```swift
let repository = RepositoryMapper(MyCustomRepository<A>(),
                                  toInMapper: MyB2AMapper(),
                                  toOutMapper: MyA2BMapper())

repository.put(B(), forId: "myKey", operation: DefaultOperation())
repository.get("myKey", operation: DefaultOperation())
```

</TabItem>
</Tabs>

## Operation Types

Any [`Operation`](operation) can be passed to a `RepositoryMapper<In,Out>`.

## Other Implementations

Together with `RepositoryMapper<In,Out>` there are also similar implementations for:

- `GetRepositoryMapper<In,Out>`: Implements `GetRepository`.
- `PutRepositoryMapper<In,Out>`: Implements `PutRepository`.

There is no need to map a `DeleteRepository`.
