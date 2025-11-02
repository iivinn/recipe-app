// This is where all the buttons for the home page recent recipes goes
// Everyhting in this file will work only for the recent recipes section


/* It's a "static" component, meaning it just shows hard-coded recipe buttons
(Pasta, Chicken, Salad) that don't do anything yet.

Feature Idea: This is a perfect place for a new feature. We could:
1) Make it dynamic: Instead of hard-coding the recipes, make the component accept 
an array of recipe objects as props.
2) Connect it to History: The best feature would be to save the last 3-5 recipes
the user actually viewed (from the modal) into AsyncStorage (local storage). 
Then, this component could read from that storage and truly show "Recent Recipes." */




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