import React, { useState } from 'react';
import { MultimeterScale } from './types';
import { MultimeterDevice } from './MultimeterDevice';
import { CircuitBoardLab } from './CircuitBoardLab';
import { MultimeterTasks } from './MultimeterTasks';
import { computeMultimeterReading } from './multimeterEngine';
import { BookOpen, Wrench, FileCheck2, Lightbulb } from 'lucide-react';

interface MultimeterLabAppProps {
  studentName: string;
  studentGroup: string;
}

export const MultimeterLabApp: React.FC<MultimeterLabAppProps> = ({
  studentName,
  studentGroup,
}) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'theory' | 'tasks'>('simulator');
  const [activeBoard, setActiveBoard] = useState<'resistors' | 'series' | 'ohm-challenge'>('resistors');
  const [scale, setScale] = useState<MultimeterScale>('OFF');
  const [redProbe, setRedProbe] = useState<string | null>('TP-R1A');
  const [blackProbe, setBlackProbe] = useState<string | null>('TP-R1B');

  const reading = computeMultimeterReading(scale, redProbe, blackProbe, activeBoard, true);

  const handleConnectProbe = (probe: 'red' | 'black', targetId: string) => {
    if (probe === 'red') {
      setRedProbe(targetId);
    } else {
      setBlackProbe(targetId);
    }
  };

  const handleClearProbes = () => {
    setRedProbe(null);
    setBlackProbe(null);
  };

  const handleJumpToBoard = (board: 'resistors' | 'series' | 'ohm-challenge') => {
    setActiveBoard(board);
    setActiveTab('simulator');
    // Set appropriate default probes for convenience
    if (board === 'resistors') {
      setRedProbe('TP-R1A');
      setBlackProbe('TP-R1B');
      setScale('RES_2k');
    } else if (board === 'series') {
      setRedProbe('TP-BAT-POS');
      setBlackProbe('TP-BAT-NEG');
      setScale('DCV_20');
    } else if (board === 'ohm-challenge') {
      setRedProbe('TP-RX-IN');
      setBlackProbe('TP-RX-OUT');
      setScale('DCV_20');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      {/* Top Banner / Mode Switcher */}
      <div className="bg-slate-800 text-white p-6 rounded-3xl border border-slate-700 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 bg-amber-500 text-slate-900 text-xs font-black uppercase rounded-full tracking-wider">
              BLOC 5: TASCA FINAL D'AVALUACIÓ
            </span>
            <span className="text-xs text-slate-400 font-mono">50 minuts</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Laboratori Virtual: Mesures i Càlculs amb Multímetre
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Aprèn a utilitzar el tester o polímetre digital com un autèntic professional de la tecnologia i resol els reptes de voltatge i resistència.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              activeTab === 'simulator'
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Wrench size={16} />
            Simulador Multímetre & Bancs
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              activeTab === 'theory'
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen size={16} />
            Guia del Multímetre
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              activeTab === 'tasks'
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileCheck2 size={16} />
            Quadern de Pràctiques (Avaluació)
          </button>
        </div>
      </div>

      {/* VIEW 1: SIMULATOR & WORKBENCH */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Multimeter Device (Left or Top on mobile) */}
          <div className="lg:col-span-4 sticky top-4 z-10">
            <MultimeterDevice
              scale={scale}
              onScaleChange={setScale}
              redProbeTarget={redProbe}
              blackProbeTarget={blackProbe}
              displayValue={reading.displayValue}
              displayUnit={reading.displayUnit}
              isOverload={reading.isOverload}
              isNegative={reading.isNegative}
              statusMessage={reading.statusMessage}
              onClearProbes={handleClearProbes}
            />

            <div className="mt-4 p-4 bg-slate-800/80 rounded-2xl border border-slate-700 text-xs text-slate-300">
              <h4 className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                <Lightbulb size={16} /> Consell ràpid:
              </h4>
              <p>
                Pots canviar l'escala fent clic als botons sota el selector (200mV, 2V, 20V, 2kΩ, etc.) o girar-lo. Després vés a la pestanya <strong>"Quadern de Pràctiques"</strong> per anotar les teves respostes!
              </p>
            </div>
          </div>

          {/* Interactive Circuit Boards (Right) */}
          <div className="lg:col-span-8">
            <CircuitBoardLab
              activeBoard={activeBoard}
              onSelectBoard={setActiveBoard}
              redProbeTarget={redProbe}
              blackProbeTarget={blackProbe}
              onConnectProbe={handleConnectProbe}
              scale={scale}
            />
          </div>
        </div>
      )}

      {/* VIEW 2: THEORY GUIDE */}
      {activeTab === 'theory' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-slate-800 max-w-4xl mx-auto space-y-8">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-black text-slate-900">
              Guia Completa: Com utilitzar el Multímetre Digital
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              El multímetre (o tester) és l'eina fonamental per diagnosticar circuits, mesurar tensions i comprovar components.
            </p>
          </div>

          {/* Grid 2 cols */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100">
              <h3 className="text-lg font-black text-sky-900 mb-2 flex items-center gap-2">
                ⚡ Com mesurar Voltatge (Voltímetre DCV)
              </h3>
              <ul className="text-sm space-y-2 text-slate-700">
                <li>• <strong>Connexió en PARAL·LEL:</strong> El voltímetre es col·loca abraçant el component on volem conèixer la diferència de potencial.</li>
                <li>• <strong>Circuit en TENSIÓ:</strong> El circuit ha d'estar alimentat i funcionant.</li>
                <li>• <strong>Puntes de prova:</strong> La punta <strong>negra a COM</strong> (massa / pol negatiu) i la punta <strong>vermella a V/Ω</strong> (potencial positiu).</li>
                <li>• Si inverteixes les puntes, el multímetre simplement marcarà un signe negatiu <strong>(-)</strong>.</li>
              </ul>
            </div>

            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <h3 className="text-lg font-black text-amber-900 mb-2 flex items-center gap-2">
                🏷️ Com mesurar Resistència (Ohímetre Ω)
              </h3>
              <ul className="text-sm space-y-2 text-slate-700">
                <li>• <strong>CIRCUIT DESCONNECTAT:</strong> Mai mesuris la resistència d'un component amb la pila connectada. Pots cremar el fusible de l'instrument!</li>
                <li>• <strong>Sense polaritat:</strong> No importa quina punta és la vermella o la negra per mesurar resistència.</li>
                <li>• <strong>Selecció d'escala:</strong> Comença per una escala superior al valor estimat. Si és massa petita, veuràs <strong>"1 ."</strong> (sobrecàrrega).</li>
                <li>• <strong>Circuit obert:</strong> Si les puntes estan a l'aire, marca <strong>"1 ."</strong> (resistència infinita).</li>
              </ul>
            </div>
          </div>

          {/* Safety and scale rules */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-700">
            <h3 className="text-base font-bold text-amber-400 mb-3 uppercase tracking-wider">
              La Regla d'Or de les Escales en un Multímetre
            </h3>
            <p className="text-sm leading-relaxed text-slate-300 mb-3">
              Els multímetres manuals disposen de diferents rangs màxims. Per exemple, l'escala <strong>20V</strong> permet mesurar de 0 a 20 Volts amb una precisió de 2 decimals. Si la tensió és de 24V, el tester indicarà sobrecàrrega (<strong>1 .</strong>) i caldrà canviar a l'escala de <strong>200V</strong>.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono text-center">
              <div className="bg-slate-800 p-2 rounded">200mV (fins a 0,2 V)</div>
              <div className="bg-slate-800 p-2 rounded">2V (fins a 2 V)</div>
              <div className="bg-slate-800 p-2 rounded text-sky-400 font-bold">20V (Ideal per a piles de 9V i 4.5V)</div>
              <div className="bg-slate-800 p-2 rounded">200V (Pila i circuits alts)</div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: TASKS / EVALUATION */}
      {activeTab === 'tasks' && (
        <MultimeterTasks
          studentName={studentName}
          studentGroup={studentGroup}
          onJumpToBoard={handleJumpToBoard}
        />
      )}
    </div>
  );
};
