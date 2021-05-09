---
title: "pip on python3: Can't decompress data; zlib not available"
date: 2014-12-08
image: ./sebastian-herrmann-jzTQVxCyKYs-unsplash.jpg
tags: ["debugging", pip, python, python3, virtualenv]
author: tomfa
status: publish
---

Getting pip3.4 to work
----------------------

Want Python3.4 on your debian with virtualenv and pip? That's what I wanted. However, I didn't get pip automatically, and when I tried to install it, python gave me

### "Can't decompress data; zlib not available"

Spent a whole lot of time on this. Seems like installing 3.4 properly (with --with-zlib parameter when configuring) makes your life easier. 

**Step 1) Install [Python3.4](https://www.python.org/downloads/release/python-342/)**

```bash
wget https://www.python.org/ftp/python/3.4.2/Python-3.4.2.tgz
tar -xvf Python-3.4.2.tgz
cd Python-3.4.2
./configure --with-zlib
sudo make
sudo make install
```

You should now have pip3.4, yes? and pyvenv-3.4? Good. 

**Step 2) make the virtualenv and activate it** 

Oh, yes. Python 3.4 comes with a virtualenv. It's called pyvenv. It works like it used to (except no --distribute flag)

```bash
pyvenv env
source env/bin/activate
```
