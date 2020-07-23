---
title: Git
---
Tips and Tricks for Git

### Git Submodules

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

### Delete branch locally and remotely

```bash
// 1. locally
git branch -d localBranchName

// 2. remote
git push origin :remoteBranchName
```

by [FreeCodeCamp](https://forum.freecodecamp.org/t/how-to-delete-a-git-branch-both-locally-and-remotely/13211)

### Apply .gitignore to committed files

```bash
// Edit your .gitignore with the file to ignore and run
git rm --cached /path/to/file
```

by [SO](https://stackoverflow.com/questions/7527982/applying-gitignore-to-committed-files)

### Git ignore file mode (chmod) changes

```bash
// Only current repo
git config core.fileMode false

// General
git config --global core.fileMode false
```

by [SO](https://stackoverflow.com/questions/1580596/how-do-i-make-git-ignore-file-mode-chmod-changes)
