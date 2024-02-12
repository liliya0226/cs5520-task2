import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import * as Theme from "../src/styles";
// DurationInput component for accepting duration input from the user
const DurationInput = ({ value, onChangeText, label }) => {
  // Convert the value to string to ensure the TextInput component works correctly
  const stringValue = value.toString();

  return (
    // Container view for the label and text input
    <View style={styles.inputContainer}>
      {/* Text component to display the input field label */}
      <Text style={styles.inputLabel}>{label}</Text>
      {/* TextInput for user to enter duration */}
      <TextInput
        style={styles.input} // Style for the text input
        value={stringValue} // Display the duration value as a string
        onChangeText={onChangeText} // Function to call when text changes
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%", 
    marginBottom: Theme.spacing.small, 
  },
  input: {
    width: "100%",
    borderRadius: Theme.borderRadius.medium,
    padding: Theme.padding.small,
    fontSize: Theme.fontSizes.medium,
    borderWidth: 2, 
    borderColor: Theme.colors.primary,
    textAlign: "left",
    color: Theme.colors.primary,

  },
  inputLabel: {
    color: Theme.colors.primary,
    fontSize: Theme.fontSizes.small,
    marginBottom: Theme.spacing.small,
    fontWeight: "bold",
 
  },
});

export default DurationInput;
