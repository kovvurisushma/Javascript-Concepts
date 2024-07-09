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
  - Whenever a global execution context is created it will create 2 things for you
      - Global Object(window object)
      - and a special variable that the Javascript Engine creates, called - "This".
      - at the global level, Global Object (window) = This.
      - All the variables and functions that are not present inside any function and are present at the global level, will get attached to the global object.
  - The word Global means
      - Not inside a function
        
  ### Creation and Hoisting
  - 
<img width="1000" alt="Screenshot 2024-07-09 at 4 22 59 PM" src="https://github.com/kovvurisushma/Javascript-Concepts/assets/50438716/e7689f2e-24c9-45f2-9b89-ad83acc92d91">

