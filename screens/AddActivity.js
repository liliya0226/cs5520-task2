// Import necessary libraries and components
import React, { useState } from "react";
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useActivitiesList } from "../contexts/ActivitiesContext";

// Import custom components and theme
import MyDropdownPicker from "../components/MyDropdownPicker";
import MyButton from "../components/MyButton";
import DurationInput from "../components/DurationInput";
import { MyDatepicker } from "../components/MyDatepicker";
import * as Theme from "../src/styles";

// Component to add a new activity
const AddActivity = () => {
  // Hook to access the addActivity function from context
  const { addActivity } = useActivitiesList();
  // Hook to navigate between screens
  const navigation = useNavigation();

  // State for form inputs
  const [category, setCategory] = useState(null);
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");

  // Handlers for form inputs
  const handleCategoryChange = (newCategory) => setCategory(newCategory);
  const handleDurationChange = (newDuration) => setDuration(newDuration);
  const handleDateChange = (newDate) => setDate(newDate);

  // Handler to cancel and go back to the previous screen
  const handleCancel = () => navigation.goBack();

  // Validates form inputs
  const validateUserEntries = () => {
    if (!category || category.trim() === "") {// Check for non-empty category
      Alert.alert("Invalid Input", "Category must be selected.");
      return false;
    }
    if (isNaN(duration) || parseFloat(duration) <= 0) {// Check for valid number in duration
      Alert.alert("Invalid Input", "Duration must be a positive number.");
      return false;
    }
    if (date.trim() === "") {// Check for non-empty date
      Alert.alert("Invalid Input", "Date must be selected.");
      return false;
    }
    return true;
  };

  // Handler to save the activity
  const handleSave = () => {
    if (validateUserEntries()) {
      addActivity({ category, duration: parseInt(duration, 10), date });
      setCategory(""); // Reset form
      setDate("");
      setDuration("");
      navigation.goBack(); // Navigate back
    }
  };

  // Component UI
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.dropdownContainer}>
          <MyDropdownPicker
            label="Activities *"
            onValueChange={handleCategoryChange}
          />
        </View>
        <View style={styles.inputContainer}>
          <DurationInput
            label="Duration (min)*"
            value={duration}
            onChangeText={handleDurationChange}
          />
        </View>
        <View style={styles.datePickerContainer}>
          <MyDatepicker
            label="Date *"
            onValueChange={handleDateChange}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <MyButton
            title="Cancel"
            onPress={handleCancel}
            initialTextColor={Theme.colors.cancelButtonInitial}
            pressedTextColor={Theme.colors.cancelButtonPressed}
          />
          <MyButton
            title="Save"
            onPress={handleSave}
            initialTextColor={Theme.colors.saveButtonInitial}
            pressedTextColor={Theme.colors.saveButtonPressed}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

// StyleSheet for styling the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: Theme.padding.large,
    paddingRight: Theme.padding.large,
  },
  inputContainer: {
    width: "100%",
    justifyContent: "flex-start",
    flex: 1.2,
    paddingTop: Theme.padding.extraLarge,
  },
  dropdownContainer: {
    width: "100%",
    justifyContent: "flex-start",
    zIndex: 3,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    flex: 1.2,
    zIndex: 1,
  },
  datePickerContainer: {
    width: "100%",
    zIndex: 2,
    flex: 5,
  
  },
});

export default AddActivity; // Export the AddActivity component
