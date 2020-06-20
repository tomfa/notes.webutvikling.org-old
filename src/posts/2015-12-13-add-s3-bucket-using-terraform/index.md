---
title: "Add S3 bucket using Terraform (example)"
date: 2015-12-13
image: ./elena-mozhvilo-eA32JIBsSu8-unsplash.jpg
tags: [AWS, bucket, heroku, iam, S3, terraform]
author: tomfa
status: publish
---

_Edit: I was going to make the s3 bucket with cloudfront, but Terraform has no native support for it, though it [looks like it's coming soon](https://github.com/hashicorp/terraform/pull/3330). I'll probably make a followup later._ _Edit 2: I made a followup on how to do it with [Cloudfront](http://notes.webutvikling.org/s3-bucket-cloudfront-using-terraform/)_ A concrete, developer friendly guide on how to create a proper **s3** bucket with terraform. If manual GUI guides are more you thing, go to [Amazon docs](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html). This is made in contrast to the [aws-cli guide](http://notes.webutvikling.org/add-s3-bucket-using-awscli-example/), which accomplishes the same thing, but using a different tool

### Setup AWS + terraform

1.  You [sign up](http://aws.amazon.com/s3/) with Amazon if you haven't already.
2.  Create a secret key / access key pair from [here](https://console.aws.amazon.com/iam/home?#security_credential).
3.  [Download](https://terraform.io/downloads.html) Terraform, and extract the files to e.g.
    ```
    ~/bin/terraform/
    ```
        
4.  Add the path to your path by adding this line to `~/.bash_profile`
    ```bash
    export PATH=$PATH:~/bin/terraform
    ```
        

Alright, that should be it. You can confirm that terraform is setup by typing `terraform` in the terminal. It should respond something that seems sensible.

### Write the config for your bucket

So [terraform](https://terraform.io/) is a tool that lets you be awesome without touching the Amazon GUI. You setup a config file, and run it with terraform, which lets you be awesome without spending much energy. (It does also much more, but that could be its own series of posts) **So what do I want?**

*   Just a S3 bucket please

```
terraform apply github.com/tomfa/terraform-sandbox/s3-webfiles-bucket
```

**That's it! Shazam! You got a bucket up!** Uh, alright, but what if I want:

*   Two S3 buckets, one for prod, and one for test
*   Two new IAM users, one for each bucket, with write access

```
terraform apply github.com/tomfa/terraform-sandbox/s3-double-webfiles-bucket
```

Manual version
--------------

The terraform command above is sufficient to do everything we want. But for the sake of article length, let's say I hadn't helped you out with the config files, and you had to configure it all by yourself:

1.  Create your _s3.tf_ file:
    ```yaml
    # This configures aws – required in all terraform files
    provider "aws" {
        access_key = "YOUR_ACCESS_KEY"
        secret_key = "YOUR_SECRET_KEY"
         # e.g. eu-west-1
        region = "YOUR_REGION" 
    }
    
    # Defines a user that should be able to write to you test bucket
    resource "aws_iam_user" "test_user" {
        name = "YOUR_TEST_BUCKET_USER"
    }
    
    resource "aws_iam_access_key" "test_user" {
        user = "${aws_iam_user.test_user.name}"
    }
    
    resource "aws_iam_user_policy" "test_user_ro" {
        name = "test"
        user = "${aws_iam_user.test_user.name}"
        policy= <<EOF
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "s3:*",
                "Resource": [
                    "arn:aws:s3:::YOUR_TEST_BUCKET_NAME",
                    "arn:aws:s3:::YOUR_TEST_BUCKET_NAME*"
                ]
            }
        ]
    }
    EOF
    }
    
    resource "aws_iam_user" "prod_user" {
        name = "YOUR_PROD_BUCKET_USER"
    }
    
    resource "aws_iam_access_key" "prod_user" {
        user = "${aws_iam_user.prod_user.name}"
    }
    
    resource "aws_iam_user_policy" "prod_user_ro" {
        name = "prod"
        user = "${aws_iam_user.prod_user.name}"
        policy= <<EOF
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "s3:*",
                "Resource": [
                    "arn:aws:s3:::YOUR_PROD_BUCKET_NAME",
                    "arn:aws:s3:::YOUR_PROD_BUCKET_NAME*"
                ]
            }
        ]
    }
    EOF
    }
    
    resource "aws_s3_bucket" "prod_bucket" {
        bucket = "YOUR_PROD_BUCKET_NAME"
        acl = "public-read"
    
        cors_rule {
            allowed_headers = ["*"]
            allowed_methods = ["PUT","POST"]
            allowed_origins = ["*"]
            expose_headers = ["ETag"]
            max_age_seconds = 3000
        }
    
        policy = <<EOF
    {
        "Version": "2008-10-17",
        "Statement": [
            {
                "Sid": "PublicReadForGetBucketObjects",
                "Effect": "Allow",
                "Principal": {
                    "AWS": "*"
                },
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::YOUR_PROD_BUCKET_NAME*"
            },
            {
                "Sid": "",
                "Effect": "Allow",
                "Principal": {
                    "AWS": "${aws_iam_user.prod_user.arn}"
                },
                "Action": "s3:*",
                "Resource": [
                    "arn:aws:s3:::YOUR_PROD_BUCKET_NAME",
                    "arn:aws:s3:::YOUR_PROD_BUCKET_NAME*"
                ]
            }
        ]
    }
    EOF
    }
    
    resource "aws_s3_bucket" "test_bucket" {
        bucket = "YOUR_TEST_BUCKET_NAME"
        acl = "public-read"
    
        cors_rule {
            allowed_headers = ["*"]
            allowed_methods = ["PUT","POST"]
            allowed_origins = ["*"]
            expose_headers = ["ETag"]
            max_age_seconds = 3000
        }
    
        policy = <<EOF
    {
        "Version": "2008-10-17",
        "Statement": [
            {
                "Sid": "PublicReadForGetTestBucketObjects",
                "Effect": "Allow",
                "Principal": {
                    "AWS": "*"
                },
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::YOUR_TEST_BUCKET_NAME*"
            },
            {
                "Sid": "",
                "Effect": "Allow",
                "Principal": {
                    "AWS": "${aws_iam_user.test_user.arn}"
                },
                "Action": "s3:*",
                "Resource": [
                    "arn:aws:s3:::YOUR_TEST_BUCKET_NAME",
                    "arn:aws:s3:::YOUR_TEST_BUCKET_NAME*"
                ]
            }
        ]
    }
    EOF
    }
    
    
    ```
        
2.  Run it
    ```
    terraform apply
    ```
        

### Profit

Alright, you say, but the config file is quite ugly. So, can we extract the variables out of the mess? Yeah, sure. Replace all the red text above with **${var.test_bucket_name} **instead of YOUR_TEST_BUCKET_NAME etc. Then create a **variables.tf, **containing

```yaml
variable "aws_region" {}

variable "aws_access_key" {}
variable "aws_secret_key" {}

variable "prod_bucket_name" {}
variable "test_bucket_name" {}
```

You will then be prompted for the variables instead of having to change them in s3.tf. You can also configure the answers to these, by adding the following to **terraform.tfvars**

```yaml
aws_region = "my-aws_region-value"

aws_access_key = "my-aws_access_key-value"
aws_secret_key = "my-aws_secret_key-value"

prod_bucket_name = "my-prod_bucket_name-value"
test_bucket_name = "my-test_bucket_name-value"
```
