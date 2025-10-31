import { predictFood } from "@/utils/predictFood";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { cameraStyles } from "./styles";

export default function CameraScreen() {
  const [result, setResult] = useState<string>("No results yet");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectedFoods, setDetectedFoods] = useState<
    { name: string; probability: number }[]
  >([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      handlePredictFood(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "Camera permission is required to take photos.",
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      handlePredictFood(result.assets[0].uri);
    }
  };

  const handleFoodResult = async (result: any) => {
    setIsLoading(true);
    try {
      // Store detected foods for display
      const foods = result
        .filter((item: any) => item.probability > 0.1) // Lower threshold to show more foods
        .slice(0, 5) // Show up to 10 detected foods
        .map((item: any) => ({
          name: item.name,
          probability: item.probability,
        }));
      setDetectedFoods(foods);

      const topFoods = result
        .filter((item: any) => item.probability > 0.1)
        .slice(0, 5)
        .map((item: any) => item.name)
        .join(", ");

      const spoonacularResult = await fetch(
        `https://api.spoonacular.com/recipes/search?query=${topFoods}&apiKey=bac33e06c5634e57b51b7d5b1192ee26`,
      );
      const data = await spoonacularResult.json();
      console.log(data);
      const titles =
        data.results?.map((recipe: any) => recipe.title).join("\n") ||
        "No recipes found";
      setResult(titles);
    } catch {
      setResult("Error fetching recipes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const convertImageToBase64 = async (uri: string): Promise<string | null> => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  };

  const handlePredictFood = async (imageUri: string) => {
    if (imageUri) {
      setIsLoading(true);
      try {
        // Convert local URI to base64 for Clarifai
        const base64Image = await convertImageToBase64(imageUri);
        if (!base64Image) {
          setResult("Error processing image. Please try again.");
          setIsLoading(false);
          return;
        }

        // Send base64 image to Clarifai
        const clarifaiResult = await predictFood(base64Image, true);
        handleFoodResult(clarifaiResult);
      } catch (error) {
        console.error("Error analyzing image:", error);
        setResult("Error analyzing image. Please try again.");
        setIsLoading(false);
      }
    }
  };

  return (
    <ScrollView style={cameraStyles.container}>
      <View style={cameraStyles.header}>
        <Text style={cameraStyles.title}>Scan Your Food</Text>
        <Text style={cameraStyles.subtitle}>
          Take a photo or select from gallery to get recipe suggestions
        </Text>
      </View>

      <View style={cameraStyles.buttonContainer}>
        <TouchableOpacity style={cameraStyles.primaryButton} onPress={takePicture}>
          <Text style={cameraStyles.primaryButtonText}>📷 Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={cameraStyles.secondaryButton} onPress={pickImage}>
          <Text style={cameraStyles.secondaryButtonText}>🖼️ Choose from Gallery</Text>
        </TouchableOpacity>
      </View>

      {selectedImage && (
        <View style={cameraStyles.imageContainer}>
          <Text style={cameraStyles.sectionTitle}>Selected Image</Text>
          <Image source={{ uri: selectedImage }} style={cameraStyles.selectedImage} />
        </View>
      )}

      {detectedFoods.length > 0 && (
        <View style={cameraStyles.detectedFoodsContainer}>
          <Text style={cameraStyles.sectionTitle}>Detected Foods</Text>
          <View style={cameraStyles.foodsList}>
            {detectedFoods.map((food, index) => (
              <View key={index} style={cameraStyles.foodItem}>
                <Text style={cameraStyles.foodName}>{food.name}</Text>
                <Text style={cameraStyles.foodProbability}>
                  {Math.round(food.probability * 100)}%
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={cameraStyles.resultsContainer}>
        <Text style={cameraStyles.sectionTitle}>Recipe Suggestions</Text>
        {isLoading ? (
          <View style={cameraStyles.loadingContainer}>
            <Text style={cameraStyles.loadingText}>Analyzing your food...</Text>
          </View>
        ) : (
          <View style={cameraStyles.resultsBox}>
            <Text style={cameraStyles.resultsText}>{result}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}


