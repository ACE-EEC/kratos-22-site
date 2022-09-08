$('.plus').click(function () {
  $('.transform').toggleClass('transform-active-another');
});

var myIndex = 0;

function reset(index) {
  myIndex = index;

  resetMany(myIndex);
}

function triggerDisplay(index) {
  myIndex = index;

  displayMany(myIndex);
}

function displayMany(myIndex) {
  var plus = document.getElementsByClassName('plus')[myIndex];
  var details = document.getElementsByClassName('details')[myIndex];
  var vl = document.getElementsByClassName('vl')[myIndex];
  var bText = document.getElementsByClassName('bText')[myIndex];
  var content = document.getElementsByClassName('content')[myIndex];
  var upArrow = document.getElementsByClassName('upArrow')[myIndex];
  var rules = document.getElementsByClassName('cardRules')[myIndex];
  var card = document.getElementsByClassName('card')[myIndex];
  var cardImg = document.getElementsByClassName('cardImage')[myIndex];

  card.style.width = '100%';
  if (window.innerWidth >= 768) {
    cardImg.style.width = '33%';
  } else {
    cardImg.style.width = '100%';
  }
  details.style.display = 'flex';
  vl.style.display = 'flex';
  bText.style.display = 'flex';
  content.style.display = 'flex';
  upArrow.style.display = 'flex';
  rules.style.display = 'inline-block';
  plus.style.display = 'none';

  setTimeout(function () {
    setOpacity(myIndex);
  }, 500);
}

function setOpacity(myIndex) {
  var newDoc = document.getElementsByClassName('plus')[myIndex];
  var details = document.getElementsByClassName('details')[myIndex];
  var vl = document.getElementsByClassName('vl')[myIndex];
  var bText = document.getElementsByClassName('bText')[myIndex];
  var content = document.getElementsByClassName('content')[myIndex];
  var upArrow = document.getElementsByClassName('upArrow')[myIndex];
  var rules = document.getElementsByClassName('cardRules')[myIndex];

  details.style.opacity = '1.0';
  vl.style.opacity = '1.0';
  content.style.opacity = '1.0';
  bText.style.opacity = '1.0';
  upArrow.style.opacity = '1.0';
  newDoc.style.opacity = '1.0';
  rules.style.opacity = '1.0';
}

function setDisplayTime(myIndex) {
  var newDoc = document.getElementsByClassName('plus')[myIndex];
  var details = document.getElementsByClassName('details')[myIndex];
  var vl = document.getElementsByClassName('vl')[myIndex];
  var bText = document.getElementsByClassName('bText')[myIndex];
  var content = document.getElementsByClassName('content')[myIndex];
  var upArrow = document.getElementsByClassName('upArrow')[myIndex];
  var rules = document.getElementsByClassName('cardRules')[myIndex];
  var card = document.getElementsByClassName('card')[myIndex];
  var cardImg = document.getElementsByClassName('cardImage')[myIndex];

  cardImg.style.width = '100%';
  if (window.innerWidth >= 768) {
    card.style.width = '25%';
  } else {
    card.style.width = 'auto';
  }

  details.style.display = 'none';
  vl.style.display = 'none';
  content.style.display = 'none';
  bText.style.display = 'none';
  upArrow.style.display = 'none';
  newDoc.style.display = 'flex';
  rules.style.display = 'none';
}

function resetMany(myIndex) {
  var newDoc = document.getElementsByClassName('plus')[myIndex];
  var details = document.getElementsByClassName('details')[myIndex];
  var vl = document.getElementsByClassName('vl')[myIndex];
  var bText = document.getElementsByClassName('bText')[myIndex];
  var content = document.getElementsByClassName('content')[myIndex];
  var upArrow = document.getElementsByClassName('upArrow')[myIndex];
  var rules = document.getElementsByClassName('cardRules')[myIndex];

  details.style.opacity = '0';
  vl.style.opacity = '0';
  bText.style.opacity = '0';
  content.style.opacity = '0';
  upArrow.style.opacity = '0';
  rules.style.opacity = '0';

  setTimeout(function () {
    setDisplayTime(myIndex);
  }, 500);
}

var sympo = document.getElementsByClassName('sympo')[0];
var tech = document.getElementsByClassName('tech')[0];
var ntech = document.getElementsByClassName('ntech')[0];

function sympoClick() {
  displayWorkshop();
  updateSlides('workshop');
}

function techClick() {
  displaytech();
  updateSlides('technical');
}

function ntechClick() {
  displayntech();
  updateSlides('nonTechnical');
}

//displaying card holder
var techCardHolder = document.getElementById('techCardHolder');
var ntechCardHolder = document.getElementById('ntechCardHolder');
var workshopCardHolder = document.getElementById('workshopCardHolder');
var homePage = document.getElementById('mainPage');

var slideshowContainer = document.getElementById('slideshowContainer');
var markers = document.getElementById('slideshowMarkers');
var bannerVideo = document.getElementById('video');

function displayWorkshop() {
  workshopCardHolder.style.display = 'flex';
  ntechCardHolder.style.display = 'none';
  techCardHolder.style.display = 'none';
  homePage.style.display = 'none';

  bannerVideo.style.display = 'none';
  slideshowContainer.style.display = 'flex';
  markers.style.display = 'flex';
}

function displaytech() {
  workshopCardHolder.style.display = 'none';
  ntechCardHolder.style.display = 'none';
  techCardHolder.style.display = 'flex';
  homePage.style.display = 'none';

  bannerVideo.style.display = 'none';
  slideshowContainer.style.display = 'flex';
  markers.style.display = 'flex';
}

function displayntech() {
  workshopCardHolder.style.display = 'none';
  ntechCardHolder.style.display = 'flex';
  techCardHolder.style.display = 'none';
  homePage.style.display = 'none';

  bannerVideo.style.display = 'none';
  slideshowContainer.style.display = 'flex';
  markers.style.display = 'flex';
}

function homeClick() {
  homePage.style.display = 'flex';
  workshopCardHolder.style.display = 'none';
  ntechCardHolder.style.display = 'none';
  techCardHolder.style.display = 'none';

  bannerVideo.style.display = 'flex';
  slideshowContainer.style.display = 'none';
  markers.style.display = 'none';
}

