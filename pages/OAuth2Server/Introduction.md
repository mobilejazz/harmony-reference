---
title: OAuth2 JS/TS Server
permalink: /oauth2server/introduction
---

# OAuth2 Typescript Server

This OAuth2 typescript library is based on the 
[OAuth2Server library](https://oauth2-server.readthedocs.io). It implements the additional compontents to manage tokens and store them.

Find below a step by step definition on how to use it.

## 1. Instantiating the OAuth2 server

First, we must create a `OAuth2Server` instance, which will be object responsible of processing incoming authorization requests, as well as for authenticating incoming clients and users.

For that purpose, the class [`OAuthProvider`](OAuthProvider.md) exposes the methods needed to obtain the data needed to create the `OAuth2Server` instance.

```typescript
// Typescript

// First, instantiate the provider
const provider: OAuthProvider = new OAuthSqlProvider(sqlInterface);

// Then, instantiate the OAuth2Server using the model we prefer.
return new OAuth2Server({
    model: provider.userModel(getUserInteractor, loginUserInteractor),
    accessTokenLifetime: 60 * 60,
    allowBearerTokensInQueryString: true,
});
```

We have now the `OAuth2Server` instance configured and ready to go. 

## 2. Authenticating Clients/Users

In this case, a new endpoint must be defined, typically being a *POST* at */auth/token*. 

For this purpose, the library has a specific interactor called [`AuthControllerInteractor`](Interactors/AuthControllerInteractor.md).

As an example of usage, a Nest controller would be like:

```typescript
// Typescript
@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AuthControllerInteractor')
        private readonly authInteractor: AuthControllerInteractor,
    ) {}
    @Post('/token')
    login(@Req() request: any, @Res() response: any) {
        this.authInteractor.execute(request, response);
    }
}
```

## 3. Securing endpoints

This is typically achieved by **Guards**. In this case, the library offers an interactor that contains all the logic the guards needs. This is the [`OAuth2GuardInteractor`](Interactors/OAuth2GuardInteractor.md). 

Therefore, writing a guard is as easy as shown:

```typescript
// Typescript
@Injectable()
export class OAuth2Guard implements CanActivate {
    constructor(
        @Inject('OAuth2GuardInteractor')
        private readonly oauthGuard: OAuth2GuardInteractor,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        return this.oauthGuard.execute(context);
    }
}
```

Then, an endpoint can be secured as easy as doing `@UseGuard(OAuth2Guard)`

## 3. Defining the SQL Database

The library will require a SQL connector. As listed above, in this case we can use the `TypeORMSQLInterface` class. However, the SQL database for the OAuth must still be defined as explained in the [SQL Schema page](SQLSchema.md).

