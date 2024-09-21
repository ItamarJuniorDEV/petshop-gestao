import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaw, FaCalendarAlt, FaUsers, FaChartBar } from 'react-icons/fa';

export default function Inicio() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Bem-vindo ao PetShop Gestão</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/cadastro-pet" className="bg-blue-100 dark:bg-blue-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <FaPaw className="text-4xl mb-4 text-blue-500 dark:text-blue-300" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Cadastrar Pet</h3>
          <p className="text-gray-600 dark:text-gray-300">Adicione novos pets ao sistema</p>
        </Link>

        <Link to="/agendamentos" className="bg-green-100 dark:bg-green-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <FaCalendarAlt className="text-4xl mb-4 text-green-500 dark:text-green-300" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Agendamentos</h3>
          <p className="text-gray-600 dark:text-gray-300">Gerencie os agendamentos de serviços</p>
        </Link>

        <Link to="/gerenciamento-funcionarios" className="bg-purple-100 dark:bg-purple-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <FaUsers className="text-4xl mb-4 text-purple-500 dark:text-purple-300" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Funcionários</h3>
          <p className="text-gray-600 dark:text-gray-300">Gerencie a equipe do pet shop</p>
        </Link>

        <Link to="/relatorios" className="bg-yellow-100 dark:bg-yellow-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <FaChartBar className="text-4xl mb-4 text-yellow-500 dark:text-yellow-300" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Relatórios</h3>
          <p className="text-gray-600 dark:text-gray-300">Visualize relatórios e estatísticas</p>
        </Link>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Atividades Recentes</h3>
        <ul className="space-y-2">
          <li className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
            <span className="font-medium text-gray-800 dark:text-white">João Silva</span> agendou um banho para <span className="font-medium text-gray-800 dark:text-white">Rex</span> em 15/05/2023
          </li>
          <li className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
            <span className="font-medium text-gray-800 dark:text-white">Maria Oliveira</span> cadastrou um novo pet: <span className="font-medium text-gray-800 dark:text-white">Luna</span>
          </li>
          <li className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
            <span className="font-medium text-gray-800 dark:text-white">Carlos Santos</span> realizou um pagamento de R$ 150,00
          </li>
        </ul>
      </div>
    </div>
  );
}