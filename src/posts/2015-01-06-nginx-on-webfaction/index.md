---
title: "Running Django with nginx (on webfaction)"
date: 2015-01-06
image: 
tags: [apache, django, nginx, rant, webfaction]
author: tomfa
status: publish
---

**Case:** You're using **virtualenv **and have used **apache** with a config somewhat like [this](http://michal.karzynski.pl/blog/2013/09/14/django-in-virtualenv-on-webfactions-apache-with-mod-wsgi/ "this").

### Problem: Apache 'goes to sleep'

Apache caches your wsgi application, and if it's not used within a certain amount of time, it has to reload. And this takes like.. 10-15 seconds. **Solution: **Use nginx instead:

*   Set up a custom application, and install nginx + uwsgi to point to your original application like [this](https://community.webfaction.com/questions/10242/installing-nginx-uwsgi "this").
*   **Potential new problem:** Doesn't find python – Can happen if you've installed the python version manually.
    
    ```
    build_uwsgi.sh: line 41: python3.4: command not found
    ```
    
    **Solution:** specify path to python instead of python version in build\_uwsgi.sh _(you can find it with 'which python3.4' if you're unsure)_
*   **Potential new problem: **Doesn't find application. Can happen if you're using virutalenv. Website responds with:
    
    ```
    uWSGI Error
    Python application not found
    ```
    
    **Solution**: activate virtualenv in wsgi.py like this
    
    ```
    import sys, os
    virtualenv_root = os.path.expanduser('~/webapps/your_app/env')
    activate_this = "%s/bin/activate_this.py" % virtualenv_root
    
    # Python 2
    # execfile(activate_this, dict(__file__=activate_this))
    
    # Python 3
    with open(activate_this) as f:
     code = compile(f.read(), activate_this, 'exec')
     exec(code, dict(__file__=activate_this))
    
    workspace = os.path.expanduser('~/webapps/your_app/your_app')
    sys.path.insert(0,workspace)
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_app.settings')
    
    # Older django
    # import django.core.handlers.wsgi
    # application = django.core.handlers.wsgi.WSGIHandler()
    
    # Django 1.7+
    from django.core.wsgi import get_wsgi_application
    
    # Python 2
    # application = get_wsgi_application()
    
    # Python 3
    from dj_static import Cling
    application = Cling(get_wsgi_application())
    ```
    
*   **Potential disappointment:** nginx was not really faster – if this happens, you've probably not enabled threading support for uwsgi.
*   **Solution: **add the flag --enable-threadingFor more flags, e.g. _\--workers_ to set number of processes spawned, see [uwsgi-docs](http://uwsgi-docs.readthedocs.org/en/latest/Options.html "wsgi docs").
