---
title: 'Git repo on FTP-server'
date: 2014-03-03
image: ./markus-spiske-hL8slYnc-bM-unsplash.jpg
tags: [guide, ftp, git]
author: tomfa
status: publish
---

Often, you have to deal with limited web hotels that only provide a customly made (and usually poor) administration page, FTP- and SQL-access. **How can you, on **a cheap web hotel,** use git without ssh access?** If you're comfortable giving your git-password and ftp-password to a third party, using [deployhq](http://www.deployhq.com) (guide [here](http://code.tutsplus.com/tutorials/how-to-use-git-with-ftp--net-27610)) is a simple and better alternative than the method below.

### Assumptions

Let's call the cheap hotel for _"SimpleHost"_ and your own server/machine for "_MyAwesomeClient"_.

- You have FTP-access to *SimpleHost. *
- You have sudo on _MyAwesomeClient_
- _MyAwesomeClient_ has git

**Incorrect Step-by-step (How you hope it would've been):**

1.  Connect from MyAwesomeClient to SimpleHost with FTP from the command line.
2.  [Mount FTP-server in debian using curlftpfs](http://notes.webutvikling.org/mount-ftp-server-in-debian-using-curlftpfs/)
3.  Use git as normally.

Unfortunately, that's not how it is. You'll get stuff like :

```
fatal: Unable to create temporary file: Operation not supported
```

### **Step-by-step (How it is):**

```bash
git clone https://github.com/git-ftp/git-ftp
cd git-ftp
git tags
git checkout 0.9.0  # Replace this with the newest version
sudo make install
```

You now have git-ftp installed, and can safely remove the folder

```bash
cd ..
rm -rf git-ftp
```

Go to your local repo that you want tracked remotely and initialize it remotely with

```bash
cd my_clean_repo
git ftp init -u [username] -p [password] \
  ftp://server.com/public_html
```

Make changes locally and upload them to the server with

```bash
git ftp push -u [username] -p [password] \
  ftp://server.com/public_html
```

### Limitations

- You can't track changes done on the remote server.
- It is careless with remote files. That is, if a file that is tracked in the local repository is changed on the remote server AND the local server, git ftp will overwrite it without warning.
- The two above is important to have in mind when collaborating with others.

### Worth mentioning

- You can set default ftp paths and login info. See [git ftp man page](https://github.com/git-ftp/git-ftp/blob/develop/man/git-ftp.1.md)
- You can use sftp, ftps, ftpes as well.
- You can skip specifying password in the command line, and will then be prompted instead.
