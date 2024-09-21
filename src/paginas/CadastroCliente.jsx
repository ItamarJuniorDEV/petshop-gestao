import React, { useState, useEffect } from 'react';
import { listarClientes, criarCliente, atualizarCliente, excluirCliente } from '../utils/api';
import BotaoPrincipal from '../componentes/BotaoPrincipal';

export default function CadastroCliente() {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ nome: '', email: '', telefone: '', endereco: '' });
  const [editandoCliente, setEditandoCliente] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      const response = await listarClientes();
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      setMensagem({ tipo: 'erro', texto: 'Erro ao carregar clientes. Tente novamente.' });
    }
  };

  const handleNovoCliente = async (e) => {
    e.preventDefault();
    try {
      await criarCliente(novoCliente);
      setNovoCliente({ nome: '', email: '', telefone: '', endereco: '' });
      carregarClientes();
      setMensagem({ tipo: 'sucesso', texto: 'Cliente adicionado com sucesso!' });
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      setMensagem({ tipo: 'erro', texto: 'Erro ao adicionar cliente. Tente novamente.' });
    }
  };

  const handleEditarCliente = (cliente) => {
    setEditandoCliente(cliente);
  };

  const handleAtualizarCliente = async (e) => {
    e.preventDefault();
    try {
      await atualizarCliente(editandoCliente._id, editandoCliente);
      setEditandoCliente(null);
      carregarClientes();
      setMensagem({ tipo: 'sucesso', texto: 'Cliente atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      setMensagem({ tipo: 'erro', texto: 'Erro ao atualizar cliente. Tente novamente.' });
    }
  };

  const handleExcluirCliente = async (id) => {
    try {
      await excluirCliente(id);
      carregarClientes();
      setMensagem({ tipo: 'sucesso', texto: 'Cliente excluído com sucesso!' });
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      setMensagem({ tipo: 'erro', texto: 'Erro ao excluir cliente. Tente novamente.' });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Cadastro de Cliente</h2>
      
      {mensagem && (
        <div className={`mb-4 p-2 rounded ${mensagem.tipo === 'sucesso' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {mensagem.texto}
        </div>
      )}

      <form onSubmit={handleNovoCliente} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={novoCliente.nome}
            onChange={(e) => setNovoCliente({...novoCliente, nome: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={novoCliente.email}
            onChange={(e) => setNovoCliente({...novoCliente, email: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="tel"
            placeholder="Telefone"
            value={novoCliente.telefone}
            onChange={(e) => setNovoCliente({...novoCliente, telefone: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="text"
            placeholder="Endereço"
            value={novoCliente.endereco}
            onChange={(e) => setNovoCliente({...novoCliente, endereco: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <BotaoPrincipal type="submit" className="mt-4">
          Adicionar Cliente
        </BotaoPrincipal>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 text-left text-gray-800 dark:text-white">Nome</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Email</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Telefone</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Endereço</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente._id} className="border-b dark:border-gray-700">
                <td className="p-2 text-gray-800 dark:text-gray-200">{cliente.nome}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{cliente.email}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{cliente.telefone}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{cliente.endereco}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEditarCliente(cliente)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluirCliente(cliente._id)}
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

      {editandoCliente && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-2">Editar Cliente</h3>
            <form onSubmit={handleAtualizarCliente}>
              <input
                type="text"
                value={editandoCliente.nome}
                onChange={(e) => setEditandoCliente({...editandoCliente, nome: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="email"
                value={editandoCliente.email}
                onChange={(e) => setEditandoCliente({...editandoCliente, email: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="tel"
                value={editandoCliente.telefone}
                onChange={(e) => setEditandoCliente({...editandoCliente, telefone: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="text"
                value={editandoCliente.endereco}
                onChange={(e) => setEditandoCliente({...editandoCliente, endereco: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setEditandoCliente(null)}
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