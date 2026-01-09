export default function About() {
  return (
    <section id="sobre" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-red-900 mb-12">Quem Somos Nós</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-red-50 rounded-2xl p-8 text-center hover:shadow-lg transition">
              <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👥</span>
              </div>
              
              <h3 className="text-xl font-bold text-red-900 mb-4">
                Equipa Fornecedora
              </h3>

              <p className="text-gray-700 leading-relaxed">
                A Nossa Equipa Evolui Constantemente E Com Isso, A Gama De Produtos Também, A Fim De Satisfazer As Necessidades Dos Nossos Clientes.
              </p>
            </div>
          ))}
        </div>

        <div className="bg-red-900 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://www.allrecipes.com/thmb/zN81HQ86Fa2rHnkH-KUvUf6pBZE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Cuts-of-Beef-3x2-1-a557f31f8b13462185b4f2c17ab5b746.png" 
                alt="Carnes Premium"
                className="rounded-2xl shadow-2xl"
              />
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-6">
                Somos A Melhor Fornecedora De Carnes Bovinas Em Angola
              </h3>

              <p className="leading-relaxed text-red-50">
                Somos a melhor fornecedora de carne bovina em Angola, reconhecida pela qualidade, frescura e confiança dos nossos produtos. Trabalhamos com os melhores fornecedores, garantindo carnes de primeira qualidade. Oferecemos uma ampla variedade de cortes para atender às necessidades do mercado angolano.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};