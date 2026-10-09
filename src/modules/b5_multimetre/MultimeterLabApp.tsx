import React, { useState } from 'react';
import { MultimeterScale } from './types';
import { MultimeterDevice } from './MultimeterDevice';
import { CircuitBoardLab } from './CircuitBoardLab';
import { MultimeterTasks } from './MultimeterTasks';
import { computeMultimeterReading } from './multimeterEngine';
import { BookOpen, Wrench, FileCheck2, Lightbulb, ArrowLeft, Layers } from 'lucide-react';

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
    // Smooth scroll up to workbench
    const benchElem = document.getElementById('workbench-section');
    if (benchElem) {
      benchElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-10 text-stone-800">
      {/* Top Banner */}
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
            Llegeix primer la guia de seguretat i maneig del tester, realitza les mesures als bancs de proves i completa el teu quadern d'avaluació tot seguit a sota.
          </p>
        </div>

        <div className="px-4 py-2 bg-stone-100 rounded-2xl border border-stone-200 text-xs text-stone-600 font-medium flex items-center gap-2 shrink-0">
          <Layers size={16} className="text-amber-600" />
          <span>Seqüència Lineal: Guia + Bancs + Tasca</span>
        </div>
      </div>

      {/* ========================================================
          1. GUIA D'ÚS DEL MULTÍMETRE (TEORIA DEL TESTER)
      ======================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm space-y-6">
        <div className="border-b border-stone-200 pb-3 flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            7.1
          </span>
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              Guia Ràpida d'Ús del Multímetre Digital (Tester)
            </h2>
            <p className="text-xs text-stone-500">
              Conceptes clau imprescindibles abans de començar a prendre mesures.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-3">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              ⚡ Mesura de Tensió (Voltímetre DCV)
            </h3>
            <ul className="text-xs space-y-2 text-stone-700 leading-relaxed">
              <li>• <strong>Connexió en PARAL·LEL:</strong> El voltímetre es col·loca abraçant els dos extrems del component on volem mesurar la caiguda de tensió.</li>
              <li>• <strong>Circuit alimentat:</strong> El circuit ha d'estar connectat a la pila i amb el corrent passant.</li>
              <li>• <strong>Borns:</strong> Punta negra a <strong>COM</strong> i vermella a <strong>V/Ω</strong>.</li>
              <li>• Si inverteixes les puntes, el multímetre mostrarà un signe negatiu <strong>(-)</strong>.</li>
            </ul>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-3">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              🏷️ Mesura de Resistència (Ohímetre Ω)
            </h3>
            <ul className="text-xs space-y-2 text-stone-700 leading-relaxed">
              <li>• <strong>CIRCUIT DESCONNECTAT:</strong> Mai mesuris resistència amb la pila connectada! Podries danyar el tester o cremar el fusible intern.</li>
              <li>• <strong>Sense polaritat:</strong> Per mesurar resistència és indiferent quin extrem toca la punta vermella o la negra.</li>
              <li>• <strong>Sobrecàrrega:</strong> Si l'escala seleccionada és massa petita o el circuit està obert, la pantalla mostra <strong>"1 ."</strong>.</li>
            </ul>
          </div>
        </div>

        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 text-xs text-stone-700 leading-relaxed">
          🎯 <strong>Com triar l'escala adequada?</strong> Has de seleccionar un rang immediatament superior al valor esperat. Per exemple, per mesurar una pila de 9V l'escala ideal és <strong>20V DCV</strong>. Si poses 2V, marcarà sobrecàrrega (1 .).
        </div>
      </div>

      {/* ========================================================
          2. BANCS DE PROVA I SIMULADOR DE MULTÍMETRE
      ======================================================== */}
      <div id="workbench-section" className="space-y-4">
        <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
          <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            7.2
          </span>
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              Bancs de Pràctica i Multímetre Interactiu
            </h2>
            <p className="text-xs text-stone-500">
              Selecciona el banc de proves, gira la rodeta del multímetre i fes clic als punts de test per connectar les puntes.
            </p>
          </div>
        </div>

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
                <Lightbulb size={16} className="text-amber-500" /> Consell pràctic:
              </h4>
              <p>
                Connecta les puntes fent clic als punts grocs del circuit. Les lectures que obtinguis et serviran per respondre el <strong>Quadern d'Avaluació</strong> de sota!
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
      </div>

      {/* ========================================================
          3. QUADERN D'AVALUACIÓ PRÀCTICA FINAL (DIRECTAMENT A SOTA)
      ======================================================== */}
      <div className="space-y-4 pt-4 border-t-2 border-dashed border-stone-200">
        <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
          <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            7.3
          </span>
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              Quadern d'Avaluació i Resolució de Reptes
            </h2>
            <p className="text-xs text-stone-500">
              Anota les mesures obtingudes al tester superior, resol els càlculs i genera el teu informe final per al professorat.
            </p>
          </div>
        </div>

        <MultimeterTasks
          studentName={studentName}
          studentGroup={studentGroup}
          onJumpToBoard={handleJumpToBoard}
        />
      </div>

      {/* Footer navigation */}
      {onBackToDashboard && (
        <div className="flex justify-start pt-2">
          <button
            onClick={onBackToDashboard}
            className="text-stone-600 hover:text-stone-900 font-bold text-xs flex items-center gap-1.5"
          >
            <ArrowLeft size={16} /> Tornar a l'Itinerari Principal
          </button>
        </div>
      )}
    </div>
  );
};
