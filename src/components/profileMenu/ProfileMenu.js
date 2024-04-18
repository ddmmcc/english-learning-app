import { useState } from 'react';
import './ProfileMenu.css';
import { useAuth } from "../../context/AuthContext";
import { useDb } from "../../context/userContext";


export function ProfileMenu() {
  const { logout, user } = useAuth();
  const { getUserDetail } = useDb();
  const [menuVisible, setMenuVisible] = useState(false);
  const [userDetail, setUserDetail] = useState({
    description: "",
    nick: "",
  });

  const handleLogout = async () => {
    try {
        await logout();
    } catch (error) {
        console.error(error.message);
    }
  };

  const handleMenuVisible = () => {
    const currentStatus = menuVisible;
    setMenuVisible(!currentStatus);
  }


  return (    
    <div className="profile-menu">
        <div className="profile-icon" onClick={handleMenuVisible}>
          <img src="/media/default-user.png" />
        </div>
        <div className={"profile-modal-menu " + (menuVisible ? 'visible': '')}>
          <p className="text-xl mb-4">Bienvenido {userDetail?.nick || user.displayName || user.email}</p>
          {/* <p>Tu descripción:  {userDetail?.description}</p> */}
          <ul className="menu-elements">
            <li class="menu-element disabled">Perfil</li>
            <li class="menu-element" onClick={handleLogout}>Logout</li>
          </ul>
        </div>
    </div>  
  );
}
