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

export const MyDatepicker = ({ label, onValueChange }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [dateText, setDateText] = useState(""); // 用于在TextInput中显示的日期文本

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDateText(formatDateToCustomString(currentDate)); // 更新TextInput显示的日期
    onValueChange(formatDateToCustomString(currentDate));

  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TouchableOpacity
          onPress={showDatepicker}
          style={styles.dateInputTouchable}
        >
          <TextInput
            style={styles.dateInput}
            value={dateText}
            editable={false} // 使TextInput不可编辑，仅用于显示
            pointerEvents="none" // 确保TouchableOpacity能接收到点击事件
          />
        </TouchableOpacity>
        <View style={styles.picker}>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={false}
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={onChange}
              style={styles.picker}
            />
          )}
        </View>
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
  },
  dateInputTouchable: {
    marginVertical: 8,

    borderColor: "darkblue",
    borderRadius: 5,
  },
  dateInput: {
    textAlign: 'left',

    width: "100%",
    borderRadius: 5,
    padding: 10,
    fontSize: 18, // 根据需要调整字体大小
    color: "darkblue",

    borderWidth: 2, // 添加边框宽度以显示边框
    borderColor: "darkblue",
  },
  inputLabel: {
    color: "darkblue",
    fontSize: 15,

    fontWeight: "bold",
  },
});

export default MyDatepicker;
