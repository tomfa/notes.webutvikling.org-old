---
title: "bash backup of webserver (FTP and SQL)"
date: 2014-04-02
image: 
tags: [backup, bash, ftp, script, sql, webserver]
author: tomfa
status: publish
---

Quick and dirty backup from remote SQL and FTP server
-----------------------------------------------------

### Introduction

The following is a quick and dirty, simple implementation of a backup from mysql-db and ftp-available file area that . It uses git (though this is not really how git ought to be used), and transfers files securely, but not the database-dump. In other words, it got lots of potential for improvements.

### Dependencies

*    lftp
*   mysqldump
*   git

### The Code

```
#!/bin/bash

# START CONFIG
LOCAL\_DIR="/home/user/backup/yourpath" # The local directory  
FTP\_USR="ftp\_username"                 # FTP user
FTP\_PWD="ftp\_password"                 # FTP password
FTP\_HOST="ftp.server.com"              # FTP host
FTP\_FOLDER="remote\_folder"             # Folder on remote host
USING\_SFTP=true                        # Use SFTP?
SQL\_USR="sql\_user"                     # SQL username
SQL\_PWD="sql\_password"                 # SQL password
SQL\_DUMP\_LOC="local\_file.sql"          # name of SQL-dump file
SQL\_HOST="sql.server.com"              # SQL host
DB\_NAME="database\_name"                # Name of database
DATE=\`date +%Y-%m-%d\`                  # Date format
# END CONFIG

cd $LOCAL\_DIR

if \[ "$USING\_SFTP" = true \] ; then
 echo "Copying files through sftp..."
 lftp sftp://$FTP\_USR:$FTP\_PWD@$FTP\_HOST -e "cd $FTP\_FOLDER; mirror --only-newer; quit"2>ftp\_log.txt
else
 echo "Copying files through unsecure ftp..."
 wget -mN ftp://$FTP\_USR:$FTP\_PWD@$FTP\_HOST/$FTP\_FOLDER 2>ftp\_log.txt
fi

echo "Copying database unsecurely..."
mysqldump -h $SQL\_HOST -u $SQL\_USR -p$SQL\_PWD $DB\_NAME > $DATE.SQL\_DUMP\_LOC

echo "Committing..."
git add .
git commit -m "Scheduled backup $DATE"

```

### Scheduling

See [cron-tabs](http://notes.webutvikling.org/cron-tabs/ "Cron tabs: create and delete") on how to set up this file to run every hour/day/week/month.
