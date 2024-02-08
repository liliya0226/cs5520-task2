import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllActivities from "../screens/AllActivities";
import SpecialActivities from "../screens/SpecialActivities";
import { StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import MyButton from "../components/MyButton";
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "#00008B",
    height: "12%",
  },
  tabBarActiveTintColor: "gold",
  tabBarInactiveTintColor: "gray",
});

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "All Activities") {
            iconName = "dollar";
          } else if (route.name === "Special Activities") {
            iconName = "exclamation";
          }

          return <FontAwesome6 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: styles.tabBarActiveTintColor,
        tabBarInactiveTintColor: styles.tabBarInactiveTintColor,
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <Tab.Screen
        name="All Activities"
        component={AllActivities}
        options={() => ({
          headerShown: false,
          headerBackTitle: "",

        })}
      />
      <Tab.Screen
        name="Special Activities"
        component={SpecialActivities}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
