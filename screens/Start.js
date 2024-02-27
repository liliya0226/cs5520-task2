import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInfoInput from '../components/UserInfoInput';
import MyButton from '../components/MyButton';
import * as Theme from '../src/styles';

// Start component definition, receiving navigation props for navigation between screens
const Start = ({ navigation }) => {
  // State hooks for managing email and phone number inputs
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  // State hooks for managing input validation errors for email and phone number
  const [emailError, setEmailError] = useState('');
  const [numberError, setNumberError] = useState('');

  // Function to validate user inputs for email and phone number
  const validateInput = () => {
    let valid = true; // Flag to track overall validity of the form
    // Reset error messages at the beginning of validation
    setEmailError('');
    setNumberError('');

    // Regular expressions for validating email and phone number formats
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneNumberRegex = /^\d{10}$/;

    // Email validation
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      valid = false; // Set valid to false if email does not match the regex
    }

    // Phone number validation
    if (!phoneNumberRegex.test(number)) {
      setNumberError('Please enter a valid phone number');
      valid = false; // Set valid to false if phone number does not match the regex
    }

    return valid; // Return the overall validity of the form
  };

  // Function to reset all input fields and error messages
  const handleReset = () => {
    setEmail('');
    setNumber('');
    setEmailError('');
    setNumberError('');
  };

  // Function to handle the start action after validation
  const handleStart = () => {
    if (validateInput()) { // Validate inputs before proceeding
      navigation.navigate('MyTabs'); // Navigate to the 'MyTabs' screen if inputs are valid
    }
  };

  // Conditional rendering logic to disable the Start button if both email and phone number are empty
  const isButtonDisabled = email === '' && number === '';

  // Component UI
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          {/* Email input field */}
          <UserInfoInput
            label='Email Address'
            value={email}
            onChangeText={setEmail} // Update email state on text change
            error={emailError} // Display email validation error if any
          />
          {/* Phone number input field */}
          <UserInfoInput
            label='Phone Number'
            value={number}
            onChangeText={setNumber} // Update number state on text change
            error={numberError} // Display phone number validation error if any
          />
        </View>
        <View style={styles.buttonsContainer}>
          {/* Reset button */}
          <MyButton
            title='Reset'
            onPress={handleReset} // Call handleReset function on press
            customStyle={styles.buttons}
            initialColor={Theme.colors.cancelButtonInitial}
          />
          {/* Start button */}
          <MyButton
            title='Start'
            onPress={handleStart} // Call handleStart function on press
            customStyle={styles.buttons}
            initialColor={Theme.colors.primary}
            disabled={isButtonDisabled} // Disable button based on isButtonDisabled flag
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: Theme.spacing.medium,
    flex: 1,
  },
  buttons:{
    width: 160, 
    height: 40, 
  },
});

export default Start;
