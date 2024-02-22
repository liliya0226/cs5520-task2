import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as Theme from "../src/styles";

// Component to display information about an activity
const ActivityBlock = ({ category, duration, date }) => {
  return (
    // Container for the activity block
    <View style={styles.blockContainer}>
      {/* Container for the category */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>{category}</Text>
      </View>
      {/* Conditionally display a warning icon for activities longer than 60 minutes */}
      {duration > 60 ? (
        <Image
          style={styles.warningIcon}
          source={require("../assets/alert.png")} // Warning icon image
        />
      ) : (
        // Placeholder for layout consistency when no warning is necessary
        <View style={styles.warningIcon} />
      )}
      {/* Display the date of the activity */}
      <Text style={styles.dateText}>{date}</Text>
      {/* Display the duration of the activity */}
      <Text style={styles.durationText}>{duration} min</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  blockContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "start",
    backgroundColor: Theme.colors.primary,
    padding: Theme.padding.small,
    borderRadius: Theme.borderRadius.large,
    marginTop: Theme.spacing.extraSmall,
    marginLeft: Theme.spacing.extraSmall,
    marginRight: Theme.spacing.extraSmall,
    marginBottom: Theme.spacing.extraSmall,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
 
    flex: 1.4,
  },
  categoryText: {
    color: Theme.colors.secondary,
    flex: 1,
    fontWeight: "bold",
    fontSize: Theme.fontSizes.small,
    padding: Theme.padding.extraSmall,

  },
  warningIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    flex: 0.7,
  },
  dateText: {
    color: Theme.colors.primary,
    backgroundColor: Theme.colors.secondary,
    borderWidth: 1,
    borderColor: Theme.colors.secondary,
    paddingVertical: Theme.padding.extraSmall,
    paddingHorizontal: Theme.padding.extraSmall,
    marginRight: Theme.spacing.superSmall,
    borderRadius: Theme.borderRadius.medium,
    fontWeight: "bold",
    flex: 2,
    textAlign: "center",
  },
  durationText: {
    color: Theme.colors.primary,
    backgroundColor: Theme.colors.secondary,
    borderWidth: 1,
    borderColor: Theme.colors.secondary,
    paddingVertical: Theme.padding.extraSmall,
    borderRadius: Theme.borderRadius.medium,
    flex: 1.2,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ActivityBlock;
