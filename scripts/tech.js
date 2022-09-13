$("#link4").on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: $("#myFooter").position().top }, "slow");
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
//added alignment to navbar
var navbaralignment = document.getElementById('pages');
$(window).resize(function () {
  if (window.innerWidth <= 1200) {
    navbaralignment.classList.remove('justify-content-center');
    navbaralignment.classList.add('justify-content-end');
    navbaralignment.style.marginRight = "5em";
  }
  if (window.innerWidth > 1200) {
    navbaralignment.classList.add('justify-content-center');
    navbaralignment.classList.remove('justify-content-end');
  }


});

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

  if (window.innerWidth >= 768) {
    card.style.width = '100%';
    cardImg.style.width = '33%';
  } else {
    card.style.width = 'auto';
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


$('#techButton').click((e) => {
  e.preventDefault();
  techClick();
  $("html, body").animate(
    { scrollTop: $(".banner").position().top },
    "slow"
  );
});

$('#workshopButton').click((e) => {
  e.preventDefault();
  sympoClick();
  $("html, body").animate(
    { scrollTop: $(".banner").position().top },
    "slow"
  );
});

$('#homeButton').click((e) => {
  e.preventDefault();
  homeClick();
  $("html, body").animate(
    { scrollTop: $(".banner").position().top },
    "slow"
  );
});

$('#nonTechbutton').click((e) => {
  e.preventDefault();
  ntechClick();
  $("html, body").animate(
    { scrollTop: $(".banner").position().top },
    "slow"
  );
});

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
var technicalPage = document.getElementById('technicalPage');
var nontechnicalPage = document.getElementById('nontechnicalPage');
var workshopPage = document.getElementById('workshopPage');
var homePage = document.getElementById('mainPage');

var slideshowContainer = document.getElementById('slideshowContainer');
var markers = document.getElementById('slideshowMarkers');
var bannerVideo = document.getElementById('video');
var navbarMobileAnimation = document.getElementsByClassName('navbar-collapse');


function displayWorkshop() {
  workshopPage.style.display = 'flex';
  nontechnicalPage.style.display = 'none';
  technicalPage.style.display = 'none';
  homePage.style.display = 'none';

  bannerVideo.style.display = 'none';
  slideshowContainer.style.display = 'flex';
  markers.style.display = 'flex';
}

function displaytech() {
  workshopPage.style.display = 'none';
  nontechnicalPage.style.display = 'none';
  technicalPage.style.display = 'flex';
  homePage.style.display = 'none';

  bannerVideo.style.display = 'none';
  slideshowContainer.style.display = 'flex';
  markers.style.display = 'flex';
}

function displayntech() {
  workshopPage.style.display = 'none';
  nontechnicalPage.style.display = 'flex';
  technicalPage.style.display = 'none';
  homePage.style.display = 'none';

  bannerVideo.style.display = 'none';
  slideshowContainer.style.display = 'flex';
  markers.style.display = 'flex';
}

function homeClick() {
  homePage.style.display = 'flex';
  workshopPage.style.display = 'none';
  nontechnicalPage.style.display = 'none';
  technicalPage.style.display = 'none';

  bannerVideo.style.display = 'flex';
  slideshowContainer.style.display = 'none';
  markers.style.display = 'none';
}
