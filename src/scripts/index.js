'use strict';

const options = document.getElementsByClassName('help__option');
const placeholder = document.getElementsByClassName('help__placeholder')[0];
const form = document.getElementById('Form');
const choosing = 'help__option--choosing';
const active = 'help__option--active';
let isChoosing = false;
const inputName = document.getElementById('Name');
const inputEmail = document.getElementById('Email');
let isNameValid = false;
let isEmailValid = false;
const warningName = document.getElementById('NameWarning');
const warningEmail = document.getElementById('EmailWarning');
const statusName = document.getElementById('NameStatus');
const statusEmail = document.getElementById('EmailStatus');
const messageBackground = document
  .getElementsByClassName('message-background')[0];
const messageExit = document.getElementsByClassName('message__exit')[0];
const header = document.getElementById('header');
const headerLinks = document.getElementsByClassName('nav__link--header');
const headerMenuButton = document
  .getElementsByClassName('header__menu-button')[0];
let isHeaderOpen = false;
const solutions = document.getElementById('solutions');
const solutionsMargin = window.getComputedStyle(solutions).margin;
const promo = document.getElementById('promo');
const promoPadding = window.getComputedStyle(promo).padding;
const help = document.getElementById('help');
const helpMargin = window.getComputedStyle(help).margin;
const promoLink = document.getElementById('promoLink');
const solutionsLink = document.getElementById('solutionsLink');
const slides = document.getElementsByClassName('banner__slide');
const slideButtons = document.getElementsByClassName('banner__button');
let prevButtonId = 1;
const arrows = document.getElementsByClassName('banner__arrow');

window.addEventListener('scroll', detectVisibility);

placeholder.addEventListener('click', changingOptions);

for (let i = 0; i < options.length; i++) {
  options[i].addEventListener('click', () => {
    changeOption(i);
  });
};

inputName.addEventListener('blur', inputNameBlur);
inputEmail.addEventListener('blur', inputEmailBlur);
messageBackground.addEventListener('click', hideMessage);
messageExit.addEventListener('click', hideMessage);

for (let i = 0; i < headerLinks.length; i++) {
  headerLinks[i].addEventListener('click', headerStatus);
};

headerMenuButton.addEventListener('click', headerStatus);

arrows[0].addEventListener('click', () => {
  changeSlideWithArrows('left');
});

arrows[1].addEventListener('click', () => {
  changeSlideWithArrows('right');
});

for (let i = 0; i < slideButtons.length; i++) {
  slideButtons[i].addEventListener('click', () => {
    changeSlideWithButtons(i);
  });
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (isEmailValid && isNameValid) {
    messageBackground.classList.add('message-background--active');
  }

  return false;
});

function changingOptions() {
  if (isChoosing === false) {
    for (let i = 0; i < options.length; i++) {
      options[i].classList.add(choosing);
    }

    isChoosing = true;
  } else {
    for (let i = 0; i < options.length; i++) {
      options[i].classList.remove(choosing);
    }

    isChoosing = false;
  }
}

function changeOption(index) {
  for (let i = 0; i < options.length; i++) {
    if (i === index) {
      placeholder.innerHTML = options[i].innerHTML;

      options[i].classList.add(active);

      changingOptions();
    } else if (options[i].classList.contains(active)) {
      options[i].classList.remove(active);
    }
  }
}

function inputNameBlur() {
  if (!statusName.classList.contains('help__status--visible')) {
    statusName.classList.add('help__status--visible');
  }

  if (inputName.value.length < 3) {
    isNameValid = false;

    warningName.classList.add('help__warning--active');

    statusName.classList.remove('help__status--correct');
  } else {
    isNameValid = true;

    warningName.classList.remove('help__warning--active');

    statusName.classList.add('help__status--correct');
  }
}

function inputEmailBlur() {
  if (!statusEmail.classList.contains('help__status--visible')) {
    statusEmail.classList.add('help__status--visible');
  }

  if (inputEmail.value.includes('.') && inputEmail.value.includes('@')) {
    isEmailValid = true;

    warningEmail.classList.remove('help__warning--active');

    statusEmail.src = './img/Vector4(1).svg';
  } else {
    isEmailValid = false;

    warningEmail.classList.add('help__warning--active');

    statusEmail.src = './img/error.svg';
  }
}

function hideMessage() {
  messageBackground.classList.remove('message-background--active');
}

function headerStatus() {
  if (!isHeaderOpen) {
    header.classList.add('header--active');

    for (const i of headerLinks) {
      i.classList.remove('nav__link--no-index');
    }

    isHeaderOpen = true;
  } else {
    header.classList.remove('header--active');

    for (const i of headerLinks) {
      i.classList.add('nav__link--no-index');
    }

    isHeaderOpen = false;
  }
}

function detectVisibility() {
  detectVisibilityOfElement(solutions, solutionsMargin);

  detectVisibilityOfElement(promo, promoPadding);

  detectVisibilityOfElement(help, helpMargin);
}

function detectVisibilityOfElement(element, style) {
  const topOfScreen = window.scrollY;
  const bottomOfScreen = window.scrollY + window.innerHeight;
  const topOfElement = element.offsetTop;
  const bottomOfElement = topOfElement + element.offsetHeight;

  if (bottomOfScreen > topOfElement && topOfScreen < bottomOfElement) {
    if (element.id === 'promo' || element.id === 'help') {
      if (!solutionsLink.classList.contains('nav__link--active')) {
        promoLink.classList.add('nav__link--active');
      } else {
        promoLink.classList.remove('nav__link--active');
      }
    }

    if (element.id === 'solutions') {
      solutionsLink.classList.add('nav__link--active');
    }
  } else {
    if (element.id === 'solutions') {
      solutionsLink.classList.remove('nav__link--active');
    }

    if (element.id === 'promo') {
      promoLink.classList.remove('nav__link--active');
    }
  }
}

function changeSlideWithArrows(direction) {
  let currentSlideId;

  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('banner__slide--active')) {
      currentSlideId = i;
    }
  }

  if (direction === 'left') {
    if (currentSlideId === 0) {
      slides[slides.length - 1].classList.add('banner__slide--active');

      slideButtons[slides.length - 1].classList.add('banner__button--active');
    } else {
      slides[currentSlideId - 1].classList.add('banner__slide--active');

      slideButtons[currentSlideId - 1].classList.add('banner__button--active');
    }
  }

  if (direction === 'right') {
    if (currentSlideId === slides.length - 1) {
      slides[0].classList.add('banner__slide--active');

      slideButtons[0].classList.add('banner__button--active');
    } else {
      slides[currentSlideId + 1].classList.add('banner__slide--active');

      slideButtons[currentSlideId + 1].classList.add('banner__button--active');
    }
  }

  slides[currentSlideId].classList.remove('banner__slide--active');

  slideButtons[currentSlideId].classList.remove('banner__button--active');
}

function changeSlideWithButtons(buttonId) {
  slideButtons[buttonId].classList.add('banner__button--active');
  slides[buttonId].classList.add('banner__slide--active');
  slideButtons[prevButtonId].classList.remove('banner__button--active');
  slides[prevButtonId].classList.remove('banner__slide--active');
  prevButtonId = buttonId;
}
