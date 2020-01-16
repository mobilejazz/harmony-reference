---
title: OAuthProvider
permalink: /oauth2server/oauthprovider
---

# OAuthProvider

The `OAuthProvider` class is an interface for the dependency injection definition:

```typescript
// Typescript
export interface OAuthProvider {
    clientModel(): OAuth2BaseModel;
    userModel(getUser: GetOAuthUserInteractor, loginUser: LoginOAuthUserInteractor): OAuth2UserModel;
}
```

It exposes two methods, one for obtaining a [`OAuth2BaseModel`](OAuth2ServerModels.md) and a [`OAuth2UserModel`](OAuth2ServerModels.md).

Currently, there is only one implementation of that provider, described below.

## 1. OAuthSQLProvider

An SQL based implementation of the `OAuthProvider`.

```typescript
// Typescript
export class OAuthSqlProvider implements OAuthProvider {
    constructor(
        private readonly sqlInterface: SQLInterface,
    ) {}

    public clientModel...
    public userModel...
}
```

Required on its constructor, there is a [`SQLInterface`](SQLInterface.md), which is going to be the entry point to the SQL database.

Also, the database must conform to the SQL Schema defined [here](SQLSchema.md).