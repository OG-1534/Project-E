import pandas as pd
import random

# Constants
NUM_PRODUCTS = 1000
BRAND_IDS = [1, 2, 3, 4, 5]  # Sample brand IDs

# Sample data
product_names = [
    "Vitamin C Serum", "Moisturizer", "Sunscreen", "Eye Cream", "Lip Balm",
    "Face Wash", "Exfoliating Scrub", "Clay Mask", "Hydrating Gel", "Toner",
    "Facial Oil", "Night Cream", "Day Cream", "Cleanser", "Serum",
    "Acne Treatment", "Hair Conditioner", "Shampoo", "Body Lotion", "Hand Cream",
    "Foot Cream", "Hair Serum", "Facial Mist", "Peeling Gel", "Pore Strips",
    "Makeup Remover", "Foundation", "Concealer", "Blush", "Eyeliner",
    "Mascara", "Lipstick", "Eyeshadow", "Nail Polish", "Body Scrub",
    "Deodorant", "Whitening Cream", "Stretch Mark Cream", "Aftershave Balm",
    "Brow Gel", "Setting Spray", "Lip Gloss", "Bronzer", "Highlighter"
]

# Create a list to hold product data
products = []

# Generate product data
for i in range(1, NUM_PRODUCTS + 1):
    product_name = random.choice(product_names) + f" {i}"  # Unique product name
    brand_id = random.choice(BRAND_IDS)  # Randomly assign a brand ID
    description = f"This is a description for {product_name}."
    price = round(random.uniform(5.0, 100.0), 2)  # Random price between 5.0 and 100.0
    products.append({
        "brand_id": brand_id,
        "product_name": product_name,
        "description": description,
        "price": price
    })

# Create a DataFrame, save to CSV and sort by brand_id
df_products = pd.DataFrame(products)
df_products = df_products.sort_values(by='brand_id', ascending=True)

# Save to CSV
csv_file_path = './products.csv'
df_products.to_csv(csv_file_path, index=False)