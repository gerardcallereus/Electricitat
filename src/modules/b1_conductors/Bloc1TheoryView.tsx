import React from 'react';
import { ElectricityIntroduction } from './ElectricityIntroduction';
import { BookOpen, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';

interface Bloc1TheoryViewProps {
  onComplete: () => void;
  onNext: () => void;
  onBackToDashboard?: () => void;
}

export const Bloc1TheoryView: React.FC<Bloc1TheoryViewProps> = ({
  onComplete,
  onNext,
  onBackToDashboard,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 text-stone-800">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold uppercase rounded-full tracking-wide">
              Bloc 1 de 7 • 15 minuts
            </span>
            <span className="text-xs text-stone-500 font-medium">Teoria Fonamental</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
            1. Teoria: L'Àtom i el Corrent Elèctric
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Descobreix com està formada la matèria per dins, què són els electrons lliures i per què es produeix el corrent elèctric quan connectem una pila.
          </p>
        </div>

        <div className="px-4 py-2 bg-stone-100 rounded-2xl border border-stone-200 text-xs text-stone-600 font-medium flex items-center gap-2 shrink-0">
          <BookOpen size={16} className="text-amber-600" />
          <span>Lectura i Conceptes Clau</span>
        </div>
      </div>

      {/* Main Theory Content */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm">
        <ElectricityIntroduction />
      </div>

      {/* Completion & Navigation Footer */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        {onBackToDashboard ? (
          <button
            onClick={onBackToDashboard}
            className="text-stone-600 hover:text-stone-900 font-bold text-xs flex items-center gap-1.5"
          >
            <ArrowLeft size={16} /> Tornar a l'Itinerari
          </button>
        ) : <div />}

        <button
          onClick={() => {
            onComplete();
            onNext();
          }}
          className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-2xl text-sm flex items-center gap-2 shadow-md transition"
        >
          <CheckCircle2 size={18} className="text-amber-400" />
          <span>He entès la teoria: Desbloquejar el Bloc 2 (Simulador: ElectroConnecta)</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
