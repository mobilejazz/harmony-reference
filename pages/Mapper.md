---
title: Mapper
permalink: /mapper/
---

# Mapper

A `Mapper` object defines a mapping method `map` between two object types.

```swift
// Swift
open class Mapper<From,To> {
    public init() { }
    open func map(_ from: From) throws -> To {
        fatalError("Undefined mapper. Class Mapper must be subclassed.")
    }
}
```

```kotlin
// Kotlin
interface Mapper<in From, out To> {
   fun map(from: From): To
}
```

## Usage

```swift
// Swift
let objectA : A = A()
let mapper : Mapper<A,B> = MyA2BMapper()
let objectB : B = mapper.map(objectA)
```

```kotlin
// Kotlin
val a : A
val mapper: Mapper<A,B> = MyA2BMapper()
val b : B = mapper.map(a)
```

## Mapping Arrays & Dictionaries

`Mapper` has extensions to map values form arrays and dcitionaries:

```swift
// Swift
public func map( _ array: [In]) throws -> [Out] { ... }
public func map<K>(_ dictionary: [K:In]) throws -> [K:Out] where K:Hashable { ... }
```

```swift
// Kotlin
fun <From, To> Mapper<From, To>.map(values: List<From>): List<To> = values.map { ... }
fun <From, To, K> Mapper<From, To>.map(value: Map<K, From>): Map<K, To> { ... }
```

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

```swift
// Swift
class MyA2BMapper : Mapper <A,B> {
    // Add custom init if necessary
    // public init(_ customParam: ParamType) { ... }
    public override func map(_ from: A) throws -> B {
        var objectB : B = B(from.id)
        return objectB
    }
}
```

```kotlin
// Kotlin
class MyA2BMapper : Mapper<A, B> {
  override fun map(from: A): B = B(from.id) 
}
```
