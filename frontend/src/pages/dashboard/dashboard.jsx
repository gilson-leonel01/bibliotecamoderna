import { useState, useEffect } from 'react';
import { 
  BookOpen, Search, Filter, User, Menu, X, Home, Clock, DollarSign,
  TrendingUp, AlertCircle, Star, Bell, Settings, BarChart3, Users, BookMarked
} from 'lucide-react';

const mockUser = {
  id: 1,
  nome: "João Silva",
  tipo: "leitor", 
  email: "joao.silva@gmail.com",
  multasPendentes: 0,
  emprestimosAtivos: 2
};

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user] = useState(mockUser);

  useEffect(() => {
    if (currentPage === 'catalogo') {
      fetchLivros();
    }
  }, [currentPage]);

  const fetchLivros = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5071/api/livros');
      if (response.ok) {
        const data = await response.json();
        setLivros(Array.isArray(data) ? data : [data]);
      }
    } catch (err) {
      console.error('Erro ao carregar livros:', err);
      setLivros([
        {
          id: 1,
          titulo: "Sagrada Esperança",
          isbn: "1237-0001-3467-1",
          anoPublicacao: 1987,
          quantidadeTotal: 5,
          quantidadeDisponivel: 3,
          autor: "Agostinho Neto",
          categoria: "Poesia",
          estaDisponivel: true,
          capa: "https://img.wook.pt/images/sagrada-esperanca-agostinho-neto/MXwxMDQ2MDR8MTM0NjcxfDEzODM1ODEwODYwMDA=/500x"
        },
        {
          id: 2,
          titulo: "O Alquimista",
          isbn: "500-122-7766-110-5",
          anoPublicacao: 1988,
          quantidadeTotal: 3,
          quantidadeDisponivel: 0,
          autor: "Paulo Coelho",
          categoria: "Ficção",
          estaDisponivel: false,
          capa: "https://upload.wikimedia.org/wikipedia/pt/5/51/O_Alquimista.jpg"
        },
        {
          id: 3,
          titulo: "1984",
          isbn: "500-122-7766-110-6",
          anoPublicacao: 1949,
          quantidadeTotal: 4,
          quantidadeDisponivel: 2,
          autor: "George Orwell",
          categoria: "Distopia",
          estaDisponivel: true,
          capa: "https://i.ebayimg.com/images/g/lJMAAOSwwBxlUsCc/s-l1600.jpg"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const Sidebar = () => (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-linear-to-b from-indigo-900 to-indigo-800 text-white transition-all duration-300 flex flex-col`}>
      <div className="p-4 flex items-center justify-between border-b border-indigo-700">
        {sidebarOpen && <h1 className="text-xl font-bold">Open Brain Library</h1>}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-indigo-700 rounded">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavItem icon={<Home size={20} />} label="Dashboard" page="dashboard" />
        <NavItem icon={<BookOpen size={20} />} label="Catálogo" page="catalogo" />
        <NavItem icon={<Clock size={20} />} label="Meus Empréstimos" page="emprestimos" />
        <NavItem icon={<DollarSign size={20} />} label="Minhas Multas" page="multas" />
        <NavItem icon={<Star size={20} />} label="Recomendações" page="recomendacoes" />
        
        {user.tipo === 'admin' && (
          <>
            <div className="border-t border-indigo-700 my-4"></div>
            <NavItem icon={<Users size={20} />} label="Usuários" page="usuarios" />
            <NavItem icon={<BarChart3 size={20} />} label="Relatórios" page="relatorios" />
            <NavItem icon={<TrendingUp size={20} />} label="BI & Analytics" page="bi" />
          </>
        )}
      </nav>

      <div className="p-4 border-t border-indigo-700">
        <NavItem icon={<Settings size={20} />} label="Configurações" page="config" />
      </div>
    </div>
  );

  const NavItem = ({ icon, label, page }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
        currentPage === page 
          ? 'bg-indigo-600 text-white' 
          : 'hover:bg-indigo-700 text-indigo-100'
      }`}
    >
      {icon}
      {sidebarOpen && <span>{label}</span>}
    </button>
  );

  const Header = () => (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {currentPage === 'dashboard' && 'Dashboard'}
            {currentPage === 'catalogo' && 'Catálogo de Livros'}
            {currentPage === 'emprestimos' && 'Meus Empréstimos'}
            {currentPage === 'multas' && 'Minhas Multas'}
            {currentPage === 'recomendacoes' && 'Recomendações para Você'}
          </h2>
          <p className="text-gray-600 text-sm">Bem-vindo de volta, {user.nome}!</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
            <User size={20} className="text-gray-600" />
            <span className="font-medium">{user.nome}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={<BookMarked className="text-blue-600" size={24} />}
          title="Empréstimos Ativos"
          value={user.emprestimosAtivos}
          color="bg-blue-50"
        />
        <StatCard
          icon={<Clock className="text-orange-600" size={24} />}
          title="Aguardando Devolução"
          value="1"
          subtitle="Vence em 3 dias"
          color="bg-orange-50"
        />
        <StatCard
          icon={<DollarSign className="text-red-600" size={24} />}
          title="Multas Pendentes"
          value={`${user.multasPendentes} Kz`}
          color="bg-red-50"
        />
        <StatCard
          icon={<Star className="text-green-600" size={24} />}
          title="Livros Lidos"
          value="24"
          subtitle="Este ano"
          color="bg-green-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            <ActivityItem 
              action="Empréstimo realizado"
              book="A Liberdade"
              date="Hoje, 14:30"
              status="success"
            />
            <ActivityItem 
              action="Devolução realizada"
              book="O Alquimista"
              date="Ontem, 10:15"
              status="success"
            />
            <ActivityItem 
              action="Empréstimo atrasado"
              book="1984"
              date="Há 2 dias"
              status="warning"
            />
          </div>
        </div>

        <div className="bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Recomendação IA</h3>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 mb-4">
            <p className="text-sm mb-2">Baseado no seu histórico:</p>
            <p className="font-semibold">"Cem Anos de Solidão"</p>
            <p className="text-sm opacity-90">Gabriel García Márquez</p>
          </div>
          <button className="w-full bg-white text-indigo-600 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
            Ver Detalhes
          </button>
        </div>
      </div>

      <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start gap-4">
          <AlertCircle className="text-blue-600 mt-1" size={24} />
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Dica do Sistema</h4>
            <p className="text-gray-600">Você tem um empréstimo vencendo em breve. Renove ou devolva para evitar multas!</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Catalogo = () => (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
          {livros.filter(livro => 
            livro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            livro.autor?.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((livro) => (
            <BookCard key={livro.id} livro={livro} onSelect={setSelectedBook} />
          ))}
        </div>
      )}
    </div>
  );

  const MeusEmprestimos = () => (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-700">Livro</th>
              <th className="text-left p-4 font-semibold text-gray-700">Data Empréstimo</th>
              <th className="text-left p-4 font-semibold text-gray-700">Data Devolução</th>
              <th className="text-left p-4 font-semibold text-gray-700">Status</th>
              <th className="text-left p-4 font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            <EmprestimoRow 
              livro="A Liberdade"
              dataEmprestimo="05/01/2026"
              dataDevolucao="19/01/2026"
              status="Em dia"
              diasRestantes={10}
            />
            <EmprestimoRow 
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

  const MinhasMultas = () => (
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
          <MultaCard 
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
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'catalogo' && <Catalogo />}
          {currentPage === 'emprestimos' && <MeusEmprestimos />}
          {currentPage === 'multas' && <MinhasMultas />}
          {currentPage === 'recomendacoes' && <Recomendacoes />}
        </div>
      </div>

      {selectedBook && (
        <BookDetailModal livro={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}

const StatCard = ({ icon, title, value, subtitle, color }) => (
  <div className={`${color} rounded-xl p-6`}>
    <div className="flex items-center justify-between mb-4">
      {icon}
    </div>
    <p className="text-sm text-gray-600 mb-1">{title}</p>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
  </div>
);

const ActivityItem = ({ action, book, date, status }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
    <div className={`w-2 h-2 rounded-full ${status === 'success' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
    <div className="flex-1">
      <p className="font-medium text-gray-800">{action}</p>
      <p className="text-sm text-gray-600">{book}</p>
    </div>
    <p className="text-sm text-gray-500">{date}</p>
  </div>
);

const BookCard = ({ livro, onSelect }) => (
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
      <h3 className="font-semibold text-gray-800 mb-1 truncate">{livro.titulo}</h3>
      <p className="text-sm text-gray-600 mb-2">{livro.autor}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">{livro.anoPublicacao}</span>
        <span className="text-indigo-600 font-medium">{livro.quantidadeDisponivel}/{livro.quantidadeTotal}</span>
      </div>
    </div>
  </div>
);

const BookDetailModal = ({ livro, onClose }) => (
  <div className="fixed inset-0 bg-indigo-500 bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{livro.titulo}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
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
              <p className="font-semibold">{livro.quantidadeDisponivel} de {livro.quantidadeTotal} disponíveis</p>
            </div>
          </div>
        </div>

        <button 
          disabled={!livro.estaDisponivel}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            livro.estaDisponivel
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {livro.estaDisponivel ? 'Solicitar Empréstimo' : 'Indisponível no Momento'}
        </button>
      </div>
    </div>
  </div>
);

const EmprestimoRow = ({ livro, dataEmprestimo, dataDevolucao, status, diasRestantes }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-4 font-medium">{livro}</td>
    <td className="p-4 text-gray-600">{dataEmprestimo}</td>
    <td className="p-4 text-gray-600">{dataDevolucao}</td>
    <td className="p-4">
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        diasRestantes >= 0 
          ? 'bg-green-100 text-green-700' 
          : 'bg-red-100 text-red-700'
      }`}>
        {status} {diasRestantes >= 0 ? `(${diasRestantes} dias)` : `(${Math.abs(diasRestantes)} dias)`}
      </span>
    </td>
    <td className="p-4">
      <button className="text-indigo-600 hover:text-indigo-700 font-medium">Renovar</button>
    </td>
  </tr>
);

const MultaCard = ({ livro, diasAtraso, valor, dataDevolucao }) => (
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

const Recomendacoes = () => (
  <div className="p-6 space-y-6">
    <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
      <h2 className="text-2xl font-bold mb-2">🤖 Recomendações Personalizadas por IA</h2>
      <p className="opacity-90">Baseadas no seu histórico de leitura e preferências</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition-shadow">
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
