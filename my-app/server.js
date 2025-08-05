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


// create a list of challenges 
const challenges = {
    html_boilerplate: {
        description: `
Write a valid HTML5 boilerplate. It must include:
- <!DOCTYPE html>
- <html>, <head>, and <body> tags
- <meta charset="UTF-8">
- <title> tag
- A comment inside the body`,
        password: "htmlWizard123"
    },
    reverse_string: {
        description: `
Write a JavaScript function that takes a string and returns it reversed. For example, input "hello" returns "olleh".`,
        password: "stringFlipper9000"
    }
    // add more challenges here
};


// test route to check if the server is running 
// route that will recieve messages 
app.get('/', (req, res) => {
    res.send('Code College AI server is running!');
});

// POST is the request that sends data to the server 
app.post('/message', async (req, res) => {
    const { userMessage, challengeId } = req.body;
    const challenge = challenges[challengeId];

    console.log('User sent: ', userMessage);

    if (!challenge) {
        return res.status(400).json({ error: "Invalid Challenge ID." });
    }

    const prompt = `
Challenge:
${challenge.description}

User's Answer:
${userMessage}
`;

    try {
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a strict coding challenge evaluator."
                },
                {
                    role: "user",
                    content: prompt
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


