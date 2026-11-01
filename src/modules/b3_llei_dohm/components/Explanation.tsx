import React, { useState } from 'react';

const FormulaCard: React.FC<{
  title: string;
  formula: string;
  description: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}> = ({ title, formula, description, active, onClick }) => (
  <div
    onClick={onClick}
    className={`rounded-2xl p-6 transition-all cursor-pointer border-2 ${
      active
        ? 'bg-amber-50 border-amber-500 shadow-md scale-[1.02]'
        : 'bg-stone-50 border-stone-200 hover:border-amber-300 hover:shadow-sm'
    }`}
  >
    <h3 className="text-lg font-bold text-stone-900 mb-2">{title}</h3>
    <p className="text-2xl font-mono font-bold bg-white border border-stone-200 text-amber-800 py-2 px-4 rounded-xl inline-block my-1 shadow-xs">
      {formula}
    </p>
    <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">{description}</p>
  </div>
);

export const Explanation: React.FC = () => {
  const [selectedVar, setSelectedVar] = useState<'V' | 'I' | 'R'>('V');

  return (
    <div className="space-y-8 animate-fade-in text-stone-800">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">Què és la Llei d'Ohm?</h2>
        <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
          La Llei d'Ohm, descoberta pel físic alemany Georg Simon Ohm, relaciona les tres magnituds fonamentals d'un circuit elèctric: el <strong>Voltatge o Tensió (V)</strong>, la <strong>Intensitat de corrent (I)</strong> i la <strong>Resistència (R)</strong>.
        </p>
      </div>

      {/* Les 3 Magnituds */}
      <div className="grid md:grid-cols-3 gap-4 text-center">
        <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200">
          <div className="text-2xl mb-1">🔋</div>
          <h4 className="text-lg font-bold text-amber-950 mb-1">Tensió o Voltatge (V)</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            És l'empenta o força amb què la pila impulsa els electrons pel circuit. Es mesura en <strong>Volts (V)</strong>.
          </p>
        </div>
        <div className="bg-sky-50/70 p-5 rounded-2xl border border-sky-200">
          <div className="text-2xl mb-1">⚡</div>
          <h4 className="text-lg font-bold text-sky-950 mb-1">Intensitat de Corrent (I)</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            És la quantitat d'electrons que passen pel cable cada segon. Es mesura en <strong>Amperes (A)</strong>.
          </p>
        </div>
        <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose-200">
          <div className="text-2xl mb-1">🚧</div>
          <h4 className="text-lg font-bold text-rose-950 mb-1">Resistència (R)</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            És l'oposició o dificultat que presenta el material al pas del corrent. Es mesura en <strong>Ohms (Ω)</strong>.
          </p>
        </div>
      </div>

      {/* Interactive Ohm's Triangle */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block">
              Truc Mnemotècnic Interactiu
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              El Triangle de la Llei d'Ohm
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Per recordar les 3 fórmules sense equivocar-te mai, imagina que <strong>tapes amb el dit la lletra que vols calcular</strong>. Fes clic sobre <strong>V</strong>, <strong>I</strong> o <strong>R</strong> al triangle:
            </p>

            <div className="flex gap-2">
              {(['V', 'I', 'R'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVar(v)}
                  className={`px-4 py-2 rounded-xl font-mono font-bold text-sm transition cursor-pointer ${
                    selectedVar === v
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  Tapar {v}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-stone-800/90 border border-stone-700">
              {selectedVar === 'V' && (
                <div>
                  <span className="text-xs text-amber-400 font-bold uppercase">Vols trobar la Tensió (V):</span>
                  <p className="text-2xl font-mono font-black text-white mt-1">V = I · R</p>
                  <p className="text-xs text-stone-300 mt-1">Com que I i R queden al mateix nivell (a baix), es multipliquen.</p>
                </div>
              )}
              {selectedVar === 'I' && (
                <div>
                  <span className="text-xs text-sky-400 font-bold uppercase">Vols trobar el Corrent (I):</span>
                  <p className="text-2xl font-mono font-black text-white mt-1">I = V / R</p>
                  <p className="text-xs text-stone-300 mt-1">Com que V queda a dalt i R a baix, es divideix V entre R.</p>
                </div>
              )}
              {selectedVar === 'R' && (
                <div>
                  <span className="text-xs text-rose-400 font-bold uppercase">Vols trobar la Resistència (R):</span>
                  <p className="text-2xl font-mono font-black text-white mt-1">R = V / I</p>
                  <p className="text-xs text-stone-300 mt-1">Com que V queda a dalt i I a baix, es divideix V entre I.</p>
                </div>
              )}
            </div>
          </div>

          {/* Triangle SVG */}
          <div className="md:col-span-6 flex justify-center">
            <svg viewBox="0 0 260 220" className="w-64 h-56 select-none">
              {/* Outer triangle */}
              <polygon
                points="130,15 245,200 15,200"
                fill="#1c1917"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Horizontal divider */}
              <line x1="72" y1="110" x2="188" y2="110" stroke="#f59e0b" strokeWidth="3" />
              {/* Vertical divider */}
              <line x1="130" y1="110" x2="130" y2="200" stroke="#f59e0b" strokeWidth="3" />

              {/* Division & Multiplication signs */}
              <text x="58" y="114" fill="#9ca3af" fontSize="13" fontWeight="bold">÷</text>
              <text x="195" y="114" fill="#9ca3af" fontSize="13" fontWeight="bold">÷</text>
              <text x="130" y="162" fill="#f59e0b" fontSize="16" fontWeight="bold" textAnchor="middle">·</text>

              {/* V Node (Top) */}
              <g
                onClick={() => setSelectedVar('V')}
                className="cursor-pointer"
              >
                <circle
                  cx="130"
                  cy="75"
                  r="24"
                  fill={selectedVar === 'V' ? '#f59e0b' : '#292524'}
                  stroke={selectedVar === 'V' ? '#fef3c7' : '#57534e'}
                  strokeWidth="2"
                />
                <text
                  x="130"
                  y="84"
                  textAnchor="middle"
                  fontSize="26"
                  fontWeight="black"
                  fill={selectedVar === 'V' ? '#1c1917' : '#fbbf24'}
                >
                  V
                </text>
              </g>

              {/* I Node (Bottom Left) */}
              <g
                onClick={() => setSelectedVar('I')}
                className="cursor-pointer"
              >
                <circle
                  cx="85"
                  cy="160"
                  r="24"
                  fill={selectedVar === 'I' ? '#38bdf8' : '#292524'}
                  stroke={selectedVar === 'I' ? '#e0f2fe' : '#57534e'}
                  strokeWidth="2"
                />
                <text
                  x="85"
                  y="169"
                  textAnchor="middle"
                  fontSize="26"
                  fontWeight="black"
                  fill={selectedVar === 'I' ? '#0c4a6e' : '#38bdf8'}
                >
                  I
                </text>
              </g>

              {/* R Node (Bottom Right) */}
              <g
                onClick={() => setSelectedVar('R')}
                className="cursor-pointer"
              >
                <circle
                  cx="175"
                  cy="160"
                  r="24"
                  fill={selectedVar === 'R' ? '#fb7185' : '#292524'}
                  stroke={selectedVar === 'R' ? '#ffe4e6' : '#57534e'}
                  strokeWidth="2"
                />
                <text
                  x="175"
                  y="169"
                  textAnchor="middle"
                  fontSize="26"
                  fontWeight="black"
                  fill={selectedVar === 'R' ? '#4c0519' : '#fb7185'}
                >
                  R
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* 3 Formula Cards */}
      <div>
        <h3 className="text-xl font-bold text-stone-900 mb-4">Les 3 Fórmules de Treball</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <FormulaCard
            title="1. Calcular la Tensió"
            formula="V = I · R"
            active={selectedVar === 'V'}
            onClick={() => setSelectedVar('V')}
            description="Multiplica el corrent (A) per la resistència (Ω) per saber el voltatge (V)."
          />
          <FormulaCard
            title="2. Calcular el Corrent"
            formula="I = V / R"
            active={selectedVar === 'I'}
            onClick={() => setSelectedVar('I')}
            description="Divideix el voltatge (V) entre la resistència (Ω) per trobar els amperes (A)."
          />
          <FormulaCard
            title="3. Calcular la Resistència"
            formula="R = V / I"
            active={selectedVar === 'R'}
            onClick={() => setSelectedVar('R')}
            description="Divideix el voltatge (V) entre el corrent (A) per obtenir els ohms (Ω)."
          />
        </div>
      </div>
    </div>
  );
};
