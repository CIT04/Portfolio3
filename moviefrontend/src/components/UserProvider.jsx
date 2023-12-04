import React, { useState } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  const setToken = (token) => {
    setUserToken(token);
  };

  return (
    <UserContext.Provider value={{ userToken, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;