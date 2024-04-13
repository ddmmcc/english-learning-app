import { useAuth } from "../context/AuthContext";
import { useDb } from "../context/userContext";
import { useData } from "../context/dataContext";
import { useEffect, useState } from "react";
import { Counter } from "../lit-components/my-counter";
import { SimpleButton } from "../lit-components/simple-button/simple-button.js";
import {ButtonClon} from "../lit-components/button-clon/button-clon.js";
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
        <simple-button>Traducciones</simple-button>
        <simple-button>Tarjetas</simple-button>
        <simple-button>Ejercicios</simple-button>
        <button-clon>Traducciones-clon</button-clon>
        <button-clon>Tarjetas-clon</button-clon>
        <button-clon>Ejercicios-clon</button-clon>
      </div>
    </div>

    
  );
}
