"use strict";
/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive!");
//reserved for possible future use
//const interface = "audio";
//const private = "home";


function logger() {
    console.log('My name is Chris');
}

logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
    // console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`
    return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);
console.log(fruitProcessor(5, 0));

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

//function declaration
function calcAge1(birthYear) {
    return 2022 - birthYear;
};

const chrisAge1 = calcAge1(1974);
console.log(chrisAge1);

//function expression
const calcAge2 = function (birthYear) {
    return 2022 - birthYear;
}
const chrisAge2 = calcAge2(1975);
console.log(chrisAge2);


//Arrow function

const calcAge3 = birthYear => 2022 - birthYear;
const chrisAge3 = calcAge3(1974)
console.log(chrisAge3);

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2022 - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement} years`
}

console.log(yearsUntilRetirement(1974, "Chris"))
console.log(yearsUntilRetirement(1971, "Glenn"));


function fruitCutter(fruit) {
    return fruit * 4;
}

function fruitProcessor(apples, oranges) {
    const applePieces = fruitCutter(apples);
    const orangePieces = fruitCutter(oranges);
    // console.log(apples, oranges);
    const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`
    return juice;
}
const newJuice = fruitProcessor(2, 3)
console.log(newJuice)

const calcAge = function (birth) {
    return 2022 - birth;
}

const yearsUntilRetirement = function (birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;

    if (retirement > 0) {
        console.log(`${firstName} retires in ${retirement} years`)
        return retirement
    } else {
        console.log(`${firstName} has already retired 😀`)
        return -1;
    }

    //return `${firstName} retires in ${retirement} years`
}

console.log(yearsUntilRetirement(1974, "Chris"));
console.log(yearsUntilRetirement(1918, "Joe"));


const calcAverage = (score1, score2, score3) =>
    (score1 + score2 + score3) / 3;



// const avgDolphins = calcAverage(44, 23, 71);
// const avgKoalas = calcAverage(65, 54, 49);
const avgDolphins = calcAverage(85, 54, 41);
const avgKoalas = calcAverage(23, 34, 27);

console.log(avgDolphins, avgKoalas)

const checkWinner = (avgDolphins, avgKoalas) => {
    if (avgDolphins >= avgKoalas * 2) {
        console.log(`Dolphins win with a score of Dolphins ${avgDolphins} and a score of Koalas ${avgKoalas}!`)
    } else if (avgKoalas >= avgDolphins * 2) {
        console.log((`Koalas win with a score of Koalas ${avgKoalas} and a score of Dolphins ${avgDolphins}!`))
    } else {
        console.log("No team had twice the other team's score, so no winner is declared!")
    }
};
checkWinner(avgDolphins, avgKoalas)



const friends = ["Michael", "Steven", "Peter"];

console.log(friends)
//Array function using new keyword
const randomYears = new Array(1991, 1984, 2008, 2020);
console.log(randomYears)

console.log(friends[0]);
console.log(friends[2]);
console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = "Jay";
console.log(friends);

const firstName = "Jonas"
const jonas = [firstName, "Schmedtmann", 2037 - 1991, "teacher", friends];
console.log(jonas);

const calcAge = function (birthYear) {
    return 2022 - birthYear;
}
const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[years.length - 1]);
const age3 = calcAge(years[2]);
console.log(age1, age2, age3)
const ages = [calcAge(years[0]), calcAge(years[years.length - 1]), calcAge(years[2])]

//const ages = [age1, age2, age3]
console.log(ages)


//Array Methods
const friends = ["Michael", "Steven", "Peter"];
const newLength = friends.push("Jay");
console.log(friends);
console.log(newLength)

friends.unshift("John");
console.log(friends);

friends.pop(); //removes last element of array
const popped = friends.pop()
console.log(friends);
console.log(popped)

friends.shift();
console.log(friends);

console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob')); //will get -1
console.log(friends.includes('Michael'));
console.log(friends.includes('Mic'));


if (friends.includes('Peter')) {
    console.log('You have a friend named Peter')
}
if (friends.includes('Steven')) {
    console.log('You have a friend named Steven')
}
//coding challenge 2

