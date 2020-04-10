---
title: Prerequisites
---

import LinkCard from '@site/src/components/link-card';

Before you start to work with Harmony, you need to know and understand some concepts. Also it's important to have some background related with the platform. One of the greatest things of Harmony is that it allows to switch beetwen platforms very easy because the concepts are the same and the implementation is similar.

## Clean Architecture

Harmony is based on clean architecture. Clean architecture has 3 different layers: **application**, **domain** and **data**. Each layer has one responsability. Also, they are connected to each other but got boundaries. https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

### Application layer

Application or presentation layer will include all views and also specific platform stuff.

<div className="cards-row">
  <LinkCard
      href="application/android"
      title="Android"
      description=""
      footer="Getting Started">
  </LinkCard>
  <LinkCard
      href="application/ios"
      title="iOS"
      description=""
      footer="Getting Started">
  </LinkCard>
</div>

<div className="cards-row">
  <LinkCard
      href="application/frontend"
      title="Frontend"
      description=""
      footer="Getting Started">
  </LinkCard>
  <LinkCard
      href="application/backend"
      title="Backend"
      description=""
      footer="Getting Started">
  </LinkCard>
</div>

### Domain layer

[Domain](../domain/interactor/interactor)
Domain layer will include all business logic and interact between Data and Presentation layer by means of interface and interactors.

### Data layer

Data layer will include POJOs and means to get Data from cloud or local storage.
[Data](../data/repository/repository)

## Software

You need [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/) for mobile platforms. For iOS or MacOS you also need [CocoaPods](https://cocoapods.org/) installed in your system.
We recommend PHPStorm as IDE for backend PHP development
