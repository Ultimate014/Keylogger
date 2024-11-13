import React, { createContext, useContext, useState } from "react";

export const PreferenceContext = createContext();

export const PreferenceProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    theme: "light",
    indicator: "",
  });

  const updateTheme = (theme) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      theme,
    }));
  };

  const updateIndicator = (indicator) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      indicator,
    }));
  };

  const preferenceContextValue = {
    preferences,
    updateTheme,
    updateIndicator,
  };

  return (
    <PreferenceContext.Provider value={preferenceContextValue}>
      {children}
    </PreferenceContext.Provider>
  );
};

export const usePreference = () => useContext(PreferenceContext);
