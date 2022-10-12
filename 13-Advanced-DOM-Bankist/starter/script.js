'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const s1coords = section1.getBoundingClientRect();
///////////////////////////////////////
// Modal window



const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))



btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//SMOOTH SCROLLING

btnScrollTo.addEventListener('click', function (e) {

  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('Current Scroll (X/Y', window.scrollX, scrollY);

  // console.log('height and width of viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
  // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY)

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth'
  // })

  section1.scrollIntoView({ behavior: 'smooth' })
});
///////////////////////////////////////////
//PAGE NAVIGATION
//Implementing smooth scrolling
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault()
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
//   })
// })
//NOW USING EVENT DELEGATION
//Add event listener to common parent
//DETERMINE WHICH ELEMENT ORIGINATED THE EVENT
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);

  //Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    //console.log('link');
    e.preventDefault()
    const id = e.target.getAttribute('href');
    //console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})

///////////////////////////////////////////
///////////////////////////////////////////
/*
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section')
console.log(allSection);

document.getElementById('section-1')
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

const btnsByClass = document.getElementsByClassName('btn')
console.log(btnsByClass);

//Creating and Inserting Elements'
// .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.';
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message)
header.append(message)
// header.append(message.cloneNode(true))

// header.before(message)
// header.after(message)

//Delete Elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    //OLD WAY message.parentElement.removeChild(message)
  })

//Styles
message.style.backgroundColor = '#37383d'
message.style.width = '120%'

console.log(message.style.height);
console.log(message.style.width);

console.log(getComputedStyle(message).height);
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//Changing CSS styles with JS

// document.documentElement.style.setProperty('--color-primary', 'orangered')
//NOW ATTRIBUTES

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
console.log(logo.designer); //doesn't work because this is not a normal tag
console.log(logo.getAttribute('designer'));

logo.alt = 'Beautiful Minimalist Logo'
console.log(logo.alt);

logo.setAttribute('company', 'Bankist')
console.log(logo.getAttribute('company'));

console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//DATA ATTRIBUTES

console.log(logo.dataset.versionNumber);

//CLASSES
logo.classList.add('c', 'j')
logo.classList.remove('c')
logo.classList.toggle('c')
logo.classList.contains('c')
//DONT USE THIS
// logo.className ='jonas'
*/

/*
const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! You are reading the heading')
// });
// //OLD SCHOOL
// h1.onmouseenter = function (e) {
//   alert('mouseenter instead: Great! You are reading the heading')
// };
//Add event listener allows us to add multiple functions to an event

const h1Alert = function (e) {
  alert('addEventListener: Great! You are reading the heading')
  //h1.removeEventListener('mouseenter', h1Alert)
}

h1.addEventListener('mouseenter', h1Alert);

setTimeout(() => h1.removeEventListener('mouseenter', h1Alert), 5000)


//rgb(255,255,255)

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`
// console.log(randomColor(0, 255));
//Event Bubbling
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor(0, 255)
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //Stop Propogation
  // e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor(0, 255);
  console.log('Container', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor(0, 255)
  console.log('Nav', e.target, e.currentTarget);
  //this 'true' causes events to be caught in capturing phase as opposed to bubbing phase
}
  // , true
);
*/

//Event Delegation

