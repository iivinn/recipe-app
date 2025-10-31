import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#06c11fff",
        tabBarInactiveTintColor: "#8e938eff",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E5EA",
          paddingBottom: 8,
          paddingTop: 8,
          height: 88,
        },
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
        headerTintColor: "#000000",
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
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
        name="camera"
        options={{
          // We hide the text label under the icon
          tabBarLabel: () => null, 
          headerTitle: "Scan Food",
          
          // We use 'focused' to know if the tab is active
          tabBarIcon: ({ focused, size }) => (
            <View
              style={{
                // This is the circle
                width: 70,
                height: 70,
                borderRadius: 31, 
                backgroundColor: focused ? "#ffffffff" : "#2bd209ff", 
                
                // This is the overlap
                bottom: 20, 
                
                // Centering the icon inside the circle
                justifyContent: "center",
                alignItems: "center",
                
                // Optional shadow
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <Ionicons
                name="camera"
                size={size * 1.6} 
                color={focused ? "#05c70bff" : "#ffffffff"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile" // This points to app/profile.tsx
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          headerTitle: "My Profile",
        }}
      />
      
      // ---------HERE IS THE FIX: You must list your sub-pages here and hide them.-----------
      <Tabs.Screen
        name="(profile)/1edit-profile" // This MUST match the file path
        options={{
          href: null, // This hides it from the tab bar
          headerTitle: 'Edit Profile' // Sets the title when you go to the page
        }}
      />

      {/* Add your other hidden screens here later
      <Tabs.Screen
        name="(profile)/2notifications" 
        options={{ href: null, headerTitle: 'Notifications' }}
      />
      */}

    </Tabs>
  );
}