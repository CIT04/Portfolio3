// Importing necessary modules and components
import React, { useState } from 'react';
import TypeContext from './TypeContext';

const TypeProvider = ({ children }) => {
  const [types, setTypes] = useState(["movie", "game", "series"]);

  const setTypesList = (newTypes) => {
    setTypes(newTypes);
  };
  // Rendering the 'TypeContext.Provider' with the 'types' state and 'setTypesList' function as the provided value
  // Wrapping the 'children' components with the 'TypeContext.Provider'
  return (
    <TypeContext.Provider value={{ types, setTypesList }}>
      {children}
    </TypeContext.Provider>
  );
};

export default TypeProvider;
