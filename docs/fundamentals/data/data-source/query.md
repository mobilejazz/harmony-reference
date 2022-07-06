---
title: Query
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A `Query` object defines intrinsically how data must be manipulated, containing inside all parameters required to execute the action.

The base definition of a query is empty, as this object must be customized in custom objects. 

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'TypeScript', value: 'typescript', },
    { label: 'PHP', value: 'php', },
]}>
<TabItem value="kotlin">

```kotlin
open class Query
```

</TabItem>
<TabItem value="swift">

```swift
public protocol Query { }
```

</TabItem>
<TabItem value="typescript">

```typescript
export class Query { }
```

</TabItem>
<TabItem value="php">

```php
class Query { }
```

</TabItem>
</Tabs>

For example, if one or many data sources can perform a serch by text, we would define a new query called `SearchQuery` as follows:



<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'TypeScript', value: 'typescript', },
    { label: 'PHP', value: 'php', },
]}>
<TabItem value="kotlin">

```kotlin
class SearchQuery(val text: String): Query()

// Searching in network
itemsNetworkDataSource.getAll(SearchQuery("lorem ipsum"))
// Searching in local storage
itemsStorageDataSource.getAll(SearchQuery("lorem ipsum"))
```

</TabItem>
<TabItem value="swift">

```swift
struct SearchQuery: Query {
    let text : String
}

// Searching in network
itemsNetworkDataSource.getAll(SearchQuery("lorem ipsum"))
// Searching in local storage
itemsStorageDataSource.getAll(SearchQuery("lorem ipsum"))
```

</TabItem>
<TabItem value="typescript">

```typescript
export class SearchQuery extends Query {
    constructor(readonly text: string) { super(); }
}

// Searching in network
itemsNetworkDataSource.getAll(new SearchQuery("lorem ipsum"));
// Searching in local storage
itemsStorageDataSource.getAll(new SearchQuery("lorem ipsum"));
```

</TabItem>
<TabItem value="php">

```php
class SearchQuery extends Query {
    /** @var string */
    protected $text;

    public function __construct(
        string $text
    ) {
        $this->text = $text;
    }
}

// Searching in network
$itemsNetworkDataSource->getAll(new SearchQuery("lorem ipsum"));
// Searching in local storage
$itemsStorageDataSource->getAll(new SearchQuery("lorem ipsum"));
```

</TabItem>
</Tabs>


:::tip Note
A query must be **decoupled** from any data source implementation.

Take for example a query called `LastBookReadNerworkQuery`. This is a bad naming as it clearly states a data source implementation. Instead use `LastBookReadQuery` as queries must be abstracted from its source and can potentially be reused in multiple [data sources](/docs/fundamentals/data/data-source/concepts).
:::





## Default implementations

Harmony provides multiple predefined queries ready to be used. The most popular are:

- `VoidQuery`: Empty query.
- `IdQuery`: Query by id.
- `IdsQuery`: Query containing a collection of Ids. 
- `PaginationOffsetLimitQuery`: Pagination query by offset and limit.

Specifically, `IdQuery` is very useful to identify objects by its id. For example, instead of having a `UserIdQuery` and call it into a `UserNetworkDataSource` (or any other user-based data source), just use `IdQuery` with the id of a user. 

Review your Harmony platform library to find the complete list of queries available. 

## `KeyQuery` support

In an effort to build a friendly key-value ecosystem for data sources, Harmony defines the concept of `KeyQuery` as a subclass/subinteface of `Query` that exposes an string `key` attribute that can be used as a key for a key-value interface. 

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'TypeScript', value: 'typescript', },
    { label: 'PHP', value: 'php', },
]}>
<TabItem value="kotlin">

```kotlin
open class KeyQuery(val key: String) : Query()
```

</TabItem>
<TabItem value="swift">

```swift
public protocol KeyQuery : Query {
    var key : String { get }
}
```

</TabItem>
<TabItem value="typescript">

```typescript
export class KeyQuery extends Query {
    constructor(public readonly key: string) { super(); }
}
```

</TabItem>
<TabItem value="php">

```php
class KeyQuery extends Query {
    /** @var string */
    private $key;

    /**
     * @param string $key
     */
    public function __construct(string $key) {
        $this->key = $key;
    }

    /**
     * @return string
     */
    public function getKey(): string {
        return $this->key;
    }
}
```

</TabItem>
</Tabs>

For example, the Harmony predefined `IdQuery<T>` adopts `KeyQuery` and is ready to be used in key-value data sources.

:::tip Tip
It's a good practice to build your queries by either inheriting from already existing queries or by adopting `KeyQuery`. 
:::

By doing it so, you will ensure your queries reuse the most amount of attributes and data sources will easily support existing queries out of the box.

:::warning
Only queries adopting `KeyQuery` can be used in key-value-based data sources.
:::

Coming back to the `SearchQuery` example, we could now make it adopt `KeyQuery`, bringing us the option to use key-value-based data sources as [`InMemoryDataSource`](in-memory-data-source) to cache results and improve performance of our system.

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Swift', value: 'swift', },
    { label: 'TypeScript', value: 'typescript', },
    { label: 'PHP', value: 'php', },
]}>
<TabItem value="kotlin">

```kotlin
class SearchQuery(val text: String): KeyQuery(text)
```

</TabItem>
<TabItem value="swift">

```swift
extension SearchQuery : KeyQuery {
    public var key : String { return text }
}
```

</TabItem>
<TabItem value="typescript">

```typescript
export class SearchQuery extends KeyQuery {
    constructor(readonly text: string) { super(text); }
}
```

</TabItem>
<TabItem value="php">

```php
class SearchQuery extends KeyQuery {
    /** @var string */
    protected $text;

    public function __construct(string $text) {
        parent::__construct($text);
        $this->text = $text;
    }
}
```

</TabItem>
</Tabs>

