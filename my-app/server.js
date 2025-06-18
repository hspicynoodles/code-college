console.log('server.js is starting...');

//import the express library so we can use functions 
import express from 'express';
import { OpenAI } from 'openai';// import openai library 
import cors from 'cors'; // import cors to handle cross-origin requests

//create an express app 
const app = express();
import dotenv from 'dotenv'; // import dotenv to manage environment variables
dotenv.config(); // load environment variables from .env file
app.use(cors()); // use cors to allow cross-origin requests

// define the port/ channel the server will listen on
const PORT = 3000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

//handle JSON requests
app.use(express.json());

// test route to check if the server is running 
// route that will recieve messages 
app.get('/', (req, res) => {
    res.send('Code College AI server is running!');
});

// POST is the request that sends data to the server 
app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    console.log('User sent: ', userMessage);

    // Here you would typically process the message, e.g., send it to an AI model
    try {
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a coding challenge checker. Only respond with 'Correct ✅' or 'Incorrect ❌' and a short reason if the answer does not meet the requirements."
                },
                {
                    role: "user",
                    content: `
Challenge:
Write a valid HTML5 boilerplate. It must include:
- <!DOCTYPE html>
- <html>, <head>, and <body> tags
- <meta charset="UTF-8">
- <title> tag
- A comment inside the body

User's Answer:
${userMessage}
`
                }
            ]
        });

        const reply = chatResponse.choices[0].message.content;
        res.json({ reply });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong with OpenAI.' });
    }
});
// start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


