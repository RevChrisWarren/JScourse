'use strict';
/*
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';


// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  orderDelivery: function ({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}!`);
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  }
};

restaurant.orderPizza('mushrooms', 'onion', 'spinach')

const rest1 = {
  name: "Capri",
  //numGuests: 10,
  numGuests: 0
}

const rest2 = {
  name: "La Piazza",
  owner: "Giovanni Rossi"
};

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

//Or assignment operator: Doesn't work with 0
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;
// console.log(rest1, rest2);
// rest1.owner = rest1.owner && '<ANONYMOUS>'//short circuits with first value that is falsy
// rest2.owner = rest2.owner && '<ANONYMOUS>'

rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';


rest1.numGuests ??= 10;
rest2.numGuests ??= 10;
console.log(rest1, rest2);



//Logical operators: can use any data type,
//can return any data type,
//short-circuiting: if first value is a truthy value, the other operand will not be evaluated
console.log('--------OR---------')
// console.log(3 || 'Jonas');

// console.log('' || 'Jonas');

// console.log(true || 0);
// //both falsy
// console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);
restaurant.numGuests = 0;
const guests = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests);

const guests2 = restaurant.numGuests || 15;
console.log(guests2);
//nullish coalescing operator (??)
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

// console.log('-----AND------')
// //And short circuits when meets first operator that is falsy
// console.log(0 && 'Jonas');
// console.log('Jonas' && 7);
// console.log('Hello' && 23 && null && 'Jonas');

// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach')
// };



// restaurant.orderPizza && restaurant.orderPizza('anchovies');

// const ingredients =
//   [prompt("Let's make some pasta! Ingredient 1?"),
//   prompt("Ingredient 2?"),
//   prompt("Ingredient 3?")];

// console.log(ingredients);

// restaurant.orderPasta(...ingredients);

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2
})
restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 2
})

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;
console.log(restaurantName, hours, tags);
//default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b);

//nested objects
const { fri: { open: friOpen, close: friClose } } = openingHours;
console.log(friOpen, friClose);

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

//spread operator
const newArr = [1, 2, ...arr];

console.log(newArr);
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocchi']
console.log(newMenu);

// copy array

const mainMenuCopy = [...restaurant.mainMenu]
console.log(mainMenuCopy);

//join arrays

const menu2 = [...restaurant.mainMenu, ...restaurant.starterMenu]
console.log(menu2);
//Iterables are arrays, srings, maps, sets, but not objects.

const str = "Jonas";
const letters = [...str, " ", 'S'];
console.log(letters);
console.log(...str);

//Spread oerator on Objects

const newRestaurant = { ...restaurant, founder: "Giuseppe", foundedIn: 1988 }
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurant.name, restaurantCopy.name);


//array destructuring
const arr = [2, 3, 4];
const a = arr[0]
const b = arr[1]
const c = arr[2]

const [x, y, z] = arr;
console.log(x, y, z);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

//to switch main and secondary

// const temp = main;
// main = secondary;
// secondary = temp;

// console.log(main, secondary);

[main, secondary] = [secondary, main]
console.log(main, secondary);

console.log(restaurant.order(2, 0))

//receive 2 items from a function
const [starter, mainCourse] = restaurant.order(2, 0)
console.log(starter, mainCourse);
//nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested
// console.log(i, j);
const [i, j, [k, l]] = nested
console.log(i, j, k, l);

// default value
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

//For DESTRUCTURING
//rest pattern used on left hand side of =

const arr = [1, 2, ...[3, 4, 5]];

const [a, b, ...others] = [1, 2, 3, 4, 5];

console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]
//does not include skipped elements--Rest element must be last element
console.log(pizza, risotto, otherFood);

const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

//Rest operator in functions
const add = function (...numbers) {
  console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i]
    console.log(sum);
  }

}
add(2, 3);
add(5, 3, 7, 2)
add(8, 2, 5, 3, 2, 1, 4)
const x = [23, 4, 5];
add(...x);


//short circuiting

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const players1 = game.players[0];

const players2 = game.players[1];
console.log(players1, players2);

const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

const allPlayers = [...players1, ...players2]
console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

const { team1, x: draw, team2 } = { ...game.odds };
console.log(team1, draw, team2);

const printGoals = function (...players) {
  console.log(`${players.length} goals were scored`)
}
printGoals("Davies", "Muller", "Lewandowski", "Kimich")
printGoals("Davies", "Muller")
printGoals(...game.scored)

team1 < team2 && console.log(`Team one is more likely to win`);
team2 < team1 && console.log(`Team two is more likely to win`);
//TEACHER SOLUTION

const [players11, players21] = game.players;
console.log(players11, players21);
//5
const {
  odds: { team1: team11, x: draw1, team2: team21 },
} = game;
console.log(team11, draw1, team21);

//6

const weekdays = ['mon', 'tue', 'wed', 'thurs', 'fri', 'sat', 'sun']
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  }
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
  },
  //openingHours: openingHours,
  //ES6 enhanced object literals
  openingHours,

  // orderPasta: function (ing1, ing2, ing3) {
  //   console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}!`);
  // },
  //NEW WAY TO DO THIS
  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}!`);
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    //console.log(mainIngredient, otherIngredients);
  }
};

restaurant.orderPizza('mushrooms', 'onion', 'spinach')

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

//FOR OF LOOP
// for (const item of menu) console.log(item);

// for (const item of menu.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}`);
// }
// //Better way with destructuring
// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`);
// }
// if (restaurant.openingHours && restaurant.openingHours.mon)
//   console.log(restaurant.openingHours.mon.open);
// //This causes error
// //console.log(restaurant.openingHours.mon.open);
// //Solution for this is Optional Chaining
// console.log(restaurant.openingHours?.mon?.open);

// //Example
// const days = ['mon', 'tue', 'wed', 'thurs', 'fri', 'sat', 'sun'];

// for (const day of days) {
//   //console.log(day);
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day} we open at ${open}`)

// }
// // on methods to see if it exists before calling it
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// //on Arrays
// const users = [
//   {
//     name: 'Jonas',
//     email: 'Jonas@jonas.com'
//   }
// ]
// console.log(users[0]?.name ?? 'User Array Empty');
// console.log(users[0]?.na ?? 'User Array Empty');

//Property names
const properties = Object.keys(openingHours)
console.log(properties);


let openStr = `We are open on ${properties.length} days: `
for (const day of properties) {
  openStr += `${day}, `
}

console.log(openStr);

const values = Object.values(openingHours);
//console.log(values);
//Entire object
const entries = Object.entries(openingHours);

console.log(entries);
for (const [key, { open, close }] of entries) {
  console.log(`on ${key}, we open at ${open} and close at ${close}`);
}


const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
//const entries = Object.entries(game.scored)
//console.log(entries);

for (const [i, el] of game.scored.entries()) {
  console.log(`${el} scored goal number ${Number(i) + 1}`);
}

const odds = Object.values(game.odds)
let average = 0
for (const odd of odds)
  average += odd;
console.log(average);
//average = average / odds.length
average /= odds.length
console.log(average);

//TEACHER SOLUTION
for (const [i, player] of game.scored.entries())
  console.log(`Goal ${i + 1}: ${player}`);

for (const [team, odd] of Object.entries(game.odds)) {

  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}



//Sets = collection of unique values

const ordersSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta', 'Pizza']);
console.log(ordersSet);

console.log(new Set('Jonas'));

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));

ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
//ordersSet.clear();

console.log(ordersSet);

for (const order of ordersSet) console.log(order);

//Example

const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

const staffUnique = [...new Set(staff)];
console.log(staffUnique);

console.log(new Set(staff).size);

console.log(new Set('ChrisWarren').size);

*/

