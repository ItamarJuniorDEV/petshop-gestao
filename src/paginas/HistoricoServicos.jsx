import React, { useState, useEffect } from 'react';
import { listarServicos } from '../utils/api';

export default function HistoricoServicos() {
  const [servicos, setServicos] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    carregarServicos();
  }, []);

  const carregarServicos = async () => {
    try {
      const response = await listarServicos();
      setServicos(response.data);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
    }
  };

  const servicosFiltrados = servicos.filter(servico =>
    servico.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
    servico.pet.toLowerCase().includes(filtro.toLowerCase()) ||
    servico.servico.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Histórico de Serviços</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrar por cliente, pet ou serviço"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 text-left text-gray-800 dark:text-white">Data</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Cliente</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Pet</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Serviço</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Valor</th>
            </tr>
          </thead>
          <tbody>
            {servicosFiltrados.map((servico) => (
              <tr key={servico._id} className="border-b dark:border-gray-700">
                <td className="p-2 text-gray-800 dark:text-gray-200">{new Date(servico.data).toLocaleDateString()}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{servico.cliente}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{servico.pet}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{servico.servico}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">R$ {servico.valor.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {servicosFiltrados.length === 0 && (
        <p className="text-center mt-4 text-gray-600 dark:text-gray-400">Nenhum serviço encontrado.</p>
      )}
    </div>
  );
}