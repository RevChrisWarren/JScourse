'use strict';
/*
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

//Object.create
const PersonProto = {
    calcAge() {
        console.log(2022 - this.birthYear);
    },
    init(firstName, birthYear) {
        this.firstName = firstName
        this.birthYear = birthYear
    }
}

const steven = Object.create(PersonProto);
console.log(steven);

steven.name = 'Steven';
steven.birthYear = 2002;

steven.calcAge()

console.log(steven.__proto__);

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
console.log(sarah);
sarah.init('Sarah', 1979)
console.log(sarah);
sarah.calcAge()



class Car {
    constructor(make, speed) {

        this.make = make;
        this.speed = speed;
    }
    accelerate() {
        this.speed += 10;
        console.log(`The ${this.make} is traveling at ${this.speed}`);
    }
    brake() {
        this.speed -= 5;
        console.log(`The ${this.make} is traveling at ${this.speed}`);
    }
    get speedUS() {
        return this.speed / 1.6;
    }
    set speedUS(mph) {
        this.mph = mph * 1.6

    }
}

const ford = new Car('Ford', 120);
console.log(ford);
console.log(ford.speedUS);

ford.speedUS = 50
console.log(ford);

ford.accelerate()
ford.accelerate()

ford.brake()



const Person = function (firstName, birthYear) {
    // Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;
}

Person.prototype.calcAge = function () {
    console.log(2022 - this.birthYear)
}

const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear)
    this.course = course
}
//Linking prototypes
Student.prototype = Object.create(Person.prototype) //Must be done before any other methods are added

Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);

mike.introduce();
mike.calcAge();



console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);


Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);


const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}
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

const EV = function (make, speed, charge) {
    Car.call(this, make, speed)
    this.charge = charge
}
EV.prototype = Object.create(Car.prototype)
const tesla = new EV('Tesla', 120, 23);

console.log(tesla);

EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo
}
tesla.chargeBattery(90);

EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge -= 1;
    console.log(`${this.make} is going at a speed of ${this.speed}km/h, with a charge of ${this.charge}%`);
}
EV.prototype.constructor = EV;
console.log(tesla);
tesla.accelerate()
tesla.accelerate()
tesla.accelerate()
tesla.accelerate()

tesla.brake()
tesla.brake()


//INHERITANCE USING E6 CLASSES
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

    //Common pattern for setting property that already exists
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
class StudentCl extends PersonCl {
    constructor(fullName, birthYear, course) {
        //This needs to happen first--creates "this" keyword in subclass
        super(fullName, birthYear)
        this.course = course;
    }
    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}.`);
    }
    calcAge() {
        console.log(`I'm ${2022 - this.birthYear} years old, but as a student I feel more like ${2032 - this.birthYear}`);
    }
}

const martha = new StudentCl('Martha Jones', 2012, 'Music')

console.log(martha);
martha.introduce();
martha.calcAge();

//Object.create
const PersonProto = {
    calcAge() {
        console.log(2022 - this.birthYear);
    },
    init(firstName, birthYear) {
        this.firstName = firstName
        this.birthYear = birthYear
    }
}

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear)
    this.course = course;
}


StudentProto.introduce = function () {
    console.log(`Hi! My name is ${this.firstName}. I am ${2022 - this.birthYear} years old, and I study ${this.course}.`);
}
const jay = Object.create(StudentProto);
jay.init('Jay', 1882, 'Math')

console.log(jay);

jay.calcAge()
jay.introduce()

//
// Public Fields
// Private Fields
// Public Methods
// Private Methods

//There are also static versions


class Account {
    // 1) Defining a  Public Field --Not on prototype, on instances 
    locale = navigator.language;


    // 2) Private Fields
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;

        //Protected property
        // this._movements = [];
        // this.locale = navigator.language
        console.log(`Thanks for opening an account ${owner}!`);
    }
    //Public Interface of objects
    //Also Public Methods
    getMovements() {
        return this.#movements;
    }
    deposit(val) {
        this.#movements.push(val)
        return this
    }
    withdrawal(val) {
        this.deposit(-val)
        return this
    }

    requestLoan(val) {
        if (this._approveLoan(val)) {
            this.deposit(val)
            console.log('Loan Approved');
            return this;
        }
    }
    //Private Methods--not implemented in JS yet
    // #approveLoan(val) {
    _approveLoan(val) {
        return true;
    }
}

const acct1 = new Account('Jonas', "EUR", 1111);


// Not a good idea
// acct1.movements.push[250]
// acct1.movements.push[-250]

acct1.deposit(250)
acct1.withdrawal(150)
acct1.requestLoan(1000)

console.log(acct1);

//Encapsulation convention

console.log(acct1.getMovements())
// console.log(acct1.#pin);
// console.log(acct1.#movements);
// console.log(acct1.#approveLoan(100));

//Return object at end of method we want to be chainable

acct1.deposit(300).deposit(500).withdrawal(35).requestLoan(25000).withdrawal(4000);

console.log(acct1.getMovements());
*/
class carCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }
    accelerate() {
        this.speed += 10;
        console.log((`${this.make} is going at ${this.speed}km/h`));
        return this
    }
    brake() {
        this.speed -= 5;
        console.log(`${this.make} is going at ${this.speed} km/h`);
        return this
    }
    get speedUS() {
        this.speed = speed / 1.6;
    }
    set speedUS(speed) {
        this.speed * 1.6
    }
}

class EVCl extends carCl {
    #charge;
    constructor(make, speed, charge) {
        super(make, speed)
        this.#charge = charge;

    }
    brake() {
        this.speed -= 5;
        console.log(`${this.make} is traveling at a rate of ${this.speed} and has a charge of ${this.#charge}%`);
        return this;
    }
    acclerate() {
        this.speed += 10;
        this.#charge -= 1;
        return this;
    }
    chargeBattery(chargeTo) {
        this.#charge = chargeTo;;
        console.log(`${this.make} is traveling at a rate of ${this.speed} and has a charge of ${this.#charge}%`);
        return this;

    }
}

const rivian = new EVCl('Rivian', 120, 23)
console.log(rivian);

rivian.accelerate()
rivian.accelerate()
rivian.accelerate()
rivian.accelerate()

rivian.brake()
rivian.brake()
rivian.brake()
rivian.brake()

rivian.chargeBattery(100);
rivian.brake().accelerate().brake().chargeBattery(45).brake()


