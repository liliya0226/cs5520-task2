import React from "react";
import ActivitiesList from "../components/ActivitiesList";

// AllActivities component renders an ActivitiesList component with isSpecial prop set to false
const AllActivities = () => {
  return <ActivitiesList isSpecial={false} />;
};
export default AllActivities;