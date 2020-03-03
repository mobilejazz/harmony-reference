---
title: Mapper
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Mapper

A `Mapper` object defines a mapping method `map` between two object types.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
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
</Tabs>

## Usage

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
val a : A
val mapper: Mapper<A,B> = MyA2BMapper()
val b : B = mapper.map(a)
```

</TabItem>
<TabItem value="swift">

```swift
let objectA : A = A()
let mapper : Mapper<A,B> = MyA2BMapper()
let objectB : B = mapper.map(objectA)
```

</TabItem>
</Tabs>

## Mapping Arrays & Dictionaries

`Mapper` has extensions to map values form arrays and dcitionaries:

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
public func map( _ array: [In]) throws -> [Out] { ... }
public func map<K>(_ dictionary: [K:In]) throws -> [K:Out] where K:Hashable { ... }
```

</TabItem>
</Tabs>

## Default implementations

- `VoidMapper`: Empty implementation that returns en error.
- `IdentityMapper<T>`:  Mapper that returns the same object.
- `CastMapper<In,Out>`: Mapping by casting the object into the given types.
- `ClosureMapper<In,Out>`: Mapper that has a closure/lambda upon initialization specifiying the mapping action.

### Swift exclusive implementations

- `EncodableToDataMapper<T>`: `Encodable` object to `Data`.
- `DataToDecodableMapper<T>`: `Data` to a `Decodable` object.
- `EncodableToDecodableMapper<T>`:  `Encodable` object to a `Decodable` object.
- `NSCodingToDataMapper<T>`: `NSCoding` object to `Data`. 
- `DataToNSCodingMapper<T>`: `Data` to a `NSCoding` object.

## Creating custom mappers

Custom mappings must be created by subclassing or adopting the `Mapper` class/interface:

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
class MyA2BMapper : Mapper<A, B> {
  override fun map(from: A): B = B(from.id)
}
```

</TabItem>
<TabItem value="swift">

```swift
class MyA2BMapper : Mapper <A,B> {
    // Add custom init if necessary
    // public init(_ customParam: ParamType) { ... }
    public override func map(_ from: A) throws -> B {
        var objectB : B = B(from.id)
        return objectB
    }
}
```

</TabItem>
</Tabs>
