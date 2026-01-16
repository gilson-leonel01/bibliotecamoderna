export default function BookDetailModal({ livro, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-indigo-500 bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{livro.titulo}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="aspect-2/3 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-8xl">
              <img src={livro.capa} alt={livro.titulo} />
            </div>

            <div className="md:col-span-2 space-y-4">
              <div>
                <p className="text-sm text-gray-600">Autor</p>
                <p className="font-semibold">{livro.autor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">ISBN</p>
                <p className="font-semibold">{livro.isbn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ano de Publicação</p>
                <p className="font-semibold">{livro.anoPublicacao}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Categoria</p>
                <p className="font-semibold">{livro.categoria}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Disponibilidade</p>
                <p className="font-semibold">
                  {livro.quantidadeDisponivel} de {livro.quantidadeTotal}{" "}
                  disponíveis
                </p>
              </div>
            </div>
          </div>

          <button
            disabled={!livro.estaDisponivel}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              livro.estaDisponivel
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {livro.estaDisponivel
              ? "Solicitar Empréstimo"
              : "Indisponível no Momento"}
          </button>
        </div>
      </div>
    </div>
  );
}
