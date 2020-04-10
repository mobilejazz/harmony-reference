---
title: OAuth2 TypeScript Server
---

This OAuth2 typescript library is based on the [OAuth2Server library](https://oauth2-server.readthedocs.io). It implements the additional compontents to manage tokens and store them.

Find below a step by step guide on how to use it.

## 1. Instantiating the OAuth2 server

First, we must create a `OAuth2Server` instance, which will be the object responsible of processing incoming authorization requests, as well as for authenticating incoming clients and users.

To create the `OAuth2Server` instance, we can use the class [`OAuthProvider`](oauth-provider). This class will provide us the *Model* required by the `OAuth2Server` constructor. For example:

```typescript
// TypeScript
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

In this case, a new endpoint must be defined, typically being a `POST` at `/auth/token`.

For this purpose, the library has a specific interactor called [`AuthControllerInteractor`](interactors/auth-controller-interactor).

As an example of usage, a NestJS controller would be like:

```typescript
// TypeScript
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

This is typically achieved by **Guards**. In this case, the library offers an interactor that contains all the logic the guards needs. This is the [`OAuth2GuardInteractor`](interactors/oauth2-guard-interactor).

Therefore, writing a guard is as easy as shown:

```typescript
// TypeScript
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

Then, an endpoint can be secured as easy as doing `@UseGuard(OAuth2Guard)`.

## 3. Defining the SQL Database

The library will require a SQL connector. As listed above, in this case we can use the `TypeORMSQLInterface` class. However, the SQL database for the OAuth must still be defined as explained in the [SQL Schema page](sql-schema).
