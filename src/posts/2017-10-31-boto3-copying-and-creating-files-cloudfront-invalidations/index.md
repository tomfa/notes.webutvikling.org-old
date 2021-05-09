---
title: "Boto3 - copying and creating files + cloudfront invalidations"
date: 2017-10-31
image: ./maksym-kaharlytskyi-Q9y3LRuuxmg-unsplash.jpg
tags: ["guide", AWS, python, S3]
author: tomfa
status: publish
---

A 1-2-3 on Python3 boto3 package with my most common operations

### Copy object between two S3 buckets

```python
s3 = boto3.client('s3')
copy_source = {
    'Bucket': 'my-bucket-1',
    'Key': 'index.html'
}
s3.copy_object(
    CopySource=copy_source, 
    Bucket='my-bucket-2', 
    Key='index.html'
)
```

### Upload file to S3 bucket

```python
s3 = boto3.resource('s3')
bucket = s3.Bucket(AWS_BUCKET_NAME)
f = open(file['path'], 'rb')

bucket.put_object(
    ACL='public-read',
    ContentType='application/json',
    ContentEncoding='utf-8',
    Key=filename,
    Body=f,
)
```

### Create Cloudfront invalidation

Remember `/` before each file name

```python
files = ["/index.html"]
cloudfront = boto3.client('cloudfront')
cloudfront.create_invalidation(
    DistributionId='IADF1234567',
    InvalidationBatch={
        'Paths': {
            'Quantity': len(files),
            'Items': ['/{}'.format(f) for f in files]
        },
        'CallerReference': 'my-references-{}'.format(datetime.now())
    }
)

```

### List S3 bucket content

```python
s3 = boto3.client('s3')
files = [
    x['Key']
    for x in s3.list_objects(Bucket='my-bucket')['Contents']
]
```
