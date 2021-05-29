---
title: 'Using AWS Route 53 and SES to handle DNS and e-mail'
date: 2016-09-20
image: ./mails.png
tags: ['guide', AWS, domain names, email, forwarding, Lambda, ses]
author: tomfa
status: publish
---

Some notes on using AWS for handling DNS and e-mail. **Task 1**: example.com, www.example.com should go to some Cloudfront, and api.example.com should go to a Heroku app.

- Go to Route 53
- Create a hosted zone example.com
- At your domain registrar, change the DNS servers to those (4) now visible in Route 53.
- For each of the domains (example.com, www.example.com, api.example.com), create an A Name (IPv4 Alias) to your Cloudfront or ELBs and CNAME to your myexampleapp.herokuapps.com)
- The waiting game (DNS propagation can take hours)

**Task 2:** admin@example.com should redirect to my gmail Here are many options. Maybe the easiest (and best?) one is to point your MX to an e-mail server, e.g. at [MailGun](http://www.mailgun.com/). It's free (unless you're doing massive traffic). If you instead wish to use AWS SES, they do not (out of the box) support forward emails. You'll have to either

1.  Send receiving emails from AWS SES to AWS SNS.
    - Major downside: Max ~250kb emails, or else they'll **bounce**
2.  Forward receiving emails to AWS S3
    - Downside: This is not want you want
3.  Forward to Lambda, which will forward your emails
    - Downside (this solution anyway): It won't encrypt the emails

If you wish to go with 3, here's one way to do it:

1.  Go to SES
2.  Add Domains > Verify a New Domain > Enter your domain
3.  Add Email Addresses > Verify a new Email Address > Enter the email address you want forwarded to
4.  Follow [https://github.com/arithmetric/aws-lambda-ses-forwarder](https://github.com/arithmetric/aws-lambda-ses-forwarder)

---

- [AWS > Amazon SES](https://aws.amazon.com/ses/)
- [GitHub > AWS Lambda SES forwarder](https://github.com/arithmetric/aws-lambda-ses-forwarder)
- [npm > AWS SES mail](https://www.npmjs.com/package/aws-ses-mail)
