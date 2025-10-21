import { predictFood } from "@/utils/predictFood";
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
      const topFoods = result
        .filter((item: any) => item.probability > 0.5)
        .slice(0, 5)
        .map((item: any) => item.name)
        .join(", ");

      const spoonacularResult = await fetch(
        `https://api.spoonacular.com/recipes/search?query=${topFoods}&apiKey=bac33e06c5634e57b51b7d5b1192ee26`,
      );
      const data = await spoonacularResult.json();
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

  const handlePredictFood = async (imageUriOrUrl: string) => {
    if (imageUriOrUrl) {
      setIsLoading(true);
      try {
        const clarifaiResult = await predictFood(imageUriOrUrl);
        handleFoodResult(clarifaiResult);
      } catch {
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
