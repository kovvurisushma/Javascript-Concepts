**Table of Contents:**
 - [Why Promises?](#item-one)
 - [What is a Promise?](#item-two)
 - [Second Item](#item-three)

 <a id="item-one"></a>

 ### Why Promises?

- JavaScript is a single-threaded Language, meaning it can only execute one operation at a time.
- However, many tasks (like network requests, file reading, or timers) are asynchronous and can take an unknown amount of time to complete.
- To handle these tasks without blocking the main thread, JavaScript uses asynchronous operations.

**Callback Hell:**

Traditionally, asynchronous operations were handled using callbacks. 
However, this approach can lead to "callback hell," where callbacks are nested within callbacks, making the code difficult to read and maintain.

Example of Callback Hell:

```
doSomething(function(result) {
    doSomethingElse(result, function(newResult) {
        doAnotherThing(newResult, function(finalResult) {
            console.log(finalResult);
        });
    });
});
```

As JavaScript applications became more complex and started handling more asynchronous tasks(like network requests, file operations, and timers), maintaining the code's readability and manageability became a challenge with traditional callback-based approaches. 
This led to issues such as "callback hell," where nested callbacks made the code difficult to read and maintain.

To address these issues, JavaScript introduced Promises. Promises provide a more structured, standardised, and readable way to handle asynchronous operations. They allow you to chain operations and handle errors in a more straightforward manner, improving the overall readability and maintainability of the code.

 <a id="item-two"></a>
### What is a Promise in JavaScript?

A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It allows you to write asynchronous code more synchronously, making it easier to read and maintain.

(or)

A Promise is a standardized approach to dealing with asynchronous events and callbacks.

**States:** - A Promise can be in one of three states:

- **Pending:** The initial state, is neither fulfilled nor rejected.
- **Fulfilled:** The operation completed successfully.
- **Rejected:** The operation failed.

**Methods:**

- **.then(onFulfilled, onRejected):** Attaches callbacks for the resolution and/or rejection of the Promise.
- **.catch(onRejected):** Attaches a callback for only the rejection of the Promise.
- **.finally(onFinally):** Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected).

Example: our own promise object

```
const PENDING = 0
const FULFILLED = 1
const REJECTED = 2

function CustomPromise(executor) {
  let state = PENDING;
  let value = null;
  let handlers = [],
  let catches = []

  function resolve(result) {
      if(state !== PENDING) return;

      state = FULFILLED;
      value = result
      handlers.forEach((h) = > h(value))
  }

  function reject(err) {
     if(state !== PENDING) return;

     state = REJECTED
     value = err;

     catches.forEach((h) => h(value))
  }

  function then(callback) {
     if(state != PENDING) callback(value)
     handlers.push(callback)
  }

}

const doWork= (resolve, reject) => {
  setTimeout(() => resolve("Hello"), 1000)
}

const promise = new CustomPromise(dowork);

promise.then((value) => console.log("1 log:" , value))

promise.then((value) => console.log("2 log:" , value))

setTimeout(() => promise.then((value) => console.log("3 log:" , value)) , [3000])

```

**Benefits of Using Promises**

- **Improved Readability:** Promises make asynchronous code look more like synchronous code.
- **Error Handling:** A single .catch() method can handle errors from any step in the chain.
- **Chaining:** Promises can be chained, allowing for sequential execution of asynchronous tasks.
- **Avoiding Callback Hell:** Promises help avoid deeply nested callbacks, making the code easier to maintai
