import React from "react";
import { Text, Pressable, Platform, StyleSheet } from "react-native";
import * as Theme from "../src/styles";
const MyButton = ({
  title,
  onPress,
  customStyle,
  initialColor,
  disabled,
  children,
}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={
        disabled ? undefined : { color: Theme.colors.rippleColor }
      } // Ripple effect for Android when the button is pressed, only if not disabled
      style={({ pressed }) => [
        styles.defaultStyle,
        customStyle,
        disabled // If the button is disabled, change the background color to the ripple color
          ? { backgroundColor: Theme.colors.rippleColor }
          : { backgroundColor: initialColor },
        pressed && styles.pressed, // Apply additional styles when the button is pressed
        {
          opacity: pressed && !disabled && Platform.OS === "ios" ? 0.7 : 1, // Reduce opacity slightly when pressed on iOS, if not disabled
        },
      ]}
      disabled={disabled} // Whether the button is disabled or not
    >
      {title &&
        !children && ( // Render the title if provided and no children are provided
          <Text style={styles.text}>{title}</Text>
        )}
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: "5%",
    backgroundColor: "transparent",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#FFFFFF",
  },
});

export default MyButton;
