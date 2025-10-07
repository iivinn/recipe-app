// Import React (needed to use React components and hooks like useEffect)
import { useEffect } from "react";

// Import components from React Native (to build UI for mobile apps)
import { Text, View } from "react-native";

// import constant for API key
import Constants from 'expo-constants';
const SPOON_KEY = Constants.expoConfig?.extra?.SPOONACULAR_API_KEY;
console.log('Loaded Spoonacular key:', SPOON_KEY);

// Default exported component named "Index" (required by expo-router for index.js files)
export default function Index() {

  // useEffect hook: runs code once, when this component first loads
  useEffect(() => {

    // Define an async function to call the Spoonacular API
    const fetchRecipes = async () => {
      try {

        const clarafai_response = await fetch("/clarifaiResults.json"); // <-- NEW
        const detectedFoods = await clarafai_response.json(); // <-- NEW

        const topFoods = detectedFoods
          .filter((item) => item.probability > 0.05) // keep only confident predictions
          .slice(0, 5); // take top 5 items

          // NEW: map to names and join into comma-separated string
          const ingredients = topFoods.map((item) => item.name).join(",");
          console.log("Detected ingredients:", ingredients);

        // Make a network request to the Spoonacular API
        // - "findByIngredients" endpoint lets us pass ingredient names
        // - ingredients=apples,flour means: look for recipes with apples and flour
        // - number=2 means: return only 2 recipes
        // - apiKey=5c6de4569edb47f680801f869c415b2b is the authentication key
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=2&apiKey=${SPOON_KEY}`
        );

        // Convert the raw HTTP response into JSON format (JavaScript object/array)
        const data = await response.json();

        // Print the full JSON response into the console
        // JSON.stringify converts the object into a string
        // null, 2 means format it with indentation = 2 spaces (for easier reading)
        console.log(JSON.stringify(data, null, 2));

      } catch (error) {
        // If anything goes wrong (like bad network or wrong API key), log the error
        console.error("Error fetching data:", error);
      }
    };

    // Call the async function to actually fetch data
    fetchRecipes();

    // Empty dependency array [] means this runs only once (when component loads)
  }, []);

  // UI part of the component: only shows a message on the phone screen
  // The actual recipe data is NOT displayed in the UI — it goes to the console
  return (
    <View>
      <Text>Check console for Spoonacular recipes!</Text>
    </View>
  );
}