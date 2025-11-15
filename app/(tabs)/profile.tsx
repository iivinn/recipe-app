// main app color hex #44AF16

import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { profileStyles } from "../../styles";

import { Link } from 'expo-router';

export default function ProfileScreen() {
  return (

    <SafeAreaView 
      style={{ flex: 5, backgroundColor: profileStyles.container.backgroundColor }} 
      edges={['top']}>

      <ScrollView style={profileStyles.container}>

        <View style={profileStyles.header}>
          <View style={profileStyles.avatarContainer}>
            <View style={profileStyles.avatar} />
          </View>
          <Text style={profileStyles.userName}>John Doe</Text>
          <Text style={profileStyles.userEmail}>john.doe@example.com</Text>
        </View>

        <View style={profileStyles.statsContainer}>
          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statNumber}>24</Text>
            <Text style={profileStyles.statLabel}>Recipes Saved</Text>
          </View>
          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statNumber}>156</Text>
            <Text style={profileStyles.statLabel}>Photos Scanned</Text>
          </View>
          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statNumber}>8</Text>
            <Text style={profileStyles.statLabel}>Favorites</Text>
          </View>
        </View>

        <View style={profileStyles.section}>
          <Text style={profileStyles.sectionTitle}>Account</Text>
          <View style={profileStyles.menuList}> 
            <Link href="/1edit-profile" asChild> 
              <TouchableOpacity style={profileStyles.menuItem}>
                <Ionicons name="person-outline" size={24} color="#44AF16" />
                <Text style={profileStyles.menuText}>Edit Profile</Text>
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
              </TouchableOpacity>
            </Link>
            <Link href="/2notifications" asChild>
              <TouchableOpacity style={profileStyles.menuItem}>
                <Ionicons name="notifications-outline" size={24} color="#44AF16" />
                <Text style={profileStyles.menuText}>Notifications</Text>
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
              </TouchableOpacity>
            </Link>
            <Link href="/3privacy" asChild>
              <TouchableOpacity style={profileStyles.menuItem}>
                <Ionicons name="shield-outline" size={24} color="#44AF16" />
                <Text style={profileStyles.menuText}>Privacy & Security</Text>
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={profileStyles.section}>
          <Text style={profileStyles.sectionTitle}>Preferences</Text>
          <View style={profileStyles.menuList}>
            <Link href="/4dietery-preferances" asChild>
              <TouchableOpacity style={profileStyles.menuItem}>
                <Ionicons name="restaurant-outline" size={24} color="#44AF16" />
                <Text style={profileStyles.menuText}>Dietary Preferences</Text>
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
              </TouchableOpacity>
            </Link>
            <Link href="/5language" asChild>
              <TouchableOpacity style={profileStyles.menuItem}>
                <Ionicons name="language-outline" size={24} color="#44AF16" />
                <Text style={profileStyles.menuText}>Language</Text>
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
              </TouchableOpacity>
            </Link>
            <Link href="/6dark-mode" asChild>
            <TouchableOpacity style={profileStyles.menuItem}>
              <Ionicons name="moon-outline" size={24} color="#44AF16" />
              <Text style={profileStyles.menuText}>Dark Mode</Text>
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={profileStyles.section}>
          <Text style={profileStyles.sectionTitle}>Support</Text>
          <View style={profileStyles.menuList}>
            <Link href="/7help" asChild>
              <TouchableOpacity style={profileStyles.menuItem}>
                <Ionicons name="help-circle-outline" size={24} color="#44AF16" />
                <Text style={profileStyles.menuText}>Help Center</Text>
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
              </TouchableOpacity>
            </Link>
            <Link href="/8contact" asChild>
              <TouchableOpacity style={profileStyles.menuItem}>
                <Ionicons name="mail-outline" size={24} color="#44AF16" />
                <Text style={profileStyles.menuText}>Contact Us</Text>
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
              </TouchableOpacity>
            </Link>
            <Link href="/9rate" asChild>
              <TouchableOpacity style={profileStyles.menuItem}>
                <Ionicons name="star-outline" size={24} color="#44AF16" />
                <Text style={profileStyles.menuText}>Rate App</Text>
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={profileStyles.section}>
          <TouchableOpacity style={profileStyles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
            <Text style={profileStyles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


