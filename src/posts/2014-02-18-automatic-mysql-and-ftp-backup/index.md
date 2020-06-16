---
title: "Automatic MySQL and FTP backup"
date: 2014-02-18
image: ./markus-spiske-5yEiCUynJ9w-unsplash.jpg
tags: [backup, ftp, mysql]
author: tomfa
status: publish
---

Want to backup
--------------

**Case:** I have a Wordpress page that stores stuff in MySQL database. I want to schedule a backup of the page, so that I am able to restore the page even if the file area is blanked out and the database has mysteriously disappeared. I want the schedule to run, say, every night and without having to do any manual work. **In short: I want to backup a MySQL table and FTP file area from a remote server.**

Solutions
---------

### Solution #1: Mover

[Mover](https://mover.io/ "Mover") is a web application that has a very sleek interface. It's.. sweet. Simple. The transitions alone make me happy.  Water is running in my mouth. I wanted this  before I knew what it was. You simply select a source, a destination and (if you want) set up a schedule for it to be run. The source and destination nodes (called Connectors) can be SFTP, FTP, MySQL, Dropbox, Google Drive and more. **It costs money.** A basic account gives 10 GB of free "try-out" transfer, and costs 1$ for every GB after that. For large consumers, it probably has cheaper pricing models. This might say itself, but in order for Mover to schedule a transfer of your files, **you'll have to provide them with the login information** for the connectors you use. And I'm not very keen giving away database, Dropbox and Google passwords.

### **Solution #2: Backing up MySQL with automysqlbackup**

[AutoMySQLbackup](http://sourceforge.net/projects/automysqlbackup/) is a very decent script. It allows you to do automatic mysql-backups, even with email notification if that's your thing. It can even **even** send you the sql-backup as an attached file in the e-mail.

#### Setup automysqlbackup

1.  Download it.
2.  Navigate to the downloaded folder
    
    ```bash
    cd "automysql-folder"
    ```
    
3.  Copy automysqlbackup.conf (the template) to myserver.con
    
    ```bash
    cp automysqlbackup.conf myserver.conf
    ```
    
4.  In myserver.conf (the config file for your backup), change:
    
    ```bash
    # Your MySQL username
    CONFIG_mysql_dump_username='username'
    
    # Your MySQL password
    CONFIG_mysql_dump_password='password'
    
    # IP or DNS of MySQL server 
    # (e.g. localhost if it's the same machine)
    CONFIG_mysql_dump_host='name.serverpark.com'
    
    # Where to store the backup (locally)
    CONFIG_backup_dir='/home/username/sqlbackups'
    ```
    

Now you're good to go running your first backup!

##### Only back up certain databases

In order to only back up certain databases, specify them in the CONFIG_db_names.

```bash
CONFIG_db_names=( 'table_name1' 'table_name2' )
```

#### Running one backup

1.  After you've setup automysqlbackup, you just run automysqlbackup with your config file as parameter
    
    ```
    ./automysqlbackup '/path/config/myserver.conf'
    ```
    

Now the backup should be stored within the path you located in CONFIG\_backup\_dir in the previous step.

#### Setting up e-mail

This step will make the script send you an e-mail when it's run.

*   In the config file, navigate to Navigation Setup section, and change:
    
    ```bash
    # Email Address to send mail to? (user@domain.com)
    CONFIG_mail_address='youremail@example.com'
    ```
    
*   And mailcontent to log (send log to e-mail) or files (also include the actual backup)
*   ```bash
    # What would you like to be mailed to you?
    # - log   : send only log file
    # - files : send log file and sql files as attachments (see docs)
    # - stdout : will simply output the log to the screen if run manually.
    # - quiet : Only send logs if an error occurs to the MAILADDR.
    CONFIG_mailcontent='log'
    ```
    

#### Running automysqlbackup regulary

[Set up crontab](http://notes.webutvikling.org/cron-tabs/ "Cron tabs: create and delete") to run the script with parameters for daily at 2AM:

```
crontab -e
```

Where you add

```
0 2 * * * /scriptpath/automysqlbackup '/configpath/myserver.conf'
```

#### Restoring a backup sql file

In [Sequel Pro](http://www.sequelpro.com/) (what a nice program), you can simply connect to the database and click File > Import and upload the .sql file that you backed up. There is probably an as-easy way to do this from the command line, but honestly... I can't be bothered figuring that out before the need for it occurs.
