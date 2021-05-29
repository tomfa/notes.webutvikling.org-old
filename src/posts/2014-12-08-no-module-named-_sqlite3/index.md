---
title: "No module named '_sqlite3'"
date: 2014-12-08
image: ./tim-gouw-1K9T5YiZ2WU-unsplash.jpg
tags: ['debugging', django, python, python3, sqlite]
author: tomfa
status: publish
---

## TLDR

Exception kept happening on a debian server.
I fixed it with:

```bash
sudo apt-get install python-dev
sudo apt-get install libsqlite3-dev
```

And recompile python ([see own post](http://notes.webutvikling.org/darn-installation-of-python-3-4/ 'Darn installation of Python 3.4'))

## Long version

So, I was starting a django app (1.7.1 with Python 3.4),

```
python manage.py migrate
```

when i encountered

```bash
django.core.exceptions.ImproperlyConfigured:
Error loading either pysqlite2 or sqlite3 modules (tried in that order):
No module named '\_sqlite3'
```

Did not expect this. I have heard rumers that sqlite3 has been included with python for quite some time. But OK. Let's install it

```
pip3.4 install pysqlite
```

That should fix it, yep? Nope.

```ex
File "/home/tomas/optimaltrener/env/build/pysqlite/setup.py", line 85

print "Is sphinx installed? If not, try 'sudo easy_install sphinx'."
```

So the pysqlite does not support Python3+ (since its using that old syntax)? huh. Googling around said Python3+ (and earlier) should already be delivered with an appropriate sqlite3. But that didn't seem to do it. But i found [this](http://stackoverflow.com/questions/26208328/tango-with-django-no-module-named-sqlite3) and [this](http://stackoverflow.com/questions/12572038/whats-wrong-why-python-manage-py-runserver-failed), which lead me to

```bash
sudo apt-get install libsqlite3-dev
sudo apt-get install python-dev
```

Followed by recompiling python3.4 ([see own post](http://notes.webutvikling.org/darn-installation-of-python-3-4/ 'Darn installation of Python 3.4')), which fixed everything.

Finally :D
