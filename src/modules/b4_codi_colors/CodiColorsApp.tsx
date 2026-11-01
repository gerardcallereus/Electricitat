import React, { useState, useEffect, useCallback } from 'react';
import type { ResistorData, GameStatus, ColorCode } from './types';
import { DIGIT_BAND_COLORS, MULTIPLIER_BAND_COLORS, TOLERANCE_BAND_COLORS, COLOR_CODES } from './constants';
import { Resistor } from './components/Resistor';
import { Scoreboard } from './components/Scoreboard';
import { Feedback } from './components/Feedback';
import { ColorCodeChart } from './components/ColorCodeChart';

interface CodiColorsAppProps {
  onSuccess?: () => void;
}

const App: React.FC<CodiColorsAppProps> = ({ onSuccess }) => {
  const [currentResistor, setCurrentResistor] = useState<ResistorData | null>(null);
  const [userResistance, setUserResistance] = useState<string>('');
  const [userTolerance, setUserTolerance] = useState<number>(TOLERANCE_BAND_COLORS[6].tolerance!);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [streak, setStreak] = useState(0);
  const [showChart, setShowChart] = useState(true);

  useEffect(() => {
    if ((streak >= 3 || score.correct >= 5) && onSuccess) {
      onSuccess();
    }
  }, [streak, score.correct, onSuccess]);

  const generateNewResistor = useCallback(() => {
    // Band 1: No puede ser negro
    const band1 = DIGIT_BAND_COLORS.slice(1)[Math.floor(Math.random() * (DIGIT_BAND_COLORS.length - 1))];
    // Band 2: Puede ser cualquiera
    const band2 = DIGIT_BAND_COLORS[Math.floor(Math.random() * DIGIT_BAND_COLORS.length)];
    // Band 3: Multiplicador
    const band3 = MULTIPLIER_BAND_COLORS[Math.floor(Math.random() * MULTIPLIER_BAND_COLORS.length)];
    // Band 4: Tolerancia
    const band4 = TOLERANCE_BAND_COLORS[Math.floor(Math.random() * TOLERANCE_BAND_COLORS.length)];

    const resistance = Number(((band1.value! * 10 + band2.value!) * band3.multiplier!).toPrecision(10));
    const tolerance = band4.tolerance!;

    setCurrentResistor({ bands: [band1, band2, band3, band4], resistance, tolerance });
    setStatus('playing');
    setUserResistance('');
  }, []);

  useEffect(() => {
    generateNewResistor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatResistance = (value: number): string => {
    if (value >= 1000000) {
      return `${Number((value / 1000000).toPrecision(10))} MΩ`;
    }
    if (value >= 1000) {
      return `${Number((value / 1000).toPrecision(10))} kΩ`;
    }
    return `${Number(value.toPrecision(10))} Ω`;
  };

  const parseUserResistance = (input: string): number => {
    const cleanedInput = input.trim().toLowerCase().replace(',', '.');
    const value = parseFloat(cleanedInput);
    if (isNaN(value)) return NaN;

    if (cleanedInput.includes('m')) {
      return Number((value * 1000000).toPrecision(10));
    }
    if (cleanedInput.includes('k')) {
      return Number((value * 1000).toPrecision(10));
    }
    return Number(value.toPrecision(10));
  };

  const handleCheck = () => {
    if (!currentResistor) return;
    const parsedUserValue = parseUserResistance(userResistance);

    if (!isNaN(parsedUserValue) && Math.abs(parsedUserValue - currentResistor.resistance) < 1e-5 && userTolerance === currentResistor.tolerance) {
      setStatus('correct');
      setScore(s => ({ ...s, correct: s.correct + 1 }));
      setStreak(s => s + 1);
    } else {
      setStatus('incorrect');
      setScore(s => ({ ...s, incorrect: s.incorrect + 1 }));
      setStreak(0);
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if(status === 'playing') {
        handleCheck();
      } else {
        generateNewResistor();
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 sm:p-4 bg-slate-900 rounded-2xl font-sans">
      <main className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">Simulador de Resistències</h2>
          <p className="text-sm text-slate-400">Calcula el valor de la resistència segons els seus colors.</p>
        </header>
        
        <div className="bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl shadow-cyan-500/10 border border-slate-700">
          <Scoreboard score={score} streak={streak} />

          {currentResistor && <Resistor bands={currentResistor.bands} />}

          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="resistance-input" className="block text-sm font-medium text-slate-300 mb-2">Valor de Resistència (ex: 4.7k, 1M, 220)</label>
                <input
                  id="resistance-input"
                  type="text"
                  value={userResistance}
                  onChange={(e) => setUserResistance(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={status !== 'playing'}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow"
                  placeholder="Introdueix el valor"
                />
              </div>
              <div>
                 <label htmlFor="tolerance-select" className="block text-sm font-medium text-slate-300 mb-2">Tolerància</label>
                 <select
                    id="tolerance-select"
                    value={userTolerance}
                    onChange={(e) => setUserTolerance(Number(e.target.value))}
                    disabled={status !== 'playing'}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow appearance-none"
                    style={{ background: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>\') no-repeat right 0.75rem center/1.5em 1.5em', backgroundOrigin: 'content-box', backgroundColor: '#334155' }}
                 >
                    {TOLERANCE_BAND_COLORS.map((color) => (
                        <option key={color.name} value={color.tolerance!}>
                            ±{color.tolerance}% ({color.name})
                        </option>
                    ))}
                 </select>
              </div>
            </div>

            {status !== 'playing' && currentResistor && (
              <Feedback
                status={status}
                correctResistance={formatResistance(currentResistor.resistance)}
                correctTolerance={currentResistor.tolerance}
              />
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              {status === 'playing' ? (
                <button
                  onClick={handleCheck}
                  className="w-full bg-cyan-500 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  Comprovar
                </button>
              ) : (
                <button
                  onClick={generateNewResistor}
                  className="w-full bg-green-500 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  Següent Resistència
                </button>
              )}
               <button 
                  onClick={() => setShowChart(!showChart)}
                  className="w-full sm:w-auto bg-slate-700 text-slate-200 font-bold py-3 px-6 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-500/50 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                  </svg>
                  <span>{showChart ? 'Amagar' : 'Mostrar'} Taula</span>
                </button>
            </div>
          </div>
        </div>

        {showChart && <ColorCodeChart />}
      </main>
    </div>
  );
};

export default App;