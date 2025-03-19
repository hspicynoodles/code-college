const challenge1 = document.getElementById("challenge1");
var coll = document.getElementsByClassName("collapsible");
var startButton = document.getElementById("start-button");
const crownInput = document.getElementById("crown-input");
const htmlCssIcon = document.getElementById("html-css-icon");
const homeButton = document.getElementById("home-button")
const chatButton = document.getElementById("chat-button");



// Challenge 1 Code 

// when the user clicks on challenge1 button the challenge should expand and show the first contents 
// the for loop will loop through the coll button and assign it to open or close the content 

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

function htmlCssWebpage() {
    window.location.href = "challenge1.html";

}
// open up a new window when the user clicks on the start button
function startFunction() {

    // open up a new window in the background functionality still not working but thats the goal

}

function homeButtonClick() {
    window.location.href = "index.html";
}
function chatButtonClick() {
    window.location.href = "chat.html";
}

/*
function navBar(){
    if(homeButton === true){
        window.location.href = "index.html"
    }
        if(fortSButton === true){
        window.location.href = "index.html"
    }
            if(chatButton === true){
        window.location.href = "index.html"
    }
            if(loginButton === true){
        window.location.href = "index.html"
    }
            if(helpButton === true){
        window.location.href = "index.html"
    }
    
}

*/