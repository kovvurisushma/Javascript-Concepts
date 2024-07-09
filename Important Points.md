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
                        
console.log(a) // gives uncaught reference error as variable a doesn't exist in code memory
```

