from PIL import Image
import numpy as np

def preprocess_image(image, target_size=(224, 224)):
    """
    Preprocess the input image by resizing and normalizing it.

    :param image: A PIL Image object.
    :param target_size: The target size (width, height) for resizing the image.
    :return: A preprocessed NumPy array that can be fed into the model.
    """
    try:
        # Step 1: Resize the image to the target size
        image = image.resize(target_size)

        # Step 2: Convert the image to an array
        image_array = np.array(image)

        # Step 3: Normalize the pixel values to [0, 1] if the model requires it
        image_array = image_array / 255.0

        # Step 4: If the model requires specific channels, adjust (e.g., RGB, grayscale)
        if image_array.shape[-1] == 4:  # Some images may have an alpha channel
            image_array = image_array[..., :3]  # Convert to RGB

        return image_array
    except Exception as e:
        print(f"Error preprocessing image: {e}")
        return None