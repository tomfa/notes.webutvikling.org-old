---
title: "Using FreshDesk API"
date: 2014-10-08
image: 
tags: [API, freshdesk, javascript, node, nodejs, npm]
author: tomfa
status: publish
---

After starting to write this note, I realize Freshdesk have [ridiculously good guides](http://freshdesk.com/api#create_ticket) on this. This page does not serve much purpose except this link, as well as this link to [JavaScript Freshdesk API repo.](https://github.com/capraconsulting/node-freshdesk)

How to use Freshdesk API
------------------------

### 1\. Get your API-key

It's on your [profile settings pane](http://freshdesk.com/api#authentication) (click on your profile picture). The actions done with that API-key, I presume will be done in your name. So depending on your situation, you might want to use a small set of different keys.

### 2\. Find your task in [their doc](http://freshdesk.com/api)

They got examples for everything, either it's [creating a ticket](http://freshdesk.com/api#create_ticket), [updating it](http://freshdesk.com/api#update_ticket_priority) or the same type of operations on a [customer](http://freshdesk.com/api#create_customer).

### 3\. Implement it in your application

See [NodeJS gist](https://gist.github.com/tomfa/3de4ed7de47812dee638).
