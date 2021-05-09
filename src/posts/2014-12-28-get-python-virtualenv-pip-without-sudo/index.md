---
title: "Get python, pip, virtualenv without sudo"
date: 2014-12-28
image: ./david-clode-cxMJYcuCLEA-unsplash.jpg
tags: ["guide", python, sudo, vps]
author: tomfa
status: publish
---

### Case

> I don't have sudo and life is awful on a cheap server / VPS. There is no python, or the wrong python version. How do I run my project?

### Step 1: Get your desired python version

**Python 2.7**

```bash
cd
mkdir python
cd python
mkdir src
cd src
wget http://www.python.org/ftp/python/2.7.3/Python-2.7.3.tgz
tar xvfz Python-2.7.3.tgz
cd Python-2.7.3
mkdir ~/python/python27
./configure -prefix=/home/username/python/python27
make
make install
cd
echo "export PATH=$HOME/python/python27/bin" >> .bashrc
source .bashrc
```

> Bam, you got python without sudo!

### Step 2: Get pip

```bash
cd ~/python
wget http://pypi.python.org/packages/source/s/setuptools/setuptools-0.6c11.tar.gz --no-check-certificate
tar xvfz setuptools-0.6c11.tar.gz
cd setuptools-0.6c11
python setup.py install
cd ..
wget http://pypi.python.org/packages/source/p/pip/pip-1.1.tar.gz --no-check-certificate
tar xvfz pip-1.1.tar.gz
cd pip-1.1
python setup.py install
cd 
```

> Bam, you got python package manager without sudo!

### Step 3: Get virtualenv

```bash
pip install virtualenv
pip install virtualenvwrapper

```

### Done (sort of)

You should now have python2.7 with pip and virtualenvwrapper without having 
had sudo! Awesomesauce!

Now you might have to set up some path pointers to this python instance when
you set up new projects on the serfver

### Project Step 1: Get your project

```bash
git clone ...  # Whatever project you're doing
cd <projectname>
virtualenv --distribute env
source env/bin/activate
pip install -r requirements.txt
```

### Project Step 2: Deploy

*   Go to your public-folder
*   make a fcgi-file with the following content:

```python
#!/home/username/myproject/env/bin/python
import sys, os
 
# Add a custom Python path.
sys.path.insert(0, "/home/username/projectname/env")
sys.path.insert(13, "/home/username/project")
os.environ['DJANGO_SETTINGS_MODULE'] = 'mydjangoproject.settings'

from django.core.servers.fastcgi import runfastcgi
runfastcgi(method="threaded", daemonize="false")
```

*   write the file and set permissions: `chmod 755 projectname.fcgi`
*   `vim .htaccess` with the following content:

```
AddHandler fcgid-script .fcgi
RewriteEngine On
RewriteCond %{REQUEST\_FILENAME} !-f
RewriteRule ^(.\*)$ projectname.fcgi/$1 \[QSA,L\]
```

### Step 6: Settings

This you know best self. You probably want to edit the django setting file or something :) 

- [http://www.nyayapati.com/srao/2012/08/setup-python-2-7-and-django-1-4-on-bluehost/](http://www.nyayapati.com/srao/2012/08/setup-python-2-7-and-django-1-4-on-bluehost/)
- [http://simplyargh.blogspot.com/2012/04/python-27-django-14-on-bluehost.html](http://simplyargh.blogspot.com/2012/04/python-27-django-14-on-bluehost.html) 

***

_PS: Don't go hosting on Bluehost. Try Webfaction or Heroku: Then you'll never have to run into this problem._
_EDIT PS: Don't deal with servers. Deploy directly to a PAAS_
