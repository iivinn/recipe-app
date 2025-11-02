// components/RecipeDetailModal.tsx


/* This is the re-usable bottom sheet. 
It's "dumb" (in a good way) and just waits to be told which recipe ID to show. 
When present(recipeId) is called, it wakes up, fetches all the data for that
single recipe, and displays it.

Feature Idea: Add a "Save to Favorites" button (a heart icon) inside this modal. 
When the user taps it, we could save the recipe.id to an array in AsyncStorage. 
This would be the first step to building the "Favorites" tab. */




import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef, // Lets this component receive a ref from its parent
  useImperativeHandle, // Exposes methods (like 'present') to the parent
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  View
} from "react-native";

//Importing styles
import { RecipeDetailModalStyles } from "../app/styles";

const SPOONACULAR_API_KEY = "bac33e06c5634e57b51b7d5b1192ee26"; // TODO: Move to .env

type RecipeDetail = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: { original: string }[];
  instructions: string;
};

// Define the props for the component
type Props = {};

// Define the methods we can call on this component from its parent (camera.tsx)
export type RecipeDetailModalRef = {
  present: (recipeId: number) => void;
};

// We wrap the component in forwardRef to accept the 'ref' from camera.tsx
const RecipeDetailModal = forwardRef<RecipeDetailModalRef, Props>(
  (props, ref) => {
    // This is the *internal* ref for the BottomSheetModal
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ["50%", "85%"], []); // Heights the sheet will snap to

    const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // This is the magic. It connects the parent's ref to our internal methods.
    // When the parent calls ref.current.present(), it will run this function.
    useImperativeHandle(ref, () => ({
      present: (recipeId) => {
        fetchRecipeDetails(recipeId); // Load the recipe data
        bottomSheetModalRef.current?.present(); // Open the sheet
      },
    }));

    // Fetches full details for a single recipe
    const fetchRecipeDetails = async (recipeId: number) => {
      setIsLoading(true);
      setRecipe(null);
      setError(null);
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipe details.");
        }
        const data = (await response.json()) as RecipeDetail;
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    // This renders the content based on the loading/error/success state
    const renderContent = () => {
      if (isLoading) {
        return (
          <View style={RecipeDetailModalStyles.centered}>
            <ActivityIndicator size="large" color="#44AF16" />
          </View>
        );
      }
      if (error) {
        return (
          <View style={RecipeDetailModalStyles.centered}>
            <Text style={RecipeDetailModalStyles.errorText}>{error}</Text>
          </View>
        );
      }
      if (!recipe) {
        return null;
      }

      // Clean up HTML tags from Spoonacular's instructions
      const cleanInstructions = recipe.instructions
        ? recipe.instructions.replace(/<[^>]+>/g, "")
        : "No instructions provided.";

      return (
        // Use BottomSheetScrollView for scrollable content *inside* the sheet
        <BottomSheetScrollView contentContainerStyle={RecipeDetailModalStyles.scrollContainer}>
          <Image source={{ uri: recipe.image }} style={RecipeDetailModalStyles.image} />
          <Text style={RecipeDetailModalStyles.title}>{recipe.title}</Text>

          <View style={RecipeDetailModalStyles.infoRow}>
            <View style={RecipeDetailModalStyles.infoBox}>
              <Ionicons name="time-outline" size={24} color="#44AF16" />
              <Text style={RecipeDetailModalStyles.infoText}>{recipe.readyInMinutes} min</Text>
            </View>
            <View style={RecipeDetailModalStyles.infoBox}>
              <Ionicons name="people-outline" size={24} color="#44AF16" />
              <Text style={RecipeDetailModalStyles.infoText}>{recipe.servings} servings</Text>
            </View>
          </View>

          <View style={RecipeDetailModalStyles.section}>
            <Text style={RecipeDetailModalStyles.sectionTitle}>Ingredients</Text>
            {recipe.extendedIngredients.map((ing, index) => (
              <Text key={index} style={RecipeDetailModalStyles.stepText}>
                • {ing.original}
              </Text>
            ))}
          </View>

          <View style={RecipeDetailModalStyles.section}>
            <Text style={RecipeDetailModalStyles.sectionTitle}>Instructions</Text>
            <Text style={RecipeDetailModalStyles.stepText}>{cleanInstructions}</Text>
          </View>
        </BottomSheetScrollView>
      );
    };

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1} // Start at the 85% snap point
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          // This adds the dim background
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
        handleIndicatorStyle={{ backgroundColor: "#C7C7CC" }} // The little pill indicator
      >
        <View style={RecipeDetailModalStyles.contentContainer}>{renderContent()}</View>
      </BottomSheetModal>
    );
  },
);

export default RecipeDetailModal;

