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
// import { collection, onSnapshot } from "firebase/firestore";
// Component to add a new activity
const AddActivity = () => {
  // Hook to access the addActivity function from context

  // Hook to navigate between screens
  const navigation = useNavigation();
  const route = useRoute();
  const initialData = route.params?.data;

  // State for form inputs
  const [category, setCategory] = useState(initialData?.category || null);
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [date, setDate] = useState(initialData?.date || "");

  const [isChecked, setChecked] = useState(false);
  // Handlers for form inputs
  const handleCategoryChange = (newCategory) => setCategory(newCategory);
  const handleDurationChange = (newDuration) => setDuration(newDuration);
  const handleDateChange = (newDate) => setDate(newDate);

  // Handler to cancel and go back to the previous screen
  const handleCancel = () => navigation.goBack();
  const handleDelete = (id) => {
    // Show a confirmation dialog
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      // The "No" button
      // Does nothing but dismiss the dialog when pressed
      {
        text: "No",
        onPress: () => {},
        style: "cancel",
      },
      // The "Yes" button
      // Calls the deleteToDB function when pressed
      {
        text: "Yes",
        onPress: () => {
          deleteToDB(id);
          navigation.goBack();
        },
      },
    ]);
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <MyButton onPress={() => handleDelete(initialData.id)}>
            <AntDesign name="delete" size={24} color="white" />
          </MyButton>
        );
      },
    });
  }, [initialData, navigation]);
  // Validates form inputs
  const validateUserEntries = () => {
    if (!category || category.trim() === "") {
      // Check for non-empty category
      Alert.alert("Invalid Input", "Category must be selected.");
      return false;
    }
    if (isNaN(duration) || parseFloat(duration) <= 0) {
      // Check for valid number in duration
      Alert.alert("Invalid Input", "Duration must be a positive number.");
      return false;
    }
    if (date.trim() === "") {
      // Check for non-empty date
      Alert.alert("Invalid Input", "Date must be selected.");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validateUserEntries()) {
      if (initialData) {
        Alert.alert(
          "Important",
          "Are you sure you want to save these changes?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                const updatedActivity = {
                  category: category,
                  duration: parseInt(duration, 10),
                  date: date,
                  special: isChecked ? false : parseInt(duration, 10) > 60,
                };
                updateToDB(initialData.id, updatedActivity);
                navigation.goBack(); // Navigate back after update
              },
            },
          ]
        );
      } else {
        const newActivity = {
          category: category,
          duration: parseInt(duration, 10),
          date: date,
          special: parseInt(duration, 10) > 60,
        };
        writeToDB(newActivity);
        setCategory(""); // Reset form
        setDate("");
        setDuration("");
    
        navigation.goBack(); // Navigate back after adding new
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
    fontWeight: 'bold' ,
  },
  checkbox: {
    marginHorizontal: 8,
  },
});

export default AddActivity; // Export the AddActivity component
