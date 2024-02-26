// import React, { useState } from "react";
// import { TouchableOpacity, Text, StyleSheet } from "react-native";
// import * as Theme from "../src/styles";

// // Custom button component that changes text color based on press state
// const MyButton = ({ title, onPress, initialTextColor, pressedTextColor }) => {
//   // State to track if the button is pressed
//   const [isPressed, setIsPressed] = useState(false);

//   // Function to handle the press in action
//   const handlePressIn = () => {
//     setIsPressed(true); // Set isPressed to true when the button is pressed
//   };

//   // Function to handle the press out action
//   const handlePressOut = () => {
//     setIsPressed(false); // Reset isPressed to false when the button is released
//   };

//   // Render the button
//   return (
//     // TouchableOpacity for the button to allow for press events
//     <TouchableOpacity
//       onPress={onPress} // Propagate the onPress event to the parent component
//       onPressIn={handlePressIn} // Handle the press in action
//       onPressOut={handlePressOut} // Handle the press out action
//       style={styles.button} // Apply styles to the button
//     >
//       {/* Text inside the button */}
//       <Text
//         style={[
//           styles.buttonText,
//           {
//             color: isPressed
//               ? pressedTextColor // Use pressed text color when the button is pressed
//               : initialTextColor, // Use initial text color otherwise
//           },
//         ]}
//       >
//         {title}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: Theme.colors.transparentBackground,
//     padding: Theme.padding.small,
//     borderRadius: Theme.borderRadius.medium,
//   },
//   buttonText: {
//     fontSize: Theme.fontSizes.medium,
//     textAlign: "center",
//   },
// });

// export default MyButton;
import React from "react";
import { Text, Pressable, Platform, StyleSheet } from "react-native";

const MyButton = ({
  title,
  onPress,
  customStyle,
  initialColor,
  disabled,
  children,
}) => {
  return (

      <Pressable
        onPress={onPress}
        android_ripple={disabled ? undefined : { color: "lightgrey" }} // 当按钮不禁用时才应用Android涟漪效果
        style={({ pressed }) => [
          styles.defaultStyle,
          customStyle,
          disabled
            ? { backgroundColor: "lightgrey" }
            : { backgroundColor: initialColor },
          pressed && styles.pressed,
          {
            opacity: pressed && !disabled && Platform.OS === "ios" ? 0.7 : 1,
          },
        ]}
        disabled={disabled} // 使用disabled属性禁用Pressable的点击事件
      >
        {title &&
          !children && ( // 如果有title且没有children，就显示title
            <Text style={styles.text}>{title}</Text>
          )}
        {children}
      </Pressable>
   
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    width: 40, // 按钮宽度
    height: 40, // 按钮高度
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: "5%",
    backgroundColor: "transparent",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#FFFFFF", // 文本颜色默认为白色
  },
});

export default MyButton;
