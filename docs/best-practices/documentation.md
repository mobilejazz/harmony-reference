---
title: Documentation
---

Each project repository should have a folder `/docs` containing all documentation related to the project, business, and technical details.

## What should we document?

* **Whatever you need to explain to a new member**, for example:
  * How to set up the local environment?
  * Project internal processes
  * Business and project vocabulary
* **Complex and simple (but not apparent) features**, or features that may impact the platform/project, for example:
  * Create and integrate the credentials for external services
  * Cache policy configured
  * HTTP or databases timeouts
  * Single sign-on feature

## Folder Structure

:::info
The `/docs/README.md` file acts as the TOC (Table of Contents).
:::

```markdown
docs
|   README.md
|
└─── feature
|   |   featureA.md
|   |   featureB.md
|   |   ...
|   |
|   └─── featureB
|       |   featureB_diagram.svg
|       |   featureB_api_request_example.json
|       |   ...
|
|─── devops
|   |   docker_configuration.md
|   |   ...
|   |
|─── development
|   |   setup_localhost_environment.md
|   |   code_style.md
|   |   git_configuration.md
|   |   ...
|   |
|─── assets
|   |   imgA.jpg
|   |   imgB.jpg
|   |   ...
```

## Diagrams

Diagrams are an excellent solution to explain/showcase business logic, navigation flows, design patterns, architecture decisions, etc.

### Draw.io

We recommend [draw.io](https://draw.io) to create diagrams:

* Support for SVG files, which are excellent for versioning in git
* Multiplatform
* User-friendly and intuitive

### Import/Export Draw.io

To open an existing file:

* Go to draw.io
* Click on File -> Open From -> Device...
* Select the .svg file you want to edit

To export a diagram to save in the project git repository:

* Click on File -> Save as...
* Select format Editable Vector Image aka .svg


### Other Tools

Other diagram tools are allowed, but they must contain the following features:

* User friendly
* SVG support.

## Code and tools documentation

When in need to explain/document a specific tool/application usage, create an independent `README.md` file within a `/docs/tools/{TOOL_NAME}/` folder. For example:

* Linter configuration
* Memory analyzer tool (MAT)
