const slideCount = 4;
let index = 0;
let activeSlide = document.getElementById('activeSlide');

function nextSlide() {
  index = (index + 1) % slideCount;
  activeSlide.src = `public/images/slide-${index}.jpg`;
}

function previousSlide() {
  if (index) {
    index = (index - 1) % slideCount;
  } else {
    index = slideCount - 1;
  }
  activeSlide.src = `public/images/slide-${index}.jpg`;
}
