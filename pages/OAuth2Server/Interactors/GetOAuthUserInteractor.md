---
title: GetOAuthUserInteractor
permalink: /oauth2server/interactors/getoauthuserinteractor
---

# GetOAuthUserInteractor

An interface of an interactor, where the developer must provide an implementation to perform a fetch of a user object given a userId (string) stored in the oauth database.

```typescript
// TypeScript
export interface GetOAuthUserInteractor {
    execute(userId: string): Promise<OAuthUser>;
}
```

Given a string containing the user id, return the given user object.
