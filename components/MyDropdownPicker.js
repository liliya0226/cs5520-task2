import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import * as Theme from "../src/styles";
const MyDropdownPicker = ({ onValueChange, label }) => {
  // State to control the open status of the dropdown picker
  const [open, setOpen] = useState(false);
  // State to hold the currently selected value
  const [value, setValue] = useState(null);
  // State to hold the list of items to be shown in the dropdown picker
  const [items, setItems] = useState([
    // Initial dropdown items
    { label: "Walking", value: "Walking" },
    { label: "Running", value: "Running" },
    { label: "Swimming", value: "Swimming" },
    { label: "Weights", value: "Weights" },
    { label: "Yoga", value: "Yoga" },
    { label: "Cycling", value: "Cycling" },
    { label: "Hiking", value: "Hiking" },
  ]);

  return (
    // React fragment to group multiple elements
    <>
      {/* View container for the label */}
      <View>
        {/* Text component to display the dropdown label */}
        <Text style={styles.header}>{label}</Text>
      </View>
      {/* View container for the dropdown picker */}
      <View>
        {/* DropDownPicker component */}
        <DropDownPicker
          open={open} // Prop to control the open state
          value={value} // Prop to control the selected value
          items={items} // Prop to specify the items in the dropdown
          setOpen={setOpen} // Function to update the open state
          setValue={(newValue) => {
            setValue(newValue); // Function to update the selected value
            onValueChange(newValue); // Propagate the change to the parent component
          }}
          setItems={setItems} // Function to update the items
          style={styles.picker} // Styling for the picker
          textStyle={{
            color: Theme.colors.primary, 
            fontSize: Theme.fontSizes.medium, 
          }}
          placeholder="Select An Activity" // Placeholder text when no item is selected
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  picker: {
    backgroundColor: Theme.colors.light,
    borderColor: Theme.colors.primary,
    width: "100%",
  },

  header: {
    marginBottom: Theme.spacing.extraSmall,
    alignItems: "flex-start",
    fontWeight: "bold",
    borderColor: Theme.colors.primary,
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.primary,
  },
});

export default MyDropdownPicker;
