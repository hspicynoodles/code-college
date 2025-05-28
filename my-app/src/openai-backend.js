import express from 'express'; // pulls in the express library so were giving the backend the ability to use express
import cors from 'cors'; // pulls in the cors library so we can use it to allow cross-origin requests
import dotenv from 'dotenv'; // so server can read the .env file 
import OpenAI from 'openai'; // open up OpenAi library 

// here is the key and dont tell anyone 
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // use the OpenAI API key from the .env file
})


application.post('/api/chat', cors(), async (req, res) => { // create a post route for the /api/chat endpoint
    const { messages } = req.body; // get the messages from the request body

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // use the gpt-3.5-turbo model
            messages, // pass the messages to the OpenAI API
        });

        res.json(response); // send the response back to the client
    } catch (error) {
        console.error('Error:', error); // log any errors to the console
        res.status(500).json({ error: 'Internal Server Error' }); // send a 500 status code if there is an error
    }
}); 