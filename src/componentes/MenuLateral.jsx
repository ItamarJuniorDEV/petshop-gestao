// src/componentes/MenuLateral.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPaw, FaUser, FaCalendar, FaHistory, FaUsers, FaMoneyBillWave, FaChartBar, FaCog } from 'react-icons/fa';

const MenuItem = ({ to, icon, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-2.5 px-4 rounded transition duration-200 ${
          isActive
            ? 'bg-primary-700 text-white'
            : 'text-primary-100 hover:bg-primary-600 hover:text-white'
        }`
      }
    >
      {icon}
      <span className="ml-2">{children}</span>
    </NavLink>
  );
};

export default function MenuLateral() {
  return (
    <aside className="bg-primary-800 text-white w-64 min-h-screen p-4">
      <nav className="mt-8 space-y-2">
        <MenuItem to="/" icon={<FaHome />}>Início</MenuItem>
        <MenuItem to="/cadastro-pet" icon={<FaPaw />}>Cadastro de Pet</MenuItem>
        <MenuItem to="/cadastro-cliente" icon={<FaUser />}>Cadastro de Cliente</MenuItem>
        <MenuItem to="/agendamentos" icon={<FaCalendar />}>Agendamentos</MenuItem>
        <MenuItem to="/historico-servicos" icon={<FaHistory />}>Histórico de Serviços</MenuItem>
        <MenuItem to="/gerenciamento-funcionarios" icon={<FaUsers />}>Funcionários</MenuItem>
        <MenuItem to="/pagamentos" icon={<FaMoneyBillWave />}>Pagamentos</MenuItem>
        <MenuItem to="/relatorios" icon={<FaChartBar />}>Relatórios</MenuItem>
        <MenuItem to="/painel-controle" icon={<FaCog />}>Painel de Controle</MenuItem>
      </nav>
    </aside>
  );
}