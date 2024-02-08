// styles.js
import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // 不要在这里设置 backgroundColor
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    // ...其他文本样式
  },
  // ...其他通用样式
});
