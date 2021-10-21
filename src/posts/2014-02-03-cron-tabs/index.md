---
title: 'Cron tabs: create and delete'
date: 2014-02-03
image: ./lukas-blazek-UAvYasdkzq8-unsplash.jpg
tags: [guide, bash, cron, scheduling]
author: tomfa
status: publish
---

**Cron jobs run as root can be created with **

```bash
sudo crontab -e
```

**Cron jobs run as logged in user can be created with **

```bash
crontab -e
```

**Existing cron jobs can be viewed by writing **

```bash
sudo crontab -u username -l
```

**Deleting all cron jobs on a user can be done by typing **

```bash
sudo crontab -u username -r
```

http://askubuntu.com/questions/2368/how-do-i-set-up-a-cron-job
