import { useState, useEffect, useRef } from 'react';

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const fecharMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAberto(false);
      }
    };
    document.addEventListener('mousedown', fecharMenu);
    return () => document.removeEventListener('mousedown', fecharMenu);
  }, []);

  return (
    <header className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-md sticky top-0 z-40">
      {/* Lado Esquerdo: Logo e Texto */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Nexus Dash</h1>
        <p className="text-xs text-slate-500">Dados em tempo real</p>
      </div>

      {/* Lado Direito: Busca e Perfil */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar cliente..." 
            className="bg-slate-100 border-none rounded-full px-4 py-2 text-sm w-64 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
          />
        </div>

        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <span className="text-xl">🔔</span>
        </button>

        {/* Menu do Usuário */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setMenuAberto(!menuAberto)}
            className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
          >
            MA
          </button>

          {menuAberto && (
            <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-5 py-4 border-b border-slate-50">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Administrador</p>
                <p className="text-sm font-bold text-slate-800 leading-none mt-1">Marcos Amaral</p>
              </div>

              <div className="p-2">
                <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg flex items-center gap-3 transition-colors">
                  <span className="text-lg opacity-60">👤</span> Perfil
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg flex items-center gap-3 transition-colors">
                  <span className="text-lg opacity-60">⚙️</span> Configs
                </button>
              </div>

              <div className="border-t border-slate-50 p-2">
                <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-3 font-semibold transition-colors">
                  <span className="text-lg">🚪</span> Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}