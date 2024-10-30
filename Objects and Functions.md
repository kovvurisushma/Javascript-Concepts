### An object is a collection of named key-value pairs and a value can be another collection of key-value pairs
- inside an object,
  - if the value of a key is primitive then it is called a member
  - if the value of a key is a function then it is called a method

## Dot Operator
- Also known as member access operator, used to access keys inside an object
- this operator takes two values and its precedence is from left to right
- **[] - the operator is called the computed member access operator.**
Eg: 
```
var person = new Person()
person["firstName"] = "sushma"
person["secondName"] = "kovvuri"

console.log(person)
console.log(person["firstName"]) // 
console.log(person.firstName) //There is no need to give the firstName in a string because the dot operator itself considers a string and tries to find out that key name in the object.

```

- Here the firstName and lastName are called members of the object.
-  **Preferred approach is to use dot operator instead of [] for accessing members whereever is possible**. Because it is very clean, clear, and easy to debug. but the [] can be used in case of accessing any dynamic member of an object.


## objects and object literals
- Object literal syntax means creating an object without using a new keyword, it just simply this: var parent = {}. This is called as object literal syntax.

## Functions are Objects
- In JavaScript, functions are nothing but objects. It has all the properties of objects and few more extra properties
- First Class Functions:
  - Everything you can do with other types like strings, booleans, and objects, you can do with functions, i.e.,
      - Assign functions to variables
      - pass functions around as parameters to another function
      - create them on the fly.
- You can add members to functions in JavaScript.
Eg:
```
function greet() {
  console.log("Hellooo!!!")
}
greet.name = "Sushma"

console.log(greet.name) // prints Sushma
```

## Pass by Value and Pass by reference
- All the primitive values follow pass by by-value rule while copying/e.
Eg:
```
var a = 3
var b

b = a
a = 2
console.log(a) // output: 2
console.log(b) // output: 3
```

- All the objects including functions follow pass by reference
Eg:
```
var c = {greeting: "hi"}
var d

d = c
c.greeting = "hello"

console.log(c) // output: {greeting: hello}
console.log(d) // output: {greeting: hello}
```

- It will be the pass by reference even for parameters
Example:
```
var c = {greeting = "hello"}
var d = c

function changeGreeting(obj) {
  obj.greeting = "Holaa"
}

changeGreeting(d)
console.log(c) // output: {greeting: hola}
console.log(d) // output: {greeting: hola}
```

- Equals operator sets up new memory space.
Example:
```
var c = {greeting: "hi"}
var d

d = c
c = {greeting: "hello"}

console.log(c) // output: {greeting: hello}
console.log(d) // output: {greeting: hi}

```

## Arrays in JavaScript
- An array in JavaScript is a collection of elements, and these elements can be heterogeneous.
  
```
var arr = [1,
      false,
      "hello",
      {x: "this is an object"},
      function greet() {
        console.log("yes we can have functions in array as they are just JS objects")
      }]
```

## Automatic Semicolon Insertion
- In JavaScript, it is optional to use semicolons, because the JS syntax parser inserts it on your behalf.
- for example, if it sees any return keyword it will add a ';' at the end of that word to return, this will cause issues sometimes
  ```
  function x() {
    return
    {
      "a": "ABC"
    }
  }
  x() // undefined

  ```
  - In the above case since there is nothing present after the return in the same line, the Js adds a semicolon after that and the compiler will return after the statement, so the return value will be undefined, whereas in the below example it will return object.

```
function x() {
    return {
      "a": "ABC"
    }
  }
  x() // {a : "ABC"}
  
  ```

## Call, Apply and Bind
- Call, Apply, and Bind are methods in JavaScript that allow you to control the context (this value) in which a function is executed. They are particularly useful when invoking a function with a specific value or when you want to partially apply a function.

**Call Method**
- The call method is used to invoke a function with a specified this value and arguments provided individually.

Syntax

```function.call(thisArg, arg1, arg2, ...)```

Example:

```
function greet(greeting, punctuation) {
    console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: 'Alice' };

greet.call(person, 'Hello', '!');
```

**Apply Method**
- The apply method is similar to call, but it takes an array of arguments instead of listing them individually.

Syntax:

```functionName.apply(thisArg, [argsArray]);```

Example:
```
function greet(greeting, punctuation) {
    console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: 'Alice' };

greet.apply(person, ['Hello', '!']);
```

**Bind Method**
- The bind method creates a new function that, when called, has its this value set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

Syntax:

```const boundFunction = functionName.bind(thisArg, arg1, arg2, ...);```

Example:
```
function greet(greeting, punctuation) {
    console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: 'Alice' };

const greetPerson = greet.bind(person, 'Hello');
greetPerson('!');
```

- The Call and Apply methods used for invoking the methods within specific context value(this), whereas the bind method always creates a new function.
- The Call method generally used for normal variables while the apply method is helpful in dealing with arrays, objects..etc.

**UseCases of Call,Apply and Bind**
- **Method Borrowing**

using call method.
```
const person1 = {
    name: 'Alice',
    greet: function() {
        console.log('Hello, ' + this.name);
    }
};

const person2 = {
    name: 'Bob'
};

// Borrow the greet method from person1 and use it for person2
person1.greet.call(person2);
```
  
using apply method.
```
const numbers = [5, 6, 2, 3, 7];

// Use apply to pass the array as arguments to Math.max
const max = Math.max.apply(null, numbers);
console.log(max); // Output: 7
```

- **Using apply to Pass Arguments to a Function**
```
function sum() {
    return Array.prototype.reduce.call(arguments, (acc, curr) => acc + curr, 0);
}

const numbers = [1, 2, 3, 4, 5];
const total = sum.apply(null, numbers);
console.log(total); // Output: 15
```

- **Function currying using bind**
```
// Step 1: Define a general function
function multiply(a, b) {
    return a * b;
}

// Step 2: Create a curried function using bind
const multiplyByTwo = multiply.bind(null, 2);
const multiplyByThree = multiply.bind(null, 3);

// Step 3: Use the curried functions
console.log(multiplyByTwo(5)); // Output: 10
console.log(multiplyByThree(5)); // Output: 15
```  









       
