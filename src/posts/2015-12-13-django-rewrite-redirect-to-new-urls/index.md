---
title: "django rewrite / redirect to new urls"
date: 2015-12-13
image: ./nick-fewings-zF_pTLx_Dkg-unsplash.jpg
tags: [django, redirect, rewrite, urls]
author: tomfa
status: publish
---

I changed the MEDIA_URL and STATIC_URL, but wanted the previously used urls "/media/" and "/static/" to rewrite to the new url. It would better be done via your DNS settings, or with an .htaccess file, but can also be done via **urls.py **if your circumstances don't allow the other two.

```python
from django.conf import settings
from django.views.generic.base import RedirectView

[...]

if settings.MEDIA_URL != "/media/":
    urlpatterns += url(
        r'^media/(?P<path>.\*), 
        RedirectView.as_view(
            url=settings.MEDIA_URL + '%(path)s', 
            permanent=True
        ), 
        name='cloud-media'
    )

if settings.STATIC_URL != "/static/":
    urlpatterns += url(
        r'^static/(?P<path>.\*), 
        RedirectView.as_view(
            url=settings.STATIC_URL + '%(path)s', permanent=True
        ), 
        name='cloud-static'
    )
```
