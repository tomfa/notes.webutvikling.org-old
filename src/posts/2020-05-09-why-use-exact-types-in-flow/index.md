---
title: 'Always use Exact types in Flow'
date: 2020-05-09
image: ./yelling.jpeg
tags: [statement, flow, react, typing]
author: tomfa
status: publish
---

I love typing, but it was not definitely love at first sight. I remember laying my eyes on Java for the first time, and feeling disgusted about the verbosity of it all.

Javascript (and Python even more) let me just express myself right there with what I meant.

> Me: `myAge = 20`

> Python: `Ok, sure`

> Javascript: `Fine, but I'm adding it to the global scope.`

> Java: `Where are we, where's my main and what is this?!`

Using typing is like having a team mate without social skills,
limited vocabulary, don't really know how to program,
but has photographic memory and lightning fast deduction look over your shoulder
and tell you that you're wrong:

> Uhh! You said buttons could only be Primary or Secondary last May, but now you're creating a Muted button?!

But things change when you have programmed for a while, or when you start working
with others. You replace a simple text editor with an IDE and start working with
code that others have made.

**You thank them for typing** because when you write Button type="", you get Secondary and Primary as options right there.

**You're happy you typed your codebase last yea**r, because when you remove Secondary as a button type, you will be told exactly which 12 callers that you'll have to fix first.

**It's easier to read a difficult methods**, maybe created long ago by people who no longer work here, because you can look at that method in isolation and see exactly what it will be called with and return.

It's documentation, but never outdated and always consistent. Typing increases your speed (ignoring the hello world sized code bases), and others speed when they depend on your code.

## Exact props in Flow (JS)

Props shoulder be typed as a closed object, as not to allow extra parameters to be passed through.

### Example Prop type

```flow
// Bad
type Props = { extraFish?: number }

<Box extraFish="yes"> // Error for wrong type

<Box xtraFish="yes"> // No error for typo
<Box width="100%">  // No error for wrong assumption about component
```

```flow
// Good
type Props = {| extraFish?: number |}

<Box extraFish="yes"> // Error for wrong type

<Box xtraFish="yes"> // Error for invalid prop name
<Box width="100%">  // Error for invalid prop name
```

### But I forward hundreds of style props!

That's OK, just type the style props you forward, and reuse that type in your components:

```flow
type StyleProps = {|
   width: string
   ...
|}

type Props = {| extraFish?: number,  ...StyleProps |}

<Box width="100%">  // Works fine
<Box widt="100%">  // Bonus: style typos are caught
```

## Automatically make Flow types exact

eslint and [eslint-plugin-flowtype](https://github.com/gajus/eslint-plugin-flowtype) can help you automatically make your types exact

## Enable eslint for exact Flow types

```
yarn add -D eslint-plugin-flowtype
```

Add the following rule to your eslint configuration:

```
'flowtype/require-exact-type': [2, 'always']
```

You can then make types exact with

```
eslint --fix
```

### Sidenote: Make inexact Props exact

Some times, you might be dealing with inexact props exposed from somewhere outside your code. When you do, you can make them exact by destructuring them into an exact prop.

```flow
type ExactProps = {| fish: number |};
type IshProps = { cat: number };

// Props become inexact
type Props = ExactProps & IshProps;

// Now, Props are exact
type Props = {| ...ExactProps, ...IshProps |};

// This also gives exact Props
type Props = ExactProps & {| ...IshProps |};
```
