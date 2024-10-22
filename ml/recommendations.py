
def generate_recommendations(skin_condition):
    """
    Generate personalized recommendations based on the detected skin condition.
    """
    recommendations = {
        "Acne": [
            "Use a gentle cleanser.",
            "Avoid oily cosmetics."
        ],
        "Eczema": [
            "Moisturize regularly.",
            "Avoid hot showers."
        ]
        # Add more conditions as needed
    }
    return recommendations.get(skin_condition, ["No recommendations available."])