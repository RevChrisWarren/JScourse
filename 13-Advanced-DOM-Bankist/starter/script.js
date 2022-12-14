'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const s1coords = section1.getBoundingClientRect();
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

/////////////////////////////////////
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

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  if (!clicked) return;

  //Active Tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  //Activating content
  // console.log(clicked.dataset.tab);
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active')

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
  // console.log(e.target);

  //Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    //console.log('link');
    e.preventDefault()
    const id = e.target.getAttribute('href');
    //console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})

//Menu Fade Animation


const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el != link) el.style.opacity = this;
    })
    logo.style.opacity = this;
  }
}

//Passing an 'argument' into handler function--- Opacity becomes "THIS" in handleHover function
nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

//Sticky Navigation
// const initialCoords = section1.getBoundingClientRect()

// console.log(initialCoords);
// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky')
// })

//STICKY NAV WITH INTERSECTION OBSERVER API
// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }

// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);


const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}


const hdrOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
}

const hdrObserver = new IntersectionObserver(stickyNav, hdrOptions);
hdrObserver.observe(header);

//Reveal Sections
const allSections = document.querySelectorAll('.section')

const sectionReveal = function (entries, observer) {
  const [entry] = entries
  // console.log(entry);
  if (!entry.isIntersecting) return

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);

}

const sectionRevealOptions = {
  root: null,
  threshold: 0.15,

}

const sectionObserver = new IntersectionObserver(sectionReveal, sectionRevealOptions);
allSections.forEach(function (section) {
  sectionObserver.observe(section)
  // section.classList.add('section--hidden')
})

//lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]')
// console.log(imgTargets);


const loadImg = function (entries, observer) {
  const [entry] = entries
  // console.log(entry);

  if (!entry.isIntersecting) return;

  //replace with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img))

//Slider implementation
const slider = function () {
  const slides = document.querySelectorAll('.slide')
  const btnLeft = document.querySelector('.slider__btn--left')
  const btnRight = document.querySelector('.slider__btn--right')
  // const slider = document.querySelector('.slider')
  // slider.style.transform = 'scale(.4) translateX(-800)';
  // slider.style.overflow = 'visible'

  // slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`);


  const goToSlide = function (slide) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    )
  }
  const dotContainer = document.querySelector('.dots')

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend',
        `<button class = "dots__dot" data-slide="${i}"></button>`)
    })
  }


  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
  }


  let curSlide = 0;
  const maxSlide = slides.length;


  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++
    }
    goToSlide(curSlide)
    activateDot(curSlide)
  }
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--
    }
    goToSlide(curSlide)
    activateDot(curSlide)
  }

  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  }

  init()

  btnRight.addEventListener('click', nextSlide)
  btnLeft.addEventListener('click', prevSlide)

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  })



  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide)
      activateDot(slide)
    }
  })
}
slider();
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


//Dom Traversing

const h1 = document.querySelector('h1');

//Going downwards: Child--can select children that have highight class as deep as necessary
console.log(h1.querySelectorAll('.highlight'));
//all direct children of h1
console.log(h1.childNodes);
//give three elements inside h1 only for direct children
console.log(h1.children);
//first and last element child
h1.firstElementChild.style.color = 'white'
console.log(h1.firstElementChild);
h1.lastElementChild.style.color = 'orangered'
console.log(h1.lastElementChild);

//Now going upwards in chain
console.log(h1.parentNode);
console.log(h1.parentElement);

//closest is opposite of query selector-- finds parents instead of children

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)'

//selecting siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)'
})
*/

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
})

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// })