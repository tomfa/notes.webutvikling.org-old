---
title: "React intro notes"
date: 2016-07-04
image: ./react.png
tags: [es6, react, redux]
author: tomfa
status: publish
---

A handful notes from the React intro tutorial (which is available at https://facebook.github.io/react/docs/tutorial.html).

*   A components **render** method is called **when its state changes**
*   A components **getInitialState** method is called **once, when the component is setup**
*   A components **componentDidMount** method is called **once, after** the component is rendered for the first time    

Oh, wait. They're actually all [here...](https://facebook.github.io/react/docs/component-specs.html) 

### I'll talk about something else then: 

**Learning React & Redux is hard.** 

- It breaks conventions, so nothing you thought you knew about JavaScript do you any good. 
- It's going to be a hard transition, especially if you only knew ES5. Because there's so much (delicious) syntactic sugar in ES6.
- It's going to be hard to distinguish ES6-magic from JSX-magic from React-magic. 
- And when you throw Redux in the mix, it's all of a sudden not only magic, but weird. And clean. And clumsy. At the same time. Good luck. Help can be given at:

*   [Codeschool - ES6 course](https://www.codeschool.com/courses/es2015-the-shape-of-javascript-to-come)
*   [Codeschool - React course](https://www.codeschool.com/courses/powering-up-with-react)
*   [Learn Redux](https://learnredux.com/)
*   Creating your own project. Always a good idea! Start with the [link](https://facebook.github.io/react/docs/tutorial.html) in the intro.
