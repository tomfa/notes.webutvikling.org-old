---
title: "git cheatsheet"
date: 2016-07-29
image: ./git-cheat-sheet.jpg
tags: [alias, bash, cheatsheet, git]
author: tomfa
status: publish
---

git is genious. Hands down brilliant. Every 6 months or so, I come across another command I didn't know I needed before I needed it. And those regular ones I type all the time. So here's a small collection of handy git aliases that saves some typing and/or remembering.

```bash
// remove changes to file or checkout branch
alias gco='git checkout '                                  

// Create commit
alias gc='git commit'                                      

// Show unstaged changes
alias gd='git diff'                            

// Show staged changes
alias gdca='git diff --cached'                          

// Show (followed by commit hash)
alias gs='git show'                            

// Check status
alias gst='git status'                         

// Append staged changes to previous commit
alias 'gca!'='git commit -v --no-edit --amend'

// Append all to previous commit
alias 'gcan!'='git commit -v -a --no-edit --amend'

// Show all files changed (follow by commit hash)
alias gsf='git diff-tree --no-commit-id --name-only -r'

// Assume file unchanged from now on (follow with path)
alias gassume='git update-index --assume-unchanged'

// Stop assuming file is unchanged (follow with path)
alias gnoassume='git update-index --no-assume-unchanged'

// Pull rebase
alias gl='git pull --rebase'

// Show all branches
alias gb='git branch --sort=-committerdate'

// Removes all branches that are merged to master
alias gitcleanbranches='git branch --no-color --merged | egrep -v "(^\*|master|dev)" | xargs git branch -D'
```
