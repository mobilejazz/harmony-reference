---
title: Operation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Operation

The [`Operation`](Operation.md) object itself defines intrinsically how a query must be forwarded to a data source, containing inside all parameters required to execute the action.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
sealed class Operation
```

</TabItem>
<TabItem value="swift">

```swift
public protocol Operation { }
```

</TabItem>
</Tabs>

Note that an `Operation` depends exclusively on a custom implementation of a [`Repository`](Repository.md). Each [`Repository`](Repository.md) implementation will delcare it's supported `Operations`.

## Usage

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
object MyRetryOnceIfErrorOperation: Operation()

val repository = MyCustomRepository(...)

repository.get(IdQuery("myKey"), MyRetryOnceIfErrorOperation)
```

</TabItem>
<TabItem value="swift">

```swift
struct MyRetryOnceIfErrorOperation: Operation { }

// Custom repository implementation that supports MyRetryOnceIfErrorOperation
let repository = MyCustomRepository(...) 

repository.get(IdQuery("myKey"), operation: MyRetryOnceIfErrorOperation())
```

</TabItem>
</Tabs>

## Default implementations

- `DefaultOperation`: Empty operation. To be used when none operation is required or as a default behavior.

> **All repositories must accept this operation and perform its expectec behavior.**

Any other custom operation will be declared together with its [`Repository`](Repository.md) implementation.

## Using Operations in Repositories

Operations must be pro-actively supported in each [`Repository`](Repository.md) implementation. A typical appearance of an implemented `get` method from a `GetRepository` would be:

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
]}>
<TabItem value="kotlin">

```kotlin
override fun get(query: Query,operation: Operation): Future<MyObject> = when (operation) {
    is MyRetryOnceIfErrorOperation -> {...}
    is MyOtherOperation -> {...}
    else -> notSupportedOperation()
}
```

</TabItem>
<TabItem value="swift">

```swift
func get(_ query: Query, operation: Operation) -> Future<MyObject> {
    switch operation.self {
    case MyRetryOnceIfErrorOperation():
        return someDataSource.get(query).recover {
            return someDatSource.get(query)
        }
    case is MyOtherOperation():
        // ...
    default:
        operation.fatalError(.get, self)
    }
}
```

</TabItem>
</Tabs>

Note the `default:` / `else` behavior. When using an unsupported operation, an exception/fatalError is raised as this is an illegal call.
