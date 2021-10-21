---
title: "Don't convert SVG to PNG with browser Javascript"
date: 2016-07-20
image: ./polaroid.jpg
tags: ['statement', convert, java, javascript, png, svg]
author: tomfa
status: publish
---

I promise I tried to do it with client-side Javascript only. And I promise I won't try again before 2020. Google returns so many optimistic answers, that on the bottom has a disclaimer: "This does not work with Safari", or "This crashes IE9", or just no disclaimer. But don't believe them: **It can't be done. JUST FORGET IT. **It's like adjusting your HTML newsletter to look good in all versions of Outlook. It'll just make you kill yourself. Instead, do it server side: With JavaScript and Node you can rely on [PhantomJS to convert it consistently](https://www.npmjs.com/package/svg2png), or with Java you can use [org.apache.batik.transcoder](https://xmlgraphics.apache.org/batik/using/transcoder.html). [**GIST: Java server side converting svg to svg/png file using batik.**](https://gist.github.com/tomfa/272c481edcad14b853d0a9f103c148c6)
