const slideCount = 4;
let index = 0;
let leftSlide = document.getElementById('previousSlide');
let activeSlide = document.getElementById('activeSlide');
let rightSlide = document.getElementById('nextSlide');

const animRightToLeft = [
  { transform: 'translate(0%)' },
  { transform: 'translate(-100%)' }
];

const animLeftToRight = [
  { transform: 'translate(0%)' },
  { transform: 'translate(100%)' }
];

const animOptions = {
  duration: 600,
  delay: 0,
  iterations: 1,
  easing: 'ease'
}

function nextSlide() {
  activeSlide.animate(animRightToLeft, animOptions);
  rightSlide.animate(animRightToLeft, animOptions);

  setTimeout(() => {
    index = nextCyclicIndex(index);
    activeSlide.src = `public/images/slide-${index}.jpg`;
    leftSlide.src = `public/images/slide-${prevCyclicIndex(index)}.jpg`;
    rightSlide.src = `public/images/slide-${nextCyclicIndex(index)}.jpg`;
  }, animOptions.duration);
}

function previousSlide() {
  leftSlide.animate(animLeftToRight, animOptions);
  activeSlide.animate(animLeftToRight, animOptions);

  setTimeout(() => {
    index = prevCyclicIndex(index);
    activeSlide.src = `public/images/slide-${index}.jpg`;
    leftSlide.src = `public/images/slide-${prevCyclicIndex(index)}.jpg`;
    rightSlide.src = `public/images/slide-${nextCyclicIndex(index)}.jpg`;
  }, animOptions.duration);
}

function prevCyclicIndex(n) {
  if (n === 0) {
    return slideCount - 1;
  }
  return n - 1;
}

function nextCyclicIndex(n) {
  if (n === slideCount - 1) {
    return 0;
  }
  return n + 1;
}