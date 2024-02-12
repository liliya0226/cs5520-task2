// App.js

import React from "react";
import MyNavigation from "./navigation/MyNavigation"; // Handles app navigation.
import { ActivityProvider } from "./contexts/ActivitiesContext"; // Provides activities context.

// App component with context provider and navigation.
const App = () => {
  return (
    <ActivityProvider>
      <MyNavigation />
    </ActivityProvider>
  );
};

export default App; // Export App component.
