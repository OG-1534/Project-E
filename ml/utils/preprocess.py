
from PIL import Image
import numpy as np

def preprocess_image(image_path, target_size=(224, 224)):
    """
    Preprocess image by resizing and normalizing.
    """
    image = Image.open(image_path)
    image = image.resize(target_size)
    image_array = np.array(image) / 255.0  # Normalize pixel values
    image_array = image_array[np.newaxis, ...]  # Add batch dimension
    return image_array

def preprocess_dataset(example):
    """
    Preprocess each image in the dataset: resize and normalize.
    """
    image = Image.open(example['image_path'])  # Assuming dataset has 'image_path'
    image = image.resize((224, 224))
    image = np.array(image) / 255.0  # Normalize pixel values
    example['image'] = image
    return example