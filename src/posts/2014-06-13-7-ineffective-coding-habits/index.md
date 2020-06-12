---
title: "7 ineffective coding habits"
date: 2014-06-13
image: 
tags: [clean code, video]
author: tomfa
status: publish
---

_Notes from [Seven Ineffective Coding Habits of Many Programmers by Kevlin Henney](https://vimeo.com/97329157)_

1\. We clutter our code (with comments)
---------------------------------------

Comments are ignored by the compiler. They are also ignored by programmers. So who's the audience? Reading comments is like a sign of defeat, so it might be useful if your code is uncomprehensable in the first place. But then, if you can't express yourself clearly in code, why do you think you're able to do so with words?

> A common fallacy is to assume authors of incomprehensible code will somehow be able to express themselves lucidly and clearly in comments.

2. We write off the line
------------------------

**Your code shouldn't be longer than 80 lines.** Don't make people scroll horizontally to read your stuff (or even worse, not recognize that there's hidden code off the screen). Have you not thought about this those times where you show code on a projector? Or that a programmer with a large screen might only want to use half of his screen for your code, and the other half for something else?. Come on. Be nice.

3\. Parameters are placed all over the place
--------------------------------------------

**Gather your parameters on the screen.** Don't go

```
public void method(int firstArg,
    int secondArg)

or

public void method(int firstArg,
                   int secondArg)
```

This will make a screen of methods messy. Chunks of relevant code will be placed on many different indentations in your code, and make it heavy to read. Instead, do

```
public void method(
    int firstArg, int secondArg)
```

or if it doesn't fit on one line:

```
public void method(
    int firstArg,
    int secondArg)
```

This way, all arguments in all methods start on the same indentation. Easy!

4\. We don't abstract enough.
-----------------------------

Use your words, your classes, your abstractions. Don't do Strings, Lists and integers all over the place. Don't overdo generic words like ManagerProxyFactory or ProcessObjectService. Instead, think about how you can communicate the meaning of the objects in the domain. Kevlin pulls up a wordcloud of the words used most frequently in a codebase (about 38-minute mark in the video): The most common words should tell you something about what the codebase is about. The domain. A bad example shows List, Integer, String and such basic structures as the most common words. The better example has PrintingDevice, Paper, Picture. This makes the code less readable, because such generic variables can represent so many different things.

5\. We make complex methods with many parameters
------------------------------------------------

326\. That's the largest amount of parameters Kevlin says he has seen in a method. With such advanced methods, they're almost impossible to use, or even understand. Simplify access to the method by minimizing the amount of parameters. And try to avoid booleans, OK? `MethodName(true, false)` is just silly.

> Yesterday I finished the new user registration schema. Having no notable problems. Today, I'll call a method...
> 
> – Sad developer during the daily standup

6\. We do lousy encapsulation
-----------------------------

Encapsulation isn't achieved by making getters and setters. Do you want to restrict access to inner variables, you have not done that. In the example of a RecentlyUsedList class with an inner, private List with a getter, you can still make duplicates through calling recentlist.getList().Add("Hi") twice. (and duplicates is not allowed in LRU-lists.) Think about what restrictions is necessary. Use your brain. It's there for a reason.

> When it's not necessary to change, it's necessary not to change.

7\. Testing should be a reflection of your functions
----------------------------------------------------

The most common way of doing testing is making a test function for each function in the code. This makes for a testing that's often incomplete and also hard to read. If LRU-list had test functions

```
LRU
    ensureAdd()
    ensureInit()
    ensureCount()
```

This doesn't make you comfortable that your code works. It -might- make you comfortable that your following company directives about writing tests, but it really shouldn't make you comfortable that your code works as it's suppose to. Instead, write your test-code in an expressive way. So for the LRU-class, you could do:

```
EmptyLRU
    doesntHaveAnyItems()

FilledLRU
    remainsUnchangedWhenHeadIsAdded()
    movesHeadWhenAnExistingItemIsAdded()
```
