import React, { useState } from 'react';
import SimbologiaApp from './SimbologiaApp';
import CircuitMagicApp from '../b2_circuits/CircuitMagicApp';
import { Layers, Bookmark, CheckSquare, ArrowRight } from 'lucide-react';

interface Bloc2ViewProps {
  onComplete?: () => void;
  onNext?: () => void;
}

export const Bloc2View: React.FC<Bloc2ViewProps> = ({ onComplete, onNext }) => {
  const [subTab, setSubTab] = useState<'simbologia' | 'circuits'>('simbologia');

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Block Header Banner */}
      <div className="bg-slate-800 text-white p-6 rounded-3xl border border-slate-700 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-black uppercase rounded-full tracking-wider">
              BLOC 2: 30 MINUTS
            </span>
            <span className="text-xs text-slate-400 font-mono">Dibuix i Esquemes Elèctrics</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Simbologia Normalitzada i Circuits Sèrie / Paral·lel
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Comprèn els símbols de cada component (pila, bombeta, interruptor) i experimenta com es comporten els receptors en sèrie i en paral·lel.
          </p>
        </div>

        {/* Sub-activity switcher */}
        <div className="flex gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setSubTab('simbologia')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              subTab === 'simbologia'
                ? 'bg-amber-500 text-slate-950 shadow-lg font-extrabold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bookmark size={16} />
            2.1 Simbologia Elèctrica
          </button>
          <button
            onClick={() => setSubTab('circuits')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              subTab === 'circuits'
                ? 'bg-amber-500 text-slate-950 shadow-lg font-extrabold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CheckSquare size={16} />
            2.2 Circuit Màgic (Sèrie vs Paral·lel)
          </button>
        </div>
      </div>

      {/* Main active sub-app */}
      <div className="rounded-3xl overflow-hidden shadow-2xl bg-white text-slate-900">
        {subTab === 'simbologia' ? <SimbologiaApp /> : <CircuitMagicApp />}
      </div>

      {/* Navigation footer */}
      {onNext && (
        <div className="flex justify-end pt-4">
          <button
            onClick={onNext}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm flex items-center gap-2 shadow-lg transition"
          >
            <span>Passar al Bloc 3: Magnituds i Llei d'Ohm</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
