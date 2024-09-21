import React, { useState, useEffect } from 'react';
import { listarAgendamentos, criarAgendamento, atualizarAgendamento, excluirAgendamento } from '../utils/api';
import BotaoPrincipal from '../componentes/BotaoPrincipal';

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [novoAgendamento, setNovoAgendamento] = useState({ data: '', hora: '', cliente: '', pet: '', servico: '' });
  const [editandoAgendamento, setEditandoAgendamento] = useState(null);

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const carregarAgendamentos = async () => {
    try {
      const response = await listarAgendamentos();
      setAgendamentos(response.data);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    }
  };

  const handleNovoAgendamento = async (e) => {
    e.preventDefault();
    try {
      await criarAgendamento(novoAgendamento);
      setNovoAgendamento({ data: '', hora: '', cliente: '', pet: '', servico: '' });
      carregarAgendamentos();
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
    }
  };

  const handleEditarAgendamento = (agendamento) => {
    setEditandoAgendamento(agendamento);
  };

  const handleAtualizarAgendamento = async (e) => {
    e.preventDefault();
    try {
      await atualizarAgendamento(editandoAgendamento._id, editandoAgendamento);
      setEditandoAgendamento(null);
      carregarAgendamentos();
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
    }
  };

  const handleExcluirAgendamento = async (id) => {
    try {
      await excluirAgendamento(id);
      carregarAgendamentos();
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Agendamentos</h2>
      
      <form onSubmit={handleNovoAgendamento} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            value={novoAgendamento.data}
            onChange={(e) => setNovoAgendamento({...novoAgendamento, data: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="time"
            value={novoAgendamento.hora}
            onChange={(e) => setNovoAgendamento({...novoAgendamento, hora: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="text"
            placeholder="Cliente"
            value={novoAgendamento.cliente}
            onChange={(e) => setNovoAgendamento({...novoAgendamento, cliente: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="text"
            placeholder="Pet"
            value={novoAgendamento.pet}
            onChange={(e) => setNovoAgendamento({...novoAgendamento, pet: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="text"
            placeholder="Serviço"
            value={novoAgendamento.servico}
            onChange={(e) => setNovoAgendamento({...novoAgendamento, servico: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <BotaoPrincipal type="submit" className="mt-4">
          Adicionar Agendamento
        </BotaoPrincipal>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 text-left text-gray-800 dark:text-white">Data</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Hora</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Cliente</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Pet</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Serviço</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((agendamento) => (
              <tr key={agendamento._id} className="border-b dark:border-gray-700">
                <td className="p-2 text-gray-800 dark:text-gray-200">{agendamento.data}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{agendamento.hora}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{agendamento.cliente}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{agendamento.pet}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{agendamento.servico}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEditarAgendamento(agendamento)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluirAgendamento(agendamento._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editandoAgendamento && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-2">Editar Agendamento</h3>
            <form onSubmit={handleAtualizarAgendamento}>
              <input
                type="date"
                value={editandoAgendamento.data}
                onChange={(e) => setEditandoAgendamento({...editandoAgendamento, data: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="time"
                value={editandoAgendamento.hora}
                onChange={(e) => setEditandoAgendamento({...editandoAgendamento, hora: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="text"
                value={editandoAgendamento.cliente}
                onChange={(e) => setEditandoAgendamento({...editandoAgendamento, cliente: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="text"
                value={editandoAgendamento.pet}
                onChange={(e) => setEditandoAgendamento({...editandoAgendamento, pet: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="text"
                value={editandoAgendamento.servico}
                onChange={(e) => setEditandoAgendamento({...editandoAgendamento, servico: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setEditandoAgendamento(null)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <BotaoPrincipal type="submit">
                  Salvar
                </BotaoPrincipal>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}