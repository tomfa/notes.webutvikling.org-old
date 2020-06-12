---
title: "git: Replace master branch"
date: 2014-02-03
image: 
tags: [git]
author: tomfa
status: publish
---

So, you have a branch BESTBRANCH and you have basically made it your master branch? (Bad!) If you want to get back on track, and make BESTBRANCH the master, do this `git checkout BESTBRANCH git merge -s ours master git checkout master git merge BESTBRANCH` http://stackoverflow.com/questions/2862590/how-to-replace-master-branch-in-git-entirely-from-another-branch
