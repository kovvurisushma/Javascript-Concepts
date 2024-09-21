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
- anonymous functions don't have their own identity, ie., we can't create and use anonymous functions like normal functions.
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

## First Class Functions in Javascript
- In JavaScript, functions are considered "first-class citizens" or "first-class functions."
- This means that functions are treated as first-class objects, which allows them to be used in a variety of ways similar to other data types like numbers, strings, and objects.

**Characteristics of First-Class Functions**
- Assigned to Variables
- Passed as Arguments
- Returned from Other Functions
- Stored in Data Structures
