---
title: "Pull request mountain code"
date: 2020-05-18
image: ./tobias-cornille-4QWR5geRC9I-unsplash.jpg
tags: ["statement", "guide", "github", pull-request]
author: tomfa
status: publish
---

A few rules of thumb for Github Pull requests.

Use Draft until the PR is ready
-------------------------------

**If I'm planning to change any meaningful part of the pull request, I'd create a Draft PR first.** As a reviewer, it can be quite discouraging to review code that is later refactored or otherwise makes me have to review again.

Add tests that demonstrates the change
--------------------------------------

**If I've added a feature, or changed an important part of the code, I'd write tests for it.** Tests make it easier for my reviewer to quickly see how the feature is supposed to work.

Got UI changes? Add screenshots
-------------------------------

**When I change UI, add before and after screenshots.** The reviewer will get an immediate overview of my PR, and be able to review it with a context in mind. Additional bonus: the PR serves as historic documentation for the change in GitHub.

Keep PRs short
--------------

**Try to keep the PRs as short as possible: Make two small PRs rather than one big.** Pull requests that span more than a thousand lines can be discouraging to review, as they will take up a larger chunk of my reviewers time. Bonus: it can help me keep lean when making new things.

Get reviewed by a non-expert developer
--------------------------------------

**Try to get a review from someone on my team that doesn’t know the related code very well.** Likewise, if I see a pull request that is touching code I don’t know, I'd review it together with the author! It is arguably more important that code is understandable for new developers, rather than existing experts. It is also a great opportunity to learn something new, and reduce the dependency on “expert” developers.

Regularly look at PRs
---------------------

**Try making it a habit to look at open PRs once a day. E.g. after lunch or first thing in the morning.** Pull requests that is open for days on end, is value being postponed. Working on multiple things may reduce my efficiency and add weight to my mental backlog. After lunch, consider reviewing code I don’t feel comfortable with, possibly with assistance from the author. I could also get my own PR reviewed and merged.
