---
title: "Django with AWS s3 media files (on Heroku)"
date: 2016-09-20
image: 
tags: [AWS, developer tools, django, pip, python, S3, virtualenv]
author: tomfa
status: draft
---

Uploaded media files in Django are vanished once a new heroku spins up, so you'll have some other form of media storage than you might be used to. AWS S3 Buckets is the thing, then. And since you're anyway going to create buckets for uploaded media files, you might as well do the same for the static files, since it can handle bigger things than your heroku apache/node/nginx etc. **EDIT: **Or so I thought would be a good idea. Might still be a good idea, but it's troublesome if you have many static-files.

How to create a python + heroku app using AWS S3 for media storage.
-------------------------------------------------------------------

(Just so it's clear what we're trying to achieve here)

### Part 1. AWS stuff

**1.1 Create a user for your Heroku-app that should reach the bucket.** **1.2. Create a policy that has write access to the bucket** **1.3** Create a bucket for your files****

### Part 2. Configure your Heroku environment

We don't want to hardcode our keys into our repo, so we use the app config variables in Heroku.   **Add Environment Variabels**

```
AWS\_ACCESS\_ID: <YOUR\_ACCESSKEY>
AWS\_SECRET\_KEY: <YOUR\_SECRETKEY>
S3\_BUCKET: <YOUR\_BUCKETNAME>

SECRET\_KEY: <RANDOM-KEY-STUFF>
```

### Part 3. Change your Django settings

**3.1 Install dependencies** **3.2 Add aws-variables**
