import React from 'react';
import CodiColorsApp from './CodiColorsApp';
import { Palette, Award, ArrowRight } from 'lucide-react';

interface Bloc4ViewProps {
  onComplete?: () => void;
  onNext?: () => void;
}

export const Bloc4View: React.FC<Bloc4ViewProps> = ({ onComplete, onNext }) => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Block Header Banner */}
      <div className="bg-slate-800 text-white p-6 rounded-3xl border border-slate-700 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 bg-purple-500 text-white text-xs font-black uppercase rounded-full tracking-wider">
              BLOC 4: 35 MINUTS
            </span>
            <span className="text-xs text-slate-400 font-mono">Components i Resistències</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            El Codi de Colors de les Resistències
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Desxifra els anells de color de les resistències de 4 bandes (1a xifra, 2a xifra, multiplicador i tolerància) i posa a prova la teva rapidesa.
          </p>
        </div>

        <div className="bg-purple-950/60 border border-purple-800 p-3 rounded-2xl text-xs text-purple-200">
          <strong>Objectiu:</strong> Aconseguir una ratxa de 5 encerts consecutius abans de passar a la pràctica de laboratori amb multímetre!
        </div>
      </div>

      {/* Main active sub-app */}
      <div className="rounded-3xl overflow-hidden shadow-2xl bg-white text-slate-900">
        <CodiColorsApp />
      </div>

      {/* Navigation footer */}
      {onNext && (
        <div className="flex justify-end pt-4">
          <button
            onClick={onNext}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm flex items-center gap-2 shadow-lg transition"
          >
            <span>Passar a la Tasca Final: Laboratori amb Multímetre</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
