import { useState, useEffect } from 'react';
import { BookOpen, Calendar, Hash, Package, XCircle } from 'lucide-react';

export default function Reservation() {
  const [loading, setLoading] = useState(true);
  const [livros, setLivros] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLivros();
  }, []);

  const fetchLivros = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5071/api/livros');
      
      if (!response.ok) {
        throw new Error('Erro ao carregar livros');
      }
      
      const data = await response.json();
      setLivros(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Carregando livros...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>

          <h2 className="mt-4 text-xl font-semibold text-center text-gray-800">
            Erro ao carregar
          </h2>

          <p className="mt-2 text-center text-gray-600">{error}</p>

          <button
            onClick={fetchLivros}
            className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 hover:cursor-pointer transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sistema de Biblioteca</h1>
          <p className="text-gray-600">Consulte a disponibilidade dos livros</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {livros.map((livro) => (
            <div
              key={livro.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-linear-to-r from-indigo-500 to-purple-600 p-6">
                <div className="flex items-start justify-between">
                  <BookOpen className="w-10 h-10 text-white" />
                  {livro.estaDisponivel ? (
                    <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Disponível
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Indisponível
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white mt-4">{livro.titulo}</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center text-gray-700">
                  <Hash className="w-5 h-5 mr-3 text-indigo-600" />
                  <div>
                    <p className="text-xs text-gray-500">ISBN</p>
                    <p className="font-semibold">{livro.isbn}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-3 text-indigo-600" />
                  <div>
                    <p className="text-xs text-gray-500">Ano de Publicação</p>
                    <p className="font-semibold">{livro.anoPublicacao}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <Package className="w-5 h-5 mr-3 text-indigo-600" />
                  <div>
                    <p className="text-xs text-gray-500">Quantidade</p>
                    <p className="font-semibold">
                      {livro.quantidadeDisponivel} de {livro.quantidadeTotal} disponíveis
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Criado em</span>
                    <span>{new Date(livro.createdAt).toLocaleDateString('pt-PT')}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                    <span>Atualizado em</span>
                    <span>{new Date(livro.updatedAt).toLocaleDateString('pt-PT')}</span>
                  </div>
                </div>

                <button
                  disabled={!livro.estaDisponivel}
                  className={`w-full py-3 px-4 rounded-lg font-semibold hover:cursor-pointer transition-colors ${
                    livro.estaDisponivel
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {livro.estaDisponivel ? 'Reservar Livro' : 'Indisponível'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {livros.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">Nenhum livro encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}