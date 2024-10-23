import requests
from PIL import Image
from io import BytesIO
import base64
import os

def load_image_from_url(image_url):
    """
    Loads an image from a given URL.

    :param image_url: URL of the image to load.
    :return: A PIL Image object if successful, or None if failed.
    """
    try:
        response = requests.get(image_url)
        response.raise_for_status()  # Check for HTTP errors
        img = Image.open(BytesIO(response.content))
        return img
    except Exception as e:
        print(f"Error loading image from URL: {e}")
        return None


def load_image_from_local(image_path):
    """
    Loads an image from the local file system and encodes it in base64.

    :param image_path: Path to the image file.
    :return: A base64-encoded string of the image if successful, or None if failed.
    """
    try:
        if os.path.exists(image_path):
            with open(image_path, "rb") as image_file:
                encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
            return encoded_image
        else:
            print(f"File not found: {image_path}")
            return None
    except Exception as e:
        print(f"Error loading image from file: {e}")
        return None