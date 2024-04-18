// Layout.js
import React from 'react';
import { Header } from '../components/header/Header';
import './layout.css';

export function Layout({children, title}) {
  return (
    <div className="layout">
      <Header>{title}</Header>
      <main className="main-content">{children}</main>
    </div>
  );
}