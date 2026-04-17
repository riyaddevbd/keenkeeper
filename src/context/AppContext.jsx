"use client";

import { createContext, useContext, useState, useEffect } from "react";
import initialFriends from "@/data/friends.json";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [friends, setFriends] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data immediately for the new project
    setFriends(initialFriends);
    setLoading(false);
  }, []);

  const addTimelineEntry = (entry) => {
    setTimeline((prev) => [entry, ...prev]);
  };

  const getInteractionsThisMonth = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return timeline.filter((entry) => {
      const entryDate = new Date(entry.timestamp);
      return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
    }).length;
  };

  return (
    <AppContext.Provider value={{ friends, timeline, loading, addTimelineEntry, getInteractionsThisMonth }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
