---
title: Usage example of `OAuth2Server`
---

Find [this repository](https://github.com/pedroetb/node-oauth2-server-example) that explains in detail how to use the `OAuth2Server`. However, find below some examples as a fast guide.

First of all, all authentication requests must include the `Authorization` HTTP header: 

```
Basic <BASE64_ENCODED_APPLICATION_SECRET>
```

where `BASE64_ENCODED_APPLICATION_SECRET` is the base 64 encoding of the string `client_id:client_secret`. The *client_id* and *client_secret*.  

For example, by using `client_id` *application* and `client_secret` *secret*, we would have the authorization header `Basic YXBwbGljYXRpb246c2VjcmV0`.

## 1. Authenticate by password

Send a `POST` with the following body:
```json
{
    "grant_type": "password",
    "username": "john@doe.com",
    "password": "aaa123",
    "scope": ["word1", "word2", "word3"]
}
```
The `scope` is optional.

Curl example:
```bash
curl -X POST "http://HOST/auth/token" -H "Authorization: Basic YXBwbGljYXRpb246c2VjcmV0" -H "Content-Type: application/json" -d "{ \"grant_type\": \"password\", \"username\": \"user@test.com\", \"password\": \"aaa123\"}"
```

## 2. Authenticate by refresh token

Send a `POST` with the following body:
```json
{
    "grant_type": "refresh_token",
    "refresh_token": "THE_REFRESH_TOKEN"
}
```

Curl example:
```bash
curl -X POST "http://HOST/auth/token" -H "Authorization: Basic YXBwbGljYXRpb246c2VjcmV0" -H "Content-Type: application/json" -d "{ \"grant_type\": \"refresh_token\", \"refresh_token\": \"THE_REFRESH_TOKEN\"}"
```

## 3. Authenticate by client credentials

Send a `POST` with the following body:
```json
{
    "grant_type": "client_credentials"

}
```
Note the `client_id` and `client_secret` are defiend in the `Authorization` HTTP header.

Curl example:
```bash
curl -X POST "http://HOST/auth/token" -H "Authorization: Basic YXBwbGljYXRpb246c2VjcmV0" -H "Content-Type: application/json" -d "{ \"grant_type\": \"client_credentials\"}"
```

It is also possible to include the `client_id` and `client_secret` inside the JSON body, instead of in the authorization headers: 

```json
{
    "grant_type": "client_credentials",
    "client_id" : "THE_CLIENT_ID",
    "client_secret": "THE_CLIENT_SECRET"
}
```

Curl example:
```bash
curl -X POST "http://HOST/auth/token" -H "Content-Type: application/json" -d "{ \"grant_type\": \"client_credentials\", \"client_id\": \"THE_CLIENT_ID\", \"client_secret\": \"THE_CLIENT_SECRET\"}"
```
