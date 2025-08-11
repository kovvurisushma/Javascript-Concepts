## Function Statement
- This is also known as **function declaration**.
- A function statement should always have a name according to ECMAScript specifications.
```
function a() {
  console.log("this is function statement")
} 
```

## Function Expression
- Function Expression is nothing but assigning a function to a variable.
- A function expression is a way to define a function within an expression, rather than as a standalone statement. This allows the function to be assigned to a variable, passed as an argument to another function, or used in any context where an expression is valid.
- A function expression is a way to define a function within an expression. It can be named or anonymous.
- If a function expression has a name then it is called a named function expression or else it is called an anonymous function.
```
var b = function () {
  console.log("function expression")
}
b();
```
- The main difference between **Function Statement** and **Function Expression** lies in hoisting, we can invoke a function statement even before defining 
but we can't invoke a function expression before defining because the value of b will be undefined in the first phase.
```
a() // -> will be executed, and the output will be logged.
function a() {
  console.log("This is function statement")
} 
b() // -> gives an error as the b value will be undefined.
var b = function () {
  console.log("function expression")
}
b(); // ->  will be executed, and the output will be logged.

```

## Named Function Expression
- A named function expression is a function expression with a name specified.
- If you want to declare a recursive function using function expression then you can use named functions.
- This name is only accessible within the function's own scope, which can be useful for recursion or for identifying the function in stack traces

```
var myFunction = function namedFunction() {
    console.log(namedFunction); // Logs the function itself
};

myFunction(); // This will call the function and log the function definition
```

**Benefits of Named Function Expressions**

**1. Recursion**
```
var factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1); // Recursive call
};
console.log(factorial(5)); // Outputs: 120
```

**2. Stack Trace and Debugging**
```
var myFunction = function namedFunction() {
    throw new Error("Oops!");
};
myFunction(); // The stack trace will include 'named function'
```


## Anonymous Functions or Anonymous Function Expressions
- A Function without a name is called an anonymous function.
Anonymous functions don't have their own identity, so we can't create and use anonymous functions like normal functions.
- they are used for temporary tasks like when we use functions as values for example passing the functions as arguments, as callbacks, or immediately invoked function expressions (IIFEs)

**Characteristics of Anonymous Functions**

**1.No Name:**
- Unlike named functions, anonymous functions do not have an identifier.
- They are typically assigned to variables or used directly as arguments.
  
**2.Usage:**
- Commonly used in callbacks, event handlers, and immediately invoked function expressions (IIFEs).
  
```
setTimeout(() => {
  console.log("inside set timeout")
}, 1000)

```
**Benefits of Anonymous Functions**
- **Conciseness:** They are often more concise, especially when used as inline callbacks.
- **Encapsulation:** They can help encapsulate functionality that does not need to be reused elsewhere.
- **Scope:** They can create a new scope, which is useful for IIFEs to avoid polluting the global scope.

**Drawbacks of Anonymous Functions**
- **Debugging:** Stack traces can be less informative because the function name is unavailable.
- **Reusability:** They cannot be reused elsewhere in the code without assigning them to a variable.

## Immediately Invoked Function Expressions(IIFEs)
- An Immediately Invoked Function Expression (IIFE) is a JavaScript function that runs as soon as it is defined. It is a design pattern that is also known as a self-executing anonymous function and contains two major parts:
    - Function Expression: This is the anonymous function with lexical scope enclosed within the () brackets.
    - Immediately Invoked: The second part creates the immediately invoked function expression () through which the JavaScript engine will directly interpret the function.
 
Syntax
The basic syntax of an IIFE is as follows:

```
(function(name) {
    console.log(`Hello, ${name}!`);
})('World');
```

Or with arrow functions:

```
(() => {
    // Code to be executed immediately
})();
```

Explanation
Function Expression: The function is defined within parentheses (). This is necessary because JavaScript treats anything within parentheses as an expression.
Invocation: The function is immediately invoked by the trailing parentheses ().

**Use Cases**
- **Avoiding Global Scope Pollution**: IIFEs are often used to avoid polluting the global scope, especially in the context of libraries or frameworks.
- **Creating a Private Scope**: Variables and functions defined inside an IIFE cannot be accessed from outside, providing a form of encapsulation.
- **Initialization Code**: IIFEs are useful for running initialization code that only needs to be executed once.

**Example:**
```
const CounterModule = (function() {
    // Private variable to hold the counter value
    let counter = 0;

    // Private function to log the current counter value
    function logCounter() {
        console.log(`Current counter value: ${counter}`);
    }

    // Public API exposed by the module
    return {
        increment: function() {
            counter++;
            logCounter();
        },
        decrement: function() {
            counter--;
            logCounter();
        },
        reset: function() {
            counter = 0;
            logCounter();
        },
        getCounter: function() {
            return counter;
        }
    };
})();

// Usage of the CounterModule
CounterModule.increment(); // Current counter value: 1
CounterModule.increment(); // Current counter value: 2
CounterModule.decrement(); // Current counter value: 1
CounterModule.reset();     // Current counter value: 0
console.log(CounterModule.getCounter()); // 0
```

## First Class Functions in JavaScript
- In JavaScript, functions are considered "first-class citizens" or "first-class functions."
- This means that functions are treated as first-class objects, allowing them to be used in various ways similar to other data types like numbers, strings, and objects.

**Characteristics of First-Class Functions**
- Assigned to Variables
- Passed as Arguments
- Returned from Other Functions
- Stored in Data Structures

## Generator Functions in JavaScript
- A generator function is a function that can be paused and resumed at any point during execution. It works best with iterables, allowing creation of data streams with ease.
- They are defined by **function\*** and it contains one or more yeild expressions
- The main method of the generator is next(). When called, it runs the execution till the next yield.
- It returns a special object called "generator object" that contains 2 properties: done and value
  - value: the yielded value
  - done: true if the function code has finished, otherwise false.
