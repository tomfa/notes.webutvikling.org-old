---
title: "Write content-independent instead of semantic CSS"
date: 2017-03-29
image: ./Screen-Shot-2017-03-29-at-23.17.34.png
tags: ["learning", "statement", css]
author: tomfa
status: publish
---

Say you have a search form in the top right corner of your website, that looks 
something like the picture below. What should be the class name of a component? 

![header-search](./header-search.png) 

If you use semantic classes, you could name it something like "search" or even 
"header-search", because it is **how** it's used. 

If you use content-independent classes, you might call it "tiny-form", because 
that's **what** it is.  

#### Which name make you more likely to reuse the css class?

Say you're about to create a feature that allows users to input their phone 
number, and be sent a one-time verification code. Which class name would make 
you more inclined to reuse its css?

- "header-search"
- "tiny-form"

> The most reusable components are those with class names that are independent of the content. – Nicolas Gallagar's [About HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/).

**CSS classnames are not used for semantics** by crawlers, users or accessibility software. 
They are only used by developer trying to understand/change frontend code. 
Frontend developers do not need css class names to comprehend the semantic of an element. 
This is already accomplished by other means: HTML tag names or the name of the class/component that renders this html. 
CSS classes are for developers, and we use classes for attaching js-interactivity or styling purposes. 
Take for instance a look at the class names of [Bootstrap](http://getbootstrap.com/) and [Foundation](http://foundation.zurb.com/).

```
.col-md-4 .text-capitalize .table-striped 
.button-danger .btn-lg .disabled .img-circle 
.button-primary .checkbox-inline
```

These are all content independent class names, i.e. describe **what they are**, rather than the how they're used. 

> Well, of course they are. Bootstrap is suppose to be used across any web application, 
> independent of what sort of content it contains. 
> Semantic names never works without knowing what you're building.
> – You, just now.

Valid point, and this type of naming is what enables their reusability, 
consistency and readability! 

And isn't really our own little *Mini-Bootstrap* 
exactly what we want from our css? That can be reused in new components and 
projects with totally new concepts? I think it is!
