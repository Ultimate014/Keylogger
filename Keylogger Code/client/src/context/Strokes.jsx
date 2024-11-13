// StrokeContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Create a context with an initial state and a dispatch function
const StrokeContext = createContext();

// Initial state
const initialState = [];

// Reducer function
const strokeReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_STROKE':
      // console.log("hey", action.payload, state)
      return [...state, action.payload];
    default:
      return state;
  }
};

// Context provider component
const StrokeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(strokeReducer, initialState);

  return (
    <StrokeContext.Provider value={{ state, dispatch }}>
      {children}
    </StrokeContext.Provider>
  );
};

// Custom hook to simplify accessing the context
const useStroke = () => {
  const context = useContext(StrokeContext);
  if (!context) {
    throw new Error('useStroke must be used within a StrokeProvider');
  }
  return context;
};

export { StrokeProvider, useStroke };
