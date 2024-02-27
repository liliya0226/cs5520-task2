import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityBlock from "./ActivityBlock";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebases-files/firebases-setups";
import { useNavigation } from "@react-navigation/native";
const ActivitiesList = ({ isSpecial }) => {
  // Retrieve the list of all activities from the activities context
  const navigation = useNavigation();

  useEffect(() => {
    onSnapshot(collection(database, "Activity"), (querySnapshot) => {
      let newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
      setAllActivitiesList(newArray);
    });
  }, []);
  const [allActivitiesList, setAllActivitiesList] = useState([]);
  // Filter activities if it's special
  const filteredActivities = isSpecial
    ? allActivitiesList.filter((item) => item.special === true)
    : allActivitiesList;
  // Component rendering
  const handleActicityPress = (item) => {
    navigation.navigate("Edit", { data: item });
  };

  return (
    <SafeAreaView>
      <FlatList
        data={filteredActivities} // Data source for the list
        keyExtractor={(item, index) => index.toString()} // Key extractor for list items
        renderItem={({ item }) => (
          // Render each activity using the ActivityBlock component
          <ActivityBlock
            item={item}
            category={item.category} // Pass category of the activity
            duration={item.duration} // Pass duration of the activity
            date={item.date} // Pass date of the activity
            isSpecial={item.special}
            onPress={() => handleActicityPress(item)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default ActivitiesList; // Export the component
