---
title: "curl headers only"
date: 2015-12-13
image: 
tags: [AWS, curl, unix]
author: tomfa
status: publish
---

```
How to grep only the response headers
```

****Show headers response****

```
curl -X HEAD -i [https://news.ycombinator.com/](https://news.ycombinator.com/)
```

****Show headers response** as if you ask from google.com**

```
curl -X HEAD -i -H "Origin: http://google.com" [https://news.ycombinator.com](https://news.ycombinator.com)
```

    **Show headers response with google.com origin on an s3 bucket**

```
curl -X HEAD -i -H "Origin: http://google.com" https://s3-eu-west-1.amazonaws.com/your-bucket/yourfile.woff
```
