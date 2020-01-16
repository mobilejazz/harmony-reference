---
title: OAuth2Server Usage Example
permalink: /oauth2server/oauth2server_example
---

# Example of usage of the `OAuth2Server`

Find [this repository](https://github.com/pedroetb/node-oauth2-server-example) that explains in detail how to use the `OAuth2Server`. However, find below some examples as a fast guide.

First of all, all authentication requests must include the `Authorization` HTTP header: 

```
Basic <BASE64_ENCODED_APPLICATION_SECRET>
```

where `BASE64_ENCODED_APPLICATION_SECRET` is the base 64 encoding of the string `client_id:client_secret`. The *client_id* and *client_secret*.  

For example, by using `client_id` *application* and `client_secret` *secret*, we would have the authorization header `Basic YXBwbGljYXRpb246c2VjcmV0`.

## 1. Authenticate by password

Send a *POST* with the following body:
```json
{
    "grant_type": "password",
    "username": "john@doe.com",
    "password": "aaa123",
    "scope": ["word1", "word2", "word3"]
}
```
The `scope` is optional.

## 2. Authenticate by refresh token

Send a *POST* with the following body:
```json
{
    "grant_type": "refresh_token",
    "refresh_token": "THE_REFRESH_TOKEN"
}
```

## 2. Authenticate by client credentials

Send a *POST* with the following body:
```json
{
    "grant_type": "client_credentials"
}
```
Note the *client_id* and *client_secret* are defiend in the `Authorization` HTTP header.