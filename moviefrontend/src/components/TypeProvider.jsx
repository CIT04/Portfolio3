import React, { useState } from 'react';
import TypeContext from './TypeContext';

const TypeProvider = ({ children }) => {
  const [types, setTypes] = useState(["movie", "game", "series"]);

  const setTypesList = (newTypes) => {
    setTypes(newTypes);
  };

  return (
    <TypeContext.Provider value={{ types, setTypesList }}>
      {children}
    </TypeContext.Provider>
  );
};

export default TypeProvider;
