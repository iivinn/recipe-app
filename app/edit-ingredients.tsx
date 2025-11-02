// app/edit-ingredients.tsx

/* This is the modal screen.
It receives a list of ingredients, lets the user add/remove items, 
and then sends the new list back to the camera.tsx screen using router params. */

/* Here we could add an autocomplete function to the "Add an ingredient" TextInput.
As the user types "app", you could suggest "apple", "applesauce", etc. 
Spoonacular has an Autocomplete Ingredient Search endpoint for this!
here is the link for that: https://www.postman.com/spoonacular-api/spoonacular-api/request/zcvydcf/autocomplete-ingredient-search */


//Imports

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cameraStyles, EditIngredientsStyles } from "./styles"; // reuse styles (cameraStyles) and import another one

//-------------------------------------------------------------------------------------------

export default function EditIngredientsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams(); // Gets the params passed from camera.tsx
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");

  // This effect runs once when the modal opens
  useEffect(() => {
    // Read the 'ingredients' param and parse it
    if (params.ingredients) {
      try {
        const parsedIngredients = JSON.parse(params.ingredients as string);
        setIngredients(parsedIngredients);
      } catch (e) {
        //... error handling ...
        console.error("Failed to parse ingredients:", e);
        Alert.alert("Error", "Could not load detected ingredients.");
      }
    }
  }, [params.ingredients]); // Run when this param changes

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setIngredients((prev) => [...prev, newItem.trim().toLowerCase()]);
      setNewItem("");
    }
  };

  const handleRemoveItem = (indexToRemove: number) => {
    setIngredients((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  // This is the function that sends data BACK
  const handleConfirm = () => {
    if (ingredients.length === 0) {
      Alert.alert(
        "No Ingredients",
        "Please add at least one ingredient to find recipes.",
      );
      return;
    }

    // Go to the loading screen and pass the confirmed list
    router.replace({
      pathname: "/loading", // Go to the loading screen
      params: { confirmedIngredients: JSON.stringify(ingredients) },
    });
  };

  return (
    // SafeAreaView ensures content isn't hidden by the phone's "notch"
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* KeyboardAvoidingView pushes content up when keyboard opens */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={EditIngredientsStyles.container}
      >
        <View style={EditIngredientsStyles.header}>
          <Text style={cameraStyles.title}>Confirm Ingredients</Text>
          <Text style={cameraStyles.subtitle}>
            Add or remove items found in your scan.
          </Text>
        </View>

        <FlatList
          data={ingredients}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item, index }) => (
            <View style={EditIngredientsStyles.listItem}>
              <Text style={EditIngredientsStyles.itemText}>{item}</Text>
              <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                <Ionicons name="close-circle" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          )}
          // The input box is the footer of the list
          ListFooterComponent={
            <View style={EditIngredientsStyles.inputContainer}>
              <TextInput
                style={EditIngredientsStyles.input}
                placeholder="Add an ingredient..."
                value={newItem}
                onChangeText={setNewItem}
                onSubmitEditing={handleAddItem}
              />
              <TouchableOpacity
                style={EditIngredientsStyles.addButton}
                onPress={handleAddItem}
              >
                <Text style={EditIngredientsStyles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          }
          contentContainerStyle={EditIngredientsStyles.listContent}
        />

        {/* The confirm button is locked to the bottom */}
        <View style={EditIngredientsStyles.confirmButtonContainer}>
          <TouchableOpacity
            style={cameraStyles.primaryButton}
            onPress={handleConfirm}
          >
            <Text style={cameraStyles.primaryButtonText}>
              Find Recipes
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

