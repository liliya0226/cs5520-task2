import React from "react";
import { FlatList } from "react-native";
import ActivityBlock from "../components/ActivityBlock";
import { useActivitiesList } from "../contexts/ActivitiesContext";
import { SafeAreaView } from "react-native-safe-area-context";

const ActivitiesList = () => {
  const { allActivitiesList } = useActivitiesList();

  return (
    <SafeAreaView>
      <FlatList
        data={allActivitiesList}
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

export default ActivitiesList;
