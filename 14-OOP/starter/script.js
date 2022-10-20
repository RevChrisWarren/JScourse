'use strict';

const Person = function (firstName, birthYear) {
    // Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    // //NEVER DO THIS!!!
    // this.calcAge = function () {
    //     console.log(2022 - this.birthYear)
    // }

}

const chris = new Person('Chris', 1974);
// console.log(chris);

//because called with 'new'
// 1. New empty object {} was created
// 2. Function wacs called, and this = new empty object {}
// 3. new object {} linked to a prototype
// 4. object automatically returned from the constructor function

const joy = new Person('Joy', 1984)
// console.log(joy);


// console.log(chris instanceof Person);

//PROTOTYPES
console.log(Person.prototype);

Person.prototype.calcAge = function () {
    console.log(2022 - this.birthYear)
}

joy.calcAge();//Access to this because of prototypal inheritance
chris.calcAge();

console.log(chris.__proto__); //shows the prototype properties available
console.log(chris.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(joy));
console.log(Person.prototype.isPrototypeOf(chris));
console.log(Person.prototype.isPrototypeOf(Person));

//May be better to call this prototype of linked object