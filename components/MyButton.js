import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Theme from '../src/styles'; 

const MyButton = ({ title, onPress, initialTextColor, pressedTextColor }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.button}
    >
      <Text style={[
        styles.buttonText,
        { color: isPressed ? (pressedTextColor || 'white') : (initialTextColor || 'black') }
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: Theme.fontSizes.medium,
    textAlign: 'center',
  },
});

export default MyButton;
