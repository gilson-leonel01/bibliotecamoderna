export default function PenaltyCard ({ livro, diasAtraso, valor, dataDevolucao }) {
  return(
    <div className="border border-red-200 bg-red-50 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-800">{livro}</p>
          <p className="text-sm text-gray-600">Devolução prevista: {dataDevolucao}</p>
          <p className="text-sm text-red-600 mt-1">{diasAtraso} dias de atraso × 100 Kz</p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-red-600">{valor} Kz</p>
        </div>
      </div>
    </div>
  );
};