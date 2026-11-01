import React, { useState, useEffect } from 'react';
import ReferenceMode from './components/ReferenceMode';
import QuizMode from './components/QuizMode';
import CircuitTheory from '../b2_circuits/components/Theory';
import CircuitSimulator from '../b2_circuits/components/Simulator';
import { Layers, CheckCircle2, ArrowRight, ArrowLeft, Lock } from 'lucide-react';

interface Bloc4CircuitsViewProps {
  onComplete: () => void;
  onNext: () => void;
  onPrev?: () => void;
  onBackToDashboard?: () => void;
  isCompleted?: boolean;
  isTeacher?: boolean;
}

export const Bloc4CircuitsView: React.FC<Bloc4CircuitsViewProps> = ({
  onComplete,
  onNext,
  onPrev,
  onBackToDashboard,
  isCompleted = false,
  isTeacher = false,
}) => {
  const [circuitDone, setCircuitDone] = useState(false);
  const [symbolsDone, setSymbolsDone] = useState(false);

  const canAdvance = isCompleted || isTeacher || (circuitDone && symbolsDone);

  useEffect(() => {
    if (circuitDone && symbolsDone) {
      onComplete();
    }
  }, [circuitDone, symbolsDone, onComplete]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 text-stone-800">
      {/* Block Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold uppercase rounded-full tracking-wide">
              Bloc 4 de 7
            </span>
            <span className="text-xs text-stone-500 font-medium">Circuits & Dibuix Tècnic</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
            4. Circuits Elèctrics (Sèrie / Paral·lel) i Simbologia Normalitzada
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Aprèn com funciona el camí del corrent, per què els circuits s'obren o es tanquen, la diferència clau entre circuits en sèrie i paral·lel, i els símbols tècnics normalitzats (IEC).
          </p>
        </div>

        <div className="px-4 py-2 bg-stone-100 rounded-2xl border border-stone-200 text-xs text-stone-600 font-medium flex items-center gap-2 shrink-0">
          <Layers size={16} className="text-amber-600" />
          <span>Seqüència Lineal Completa</span>
        </div>
      </div>

      {/* ========================================================
          PART 4.1: COM FUNCIONA UN CIRCUIT (SÈRIE VS PARAL·LEL)
      ======================================================== */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
          <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            4.1
          </span>
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              Com funciona un Circuit? Circuits en Sèrie i Paral·lel
            </h2>
            <p className="text-xs text-stone-500">
              Entén el camí del corrent, quan un circuit està tancat o trencat, i per què les bombetes es comporten diferent en sèrie i en paral·lel.
            </p>
          </div>
        </div>

        {/* Theory Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm">
          <CircuitTheory />
        </div>

        {/* Interactive Simulator directly below */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-100 px-3 py-1 rounded-full">
                Simulador Interactiu
              </span>
              <h3 className="text-lg font-bold text-stone-900">
                Laboratori Virtual de Circuits: Circuit Màgic
              </h3>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${circuitDone || isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'}`}>
              {circuitDone || isCompleted ? '✓ Repte de circuits superat' : 'Objectiu: 5 encerts'}
            </span>
          </div>
          <CircuitSimulator onSuccess={() => setCircuitDone(true)} />
        </div>
      </div>

      {/* ========================================================
          PART 4.2: SIMBOLOGIA NORMALITZADA
      ======================================================== */}
      <div className="space-y-6 pt-4 border-t-2 border-dashed border-stone-200">
        <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
          <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            4.2
          </span>
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              Biblioteca de Símbols Elèctrics Normalitzats
            </h2>
            <p className="text-xs text-stone-500">
              Consulta els símbols tècnics oficials utilitzats per enginyers i instal·ladors a tot el món i posa't a prova.
            </p>
          </div>
        </div>

        {/* Reference Mode Library */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm">
          <ReferenceMode />
        </div>

        {/* Quiz Mode directly underneath */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full">
                Posa't a prova
              </span>
              <h3 className="text-lg font-bold text-stone-900">
                Test de Reconeixement de Símbols
              </h3>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${symbolsDone || isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'}`}>
              {symbolsDone || isCompleted ? '✓ Repte de símbols superat' : 'Objectiu: 3 encerts'}
            </span>
          </div>
          <QuizMode onSuccess={() => setSymbolsDone(true)} />
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
              <span>Completar el Bloc 4 i anar al Bloc 5: Llei d'Ohm</span>
              <ArrowRight size={18} />
            </>
          ) : (
            <>
              <Lock size={16} />
              <span>
                Supera el Circuit Màgic ({circuitDone ? '✓' : 'pendent'}) i el Test de Símbols ({symbolsDone ? '✓' : 'pendent'}) per desbloquejar el Bloc 5
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
