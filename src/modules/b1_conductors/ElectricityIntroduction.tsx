import React, { useState } from 'react';
import { Zap, Play, Pause, Info, Lightbulb, ShieldCheck } from 'lucide-react';

export const ElectricityIntroduction: React.FC = () => {
  const [flowing, setFlowing] = useState<boolean>(true);

  return (
    <div className="space-y-8 text-stone-800">
      {/* Intro Header */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 md:p-8">
        <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block mb-1">
          Conceptes Fonamentals
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight mb-3">
          Què és realment l'electricitat?
        </h2>
        <p className="text-base text-stone-700 leading-relaxed max-w-3xl">
          L'electricitat no és màgia: és una propietat física fonamental de la matèria. Per entendre com s'encén una bombeta o com funciona el teu telèfon mòbil, primer hem de mirar l'interior mateix de les coses: <strong>l'àtom</strong>.
        </p>
      </div>

      {/* Visual Section: L'Àtom i els Electrons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Text column */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-sm">
              1
            </span>
            Tot comença a l'àtom
          </h3>
          <p className="text-stone-700 leading-relaxed text-sm">
            Tots els objectes del nostre voltant (l'aire, una taula, un cable de coure o el nostre cos) estan formats per partícules minúscules anomenades <strong>àtoms</strong>.
          </p>

          <div className="space-y-2.5 text-sm">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200">
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                +
              </span>
              <div>
                <strong className="text-stone-900 block font-semibold">El Nucli (centre):</strong>
                <span className="text-stone-600">
                  Format per <strong>protons</strong> (amb càrrega elèctrica positiva, \(+\)) i <strong>neutrons</strong> (sense càrrega). No es mouen mai en els circuits elèctrics.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                -
              </span>
              <div>
                <strong className="text-stone-900 block font-semibold">L'Escorça (al voltant):</strong>
                <span className="text-stone-600">
                  Formada per <strong>electrons</strong> (amb càrrega elèctrica negativa, \(-\)), que giren a gran velocitat en diferents òrbites al voltant del nucli.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Atom Diagram */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
            Model de l'Àtom
          </span>
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Outer Orbit 1 */}
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-stone-300 animate-spin" style={{ animationDuration: '14s' }}>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-sky-500 shadow flex items-center justify-center text-[10px] text-white font-bold">
                -
              </div>
            </div>
            {/* Outer Orbit 2 */}
            <div className="absolute inset-8 rounded-full border border-stone-300 rotate-45 animate-spin" style={{ animationDuration: '9s', animationDirection: 'reverse' }}>
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 rounded-full bg-sky-500 shadow flex items-center justify-center text-[10px] text-white font-bold">
                -
              </div>
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 rounded-full bg-sky-500 shadow flex items-center justify-center text-[10px] text-white font-bold">
                -
              </div>
            </div>
            {/* Nucleus */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-red-400 p-2 shadow-md flex flex-wrap items-center justify-center gap-1">
              <div className="w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">+</div>
              <div className="w-4 h-4 rounded-full bg-stone-300 text-stone-700 text-[9px] font-bold flex items-center justify-center">n</div>
              <div className="w-4 h-4 rounded-full bg-stone-300 text-stone-700 text-[9px] font-bold flex items-center justify-center">n</div>
              <div className="w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">+</div>
            </div>
          </div>
          <div className="flex gap-4 text-xs mt-3 text-stone-600">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Protons (+)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-stone-400"></span> Neutrons</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> Electrons (-)</span>
          </div>
        </div>
      </div>

      {/* Concept 2: Els electrons lliures i el corrent */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-sm">
            2
          </span>
          Dels electrons lliures al corrent elèctric
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-700">
          <div className="space-y-3">
            <h4 className="font-bold text-stone-900 text-base">Què és un electró lliure?</h4>
            <p className="leading-relaxed">
              En metalls com el <strong>coure</strong> o l'<strong>alumini</strong>, els electrons de la capa més exterior no estan fortament subjectes al seu nucli. Amb molt poca energia poden saltar d'un àtom al del costat. Aquests electrons que es poden moure lliurement s'anomenen <strong>electrons lliures</strong>.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-stone-900 text-base">Com es produeix el corrent?</h4>
            <p className="leading-relaxed">
              Quan connectem una <strong>pila</strong> als extrems d'un cable, el pol negatiu repel·leix els electrons i el pol positiu els atrau. Els electrons deixen de moure's caòticament i comencen a avançar ordenadament en la mateixa direcció:
            </p>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 font-medium">
              ⚡ <strong>Definició:</strong> El corrent elèctric és el <em>moviment ordenat d'electrons lliures</em> a través d'un material conductor.
            </div>
          </div>
        </div>

        {/* Interactive Cable electron flow simulation */}
        <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-600">
            <span>Model visual del pas d'electrons dins d'un cable de coure:</span>
            <button
              onClick={() => setFlowing(!flowing)}
              className="px-3 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg flex items-center gap-1.5 transition font-bold"
            >
              {flowing ? <Pause size={14} /> : <Play size={14} />}
              {flowing ? 'Aturar corrent' : 'Activar corrent'}
            </button>
          </div>

          {/* Copper cable illustration */}
          <div className="relative h-20 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 rounded-xl overflow-hidden border-4 border-amber-900 shadow-inner flex items-center px-4">
            <span className="absolute left-2 text-[10px] font-bold text-amber-200 uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded">
              Pol (-) Pila
            </span>
            <span className="absolute right-2 text-[10px] font-bold text-amber-200 uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded">
              Pol (+) Pila
            </span>

            {/* Moving electrons */}
            <div className="w-full flex justify-around items-center">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full bg-sky-400 border-2 border-white shadow-md text-white font-bold flex items-center justify-center text-xs ${
                    flowing ? 'electron-flow' : ''
                  }`}
                  style={{
                    transform: flowing ? undefined : `translateX(${i % 2 === 0 ? '-4px' : '4px'})`
                  }}
                >
                  e⁻
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-stone-500 text-center italic">
            {flowing
              ? '▶️ Els electrons lliures viatgen de manera coordinada cap al pol positiu generant el corrent.'
              : '⏸️ Sense pila connectada, els electrons es mantenen desordenats i no hi ha corrent.'}
          </p>
        </div>
      </div>

      {/* Concept 3: Conductors vs Aïllants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-sky-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <Zap size={20} />
            </div>
            <h4 className="text-lg font-bold text-stone-900">Materials Conductors</h4>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            Són els materials que tenen <strong>molts electrons lliures</strong> i permeten que el corrent elèctric circuli fàcilment sense gairebé resistència.
          </p>
          <ul className="text-xs space-y-1.5 text-stone-700 font-medium pt-1">
            <li className="flex items-center gap-2">✓ <strong>Coure (Cu):</strong> Usat en la gran majoria de cables elèctrics.</li>
            <li className="flex items-center gap-2">✓ <strong>Alumini (Al):</strong> Usat en línies d'alta tensió per ser molt lleuger.</li>
            <li className="flex items-center gap-2">✓ <strong>Or i Plata:</strong> Excel·lents conductors usats en xips electrònics.</li>
            <li className="flex items-center gap-2">✓ <strong>Grafit:</strong> L'únic no metall que condueix el corrent (mines de llapis).</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <h4 className="text-lg font-bold text-stone-900">Materials Aïllants</h4>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            Són els materials que tenen els <strong>electrons molt fortament lligats</strong> als seus àtoms. No deixen passar el corrent i s'utilitzen per protegir-nos de descàrregues elèctriques.
          </p>
          <ul className="text-xs space-y-1.5 text-stone-700 font-medium pt-1">
            <li className="flex items-center gap-2">🛡️ <strong>Plàstic i PVC:</strong> Recobreixen els cables i endolls per seguretat.</li>
            <li className="flex items-center gap-2">🛡️ <strong>Vidre i Ceràmica:</strong> S'utilitzen com a aïlladors en torres d'alta tensió.</li>
            <li className="flex items-center gap-2">🛡️ <strong>Fusta seca i Goma:</strong> Materials aïllants comuns.</li>
            <li className="flex items-center gap-2">🛡️ <strong>Aire sec:</strong> En condicions normals és un bon aïllant.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
