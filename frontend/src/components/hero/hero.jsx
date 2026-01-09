export default function Hero() {
  return (
    <section id="inicio" className="pt-24 pb-12 bg-linear-to-b from-red-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-100 rounded-3xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-red-900 mb-6">
                DELÍCIAS BOVINAS
              </h1>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                A excelência e frescura em cada corte que vai à sua mesa, com cortes nobres, frescos e saborosos vindo da melhor carne sul-africana.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 bg-red-900 text-white rounded-full hover:bg-red-800 hover:cursor-pointer transition font-semibold">
                  PEÇA AGORA
                </button>

                <a href="/reservation" className="px-8 py-3 bg-white text-red-900 border-2 border-red-900 rounded-full hover:bg-red-900 hover:text-white transition hover:cursor-pointer font-semibold">
                  RESERVAR
                </a>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1723893905879-0e309c2a8e06?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Carnes Premium"
                className="rounded-2xl shadow-2xl w-full h-[300px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};