---
title: 'curl headers only'
date: 2015-12-13
image: ./viktor-talashuk-bhoj9tHlsiY-unsplash.jpg
tags: ['guide', aws, curl, unix]
author: tomfa
status: publish
---

How to grep only the response headers

**Show headers response**

```bash
curl --head -i https://google.com

# HTTP/2 301
# retry-after: 0
# location: https://www.reddit.com/
# accept-ranges: bytes
# date: Sun, 21 Jun 2020 18:24:47 GMT
# via: 1.1 varnish
# x-served-by: cache-osl6520-OSL
# x-cache: HIT
# x-cache-hits: 0
# x-timer: S1592763887.014756,VS0,VE0
# cache-control: private, max-age=3600
# strict-transport-security: max-age=15552000; includeSubDomains; preload
# server: snooserv
# content-length: 0
```

**Show headers response** as if you ask from google.com

This might be useful when debugging CORS errors.

```bash
curl -H "Origin: http://google.com" --head https://reddit.com

# HTTP/2 301
# retry-after: 0
# location: https://www.reddit.com/
# accept-ranges: bytes
# date: Sun, 21 Jun 2020 18:23:58 GMT
# via: 1.1 varnish
# x-served-by: cache-osl6524-OSL
# x-cache: HIT
# x-cache-hits: 0
# x-timer: S1592763839.825368,VS0,VE0
# cache-control: private, max-age=3600
# strict-transport-security: max-age=15552000; includeSubDomains; preload
# server: snooserv
# content-length: 0
```
