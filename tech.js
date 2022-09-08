$(".plus").click(function () {
  $(".transform").toggleClass("transform-active-another");
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

// var newDoc = document.getElementsByClassName('plus')[0];
// var details = document.getElementsByClassName('details')[0];
// var vl = document.getElementsByClassName('vl')[0];
// var bText = document.getElementsByClassName('bText')[0];
// var content = document.getElementsByClassName('content')[0];
// var upArrow = document.getElementsByClassName('upArrow')[0];

function displayMany(myIndex) {
  var plus = document.getElementsByClassName("plus")[myIndex];
  var details = document.getElementsByClassName("details")[myIndex];
  var vl = document.getElementsByClassName("vl")[myIndex];
  var bText = document.getElementsByClassName("bText")[myIndex];
  var content = document.getElementsByClassName("content")[myIndex];
  var upArrow = document.getElementsByClassName("upArrow")[myIndex];
  var rules = document.getElementsByClassName("cardRules")[myIndex];
  var card = document.getElementsByClassName("card")[myIndex];
  var cardImg = document.getElementsByClassName("cardImage")[myIndex];

  card.style.width = "100%";
  if (window.innerWidth >= 768) {
    cardImg.style.width = "33%";
  } else {
    cardImg.style.width = "100%";
  }
  details.style.display = "flex";
  vl.style.display = "flex";
  bText.style.display = "flex";
  content.style.display = "flex";
  upArrow.style.display = "flex";
  rules.style.display = "inline-block";
  plus.style.display = "none";

  setTimeout(function () {
    setOpacity(myIndex);
  }, 500);
}

function setOpacity(myIndex) {
  var newDoc = document.getElementsByClassName("plus")[myIndex];
  var details = document.getElementsByClassName("details")[myIndex];
  var vl = document.getElementsByClassName("vl")[myIndex];
  var bText = document.getElementsByClassName("bText")[myIndex];
  var content = document.getElementsByClassName("content")[myIndex];
  var upArrow = document.getElementsByClassName("upArrow")[myIndex];
  var rules = document.getElementsByClassName("cardRules")[myIndex];

  details.style.opacity = "1.0";
  vl.style.opacity = "1.0";
  content.style.opacity = "1.0";
  bText.style.opacity = "1.0";
  upArrow.style.opacity = "1.0";
  newDoc.style.opacity = "1.0";
  rules.style.opacity = "1.0";
}

function setDisplayTime(myIndex) {
  var newDoc = document.getElementsByClassName("plus")[myIndex];
  var details = document.getElementsByClassName("details")[myIndex];
  var vl = document.getElementsByClassName("vl")[myIndex];
  var bText = document.getElementsByClassName("bText")[myIndex];
  var content = document.getElementsByClassName("content")[myIndex];
  var upArrow = document.getElementsByClassName("upArrow")[myIndex];
  var rules = document.getElementsByClassName("cardRules")[myIndex];
  var card = document.getElementsByClassName("card")[myIndex];
  var cardImg = document.getElementsByClassName("cardImage")[myIndex];

  cardImg.style.width = "100%";
  if (window.innerWidth >= 768) {
    card.style.width = "25%";
  } else {
    card.style.width = "auto";
  }

  details.style.display = "none";
  vl.style.display = "none";
  content.style.display = "none";
  bText.style.display = "none";
  upArrow.style.display = "none";
  newDoc.style.display = "flex";
  rules.style.display = "none";
}

function resetMany(myIndex) {
  var newDoc = document.getElementsByClassName("plus")[myIndex];
  var details = document.getElementsByClassName("details")[myIndex];
  var vl = document.getElementsByClassName("vl")[myIndex];
  var bText = document.getElementsByClassName("bText")[myIndex];
  var content = document.getElementsByClassName("content")[myIndex];
  var upArrow = document.getElementsByClassName("upArrow")[myIndex];
  var rules = document.getElementsByClassName("cardRules")[myIndex];

  details.style.opacity = "0";
  vl.style.opacity = "0";
  bText.style.opacity = "0";
  content.style.opacity = "0";
  upArrow.style.opacity = "0";
  rules.style.opacity = "0";

  setTimeout(function () {
    setDisplayTime(myIndex);
  }, 500);
}

var sympo = document.getElementsByClassName("sympo")[0];
var tech = document.getElementsByClassName("tech")[0];
var ntech = document.getElementsByClassName("ntech")[0];

//removed since we are adding posters on the top of the page
// $("#link0").on("click", function (e) {
//   e.preventDefault();
//   $("html, body").animate({ scrollTop: $("#mainPage").position().top }, "slow");
// });

// $("#link1").on("click", function (e) {
//   e.preventDefault();
//   $("html, body").animate(
//     { scrollTop: $("#techCardHolder").position().top },
//     "slow"
//   );
// });

// $("#link2").on("click", function (e) {
//   e.preventDefault();
//   $("html, body").animate(
//     { scrollTop: $("#workshopCardHolder").position().top },
//     "slow"
//   );
// });

// $("#link3").on("click", function (e) {
//   e.preventDefault();
//   $("html, body").animate(
//     { scrollTop: $("#ntechCardHolder").position().top },
//     "slow"
//   );
// });

// $("#link4").on("click", function (e) {
//   e.preventDefault();
//   $("html, body").animate({ scrollTop: $("#myFooter").position().top }, "slow");
// });

//This is for the banner text
function sympoClick() {
  // sympo.style.display = 'flex';
  // tech.style.display = 'none';
  // ntech.style.display = 'none';

  //cardholder display
  displayWorkshop();
}

function techClick() {
  // sympo.style.display = 'none';
  // tech.style.display = 'flex';
  // ntech.style.display = 'none';

  //important Scroll Top
  // document.documentElement.scrollTop = document.getElementById('techCardHolder').offsetTop;

  //cardholder display
  displaytech();
}

function ntechClick() {
  // sympo.style.display = 'none';
  // tech.style.display = 'none';
  // ntech.style.display = 'flex';

  //cardholder display
  displayntech();
}

//displaying card holder
var techCardHolder = document.getElementById("techCardHolder");
var ntechCardHolder = document.getElementById("ntechCardHolder");
var workshopCardHolder = document.getElementById("workshopCardHolder");
var homePage = document.getElementById("mainPage");
var video = document.getElementById("mainvideo");
var carouseltech = document.getElementById("carouseltech");
var carouselntech = document.getElementById("carouselntech");

carouseltech.style.display = "none";
carouselntech.style.display = "none";

function displayWorkshop() {
  workshopCardHolder.style.display = "flex";
  ntechCardHolder.style.display = "none";
  techCardHolder.style.display = "none";
  homePage.style.display = "none";
  video.style.display = "flex";

  carouseltech.style.display = "none";
  carouselntech.style.display = "none";
}

function displaytech() {
  workshopCardHolder.style.display = "none";
  ntechCardHolder.style.display = "none";
  techCardHolder.style.display = "flex";
  homePage.style.display = "none";
  video.style.display = "none";

  carouseltech.style.display = "flex";
  carouselntech.style.display = "none";
}

function displayntech() {
  workshopCardHolder.style.display = "none";
  ntechCardHolder.style.display = "flex";
  techCardHolder.style.display = "none";
  homePage.style.display = "none";
  video.style.display = "none";

  carouseltech.style.display = "none";
  carouselntech.style.display = "flex";
}

function homeClick() {
  homePage.style.display = "flex";
  workshopCardHolder.style.display = "none";
  ntechCardHolder.style.display = "none";
  techCardHolder.style.display = "none";
  video.style.display = "flex";

  carouseltech.style.display = "none";
  carouselntech.style.display = "none";
}

var slideIndextech = 1;
showDivstech(slideIndextech);

function plusDivstech(n) {
  showDivstech((slideIndextech += n));
}

function showDivstech(n) {
  var i;
  var x = document.getElementsByClassName("mySlidestech");
  if (n > x.length) {
    slideIndextech = 1;
  }
  if (n < 1) {
    slideIndextech = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndextech - 1].style.display = "block";
  // setTimeout(showDivstech(n + 1), 2000);
}
var slideIndexntech = 1;
showDivsntech(slideIndexntech);

function plusDivsntech(n) {
  showDivsntech((slideIndexntech += n));
}

function showDivsntech(n) {
  var i;
  var x = document.getElementsByClassName("mySlidesntech");
  // console.log(n);
  if (n > x.length) {
    slideIndexntech = 1;
  }
  // console.log(n);
  if (n < 1) {
    slideIndexntech = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndexntech - 1].style.display = "block";
  // setTimeout(showDivsntech(n + 1), 2000);
}
