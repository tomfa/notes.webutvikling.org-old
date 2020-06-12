---
title: "Send AWS CloudWatch Alarms to Slack"
date: 2016-09-03
image: ./slack-large.png
tags: [AWS, CloudWatch, howto, Lambda, SimpleNotificationService, slack, SNS]
author: tomfa
status: publish
---

**I have** a few servers on AWS. Some information on those, e.g. high load, would be nice to be notified of. Preferably on Slack. How do I do that?

### Part 1: Send alarms to an SNS Topic

1.  Using awscli on a local machine, create a new SNS Topic. What's an SNS Topic, you say? Think of a Topic as a bucket where your logs are pushed to, and your notification channels (SMS, Email, Slack++) subscribe to. It's merely a logical grouping of notifications.
    
    ```
    aws sns create-topic 
        --region eu-central-1
        --name my-topic-name 
    ```
    
    Note down the returned TopicArn for part 2.
2.  Then, let's create an Alarm that posts to this Topic when an ELB gets a 500 error.  Either with aws cli:
    
    ```
    aws cloudwatch put-metric-alarm --region eu-central-1 
        --alarm-name "ELB\_500" 
        --alarm-description "Sends 500-errors to Slack" 
        --actions-enabled 
        --alarm-actions "aYour-SNS-returned-from-last-step" 
        --metric-name "HTTPCode\_Backend\_5XX" 
        --namespace AWS/ELB --statistic "Sum" 
        --dimensions "Name=LoadBalancerName,Value=your-elb-name" 
        --period 60 
        --evaluation-periods 60 
        --threshold 1 
        --comparison-operator "GreaterThanOrEqualToThreshold"
    ```
    
    (See [aws-cli](http://docs.aws.amazon.com/cli/latest/reference/cloudwatch/put-metric-alarm.html) for documentation) or create it using the GUI (It's actually pretty straight forward) There's several hundred alarm metrics to choose from, so I'll suggest a few:
    *   **ELB**: HTTP\_Backend\_400, HTTP\_Backend\_500, Latency, HealthyHostCount, UnHealthyHostCount
    *   **EC2**: CPUUtilization
    *   **Logs**: IncomingLogEvents

### Part 2: Send AWS SNS Topic to Slack

Here we will send SNS messages to AWS Lambda,

1.  Create an incoming webhook for Slack at https://your-slack-team.slack.com/apps/A0F7XDUAZ-incoming-webhooks. Note down the Webhook URL, and Channel for step 3.
2.  Next, we'll create a Lambda function which will be a subscriber from this topic, and send them to Slack.
    *   Under blueprint, select cloudwatch-alarm-to-slack
    *   Under trigger, select the SNS-topic you created in the previous step.
    *   Under trigger, check "Enable trigger"
    *   Under function,
        *   Specify your own function name and Description
        *   Use Runtime Node 4.3
        *   Code entry type: Edit code inline and insert [this gist](https://gist.github.com/tomfa/b33f768908b0a83987d26f269e377e95). Replace CHANNEL and PATH variable with the Slack channel and hook url from step 1 (Remove _https://hooks.slack.com/_).
        *   Let handler be index.handler
        *   For Role: If you have the role lambda\_basic\_execution available, select that. If not, create it by selecting Create a custom role. It should automatically suggest a role that has a Policy document which allows the actions "logs:CreateLogGroup", "logs:CreateLogStream", and "logs:PutLogEvents".
        *   VPC: no VPC

You can test that your SNS posts to Slack by publishing to the SNS topic manually:

```
aws sns publish
    --topic-arn "arn:aws:sns:eu-central-1:3...:my-topic-name"
    --message "Test message"
    --region=eu-central-1
```

* * *

**Helpful sources:**

*   Opsgenie: [How To Use CloudWatch To Generate Alerts From Logs](https://blog.opsgenie.com/2014/08/how-to-use-cloudwatch-to-generate-alerts-from-logs)
*   Medium: [How To Set Up A Slack Channel To Be An AWS SNS Subscriber](https://medium.com/cohealo-engineering/how-set-up-a-slack-channel-to-be-an-aws-sns-subscriber-63b4d57ad3ea#.dcbqcad2x)
*   AWS: [Store and Monitor OS & Application Log Files with Amazon CloudWatch](https://aws.amazon.com/blogs/aws/cloudwatch-log-service/)
*   AWS: [Quick Start: Install and Configure the CloudWatch Logs Agent on an Existing Amazon EC2 Instance](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/QuickStartEC2Instance.html)
*   AWS: [New – Slack Integration Blueprints for AWS Lambda](https://aws.amazon.com/blogs/aws/new-slack-integration-blueprints-for-aws-lambda/)
