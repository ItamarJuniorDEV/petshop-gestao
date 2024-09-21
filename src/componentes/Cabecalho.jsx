import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContext';
import { useTheme } from '../contextos/ThemeContext';
import { FaSun, FaMoon, FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function Cabecalho() {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          PetShop Gestão
        </Link>
        <nav className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          {user && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 dark:text-gray-300">
                <FaUser className="inline mr-1" />
                {user.nome}
              </span>
              <button
                onClick={logout}
                className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
              >
                <FaSignOutAlt />
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}