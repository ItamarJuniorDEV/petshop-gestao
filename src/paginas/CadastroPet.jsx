// src/paginas/CadastroPet.jsx
import React, { useState, useEffect } from 'react';
import { listarPets, criarPet, atualizarPet, excluirPet } from '../utils/api';
import BotaoPrincipal from '../componentes/BotaoPrincipal';
import { useApp } from '../contextos/AppContext';

export default function CadastroPet() {
  const [pets, setPets] = useState([]);
  const [novoPet, setNovoPet] = useState({ nome: '', especie: '', raca: '', idade: '', dono: '' });
  const [editandoPet, setEditandoPet] = useState(null);
  const { dispatch } = useApp();

  useEffect(() => {
    carregarPets();
  }, []);

  const carregarPets = async () => {
    try {
      const response = await listarPets();
      setPets(response.data);
    } catch (error) {
      console.error('Erro ao carregar pets:', error);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { id: Date.now(), type: 'error', message: 'Erro ao carregar pets. Tente novamente.' }
      });
    }
  };

  const handleNovoPet = async (e) => {
    e.preventDefault();
    try {
      await criarPet(novoPet);
      setNovoPet({ nome: '', especie: '', raca: '', idade: '', dono: '' });
      carregarPets();
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { id: Date.now(), type: 'success', message: 'Pet adicionado com sucesso!' }
      });
    } catch (error) {
      console.error('Erro ao criar pet:', error);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { id: Date.now(), type: 'error', message: 'Erro ao adicionar pet. Tente novamente.' }
      });
    }
  };

  const handleEditarPet = (pet) => {
    setEditandoPet(pet);
  };

  const handleAtualizarPet = async (e) => {
    e.preventDefault();
    try {
      await atualizarPet(editandoPet._id, editandoPet);
      setEditandoPet(null);
      carregarPets();
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { id: Date.now(), type: 'success', message: 'Pet atualizado com sucesso!' }
      });
    } catch (error) {
      console.error('Erro ao atualizar pet:', error);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { id: Date.now(), type: 'error', message: 'Erro ao atualizar pet. Tente novamente.' }
      });
    }
  };

  const handleExcluirPet = async (id) => {
    try {
      await excluirPet(id);
      carregarPets();
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { id: Date.now(), type: 'success', message: 'Pet excluído com sucesso!' }
      });
    } catch (error) {
      console.error('Erro ao excluir pet:', error);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { id: Date.now(), type: 'error', message: 'Erro ao excluir pet. Tente novamente.' }
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Cadastro de Pet</h2>
      
      <form onSubmit={handleNovoPet} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nome do Pet"
            value={novoPet.nome}
            onChange={(e) => setNovoPet({...novoPet, nome: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="text"
            placeholder="Espécie"
            value={novoPet.especie}
            onChange={(e) => setNovoPet({...novoPet, especie: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="text"
            placeholder="Raça"
            value={novoPet.raca}
            onChange={(e) => setNovoPet({...novoPet, raca: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="number"
            placeholder="Idade"
            value={novoPet.idade}
            onChange={(e) => setNovoPet({...novoPet, idade: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="text"
            placeholder="Nome do Dono"
            value={novoPet.dono}
            onChange={(e) => setNovoPet({...novoPet, dono: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <BotaoPrincipal type="submit" className="mt-4">
          Adicionar Pet
        </BotaoPrincipal>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 text-left text-gray-800 dark:text-white">Nome</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Espécie</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Raça</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Idade</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Dono</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet._id} className="border-b dark:border-gray-700">
                <td className="p-2 text-gray-800 dark:text-gray-200">{pet.nome}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{pet.especie}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{pet.raca}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{pet.idade}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{pet.dono}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEditarPet(pet)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluirPet(pet._id)}
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

      {editandoPet && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-2">Editar Pet</h3>
            <form onSubmit={handleAtualizarPet}>
              <input
                type="text"
                value={editandoPet.nome}
                onChange={(e) => setEditandoPet({...editandoPet, nome: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="text"
                value={editandoPet.especie}
                onChange={(e) => setEditandoPet({...editandoPet, especie: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="text"
                value={editandoPet.raca}
                onChange={(e) => setEditandoPet({...editandoPet, raca: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="number"
                value={editandoPet.idade}
                onChange={(e) => setEditandoPet({...editandoPet, idade: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="text"
                value={editandoPet.dono}
                onChange={(e) => setEditandoPet({...editandoPet, dono: e.target.value})}
                className="border rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setEditandoPet(null)}
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