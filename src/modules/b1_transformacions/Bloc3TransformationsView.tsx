import React, { useState } from 'react';
import TransformationsApp from './TransformationsApp';
import { BookOpen, Gamepad2, ArrowRight, CheckCircle2, Flame, Sun, Cog, Volume2, ArrowLeft } from 'lucide-react';

interface Bloc3TransformationsViewProps {
  onComplete: () => void;
  onNext: () => void;
  onBackToDashboard?: () => void;
}

export const Bloc3TransformationsView: React.FC<Bloc3TransformationsViewProps> = ({
  onComplete,
  onNext,
  onBackToDashboard
}) => {
  const [tab, setTab] = useState<'theory' | 'game'>('theory');

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 text-stone-800">
      {/* Block Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold uppercase rounded-full tracking-wide">
              Bloc 3 de 7 • 25 minuts
            </span>
            <span className="text-xs text-stone-500 font-medium">Aplicacions de l'Electricitat</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
            3. Les Transformacions de l'Energia Elèctrica
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            L'electricitat és l'energia més versàtil que coneixem. Descobreix com la transformem fàcilment en llum, calor, moviment i so en els aparells de cada dia.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 shrink-0">
          <button
            onClick={() => setTab('theory')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              tab === 'theory'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen size={16} className="text-amber-600" />
            1. Teoria: Formes d'Energia
          </button>
          <button
            onClick={() => setTab('game')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              tab === 'game'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Gamepad2 size={16} className="text-amber-600" />
            2. Joc: ElectroTransforma
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {tab === 'theory' ? (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm space-y-8">
            {/* Intro Principle */}
            <div className="bg-stone-50 border border-stone-200 p-6 rounded-2xl">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
                El Principi Fonamental
              </span>
              <h3 className="text-xl font-bold text-stone-900 mb-2">
                L'energia ni es crea ni es destrueix, només es transforma
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                El corrent elèctric transporta energia a través dels cables, però per fer-lo útil necessitem receptors que el converteixin en altres tipus d'energia útils per a la nostra vida quotidiana.
              </p>
            </div>

            {/* 4 Types of transformations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Llum */}
              <div className="p-5 rounded-2xl border border-stone-200 bg-white hover:border-amber-400 transition space-y-2">
                <div className="flex items-center gap-2.5 text-amber-600 font-bold text-base">
                  <Sun size={20} />
                  <span>Energia Lluminosa (Llum)</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  L'electricitat es converteix en radiació visible. Els <strong>LEDs moderns</strong> ho aconsegueixen amb un rendiment molt alt i gairebé sense malgastar energia en calor.
                </p>
                <div className="text-[11px] text-stone-500 font-mono bg-stone-50 p-2 rounded-lg">
                  Exemples: Bombetes LED, pantalles de mòbil, fars de cotxe.
                </div>
              </div>

              {/* 2. Calor */}
              <div className="p-5 rounded-2xl border border-stone-200 bg-white hover:border-amber-400 transition space-y-2">
                <div className="flex items-center gap-2.5 text-red-600 font-bold text-base">
                  <Flame size={20} />
                  <span>Energia Tèrmica (Calor)</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  En passar per un material amb resistència, el xoc dels electrons escalfa el conductor. Aquest fenomen s'anomena <strong>Efecte Joule</strong>.
                </p>
                <div className="text-[11px] text-stone-500 font-mono bg-stone-50 p-2 rounded-lg">
                  Exemples: Torradora de pa, planxa, estufa elèctrica, escalfador d'aigua.
                </div>
              </div>

              {/* 3. Moviment */}
              <div className="p-5 rounded-2xl border border-stone-200 bg-white hover:border-amber-400 transition space-y-2">
                <div className="flex items-center gap-2.5 text-blue-600 font-bold text-base">
                  <Cog size={20} />
                  <span>Energia Mecànica (Moviment)</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Mitjançant <strong>motors elèctrics</strong>, l'electricitat i l'electromagnetisme es converteixen en gir i moviment mecànic per moure càrregues.
                </p>
                <div className="text-[11px] text-stone-500 font-mono bg-stone-50 p-2 rounded-lg">
                  Exemples: Ventilador, batedora, motor de cotxe elèctric, rentadora.
                </div>
              </div>

              {/* 4. So */}
              <div className="p-5 rounded-2xl border border-stone-200 bg-white hover:border-amber-400 transition space-y-2">
                <div className="flex items-center gap-2.5 text-purple-600 font-bold text-base">
                  <Volume2 size={20} />
                  <span>Energia Sonora (So)</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Mitjançant una membrana connectada a un electroimant (com en un altaveu), les vibracions elèctriques es converteixen en ones sonores a l'aire.
                </p>
                <div className="text-[11px] text-stone-500 font-mono bg-stone-50 p-2 rounded-lg">
                  Exemples: Altaveus, auriculars, timbres de porta, brunzidors d'alarma.
                </div>
              </div>
            </div>

            {/* Prompt to play game */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => {
                  setTab('game');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl text-sm flex items-center gap-2 transition shadow-sm"
              >
                <span>Posa't a prova amb el Joc de les Transformacions</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-4 md:p-6 border border-stone-200/90 shadow-sm">
            <TransformationsApp />
          </div>
        )}
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
          <span>Completar el Bloc 3 i anar al Bloc 4: Simbologia i Circuits</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
