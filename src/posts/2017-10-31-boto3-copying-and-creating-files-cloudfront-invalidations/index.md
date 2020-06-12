---
title: "Boto3 - copying and creating files + cloudfront invalidations"
date: 2017-10-31
image: ./maksym-kaharlytskyi-Q9y3LRuuxmg-unsplash.jpg
tags: [AWS, python, S3]
author: tomfa
status: publish
---

A 1-2-3 on Python3 boto3 package with my most common operations

##### Copy objet between two S3 buckets

```
s3 = boto3.client('s3')
copy\_source = {
    'Bucket': 'my-bucket-1',
    'Key': 'index.html'
}
s3.copy\_object(
    CopySource=copy\_source, 
    Bucket='my-bucket-2', 
    Key='index.html'
)
```

##### Upload file to S3 bucket

```
s3 = boto3.resource('s3')
bucket = s3.Bucket(AWS\_BUCKET\_NAME)
f = open(file\['path'\], 'rb')

bucket.put\_object(
    ACL='public-read',
    ContentType='application/json',
    ContentEncoding='utf-8',
    Key=filename,
    Body=f,
)
```

##### Create Cloudfront invalidation

Remember that **/** before each file name

```
files = \["/index.html"\]
cloudfront = boto3.client('cloudfront')
cloudfront.create\_invalidation(
    DistributionId='IADF1234567',
    InvalidationBatch={
        'Paths': {
            'Quantity': len(files),
            'Items': \['/{}'.format(f) for f in files\]
        },
        'CallerReference': 'my-references-{}'.format(datetime.now())
    }
)

```

##### List S3 bucket content

```
s3 = boto3.client('s3')
files = \[
    x\['Key'\]
    for x in s3.list\_objects(Bucket='my-bucket')\['Contents'\]
\]

```
