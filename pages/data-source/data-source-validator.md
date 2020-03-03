---
title: Data Source Validator
---

# DataSourceValidator

`DataSourceValidator<T>` encapuslates a [`DataSource`](data-source.md) instance and validates all objects fetched in the `GetDataSource` functions.

Validation happens via the `ObjectValidation` protocol described below.

## Usage

```swift
// Swift
let networkDataSource = /* Custom Netowrk Data Source */
let storageDataSource = InMemoryDataSource<A>()
let validator : ObjectValidation = /* Custom Object Validation */
let validatedDataSource = DataSourceValidator(dataSource: storageDataSource, validator: vastra)

validatedDataSource.get("myKey").recover { error in
    if error is CoreError.NotValid {
        // Validation did not pass
        return networkDataSource.get("myKey")
    }
    return Future(error)
}
```

```kotlin
// Kotlin
// TODO
```

## Query Types

Any [`Query`](query.md) accepted by the encapuslated `DataSource` an be used in the `DataSourceValidator<T>`.

## Object Types

Any object of type `T` accepted by the encapuslated `DataSource` an be passed into the `DataSourceValidator<T>`.

## Object Validation

In order to validate objects, an object validation service is required.

```swift
// Swift
public protocol ObjectValidation {
    func isObjectValid<T>(_ object: T) -> Bool
    func isArrayValid<T>(_ objects: [T]) -> Bool
}
```

```kotlin
// Kotlin
// TODO
```

The `DataSourceValidator<T>` will call these validation methods in the `get` and `getAll` functions and return a `CoreError.NotValid` if the validation fails.

### Using `Vastra` for Object Validation

`Vastra` is a library built to perform object validation in multiple strategies and manners. The library can be downloaded as explained below.

```ruby
# CocoaPods
pod 'MJSwiftCore/Vastra'
```

```ruby
# Gradle
# TODO
```

### `Vastra` & Swift

The `VastraService` is the class responsible of performing object validation. However, it doesn't comform to the `ObjectValidation` protocol to be used directly in `DataSourceValidator<T>`.

Moreover, both `Vastra` and `DataSourceValidator<T>` have been built to work very closely, making it very simple to conform to the protocol:

```swift
// Swift
extension VastraService : ObjectValidation { }
```

The `VastraService` interface matches the `ObjectValidation` one.

### `Vastra` & Android

// TODO

In order to use `Vastra` in android, there is a dedicated data source for it: `DataSourceVastraValidator<T>`.

```kotlin
// Kotlin
// TODO
```
