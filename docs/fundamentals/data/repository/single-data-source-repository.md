---
title: SingleDataSourceRepository
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `SingleDataSourceRepository<T>` redirects all calls to the single data source of type `T` that encapsulates.

This repository is commonly used when there is only one data source to manipulate, or during the initial phase of development when further data sources are not yet implemented (for example, using a network data source only while not having yet the local storage data source ready).

## Usage

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
val datasource = MyDataSource()
val repository = SingleDataSourceRepository(datasource /*get datasource*/, datasource /*put datasource*/, datasource /*delete datasource*/)

repository.get(IdQuery("myKey"), DefaultOperation)
```

</TabItem>
<TabItem value="swift">

```swift
let dataSource = MyDataSource()
let repository = SingleDataSourceRepository(dataSource)
repository.get(IdQuery("myKey"), operation: DefaultOperation())
```

</TabItem>
</Tabs>

## Operation Types

Any operation can be passed to this repository, at is directly forwarding everything to its encapsulated [`DataSource`](../data-source/concepts). It is recomended to use a `DefaultOperation` as convention.

## Other Implementations

Together with `SingleDataSourceRepository<T>` there are implementations deciated for a `GetDataSource`, `PutDataSource` and `DeleteDataSource`:

- `SingleGetDataSourceRepository<T>`: Implements `GetDataSource`.
- `SinglePutDataSourceRepository<T>`: Implements `PutDataSource`.
- `SingleDeleteDataSourceRepository<T>`: Implements `DeleteDataSource`.

## Notes

There are extensions of `GetDataSource`, `PutDataSource` and `DeleteDataSource` to get a `SingleXXXDataSourceRepository<T>`:

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
fun <V>GetDataSource<V>.toGetRepository() = SingleGetDataSourceRepository(this)
fun <V>PutDataSource<V>.toPutRepository() = SinglePutDataSourceRepository(this)
fun DeleteDataSource.toDeleteRepository() = SingleDeleteDataSourceRepository(this)
```

</TabItem>
<TabItem value="swift">

```swift
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

</TabItem>
</Tabs>

This allows the following code:

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
val getDataSource = MyGetDataSource()
val gteRepository = getDataSource.toGetRepository()
// ...
```

</TabItem>
<TabItem value="swift">

```swift
let getDataSource = MyGetDataSource()
let getRepository = getDataSource.toGetRepository()

// And same for PutDataSource and DeleteDataSource
```

</TabItem>
</Tabs>
