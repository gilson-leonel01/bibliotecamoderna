import { useState } from 'react';
import logo from '../../assets/logo.webp';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = () => {
    console.log('Login:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-600 via-purple-700 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="shadow-lg">
              <img src={logo} alt="Logo" className="w-18 h-12" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2">Open Brain Library</h1>
          <p className="text-purple-200">Sistema de Biblioteca</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Entrar na sua conta
          </h2>

          <div className="space-y-5">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Senha
              </label>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  placeholder="••••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
              </label>

              <button className="text-sm text-purple-600 font-medium hover:text-purple-700 hover:cursor-pointer">
                Esqueceu a senha?
              </button>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg hover:cursor-pointer hover:shadow-xl"
            >
              Entrar
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <button className="text-purple-600 font-semibold hover:cursor-pointer hover:text-purple-700">
                Registre-se aqui
              </button>
            </p>
          </div>
        </div>

        <footer className="text-center mt-6 text-purple-200 text-sm">
          <p>
            &copy; <span>{currentYear} </span> 
            Open Brain Library. Todos os direitos reservados. &reg;
          </p>
        </footer>
      </div>
    </div>
  );
}