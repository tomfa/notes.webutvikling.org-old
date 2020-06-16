---
title: "Track custom events with google analytics"
date: 2014-02-04
image: ./isaac-smith-6EnTPvPPL6I-unsplash.jpg
imageAlt: Hand drawn graph
tags: [ga]
author: tomfa
status: publish
---

Requirements:
-------------

*   You have an existing google analytics account
*   You have a webpage to track events with

How:
----

_Edit: If you're on ES6 with webpack or similar, checkout this [Github Gist](https://gist.github.com/tomfa/fc334a7e69f6289d81168b31ebe76735) instead._

### 1\. You include google analytics in your page

```js
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

// Replace UA-XXXXXXX-X with your google analytics user key 
ga('create', 'UA-XXXXXXX-X', 'ntnu.no'); 

ga('send', 'pageview');
ga('set', 'anonymizeIp', true);
```

### 2\. You set up custom tracking

```js
var _gaq = _gaq || []; 

// Replace UA-XXXXXXX-X with your google analytics user key 
_gaq.push(['_setAccount', 'UA-XXXXXXXX-X']); 

_gaq.push(['_trackPageview']); 

(function() { 
    var ga = document.createElement('script'); 
    ga.type = 'text/javascript'; 
    ga.async = true; 
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; 
    
    var s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(ga, s); 
})();
```


### 3\. You call the events when you want them tracked

```js
function trackFrontpageOutboundLink(
  Category, Action, Value
) { 
  _gaq.push([
    '_trackEvent',
    Category, 
    Action, 
    Value
  ); 
}
```` 
Category, Action, and Value are just labels that you are free to use as you please. 
Some structure is probably nice.
