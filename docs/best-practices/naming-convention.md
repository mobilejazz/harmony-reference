---
title: Naming convention
---

Find the standard naming convention for each component/platform

|  COMPONENT | KOTLIN  | SWIFT  | PHP  | TYPESCRIPT  |
|---|---|---|---|---|
| DOMAIN  |   |   |   |  |
| Model  | Book  | Book  | Book  | Book  |
| Model Data layer  | BookEntity  | BookEntity  | BookEntity  | BookEntity  |
| Interactor  | GetBooksInteractor  | GetBooksInteractor  | GetBooksInteractor  | GetBooksInteractor  |
| DATA  |   |   |   |  |
| Mapper to data | BookToBookEntityMapper  | BookToBookEntityMapper  | BookToBookEntityMapper  | BookToBookEntityMapper  | 
| Mapper from data | BookEntityToBookMapper  | BookEntityToBookMapper  | BookEntityToBookMapper  | BookEntityToBookMapper  | 
| Network DataSource  | BookNetworkDataSource  | BookNetworkDataSource  | BookNetworkDataSource  | BookNetworkDataSource  |
| Repository  | BookRepository  | BookRepository  | BookRepository  | BookRepository  |
| DI  |   |   |   |  |
| Provider  | ApplicationProvider  | ApplicationProvider  | ApplicationProvider  | ApplicationProvider  |
| Component  | ApplicationComponent  | ApplicationComponent  | ApplicationComponent  | ApplicationComponent  |
| Module  | ApplicationDefaultModule  | ApplicationDefaultModule  | ApplicationDefaultModule  | ApplicationDefaultModule  |