---
title: Models
---

The library `OAuth2Server` requires a model in order define the exact capabilities and implementation of the server.

We have two available models:

## 1. OAuthBaseModel

The model defined in the class `OAuthBaseModel` supports:

- Request Authentication
- Client Credentials Authentication

To create an instance of the class, no parameters are requried. For more information read the documentation associated to the [`OAuthProvider`](oauth-provider).

## 2. OAuthUserModel

The model defined in the class `OAuthUserModel` (subclass of `OAuthBaseModel`) supports

- Request Authentication
- Client Credentials Authentication
- User Authentication
- Refresh Token Authentication

To create an instance of the class, it's required to provide instances of:

- [`LoginOAuthUserInteractor`](interactors/login-oauth-user-interactor)
- [`GetOAuthUserInteractor`](interactors/get-oauth-user-interactor)
- [`ValidateScopeInteractor`](interactors/validate-scope-interactor)

For more information read the documentation associated to the [`OAuthProvider`](oauth-provider).
