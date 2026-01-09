import logo from '../../assets/logo.svg';

export default function Footer() {
  return (
    <footer className="bg-red-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-red-900 font-bold">DB</span>
              </div> */}
              <img 
                src={logo} 
                alt="" 
                className="w-10 h-1o rounded-full"
              />

              <span className="font-bold text-lg">
                Delícias Bovinas
              </span>
            </div>

            <p className="text-red-200 text-sm">
              A excelência e frescura em cada corte que vai à sua mesa.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-red-200">
              <li><a href="#inicio" className="hover:text-white transition">Início</a></li>
              <li><a href="#produtos" className="hover:text-white transition">Produtos</a></li>
              <li><a href="#sobre" className="hover:text-white transition">Sobre</a></li>
              <li><a href="#contactos" className="hover:text-white transition">Contactos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Informações</h4>
            <ul className="space-y-2 text-red-200">
              <li><a href="#" className="hover:text-white transition">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition">Termos de Serviço</a></li>
              <li><a href="#" className="hover:text-white transition">Política de Cookies</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-red-200 text-sm">
              <li>Bairro Popular, Rua Do Kibabo</li>
              <li>deliciasbovinas@gmail.com</li>
              <li>+244 928 826 987</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-red-900 pt-8 text-center text-red-200 text-sm">
          <p>© 2025 Todos os direitos reservados. Delícias Bovinas</p>
        </div>
      </div>
    </footer>
  );
};