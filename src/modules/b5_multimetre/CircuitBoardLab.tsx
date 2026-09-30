import React, { useState } from 'react';
import { MultimeterScale } from './types';
import { HelpCircle } from 'lucide-react';

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
  const renderTestPoint = (id: string, label: string) => {
    const isRedConnected = redProbeTarget === id;
    const isBlackConnected = blackProbeTarget === id;

    return (
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] font-bold text-stone-700 bg-white/95 px-2 py-0.5 rounded shadow-sm border border-stone-200">
          {label}
        </span>
        <div className="relative group">
          <div
            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-[10px] shadow transition transform hover:scale-110 cursor-pointer ${
              isRedConnected
                ? 'bg-red-600 border-white text-white ring-2 ring-red-400'
                : isBlackConnected
                ? 'bg-stone-900 border-white text-white ring-2 ring-stone-400'
                : 'bg-amber-400 border-amber-600 text-stone-900'
            }`}
          >
            {isRedConnected ? '🔴' : isBlackConnected ? '⚫' : '●'}
          </div>

          {/* Quick connect popup buttons on click/hover */}
          <div className="absolute left-1/2 -translate-x-1/2 top-8 hidden group-hover:flex flex-col gap-1 bg-stone-900 text-white p-1 rounded-xl shadow-xl z-20 whitespace-nowrap text-[11px]">
            <button
              onClick={() => onConnectProbe('red', id)}
              className="px-2.5 py-1 bg-red-600 hover:bg-red-500 rounded font-semibold text-left flex items-center gap-1.5"
            >
              🔴 Vermella (V/Ω)
            </button>
            <button
              onClick={() => onConnectProbe('black', id)}
              className="px-2.5 py-1 bg-stone-700 hover:bg-stone-600 rounded font-semibold text-left flex items-center gap-1.5"
            >
              ⚫ Negra (COM)
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm flex flex-col gap-5 text-stone-800">
      {/* Board Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Banc de Pràctiques</span>
          <h3 className="text-xl font-bold text-stone-900">
            {activeBoard === 'resistors' && 'Banc 1: Mesura de Resistències Individuals (Ohímetre)'}
            {activeBoard === 'series' && 'Banc 2: Circuit Sèrie amb Pila de 9V (Voltímetre)'}
            {activeBoard === 'ohm-challenge' && 'Banc 3: Repte de Càlcul de la Llei d\'Ohm (V = I · R)'}
          </h3>
        </div>

        <div className="flex gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
          <button
            onClick={() => onSelectBoard('resistors')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeBoard === 'resistors'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            1. Resistències (Ω)
          </button>
          <button
            onClick={() => onSelectBoard('series')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeBoard === 'series'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            2. Circuit 9V (V)
          </button>
          <button
            onClick={() => onSelectBoard('ohm-challenge')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeBoard === 'ohm-challenge'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            3. Repte Llei d'Ohm
          </button>
        </div>
      </div>

      {/* Tip for the student */}
      <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5">
        <HelpCircle size={18} className="shrink-0 text-amber-700 mt-0.5" />
        <div>
          <strong>Com connectar les puntes del multímetre:</strong> Fes clic sobre qualsevol punt groc (●) i tria <em>"🔴 Vermella"</em> o <em>"⚫ Negra"</em>. Recorda girar el selector del multímetre a la magnitud adequada (DCV per a tensió, Ω per a resistència).
        </div>
      </div>

      {/* BOARD 1: Individual Resistors */}
      {activeBoard === 'resistors' && (
        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 flex flex-col gap-6">
          <div className="flex justify-between items-center text-xs border-b border-stone-200 pb-2">
            <span className="font-bold text-stone-700 uppercase tracking-wider">
              Banc de prova de components desconnectats
            </span>
            <span className="text-stone-500">
              💡 L'ohímetre s'utilitza sempre sense corrent
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Resistor 1: 220 Ω */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col items-center">
              <div className="flex justify-between w-full mb-3 text-xs">
                <span className="font-bold text-stone-900">Resistència R1</span>
                <span className="text-stone-500 font-mono">Teòric: 220 Ω ± 5%</span>
              </div>
              <div className="flex items-center gap-4 w-full justify-center py-2">
                {renderTestPoint('TP-R1A', 'Extrem A')}
                <div className="relative w-40 h-8 bg-amber-100/80 rounded-full border-2 border-amber-300 flex items-center justify-around px-4 shadow-sm">
                  <div className="absolute -left-4 w-4 h-1 bg-stone-400"></div>
                  <div className="absolute -right-4 w-4 h-1 bg-stone-400"></div>
                  <div className="w-2.5 h-full bg-red-600"></div>
                  <div className="w-2.5 h-full bg-red-600"></div>
                  <div className="w-2.5 h-full bg-amber-900"></div>
                  <div className="w-2.5 h-full bg-yellow-400"></div>
                </div>
                {renderTestPoint('TP-R1B', 'Extrem B')}
              </div>
              <div className="text-[11px] text-stone-500 mt-2 font-mono">
                Bandes: Vermell (2) - Vermell (2) - Marró (x10) - Or (±5%)
              </div>
            </div>

            {/* Resistor 2: 1 kΩ */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col items-center">
              <div className="flex justify-between w-full mb-3 text-xs">
                <span className="font-bold text-stone-900">Resistència R2</span>
                <span className="text-stone-500 font-mono">Teòric: 1.000 Ω (1 kΩ) ± 5%</span>
              </div>
              <div className="flex items-center gap-4 w-full justify-center py-2">
                {renderTestPoint('TP-R2A', 'Extrem A')}
                <div className="relative w-40 h-8 bg-amber-100/80 rounded-full border-2 border-amber-300 flex items-center justify-around px-4 shadow-sm">
                  <div className="absolute -left-4 w-4 h-1 bg-stone-400"></div>
                  <div className="absolute -right-4 w-4 h-1 bg-stone-400"></div>
                  <div className="w-2.5 h-full bg-amber-900"></div>
                  <div className="w-2.5 h-full bg-stone-950"></div>
                  <div className="w-2.5 h-full bg-red-600"></div>
                  <div className="w-2.5 h-full bg-yellow-400"></div>
                </div>
                {renderTestPoint('TP-R2B', 'Extrem B')}
              </div>
              <div className="text-[11px] text-stone-500 mt-2 font-mono">
                Bandes: Marró (1) - Negre (0) - Vermell (x100) - Or (±5%)
              </div>
            </div>

            {/* Resistor 3: 4.7 kΩ */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col items-center">
              <div className="flex justify-between w-full mb-3 text-xs">
                <span className="font-bold text-stone-900">Resistència R3</span>
                <span className="text-stone-500 font-mono">Teòric: 4.700 Ω (4.7 kΩ) ± 5%</span>
              </div>
              <div className="flex items-center gap-4 w-full justify-center py-2">
                {renderTestPoint('TP-R3A', 'Extrem A')}
                <div className="relative w-40 h-8 bg-amber-100/80 rounded-full border-2 border-amber-300 flex items-center justify-around px-4 shadow-sm">
                  <div className="absolute -left-4 w-4 h-1 bg-stone-400"></div>
                  <div className="absolute -right-4 w-4 h-1 bg-stone-400"></div>
                  <div className="w-2.5 h-full bg-yellow-500"></div>
                  <div className="w-2.5 h-full bg-purple-600"></div>
                  <div className="w-2.5 h-full bg-red-600"></div>
                  <div className="w-2.5 h-full bg-yellow-400"></div>
                </div>
                {renderTestPoint('TP-R3B', 'Extrem B')}
              </div>
              <div className="text-[11px] text-stone-500 mt-2 font-mono">
                Bandes: Groc (4) - Violeta (7) - Vermell (x100) - Or (±5%)
              </div>
            </div>

            {/* Resistor 4: 10 kΩ */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col items-center">
              <div className="flex justify-between w-full mb-3 text-xs">
                <span className="font-bold text-stone-900">Resistència R4</span>
                <span className="text-stone-500 font-mono">Teòric: 10.000 Ω (10 kΩ) ± 5%</span>
              </div>
              <div className="flex items-center gap-4 w-full justify-center py-2">
                {renderTestPoint('TP-R4A', 'Extrem A')}
                <div className="relative w-40 h-8 bg-amber-100/80 rounded-full border-2 border-amber-300 flex items-center justify-around px-4 shadow-sm">
                  <div className="absolute -left-4 w-4 h-1 bg-stone-400"></div>
                  <div className="absolute -right-4 w-4 h-1 bg-stone-400"></div>
                  <div className="w-2.5 h-full bg-amber-900"></div>
                  <div className="w-2.5 h-full bg-stone-950"></div>
                  <div className="w-2.5 h-full bg-orange-500"></div>
                  <div className="w-2.5 h-full bg-yellow-400"></div>
                </div>
                {renderTestPoint('TP-R4B', 'Extrem B')}
              </div>
              <div className="text-[11px] text-stone-500 mt-2 font-mono">
                Bandes: Marró (1) - Negre (0) - Taronja (x1.000) - Or (±5%)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOARD 2: Series Circuit 9V */}
      {activeBoard === 'series' && (
        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 flex flex-col gap-6">
          <div className="flex flex-wrap justify-between items-center text-xs border-b border-stone-200 pb-2">
            <span className="font-bold text-stone-700 uppercase tracking-wider">
              Circuit sèrie 9V amb caigudes de tensió
            </span>
            <div className="flex items-center gap-2">
              <span className="text-stone-500">Interruptor:</span>
              <button
                onClick={() => setSwitchClosed(!switchClosed)}
                className={`px-3 py-1 rounded-xl font-bold text-xs transition ${
                  switchClosed
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {switchClosed ? 'TANCAT (Passa corrent)' : 'OBERT (Tallat)'}
              </button>
            </div>
          </div>

          {/* Schematic Diagram Layout */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 overflow-x-auto">
            {/* Battery 9V */}
            <div className="flex flex-col items-center bg-stone-50 p-4 rounded-2xl border border-stone-200 min-w-[130px]">
              <div className="text-xs font-bold text-stone-700 mb-1">PILA 9V</div>
              <div className="w-16 h-24 bg-stone-100 rounded-xl border-2 border-stone-400 flex flex-col justify-between items-center p-2 shadow-inner">
                <div className="text-[11px] font-bold text-red-600">+ POSITIU</div>
                <div className="text-2xl">🔋</div>
                <div className="text-[11px] font-bold text-stone-600">- NEGATIU</div>
              </div>
              <div className="flex gap-4 mt-2">
                {renderTestPoint('TP-BAT-POS', 'Born (+)')}
                {renderTestPoint('TP-BAT-NEG', 'Born (-)')}
              </div>
            </div>

            {/* Switch */}
            <div className="flex flex-col items-center bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="text-xs font-bold text-stone-700 mb-2">INTERRUPTOR</div>
              <div
                onClick={() => setSwitchClosed(!switchClosed)}
                className="w-16 h-12 bg-white rounded-xl border-2 border-stone-300 flex items-center justify-center cursor-pointer hover:border-amber-400 p-2 shadow-sm"
              >
                <div className={`w-8 h-1 transition-transform origin-left ${switchClosed ? 'bg-emerald-600 rotate-0' : 'bg-red-500 -rotate-45'}`}></div>
              </div>
              <div className="mt-2">
                {renderTestPoint('TP-SW-OUT', 'Després Interruptor')}
              </div>
            </div>

            {/* Resistor R1 = 220 Ω */}
            <div className="flex flex-col items-center bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="text-xs font-bold text-stone-700 mb-1">R1 = 220 Ω</div>
              <div className="w-24 h-6 bg-amber-100/90 rounded-full border border-amber-300 flex items-center justify-around px-2 my-2 shadow-sm">
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
            <div className="flex flex-col items-center bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="text-xs font-bold text-stone-700 mb-1">R2 = 680 Ω</div>
              <div className="w-24 h-6 bg-amber-100/90 rounded-full border border-amber-300 flex items-center justify-around px-2 my-2 shadow-sm">
                <div className="w-1.5 h-full bg-blue-600"></div>
                <div className="w-1.5 h-full bg-stone-400"></div>
                <div className="w-1.5 h-full bg-amber-900"></div>
                <div className="w-1.5 h-full bg-yellow-400"></div>
              </div>
              <div className="flex gap-4 mt-1">
                {renderTestPoint('TP-MID-NODE-2', 'Entrada R2')}
                {renderTestPoint('TP-GND-RETURN', 'Retorn (-)')}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-white p-4 rounded-2xl border border-stone-200 text-stone-600">
            <div>
              <strong className="text-stone-900 block mb-0.5">Mesura 1: Tensió de Pila</strong>
              Vermella a <strong>Born (+)</strong> i Negra a <strong>Born (-)</strong> (\(\approx 9.0\text{ V}\)).
            </div>
            <div>
              <strong className="text-stone-900 block mb-0.5">Mesura 2: Caiguda a R1</strong>
              Vermella a <strong>Entrada R1</strong> i Negra a <strong>Punt Mig</strong> (\(\approx 2.20\text{ V}\)).
            </div>
            <div>
              <strong className="text-stone-900 block mb-0.5">Mesura 3: Caiguda a R2</strong>
              Vermella a <strong>Punt Mig</strong> i Negra a <strong>Retorn (-)</strong> (\(\approx 6.80\text{ V}\)). Comprova que \(V_1 + V_2 = 9\text{V}\)!
            </div>
          </div>
        </div>
      )}

      {/* BOARD 3: Ohm's Law Mystery Challenge */}
      {activeBoard === 'ohm-challenge' && (
        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 flex flex-col gap-6">
          <div className="flex justify-between items-center text-xs border-b border-stone-200 pb-2">
            <span className="font-bold text-stone-700 uppercase tracking-wider">
              Deducció de la Resistència Incògnita mitjançant la Llei d'Ohm
            </span>
            <span className="text-amber-800 font-bold">
              Fórmula: R = V / I
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-around gap-6">
            {/* Power supply 12V */}
            <div className="flex flex-col items-center bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <span className="text-xs font-bold text-stone-600 uppercase">Font d'Alimentació</span>
              <span className="text-2xl font-bold text-stone-900 font-mono my-2">12.0 V</span>
              <div className="flex gap-4">
                {renderTestPoint('TP-OHM-VCC', 'V+ (12V)')}
                {renderTestPoint('TP-OHM-GND', 'GND (0V)')}
              </div>
            </div>

            {/* Milliammeter reading */}
            <div className="flex flex-col items-center bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <span className="text-xs font-bold text-stone-600 uppercase">Amperímetre del Circuit</span>
              <div className="bg-white px-4 py-2 rounded-xl border border-stone-300 my-2 shadow-inner">
                <span className="text-2xl font-bold text-sky-700 font-mono">40.0 mA</span>
              </div>
              <span className="text-[11px] text-stone-500 font-mono">I = 0.040 Amperes</span>
            </div>

            {/* Mystery Resistor Rx */}
            <div className="flex flex-col items-center bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <span className="text-xs font-bold text-stone-600 uppercase">Resistència Incògnita Rx</span>
              <div className="w-28 h-12 bg-amber-100 rounded-2xl border-2 border-amber-300 flex items-center justify-center text-xl font-bold text-amber-900 shadow-sm my-2">
                ❓ Rx
              </div>
              <div className="flex gap-4">
                {renderTestPoint('TP-RX-IN', 'Extrem A (Rx)')}
                {renderTestPoint('TP-RX-OUT', 'Extrem B (Rx)')}
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-2">
            <strong className="text-stone-900 block text-sm">Com deduir la resistència Rx:</strong>
            <ol className="list-decimal list-inside space-y-1">
              <li>Posa el multímetre a l'escala <strong>DCV 20V</strong>.</li>
              <li>Connecta la punta vermella a <strong>Extrem A (Rx)</strong> i la negra a <strong>Extrem B (Rx)</strong> per mesurar el voltatge (V = 12.0 V).</li>
              <li>Llegeix el corrent a l'amperímetre: I = 40 mA = 0.040 A.</li>
              <li>Aplica la Llei d'Ohm: Rx = V / I = 12 / 0.040 = 300 Ω.</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
