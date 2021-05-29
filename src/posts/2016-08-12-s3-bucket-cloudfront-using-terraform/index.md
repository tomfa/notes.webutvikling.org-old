---
title: 'Add S3 bucket + CloudFront using Terraform (example)'
date: 2016-08-12
image: ./cloudds.jpg
tags: ['guide', AWS, cloudfront, S3, terraform]
author: tomfa
status: publish
---

Case: I have some frontend app that consists of static files, e.g. a React app packed with WebPack. I want to deploy it to S3, with CloudFront in front of it. (Optional) I also want index.html to be rendered when other paths are requested (such as /food/cake-is-best), and for the site to return 200 status instead of 404.

### Setup AWS + terraform

1.  You [sign up](http://aws.amazon.com/s3/) with Amazon if you haven't already.

2.  Create a secret key / access key pair from [here](https://console.aws.amazon.com/iam/home?#security_credential).

3.  [Download](https://terraform.io/downloads.html) Terraform, and extract the files to e.g.
    ```bash
    ~/bin/terraform/<files>
    ```
4.  Add the path to your path by adding this line to _~/.bash_profile_
    ```bash
    export PATH=$PATH:~/bin/terraform
    ```

Alright, that should be it. You can confirm that terraform is setup by typing `terraform` in the terminal. It should respond something that seems sensible.

### Short version

_2021 update: Follow the wizard at [ihasabucket.it](https://ihasabucket.it/) to generate terraform files. This supports static pages better, and terraform v0.12+. The code below is written for terraform v0.11-)_

When you have Terraform installed, all you need to do is do the line below. It will prompt you for anything it needs, and set up a buckets on AWS, with Cloudfront caches in front of it to optimize site speed.

```
terraform apply github.com/tomfa/terraform-sandbox/s3-webfiles-with-cloudfront
```

Alternatively, if you want to specify things yourself, see the code below. Replace the marked variables with your desired region and bucket name.

### Long version

```yaml
# Specifies your AWS credentials and region
provider "aws" {
    access_key = "YOUR_ACCESS_KEY"
    secret_key = "YOUR_SECRET_KEY"
    region = "AWS_REGION"
}

# OPTIONAL: Specify a user that will be able to upload stuff to bucket
resource "aws_iam_user" "prod_user" {
    name = "YOUR-BUCKET-NAME\-user"
    path = "/system/"
}

# OPTIONAL: Creates keys for that user
resource "aws_iam_access_key" "prod_user" {
    user = "${aws_iam_user.prod_user.name}"
}

# OPTIONAL: Policy for user that allows it to upload
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
            "arn:aws:s3:::YOUR-BUCKET-NAME",
            "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        ]
     }]
}
EOF
}

# Here we specify the bucket
resource "aws_s3_bucket" "prod_bucket" {
    bucket = "YOUR-BUCKET-NAME"
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
         "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }, {
        "Sid": "",
        "Effect": "Allow",
        "Principal": {
            "AWS": "${aws_iam_user.prod_user.arn}"
        },
        "Action": "s3:*",
        "Resource": [
            "arn:aws:s3:::YOUR-BUCKET-NAME",
            "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        ]
    }]
}
EOF }

# Create Cloudfront distribution
resource "aws_cloudfront_distribution" "prod_distribution" {
    origin {
        domain_name = "${aws_s3_bucket.prod.website_endpoint}"
        origin_id = "S3-${aws_s3_bucket.prod.bucket}"

        custom_origin_config {
            http_port = 80
            https_port = 443
            origin_protocol_policy = "match-viewer"
            origin_ssl_protocols = ["TLSv1", "TLSv1.1", "TLSv1.2"]
        }
    }
    # By default, show index.html file
    default_root_object = "index.html"
    enabled = true

    # If there is a 404, return index.html with a HTTP 200 Response
    custom_error_response {
        error_caching_min_ttl = 3000
        error_code = 404
        response_code = 200
        response_page_path = "/index.html"
    }

    default_cache_behavior {
        allowed_methods = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
        cached_methods = ["GET", "HEAD"]
        target_origin_id = "S3-${aws_s3_bucket.prod.bucket}"

        # Forward all query strings, cookies and headers
        forwarded_values {
            query_string = true
        }

        viewer_protocol_policy = "allow-all"
        min_ttl = 0
        default_ttl = 3600
        max_ttl = 86400
    }

    # Distributes content to US and Europe
    price_class = "PriceClass_100"

    # Restricts who is able to access this content
    restrictions {
        geo_restriction {
            # type of restriction, blacklist, whitelist or none
            restriction_type = "none"
        }
    }

    # SSL certificate for the service.
    viewer_certificate {
        cloudfront_default_certificate = true
    }
}
```

### Profit

Alright, you say, but the config file is quite ugly. So, can we extract the variables out of the mess? Yeah, sure. Replace all the red text above with **${var.test_bucket_name} **instead of `YOUR_TEST_BUCKET_NAME` etc. Then create a **variables.tf,** containing

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
