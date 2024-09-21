import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContext';
import BotaoPrincipal from '../componentes/BotaoPrincipal';

const Logo = () => (
  <svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 12.5C22.5 12.5 20.5 14.5 20.5 17C20.5 19.5 22.5 21.5 25 21.5C27.5 21.5 29.5 19.5 29.5 17C29.5 14.5 27.5 12.5 25 12.5ZM35 12.5C32.5 12.5 30.5 14.5 30.5 17C30.5 19.5 32.5 21.5 35 21.5C37.5 21.5 39.5 19.5 39.5 17C39.5 14.5 37.5 12.5 35 12.5ZM20 25C17.5 25 15.5 27 15.5 29.5C15.5 32 17.5 34 20 34C22.5 34 24.5 32 24.5 29.5C24.5 27 22.5 25 20 25ZM40 25C37.5 25 35.5 27 35.5 29.5C35.5 32 37.5 34 40 34C42.5 34 44.5 32 44.5 29.5C44.5 27 42.5 25 40 25Z" fill="#0369a1"/>
    <text x="60" y="35" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#0369a1">PetGestão</text>
  </svg>
);

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');
    if (login(email, senha)) {
      navigate('/');
    } else {
      setErro('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0369a1]">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-stretch bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="lg:flex-1 lg:max-w-2xl p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-blue-50 to-white">
            <Logo />
            <h1 className="mt-6 text-4xl font-extrabold text-gray-900 leading-tight">
              Bem-vindo ao <span className="text-[#0369a1]">PetGestão</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Cuidando com carinho, gerenciando com eficiência
            </p>
            <div className="mt-8 relative h-64 lg:h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="babaloo.jpeg"
                alt="Cachorro feliz"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ objectPosition: 'center -110px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0369a1] to-transparent opacity-20"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0369a1] to-transparent">
                <p className="text-white text-lg font-semibold">Seu parceiro na gestão de pets</p>
              </div>
            </div>
          </div>
          <div className="lg:flex-1 lg:max-w-md p-8 lg:p-12 bg-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Faça login na sua conta</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email ou telefone
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0369a1] focus:border-[#0369a1] text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0369a1] focus:border-[#0369a1] text-base"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
              {erro && <p className="text-red-500 text-sm">{erro}</p>}
              <div>
                <BotaoPrincipal type="submit" className="w-full bg-[#0369a1] hover:bg-[#035485] focus:ring-[#0369a1]">
                  Entrar
                </BotaoPrincipal>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Ou
                  </span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <a href="#" className="font-medium text-[#0369a1] hover:text-[#035485] transition duration-150 ease-in-out">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white shadow mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Itamar Junior. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Login;