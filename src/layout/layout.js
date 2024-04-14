// Layout.js
import React from 'react';
import './layout.css';

export function Layout({children, title}) {
  return (
    <div className="layout">
      <div className="header">{title}</div>
      <main className="main-content">{children}</main>
    </div>
  );
}