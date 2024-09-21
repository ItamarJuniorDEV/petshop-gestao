import React, { useState, useEffect } from 'react';
import { listarPagamentos, registrarPagamento } from '../utils/api';
import BotaoPrincipal from '../componentes/BotaoPrincipal';

export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState([]);
  const [novoPagamento, setNovoPagamento] = useState({ cliente: '', valor: '', data: '', metodo: '' });
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    carregarPagamentos();
  }, []);

  const carregarPagamentos = async () => {
    try {
      const response = await listarPagamentos();
      setPagamentos(response.data);
    } catch (error) {
      console.error('Erro ao carregar pagamentos:', error);
      setMensagem({ tipo: 'erro', texto: 'Erro ao carregar pagamentos. Tente novamente.' });
    }
  };

  const handleNovoPagamento = async (e) => {
    e.preventDefault();
    try {
      await registrarPagamento(novoPagamento);
      setNovoPagamento({ cliente: '', valor: '', data: '', metodo: '' });
      carregarPagamentos();
      setMensagem({ tipo: 'sucesso', texto: 'Pagamento registrado com sucesso!' });
    } catch (error) {
      console.error('Erro ao registrar pagamento:', error);
      setMensagem({ tipo: 'erro', texto: 'Erro ao registrar pagamento. Tente novamente.' });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Pagamentos</h2>
      
      {mensagem && (
        <div className={`mb-4 p-2 rounded ${mensagem.tipo === 'sucesso' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {mensagem.texto}
        </div>
      )}

      <form onSubmit={handleNovoPagamento} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Cliente"
            value={novoPagamento.cliente}
            onChange={(e) => setNovoPagamento({...novoPagamento, cliente: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="number"
            placeholder="Valor"
            value={novoPagamento.valor}
            onChange={(e) => setNovoPagamento({...novoPagamento, valor: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="date"
            value={novoPagamento.data}
            onChange={(e) => setNovoPagamento({...novoPagamento, data: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          />
          <select
            value={novoPagamento.metodo}
            onChange={(e) => setNovoPagamento({...novoPagamento, metodo: e.target.value})}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Selecione o método</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="PIX">PIX</option>
          </select>
        </div>
        <BotaoPrincipal type="submit" className="mt-4">
          Registrar Pagamento
        </BotaoPrincipal>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 text-left text-gray-800 dark:text-white">Data</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Cliente</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Valor</th>
              <th className="p-2 text-left text-gray-800 dark:text-white">Método</th>
            </tr>
          </thead>
          <tbody>
            {pagamentos.map((pagamento) => (
              <tr key={pagamento._id} className="border-b dark:border-gray-700">
                <td className="p-2 text-gray-800 dark:text-gray-200">{new Date(pagamento.data).toLocaleDateString()}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{pagamento.cliente}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">R$ {Number(pagamento.valor).toFixed(2)}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{pagamento.metodo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagamentos.length === 0 && (
        <p className="text-center mt-4 text-gray-600 dark:text-gray-400">Nenhum pagamento registrado.</p>
      )}
    </div>
  );
}