---
title: "HTTPS for AWS CloudFront and AWS ELB"
date: 2016-09-23
image: ./ssl.jpg
tags: [AWS, certificate manager, cloudfront, elastic load balancer, elb, https, ssl]
author: tomfa
status: publish
---

Wow, such easy, much free! A few simple steps on 

1. How to obtain a certificate for your domain
2. How to use it on your CloudFront or Elastic Load Balancer. 

_(See 1.4 if it's for a Load Balancer)_

### Lession 1: Create certificates in US-East

No matter where you're from, or where your buckets or infrastructure is located, **always request Certificiates from US-East**:

> You can use certificates that you created in AWS Certificate Manager (ACM) in the **US-East (N. Virginia)** Region, or you can use certificates stored in the IAM certificate store. 
> – [AWS support center](https://aws.amazon.com/premiumsupport/knowledge-center/custom-ssl-certificate-cloudfront/)

#### 1.1 Using AWS generated Certificate

If you don't have a certificate (or if you do, but haven't gotten too attached to it yet), this is the easy/recommended way – using AWS Certificate Manager:

1.  Go to AWS Certificate Manager in US East (North Virginia).
    *   Request a certificate for your domain
2.  Wait... an email will arrive soon.
3.  Click the confirmation link in your e-mail and confirm that you know what's happening
4.  Go to your CloudFront distribution > Select distribution > Distribution Settings > General > Edit
    *   Make sure your domain name is in the "Alternate Domain Names (CNAMEs)" textbox.
    *   Select "Custom SSL Certificate (example.com)"
    *   Select the Certificate you got there.
5.  Wait... Changing a CloudFront distribution can take a while.
6.  Voilá! That's it.

#### **1.2 Using your own certificate**

1.  Acquire a certificate (via e.g. [Let's Encrypt](https://letsencrypt.org/))
2.  Upload that via the [aws cli upload-server-certificate](http://docs.aws.amazon.com/cli/latest/reference/iam/upload-server-certificate.html) _(Important: region must be eu-east-1 (N. Virginia for CloudFront)_
    
    ```
    aws iam upload-server-certificate
       --path /cloudfront/test/
       --server-certificate-name myFirstCertificate
       --certificate-body file://<my-pub-key-file>
       --private-key file://<my-private-key>
       --certificate-chain file://<my-certificate-chain>
    ```
    
    Note how the path must start with cloudfront (required for that service only).
3.  Go to step 4 in the section 1.1. Your uploaded certificate should be found there.

#### 1.3 Troubleshooting

If your Cloudfront is in front of an s3 bucket (_e.g. fishsticks)_ and points to its website url (_fishsticks.s3-website.eu-central-1.amazonaws.com_), you can run into trouble. 

The S3 website url doesn't support https out of the box. You can fix this by setting The Origin Protocol Policy to **HTTP Only** (CloudFront > Distribution Settings > Origin > Edit), which will make traffic between your CloudFront and S3 bucket be http. If you're uncomfortable with this, you can points to its regular bucket url (_https://fishsticks.s3.amazonaws.com/_), which _do_ support https. If you do, remember to set default root object on your CloudFront.

#### 1.4 For Elastic Load balancer

If you're using your own certificate, do steps 1.2 above. Else, do steps 1.1. In both cases, you must request/upload them to the same region as your ELB. Then, add your certificate to your ELB by following the steps in [Add an HTTPS Listener using the Console](http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-add-or-delete-listeners.html#add-listener-console) guide on AWS.

* * *

*   [AWS > AWS Certificate Manager](https://aws.amazon.com/certificate-manager/)
*   [AWS > Add an HTTPS Listener using the Console](http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-add-or-delete-listeners.html#add-listener-console)
*   [Notes > Add S3 bucket with CloudFront using Terraform](http://notes.webutvikling.org/s3-bucket-cloudfront-using-terraform/)
