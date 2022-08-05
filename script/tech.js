var newDoc = document.getElementById('plus');
newDoc.addEventListener("click", function() {
    newDoc.style.transform = 'rotate(180deg)';
})

var details = document.getElementsByClassName('details')[0];
var vl = document.getElementsByClassName('vl')[0];
var bText = document.getElementsByClassName('bText')[0];
var content = document.getElementsByClassName('content')[0];
var upArrow = document.getElementById('upArrow');

function displayMany(){
    details.style.display = 'flex';
    vl.style.display = 'flex';
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
    upArrow.style.opacity = "1.0";
    newDoc.style.opacity = "1.0";
}

function resetMany(){
    details.style.display = 'none';
    vl.style.display = 'none';
    content.style.display = 'none';
    upArrow.style.display = 'none';
    newDoc.style.display = 'flex';

    details.style.opacity = "0";
    vl.style.opacity = "0"; 
    content.style.opacity = "0";
    upArrow.style.opacity = "0";
}

function reset(){
    setTimeout(resetMany(),1000);
}

function triggerDisplay(){
    setTimeout(displayMany(),3000);
}