---
title: OAuth2GuardInteractor
permalink: /oauth2server/interactors/oauth2guardinteractor
---

# OAuth2GuardInteractor

Interactor that contains the logic of the incoming requests clients/users authentication.

Typically, a guard must use this interactor, easily forwarding the incoming requests to it.

```typescript 
// Typescript
export class OAuth2GuardInteractor {
    constructor(
        private readonly oauthServer: OAuth2Server,
    ) {}

    async execute(context: ExecutionContext): Promise<boolean> {
        // Magic happens here
    }
}
```

The interactor will include in the request of the execution context the `user` and the `client` of the incoming request.

## Decorators

In order to simplify the access to the request attached `user` and `client` objects, decorators can be created in Nest as follows:

```typescript 
export const Client = createParamDecorator((data, req) => {
    return req.client;
});

export const User = createParamDecorator((data, req) => {
    return req.user;
});
```