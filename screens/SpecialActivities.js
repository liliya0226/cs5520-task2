import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityBlock from "../components/ActivityBlock"; 
import { useActivitiesList } from "../contexts/ActivitiesContext"; 

// SpecialActivitiesList component to display activities with duration > 60
const SpecialActivitiesList = () => {
  // Destructure and retrieve the list of all activities from the custom hook
  const { allActivitiesList } = useActivitiesList();

  // Filter activities with duration greater than 60 minutes for special listing
  const specialActivities = allActivitiesList.filter(
    (item) => item.duration > 60
  );

  // Component rendering
  return (
    <SafeAreaView>
      <FlatList
        data={specialActivities} // Data source for the list
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

export default SpecialActivitiesList; // Export the component