//Maps= data structire used to map values to keys.Keys can be of any type.

// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze, Italy')
// console.log(rest.set(2, 'Lisbon, Portugal'));

// rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open')
//   .set(false, "We are closed")


// console.log(rest.get('name'));
// console.log(rest.get(true));

// const time = 21;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// console.log(rest.has('categories'));

// rest.delete(2);
// //rest.clear();
// const arr = [1, 2]
// rest.set(arr, 'Test')
// rest.set(document.querySelector('h1'), 'Heading')
// console.log(rest);
// console.log(rest.size);

// console.log(rest.get(arr));

// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, "Java"],
//   [3, "JavaScript"],
//   ['correct', 3],
//   [true, 'Correct!'],
//   [false, "Try Again..."]
// ])

// console.log(question);

//convert object to map

//const hoursMap = new Map(Object.entries(openingHours))

//Iteration on maps
// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`${key}: ${value}`);
// }
// //const answer = Number(prompt('Your answer'));
// const answer = 3
// console.log(answer);
// if (answer === 3) {
//   console.log(question.get(true));
// } else {
//   console.log(question.get(false));
// }
// console.log(question.get(question.get('correct') === answer));

// //convert map to array
// console.log([...question]);

// console.log([...question.entries()]);
// console.log([...question.keys()]);
// console.log([...question.values()]);

