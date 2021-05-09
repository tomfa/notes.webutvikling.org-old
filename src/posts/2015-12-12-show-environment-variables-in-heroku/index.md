---
title: "Show environment variables in Heroku"
date: 2015-12-12
image: ./megumi-nachev-8rVSeXEJG1g-unsplash.jpg
tags: ["guide", "heroku"]
author: tomfa
status: publish
---

I was looking for **WEB_CONCURRENCY** environment variable on my Django-app. This is used for the number of concurrent webworkers for gunicorn, and is automatically scaled depending on the memory usage of your app. 

I can do it with the [toolbelt](https://toolbelt.heroku.com/), and the command

```bash
heroku run printenv --app your-app-name | grep WEB_CONCURRENCY
```

For environement variables that are set by us as a setting, the can also be found 
with:

```bash
heroku config --app your-app-name
```

Read more on optimizing your app [here](https://devcenter.heroku.com/articles/optimizing-dyno-usage)

***

*Yes, Cows are obvious environment variables*