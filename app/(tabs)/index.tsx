// main app color hex #44AF16


/* The main landing page. Right now, it shows "Quick Actions"
and the RecentRecipesButtons component.*/

/*
The "Quick Actions" buttons are just static.
We could make them functional. 
The "Scan Food" button, for example, could use router.push('/(tabs)/camera') 
to navigate to the camera tab. */



import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import RecentRecipesButtons from "../../components/RecentRecipesButtons";
import { homeStyles } from "../styles";

// Import now goes up one level (../) and into the components directory
// The styles.ts file is at the root, so import path is (./)

export default function HomeScreen() {
  return (
    
    <ScrollView style={homeStyles.container}>
      
      <Image
        source={require("../media_used/home_screen_header.jpg")}
        style={homeStyles.headerImage}
      />
      
      <View style={homeStyles.logoContainer}>
        <Image
          source={require("../media_used/logo.png")}
          style={homeStyles.logo}
        />
      </View>

      <View style={homeStyles.section1}>
        <Text style={homeStyles.welcomeText}>Dishcovery</Text>
        <Text style={homeStyles.subtitle}>
          AI
        </Text>
      </View>

      <View style={homeStyles.section1}>
        <Text style={homeStyles.subtitle}>That is where the slider will go</Text> 
      </View>

      <View style={homeStyles.section}>
        <Text style={homeStyles.sectionTitle}>Quick Actions</Text>
        <View style={homeStyles.actionGrid}>
          <TouchableOpacity style={homeStyles.actionCard}>
            <Ionicons name="camera" size={32} color="#44AF16" />
            <Text style={homeStyles.actionText}>Scan Food</Text>
          </TouchableOpacity>

          <TouchableOpacity style={homeStyles.actionCard}>
            <Ionicons name="book-outline" size={32} color="#44AF16" />
            <Text style={homeStyles.actionText}>My Recipes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={homeStyles.actionCard}>
            <Ionicons name="heart-outline" size={32} color="#44AF16" />
            <Text style={homeStyles.actionText}>Favorites</Text>
          </TouchableOpacity>

          <TouchableOpacity style={homeStyles.actionCard}>
            <Ionicons name="search-outline" size={32} color="#44AF16" />
            <Text style={homeStyles.actionText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <RecentRecipesButtons />

      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}