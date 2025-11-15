// app/(tabs)/camera.tsx

// main app color hex #44AF16

import RecipeDetailModal, {
  RecipeDetailModalRef,
} from "@/components/RecipeDetailModal";
import { predictFood } from "@/utils/predictFood";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { cameraStyles, CameraStyles2 } from "../../styles";


type RecipeSearchResult = {
  id: number;
  title: string;
  image: string;
};

export default function CameraScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
    
  const [detectedFoods, setDetectedFoods] = useState<
    { name: string; probability: number }[]
  >([]);
  const [recipes, setRecipes] = useState<RecipeSearchResult[]>([]);
  const bottomSheetModalRef = useRef<RecipeDetailModalRef>(null);

  // --- this useEffect IS for receiving results ---
  useEffect(() => {
    // It listens for 'recipeResults' from the loading screen
    if (params.recipeResults) {
      try {
        const results = JSON.parse(params.recipeResults as string);
        setRecipes(results);
      } catch (e) {
        console.error("Failed to parse recipe results:", e);
        Alert.alert("Error", "Could not load recipes.");
      }
    }
  }, [params.recipeResults]); // Listen for results

  const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'images', 
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
    if (!result.canceled) {
      resetState();
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      resetState();
      setSelectedImage(result.assets[0].uri);
      handlePredictFood(result.assets[0].uri);
    }
  };

  const resetState = () => {
    setSelectedImage(null);
    setDetectedFoods([]);
    setRecipes([]);
    router.setParams({ confirmedIngredients: "", recipeResults: "" });
  };

  // handleFoodResult navigates to edit-ingredients
  const handleFoodResult = (result: any) => {
    const foods = result
      .filter((item: any) => item.probability > 0.1)
      .slice(0, 5)
      .map((item: any) => ({
        name: item.name,
        probability: item.probability,
      }));
    setDetectedFoods(foods);
    const topFoodNames = foods.map((item: any) => item.name);
    

    router.push({
      pathname: "../edit-ingredients",
      params: { ingredients: JSON.stringify(topFoodNames) },
    });
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
      // We can optionally add a *very short* loading state here
      // just for the scan, but it's not the main loading screen.
      // For now, i'll leave it out for simplicity.
      try {
        const base64Image = await convertImageToBase64(imageUri);
        if (!base64Image) {
          Alert.alert("Error", "Error processing image. Please try again.");
          return;
        }
        const clarifaiResult = await predictFood(base64Image, true);
        handleFoodResult(clarifaiResult);
      } catch (error) {
        console.error("Error analyzing image:", error);
        Alert.alert("Error", "Error analyzing image. Please try again.");
      }
    }
  };

  const openRecipeModal = (recipeId: number) => {
    bottomSheetModalRef.current?.present(recipeId);
  };

  const renderRecipeCard = ({ item }: { item: RecipeSearchResult }) => (
    <TouchableOpacity
      style={CameraStyles2.recipeCard}
      onPress={() => openRecipeModal(item.id)}
    >
      <Image source={{ uri: item.image }} style={CameraStyles2.recipeImage} />
      <View style={CameraStyles2.recipeInfo}>
        <Text style={CameraStyles2.recipeTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <>
      <View style={cameraStyles.header}>
        <Text style={cameraStyles.title}>Scan Your Food</Text>
        <Text style={cameraStyles.subtitle}>
          Take a photo or select from gallery to get recipe suggestions
        </Text>
      </View>

       <View style={cameraStyles.buttonContainer}>
        <TouchableOpacity
          style={cameraStyles.primaryButton}
          onPress={takePicture}
        >
          <Text style={cameraStyles.primaryButtonText}>📷 Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={cameraStyles.secondaryButton}
          onPress={pickImage}
        >
          <Text style={cameraStyles.secondaryButtonText}>
            🖼️ Choose from Gallery
          </Text>
        </TouchableOpacity>
      </View>

      {selectedImage && (
        <View style={cameraStyles.imageContainer}>
          <Text style={cameraStyles.sectionTitle}>Selected Image</Text>
          <Image
            source={{ uri: selectedImage }}
            style={cameraStyles.selectedImage}
          />
        </View>
      )}

      {detectedFoods.length > 0 && !params.confirmedIngredients && (
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
      </View>

      

    </>
  );

  return (
    <SafeAreaView 
      style={{ flex: 1, backgroundColor: cameraStyles.container.backgroundColor }} 
      edges={['top']}>
      <FlatList
        style={cameraStyles.container}
        ListHeaderComponent={renderHeader}
        data={recipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ 
          paddingHorizontal: 24, 
          paddingBottom: 180 
        }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        
        ListEmptyComponent={
          <View style={cameraStyles.resultsBox}>
            <Text style={cameraStyles.resultsText}>
              Scan an image to see recipe suggestions here.
            </Text>
          </View>
        }
      />
      
      <RecipeDetailModal ref={bottomSheetModalRef} />
    </SafeAreaView>
  );
}

