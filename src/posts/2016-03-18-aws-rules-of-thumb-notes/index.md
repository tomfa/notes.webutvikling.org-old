---
title: "AWS rules of thumb notes"
date: 2016-03-18
image: 
tags: []
author: tomfa
status: publish
---

*   Load balancer + auto scaling EC2 instances in different Availability Zones is pretty fucking awesome. It allows you to auto scale = pay for what you need. It gives you uptime even if a whole availability zone goes offline. You can have SSL-termination in the Load Balancer. It's nice. Use it.
*   A set of servers in a private subnet needs a NAT server to access the internet.
*   Bastion (or jump-) servers are servers that are exposed to the public. Such as DNS-servers. These should provide few services and otherwise be hardened and for safety sake. When jumping between servers, you can bring your ssh-keys by adding -A on your ssh command.
*   RDS and S3 (also Load Balancer) lies outside a Virtual Private Cloud (VPC). It's a "fixed" service from AWS, not "one of your servers". However, RDS is placed in a specific subnet. If you want redundancy on this, you can specify multi-az.
*   Don't use the console to set up your AWS services. They are not easy to use, hard to remember, difficult to document etc etc. Use aws cli, a provisioning framework, terraform or something else that allows you to document and code your infrastructure.
*   Using Cloudfront on top of S3 bucket for web static files minimizes your latency by quite alot. Totally worth it. It can also be used to host your entire webpackified  frontend (or in other ways compressed to just static files).
*   Cloudwatch with notifications are cool. You can create an alarm for CPU load, disk load ++++++.
