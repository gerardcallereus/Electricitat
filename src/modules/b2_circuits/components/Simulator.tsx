import React, { useState } from 'react';
import { ExerciseScenario } from '../types';
import { ArrowRight, RefreshCw, CheckCircle, XCircle, Trophy } from 'lucide-react';

// --- VISUAL COMPONENTS ---

const Switch: React.FC<{ x: number; y: number; isOpen: boolean; label?: string; vertical?: boolean }> = ({ x, y, isOpen, label, vertical }) => (
  <g transform={`translate(${x}, ${y}) ${vertical ? 'rotate(90)' : ''}`}>
    {/* Label with status badge to ensure complete clarity */}
    {label && (
      <g transform={vertical ? 'rotate(-90)' : ''}>
         <rect 
           x={vertical ? 40 : -55} 
           y={vertical ? -12 : 30} 
           width={vertical ? 95 : 110} 
           height="22" 
           fill="rgba(255,255,255,0.95)" 
           rx="6" 
           stroke={isOpen ? "#FCA5A5" : "#86EFAC"}
           strokeWidth="1"
         />
         <text 
            x={vertical ? 45 : 0} 
            y={vertical ? 4 : 45} 
            textAnchor={vertical ? "start" : "middle"} 
            fontSize="11" 
            fill={isOpen ? "#DC2626" : "#16A34A"} 
            fontWeight="bold"
        >
          {label}: {isOpen ? 'OBERT ✕' : 'TANCAT ✓'}
        </text>
      </g>
    )}
    
    {/* Terminals */}
    <circle cx="-20" cy="0" r="5" fill="#334155" />
    <circle cx="20" cy="0" r="5" fill="#334155" />
    
    {/* Blade Group */}
    <g 
      transform={isOpen ? "rotate(-35, -20, 0)" : "rotate(0, -20, 0)"} 
      className="transition-transform duration-300 ease-out"
    >
      <rect x="-20" y="-3.5" width="42" height="7" rx="3.5" fill={isOpen ? "#EF4444" : "#22C55E"} stroke="#1E293B" strokeWidth="0.5" />
      <circle cx="16" cy="0" r="2.5" fill="rgba(255,255,255,0.7)" />
    </g>

    {/* Clear red gap indicator when open */}
    {isOpen && (
      <g>
        <line x1="-10" y1="12" x2="16" y2="12" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="3" y="21" fontSize="9" fill="#DC2626" textAnchor="middle" fontWeight="bold">TALLAT</text>
      </g>
    )}
  </g>
);

const Bulb: React.FC<{ x: number; y: number; isOn: boolean; isBroken?: boolean; label?: string }> = ({ x, y, isOn, isBroken, label }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Broken halo & warning banner when broken */}
    {isBroken && (
      <g>
        <circle cx="0" cy="0" r="26" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 3" opacity="0.9" />
        <g transform="translate(0, -32)">
          <rect x="-42" y="-9" width="84" height="18" rx="9" fill="#DC2626" />
          <text x="0" y="3.5" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">✕ FOSA / TALL</text>
        </g>
      </g>
    )}

    {/* Label positioned to the right with background */}
    {label && (
      <g>
        <rect x="30" y="-12" width="115" height="24" fill="rgba(255,255,255,0.9)" rx="4" stroke={isBroken ? "#FCA5A5" : "#CBD5E1"} strokeWidth="1" />
        <text x="35" y="5" textAnchor="start" fontSize="11" fill={isBroken ? "#DC2626" : "#475569"} fontWeight="bold">
          {label} {isBroken ? '(Trencada)' : ''}
        </text>
      </g>
    )}

    {isOn && !isBroken && <circle cx="0" cy="0" r="30" fill="url(#glow)" opacity="0.6" />}
    <circle 
      cx="0" cy="0" r="20" 
      fill={isOn && !isBroken ? "#FDE047" : isBroken ? "#F1F5F9" : "#E2E8F0"} 
      stroke={isOn && !isBroken ? "#EAB308" : isBroken ? "#DC2626" : "#94A3B8"} 
      strokeWidth={isBroken ? "2.5" : "2"}
    />
    <rect x="-8" y="16" width="16" height="10" fill="#64748B" rx="1" />

    {isBroken ? (
      <g>
        {/* Broken filament gap */}
        <path d="M -7 14 L -4 8" stroke="#DC2626" fill="none" strokeWidth="2" strokeLinecap="round" />
        <path d="M 4 8 L 7 14" stroke="#DC2626" fill="none" strokeWidth="2" strokeLinecap="round" />
        <circle cx="-4" cy="8" r="2" fill="#DC2626" />
        <circle cx="4" cy="8" r="2" fill="#DC2626" />
        {/* Crack lines on glass */}
        <path d="M -10 -4 L -2 3 L -8 10 M 2 -10 L 5 -2 L 1 5" stroke="#EF4444" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
    ) : (
      <path d="M -6 14 Q 0 0 6 14" stroke="#475569" fill="none" strokeWidth="1.5" />
    )}

    {isOn && !isBroken && (
      <g stroke="#EAB308" strokeWidth="2" strokeLinecap="round">
        <line x1="-28" y1="-28" x2="-22" y2="-22" />
        <line x1="28" y1="-28" x2="22" y2="-22" />
        <line x1="0" y1="-35" x2="0" y2="-28" />
        <line x1="-35" y1="0" x2="-28" y2="0" />
        <line x1="35" y1="0" x2="28" y2="0" />
      </g>
    )}
  </g>
);

