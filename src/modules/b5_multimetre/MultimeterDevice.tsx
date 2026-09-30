import React from 'react';
import { MultimeterScale } from './types';
import { Power, Info, HelpCircle } from 'lucide-react';

interface MultimeterDeviceProps {
  scale: MultimeterScale;
  onScaleChange: (scale: MultimeterScale) => void;
  redProbeTarget: string | null;
  blackProbeTarget: string | null;
  displayValue: string;
  displayUnit: string;
  isOverload: boolean;
  isNegative: boolean;
  statusMessage?: string;
  onClearProbes?: () => void;
}

const SCALE_POSITIONS: { id: MultimeterScale; label: string; group: 'OFF' | 'DCV' | 'RES'; angle: number }[] = [
  { id: 'OFF', label: 'OFF', group: 'OFF', angle: 0 },
  // DCV section (clockwise right-top)
  { id: 'DCV_200m', label: '200m', group: 'DCV', angle: 36 },
  { id: 'DCV_2', label: '2V', group: 'DCV', angle: 72 },
  { id: 'DCV_20', label: '20V', group: 'DCV', angle: 108 },
  { id: 'DCV_200', label: '200V', group: 'DCV', angle: 144 },
  // RES section (clockwise left-bottom)
  { id: 'RES_2M', label: '2MΩ', group: 'RES', angle: 216 },
  { id: 'RES_200k', label: '200k', group: 'RES', angle: 252 },
  { id: 'RES_20k', label: '20k', group: 'RES', angle: 288 },
  { id: 'RES_2k', label: '2kΩ', group: 'RES', angle: 324 },
  { id: 'RES_200', label: '200Ω', group: 'RES', angle: 348 },
];

