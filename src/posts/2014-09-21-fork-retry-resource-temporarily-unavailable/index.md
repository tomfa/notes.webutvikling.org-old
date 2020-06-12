---
title: "fork: retry: Resource temporarily unavailable"
date: 2014-09-21
image: 
tags: [unix, webfaction]
author: tomfa
status: publish
---

I got this error on webfaction. Seems it was do to too many open files (file descriptors). Edit: Which is not really my fault, since I'm on a shared server... which is mostly because I'm cheap. So it IS kind of my fault. Anyhow..

How do I check max allow amounts of file descriptors?
-----------------------------------------------------

```
ulimit -Hn
```

How do I check the number of current file descriptors?
------------------------------------------------------

```
sudo lsof -u <username> 2>/dev/null | wc -l 
```

or

```
lsof 2>/dev/null | wc -l
```

The latter showing my current user's number of file descriptors. If my current amount of FD is greater than my allowed number of FD, I have to kill some of my processes.

How do I find my currently running processses?
----------------------------------------------

```
lsof -i
```

This will show a list where PID (Process ID) is a column

How do I find FD belonging to a PID (Process ID)?
-------------------------------------------------

```
lsof | grep 123456
```

123456 being the process ID. This will show some addition information which should allow you to indentify what the process is actually running.

How do I kill processes?
------------------------

```
kill -9 123456
```

123456 being the process ID.

How do I fix fork: retry: Resource temporarily unavailable?
-----------------------------------------------------------

Do the above steps. source: [stackoverflow, the greatest webpage of all time]( http://stackoverflow.com/questions/12079087/fork-retry-resource-temporarily-unavailable)
