import React, { useState } from 'react';
import ConductorsApp from './ConductorsApp';
import TransformationsApp from '../b1_transformacions/TransformationsApp';
import { Zap, Flame, Lightbulb, ArrowRight } from 'lucide-react';

interface Bloc1ViewProps {
  onComplete?: () => void;
  onNext?: () => void;
}

export const Bloc1View: React.FC<Bloc1ViewProps> = ({ onComplete, onNext }) => {
  const [subTab, setSubTab] = useState<'conductors' | 'transformacions'>('conductors');

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Block Header Banner */}
      <div className="bg-slate-800 text-white p-6 rounded-3xl border border-slate-700 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 bg-blue-500 text-white text-xs font-black uppercase rounded-full tracking-wider">
              BLOC 1: 25 MINUTS
            </span>
            <span className="text-xs text-slate-400 font-mono">Fonaments del Corrent</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Què és l'Electricitat? Conductivitat i Formes d'Energia
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Experimenta quins materials permeten el pas dels electrons i com l'energia elèctrica es converteix en llum, calor, moviment i so.
          </p>
        </div>

        {/* Sub-activity switcher */}
        <div className="flex gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setSubTab('conductors')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              subTab === 'conductors'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Zap size={16} />
            1.1 Conductors i Aïllants
          </button>
          <button
            onClick={() => setSubTab('transformacions')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              subTab === 'transformacions'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Lightbulb size={16} />
            1.2 Transformacions d'Energia
          </button>
        </div>
      </div>

      {/* Main active sub-app */}
      <div className="rounded-3xl overflow-hidden shadow-2xl bg-white text-slate-900">
        {subTab === 'conductors' ? <ConductorsApp /> : <TransformationsApp />}
      </div>

      {/* Navigation footer */}
      {onNext && (
        <div className="flex justify-end pt-4">
          <button
            onClick={onNext}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm flex items-center gap-2 shadow-lg transition"
          >
            <span>Passar al Bloc 2: Circuits i Simbologia</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
