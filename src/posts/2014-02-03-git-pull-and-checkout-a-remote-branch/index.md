---
title: "git: Pull and checkout a remote branch"
date: 2014-02-03
image: 
tags: [git]
author: tomfa
status: publish
---

Say you have a branch on github, and you want pull it down onto your own machine? ok `git checkout -b branch_name origin/branch_name` It works fine just checking out a new branch with a matching name, given you have the appropriate (default) matching setting, and you have pulled since the branch was created on origin.

```
git pull
git checkout -b branch\_name
```
