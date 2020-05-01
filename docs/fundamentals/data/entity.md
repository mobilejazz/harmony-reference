---
title: Entity
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Entities represent the models of the data layer and are just plain objects, without any specific built-in logic. Harmony doesn't provide a base entity, as this is something delegated to every project.

The data layer must contain its own entities, that are decoupled from the domain layer and from any underlaying third party library. Entities must be the types exposed by data soruces and repositories. 

Typically, we use the naming convention of attaching `Entity` as a suffix in the name of our entities. 

For example, an entity would be something like:

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
    { label: 'PHP', value: 'php', },
]}>
<TabItem value="kotlin">

```kotlin
data class UserEntity(val id: Int, val createdAt: Date, val updatedAt: Date, val name: String) 
```

</TabItem>
<TabItem value="swift">

```swift
struct UserEntity {
    let id: Int
    let createdAt: Date
    let updatedAt: Date
    let name: String
}
```

</TabItem>
<TabItem value="typescript">

```typescript
export class User {
    constructor(
        readonly id: number,
        readonly createdAt: Date,
        readonly updatedAt: Date,
        readonly name: string,
    ) {}   
}
```

</TabItem>
<TabItem value="php">

```php
// TODO
```

</TabItem>
</Tabs>


:::important Important
The Data layer can potentially contain more model objects if needed. For example, if you plan to use an ORM library, you might want to have your own ORM object models rather than mixing them with the entities.
:::
