---
title: "How to add hubot to slack"
date: 2016-05-25
image: ./hubot.png
tags: ["guide", heroku, hubot, slack]
author: tomfa
status: publish
---

Simple notes on how to install hubot and add it to Slack Requires git, npm, heroku toolbelt and having added hubot-integration to slack through slack.com

```
npm install -g yo generator-hubot
mkdir mybot
yo hubot --adapter=slack
heroku login
git init .
rm hubot-scripts.json
git add .
gc -m "Initial commit"
npm install slack-client --save
gc -m "Add slack adapter"
heroku create your-heroku-app-name
heroku addons:create rediscloud:30
heroku config:add HEROKU\_URL=https://your-heroku-app-name.herokuapp.com
heroku config:add HUBOT\_SLACK\_TOKEN=your-token-from-slack-integration
git push heroku master
```

* * *

*   [Hubot docs](https://hubot.github.com/docs/)
