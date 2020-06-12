---
title: "Custom Slack slash commands (on Heroku)"
date: 2016-10-23
image: ./slash.jpg
tags: [chatops, heroku, hubot, slack, slash command, workshop]
author: tomfa
status: publish
---

Imagine writing "_/info web_" in your Slack and receiving latency, percentage 4xx, 5xx errors from your webserver directly through Slack. Or "_/app web_" to receive current deployed version and last deploy timestamp. Or "/analytics web" to receive most popular URLs or number of visits. Well that's perfectly doable! Here's a [dummy slack slash command server git repo](https://github.com/tomfa/slack-slash-commands) that demonstrates how to use [slash commands](https://api.slack.com/slash-commands) in Slack. It's a part of a [workshop on Slack and Hubot](https://github.com/bekk/chatops-workshop) (Norwegian) me and a few others held at work..
