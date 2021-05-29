---
title: 'Elastic Beanstalk – In a VPC'
date: 2016-10-15
image: ./beanstalk.jpg
tags: ['guide', AWS, beanstalk, EC2, ELB, Loadbalancer, VPC]
author: tomfa
status: publish
---

> "The EC2 instances failed to communicate with AWS Elastic Beanstalk."

FUDGE! Notes on how to successfully launch a Beanstalk instance in a VPC.

**How to create a basic Beanstalk application without a VPC**

```
eb create BeanstalkCleanTest \
  --region eu-central-1 \
  --instance_type t2.micro \
  --keyname filenameofsshkeysinsshfolder \
  --platform java-8 \
  --scale 2
```

This is not a hassle. It usually works, but be aware that it:

1. requires having a default VPC in that region, with...

2. A default subnet that contains...

3. An internet gateway.

This is by default provided by AWS in all regions before you even touch it. However, if you've played around too much, this might not be the case. And if you've deleted your default stuff: It won't come back. You'll have to contact AWS if you want it back. BUT it doesn't matter much, because you'll probably want to specify a VPC anyway.

### How to create a basic Beanstalk app inside a VPC

You can **add --vpc **to the previous command, and you'll get a interactive way of specifying your vpc options. Or you can specify them directly in the command:

```
eb create BeanstalkCleanTest  \
  --region eu-central-1  \
  --instance_type t2.micro  \
  --keyname filenameofsshkeysinsshfolder  \
  --platform java-8  \
  --scale 2  \
  --vpc.id vpc-ffffffff  \
  --vpc.elbsubnets subnet-publicfff,subnet-publicfff  \
  --vpc.ec2subnets subnet-publicfff,subnet-publicfff
```

The not so fun error message you can get at this point is a timeout, which if you go to the AWS console -> Elastic beanstalk might say

### The EC2 instances failed to communicate with AWS Elastic Beanstalk, either because of configuration problems with the VPC or a failed EC2 instance. Check your VPC configuration and try launching the environment again.

This error has cost me a lot of time, and googling answers has not helped much. The first thing googling tells me is:

> Make sure your EC2 instances are either 1) launched in a public subnet or 2) launched in a private subnet with a routing table that points to a NAT gateway.

_(Public subnet here meaning they have access to the internet, and a public IP) _ Why? So they can talk to Beanstalk and tell it they're OK. **But I didn't think was a problem in my case:**

- I had launched **everything **in public subnets (not the best practice, but bear with me).
- The subnet they were placed in had an internet gateway, a nice routing table and
- I could SSH into the EC2 instances that had popped up (via Bastion),
- I could ping 8.8.8.8 (Google DNS) from Bastion without any problems.

So they could definitely reach the internet. Also: If I went into AWS Console > EC2, I could see their public IP address.

**BUT **if I launched the environment with `--vpc.elbpublic`  and `--vpc.publicip`, everything went smoothly. So apparently somehow I was wrong, even if I spent 10 hours convinced that this was not the issue.

**Q: So what does --vpc.elbpublic and --vpc.publicip do?**

According to the [create doc](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-create.html) it "Launches your ELB/EC2 Instances in a public subnet in your VPC."

**Q: So then the subnets you specified first weren't public, and the public-flags put them in another subnet?**

No, both the ELB and EC2-instances appeared in the very subnet I specified, and was convinced was public.

**Q: Were the security groups added by Beanstalk any different then?**

Nope, in both cases it added 1) inbound and outbound free-for-all on port 80 (to 0.0.0.0/0) for ELB, and 2) for EC2: outbound free-for-all on all ports, and inbound 22 (0.0.0.0/0) and inbound 80 from ELB only.

**Q: Were the ELB schema different?**

Yes, the ELB schema was different. By default, the ELB was internal, even though it was in a public subnet. When I added --vpc.elbpublic, the scheme went to internet-facing. However, Beanstalk should not have a problem with launching internal loadbalanced applications.

**Q: Just to be sure: they all had public IPs, right?**

**...** No. Actually, the EC2 instances did not have public IPs. That only came up on the instances created with *--vpc.publicip * specified. And note: That's even though they came up in a subnet with "Auto-assign public IP" turned on. So it seems Beanstalk ignores the subnet default options and explicitly sets whether or not EC2 instances should have public IPs.

