'use strict';
/*
//Random code used as example. Doesn't really make sense.
const name = 'Jonas'

const first = () => {
    let a = 1;
    const b = second(7, 9);
    a = a + b;
    console.log(a);
    console.log(b);
    return a;

}

function second(x, y) {
    var c = 2;
    return c;
}

const x = first();
//console.log(a);
//console.log(b);
console.log(x);


function calcAge(birthYear) {
    const age = 2037 - birthYear;
    console.log(firstName); //There because it is in global scope

    function printAge() {
        let output = `${firstName}, you are ${age}, born in ${birthYear}`
        console.log(output);

        if (birthYear >= 1981 && birthYear <= 1996) {
            var millennial = true;
            const firstName = 'Chris';//can declare this variable again within this scope
            const str = `Oh, and you're a millennial, ${firstName}`
            console.log(str);

            function add(a, b) {//not accessible outside this block, but works outside strict mode
                return a + b
            }

            output = 'NEW OUTPUT!' // reassigning outer scope variable
        }
        console.log(millennial); //works because var is function scoped, not block scoped-- cannot access str because it is declared with const
        console.log(output);
    }
    printAge();
    return age;
}

const firstName = 'Jonas';
calcAge(1991);


//hoisting with vairables
console.log(me)
// console.log(job);
// console.log(year);


var me = "Jonas";
let job = 'teacher';
const year = 1991;

//hoisting with funtions (declaration can be called, expression and arrow cannot)
console.log(addDecl(2, 3));
// console.log(addExp(2, 3));
// console.log(addArrow(2, 3));

function addDecl(a, b) {
    return a + b
}
//This will return undefined, not a function
// var addExp = function (a, b) {
//     return a + b
// }

// const addArrow = (a, b) => a + b;

//Example problem with var hoisting, b/c numProducts hoists as undefined, products deleted!

if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
    console.log('All products deleted')
}

//only var creates a variable on the window object
var x = 1
let y = 2
const z = 3

//this in global scope is the window object
console.log(this);

const calcAge1 = function (birthYear) {
    console.log(2037 - birthYear);
    console.log(this); //in strict mode this is undefined
}
calcAge1(1991);

const calcAgeArrow = (birthYear) => {
    console.log(2037 - birthYear);
    console.log(this); // = window, because that is "this" in the parent (global scope)
}
calcAgeArrow(1991);

const jonas = {
    year: 1991,
    calcAge: function () {
        console.log(this);
        console.log(2037 - this.year);
    }
}
jonas.calcAge()

const chris = {
    year: 2017
};

chris.calcAge = jonas.calcAge
chris.calcAge()

const f = jonas.calcAge;
console.log(f);
f();

const jonas = {
    firstName: 'Jonas',
    year: 1991,
    calcAge: function () {
        console.log(this);
        console.log(2037 - this.year);
        // const self = this
        // const isMillennial = function () {
        //     console.log(self.year >= 1981 && self.year <= 1996);
        //     console.log(self);
        // }
        const isMillennial = () => {
            console.log(this.year >= 1981 && this.year <= 1996);
            console.log(this);
        }
        isMillennial();
    },
    greet: () => console.log(`Hey ${this.firstName}`)
}
jonas.greet();
jonas.calcAge();

const addExpr = function (a, b) {
    console.log(arguments);
    return a + b;
}
addExpr(2, 5, 8, 12)
//arrow function does not have access to argument keyword
const addArrow = (a, b) => {
    console.log(arguments);
    return a + b
}

addArrow(2, 5)


let age = 30;
let oldAge = age;
age = 31;

console.log(age); // 31
console.log(oldAge); // 30

const me = {
    name: 'Jonas',
    age: 30
};

const friend = me;
friend.age = 27;

console.log('Friend', friend);
console.log('Jonas', me);
*/
//primitive types
let lastName = 'Williams'
let oldLastName = lastName
lastName = 'Davis'

console.log(lastName);
console.log(oldLastName);
//reference types
const Jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
};

const marriedJessica = Jessica;
marriedJessica.lastName = 'Davis'
console.log('Before Marriage', Jessica);
console.log('After Marriage', marriedJessica);

// marriedJessica = {};

const Jessica2 = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
    family: ['Alice', 'Bob']
};

const jessicaCopy = Object.assign({}, Jessica2);
jessicaCopy.lastName = "Davis";

console.log('Before Marriage', Jessica2);
console.log('After marriage', jessicaCopy);

//cannot do this to object within object because this doesn't change the heap reference
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');
console.log('Before Marriage', Jessica2);
console.log('After marriage', jessicaCopy);
