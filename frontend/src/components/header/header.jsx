import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import logo from '../../assets/logo.avif';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-red-900 shadow-lg' : 'bg-red-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            {/* <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-red-900 font-bold text-xl">DB</span>
            </div> */}
            <img 
              src={logo} 
              alt="Delicias Bovinas Logo" 
              className='w-10 h-10 rounded-full'
            />
            <span className="text-white font-bold text-xl hidden sm:block">Delícias Bovinas</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-white hover:text-red-200 hover:cursor-pointer transition">Início</a>
            <a href="#produtos" className="text-white hover:text-red-200 hover:cursor-pointer transition">Produtos</a>
            <a href="#sobre" className="text-white hover:text-red-200 hover:cursor-pointer transition">Sobre</a>
            <a href="#contactos" className="text-white hover:text-red-200 hover:cursor-pointer transition">Contactos</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden md:block px-6 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-red-900 transition hover:cursor-pointer">
              Entrar
            </button>
            <button className="relative p-2 text-white hover:text-red-200 transition hover:cursor-pointer">
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-red-800">
            <nav className="flex flex-col gap-4">
              <a href="#inicio" className="text-white hover:text-red-200 transition hover:cursor-pointer">Início</a>
              <a href="#produtos" className="text-white hover:text-red-200 transition hover:cursor-pointer">Produtos</a>
              <a href="#sobre" className="text-white hover:text-red-200 transition hover:cursor-pointer">Sobre</a>
              <a href="#contactos" className="text-white hover:text-red-200 transition hover:cursor-pointer">Contactos</a>
              <button className="px-6 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-red-900 transition hover:cursor-pointer">
                Entrar
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};