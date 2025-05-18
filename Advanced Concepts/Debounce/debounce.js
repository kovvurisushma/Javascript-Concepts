/* Brute force 

let id

const makeAPICall = () => {
    console.log("on input received......");
}

const optimise = (fn) => {
    clearTimeout(id)
    id = setTimeout(() => fn(), 500)
    // console.log("insideeee optimise...")
    // fn()
}

const optimisedMakeAPICall = () => optimise(makeAPICall)


*/

const makeAPICall = () => {
    console.log("on input received......");
}

const optimise = function (fn, t) {
    let id
    return function () {
        clearTimeout(id)
        id = setTimeout(() => {
            fn.apply(this, arguments)
        }, t)
    }
}

const optimisedMakeAPICall = optimise(makeAPICall, 300)
