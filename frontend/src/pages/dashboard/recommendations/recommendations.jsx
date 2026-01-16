export default function Recommendations() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Recomendações Personalizadas por IA
        </h2>
        <p className="opacity-90">
          Baseadas no seu histórico de leitura e preferências
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition-shadow"
          >
            <div className="aspect-2/3 bg-linear-to-br from-blue-400 to-purple-500 rounded-lg mb-4"></div>
            <h3 className="font-semibold mb-1">Livro Recomendado {i}</h3>
            <p className="text-sm text-gray-600 mb-2">Autor Exemplo</p>
            <div className="flex items-center gap-2 text-sm text-indigo-600">
              <Star size={16} />
              <span>95% de compatibilidade</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};