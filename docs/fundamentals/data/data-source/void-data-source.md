---
title: VoidDataSource
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`VoidDataSource<T>` is an implementation of `GetDataSource`, `PutDataSource` and `DeleteDataSource` that throws an error. 

Together with `VoidDataSource<T>` there are also similar implementations:

- `VoidGetDataSource<T>`: Implements `GetDataSource`.
- `VoidPutDataSource<T>`: Implements `PutDataSource`.
- `VoidDeleteDataSource`: Implements `DeleteDataSource`.

The above implementations are very useful when you are developing a data source that doesn't require all GET, PUT and DELETE actions. 

For example, you could have a data source supporting GET and PUT actions but not DELETE. Then, when composing a [repository](../repository/repository.md) from it which requries a delete data source implementation you would pass a `VoidDeleteDataSource` instance.

:::warning
Any call to `VoidDataSource` will result in an error being thrown.
:::

## Query Types

Any [`Query`](query) can be passed to a `VoidDataSource<T>`.
