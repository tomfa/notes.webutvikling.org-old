---
title: 'Django on Heroku with AWS S3 bucket for static and media files'
date: 2015-12-13
image: ./djangodesktop-1280x1024.jpg
tags: ['guide', aws, cloudfront, django, heroku, python3]
author: tomfa
status: publish
---

Case: You want efficient collectstatic and serving of files

- You want static files and media files to be hosted on an AWS S3 bucket.
- (optional) You have too many files for "normal" collectstatic to be efficient.
- (optional) You have a non-US S3 bucket.
- (optional) You use Heroku

_Disclaimer: Have not tested with python 2.7, can't say if it's working there._

##### 0\. Add the buckets to Amazon S3

Do this: [How to add an S3 bucket](http://notes.webutvikling.org/add-s3-bucket-using-awscli-example/)

##### 1\. Add the dependencies

```
pip install django-redis-cache==1.6.5
pip install django-storages-redux==1.3
pip install Collectfast==0.2.3
```

You probably want these added in **your requirements.txt** as well

```
pip freeze > requirements.txt
```

**If you** **do use heroku**, you will need redis-cache as well:

```
heroku plugins:install heroku-redis --app myherokuappname
```

##### 2\. Change your settings.py

_Note: These settings file are not an easy example settings, but they're damn awesome. You can naively copy them (replace the red parts) ._

**If you** **do use heroku**, remember to set environment variables on the app dashboard. Required vars are AWS_ACCESS_KEY, S3_BUCKET, AWS_SECRET_KEY and AWS_REGION (e.g. eu-west-1) Also, if you use e.g. CloudFront to front your S3 bucket, you can set the MEDIA_URL and STATIC_URL environment variables to point to these (optional)

**If you don't use heroku,** put your value for these 4 variables in between the ' ' at the end of the line.

```python
AWS_REGION = os.environ.get('AWS_REGION', '')  # e.g. eu-west-1
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY', '')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_KEY', '')
AWS_STORAGE_BUCKET_NAME = os.environ.get('S3_BUCKET', '')
AWS_S3_CALLING_FORMAT = "boto.s3.connection.OrdinaryCallingFormat"
AWS_PRELOAD_METADATA = True

...

if AWS_STORAGE_BUCKET_NAME:
    STATIC_URL = 'https://s3-%s.amazonaws.com/%s/static/' % (AWS_REGION, AWS_STORAGE_BUCKET_NAME)
    MEDIA_URL = 'https://s3-%s.amazonaws.com/%s/media/' % (AWS_REGION, AWS_STORAGE_BUCKET_NAME)
    STATICFILES_STORAGE = 'myapp.customstorages.StaticStorage'
    DEFAULT_FILE_STORAGE = 'myapp.customstorages.MediaStorage'
    STATICFILES_LOCATION = 'static'  # name of folder within bucket
    MEDIAFILES_LOCATION = 'media'    # name of folder within bucket
else:
    STATIC_URL = '/static/'
    MEDIA_URL = '/media/'

MEDIA_URL = os.environ.get('MEDIA_URL', MEDIA_URL)
STATIC_URL = os.environ.get('STATIC_URL', STATIC_URL)

...

def get_static_memcache():
    from urllib.parse import urlparse

    if os.environ.get('REDIS_URL', ''):
        redis_url = urlparse(os.environ.get('REDIS_URL'))
        return {
            "BACKEND": "redis_cache.RedisCache",
            'TIMEOUT': None,
            "LOCATION": "{0}:{1}".format(redis_url.hostname, redis_url.port),
            "OPTIONS": {
                "PASSWORD": redis_url.password,
                "DB": 0,
            }
        }
    return {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'TIMEOUT': None,
        'OPTIONS': {
            'MAX_ENTRIES': 5000
        }
    }

CACHES = {
    # Replace the default cache with your existing one (if you have any)
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache'
    },
    'collectfast': get_static_memcache(),
}

COLLECTFAST_CACHE = 'collectfast'
```

##### 3. Add customstorages file

This allows you to have a bucket outside the default US-region. Also it makes sure we can use one bucket for both media and static files. Store this file in the same folder as your settings file (or settings-folder):

```python
from django.conf import settings
from storages.backends.s3boto import S3BotoStorage
import os

os.environ\['S3_USE_SIGV4'\] = 'True'

class StaticStorage(S3BotoStorage):
    host = "s3-%s.amazonaws.com" % settings.AWS_REGION

    @property
    def connection(self):
        if self._connection is None:
            self._connection = self.connection_class(
                self.access_key, self.secret_key,
                calling_format=self.calling_format, host=self.host)
        return self._connection


class MediaStorage(S3BotoStorage):
    location = settings.MEDIAFILES_LOCATION
    host = "s3-%s.amazonaws.com" % settings.AWS_REGION

    @property
    def connection(self):
        if self._connection is None:
            self._connection = self.connection_class(
                self.access_key, self.secret_key,
                calling_format=self.calling_format, host=self.host)
        return self._connection
```

#### 4\. Profit!

Note that when you now run collectstatic (or Heroku does it for you), it will take a while. Collectfast utilizes its own cache, stores md5-sums for the collected files and checks them vs your AWS bucket. I think it took ~10 minutes for our ~3000 files. However, it will store these in the specified cache, and be blazingly fast next time :)
