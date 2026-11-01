import React, { useState } from 'react';
import { Explanation as OhmExplanation } from './components/Explanation';
import { Examples as OhmExamples } from './components/Examples';
import { OhmLawSimulator } from './components/OhmLawSimulator';
import { Exercises as OhmExercises } from './components/Exercises';
import { Calculator, ArrowRight, CheckCircle2, ArrowLeft, Lock } from 'lucide-react';

interface Bloc5OhmViewProps {
  onComplete: () => void;
  onNext: () => void;
  onPrev?: () => void;
  onBackToDashboard?: () => void;
  isCompleted?: boolean;
  isTeacher?: boolean;
}

export const Bloc5OhmView: React.FC<Bloc5OhmViewProps> = ({
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
    <div className="w-full max-w-5xl mx-auto space-y-10 text-stone-800">
      {/* Block Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold uppercase rounded-full tracking-wide">
              Bloc 5 de 7
            </span>
            <span className="text-xs text-stone-500 font-medium">Relacions Matemàtiques</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
            5. La Llei d'Ohm: V = I · R
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Aprèn a relacionar el Voltatge (V), la Intensitat (I) i la Resistència (R), descobreix el triangle d'Ohm i experimenta amb la fórmula fonamental dels circuits.
          </p>
        </div>

        <div className="px-4 py-2 bg-stone-100 rounded-2xl border border-stone-200 text-xs text-stone-600 font-medium flex items-center gap-2 shrink-0">
          <Calculator size={16} className="text-amber-600" />
          <span>Seqüència Lineal: Teoria + Simulador + Càlcul</span>
        </div>
      </div>

      {/* ========================================================
          LA LLEI D'OHM (V = I · R)
      ======================================================== */}
      <div className="space-y-8">
        {/* 1. Ohm Theory & Triangle Explanation */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm">
          <OhmExplanation />
        </div>

        {/* 2. Solved Step-by-Step Examples */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm">
          <OhmExamples />
        </div>

        {/* 3. Interactive Ohm Simulator */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-100 px-3 py-1 rounded-full">
              Simulador Matemàtic
            </span>
            <h3 className="text-lg font-bold text-stone-900">
              Experimenta amb els valors de Tensió, Corrent i Resistència
            </h3>
          </div>
          <OhmLawSimulator />
        </div>

        {/* 4. Exercises directly below */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full">
                Posa't a prova
              </span>
              <h3 className="text-lg font-bold text-stone-900">
                Exercicis de Càlcul de la Llei d'Ohm
              </h3>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${canAdvance ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'}`}>
              {canAdvance ? '✓ Objectiu assolit' : 'Objectiu: 3 de 5 encerts'}
            </span>
          </div>
          <OhmExercises
            onSuccess={() => {
              setPracticeCompleted(true);
              onComplete();
            }}
          />
        </div>
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
              <span>Completar el Bloc 5 i anar al Bloc 6: Codi de Colors</span>
              <ArrowRight size={18} />
            </>
          ) : (
            <>
              <Lock size={16} />
              <span>Resol almenys 3 exercicis de càlcul per desbloquejar el Bloc 6</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