const calcTip = (bill) => {
    if (bill >= 50 && bill <= 300) {
        return bill * .15
    } else {
        return bill * .2
    }
}
console.log(calcTip(100));

const bills = [125, 555, 44]
console.log(bills[0])


const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

const totals = [bills[0] + calcTip(bills[0]), bills[1] + calcTip(bills[1]), bills[2] + calcTip(bills[2])];
const totals2 = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]]
console.log(bills)
console.log(tips)
console.log(totals)
console.log(totals2)


const jonasObject = {
    firstName: "Jonas",
    lastName: "Schmedtmann",
    age: 2037 - 1991,
    job: "teacher",
    friends: ['Michael', 'Peter', 'Steven']
};
console.log(jonasObject)
console.log(jonasObject.firstName, jonasObject.lastName)
console.log(jonasObject["lastName"]);

const nameKey = "Name";
console.log(jonasObject['first' + nameKey]);
//use bracket notation when the key name has to be computed
const interestedIn = prompt("What do you want to know aout Jonas? Choose between firstName, lastName, age, job, and friends.");
jonasObject.location = "Portugal";
jonasObject['twitter'] = "@jonasschmedtmann";

if (jonasObject[interestedIn]) {
    console.log(jonasObject[interestedIn]);
} else {
    console.log("Property doesn't exist")
}



console.log(jonasObject)

console.log(`${jonasObject.firstName} has ${jonasObject.friends.length} friends, and his best friend is ${jonasObject.friends[0]}.`)


