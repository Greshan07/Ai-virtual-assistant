import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import UserContext from "./context/UserDataContext";

function App() {
  return (
    <UserContext>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </UserContext>
  );
}

export default App;
