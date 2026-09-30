import React from 'react';
import CodiColorsApp from './CodiColorsApp';
import { ArrowRight, CheckCircle2, ArrowLeft, Palette } from 'lucide-react';

interface Bloc5ResistorsViewProps {
  onComplete: () => void;
  onNext: () => void;
  onBackToDashboard?: () => void;
}

export const Bloc5ResistorsView: React.FC<Bloc5ResistorsViewProps> = ({
  onComplete,
  onNext,
  onBackToDashboard
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 text-stone-800">
      {/* Block Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold uppercase rounded-full tracking-wide">
              Bloc 5 de 6 • 25 minuts
            </span>
            <span className="text-xs text-stone-500 font-medium">Components Electrònics</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
            La Resistència com a Component i el Codi de Colors
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Aprèn a llegir el valor dels anells de color de les resistències (1a xifra, 2a xifra, multiplicador i tolerància) abans de començar la pràctica de laboratori amb el multímetre.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200/80 p-3 rounded-2xl text-xs text-amber-900 shrink-0 font-medium">
          🎯 <strong>Objectiu:</strong> Aconseguir una ratxa de 5 encerts consecutius!
        </div>
      </div>

      {/* Main active sub-app */}
      <div className="rounded-3xl overflow-hidden shadow-sm bg-white border border-stone-200/90 p-4 md:p-6 text-stone-900">
        <CodiColorsApp />
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
          <span>Completar el Bloc 5 i entrar a la Tasca Final: Multímetre</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
