import { useAuth } from "../context/AuthContext";
import { useDb } from "../context/userContext";
import { useData } from "../context/dataContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Counter } from "../lit-components/my-counter";
import { SimpleButton } from "../lit-components/simple-button/simple-button.js";
import {ButtonClon} from "../lit-components/button-clon/button-clon.js";
import { StandarButton } from "../components/standar-button/standar-button.js";
import './Home.css';

export function Home() {
  const { logout, user } = useAuth();
  const { getUserDetail } = useDb();
  const { getDocByCollection, getDocsIdsByCollection } = useData();

  console.log(user);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  const [userDetail, setUserDetail] = useState({
    description: "",
    nick: "",
  });

  const _getUserDetail = async () => {
    const userDetailData = await getUserDetail();
    console.log(userDetailData);
    setUserDetail(userDetailData);
  }

  const _getDoc = async () => {
    const result = await getDocByCollection('series', 'DBZ_EN');
    console.log('doc DBZ_EN by series', result);
  };

  const _getDocIds = async () => {
    const result = await getDocsIdsByCollection('series');
    console.log('docIds by series', result);
  };


  console.log('home');
  
  useEffect(() => {
    _getUserDetail();
    _getDoc();
    _getDocIds();
  }, [])

  return (    
    <div>
      <div className="home">
        <Link to="/traducciones">
          <StandarButton>Traducciones</StandarButton>
        </Link>
        <Link to="/tarjetas">
        <StandarButton>Tarjetas</StandarButton>
        </Link>
        <Link to="/ejercicios">
          <StandarButton>Ejercicios</StandarButton>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-xl mb-4">Bienvenido {userDetail?.nick || user.displayName || user.email}</p>
        <p>Tu descripción:  {userDetail?.description}</p>
        <button
          className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>

    </div>

    
  );
}
