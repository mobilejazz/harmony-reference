---
title: Git Standardization
---
This document contains the different standards related to the use of Git within Mobile Jazz.

## Methodology
[Github-Flow](https://githubflow.github.io/) is the methodology that all projects must follow.

## Commit messages
Everybody is free to use their own system in their git branches for commit messages, but we highly recommend using [semantic commit messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716).

## Merge / Pull Requests
* **Must** be created for every feature / bug request associated with their **asana task**. If there is no Asana 
  task created, we must create it and notify the project manager. Finally, Cross-Reference the Task from your Task 
  Manager and the Pull Request from your Repository Manager.
* **Must** be **squashed** using the Merge / Pull request title as the git commit message.
* **Must** be **rebased** into the target branch.
* **Must** use the **title format described** below.
* **Must** enable Delete Branch on Merge (to avoid dead branches).
* (optional) Enable WIP: mode. To avoid an accidental merge or Code Review on undone task.

### Title format
The title format will be composed by different values representing a specific area of the task and the project itself.

**Format**: 
> **{TASK_ID}** :: {PROJECT} :: {STORY} :: **{TASK_TYPE}** :: {PLATFORM} :: **{TASK_TITLE}**

**Fields**:
* **Task_ID** **(required)**: Value representing the platform name and the last 4 digits of the asana task. For example, ANDROID-7888
* **Project**: Value representing the project name when needed. Typically, git repositories only contain one project, but sometimes they have multiple ones, for example, two different web-frontend projects (admin + public).
* **Story**: Value represented by a character and 3 digits to describe a big feature within a project.
* **Task_Type** **(required)**: Value representing the nature of the task, and the only possible values are:
  * **Feature**: Public new feature visible for clients or users, for example, building a new screen layout, creating a new API endpoint, etc. 
  * **Feature Internal**: Internal new feature which is not visible for users or clients, for example, creating a new internal business logic, adding documentation to a system, etc.  
  * **Bug**: Bug/Issue/Crash reported.
* **Platform**: Only to be used if the Task_ID doesn't contain the platform information (e.g: a Jira Identifier) 
* **Task_Title** **(required)**: The asana (or another task management tool) title.

**Examples**:
* IOS-4556 :: Feature :: Implement LabOps Screen Layout 
* BACKEND-5566 :: Bug :: Fixed issue with the books API returning wrong values
* FRONTEND-5563 :: Admin :: Bug :: Fixed issue with the books API returning wrong values
* FRONTEND-5561 :: Public :: B301 :: Bug :: Fixed issue with the books API returning wrong values

### Git setup

* Merge **strategy** configuration
  * Gitlab: [Fast-forward merge](https://docs.gitlab.com/ee/user/project/merge_requests/methods/index.html#fast-forward-merge)
  * Bitbucket: [Squash](https://confluence.atlassian.com/bitbucketserver/pull-request-merge-strategies-844499235.html)
  * Github: [merge strategies](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github)
    * Allow squash merging + setting up default title as the git message
    * Allow rebase merging
* Set by default (if possible), **delete remote branch** by default when merged.
* Merge / Pull request **default template**:

```text
--- erase from here
**Merge/Pull request title name template, please delete it before saving it**

Task_number :: Project :: Story :: Task_type(Feature|Feature Internal|Bug) :: Task_name

+info: https://harmony.mobilejazz.com/docs/best-practices/git-standardization
--- erase to here

* Asana task link: 
**Merge / Pull request information:**

```

### Special case: Long-lived branches
If you have multiple tasks belonging to the same feature you might want to create a long-lived branch to rebase all the changes at once when finished. Here are the steps to follow:
* Create a draft feature branch (this branch does not have a related task).
* Use the draft branch as the base for all the sub-features.
* All the sub-features you must follow the standard rules defined in this document (squash + rebase & naming).
* When all the tasks are completed the draft branch must be rebased into the target branch 
  * **IMPORTANT: be sure to don't squash the commits** in this case as you don't want to lose the history.

**Example**:

1. Create the main feature branch in `feature/XYZ/main` (where XYZ is the name of the feature)
2. Create sub-branches in `feature/XYZ/sub-feature`
3. Sub-branches squash and rebase to `feature/XYZ/main`
4. Finally `feature/XYZ/main` merges to `master`

## Releases

### Mobile
Steps to follow to generate a new application release:
1. Create a new git branch with the following format: `releases/{$APP_VERSION}`
   1. Checkout to the new release branch
   2. Release a new version to the Google Play / AppStore
   3. If the release is successful, we generate the tag: `git tag $APP_VERSION`
   4. Push the tag to the git remote repository
   5. Remove remote release branch: `releases/{$APP_VERSION}`
2. Create a new git branch to generate the bump for the next future release with the format: `feature/bump-$NEXT_APP_VERSION`
   1. Checkout to the new feature branch
   2. Bump the application version name and version number
   3. Generate a PR/MR and assign it to the team to approve
   4. When approved, squash and merge to master.
   5. Remove remote feature branch: `feature/bump-$NEXT_APP_VERSION`

#### Questions

* What happens when an existing version requires a hotfix?

PM and the Engineering Lead must decide if the task is P0 (critical) or not. If it is P0, we must fix it for the current version; otherwise, it can wait until the next release.

If it is P0, we need to follow the following steps:
1. Checkout to the tag: `git checkout $APP_VERSION`
2. Create a branch to contain all the changes needed to release the hotfix release: `git checkout -b hotfix/$APP_VERSION_WITH_HOTFIX`
3. Create one branch for each task needed in the hotfix release 
   1. Follow the same process as a regular MR/MR (squash + rebase) to the hotfix release branch `hotfix/$APP_VERSION_WITH_HOTFIX`
4. When the application is released with the hotfixes, we need to move those fixes to master. The process to do it is the following:
   1. Checkout to master/main `git checkout master`
   2. Create branch `git checkout -b feature/hotfix-$APP_VERSION_WITH_HOTFIX` 
   3. Cherry-pick the commits from the `hotfix/$APP_VERSION_WITH_HOTFIX` branch into the new branch
   4. Generate a PR/MR and assign it to the team to be approved
   5. When approved, **rebase to master** (not squash)
