const challenge1 = document.getElementById("challenge1");
var coll = document.getElementsByClassName("collapsible");
var startButton = document.getElementById("start-button");
const crownInput = document.getElementById("crown-input");
const htmlCssIcon = document.getElementById("html-css-icon");
const homeButton = document.getElementById("home-button")
const chatButton = document.getElementById("chat-button");
let currentCrownPassword = "";
//import OpenAI from "openai"; // import the OpenAI library
// const client = new OpenAI(); // create a new instance of the OpenAi client




//Challenge Passwords 
const password1 = "code.college/Cr0wn!Z9@tQ7#Lx2M";




// toggling code for bars
// when the user clicks on challenge button the challenge should expand and show the first contents 
// the for loop will loop through the coll button and assign it to open or close the content 
for (i = 0; i < coll.length; i++) { // loop through all the collapsible buttons
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active"); // add the active class to the button
        var content = this.nextElementSibling; // get the next element after the button which should be div
        if (content.style.display === "block") { // if the content is already open
            content.style.display = "none"; // hide it 
        } else {
            content.style.display = "block"; // else show it 
        }
    });
}

function htmlCssWebpage() {
    window.location.href = "challenge1.html";

}
// open up a new window when the user clicks on the start button
function startFunction() {
    window.open("playground.html", "_blank"); // open the playground.html in a new window   
    const secretCrownStarter = "code.college/Cr0wn!";
    currentCrownPassword = secretCrownStarter + generatePassword(); // generate a new password for each challenge
    console.log(currentCrownPassword); // log the password to the console for testing purposes

    return currentCrownPassword; // return the password to be used in the submit function

}

// when the user clicks on submit function is should match the input value with the correct answer
// I dont want to have 20 submitFunctions so I will use a switch statement to check the input value
function submitFunction() {
    //what I want to do instead of using a password for each challenge I am going to create a random password so each time 
    // the user clicks on a challenge a new password should be generated and after each challenge we should delete the password
    // and generate a new one for the next challenge
    const crownInput = document.getElementById("crown-input"); // get the input value

    if (crownInput.value.trim() === currentCrownPassword) {
        document.getElementById("challenge1").style.display = "block"; // display the crown
        crownInput.value = ""; // Clear the input field
        const activeButton = document.querySelector(".collapsible.active");// querey selector helps find the active/open button
        if (activeButton) {
            activeButton.classList.remove("active"); // Remove the active style from button

            const content = activeButton.nextElementSibling; // Find the content div under the  button becuase the div is the next thing after the button
            if (content) {
                content.style.display = "none"; // Hide it
            }
        }

    } else {
        alert("Incorrect");
    }
}

function generatePassword() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

    let password = "";

    //loop through the charset 
    for (let i = 0, n = charset.length; i < 14; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length)); // get a random character from the charset
    }

    console.log(password);
}

function homeButtonClick() {
    window.location.href = "index.html";
}
function chatButtonClick() {
    window.location.href = "chat.html";
}
function run() {
    let htmlCode = document.getElementById("html-editor");
    let cssCode = document.getElementById("css-editor");
    let jsCode = document.getElementById("javascript-editor");

    let output = document.getElementById("output");

    output.contentDocument.body.innerHTML = htmlCode.value + "<style>" + cssCode.value + "</style>";

    output.contentWindow.eval(jsCode.value);

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

// function to use openAi for getting the answer to the question
