from datasets import load_dataset

def load_skin_lesion_dataset():
    """
    Load and return the Skin Lesion Dataset from Hugging Face.
    """
    ds = load_dataset("SeyedAli/Skin-Lesion-Dataset")
    return ds