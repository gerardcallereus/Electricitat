import React from 'react';
import { WireElectronSimulation } from './components/WireElectronSimulation';

export const ElectricityIntroduction: React.FC = () => {

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
        <WireElectronSimulation />
      </div>
    </div>
  );
};
