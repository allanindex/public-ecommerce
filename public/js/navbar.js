const showButton = document.getElementById("showButton")
const navbar = document.getElementById("slideNavbar")
const closeButton = document.getElementById("closeButton")
const body = document.getElementsByTagName("body")
showButton.addEventListener("click", ()=>{
    navbar.style.display = "block";
    closeButton.style.display = "block";
    showButton.style.display  = "none";
    body[0].style.overflow = "hidden";
})
    
closeButton.addEventListener("click", ()=>{
    navbar.style.display = "none";
    closeButton.style.display = "none";
    showButton.style.display  = "block";
    body[0].style.overflow = "scroll"
})
