---
title: Operation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An [`Operation`](operation) object defines intrinsically either how a query must be forwarded to a data source either how data must be manipulated, containing inside all parameters required to execute it.

The base definition of an operation is empty, as this object must be customized in custom objects.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
    { label: 'PHP', value: 'php', }
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
<TabItem value="typescript">

```typescript
export interface Operation  {}
```

</TabItem>
<TabItem value="php">

```php
class Operation { }
```

</TabItem>
</Tabs>

For example, if repositories want recover from a data source failure N times, we could define a custom operation to let repositories know how to behave. The representation of this operation could be:

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
    { label: 'PHP', value: 'php', }
]}>
<TabItem value="kotlin">

```kotlin
data class RecoverOperation(val retries: Int): Operation()

// retrieve a book and try to recover only once if failure 
bookRepository.get(IdQuery(42), RecoverOperation(1))
```

</TabItem>
<TabItem value="swift">

```swift
public struct RecoverOperation : Operation { 
    let retries: Int
}

// retrieve a book and try to recover only once if failure 
bookRepository.get(IdQuery(42), operation: RecoverOperation(1))
```

</TabItem>
<TabItem value="typescript">

```typescript
export class RecoverOperation implements Operation {
   constructor(readonly retries: number) { }
}

// retrieve a book and try to recover only once if failure 
bookRepository.get(new IdQuery(42), new RecoverOperation(1))
```

</TabItem>
<TabItem value="php">

```php
class RecoverOperation extends Operation {
    /** @var int */
    protected $retries;

    public function __construct(
        int $retries
    ) {
        $this->retries = $retries;
    }
}

// retrieve a book and try to recover only once if failure 
$bookRepository->get(new IdQuery(42), new RecoverOperation(1))
```

</TabItem>
</Tabs>

   

## Default implementations

Harmony provides multiple predefined operations ready to be used. The most popular are:

- `DefaultOperation`: Empty operation. To be used when none operation is required or as a default behavior.

:::important IMPORTANT
All repositories must have a default behavior by supporting the `DefaultOperation`.
:::
