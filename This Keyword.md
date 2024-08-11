# Note
- In non-strict mode, whenever the the value of "this" keyword is undefined or null, then the value of the "this" keyword will be replaced with the global object.
  - This concept of JavaScript substituting the "this" keyword with the global object is called **"This Substitution"**

# This in global Space
- The value of this in the global space is always the global object.
- This global object is different based on where the Js runtime is present.
- For Example in the case of a browser this global object is equal to the window object.
- so that's the reason, we usually say that this in global space is equal to the window object, but in reality **this value will be equal to the global object in global space.**

App.js
```
//whatever we write in this file is a global space

//This in global space
console.log(this) // refers to the global object --> in the case of the browser the global object is the window object. 

```

# This inside a function
- The value of "this" keyword inside a function is undefined, but because of the "This substitution" the value will be equal to global object in non-strict mode.

App.js
```
"use strict"

// this in global space
console.log(this)

//this inside function
function a() {
    // the value depends on strict/non-strict mode
    console.log(this); // in the case of strict mode the value is undefined and in the non-strict mode, it is equal to the window object
}
a();
```

# This inside an Object's method

- In the case of functions defined with the function keyword
```
var obj = {
    a: 10,
    x: function () {
        console.log(this) // prints the obj -> {a: 10, x: function({...})}
    }

}

obj.x()

```

- In the case of the arrow function - Arrow functions don't provide their own this binding(it retains this value of the enclosing lexical content) 

```
var obj1 = {
    a: 10,
    x: () =>  {
        console.log(this) // prints the window object as the enclosing lexical content of this obj1 is window object.
    }

}

obj1.x()
```

- Inside the nested function
```
var obj2 = {
    a: 10,
    x: function () {
        console.log(this) // prints the obj -> {a: 10, x: function({...})}

        var y = function () {
            console.log(this) // undefined in strict mode and window object in non-strict mode.
        }

        y() 

    }

}

obj2.x()
```

# This inside DOM element
- The value of this inside the DOM element is equal to the reference to that HTML element
  
  ```
  <html>
    <head>    
    </head>
    <body>
        <script src="app.js"></script>
        <button onclick="alert(this)" >Click Me</button> //Here the this keyword value contains the reference to this button element
    </body>
  </html>
  ```
