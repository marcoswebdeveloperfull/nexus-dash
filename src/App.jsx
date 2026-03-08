import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, TrendingUp, Package, Bell, Search, User, Settings, LogOut, X, ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes Auxiliares (Logo e Card) mantidos para organização
const NexusLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-9 md:h-9 text-blue-600 shrink-0">
    <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="2" r="1.5" fill="currentColor"/><circle cx="12" cy="22" r="1.5" fill="currentColor"/>
    <circle cx="3" cy="7" r="1.5" fill="currentColor"/><circle cx="21" cy="17" r="1.5" fill="currentColor"/>
    <circle cx="3" cy="17" r="1.5" fill="currentColor"/><circle cx="21" cy="7" r="1.5" fill="currentColor"/>
  </svg>
);

const Card = ({ title, value, icon, trend, color, bg, index, loading }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between h-36 group cursor-pointer hover:shadow-md transition-all">
    <div className="flex justify-between items-start">
      <div className={`p-2.5 rounded-xl ${bg} ${color} group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
        {React.cloneElement(icon, { size: 18 })}
      </div>
      {!loading && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trend.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
          {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-xs text-slate-400 font-medium">{title}</p>
      {loading ? (
        <div className="h-6 w-24 bg-slate-100 animate-pulse rounded mt-2"></div>
      ) : (
        <h2 className="text-xl font-bold mt-1 tracking-tight text-slate-800 leading-none">{value}</h2>
      )}
    </div>
  </motion.div>
);

// Componente Header (simplificado para o exemplo)
const Header = ({ busca, setBusca, temNotificacao, setTelaAtiva, handleLogout }) => {
  const [perfilAberto, setPerfilAberto] = useState(false);
  const perfilRef = useRef(null);

  return (
    <nav className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setTelaAtiva('dashboard')}>
        <NexusLogo />
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800">Nexus Dash</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
          <input type="text" placeholder="Buscar..." value={busca} onChange={(e) => setBusca(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
        </div>
        <button onClick={handleLogout} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"><LogOut size={20}/></button>
      </div>
    </nav>
  );
};

function App() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [telaAtiva, setTelaAtiva] = useState('dashboard');
  const [estaLogado, setEstaLogado] = useState(true);

  // EFEITO PARA BUSCAR DADOS DA API
  useEffect(() => {
    const buscarDados = async () => {
      setLoading(true);
      try {
        // Simulando uma chamada de API (Substitua pela sua URL real no futuro)
        const response = await new Promise((resolve) => 
          setTimeout(() => resolve({
            resumo: [
              { title: "Receita", value: "R$ 52.410", trend: "+14%", color: "text-blue-600", bg: "bg-blue-50", icon: <DollarSign /> },
              { title: "Clientes", value: "2.840", trend: "+8.2%", color: "text-emerald-600", bg: "bg-emerald-50", icon: <Users /> },
              { title: "Pedidos", value: "1.422", trend: "-3%", color: "text-orange-600", bg: "bg-orange-50", icon: <Package /> },
              { title: "Conversão", value: "4.82%", trend: "+2.1%", color: "text-purple-600", bg: "bg-purple-50", icon: <TrendingUp /> }
            ],
            grafico: [
              { name: 'Seg', vendas: 4000 }, { name: 'Ter', vendas: 3000 }, { name: 'Qua', vendas: 5000 },
              { name: 'Qui', vendas: 2780 }, { name: 'Sex', vendas: 1890 }, { name: 'Sáb', vendas: 2390 }, { name: 'Dom', vendas: 3490 }
            ]
          }), 1500)
        );
        setDados(response);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, []);

  if (!estaLogado) return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <button onClick={() => setEstaLogado(true)} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Entrar no Nexus Dash</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200 p-4 md:p-8 lg:p-12 font-sans text-slate-900">
      <Header busca={busca} setBusca={setBusca} setTelaAtiva={setTelaAtiva} handleLogout={() => setEstaLogado(false)} />

      <AnimatePresence mode="wait">
        {telaAtiva === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* GRID DE CARDS COM LOADING STATE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {(loading ? Array(4).fill({}) : dados.resumo).map((item, i) => (
                <Card key={i} index={i} {...item} loading={loading} />
              ))}
            </div>

            {/* GRÁFICO COM LOADING STATE */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold mb-8">Desempenho de Vendas Real</h3>
              <div className="h-80 w-full flex items-center justify-center">
                {loading ? (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Loader2 className="animate-spin" size={40} />
                    <p className="text-sm">Carregando métricas...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dados.grafico}>
                      <defs>
                        <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} width={35} />
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                      <Area type="monotone" dataKey="vendas" stroke="#3b82f6" strokeWidth={3} fill="url(#colorVendas)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;