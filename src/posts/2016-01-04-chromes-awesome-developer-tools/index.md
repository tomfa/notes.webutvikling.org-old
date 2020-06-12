---
title: "Chromes Awesome Developer Tools"
date: 2016-01-04
image: 
tags: [chrome, css, developer tools, frontend, js]
author: tomfa
status: publish
---

Here is a [great talk](http://www.ndcvideos.com/#/app/video/3371) about them Chrome tools.

1.  You can emulate reduced network speed
2.  You can emulate other device
3.  You can force states (:active etc) for elements
4.  You can smartprint objects
5.  You can group console logging
6.  You can time sections of the code or timestamp all logging
7.  You can insert debugger stops `debugger;`
8.  You can ask your testers to "Save as HAR with content" so you can see the errors for yourself as the developer.

But there's a whole lot more. So take this [free course at codeschool.](http://discover-devtools.codeschool.com/) It's suitable for people who have never used it, **and** it's suitable for people who have used it for years, but never taken a proper dive in it.

Some very few notes:
--------------------

*   async scripts allow you to render the page before scripts are downloaded
    *   ```
        <script async src="heavyscript.js"></script>
        ```
        
*   [Google PageSpeed](https://developers.google.com/speed/pagespeed/?hl=en) look quite useful.
    *   Automatic [Nginx and apache modules](https://developers.google.com/speed/pagespeed/module/)
    *   Analyze your page with [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
*   Profiler allows you to see the framerate of your javascript rendering
*   You can map the source files to your local filesystem, and edit directly through dev tools.
