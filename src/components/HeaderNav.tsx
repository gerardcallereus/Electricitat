import React, { useState } from 'react';
import { ModuleId } from '../types';
import { Zap, User, CheckCircle2, Lock, Menu, X, AlertCircle } from 'lucide-react';

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
  const [lockAlert, setLockAlert] = useState<string | null>(null);

  // 7 sequential learning blocks (NO minutes, compact labels for Chromebooks)
  const navItems: { id: ModuleId; label: string; shortLabel: string; blocNum: number }[] = [
    { id: 'b1-teoria-atom', label: '1. Teoria Àtom', shortLabel: '1. Àtom', blocNum: 1 },
    { id: 'b2-simulador-conductors', label: '2. Conductors', shortLabel: '2. Conductors', blocNum: 2 },
    { id: 'b3-transformacions', label: '3. Energia', shortLabel: '3. Energia', blocNum: 3 },
    { id: 'b4-simbologia-circuits', label: '4. Circuits', shortLabel: '4. Circuits', blocNum: 4 },
    { id: 'b5-llei-dohm', label: '5. Llei d\'Ohm', shortLabel: '5. Llei d\'Ohm', blocNum: 5 },
    { id: 'b6-codi-colors', label: '6. Resistències', shortLabel: '6. Colors', blocNum: 6 },
    { id: 'b7-multimetre', label: '7. Multímetre', shortLabel: '7. Multímetre', blocNum: 7 },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (!isRegistered) {
      setLockAlert('⚠️ Cal identificar-te primer per accedir als continguts.');
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
    <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50 shadow-sm text-stone-800 print:hidden">
      {/* Lock alert toast */}
      {lockAlert && (
        <div className="bg-amber-500 text-stone-950 px-4 py-1.5 text-center text-xs font-bold flex items-center justify-center gap-2">
          <AlertCircle size={15} />
          <span>{lockAlert}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Course title */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center shadow-sm">
            <Zap size={20} className="fill-white" />
          </div>
          <div className="hidden sm:block">
            <span className="text-sm font-bold text-stone-900 tracking-tight block leading-tight">
              Càpsula d'Electricitat
            </span>
            <p className="text-[11px] text-stone-500 leading-tight">Tecnologia</p>
          </div>
        </div>

        {/* Desktop Navigation Links (Compact for Chromebook 1366x768 screens) */}
        <nav className="hidden lg:flex items-center gap-1 bg-stone-100 p-1 rounded-2xl border border-stone-200">
          {navItems.map((item) => {
            const isActive = currentModule === item.id;
            const isDone = completedBlocks.includes(item.blocNum);
            const isUnlocked = isRegistered && unlockedBlocks.includes(item.blocNum);

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-sm border border-stone-200/90 font-bold'
                    : isUnlocked
                    ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                    : 'text-stone-400 opacity-50 cursor-not-allowed'
                }`}
                title={!isUnlocked ? `Bloc ${item.blocNum} bloquejat` : undefined}
              >
                {isDone ? (
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                ) : !isUnlocked ? (
                  <Lock size={12} className="text-stone-400 shrink-0" />
                ) : null}
                <span className="xl:inline hidden">{item.label}</span>
                <span className="xl:hidden inline">{item.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Student Profile Button */}
        <div className="flex items-center gap-2 shrink-0">
          {isRegistered ? (
            <button
              onClick={onEditStudent}
              title="Clica per canviar d'alumne/a o editar dades"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs transition"
            >
              <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px]">
                <User size={12} />
              </div>
              <div className="text-left max-w-[130px] sm:max-w-[160px] truncate">
                <span className="font-bold block text-[11px] truncate leading-tight">
                  {studentName}
                </span>
                <span className="text-[10px] block leading-tight text-stone-500 font-medium truncate">
                  Grup {studentGroup}
                </span>
              </div>
            </button>
          ) : (
            <button
              onClick={onEditStudent}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition animate-pulse"
            >
              <User size={13} />
              <span>Identifica't</span>
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-xl bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile / Compact Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-3 py-3 space-y-1">
          {navItems.map((item) => {
            const isUnlocked = isRegistered && unlockedBlocks.includes(item.blocNum);
            const isDone = completedBlocks.includes(item.blocNum);
            const isActive = currentModule === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  handleNavClick(item);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between ${
                  isActive
                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                    : isUnlocked
                    ? 'text-stone-700 hover:bg-stone-100'
                    : 'text-stone-400 opacity-60'
                }`}
              >
                <span className="flex items-center gap-2">
                  {isDone ? (
                    <CheckCircle2 size={13} className="text-emerald-600" />
                  ) : !isUnlocked ? (
                    <Lock size={13} className="text-stone-400" />
                  ) : null}
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
