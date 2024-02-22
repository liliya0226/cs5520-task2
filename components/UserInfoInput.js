import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import * as Theme from "../src/styles";

// Define the UserInfoInput functional component with props for label, value, onChangeText, and error
export default function UserInfoInput({ label, value, onChangeText, error }) {
  return (
    // Container for the entire input, including label and error message
    <View style={styles.inputContainer}>
      {/* Display the label above the input field */}
      <Text style={styles.inputLabel}>{label}</Text>
      {/* TextInput component for user to enter data */}
      <TextInput
        style={styles.input} // Apply custom styling to the TextInput
        value={value} // Display the current value of the input
        onChangeText={onChangeText} // Callback function to call when the input text changes
      />
      {/* Conditionally render an error message if an error exists */}
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    justifyContent: "center",
  },

  input: {
    borderWidth: 2,
    borderRadius: Theme.borderRadius.medium,
    padding: Theme.padding.small,
    fontSize: Theme.fontSizes.large,
    fontWeight: "bold",
    borderColor: Theme.colors.primary,
    textAlign: "left",
    margin: Theme.spacing.superSmall,
  },

  inputLabel: {
    color: Theme.colors.primary,
    fontSize: Theme.fontSizes.medium,
    marginTop: Theme.spacing.small,
    marginBottom:Theme.spacing.small,
    fontWeight: "bold",
    marginLeft: Theme.spacing.mediumSmall,
  },

  errorMessage: {
    color: Theme.colors.errorColor,
    fontSize: Theme.fontSizes.medium,
    marginBottom: Theme.spacing.medium,
    marginLeft: Theme.spacing.mediumSmall,
  },
});
