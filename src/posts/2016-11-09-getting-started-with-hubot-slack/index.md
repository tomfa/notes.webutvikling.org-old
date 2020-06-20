---
title: "Getting started with Hubot + Slack"
date: 2016-11-09
image: ./bot.png
tags: [es2015, es6, example, hubot, slack, slash]
author: tomfa
status: publish
---

If [Custom Slash commands](http://notes.webutvikling.org/custom-slack-slash-commands-on-heroku/) weren't enough for you, or if you are trapped behind a firewall without the option to make public endpoints, bots are a great way to make custom integrations with Slack. Anything you can program is doable to integrate with Slack, let me show you and get you started. Key points about Slack bots:

*   **You can run the bot anywhere you'd like. No public endpoint is required.** The bot integrates with Slack using a websocket. This also means communication needs to be initiated at the location of the bot. Slack cannot "wake" your bot up if it goes down. This is worth keeping in mind if you're deploying at Heroku with a free node (which will put your app in sleep mode at somepoint). You should then make a [slash command](http://notes.webutvikling.org/custom-slack-slash-commands-on-heroku/) that pokes your server to make it wake back up.

*   **Anything you can do as a user, the bot can.** A bot can be invited into different channels, and also removed. It can give emoticon-responses to other people saying stuff. You can send private messages to it, and receive them.

*   **A bot can ask permission to listen to events happening** People joining channels. Channels being created or archived. Someone setting the topic of a channel. The bot can catch [everything that's happening](https://api.slack.com/events/api), given that it has asked and been given the permission to do so.

So how can I help you get started? With a git repo containing a Hubot bot:

*   [https://github.com/tomfa/botanist](https://github.com/tomfa/botanist)

It’s a part of a [workshop on Slack and Hubot](https://github.com/bekk/chatops-workshop) (Norwegian) me and a few others held at work.
