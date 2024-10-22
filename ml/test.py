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