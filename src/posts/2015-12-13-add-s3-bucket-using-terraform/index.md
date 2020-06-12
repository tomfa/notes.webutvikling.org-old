---
title: "Add S3 bucket using Terraform (example)"
date: 2015-12-13
image: 
tags: [AWS, bucket, heroku, iam, S3, terraform]
author: tomfa
status: publish
---

_Edit: I was going to make the s3 bucket with cloudfront, but Terraform has no native support for it, though it [looks like it's coming soon](https://github.com/hashicorp/terraform/pull/3330). I'll probably make a followup later._ _Edit 2: I made a followup on how to do it with [Cloudfront](http://notes.webutvikling.org/s3-bucket-cloudfront-using-terraform/)_ A concrete, developer friendly guide on how to create a proper **s3** bucket with terraform. If manual GUI guides are more you thing, go to [Amazon docs](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html). This is made in contrast to the [aws-cli guide](http://notes.webutvikling.org/add-s3-bucket-using-awscli-example/), which accomplishes the same thing, but using a different tool

### Setup AWS + terraform

1.  You [sign up](http://aws.amazon.com/s3/) with Amazon if you haven't already.
2.  Create a secret key / access key pair from [here](https://console.aws.amazon.com/iam/home?#security_credential).
3.  [Download](https://terraform.io/downloads.html) Terraform, and extract the files to e.g.
    1.  ```
        ~/bin/terraform/&lt;files&gt;
        ```
        
4.  Add the path to your path by adding this line to _~/.bash\_profile_
    1.  ```
        export PATH=$PATH:~/bin/terraform
        ```
        

Alright, that should be it. You can confirm that terraform is setup by typing _terraform _in the terminal. It should respond something that seems sensible.

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
    1.  ```
        \# This configures aws – required in all terraform files
        provider "aws" {
            access\_key = "YOUR\_ACCESS\_KEY"
            secret\_key = "YOUR\_SECRET\_KEY"
            region = "YOUR\_REGION"  # e.g. eu-west-1
        }
        
        # Defines a user that should be able to write to you test bucket
        resource "aws\_iam\_user" "test\_user" {
            name = "YOUR\_TEST\_BUCKET\_USER"
        }
        
        resource "aws\_iam\_access\_key" "test\_user" {
            user = "${aws\_iam\_user.test\_user.name}"
        }
        
        resource "aws\_iam\_user\_policy" "test\_user\_ro" {
            name = "test"
            user = "${aws\_iam\_user.test\_user.name}"
            policy= <<EOF
        {
            "Version": "2012-10-17",
            "Statement": \[
                {
                    "Effect": "Allow",
                    "Action": "s3:\*",
                    "Resource": \[
                        "arn:aws:s3:::YOUR\_TEST\_BUCKET\_NAME",
                        "arn:aws:s3:::YOUR\_TEST\_BUCKET\_NAME/\*"
                    \]
                }
           \]
        }
        EOF
        }
        
        resource "aws\_iam\_user" "prod\_user" {
            name = "YOUR\_PROD\_BUCKET\_USER"
        }
        
        resource "aws\_iam\_access\_key" "prod\_user" {
            user = "${aws\_iam\_user.prod\_user.name}"
        }
        
        resource "aws\_iam\_user\_policy" "prod\_user\_ro" {
            name = "prod"
            user = "${aws\_iam\_user.prod\_user.name}"
           policy= <<EOF
        {
            "Version": "2012-10-17",
            "Statement": \[
                {
                    "Effect": "Allow",
                    "Action": "s3:\*",
                    "Resource": \[
                        "arn:aws:s3:::YOUR\_PROD\_BUCKET\_NAME",
                        "arn:aws:s3:::YOUR\_PROD\_BUCKET\_NAME/\*"
                    \]
                }
           \]
        }
        EOF
        }
        
        resource "aws\_s3\_bucket" "prod\_bucket" {
            bucket = "YOUR\_PROD\_BUCKET\_NAME"
            acl = "public-read"
        
            cors\_rule {
                allowed\_headers = \["\*"\]
                allowed\_methods = \["PUT","POST"\]
                allowed\_origins = \["\*"\]
                expose\_headers = \["ETag"\]
                max\_age\_seconds = 3000
            }
        
            policy = <<EOF
        {
            "Version": "2008-10-17",
            "Statement": \[
                {
                    "Sid": "PublicReadForGetBucketObjects",
                    "Effect": "Allow",
                    "Principal": {
                        "AWS": "\*"
                    },
                    "Action": "s3:GetObject",
                    "Resource": "arn:aws:s3:::YOUR\_PROD\_BUCKET\_NAME/\*"
                },
                {
                    "Sid": "",
                    "Effect": "Allow",
                    "Principal": {
                        "AWS": "${aws\_iam\_user.prod\_user.arn}"
                    },
                    "Action": "s3:\*",
                    "Resource": \[
                        "arn:aws:s3:::YOUR\_PROD\_BUCKET\_NAME",
                        "arn:aws:s3:::YOUR\_PROD\_BUCKET\_NAME/\*"
                    \]
                }
            \]
        }
        EOF
        }
        
        resource "aws\_s3\_bucket" "test\_bucket" {
            bucket = "YOUR\_TEST\_BUCKET\_NAME"
            acl = "public-read"
        
            cors\_rule {
                allowed\_headers = \["\*"\]
                allowed\_methods = \["PUT","POST"\]
                allowed\_origins = \["\*"\]
                expose\_headers = \["ETag"\]
                max\_age\_seconds = 3000
            }
        
            policy = <<EOF
        {
            "Version": "2008-10-17",
            "Statement": \[
                {
                    "Sid": "PublicReadForGetTestBucketObjects",
                    "Effect": "Allow",
                    "Principal": {
                        "AWS": "\*"
                    },
                    "Action": "s3:GetObject",
                    "Resource": "arn:aws:s3:::YOUR\_TEST\_BUCKET\_NAME/\*"
                },
                {
                    "Sid": "",
                    "Effect": "Allow",
                    "Principal": {
                        "AWS": "${aws\_iam\_user.test\_user.arn}"
                    },
                    "Action": "s3:\*",
                    "Resource": \[
                        "arn:aws:s3:::YOUR\_TEST\_BUCKET\_NAME",
                        "arn:aws:s3:::YOUR\_TEST\_BUCKET\_NAME/\*"
                    \]
                }
            \]
        }
        EOF
        }
        
        
        ```
        
2.  Run it
    1.  ```
        terraform apply
        ```
        

### Profit

Alright, you say, but the config file is quite ugly. So, can we extract the variables out of the mess? Yeah, sure. Replace all the red text above with **${var.test\_bucket\_name} **instead of YOUR\_TEST\_BUCKET\_NAME etc. Then create a **variables.tf, **containing

```
variable "aws\_region" {}

variable "aws\_access\_key" {}
variable "aws\_secret\_key" {}

variable "prod\_bucket\_name" {}
variable "test\_bucket\_name" {}
```

You will then be prompted for the variables instead of having to change them in s3.tf. You can also configure the answers to these, by adding the following to **terraform.tfvars**

```
aws\_region = "my-aws\_region-value"

aws\_access\_key = "my-aws\_access\_key-value"
aws\_secret\_key = "my-aws\_secret\_key-value"

prod\_bucket\_name = "my-prod\_bucket\_name-value"
test\_bucket\_name = "my-test\_bucket\_name-value"
```
