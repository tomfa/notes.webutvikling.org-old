---
title: "Add S3 bucket + CloudFront using Terraform (example)"
date: 2016-08-12
image: ./cloudds.jpg
tags: [AWS, cloudfront, S3, terraform]
author: tomfa
status: publish
---

Case: I have some frontend app that consists of static files, e.g. a React app packed with WebPack. I want to deploy it to S3, with CloudFront in front of it. (Optional) I also want index.html to be rendered when other paths are requested (such as /food/cake-is-best), and for the site to return 200 status instead of 404.

### Setup AWS + terraform

1.  You [sign up](http://aws.amazon.com/s3/) with Amazon if you haven't already.
2.  Create a secret key / access key pair from [here](https://console.aws.amazon.com/iam/home?#security_credential).
3.  [Download](https://terraform.io/downloads.html) Terraform, and extract the files to e.g.
    1.  ```
        ~/bin/terraform/<files>
        ```
        
4.  Add the path to your path by adding this line to _~/.bash\_profile_
    1.  ```
        export PATH=$PATH:~/bin/terraform
        ```
        

Alright, that should be it. You can confirm that terraform is setup by typing _terraform _in the terminal. It should respond something that seems sensible.

### Quick version

When you have Terraform installed, all you need to do is do the line below. It will prompt you for anything it needs, and set up a buckets on AWS, with Cloudfront caches in front of it to optimize site speed.

```
terraform apply github.com/tomfa/terraform-sandbox/s3-webfiles-with-cloudfront
```

Alternatively, if you want to specify things yourself, see the code below. Replace the marked variables with your desired region and bucket name. **Long version**

```
\# Specifies your AWS credentials and region
provider "aws" {
    access\_key = "YOUR\_ACCESS\_KEY"
    secret\_key = "YOUR\_SECRET\_KEY"
    region = "AWS\_REGION"
}

# OPTIONAL: Specify a user that will be able to upload stuff to bucket
resource "aws\_iam\_user" "prod\_user" {
    name = "YOUR-BUCKET-NAME\-user"
    path = "/system/"
}

# OPTIONAL: Creates keys for that user
resource "aws\_iam\_access\_key" "prod\_user" {
    user = "${aws\_iam\_user.prod\_user.name}"
}

# OPTIONAL: Policy for user that allows it to upload
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
            "arn:aws:s3:::YOUR-BUCKET-NAME",
            "arn:aws:s3:::YOUR-BUCKET-NAME/\*"
        \]
     }\]
}
EOF
}

# Here we specify the bucket
resource "aws\_s3\_bucket" "prod\_bucket" {
    bucket = "YOUR-BUCKET-NAME"
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
         "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/\*"
    }, {
        "Sid": "",
        "Effect": "Allow",
        "Principal": {
            "AWS": "${aws\_iam\_user.prod\_user.arn}"
        },
        "Action": "s3:\*",
        "Resource": \[
            "arn:aws:s3:::YOUR-BUCKET-NAME",
            "arn:aws:s3:::YOUR-BUCKET-NAME/\*"
        \]
    }\]
}
EOF }

# Create Cloudfront distribution
resource "aws\_cloudfront\_distribution" "prod\_distribution" {
    origin {
        domain\_name = "${aws\_s3\_bucket.prod.website\_endpoint}"
        origin\_id = "S3-${aws\_s3\_bucket.prod.bucket}"
 
        custom\_origin\_config {
            http\_port = 80
            https\_port = 443
            origin\_protocol\_policy = "match-viewer"
            origin\_ssl\_protocols = \["TLSv1", "TLSv1.1", "TLSv1.2"\]
        }
    }
    # By default, show index.html file
    default\_root\_object = "index.html"
    enabled = true

    # If there is a 404, return index.html with a HTTP 200 Response
    custom\_error\_response {
        error\_caching\_min\_ttl = 3000
        error\_code = 404
        response\_code = 200
        response\_page\_path = "/index.html"
    }

    default\_cache\_behavior {
        allowed\_methods = \["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"\]
        cached\_methods = \["GET", "HEAD"\]
        target\_origin\_id = "S3-${aws\_s3\_bucket.prod.bucket}"

        # Forward all query strings, cookies and headers
        forwarded\_values {
            query\_string = true
        }

        viewer\_protocol\_policy = "allow-all"
        min\_ttl = 0
        default\_ttl = 3600
        max\_ttl = 86400
    }

    # Distributes content to US and Europe
    price\_class = "PriceClass\_100"

    # Restricts who is able to access this content
    restrictions {
        geo\_restriction {
            # type of restriction, blacklist, whitelist or none
            restriction\_type = "none"
        }
    }

    # SSL certificate for the service.
    viewer\_certificate {
        cloudfront\_default\_certificate = true
    }
}
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
