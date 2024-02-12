import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import * as Theme from "../src/styles";

// Custom button component that changes text color based on press state
const MyButton = ({ title, onPress, initialTextColor, pressedTextColor }) => {
  // State to track if the button is pressed
  const [isPressed, setIsPressed] = useState(false);

  // Function to handle the press in action
  const handlePressIn = () => {
    setIsPressed(true); // Set isPressed to true when the button is pressed
  };

  // Function to handle the press out action
  const handlePressOut = () => {
    setIsPressed(false); // Reset isPressed to false when the button is released
  };

  // Render the button
  return (
    // TouchableOpacity for the button to allow for press events
    <TouchableOpacity
      onPress={onPress} // Propagate the onPress event to the parent component
      onPressIn={handlePressIn} // Handle the press in action
      onPressOut={handlePressOut} // Handle the press out action
      style={styles.button} // Apply styles to the button
    >
      {/* Text inside the button */}
      <Text
        style={[
          styles.buttonText,
          {
            color: isPressed
              ? pressedTextColor // Use pressed text color when the button is pressed
              : initialTextColor, // Use initial text color otherwise
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.colors.transparentBackground,
    padding: Theme.padding.small,
    borderRadius: Theme.borderRadius.medium,
  },
  buttonText: {
    fontSize: Theme.fontSizes.medium,
    textAlign: "center",
  },
});

export default MyButton;
