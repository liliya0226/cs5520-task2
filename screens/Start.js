import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInfoInput from '../components/UserInfoInput';
import MyButton from '../components/MyButton';
import * as Theme from '../src/styles';

const Start = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [numberError, setNumberError] = useState('');

  const validateInput = () => {
    let valid = true;
    setEmailError('');
    setNumberError('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneNumberRegex = /^\d{10}$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    }
    if (!phoneNumberRegex.test(number)) {
      setNumberError('Please enter a valid phone number');
      valid = false;
    }
    return valid;
  };

  const handleReset = () => {
    setEmail('');
    setNumber('');
    setEmailError('');
    setNumberError('');
  };

  const handleStart = () => {
    if (validateInput()) {
      navigation.navigate('MyTabs');
    }
  };

  const isButtonDisabled = email === '' && number === '';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <UserInfoInput
            label='Email Address'
            value={email}
            onChangeText={setEmail}
            error={emailError}
          />
          <UserInfoInput
            label='Phone Number'
            value={number}
            onChangeText={setNumber}
            error={numberError}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <MyButton
            title='Reset'
            onPress={handleReset}
            customStyle={styles.buttons}
            initialColor={Theme.colors.cancelButtonInitial}
          />
          <MyButton
            title='Start'
            onPress={handleStart}
            customStyle={styles.buttons}
            initialColor={Theme.colors.primary}
            disabled={isButtonDisabled}
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
