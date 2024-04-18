import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/Login.js";
import { Register } from "./pages/register/Register.js";
import { Home } from "./pages/Home";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { Layout } from "./layout/layout.js"

import { AuthProvider } from "./context/AuthContext";
import { DBProvider } from "./context/userContext";
import { DataProvider } from "./context/dataContext";
import { TraduccionesList } from "./pages/traducciones/TraduccionesList.js";
import { Capitulos } from "./pages/capitulos/capitulos.js";
import { Traduccion } from "./pages/traduccion/traduccion.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
