import React from "react";
import { FlatList } from "react-native";
import ActivityBlock from "../components/ActivityBlock";
import { useActivitiesList } from "../contexts/ActivitiesContext";
import { SafeAreaView } from "react-native-safe-area-context";

const SpecialActivitiesList = () => {
  const { allActivitiesList } = useActivitiesList();

  // Filter out the activities with duration greater than 60
  const specialActivities = allActivitiesList.filter(item => item.duration > 60);

  return (
    <SafeAreaView>
      <FlatList
        data={specialActivities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ActivityBlock
            category={item.category}
            duration={item.duration}
            date={item.date}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default SpecialActivitiesList;
