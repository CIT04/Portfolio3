// Importing necessary modules and components
import React, { useState } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  // Using the 'useState' hook to manage the 'userToken' state
  const [userToken, setUserToken] = useState(null);

  const setToken = (token) => {
    setUserToken(token);
  };
// Providing the 'UserContext' with the 'userToken' state and 'setToken' function as context values
  return (
    <UserContext.Provider value={{ userToken, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;