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

  return (
    <AppContext.Provider value={{ friends, timeline, loading, addTimelineEntry }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
