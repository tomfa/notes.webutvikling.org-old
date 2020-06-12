---
title: "Show environment variables in Heroku"
date: 2015-12-12
image: 
tags: [env variables, heroku, toolbelt]
author: tomfa
status: publish
---

I was looking for **WEB\_CONCURRENCY** environment variable on my Django-app. This is used for the number of concurrent webworkers for gunicorn, and is automatically scaled depending on the memory usage of your app. Do it with the [toolbelt](https://toolbelt.heroku.com/), and command

```
heroku run printenv --app your-app-name | grep WEB\_CONCURRENCY
```

Read more on optimizing your app [here](https://devcenter.heroku.com/articles/optimizing-dyno-usage)
