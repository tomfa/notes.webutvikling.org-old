---
title: "AWS S3 and CloudFront workshop"
date: 2016-11-17
image: ./latency.png
tags: [AWS, cloudfront, performance, react, S3]
author: tomfa
status: publish
---

Last week, I held an AWS workshop on how to host a (dummy) React app there, in S3 and with CloudFront. If you'd like to learn what I taught the others, a github repo is available at [https://github.com/tomfa/aws-frontend-workshop](https://github.com/tomfa/aws-frontend-workshop). The featured image for this post reflects the performance difference you can gain by knowing where and how to host your files. Using CloudFront for a simple React-app can decrease the load time tenfold, compared with static hosting in other regions. And at a lesser price, even! **Key takeaways:**

*   Using CloudFront can increase the performance up to 10 fold compared with hosting in other parts of the world, due to its help with cache headers, and gzip of content.
*   CloudFront simplifies SSL (given you know the quirks). This SSL can be provided with AWS Certificate Manager for free, and automatically updated before expiry.
*   CloudFront can give you a smaller bill compared with S3. The main cost is traffic, and since Cloudfront gzips your content, you get off with less traffic. Also, CloudFront traffic to the internet is less than traffic from S3.
*   CloudFront can also be used as a cache layer or SSL endpoint for backend applications.
*   CloudFront can be used as a video streaming service for your site, supporting RTMP, Flash and Microsoft Smooth Streaming\*
*   CloudFront can shed light on certain aspects of your users, providing logs and statistics such as most visited urls, most used browsers, OSes, devices.
*   S3 has certain features, such as versioning, which can help you sleep at night.
*   S3 also has a website-feature, but it sucks. Don't use it, instead use CloudFront.

**Related**

*   Notes and Anecdotes > [Add S3 bucket + CloudFront using Terraform (example)](http://notes.webutvikling.org/s3-bucket-cloudfront-using-terraform/)
*   Notes and Anecdotes > [Add S3 bucket using Terraform (example)](http://notes.webutvikling.org/add-s3-bucket-using-terraform/)
