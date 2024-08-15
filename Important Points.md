## Is the not defined and un-defined means the same thing in js?
- nope, the undefined is a special keyword in JavaScript. and it means that the variable has a reference in the memory but it's not initialized with anything, 
so javascript initializes this variable with a special value "undefined", whereas not defined means the variable doesn't have any reference in the memory and it is not even declared and it gives an uncaught reference error.

eg:
```                    
 function b() {          
 console.log("Hello")    
 }                       
                        
console.log(a) // a value will be undefined
var a = 20               
```        
```
function b() {          
 console.log("Hello")    
 }                       
                        
console.log(a) // gives an uncaught reference error as variable a doesn't exist in code memory
```

## What does this question mean, "whether a variable is hosted or not/ whether let and const are hoisted or not?"
so a variable is hosted or not -> can we access a variable before initializing it or not?
and the answer is we can access var variables before initializing but the value will be undefined we can't access let and const before initializing.
so var variables are hoisted and let and const variables are not hoisted.

## What does outer environment mean?

The outer environment for a function means where the definition of it sits, for example in the above scenario the outer environment for function a will be the global context and for function b also it will be the Global context and not the context of a, even though b() is getting called inside a. because of this the value of myVar will be 3 and not 2.
```
function b() {
  console.log(myVar) // output: 3, not undefined and not 2
}

function a() {
  var myVar = 2
  b()
}

var myVar = 3
a()
```

## What does a block and block scope mean in Javascript?
- A block or compound statement is nothing but the code/group of statements between { } these braces. A block is used to combine multiple javascript statements into one.
and we need to group these multiple statements into one block so that we can use various statements in the places where the javascript expects only one statement.
- and a block scope means that the variables/functions declared in a block can be accessed between those {} and can't be accessed outside that block.


## Function Expression and Function Statement
Function Statement or Function Declaration
```
function x() {
 console.log("cvllcllgfxc")
}
```
Function Expression
```
var x = function() {
 console.log("heklloooo")
}
x()
```
- The difference between Function Expression and Declaration/Statement lies in hoisting. you can't access the function expression before declaration because its value will be undefined. but the functions that are defined by function declaration/statement can be invoked anywhere, even before declaration. 

