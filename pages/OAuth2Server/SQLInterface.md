---
title: SQLInterface
permalink: /oauth2server/sqinterface
---

# SQLInterface

An interface for an SQL database entry point.

```typescript
// Typescript
export interface SQLInterface {
    query(query: string, parameters?: any[]): Promise<any>;
    transaction<T>(runInTransaction: (sqlInterface: SQLInterface) => Promise<T>): Promise<T>;
}
```

Current implementations:

- `TypeORMSQLInterface`: TypeORM based implementation.