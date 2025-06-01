import React, { createContext, useState, useMemo } from 'react';

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: '',
    },
  });

  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
