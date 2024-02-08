import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ActivityBlock = ({ category, duration, date }) => {
  return (
    <View style={styles.blockContainer}>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>{category}</Text>
      </View>
      {duration > 60 ? (
      <Image style={styles.warningIcon} source={require('../assets/alert.png')} />
    ) : (
      <View style={styles.warningIcon} /> 
    )}
      <Text style={styles.dateText}>{date}</Text>
      <Text style={styles.durationText}>{duration} min</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  blockContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "start",
    backgroundColor: "darkblue", // This is a placeholder color
    padding: 10,
    borderRadius: 10,
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: "2%",
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1.4,
  },
  categoryText: {
    color: "#FFFFFF",
    // marginRight: 5, // Adjust the spacing based on your icon
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
  },
  warningIcon: {
    width: 30, // Set the size of your icon
    height: 30,
    resizeMode: "contain",
    flex: 0.7,
  },
  dateText: {
    color: "darkblue",
    backgroundColor: "#FFFFFF",
    // You might want to add a border and padding to resemble the button
    borderWidth: 1,
    borderColor: "#FFFFFF",
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginRight: "1%",
    borderRadius: 5,
    fontWeight: "bold",
    flex: 2,
    textAlign: "center",
  },
  durationText: {
    color: "darkblue",
    backgroundColor: "#FFFFFF",
    // You might want to add a border and padding to resemble the button
    borderWidth: 1,
    borderColor: "#FFFFFF",
    paddingVertical: 5,
    // paddingHorizontal: 5,
    borderRadius: 5,
    flex: 1.2,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ActivityBlock;