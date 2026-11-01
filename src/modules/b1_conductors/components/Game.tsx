import React, { useState, useEffect } from 'react';
import { MATERIALS } from '../constants';
import { Material, MaterialType } from '../types';
import { CircuitBoard } from './CircuitBoard';
import { playBuzzer, playSuccessChime } from '../utils/audio';
import { Zap, XCircle, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

interface GameProps {
  onSuccess?: () => void;
}

export const Game: React.FC<GameProps> = ({ onSuccess }) => {
  const [selectedCategory, setSelectedCategory] = useState<MaterialType | null>(null);
  const [matchedMaterials, setMatchedMaterials] = useState<Set<string>>(new Set());
  const [circuitActive, setCircuitActive] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'conductor' | 'aillant' | 'error' | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const [gameMaterials, setGameMaterials] = useState<Material[]>(() => {
    return [...MATERIALS].sort(() => Math.random() - 0.5);
  });

  useEffect(() => {
    if (matchedMaterials.size === MATERIALS.length && onSuccess) {
      onSuccess();
    }
  }, [matchedMaterials, onSuccess]);

  useEffect(() => {
    let timeout: number;
    if (feedbackMessage) {
      timeout = window.setTimeout(() => {
        setCircuitActive(false);
        setFeedbackMessage(null);
        setFeedbackType(null);
      }, 2200);
    }
    return () => clearTimeout(timeout);
  }, [feedbackMessage]);

  const handleCategorySelect = (type: MaterialType) => {
    setSelectedCategory(type);
  };

  const handleMaterialSelect = (material: Material) => {
    if (matchedMaterials.has(material.id)) return;
    if (!selectedCategory) {
      setFeedbackType('error');
      setFeedbackMessage("Primer selecciona 'Conductor' o 'Aïllant' a l'esquerra!");
      return;
    }

    if (material.type === selectedCategory) {
      const newMatches = new Set(matchedMaterials);
      newMatches.add(material.id);
      setMatchedMaterials(newMatches);

      if (material.type === 'conductor') {
        setCircuitActive(true);
        setFeedbackType('conductor');
        playBuzzer(600);
        setFeedbackMessage(`Correcte! ${material.name} és CONDUCTOR: el corrent passa i la bombeta s'encén! 💡`);
      } else {
        setCircuitActive(false);
        setFeedbackType('aillant');
        playSuccessChime();
        setFeedbackMessage(`Correcte! ${material.name} és AÏLLANT: bloqueja el corrent (la bombeta no s'encén) i ens protegeix! 🛡️`);
      }
      setSelectedCategory(null);
    } else {
      setCircuitActive(false);
      setFeedbackType('error');
      playBuzzer(200);
      setFeedbackMessage(`Incorrecte! Revisa si "${material.name}" deixa passar o no els electrons.`);
    }
  };

  const handleRestart = () => {
    setMatchedMaterials(new Set());
    setSelectedCategory(null);
    setCircuitActive(false);
    setFeedbackMessage(null);
    setFeedbackType(null);
    setGameMaterials([...MATERIALS].sort(() => Math.random() - 0.5));
  };

  const isGameComplete = matchedMaterials.size === MATERIALS.length;

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4">
      <CircuitBoard isActive={circuitActive} />

      <div className="mb-6 text-center min-h-[44px] flex items-center justify-center">
        {feedbackMessage && (
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-white text-xs sm:text-sm font-bold shadow-md animate-fade-in ${
              feedbackType === 'conductor'
                ? 'bg-emerald-600'
                : feedbackType === 'aillant'
                ? 'bg-sky-600'
                : 'bg-rose-600'
            }`}
          >
            {feedbackType === 'conductor' ? (
              <Zap size={18} />
            ) : feedbackType === 'aillant' ? (
              <ShieldCheck size={18} />
            ) : (
              <XCircle size={18} />
            )}
            <span>{feedbackMessage}</span>
          </span>
        )}
        {isGameComplete && !feedbackMessage && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600 text-white text-sm font-bold shadow-sm">
              <CheckCircle2 size={18} />
              Felicitats! Has classificat correctament els {MATERIALS.length} materials!
            </span>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-bold transition cursor-pointer"
            >
              <RefreshCw size={14} /> Tornar a jugar
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Left Column: Categories */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-800 uppercase tracking-wider">1. Tria la Propietat</h3>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
              Progrés: {matchedMaterials.size} / {MATERIALS.length}
            </span>
          </div>

          <button
            onClick={() => handleCategorySelect('conductor')}
            className={`p-5 rounded-2xl border-3 text-xl font-bold shadow-sm transition-all flex items-center justify-between cursor-pointer ${
              selectedCategory === 'conductor'
                ? 'bg-blue-100 border-blue-500 text-blue-800 scale-[1.02] ring-4 ring-blue-200'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <div>
              <span className="block">⚡ CONDUCTOR</span>
              <span className="text-xs font-normal text-stone-500">Deixa passar els electrons (encén la bombeta)</span>
            </div>
            <div className={`w-4 h-4 rounded-full ${selectedCategory === 'conductor' ? 'bg-blue-600' : 'bg-stone-300'}`} />
          </button>

          <button
            onClick={() => handleCategorySelect('aillant')}
            className={`p-5 rounded-2xl border-3 text-xl font-bold shadow-sm transition-all flex items-center justify-between cursor-pointer ${
              selectedCategory === 'aillant'
                ? 'bg-red-100 border-red-500 text-red-800 scale-[1.02] ring-4 ring-red-200'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <div>
              <span className="block">🛡️ AÏLLANT</span>
              <span className="text-xs font-normal text-stone-500">Bloqueja els electrons (circuit obert)</span>
            </div>
            <div className={`w-4 h-4 rounded-full ${selectedCategory === 'aillant' ? 'bg-red-600' : 'bg-stone-300'}`} />
          </button>

          <div className="mt-2 bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <p>
              ℹ️ <strong>Com jugar:</strong> Primer selecciona <strong>Conductor</strong> o <strong>Aïllant</strong> a l'esquerra i tot seguit fes clic sobre un material de la dreta per comprovar com reacciona el circuit.
            </p>
          </div>
        </div>

        {/* Center Wiring Graphic */}
        <div className="hidden md:flex flex-col justify-center items-center absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none z-0">
          <div className="w-0.5 h-full bg-stone-200" />
        </div>

        {/* Right Column: Materials */}
        <div className="flex flex-col gap-3 z-10">
          <h3 className="text-base font-bold text-stone-800 uppercase tracking-wider">2. Connecta el Material</h3>
          <div className="grid grid-cols-2 gap-3">
            {gameMaterials.map((m) => {
              const isMatched = matchedMaterials.has(m.id);
              const isConductor = m.type === 'conductor';

              return (
                <button
                  key={m.id}
                  disabled={isMatched}
                  onClick={() => handleMaterialSelect(m)}
                  className={`relative p-3.5 rounded-2xl border-2 text-left shadow-sm transition-all flex flex-col items-center justify-center gap-1.5 ${
                    isMatched
                      ? isConductor
                        ? 'bg-blue-600 border-blue-700 text-white opacity-80'
                        : 'bg-red-600 border-red-700 text-white opacity-80'
                      : 'bg-white border-stone-200 hover:border-amber-400 hover:shadow-md active:scale-95 cursor-pointer'
                  }`}
                >
                  <span className="text-3xl">{m.icon}</span>
                  <span className="font-bold text-xs sm:text-sm text-center">{m.name}</span>
                  {isMatched && (
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-black/20">
                      {isConductor ? 'Conductor' : 'Aïllant'}
                    </span>
                  )}
                  {isMatched && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 size={15} className="text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
