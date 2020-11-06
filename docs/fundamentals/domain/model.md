---
title: Model
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Models are just plain objects, without any specific built-in logic. Harmony doesn't provide a base model, as this is something delegated to every project.

The domain layer must contain its own models, that are decoupled from the framework and from the data layer.

Typically, a model would be something like:

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'TypeScript', value: 'typescript', },
    { label: 'PHP', value: 'php', },
]}>
<TabItem value="kotlin">

```kotlin
data class User(val id: Int, val name: String) 
```

</TabItem>
<TabItem value="swift">

```swift
struct User {
    let id: Int
    let name: String
}
```

</TabItem>
<TabItem value="typescript">

```typescript
export class User {
    constructor(
        readonly id: number,
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
  

### Why a domain model?

After several years developing backends, web apps and native apps, we have seen that there different type of models depending on the layer you operate.

On the domain layer, models tend to be immutable and are object representations of the information carried out by the different use cases. Quite often, these structures differ from the model of the data layer.

For example, data layer models may include meaningful attributes as `created_at` or `updated_at`, used in the data business logic, but useless at a domain (use case) logic. Therefore, domain's model objects would not include such attributes.

