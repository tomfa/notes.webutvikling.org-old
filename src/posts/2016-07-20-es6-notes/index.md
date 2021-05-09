---
title: "ES6 notes"
date: 2016-07-20
image: ./es6.png
tags: ["learning", es6, intro, javascript]
author: tomfa
status: publish
---

A summary of the key takeaways from [CodeSchools "ES2015: The Shape of JavaScript to Come"](https://www.coursetalk.com/providers/code-school/courses/es2015-the-shape-of-javascript-to-come).

1.  Like in python, ES6 allows for default values in parameters:
    
```js
function say(name="Erik") {
  console.log(name + "says hi");
}
```

2.  You can enter javascript context in the middle of a string  with `${javascript}`:
    
```js
function sayHi(name="Erik") {
  console.log(`${name} says hi`);
}
```
    
3.  Passing objects as options has become more pleasing on the eye:
    
```js
function saySomethingtoSomeone({
  toName, 
  fromName, 
  text
}) {
  console.log(
    `${fromName} says:${toName}, ${text}`
  );
}

saySomethingtoSomeone({
  toName: Hans,
  fromName: Erik,
  text: "Hi"
});
```
    
4.  You can also assign default values to those parameters:
    
```js
function saySomethingtoSomeone({
  toName="Hans", 
  fromName="Erik", 
  text="Hi"
}={}) {
  console.log(
    `${fromName} says:${toName}, ${text}`
  );
}
```
    
5.  Again, like python (sorry, I am bias) ES6 opens for **rest parameters**, which allows a variable amount of parameters to be passed in its place and interpreted as an array: (Note, rest parameters must be at the end)
    
```js
function speakTheseWords(speaker, ...words) {
  for (let i in words) {
    console.log(`${speaker}: ${words[i]}`);
  }
}

// OR 

function speakTheseWords(speaker, ...words) {
  words.map(function(word) {
    console.log(`${speaker}: ${word}`);
  })
}
```
    
6.  You also have **arrow functions** which can simplify the readability. (Note that _this_ from inside an arrow function refers to the _outside-this_):
    
```js
function speakTheseWords(speaker, ...words) {
  words.map(word => 
    console.log(`${speaker}: ${word}`));
}
```
    
7.  **Spread operator** is the opposite of the rest parameter. Instead of bundling up a bunch of individual parameters into an array (rest parameter), it spreads an array into individual parameters.
    
```js
let words = ["I", "You", "Love"];
speakTheseWords("Mother of Dragons", ...words)
```
    
8.  There's now a **shorthand for initializing objects **where it assumes the values are equal to the local variable with the same name.
    
```js
let face = "nice";
let age = "27";

// instead of { face: face, age: age };
let personObject = { face, age }; 
```
    
9.  Similarily, there's **shorthand for deconstructing objects**:
    
```js
let { face, age } = personObject;
```
    
10.  **Object.assign** simplifies merging of objects. This can be helpful in functions accepting many optional parameters in an object, and setting defaults where  parameters are missing. Note that the first parameter is **changed,** and that object parameter _n _overrides parameter _n-1_ (for n > 2). I.e. below options override defaults which ends up inside an empty object which then is assigned to settings.
    
```js
let lookAtMe(name, options={}) {
  let defaults = {
    name: 'Peter',
    age: 20,
    weight: '53kg',
    height: '182cm'
  }
  let settings = Object.assign(
    {}, defaults, options)
}
```
    
11.  Iterating over arrays with **for...of** does what **for...in **does in Python (...) and what it sounds like it would (\*smirk\*):
    
```js
let arr = [15, 12, 1];
for (let number of arr) {
  // prints 15, 12, 1
  console.log(number);  
}
```
    
12.  **Arrays can also be deconstructed** in a similar way as with Objects. Indexes can be skipped by providing no variable name:
    
```js
let arr = [15, 12, 1];
// a = 15, b = 12, c = 1
let [a, b, c]  = arr; 
// d = 15, e = 1
let [d, , e] = arr; 

// head = 15, tail = [12, 1]
let [head, ...tail] = arr; 

```
    
13.  Searching in arrays can now be done with **Array.find.** The function you provide as a parameter loops through the array, and Array.find will return the first value that the provided function returns true from:
    
```js
let arr = [15, 12, 1];

let val = arr.find(num => {
    return num < 10;
}
// shorthand of the function above
val = arr.find(num => num < 10);  

console.log(val);  // prints 1
```
    
14.  A new object type **Map** handles some of the issues that could occur in ES5 when using a plain object as a key-value store. Map should be used instead of a plain object for stores when the key is unknown before runtime.
    
```js
let user1 = {cake: 'good', name: 'Huge Jackman'};
let user2 = {cake: 'meh', name: 'Beef Armstrong'};

let oldStyleBuggyStore = {};
oldStyleBuggyStore[user1] = 'Winning';
oldStyleBuggyStore[user2] = 'Losing';

// Prints 'Losing'
console.log(oldStyleBuggyStore[user1]);  

let newMapType = new Map();
newMapType.set(user1, 'Winning');
newMapType.set(user2, 'Losing');

// prints 'Winning';
console.log(newMapType.get(user1)); 
```
    
15.  **Iteration of Maps **(unlike objects) can be done in a similar way as with arrays:
  
```js
for [key, value] in map {
 console.log(`${key}: ${value}`);
}
```
    
16.  **Weakmaps **are maps memory-efficient Maps. The difference is:
    1.  You cannot iterate over Weakmaps (se point 15)
    2.  The keys of Weakmaps may only be Objects (no primitive types)
    3.  The key-value pairs of Weakmaps will be removed when the object used as key is garbage collected. This is unlike Maps and Objects KV-stores, where the fact that they're in the Map/Object prevents the object from being garbage collected.
        
```js
let tomas = { name: 'Tomas', age: 27 };
let memoryEffMap = new WeakMap();
memoryEffMap.set(tomas, 'fish');
```
        
17.  **Sets **are similar to Arrays, but only have unique values. So while an array can contain 2 instances of the word 'hat', Sets will only ever contain 0 or 1 instances.
    
```js
let tags = new Set();
tags.add('fish');
tags.add('cornbread');
```
    
18.  **Weaksets **are to sets as Weakmap are to maps: the keys may only be Objects, it can not be iterated with **let...of** and it will not prevent garbage collection of its members.
    
```js
let fish = { title: 'fish' };
let cornbread = { title: 'cornbread' };

let weakTags = new WeakSet();
weakTags.add(fish);
weakTags.add(cornbread);
weakTags.has(fish);     // true;
weakTags.delete(fish);  // true
weakTags.has(fish);     // false
```

19.  **Class** object: ES6 gives you Class, so you can shorten the creation of classes (instead of Prototype).
    
```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  render() {
    document.body.appendChild(`
      <li>
        ${this.firstName} ${this.lastName}
      </li>
    `)
  }
}
```
    
20. Classes can **extend** other classes. **super **keyword is used to call parent class constructor and other methods.
  
```js
class Animal extends Person {
  constructor(name, animal, foodToEat) {
    super(name, `the ${animal}`)
    this.food = foodToEat;

    // calls render function defined in person. 
    super.render();  
  }
}
```
    
21.  **Private methods **doesn't really exist, but (like in Python, heh) the convention is to start the method names with underscore to indicate it shouldn't be called from outside:
    
```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  render() {
    document.body.appendChild(
      `<li>${this._getRenderText()}</li>`)
  }

  _getRenderText() {
    return `${this.firstName} ${this.lastName}`;
  }
}
```
    
22.  ES6 got **modules**! Previously, the namespace in javascript was mucky. All files that was loaded on a webpage shared the same namespace. So, for example: Addons to jquery were dependant on jquery being loaded previously. And if you in your modules used a variable 'cow', this would be accessable in other javascript files (unless you wrapped them in a function or hid them by other means). In ES6, you can **require **libraries like this:
    
```js
// messagemodule.js
export function cakeMessage() { console.log('cake'); }

export function catMessage() { console.log('MIAAAO'); }
```

```js
// app.js 
import { cakeMessage, catMessage } from './messagemodule';

catMessage();  // prints 'MIAAAO'
```

There are several ways of exporting and importing functions. Below, what's exported is not declared before the end of the file. _cakeMessage_ is not exported at all.

```js
// messagemodule2.js
function cakeMessage() { console.log("cake"); }
function two() { console.log("I'm two years old"); }
function catMessage() { console.log('MIAAAO'); }

// Note: cakeMessage not exported
export { two, catMessage }; 
```

```js
// app2.js – imports everything from module
import * as msg from './messagemodule2'; 

msg.catMessage();
```
    
23.  Module **export default: **Default keyword is used when a module only exports one function. This allows for import without the use of curly braces, and being named whatever the importing class wants:
    
```js
// messagemodule.js
export default function catMessage() { console.log('MIAAAO'); }
```

```js
// app.js
import miao from './messagemodule.js';
miao();
```

24.  **Promises **make asynchronous Javascript using callbacks easier to write and read:
    
```js
function getTasksFromServer() {
  return **new Promise(function(resolve, reject) {**
    let url = '/tasks';
    let request = new XMLRequest();
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
       resolve(JSON.parse(request.response));
      }
    }
  })
}

getTasksFromServer()
  .then(response => renderTasks(response))
);
```
    
25.  **Then-functions** follow promise-calls can also be **chained:**
    
```js
getTasksFromServer()
  .then(tasks => tasks.filter(t => t.completed === true))
  .then(completedTasks => renderTasks(completedTasks))
);
```
    
26.  Promises can also be **rejected**, and the error handling is neater than earlier:
    
```js
function getTasksFromServer() {
  return new Promise(function(resolve, reject) {
    let url = '/tasks';
    let request = new XMLRequest();
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
       resolve(JSON.parse(request.response));
      } else {
        reject(new Error(request.status));
      }
    }
    request.onerror = function() {
      reject(new Error(request.status));
    }
  })
}

getTasksFromServer()
  .then(tasks => tasks.filter(t => t.completed === true))
  .then(completedTasks => renderTasks(completedTasks))
  .catch(error => {
    console.log(`failed with ${error}`);
  });
)
```
    
27.  **Iterators **allows you to iterate over elements with **for...of **(see 11). You can add iterators on your own objects. An example of this (not using generators) can be done like this:
    
```js
function makeIterable(obj) {
  obj[Symbol.iterator] = function() {
    let properties = Object.keys(obj);
    let count = 0;
    let isDone = false;

    let next = () => {
      if (count >= properties.length) {
        isDone = true;
      }
      return { done: isDone, value: obj[properties[count++]]}
    }

    return { next }
  }
}

let cat = { head: 15, tail: 19 };
makeIterable(cat);

for (let [key, val] of cat) {
  console.log(`${key}: ${val}`);
}
```
    
28.  **Generators** are special functions (marked with `*`) that allow iteration and decomposition. It will have multiple **yield **keywords in it, that specify which values to return on each run, or in each position.
    
```js
function* names() {
    yield 'Tomas';
    yield 'Hanna';
    yield 'Cookie Monster';
}

// used in iteration
for (let name of names()) {
    console.log(name);
}

let names = [...names()];
```
    
29.  Using generators makes creating iterators simpler like this:
    
```js
function makeIterable(obj) {
  obj[Symbol.iterator] = function* () {
    let properties = Object.keys(obj);
    for (let p of properties) {
      yield [p, obj[p]]
    }
  }
}

let cat { head: 15, tail: 19 };
makeIterable(cat);

for (let [key, val] of cat) {
  console.log(`${key}: ${val}`);
}
```
