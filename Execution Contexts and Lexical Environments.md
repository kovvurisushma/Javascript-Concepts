## JavaScript is a synchronous Single-Threaded Language.

# Syntax Parser
- A Program that reads your code and determines what it does and if the grammar is valid.

# Lexical Environment
- Where something sits physically in the code you write.
- when we talk about the lexical environment it means where the variable sits and what surrounds it.
- lexical environment of a context = local memory of a function + lexical environment of its parent.
- lexical means hierarchy
  - In this example:
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
  - The lexical environment for function a is - local memory (variable b) + lexical environment of parent(i.e., the global context)
  - The lexical environment for function b is - local memory (no variables or functions are there so null here) + lexical environment of parent(**here parent/hierarchy of function b is global context and not function a()** because the memory for function b is created inside the global context as the definition is inside global context and not inside a()

# Execution Context
- A wrapper to help manage the code that is running
- Everything in Javascript happens inside the Execution Context.
- Execution Context has two parts to it
  - Memory Component also known as **Variable Environment**: It is an environment where all the variables are stored in key-value pairs
  - Code Component also known as **Thread of Execution**: this is the place where code gets executed one line at a time.
 
    <img width="800" alt="Screenshot 2024-07-09 at 4 22 59 PM" src="https://github.com/kovvurisushma/Javascript-Concepts/assets/50438716/e7689f2e-24c9-45f2-9b89-ad83acc92d91">
    
  - Whenever a global execution context is created it will create 2 things for you
      - Global Object(window object)
      - and a special variable that the Javascript Engine creates, called - "This".
      - at the global level, Global Object (window) = This.
      - All the variables and functions that are not present inside any function and are present at the global level, will get attached to the global object.
  - The word Global means
      - Not inside a function
        
  ### Creation and Hoisting
  - The Execution Context is created in two phases.
      - The first phase is known as the creation phase(memory creation phase)
          - In this creation phase JsEngine will allocate memory to all the variables and functions.
          - In this phase, the JsEngine runs through each line of the code and allocates memory for variables and functions, for variables it will initialize with a special value undefined, 
              and for functions, it will copy the entire function code in the memory space.
            Eg:
                ```
                    function b() {
                      console.log("Hello from B)
                    }

                    function a() {
                      console.log("Hello from A")
                      b()
                    }
       
                    console.log(x)
                    var x = 3
                    console.log(x)
                ```
            for this code, the values of these variables and functions in memory will be
            | Memory block  | Code block |
            | ------------- | ------------- |
            | b : {console.log(...)}  |   |
            | a : {console.log(...)}  |   |
            | x : undefined |   |
            
  - The Second phase is called the Code Execution phase
      - Again in this phase, the JsEngine will run through the entire file and execute the program line by line. so this is the point when all the functions execute and all the calculations are done.
      - In this step, the JsEngine will replace the values of variables from undefined to actual values.
      - **Whenever a function gets Invoked a new execution context is created**.
        
          <img width="800" alt="Screenshot 2024-07-09 at 8 46 05 PM" src="https://github.com/kovvurisushma/Javascript-Concepts/assets/50438716/a438df80-f423-418c-a999-8401534fa7d2">

     - Once the function execution is completed the entire execution context of that particular function will be deleted.
   
### Call Stack / Execution Stack
- Call Stack maintains the order of execution of execution contexts.
- It is also known as Program Stack, Control Stack, Runtime Stack, and Machine Stack.
- The bottom of the call stack always has the global execution context as this will be the first to get created and executed as soon as the JS Program starts,
  so the entire global execution context will be pushed into the stack first.
- Whenever a function gets invoked/executed the execution context of that particular function will be pushed into the execution stack.
- Even when a function is calling itself or another function, a separate execution context will be created for each of them separately.
- Because of this reason even if we declare or use same variables in different functions the values will be associated to that particular execution context only.
- Eg:
  ```
      function b() {
          var x;
          console.log(x) // o/p -> undefined
          x = 3;
      }
      function a() {
        var x = 2;
        console.log(x) // o/p -> 2;
        b()
        console.log(x) // o/p -> 2
      }
      var x = 4
      a()
      console.log(x) // o/p -> 4
  ```
- Once the execution of the entire JS code is completed then the global execution context will also be popped out and the execution stack will be empty.
- so whatever the execution context is on the top of the stack is currently running.
- The order of execution contexts in the call stack will be based on the order the functions are getting invoked.
  
  <img width="800" alt="Screenshot 2024-07-09 at 9 07 37 PM" src="https://github.com/kovvurisushma/Javascript-Concepts/assets/50438716/9ac8e333-7f9b-4e63-ac17-88178ecf4c86">

### Hoisting in JavaScript
- Hoisting is a phenomenon in Javascript by which you can access these variables and functions even before initializing without any error.
- ```
    b()
    console.log(x) // output: undefined - accessing x even before initialization.
    console.log(b) // output: f b() {console.log("hello")}
    var x = 7

    function b() {
      console.log("hello")
    }
  ```
- Accessing x even before initialization, here the value will be undefined because, in the first phase of execution, this variable will get created and is initialized with undefined.
- This kind of mechanism is possible in Javascript because of the way it executes a program since the code gets executed in 2 phases in the first phase itself we are creating a memory for the variable, 
  so while accessing them it is not throwing the error.
- what does this question mean, "whether a variable is hosted or not/ whether let and const are hoisted or not?"
  - so a variable is hosted or not means -> can we access a variable before initializing it or not?
  - and the answer is we can access var variables before initializing but the value will be undefined but we can't access let and const before initializing.
  - so var variables are hoisted and let and const variables are not hoisted. 

### Scope Chaining in JavaScript
- Eg1:
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
- Whenever a variable is accessed in the function or anywhere in a JS program, It does more than look for the variable in the variable environment of the currently executing context, since every execution context has a reference to its outer environment. if the variable is not present inside the variable environment of the current context it will search in this reference for the variable.
- what does outer environment mean?
  - The outer environment for a function means where the definition of it sits, for example in the above scenario the outer environment for function a will be the global context and for function b also it will be the Global context and not the context of a, even though b() is getting called inside a. because of this the value of myVar will be 3 and not 2.
  
- Eg:
```
function a() {
  function b() {
    console.log(myVar)
  }

  var myVar = 2
  b()
}

var myVar = 1
a()
```
<img width="800" alt="Screenshot 2024-07-13 at 2 42 21 PM" src="https://github.com/user-attachments/assets/168a35ff-a949-4176-9fd2-f8765ba13ea7">


### Let, Var and Const
- Whenever a var variable is declared it will get attached to the window object, and let and const will be present in a separate memory space(script).
- Eg: 
```
function a() {
  function b() {
    console.log(myVar)  
  }

  var myVar = 2 //This will be present inside the global context of a but not in the window object as this var variable is inside a function
  b()
}

var myVar = 1 //This variable will get attached to the window object as it is present inside the global execution context.
a()

```
- Temporal dead zone: The temporal dead zone is the time from when the let/const variable is hoisted till it is initialized with some value.
- If we try to access let and const before the initialization, i.e., when they are in the temporal dead zone we get that reference error.
  -  we will get that variable as not defined even though it is hoisted, this is because let and const can't be accessed before initialization.
- a const variable has to be initialized at the point of the declaration itself otherwise, it will throw a syntax error saying the same.
  - and it will throw a type error if we try to re-assign a const variable a value after initializing.
- The better practice of using let and const is to always declare and initialize them at the top of your code in this way you can avoid getting reference errors while trying to access variables inside the temporal dead zone.
- let and const are block-scoped variables, we can't access them outside, but var is the global scoped.
<img width="800" alt="Screenshot 2024-07-13 at 6 47 25 PM" src="https://github.com/user-attachments/assets/37c79928-bc27-40d0-8d7a-4d3226834c10">

- Here when we are trying to log b, it will throw a reference error that b is not defined because b variable is block scoped and we are trying to access it outside the block.
- But a variable can be accessed as it is present in the global scope and not in the block scope.
- the block memory will be removed as soon as that particular block's execution is completed.
- the block scope also follows the lexical scope chain pattern.
- Example:
```
  {
    const a = 100
    {
      const a = 20
      {
        console.log(a) // 0/p -> 20
      }
    }
  }
```

#### Shadowing in Javascript
- When we declare two same var variables then the second one will shadow the first one.
- For Example:
```
var a = 100
{
  var a = 10
  let b = 20
  const c = 30
  console.log(a) // output: 10
  console.log(b)
  console.log(c)
}
console.log(a) // output: 10
```
since both these values are attached to the window object the second value will override the first value.

- But in the case of let and const, it will not override the existing value as both will be present in different memory locations.
<img width="833" alt="Screenshot 2024-07-13 at 7 00 57 PM" src="https://github.com/user-attachments/assets/e44504cc-fe90-42e9-957c-cae249f932a8">

- You can't shadow a let/const variable using var, but vice-versa is possible.
- the reason is that when we are shadowing any variables it should be within that boundary, so here we are trying to shadow a block scope value with global scope so this will cause a collision, so because of this we can't shadow a let with var.

```
let a = 20
{
    var a = 200
    console.log(a)
}
console.log(a)
```
- But this is possible as a function has its separate memory block.
```
let a = 20
function c() {
    var a = 200
    console.log(a)
}
console.log(a)
```
- This vice-versa is possible.
```
var a = 20
{
    let a = 200
    console.log(a) // o/p -> 200
}
console.log(a) // o/p -> 20
```



