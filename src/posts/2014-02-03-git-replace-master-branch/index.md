---
title: 'git: Replace master branch'
date: 2014-02-03
image: ./simon-berger-Qa2tSHWgh84-unsplash.jpg
imageAlt: Image by Simon Berger on Unsplash
tags: [guide, git]
author: tomfa
status: publish
---

So, you have a git branch named **BESTBRANCH** and you have basically made it your master branch?

If you want to get back on track, and make master be identical to BESTBRANCH, do this :

```bash
# Go to BESTBRANCH
git checkout BESTBRANCH

# Take master things into BESTBRANCH,
# but let BESTBRANCH "win" over master
git merge -s ours master

# Take bestbranch into master
git checkout master
git merge BESTBRANCH
```

Voilla! Now master is best.

http://stackoverflow.com/questions/2862590/how-to-replace-master-branch-in-git-entirely-from-another-branch
