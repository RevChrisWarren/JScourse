/* let js = "amazing";
console.log(40 + 8 + 23 - 10);

let firstName = "Jonas";
console.log(firstName);


let javascriptIsFun = true;
console.log(javascriptIsFun);
console.log(typeof true);

javascriptIsFun = "YES!";
console.log(typeof javascriptIsFun);
console.log(javascriptIsFun);

let year;
console.log(year)
console.log(typeof year);

year = 1991;
console.log(year)
console.log(typeof year);

console.log(typeof null);


let age = 30;

age = 47;

const birthYear = 1991;

const now = 2037;
const ageChris = now - 1974;
const ageGrey = now - 2002;
console.log(ageChris, ageGrey)
// 2**3 = 2 to the power of three
console.log(ageChris * 2, ageChris / 10, 2 ** 3)

const firstName = "Chris";
const lastName = "Warren";

console.log(firstName + " " + lastName);

//assignment operators

let x = 10 + 5; //15
console.log(x);
x += 10; // x = x + 10 = 25
console.log(x);
x *= 4; //x = x*4
console.log(x);
x++; //x = x + 1
console.log(x);
x--; //x = x - 1
console.log(x);

//comparison operators
console.log(ageChris > ageGrey);
console.log(ageGrey >= 21)

const isFullAge = ageGrey >= 21;
console.log(isFullAge);


const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10
console.log(x, y);

x += y;
console.log(x, y);
const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah)
console.log(averageAge);

//First Challenge
const markMass = 78;
const markHeight = 1.69;
const johnMass = 92;
const johnHeight = 1.95;

const markBMI = markMass / markHeight ** 2;
const johnBMI = johnMass / johnHeight ** 2;

const markHigherBMI = markBMI > johnBMI;

console.log(markBMI, johnBMI);
console.log(markHigherBMI);

const markMass2 = 95;
const markHeight2 = 1.88;
const johnMass2 = 85;
const johnHeight2 = 1.76;
let markBMI2 = markMass2 / markHeight2 ** 2;
let johnBMI2 = johnMass2 / johnHeight2 ** 2;

let markHigherBMI2 = markBMI2 > johnBMI2;

console.log(markBMI2, johnBMI2);
console.log(markHigherBMI2);


const firstName = "Jonas";
const job = "teacher";
const birthYear = 1991;
const year = 2037;

const jonas = "I'm " + firstName + ", a " + (year - birthYear) + " year old " + job + "!";
console.log(jonas)

const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`
console.log(jonasNew);

const age = 15;

if (age >= 18) {
    console.log("Sarah can get a driver's license 🤪!")
} else {
    const yearsLeft = 18 - age;

    console.log(`Sarah can get her license in ${yearsLeft} years.`)
}

const birthYear = 2012;
let century
if (birthYear <= 2000) {
    century = "20th century";
} else {
    century = "21st century"
}
console.log(century);


//First Challenge
const markMass = 78;
const markHeight = 1.69;
const johnMass = 92;
const johnHeight = 1.95;

//const markMass = 95;
//const markHeight = 1.88;
//const johnMass = 92;
//const johnHeight = 1.76;

const markBMI = markMass / markHeight ** 2;
const johnBMI = johnMass / johnHeight ** 2;

const markHigherBMI = markBMI > johnBMI;

console.log(markBMI, johnBMI);
console.log(markHigherBMI);

if (markBMI > johnBMI) {
    console.log("Mark's BMI is higher than John's!")
} else {
    console.log("John's BMI is higher than Mark's!");
}

if (markBMI > johnBMI) {
    console.log(`Mark's BMI is ${markBMI}, which is higher than John's BMI at ${johnBMI}`)
} else {
    console.log(`John's BMI is ${johnBMI}, which is higher than Mark's BMI at ${markBMI}`)
};


// type conversion
const inputYear = '1991';
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number('Jonas'));
console.log(typeof NaN);

console.log(String(23), 23);

//type coercion
//JS changes number to string here.
console.log('I am ' + 23 + ' years old.')
//JS changes strings to numbers here
console.log('23' - '10' - 3);
// with plus sign, JS concatenates instead
console.log('23' + '10' + 3);
console.log("23" / "2");

let n = "1" + 1;
n = n - 1;
console.log(n)


//falsy = not false, but will become false when converted into boolean

//falsy values (5 types) 0, '', undefined, null, NaN
// anything else is a truthy value

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Jonas'));
console.log(Boolean({}));
console.log(Boolean(''));

//type coercion to booleans: when using logical operators and in if/else statements

const money = 0;

if (money) {
    console.log("Don't spend it all")
} else {
    console.log("You should get a job!")
}

let height = 0;
if (height) {
    console.log("Yay, height is defined")
} else {
    console.log("Height is UNDEFINED")
}


const age = 18;
if (age === 18) console.log("You just became an adult");

const favorite = Number(prompt('What is your favorite number?'));
console.log(favorite)

if (favorite === 23) {
    console.log('Cool! 23 is a great number!')
} else if (favorite === 7) {
    console.log('7 is also a cool number!')
} else {
    console.log('Number is not 23 or 7')
}

if (favorite !== 23) {
    console.log("why not 23?")
}


//Boolean Logic
const hasDriversLicense = true;
const hasGoodVision = true;

// console.log(hasDriversLicense && hasGoodVision);
// console.log(hasDriversLicense || hasGoodVision);
// console.log(!hasDriversLicense);

const shouldDrive = hasDriversLicense && hasGoodVision;

// if (shouldDrive) {
//     console.log("Sarah is able to drive")
// } else {
//     console.log("Someone else should drive")
// }

const isTired = false;
if (hasDriversLicense && hasGoodVision && !isTired) {
    console.log("Sarah is able to drive!")
} else {
    console.log("Someone else should drive...")
}

//set 1
const dscore1 = 96;
const dscore2 = 108;
const dscore3 = 89;

const kscore1 = 88;
const kscore2 = 91;
const kscore3 = 110;

//set 2
// const dscore1 = 97;
// const dscore2 = 112;
// const dscore3 = 101;

// const kscore1 = 109;
// const kscore2 = 95;
// const kscore3 = 123;

//set 3
// const dscore1 = 97;
// const dscore2 = 112;
// const dscore3 = 101;

// const kscore1 = 109;
// const kscore2 = 95;
// const kscore3 = 106;

const dolphinAvg = ((dscore1 + dscore2 + dscore3) / 3);
const koalaAvg = ((kscore1 + kscore2 + kscore3) / 3);
console.log("Dolphins' average is " + dolphinAvg);
console.log("Koalas' average is " + koalaAvg)


if (dolphinAvg > koalaAvg && dolphinAvg >= 100) {
    console.log("Dolphins win the trophy!")
} else if (koalaAvg > dolphinAvg && koalaAvg >= 100) {
    console.log("Koalas win the trophy!")
} else if (dolphinAvg === koalaAvg && dolphinAvg >= 100) {
    console.log("Dolphins and Koalas share the trophy!")
} else {
    console.log("Neither team met 100 point requirement, no trophy is awarded!")
}

const day = "sunday";
switch (day) {
    case "monday":
        console.log("Plan course structure");
        console.log("Go to coding meetup");
        break;
    case "tuesday":
        console.log("Prepare Theory videos")
        break;
    case "wednesday":
    case "thursday":
        console.log("Write code examples");
        break;
    case "friday":
        console.log("record videos")
        break;
    case "saturday":
    case "sunday":
        console.log("enjoy the weekend!");
        break;
    default:
        console.log("not a valid day")
}

if (day === "monday") {
    console.log("Plan course structure");
    console.log("Go to coding meetup");
} else if (day === "tuesday") {
    console.log("Prepare Theory videos")
} else if (day === "wednesday" || day === "thursday") {
    console.log("Write code examples");
} else if (day === "friday") {
    console.log("record videos")
} else if (day === "saturday" || day === "sunday") {
    console.log("enjoy the weekend!");
} else {
    console.log("not a valid day")
}


//ternary or conditional operator basically if/else in one line

const age = 19;
age >= 18 ? console.log("I like to drink wine 🍷") : console.log("I like to drink water 💧")

const drink = age >= 18 ? 'wine 🍷' : "water 💧";
console.log(drink);

let drink2;
if (age >= 18) {
    drink2 = "wine 🍷"
} else {
    drink2 = "water 💧";
}
console.log(drink2);

console.log(`I like to drink ${drink}`)

console.log(`I like to drink ${age >= 18 ? 'wine 🍷' : "water 💧"}`);


//coding challenge
const bill = 300;

const tip = bill >= 50 && bill <= 300 ? bill * .15 : bill * .2;

console.log(`The bill is ${bill}, the tip is ${tip}, and the total is ${bill + tip}`)
*/

