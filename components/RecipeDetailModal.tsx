// components/RecipeDetailModal.tsx

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
  Linking, // Added to open the URL
  Text,
  TouchableOpacity, // Added for the button
  View,
} from "react-native";

//Importing styles
import { RecipeDetailModalStyles } from "../styles";

const SPOONACULAR_API_KEY = "bac33e06c5634e57b51b7d5b1192ee26"; // TODO: Move to .env

// --- MODIFIED ---
// Added analyzedInstructions and sourceUrl
type RecipeDetail = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: { original: string }[];
  instructions: string;
  analyzedInstructions: { name: string; steps: { number: number; step: string }[] }[];
  sourceUrl: string;
};
// --- END MODIFIED ---

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

      // --- MODIFIED ---
      // Check if we have the clean, structured instructions
      const hasAnalyzedInstructions =
        recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0;

      // A helper function to render the instructions
      const renderInstructions = () => {
        
        // OPTION 1: Best case, use analyzedInstructions
        if (hasAnalyzedInstructions) {
          // We map over each 'step' in the first 'section' of instructions
          return recipe.analyzedInstructions[0].steps.map((step) => (
            <Text key={step.number} style={RecipeDetailModalStyles.stepText}>
              {`\u2022 ${step.step}`}
            </Text>
          ));
        }

        // OPTION 2: Fallback, use the messy instructions string
        if (recipe.instructions) {
          const cleanInstructions = recipe.instructions.replace(/<[^>]+>/g, "");
          return (
            <Text style={RecipeDetailModalStyles.stepText}>
              {cleanInstructions}
            </Text>
          );
        }

        // OPTION 3: Fallback, check for a source URL
        if (recipe.sourceUrl) {
          return (
            <TouchableOpacity
              style={RecipeDetailModalStyles.sourceButton} // We will add this style
              onPress={() => Linking.openURL(recipe.sourceUrl)}
            >
              <Text style={RecipeDetailModalStyles.sourceButtonText}>
                View Full Recipe
              </Text>
              <Ionicons name="open-outline" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          );
        }
        // --- END MODIFIED ---

        // OPTION 4: Worst case, show no instructions
        return (
          <Text style={RecipeDetailModalStyles.stepText}>
            No instructions provided.
          </Text>
        );
      };
      // --- END HELPER ---

      return (
        // Use BottomSheetScrollView for scrollable content *inside* the sheet
        <BottomSheetScrollView
          contentContainerStyle={RecipeDetailModalStyles.scrollContainer}
        >
          <Image source={{ uri: recipe.image }} style={RecipeDetailModalStyles.image} />
          <Text style={RecipeDetailModalStyles.title}>{recipe.title}</Text>

          <View style={RecipeDetailModalStyles.infoRow}>
            <View style={RecipeDetailModalStyles.infoBox}>
              <Ionicons name="time-outline" size={24} color="#44AF16" />
              {/* --- TYPO FIXED HERE --- */}
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

          {/* --- MODIFIED --- */}
          {/* This section now calls our new helper function */}
          <View style={RecipeDetailModalStyles.section}>
            <Text style={RecipeDetailModalStyles.sectionTitle}>Instructions</Text>
            {renderInstructions()}
          </View>
          {/* --- END MODIFIED --- */}
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