---
title: "Set index.html as default file on S3 bucket"
date: 2016-07-13
image: ./bucket.jpg
tags: [AWS, bucket, index document, S3, website]
author: tomfa
status: publish
---

`aws s3 website $MY_BUCKET_NAME --index-document index.html` Note: Your index.html will **not** be rendered when the short s3-path is requested (e.g. bucket.s3.amazonaws.com), only when the full dns is used (e.g.bucket.s3-website.eu-central-1.amazonaws.com/) If that doesn't work, make sure you've fulfilled the prerequisites below. **(prerequisite) Install aws-cli**

```
pip install awscli
```

**(prerequisite) Set your AWS-keys**

```
export AWS\_ACCESS\_KEY\_ID=\[MY\_ACCESS\_KEY\]
export AWS\_SECRET\_ACCESS\_KEY=\[MY\_SECRET\_KEY\]
```
