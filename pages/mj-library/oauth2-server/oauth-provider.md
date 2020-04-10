---
title: Injection Provider
---

# OAuthProvider

The `OAuthProvider` class is an interface for the dependency injection definition:

```typescript
// TypeScript
export interface OAuthProvider {
    clientModel(): OAuth2BaseModel;
    userModel(getUser: GetOAuthUserInteractor, loginUser: LoginOAuthUserInteractor): OAuth2UserModel;
}
```

It exposes two methods, one for obtaining a [`OAuth2BaseModel`](mj-library/oauth2-server/oauth2-server-models) and a [`OAuth2UserModel`](mj-library/oauth2-server/oauth2-server-models).

Currently, there is only one implementation of that provider (described below), but new implementations can be provided if required.

## 1. OAuthSQLProvider

An SQL based implementation of the `OAuthProvider`.

```typescript
// TypeScript
export class OAuthSqlProvider implements OAuthProvider {
    constructor(
        private readonly sqlInterface: SQLInterface,
    ) {}

    public clientModel...
    public userModel...
}
```

Required on its constructor, there is a [`SQLInterface`](mj-library/oauth2-server/sql-interface), which is going to be the entry point to the SQL database.

Also, the database must conform to the SQL Schema defined in:

- [MySQL Schema](https://github.com/mobilejazz/harmony-typescript/blob/develop/packages/nest/src/oauth/data/datasource/mysql-oauth.sql)
- [PostgresSQL Schema](https://github.com/mobilejazz/harmony-typescript/blob/develop/packages/nest/src/oauth/data/datasource/postgres-oauth.sql)
