---
title: "AWS Elastic Beanstalk"
date: 2016-09-06
image: ./beans-flatulence_5.jpg
tags: ["learning", AWS, beanstalk, opsworks]
author: tomfa
status: publish
---

> By using Elastic Beanstalk, developers can focus on developing their application and are freed from deployment-oriented tasks, such as provisioning servers, setting up load balancing, or managing scaling. – [AWS](https://aws.amazon.com/elasticbeanstalk/faqs/). 

Here's a few general notes on what AWS Elastic Beanstalk (or just Beanstalk) is, pricing etc.

*   Beanstalk is PaaS (Platform as a service) as opposed to EC2 instances which are IaaS (Infrastructure as a service). This means you don't need to know (much) about infrastructure, and if you do: it means less work.

*   Beanstalk does not cost anything in itself. You only pay for the resources you use.

*   With Beanstalk, you get (easier) access to deploying, through the awsebcli: `eb deploy` or via AWS Code Deploy, as opposed to when you set up ELB and EC2 instances yourself.

*   Beanstalk is a support service around your app that "takes care" of the underlying infrastructure. You provide the app, optionally specifies a VPC, sets which EC2 instance types to use, when to scale up or down, when to trigger an alarm, specify a CNAME domain (at aws) to use, and Beanstalk takes care of creating those resources and connecting the components. I.e. Beanstalk autosets up stuff you'd otherwise set up yourself.
    *   Will create EC2 instances
    *   Will create ELB (optional)
    *   Will create Route53 DNS
    *   Will create Roles
    *   Will create RDS (optional)
    *   Will create SNS and S3 for logging and alarms.
*   Beanstalk supports the following application types (updated list [here](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts.platforms.html)):
    *   Go
    *   Java with Tomcat
    *   Java SE
    *   .NET on Windows Server with IIS
    *   Node.js
    *   PHP
    *   Python
    *   Ruby (Passenger Standalone)
    *   Ruby (Puma)
    *   Single Container Docker
    *   Multicontainer Docker
    *   Preconfigured Docker (Glassfish)
    *   Preconfigured Docker (Python 3.x)
    *   Preconfigured Docker (Go)

FAQ
---

*   **Q: When would I not want to use Elastic Beanstalk?**

    *   If you have multiple services that you want to run on the same server. Elastic Beanstalk wraps around **one** application, with **one** endpoint. You don't get to run cron bash jobs and setting up mini-services on the same instance as your Beanstalk app (to my knowledge). EDIT: I think this is a misunderstanding on my part.

    *   If you need greater control of configuration, you could look at [OpsWorks](https://aws.amazon.com/opsworks/) instead, which uses [Chef](https://www.chef.io/chef/) as a configuration management tool. This allows you to have more control over software packages, updates, database setups, software configuration etc.
