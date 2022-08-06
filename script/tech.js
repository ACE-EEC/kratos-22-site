$(".plus").click(function(){
    $('.transform').toggleClass('transform-active-another');
});

var myIndex = 0;

function reset(index){
    myIndex = index;

    resetMany(myIndex);
}

function triggerDisplay(index){
    myIndex = index;

    displayMany(myIndex);
}

// var newDoc = document.getElementsByClassName('plus')[0];
// var details = document.getElementsByClassName('details')[0];
// var vl = document.getElementsByClassName('vl')[0];
// var bText = document.getElementsByClassName('bText')[0];
// var content = document.getElementsByClassName('content')[0];
// var upArrow = document.getElementsByClassName('upArrow')[0];

function displayMany(myIndex){

    var newDoc = document.getElementsByClassName('plus')[myIndex];
    var details = document.getElementsByClassName('details')[myIndex];
    var vl = document.getElementsByClassName('vl')[myIndex];
    var bText = document.getElementsByClassName('bText')[myIndex];
    var content = document.getElementsByClassName('content')[myIndex];
    var upArrow = document.getElementsByClassName('upArrow')[myIndex];


    details.style.display = 'flex';
    vl.style.display = 'flex';
    bText.style.display = 'block';
    content.style.display = 'flex';
    upArrow.style.display = 'flex';
    newDoc.style.display = 'none';
    
    setTimeout(function(){
        setOpacity(myIndex);
    }, 800)
}    

function setOpacity(myIndex){

    var newDoc = document.getElementsByClassName('plus')[myIndex];
    var details = document.getElementsByClassName('details')[myIndex];
    var vl = document.getElementsByClassName('vl')[myIndex];
    var bText = document.getElementsByClassName('bText')[myIndex];
    var content = document.getElementsByClassName('content')[myIndex];
    var upArrow = document.getElementsByClassName('upArrow')[myIndex];


    details.style.opacity = "1.0";
    vl.style.opacity = "1.0"; 
    content.style.opacity = "1.0";
    bText.style.opacity = "1.0";
    upArrow.style.opacity = "1.0";
    newDoc.style.opacity = "1.0";
}

function setDisplayTime(myIndex){

    var newDoc = document.getElementsByClassName('plus')[myIndex];
    var details = document.getElementsByClassName('details')[myIndex];
    var vl = document.getElementsByClassName('vl')[myIndex];
    var bText = document.getElementsByClassName('bText')[myIndex];
    var content = document.getElementsByClassName('content')[myIndex];
    var upArrow = document.getElementsByClassName('upArrow')[myIndex];


    details.style.display = 'none';
    vl.style.display = 'none';
    content.style.display = 'none';
    bText.style.display = 'none';
    upArrow.style.display = 'none';
    newDoc.style.display = 'flex';
}

function resetMany(myIndex){

    var newDoc = document.getElementsByClassName('plus')[myIndex];
    var details = document.getElementsByClassName('details')[myIndex];
    var vl = document.getElementsByClassName('vl')[myIndex];
    var bText = document.getElementsByClassName('bText')[myIndex];
    var content = document.getElementsByClassName('content')[myIndex];
    var upArrow = document.getElementsByClassName('upArrow')[myIndex];

    details.style.opacity = "0";
    vl.style.opacity = "0"; 
    bText.style.opacity = "0";
    content.style.opacity = "0";
    upArrow.style.opacity = "0";

    setTimeout(function(){
        setDisplayTime(myIndex);
    }, 800)
}