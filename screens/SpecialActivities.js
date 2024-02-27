import React from "react";
import ActivitiesList from "../components/ActivitiesList";

// SpecialActivities component renders an ActivitiesList component with isSpecial prop set to true
const SpecialActivities = () => {
  return <ActivitiesList isSpecial={true} />;
};

export default SpecialActivities;
