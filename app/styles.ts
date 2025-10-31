//main app color hex #44AF16
// This is a global styles file
// All the styles for all items will go here and then called when necessary


import { StyleSheet } from "react-native";

// ---------------------------------
// STYLES FOR THE HOME SCREEN (index.tsx)
// ---------------------------------
export const homeStyles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA", // Light gray background
  },
  headerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover", // Ensures the image covers the area
  },
  logoContainer: {
    position: "absolute", // Allows it to float on top of the header image
    alignSelf: "center", // Horizontally centers it
    top: 110, // Pushes it down from the top (adjust this to position)
    zIndex: 2, // Makes sure it sits on top of other elements
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 0, // Square logo
    resizeMode: "contain",
    alignItems: "center",
  },
  header: {
    padding: 24,
    top: 70, // This pulls the white box *up* over the header image
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "700", // Bold
    color: "#1C1C1E",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 19,
    color: "#8E8E93", // Gray color
    lineHeight: 22,
  },
  section: {
    padding: 24,
    top: 80, // Pushes this section down to account for the overlapping header
  },
  section1: { // applied to Dishcovery and AI text
    padding: 24,
    top: 14, // Pushes this section down to account for the overlapping header
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600", // Semi-bold
    color: "#1C1C1E",
    marginBottom: 30,
  },
  actionGrid: {
    flexDirection: "row", // Lays out items horizontally
    flexWrap: "wrap", // Allows items to wrap to the next line
    justifyContent: "space-between", // Puts space between items
  },
  actionCard: {
    width: "48%", // Makes each card take up slightly less than half the width
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center", // Centers the icon and text
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1C1C1E",
    marginTop: 8,
  },
});

// ---------------------------------
// STYLES FOR THE RECENT RECIPES COMPONENT (RecentRecipesButtons.tsx)
// ---------------------------------
export const recentStyles = StyleSheet.create({

  section: {
    marginTop: 100,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#111",
  },
  recipeList: {
    gap: 12, // Adds 12 pixels of space between each card
    paddingBottom: 30, // Adds space at the bottom of the scroll view
  },
  recipeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row", // Lays out image and text horizontally
    alignItems: "center", // Vertically centers items in the card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recipeImage: {
    width: 60,
    height: 60,
    backgroundColor: "#E5E5EA", // Placeholder color
    borderRadius: 8,
    marginRight: 16, // Space between image and text
  },
  recipeInfo: {
    flex: 1, // Takes up the remaining space in the card
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  recipeTime: {
    fontSize: 14,
    color: "#8E8E93",
  },
});

// ---------------------------------
// STYLES FOR THE TAB BAR & HEADER (_layout.tsx)
// ---------------------------------

// --- DEFINE VALUES ---
// This object MUST be defined *before* layoutStyles.
export const layoutOptions = {
  activeColor: "#007AFF",
  inactiveColor: "#8e938eff",
  headerTextColor: "#000000",
  headerBackgroundColor: "#FFFFFF",
  tabBarBackgroundColor: "#FFFFFF",
};


// This object uses the values from layoutOptions, so it comes second.
export const layoutStyles = StyleSheet.create({
  // Styles for the tab bar container
  tabBarStyle: {
    backgroundColor: layoutOptions.tabBarBackgroundColor,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    paddingBottom: 8,
    paddingTop: 8,
    // REMOVED height: 88 to prevent clipping the camera button
  },

  // Styles for the header container
  headerStyle: {
    backgroundColor: layoutOptions.headerBackgroundColor,
  },

  // Styles for the header's title text
  headerTitleStyle: {
    fontWeight: "600",
  },

  // Style for the circular camera button
  cameraTabButton: {
    width: 60,
    height: 60,
    borderRadius: 30, // Makes it a perfect circle
    bottom: 20, // This pushes it UP, making it overlap
    justifyContent: "center",
    alignItems: "center",

    // Optional: Add a shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});


//--------------------------------------------------------
//CAMERA STYLES FOR CAMERA.TSX
//--------------------------------------------------------

export const cameraStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
    lineHeight: 22,
  },
  buttonContainer: {
    padding: 24,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: "#44AF16",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#44AF16",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  secondaryButtonText: {
    color: "#44AF16",
    fontSize: 18,
    fontWeight: "600",
  },
  imageContainer: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 16,
  },
  selectedImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: "#E5E5EA",
  },
  detectedFoodsContainer: {
    padding: 24,
  },
  foodsList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 2,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1C1E",
    flex: 1,
    textTransform: "capitalize",
  },
  foodProbability: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 50,
    textAlign: "center",
  },
  resultsContainer: {
    padding: 24,
  },
  loadingContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingText: {
    fontSize: 16,
    color: "#8E8E93",
    fontStyle: "italic",
  },
  resultsBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultsText: {
    fontSize: 16,
    color: "#1C1C1E",
    lineHeight: 24,
  },
});


//----------------------------------------------------
//STYLES FOR PROFILE.TSX
//----------------------------------------------------

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 32,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E5E5EA",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#8E8E93",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#44AF16",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 16,
  },
  menuList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#1C1C1E",
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF3B30",
    marginLeft: 8,
  },
});


//-------------------------------------------------------------------------------------------
// 1EDIT-PROFILE.TSX STYLES
//-------------------------------------------------------------------------------------------

export const editProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: { //to be deleted or edited (used for the meme)
    width: 430,
    height: 430,
    resizeMode: 'contain',
    marginTop: 20,    // Adds some space below the text
  },
});