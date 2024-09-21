import React, { useState, useEffect } from 'react';
import { obterRelatorios } from '../utils/api';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Relatorios() {
  const [relatorios, setRelatorios] = useState({
    faturamentoMensal: [],
    servicosPorCategoria: {},
    clientesPorMes: []
  });

  useEffect(() => {
    carregarRelatorios();
  }, []);

  const carregarRelatorios = async () => {
    try {
      const response = await obterRelatorios();
      setRelatorios(response.data);
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error);
    }
  };

  const faturamentoMensalData = {
    labels: relatorios.faturamentoMensal.map(item => item.mes),
    datasets: [
      {
        label: 'Faturamento Mensal',
        data: relatorios.faturamentoMensal.map(item => item.valor),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const servicosPorCategoriaData = {
    labels: Object.keys(relatorios.servicosPorCategoria),
    datasets: [
      {
        data: Object.values(relatorios.servicosPorCategoria),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      }
    ]
  };

  const clientesPorMesData = {
    labels: relatorios.clientesPorMes.map(item => item.mes),
    datasets: [
      {
        label: 'Novos Clientes por Mês',
        data: relatorios.clientesPorMes.map(item => item.quantidade),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      }
    ]
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Relatórios</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Faturamento Mensal</h3>
          <Line data={faturamentoMensalData} />
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Serviços por Categoria</h3>
          <Pie data={servicosPorCategoriaData} />
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Novos Clientes por Mês</h3>
          <Bar data={clientesPorMesData} />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Resumo Financeiro</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 text-left text-gray-800 dark:text-white">Métrica</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:border-gray-600">
              <td className="p-2 text-gray-800 dark:text-gray-200">Faturamento Total</td>
              <td className="p-2 text-gray-800 dark:text-gray-200">
                R$ {relatorios.faturamentoMensal.reduce((acc, item) => acc + item.valor, 0).toFixed(2)}
              </td>
            </tr>
            <tr className="border-b dark:border-gray-600">
              <td className="p-2 text-gray-800 dark:text-gray-200">Média de Faturamento Mensal</td>
              <td className="p-2 text-gray-800 dark:text-gray-200">
                R$ {(relatorios.faturamentoMensal.reduce((acc, item) => acc + item.valor, 0) / relatorios.faturamentoMensal.length).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="p-2 text-gray-800 dark:text-gray-200">Total de Novos Clientes</td>
              <td className="p-2 text-gray-800 dark:text-gray-200">
                {relatorios.clientesPorMes.reduce((acc, item) => acc + item.quantidade, 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}