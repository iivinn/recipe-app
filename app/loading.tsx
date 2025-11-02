// app/loading.tsx

/* This is the full-screen modal that shows the loading animation. 
It acts as the "middle-man" for fetching recipes, creating a better user experience.
1) It receives the confirmedIngredients from the edit-ingredients screen.
2) It imports and displays our LoadingAnimation component.
3) It performs two tasks at the same time (using Promise.all):
   a. Fetches recipes from the Spoonacular API. 
   b. Waits for a minimum of 3 seconds (so the user always sees the animation).
4) Once both tasks are finished (e.g., after 3 seconds, or longer if the API is slow), 
it navigates the user to the camera screen, passing the final recipeResults as a parameter. */


import LoadingAnimation from '@/components/LoadingAnimation'; // Our Lottie component
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';

import { LoadingStyles } from "./styles";

const SPOONACULAR_API_KEY = "bac33e06c5634e57b51b7d5b1192ee26";

// This is a helper function that creates a delay
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function LoadingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    // Safety check: if no ingredients were passed, go back to the camera
    if (!params.confirmedIngredients) {
      console.error("No ingredients found, returning to camera.");
      router.replace('/(tabs)/camera');
      return;
    }

    // Parse the ingredients from the previous screen
    const ingredients = JSON.parse(params.confirmedIngredients as string);
    
    // Start the process
    fetchRecipesAndNavigate(ingredients);

  }, [params.confirmedIngredients]);

  const fetchRecipesAndNavigate = async (ingredients: string[]) => {
    try {
      // 1. Create the API fetch promise
      const ingredientsString = ingredients.join(",+");
      const fetchPromise = fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&number=10&apiKey=${SPOONACULAR_API_KEY}`
      );

      // 2. Create the minimum 3-second timer promise
      const timerPromise = wait(3000); // 3000ms = 3 seconds

      // 3. Wait for BOTH promises to resolve
      const [response] = await Promise.all([fetchPromise, timerPromise]);

      // 4. Now that 3 seconds have passed AND we have data, process it
      const data = await response.json();
      
      if (data.length === 0) {
        // If no results, show an alert and then go back
        Alert.alert(
          "No Recipes Found",
          "Try adjusting your ingredients.",
          [
            // This navigates *after* the user presses "OK"
            { 
              text: "OK", 
              onPress: () => router.replace('/(tabs)/camera') 
            }
          ]
        );
        return;
      }
      
      // 5. We have results! Navigate to camera screen and pass the results
      router.replace({
        pathname: '/(tabs)/camera',
        params: { recipeResults: JSON.stringify(data) }
      });

    } catch (err) {
      console.error(err);
      Alert.alert(
        "API Error", 
        "Failed to fetch recipes. Please try again.",
        [
          { 
            text: "OK", 
            onPress: () => router.replace('/(tabs)/camera') 
          }
        ]
      );
    }
  };

  // This is what the user sees while the promises are running
  return (
    <View style={LoadingStyles.container}>
      <LoadingAnimation />
      <Text style={LoadingStyles.loadingText}>  </Text>
    </View>
  );
}

