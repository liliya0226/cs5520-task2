import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

export default function Input({ label, value, onChangeText, error }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex:1,
    width: "100%",
    marginBottom: 50,
    justifyContent: "flex-start",
  },

  input: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    fontSize: 24,
    fontWeight: 'bold',
    borderColor: "darkblue",
    textAlign: "center",
    margin: 5,
  },

  inputLabel: {
    color: "darkblue",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  errorMessage: {
    color: "dimgrey",
    fontSize: 18,
  },
});
