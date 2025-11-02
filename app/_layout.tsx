// app/_layout.tsx

/* This is the most important layout file. It sets up the main Stack navigator. 
Its job is to manage screens that live outside or on top of the tab bar. 
It also holds the global providers (GestureHandlerRootView and BottomSheetModalProvider) 
that allow gestures and bottom sheets to work anywhere in the app. */

/* This is the perfect place to add a Login/Sign-up screen. 
We could add logic here that checks if a user is logged in. 
If not, show a (auth)/login screen. If they are, show the (tabs) screen. */


//Imports

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//----------------------------------------------------------------------------------------------------------
// This is the root layout of the entire app.
// Everything starts here.

export default function RootLayout() {
  return (
    // These providers need to be at the very top
    // GestureHandlerRootView is required for react-native-gesture-handler to work.
    // We wrap our entire app in it.
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        {/*We use a Stack navigator as the root. 
            This allows us to present MODAL screens on top of our tab bar. */}
        <Stack>
          {/* This screen points to the (tabs) group. 
              It will render the layout file inside the (tabs) folder, 
              which contains our actual bottom tab bar.
              We hide the header for this stack screen. */}
          <Stack.Screen 
            name="(tabs)" 
            options={{ headerShown: false }} 
          />
          
          {/* This is our modal screen. 
              By defining it here, at the root, it can slide up 
              and cover the entire app, including the tab bar. */}
          <Stack.Screen
            name="edit-ingredients"
            options={{
              presentation: "modal", // This tells the Stack to show it as a modal
              headerShown: false, // We use a custom header inside the file
            }}
          />
          
          <Stack.Screen
            name="loading" // This file name matches app/loading.tsx
            options={{
              presentation: "modal",     // Show as a modal
              headerShown: false,      // No header
              gestureEnabled: false,   // User can't swipe down to dismiss
            }}
          />
        
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}