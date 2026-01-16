export default function BookCard({ livro, onSelect }) {
  return (
    <div
      onClick={() => onSelect(livro)}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
    >
      <div className="aspect-2/3 bg-linear-to-br from-indigo-500 to-purple-600 relative">
        <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold opacity-20">
          📚
        </div>
        {livro.estaDisponivel ? (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Disponível
          </span>
        ) : (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Indisponível
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 truncate">
          {livro.titulo}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{livro.autor}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{livro.anoPublicacao}</span>
          <span className="text-indigo-600 font-medium">
            {livro.quantidadeDisponivel}/{livro.quantidadeTotal}
          </span>
        </div>
      </div>
    </div>
  );
}