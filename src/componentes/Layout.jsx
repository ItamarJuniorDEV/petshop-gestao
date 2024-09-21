// src/componentes/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Cabecalho from './Cabecalho';
import MenuLateral from './MenuLateral';
import Rodape from './Rodape';
import { useTheme } from '../contextos/ThemeContext';

function Layout() {
  const { darkMode } = useTheme();

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      <MenuLateral />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Cabecalho />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800 p-6">
          <Outlet />
        </main>
        <Rodape />
      </div>
    </div>
  );
}

export default Layout;