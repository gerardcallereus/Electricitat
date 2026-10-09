import React from 'react';
import UnitsTheory from '../b3_unitats/components/Theory';
import UnitsPractice from '../b3_unitats/components/Practice';
import { Explanation as OhmExplanation } from './components/Explanation';
import { OhmLawSimulator } from './components/OhmLawSimulator';
import { Exercises as OhmExercises } from './components/Exercises';
import { Calculator, Gauge, ArrowRight, CheckCircle2, ArrowLeft, Sliders } from 'lucide-react';

interface Bloc5OhmViewProps {
  onComplete: () => void;
  onNext: () => void;
  onBackToDashboard?: () => void;
}

export const Bloc5OhmView: React.FC<Bloc5OhmViewProps> = ({
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
              Bloc 5 de 7 • 35 minuts
            </span>
            <span className="text-xs text-stone-500 font-medium">Relacions Matemàtiques</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
            5. Les Magnituds Elèctriques i la Llei d'Ohm
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Aprèn a relacionar el Voltatge (\(V\)), la Intensitat (\(I\)) i la Resistència (\(R\)), practica els prefixos (\(mA\), \(k\Omega\)) i experimenta amb la fórmula fonamental \(V = I \cdot R\).
          </p>
        </div>

        <div className="px-4 py-2 bg-stone-100 rounded-2xl border border-stone-200 text-xs text-stone-600 font-medium flex items-center gap-2 shrink-0">
          <Calculator size={16} className="text-amber-600" />
          <span>Seqüència Lineal Completa</span>
        </div>
      </div>

      {/* ========================================================
          PART 5.1: LES MAGNITUDS I ELS PREFIXOS
      ======================================================== */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
          <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            5.1
          </span>
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              Les Unitats Elèctriques i els seus Prefixos
            </h2>
            <p className="text-xs text-stone-500">
              Volt (\(V\)), Ampere (\(A\)) i Ohm (\(\Omega\)): domina els múltiples i submúltiples més habituals (\(mA\), \(k\Omega\), \(M\Omega\)).
            </p>
          </div>
        </div>

        {/* Units Theory Table */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm">
          <UnitsTheory />
        </div>

        {/* Practice directly underneath */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full">
              Pràctica Interactiva
            </span>
            <h3 className="text-lg font-bold text-stone-900">
              Conversor i Exercicis de Prefixos
            </h3>
          </div>
          <UnitsPractice />
        </div>
      </div>

      {/* ========================================================
          PART 5.2: LA LLEI D'OHM (V = I · R)
      ======================================================== */}
      <div className="space-y-6 pt-4 border-t-2 border-dashed border-stone-200">
        <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
          <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            5.2
          </span>
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              La Llei d'Ohm (\(V = I \cdot R\))
            </h2>
            <p className="text-xs text-stone-500">
              La relació matemàtica fonamental que governa tots els circuits elèctrics.
            </p>
          </div>
        </div>

        {/* Ohm Theory & Triangle Explanation */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm">
          <OhmExplanation />
        </div>

        {/* Interactive Ohm Simulator */}
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

        {/* Exercises directly below */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full">
              Posa't a prova
            </span>
            <h3 className="text-lg font-bold text-stone-900">
              Exercicis de Càlcul de la Llei d'Ohm
            </h3>
          </div>
          <OhmExercises />
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
          <span>Completar el Bloc 5 i anar al Bloc 6: Codi de Colors</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
