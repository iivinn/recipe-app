// This is where all the buttons for the home page recent recipes goes
// Everyhting in this file will work only for the recent recipes section

import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { recentStyles } from "../app/styles";

type Props = {
  onPress?: (id: string) => void;
};

export default function RecentRecipes({ onPress }: Props) {
  const handlePress = (id: string) => {
    if (onPress) onPress(id);
    else console.log(`${id} pressed`);
  };

  return (
    <View style={recentStyles.section}>
      <Text style={recentStyles.sectionTitle}>Recent Recipes</Text>

      <View style={recentStyles.recipeList}>
        <TouchableOpacity
          style={recentStyles.recipeCard}
          onPress={() => handlePress("pasta")}
        >
          <Image
            source={require("../app/media_used/pasta.jpg")}
            style={recentStyles.recipeImage}
          />
          <View style={recentStyles.recipeInfo}>
            <Text style={recentStyles.recipeTitle}>Pasta Carbonara</Text>
            <Text style={recentStyles.recipeTime}>25 min</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={recentStyles.recipeCard}
          onPress={() => handlePress("chicken")}
        >
          <Image
            source={require("../app/media_used/chicken.jpg")}
            style={recentStyles.recipeImage}
          />
          <View style={recentStyles.recipeInfo}>
            <Text style={recentStyles.recipeTitle}>Chicken Stir Fry</Text>
            <Text style={recentStyles.recipeTime}>15 min</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={recentStyles.recipeCard}
          onPress={() => handlePress("salad")}
        >
          <Image
            source={require("../app/media_used/caesar.jpg")}
            style={recentStyles.recipeImage}
          />
          <View style={recentStyles.recipeInfo}>
            <Text style={recentStyles.recipeTitle}>Caesar Salad</Text>
            <Text style={recentStyles.recipeTime}>10 min</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}