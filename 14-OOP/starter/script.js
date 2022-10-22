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
//console.log(Person.prototype);

Person.prototype.calcAge = function () {
    console.log(2022 - this.birthYear)
}
/*
joy.calcAge();//Access to this because of prototypal inheritance
chris.calcAge();

console.log(chris.__proto__); //shows the prototype properties available
console.log(chris.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(joy));
console.log(Person.prototype.isPrototypeOf(chris));
console.log(Person.prototype.isPrototypeOf(Person));

//May be better to call this prototype of linked object
//setting properties on prototype
Person.prototype.species = "Homo Sapien";
console.log(chris, joy);
console.log(chris.species);

console.log(chris.hasOwnProperty('firstName'));
console.log(chris.hasOwnProperty('species'));

console.log(chris.__proto__);
//Object.prototype
console.log(chris.__proto__.__proto__);
console.log(chris.__proto__.__proto__.__proto__);//Null because object is at top of chain

console.dir(Person.prototype.constructor);

const arr = [3, 6, 4, 5, 8, 7, 6, 6, 7, 4, 3, 56, 8, 9, 0];
console.log(arr.__proto__);

console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);


//NOT A GOOD IDEA TO EXTEND A BUILT IN PROTOTYPE
Array.prototype.unique = function () {
    return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');

console.dir(x => x + 1)


const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

console.log(bmw, mercedes);

Car.prototype.accelerate = function () {
    //this.speed +=10
    this.speed = this.speed + 10
    console.log(this.speed);

};
Car.prototype.brake = function () {
    //this,speed -= 5
    this.speed = this.speed - 5;
    console.log(this.speed);
}

bmw.accelerate()
mercedes.accelerate()

bmw.brake()
mercedes.brake()
mercedes.brake()
*/

//ES6 CLASSES
//class expression
//const PersonCl = class {}

//class declaration
class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
    //This will be on the prototype, not on the object itself
    calcAge() {
        console.log(2022 - this.birthYear);
    }
    get age() {
        return 2022 - this.birthYear
    }

    //Common pattern for settign property that already exists
    set fullName(name) {
        console.log(name);
        if (name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name.`)
    }

    get fullName() {
        return this._fullName
    }

    static hey() {
        console.log('Hey There!');
        console.log(this);
    }
}


const jessica = new PersonCl('Jessica Davis', 1989);

console.log(jessica);
jessica.calcAge();

console.log(jessica.__proto__ === PersonCl.prototype);
PersonCl.prototype.greet = function () {
    console.log(`Hey, ${this.firstName}`);
}
console.log(jessica.age)
jessica.greet()


const walter = new PersonCl('Walter Jones', 1958)

console.log(walter.age)

//NOTES:
// 1. Classes are not hoisted
// 2. Classes are first class citizens like functions
// 3. The body of the class is always executed in strict mode

//SETTERS AND GETTERS -functions that get and set a value

const account = {
    owner: 'jonas',
    movements: [200, 350, 600, -400],

    get latest() {
        return this.movements.slice(-1).pop()
    },
    set latest(mov) {
        this.movements.push(mov);
    }

};
//don't call method, just use as if a property
console.log(account.latest);

account.latest = 50;
console.log(account.movements);


//STATIC METHODS--not in prototype, so instances can't inherit it
Person.hey = function () {
    console.log('Hey There!');
    console.log(this);
}
Person.hey()

PersonCl.hey()