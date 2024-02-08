import { View, Text,TextInput,StyleSheet } from 'react-native'
import React from 'react'
import * as Theme from '../src/styles'; 
const DurationInput = ({value, onValueChange,label}) => {
  const stringValue = value.toString();


  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={stringValue}
        onChangeText={ onValueChange}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer:{
      width: '100%', // 保持100%以充满父容器
      marginBottom: 20, // 减小间距以适应更紧凑的布局
  },
  input:{
      width: '100%', // 如果你希望输入框宽度充满容器，可以设置为100%
      borderRadius: 5,
      padding: 10,
      fontSize:  Theme.fontSizes.medium,
      borderWidth: 2, // 添加边框宽度以显示边框
      borderColor: Theme.colors.primary,
      textAlign: 'left',
      color:Theme.colors.primary,
      marginVertical: 5, // 垂直间距，替代单独的margin
  },
  inputLabel:{
      color: Theme.colors.primary,
      fontSize:  Theme.fontSizes.small,
      marginBottom: 10, 
      fontWeight: 'bold',
  },
});


export default DurationInput