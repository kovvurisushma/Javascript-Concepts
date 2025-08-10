**Table of Contents:**
 - [Why Promises?](#item-one)
 - [What is a Promise?](#item-two)
 - [The .then()](#item-three)
   - [Promise Chaining and Error Handling](#item-three-sub)
 - [Promise Concurrency](#item-four)
 - [How does JSEngine Execute a Promise](#item-five)

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
- **Avoiding Callback Hell:** Promises help avoid deeply nested callbacks, making the code easier to maintain

 <a id="item-three"></a>
### The .then()

The .then() method is a fundamental part of the Promise API in JavaScript. It allows you to specify what should happen when a Promise is fulfilled (resolved) or rejected. The method returns a new Promise, enabling the chaining of multiple asynchronous operations.

Syntax:

```
promise.then(onFulfilled, onRejected);
```

- **Chaining:** The .then() method **returns a new Promise**, allowing you to chain multiple .then() calls.
- **Error Handling:** If an error occurs in the onFulfilled function, it will be caught by the next .catch() in the chain.
- **Return Values:** The value returned by the onFulfilled or onRejected function becomes the resolved value of the new Promise returned by .then().

Example:

```
const doWork = (resolve, reject) => {
    setTimeout(() => resolve("Helloooo"), [3000])
}

const p1 = new Promise(doWork)
p1.then((val) => console.log(val))
```

 <a id="item-three-sub"></a>

**Promise Chaining and Error Handling**

Promise chaining is a technique in JavaScript that allows you to perform a sequence of asynchronous operations in a readable and manageable way. Each .then() method in the chain returns a new Promise, allowing you to chain multiple .then() calls together. This helps in avoiding deeply nested callbacks, often referred to as "callback hell."

Example:

```
const doWork = (resolve, reject) => {
    setTimeout(() => resolve("Helloooo"), 3000);
}

const p1 = new Promise(doWork);

p1.then((data) => {
    console.log(data); // "Helloooo"
    return "First then";
})
.then((val) => {
    console.log(val); // "First then"
    return "Second then";
})
.then(val1 => {
    console.log(val1); // "Second then"
});
```

- Each .then() returns a new promise.
- The return value of a .then() determines the next step:
  - If you return a value, it becomes the resolution value for the next .then().
  - If you return a promise, the next .then() waits for it to resolve.
- Errors propagate through the chain until they are caught by a .catch().

**Error Handling**

Error handling in promise chaining can be done using the following ways.
  - **onRejected Handler:**
    - You can provide an onRejected handler as the second argument to a .then() method. This handler will catch any errors that occur in the preceding Promise or onFulfilled handler.
    -  If an error is caught by an onRejected handler in a .then() method, the chain continues with the value returned by the onRejected handler.
    -  If the error handler executes normally (without throwing or returning a rejected promise), the promise returned by this .then() will be fulfilled by the next one in the chain instead of staying rejected.
    -  Therefore, if an error must be handled immediately, but we want to maintain the error state down the chain, we must throw an error of some type in the rejection handler.
    -  On the other hand, in the absence of an immediate need, it is simpler to leave out error handling until the final catch() handler.
  - **.catch() Method:**
    -  The .catch() block is used to handle any unhandled rejections in the chain.
    -  If the error is already handled by an onRejected handler, the .catch() block will not be executed.
  - **Finally Block:**
    - The finally block is executed after the Promise is settled, regardless of whether it was fulfilled or rejected. It is useful for cleanup actions.

- When an error occurs in the promise or in a .then() callback, it is caught by the closest .catch() in the chain or by the global unhandled rejection handler if no .catch() is found.
- If there is no .then() or .catch() that handles the error (rejection) in a Promise chain, the error will propagate up the chain and eventually result in an unhandled promise rejection. This can cause issues in your application, such as uncaught exceptions, and in some environments, it may even terminate the process.

Example:

```

const doWork = (resolve, reject) => {
    setTimeout(() => reject("Error occurred"), 3000);
}


const p1 = new Promise(doWork);


p1.then((data) => {
    console.log(data); // This onFulfilled handler will be skipped because the Promise is rejected
})
.then((val) => {
    console.log(val); // This onFulfilled handler will also be skipped
})
.then(
    (val1) => {
        console.log(val1); // This onFulfilled handler will be skipped
    },
    (err) => {
        console.log("inside error handlerrrrr"); // This onRejected handler will be executed because the Promise is rejected
        console.log(err); // Logs "Error occurred"
        throw new Error("hfbhbfhdf")
    }
)
.then(null, (error) => {
    console.log("Handled in onRejected:", error);  
    return "Recovered from error"; 
})
.then((val2) => {
    // This onFulfilled handler will be executed with the value returned from the previous onRejected handler
    console.log("Continued with:", val2); // Logs "Continued with: Recovered from error"
})
.catch((error) => {
    // This .catch() block will not be executed because the error was already handled
    console.error("Caught in catch:", error);
});
 .finally(() => {
     console.log("Cleanup actions"); // This will always be executed
 });
```

 <a id="item-four"></a>

### Promise Concurrency in JavaScript

Promise concurrency refers to the ability to manage multiple asynchronous operations simultaneously. JavaScript provides several methods to handle concurrent Promises, allowing you to execute multiple asynchronous tasks in parallel and manage their results efficiently.

1. **Promise.all:**
- Waits for all Promises to resolve or any to reject.
- Returns a single Promise that resolves with an array of results or rejects with the reason of the first rejected Promise.

Example:

```
const promise1 = new Promise((resolve) => setTimeout(resolve, 1000, 'one'));
const promise2 = new Promise((resolve) => setTimeout(resolve, 2000, 'two'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 3000, 'three'));

Promise.all([promise1, promise2, promise3])
    .then((values) => {
        console.log(values); // ["one", "two", "three"]
    })
    .catch((error) => {
        console.error(error);
    });
```
  
2. **Promise.allSettled:**
- Waits for all Promises to settle (either resolve or reject).
- Returns a single Promise that resolves with an array of objects describing the outcome of each input Promise.

Example:

```
const promise1 = new Promise((resolve) => setTimeout(resolve, 1000, 'one'));
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 2000, 'error'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 3000, 'three'));

Promise.allSettled([promise1, promise2, promise3])
    .then((results) => {
        results.forEach((result) => console.log(result));
        // { status: "fulfilled", value: "one" }
        // { status: "rejected", reason: "error" }
        // { status: "fulfilled", value: "three" }
    });
```

3. **Promise.race:**
- Returns a single Promise that resolves or rejects as soon as one of the input Promises resolves or rejects.

Example:

```
const promise1 = new Promise((resolve) => setTimeout(resolve, 1000, 'one'));
const promise2 = new Promise((resolve) => setTimeout(resolve, 2000, 'two'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 3000, 'three'));

Promise.race([promise1, promise2, promise3])
    .then((value) => {
        console.log(value); // "one"
    })
    .catch((error) => {
        console.error(error);
    });
```

4. **Promise.any:**
- Returns a single Promise that resolves as soon as one of the input Promises resolves.
- Rejects with an AggregateError if all input Promises reject.

Example:

```
const promise1 = new Promise((resolve, reject) => setTimeout(reject, 1000, 'error1'));
const promise2 = new Promise((resolve) => setTimeout(resolve, 2000, 'two'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 3000, 'three'));

Promise.any([promise1, promise2, promise3])
    .then((value) => {
        console.log(value); // "two"
    })
    .catch((error) => {
        console.error(error);
    });
```
 
 <a id="item-five"></a>

 ### How does JSEngine Execute a Promise

The JavaScript engine executes Promises using its event loop, microtask queue, and call stack. This is based on the event loop, which allows JavaScript to perform asynchronous operations without blocking the main thread.

1. **Creating a Promise:** When a Promise is created, the executor function (the function passed to the Promise constructor) is executed immediately. This function typically contains asynchronous operations.
```
const doWork = (resolve, reject) => {
    setTimeout(() => reject("Error occurred"), 3000);
};

const p1 = new Promise(doWork);
```
- The doWork function is executed immediately.
- The setTimeout function schedules an asynchronous operation to reject the Promise after 3 seconds.

2. **Promise States** - A Promise can be in one of three states:
Pending: The initial state, neither fulfilled nor rejected.
Fulfilled: The operation completed successfully.
Rejected: The operation failed.
3. **Handling Fulfillment and Rejection**: When the asynchronous operation completes, the Promise transitions from the "pending" state to either the "fulfilled" or "rejected" state. The corresponding handlers (onFulfilled or onRejected) are then scheduled to be executed.
4. **Event Loop and Microtasks**:
   - When a Promise is resolved or rejected, the corresponding handlers are scheduled to be executed in the microtask queue.
   - i.e., When the promise resolves, The corresponding handler function will be placed in the microtask queue.
   - The event loop continuously checks if the call stack is empty. If it is, it looks for tasks in the microtask queue and pushes them to the call stack for execution.
   - The microtask queue has a higher priority than the macrotask queue (which includes tasks like setTimeout and setInterval).
6. **Execution of Handlers**: The JavaScript engine processes the microtask queue after the current macrotask completes. This ensures that Promise handlers are executed as soon as possible, but not before the current synchronous code has finished executing.



