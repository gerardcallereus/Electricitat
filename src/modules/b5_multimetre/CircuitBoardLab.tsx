import React, { useState } from 'react';
import { MultimeterScale } from './types';
import { Zap, Play, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

interface CircuitBoardLabProps {
  activeBoard: 'resistors' | 'series' | 'ohm-challenge';
  onSelectBoard: (board: 'resistors' | 'series' | 'ohm-challenge') => void;
  redProbeTarget: string | null;
  blackProbeTarget: string | null;
  onConnectProbe: (probe: 'red' | 'black', targetId: string) => void;
  scale: MultimeterScale;
}

export const CircuitBoardLab: React.FC<CircuitBoardLabProps> = ({
  activeBoard,
  onSelectBoard,
  redProbeTarget,
  blackProbeTarget,
  onConnectProbe,
  scale,
}) => {
  const [switchClosed, setSwitchClosed] = useState<boolean>(true);

  // Helper for quick connect button on test points
  const renderTestPoint = (id: string, label: string, color: string = 'amber') => {
    const isRedConnected = redProbeTarget === id;
    const isBlackConnected = blackProbeTarget === id;

    return (
      <div className="flex flex-col items-center gap-1">
        <div className="text-[11px] font-bold text-slate-700 bg-white/90 px-1.5 py-0.5 rounded shadow-sm border border-slate-300">
          {label}
        </div>
        <div className="relative group">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-[10px] shadow transition transform hover:scale-110 cursor-pointer ${
              isRedConnected
                ? 'bg-red-600 border-white text-white ring-2 ring-red-400'
                : isBlackConnected
                ? 'bg-slate-900 border-white text-white ring-2 ring-slate-400'
                : 'bg-amber-400 border-amber-600 text-amber-950'
            }`}
          >
            {isRedConnected ? '🔴' : isBlackConnected ? '⚫' : '●'}
          </div>

          {/* Quick connect popup buttons on click/hover */}
          <div className="absolute left-1/2 -translate-x-1/2 top-7 hidden group-hover:flex flex-col gap-1 bg-slate-900 text-white p-1 rounded-lg shadow-xl z-20 whitespace-nowrap text-[10px]">
            <button
              onClick={() => onConnectProbe('red', id)}
              className="px-2 py-0.5 bg-red-600 hover:bg-red-500 rounded font-semibold text-left flex items-center gap-1"
            >
              🔴 Vermella aquí
            </button>
            <button
              onClick={() => onConnectProbe('black', id)}
              className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded font-semibold text-left flex items-center gap-1"
            >
              ⚫ Negra aquí
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-slate-100 rounded-3xl p-6 border-2 border-slate-300 shadow-xl flex flex-col gap-5">
      {/* Board Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-300 pb-4">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Banc de Pràctiques</span>
          <h3 className="text-xl font-black text-slate-800">
            {activeBoard === 'resistors' && '1. Banc de Resistències Individuals (Mesura de R)'}
            {activeBoard === 'series' && '2. Circuit Sèrie amb Pila de 9V (Mesura de V)'}
            {activeBoard === 'ohm-challenge' && '3. Repte de Càlcul de la Llei d\'Ohm (V = I · R)'}
          </h3>
        </div>

        <div className="flex gap-1.5 bg-slate-200 p-1.5 rounded-xl">
          <button
            onClick={() => onSelectBoard('resistors')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeBoard === 'resistors'
                ? 'bg-amber-500 text-white shadow'
                : 'text-slate-600 hover:bg-slate-300'
            }`}
          >
            Banc Resistències (Ω)
          </button>
          <button
            onClick={() => onSelectBoard('series')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeBoard === 'series'
                ? 'bg-amber-500 text-white shadow'
                : 'text-slate-600 hover:bg-slate-300'
            }`}
          >
            Circuit Sèrie 9V (V)
          </button>
          <button
            onClick={() => onSelectBoard('ohm-challenge')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeBoard === 'ohm-challenge'
                ? 'bg-amber-500 text-white shadow'
                : 'text-slate-600 hover:bg-slate-300'
            }`}
          >
            Repte Llei d'Ohm
          </button>
        </div>
      </div>

      {/* Tip for the student */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-xl text-xs text-amber-900 flex items-start gap-2">
        <HelpCircle size={18} className="shrink-0 text-amber-600 mt-0.5" />
        <div>
          <strong>Com connectar les puntes del multímetre:</strong> Posa el cursor sobre qualsevol punt de prova groc (●) i fes clic a <em>"🔴 Vermella aquí"</em> o <em>"⚫ Negra aquí"</em>. Recorda girar el selector del multímetre a la magnitud adequada (DCV per a tensió, Ω per a resistència).
        </div>
      </div>

      {/* BOARD 1: Individual Resistors */}
      {activeBoard === 'resistors' && (
        <div className="bg-emerald-950 p-6 rounded-2xl border-4 border-emerald-900 text-white shadow-inner flex flex-col gap-6">
          <div className="flex justify-between items-center text-xs border-b border-emerald-800 pb-2">
            <span className="font-mono text-emerald-400 font-bold uppercase tracking-wider">
              BANC-01: COMPONENT TESTER (SENSE CORRENT)
            </span>
            <span className="text-emerald-300">
              💡 L'ohímetre s'utilitza sempre amb el component desconnectat
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resistor 1: 220 Ω */}
            <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-700/50 flex flex-col items-center">
              <div className="flex justify-between w-full mb-3 text-xs">
                <span className="font-bold text-amber-300">Resistència R1</span>
                <span className="text-emerald-300 font-mono">Teòric: 220 Ω ± 5%</span>
              </div>
              <div className="flex items-center gap-4 w-full justify-center py-2">
                {renderTestPoint('TP-R1A', 'Extrem A')}
                {/* Resistor body */}
                <div className="relative w-40 h-8 bg-amber-100 rounded-full border-2 border-amber-200 flex items-center justify-around px-4 shadow">
                  <div className="absolute -left-4 w-4 h-1 bg-slate-300"></div>
                  <div className="absolute -right-4 w-4 h-1 bg-slate-300"></div>
                  {/* Bands: Red, Red, Brown, Gold */}
                  <div className="w-2.5 h-full bg-red-600"></div>
                  <div className="w-2.5 h-full bg-red-600"></div>
                  <div className="w-2.5 h-full bg-amber-900"></div>
                  <div className="w-2.5 h-full bg-yellow-400"></div>
                </div>
                {renderTestPoint('TP-R1B', 'Extrem B')}
              </div>
              <div className="text-[11px] text-slate-300 mt-2 font-mono">
                Bandes: Vermell (2) - Vermell (2) - Marró (x10) - Or (±5%)
              </div>
            </div>

            {/* Resistor 2: 1 kΩ (1000 Ω) */}
            <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-700/50 flex flex-col items-center">
              <div className="flex justify-between w-full mb-3 text-xs">
                <span className="font-bold text-amber-300">Resistència R2</span>
                <span className="text-emerald-300 font-mono">Teòric: 1.000 Ω (1 kΩ) ± 5%</span>
              </div>
              <div className="flex items-center gap-4 w-full justify-center py-2">
                {renderTestPoint('TP-R2A', 'Extrem A')}
                {/* Resistor body */}
                <div className="relative w-40 h-8 bg-amber-100 rounded-full border-2 border-amber-200 flex items-center justify-around px-4 shadow">
                  <div className="absolute -left-4 w-4 h-1 bg-slate-300"></div>
                  <div className="absolute -right-4 w-4 h-1 bg-slate-300"></div>
                  {/* Bands: Brown, Black, Red, Gold */}
                  <div className="w-2.5 h-full bg-amber-900"></div>
                  <div className="w-2.5 h-full bg-slate-950"></div>
                  <div className="w-2.5 h-full bg-red-600"></div>
                  <div className="w-2.5 h-full bg-yellow-400"></div>
                </div>
                {renderTestPoint('TP-R2B', 'Extrem B')}
              </div>
              <div className="text-[11px] text-slate-300 mt-2 font-mono">
                Bandes: Marró (1) - Negre (0) - Vermell (x100) - Or (±5%)
              </div>
            </div>

            {/* Resistor 3: 4.7 kΩ (4700 Ω) */}
            <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-700/50 flex flex-col items-center">
              <div className="flex justify-between w-full mb-3 text-xs">
                <span className="font-bold text-amber-300">Resistència R3</span>
                <span className="text-emerald-300 font-mono">Teòric: 4.700 Ω (4.7 kΩ) ± 5%</span>
              </div>
              <div className="flex items-center gap-4 w-full justify-center py-2">
                {renderTestPoint('TP-R3A', 'Extrem A')}
                {/* Resistor body */}
                <div className="relative w-40 h-8 bg-amber-100 rounded-full border-2 border-amber-200 flex items-center justify-around px-4 shadow">
                  <div className="absolute -left-4 w-4 h-1 bg-slate-300"></div>
                  <div className="absolute -right-4 w-4 h-1 bg-slate-300"></div>
                  {/* Bands: Yellow, Violet, Red, Gold */}
                  <div className="w-2.5 h-full bg-yellow-500"></div>
                  <div className="w-2.5 h-full bg-purple-600"></div>
                  <div className="w-2.5 h-full bg-red-600"></div>
                  <div className="w-2.5 h-full bg-yellow-400"></div>
                </div>
                {renderTestPoint('TP-R3B', 'Extrem B')}
              </div>
              <div className="text-[11px] text-slate-300 mt-2 font-mono">
                Bandes: Groc (4) - Violeta (7) - Vermell (x100) - Or (±5%)
              </div>
            </div>

            {/* Resistor 4: 10 kΩ (10000 Ω) */}
            <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-700/50 flex flex-col items-center">
              <div className="flex justify-between w-full mb-3 text-xs">
                <span className="font-bold text-amber-300">Resistència R4</span>
                <span className="text-emerald-300 font-mono">Teòric: 10.000 Ω (10 kΩ) ± 5%</span>
              </div>
              <div className="flex items-center gap-4 w-full justify-center py-2">
                {renderTestPoint('TP-R4A', 'Extrem A')}
                {/* Resistor body */}
                <div className="relative w-40 h-8 bg-amber-100 rounded-full border-2 border-amber-200 flex items-center justify-around px-4 shadow">
                  <div className="absolute -left-4 w-4 h-1 bg-slate-300"></div>
                  <div className="absolute -right-4 w-4 h-1 bg-slate-300"></div>
                  {/* Bands: Brown, Black, Orange, Gold */}
                  <div className="w-2.5 h-full bg-amber-900"></div>
                  <div className="w-2.5 h-full bg-slate-950"></div>
                  <div className="w-2.5 h-full bg-orange-500"></div>
                  <div className="w-2.5 h-full bg-yellow-400"></div>
                </div>
                {renderTestPoint('TP-R4B', 'Extrem B')}
              </div>
              <div className="text-[11px] text-slate-300 mt-2 font-mono">
                Bandes: Marró (1) - Negre (0) - Taronja (x1.000) - Or (±5%)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOARD 2: Series Circuit 9V */}
      {activeBoard === 'series' && (
        <div className="bg-slate-900 p-6 rounded-2xl border-4 border-slate-700 text-white shadow-inner flex flex-col gap-6">
          <div className="flex flex-wrap justify-between items-center text-xs border-b border-slate-800 pb-2">
            <span className="font-mono text-sky-400 font-bold uppercase tracking-wider">
              BANC-02: CIRCUIT SÈRIE 9V AMB CAIGUDES DE TENSIÓ
            </span>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Estat de l'interruptor:</span>
              <button
                onClick={() => setSwitchClosed(!switchClosed)}
                className={`px-3 py-1 rounded-md font-bold text-xs flex items-center gap-1.5 transition ${
                  switchClosed
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-red-600 hover:bg-red-500 text-white'
                }`}
              >
                {switchClosed ? 'Interruptor TANCAT (Passa corrent)' : 'Interruptor OBERT (No passa corrent)'}
              </button>
            </div>
          </div>

          {/* Schematic Diagram Layout */}
          <div className="relative bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 overflow-x-auto">
            {/* Battery 9V */}
            <div className="flex flex-col items-center bg-slate-900 p-4 rounded-xl border border-slate-700 min-w-[130px]">
              <div className="text-xs font-bold text-amber-400 mb-1">PILA 9V</div>
              <div className="w-16 h-24 bg-gradient-to-t from-slate-800 to-slate-700 rounded-lg border-2 border-slate-600 flex flex-col justify-between items-center p-2 relative shadow">
                <div className="text-xs font-bold text-red-400">+ POSITIU</div>
                <div className="text-xl">🔋</div>
                <div className="text-xs font-bold text-slate-400">- NEGATIU</div>
              </div>
              <div className="flex gap-4 mt-2">
                {renderTestPoint('TP-BAT-POS', 'Born (+)')}
                {renderTestPoint('TP-BAT-NEG', 'Born (-)')}
              </div>
            </div>

            {/* Switch */}
            <div className="flex flex-col items-center bg-slate-900 p-4 rounded-xl border border-slate-700">
              <div className="text-xs font-bold text-slate-300 mb-2">INTERRUPTOR</div>
              <div
                onClick={() => setSwitchClosed(!switchClosed)}
                className="w-16 h-12 bg-slate-800 rounded border border-slate-600 flex items-center justify-center cursor-pointer hover:border-amber-400 p-2"
              >
                <div className={`w-8 h-1 transition-transform origin-left ${switchClosed ? 'bg-emerald-400 rotate-0' : 'bg-red-400 -rotate-45'}`}></div>
              </div>
              <div className="mt-2">
                {renderTestPoint('TP-SW-OUT', 'Després Interruptor')}
              </div>
            </div>

            {/* Resistor R1 = 220 Ω */}
            <div className="flex flex-col items-center bg-slate-900 p-4 rounded-xl border border-slate-700">
              <div className="text-xs font-bold text-amber-300 mb-1">R1 = 220 Ω</div>
              <div className="w-24 h-6 bg-amber-100 rounded-full border border-amber-300 flex items-center justify-around px-2 my-2 shadow">
                <div className="w-1.5 h-full bg-red-600"></div>
                <div className="w-1.5 h-full bg-red-600"></div>
                <div className="w-1.5 h-full bg-amber-900"></div>
                <div className="w-1.5 h-full bg-yellow-400"></div>
              </div>
              <div className="flex gap-4 mt-1">
                {renderTestPoint('TP-R1-IN', 'Entrada R1')}
                {renderTestPoint('TP-MID-NODE', 'Punt Mig')}
              </div>
            </div>

            {/* Resistor R2 = 680 Ω */}
            <div className="flex flex-col items-center bg-slate-900 p-4 rounded-xl border border-slate-700">
              <div className="text-xs font-bold text-amber-300 mb-1">R2 = 680 Ω</div>
              <div className="w-24 h-6 bg-amber-100 rounded-full border border-amber-300 flex items-center justify-around px-2 my-2 shadow">
                {/* Blue, Grey, Brown, Gold */}
                <div className="w-1.5 h-full bg-blue-600"></div>
                <div className="w-1.5 h-full bg-slate-400"></div>
                <div className="w-1.5 h-full bg-amber-900"></div>
                <div className="w-1.5 h-full bg-yellow-400"></div>
              </div>
              <div className="flex gap-4 mt-1">
                {renderTestPoint('TP-MID-NODE-2', 'Entrada R2')}
                {renderTestPoint('TP-GND-RETURN', 'Retorn (-)')}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-slate-300">
              <span className="font-bold text-sky-400 block mb-1">Mesura 1: Tensió de Pila</span>
              Vermella a <strong>Born (+)</strong> i Negra a <strong>Born (-)</strong>. Hauria de marcar ~9.0 V.
            </div>
            <div className="text-slate-300">
              <span className="font-bold text-amber-400 block mb-1">Mesura 2: Caiguda a R1</span>
              Vermella a <strong>Entrada R1</strong> i Negra a <strong>Punt Mig</strong>. Quants Volts cauen a R1?
            </div>
            <div className="text-slate-300">
              <span className="font-bold text-emerald-400 block mb-1">Mesura 3: Caiguda a R2</span>
              Vermella a <strong>Punt Mig</strong> i Negra a <strong>Retorn (-)</strong>. Quants Volts cauen a R2? Comprova que V1 + V2 = 9V!
            </div>
          </div>
        </div>
      )}

      {/* BOARD 3: Ohm's Law Mystery Challenge */}
      {activeBoard === 'ohm-challenge' && (
        <div className="bg-indigo-950 p-6 rounded-2xl border-4 border-indigo-900 text-white shadow-inner flex flex-col gap-6">
          <div className="flex justify-between items-center text-xs border-b border-indigo-800 pb-2">
            <span className="font-mono text-indigo-400 font-bold uppercase tracking-wider">
              BANC-03: DEDUCCIÓ DE LA RESISTÈNCIA INCÒGNITA MITJANÇANT LA LLEI D'OHM
            </span>
            <span className="text-indigo-300">
              Fórmula clau: <strong className="text-amber-300">R = V / I</strong>
            </span>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-indigo-800 flex flex-col md:flex-row items-center justify-around gap-6">
            {/* Power supply 12V */}
            <div className="flex flex-col items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase">Font d'alimentació</span>
              <span className="text-2xl font-black text-amber-400 font-mono my-2">12.0 V</span>
              <div className="flex gap-4">
                {renderTestPoint('TP-OHM-VCC', 'V+ (12V)')}
                {renderTestPoint('TP-OHM-GND', 'GND (0V)')}
              </div>
            </div>

            {/* Milliammeter reading */}
            <div className="flex flex-col items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-sky-400 uppercase">Amperímetre del Circuit</span>
              <div className="bg-slate-900 px-4 py-2 rounded-lg border border-sky-600/40 my-2">
                <span className="text-2xl font-black text-sky-400 font-mono">40.0 mA</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">I = 0.040 Amperes</span>
            </div>

            {/* Mystery Resistor Rx */}
            <div className="flex flex-col items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase">Resistència Incògnita Rx</span>
              <div className="w-28 h-12 bg-gradient-to-r from-amber-700 to-amber-900 rounded-xl border-2 border-amber-500 flex items-center justify-center text-2xl font-black text-white shadow my-2">
                ❓ Rx
              </div>
              <div className="flex gap-4">
                {renderTestPoint('TP-RX-IN', 'Extrem A (Rx)')}
                {renderTestPoint('TP-RX-OUT', 'Extrem B (Rx)')}
              </div>
            </div>
          </div>

          <div className="bg-indigo-900/40 p-4 rounded-xl border border-indigo-700 text-xs text-indigo-100 flex flex-col gap-2">
            <div className="font-bold text-amber-300">Com resoldre el repte de la resistència incògnita Rx:</div>
            <ol className="list-decimal list-inside space-y-1">
              <li>Col·loca el multímetre a l'escala <strong>DCV 20V</strong>.</li>
              <li>Connecta la punta vermella a <strong>Extrem A (Rx)</strong> i la negra a <strong>Extrem B (Rx)</strong> per mesurar la tensió \(V\).</li>
              <li>Observa el corrent que marca l'amperímetre: \(I = 40\text{ mA} = 0,040\text{ A}\).</li>
              <li>Aplica la Llei d'Ohm: \(R = \frac{V}{I}\). Anota el resultat a la teva tasca d'avaluació!</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
