import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import * as Theme from '../src/styles'; 
const MyDropdownPicker = ({ onValueChange,label}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Walking", value: "Walking" },
    { label: "Running", value: "Running" },
    { label: "Swimming", value: "Swimming" },
    { label: "Weights", value: "Weights" },
    { label: "Yoga", value: "Yoga" },
    { label: "Cycling", value: "Cycling" },
    { label: "Hiking", value: "Hiking" },
  ]);

  return (
    <>
      <View>
        <Text style={styles.header}>{label}</Text>
      </View>
      <View >
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={(newValue) => {
            setValue(newValue);
            onValueChange(newValue);
          }}
          setItems={setItems}
          style={styles.picker}
          textStyle={{
            color:Theme.colors.primary,
            fontSize: Theme.fontSizes.medium,
          }}
          placeholder="Select An Activity"

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

    width: '100%',

  
  },
  picker: {
    backgroundColor: Theme.colors.light,
    borderColor: Theme.colors.primary,
    width: '100%',
    

  },
 
  header: {
    marginBottom: "3%",
    alignItems: "flex-start",
    fontWeight: 'bold',
    borderColor: Theme.colors.primary,
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.primary,
  },
});

export default MyDropdownPicker;