// --- EXERCISE DATA ---

const exercises: ExerciseScenario[] = [
  {
    id: 1,
    type: 'simple',
    title: 'Circuit Simple - Obert',
    question: "L'interruptor està aixecat (obert). S'encendrà la bombeta?",
    switches: { s1: false },
    correctAnswer: false,
    explanation: "No. Com que l'interruptor està obert, el camí està tallat i els electrons no poden passar."
  },
  {
    id: 2,
    type: 'simple',
    title: 'Circuit Simple - Tancat',
    question: "Ara hem baixat l'interruptor. S'encendrà la bombeta?",
    switches: { s1: true },
    correctAnswer: true,
    explanation: "Sí! El circuit està tancat i els electrons poden circular lliurement des de la pila fins a la bombeta i tornar."
  },
  {
    id: 3,
    type: 'series',
    title: 'Sèrie - Interruptor Obert',
    question: "En aquest circuit en sèrie, l'interruptor està obert. S'encendrà la Bombeta 2?",
    switches: { s1: false },
    correctAnswer: false,
    explanation: "No. En un circuit en sèrie només hi ha un camí. Si es talla en qualsevol punt (com l'interruptor), no funciona res."
  },
  {
    id: 4,
    type: 'series',
    title: 'Sèrie - Tot connectat',
    question: "Hem tancat l'interruptor. S'encendran les DUES bombetes?",
    switches: { s1: true },
    correctAnswer: true,
    explanation: "Sí. El camí està complet i el corrent passa per totes dues bombetes, una rere l'altra."
  },
  {
    id: 5,
    type: 'parallel',
    title: 'Paral·lel - Camins Independents',
    question: "L'interruptor S1 està tancat, però l'S2 està obert. S'encendrà la Bombeta 1?",
    switches: { s1: true, s2: false },
    correctAnswer: true,
    explanation: "Sí! En paral·lel, cada bombeta té el seu propi camí. El camí de la Bombeta 1 està tancat, així que funciona."
  },
  {
    id: 6,
    type: 'parallel',
    title: 'Paral·lel - Camí Obert',
    question: "Seguint amb el mateix cas... S'encendrà la Bombeta 2?",
    switches: { s1: true, s2: false },
    correctAnswer: false,
    explanation: "No. El camí de la Bombeta 2 està tallat perquè el seu interruptor (S2) està obert."
  },
  {
    id: 7,
    type: 'series',
    title: 'Sèrie - Bombeta Fosa',
    question: "L'interruptor està tancat, però la Bombeta 1 està fosa (trencada). S'encendrà la Bombeta 2?",
    switches: { s1: true },
    bulbBroken: 1,
    correctAnswer: false,
    explanation: "No. Quan una bombeta es fon en sèrie, el filament es trenca i obre el circuit. És com si talléssim el cable."
  },
  {
    id: 8,
    type: 'parallel',
    title: 'Paral·lel - Tot a la vegada',
    question: "Tanquem els dos interruptors (S1 i S2). Brillaran les dues bombetes?",
    switches: { s1: true, s2: true },
    correctAnswer: true,
    explanation: "Sí, totes dues reben corrent pels seus camins respectius."
  },
  {
    id: 9,
    type: 'series',
    title: 'Sèrie - Interrupció',
    question: "Si treiem la Bombeta 2 del portabombetes, la Bombeta 1 continuarà funcionant?",
    switches: { s1: true },
    bulbBroken: 2, // Simulating removed bulb acts like broken filament for connection
    correctAnswer: false,
    explanation: "No. En sèrie, si treus un component, obres el circuit i tot s'apaga."
  },
  {
    id: 10,
    type: 'parallel',
    title: 'Paral·lel - Bombeta Fosa',
    question: "Si es fon la Bombeta 1 en aquest circuit paral·lel (amb S1 i S2 tancats), la Bombeta 2 continuarà funcionant?",
    switches: { s1: true, s2: true },
    bulbBroken: 1,
    correctAnswer: true,
    explanation: "Sí! Aquesta és la màgia del paral·lel. Si un camí es trenca, els altres continuen tenint connexió amb la pila."
  }
];

