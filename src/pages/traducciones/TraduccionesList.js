import { useAuth } from "../../context/AuthContext.js";
import { useDb } from "../../context/userContext.js";
import { useData } from "../../context/dataContext.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StandarButton } from "../../components/standar-button/standar-button.js";
import './TraduccionesList.css';

export function TraduccionesList() {
  const { logout, user } = useAuth();
  const { getUserDetail } = useDb();
  const { getDocByCollection, getDocsIdsByCollection } = useData();
  const [series, setSeries] =  useState([]);

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
    const result = await getDocByCollection('series', 'DBZ_EN');
    console.log('doc DBZ_EN by series', result);
  };

  const _getDocIds = async () => {
    const result = await getDocsIdsByCollection('series');
    setSeries(result);
    console.log('docIds by series', result);
  };
  
  useEffect(() => {
    _getUserDetail();
    _getDoc();
    _getDocIds();
  }, [])

  return (    
    <div>
        <h2>Series</h2>
        {series.map(item => {
            return <Link to={'/capitulos/' + item}>
              <StandarButton>{item}</StandarButton>
            </Link>
        })}
    </div>  
  );
}
