from ultralytics import YOLO
import requests
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()
api_key = os.getenv("SPOONACULAR_API_KEY")

model = YOLO("yolov8n.pt")

# Print class names already trained in the model
#for i, name in model.names.items():
#   print(f"{i}: {name}")

# Define the food-related classes to keep
FOOD_CLASSES = {
    "apple", "banana", "orange", "broccoli", "carrot", "sandwich", "pizza",
    "cake", "hot dog", "donut"
}

def detect_foods(image_path_or_url):
    # If it's a URL, download the image
    if image_path_or_url.startswith("http"):
        response = requests.get(image_path_or_url)
        img = Image.open(BytesIO(response.content))
        results = model(img)
    else:
        results = model(image_path_or_url)

    foods = []
    for box in results[0].boxes:
        cls_name = model.names[int(box.cls)]
        conf = float(box.conf)
        # Only include if it's in our food class list
        if cls_name in FOOD_CLASSES and conf > 0.5:
            foods.append(cls_name)
    return foods


def get_recipes(ingredients):
    query = ",".join(ingredients)
    url = f"https://api.spoonacular.com/recipes/findByIngredients?ingredients={query}&apiKey={api_key}"
    return requests.get(url).json()


# List detected foods from a test image (JSON format)
detected = detect_foods("C:/Users/adamh/Desktop/recipe-app/app/test_images/fruit-in-bowl.jpg")
print("Detected foods:", detected)

# Print recipes based on detected foods via Spoonacular API
recipes = get_recipes(detected)
print("Recipes:", recipes)
