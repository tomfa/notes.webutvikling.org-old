---
title: "Monitor-driven development"
date: 2015-11-04
image: 
tags: [developer tools, devops, montoring]
author: tomfa
status: publish
---

Monitor-driven or Metric-driven development (MDD). It's becoming more and more relevant parallell with continuous delivery, devops etc, and I think it's super awesome. **Stop finding bugs.** Instead, log properly, and monitor where and in what situations error logs are being created. Has there been a sudden increase in a certain type of errors? Get told! **Stop checking if things work. **If it doesn't, you should instead be told. If a page or server is down, don't wait for a user to tell you. Instead, have a services that checks what's up, and tell you automatically when something isn't. **Code for logging. **You start out with logging in mind = logging and metrics can be super useful. It's not easy to "smack a log on it" in heinsight and have everything be alright. **Stop finding out where to put your effort. **Effort should be placed more where people are, and where people bounce. And less where you want effort to be put. Use Google Analytics, and find out what people like best with A/B-testing. Your opinion isn't shared with everyone else nearly as often as you think and hope. Trust the metrics. **Neat tools **include [statuscake](https://www.statuscake.com/paid-website-monitoring/), [Google Analytics](http://www.google.com/analytics/), [LogStash](https://www.elastic.co/products/logstash), [Kibana](https://www.elastic.co/products/kibana), [Watch](https://www.elastic.co/products/watcher), [Google Page speed](https://developers.google.com/speed/?hl=en) and then have them all (or some) integrated in [Slack](https://slack.com/).
