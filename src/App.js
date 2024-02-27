import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { ProtectedRoute } from "./pages/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import { DBProvider } from "./context/userContext";

function App() {
  return (
    <div className="bg-slate-300 text-black h-screen flex text-white">
      <AuthProvider>
        <DBProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={ <ProtectedRoute> <Home /> </ProtectedRoute> } />
            <Route path="/register" element={<Register />} />
          </Routes>
        </DBProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
