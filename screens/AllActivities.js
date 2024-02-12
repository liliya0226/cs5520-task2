import React from "react";
import { FlatList } from "react-native"; // For rendering a list of items
import { SafeAreaView } from "react-native-safe-area-context"; // For safe area rendering
import ActivityBlock from "../components/ActivityBlock"; // Custom component to display each activity
import { useActivitiesList } from "../contexts/ActivitiesContext"; // Custom hook to access activities context

// Component to display a list of all activities
const ActivitiesList = () => {
  // Retrieve the list of all activities from the activities context
  const { allActivitiesList } = useActivitiesList();

  // Component rendering
  return (
    <SafeAreaView>
      <FlatList
        data={allActivitiesList} // Data source for the list is all activities
        keyExtractor={(item, index) => index.toString()} // Key extractor for list items, using index
        renderItem={({ item }) => (
          // Render each item using the ActivityBlock component
          <ActivityBlock
            category={item.category} // Pass category of the activity
            duration={item.duration} // Pass duration of the activity
            date={item.date} // Pass date of the activity
          />
        )}
      />
    </SafeAreaView>
  );
};

export default ActivitiesList; // Export the component for use in other parts of the app
