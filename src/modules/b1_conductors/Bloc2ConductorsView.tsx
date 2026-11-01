import React, { useState } from 'react';
import ConductorsApp from './ConductorsApp';
import { Gamepad2, ArrowRight, CheckCircle2, ArrowLeft, Lock } from 'lucide-react';

interface Bloc2ConductorsViewProps {
  onComplete: () => void;
  onNext: () => void;
  onPrev?: () => void;
  onBackToDashboard?: () => void;
  isCompleted?: boolean;
  isTeacher?: boolean;
}

export const Bloc2ConductorsView: React.FC<Bloc2ConductorsViewProps> = ({
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
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold uppercase rounded-full tracking-wide">
              Bloc 2 de 7
            </span>
            <span className="text-xs text-stone-500 font-medium">Pràctica Interactiva</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
            2. Simulador: ElectroConnecta
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Posa a prova el que has après sobre conductors i aïllants: classifica els 8 materials (metalls, fusta, plàstic, aigua salada, grafit...) per desbloquejar el següent bloc!
          </p>
        </div>

        <div className="px-4 py-2 bg-stone-100 rounded-2xl border border-stone-200 text-xs text-stone-600 font-medium flex items-center gap-2 shrink-0">
          <Gamepad2 size={16} className="text-amber-600" />
          <span>Objectiu: Classificar els 8 materials</span>
        </div>
      </div>

      {/* Main Simulator Card */}
      <div className="bg-white rounded-3xl p-4 md:p-6 border border-stone-200/90 shadow-sm">
        <ConductorsApp
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
              <span>Completar el Bloc 2 i anar al Bloc 3: Transformacions d'Energia</span>
              <ArrowRight size={18} />
            </>
          ) : (
            <>
              <Lock size={16} />
              <span>Completa els 8 materials d'ElectroConnecta per desbloquejar el Bloc 3</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
