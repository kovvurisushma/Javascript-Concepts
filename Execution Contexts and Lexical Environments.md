## JavaScript is a synchronous Single-Threaded Language.

# Syntax Parser
- A Program that reads your code and determines what it does and if the grammar is valid.

# Lexical Environment
- Where something sits physically in the code you write.
- when we talk about the lexical environment it means where the variable sits and what surrounds it.

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
  
  <img width="1728" alt="Screenshot 2024-07-09 at 9 07 37 PM" src="https://github.com/kovvurisushma/Javascript-Concepts/assets/50438716/9ac8e333-7f9b-4e63-ac17-88178ecf4c86">

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




