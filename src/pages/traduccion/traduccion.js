import { useAuth } from "../../context/AuthContext.js";
import { useDb } from "../../context/userContext.js";
import { useData } from "../../context/dataContext.js";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StandarButton } from "../../components/standar-button/standar-button.js";
import './traduccion.css';

export function Traduccion() {
  const { logout, user } = useAuth();
  const { getUserDetail } = useDb();
  const { getDocByCollection, getDocsIdsByCollection } = useData();
  const [traduccion, setTraduccion] =  useState([]);
  let { capitulo } = useParams();

  console.log('user', user);
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
    console.log('userDetailData', userDetailData);
    setUserDetail(userDetailData);
  }

  const _getDoc = async () => {
    debugger;
    const result = await getDocByCollection('subtitles', capitulo);
    const EN = JSON.parse(result.EN)
    const ES = JSON.parse(result.ES);
    setTraduccion({EN, ES})
    
    console.log('doc DBZ_EN by series', result);
  };

  // const _getDocIds = async () => {
  //   const result = await getDocsIdsByCollection('subtitles');
  //   console.log('docIds by series', result);
  // };
  
  useEffect(() => {
    _getUserDetail();
    _getDoc();
    // _getDocIds();
  }, [])

  return (    
    <div className="traduccion">
        <h2>Subtitulos capitulo {capitulo}</h2>
        {
          (traduccion?.EN || []).map((item, i) => {
              return <div className="traduccion-row">
                  <div className='en'>{item}</div>
                  <div className='es'>{traduccion.ES[i]}</div>
                </div>
            })
        }
    </div>  
  );
}