export const MultimeterDevice: React.FC<MultimeterDeviceProps> = ({
  scale,
  onScaleChange,
  redProbeTarget,
  blackProbeTarget,
  displayValue,
  displayUnit,
  isOverload,
  isNegative,
  statusMessage,
  onClearProbes
}) => {
  const currentScaleObj = SCALE_POSITIONS.find(s => s.id === scale) || SCALE_POSITIONS[0];

  return (
    <div className="bg-amber-400 p-4 rounded-3xl shadow-2xl border-4 border-amber-500 w-full max-w-sm mx-auto flex flex-col items-center select-none font-sans text-slate-800">
      {/* Brand header */}
      <div className="w-full flex justify-between items-center px-3 mb-2">
        <span className="text-xs font-black tracking-widest uppercase text-slate-800">MULTÍMETRE DIGITAL</span>
        <span className="text-[10px] font-bold bg-slate-900 text-amber-300 px-2 py-0.5 rounded shadow">CAT II 600V</span>
      </div>

      {/* Screen Frame */}
      <div className="w-full bg-slate-900 p-3 rounded-2xl shadow-inner border-2 border-slate-700 mb-3">
        {/* LCD Screen */}
        <div className="w-full bg-[#8ba482] text-slate-950 font-mono p-3 rounded-lg border-2 border-[#76906e] shadow-inner flex flex-col justify-between h-20 relative overflow-hidden">
          {scale === 'OFF' ? (
            <div className="flex items-center justify-center h-full text-slate-600 font-sans text-sm font-semibold tracking-wide">
              APAGAT (Gira el selector)
            </div>
          ) : (
            <>
              {/* Top indicators */}
              <div className="flex justify-between items-center text-[10px] font-bold tracking-wider text-slate-800">
                <span className="flex items-center gap-1">
                  {scale.startsWith('DCV') ? 'DC =' : 'Ω RES'}
                </span>
                <span>{displayUnit}</span>
              </div>

              {/* Main 7-segment style reading */}
              <div className="text-right text-3xl font-extrabold tracking-widest font-mono flex items-baseline justify-end gap-1">
                {isNegative && <span className="text-2xl">-</span>}
                {isOverload ? (
                  <span className="tracking-widest">1 .</span>
                ) : (
                  <span>{displayValue}</span>
                )}
                <span className="text-sm font-sans font-bold ml-1">{displayUnit}</span>
              </div>

              {/* Status info bar */}
              <div className="text-[9px] truncate text-slate-700 italic">
                {statusMessage || (scale.startsWith('DCV') ? 'Mesura de Tensió (Volts)' : 'Mesura de Resistència (Ohms)')}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Selector Dial Section */}
      <div className="w-full bg-slate-800 p-4 rounded-2xl border border-slate-700 mb-3 text-white flex flex-col items-center">
        <div className="text-[10px] uppercase font-bold text-slate-400 mb-2 flex items-center justify-between w-full px-2">
          <span className="text-amber-400">Ω RESISTÈNCIA</span>
          <span className="text-sky-400">DCV VOLTATGE</span>
        </div>

        {/* Rotary selector knob with buttons for easy accessibility */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-slate-600 bg-slate-950 shadow-lg flex items-center justify-center">
            {/* Visual tick marks */}
            <div className="absolute top-1 text-[9px] font-bold text-red-400">OFF</div>
            <div className="absolute right-1 text-[9px] font-bold text-sky-400">DCV</div>
            <div className="absolute left-1 text-[9px] font-bold text-amber-400">Ω</div>
          </div>

          {/* Central turnable knob */}
          <div
            className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border-4 border-slate-600 shadow-2xl flex items-center justify-center transition-transform duration-300 relative cursor-pointer"
            style={{ transform: `rotate(${currentScaleObj.angle}deg)` }}
          >
            {/* Knob pointer line */}
            <div className="absolute top-1 w-1.5 h-6 bg-amber-400 rounded-full shadow"></div>
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-600"></div>
          </div>
        </div>

        {/* Quick select buttons */}
        <div className="w-full mt-3">
          <div className="text-[10px] text-slate-400 font-semibold mb-1 text-center">Tria la posició del selector:</div>
          <div className="grid grid-cols-5 gap-1 text-[11px]">
            <button
              onClick={() => onScaleChange('OFF')}
              className={`py-1 rounded font-bold transition ${scale === 'OFF' ? 'bg-red-600 text-white ring-2 ring-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
            >
              OFF
            </button>
            <button
              onClick={() => onScaleChange('DCV_200m')}
              className={`py-1 rounded font-bold transition ${scale === 'DCV_200m' ? 'bg-sky-600 text-white ring-2 ring-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
            >
              200mV
            </button>
            <button
              onClick={() => onScaleChange('DCV_2')}
              className={`py-1 rounded font-bold transition ${scale === 'DCV_2' ? 'bg-sky-600 text-white ring-2 ring-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
            >
              2V
            </button>
            <button
              onClick={() => onScaleChange('DCV_20')}
              className={`py-1 rounded font-bold transition ${scale === 'DCV_20' ? 'bg-sky-600 text-white ring-2 ring-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
            >
              20V
            </button>
            <button
              onClick={() => onScaleChange('DCV_200')}
              className={`py-1 rounded font-bold transition ${scale === 'DCV_200' ? 'bg-sky-600 text-white ring-2 ring-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
            >
              200V
            </button>
          </div>

          <div className="grid grid-cols-5 gap-1 text-[11px] mt-1.5">
            <button
              onClick={() => onScaleChange('RES_200')}
              className={`py-1 rounded font-bold transition ${scale === 'RES_200' ? 'bg-amber-600 text-white ring-2 ring-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
            >
              200Ω
            </button>
            <button
              onClick={() => onScaleChange('RES_2k')}
              className={`py-1 rounded font-bold transition ${scale === 'RES_2k' ? 'bg-amber-600 text-white ring-2 ring-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
            >
              2kΩ
            </button>
            <button
              onClick={() => onScaleChange('RES_20k')}
              className={`py-1 rounded font-bold transition ${scale === 'RES_20k' ? 'bg-amber-600 text-white ring-2 ring-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
            >
              20kΩ
            </button>
            <button
              onClick={() => onScaleChange('RES_200k')}
              className={`py-1 rounded font-bold transition ${scale === 'RES_200k' ? 'bg-amber-600 text-white ring-2 ring-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
            >
              200k
            </button>
            <button
              onClick={() => onScaleChange('RES_2M')}
              className={`py-1 rounded font-bold transition ${scale === 'RES_2M' ? 'bg-amber-600 text-white ring-2 ring-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
            >
              2MΩ
            </button>
          </div>
        </div>
      </div>

      {/* Sockets / Probes Status */}
      <div className="w-full bg-slate-900 p-3 rounded-2xl border border-slate-700 text-xs flex flex-col gap-2">
        <div className="flex justify-between items-center text-slate-300 text-[11px] font-semibold">
          <span>Connexió de les Puntes de Prova:</span>
          {onClearProbes && (redProbeTarget || blackProbeTarget) && (
            <button
              onClick={onClearProbes}
              className="text-[10px] text-amber-400 hover:text-amber-300 underline font-bold"
            >
              Desconnectar puntes
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Black probe (COM) */}
          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">
              ●
            </div>
            <div className="overflow-hidden">
              <div className="text-[10px] text-slate-400 font-bold uppercase">COM (Negre)</div>
              <div className="text-white truncate font-medium text-xs">
                {blackProbeTarget ? `Connectat a: ${blackProbeTarget}` : 'Sense connectar'}
              </div>
            </div>
          </div>

          {/* Red probe (V/Ω) */}
          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">
              ●
            </div>
            <div className="overflow-hidden">
              <div className="text-[10px] text-red-400 font-bold uppercase">V / Ω (Vermell)</div>
              <div className="text-white truncate font-medium text-xs">
                {redProbeTarget ? `Connectat a: ${redProbeTarget}` : 'Sense connectar'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
