
import React from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';

import { editProfileStyles } from "../../styles";

export default function EditProfileScreen() {
  return (
    <View style={editProfileStyles.container}>
      <Text>-Here is where the edit profile is</Text>
      <Text>....</Text>

      
      <Image 
        source={require("../../media_used/meme1(to be deleted).jpg")} //To be deleted or edited. Added just for the meme
        style={editProfileStyles.profileImage} 
      />


    </View>
    
  );
}

