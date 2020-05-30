---
title: "Stop using defaultProps"
date: 2020-05-21
tags: []
author: tomfa
status: draft
---

## Should we use defaultProps? 

- NO, because [Dan says they'll be deprecated](https://twitter.com/dan\_abramov/status/1133878326358171650])?. 


By spec, default values are re-evaluated on every invocation of the function. defaultProps, on the other hand, are evaluated once and cached at the module level - across every invocation of the function. 

This may sound like defaultProps are more performant **if you have computational default args**. But that's so rare I don't think I've ever seen it. A cache isn't free either, and I doubt caching default values is your best use of a cache?

There are other better arguments both for, and against:

### Readability

Below is a non-sensical method. It has a default value.

```
const Hand = ({ hand = 'left' }) => <h1>{left}</h1>
```

Here's the same method with defaultProps

```
const Hand = ({ hand }) => <h1>{left}</h1>

Hand.defaultProps = { hand: 'left' } 
```

**When the method becomes large, you will no longer see the default props when you go to the method. You'll have to scroll. SAD.**

But also, default values can become too messy if you have many properties

```
const Body = ({ 
    arm, 
    ear="2", 
    eye="brown", 
    feet, 
    head="round", 
    nail="polished", 
    toe="stubbed", 
}) => {
    ...
}
```

vs 

```
const Body = ({ 
    arm, 
    ear,
    eye,
    feet, 
    head,
    nail,
    toe,
}) => {
    ...
}

Body.defaultProps = { 
    ear: "2", 
    eye: "brown", 
    head: "round", 
    nail: "polished", 
    toe: "stubbed", 
}
```

**Maybe defaultProps are more readable when you have (too) many props?**

With default values in class components, their values can be in the middle of the screen, or sprayed across the class.

```
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

**defaultProps are more readable in Class components**

### Typing

I've found one question regarding Props that I don't know the answer to:

```javascript
// Given this class
const Belly = ({ 
    bellyButton = 'outwards', 
    moleLocation = 'top right'
}) => {
    ...
}

// Are these props correct? Or should they be optional?
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
linter and your IDE know what's going on. But that's the thing, they might not!

Take a look at this code:

[TODO]()

- Eslint will complain that variable `certainlyDefined` might be null! :(
- Your IDE will autocomplete `certainlyDefined` as required! :(

### Summary

- Don't use defaultProps in functional components
- Let them be the way they are in class components (rewrite the classes first)

If you disagree, watch [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react/issues/1009) going to town on each other about this. Others have argued so you don't have to.