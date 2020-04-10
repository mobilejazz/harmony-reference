---
title: User Interface
---

An interface that defines an identifier for the user.

```typescript
// TypeScript
export interface OAuthUser {
    oauthId(): string;
}
```

Objects representing the user must implement this interface and provide an ID to identify the user. For example:

```typescript
// TypeScript
export class User implements OAuthUser {
    constructor(
        readonly id: number,
        readonly name: string,
    ) {}

    oauthId(): string {
        return this.id.toString();
    }
}
```

The `oauthId()` is going to be called in the lifecyle of the OAuth2 server, in order to pair user tokens with user ids.
