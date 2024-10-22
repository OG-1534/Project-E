import os
from together import Together
from dotenv import load_dotenv 

# Load environment variables
load_dotenv()  

# Access the API key
api_key = os.environ.get("TOGETHER_API_KEY")
if not api_key:
    raise ValueError("API key is missing. Please set TOGETHER_API_KEY in your environment.")

# Initialize the Together client with the API key
client = Together(api_key=api_key)

# Make the API call
stream = client.chat.completions.create(
    model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    messages=[{"role": "user", "content": "What are some fun things to do in New York?"}],
    stream=True,
)

# Process and print the streaming response
for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="", flush=True)