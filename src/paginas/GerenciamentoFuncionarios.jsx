import React, { useState, useEffect } from 'react';
import { listarFuncionarios, criarFuncionario, atualizarFuncionario, excluirFuncionario } from '../utils/api';
import BotaoPrincipal from '../componentes/BotaoPrincipal';

export default function GerenciamentoFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [novoFuncionario, setNovoFuncionario] = useState({ nome: '', cargo: '', email: '', telefone: '' });
  const [editandoFuncionario, setEditandoFuncionario] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      const response = await listarFuncionarios();
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
      setMensagem({ tipo: 'erro', texto: 'Erro ao carregar funcionários. Tente novamente.' });
    }
  };

  const handleNovoFuncionario = async (e) => {
    e.preventDefault();
    try {
      await criarFuncionario(novoFuncionario);
      setNovoFuncionario({ nome: '', cargo: '', email: '', telefone: '' });
      carregarFuncionarios();
      setMensagem({ tipo: 'sucesso', texto: 'Funcionário adicionado com sucesso!' });
    } catch (error) {
      console.error('Erro ao criar funcionário:', error);
      setMensagem({ tipo: 'erro', texto: 'Erro ao adicionar funcionário. Tente novamente.' });
    }
  };

  const handleEditarFuncionario = (funcionario) => {
    setEditandoFuncionario(funcionario);
  };

  const handleAtualizarFuncionario = async (e) => {
    e.preventDefault();
    try {
      await atualizarFuncionario(editandoFuncionario._id, editandoFuncionario);
      setEditandoFuncionario(null);
      carregarFuncionarios();
      setMensagem({ tipo: 'sucesso', texto: 'Funcionário atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
      setMensagem({ tipo: 'erro', texto: 'Erro ao atualizar funcionário. Tente novamente.' });
    }
  };

  const handleExcluirFuncionario = async (id) => {
    try {
      await excluirFuncionario(id);
      carregarFuncionarios();
      setMensagem({ tipo: 'sucesso', texto: 'Funcionário excluído com sucesso!' });
    } catch (error) {
      console.error('Erro ao excluir funcionário:', error);
      setMensagem({ tipo: 'erro', texto: 'Erro ao excluir funcionário. Tente novamente.' });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Gerenciamento de Funcionários</h2>
      
      {mensagem && (
        <div className={`mb-4 p-2 rounded ${mensagem.tipo === 'sucesso' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {mensagem.texto}
        </div>
      )}

      <form onSubmit={handleNovoFuncionario} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={novoFuncionario.nome}
            onChange={(e) => setNovoFuncionario({...novoFuncionario, nome: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="text"
            placeholder="Cargo"
            value={novoFuncionario.cargo}
            onChange={(e) => setNovoFuncionario({...novoFuncionario, cargo: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={novoFuncionario.email}
            onChange={(e) => setNovoFuncionario({...novoFuncionario, email: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="tel"
            placeholder="Telefone"
            value={novoFuncionario.telefone}
            onChange={(e) => setNovoFuncionario({...novoFuncionario, telefone: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <BotaoPrincipal type="submit" className="mt-4">
          Adicionar Funcionário
        </BotaoPrincipal>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 text-left text-gray-800 dark:text-white">Nome</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Cargo</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Email</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Telefone</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((funcionario) => (
              <tr key={funcionario._id} className="border-b dark:border-gray-700">
                <td className="p-2 text-gray-800 dark:text-gray-200">{funcionario.nome}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{funcionario.cargo}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{funcionario.email}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{funcionario.telefone}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEditarFuncionario(funcionario)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluirFuncionario(funcionario._id)}
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

      {editandoFuncionario && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-2">Editar Funcionário</h3>
            <form onSubmit={handleAtualizarFuncionario}>
              <input
                type="text"
                value={editandoFuncionario.nome}
                onChange={(e) => setEditandoFuncionario({...editandoFuncionario, nome: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="text"
                value={editandoFuncionario.cargo}
                onChange={(e) => setEditandoFuncionario({...editandoFuncionario, cargo: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="email"
                value={editandoFuncionario.email}
                onChange={(e) => setEditandoFuncionario({...editandoFuncionario, email: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="tel"
                value={editandoFuncionario.telefone}
                onChange={(e) => setEditandoFuncionario({...editandoFuncionario, telefone: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setEditandoFuncionario(null)}
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