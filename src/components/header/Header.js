import React from 'react';
import './Header.css';
import { ProfileMenu } from '../profileMenu/ProfileMenu';



export function Header({children}) {
  return (    
    <div className="header">
        <div className="header-item header-left">{children}</div>
        <div className="header-item header-center"></div>
        <div className="header-item header-right"><ProfileMenu /></div>
    </div>  
  );
}
