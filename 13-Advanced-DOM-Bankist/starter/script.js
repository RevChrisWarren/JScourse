'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
//SMOOTH SCROLLING
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current Scroll (X/Y', window.scrollX, scrollY);

  console.log('height and width of viewoport', document.documentElement.clientHeight, document.documentElement.clientWidth);
  // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY)

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth'
  // })

  section1.scrollIntoView({ behavior: 'smooth' })
});



