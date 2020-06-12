---
title: "Facebook: Invite all friends to event"
date: 2014-02-05
image: 
tags: [developer tools, facebook]
author: tomfa
status: publish
---

So you have created an event, and wish to invite all your friends (or all friends in a circle), but don't want to manually click all of them?

1.  Open the event in Chrome
2.  Click invite Friends and select the group (or let it stay in search for all)
3.  Scroll down to the end of the list, so Facebook loads all friends
4.  Open Chrome Developer (right click and select Inspect Element)
5.  Click the Console tab
6.  Click and change "Page Context" to an Extension
7.  Verify that it uses jQuery by typing `$('body')`. This should **not** give an error
8.  In the console, type `$('.checkbox').click()`
