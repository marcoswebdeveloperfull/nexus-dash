import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, TrendingUp, Package, Bell, Search, User, Settings, LogOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const data = [
  { name: 'Seg', vendas: 4000 },
  { name: 'Ter', vendas: 3000 },
  { name: 'Qua', vendas: 5000 },
  { name: 'Qui', vendas: 2780 },
  { name: 'Sex', vendas: 1890 },
  { name: 'Sáb', vendas: 2390 },
  { name: 'Dom', vendas: 3490 },
];

const transactions = [
  { id: 1, customer: "Ana Silva", date: "Há 2 min", amount: "R$ 450,00", status: "Pago", initial: "AS", color: "bg-emerald-100 text-emerald-600" },
  { id: 2, customer: "Bruno Costa", date: "Há 15 min", amount: "R$ 1.200,00", status: "Pendente", initial: "BC", color: "bg-amber-100 text-amber-600" },
  { id: 3, customer: "Clara Souza", date: "Há 1 hora", amount: "R$ 89,90", status: "Pago", initial: "CS", color: "bg-emerald-100 text-emerald-600" },
  { id: 4, customer: "Diego Lima", date: "Há 3 horas", amount: "R$ 540,00", status: "Cancelado", initial: "DL", color: "bg-red-100 text-red-600" },
];

const notificationsData = [
  { id: 1, text: "Novo pedido de R$ 450,00 recebido", time: "2 min atrás" },
  { id: 2, text: "Bruno Costa iniciou um pagamento", time: "15 min atrás" },
  { id: 3, text: "Meta diária de vendas alcançada! 🎉", time: "1 hora atrás" },
];

const NexusLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-9 md:h-9 text-blue-600 shrink-0">
    <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="2" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="22" r="1.5" fill="currentColor"/>
    <circle cx="3" cy="7" r="1.5" fill="currentColor"/>
    <circle cx="21" cy="17" r="1.5" fill="currentColor"/>
    <circle cx="3" cy="17" r="1.5" fill="currentColor"/>
    <circle cx="21" cy="7" r="1.5" fill="currentColor"/>
  </svg>
);

