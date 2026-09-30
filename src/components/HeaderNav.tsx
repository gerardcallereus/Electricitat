import React, { useState, useEffect } from 'react';
import { ModuleId } from '../types';
import { Zap, Clock, User, CheckCircle2, ChevronRight, Menu, X, Award } from 'lucide-react';

interface HeaderNavProps {
  currentModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  studentName: string;
  studentGroup: string;
  onEditStudent: () => void;
  completedBlocks: number[];
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentModule,
  onSelectModule,
  studentName,
  studentGroup,
  onEditStudent,
  completedBlocks,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(180 * 60); // 3 hours

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return `${h}h ${m < 10 ? '0' : ''}${m}m`;
  };

  const navItems: { id: ModuleId; label: string; time: string; blocNum: number }[] = [
    { id: 'dashboard', label: 'Inici & Ruta', time: '0 min', blocNum: 0 },
    { id: 'b1-conductors', label: 'B1: Conductors & Energia', time: '25 min', blocNum: 1 },
    { id: 'b2-simbologia', label: 'B2: Circuits & Simbologia', time: '30 min', blocNum: 2 },
    { id: 'b3-llei-dohm', label: 'B3: Llei d\'Ohm & Unitats', time: '40 min', blocNum: 3 },
    { id: 'b4-codi-colors', label: 'B4: Codi de Colors', time: '35 min', blocNum: 4 },
    { id: 'b5-laboratori-multimetre', label: 'B5: Lab Multímetre', time: '50 min', blocNum: 5 },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand & Course title */}
        <div
          onClick={() => onSelectModule('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
            <Zap size={22} className="fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-white tracking-tight flex items-center gap-1.5">
                Càpsula d'Electricitat
              </span>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 font-extrabold px-2 py-0.5 rounded-full border border-amber-500/30">
                3 HORES
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">De l'Àtom al Multímetre</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {navItems.map((item) => {
            const isActive =
              currentModule === item.id ||
              (item.blocNum === 1 && currentModule.startsWith('b1')) ||
              (item.blocNum === 2 && currentModule.startsWith('b2')) ||
              (item.blocNum === 3 && currentModule.startsWith('b3')) ||
              (item.blocNum === 4 && currentModule.startsWith('b4')) ||
              (item.blocNum === 5 && currentModule.startsWith('b5'));

            const isDone = item.blocNum > 0 && completedBlocks.includes(item.blocNum);

            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {isDone && <CheckCircle2 size={13} className="text-emerald-400" />}
                <span>{item.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isActive ? 'bg-amber-600/30 text-slate-900' : 'bg-slate-800 text-slate-400'}`}>
                  {item.time}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Student Profile & 3h Timer Widget */}
        <div className="flex items-center gap-3">
          {/* Timer pill */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-mono text-amber-300">
            <Clock size={14} className="text-amber-400" />
            <span className="font-bold">{formatTime(timeRemainingSeconds)}</span>
          </div>

          {/* Student Badge */}
          <button
            onClick={onEditStudent}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-medium transition"
            title="Prem per canviar el nom de l'alumne/a"
          >
            <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-[10px]">
              <User size={12} />
            </div>
            <div className="text-left hidden sm:block max-w-[120px] truncate">
              <span className="font-bold block text-[11px] truncate leading-tight">
                {studentName || 'Sense nom'}
              </span>
              <span className="text-[10px] text-slate-400 block leading-tight truncate">
                {studentGroup || 'Afegir grup'}
              </span>
            </div>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectModule(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between ${
                currentModule === item.id
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-xs opacity-75 font-mono">{item.time}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
