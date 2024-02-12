// Import React and necessary components from React Native and React Navigation
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons"; // Import FontAwesome icons for use in the tab bar

// Import screens and theme styles
import AllActivities from "../screens/AllActivities"; // Screen showing all activities
import SpecialActivities from "../screens/SpecialActivities"; // Screen showing special activities
import * as Theme from '../src/styles'; // Theme file for consistent styling

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

// StyleSheet for customizing the bottom tab bar appearance
const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Theme.colors.primary, // Background color of the tab bar
    height: "12%", // Height of the tab bar
    paddingBottom: Theme.padding.mediumLarge, // Padding at the bottom for better visual spacing
  },
  tabBarActiveTintColor: Theme.colors.tabBarActiveTintColor, // Color of the tab icon and text when active
  tabBarInactiveTintColor: Theme.colors.tabBarInactiveTintColor, // Color of the tab icon and text when inactive
});

// Function component for the tab navigation
export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => { // Function to render the tab icons
          let iconName;
          // Determine the icon name based on the route name
          if (route.name === "All Activities") {
            iconName = "dollar"; // Icon for All Activities tab
          } else if (route.name === "Special Activities") {
            iconName = "exclamation"; // Icon for Special Activities tab
          }

          // Return the icon component
          return <FontAwesome6 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: styles.tabBarActiveTintColor, // Use the active tint color from styles
        tabBarInactiveTintColor: styles.tabBarInactiveTintColor, // Use the inactive tint color from styles
        tabBarStyle: styles.tabBarStyle, // Apply the tab bar style from styles
      })}
    >
      {/* Tab screens configuration */}
      <Tab.Screen
        name="All Activities" // Name and component for the All Activities tab
        component={AllActivities}
        options={() => ({
          headerShown: false, // Hide the header for this screen
          headerBackTitle: "", // Remove the back title text
        })}
      />
      <Tab.Screen
        name="Special Activities" // Name and component for the Special Activities tab
        component={SpecialActivities}
        options={{
          headerShown: false, // Hide the header for this screen as well
        }}
      />
    </Tab.Navigator>
  );
}
