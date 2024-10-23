from together import Together
import os
from dotenv import load_dotenv
from utils.data_loader import load_image_from_url
# from utils.data_loader import load_image_from_local
from utils.preprocess import preprocess_image

# Load the environment variables from the .env file
load_dotenv()

# Access the API key
api_key = os.getenv("TOGETHER_API_KEY")

# Initialize the API key
client = Together(api_key=api_key)

# Define the image path from your local machine
# image_path = "path_to_your_local_image.jpg"

# Load and base64-encode the image from local machine
# encoded_image = load_image_from_local(image_path)

# Call Together API with the image and text input
response = client.chat.completions.create(
    # model= "meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo",
    model="meta-llama/Llama-Vision-Free",
    messages=[
        {
                "role": "system",
                "content": "You are an experienced dermatologist with in-depth knowledge about every skin issue - answer directly about the skin issue, analyze carefully and its treatment. \nDo not talk about anything aside the skin diagnosis.\nThink carefully before answering.\nAct sure with the answer\nThink verbose.\nDo not refer them to a Dermatologist, you are the dermatologist.\nDo not answer any question if it is not about skin issue\n"
        },
        {
                "role": "user",
                "content": [
                        {
                                "type": "text",
                                "text": "What's the skin diagnosis\n"
                        },
                        {
                                "type": "image_url",
                                "image_url": {
                                        "url": "s3://together-ai-uploaded-user-images-prod/afe97ef5-5e22-4169-9fe5-7241b54c5f0b.jpg"
                                }
                        }
                ]
        }
],
    max_tokens=512,
    temperature=0.4,
    top_p=0.7,
    top_k=5,
    repetition_penalty=0,
    stop=["<|eot_id|>","<|eom_id|>"],
    stream=True
)

# Handle the response stream
try:
    for token in response:
        # Check if 'choices' exists and contains data
        if hasattr(token, 'choices') and len(token.choices) > 0:
            # Ensure 'delta' exists before accessing content
            if hasattr(token.choices[0], 'delta') and hasattr(token.choices[0].delta, 'content'):
                print(token.choices[0].delta.content, end='', flush=True)
            else:
                print("No content found in delta.")
        else:
            print("Choices not available in response.")
except Exception as e:
    print(f"Error during streaming: {e}")