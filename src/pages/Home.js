import { useAuth } from "../context/AuthContext";
import { useDb } from "../context/userContext";
import { useData } from "../context/dataContext";
import { useEffect, useState } from "react";

export function Home() {
  const { logout, user } = useAuth();
  const { getUserDetail } = useDb();
  const { getDoc } = useData();

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

  const _getData = async () => {
    const result = await getDoc('series', 'DBZ_EN');
    console.log('series', result);
  };
  console.log('home');
  
  useEffect(() => {
    _getUserDetail();
    _getData();
    
  }, [])

  return (
    
    <div className="w-full max-w-xs m-auto text-black">
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
