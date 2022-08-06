var newDoc = document.getElementById('plus');

$("#plus").click(function(){
    $('.transform').toggleClass('transform-active-another');
});

var details = document.getElementsByClassName('details')[0];
var vl = document.getElementsByClassName('vl')[0];
var bText = document.getElementsByClassName('bText')[0];
var content = document.getElementsByClassName('content')[0];
var upArrow = document.getElementById('upArrow');

function displayMany(){
    details.style.display = 'flex';
    vl.style.display = 'flex';
    bText.style.display = 'block';
    content.style.display = 'flex';
    upArrow.style.display = 'flex';
    newDoc.style.display = 'none';
    
    setTimeout(function(){
        setOpacity();
    }, 800)
}    

function setOpacity(){
    details.style.opacity = "1.0";
    vl.style.opacity = "1.0"; 
    content.style.opacity = "1.0";
    bText.style.opacity = "1.0";
    upArrow.style.opacity = "1.0";
    newDoc.style.opacity = "1.0";
}

function setDisplayTime(){
    details.style.display = 'none';
    vl.style.display = 'none';
    content.style.display = 'none';
    bText.style.display = 'none';
    upArrow.style.display = 'none';
    newDoc.style.display = 'flex';
}

function resetMany(){
    details.style.opacity = "0";
    vl.style.opacity = "0"; 
    bText.style.opacity = "0";
    content.style.opacity = "0";
    upArrow.style.opacity = "0";

    setTimeout(function(){
        setDisplayTime();
    }, 800)
}

function reset(){
    resetMany();
}

function triggerDisplay(){
    displayMany();
}