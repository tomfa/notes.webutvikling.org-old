---
title: "Stop using defaultProps"
date: 2020-06-21
image: ./raphael-biscaldi-5PEy9UraJ5c-unsplash.jpg
tags: [React, javascript]
author: tomfa
status: published
---

Question of the day:

## Should we use defaultProps, or defaultValues? 

```jsx
// Default values
const Hand = ({ hand = 'left' }) => <h1>{left}</h1>


// Default props
const Hand = ({ hand }) => <h1>{left}</h1>
Hand.defaultProps = { hand: 'left' } 
```

## TLDR:

**Default values.** But you can leave defaultProps alone when you find them
in non-functional components, because readability for React class components 
are better as deafultProps.

Why? Because utilizing the language features is better than utilizing library 
features (all else equal). And because [Dan says default be deprecated from 
React](https://twitter.com/dan_abramov/status/1133878326358171650]), and the 
only reason we use them to begin with, is React. 


### Performance

By spec, default values are re-evaluated on every invocation of the function. defaultProps, on the other hand, are evaluated once and cached at the module level - across every invocation of the function. 

This may sound like defaultProps are more performant *if you have computationally heavy default args*. But that's so rare I don't think I've ever seen it. A cache isn't free either, and I doubt caching default values is your best use of a cache?

**Performance: whatever.** 

There are other, better arguments for and against.

### Readability

**When a function becomes large, you can not see default props values when navigating to the function** 

```jsx
// Default values: easy to see values immediately
const Hand = ({ hand = 'left' }) => {
  // Many many lines, can't see below
```

Here's the same method with defaultProps

```jsx
// defaultProps: can't see values
const Hand = ({ hand }) => {
  // Many many lines, can't see below
```
*** 

**Maybe defaultProps are more readable when you have (too) many props?**

```jsx
// default values: messy method signature
const Body = ({ 
  arm, 
  ear="2", 
  eye="brown", 
  head="round", 
  nail="polished", 
  toe="stubbed", 
}) => {
  // ...
}
```

vs 

```jsx
const Body = ({ arm, ear, eye, head, nail, toe }) => {
  // ...
}

Body.defaultProps = { 
  ear: "2", 
  eye: "brown", 
  head: "round", 
  nail: "polished", 
  toe: "stubbed", 
}
```

***

**defaultProps are more readable for Class components**


```jsx
// default values
class Belly extends React.Component<Props, State> {
  constructor {
    const { moleLocation = 'top right' } = this.props;
    ...
  }

  render {
    const { bellybutton = 'outwards' } = this.props;

    ....
  }
}
```


### Typing

I've found one question regarding Props that I don't know the answer to:

```jsx
// Given this class
const Belly = ({ 
  bellyButton = 'outwards', 
  moleLocation = 'top right'
}) => {
    ...
}

// Are these props correct? 
// Or should they be optional?
type Props = {
  bellyButton: string,
  moleLocation: string,
}
```

- If you say that they should be required, then the type annotation does not
serve as documentation for how to use the class. It then becomes important that your tools understand that they're not required.

- If you say that they should be optional, then the type annotation does not
tell you what assumptions you can have inside the class. It is then important that your tools understand that they'll always have values.

Conceptually, I personally I lean towards having them optional. Arguments is "How you instansiate" a class, not "What values are defined" (inside a class). Practically, I'm also more often uncertain about a class when I'm working outside it, than inside it.

And it shouldn't really matter, as long as your TypeScript compiler or Flow 
linter and your IDE know what's going on. 

### Summary

- Don't use defaultProps in functional components
- Let them be the way they are in class components (rewrite the classes first)

If you disagree, watch [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react/issues/1009) going to town on each other about this. Others have argued so you don't have to.
