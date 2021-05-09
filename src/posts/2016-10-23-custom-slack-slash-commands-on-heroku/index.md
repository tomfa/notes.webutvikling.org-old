---
title: "Custom Slack slash commands (on Heroku)"
date: 2016-10-23
image: ./slash.jpg
tags: ["guide", chatops, heroku, hubot, slack, slash command, workshop]
author: tomfa
status: publish
---

Imagine begin able to open Slack, and write 
```
/info web
```
And then having a small bot on the other end saying
```
Daily stats:
Traffic         48212  (+10023)
4xx:            11.1%  (+9.8)
5xx             1.1%   (+0.1)
Latency avg     192ms  (+8)
Latency 90p     2012ms (+1209)
```

Or `/app web` to receive current deployed version and last deploy timestamp

Or `/analytics web` to receive most popular URLs. 

Well that's perfectly doable! Here's a [dummy slack slash command server git repo](https://github.com/tomfa/slack-slash-commands) that demonstrates how to use [slash commands](https://api.slack.com/slash-commands) in Slack. 

It's a part of a [workshop on Slack and Hubot](https://github.com/bekk/chatops-workshop) (Norwegian) me and a few others held at work..
