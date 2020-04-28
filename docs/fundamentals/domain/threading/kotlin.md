---
title: Kotlin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Executors are the objects responsibles of executing portions of code in the appropiate thread. Becuase threading is sometihng very specific on each platform, this section is describing executors separately for each platform.

Then, find the list of default implementations for each platform.  

## Platform Overview

### Kotlin

A executor service creates and maintains a reusable pool of threads for executing submitted tasks.

Kotlin mj-core is using the concurrency package from Guava to suply the lack of Asynchronous calls from the Java `Future` with the Guava `ListenableFuture`, using `ListeningExecutorService` instead of a Java `ExecutorService`.

To provide an abstraction from Guava `ListenableFuture` and `ListeningExecutorService` types, we expose two kotlin `typealias`:

- `Executor` --> `ListeningExecutorService`
- `Future` --> `ListenableFuture`

More information:

- [https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Executor.html](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Executor.html)
- [https://github.com/google/guava/wiki/ListenableFutureExplained](https://github.com/google/guava/wiki/ListenableFutureExplained)

#### Usage

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
]}>
<TabItem value="kotlin">

```kotlin
val executor: Executor = [...]

// Execute the callable in the executor and returns a Future<T>
executor.submit(Callable { ... })

// Execute a Runnable instance in the executor and returns void
executor.execute({ ... })
```

</TabItem>
</Tabs>

## Default implementations

Find below the list of default implementations:

- `DirectExecutor`: executes the code on the calling thread synchronously.

### Kotlin exclusive implementations

- `AppExecutor`: Single thread executor.
- `AppUiExecutor`: Main thread executor.

## Nesting Executors

Executors can be netsed (an block using an executor being called in another executor). 
:::warning Deadlock
It might lead to deadlocks if not handled correctly.
:::

<Tabs defaultValue="kotlin" values={[
    { label: 'Kotlin', value: 'kotlin', },
]}>
<TabItem value="kotlin">

```kotlin
val executor: Executor = AppExecutor()
executor.submit({ 
    executor.submit({ })
})
```

</TabItem>
</Tabs>

This example above is nesting two executor calls, where the executor is based on a serial queue / single thread. This means that when the second call to `submit` happens, the queue will block further code execution waiting for the first call to `submit` ends, which won't happen as the code is now stopped.

To solve this, there are two options:

1. When nesting executor calls, use the `DirectExecutor` on all nested executor references. The `DirectExecutor` will execute the code in the same thread/queue, not creating any deadlock.

2. Use concurrent executors. However, be aware that when using concurrent executors, all code used within an executor must be thread-safe. To avoid threading issues, it is always a safer option to not use concurrent executors.

:::tip Using executors in a presenter
Execute/invoke methods use the AppExecutor per default in a presenter. We don't need to specify an executor in the presenter.
:::
