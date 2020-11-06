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
    { label: 'TypeScript', value: 'typescript', },
    { label: 'PHP', value: 'php', },
]}>
<TabItem value="kotlin">

```kotlin
val dataSource = InMemoryDataSource<Double>()
dataSource.put(IdQuery("pi"), 3.14159265359)
dataSource.get(IdQuery("pi"))
dataSource.delete(IdQuery("pi"))
```

</TabItem>
<TabItem value="swift">

```swift
let dataSource = InMemoryDataSource<Double>()
dataSource.put(3.14159265359, in: IdQuery("pi"))
dataSource.get(IdQuery("pi"))
dataSource.delete(IdQuery("pi"))
```

</TabItem>
<TabItem value="typescript">

```typescript
let dataSource = new InMemoryDataSource<Double>();
dataSource.put(3.14159265359, new IdQuery("pi"));
dataSource.get(new IdQuery("pi"));
dataSource.delete(new IdQuery("pi"));
```

</TabItem>
<TabItem value="php">

```php
$inMemoryDataSource = new InMemoryDataSource(Foo::class);
$query = new KeyQuery("pi");
$inMemoryDataSource->get($query);
$inMemoryDataSource->put($query, new Foo());
$inMemoryDataSource->delete($query);
```

</TabItem>
</Tabs>

## Query Types

Only queries adopting the [`KeyQuery`](query) interface.

## Object Types

Any object can be stored in a `InMemoryDataSource`.
