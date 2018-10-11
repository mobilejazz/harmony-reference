# Mapper

A `Mapper` object defines a mapping method `map` between to types object types.

```swift
// Swift
open class Mapper <From,To> {
    public init() { }
    open func map(_ from: From) throws -> To {
        fatalError("Undefined mapper. Class Mapper must be subclassed.")
    }
}

```

```kotlin
// Kotlin
// TODO
```

## Usage

```swift
// Swift
let objectA : A = A()
let mapper ; Mapper<A,B> = MyA2BMapper()
let objectB : B = mapper.map(objectA)
```

```kotlin
// Kotlin
// TODO
```

## Default implementations

- `VoidMapper`: Empty implementation that returns en error.
- `BlankMapper<T>`: Blank mapper that returns the same object.
- `CastMapper<From,To>`: Mapping by casting the object into the given types.
- `CustomMapper<From,To>`: Mapper that has a closure/lambda upon initialization specifiying the mapping action.

## Creating custom mappers

Custom mappings must be created by subclassing or adopting the `Mapper` class/interface:

```swift
// Swift
struct MyA2BMapper : Mapper <A,B> {
    
    // Add custom init if necessary
    // public init(_ customParam: ParamType) { ... }

    public override func map(_ from: A) throws -> B {
        var objectB : B = B()
        // Map `from` into objectB.
        // Throw an error if necessary
        return objectB
    }
}
```

```kotlin
// Kotlin
// TODO
```