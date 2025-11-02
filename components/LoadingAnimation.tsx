// components/LoadingAnimation.tsx

/* This is a simple, reusable component. 
Its only job is to display our Lottie (After Effects) animation 
file (loading-animation.json). It's set to autoPlay and loop. 
This component is imported and used by our app/loading.tsx screen to 
show the user a high-performance animation while data is being fetched. */



import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';

import { LoadingAnimationStyles } from "../app/styles";

// This component will just show the Lottie animation
// It's set to autoplay and loop
export default function LoadingAnimation() {
  return (
    <View style={LoadingAnimationStyles.container}>
      <LottieView
        style={LoadingAnimationStyles.lottie}
        source={require('../app/media_used/loading-animation.json')}
        autoPlay
        loop
      />
    </View>
  );
}

