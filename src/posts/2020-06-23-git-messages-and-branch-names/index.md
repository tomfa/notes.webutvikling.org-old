---
title: "Git commits"
date: 2020-06-23
image: ./clickhub.png
tags: [clickup, github]
author: tomfa
status: draft
---

Question of the day:

## Why do I write git messages? 

- It becomes easier to review my PR.

- It'll be easier to understand my code later.

### Why do I not want to write git messages?

> It feels unnecessary. The context and reasoning for this feature has already 
  been stated verbally, but also in Trello/Github issues/Clickup/Jira. 

> It may not impact me or my team short term: The code is being merged without
  anyone reading/caring about the commit messages. 

> Naming is hard. Writing consice, short messages equally so. I do not have
  the mental capacity for good commit messages today.

## When should I do commits?

#### Commit as soon as you've changed *one* meaningful thing.

What's meaningful can be:

- Extract logic to separate methods (without changing behaviour)
- Reformatting code (identing, spacing, line shifts, import ordering)
- Changing text (in 1 view or situation)
- Fixing a bug (could often also be more than 1)
- Adding the DB changes needed for your feature

Do not do 2 things in 1 commit. I.e. if your commit message contains the 
word `and` – you've done it wrong.

#### Commit at a point where the application is working / can run.

If you commit in a state where nothing works, you ruin `bisect` debugging.


## What should my commit contain?

- A short sentence about what it does / what you did.

- Any reference to a ticketing system if you have one (Github Issues, Jira ++)

- If the code is a bit weird, write extra lines about it.
