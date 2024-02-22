// contexts/ActivityContext.js
import React, { createContext, useState, useContext,useMemo } from 'react';

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
    const [allActivitiesList, setAllActivitiesList] = useState([]);


    const addActivity = (activity) => {
        setAllActivitiesList([...allActivitiesList, activity]);
    };

    const specialActivitiesList = useMemo(() => {
        return allActivitiesList.filter(activity => activity.duration > 60);
    }, [allActivitiesList]);
    return (
        <ActivityContext.Provider value={{ allActivitiesList, addActivity, specialActivitiesList }}>
            {children}
        </ActivityContext.Provider>
    );
};

export const useActivitiesList = () => {
    return useContext(ActivityContext);
};
