import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contextos/AuthContext';
import { ThemeProvider } from './contextos/ThemeContext';
import { AppProvider } from './contextos/AppContext';
import ProtectedRoute from './componentes/ProtectedRoute';
import Layout from './componentes/Layout';
import Notificacao from './componentes/Notificacao';

const Login = lazy(() => import('./paginas/Login'));
const Inicio = lazy(() => import('./paginas/Inicio'));
const CadastroPet = lazy(() => import('./paginas/CadastroPet'));
const CadastroCliente = lazy(() => import('./paginas/CadastroCliente'));
const Agendamentos = lazy(() => import('./paginas/Agendamentos'));
const HistoricoServicos = lazy(() => import('./paginas/HistoricoServicos'));
const GerenciamentoFuncionarios = lazy(() => import('./paginas/GerenciamentoFuncionarios'));
const Pagamentos = lazy(() => import('./paginas/Pagamentos'));
const Relatorios = lazy(() => import('./paginas/Relatorios'));
const PainelControle = lazy(() => import('./paginas/PainelControle'));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <Router>
            <Suspense fallback={<div>Carregando...</div>}>
              <Notificacao />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                  <Route index element={<Inicio />} />
                  <Route path="cadastro-pet" element={<CadastroPet />} />
                  <Route path="cadastro-cliente" element={<CadastroCliente />} />
                  <Route path="agendamentos" element={<Agendamentos />} />
                  <Route path="historico-servicos" element={<HistoricoServicos />} />
                  <Route path="gerenciamento-funcionarios" element={<GerenciamentoFuncionarios />} />
                  <Route path="pagamentos" element={<Pagamentos />} />
                  <Route path="relatorios" element={<Relatorios />} />
                  <Route path="painel-controle" element={<PainelControle />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;