import React, { useState } from 'react';
import { User, Mail, Lock, Bell, BookOpen, Heart, Globe, Save, LogOut, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // se estiver usando react-router

export default function SettingsPage() {
  const navigate = useNavigate();
  
  // Estados para formulário (valores mock/exemplo)
  const [profile, setProfile] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    avatar: '', // pode ser URL ou base64
    preferredGenres: ['Ficção Científica', 'Romance', 'Clássicos'],
    preferredFormat: 'Físico', // ou 'Digital', 'Audiobook'
    notifications: true,
    language: 'Português',
    rememberMe: true,
  });

  const [passwordChange, setPasswordChange] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordChange(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    console.log('Salvando perfil:', profile);
    // Aqui: chamada API para atualizar perfil
    alert('Perfil atualizado com sucesso!');
  };

  const handleChangePassword = () => {
    if (passwordChange.new !== passwordChange.confirm) {
      alert('As senhas não coincidem!');
      return;
    }
    console.log('Alterando senha...');
    // Aqui: chamada API para trocar senha
    alert('Senha alterada com sucesso!');
  };

  const handleLogout = () => {
    // Limpar auth, redirecionar para login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header da página */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <User className="w-8 h-8" /> Configurações da Conta
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600/80 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" /> Sair
          </button>
        </div>

        {/* Card Principal - Perfil */}
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-purple-600/30 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Camera className="w-6 h-6" /> Foto e Informações Pessoais
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-purple-700 flex items-center justify-center overflow-hidden border-4 border-purple-500">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-purple-300" />
                )}
              </div>
              <button className="mt-3 text-sm text-purple-300 hover:text-purple-200 flex items-center gap-1">
                <Camera className="w-4 h-4" /> Alterar foto
              </button>
            </div>

            {/* Campos */}
            <div className="flex-1 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Nome completo</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full bg-purple-900/50 border border-purple-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full pl-10 bg-purple-900/50 border border-purple-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferências de Leitura */}
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-purple-600/30 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Heart className="w-6 h-6" /> Preferências de Leitura
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Gêneros favoritos (selecione múltiplos)</label>
              <div className="flex flex-wrap gap-3">
                {['Ficção Científica', 'Fantasia', 'Romance', 'Clássicos', 'Mistério', 'Autoajuda', 'Biografias'].map(genre => (
                  <button
                    key={genre}
                    className={`px-4 py-2 rounded-full text-sm transition ${
                      profile.preferredGenres.includes(genre)
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-900/50 hover:bg-purple-700'
                    }`}
                    onClick={() => {
                      setProfile(prev => ({
                        ...prev,
                        preferredGenres: prev.preferredGenres.includes(genre)
                          ? prev.preferredGenres.filter(g => g !== genre)
                          : [...prev.preferredGenres, genre],
                      }));
                    }}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Formato preferido</label>
              <select
                name="preferredFormat"
                value={profile.preferredFormat}
                onChange={handleProfileChange}
                className="w-full bg-purple-900/50 border border-purple-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option>Físico</option>
                <option>Digital (eBook)</option>
                <option>Audiobook</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notificações e Outras Configs */}
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-purple-600/30 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Bell className="w-6 h-6" /> Notificações e Preferências
          </h2>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={profile.notifications}
                onChange={() => setProfile(prev => ({ ...prev, notifications: !prev.notifications }))}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <span>Receber notificações de devoluções, recomendações e promoções</span>
            </label>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Globe className="w-5 h-5" /> Idioma da interface
              </label>
              <select
                name="language"
                value={profile.language}
                onChange={handleProfileChange}
                className="w-full bg-purple-900/50 border border-purple-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option>Português</option>
                <option>Inglês</option>
                <option>Espanhol</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alterar Senha */}
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-purple-600/30 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Lock className="w-6 h-6" /> Alterar Senha
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Senha atual</label>
              <input
                type="password"
                name="current"
                value={passwordChange.current}
                onChange={handlePasswordChange}
                className="w-full bg-purple-900/50 border border-purple-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nova senha</label>
              <input
                type="password"
                name="new"
                value={passwordChange.new}
                onChange={handlePasswordChange}
                className="w-full bg-purple-900/50 border border-purple-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirmar nova senha</label>
              <input
                type="password"
                name="confirm"
                value={passwordChange.confirm}
                onChange={handlePasswordChange}
                className="w-full bg-purple-900/50 border border-purple-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <button
              onClick={handleChangePassword}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition shadow-lg"
            >
              Alterar Senha
            </button>
          </div>
        </div>

        {/* Botão Salvar Geral */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveProfile}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition shadow-xl"
          >
            <Save className="w-5 h-5" /> Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
