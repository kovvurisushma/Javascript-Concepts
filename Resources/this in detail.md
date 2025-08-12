# JavaScript `this` & Arrow Functions Cheat Sheet

## 1. `this` in Regular Functions
- **Global Scope:**
  - Non-strict mode → `this` = `globalThis` (window in browsers, global in Node)
  - Strict mode → `this` = `undefined`
- **Function Call (not method):**
  - Non-strict mode → `this` = `globalThis`
  - Strict mode → `this` = `undefined`
- **Method Call:**  
  - `this` = the object before the dot (call site determines it)
- **Constructor Call (`new`):**
  - Creates a new object and binds `this` to it
  - If constructor returns an object, that replaces `this`

---

## 2. Arrow Functions & `this`
- **No own `this`:**  
  - Arrow functions *lexically inherit* `this` from the **parent lexical scope** at the time they are created
- **Not affected by:**
  - `.call()`, `.apply()`, `.bind()` → `this` stays the same
  - Strict mode (only the parent's scope strictness matters)
- **Inside Methods:**  
  - If defined inside a regular method, `this` is inherited from that method’s `this`
- **In Global Scope:**
  - Non-strict global → `this` = `globalThis`
  - Strict global → `this` = `undefined`

---

## 3. Lexical Context (Lexical Scope)
- **Definition:** The environment where code is written (determined at compile time)
- For arrow functions:
  - The nearest non-arrow function or global/module scope defines `this`
- Example:
 
 ```
 const obj = {
    name: "Bob",
    method: function() {
      const arrow = () => console.log(this.name);
      arrow(); // "Bob"
    }
  };
  obj.method();
```

## 4. This Binding Methods

- call(thisArg, ...args)
  - Calls immediately with the provided this
- apply(thisArg, argsArray)
  - Same as call, but arguments passed as an array
- bind(thisArg)
  - Returns a new function with this permanently set
- **For arrow functions: None of the above can change this**


## 5.Quick Decision Flow for this

- step1: Arrow function?
→ Inherit from lexical parent scope → Done.

- step2: Called with new?
→ Bind to new object (unless object returned explicitly).

- step3: Explicit binding (call, apply, bind)?
→ Bind to given this (unless arrow function).

- step4: Called as object method?
→ Bind to the object before the dot.

- step5: Plain function call?
→ Global object (non-strict) or undefined (strict).

