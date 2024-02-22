import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityBlock from "../components/ActivityBlock"; 
import { useActivitiesList } from "../contexts/ActivitiesContext"; 


const GenericActivitiesList = ({ isSpecial }) => {
  // Retrieve the list of all activities from the activities context
  const { allActivitiesList } = useActivitiesList();

  // Filter activities if it's special
  const filteredActivities = isSpecial ? allActivitiesList.filter(item => item.duration > 60) : allActivitiesList;

  // Component rendering
  return (
    <SafeAreaView>
      <FlatList
        data={filteredActivities} // Data source for the list
        keyExtractor={(item, index) => index.toString()} // Key extractor for list items
        renderItem={({ item }) => (
          // Render each activity using the ActivityBlock component
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

export default GenericActivitiesList; // Export the component
