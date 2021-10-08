---
title: Tips and Tricks for Git
sidebar_label: Git
---

## Git Submodules

```bash
// 1. Add submodule to a new repo
git submodule add https://github.com/chaconinc/DbConnector

// 2. Updating repo with new submodule
git pull
git submodule update --init --recursive

// 2. Or Cloning repo with new submodule
git clone --recurse-submodules https://github.com/chaconinc/MainProject

// 3. Pulling repo with submodules
git pull --recurse-submodules
```

by [git](https://git-scm.com/book/en/v2/Git-Tools-Submodules)

## Delete branch locally and remotely

```bash
// 1. locally
git branch -d localBranchName

// 2. remote
git push origin :remoteBranchName
```

by [FreeCodeCamp](https://forum.freecodecamp.org/t/how-to-delete-a-git-branch-both-locally-and-remotely/13211)

## Apply .gitignore to committed files

```bash
// Edit your .gitignore with the file to ignore and run
git rm --cached /path/to/file
```

by [SO](https://stackoverflow.com/questions/7527982/applying-gitignore-to-committed-files)

## Git ignore file mode (chmod) changes

```bash
// Only current repo
git config core.fileMode false

// General
git config --global core.fileMode false
```

by [SO](https://stackoverflow.com/questions/1580596/how-do-i-make-git-ignore-file-mode-chmod-changes)

## Merge two repos together preserving Git history

An example of how to merge two repos (one with backend code and other with frontend code) to only one.

1. (optional) Move the content of both repos to an internal folder (ex. /frontend and /backend). This will make this process easier.
1. Create and clone new repo: `git clone ...`
1. `git remote add -f backend urlToBackendRepo`
1. `git fetch --all`
1. `git merge backend/master --allow-unrelated-histories`
1. (optional) In case the first step was skipped, move the content to `backend`:
    1. `mkdir backend`
    1. `for file in $(ls | grep -v 'backend'); do git mv $file backend; done;`
    1. Double check hidden files and move it to `backend` folder (eg. `.gitignore`, `.idea/`)
    1. `git commit -m "move backend to subfolder"`
1. `git remote add -f frontend urlToFrontendRepo`
1. `git fetch --all`
1. `git merge frontend/master --allow-unrelated-histories`
1. (optional) In case the first step was skipped, move the content to `frontend`:
    1. `mkdir frontend`
    1. `for file in $(ls | grep -v 'backend' | grep -v 'frontend'); do git mv $file frontend; done;`
    1. `git commit -m "move frontend to subfolder"`
1. `git push`

by [saintgimp.org](https://saintgimp.org/2013/01/22/merging-two-git-repositories-into-one-repository-without-losing-file-history/)

## Mirror one existing Repo into a brand new Repo

An example of how to mirror an existing repository to a new repo. The destination repository must be empty.

1. `git clone --mirror git@test.com:user/source.git temp-folder`
2. Open the folder `cd temp-folder`
3. Add new origin: `git remote add new-origin git@test.com:user/destination.git`
4. Push repo to destination: `git push new-origin --mirror`
5. Navigate back: `cd ..`
6. Remove cloned repo after mirroring it: `rm -rf temp-folder`

by [Joan Martin](https://gist.github.com/vilanovi/4eb733a4e121ad681367381c7e194229).
