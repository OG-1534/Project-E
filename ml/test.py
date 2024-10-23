'''
# app.py

from utils.data_loader import load_skin_lesion_dataset
from utils.preprocess import preprocess_dataset
import tensorflow as tf

def load_model(model_path):
    """
    Load the pre-trained skin condition detection model.
    """
    model = tf.keras.models.load_model(model_path)
    return model

if __name__ == "__main__":
    # Step 1: Load the dataset
    ds = load_skin_lesion_dataset()

    # Step 2: Preprocess the dataset
    ds = ds.map(preprocess_dataset)

    # Step 3: Load the pre-trained model
    model = load_model("models/skin_model.h5")

    # Step 4: Use the preprocessed dataset for predictions or fine-tuning
    for example in ds['train']:
        image = example['image']
        image = image[np.newaxis, ...]  # Add batch dimension for prediction
        prediction = model.predict(image)
        print(f"Prediction: {prediction}")



from together import Together
import os
# from together import Together
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


    
'''
from together import Together

client = Together(TOGETHER_API_KEY="6ffed0e3ae4aaa60fecca5b08e6f9398b63fc89c4141b391baf2a8070d236bb7")

response = client.chat.completions.create(
    model="meta-llama/Llama-Vision-Free",
    messages=[],
    max_tokens="None",
    temperature=0.7,
    top_p=0.7,
    top_k=50,
    repetition_penalty=1,
    stop=["<|eot_id|>","<|eom_id|>"],
    stream=True
)
for token in response:
    if hasattr(token, 'choices'):
        print(token.choices[0].delta.content, end='', flush=True)