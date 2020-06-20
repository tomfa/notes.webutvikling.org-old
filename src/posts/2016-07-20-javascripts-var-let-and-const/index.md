---
title: "Javascripts var, let, and const"
date: 2016-07-20
image: ./es6.jpg
tags: [const, es6, javascript, let, var]
author: tomfa
status: publish
---

Remember var from the ES5 and previously? It had this weird thing, where JavaScript would move the declaration to the top of the **function **behind the scenes, called [hoisting](https://www.google.no/#q=javascript%20hoisting). Usually no one noticed, but once in a while it would create a bug that could be hard to spot.

### **So what's the thing with ES6 variables?**

*   **"var" still exists**, but is rarely of any use. You can use it when a function needs to refer itself.

*   **"let" is like "var" without hoisting. **Basically like a normal variable in most other languages.

*   **"const" is like "let", but is read-only.  **If a variable shouldn't be reassigned later, it's good practice to use this.

### So what should I use?

Think about it, then use what suits your needs. Not an easy answer? How about: **Always use const, and then change it to let when your realise you have to reassign some value to it. And  change to var when you realize you need to refer to yourself (e.g. in recursive functions).**

### I don't understand, tell me more about these "variables" you speak of

[Do level 1 (it's free) on codeschool.](https://www.codeschool.com/courses/es2015-the-shape-of-javascript-to-come)