// --- MAIN COMPONENT ---

const Exercises: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [simulationActive, setSimulationActive] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const exercise = exercises[currentIdx];

  const handleAnswer = (answer: boolean) => {
    if (hasAnswered) return;
    setHasAnswered(true);
    const correct = answer === exercise.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
    
    // Always activate simulation on answer to show the result
    setSimulationActive(true);
  };

  const nextExercise = () => {
    if (currentIdx < exercises.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setHasAnswered(false);
      setSimulationActive(false);
    } else {
      // Show summary instead of resetting immediately
      setShowSummary(true);
    }
  };

  const restartExercises = () => {
    setCurrentIdx(0);
    setHasAnswered(false);
    setSimulationActive(false);
    setScore(0);
    setShowSummary(false);
  };

  // Helper logic to see if bulbs SHOULD be on based on physics
  const getBulbStates = () => {
    // If simulation is not active (user hasn't answered), bulbs are off 
    if (!simulationActive) return { b1: false, b2: false };

    const s = exercise.switches;
    const broken = exercise.bulbBroken || 0;

    if (exercise.type === 'simple') {
      return { b1: s.s1 && broken !== 1, b2: false };
    }
    if (exercise.type === 'series') {
      const pathComplete = s.s1 && broken === 0;
      return { b1: pathComplete, b2: pathComplete };
    }
    if (exercise.type === 'parallel') {
      return { 
        b1: s.s1 && broken !== 1, 
        b2: (s.s2 !== undefined ? s.s2 : s.s1) && broken !== 2 
      };
    }
    return { b1: false, b2: false };
  };

  const { b1, b2 } = getBulbStates();

  // Helper to determine wire color
  const getWireClass = (active: boolean) => {
    // Only show active colors if simulation is active (user answered)
    if (!simulationActive) return "stroke-slate-400";
    return active ? "stroke-yellow-400 electron-flow" : "stroke-slate-400";
  };

  if (showSummary) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-xl text-center animate-fade-in mt-10 border border-slate-100">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Exercicis Completats!</h2>
        <div className="flex justify-center mb-6">
          <Trophy className="w-24 h-24 text-yellow-500 fill-yellow-100" />
        </div>
        <p className="text-xl text-slate-600 mb-2">Puntuació Final:</p>
        <p className="text-6xl font-bold text-blue-600 mb-8">{score} / {exercises.length}</p>

        <div className="text-left bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-100">
          {score === exercises.length ? (
            <p className="text-blue-900 font-bold text-center text-lg">¡Increïble! Ho has encertat tot! Ets un mestre dels circuits! ⚡</p>
          ) : score >= exercises.length * 0.7 ? (
            <p className="text-blue-900 font-bold text-center text-lg">Molt bona feina! Tens un bon domini de l'electricitat.</p>
          ) : (
            <p className="text-blue-900 font-bold text-center text-lg">No pateixis! Repassa la teoria i torna-ho a provar.</p>
          )}
        </div>

        <button 
          onClick={restartExercises}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 mx-auto transition-all shadow-lg hover:shadow-blue-200 hover:scale-[1.02]"
        >
          <RefreshCw className="w-6 h-6" /> Tornar a començar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col items-center">
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${((currentIdx + 1) / exercises.length) * 100}%` }}></div>
      </div>

      <div className="text-center mb-4 animate-fade-in">
        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Exercici {currentIdx + 1} de {exercises.length}</span>
        <h2 className="text-2xl font-bold text-slate-800 mt-1">{exercise.title}</h2>
      </div>

      {/* Circuit Status Banner (Clear indicator of open/closed circuit) */}
      <div className={`w-full max-w-3xl px-4 py-3 rounded-2xl mb-4 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-sm ${
        (Object.values(exercise.switches).some(v => v === false) || !!exercise.bulbBroken)
          ? 'bg-red-50/90 border-red-200 text-red-900'
          : 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
      }`}>
        <div className="flex items-center gap-2.5 font-bold text-xs sm:text-sm">
          <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] text-white shrink-0 ${
            (Object.values(exercise.switches).some(v => v === false) || !!exercise.bulbBroken) ? 'bg-red-600' : 'bg-emerald-600'
          }`}>
            {(Object.values(exercise.switches).some(v => v === false) || !!exercise.bulbBroken) ? '✕' : '✓'}
          </span>
          <span>
            {(Object.values(exercise.switches).some(v => v === false) || !!exercise.bulbBroken)
              ? 'CIRCUIT OBERT / INTERROMPUT'
              : 'CIRCUIT TANCAT / COMPLET'}
          </span>
        </div>
        <div className="text-xs text-stone-600 font-medium">
          {Object.values(exercise.switches).some(v => v === false) && !!exercise.bulbBroken
            ? "⚠️ Hi ha un interruptor obert i a més una bombeta fosa (tall doble)."
            : Object.values(exercise.switches).some(v => v === false)
            ? "⚠️ L'interruptor està obert (talla el pas del corrent elèctric)."
            : !!exercise.bulbBroken
            ? "⚠️ La bombeta té el filament fos (el circuit s'obre en aquest punt)."
            : "✅ Camí continu sense interrupcions: el corrent pot circular."}
        </div>
      </div>

      {/* Interactive Canvas */}
      <div className="relative w-full max-w-3xl aspect-[16/9] bg-white rounded-3xl shadow-xl border-4 border-slate-200 p-4 flex items-center justify-center overflow-hidden mb-6 select-none">
        
        {/* Status Overlay */}
        {hasAnswered && (
          <div className={`absolute top-4 right-4 px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-sm animate-fade-in z-10 ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {isCorrect ? <CheckCircle size={20}/> : <XCircle size={20}/>}
            {isCorrect ? 'Correcte!' : 'Incorrecte'}
          </div>
        )}

        <svg viewBox="0 0 600 340" className="w-full h-full">
          <defs>
            <radialGradient id="glow">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Battery */}
          <g transform="translate(60, 170)">
            <rect x="0" y="-20" width="40" height="60" rx="4" fill="#334155" />
            <rect x="10" y="-26" width="20" height="6" rx="1" fill="#94A3B8" />
            <text x="20" y="10" fontSize="24" fill="white" textAnchor="middle" fontWeight="bold">⚡</text>
          </g>

          {exercise.type === 'simple' && (
            <g>
              <path d="M 80 150 L 80 80 L 450 80 L 450 170" fill="none" strokeWidth="4" strokeLinecap="round" className={getWireClass(b1)} />
              <path d="M 450 170 L 450 260 L 320 260" fill="none" strokeWidth="4" strokeLinecap="round" className={getWireClass(b1)} />
              <path d="M 280 260 L 80 260 L 80 210" fill="none" strokeWidth="4" strokeLinecap="round" className={getWireClass(b1)} />
              <Bulb x={450} y={170} isOn={b1} isBroken={exercise.bulbBroken === 1} label="Bombeta" />
              <Switch x={300} y={260} isOpen={!exercise.switches.s1} label="Interruptor" />
            </g>
          )}

          {exercise.type === 'series' && (
            <g>
              <path d="M 80 150 L 80 60 L 250 60" fill="none" strokeWidth="4" strokeLinecap="round" className={getWireClass(b1)} />
              <path d="M 250 60 L 450 60 L 450 120" fill="none" strokeWidth="4" strokeLinecap="round" className={getWireClass(b1)} />
              <path d="M 450 120 L 450 280 L 320 280" fill="none" strokeWidth="4" strokeLinecap="round" className={getWireClass(b1)} />
              <path d="M 280 280 L 80 280 L 80 210" fill="none" strokeWidth="4" strokeLinecap="round" className={getWireClass(b1)} />
              <line x1="250" y1="60" x2="350" y2="60" strokeWidth="4" className={getWireClass(b1)} />
              <Bulb x={250} y={60} isOn={b1} isBroken={exercise.bulbBroken === 1} label="B1" />
              <Bulb x={450} y={60} isOn={b2} isBroken={exercise.bulbBroken === 2} label="B2" />
              <Switch x={300} y={280} isOpen={!exercise.switches.s1} label="Interruptor" />
            </g>
          )}

          {exercise.type === 'parallel' && (
            <g>
              <path d="M 80 150 L 80 50 L 500 50" fill="none" strokeWidth="4" strokeLinecap="round" className={getWireClass(b1 || b2)} />
              <path d="M 80 210 L 80 300 L 500 300" fill="none" strokeWidth="4" strokeLinecap="round" className={getWireClass(b1 || b2)} />
              
              {/* Branch 1 */}
              <line x1="250" y1="50" x2="250" y2="100" strokeWidth="4" className={getWireClass(b1)} />
              {/* Corrected wire coordinates to stop at terminals */}
              <line x1="250" y1="180" x2="250" y2="210" strokeWidth="4" className={getWireClass(b1)} />
              <line x1="250" y1="250" x2="250" y2="300" strokeWidth="4" className={getWireClass(b1)} />
              
              <Switch x={250} y={230} isOpen={!exercise.switches.s1} label="S1" vertical />
              <Bulb x={250} y={140} isOn={b1} isBroken={exercise.bulbBroken === 1} label="B1" />

              {/* Branch 2 */}
              <line x1="450" y1="50" x2="450" y2="100" strokeWidth="4" className={getWireClass(b2)} />
              {/* Corrected wire coordinates to stop at terminals */}
              <line x1="450" y1="180" x2="450" y2="210" strokeWidth="4" className={getWireClass(b2)} />
              <line x1="450" y1="250" x2="450" y2="300" strokeWidth="4" className={getWireClass(b2)} />

              <Switch x={450} y={230} isOpen={!exercise.switches.s2} label="S2" vertical />
              <Bulb x={450} y={140} isOn={b2} isBroken={exercise.bulbBroken === 2} label="B2" />
            </g>
          )}
        </svg>
      </div>

      {/* Question and Controls */}
      <div className="w-full max-w-3xl bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">{exercise.question}</h3>
        
        {!hasAnswered ? (
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleAnswer(true)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-4 rounded-xl font-bold text-lg transition-colors flex flex-col items-center gap-2 border-2 border-blue-200 hover:border-blue-300"
            >
              <CheckCircle size={28} />
              SÍ / CERT
            </button>
            <button 
              onClick={() => handleAnswer(false)}
              className="bg-orange-100 hover:bg-orange-200 text-orange-700 py-4 rounded-xl font-bold text-lg transition-colors flex flex-col items-center gap-2 border-2 border-orange-200 hover:border-orange-300"
            >
              <XCircle size={28} />
              NO / FALS
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                <p className="text-slate-700 leading-relaxed">
                  <span className="font-bold">Explicació:</span> {exercise.explanation}
                </p>
             </div>
             
             <button 
              onClick={nextExercise}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              {currentIdx < exercises.length - 1 ? 'Següent Exercici' : 'Veure Resultats'} 
              {currentIdx < exercises.length - 1 ? <ArrowRight /> : <RefreshCw />}
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Exercises;