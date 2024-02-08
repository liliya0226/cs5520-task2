import React, { useState } from "react";

import { View, StyleSheet, Button } from "react-native";

import MyDropdownPicker from "../components/MyDropdownPicker";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton from "../components/MyButton";
import DurationInput from "../components/DurationInput";
import { useNavigation } from "@react-navigation/native";
import { MyDatepicker } from "../components/MyDatepicker";
import { Alert } from "react-native";
import { useActivitiesList } from "../contexts/ActivitiesContext";

const AddActivity = () => {
  const { addActivity } = useActivitiesList();
  const navigation = useNavigation();
  const [category, setCategory] = useState(null);

  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };
  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
  };
  const handleDateChange = (newDate) => {
    setDate(newDate);

  };
  const handleCancel = () => {
    navigation.goBack();
  };

  const validateUserEntries = () => {
    let valid = true;


    // Validate category is not null or empty
    if (!category || category.trim() === "") {
      console.log("Category must be selected.");
      valid = false;
    }

    // Validate duration is a positive number and not empty
    // This regex checks if the duration is a number which may include decimals
    if (isNaN(duration) || parseFloat(duration) <= 0) {
      console.log("Duration must be a positive number.");
      valid = false;
    }

    // Validate date is not empty
    if (date.trim() === "") {
      console.log("Date must be selected.");
      valid = false;
    }
 
    return valid;
  };

  const handleSave = () => {

    if (validateUserEntries()) {
      // Make sure to call the function with ()

      addActivity({
        category,
        duration: parseInt(duration, 10), // Ensure duration is an integer
        date,
      });

      setCategory("");
      setDate("");
      setDuration("");
  
      navigation.goBack(); // If validation passes, navigate back
    } else {
      // If validation fails, show an alert using Alert.alert
      Alert.alert(
        "Invalid Input", // Title of the alert
        "Please check your input values.", // Message of the alert
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }, // Button
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dropdownContainer}>
        <MyDropdownPicker
          label="Activities*"
          onValueChange={handleCategoryChange}
        ></MyDropdownPicker>
      </View>
      <View style={styles.inputContainer}>
        <DurationInput
          label="Duration (min)*"
          value={duration}
          onValueChange={handleDurationChange}
        ></DurationInput>
      </View>
      <View style={styles.datePickerContainer}>
        <MyDatepicker
          label="Date *"
          onValueChange={handleDateChange}
        ></MyDatepicker>
      </View>
      <View style={styles.buttonsContainer}>
        <MyButton
          title="Cancel"
          onPress={handleCancel}
          initialTextColor="purple"
          pressedTextColor="white"
        ></MyButton>

        <MyButton
          title="Save"
          onPress={handleSave}
          initialTextColor="blue"
          pressedTextColor="white"
        ></MyButton>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // 确保内容垂直居中
    alignItems: "center", // 水平居中对齐子元素
    padding: 20, // 添加一些内边距
  },
  inputContainer: {
    width: "100%", // 确保宽度填满可用空间
    justifyContent: "flex-start",
    flex: 1,
  },
  dropdownContainer: {
    width: "100%", // 确保宽度填满可用空间

    justifyContent: "flex-start",
    zIndex: 3,
    flex: 2,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around", // 在按钮之间提供等间距

    zIndex: 1,
    flex: 2,
  },
  datePickerContainer: {
    width: "100%",
    zIndex: 2,
    flex: 6,
  },
});

export default AddActivity;
