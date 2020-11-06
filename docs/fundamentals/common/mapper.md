---
title: Mapper
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A `Mapper` defines a function to map a value from a type to another type.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'TypeScript', value: 'typescript', },
    { label: 'PHP', value: 'php', },
]}>
<TabItem value="kotlin">

```kotlin
interface Mapper<in From, out To> {
   fun map(from: From): To
}
```

</TabItem>
<TabItem value="swift">

```swift
open class Mapper<From,To> {
    public init() { }
    open func map(_ from: From) throws -> To {
        fatalError("Undefined mapper. Class Mapper must be subclassed.")
    }
}
```

</TabItem>
<TabItem value="typescript">

```typescript
export interface Mapper<From, To> {
    map(from: From, toType?: new () => To): To;
}
```

</TabItem>
<TabItem value="php">

```php
interface Mapper
{
    /**
     * @param $from
     * @return mixed
     */
    public function map($from);
}
```

</TabItem>
</Tabs>

## Mapping Arrays & Dictionaries

When the languages enables it, `Mapper` has extensions to map arrays and dictionaries. Otherwise, you will have to implement a custom mapper to map the values included in arrays and dictionaries.

Find below some of the supported extensions:

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
fun <From, To> Mapper<From, To>.map(values: List<From>): List<To> = values.map { ... }
fun <From, To, K> Mapper<From, To>.map(value: Map<K, From>): Map<K, To> { ... }
```

</TabItem>
<TabItem value="swift">

```swift
func map( _ array: [In]) throws -> [Out] { ... }
func map<K>(_ dictionary: [K:In]) throws -> [K:Out] where K:Hashable { ... }
```

</TabItem>
</Tabs>

## Default implementations

Harmony has multiple pre-defined implementations of mapper. 

- `VoidMapper`: Empty implementation that returns en error.
- `CastMapper<In,Out>`: Mapping by casting the object into the given types.
- `ClosureMapper<In,Out>`: Mapper that has a closure/lambda upon initialization specifiying the mapping action.

:::important Important
Every Harmony library has its own set of pre-defined mappers. Before creating a new mapper, check always with the available mappers in your language.
:::
