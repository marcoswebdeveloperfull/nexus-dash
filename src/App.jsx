import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, TrendingUp, Package, Bell, Search, User, Settings, LogOut, X, ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        {icon && React.cloneElement(icon, { size: 18 })}
      </div>
      {!loading && trend && (
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

function App() {
  const [dados, setDados] = useState({ resumo: [], grafico: [], transacoes: [], notificacoes: [] });
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [telaAtiva, setTelaAtiva] = useState('dashboard');
  const [estaLogado, setEstaLogado] = useState(true);
  const [menuAberto, setMenuAberto] = useState(false);
  const [perfilAberto, setPerfilAberto] = useState(false);
  const [temNotificacao, setTemNotificacao] = useState(true);

  const menuRef = useRef(null);
  const perfilRef = useRef(null);

  useEffect(() => {
    const handleClickFora = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuAberto(false);
      if (perfilRef.current && !perfilRef.current.contains(e.target)) setPerfilAberto(false);
    };
    document.addEventListener('mousedown', handleClickFora);
    const buscarDados = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDados({
          resumo: [
            { title: "Receita", value: "R$ 52.410", trend: "+14%", color: "text-blue-600", bg: "bg-blue-50", icon: <DollarSign /> },
            { title: "Clientes", value: "2.840", trend: "+8.2%", color: "text-emerald-600", bg: "bg-emerald-50", icon: <Users /> },
            { title: "Pedidos", value: "1.422", trend: "-3%", color: "text-orange-600", bg: "bg-orange-50", icon: <Package /> },
            { title: "Conversão", value: "4.82%", trend: "+2.1%", color: "text-purple-600", bg: "bg-purple-50", icon: <TrendingUp /> }
          ],
          grafico: [
            { name: 'Seg', vendas: 4000 }, { name: 'Ter', vendas: 3000 }, { name: 'Qua', vendas: 5000 },
            { name: 'Qui', vendas: 2780 }, { name: 'Sex', vendas: 1890 }, { name: 'Sáb', vendas: 2390 }, { name: 'Dom', vendas: 3490 }
          ],
          transacoes: [
            { id: 1, customer: "Ana Silva", date: "Há 2 min", amount: "R$ 450,00", status: "Pago", initial: "AS", color: "bg-emerald-100 text-emerald-600" },
            { id: 2, customer: "Bruno Costa", date: "Há 15 min", amount: "R$ 1.200,00", status: "Pendente", initial: "BC", color: "bg-amber-100 text-amber-600" },
            { id: 3, customer: "Clara Souza", date: "Há 1 hora", amount: "R$ 89,90", status: "Pago", initial: "CS", color: "bg-emerald-100 text-emerald-600" },
          ],
          notificacoes: [
            { id: 1, text: "Novo pedido recebido", time: "2 min atrás" },
            { id: 2, text: "Meta de vendas alcançada!", time: "1 hora atrás" },
          ]
        });
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    buscarDados();
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  const transacoesFiltradas = dados.transacoes.filter(t => t.customer.toLowerCase().includes(busca.toLowerCase()));

  if (!estaLogado) return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-sm">
        <NexusLogo />
        <h2 className="text-2xl font-bold mt-4 mb-8">Nexus Dash</h2>
        <button onClick={() => setEstaLogado(true)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">Entrar no Sistema</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200 p-4 md:p-8 lg:p-12 font-sans text-slate-900 overflow-x-hidden">
      
      {/* HEADER COMPLETO RECONSTRUÍDO */}
      <nav className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setTelaAtiva('dashboard')}>
            <NexusLogo />
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 leading-none">Nexus Dash</h1>
              <p className="text-xs md:text-sm text-slate-500 mt-1">Dados em tempo real</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:flex-1 lg:w-64">
            <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
            <input type="text" placeholder="Buscar cliente..." value={busca} onChange={(e) => setBusca(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl lg:rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
          </div>

          <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
            {/* NOTIFICAÇÕES */}
            <div className="relative" ref={menuRef}>
              <button onClick={() => { setMenuAberto(!menuAberto); setTemNotificacao(false); }} className="p-2.5 bg-white border border-slate-200 rounded-full hover:bg-slate-50 relative transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                {temNotificacao && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>}
              </button>
              <AnimatePresence>
                {menuAberto && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
                    <div className="p-4 border-b bg-slate-50/50 flex justify-between items-center"><h4 className="font-bold text-sm">Notificações</h4><button onClick={() => setMenuAberto(false)}><X size={16}/></button></div>
                    <div className="max-h-60 overflow-y-auto">
                      {dados.notificacoes.map(n => (
                        <div key={n.id} className="p-4 border-b border-slate-50 hover:bg-slate-50"><p className="text-sm text-slate-700 font-medium">{n.text}</p><span className="text-[10px] text-slate-400">{n.time}</span></div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* PERFIL */}
            <div className="relative" ref={perfilRef}>
              <button onClick={() => setPerfilAberto(!perfilAberto)} className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:scale-105 transition-transform">MA</button>
              <AnimatePresence>
                {perfilAberto && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 py-2">
                    <div className="px-4 py-3 border-b mb-1"><p className="text-[10px] uppercase font-bold text-slate-400">Administrador</p><p className="text-sm font-bold text-slate-800">Marcos Amaral</p></div>
                    <button onClick={() => setTelaAtiva('perfil')} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"><User size={16} /> Perfil</button>
                    <button onClick={() => setTelaAtiva('configs')} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"><Settings size={16} /> Configs</button>
                    <div className="border-t mt-1 pt-1"><button onClick={() => setEstaLogado(false)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-medium"><LogOut size={16} /> Sair</button></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <AnimatePresence mode="wait">
        {telaAtiva === 'dashboard' ? (
          <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {loading 
                ? Array(4).fill(0).map((_, i) => <Card key={i} index={i} loading={true} title="Carregando..." />)
                : dados.resumo.map((item, i) => <Card key={i} index={i} {...item} loading={false} />)
              }
            </div>

            <div className="grid grid-cols-1 gap-10">
              {/* GRÁFICO */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold mb-8">Desempenho Semanal</h3>
                <div className="h-80 w-full flex items-center justify-center">
                  {loading ? <Loader2 className="animate-spin text-blue-600" size={40} /> : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={dados.grafico}>
                        <defs><linearGradient id="v" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} width={35} />
                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                        <Area type="monotone" dataKey="vendas" stroke="#3b82f6" strokeWidth={3} fill="url(#v)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* TABELA DE TRANSAÇÕES RECOLOCADA */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold mb-6">Transações Recentes</h3>
                {loading ? <div className="h-40 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={30} /></div> : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-y-3">
                      <thead><tr className="text-slate-400 text-xs uppercase text-left"><th className="pb-2">Cliente</th><th className="pb-2">Data</th><th className="pb-2">Valor</th><th className="pb-2 text-right">Status</th></tr></thead>
                      <tbody>
                        {transacoesFiltradas.map(t => (
                          <tr key={t.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="py-3 pl-2 rounded-l-2xl border-y border-l border-transparent">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${t.color}`}>{t.initial}</div>
                                <span className="font-semibold text-slate-700 text-sm">{t.customer}</span>
                              </div>
                            </td>
                            <td className="py-3 text-sm text-slate-500 border-y border-transparent">{t.date}</td>
                            <td className="py-3 font-bold text-slate-800 text-sm border-y border-transparent">{t.amount}</td>
                            <td className="py-3 pr-2 text-right rounded-r-2xl border-y border-r border-transparent">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${t.color}`}>{t.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          /* TELAS DE PERFIL E CONFIGS */
          <motion.div key="outra" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <button onClick={() => setTelaAtiva('dashboard')} className="flex items-center gap-2 text-blue-600 font-medium mb-6 hover:underline"><ArrowLeft size={16}/> Voltar ao Dashboard</button>
            <h2 className="text-2xl font-bold mb-4">{telaAtiva === 'perfil' ? 'Seu Perfil' : 'Configurações'}</h2>
            <p className="text-slate-500">Área em desenvolvimento para o Nexus Dash.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;