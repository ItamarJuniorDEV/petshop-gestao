import React, { useState, useEffect } from 'react';
import { obterEstatisticas } from '../utils/api';
import { FaPaw, FaUsers, FaCalendarCheck, FaMoneyBillWave, FaUserShield, FaToggleOn, FaToggleOff, FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function PainelControle() {
  const [estatisticas, setEstatisticas] = useState({
    totalPets: 0,
    totalClientes: 0,
    agendamentosHoje: 0,
    faturamentoMensal: 0
  });

  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'João Silva', email: 'joao@example.com', permissoes: { agendamentos: true, clientesEPets: true, servicos: true, financeiro: false, administracao: false } },
    { id: 2, nome: 'Maria Oliveira', email: 'maria@example.com', permissoes: { agendamentos: true, clientesEPets: true, servicos: false, financeiro: false, administracao: false } },
    { id: 3, nome: 'Carlos Santos', email: 'carlos@example.com', permissoes: { agendamentos: true, clientesEPets: false, servicos: true, financeiro: false, administracao: false } },
  ]);

  const [novoFuncionario, setNovoFuncionario] = useState({ nome: '', email: '', senha: '' });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [funcionarioEditando, setFuncionarioEditando] = useState(null);

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  const carregarEstatisticas = async () => {
    try {
      const response = await obterEstatisticas();
      setEstatisticas(response.data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const CardEstatistica = ({ titulo, valor, icone }) => (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{titulo}</p>
          <p className="text-3xl font-semibold text-gray-700 dark:text-white">{valor}</p>
        </div>
        <div className="text-4xl text-blue-500 dark:text-blue-400">
          {icone}
        </div>
      </div>
    </div>
  );

  const togglePermissao = (funcionarioId, permissao) => {
    setFuncionarios(funcionarios.map(funcionario => {
      if (funcionario.id === funcionarioId) {
        return {
          ...funcionario,
          permissoes: {
            ...funcionario.permissoes,
            [permissao]: !funcionario.permissoes[permissao]
          }
        };
      }
      return funcionario;
    }));
  };

  const handleNovoFuncionario = (e) => {
    e.preventDefault();
    if (modoEdicao) {
      setFuncionarios(funcionarios.map(f => 
        f.id === funcionarioEditando.id ? { ...funcionarioEditando, ...novoFuncionario } : f
      ));
      setModoEdicao(false);
      setFuncionarioEditando(null);
    } else {
      const novoId = funcionarios.length + 1;
      const novoFuncionarioCompleto = {
        ...novoFuncionario,
        id: novoId,
        permissoes: { agendamentos: false, clientesEPets: false, servicos: false, financeiro: false, administracao: false }
      };
      setFuncionarios([...funcionarios, novoFuncionarioCompleto]);
    }
    setNovoFuncionario({ nome: '', email: '', senha: '' });
    setMostrarFormulario(false);
  };

  const editarFuncionario = (funcionario) => {
    setNovoFuncionario({ nome: funcionario.nome, email: funcionario.email, senha: '' });
    setFuncionarioEditando(funcionario);
    setModoEdicao(true);
    setMostrarFormulario(true);
  };

  const excluirFuncionario = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este funcionário?')) {
      setFuncionarios(funcionarios.filter(f => f.id !== id));
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Painel de Controle</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CardEstatistica 
          titulo="Total de Pets" 
          valor={estatisticas.totalPets} 
          icone={<FaPaw />} 
        />
        <CardEstatistica 
          titulo="Total de Clientes" 
          valor={estatisticas.totalClientes} 
          icone={<FaUsers />} 
        />
        <CardEstatistica 
          titulo="Agendamentos Hoje" 
          valor={estatisticas.agendamentosHoje} 
          icone={<FaCalendarCheck />} 
        />
        <CardEstatistica 
          titulo="Faturamento Mensal" 
          valor={`R$ ${estatisticas.faturamentoMensal.toFixed(2)}`} 
          icone={<FaMoneyBillWave />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Serviços Mais Populares</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Banho</span>
              <span className="font-semibold text-gray-800 dark:text-white">32%</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Tosa</span>
              <span className="font-semibold text-gray-800 dark:text-white">28%</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Consulta Veterinária</span>
              <span className="font-semibold text-gray-800 dark:text-white">20%</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Hospedagem</span>
              <span className="font-semibold text-gray-800 dark:text-white">15%</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Próximos Agendamentos</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Rex (Banho) - João Silva</span>
              <span className="font-semibold text-gray-800 dark:text-white">14:00</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Luna (Tosa) - Maria Oliveira</span>
              <span className="font-semibold text-gray-800 dark:text-white">15:30</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Max (Consulta) - Carlos Santos</span>
              <span className="font-semibold text-gray-800 dark:text-white">16:45</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
            <FaUserShield className="mr-2" /> Gerenciamento de Funcionários e Permissões
          </h3>
          <button
            onClick={() => {
              setMostrarFormulario(!mostrarFormulario);
              setModoEdicao(false);
              setNovoFuncionario({ nome: '', email: '', senha: '' });
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FaUserPlus className="mr-2" /> {modoEdicao ? 'Cancelar Edição' : 'Adicionar Funcionário'}
          </button>
        </div>

        {mostrarFormulario && (
          <form onSubmit={handleNovoFuncionario} className="mb-6 bg-gray-100 dark:bg-gray-600 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Nome"
                value={novoFuncionario.nome}
                onChange={(e) => setNovoFuncionario({...novoFuncionario, nome: e.target.value})}
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
                type="password"
                placeholder="Senha"
                value={novoFuncionario.senha}
                onChange={(e) => setNovoFuncionario({...novoFuncionario, senha: e.target.value})}
                className="border rounded p-2 dark:bg-gray-700 dark:text-white"
                required={!modoEdicao}
              />
            </div>
            <button type="submit" className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              {modoEdicao ? 'Atualizar Funcionário' : 'Cadastrar Funcionário'}
            </button>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Funcionário</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Agendamentos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Clientes e Pets</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Serviços</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Financeiro</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Administração</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600">
              {funcionarios.map((funcionario) => (
                <tr key={funcionario.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{funcionario.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{funcionario.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => togglePermissao(funcionario.id, 'agendamentos')} className="text-2xl">
                      {funcionario.permissoes.agendamentos ? <FaToggleOn className="text-green-500" /> : <FaToggleOff className="text-red-500" />}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => togglePermissao(funcionario.id, 'clientesEPets')} className="text-2xl">
                      {funcionario.permissoes.clientesEPets ? <FaToggleOn className="text-green-500" /> : <FaToggleOff className="text-red-500" />}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => togglePermissao(funcionario.id, 'servicos')} className="text-2xl">
                      {funcionario.permissoes.servicos ? <FaToggleOn className="text-green-500" /> : <FaToggleOff className="text-red-500" />}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => togglePermissao(funcionario.id, 'financeiro')} className="text-2xl">
                      {funcionario.permissoes.financeiro ? <FaToggleOn className="text-green-500" /> : <FaToggleOff className="text-red-500" />}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => togglePermissao(funcionario.id, 'administracao')} className="text-2xl">
                      {funcionario.permissoes.administracao ? <FaToggleOn className="text-green-500" /> : <FaToggleOff className="text-red-500" />}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => editarFuncionario(funcionario)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                      <FaEdit />
                    </button>
                    <button onClick={() => excluirFuncionario(funcionario.id)} className="text-red-600 hover:text-red-900">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}