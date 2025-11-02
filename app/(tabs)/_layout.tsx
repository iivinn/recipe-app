// app/(tabs)/_layout.tsx

// main app color hex #44AF16

/* This file defines the main bottom tab bar (Home, Camera, Profile). 
It's nested inside the root Stack. 
It also defines the "hidden" screens that are part of the (profile) group, like 1edit-profile.tsx. */

/* We could easily add a new tab here. 
A "Favorites" or "Shopping List" tab would be a perfect fit. 
We'd just add another <Tabs.Screen> and create a new file like app/(tabs)/favorites.tsx*/

//Imports

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

//-----------------------------------------------------------------------------------------

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#06c11fff",
        tabBarInactiveTintColor: "#8e938eff",
        
        tabBarStyle: {
          position: 'absolute', // This makes it float
          bottom: 30,           // 25px from the bottom
          marginHorizontal: 20,  // This creates a 10px gap on both the left and right sides.
          elevation: 5,           // Adds shadow for Android
          backgroundColor: '#FFFFFF',
          borderRadius: 50,       // Makes it rounded
          height: 80,             // A bit taller to look better
          paddingTop: 12, // Pushes icon AND text down from the top
          paddingLeft: 8, // Pushes icon AND text left 
          paddingRight: 8, // Pushes icon AND text right

          // --- Styles for iOS shadow ---
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        // --- END OF REPLACEMENT ---,

        


        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
        headerTintColor: "#000000",
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    > {/* Each <Tabs.Screen> creates a new tab in the bar. */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerTitle: "Recipe App",
        }}
      />
      <Tabs.Screen
        name="camera" // Points to app/(tabs)/camera.tsx
        options={{
          tabBarLabel: () => null, // Hides the "camera" text label
          headerTitle: "Scan Food",
          tabBarIcon: ({ focused, size }) => (
            // This is the custom circular, floating camera button
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 32, 
                backgroundColor: focused ? "#ffffffff" : "#2bd209ff", 
                bottom: 25, // Pushes it up
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <Ionicons
                name="camera"
                size={size * 1.95} 
                color={focused ? "#05c70bff" : "#ffffffff"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile" // This points to app/(tabs)/profile.tsx
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          headerTitle: "My Profile",
        }}
      />
      
      {/* This is a "hidden" screen. It's part of the (profile) stack
          but NOT shown in the tab bar because of 'href: null'. */}
      {/* This path is still correct because route groups are ignored in the URL */}
      <Tabs.Screen
        name="(profile)/1edit-profile" 
        options={{
          href: null,
          headerTitle: 'Edit Profile'
        }}
      />

    </Tabs>
  );
}