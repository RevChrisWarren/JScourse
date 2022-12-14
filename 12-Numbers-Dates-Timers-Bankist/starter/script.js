'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-10-02T17:01:17.194Z',
    '2022-10-03T23:36:17.929Z',
    '2022-10-06T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) /
    (1000 * 60 * 60 * 24))
  const daysPassed = calcDaysPassed(new Date(), date)
  //console.log(daysPassed);

  if (daysPassed === 0) return 'Today'
  if (daysPassed === 1) return 'Yesterday'
  if (daysPassed <= 7) return `${daysPassed} days ago`

  // const day = `${date.getDate()}`.padStart(2, '0');
  // const month = `${date.getMonth() + 1}`.padStart(2, '0');
  // const year = date.getFullYear();
  // return `${month}/${day}/${year}`
  return new Intl.DateTimeFormat(locale).format(date)
}

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(value);

}
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) =>
    a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency)

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1
      } ${type}</div>
      <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};



const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);


  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency)
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency)

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};
const now = new Date();
const options = {
  hour: 'numeric',
  minute: '2-digit',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  weekday: 'long'
}

const locale = navigator.language
//console.log(locale);
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now)
///////////////////////////////////////
// Event handlers
let currentAccount, timer;


//Fake always logged in
// currentAccount = account1
// updateUI(currentAccount)
// containerApp.style.opacity = 100

const startLogoutTimer = function () {
  //Set time to five minutes
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //In each call, print remaining time to UI
    //When time is at 00, stop timer and log out user
    //decrease 1 second

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer)
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Log in to get started!`
    }
    time--
  }
  let time = 120;

  tick();
  //Call timer every second
  const timer = setInterval(tick, 1000);
  return timer

}

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  //console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]
      }`;
    containerApp.style.opacity = 100;
    //Create Current Date
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: '2-digit',
      day: '2-digit',
      month: 'numeric',
      year: 'numeric',
      //weekday: 'long'
    }

    // const locale = navigator.language
    // console.log(locale);
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now)
    //const day = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, '0');
    // const minutes = String(now.getMinutes()).padStart(2, '0');
    // console.log(minutes);
    // //display month, day, year
    // labelDate.textContent = `${month}/${day}/${year}, ${hour}:${minutes}`


    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    //Add movement Date
    currentAccount.movementsDates.push(new Date().toISOString())
    receiverAcc.movementsDates.push(new Date().toISOString())
    // Update UI
    updateUI(currentAccount);
    //reset timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString())
      // Update UI
      updateUI(currentAccount)
      //reset timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 2500);

  }
  inputLoanAmount.value = '';

});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
console.log(23 === 23.0);

//We use base 10 (0-9) 1/10 = 0.1 3/10 = 3.3333333333...
//Computers use base 2 (0,1)--This causes unusual results
console.log(0.1 + 0.2);


//Convert strings to numbers
console.log(Number('23'));
console.log(+'23');

//Parse number from string--Must start with a number
//ParseInt accepts second paraneter (radix, or base ofsystem)
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('2.5px', 10));
console.log(Number.parseFloat('2.5rem'));
//Also Works, but not recommended
console.log(parseFloat('2.5rem'));

console.log('-isNaN-');
//isNaN
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20x'));
console.log(Number.isNaN(23 / 0));//not not a number...

console.log('-isFinite-');
//USE isFinite instead of isNaN
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20x'));
console.log(Number.isFinite(23 / 0));

console.log('-isInteger-');
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23.1));
console.log(Number.isInteger(23 / 0));


console.log(Math.sqrt(25));
console.log(25 ** (1 / 2)) //also square root

console.log(Math.max(5, 18, 24, 11, 2));
console.log(Math.min(5, 18, 24, 11, 2));
//area of circle
console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
//random gives us num between 0 and 1 ->
//when multpied by max-min, get number between 0 & (max - min) -> 
//add min to this, we get a number between min and max-min plus min

console.log(randomInt(10, 20));

//Rounding Integers
console.log(Math.trunc(23.3));
console.log(Math.trunc(23.9));
console.log(Math.round(23.9));
console.log(Math.round(23.49));
console.log(Math.ceil(23.9));
console.log(Math.ceil(23.49));
console.log(Math.floor(23.9));
console.log(Math.floor(23.49));


console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.49));

//Rounding decimals (floating point numbers) toFixed returns string

console.log((2.7).toFixed(0));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));//+ makes it a number



//Remainder Operator
console.log(5 % 2);
console.log(8 % 3);
console.log(8 % 2);


//isEven
const isEven = n => n % 2 === 0;

console.log(isEven(8));
console.log(isEven(823));
console.log(isEven(514));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered'
    if (i % 3 === 0) row.style.backgroundColor = 'blue'
  })
})


//NUMERIC SEPARATORS uses underscore
//287,460,000,000
const diameter = 287_460_000_000;

console.log(diameter);

const priceCents = 345_99;
console.log(priceCents);

const transferFee1 = 15_00;
const transferFee2 = 1_500;
console.log(transferFee1, transferFee2);

const PI = 3.14159265
console.log(PI);

console.log((Number('230000')))
console.log((Number('230_000'))) //DOES NOT WORK


//BigInt
//Numbers are represented in 64bits, only 53 used to store digits
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(1291847812347238947829034712038947201947);
console.log(1291847812347238947829034712038947201947n);

//Operations
console.log(100000n * 100000n);

const huge = 2492847123987389572394857n
const num = 75
console.log(huge * BigInt(num));


console.log(20n > 15);

console.log(20n === 20);
console.log(typeof (20n));
console.log(20n == 20);

//String Concat
console.log(huge + ' is really large')

//divisions
console.log(10n / 3n);
console.log(10 / 3);


//DATES and TIME

//Create a date

// const now = new Date();
// console.log(now);

// console.log(new Date('Aug 02 2020 18:05:41'));

// console.log(new Date('December 24, 2015'));

// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2037, 10, 27, 15, 23, 5));
// console.log(new Date(2037, 10, 33, 15, 23, 5));

// //miliseconds since initial UNIX time Jan 1, 1970
// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));//This number is called a timestamp

//Date methods
const future = new Date(2037, 10, 27, 15, 23)
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());
console.log(new Date(2142969780000));
console.log(new Date(1665022665554));

console.log(Date.now());
//SET METHODS
future.setFullYear(2040);
console.log(future);


const future = new Date(2037, 10, 19, 15, 23)
console.log(future);
console.log(Number(future));

const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) /
  (1000 * 60 * 60 * 24)

const days1 = calcDaysPassed(new Date(2037, 10, 19, 15, 23), new Date(2037, 10, 30, 19, 23))

console.log(days1);

const options1 = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  useGrouping: true
}

const num = 398712389.89
console.log('US: ', new Intl.NumberFormat('en-US', options1).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options1).format(num));
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options1).format(num));
console.log('Great Britain', new Intl.NumberFormat('en-GB', options1).format(num));
console.log(navigator.language, new Intl.NumberFormat(navigator.language, options1).format(num));


//Set Timeout and Set Interval
const ingredients = ['oives', 'spinach']
setTimeout(() => console.log('Here is your pizza ????'), 3000);
console.log('Waiting...');

const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}????`), 3000, ...ingredients);
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

//SetInterval
setInterval(function () {
  const now = new Date();
  const hrs = `${now.getHours()}`
  const mins = `${now.getMinutes()}`.padStart(2, '0')
  const secs = `${now.getSeconds()}`.padStart(2, '0')
  console.log(`${hrs}:${mins} ${secs}s`)
}, 1000)
*/
