import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the user
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user data from your backend or authentication service
    // This is a placeholder. Replace with your actual user-fetching logic.
    const fetchUser = async () => {
      const userData = await fakeApiCall();
      setUser(userData);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

// Fake API call for demonstration
const fakeApiCall = async () => {
  // Simulate a user data response
  return {
    name: 'John Doe',
    role: 'admin' // or 'user'
  };
};
