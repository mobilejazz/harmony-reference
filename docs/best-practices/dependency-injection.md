---
title: Dependency Injection
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="mobile-jazz" values={[
    { label: 'Mobile Jazz', value: 'mobile-jazz', },
    { label: 'Android', value: 'android', },
    { label: 'Swift', value: 'swift', },
    { label: 'TypeScript', value: 'typescript', },
    { label: 'PHP', value: 'php', }
]}>

<TabItem value="mobile-jazz">

In Mobile Jazz, we defined our own dependency injection pattern. We use it in all the language that we are currently supporting and allows us to have a standarize way. It has three main concepts: *Provider*, *Component* and *Module*.

#### Provider
A provider is a **file** that contains a component and a module. For example, it can be a feature or a topic that it's part of your application.

#### Component
A component is an **interface** that expose the public contract of your module.

#### Module
A module is a **class** that implements a component and specify how we are going to supply each component. A module has a constructor to provide every dependency that it needs. Also, inside the module we can build every other dependency that we need in order to supply the component.

Find an example in Kotlin:

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

<TabItem value="typescript">

We don't have any custom solution for DI on TypeScript projects. Instead use the framework provided solution:

- [Angular Dependency Injection](https://angular.io/guide/dependency-injection)
- [NestJS Custom Providers](https://docs.nestjs.com/fundamentals/custom-providers)

:::important Important
Both Angular and NestJS provide decorators for DI, but **we discourage the usage of these** in the domain or data layers. We promote this so that our code is decoupled from the framework. The data layer shouldn't know anything about the domain layer, and at the same time, the domain layer shouldn't know anything about the app layer.
:::

</TabItem>

<TabItem value="php">
  
In PHP, we are usiging the DI component from each Framework:

* [Laravel Service Provider](https://laravel.com/docs/5.8/providers)
* [Symfony DependencyInjection Component](https://symfony.com/doc/current/create_framework/dependency_injection.html)

Or a custom Provider using plain PHP [from our Sample](https://github.com/mobilejazz/harmony-php/blob/master/sample/src/app/product/ProductProvider.php):

```php
...
protected function registerRepository(): RepositoryMapper
{
    $productInMemoryDataSource = new InMemoryDataSource(ProductEntity::class);

    $productRepository = new SingleDataSourceRepository(
        $productInMemoryDataSource,
        $productInMemoryDataSource,
        $productInMemoryDataSource
    );

    $productRepositoryMapper = new RepositoryMapper(
        $productRepository,
        $productRepository,
        $productRepository,
        new ProductToProductEntityMapper(),
        new ProductEntityToProductMapper()
    );

    return $productRepositoryMapper;
}
...

```

</TabItem>

</Tabs>
