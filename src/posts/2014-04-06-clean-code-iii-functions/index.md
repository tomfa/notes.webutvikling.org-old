---
title: "Clean Code III: Functions"
date: 2014-04-06
image: 
tags: [clean code, video]
author: tomfa
status: publish
---

_This post is an my interpretation of the teachings in [Robert C. Martins Clean Code III: Functions](http://vimeo.com/12643301)._

Functions should do one thing
-----------------------------

You can tell that a function is doing more than one thing if you can extract a function from it with a meaningful name that is not merely a restatement of its implementation.

Make functions at one abstraction level
---------------------------------------

Don't jump between abstract method calls and string operations in the same function. That would be a sign that you should refactor out  some parts in the function.

Return a value, OR change a state
---------------------------------

**EITHER **your function returns a value **OR **it does something. This might not always be possible to make it so, but atleast **TRY. **The example Roberts mentions a method that is called checkPassword og something, and also happens to initialize a session (which would be applicable the first time, but break stuff later). Return a value OR do something.

Functions should be less than 20 lines
--------------------------------------

Long functions are hard to read. If they're more than 20 lines, they probably are doing more than one thing.

Use descriptive function names
------------------------------

Don't be afraid to use long function names. Don't be afraid to use some time coming up with it. It's so important for the readability.

Use no more than 3 arguments
----------------------------

The ideal number of arguments is zero. A function that has zero arguments is really easy to understand. If you have 4 variables that are so cohesive that they can be passed as a unit into a function, you have a structure. You're probably going to use the same set of variables in other functions, don't you think?

Don't use comments
------------------

Comments are bad. They are an excuse not to refactor out a function. They are a confession that the code that has been written isn't understandable in itself. Instead, write properly! And by the love of God, don't comment out code. You're making a mess. The code you're about to comment is in the source control. Don't worry about it.
