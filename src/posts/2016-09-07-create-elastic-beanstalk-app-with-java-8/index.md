---
title: 'Create Elastic Beanstalk app with Java 8'
date: 2016-09-07
image: ./jellybeans.jpg
tags: ['guide', aws, elastic beanstalk cli, java]
author: tomfa
status: publish
---

Beanstalk is quite nice. And the [awsebcli](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-cmd-commands.html) looks nice too, along with its documentation and [the example guide](https://pypi.python.org/pypi/awsebcli/3.7.6) at pypi. You can deploy straight from a local git repo in one command. You can have each branch go to a separate Beanstalk environments. So I tested it, and here are my notes: _Edit: If you want to learn this, check out the [workshop](https://github.com/helleroy/beanstalk-workshop) we made! _

1.  If you haven't already, **install awsebcli** with pip

    ```bash
    pip install awsebcli
    ```

    or brew

    ```bash
    brew install awsebcli
    ```

2.  Go to your Java App repository, or get a dummy app from [here](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/samples/java-se-jetty-maven-v1.zip) (other languages [here](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/GettingStarted.html))

    - Notice the [Buildfile](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/java-se-platform.html#java-se-buildfile): This file specifies commands which are run once, and must terminate upon completion, and are ment to build your application.

    - Notice the [Procfile](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/java-se-platform.html#java-se-procfile): This is required if you have more than one jar that you wish to run. The Procfile specifies which jars should be run, and the java run commands.

3.  Connect your app to a (new) Beanstalk with the following command ([cli docs for init](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-init.html))

    ```
    eb init
        --region eu-central-1
        --keyname my-ssh-key
        --platform java-8
    ```

    _Note: my-ssh-key is used to log into the created instances. It must be located in ~/.ssh/ _

4.  Connect your app to a (new) Beanstalk with **one** of the following command ([cli docs for create](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-create.html))
    1.  The line below specifies the app to be run on a single EC2 instance without an ELB (**--single**), and without databases.

        ```
        eb create <my-app-name>
            --region eu-central-1
            --vpc.id "vpc-cfb288a2"
            --vpc.ec2subnets subnet-966362e2,subnet-2729dc4a
            --instance_type t2.micro
            --keyname my-ssh-key
            --platform java-8
            --single
        ```

    2.  The line below specifies the app to be run on a two EC2 instances with an ELB with a specified dns, and with a database.

        ```
        eb create <my-app-name>
            --region eu-central-1
            --vpc.id "vpc-cfb288a2"
            --vpc.ec2subnets subnet-966362e2,subnet-2729dc4a
            --instance_type t2.micro
            --keyname my-ssh-key
            --platform java-8
            --scale 2
            --database
            --database.engine postgres
            --database.user your-postgres-user
            --database.pass your-postgres-password
            --database.size 5
            --cname your-aws-domain-name
        ```

Voilá! That's it, basically. You've got your app up.
