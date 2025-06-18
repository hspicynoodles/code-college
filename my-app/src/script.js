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
const buttonSignUp = document.getElementById("button-signup");
const buttonLogin = document.getElementById("button-login");
const forgotPassword = document.getElementById("forgot-pass");
const forgotPassButton = document.getElementById("forgotpass-submit-button");
const backButton = document.getElementById("button-back");
const accountButton = document.getElementById("account-button");
const checkButton = document.getElementById("check-code");





let currentCrownPassword = "";
let i;
import e from 'cors';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // importing cloud firestore
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'; // import the firebase auth and create Email and Password
import { collection, addDoc } from 'firebase/firestore';
//import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import OpenAI from "openai"; // import the OpenAI library
// const client = new OpenAI(); // create a new instance of the OpenAi client



// OPEN AI 
// how does it work? I am going to grab the code from html + js and send it to node.js server
// then node.js will send the quesion to OPEN API and get the answer back 
// then i shall display the answer in the challenge.html page
// node.js is like javaScript but it runs on the server side and will read files like env


//---------------------------------------------- Firebase Authentication ----------------------------------
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
// Initialize Firebase and Cloud Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // get the firestore ready
const auth = getAuth(app); // get the firebase auth ready
/*
if (buttonSignUp) {
    // Sign up new users
    function signUp() {
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

    }
}
*/

if (buttonLogin) {
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
}

// forgot password for exisiting user 
/*
if (forgotPassButton) {
    forgotPassButton.addEventListener("click", (e) => {
        const email = document.getElementById("email-forgotpass").value;

        sendPasswordResetEmail(auth, email)
            .then(() => {
                //Password reset email sent!
                console.log("Password rest email sent to " + email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const displayError = document.getElementById("error-message");
                displayError.innerHTML = errorMessage; // set the error message to the inner html of the element
                displayError.style.color = "red"; // set the color of the error message to red
                displayError.style.display = "block"; // display the error message to the user


                // display the error message to the user
            });
    })

}
*/
if (forgotPassButton) {
    forgotPassButton.addEventListener("click", (e) => {
        e.preventDefault(); // prevent the default form submission
        console.log("Forgot password button clicked");
    });
}

try {
    const docRef = await addDoc(collection(db, "users"), {
        email: signupEmail.value,
        challenge: "html and css",
    });
    console.log("Document written with ID: ", docRef.id);
} catch (e) {
    console.error("Error adding document: ", e);
}


//----------------------------------Events--------------------------------------------------------------

if (backButton) {
    backButton.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Back button clicked");
        window.location.href = "index.html"; // redirect to the index page

    });
}



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

if (startButton) {
    startButton.addEventListener("click", startFunction)// call the start function to open the playground.html
    console.log("Start button clicked");
}

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
if (buttonSignUp) {
    buttonSignUp.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Sign up button  clicked");
        window.location.href = "signUp.html";
    });
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
 
document.getElementById("button-back").addEventListener("click", (e) => {
    console.log("Sign up button clicked");
    window.location.href = "index.html"; // redirect to the signup page
})
 
*/
/*
helpButton.addEventListener("click", (e) => {
    console.log("Home button clicked");
    window.location.href = "home.html"; // redirect to the signup page
})
    */
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

const challengeDiv = document.getElementById("html-css-icon");
if (challengeDiv) {
    challengeDiv.addEventListener("click", challenge);
}
// function to use openAi for getting the answer to the question
function challenge() {
    window.location.href = "challenge1.html" // open the challenge.html in a new window
    console.log("Challenge button clicked");

}

if (forgotPassword) {
    forgotPassword.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "forgotPass.html"; // redirect to the forgot password page
        console.log("Forgot password button clicked");
    });
}

//gettting the current user IF a user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid; // get the user id
        console.log("User is logged in: ", user); // log the user to the console for testing purposes

    } else {
        console.log("No user is logged in");
    }
});

// function to handle the check button on playground.html
document.getElementById("check-code").addEventListener("click", async () => {
    const input = document.getElementById("html-editor").value; // get the input text from the html editor

    // fetch sends a request over the network and waits for a response
    // we use await becuase fetch is an asynchronous function
    // await only works inside an async function becuase it pauses the execution of the function until the promise is resolved
    try {
        const res = await fetch("http://localhost:3000/message", {
            method: "POST",
            headers: { 'Content-Type': 'application/json', },
            //stringify converts a JavaScript object into a JSON string 
            body: JSON.stringify({ message: input }) // send the input text to the server
        });

        const data = await res.json(); // get the response from the server once  the promise is resolved
        document.getElementById("output-answer").innerText = data.reply;
        console.log("Response from server: ", data.reply); // log the response to the console for testing purposes
    } catch (error) {
        document.getElementById("output-answer").innerText = "An error occurred while checking your code. Please try again.";
    }
}); 