---
title: Scope Validation
---

## ValidateScopeInteractor

An interface of an interactor, where the developer must provide an implementation to perform a scope validation.

```typescript
// TypeScript
export interface ValidateScopeInteractor {
    execute(user: OAuthUser, client: OAuthClient, scope: string[]): Promise<string[]>;
}
```

A default implementation is already defined by the `AlwaysValidScopeInteractor` class:

```typescript
// TypeScript
export class AlwaysValidScopeInteractor implements ValidateScopeInteractor {
    execute(user: OAuthUser, client: OAuthClient, scope: string[]): Promise<string[]> {
        return Promise.resolve(scope);
    }
}
```
