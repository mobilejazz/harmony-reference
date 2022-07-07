---
title: Concepts
---

Harmony is divided into three main layers. Each layer is responsible of performing a specific set of tasks and processes. 

This division is specially meaningful in order to keep a decoupled modularization between all the frameworks that are required to build a whole system.   

## Application

The application layer is responsible to implement the actual system. Is the final interface, which is using a specific platform.

Code in this layer will be coupled with the platform framework. 

Some examples:
 
 - Android App: all code that is coupled with the Android SDK.
 - iOS App: all code that is coupled with the UIKit framework.
 - NestJS API: all code that is coupled with the NestJS packages.
 - Angular App: all code that is coupled with the Angular packages.
 
Typically, in the application layer we would be coding the views, API endpoints or any other final application interface required by our specification.

:::important Important
No business logic should be included in the application layer. Use the domain layer for that purpose.
:::

## Domain

The domain layer is responsible to define and implement the different use cases required by the specification. It is not coupled with the platform itself, just to the language and its foundation library.

Within the domain layer, there are 3 major concepts:

- [Interactors (use cases)](domain/interactor)
- [Models](domain/model)
- [Threading](domain/threading)

For example, while building a NestJS Restful API the domain would be coupled with multiple TypeScript libraries, but wouldn't be using any NestJS package.

Typically, in the domain layer we would find a big list of interactors (use cases) and model objects that combined provide the functionality defined in the specification. 

:::important Important
No data manipulation should be included in the domain layer. Use the data layer for that purpose.
:::

## Data

The data layer is responsible to define and implement all data processing, storage or stream. It doesn't include the different requirements from the specification of the system, but rather define the data flows required to sustain them.

The data layer is divided in sub-layers:

- [Repository](data/repository/concepts)
- [Data Source](data/data-source/concepts)
- [Entity](data/entity)

For example, the data layer could implement an HTTP client or a database storage, providing fetch / save / delete capabilities from the different data sources.
 
