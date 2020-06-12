---
title: "Mount FTP-server in debian using curlftpfs"
date: 2014-03-03
image: 
tags: [curlftpfs, debian, ftp]
author: tomfa
status: publish
---

#### Mounting remote ftp

The following will mount your remote FTP-location in _/mnt/my\_ftp._ Note that FTP is not secure, and you should combine this with a secure session.

```
sudo curlftpfs -o allow\_other ftp-user:ftp-pass@server\_ip /mnt/my\_ftp/
```

#### Unmounting ftp

You'll probably have to sudo this, depending on who mounted it where.

```
fusermount -u /mnt/my\_ftp\_folder
```
