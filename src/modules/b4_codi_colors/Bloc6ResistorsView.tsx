import React, { useState } from 'react';
import CodiColorsApp from './CodiColorsApp';
import { ArrowRight, CheckCircle2, ArrowLeft, Lock, Palette } from 'lucide-react';

interface Bloc6ResistorsViewProps {
  onComplete: () => void;
  onNext: () => void;
  onPrev?: () => void;
  onBackToDashboard?: () => void;
  isCompleted?: boolean;
  isTeacher?: boolean;
}

export const Bloc6ResistorsView: React.FC<Bloc6ResistorsViewProps> = ({
  onComplete,
  onNext,
  onPrev,
  onBackToDashboard,
  isCompleted = false,
  isTeacher = false,
}) => {
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const canAdvance = isCompleted || isTeacher || practiceCompleted;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 text-stone-800">
      {/* Block Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold uppercase rounded-full tracking-wide">
              Bloc 6 de 7
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

        <div className="px-4 py-2 bg-stone-100 rounded-2xl border border-stone-200 text-xs text-stone-600 font-medium flex items-center gap-2 shrink-0">
          <Palette size={16} className="text-amber-600" />
          <span>Objectiu: Ratxa de 3 encerts</span>
        </div>
      </div>

      {/* 1. Guia Ràpida de les 4 Bandes */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <h2 className="text-xl font-bold text-stone-900">
            Com es llegeixen les 4 bandes de color d'una resistència?
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Com que les resistències són tan petites, no s'hi imprimeixen números: s'utilitzen anells de color normalitzats.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
              1a Banda
            </span>
            <h3 className="font-bold text-stone-900 mt-2 text-sm">1a Xifra Significativa</h3>
            <p className="text-xs text-stone-600 mt-1">
              Primer dígit del número (de 0 a 9 segons el color). Mai pot ser negre.
            </p>
          </div>

          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
              2a Banda
            </span>
            <h3 className="font-bold text-stone-900 mt-2 text-sm">2a Xifra Significativa</h3>
            <p className="text-xs text-stone-600 mt-1">
              Segon dígit del número (de 0 a 9 segons el color).
            </p>
          </div>

          <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full">
              3a Banda
            </span>
            <h3 className="font-bold text-stone-900 mt-2 text-sm">Multiplicador</h3>
            <p className="text-xs text-stone-600 mt-1">
              Pel que es multiplica (o el nombre de zeros que s'afegeixen al final).
            </p>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 bg-stone-200 px-2 py-0.5 rounded-full">
              4a Banda
            </span>
            <h3 className="font-bold text-stone-900 mt-2 text-sm">Tolerància (Marge d'Error)</h3>
            <p className="text-xs text-stone-600 mt-1">
              Habitualment daurat (±5%) o platejat (±10%).
            </p>
          </div>
        </div>

        {/* Exemple pràctic */}
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <div>
            <strong className="text-stone-900 block font-bold text-sm">Exemple de Càlcul:</strong>
            <p className="text-stone-600 mt-0.5">
              Si veus <span className="font-bold text-red-600">Vermell (2)</span>, <span className="font-bold text-red-600">Vermell (2)</span>, <span className="font-bold text-amber-800">Marró (x10)</span> i <span className="font-bold text-yellow-600">Or (±5%)</span>:
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-stone-300 font-mono text-sm font-bold text-amber-900 shrink-0">
            22 × 10 = 220 Ω (±5%)
          </div>
        </div>
      </div>

      {/* Main active sub-app */}
      <div className="rounded-3xl overflow-hidden shadow-sm bg-white border border-stone-200/90 p-4 md:p-6 text-stone-900">
        <CodiColorsApp
          onSuccess={() => {
            setPracticeCompleted(true);
            onComplete();
          }}
        />
      </div>

      {/* Completion & Navigation Footer */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        {onPrev ? (
          <button
            onClick={onPrev}
            className="text-stone-600 hover:text-stone-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft size={16} /> Bloc anterior
          </button>
        ) : onBackToDashboard ? (
          <button
            onClick={onBackToDashboard}
            className="text-stone-600 hover:text-stone-900 font-bold text-xs flex items-center gap-1.5"
          >
            <ArrowLeft size={16} /> Tornar a l'Itinerari
          </button>
        ) : <div />}

        <button
          disabled={!canAdvance}
          onClick={() => {
            onComplete();
            onNext();
          }}
          className={`px-6 py-3.5 font-bold rounded-2xl text-sm flex items-center gap-2 shadow-md transition ${
            canAdvance
              ? 'bg-stone-900 hover:bg-stone-800 text-white cursor-pointer'
              : 'bg-stone-200 text-stone-500 cursor-not-allowed'
          }`}
        >
          {canAdvance ? (
            <>
              <CheckCircle2 size={18} className="text-amber-400" />
              <span>Completar el Bloc 6 i anar al Bloc 7: Tasca Final Multímetre</span>
              <ArrowRight size={18} />
            </>
          ) : (
            <>
              <Lock size={16} />
              <span>Aconsegueix una ratxa de 3 encerts al joc per desbloquejar el Bloc 7</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
