---
title: "Profiling JavaScript in Chrome Developer Tools"
date: 2016-01-04
image: ./christian-englmeier-J7EUjSlNQtg-unsplash.jpg
tags: ["guide", chrome, devtools, javascript, profiling]
author: tomfa
status: publish
---

1.  Open devtools
2.  Select **Profiles**
3.  Select **Collect JavaScript CPU Profile**
4.  Click **Start**
5.  Do the (typically slow) things you wish to record
6.  Click **Stop**

You now got a table of functions, and CPU time they consumed. On the right hand side of the table, you got a link to the js file and its line number of the function that is responsible for this. You can click them to open the files in the Sources tab. 

***

Check out this chapter in CodeSchools awesome Devtools lesson for more on this topic: [http://discover-devtools.codeschool.com/chapters/6/](http://discover-devtools.codeschool.com/chapters/6/)