/*
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow Card'],
  [69, '🔴 Red Card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow Card']
]);

//1
const events = new Set([...gameEvents.values()])
console.log(events);
console.log(Array.from(events));

// const events = [...new Set([...gameEvents.values()])]
// console.log(events);
//2
gameEvents.delete(47);
console.log(gameEvents);
//3
const averageEvents = 90 / gameEvents.size
console.log(`An event happened on average every ${averageEvents} minutes.`);
//4
// for (const [key, value] of gameEvents) {
//   if (key < 45) {
//     console.log(`[First Half] ${value}`);
//   } else {
//     console.log(`[Second Half] ${value}`)
//   }
// }
for (const [key, value] of gameEvents) {
  key < 45 ? console.log(`[First Half] ${key}: ${value}`) : console.log(`[Second Half] ${key}: ${value}`)
}


const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log('B737'[0]);
console.log(airline.length);
console.log('B737'.length);
console.log(airline.indexOf('r'));//only gies first occurrence
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf("Portugal"));

console.log(airline.slice(4));//starts string on element 4
console.log(airline.slice(4, 7));//starts at 4, does not inlude 7
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  //B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E')
    console.log('You got the middle seat');
  else console.log('You got lucky!');
}
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//fix capitalization in passenger name
const passenger = 'JOnAS'
const passengerLower = passenger.toLowerCase();
console.log(passengerLower);
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

const correctName = function (passengerName) {
  const passengerNameLower = passengerName.toLowerCase();
  const passengerNameCorrect = passengerNameLower[0].toUpperCase() + passengerNameLower.slice(1);
  console.log(passengerNameCorrect);
}

correctName('JOY')
correctName('griffin')

//compare user input email
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n'
// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
// console.log(trimmedEmail);
const normalizedEmail = loginEmail.toLowerCase().trim()
console.log(normalizedEmail);

console.log(email === normalizedEmail);

//replacing portions of strings
const priceGB = '288,97£'
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement = 'All passengers come to boarding door 23. Boarding door 23.';
console.log(announcement.replaceAll('door', 'gate'));

//using regex:
console.log(announcement.replace(/door/g, 'gate'));

//booleans: includes, startsWith, endsWith

const plane1 = 'Airbus A320neo'
console.log(plane1.includes('A320'));
console.log(plane1.includes('Boeing'));

console.log(plane1.startsWith('Air'));
console.log(plane1.endsWith('eo'));
console.log((plane1.startsWith('Airbus') && plane1.endsWith('neo')));

//Practice
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log("You are not allowed on board");
  } else {
    console.log("Welcome aboard!");
  }

}

checkBaggage('I have a laptop, some food, and a pocket Knife');
checkBaggage('I have socks and a camera');
checkBaggage('I have some snacks and a gun for protection');

console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));


//split and join
const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
console.log(firstName, lastName);

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);


const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = []
  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1))
  }
  console.log(namesUpper.join(' '));
}
const passenger1 = 'jessica ann smith davis'

capitalizeName('jessica ann smith davis')
capitalizeName('christopher dale warren')
capitalizeName('jonas schmedtmann')

// padding a string
const message = 'Go to gate 23'
console.log(message.padStart(25, '+'));
console.log(message.padEnd(25, '+'));
console.log(message.padStart(25, '+').padEnd(35, '+'));

const ccnum = '1234 5678 9123 4567'
const maskNum = function (num) {
  const str = String(num);
  //or const str = num + '';
  const lastFour = str.slice(-4);
  // const masked = lastFour.padStart(str.length, "#")
  // console.log(masked);
  return lastFour.padStart(str.length, "#")

}

console.log(maskNum(1234567891234567))

//repeat

const message2 = 'Bad Weather... All departures delayed... '
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
}
planesInLine(7);
planesInLine(3);
planesInLine(12)
*/

//Coding Challenge 4
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
const text = document.querySelector('textarea').value;

const text2 = 'john_smith'
const texts = []
const toCamelCase = function (text) {
  const indtexts = text.split('\n');
  for (const entries of indtexts) {
    const textLower = entries.toLowerCase().trim();
    const textSplit = textLower.split('_');
    //console.log(textSplit);
    //console.log(textSplit[1][0].toUpperCase() + textSplit[1].slice(1));
    const textSecondUpper = textSplit[0] + textSplit[1][0].toUpperCase() + textSplit[1].slice(1)
    //console.log(textSecondUpper);
    texts.push(textSecondUpper.padEnd(20, " ") + ' ' + '✅'.repeat(texts.length + 1))

    //console.log(texts.join('\n'));
  }

}

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  toCamelCase(text);
})

//teacher solution
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(second[0], second[0].toUpperCase()
    )}`
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
})

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';')
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''} ${type.replaceAll('_', ' ')} from ${getCode(from)} to ${getCode(to)} (${time.replace(':', 'h')})`.padStart(45)
  console.log(output);
}