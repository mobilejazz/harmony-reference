---
title: Documentation
---

Each project repository must have a folder `/docs` that will contain all documentation related to the project, business and technical details.

## What do we need to document?

Anything that normally you need to explain to a new team member in the project is a good candidate to document. This 
way we avoid repeating the same information all the time, and it’s clear for everyone in case of doubt where to go 
first to find information.
Example: how to install a localhost to start developing.

Big features require documentation to explain the process followed the first time.
Example: Create new credentials for external services and how we integrated them with our code.

Also, it can be interesting to document not obvious Business Logic processes, and then link from the code to the 
documentation.
Example: new Interactor that will do something very specific for the project Business.

## Folder Structure

This is the expected folder structure:

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

Important: the file `/docs/README.md` is a TOC (Table of Contents), and must contain a link to all other `.md` files.

## Diagrams

For some features, it can be very useful to first create a Diagram with the expected workflow, and validate it with the
Product Owner and/or Project Manager, before we write the first line of code.

### Draw.io

The recommended tool for creating Diagrams it's [draw.io](https://www.draw.io) because:

- Generates a multiplatform SVG file as an output
- Provides a free Browser tool but also App for Linux, Mac and Windows
- These tools can be used by Developers, PMs, Clients, etc. So, everyone can open and edit the diagram.
- SVG files are text files, so, it's ideal for git repository history

### Import/Export Draw.io

To open an existing file:

1. Go to [draw.io](https://www.draw.io)
2. Click on `File -> Open From -> Device...`
3. Select the `.svg` file that you want to edit

To export a diagram to save in the project git repository:

1. Click on `File -> Save as...`
2. Select format `Editable Vector Image` aka `.svg`

### Other Tools

To generate Diagrams It can be used any other tool, but with two requirements:

1. Easily editable for everyone
2. Git history compatible

## Documentation for tools and code

In some cases, you can have some code or tools where you will want a README.md file explaining how it works.
Example: A tool to analyze something in the code can be in `/tools/code-analyzer` and 
`/tools/code-analyzer/README.md`.

Then, it’s ok to have the specific documentation in a README.md file, but always add a link to the TOC file 
`/docs/README.md`.
