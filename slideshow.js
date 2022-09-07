const slideCount = 4;
let index = 0;

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
    newMarker.onclick = function(ev) {
      
    };

    // performance optimizations
    if (i > 0) {
      newSlide.loading = 'lazy'
    }
  }
});

const animOptions = {
  duration: 600,
  delay: 0,
  iterations: 1,
  easing: 'ease'
}

$('#slideRight').click((e) => {
  e.preventDefault();
  index = nextCyclicIndex(index);
  let width = Number(window.getComputedStyle(slideshowContainer).width.replace('px', ''));
  let scrollTarget = width * index;
  slideshowContainer.scrollTo({ left: scrollTarget, behavior: 'smooth' })
});

$('#slideLeft').click((e) => {
  e.preventDefault();
  index = prevCyclicIndex(index);
  let width = Number(window.getComputedStyle(slideshowContainer).width.replace('px', ''));
  let scrollTarget = width * index;
  slideshowContainer.scrollTo({ left: scrollTarget, behavior: 'smooth' })
});

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