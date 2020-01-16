---
title: ValidateScopeInteractor
permalink: /oauth2server/interactors/validatescopeinteractor
---

# ValidateScopeInteractor

An interface of an interactor, where the developer must provide an implementation to perform a scope validation.

```typescript
// Typescript
export interface ValidateScopeInteractor {
    execute(user: OAuthUser, client: OAuthClient, scope: string[]): Promise<string[]>;
}
```

A default implementation is already defined by the `AlwaysValidScopeInteractor` class:

```typescript
// Typescript
export class AlwaysValidScopeInteractor implements ValidateScopeInteractor {
    execute(user: OAuthUser, client: OAuthClient, scope: string[]): Promise<string[]> {
        return Promise.resolve(scope);
    }
}
```