---
title: "Export data from one Django to another over ssh"
date: 2015-10-18
image: ./steinar-engeland-_2G4EeyeoeA-unsplash.jpg
tags: [database, django, loaddata, readdata]
author: tomfa
status: publish
---

Sometimes I clone a repository with Django and make a setup of the environment on my own machine. Then I would usually like to have some testdata populated in my environment. So here's how to copy the data from one Django installation (production) to my environment (test). 1. ssh to the remote server

```bash
ssh username@hostname
```

2\. Navigate to the folder

```
cd /path/to/remote/django 
```

3\. Extract data to **db.json**

```
python manage.py dumpdata db.json
```

4\. Open a **local** terminal and copy down the file

```
 scp username@hostname:/path/to/remote/django/db.json /path/to/local/django/db.json 
```

5\. Navigate to the folder locally

```
 cd /path/to/local/django/ 
```

6\. Import the data from the file

```
python manage.py loaddata db.json 
```

Source: [this guide](https://coderwall.com/p/mvsoyg/django-dumpdata-and-loaddata)
