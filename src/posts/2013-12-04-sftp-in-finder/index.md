---
title: "SFTP in Finder"
date: 2013-12-04
image: ./rodrigo-abreu-lq9PxpwDZUk-unsplash.jpg
tags: [Finder, ftp]
author: tomfa
status: publish
---

OK, so here's the thing. I use a Mac and I edit files located on a server somewhere on the Internet. I want to have the files and folders on that server mounted in Finder, so I can easily navigate and edit those files without having to up- and download files manually. Since I don't want everyone listening to be able to read my files, I can't use AFP, SMB or similar. I need something secure.  **I need to mount a SFTP volume through Macs native Finder.** That this isn't supported  natively by OS X is somewhat odd to me, but I accept that from time to time I need a third party program. So what programs are there?

*   [MacFUSE](http://code.google.com/p/macfuse/) exists. However, it's out of development since 2008, and now is shit.
*   [FUSE for OSX](http://osxfuse.github.io/) does the trick. However,  it's so slow I almost cry.
*   [Transmit](https://www.panic.com/transmit/) does the trick. It even works at a decent speed. But it costs 34$. Bah.
*   [ExpanDrive](http://www.expandrive.com/expandrive) also does the trick.  But it costs 39.95$.
*   [ForkLift](http://www.binarynights.com/) is a cheaper alternative at 19.99$. It has some other neat tricks as well.

### There is nothing free

At least that's what my three hours of Googling and checking out things led to. The best solution is to buy a third party software, and then you'll have to use that software in order to Mount into Finder. **That's right. There is no easily obtainable, free, SFTP read/write way directly from Finder.** From my gut feel, Transmit is slightly faster and more user friendly than both ExpanDrive and ForkLift, though Forklift might have some other features that you like. It's cheaper as well. Take your pick.

### The git solution

First of all, this is just a workaround, and not a proper solution to SFTP through Finder, BUT... If you so happen to almost always need SFTP through Finder for a Github project, you could setup the solution locally, and make your remote server pull automatically on commit through [Post-Receive hooks](https://help.github.com/articles/post-receive-hooks).

***

_Sidenote: Not sure about the image relevance... SFTP is like the trailer of file transport?_