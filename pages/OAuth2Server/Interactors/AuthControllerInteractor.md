---
title: AuthControllerInteractor
permalink: /oauth2server/interactors/authcontrollerinteractor
---

# AuthControllerInteractor

Interactor that contains the logic of the authentication REST API, typically for the *POST* */auth/token*.

The interactor accepts per input the request and response builder of the endpoint. The interactor will take care of unwrapping the request, formatting it accordingly to the `OAuth2Server` requirements and pass it to it. Then, once the request has been processed, it will build the response. 

```typescript 
// Typescript
export class AuthControllerInteractor {
    constructor(
        private readonly oauthServer: OAuth2Server,
    ) {}

    async execute(request: any, response: any): Promise<void> {
        // Magic happens here
    }
}
```