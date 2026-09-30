import React, { useState } from 'react';
import UnitatsApp from '../b3_unitats/UnitatsApp';
import LleiDOhmApp from './LleiDOhmApp';
import { Calculator, Sliders, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';

interface Bloc4OhmViewProps {
  onComplete: () => void;
  onNext: () => void;
  onBackToDashboard?: () => void;
}

export const Bloc4OhmView: React.FC<Bloc4OhmViewProps> = ({
  onComplete,
  onNext,
  onBackToDashboard
}) => {
  const [subTab, setSubTab] = useState<'unitats' | 'llei-dohm'>('unitats');

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 text-stone-800">
      {/* Block Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold uppercase rounded-full tracking-wide">
              Bloc 4 de 6 • 35 minuts
            </span>
            <span className="text-xs text-stone-500 font-medium">Relacions Matemàtiques</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
            Les Magnituds Elèctriques i la Llei d'Ohm
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Comprèn el Voltatge (\(V\)), la Intensitat (\(I\)) i la Resistència (\(R\)), practica els prefixos (mA, kΩ) i experimenta amb la fórmula \(V = I \cdot R\).
          </p>
        </div>

        {/* Sub-activity switcher */}
        <div className="flex gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 shrink-0">
          <button
            onClick={() => setSubTab('unitats')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              subTab === 'unitats'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calculator size={16} className="text-amber-600" />
            4.1 Conversor d'Unitats
          </button>
          <button
            onClick={() => setSubTab('llei-dohm')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              subTab === 'llei-dohm'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sliders size={16} className="text-amber-600" />
            4.2 Simulador Llei d'Ohm
          </button>
        </div>
      </div>

      {/* Main active sub-app */}
      <div className="rounded-3xl overflow-hidden shadow-sm bg-white border border-stone-200/90 p-4 md:p-6 text-stone-900">
        {subTab === 'unitats' ? <UnitatsApp /> : <LleiDOhmApp />}
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
          <span>Completar el Bloc 4 i anar al Bloc 5: Codi de Colors</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
