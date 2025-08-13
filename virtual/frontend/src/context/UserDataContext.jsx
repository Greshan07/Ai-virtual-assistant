import React, { createContext } from "react";

export const UserDataContext = createContext({ serverUrl: "http://localhost:8000" });

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000"; // change if backend uses another port
  return (
    <UserDataContext.Provider value={{ serverUrl }}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;