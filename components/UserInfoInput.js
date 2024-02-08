import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import * as Theme from '../src/styles'; 

export default function UserInfoInput({ label, value, onChangeText, error }) {
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
    fontSize: Theme.fontSizes.large,
    fontWeight: 'bold',
    borderColor: Theme.colors.primary,
    textAlign: "center",
    margin: 5,
  },

  inputLabel: {
    color: Theme.colors.primary,
    fontSize: Theme.fontSizes.medium,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  errorMessage: {
    color: "dimgrey",
    fontSize: Theme.fontSizes.medium,
  },
});
