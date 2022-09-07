const slideCount = 4;
const slideDuration = 5000; // ms
const animDuration = 600; // ms

let index = 0;

let timer = null;

let slideshowContainer = document.getElementById('slideshowContainer');
let slideshowMarkers = document.getElementById('slideshowMarkers');

$('#slideshowContainer').ready(() => {
  for (var i = 0; i < slideCount; i++) {
    var newSlide = slideshowContainer.appendChild(document.createElement('img'));
    newSlide.classList.add(['slide']);
    newSlide.src = `public/images/slide-${i}.jpg`;
    newSlide.id = `slide${i}`;

    var newMarker = slideshowMarkers.appendChild(document.createElement('div'));
    newMarker.classList.add(['marker']);
    newMarker.id = `marker${i}`
    newMarker.onclick = function (ev) {

    };

    // performance optimizations
    if (i > 0) {
      newSlide.loading = 'lazy'
    }
  }

  timer = setInterval(() => {
    index = nextCyclicIndex(index);
    scrollToIndex(index);
  }, slideDuration);
});

const animOptions = {
  duration: animDuration,
  delay: 0,
  iterations: 1,
  easing: 'ease'
}

$('#slideRight').click((e) => {
  e.preventDefault();
  clearInterval(timer);
  timer = null;

  index = nextCyclicIndex(index);
  scrollToIndex(index)
  startTimer();
});

$('#slideLeft').click((e) => {
  e.preventDefault();
  clearInterval(timer);
  timer = null;

  index = prevCyclicIndex(index);
  scrollToIndex(index);
  startTimer();
});

function startTimer() {
  if (timer === null) {
    timer = setInterval(() => {
      index = nextCyclicIndex(index);
      scrollToIndex(index);
    }, slideDuration);
  }
}


function scrollToIndex(i) {
  let width = Number(window.getComputedStyle(slideshowContainer).width.replace('px', ''));
  let scrollTarget = width * i;
  slideshowContainer.scrollTo({ left: scrollTarget, behavior: 'smooth' })
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