---
title: "AWS CodePipeline"
date: 2016-08-11
image: ./PGC_Pipeline_Data.jpg
tags: [AWS, codepipeline, git, github]
author: tomfa
status: publish
---

CodePipeline is a specification of how your code runs out to production. What it does is connecting source code with a builder (optional) and a deployment platform. For example, you can set it to trigger a deploy to AWS Beanstalk when a Github repository is updated. And with its 1$ / month, it's practically free to use. However, CodePipeline is currently **only [available in](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/) eu-west (ireland), us-west (oregon) and us-east (n. virginia).** A pipeline consists of:

1.  A **Source **([Github](https://github.com/) or [S3 bucket](https://aws.amazon.com/s3/)). You can make it trigger e.g. when branch master is updated on a certain Github repo, or an S3 bucket path (zip) is changed.
2.  An optional **Build provider **([Jenkins](https://jenkins.io/) or [Solano](https://www.solanolabs.com/)), that can test and build your code.
3.  A **Beta** ([AWS CodeDeploy](https://aws.amazon.com/codedeploy/) or [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)) which accepts your code and deploys it.
4.  A **service worker**, a IAM role which is allowed to perform the necessary deploy to CodeDeploy or Beanstalk.

If you want to set it up, make sure it's [available in your region](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/) and check out [Create a pipeline in AWS CodePipeline](http://docs.aws.amazon.com/codepipeline/latest/userguide/how-to-create-pipelines.html?icmpid=docs_acp_console#how-to-create-pipeline-console).
