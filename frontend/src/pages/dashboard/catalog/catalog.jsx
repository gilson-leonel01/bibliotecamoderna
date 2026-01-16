import { useState } from "react";

export default function Catalogo() {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [, setSelectedBook] = useState(null);

  const fetchLivros = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5071/api/livros");
      if (response.ok) {
        const data = await response.json();
        setLivros(Array.isArray(data) ? data : [data]);
      }
    } catch (err) {
      console.error("Erro ao carregar livros:", err);
      setLivros([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar por título, autor, ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
            <Filter size={20} />
            Filtros
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {livros
            .filter(
              (livro) =>
                livro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                livro.autor?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((livro) => (
              <BookCard
                key={livro.id}
                livro={livro}
                onSelect={setSelectedBook}
              />
            ))}
        </div>
      )}
    </div>
  );
}
