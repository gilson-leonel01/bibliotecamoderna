export default function MyLoans() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-700">
                Livro
              </th>
              <th className="text-left p-4 font-semibold text-gray-700">
                Data Empréstimo
              </th>
              <th className="text-left p-4 font-semibold text-gray-700">
                Data Devolução
              </th>
              <th className="text-left p-4 font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left p-4 font-semibold text-gray-700">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            <Loanrow
              livro="A Liberdade"
              dataEmprestimo="05/01/2026"
              dataDevolucao="19/01/2026"
              status="Em dia"
              diasRestantes={10}
            />

            <LoanRow
              livro="1984"
              dataEmprestimo="28/12/2025"
              dataDevolucao="11/01/2026"
              status="Atrasado"
              diasRestantes={-2}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
