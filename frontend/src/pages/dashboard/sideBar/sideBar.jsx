import { useState } from "react";
import {
  Home,
  BookOpen,
  Clock,
  DollarSign,
  Star,
  Users,
  BarChart3,
  TrendingUp,
  Settings,
  Menu,
  X,
} from "lucide-react";

const mockUser = {
  id: 1,
  nome: "João Silva",
  tipo: "leitor",
  email: "joao.silva@gmail.com",
  multasPendentes: 0,
  emprestimosAtivos: 2,
};

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user] = useState(mockUser);

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-linear-to-b from-indigo-900 to-indigo-800 text-white transition-all duration-300 flex flex-col`}
    >
      <div className="p-4 flex items-center justify-between border-b border-indigo-700">
        {sidebarOpen && (
          <h1 className="text-xl font-bold">Open Brain Library</h1>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-indigo-700 rounded"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavItem icon={<Home size={20} />} label="Dashboard" page="dashboard" />
        <NavItem
          icon={<BookOpen size={20} />}
          label="Catálogo"
          page="catalogo"
        />
        <NavItem
          icon={<Clock size={20} />}
          label="Meus Empréstimos"
          page="emprestimos"
        />
        <NavItem
          icon={<DollarSign size={20} />}
          label="Minhas Multas"
          page="multas"
        />
        <NavItem
          icon={<Star size={20} />}
          label="Recomendações"
          page="recomendacoes"
        />

        {user.tipo === "admin" && (
          <>
            <div className="border-t border-indigo-700 my-4"></div>
            <NavItem
              icon={<Users size={20} />}
              label="Usuários"
              page="usuarios"
            />
            <NavItem
              icon={<BarChart3 size={20} />}
              label="Relatórios"
              page="relatorios"
            />
            <NavItem
              icon={<TrendingUp size={20} />}
              label="BI & Analytics"
              page="bi"
            />
          </>
        )}
      </nav>

      <div className="p-4 border-t border-indigo-700">
        <NavItem
          icon={<Settings size={20} />}
          label="Configurações"
          page="config"
        />
      </div>
    </div>
  );
}
