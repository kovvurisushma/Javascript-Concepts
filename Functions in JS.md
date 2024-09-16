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

## Anonymous Functions
- A Function without a name is called an anonymous function.
- anonymous functions don't have their own identity, ie., we can't create and use anonymous functions like normal functions.
- they are used when we are using functions as values
```
```
