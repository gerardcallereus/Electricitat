import React from 'react';
import ReferenceMode from './components/ReferenceMode';
import QuizMode from './components/QuizMode';
import CircuitTheory from '../b2_circuits/components/Theory';
import CircuitSimulator from '../b2_circuits/components/Simulator';
import { Bookmark, CheckCircle2, ArrowRight, ArrowLeft, Layers, Sparkles } from 'lucide-react';

interface Bloc4CircuitsViewProps {
  onComplete: () => void;
  onNext: () => void;
  onBackToDashboard?: () => void;
}

export const Bloc4CircuitsView: React.FC<Bloc4CircuitsViewProps> = ({
  onComplete,
  onNext,
  onBackToDashboard
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 text-stone-800">
      {/* Block Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold uppercase rounded-full tracking-wide">
              Bloc 4 de 7 • 30 minuts
            </span>
            <span className="text-xs text-stone-500 font-medium">Dibuix Tècnic & Circuits</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
            4. Simbologia Normalitzada i Circuits (Sèrie / Paral·lel)
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Aprèn a llegir i dibuixar esquemes elèctrics amb la normativa internacional (IEC) i experimenta directament com es comporten els receptors en sèrie i en paral·lel.
          </p>
        </div>

        <div className="px-4 py-2 bg-stone-100 rounded-2xl border border-stone-200 text-xs text-stone-600 font-medium flex items-center gap-2 shrink-0">
          <Layers size={16} className="text-amber-600" />
          <span>Seqüència Lineal Completa</span>
        </div>
      </div>

      {/* ========================================================
          PART 4.1: SIMBOLOGIA NORMALITZADA
      ======================================================== */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
          <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            4.1
          </span>
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              Biblioteca de Símbols Elèctrics Normalitzats
            </h2>
            <p className="text-xs text-stone-500">
              Consulta els símbols tècnics oficials utilitzats per enginyers i instal·ladors a tot el món.
            </p>
          </div>
        </div>

        {/* Reference Mode Library */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm">
          <ReferenceMode />
        </div>

        {/* Quiz Mode directly underneath */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full">
              Posa't a prova
            </span>
            <h3 className="text-lg font-bold text-stone-900">
              Test de Reconeixement de Símbols
            </h3>
          </div>
          <QuizMode />
        </div>
      </div>

      {/* ========================================================
          PART 4.2: COM FUNCIONA UN CIRCUIT (SÈRIE VS PARAL·LEL)
      ======================================================== */}
      <div className="space-y-6 pt-4 border-t-2 border-dashed border-stone-200">
        <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
          <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            4.2
          </span>
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              Com funciona un Circuit? Circuits en Sèrie i Paral·lel
            </h2>
            <p className="text-xs text-stone-500">
              Entén el camí del corrent elèctric, els circuits oberts i tancats, i experimenta amb els interruptors.
            </p>
          </div>
        </div>

        {/* Theory Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm">
          <CircuitTheory />
        </div>

        {/* Interactive Simulator directly below */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-100 px-3 py-1 rounded-full">
              Simulador Interactiu
            </span>
            <h3 className="text-lg font-bold text-stone-900">
              Laboratori Virtual de Circuits: Circuit Màgic
            </h3>
          </div>
          <CircuitSimulator />
        </div>
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
          <span>Completar el Bloc 4 i anar al Bloc 5: Magnituds i Llei d'Ohm</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
