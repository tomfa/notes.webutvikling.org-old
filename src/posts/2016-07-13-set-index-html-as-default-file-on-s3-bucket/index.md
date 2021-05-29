---
title: 'Set index.html as default file on S3 bucket'
date: 2016-07-13
image: ./bucket.jpg
tags: ['guide', AWS, bucket, index document, S3, website]
author: tomfa
status: publish
---

```
aws s3 website $MY_BUCKET_NAME --index-document index.html
```

Note: Your index.html will **not** be rendered when the short s3-path is requested (e.g. bucket.s3.amazonaws.com), only when the full dns is used (e.g.bucket.s3-website.eu-central-1.amazonaws.com/)

If that doesn't work, make sure you've fulfilled the prerequisites below.

```bash
# prerequisite: Install aws-cli
pip install awscli

# prequisite: set up AWS-keys
export AWS_ACCESS_KEY_ID=[MY_ACCESS_KEY]
export AWS_SECRET_ACCESS_KEY=[MY_SECRET_KEY]
```