**Q: Because they need a public IP even though there's a LoadBalancer in front?**

YES. Given the EC2-instances are placed in the same public network as the ELB, they need public IPs in order to be reachable for the loadbalancer. (ref "AssociatePublicIpAddress" [here](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-general.html#command-options-general-ec2vpc)). I find this a bit strange, but apparently it is so. However, if your EC2-instances are in a private subnet, this is (naturally) not a requirement.

**Q: So what was the solution?**

Add --vpc.elbpublic **IF** you want your loadbalancer to be publicly accessable, and add --vpc.public IP **IF** the EC2-instances are in a public subnet.

```
eb create BeanstalkCleanTest  \
  --region eu-central-1  \
  --instance_type t2.micro  \
  --keyname filenameofsshkeysinsshfolder  \
  --platform java-8  \
  --scale 2  \
  --vpc.id vpc-ffffffff  \
  --vpc.elbsubnets subnet-publicffe,subnet-publicfff  \
  --vpc.ec2subnets subnet-publicffe,subnet-publicfff  \
  --vpc.elbpublic  \
  --vpc.publicip
```

**Q: What if I want the EC2-instances in a private subnet?**

Make sure you have private subnets, and that they have a routing table that points to a [NAT Gateway](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/vpc-nat-gateway.html). This is not provided by Beanstalk, so you'll have to make that yourself. Beanstalk will hover make sure your EC2-instances are allowed to talk to your ELB. Also, if your EC2-instances are in a private subnet, they won't want a public IP, so you can skip that part:

```
eb create BeanstalkCleanTest  \
  --region eu-central-1  \
  --instance_type t2.micro  \
  --keyname filenameofsshkeysinsshfolder  \
  --platform java-8  \
  --scale 2  \
  --vpc.id vpc-ffffffff  \
  --vpc.elbsubnets subnet-publicffe,subnet-publicfff  \
  --vpc.ec2subnets subnet-privateffe,subnet-privatefff  \
  --vpc.elbpublic
```

**Q: OK, got it. And if I want a database attached to this?**

Oh, so demanding all of a sudden, huh? Oh well, if you checkout the [create docs](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-create.html), you'll find some database commands. You could slap on *---database*, and it'll ask you some questions along the way. You might want to specify some details:

- subnets for the database, using _--vpc.dbsubnets subnet1,subnet2_
  - You can place them in the same subnet(s) as your ec2-instances.
- instance type of database, using *--database.instance [db.t2.medium]*
- type of database engine, using *--database.engine [postgres]*
- size of database in GB, using *--database.size [20]*
- A username, using _--database.username [myAdmin]_
- A password, using _--database.password [asidojk243]_

```
eb create BeanstalkCleanTest  \
  --region eu-central-1  \
  --instance_type t2.micro  \
  --keyname filenameofsshkeysinsshfolder  \
  --platform java-8  \
  --scale 2  \
  --vpc.id vpc-ffffffff  \
  --vpc.elbsubnets subnet-publicffe,subnet-publicfff  \
  --vpc.ec2subnets subnet-privateffe,subnet-privatefff  \
  --vpc.elbpublic  \
  --vpc.dbsubnets subnet-privateffe,subnet-privatefff  \
  --database.instance db.t2.medium  \
  --database.engine postgres  \
  --database.size 20  \
  --database.username myAdmin  \
  --database.password asidojk243
```

**There you go! Thank you so much, you're welcome. kkthxbye!** _(Note: This last command will probably time out. Don't worry. You can watch the progress in the AWS console > Beanstalk)_

---

- AWS > [eb create - AWS Elastic Beanstalk](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-create.html)
- AWS > [General Options for All Environments - AWS Elastic Beanstalk](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-general.html#command-options-general-ec2vpc)
- AWS > [Amazon EC2 Instances Fail to Launch within the Wait Period - AWS Elastic Beanstalk](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/events.common.connectivity.html)
- Reddit > [The EC2 instances failed to communicate with AWS Elastic Beanstalk, either because of configuration problems with the VPC or a failed EC2 instance. Check your VPC configuration and try launching the environment again](https://www.reddit.com/r/aws/comments/3edgsp/the_ec2_instances_failed_to_communicate_with_aws/)
