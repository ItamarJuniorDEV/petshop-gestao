// src/utils/api.js

// Função auxiliar para gerar IDs únicos
const generateId = () => Math.random().toString(36).substr(2, 9);

// Função para inicializar dados no localStorage se não existirem
const initializeLocalStorage = () => {
  if (!localStorage.getItem('pets')) localStorage.setItem('pets', JSON.stringify([]));
  if (!localStorage.getItem('clientes')) localStorage.setItem('clientes', JSON.stringify([]));
  if (!localStorage.getItem('agendamentos')) localStorage.setItem('agendamentos', JSON.stringify([]));
  if (!localStorage.getItem('funcionarios')) localStorage.setItem('funcionarios', JSON.stringify([]));
  if (!localStorage.getItem('pagamentos')) localStorage.setItem('pagamentos', JSON.stringify([]));
  if (!localStorage.getItem('servicos')) localStorage.setItem('servicos', JSON.stringify([]));
};

initializeLocalStorage();

// Funções simuladas da API
export const login = (email, senha) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@example.com' && senha === 'password') {
        const user = { id: 1, nome: 'Admin', email: 'admin@example.com' };
        localStorage.setItem('user', JSON.stringify(user));
        resolve({ data: user });
      } else {
        reject({ message: 'Credenciais inválidas' });
      }
    }, 500);
  });
};

export const obterUsuarioAtual = () => {
  return new Promise((resolve) => {
    const user = JSON.parse(localStorage.getItem('user'));
    resolve({ data: user });
  });
};

export const listarPets = () => {
  return new Promise((resolve) => {
    const pets = JSON.parse(localStorage.getItem('pets'));
    resolve({ data: pets });
  });
};

export const criarPet = (pet) => {
  return new Promise((resolve) => {
    const pets = JSON.parse(localStorage.getItem('pets'));
    const novoPet = { ...pet, _id: generateId() };
    pets.push(novoPet);
    localStorage.setItem('pets', JSON.stringify(pets));
    resolve({ data: novoPet });
  });
};

export const atualizarPet = (id, pet) => {
  return new Promise((resolve) => {
    const pets = JSON.parse(localStorage.getItem('pets'));
    const index = pets.findIndex(p => p._id === id);
    if (index !== -1) {
      pets[index] = { ...pets[index], ...pet };
      localStorage.setItem('pets', JSON.stringify(pets));
      resolve({ data: pets[index] });
    }
  });
};

export const excluirPet = (id) => {
  return new Promise((resolve) => {
    let pets = JSON.parse(localStorage.getItem('pets'));
    pets = pets.filter(p => p._id !== id);
    localStorage.setItem('pets', JSON.stringify(pets));
    resolve({ data: { message: 'Pet excluído com sucesso' } });
  });
};

export const listarClientes = () => {
  return new Promise((resolve) => {
    const clientes = JSON.parse(localStorage.getItem('clientes'));
    resolve({ data: clientes });
  });
};

