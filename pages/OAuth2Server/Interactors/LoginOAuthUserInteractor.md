---
title: LoginOAuthUserInteractor
permalink: /oauth2server/interactors/loginoauthuserinteractor
---

# LoginOAuthUserInteractor

An interface of an interactor, where the developer must provide an implementation to perform a user login (given username + password), return a user or an error.

```typescript
// TypeScript
export interface LoginOAuthUserInteractor {
    execute(username: string, password: string): Promise<OAuthUser>;
}
```
