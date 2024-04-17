import { useAuth } from "../../context/AuthContext.js";
import { useDb } from "../../context/userContext.js";
import { useData } from "../../context/dataContext.js";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StandarButton } from "../../components/standar-button/standar-button.js";
import './capitulos.css';

export function Capitulos() {
  const { logout, user } = useAuth();
  const { getUserDetail } = useDb();
  const { getDocByCollection, getDocsIdsByCollection } = useData();
  const [capitulos, setCapitulos] =  useState([]);
  let { serieId } = useParams();

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

  // const _getDoc = async () => {
  //   const result = await getDocByCollection('series', serieId);
  //   console.log('doc DBZ_EN by series', result);
  // };

  const _getDocIds = async () => {
    const result = await getDocsIdsByCollection('subtitles');
    setCapitulos(result);
    console.log('docIds by series', result);
  };
  
  useEffect(() => {
    _getUserDetail();
    // _getDoc();
    _getDocIds();
  }, [])

  return (    
    <div>
        <h2>Capitulos</h2>
        {
          capitulos
          .sort((a, b) => {
            const aNum = Number(a.replace(/[^0-9.]+/g, ' '))
            const bNum = Number(b.replace(/[^0-9.]+/g, ' '))
            return aNum - bNum;
          })
          .map(item => {
            return <Link to={'/traduccion/' + item}>
              <StandarButton>{item}</StandarButton>
            </Link>
          })
        }
    </div>  
  );
}
