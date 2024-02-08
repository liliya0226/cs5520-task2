import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import MyButton from "../components/MyButton";

const Start = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");

  const validateInput = () => {
    let vaild = true;
    setEmailError("");
    setNumberError("");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneNumberRegex = /^\d{10}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      vaild = false;
    }
    if (!phoneNumberRegex.test(number)) {
      setNumberError("Please enter a valid phone number");
      vaild = false;
    }
    return vaild;
  };
  const handleReset = () => {
    setEmail("");
    setEmailError("");
    setNumber("");
    setNumberError("");
  };
  const handleStart = () => {
    if (validateInput()) {
      navigation.navigate("MyTabs");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View >
        <Input
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          error={emailError}
        ></Input>
        <Input
          label="Phone Number"
          value={number}
          onChangeText={setNumber}
          error={numberError}
        ></Input>
      </View>
      <View style={styles.buttonsContainer}>
        <MyButton
          title="Reset"
          onPress={handleReset}
          initialTextColor="purple"
          pressedTextColor="white"
        ></MyButton>

        <MyButton
          title="Start"
          onPress={handleStart}
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "purple",
    fontSize: 24,
    marginBottom: "10%",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: "10%",
    bottom:"10%",
  },
});
export default Start;
