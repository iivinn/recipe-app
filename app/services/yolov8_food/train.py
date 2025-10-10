from ultralytics import YOLO
import requests
from PIL import Image
from io import BytesIO

model = YOLO("yolov8n.pt")

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
        if conf > 0.5:
            foods.append(cls_name)
    return foods



def get_recipes(ingredients):
    api_key = "YOUR_SPOONACULAR_KEY"
    query = ",".join(ingredients)
    url = f"https://api.spoonacular.com/recipes/findByIngredients?ingredients={query}&apiKey={api_key}"
    return requests.get(url).json()

# Example
detected = detect_foods("test_food.jpg")
#recipes = get_recipes(detected)
#print(recipes)
