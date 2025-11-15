// app/(tabs)/index.tsx (or wherever your HomeScreen is)

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RecentRecipesButtons from "../../components/RecentRecipesButtons";
import { homeStyles } from "../../styles";

// --- ADD THIS DATA ARRAY ---
// We'll use this to create the buttons.
// The icon names are from Ionicons.
const categories = [
  { name: 'Recipes', icon: 'restaurant-outline' },
  { name: 'Drinks', icon: 'cafe-outline' },
  { name: 'Desserts', icon: 'ice-cream-outline' },
  { name: 'Groceries', icon: 'cart-outline' },
];
// ----------------------------

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

      {/* === THIS IS THE NEW SLIDER === */}
      <View style={homeStyles.categorySection}>
        <ScrollView 
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={homeStyles.categoryScrollView}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              // We apply styles conditionally
              style={[
                homeStyles.categoryButton,
                category.name === 'Recipes'
                  ? homeStyles.activeCategoryButton
                  : homeStyles.inactiveCategoryButton,
              ]}
            >
              <Ionicons
                name={category.icon as any} // 'as any' helps TypeScript with the icon names
                size={20}
                // Color is also conditional
                color={category.name === 'Recipes' ? '#FFFFFF' : '#44AF16'}
                style={homeStyles.categoryIcon}
              />
              <Text
                style={[
                  homeStyles.categoryButtonText,
                  category.name === 'Recipes'
                    ? homeStyles.activeCategoryText
                    : homeStyles.inactiveCategoryText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* === END OF NEW SLIDER === */}

      <View style={homeStyles.section}>
        <Text style={homeStyles.sectionTitle}>Quick Actions</Text>
        <View style={homeStyles.actionGrid}>
          {/* ...your TouchableOpacity buttons... */}
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

      <View style={{ paddingBottom: 150 }} />
    </ScrollView>
  );
}