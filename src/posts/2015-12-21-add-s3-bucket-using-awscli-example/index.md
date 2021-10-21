---
title: 'Add S3 bucket using awscli (example)'
date: 2015-12-21
image: ./samur-isma-7pSpz7hXox0-unsplash.jpg
tags: ['guide', aws, awscli, cloudfront, iam, policy, s3]
author: tomfa
status: publish
---

Here's a simple step by step guide on how to create a s3 bucket, with an attached cloudfront and a user with write access. This is typically what you want if you need quick hosting for static files for you website. This is made in contrast to the [terraform guide](http://notes.webutvikling.org/add-s3-bucket-using-terraform/), which does the same, but using different tools If you haven't already, setup awscli (using [python](https://www.python.org/downloads/) and [pip](https://pip.pypa.io/en/stable/installing/))

```
pip install awscli
aws configure
```

You here have to provide your access key and secret key, which can be found at [aws console](https://console.aws.amazon.com/iam/home?region=us-west-2#security_credential).

1.  Create bucket
    ```
    aws s3api create-bucket --bucket my-cool-bucket --acl public read --region eu-west-1
    ```
2.  Get public read policy for bucket
    ```
    curl https://raw.githubusercontent.com/tomfa/aws-policies/master/s3-bucket-public-read.json > s3-template.json
    ```
3.  Replace `[[YOUR-BUCKET-NAME]]` with the name of your bucket
    ```
    sed 's/\[\[YOUR-BUCKET-NAME\]\]/my-cool-bucket/g' s3-template.json > s3.json
    ```
4.  Apply the bucket policy
    ```
    aws s3api put-bucket-policy --bucket my-cool-bucket --policy file://s3.json
    ```
5.  Enable CloudFront cli ([it's in beta](http://docs.aws.amazon.com/cli/latest/reference/cloudfront/create-distribution.html))
    ```bash
    aws configure set preview.cloudfront true
    ```
6.  Download [this cloudfront config file](https://gist.githubusercontent.com/tomfa/889a0bca08e59f6bbfa9/raw/7afcac61b7da03496590384531711a722f59a51e/website-static.json) and save as cf-template._json_
    ```bash
    curl https://raw.githubusercontent.com/tomfa/aws-policies/master/cloudfront-static-webfiles.json > cf-template.json
    ```
7.  Replace `[[YOUR-BUCKET-NAME]]` with.. yeah, your bucket name
    ```bash
    sed 's/\[\[YOUR-BUCKET-NAME\]\]/my-cool-bucket/g' cf-template.json > cf.json
    ```
8.  Spin up the CloudFront
    ```
    aws cloudfront create-distribution --distribution-config file://cf.json
    ```
9.  Get user policy (for write access to your bucket)
    ```
    curl https://raw.githubusercontent.com/tomfa/aws-policies/master/iam-bucket-write.json > iam-template.json
    ```
10. Again, replace `[[YOUR-BUCKET-NAME]]` with your actual bucket name.


    ```
    sed 's/\[\[YOUR-BUCKET-NAME\]\]/my-cool-bucket/g' iam-template.json > iam.json
    ```


11. Create the user
    ```
    aws iam create-user --user-name CoolBucketGuy
    ```
12. Create the policy
    ```
    aws iam create-policy --policy-name cool-bucket-write --policy-document file://iam.json
    ```
13. Attach the iam policy to the user (_policy-arn will be in output from previous command_)


    ```
    aws iam attach-user-policy --usr-name CoolBucketGuy --policy-arn arn:aws:iam::938109129012:policy/cool-bucket-write
    ```


14. You probably want the access and secret key for your user to use somewhere:
    ```bash
    aws iam create-access-key --user-name CoolBucketGuy
    ```
