export default function MyPenalties () {
  return(
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Multas Pendentes</h3>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total a Pagar</p>
            <p className="text-3xl font-bold text-red-600">200 Kz</p>
          </div>
        </div>

        <div className="space-y-4">
          <PenaltyCard 
            livro="1984"
            diasAtraso={2}
            valor={200}
            dataDevolucao="11/01/2026"
          />
        </div>

        <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
          Pagar Todas as Multas
        </button>
      </div>
    </div>
  )
};