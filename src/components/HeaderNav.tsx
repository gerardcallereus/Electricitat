import React, { useState, useEffect } from 'react';
import { ModuleId } from '../types';
import { Zap, Clock, User, CheckCircle2, Lock, Menu, X, AlertCircle } from 'lucide-react';

interface HeaderNavProps {
  currentModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  studentName: string;
  studentGroup: string;
  onEditStudent: () => void;
  completedBlocks: number[];
  unlockedBlocks: number[];
  isRegistered: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentModule,
  onSelectModule,
  studentName,
  studentGroup,
  onEditStudent,
  completedBlocks,
  unlockedBlocks,
  isRegistered,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(180 * 60);
  const [lockAlert, setLockAlert] = useState<string | null>(null);

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
    { id: 'dashboard', label: 'Inici', time: '0m', blocNum: 0 },
    { id: 'b1-que-es-electricitat', label: '1. Què és?', time: '25m', blocNum: 1 },
    { id: 'b2-transformacions', label: '2. Energia', time: '25m', blocNum: 2 },
    { id: 'b3-simbologia-circuits', label: '3. Circuits', time: '30m', blocNum: 3 },
    { id: 'b4-llei-dohm', label: '4. Llei d\'Ohm', time: '35m', blocNum: 4 },
    { id: 'b5-codi-colors', label: '5. Resistències', time: '25m', blocNum: 5 },
    { id: 'b6-multimetre', label: '6. Multímetre', time: '40m', blocNum: 6 },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.blocNum === 0) {
      onSelectModule('dashboard');
      return;
    }

    if (!isRegistered) {
      setLockAlert('⚠️ Cal introduir el Nom, Cognoms i el Grup per començar la càpsula.');
      setTimeout(() => setLockAlert(null), 3000);
      onEditStudent();
      return;
    }

    if (!unlockedBlocks.includes(item.blocNum)) {
      setLockAlert(`🔒 El Bloc ${item.blocNum} està bloquejat! Has de completar el Bloc ${item.blocNum - 1} primer.`);
      setTimeout(() => setLockAlert(null), 3000);
      return;
    }

    onSelectModule(item.id);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50 shadow-sm text-stone-800">
      {/* Lock alert toast */}
      {lockAlert && (
        <div className="bg-amber-500 text-stone-950 px-4 py-2 text-center text-xs font-bold flex items-center justify-center gap-2">
          <AlertCircle size={16} />
          <span>{lockAlert}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand & Course title */}
        <div
          onClick={() => onSelectModule('dashboard')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white font-bold flex items-center justify-center shadow-sm group-hover:scale-105 transition">
            <Zap size={22} className="fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-stone-900 tracking-tight">
                Càpsula d'Electricitat
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                3 HORES
              </span>
            </div>
            <p className="text-[11px] text-stone-500">De l'Àtom al Multímetre</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
          {navItems.map((item) => {
            const isActive = currentModule === item.id;
            const isDone = item.blocNum > 0 && completedBlocks.includes(item.blocNum);
            const isUnlocked = item.blocNum === 0 || (isRegistered && unlockedBlocks.includes(item.blocNum));

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-sm border border-stone-200/80 font-bold'
                    : isUnlocked
                    ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                    : 'text-stone-400 opacity-60 cursor-not-allowed'
                }`}
                title={!isUnlocked ? `Bloc ${item.blocNum} bloquejat` : undefined}
              >
                {isDone ? (
                  <CheckCircle2 size={13} className="text-emerald-600" />
                ) : !isUnlocked ? (
                  <Lock size={12} className="text-stone-400" />
                ) : null}
                <span>{item.label}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${isActive ? 'bg-amber-100 text-amber-900' : 'text-stone-400'}`}>
                  {item.time}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Student Profile & 3h Timer Widget */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Timer */}
          <div className="hidden sm:flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-mono text-stone-700">
            <Clock size={14} className="text-amber-600" />
            <span className="font-bold">{formatTime(timeRemainingSeconds)}</span>
          </div>

          {/* Student Badge */}
          <button
            onClick={onEditStudent}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition ${
              isRegistered
                ? 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                : 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600 font-bold animate-pulse'
            }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isRegistered ? 'bg-amber-100 text-amber-800' : 'bg-white text-amber-800'}`}>
              <User size={12} />
            </div>
            <div className="text-left hidden sm:block max-w-[140px] truncate">
              <span className="font-bold block text-[11px] truncate leading-tight">
                {studentName || 'Identifica\'t aquí'}
              </span>
              <span className="text-[10px] block leading-tight truncate opacity-80 text-stone-500">
                {studentGroup ? `Grup ${studentGroup}` : 'Falta grup (1,2,3 a/b)'}
              </span>
            </div>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-1.5">
          {navItems.map((item) => {
            const isUnlocked = item.blocNum === 0 || (isRegistered && unlockedBlocks.includes(item.blocNum));
            return (
              <button
                key={item.id}
                onClick={() => {
                  handleNavClick(item);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                  currentModule === item.id
                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                    : isUnlocked
                    ? 'text-stone-700 hover:bg-stone-100'
                    : 'text-stone-400 opacity-60'
                }`}
              >
                <span className="flex items-center gap-2">
                  {!isUnlocked && <Lock size={14} className="text-stone-400" />}
                  {item.label}
                </span>
                <span className="text-xs text-stone-400 font-mono">{item.time}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
