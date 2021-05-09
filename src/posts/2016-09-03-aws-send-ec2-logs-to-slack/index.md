---
title: "Send AWS EC2 logs to Slack"
date: 2016-09-03
image: ./slack-large.png
tags: ["guide", CloudWatch, ec2, Lambda, logs, slack]
author: tomfa
status: publish
---

**I have** a Java app that runs on an regular Linux (EC2) instance, and logs to some folder on that machine. What **I want** is for Slack to be notified if any error occurs in the logs. This is possible through CloudWatch in [almost all regions](http://docs.aws.amazon.com/general/latest/gr/rande.html#cwl_region). Let me show you how!

### Part 1: Send logs to CloudWatch

In this first step, we will send application logs from the EC2 instances to CloudWatch.

1.  Create an IAM user that has access to upload to CloudWatch Log. We will use these credentials to upload logs from the EC2 instance to the CloudWatch thing. (Alternatively, you can skip this step if you'd like to use an existing user)
    
    ```
    aws iam create-user --user-name MyLogUser
    ```
    
2.  Attach the policy _AmazonAPIGatewayPushToCloudWatchLogs_ to this user, which allows upload of logs to CloudWatch.
    
    ```
    aws iam attach-user-policy --policy-arn arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs --user-name MyLogUser
    ```
    
3.  On the **EC2 instance** that currently has the logs, install CloudWatch Log Agent
    
    ```
    wget https://s3.amazonaws.com/aws-cloudwatch/downloads/latest/awslogs-agent-setup.py
    ```
    
4.  From the **EC2 instance**, run the interactive setup to configure CloudWatch Log
    
    ```
    sudo python awslogs-agent-setup.py -r eu-central-1 
    ```
    

If you need any guidance during the interactive setup, check out the table at the bottom of the [AWS guide](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/QuickStartEC2Instance.html). **Voilla!** Within a few minutes, your log should appear in AWS Console > CloudWatch > Logs. In the meanwhile, we can do Part 2.

### Part 2: Send CloudWatch Logs to Slack

For part 2, we'll create a Lambda function that receives logs and sends them directly to Slack.

1.  Create an incoming webhook for Slack at https://your-slack-team.slack.com/apps/A0F7XDUAZ-incoming-webhooks. Note down the Webhook URL, and Channel for step 2 and 3.
2.  We'll need a KMS key for the next step.
    *   Create this with:
        
        ```
        aws kms create-key --region eu-central-1
        ```
        
    *   Use the returned _Arn_ from the previous step and encrypt your slack hook url with.:
        
        ```
        aws kms encrypt --key-id "your-KMS-key-arn" --plaintext "hooks.slack.com/services/your-slack-webhook-token"
        ```
        
    *   Note down the _CipherTextBlob_ which is returned, as well as the KMS _Arn_. We'll use these in the next step.
3.  Next, we'll create the Lambda function.
    *   Under blueprint, select _cloudwatch-logs-to-loggy_
    *   Under Configure Triggers:
        *   Under Log Group, select the group you created in step 1
        *   Under Filter name, leave it empty to log everything. Alternatively, you could add "Exception" to log all Exceptions. This can also be changed later.
        *   Enable trigger
    *   Under Configure Function:
        *   Specify your own function name and Description
        *   Use Runtime Node 4.3
        *   Code entry type: Edit code inline and insert [this gist](https://gist.github.com/tomfa/f4e090cbaff0189eba17c0fc301c63db). Replace CHANNEL and ENCRYPTED\_URL variable with the Slack channel and the _CipherTextBlob_ from step 2.
        *   Let handler be index.handler
        *   For Role, select Create Custom Role. A new window will open. In this, show and edit the Policy Document to be like [this](https://gist.github.com/tomfa/88f8a410aa16bba5fc92aff86d668df7). Remember to replace `your KMS key ARN` with the one from step 2.
        *   VPC: no VPC

**Voila! Your EC2 instance should now log to Slack.**

* * *

**Helpful sources:**

*   Opsgenie: [How To Use CloudWatch To Generate Alerts From Logs](https://blog.opsgenie.com/2014/08/how-to-use-cloudwatch-to-generate-alerts-from-logs)
*   Medium: [How To Set Up A Slack Channel To Be An AWS SNS Subscriber](https://medium.com/cohealo-engineering/how-set-up-a-slack-channel-to-be-an-aws-sns-subscriber-63b4d57ad3ea#.dcbqcad2x)
*   AWS: [Store and Monitor OS & Application Log Files with Amazon CloudWatch](https://aws.amazon.com/blogs/aws/cloudwatch-log-service/)
*   AWS: [Quick Start: Install and Configure the CloudWatch Logs Agent on an Existing Amazon EC2 Instance](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/QuickStartEC2Instance.html)
*   AWS: [New – Slack Integration Blueprints for AWS Lambda](https://aws.amazon.com/blogs/aws/new-slack-integration-blueprints-for-aws-lambda/)