export const criarCliente = (cliente) => {
  return new Promise((resolve) => {
    const clientes = JSON.parse(localStorage.getItem('clientes'));
    const novoCliente = { ...cliente, _id: generateId() };
    clientes.push(novoCliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    resolve({ data: novoCliente });
  });
};

export const atualizarCliente = (id, cliente) => {
  return new Promise((resolve) => {
    const clientes = JSON.parse(localStorage.getItem('clientes'));
    const index = clientes.findIndex(c => c._id === id);
    if (index !== -1) {
      clientes[index] = { ...clientes[index], ...cliente };
      localStorage.setItem('clientes', JSON.stringify(clientes));
      resolve({ data: clientes[index] });
    }
  });
};

export const excluirCliente = (id) => {
  return new Promise((resolve) => {
    let clientes = JSON.parse(localStorage.getItem('clientes'));
    clientes = clientes.filter(c => c._id !== id);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    resolve({ data: { message: 'Cliente excluído com sucesso' } });
  });
};

export const listarAgendamentos = () => {
  return new Promise((resolve) => {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos'));
    resolve({ data: agendamentos });
  });
};

export const criarAgendamento = (agendamento) => {
  return new Promise((resolve) => {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos'));
    const novoAgendamento = { ...agendamento, _id: generateId() };
    agendamentos.push(novoAgendamento);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    resolve({ data: novoAgendamento });
  });
};

export const atualizarAgendamento = (id, agendamento) => {
  return new Promise((resolve) => {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos'));
    const index = agendamentos.findIndex(a => a._id === id);
    if (index !== -1) {
      agendamentos[index] = { ...agendamentos[index], ...agendamento };
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
      resolve({ data: agendamentos[index] });
    }
  });
};

export const excluirAgendamento = (id) => {
  return new Promise((resolve) => {
    let agendamentos = JSON.parse(localStorage.getItem('agendamentos'));
    agendamentos = agendamentos.filter(a => a._id !== id);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    resolve({ data: { message: 'Agendamento excluído com sucesso' } });
  });
};

export const listarFuncionarios = () => {
  return new Promise((resolve) => {
    const funcionarios = JSON.parse(localStorage.getItem('funcionarios'));
    resolve({ data: funcionarios });
  });
};

export const criarFuncionario = (funcionario) => {
  return new Promise((resolve) => {
    const funcionarios = JSON.parse(localStorage.getItem('funcionarios'));
    const novoFuncionario = { ...funcionario, _id: generateId() };
    funcionarios.push(novoFuncionario);
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    resolve({ data: novoFuncionario });
  });
};

export const atualizarFuncionario = (id, funcionario) => {
  return new Promise((resolve) => {
    const funcionarios = JSON.parse(localStorage.getItem('funcionarios'));
    const index = funcionarios.findIndex(f => f._id === id);
    if (index !== -1) {
      funcionarios[index] = { ...funcionarios[index], ...funcionario };
      localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
      resolve({ data: funcionarios[index] });
    }
  });
};

export const excluirFuncionario = (id) => {
  return new Promise((resolve) => {
    let funcionarios = JSON.parse(localStorage.getItem('funcionarios'));
    funcionarios = funcionarios.filter(f => f._id !== id);
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    resolve({ data: { message: 'Funcionário excluído com sucesso' } });
  });
};

export const listarPagamentos = () => {
  return new Promise((resolve) => {
    const pagamentos = JSON.parse(localStorage.getItem('pagamentos'));
    resolve({ data: pagamentos });
  });
};

export const registrarPagamento = (pagamento) => {
  return new Promise((resolve) => {
    const pagamentos = JSON.parse(localStorage.getItem('pagamentos'));
    const novoPagamento = { ...pagamento, _id: generateId() };
    pagamentos.push(novoPagamento);
    localStorage.setItem('pagamentos', JSON.stringify(pagamentos));
    resolve({ data: novoPagamento });
  });
};

export const obterEstatisticas = () => {
  return new Promise((resolve) => {
    const pets = JSON.parse(localStorage.getItem('pets'));
    const clientes = JSON.parse(localStorage.getItem('clientes'));
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos'));
    const pagamentos = JSON.parse(localStorage.getItem('pagamentos'));

    const estatisticas = {
      totalPets: pets.length,
      totalClientes: clientes.length,
      agendamentosHoje: agendamentos.filter(a => new Date(a.data).toDateString() === new Date().toDateString()).length,
      faturamentoMensal: pagamentos.reduce((acc, p) => acc + parseFloat(p.valor), 0)
    };

    resolve({ data: estatisticas });
  });
};

export const obterRelatorios = () => {
  return new Promise((resolve) => {
    const pagamentos = JSON.parse(localStorage.getItem('pagamentos'));
    const clientes = JSON.parse(localStorage.getItem('clientes'));

    // Simulando dados para os relatórios
    const faturamentoMensal = Array.from({ length: 12 }, (_, i) => ({
      mes: new Date(2023, i, 1).toLocaleString('default', { month: 'long' }),
      valor: Math.floor(Math.random() * 10000) + 5000
    }));

    const servicosPorCategoria = {
      'Banho': Math.floor(Math.random() * 100) + 50,
      'Tosa': Math.floor(Math.random() * 80) + 40,
      'Consulta': Math.floor(Math.random() * 60) + 30,
      'Vacina': Math.floor(Math.random() * 40) + 20,
      'Hospedagem': Math.floor(Math.random() * 30) + 10
    };

    const clientesPorMes = Array.from({ length: 12 }, (_, i) => ({
      mes: new Date(2023, i, 1).toLocaleString('default', { month: 'long' }),
      quantidade: Math.floor(Math.random() * 20) + 5
    }));

    resolve({
      data: {
        faturamentoMensal,
        servicosPorCategoria,
        clientesPorMes
      }
    });
  });
};

// Nova função para listar serviços
export const listarServicos = () => {
  return new Promise((resolve) => {
    let servicos = JSON.parse(localStorage.getItem('servicos'));
    if (!servicos || servicos.length === 0) {
      // Se não houver serviços, cria alguns dados de exemplo
      servicos = [
        { _id: generateId(), data: '2024-03-01', cliente: 'João Silva', pet: 'Rex', servico: 'Banho', valor: 50.00 },
        { _id: generateId(), data: '2024-03-02', cliente: 'Maria Oliveira', pet: 'Luna', servico: 'Tosa', valor: 70.00 },
        { _id: generateId(), data: '2024-03-03', cliente: 'Carlos Santos', pet: 'Max', servico: 'Consulta', valor: 100.00 },
      ];
      localStorage.setItem('servicos', JSON.stringify(servicos));
    }
    resolve({ data: servicos });
  });
};

// Função para criar um novo serviço
export const criarServico = (servico) => {
  return new Promise((resolve) => {
    const servicos = JSON.parse(localStorage.getItem('servicos')) || [];
    const novoServico = { ...servico, _id: generateId() };
    servicos.push(novoServico);
    localStorage.setItem('servicos', JSON.stringify(servicos));
    resolve({ data: novoServico });
  });
};

// Função para atualizar um serviço existente
export const atualizarServico = (id, servico) => {
  return new Promise((resolve) => {
    const servicos = JSON.parse(localStorage.getItem('servicos'));
    const index = servicos.findIndex(s => s._id === id);
    if (index !== -1) {
      servicos[index] = { ...servicos[index], ...servico };
      localStorage.setItem('servicos', JSON.stringify(servicos));
      resolve({ data: servicos[index] });
    }
  });
};

// Função para excluir um serviço
export const excluirServico = (id) => {
  return new Promise((resolve) => {
    let servicos = JSON.parse(localStorage.getItem('servicos'));
    servicos = servicos.filter(s => s._id !== id);
    localStorage.setItem('servicos', JSON.stringify(servicos));
    resolve({ data: { message: 'Serviço excluído com sucesso' } });
  });
};