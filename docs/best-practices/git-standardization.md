---
title: Git Standardization
---
This document contains the different standards related to the use of Git within Mobile Jazz.

## Commit messages
Everybody is free to use their own system in their git branches for commit messages but we highly recommend
using [semantic commit messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716).

## Merge / Pull Requests
* Must be created for every feature / bug request associated with their asana task. If there is no Asana task created, we must create it and notify the project manager.
* Must be squashed using the Merge / Pull request title as the git commit message.
* Must be rebased into the target branch.
* Must use the title format described below.

### Title format
The title format will be composed by different values representing a specific area of the task and the project itself.

**Format**: 
> {TASK_ID} :: {PROJECT} :: {STORY} :: {TASK_TYPE} :: {TASK_TITLE}

**Fields**:
* **Task_ID** (required): Value representing the platform name and the last 4 digits of the asana task. For example, ANDROID-7888
* **Project**: Value representing the project name when needed. Typically, git repositories only contain one project, but sometimes they have multiple ones, 
* for example, two different web-frontend projects (admin + public).
* **Story**: Value represented by a character and 3 digits to describe a big feature within a project.
* **Task_Type** (required): Value representing the nature of the task, and the only possible values are:
  * **Feature**: Public new feature visible for clients or users, for example, building a new screen layout, creating a new API endpoint, etc. 
  * **Feature Internal**: Internal new feature which is not visible for users or clients, for example, creating a new internal business logic, adding documentation to a system, etc.  
  * **Bug**: Bug/Issue/Crash reported.
* **Task_Title** (required): The asana (or another task management tool) title.

Here you can find some examples:
* IOS-4556 :: Feature :: Implement LabOps Screen Layout 
* BACKEND-5566 :: Bug :: Fixed issue with the books API returning wrong values
* FRONTEND-5563 :: Admin :: Bug :: Fixed issue with the books API returning wrong values
* FRONTEND-5561 :: Public :: B301 :: Bug :: Fixed issue with the books API returning wrong values

### Git setup

* Merge strategy configuration
  * Gitlab: [Fast-forward merge](https://docs.gitlab.com/ee/user/project/merge_requests/methods/index.html#fast-forward-merge)
  * Bitbucket: [Squash](https://confluence.atlassian.com/bitbucketserver/pull-request-merge-strategies-844499235.html)
  * Github: [merge strategies](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github)
    * Allow squash merging + setting up default title as the git message
    * Allow rebase merging
* Set by default (if possible), delete remote branch by default when merged.
* Merge / Pull request default template:

```text
--- erase from here

**Merge/Pull request title name template, please delete it before saving it**

Task_number :: Project :: Story :: Task_type :: Task_name

--- erase to here

**Merge / Pull request information:**

* Asana task link: ___
```

## Git methodology

We are not going to define a unique git methodology for all the projects because we consider that depending on the nature of the project Git-Flow could be better than Github-Flow and vice-versa. 

So we are going to use one methodology or another depending on the following statements:
* Projects based on releases will use [Git-Flow](https://nvie.com/posts/a-successful-git-branching-model/)
  * Mobile Applications
  * Embed software
  * Libraries
  * etc.
* Projects based on continuous delivery will use [Github-Flow](https://githubflow.github.io/)
  * Web frontend applications
  * Backend applications
  * etc.
