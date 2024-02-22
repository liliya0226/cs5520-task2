// Importing necessary components and hooks from React and React Native
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Custom components and theme styles
import UserInfoInput from "../components/UserInfoInput";
import MyButton from "../components/MyButton";
import * as Theme from "../src/styles";

// Start component with navigation prop
const Start = ({ navigation }) => {
  // State hooks for managing user input and validation errors
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");

  // Validates email and phone number inputs against regex patterns
  const validateInput = () => {
    let valid = true; // Flag to indicate overall validity
    // Reset error messages
    setEmailError("");
    setNumberError("");
    // Regex patterns for validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneNumberRegex = /^\d{10}$/;
    // Validate email
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    }
    // Validate phone number
    if (!phoneNumberRegex.test(number)) {
      setNumberError("Please enter a valid phone number");
      valid = false;
    }
    return valid; // Return overall validity
  };

  // Resets all inputs and errors
  const handleReset = () => {
    setEmail("");
    setNumber("");
    setEmailError("");
    setNumberError("");
  };

  // Handles the start action, navigates if inputs are valid
  const handleStart = () => {
    if (validateInput()) {
      navigation.navigate("MyTabs");
    }
  };

  // Main component UI
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          {/* User input for email and phone number */}
          <UserInfoInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            error={emailError}
          />
          <UserInfoInput
            label="Phone Number"
            value={number}
            onChangeText={setNumber}
            error={numberError}
          />
        </View>
        <View style={styles.buttonsContainer}>
          {/* Reset and Start buttons */}
          <MyButton
            title="Reset"
            onPress={handleReset}
            initialTextColor={Theme.colors.cancelButtonInitial}
            pressedTextColor={Theme.colors.cancelButtonPressed}
          />
          <MyButton
            title="Start"
            onPress={handleStart}
            initialTextColor={Theme.colors.saveButtonInitial}
            pressedTextColor={Theme.colors.saveButtonPressed}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

// StyleSheet for component styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flex: 2,
    width: "100%",
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: Theme.spacing.medium,
    flex: 1,
  },
});

export default Start; 
