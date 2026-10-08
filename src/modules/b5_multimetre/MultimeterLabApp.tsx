import React, { useState } from 'react';
import { MultimeterScale } from './types';
import { MultimeterDevice } from './MultimeterDevice';
import { CircuitBoardLab } from './CircuitBoardLab';
import { MultimeterTasks } from './MultimeterTasks';
import { computeMultimeterReading } from './multimeterEngine';
import { BookOpen, Wrench, FileCheck2, Lightbulb, ArrowLeft } from 'lucide-react';

interface MultimeterLabAppProps {
  studentName: string;
  studentGroup: string;
  onBackToDashboard?: () => void;
}

export const MultimeterLabApp: React.FC<MultimeterLabAppProps> = ({
  studentName,
  studentGroup,
  onBackToDashboard,
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
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 text-stone-800">
      {/* Top Banner / Mode Switcher */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold uppercase rounded-full tracking-wide">
              Bloc 7 de 7 • 35 minuts • Tasca Final
            </span>
            <span className="text-xs text-stone-500 font-medium">Laboratori d'Instrumentació</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
            Laboratori Virtual: Mesures i Càlculs amb Multímetre
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Maneja el tester o polímetre digital com un autèntic professional de la tecnologia i resol els reptes de voltatge i resistència.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 shrink-0">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              activeTab === 'simulator'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Wrench size={16} className="text-amber-600" />
            Simulador & Bancs
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              activeTab === 'theory'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen size={16} className="text-amber-600" />
            Guia del Tester
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              activeTab === 'tasks'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileCheck2 size={16} className="text-amber-600" />
            Quadern d'Avaluació
          </button>
        </div>
      </div>

      {/* VIEW 1: SIMULATOR & WORKBENCH */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Multimeter Device */}
          <div className="lg:col-span-4 sticky top-20 z-10">
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

            <div className="mt-4 p-4 bg-white rounded-2xl border border-stone-200 text-xs text-stone-600 shadow-sm">
              <h4 className="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                <Lightbulb size={16} className="text-amber-500" /> Consell de laboratori:
              </h4>
              <p>
                Connecta les puntes fent clic als punts grocs del circuit. Després vés a la pestanya <strong>"Quadern d'Avaluació"</strong> per respondre les preguntes i obtenir la teva nota!
              </p>
            </div>
          </div>

          {/* Interactive Circuit Boards */}
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
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm text-stone-800 max-w-4xl mx-auto space-y-8">
          <div className="border-b border-stone-200 pb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
              Guia d'Ús del Multímetre Digital
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              El multímetre (o tester) és l'eina clau per mesurar magnituds elèctriques i trobar avaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-3">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                ⚡ Mesura de Tensió (Voltímetre DCV)
              </h3>
              <ul className="text-xs space-y-2 text-stone-700 leading-relaxed">
                <li>• <strong>Connexió en PARAL·LEL:</strong> El voltímetre es col·loca abraçant els dos extrems del component on volem conèixer el voltatge.</li>
                <li>• <strong>Circuit alimentat:</strong> El circuit ha d'estar connectat a la pila i en funcionament.</li>
                <li>• <strong>Borns:</strong> Punta negra a <strong>COM</strong> i vermella a <strong>V/Ω</strong>.</li>
                <li>• Si inverteixes les puntes, el multímetre mostrarà el signe negatiu <strong>(-)</strong>.</li>
              </ul>
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-3">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                🏷️ Mesura de Resistència (Ohímetre Ω)
              </h3>
              <ul className="text-xs space-y-2 text-stone-700 leading-relaxed">
                <li>• <strong>CIRCUIT DESCONNECTAT:</strong> Mai mesuris resistència amb la pila o font activada. Pots fer malbé el fusible intern!</li>
                <li>• <strong>Sense polaritat:</strong> Per mesurar resistència és indiferent on poses la punta vermella o la negra.</li>
                <li>• <strong>Sobrecàrrega:</strong> Si l'escala és massa petita o el circuit és obert, la pantalla mostra <strong>"1 ."</strong>.</li>
              </ul>
            </div>
          </div>

          {/* Scale rules */}
          <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200/80 space-y-3">
            <h3 className="text-base font-bold text-stone-900">
              Com triar l'escala adequada?
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              En un tester manual has d'escollir un rang superior al valor que vols mesurar. Per exemple, per mesurar una pila de 9V l'escala <strong>20V DCV</strong> és perfecta. Si poses 2V, sortirà sobrecàrrega (1 .).
            </p>
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

      {/* Footer navigation */}
      {onBackToDashboard && (
        <div className="flex justify-start pt-2">
          <button
            onClick={onBackToDashboard}
            className="text-stone-600 hover:text-stone-900 font-bold text-xs flex items-center gap-1.5"
          >
            <ArrowLeft size={16} /> Tornar a l'Itinerari
          </button>
        </div>
      )}
    </div>
  );
};
