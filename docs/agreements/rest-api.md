---
title: REST API
---

Here is our agreement to communicate Frontend/Mobile and Backend Applications using a REST API.

## HTTP Returning Codes

Note: Examples with a typical product endpoint: `/product?id=#product-id#`, `/product?id=1234`.

1. **404 Not Found** | Wrong url return 404. Ex. `/prodct?id=1234`.
2. **204 No Content** | When the url exist but the resource not, return 204 with empty body. Ex `/product?id=99999` 
   where `99999` is a not existing ID in the list of products.
3. **400 Bad Request** | A request without params or unexpected params, return 400. Ex. `/product/`, `/product/null`.
4. **200 OK** | Call with WHERE (filtering) that doesn't mach any model, return 200 with an empty array. Ex. `/product?
   whereName=pepito`

We decided this agreement for these reasons:

1. Distinguish a real 404 error (wrong url) on Monitoring System.
2. Distinguish a malformed 400 request on the frontend/app on Monitoring System.
3. The meaning of HTTP 4XX codes in the standard RFC 7231 it's a "Client Error".

## Request

### Request Content Type

1. Always send `Content-Type` to tell the server what type of data is actually sent. Examples:
    1. Request with `<form>` values normally uses `Content-Type: multipart/form-data`
    2. Request with `JSON` values normally uses `Content-Type: application/json`
2. By default, use `JSON` to send data.

We decided this agreement for these reasons:

1. To Avoid errors in server part deducting where is the Request data that needs to be processed.
2. `JSON` it's more flexible than `<form>` values to send data to the server.

### Request Params

1. Use **always Query Params**. Ex. `/api/v1/get-slider?brandId=1&campaignId=1...`.
2. **Except** when we are using a **sensitive** data on the Request, send as POST or Body JSON. Ex. passwords

We decided this agreement for these reasons:

1. To Avoid urls as `/api/v1/brand/1234/campaign/1234/detail/1234/slider/1234`.
2. Instead, we can use a better endpoint as `/api/v1/get-slider` + queryParams `{brandId, campaignId, detailId, sliderId}`.
3. To Avoid merge GET and POST params at same time.
4. To Avoid that each Model appear as unique URL in Monitoring System (ex. `/product/1` and `/product/2` are two 
   transactions on New Relic). Thanks to this we can have easily aggregated stats or errors for each endpoint.
5. We can configure a cache response for each endpoint.
