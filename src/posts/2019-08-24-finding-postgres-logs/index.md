---
title: "Where is my PostgreSQL logs?"
date: 2019-08-24
tags: ["guide", "postgres"]
author: tomfa
image: ./kayla-farmer-nhi3_11E6zM-unsplash.jpg
imageAlt: "Photo by @imagesbykayla at Unsplash"
status: publish
---

Here's how to find the location of the postgres logs on my machine, setting them to logging _everything_, and watching it's output.


## 1. Finding postgres log location

_(Personal TLDR: try `/usr/local/var/log/postgres.log` or `/opt/homebrew/var/log/postgres.log`)_

You can query your database settings to see where logs are stored.
- Open psql shell as superuser with `psql`.
- (Optionally) connect to database with `\c mydb`

Display log directory with ```sql
select setting from pg_settings where name ='log_directory';
 setting
---------
 log
```

It may return an absolute path (like `/usr/local/var/log`), or a relative path like `log` above.
In the case of a relative path, it's from the data directory. You can find the data directory with 

```sql
SHOW data_directory;
    data_directory
-------------------------
/usr/local/var/postgres
```

The log is then located in `/usr/local/var/log/postgres.log`.

## 2. Logging everything
_Note: this is not a great idea in unless you're debugging locally. It'll punish your performance_.

You can see the last logs with `tail /usr/local/var/log/postgres.log`

By default, only errors are logged here. To turn on logging every query, find your config file.

```sql
psql
> SHOW data_directory;
>     data_directory
> -------------------------
> /usr/local/var/postgres
```

Your config file is then in `/usr/local/var/postgres/postgres.conf`.
Here, set
```
log_statement = 'all'
```

And restart your postgres with `pg_ctl reload` (or `brew services restart postgresql`).

## 3. Watch new logs

```bash
# log location from step 1
tail -f /usr/local/var/log/postgres.log
```
