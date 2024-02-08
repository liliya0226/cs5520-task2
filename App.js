// App.js
import React from "react";
import MyNavigation from "./navigation/MyNavigation"
import { ActivityProvider } from "./contexts/ActivitiesContext";

const App = () => {
  return (
    <ActivityProvider>
      <MyNavigation></MyNavigation>
    </ActivityProvider>
  );
};

export default App;
