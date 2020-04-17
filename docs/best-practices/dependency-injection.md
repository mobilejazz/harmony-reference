---
title: Dependency Injection
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="android" values={[
    { label: 'Android', value: 'android', },
    { label: 'Kotlin Multiplatform', value: 'kotlin-multiplatform', },
    { label: 'Swift', value: 'swift', },
    { label: 'Typescript', value: 'typescript', },
]}>
<TabItem value="android">

In Android framework, we use [Dagger](https://dagger.dev/). Dagger is a fully static, compile-time dependency injection framework for both Java and Android. It is an adaptation of an earlier version created by Square and now maintained by Google.

Some tutorials: [Dagger tutorial](https://dagger.dev/tutorial/) or more specific for Android [here](https://codelabs.developers.google.com/codelabs/android-dagger/#1)


```kotlin
@Module
class LibraryBookStateModule {

  @Provides
  @Singleton
  fun provideLibraryBookState(context: Context, getUserIdRequiredInteractor: GetUserIdRequiredInteractor): LibraryBookStateProvider {
    return LibraryBookStateStorageProvider(context, getUserIdRequiredInteractor = getUserIdRequiredInteractor)
  }
  
}
```

</TabItem>

<TabItem value="kotlin-multiplatform">

In Kotlin Multiplatform, we got our own dependency injection framework. It has three main concepts: *Provider*, *Component* and *Module*.

#### Provider
A provider is a **file** that contains a component and a module. Each provider should be a feature, topic or part of the application.

#### Component
A component is an **interface** that declares everything that we want to expose. It could be a variable or a function that return an instance.

#### Module
A module is a **class** that implements a component and specify how we are going to supply each component. A module has a constructor to provide every dependency that it has. Also, inside the module we can build every other dependency that we need in order to supply the component.

```kotlin
All this code is inside a Provider named BikeProvider.

interface BikeComponent {
  fun getBikeInteractor(): GetBikeInteractor
  fun getBikesInteractor(): GetBikesInteractor
}

class BikeDefaultModule(private val coroutineScope: CoroutineScope,
                        private val networkConfiguration: NetworkConfiguration,
                        private val oauthComponent: OAuthComponent,
                        private val cacheDatabase: CacheDatabase,
                        private val otp: OTP) : BikeComponent {

  override fun getBikesInteractor(): GetBikesInteractor =
      GetBikesInteractor(coroutineScope, getBikes, oauthComponent.getPasswordTokenInteractor(), getSelectedBikeID)

  override fun getBikeInteractor(): GetBikeInteractor =
      GetBikeInteractor(coroutineScope, GetInteractor(coroutineScope, bikeRepository), oauthComponent.getPasswordTokenInteractor(), getSelectedBikeID, getBikeAdapterInteractor)
}

private val bikeRepository: RepositoryMapper<BikeEntity, Bike> by lazy {
    val getNetworkDataSource = GetNetworkDataSource(
        networkConfiguration.bikesURL,
        networkConfiguration.httpClient,
        BikeEntity.serializer(),
        networkConfiguration.json
    )
    val putNetworkDataSource = PutNetworkDataSource(
        networkConfiguration.bikesURL, networkConfiguration.httpClient, BikeEntity.serializer(),
        networkConfiguration.json
    )
    val deleteNetworkDataSource = DeleteNetworkDataSource(
        networkConfiguration.bikesURL,
        networkConfiguration.httpClient
    )

    val singleDataSourceRepository = SingleDataSourceRepository(getNetworkDataSource, putNetworkDataSource, deleteNetworkDataSource)

    return@lazy RepositoryMapper(singleDataSourceRepository, singleDataSourceRepository, singleDataSourceRepository, BikeEntityToBikeMapper,
        BikeToBikeEntityMapper)
  }
```

</TabItem>

<TabItem value="swift">

In Swift, we use [Swinject](https://github.com/Swinject/Swinject). Swinject is a lightweight dependency injection framework for Swift. [Find here](https://www.raywenderlich.com/17-swinject-tutorial-for-ios-getting-started) a Swinject tutorial. Also, you can find [here](https://felginep.github.io/2019-02-05/swinject-in-practice) a good website that explains how to create custom containers or scope, useful when you got same dependency but you want to provide a diferent implementation.

Swinject has three main components: **Container**, **Assembler** and **Assembly**

#### Container

A container is the place where we register and resolver our dependencies. A container contains all the reference implementation -> instance.

We can register a new dependency in the container with:

```swift
		container.register(Interactor.GetAll<Item>.self) { _ in repository.toGetAllInteractor(DispatchQueueExecutor(), AllObjectsQuery()) }
```

We can get a dependency from the container with:
```swift
        let sessionManager = container.resolve(SessionManager.self)!
```

#### Assembler

An assembler is a **class** that allows us to register all the components. It's our **provider** in Swinject. In Swinject, a component is an **assembly**.

We also declare a variable **Resolver** in order to resolve all the dependencies inside the components that we registered.

```swift
class AppAssembler {
    static let assembler : Assembler = Assembler([RealmAssembly(),
                                                  NetworkAssembly(),
                                                  ItemAssembly()])
    
    static var resolver : Resolver {
        return assembler.resolver
    }
}
```

#### Assembly

An assembly is a **class** that implement Assembly protocol and has a method *assemble* where we can do the implementation for all the dependencies that we got in our container.

As you can see in the example we retrive a dependency from our container using container.resolve and we register a new dependency using container.register.

```swift
class ItemAssembly: Assembly {
    
    func assemble(container: Container) {

		// Network
        let sessionManager = container.resolve(SessionManager.self)!
        let itemNetworkGetDataSource = ItemNetworkDataSource(sessionManager) // <-- Only implements GetDataSource
        let itemNetworkDataSource = DebugDataSource(DataSourceAssembler(get: itemNetworkGetDataSource),
                                                    delay: .sync(2),
                                                    error: .error(CoreError.Failed("Debug Fail"), probability: 0.02),
                                                    logger: DeviceConsoleLogger())
        let networkDataSource = RetryDataSource(itemNetworkDataSource, retryCount: 1) { error in
            return error._code == NSURLErrorTimedOut && error._domain == NSURLErrorDomain
        }

        // Storage (In-Memory)
        let baseStorageDataSource = InMemoryDataSource<ItemEntity>()

		// Repository
        let networkStorageRepo = CacheRepository(main: networkDataSource, cache: baseStorageDataSource)
        let repository = RepositoryMapper(repository: networkStorageRepo,
                                          toInMapper: EncodableToDecodableMapper<Item, ItemEntity>(), // ItemToItemEntityMapper(),
                                          toOutMapper: EncodableToDecodableMapper<ItemEntity, Item>()) // ItemEntityToItemMapper())
        
        // Interactors
        //container.register(Interactor.GetAllByQuery<Item>.self) { _ in repository.toGetAllByQueryInteractor(DispatchQueueExecutor()) }
        container.register(Interactor.GetAll<Item>.self) { _ in repository.toGetAllInteractor(DispatchQueueExecutor(), AllObjectsQuery()) }
    }

}
```


</TabItem>

</Tabs>