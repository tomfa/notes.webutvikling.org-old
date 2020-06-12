---
title: "Cron tabs: create and delete"
date: 2014-02-03
image: 
tags: [bash, cron, scheduling]
author: tomfa
status: publish
---

*   Cron jobs run as root can be created with `sudo crontab -e`
*   Cron jobs run as logged in user can be created with `crontab -e`
*   Existing cron jobs can be viewed by writing `sudo crontab -u username -l`
*   Deleting all cron jobs on a user can be done by typing `sudo crontab -u username -r`

http://askubuntu.com/questions/2368/how-do-i-set-up-a-cron-job
