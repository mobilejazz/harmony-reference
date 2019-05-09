# RepositoryMapper

`RepositoryMapper<In,Out>` encapuslates a [`Repository`](Repository.md) instance of type `In` and exposes a new interface of [`Repository`](Repository.md) of type `Out`, mapping the objects using a [`Mapper<In,Out>`](../Mapper.md) and [`Mapper<Out,In>`](../Mapper.md).

## Usage

```swift
// Swift
let repository = RepositoryMapper(MyCustomRepository<A>(),
                                  toInMapper: MyB2AMapper(),
                                  toOutMapper: MyA2BMapper())

repository.put(B(), forId: "myKey", operation: DefaultOperation())
repository.get("myKey", operation: DefaultOperation())
```

```kotlin
val repository = RepositoryMapper(MyGetRepository(), 
                                    MyPutRepository(), 
                                    MyDeletedRepository(), 
                                    toInMapper, 
                                    toOutMapper)
                                    
repository.get(IdQuery("myKey"), DefaultOperation)
repository.put(IdQuery("myKey"), B(), DefaultOperation)                                    
```

## Operation Types

Any [`Operation`](Operation.md) can be passed to a `RepositoryMapper<In,Out>`.


## Other Implementations

Together with `RepositoryMapper<In,Out>` there are also similar implementations for:

- `GetRepositoryMapper<In,Out>`: Implements `GetRepository`.
- `PutRepositoryMapper<In,Out>`: Implements `PutRepository`.

There is no need to map a `DeleteRepository`.
