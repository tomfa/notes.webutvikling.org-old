---
title: "Elastic Beanstalk with Terraform"
date: 2016-10-16
image: ./benstlk.jpg
tags: [AWS, beanstalk, roles, subnet, terraform, VPC configuration]
author: tomfa
status: publish
---

If you haven't already, try to add the Beanstalk application in your environment using only the eb command (see [own post](http://notes.webutvikling.org/elastic-beanstalk-in-a-vpc/)). What we do there, is making sure you have the correct setup for vpc and subnets. 

Once you've made sure that is OK, you can come here and try creating the application using terraform. That has some of its own challenges, which I'm addressing here.

* * *

_Edit: This was originally a post about issues appearing when creating Beanstalk apps with Terraform. I've since added some terraform modules, which you can use to make beanstalk applications with the following commands:_

*   **VPC HTTP Single Beanstalk app**
    
    ```
    terraform apply github.com/tomfa/terraform-sandbox/beanstalk-single
    ```
    
*   **VPC HTTP Loadbalanced Beanstalk app**
    
    ```
    terraform apply github.com/tomfa/terraform-sandbox/beanstalk
    ```
    
*   **VPC HTTPS Loadbalanced Beanstalk app with ACM Certificate**
    
    ```
    terraform apply github.com/tomfa/terraform-sandbox/beanstalk_ssl_certificate
    ```
    
*   **VPC HTTP Loadbalanced Beanstalk app with Database**
    
    ```
    terraform apply github.com/tomfa/terraform-sandbox/beanstalk_database
    ```
    
    * * *
    

### The EC2 instances failed to communicate with AWS Elastic Beanstalk, either because of configuration problems with the VPC or a failed EC2 instance. Check your VPC configuration and try launching the environment again

Yes, I am encountering this here as well.

 **Q: Is it something wrong with subnets or VPC config?** 
 
 A: No. I'm 100% sure there is nothing wrong with subnets, public IPs or routing tables (ref [Beanstalk - In a VPC](http://notes.webutvikling.org/elastic-beanstalk-in-a-vpc/)).
 
 **Q: Is there something wrong with the security groups?** 
 
 Nope. Security groups are added by default by Beanstalk. Even though I add some of my own in addition, a security groups can never deny anything (only allow, ref [Security groups for your VPC](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_SecurityGroups.html#VPCSecurityGroups)). Hence why whatever I add should not cause this issue. 
 
 **Q: Is it roles or users then?** 
 
 Jackpot! Beanstalk uses/creates 2 roles:

1.  It uses a **Instance Profile** in the launch configuration for the EC2 instances. This needs the following policies ([gist for more info and full policy](https://gist.github.com/tomfa/fbc6455623defedb254b6c2252ba1721)):
    ```
    arn:aws:iam::aws:policy/AWSElasticBeanstalkWorkerTier
    arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier
    arn:aws:iam::aws:policy/AWSElasticBeanstalkMulticontainerDocker
    ```

2.   It uses a **service role **in order to orchester your App and its infrastructure, with the following policies ([gist for more info and full policy](https://gist.github.com/tomfa/4fcba6524a8fc0aa265d09bbd59ca623)):
    ```
    arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkEnhancedHealth
    arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkService
    ```

These roles are added by default when creating a Beanstalk environment through the cli. However, you'll have to specify them yourself when creating the environment using Terraform. 

[Gist for specifying roles via Terraform](https://gist.github.com/tomfa/6fc429af5d598a85e723b3f56f681237) Add the instance profiles, roles and policies in the gist above, and things should be good to go! 

**Q: OK, now it works according to Terraform, but when I go to the loadbalancer URL, I get 502 nginx stuff.** Then you either 1) sat the env variable PORT to something. Nginx uses this to look for your application (default 5000), or 2) Didn't touch this, but run your own application on a port different from 5000. 

**Q: Gee thanks. Now everything looks to be working normal, but Beanstalk is saying** 

> Auto Scaling Group awseb-e-asdasdas-stack-AWSEBAutoScalingGroup-ASDASDSADD is currently running under desired capacity - expected: 1, actual: 0. If this problem persists, try rebuilding your environment. 

I have no idea. I Googled it, and it seemed like other were having the issues that it sometimes Beanstalk reported this failure during a deploy, and that it took a long time before status turned OK. [Turning on enhanced health monitoring](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced-enable.html?icmpid=docs_elasticbeanstalk_console) helped make this time shorter.
