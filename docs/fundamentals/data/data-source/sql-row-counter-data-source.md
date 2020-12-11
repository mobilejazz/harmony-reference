---
title: SQLRowCounterDataSource
---

`SQLRowCounterDataSource` is a TypeScript class that implements `GetDataSource<number>` and retrieves counts of rows.

## Usage

```typescript
const dataSource = new SQLRowCounterDataSource(sqlDialect, sqlInterface, 'employee');

// Counting total number of rows
const totalCount = await dataSource.get(new VoidQuery());

// Counting employees of age 18
const count = await dataSource.get(new AgeQuery(18));
```

This class only implements the `get` method, as `getAll` throws a `QueryNotSupportedError`.

## Supported Queries

To count rows, we need to support the following two query types:

- `SQLWhereQuery`
- `SQLWherePaginationQuery`

Subclasses will define the exact configuration of each action.


## Additional Features

### Customization of select statement

Similar to `RawSQLDataSource` use the `selectSQL` method to override the select statement. 

### Soft Delete

`SQLRowCounterDataSource` supports soft deletion of rows counting. To enable it, just call the `SQLRowCounterDataSource` constructor passing the option `true` in the softDeleteEnabled option, as well as the name of the column used to store `delete_at` date.  
