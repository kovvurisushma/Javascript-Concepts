### Table of Contents ###
- [Define Object](#define-object)
- [Dot Operator](#dot-operator)
- [Objects and Object Literals](#objects-and-object-literals)
- [Functions as Objects](#functions-as-objects)
- [Pass by Value and Pass by Reference](#pass-by-value-and-pass-by-reference)
- [Arrays in JavaScript](#arrays-in-javascript)
- [Automatic Semicolon Insertion](#automatic-semicolon-insertion)
- [Call, Apply and Bind](#call-apply-and-bind)
  - [Use Cases of Call, Apply and Bind](#use-cases-of-call-apply-and-bind)
- [Prototypal Inheritance](#prototypal-inheritance)
  - [Similarities and Differences between Call, Apply, Bind and Prototype Inheritance](#similarities-and-differences-between-call-apply-bind-and-prototype-inheritance)
  - [Why We Need Prototypal Inheritance](#why-we-need-prototypal-inheritance)
- [Constructor Functions](#constructor-functions)
  - [How does Function Constructors set the prototype Value for Object](#how-does-function-constructors-set-the-prototype-value-for-object)
  - [Advantages](#advantages)
  - [Why can't we add the methods inside the function constructor?](#why-cant-we-add-the-methods-inside-the-function-constructor)
  - [What Happens if you call a function constructor without a new keyword](#what-happens-if-you-call-a-function-constructor-without-a-new-keyword)
- [Object.create()](#objectcreate)
- [Polyfills](#polyfills)
- [ES6 Class Notation for Creating Objects](#es6-classes)

<a id="define-object"></a>
### Object in Js ###

**An object is a collection of named key-value pairs and a value can be another collection of key-value pairs**
- inside an object,
  - if the value of a key is primitive then it is called a member
  - if the value of a key is a function then it is called a method

<a id="dot-operator"></a>
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


<a id="objects-and-object-literals"></a>
## objects and object literals
- Object literal syntax means creating an object without using a new keyword, it just simply this: var parent = {}. This is called as object literal syntax.

<a id="functions-as-objects"></a>
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

<a id="pass-by-value-and-pass-by-reference"></a>
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

<a id="arrays-in-javascript"></a>
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

## Array as an Object in Javascript ##
- Array is considered as an object in javascript.
- In Array, the index is the name and the element is the value.
- so that's the reason we are able to access elements of an array in js using indexes as they are the names of the array objects.
- so if you want to add a custom method for the array prototype you can easily do it by adding the method to the array prototype object.

<a id="automatic-semicolon-insertion"></a>
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

<a id="call-apply-and-bind"></a>
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

<a id="use-cases-of-call-apply-and-bind"></a>
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

<a id="prototypal-inheritance"></a>
## Prototypal Inheritance 

**Prototype:**

Every JavaScript object has an internal property called [[Prototype]] (often accessed via __proto__).
This prototype is itself an object from which the original object inherits properties and methods.

**Prototype Chain:**

When you try to access a property or method on an object, JavaScript first looks at the object itself.
If the property or method is not found, it looks at the object's prototype, and then the prototype's prototype, and so on, until it reaches null (the end of the chain).
This chain of prototypes is called the prototype chain.

**Constructor Functions and prototype Property:**

Functions in JavaScript can be used as constructors with the new keyword.
Constructor functions have a prototype property that is used to set the [[Prototype]] of the objects created by the constructor.

```
// Define a prototype object
const personPrototype = {
    greet: function() {
        console.log('Hello, my name is ' + this.name);
    }
};

// Create an object that inherits from personPrototype
const charlie = Object.create(personPrototype);
charlie.name = 'Charlie';
charlie.age = 28;

// Access the inherited method
charlie.greet(); // Output: Hello, my name is Charlie

// Check the prototype chain
console.log(Object.getPrototypeOf(charlie) === personPrototype); // true
```

<a id="similarities-and-differences-between-call-apply-bind-and-prototype-inheritance"></a>
## Similarities and Differences between (Call, Apply, Bind) and Prototype In Heritance.
- The Call, Apply, and bind methods also allow us to get access or use other object methods or properties similar to prototype inheritance, there are some differences in why prototype inheritance is useful.
- Using Call, Apply, and Bind, we are just borrowing the methods temporarily for that moment, but using prototype inheritance, we are attaching them to the object, and they can be shared across the instances.

<a id="why-we-need-prototypal-inheritance"></a>
**Why We Need Prototypal Inheritance**

**Shared Behavior:**

Prototypal inheritance allows multiple objects to share the same methods and properties, which promotes code reuse and memory efficiency.
Methods defined on the prototype are shared among all instances, so they are not duplicated for each instance.

**Object Hierarchies:**

Prototypal inheritance allows you to create complex object hierarchies where objects can inherit from other objects.
This is useful for modeling real-world relationships and creating more organized and maintainable code.

**Extensibility:**

Objects inherited from a prototype can override or extend the inherited properties and methods.
This allows for flexible and dynamic behavior, where child objects can customize or enhance the functionality provided by their prototypes.

**Dynamic Method Addition:**

You can add methods to the prototype at any time, and all instances that inherit from that prototype will have access to the new methods.
This is useful for adding new functionality to existing objects without modifying their constructors.  

**Example of Extensibility:**

```
function Person(name) {
    this.name = name;
}

Person.prototype.greet = function() {
    console.log('Hello, my name is ' + this.name);
};

const alice = new Person('Alice');
const bob = new Person('Bob');

// Add a new method to the prototype
Person.prototype.sayGoodbye = function() {
    console.log('Goodbye from ' + this.name);
};

alice.sayGoodbye(); // Output: Goodbye from Alice
bob.sayGoodbye();   // Output: Goodbye from Bob
```

<a id="constructor-functions"></a>
## Function Constructors

Function Constructors in JavaScript are a way to create Objects and define their properties and methods. They are essentially the normal functions that are used with
```new``` keyword to create instances of objects.  When a function is used as a constructor, it sets up the new object and initializes its properties.

- **Constructor Function:** A function intended to be used with the new keyword to create new objects.
- **this Keyword:** Inside a constructor function, this refers to the new object being created.
- **Prototype:** Constructor functions have a prototype property that allows you to add methods and properties that will be shared among all instances created by the constructor.

```
function Person() {
  this.firstName = "John"
  this.lastName = "Doe"
}

var john = new Person()
console.log(john)

//Output:
Person {firstName: "John", lastName: "Doe"}
```

- **New**: Whenever we use a new Operator, an empty object is created immediately.
- **New Operator**: Creates a new object, sets its prototype to the constructor function's prototype property, binds this to the new object, initializes properties, and returns the new object.
- So whenever we invoke a function with the new keyword, the "this" keyword in that function points to the empty object created by the new keyword.
- Now when we do this.firstName = and this.lastName=, we are adding this firstName and lastName to this empty object.
- As long as the function invoked by the new keyword doesn't return anything, the JSEngine returns the object created by the new keyword.
- But if the function returns something then that will be the value of john. consider the following example as the function is returning an object the value of john will be that object.
   
```
function Person() {
  this.firstName = "John"
  this.lastName = "Doe"
  return {greeting: "I got in the way"}
}

var john = new Person()
console.log(john)

//Output:
Object {greeting: "I got in the way"}
```

- you can create multiple objects using this constructor function.

```
function Person() {
  this.firstName = "John"
  this.lastName = "Doe"
}

var john = new Person()
console.log(john)

var jane = new Person()
console.log(jane)

//Output:
Person {firstName: "John", lastName: "Doe"}
Person {firstName: "John", lastName: "Doe"}
```
- Here the two separate objects of the same Person type will be created as we are invoking with a new keyword.
- We can set separate parameters to make this Person object more generic.
  
```
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

var john = new Person("John", "Doe")
console.log(john)

var jane = new Person("Jane", "Doe")
console.log(jane)

//Output:
Person {firstName: "John", lastName: "Doe"}
Person {firstName: "Jane", lastName: "Doe"}
```

<a id="how-does-function-constructors-set-the-prototype-value-for-object"></a>
**How does Function Constructors set the prototype Value for Object**

- As we all know, Functions are special objects in Javascript. Some properties are present inbuilt for function objects like - name, code property and prototype property.
// TODO: Add Screenshot

<a id="advantages"></a>
**Advantages of Constructor Function**
- The main advantage of creating an object using the Constructor Function is that we can add the methods to the prototype of that function and all the objects that are created will get access to these methods in the prototype using prototype inheritance.

```
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

Person.prototype.getFullName = function() { return this.firstName + " " +  this.lastName}

var john = new Person("John", "Doe")
console.log(john)

var jane = new Person("Jane", "Doe")
console.log(jane)

john.getFullName()
jane.getFullName()

//Output:
Person {firstName: "John", lastName: "Doe"}
Person {firstName: "Jane", lastName: "Doe"}
```
- So it helps in adding new methods to the prototype which will be accessible to all the instances created.

<a id="why-cant-we-add-the-methods-inside-the-function-constructor"></a>
**Why can't we add the methods inside the function constructor?**

- why can't we add methods similar to members/variables inside the function constructor? why is it the best practice to add them to the prototype object?
  - When we create an object using the new operator, a new object is instantiated each time, consuming memory space.
  - If we add methods inside the constructor function, similar to how we add member variables (e.g., firstName and lastName), each new object will have its own copy of these       
     methods.
  - For example, if we create 1000 Person objects, each object will have its own greet() or getFullName() method, leading to 1000 copies of these methods. This will consume a 
     significant amount of memory unnecessarily.
  - Member variables should be defined inside the constructor because their values will differ from object to object. For instance, each Person object will have a different 
    firstName and lastName, so it is important to create these members individually for each object.
  - However, methods are typically the same for all instances of an object. To reduce memory usage, we define methods on the prototype. This way, the methods are shared and 
     accessible among all objects created from the constructor, ensuring efficient memory usage.
  
```
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

Person.prototype.getFullName = function() { return this.firstName + " " +  this.lastName}

var john = new Person("John", "Doe")
console.log(john)

var jane = new Person("Jane", "Doe")
console.log(jane)

john.getFullName()
jane.getFullName()

//Output:
Person {firstName: "John", lastName: "Doe"}
Person {firstName: "Jane", lastName: "Doe"}
```

<a id="what-happens-if-you-call-a-function-constructor-without-a-new-keyword"></a>
**What Happens if you call a function constructor without a new keyword**

```
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

var john = Person("John", "Doe")
console.log(john)

//Output: undefined as we are not returning anything
```

- Consider this example where you are returning this object.

```
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
  return this
}

var john = Person("John", "Doe")
console.log(john)
```
- Output: the john value has the window object or the object to which the "this" keyword is pointing to in that execution context.
  
```
function Person(firstName, lastName) {
    const obj = {};
    obj.firstName = firstName;
    obj.lastName = lastName;
    Object.setPrototypeOf(obj, Person.prototype);
    return obj;
}

Person.prototype.greet = function() {
    console.log('Hello, my name is ' + this.firstName + ' ' + this.lastName);
};

const p1 = Person('John', 'Doe'); // Works, but not idiomatic
const p2 = new Person('Jane', 'Doe'); // Works, but not consistent with p1

console.log(p1 instanceof Person); // true
console.log(p2 instanceof Person); // true
p1.greet(); // Output: Hello, my name is John Doe
p2.greet(); // Output: Hello, my name is Jane Doe
```
- The above code achieves the same result as a function constructor by creating an empty object, initializing it, and setting its prototype. However, this approach is not recommended for creating objects because it is more prone to errors, less maintainable, and less performance-efficient compared to using a function constructor with the new keyword.
- Traditional Function Constructor: Preferred for its readability, maintainability, performance, and robustness. It follows JavaScript conventions and ensures consistent behavior.
- The new keyword is optimized by JavaScript engines to efficiently set up the prototype chain. The new keyword handles object creation and initialization in a single, optimized step.


<a id="objectcreate"></a>
## Creating Objects using Object.create() Method ##

The Object.create method in JavaScript is a powerful and flexible way to create new objects with a specified prototype. This method allows you to create an object that directly inherits from another object, which can be very useful for setting up inheritance hierarchies.

- **Prototype:** The object from which the new object will inherit properties and methods.
- **Properties Object:** An optional second argument that allows you to define additional properties for the new object.

Syntax

```
const newObject = Object.create(prototypeObject, propertiesObject);
```

Example:

```
var person = {
  firstName: 'default'
  secondName: 'default'
  greet(): function() {console.log(this.firstName + ' ' + this.secondName)}
}

var john = Object.create(person)
john.firstName = "john"
john.secondName = "Doe"
console.log(john)
```

<a id="polyfills"></a>
## Polyfills in Javascript ##

Polyfills are an important concept in JavaScript, especially when dealing with cross-browser compatibility and ensuring that your code works in older environments that may not support newer features. Let's dive into what polyfills are, why they are used, and how to create and use them.

**What is a Polyfill?**

A polyfill is a piece of code (usually JavaScript) that provides the functionality of modern features on older browsers or environments that do not natively support those features. Essentially, polyfills "fill in" the gaps in functionality, allowing developers to use modern APIs and features without worrying about compatibility issues.

**Why Use Polyfills?**

- **1.Cross-Browser Compatibility:** Different browsers may support different sets of features. Polyfills ensure that your code works consistently across all browsers.
- **2.Backward Compatibility:** Older browsers may not support newer JavaScript features. Polyfills allow you to use modern features while maintaining compatibility with older browsers.
- **3.Future-Proofing:** As new features are added to JavaScript, polyfills can help you adopt these features early, even if they are not yet widely supported.

**How to Use Polyfills**

Polyfills can be included in your project in several ways:

- **Manually Including Polyfills:** You can manually include polyfill scripts in your HTML or JavaScript files.
- **Using Polyfill Services:** Services like polyfill.io provide a way to include polyfills dynamically based on the user's browser.
- **Using Libraries:** Libraries like Babel include polyfills for modern JavaScript features.

Example

```
if(!Object.create) {
  Object.create = function(o) {
    if(arguments.length > 1) throw new Error("Object.create method allows only one object as first parameter")
    function F() { }
    F.prototype = o
    return new F();
  }
}
```
<a id="es6-classes"></a>

### ES6 Class Notation For Creating Objects ###

ES6 (ECMAScript 2015) introduced a new syntax for creating objects and handling inheritance in JavaScript, known as class notation. This syntax provides a more familiar and structured way to define constructor functions and handle inheritance, making it easier to create and manage objects.

Key Concepts
- **Class Declaration:** Defines a new class with a constructor and methods.
- **Constructor Method:** A special method for creating and initializing objects created with the class.
- **Instance Methods:** Methods defined inside the class that are available to all instances.
- **Static Methods:** Methods defined on the class itself, not on instances of the class.
- **Inheritance:** Using the extends keyword to create a subclass that inherits from a parent class.
- **Super Keyword:** Used to call the constructor or methods of the parent class.

Example
```
// Step 1: Define the class
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    greet() {
        console.log(`Hello, my name is ${this.firstName} ${this.lastName}`);
    }
}

// Create instances of the class
const alice = new Person('Alice', 'Smith');
const bob = new Person('Bob', 'Johnson');

// Step 2: Add a new method to the prototype
Person.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
};

// Step 3: Use the new method
console.log(alice.getFullName()); // Output: Alice Smith
console.log(bob.getFullName());   // Output: Bob Johnson
```
