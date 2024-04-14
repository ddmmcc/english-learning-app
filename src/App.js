import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { Layout } from "./layout/layout.js"

import { AuthProvider } from "./context/AuthContext";
import { DBProvider } from "./context/userContext";
import { DataProvider } from "./context/dataContext";
import { TraduccionesList } from "./pages/traducciones/TraduccionesList.js";
import { Capitulos } from "./pages/capitulos/capitulos.js";
import { Traduccion } from "./pages/traduccion/traduccion.js";

function App() {
  return (
    // <div className="bg-slate-300 text-black h-screen flex text-white">
    <div>
      <AuthProvider>
        <DBProvider>
          <DataProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={ <ProtectedRoute> <Layout title="home"><Home /></Layout> </ProtectedRoute> } />
              <Route path="/home" element={ <ProtectedRoute> <Layout title="home"><Home /></Layout> </ProtectedRoute> } />
              <Route path="/traducciones" element={ <ProtectedRoute> <Layout title="Traducciones"><TraduccionesList /></Layout> </ProtectedRoute> } />
              <Route path="/capitulos/:serieId" element={ <ProtectedRoute> <Layout title="Capitulos"><Capitulos /></Layout> </ProtectedRoute> } />
              <Route path="/traduccion/:capitulo" element={ <ProtectedRoute> <Layout title="Traduccion"><Traduccion /></Layout> </ProtectedRoute> } />
              <Route path="/register" element={<Register />} />
            </Routes>
          </DataProvider>            
        </DBProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
