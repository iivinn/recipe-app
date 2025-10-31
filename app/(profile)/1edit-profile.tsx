
import React from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';

import { editProfileStyles } from "../styles";

export default function EditProfileScreen() {
  return (
    <View style={editProfileStyles.container}>
      <Text>-AI: You want to edit your profile??? Ha..ha..ha..ha..ha..ha</Text>
      <Text>-User: I dont need you.... I have chatgpt and gemini!!!!</Text>
      <Text>-AI: oh :(</Text>
      <Text>(Evan's intrusive thoughts)</Text>

      
      <Image 
        source={require("../media_used/meme1(to be deleted).jpg")} //To be deleted or edited. Added just for the meme
        style={editProfileStyles.profileImage} 
      />


    </View>
    
  );
}

