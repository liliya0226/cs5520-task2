import { createStackNavigator } from "@react-navigation/stack";
import Start from "../screens/Start";
import MyTabs from "./MyTabs";
import AddActivity from "../screens/AddActivity";
import MyButton from "../components/MyButton";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";
import * as Theme from "../src/styles";


// Create a stack navigator instance
const Stack = createStackNavigator();

// Customize the navigation theme
const MyTheme = {
  ...DefaultTheme, // Start with the default theme
  colors: {
    ...DefaultTheme.colors, // Inherit default colors
    background: Theme.colors.light, // Set a custom background color
    card: Theme.colors.cardColor, // Set a custom card color
  },
};

// Define the MyNavigation component
const MyNavigation = () => {
  return (
    // Navigation container wrapping the stack navigator, applying the custom theme
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Start" // Set the first screen to display
        screenOptions={{
          headerStyle: {
            backgroundColor: MyTheme.colors.card, // Customize the header background color
          },
          headerTintColor: Theme.colors.light, // Customize the header text and icon color

          headerTitleStyle: {
            fontWeight: "bold", // Make the header title bold
          },
        }}
      >
        {/* Stack screen for the Start screen */}
        <Stack.Screen name="Start" component={Start} />
        {/* Stack screen for the MyTabs navigator */}
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={({ navigation, route }) => ({
            headerLeft: () => null, // Hide the back button

            headerTitle: getHeaderTitle(route), // Dynamically set the header title
            // Custom button in the header right using the MyButton component
            headerRight: () => (
              <MyButton onPress={() => navigation.navigate("Add An Activity")}>
                <AntDesign name="plus" size={24} color="white" />
              </MyButton>
            ),
          })}
        />
        {/* Stack screen for adding a new activity */}
        <Stack.Screen
          name="Add An Activity"
          component={AddActivity}
          options={({ navigation }) => ({
            headerLeft: () => (
              // Custom back button using TouchableOpacity and AntDesign icon
              <MyButton
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: Theme.padding.extraSmall }}
              >
                <AntDesign
                  name="left"
                  size={Theme.fontSizes.title}
                  color={Theme.colors.secondary}
                />
              </MyButton>
            ),
          })}
        />
        <Stack.Screen
          name="Edit"
          component={AddActivity}
          options={({ navigation }) => ({ headerLeft: () =>(
            // Custom back button using TouchableOpacity and AntDesign icon
            <MyButton
              onPress={() => navigation.goBack()}
              style={{ paddingHorizontal: Theme.padding.extraSmall }}
            >
              <AntDesign
                name="left"
                size={Theme.fontSizes.title}
                color={Theme.colors.secondary}
              />
            </MyButton>
          ) })}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Function to determine the header title based on the current route
const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "MyTabs";

  switch (routeName) {
    case "All Activities":
      return "All Activities";
    case "Special Activities":
      return "Special Activities";
    default:
      return "All Activities";
  }
};

export default MyNavigation;
