import React, { useState } from 'react';
import UnitatsApp from '../b3_unitats/UnitatsApp';
import LleiDOhmApp from './LleiDOhmApp';
import { Gauge, Calculator, Sliders, ArrowRight } from 'lucide-react';

interface Bloc3ViewProps {
  onComplete?: () => void;
  onNext?: () => void;
}

export const Bloc3View: React.FC<Bloc3ViewProps> = ({ onComplete, onNext }) => {
  const [subTab, setSubTab] = useState<'unitats' | 'llei-dohm'>('unitats');

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Block Header Banner */}
      <div className="bg-slate-800 text-white p-6 rounded-3xl border border-slate-700 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 bg-emerald-500 text-slate-950 text-xs font-black uppercase rounded-full tracking-wider">
              BLOC 3: 40 MINUTS
            </span>
            <span className="text-xs text-slate-400 font-mono">Magnituds i Llei d'Ohm</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Magnituds Elèctriques, Unitats i la Llei d'Ohm
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Domina els múltiples i submúltiples (mA, kΩ, mV) i experimenta com interactuen el Voltatge, la Intensitat i la Resistència mitjançant la fórmula \(V = I \cdot R\).
          </p>
        </div>

        {/* Sub-activity switcher */}
        <div className="flex gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setSubTab('unitats')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              subTab === 'unitats'
                ? 'bg-emerald-500 text-slate-950 shadow-lg font-extrabold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Calculator size={16} />
            3.1 Conversor d'Unitats
          </button>
          <button
            onClick={() => setSubTab('llei-dohm')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              subTab === 'llei-dohm'
                ? 'bg-emerald-500 text-slate-950 shadow-lg font-extrabold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sliders size={16} />
            3.2 Simulador Llei d'Ohm
          </button>
        </div>
      </div>

      {/* Main active sub-app */}
      <div className="rounded-3xl overflow-hidden shadow-2xl bg-white text-slate-900">
        {subTab === 'unitats' ? <UnitatsApp /> : <LleiDOhmApp />}
      </div>

      {/* Navigation footer */}
      {onNext && (
        <div className="flex justify-end pt-4">
          <button
            onClick={onNext}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm flex items-center gap-2 shadow-lg transition"
          >
            <span>Passar al Bloc 4: Codi de Colors de Resistències</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
