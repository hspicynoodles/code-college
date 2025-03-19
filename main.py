import openai 
from dotenv import find_dotenv, load_dotenv
import os
from openai import OpenAI 


load_dotenv()

openai.api_key = os.environ.get("OPENAI_API_KEY")

client = OpenAI()
model = "gpt-4o" # the model variable that we are going to be using 
 

#== Create our Assistant ==
code_college_master = client.beta.assistants.create(
    name="Code College Master", #name of the personal assistant 
    instructions="I am here to help you with your coding questions", #instructions for the assistant
    tools=[{"type": "code_interpreter"}],
    model=model
)
assistant_id = code_college_master.id
print(assistant_id) #give us the id of the assistant 

#== Thread ==
thread = client.beta.threads.create(
    messages=[
        {
            "role": "user",
            "content": "How do I write a for loop in Python?"
         }
    ]
)
thread_id = thread.id
print(thread_id)

