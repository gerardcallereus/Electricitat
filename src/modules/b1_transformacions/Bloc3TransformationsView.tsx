import React from 'react';
import Game from './components/Game';
import { Flame, Sun, Cog, Volume2, ArrowRight, CheckCircle2, ArrowLeft, Lightbulb, Gamepad2 } from 'lucide-react';

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
  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 text-stone-800">
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
            L'electricitat és l'energia més versàtil: aprèn com la convertim en llum, calor, moviment i so, i posa't a prova tot seguit amb el joc de preguntes!
          </p>
        </div>

        <div className="px-4 py-2 bg-stone-100 rounded-2xl border border-stone-200 text-xs text-stone-600 font-medium flex items-center gap-2 shrink-0">
          <Lightbulb size={16} className="text-amber-600" />
          <span>Seqüència: Teoria + Joc</span>
        </div>
      </div>

      {/* 1. Teoria: Formes d'Energia */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm space-y-8">
        {/* Intro Principle */}
        <div className="bg-amber-50/70 border border-amber-200/80 p-6 rounded-2xl">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block mb-1">
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
        <div>
          <h4 className="text-base font-bold text-stone-900 mb-3">
            Principals formes en què transformem l'electricitat:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Llum */}
            <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:border-amber-400 transition space-y-2">
              <div className="flex items-center gap-2.5 text-amber-700 font-bold text-base">
                <Sun size={20} className="text-amber-600" />
                <span>Energia Lluminosa (Llum)</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                L'electricitat es converteix en radiació visible. Els <strong>LEDs moderns</strong> ho aconsegueixen amb un rendiment molt alt i gairebé sense malgastar energia en calor.
              </p>
              <div className="text-[11px] text-stone-500 font-mono bg-white p-2 rounded-lg border border-stone-200">
                Exemples: Bombetes LED, pantalles de mòbil, fars de cotxe.
              </div>
            </div>

            {/* 2. Calor */}
            <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:border-amber-400 transition space-y-2">
              <div className="flex items-center gap-2.5 text-rose-700 font-bold text-base">
                <Flame size={20} className="text-rose-600" />
                <span>Energia Tèrmica (Calor)</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                En passar per un material amb resistència, el xoc dels electrons escalfa el conductor. Aquest fenomen s'anomena <strong>Efecte Joule</strong>.
              </p>
              <div className="text-[11px] text-stone-500 font-mono bg-white p-2 rounded-lg border border-stone-200">
                Exemples: Torradora de pa, planxa, estufa elèctrica, escalfador d'aigua.
              </div>
            </div>

            {/* 3. Moviment */}
            <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:border-amber-400 transition space-y-2">
              <div className="flex items-center gap-2.5 text-blue-700 font-bold text-base">
                <Cog size={20} className="text-blue-600" />
                <span>Energia Mecànica (Moviment)</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Mitjançant <strong>motors elèctrics</strong>, l'electricitat i l'electromagnetisme es converteixen en gir i moviment mecànic per moure càrregues.
              </p>
              <div className="text-[11px] text-stone-500 font-mono bg-white p-2 rounded-lg border border-stone-200">
                Exemples: Ventilador, batedora, motor de cotxe elèctric, rentadora.
              </div>
            </div>

            {/* 4. So */}
            <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:border-amber-400 transition space-y-2">
              <div className="flex items-center gap-2.5 text-purple-700 font-bold text-base">
                <Volume2 size={20} className="text-purple-600" />
                <span>Energia Sonora (So)</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Mitjançant una membrana connectada a un electroimant (com en un altaveu), les vibracions elèctriques es converteixen en ones sonores a l'aire.
              </p>
              <div className="text-[11px] text-stone-500 font-mono bg-white p-2 rounded-lg border border-stone-200">
                Exemples: Altaveus, auriculars, timbres de porta, brunzidors d'alarma.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Joc Interactiu: ElectroTransforma (Directament a continuació, un sota l'altre) */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center">
            <Gamepad2 size={18} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900">
              Joc Interactiu: ElectroTransforma
            </h3>
            <p className="text-xs text-stone-500">
              Ara que coneixes les 4 transformacions, posa't a prova i respon a quina forma d'energia correspon cada aparell!
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 md:p-6 border border-stone-200/90 shadow-sm">
          <Game />
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
          <span>Completar el Bloc 3 i anar al Bloc 4: Simbologia i Circuits</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