const jonasObject = {
    firstName: "Jonas",
    lastName: "Schmedtmann",
    birthYear: 1991,
    job: "teacher",
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: true,
    // calcAge: function (birthYear) {
    //     return 2037 - birthYear
    // }
    calcAge: function () {
        // console.log(this)

        return 2037 - this.birthYear
    },
    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()} year old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`
    }
}
const chris = {
    firstName: "Chris",
    birthYear: 1974,
    // calcAge: function () {
    //     //console.log(this);
    //     return 2037 - this.birthYear
    // }
    calcAge: function () {
        //console.log(this);
        this.age = 2037 - this.birthYear
        return this.age
    }
}
const jonasAge = jonasObject.calcAge();
console.log(jonasAge)
console.log(jonasObject.calcAge());
// console.log(jonasObject['calcAge'](1991));
// console.log(jonasObject.calcAge(jonasObject.birthYear));
// console.log(jonasObject.calcAge())
console.log(chris.calcAge());
console.log(chris.age);

console.log(jonasObject.getSummary());



//Coding challenge three
//my solution

const mark = {
    firstName: "Mark",
    lastName: "Miller",
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        return this.mass / this.height ** 2
    }

}


const john = {
    firstName: "John",
    lastName: "Smith",
    mass: 92,
    height: 1.95,
    calcBMI: function () {
        return this.mass / this.height ** 2
    }

}
const markBMI = mark.calcBMI();
const johnBMI = john.calcBMI();
if (markBMI > johnBMI) {
    console.log(`${mark.firstName} ${mark.lastName}'s BMI (${markBMI} is higher than ${john.firstName} ${john.lastName}'s BMI (${johnBMI}))`)
} else {
    console.log(`${john.firstName} ${john.lastName}'s BMI (${johnBMI} is higher than ${mark.firstName} ${mark.lastName}'s BMI (${markBMI}))`)
}

//teacher's solution

const mark2 = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        this.bmi = this.mass / this.height ** 2;
        return this.bmi
    }
}

const john2 = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    calcBMI: function () {
        this.bmi = this.mass / this.height ** 2;
        return this.bmi
    }
}

mark2.calcBMI();
john2.calcBMI();
console.log(mark2.bmi, john2.bmi);

if (mark2.bmi > john2.bmi) {
    console.log(`${mark2.fullName}'s BMI (${mark2.bmi}) is higher than ${john2.fullName}'s BMI (${john2.bmi})`)
} else {
    console.log(`${john2.fullName}'s BMI (${john2.bmi}) is higher than ${mark2.fullName}'s BMI (${mark2.bmi})`)

}

// console.log("Lifting weights repetition 1 🏋🏽")
// console.log("Lifting weights repetition 2 🏋🏽")
// console.log("Lifting weights repetition 3 🏋🏽")
// console.log("Lifting weights repetition 4 🏋🏽")
// console.log("Lifting weights repetition 5 🏋🏽")
// console.log("Lifting weights repetition 6 🏋🏽")
// console.log("Lifting weights repetition 7 🏋🏽")
// console.log("Lifting weights repetition 8 🏋🏽")
// console.log("Lifting weights repetition 9 🏋🏽")
// console.log("Lifting weights repetition 10 🏋🏽")

for (let rep = 1; rep <= 10; rep++) {
    console.log(`Lifting weights repetition ${rep} 🏋🏽`)
    //console.log("Lifting weights repetition " + rep + " 🏋🏽")
}


const jonasArray = [
    "Jonas",
    "Schmedtmann",
    2037 - 1991,
    "teacher",
    ['Michael', 'Peter', 'Steven'],
    true
];

let arrayTypes = [];

// for (let i = 0; i < jonasArray.length; i++) {
//     console.log(jonasArray[i], typeof jonasArray[i]);
//     //arrayTypes[i] = typeof jonasArray[i];
//     arrayTypes.push(typeof jonasArray[i]);
// };
// console.log(arrayTypes);
// let ages = []
// const years = [1991, 2007, 1969, 2020];
// for (let i = 0; i < years.length; i++) {
//     ages.push(2037 - years[i]);

// }
// console.log(ages);

//Continue and Break


console.log("---ONLY PRINT STRINGS---")
for (let i = 0; i < jonasArray.length; i++) {
    if (typeof jonasArray[i] !== "string") continue;
    console.log(jonasArray[i], typeof jonasArray[i]);
    //arrayTypes[i] = typeof jonasArray[i];
    arrayTypes.push(typeof jonasArray[i]);
};


console.log("---BREAK AT NUMBER---")
for (let i = 0; i < jonasArray.length; i++) {
    if (typeof jonasArray[i] === "number") break;
    console.log(jonasArray[i], typeof jonasArray[i]);
    //arrayTypes[i] = typeof jonasArray[i];
    arrayTypes.push(typeof jonasArray[i]);
};


const jonasArray = [
    "Jonas",
    "Schmedtmann",
    2037 - 1991,
    "teacher",
    ['Michael', 'Peter', 'Steven']
];

//Looping backwards
for (let i = jonasArray.length - 1; i >= 0; i--) {
    console.log(i, jonasArray[i]);
};

//loop in loop

for (let exercise = 1; exercise < 4; exercise++) {
    console.log(`----Starting Exercise ${exercise}----`)
    for (let rep = 1; rep < 6; rep++) {
        console.log(`Exercise ${exercise}:----lifting rep ${rep}----`)
    }

};


//While loops

// for (let rep = 1; rep <= 10; rep++) {
//     console.log(`Lifting weights repetition ${rep} 🏋🏽`)
//     //console.log("Lifting weights repetition " + rep + " 🏋🏽")
// }

// let rep = 1;
// while (rep <= 10) {
//     console.log(`WHILE: Lifting weights repetition ${rep} 🏋🏽`);
//     rep++
// }

let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);
while (dice !== 6) {
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log('Loop is about to end')
};
*/

//Coding Challenge Four

const calcTip = (bill) => {
    if (bill >= 50 && bill <= 300) {
        return bill * .15
    } else {
        return bill * .2
    }
}

let bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

let tips = [];
let totals = [];

for (let i = 0; i < bills.length; i++) {
    tips.push(calcTip(bills[i]))
    totals.push(tips[i] + bills[i]);
}
console.log(bills, tips, totals);

const calcAverage = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        // sum = sum + arr[i];
        sum += arr[i]
    }
    console.log(sum)
    return sum / arr.length
}
console.log(calcAverage(totals))

console.log(calcAverage(tips))

console.log(calcAverage(bills))