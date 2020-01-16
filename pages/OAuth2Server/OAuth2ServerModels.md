---
title: OAuth2Server Models
permalink: /oauth2server/oauth2server_models
---

# OAuth2Server Models

The library `OAuth2Server` requires a model in order define the exact capabilities and implementation of the server.

We have two available models:

## 1. OAuthBaseModel

The model defined in the class `OAuthBaseModel` supports:

- Request Authentication
- Client Credentials Authentication

To create an instance of the class, no parameters are requried. For more information read the documentation associated to the [`OAuthProvider`](OAuthProvider.md).

## 2. OAuthUserModel

The model defined in the class `OAuthUserModel` (subclass of `OAuthBaseModel`) supports

- Request Authentication
- Client Credentials Authentication
- User Authentication
- Refresh Token Authentication

To create an instance of the class, it's required to provide instances of:

- [`LoginOAuthUserInteractor`](Interactors/LoginOAuthUserInteractor.md)
- [`GetOAuthUserInteractor`](Interactors/GetOAuthUserInteractor.md) 
- [`ValidateScopeInteractor`](Interactors/ValidateScopeInteractor.md)

For more information read the documentation associated to the [`OAuthProvider`](OAuthProvider.md).