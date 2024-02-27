// Import necessary libraries and components
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import Checkbox from "expo-checkbox";
// Import custom components and theme
import MyDropdownPicker from "../components/MyDropdownPicker";
import MyButton from "../components/MyButton";
import DurationInput from "../components/DurationInput";
import { MyDatepicker } from "../components/MyDatepicker";
import * as Theme from "../src/styles";
import { writeToDB } from "../firebases-files/firestoreHelper.js";
import { updateToDB } from "../firebases-files/firestoreHelper.js";
import { deleteToDB } from "../firebases-files/firestoreHelper.js";
// Component to add a new activity
const AddActivity = () => {
  // Hook to navigate between screens
  const navigation = useNavigation();
  // Hook to access route parameters
  const route = useRoute();
  // Extract initial data passed through route, if any
  const initialData = route.params?.data;

  // State hooks for form inputs, initialized with initialData if available
  const [category, setCategory] = useState(initialData?.category || null);
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [isChecked, setChecked] = useState(false); // State for checkbox

  // Handlers to update state based on user input
  const handleCategoryChange = (newCategory) => setCategory(newCategory);
  const handleDurationChange = (newDuration) => setDuration(newDuration);
  const handleDateChange = (newDate) => setDate(newDate);

  // Handler to navigate back to the previous screen
  const handleCancel = () => navigation.goBack();

  // Handler for deleting an activity
  const handleDelete = (id) => {
    // Show confirmation dialog before deletion
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      { text: "No", onPress: () => {}, style: "cancel" }, // No action, just close dialog
      {
        text: "Yes",
        onPress: () => {
          deleteToDB(id); // Perform delete operation
          navigation.goBack(); // Navigate back after deletion
        },
      },
    ]);
  };

  // Effect hook to set the navigation options dynamically
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        // Render delete button in header if there's initialData
        <MyButton onPress={() => handleDelete(initialData.id)}>
          <AntDesign name="delete" size={24} color={Theme.colors.icon}/>
        </MyButton>
      ),
    });
  }, [initialData, navigation]);

  // Function to validate user inputs
  const validateUserEntries = () => {
    // Validation checks for category, duration, and date
    if (!category || category.trim() === "") {
      Alert.alert("Invalid Input", "Category must be selected.");
      return false;
    }
    if (isNaN(duration) || parseFloat(duration) <= 0) {
      Alert.alert("Invalid Input", "Duration must be a positive number.");
      return false;
    }
    if (date.trim() === "") {
      Alert.alert("Invalid Input", "Date must be selected.");
      return false;
    }
    return true; // Return true if all validations pass
  };

  // Handler for saving activity data
  const handleSave = () => {
    if (validateUserEntries()) { // Check if user entries are valid
      if (initialData) {
        // If updating existing activity, show confirmation dialog
        Alert.alert("Important", "Are you sure you want to save these changes?", [
          { text: "Cancel", style: "cancel" }, // No action, just close dialog
          {
            text: "Yes",
            onPress: () => {
              // Prepare updated activity data
              const updatedActivity = {
                category: category,
                duration: parseInt(duration, 10),
                date: date,
                special: isChecked ? false : parseInt(duration, 10) > 60,
              };
              updateToDB(initialData.id, updatedActivity); // Perform update operation
              navigation.goBack(); // Navigate back after update
            },
          },
        ]);
      } else {
        // If adding new activity, prepare new activity data
        const newActivity = {
          category: category,
          duration: parseInt(duration, 10),
          date: date,
          special: parseInt(duration, 10) > 60,
        };
        writeToDB(newActivity); // Perform add operation
        // Reset form inputs
        setCategory(""); 
        setDate("");
        setDuration("");
        navigation.goBack(); // Navigate back after adding new activity
      }
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
            initialValue={initialData ? initialData.category : null}
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
            initialValue={initialData ? initialData.date : null}
          />
        </View>
        {initialData && initialData.special && (
          <View style={styles.checkboxContainer}>
            <View style={styles.section}>
              <Text style={styles.paragraph}>
                This item is marked as special. Select the checkbox if you would
                like to approve it.
              </Text>
              <View>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={(newValue) => {
                    setChecked(newValue); // Update the checked state
                  }}
                  color={isChecked ? Theme.colors.primary : undefined}
                />
              </View>
            </View>
          </View>
        )}
        <View style={styles.buttonsContainer}>
          <MyButton
            title="Cancel"
            onPress={handleCancel}
            initialColor={Theme.colors.cancelButtonInitial}
            customStyle={styles.buttons}
          />
          <MyButton
            title="Save"
            onPress={handleSave}
            initialColor={Theme.colors.primary}
            customStyle={styles.buttons}
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
  buttons: {
    width: 150,
    height: 40,
  },
  checkboxContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: "row",
  },
  paragraph: {
    fontSize: 15,
    color: Theme.colors.primary,
    fontWeight: "bold",
  },
  checkbox: {
    marginHorizontal: 8,
  },
});

export default AddActivity; // Export the AddActivity component
