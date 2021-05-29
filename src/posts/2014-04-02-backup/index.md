---
title: 'bash backup of webserver (FTP and SQL)'
date: 2014-04-02
image: ./jc-gellidon-56eqH9opaUU-unsplash.jpg
tags: [guide, backup, bash, ftp, script, sql, webserver]
author: tomfa
status: publish
---

## Quick and dirty backup from remote SQL and FTP server

### Introduction

The following is a quick and dirty, simple implementation of a backup from mysql-db and ftp-available file area that . It uses git (though this is not really how git ought to be used), and transfers files securely, but not the database-dump. In other words, it got lots of potential for improvements.

### Dependencies

- lftp
- mysqldump
- git

### The Code

```bash
#!/bin/bash

# START CONFIG
# The local directory
LOCAL_DIR="/home/user/backup/yourpath"

# FTP user
FTP_USR="ftp_username"

# FTP password
FTP_PWD="ftp_password"

# FTP host
FTP_HOST="ftp.server.com"

# Folder on remote host
FTP_FOLDER="remote_folder"

# Use SFTP?
USING_SFTP=true

# SQL username
SQL_USR="sql_user"

# SQL password
SQL_PWD="sql_password"

# name of SQL-dump file
SQL_DUMP_LOC="local_file.sql"

# SQL host
SQL_HOST="sql.server.com"

# Name of database
DB_NAME="database_name"

# Date format
DATE=`date +%Y-%m-%d`

# END CONFIG

cd $LOCAL_DIR

if [ "$USING_SFTP" = true ] ; then
 echo "Copying files through sftp..."
 lftp sftp://$FTP_USR:$FTP_PWD@$FTP_HOST -e "cd $FTP_FOLDER; mirror --only-newer; quit"2>ftp_log.txt
else
 echo "Copying files through unsecure ftp..."
 wget -mN ftp://$FTP_USR:$FTP_PWD@$FTP_HOST/$FTP_FOLDER 2>ftp_log.txt
fi

echo "Copying database unsecurely..."
mysqldump -h $SQL_HOST -u $SQL_USR -p $SQL_PWD $DB_NAME > $DATE.SQL_DUMP_LOC

echo "Committing..."
git add .
git commit -m "Scheduled backup $DATE"

```

### Scheduling

See [cron-tabs](http://notes.webutvikling.org/cron-tabs/ 'Cron tabs: create and delete') on how to set up this file to run every hour/day/week/month.
