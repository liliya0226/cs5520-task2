import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Theme from "../src/styles";

const formatDateToCustomString = (dateString) => {
  // Define the options for date formatting
  const options = {
    weekday: "short", // Abbreviated weekday name
    year: "numeric", // Numeric year
    month: "short", // Abbreviated month name
    day: "numeric", // Day of the month
  };

  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Convert the date to a string using the specified locale and formatting options
  // This step is primarily to demonstrate the usage of toLocaleDateString with options
  const formattedDate = date.toLocaleDateString("en-US", options);

  // Customize the output format since toLocaleDateString might not match the "Day Mon Date Year" format exactly.
  const day = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const dayNum = date.getDate();
  const year = date.getFullYear();

  // Combine the parts to match the "Day Mon Date Year" format
  return `${day} ${month} ${dayNum} ${year}`;
};

// Datepicker component that allows a user to pick a date
export const MyDatepicker = ({ label, onValueChange }) => {
  const [date, setDate] = useState(new Date(1598051730000)); // State for the selected date
  const [show, setShow] = useState(false); // State to show/hide the date picker
  const [dateText, setDateText] = useState(""); // State to hold the formatted date string

  // Handler for date change
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; // Use selected date or current date
    setShow(false); // Hide the picker once a date is selected
    setDate(currentDate); // Update the state with the new date
    const formattedString = formatDateToCustomString(currentDate); // Format the date to string
    setDateText(formattedString); // Update the text to display the formatted date
    onValueChange(formattedString); // Propagate the change up with the formatted date string
  };

  // Function to display the date picker
  const showDatepicker = () => {
    setShow(true);
  };

  // Component layout
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.inputLabel}>{label}</Text> 
      
        <TouchableOpacity onPress={showDatepicker} style={styles.dateInputTouchable}>
          <TextInput
            style={styles.dateInput} // Input style
            value={dateText} // Display the formatted date
            editable={false} // Make the input non-editable
            pointerEvents="none" // Disable pointer events
          />
        </TouchableOpacity>
        {/* Conditionally render the DateTimePicker */}
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date} // Current date value
            mode="date" // Picker mode
            is24Hour={true} // 24 hours format
            display={Platform.OS === "ios" ? "inline" : "default"} // Display mode
            onChange={onChange} // Change handler
            style={styles.picker}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  wrapper: {
    width: "100%",
  },
  picker: {
    zIndex: 2,
    backgroundColor: Theme.colors.light,
  },
  dateInputTouchable: {
    marginVertical: Theme.spacing.small,
    borderColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.medium,
  },
  dateInput: {
    textAlign: "left",
    width: "100%",
    borderRadius: Theme.borderRadius.medium,
    padding: Theme.padding.small,
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.primary,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },
  inputLabel: {
    color: Theme.colors.primary,
    fontSize: Theme.fontSizes.small,
    fontWeight: "bold",
  },
});

export default MyDatepicker;
