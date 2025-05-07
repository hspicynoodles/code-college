const challenge1 = document.getElementById("challenge1");
var coll = document.getElementsByClassName("collapsible");
var startButton = document.getElementById("start-button");
const crownInput = document.getElementById("crown-input");
const htmlCssIcon = document.getElementById("html-css-icon");
const homeButton = document.getElementById("home-button")
const chatButton = document.getElementById("chat-button");
const loginEmail = document.getElementById("email-input");
const loginPassword = document.getElementById("password-input");
const signupEmail = document.getElementById("email-signup");
const signupPassword = document.getElementById("password-signup");
const helpButton = document.getElementById("help-button");




let currentCrownPassword = "";
let i;
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // import the firebase auth and create Email and Password
//import { getAuth, sendPasswordResetEmail } from "firebase/auth";
//import OpenAI from "openai"; // import the OpenAI library
// const client = new OpenAI(); // create a new instance of the OpenAi client



// Authentication

const firebaseConfig = {
    apiKey: "AIzaSyChnnGJz9TmEyCU6uqoCgKayiNd7o0npSc",
    authDomain: "code-college-cf1e0.firebaseapp.com",
    projectId: "code-college-cf1e0",
    storageBucket: "code-college-cf1e0.firebasestorage.app",
    messagingSenderId: "677458446671",
    appId: "1:677458446671:web:b421d9f6d456b55e315d3a",
    measurementId: "G-Y5RXZS47TX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // get the firebase auth ready


// Sign up new users
document.getElementById("button-signup").addEventListener("click", (e) => {
    e.preventDefault();
    const email = signupEmail.value;
    const password = signupPassword.value; // get the email and password value from the input field

    createUserWithEmailAndPassword(auth, email, password) // create a new user with email and password 
        .then((userCredential) => {
            // returns promise if we sucessfully create a user 
            // Signed in
            const user = userCredential.user;
            console.log("User" + email + "created successfully");

        })
        //if it fails throw a catch 
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

        });

})




// Sign in existing users
document.getElementById("button-login").addEventListener("click", (e) => {

    e.preventDefault(); // prevent the default form submission
    const email = loginEmail.value; // get the email value from the input field
    const password = loginPassword.value; // get the password value from the input field

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("User signed in: ", user); // log the user to the console for testing purposes
            window.location.href = "home.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            const displayError = document.getElementById("error-msg"); // get the error message element
            displayError.innerHTML = errorMessage; // set the error message to the inner html of the element
            displayError.style.color = "red"; // set the color of the error message to red
            displayError.style.display = "block"; // display the error message to the user
        });
})

// forgot password for exisiting user 
/* 
sendPasswordResetEmail(auth, email)
    .then(() => {
        //Password reset email sent!
        console.log("Password rest email sent to " + email); 
        })
        .catch((error) => {
            const errorCode = error.code; 
            const errorMessage = error.message; 
            // display the error message to the user
*/



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

/*
htmlCssIcon.addEventListener("click", (e) => {
    e.preventDefault(); // prevent the default form submission
    window.location.href = "htmlCss.html"; // redirect to the html and css page
});
*/

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
    for (i = 0, n = charset.length; i < 14; i++) {
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
document.getElementById("button-signup").addEventListener("click", (e) => {
    console.log("Sign up button clicked");
    window.location.href = "signUp.html"; // redirect to the signup page
})

function run() {
    let htmlCode = document.getElementById("html-editor");
    let cssCode = document.getElementById("css-editor");
    let jsCode = document.getElementById("javascript-editor");

    let output = document.getElementById("output");

    output.contentDocument.body.innerHTML = htmlCode.value + "<style>" + cssCode.value + "</style>";

    output.contentWindow.eval(jsCode.value);

}
/*

document.getElementById("button-back").addEventListener("click", (e) => {
    console.log("Sign up button clicked");
    window.location.href = "index.html"; // redirect to the signup page
})

*/

helpButton.addEventListener("click", (e) => {
    console.log("Home button clicked");
    window.location.href = "home.html"; // redirect to the signup page
})
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
