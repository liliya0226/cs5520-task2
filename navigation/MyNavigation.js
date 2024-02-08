import { createStackNavigator } from "@react-navigation/stack";
import Start from "../screens/Start";
import MyTabs from "./MyTabs";
import AddActivity from "../screens/AddActivity";
import MyButton from "../components/MyButton";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Button } from "react-native";

const Stack = createStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(204, 229, 255)",
    card: "#00008B",
  },
};

const MyNavigation = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerStyle: {
            backgroundColor: MyTheme.colors.card,
          },
          headerTintColor: "rgb(225, 225, 255)",

          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {/* <Stack.Screen name="Start" component={Start} /> */}
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={({ navigation,route }) => ({
            headerLeft: () => null,
            headerTitle: getHeaderTitle(route),
            headerRight: () => (
              <MyButton
                onPress={() => navigation.navigate("Add An Activity")}
                title="Add"
                initialTextColor="#FFD700"
                pressedTextColor="transparent"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Add An Activity"
          component={AddActivity}
          options={({navigation}) =>({
            headerLeft: () => (
              <Button
                onPress={() => navigation.goBack()}
                title="<"
                color="white"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const getHeaderTitle = (route) => {

  const routeName = getFocusedRouteNameFromRoute(route) ?? 'MyTabs';

  switch (routeName) {
    case 'All Activities':
      return 'All Activities';
    case 'Special Activities':
      return 'Special Activities';
    default:
      return 'All Activities';
  }
};
export default MyNavigation;
