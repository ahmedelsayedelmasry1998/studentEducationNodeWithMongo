let mainElement = document.getElementById("mainElement");
let optionUl = document.getElementById("optionUl");
mainElement.onclick = function ( ) { 
    optionUl.style.transition="all 0.3s linear";
    optionUl.classList.toggle("h-s");
 }