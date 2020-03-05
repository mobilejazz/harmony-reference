---
title: KeychainDataSource
---

`KeychainDataSource<T>` is a Swift key-value storage that implements `GetDataSource`, `PutDataSource` and `DeleteDataSource` storing values into the device Keychain. Type `T` is required to be `Codable`.

## Usage

```swift
// Swift
let dataSource = KeychainDataSource<Double>(KeychainService())

dataSource.put(3.14159265359, forId: "pi")
dataSource.get("pi")
dataSource.delete("pi")
```

>Note that the example above is using the extension methods of DataSoruce that encapsulate queries of type `IdQuery<T>`.

The `KeychainService` class is a wrapper on the iOS Keychain. For more details, read the class documentation.

## Query Types

All queries must adopt the [`KeyQuery`](query.md) interface as the `KeychainDataSource<T>` is based on a key-value pattern.

## Object Types

Even if `KeychainDataSource<T>` has a generic type, the Keychain can only store `Data`. However, the class has a built-in data conversion for any type `T` that is `Codable`.

Otherwise, a [`DataSourceMapper<In,Out>`](data-source-mapper.md) can be used to map any type `T` to `Data`.

## Error Handling

Among the typicial errors `CoreError.NotFound` on **GET** methods, the `KeychainDataSource<T>` can return the error `CoreError.OSStatusFailure` in **PUT** and **DELETE** methods. This error is result of a failure in the manipulation of the Keychain. For more details, check the `OSStatus` value of the error.
