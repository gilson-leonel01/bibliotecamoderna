export default function LoanRow({
  livro,
  dataEmprestimo,
  dataDevolucao,
  status,
  diasRestantes,
}) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4 font-medium">{livro}</td>
      <td className="p-4 text-gray-600">{dataEmprestimo}</td>
      <td className="p-4 text-gray-600">{dataDevolucao}</td>
      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            diasRestantes >= 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}{" "}
          {diasRestantes >= 0
            ? `(${diasRestantes} dias)`
            : `(${Math.abs(diasRestantes)} dias)`}
        </span>
      </td>

      <td className="p-4">
        <button className="text-indigo-600 font-medium hover:text-indigo-700 hover:cursor-pointer">
          Renovar
        </button>
      </td>
    </tr>
  );
};