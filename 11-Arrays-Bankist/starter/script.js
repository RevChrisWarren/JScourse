'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
<div class="movements__value">${mov} €</div>
</div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html)
  });
}
displayMovements(account1.movements)

const user = 'Steven Thomas Williams'; //stw

const createUsernames = function (accts) {
  accts.forEach(function (acct) {
    acct.username = acct.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('')
  })
}

createUsernames(accounts)

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0)
  labelBalance.textContent = `${acc.balance}€`

}
// calcDisplayBalance(account1.movements)

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) =>
      acc + mov, 0
    )
  labelSumIn.textContent = `${incomes}€`

  const outgo = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) =>
      acc + mov, 0
    )
  labelSumOut.textContent = `${Math.abs(outgo)}€`

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter((int, i, arr) => {
      return int >= 1
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`
}

// calcDisplaySummary(account1.movements)

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const updateUI = function (acc) {
  displayMovements(currentAccount.movements);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount)
}

//EVENT HANDLERS
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100;

  } else {
    containerApp.style.opacity = 0;
  }
  //clear input fields
  inputLoginPin.value = inputLoginUsername.value = '';
  inputLoginPin.blur();

  updateUI(currentAccount)
})

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (amount > 0 && currentAccount.balance >= amount &&
    receiverAccount &&
    receiverAccount.username !== currentAccount.username) {

    currentAccount.movements.push(-amount)
    receiverAccount.movements.push(amount)
    updateUI(currentAccount)
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value)

  if (amount > 0 &&
    currentAccount.movements.some(mov => mov >= amount * .1)) {
    currentAccount.movements.push(amount)
    updateUI(currentAccount)
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault()
  if (currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)) {
    const index = accounts.findIndex(acc => acc.username ===
      currentAccount.username)
    console.log(index);
    accounts.splice(index, 1)
    containerApp.style.opacity = 0;
    inputClosePin.value = inputCloseUsername.value = '';
  }
})
let sortedState = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sortedState)
  sortedState = !sortedState;
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);



/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];
//SLICE METHOD
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

//SPLICE METHOD --Mutates original array
//SPLICE takes the parts selected from original array
//Second parameter is the "delete Count"
// console.log(arr.splice(2));
console.log(arr.splice(-1));
arr.splice(0, 2);
console.log(arr);

//REVERSE MUTATES ORIGINAL ARRAY
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f']
console.log(arr2.reverse());
//console.log(arr2.reverse(2, 4));

//CONCAT--DOES NOT MUTATE
const letters = arr.concat(arr2);
console.log(letters);
//or
console.log([...arr, ...arr2]);

//JOIN

console.log(letters.join(' - '));



const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

//GETTING LAST ELEMENT OF ARRAY
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('chris'.at(0));


//LOOPING OVER ARRAYS USING FOR EACH METHOD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${ i + 1 }:You deposited ${ movement } `)
//   } else {
//     console.log(`Movement ${ i + 1 }:You withdrew ${ Math.abs(movement) } `)
//   }
// }
//NAMES DON'T MATTER, BUT ORDER DOES IN PARAMETERS
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${ index + 1 }: You deposited ${ movement } `)
  } else {
    console.log(`Movement ${ index + 1 }: You withdrew ${ Math.abs(movement) } `)
  }
});

//forEach with maps and sets



const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
//MAP
currencies.forEach(function (value, key, map) {
  console.log(`${ key }: ${ value }: ${ map } `);
})

//SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR'])

console.log(currenciesUnique);

currenciesUnique.forEach(function (value, key, set) {
  console.log(`${ key }: ${ value }: ${ set } `);
})
*/
/*
const julia1 = [3, 5, 2, 12, 7]
const kate1 = [4, 1, 15, 8, 3]
const julia2 = [9, 16, 6, 8, 3]
const kate2 = [10, 5, 6, 1, 4]

const checkDog = function (arr) {
  arr.forEach(function (age, i) {
    if (age >= 3) {
      console.log(`Dog number ${ i + 1 } is an adult and is ${ age } years old`);
    } else {
      console.log(`Dog number ${ i + 1 } is still a puppy`)
    }
  });
}

// checkDog([...julia1.slice(1, 3), ...kate1])
// checkDog([...julia2.slice(1, 3), ...kate2])

//teacher solution
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice()
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  const dogs = dogsJuliaCorrected.concat(dogsKate)
  dogs.forEach(function (age, i) {
    if (age >= 3) {
      console.log(`Dog number ${ i + 1 } is an adult and is ${ age } years old`);
    } else {
      console.log(`Dog number ${ i + 1 } is still a puppy`)
    }
  });
}
checkDogs(julia1, kate1)
checkDogs(julia2, kate2)

const euroToUsd = 1.1;

const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const movementsUSD = movements1.map(function (mov) {
//   return mov * euroToUsd;
// })
console.log(movements1);
//console.log(movementsUSD);

const movementsUSDFor = []
for (const mov of movements1) movementsUSDFor.push(mov * euroToUsd)

console.log(movementsUSDFor);

const movementsUSD = movements1.map(mov => mov * euroToUsd)
console.log(movementsUSD);

const movementsDescriptions = movements1.map((el, i) => `Movement ${ i + 1 }: You ${ el > 0 ? 'deposited' : 'withdrew' } ${ Math.abs(el) } `
  // if (el > 0) {
  //   return `Movement ${ i + 1 }: You deposited ${ el } `;
  // } else {
  //   return `Movement ${ i + 1 }: You withdrew ${ Math.abs(el) } `;
  // }
)

console.log(movementsDescriptions);
//FILTER METHOD
const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements1.filter(function (mov) {
  return mov > 0;
})
console.log(deposits);

//same thing with for/of loop
const depositsFor = []

for (const mov of movements1) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);
const withdrawals = movements1.filter(mov => mov < 0);
// const withdrawals = movements1.filter(function (mov) {
//   return mov < 0
// })
console.log(withdrawals);

//REDUCE METHOD - boil down elements in array to one value

const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];
//accumulator is like snowball... must specify starting point in final argument: here it is 0
// const balance = movements1.reduce(function (accumulator, curEl, i, array) {
//   console.log(`Iteration ${ i }: ${ accumulator } `);
//   return accumulator + curEl
// }, 0);
const balance = movements1.reduce((acc, cur) => acc + cur, 0)

console.log(balance);

let balanceFor = 0;

for (const mov of movements) balanceFor += mov;
console.log(balanceFor);

//MAXMUM VALUE USING REDUCE

const maxValue = movements1.reduce((acc, mov) => {
  if (acc > mov)
    return acc;
  else
    return mov
}, movements[0])
console.log(maxValue);


const data = [5, 2, 4, 1, 15, 8, 3]
const data2 = [16, 6, 10, 5, 6, 1, 4]

const dogToHuman = data.map((el) => {
  if (el <= 2)
    return el * 2
  else
    return 16 + el * 4
})

console.log(dogToHuman);

const filteredDogs = dogToHuman.filter(el => el >= 18);

console.log(filteredDogs);

const average = filteredDogs.reduce((acc, el) => acc + el, 0) / filteredDogs.length;

console.log(average);

//TEACHER SOLUTION
const data = [5, 2, 4, 1, 15, 8, 3]
const data2 = [16, 6, 10, 5, 6, 1, 4]
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => age <= 2 ? age * 2 : age * 4 + 16)
  const adults = humanAges.filter(age => age >= 18);
  const average = adults.reduce((acc, el) => acc + el, 0) / adults.length
  return average
}

const ages1 = calcAverageHumanAge(data)
const ages2 = calcAverageHumanAge(data2)

console.log(ages1);
console.log(ages2);

const euroToUsd = 1.1;


const totalDepositsInUSD = movements
  .filter(mov => mov > 0)
  // .map((mov, i, arr) => {
  //   console.log(arr);
  //   return mov * euroToUsd
  // })
  .map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsInUSD);


const data = [5, 2, 4, 1, 15, 8, 3]
const data2 = [16, 6, 10, 5, 6, 1, 4]
const calcAverageAge = (array) => {
  const average = array
    .map(el => (el <= 2 ? el * 2 : el * 4 + 16))
    .filter(el => el >= 18)
    .reduce((acc, el, i, arr) => acc + el / arr.length, 0)
  console.log(average);
}


calcAverageAge(data)
calcAverageAge(data2)


//FIND METHOD
//used to retrieve first element of an array based on conditions
const firstWithdrawal = movements.find(mov => mov < 0)
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis')
console.log(account);

for (const acc of accounts)
  if (acc.owner === 'Jonas Schmedtmann')
    console.log(acc);

console.log(movements);
//CHECKS FOR EQUALITY
console.log(movements.includes(-130));

//CAN HAVE CONDITION
const anyDeposits = movements.some(mov => mov > 0)
console.log(anyDeposits);

//EVERY Boolean- only returns true if every element passes the condition
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));



//FLAT AND FLATMAP Flat removes nested arrays and puts all elements in one array
//FLAT goes as deep as is the parameter in the function

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [[4, 5], 6], 7, 8];

console.log(arrDeep.flat(2));

const accountMovements = accounts.map(acc => acc.movements)

console.log(accountMovements);


const allValues = accountMovements.flat()
console.log(allValues);
const overallBalance = allValues.reduce((acc, mov) => acc + mov, 0)
console.log(overallBalance);

//Same thing with chaining
const overallBal = accounts.map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0)

console.log(overallBal);
//flatMap goes only one level deep
const overallB = accounts.flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0)
console.log(overallB);


//SORTING ARRAYS
const owners = ['Jonas', 'Zach', 'Adam', 'Martha']
console.log(owners.sort())

console.log(owners);
console.log(movements);
//Sort works as if these are strings
console.log(movements.sort());

//for Numbers in ascending order
// if < 0 - A, B
// if >0 - B, A
movements.sort((a, b) => {
  if (a > b)
    return 1 //SWITCH Order
  if (b > a)
    return -1 // KEEP Order
})
console.log(movements);

//OR
//because if A>B it will return positive and if B>A it will return negative
movements.sort((a, b) => a - b);
console.log(movements);


//PROGRAMMATICALLY CREATING AND FILLING ARRAYS
//creates new array with 7 empty spaces 
const x = new Array(7);
console.log(x);
//Map will not work
//x.fill(1);
x.fill(1, 3, 5)
console.log(x);

const arr = [1, 2, 3, 4, 5, 6, 7, 8];
arr.fill(23, 2, 6)
console.log(arr);

//Array.from
const y = Array.from({ length: 12 }, () => 1)
console.log(y);

const z = Array.from({ length: 12 }, (currentElement, i) => 1 + i)
console.log(z);

const dice = Array.from({ length: 100 }, () => Number(Math.ceil(Math.random() * 6) + Math.ceil(Math.random() * 6)));
console.log(dice);

//TO GET VALUES FROM UI
const movementsUI = Array.from(document.querySelectorAll('.movements__value'));


labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    element => Number(element.textContent.replace('€', ''))
  );
  console.log(movementsUI);
})

//#1
const bankDepositSum = accounts.flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0)

console.log(bankDepositSum);

//#2
// const numDeposits1000 = accounts.flatMap(acc => acc.movements)
//   .filter(mov => mov > 1000)
// console.log(numDeposits1000);
// console.log(numDeposits1000.length);


const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  //.reduce((count, current) => (current >= 1000 ? count + 1 : count), 0)
  .reduce((count, current) => (current >= 1000 ? ++count : count), 0)

console.log(numDeposits1000);

//#3
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce((sums, cur) => {
    // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur)
    sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
    return sums
  }, { deposits: 0, withdrawals: 0 })

console.log(deposits, withdrawals);

//#4

//This is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() +
    str.slice(1);
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on',
    'in', 'with', 'and']
  const titleCase = title.toLowerCase().split(' ')
    .map(word => exceptions.includes(word) ? word :
      capitalize(word))
    .join(' ');
  return capitalize(titleCase);
}

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

//TEST DATA:

const dogs = [
  {
    weight: 22,
    curFood: 250,
    owners: ['Alice', 'Bob']
  },
  {
    weight: 8,
    curFood: 200,
    owners: ['Matilda']
  },
  {
    weight: 13,
    curFood: 275,
    owners: ['Sarah', 'John']
  },
  {
    weight: 32,
    curFood: 340,
    owners: ['Michael']
  }
]

for (const obj of dogs) {
  obj.properFood = obj.weight ** 0.75 * 28
  console.log(obj.properFood);
}
//dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)))

for (const obj of dogs) {
  if (obj.owners.includes('Sarah')) {
    console.log(obj.curFood > obj.properFood ? "Sarah's dog is eating too much!" : "Sarah's dog is not eating enough!")
  }
}

//const dogSarah = dogs.find(dog => dog.owners.includes('Sarah))
//console.log(`Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
//})
let ownersEatTooMuch = []
let ownersEatTooLittle = []
for (const obj of dogs) {
  obj.curFood > obj.properFood ? ownersEatTooMuch.push(obj.owners) : ownersEatTooLittle.push(obj.owners)
  ownersEatTooLittle = ownersEatTooLittle.flat()
  ownersEatTooMuch = ownersEatTooMuch.flat()
}

console.log(ownersEatTooLittle)
console.log(ownersEatTooMuch);

//const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recFood)
//.flatMap(dog => dog.owners)
//const ownersEatTooMuch = dogs.filter(dog => dog.curFood < dog.recFood)
//.flatMap(dog => dog.owners)


const logStr = function (arr) {
  console.log(`${arr[0]} and ${arr[1]} and ${arr[2]}'s dogs eat too little!`);
}

const logStr2 = function (arr) {
  console.log(`${arr[0]} and ${arr[1]} and ${arr[2]}'s dogs eat too much!`);
}


logStr(ownersEatTooLittle)
logStr2(ownersEatTooMuch)
// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

const anyPerfDogs = dogs.some(dog => dog.curFood === dog.properFood);
console.log(anyPerfDogs);

const anyGoodDogs = dogs.some(dog => dog.curFood < dog.properFood * 1.1 && dog.curFood > dog.properFood * .9)
console.log(anyGoodDogs);

let goodDogs = []
for (const obj of dogs) {
  if (obj.curFood < obj.properFood * 1.1 && obj.curFood > obj.properFood * .9) goodDogs.push(obj)
}
console.log(goodDogs);

const checkEatingOK = dog =>
  dog.curFood < dog.properFood * 1.1 && dog.curFood >
  dog.properFood * .9;

console.log(dogs.filter(checkEatingOK));


const dogs2 = dogs.slice()


// for Numbers in ascending order
//  if < 0 - A, B
//  if >0 - B, A
// movements.sort((a, b) => {
//   if (a > b)
//     return 1 //SWITCH Order
//   if (b > a)
//     return -1 // KEEP Order
// })
// console.log(movements);

dogs2.sort((a, b) => (a.properFood > b.properFood) ? 1 : -1)
console.log(dogs2);

const dogsCopy = dogs.slice()
  .sort((a, b) => (a.properFood > b.properFood) ? 1 : -1)

console.log(dogsCopy);
