"use strict"

// this in global space
console.log(this) // refers to the global object --> in case of browser the global object is window.

//this inside function
function a() {
    // the value depends on strict / non strict mode
    console.log(this);
}
a();

// this inside non-strict mode - (this substitution)
// If the value of this keyword is null or undefined. then the value of "this" keyword will be replaced with global object only in non-strict mode.


// this keyword value depends on how the function is called (window)
a() // in strict mode --> undefined
window.a() // -> window object


// this inside an object's method

var obj = {
    a: 10,
    x: function () {
        console.log(this) // prints the obj -> {a: 10, x: function({...})}
    }

}

obj.x()

// in case of arrow functions

var obj1 = {
    a: 10,
    x: () =>  {
        console.log(this) // prints the window object 
    }

}

obj1.x()

// this inside a nested function

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


//this inside a DOM elements --> reference to HTML Element
