import React from 'react';
import { Zap, CircleOff, Circle, GitBranch, ArrowRight, ShieldAlert, CheckCircle2, Home, Flame } from 'lucide-react';

const Theory: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in text-stone-800">
      
      {/* 1. Definició de Circuit Elèctric */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
            <Zap size={22} className="fill-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-stone-900">
              Què és un Circuit Elèctric?
            </h2>
            <p className="text-xs text-stone-500">El camí tancat pel qual viatja l'energia</p>
          </div>
        </div>

        <p className="text-base text-stone-700 leading-relaxed">
          Un circuit elèctric és un conjunt d'elements interconnectats que formen un <strong>camí continu</strong> per on circulen els electrons. Perquè el corrent funcioni i els aparells (bombetes, motors, brunzidors) s'activin, cal que els electrons puguin sortir d'un pol de la pila, passar pel receptor i <strong>arribar a l'altre pol sense cap interrupció</strong>.
        </p>

        {/* 4 Elements fonamentals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-center">
            <div className="text-2xl mb-1">🔋</div>
            <h4 className="font-bold text-xs text-stone-900">1. Generador</h4>
            <p className="text-[11px] text-stone-500 mt-1">Dóna l'energia (pila, bateria)</p>
          </div>
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-center">
            <div className="text-2xl mb-1">🔌</div>
            <h4 className="font-bold text-xs text-stone-900">2. Conductors</h4>
            <p className="text-[11px] text-stone-500 mt-1">Cables de coure que transporten electrons</p>
          </div>
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-center">
            <div className="text-2xl mb-1">💡</div>
            <h4 className="font-bold text-xs text-stone-900">3. Receptors</h4>
            <p className="text-[11px] text-stone-500 mt-1">Aprofiten l'energia (bombetes, motors)</p>
          </div>
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-center">
            <div className="text-2xl mb-1">🔘</div>
            <h4 className="font-bold text-xs text-stone-900">4. Manovra</h4>
            <p className="text-[11px] text-stone-500 mt-1">Controlen el pas (interruptor, polsador)</p>
          </div>
        </div>
      </div>

      {/* 2. Circuit Tancat vs Circuit Obert */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Closed Circuit Card */}
        <div className="bg-emerald-50/70 rounded-3xl p-6 border-2 border-emerald-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
                <Circle size={20} className="fill-white" />
              </div>
              <h3 className="text-xl font-bold text-emerald-950">Circuit Tancat</h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
              El camí està <strong>complet de principi a fi</strong>. Els electrons poden sortir del pol negatiu, recórrer el cable, travessar la bombeta i tornar al pol positiu de la pila.
            </p>
            <ul className="text-xs text-stone-700 space-y-2 bg-white/80 p-3.5 rounded-2xl border border-emerald-100 font-medium">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span> L'interruptor està tancat (contacte fet).
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span> No hi ha cap fil tallat ni cap component danyat.
              </li>
              <li className="flex items-center gap-2 font-bold text-emerald-900">
                💡 <strong>Resultat: La bombeta s'encén!</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* Open Circuit Card */}
        <div className="bg-red-50/70 rounded-3xl p-6 border-2 border-red-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shadow-sm">
                <CircleOff size={20} />
              </div>
              <h3 className="text-xl font-bold text-red-950">Circuit Obert o Trencat</h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
              El camí està <strong>interromput en algun punt</strong>. Com que l'aire és un aïllant formidable, els electrons no poden saltar i el corrent s'atura a tot el circuit.
            </p>
            <ul className="text-xs text-stone-700 space-y-2 bg-white/80 p-3.5 rounded-2xl border border-red-100 font-medium">
              <li className="flex items-center gap-2">
                <span className="text-red-600">✕</span> L'interruptor està obert (separat).
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✕</span> O un cable està trencat / desconnectat.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✕</span> O la bombeta està <strong>fosa</strong> (filament intern trencat).
              </li>
              <li className="flex items-center gap-2 font-bold text-red-900">
                ❌ <strong>Resultat: Cap component funciona.</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Circuits en Sèrie vs Paral·lel (Explicació en profunditat) */}
      <div className="space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <h2 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
            <GitBranch className="text-amber-600" />
            Com es connecten els components? Sèrie vs Paral·lel
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            La manera com connectem les bombetes o receptors canvia radicalment com es comporta el circuit.
          </p>
        </div>

        {/* Comparativa detallada en dues columnes */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Bloc SÈRIE */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
                <div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold uppercase rounded-full">
                    Connexió en cadena
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 mt-2">
                    Circuit en Sèrie
                  </h3>
                </div>
                <div className="text-3xl">🔗</div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
                Els components estan connectats <strong>un a continuació de l'altre</strong>, com els vagons d'un tren. Només existeix <strong>un únic camí</strong> possible per al corrent elèctric.
              </p>

              <div className="space-y-3 text-xs text-stone-700 mb-5">
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200">
                  <strong className="block text-amber-900 mb-1">⚡ Mateixa Intensitat:</strong>
                  Tots els electrons que passen per la primera bombeta estan obligats a passar exactament per la segona:
                  <code className="block mt-1 font-mono font-bold text-stone-800 bg-white/70 px-2 py-0.5 rounded">I_total = I_1 = I_2</code>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <strong className="block text-stone-900 mb-1">📉 El Voltatge es reparteix:</strong>
                  La tensió de la pila es reparteix entre les bombetes (<code className="font-mono font-bold">V_total = V_1 + V_2</code>). Si poses dues bombetes iguals amb una pila de 4.5 V, cadascuna només rep 2.25 V i <strong>brillen molt menys</strong>!
                </div>

                <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-red-950 font-medium">
                  <strong className="block text-red-900 mb-1">⚠️ Què passa si una bombeta es fon?</strong>
                  Si el filament d'una bombeta es trenca o en desenrosques una, <strong>el circuit queda tallat i TOTES les altres s'apaguen</strong> a l'instant!
                </div>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 italic border-t border-stone-100 pt-3">
              Exemple quotidià: Llums antics dels arbres de Nadal (si en fallava una, no funcionava cap).
            </div>
          </div>

          {/* Bloc PARAL·LEL */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
                <div>
                  <span className="px-3 py-1 bg-sky-100 text-sky-900 text-xs font-bold uppercase rounded-full">
                    Connexió independent
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 mt-2">
                    Circuit en Paral·lel
                  </h3>
                </div>
                <div className="text-3xl">🔀</div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
                Cada component està connectat <strong>directament als dos extrems de la pila</strong>, creant múltiples <strong>camins o branques independents</strong>.
              </p>

              <div className="space-y-3 text-xs text-stone-700 mb-5">
                <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-200">
                  <strong className="block text-sky-900 mb-1">⚡ Mateix Voltatge complet:</strong>
                  Totes les bombetes reben directament el 100% de la tensió de la pila:
                  <code className="block mt-1 font-mono font-bold text-stone-800 bg-white/70 px-2 py-0.5 rounded">V_total = V_1 = V_2 = 4.5 V</code>
                  Totes les bombetes <strong>brillen amb la màxima intensitat</strong>!
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <strong className="block text-stone-900 mb-1">📈 La Intensitat es divideix:</strong>
                  El corrent total que surt de la pila es reparteix per cada branca segons la seva resistència (<code className="font-mono font-bold">I_total = I_1 + I_2</code>).
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-medium">
                  <strong className="block text-emerald-900 mb-1">🛡️ Què passa si una bombeta es fon?</strong>
                  Com que cada branca és un camí independent cap a la pila, <strong>les altres continuen funcionant amb total normalitat</strong>!
                </div>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 italic border-t border-stone-100 pt-3">
              Exemple quotidià: La instal·lació elèctrica de casa (si apagues el llum de la cuina, la tele continua encesa).
            </div>
          </div>
        </div>

        {/* Taula comparativa ràpida de repàs */}
        <div className="bg-stone-50 rounded-3xl p-5 border border-stone-200 overflow-x-auto">
          <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            Resum per recordar abans d'iniciar el simulador:
          </h4>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-300 text-stone-500 uppercase tracking-wider">
                <th className="py-2 pr-4 font-bold">Característica</th>
                <th className="py-2 px-4 font-bold text-amber-900 bg-amber-100/50 rounded-t-xl">Circuit en Sèrie</th>
                <th className="py-2 pl-4 font-bold text-sky-900 bg-sky-100/50 rounded-t-xl">Circuit en Paral·lel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-700">
              <tr>
                <td className="py-2.5 pr-4 font-semibold">Nombre de camins pel corrent</td>
                <td className="py-2.5 px-4 bg-amber-50/30">1 sol camí continu</td>
                <td className="py-2.5 pl-4 bg-sky-50/30">Múltiples camins independents</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold">Si falla o es fon 1 bombeta</td>
                <td className="py-2.5 px-4 bg-amber-50/30 font-bold text-red-600">S'apaguen TOTES</td>
                <td className="py-2.5 pl-4 bg-sky-50/30 font-bold text-emerald-700">Les altres continuen enceses</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold">Brillantor en afegir bombetes</td>
                <td className="py-2.5 px-4 bg-amber-50/30">Disminueix (reparteixen voltatge)</td>
                <td className="py-2.5 pl-4 bg-sky-50/30">Màxima (reben tot el voltatge)</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold">On s'utilitza a la vida real?</td>
                <td className="py-2.5 px-4 bg-amber-50/30">Guirnaldes antigues, sistemes d'alarma en bucle</td>
                <td className="py-2.5 pl-4 bg-sky-50/30 font-medium">Instal·lacions de cases, cotxes, edificis</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Theory;
