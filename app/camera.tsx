import { predictFood } from "@/utils/predictFood";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan Your Food</Text>
        <Text style={styles.subtitle}>
          Take a photo or select from gallery to get recipe suggestions
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={takePicture}>
          <Text style={styles.primaryButtonText}>📷 Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={pickImage}>
          <Text style={styles.secondaryButtonText}>🖼️ Choose from Gallery</Text>
        </TouchableOpacity>
      </View>

      {selectedImage && (
        <View style={styles.imageContainer}>
          <Text style={styles.sectionTitle}>Selected Image</Text>
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        </View>
      )}

      {detectedFoods.length > 0 && (
        <View style={styles.detectedFoodsContainer}>
          <Text style={styles.sectionTitle}>Detected Foods</Text>
          <View style={styles.foodsList}>
            {detectedFoods.map((food, index) => (
              <View key={index} style={styles.foodItem}>
                <Text style={styles.foodName}>{food.name}</Text>
                <Text style={styles.foodProbability}>
                  {Math.round(food.probability * 100)}%
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.resultsContainer}>
        <Text style={styles.sectionTitle}>Recipe Suggestions</Text>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Analyzing your food...</Text>
          </View>
        ) : (
          <View style={styles.resultsBox}>
            <Text style={styles.resultsText}>{result}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
    lineHeight: 22,
  },
  buttonContainer: {
    padding: 24,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#007AFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  secondaryButtonText: {
    color: "#007AFF",
    fontSize: 18,
    fontWeight: "600",
  },
  imageContainer: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 16,
  },
  selectedImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: "#E5E5EA",
  },
  detectedFoodsContainer: {
    padding: 24,
  },
  foodsList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 2,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1C1E",
    flex: 1,
    textTransform: "capitalize",
  },
  foodProbability: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 50,
    textAlign: "center",
  },
  resultsContainer: {
    padding: 24,
  },
  loadingContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingText: {
    fontSize: 16,
    color: "#8E8E93",
    fontStyle: "italic",
  },
  resultsBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultsText: {
    fontSize: 16,
    color: "#1C1C1E",
    lineHeight: 24,
  },
});
