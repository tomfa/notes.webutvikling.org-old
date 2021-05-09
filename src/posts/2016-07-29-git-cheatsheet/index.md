---
title: "git cheatsheet"
date: 2016-07-29
image: ./git-cheat-sheet.jpg
tags: ["guide", efficiency, alias, bash, cheatsheet, git]
author: tomfa
status: publish
---

git is genious. Hands down brilliant. Every 6 months or so, I come across another command I didn't know I needed before I needed it. And those regular ones I type all the time. So here's a collection of handy git aliases that saves some typing and/or remembering. 

_Learning one or two at a time is a good idea._

```bash
// Create commit
alias gc='git commit'                                      

// Show unstaged changes
alias gd='git diff'    

// Show staged changes
alias gdca='git diff --cached'     

// Check status
alias gst='git status'     

// remove changes to file or checkout branch (followed by sha/path/branchname)
alias gco='git checkout '                                  

// create and checkout new branch (followed by name)
alias gcob='git checkout -b '                                  

// checkout master
alias gcom='git checkout master'                     

// Rebase on master
alias grbm='git rebase master'

// Stash changes
alias gsta='git stash'

// Pop stased changes
alias gstp='git stash pop'

// Pull rebase
alias gl='git pull --rebase'

// Show all branches
alias gb='git branch --sort=-committerdate'

// Push up a new branch
alias ggpush='git push --set-upstream origin $(git symbolic-ref --short HEAD)'

// Show (followed by commit hash)
alias gs='git show'          

// Append staged changes to previous commit
alias 'gca!'='git commit -v --no-edit --amend'

// Append all to previous commit
alias 'gcan!'='git commit -v -a --no-edit --amend'

// Rebase interactively (followed by sha)
alias grbi='git rebase --interactive'

// Removes all branches that are merged to master
alias gitcleanbranches='git branch --no-color --merged | egrep -v "(^\*|master|dev)" | xargs git branch -D'
```

### Uncommon

These are nice to have saved for those few time when you'll need them.

```
// Show all files changed (follow by commit hash)
alias gsf='git diff-tree --no-commit-id --name-only -r'

// Assume file unchanged from now on (follow with path)
alias gassume='git update-index --assume-unchanged'

// Stop assuming file is unchanged (follow with path)
alias gnoassume='git update-index --no-assume-unchanged'
```