const Header = ({ busca, setBusca, notifications, temNotificacao, setTemNotificacao }) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [perfilAberto, setPerfilAberto] = useState(false);
  const menuRef = useRef(null);
  const perfilRef = useRef(null);

  useEffect(() => {
    const handleClickFora = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuAberto(false);
      if (perfilRef.current && !perfilRef.current.contains(e.target)) setPerfilAberto(false);
    };
    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  return (
    <nav className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
      <div className="flex items-center justify-between w-full lg:w-auto">
        <div className="flex items-center gap-3">
          <NexusLogo />
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 leading-none">Nexus Dash</h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Dados em tempo real</p>
          </div>
        </div>
        <div className="lg:hidden" ref={perfilRef}>
           <button onClick={() => setPerfilAberto(!perfilAberto)} className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">MA</button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
        <div className="relative w-full sm:flex-1 lg:w-64">
          <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Buscar cliente..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl lg:rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
          />
        </div>

        <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => { setMenuAberto(!menuAberto); setTemNotificacao(false); }}
              className="p-2.5 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              {temNotificacao && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>}
            </button>

            <AnimatePresence>
              {menuAberto && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-3 w-[calc(100vw-2rem)] sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
                  <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                    <h4 className="font-bold text-sm">Notificações</h4>
                    <button onClick={() => setMenuAberto(false)}><X size={16}/></button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <p className="text-sm text-slate-700 leading-tight font-medium">{n.text}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative hidden lg:block" ref={perfilRef}>
            <button onClick={() => setPerfilAberto(!perfilAberto)} className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:scale-105 transition-transform">MA</button>
            <AnimatePresence>
              {perfilAberto && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 py-2">
                  <div className="px-4 py-3 border-b border-slate-50 mb-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Administrador</p>
                    <p className="text-sm font-bold text-slate-800">Marcos Amaral</p>
                  </div>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"><User size={16} /> Perfil</button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"><Settings size={16} /> Configs</button>
                  <div className="border-t mt-1 pt-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-medium transition-colors"><LogOut size={16} /> Sair</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Card = ({ title, value, icon, trend, color, bg, index }) => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between h-36 group cursor-pointer hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div className={`p-2.5 rounded-xl ${bg} ${color} transition-colors group-hover:bg-blue-600 group-hover:text-white`}>
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trend.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
        {trend}
      </span>
    </div>
    <div>
      <p className="text-xs text-slate-400 font-medium">{title}</p>
      <h2 className="text-xl font-bold mt-1 tracking-tight text-slate-800 leading-none">{value}</h2>
    </div>
  </motion.div>
);

function App() {
  const [busca, setBusca] = useState("");
  const [temNotificacao, setTemNotificacao] = useState(true);

  const transacoesFiltradas = transactions.filter(t => t.customer.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-200 p-4 md:p-8 lg:p-12 font-sans text-slate-900 overflow-x-hidden">
      <Header 
        busca={busca} 
        setBusca={setBusca} 
        notifications={notificationsData} 
        temNotificacao={temNotificacao} 
        setTemNotificacao={setTemNotificacao} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
        <Card index={0} title="Receita" value="R$ 45.231" icon={<DollarSign />} trend="+12%" color="text-blue-600" bg="bg-blue-50" />
        <Card index={1} title="Clientes" value="+2.350" icon={<Users />} trend="+5.4%" color="text-emerald-600" bg="bg-emerald-50" />
        <Card index={2} title="Pedidos" value="1.234" icon={<Package />} trend="-2%" color="text-orange-600" bg="bg-orange-50" />
        <Card index={3} title="Conversão" value="4.35%" icon={<TrendingUp />} trend="+1.2%" color="text-purple-600" bg="bg-purple-50" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:gap-10">
        <motion.div className="bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h3 className="text-lg font-bold">Desempenho Semanal</h3>
            <select className="w-full sm:w-auto bg-slate-50 text-sm font-medium rounded-lg px-3 py-2 outline-none border border-slate-100">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>
          <div className="h-62.5 md:h-87.5 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} width={35} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="vendas" stroke="#3b82f6" strokeWidth={3} fill="url(#colorVendas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div className="bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Transações</h3>
            <span className="text-[10px] sm:text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {transacoesFiltradas.length} itens
            </span>
          </div>
          <div className="relative overflow-x-auto -mx-5 md:mx-0">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-slate-400 text-[10px] md:text-sm uppercase tracking-wider text-left">
                  <th className="font-medium pb-2 pl-2">Cliente</th>
                  <th className="font-medium pb-2 hidden sm:table-cell">Data</th>
                  <th className="font-medium pb-2">Valor</th>
                  <th className="font-medium pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {transacoesFiltradas.map((t) => (
                  <tr key={t.id} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-3 pl-2 rounded-l-2xl border-y border-l border-transparent group-hover:border-slate-100">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-[10px] md:text-xs shrink-0 ${t.color.split(' ')[0]} ${t.color.split(' ')[1]}`}>
                          {t.initial}
                        </div>
                        <span className="font-semibold text-slate-700 text-xs md:text-sm truncate max-w-20 md:max-w-none">{t.customer}</span>
                      </div>
                    </td>
                    <td className="py-3 text-[10px] md:text-sm text-slate-500 border-y border-transparent hidden sm:table-cell">{t.date}</td>
                    <td className="py-3 font-bold text-slate-800 text-xs md:text-sm border-y border-transparent">{t.amount}</td>
                    <td className="py-3 pr-2 text-right rounded-r-2xl border-y border-r border-transparent">
                      <span className={`px-2 py-1 rounded-full text-[9px] md:text-xs font-bold whitespace-nowrap ${t.color}`}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;