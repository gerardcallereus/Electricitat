import React, { useState, useEffect } from 'react';
import { ModuleId, CLASS_GROUPS, ClassGroup } from '../types';
import {
  Zap,
  Clock,
  CheckCircle2,
  ArrowRight,
  Award,
  Layers,
  Gauge,
  Sliders,
  Sparkles,
  Lock,
  FileCheck2,
  AlertCircle
} from 'lucide-react';

interface DashboardProps {
  onSelectModule: (id: ModuleId) => void;
  studentName: string;
  studentGroup: string;
  onSaveStudentInfo: (name: string, group: string) => void;
  completedBlocks: number[];
  unlockedBlocks: number[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  onSelectModule,
  studentName,
  studentGroup,
  onSaveStudentInfo,
  completedBlocks,
  unlockedBlocks,
}) => {
  const [nameInput, setNameInput] = useState(studentName);
  const [groupInput, setGroupInput] = useState(studentGroup);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Sync inputs with parent state if it changes
  useEffect(() => {
    setNameInput(studentName);
  }, [studentName]);

  useEffect(() => {
    setGroupInput(studentGroup);
  }, [studentGroup]);

  // Immediate autosave on name change
  const handleNameChange = (val: string) => {
    setNameInput(val);
    onSaveStudentInfo(val, groupInput);
    triggerAutoSaveIndicator();
  };

  // Immediate autosave on group selection
  const handleGroupSelect = (grp: ClassGroup) => {
    setGroupInput(grp);
    onSaveStudentInfo(nameInput, grp);
    triggerAutoSaveIndicator();
  };

  const triggerAutoSaveIndicator = () => {
    setSaveStatus('Desat automàticament');
    setTimeout(() => setSaveStatus(null), 2000);
  };

  const isRegistered = nameInput.trim().length >= 3 && groupInput.trim().length > 0;

  const highestUnlocked = Math.max(1, ...unlockedBlocks);

  const getStartButtonTarget = (): ModuleId => {
    if (highestUnlocked === 1) return 'b1-conductors';
    if (highestUnlocked === 2) return 'b2-simbologia';
    if (highestUnlocked === 3) return 'b3-llei-dohm';
    if (highestUnlocked === 4) return 'b4-codi-colors';
    return 'b5-laboratori-multimetre';
  };

  const blocks = [
    {
      num: 1,
      targetId: 'b1-conductors' as ModuleId,
      time: '25 minuts',
      title: 'Bloc 1: Què és l\'Electricitat?',
      tagline: 'Conductors, aïllants i transformacions d\'energia',
      description:
        'Comprèn com es mouen els electrons, quins materials condueixen el corrent i de quines maneres podem transformar l\'energia elèctrica en llum, calor, so i moviment.',
      tools: ['ElectroConnecta (Simulador de materials)', 'ElectroTransforma (Joc de transformacions)'],
      color: 'from-blue-600 to-cyan-600',
      border: 'border-blue-500/30',
      badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      icon: Zap,
    },
    {
      num: 2,
      targetId: 'b2-simbologia' as ModuleId,
      time: '30 minuts',
      title: 'Bloc 2: Dibuix i Esquemes de Circuits',
      tagline: 'Simbologia normalitzada, circuits sèrie i paral·lel',
      description:
        'Aprèn a llegir esquemes elèctrics normalitzats (piles, bombetes, interruptors, motors) i descobreix les diferències clau entre circuits en sèrie i en paral·lel.',
      tools: ['ElectroCircuit (Biblioteca & Quiz de símbols)', 'Circuit Màgic (Simulador sèrie vs paral·lel)'],
      color: 'from-amber-600 to-yellow-600',
      border: 'border-amber-500/30',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      icon: Layers,
    },
    {
      num: 3,
      targetId: 'b3-llei-dohm' as ModuleId,
      time: '40 minuts',
      title: 'Bloc 3: Magnituds i la Llei d\'Ohm',
      tagline: 'Volts, Amperes, Ohms i la fórmula fonamental V = I · R',
      description:
        'Practica la conversió de múltiples i submúltiples (mA, kΩ, mV) i experimenta directament amb la Llei d\'Ohm mitjançant un simulador visual amb potenciòmetres interactius.',
      tools: ['Conversor d\'Unitats Elèctriques', 'Simulador de la Llei d\'Ohm (amb exercicis autocorregibles)'],
      color: 'from-emerald-600 to-teal-600',
      border: 'border-emerald-500/30',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      icon: Gauge,
    },
    {
      num: 4,
      targetId: 'b4-codi-colors' as ModuleId,
      time: '35 minuts',
      title: 'Bloc 4: Resistències i Codi de Colors',
      tagline: 'Desxifra el valor d\'una resistència amb les 4 bandes',
      description:
        'Descobreix la funció de les resistències com a limitadors de corrent i domina la lectura del codi de colors internacional (xifres, multiplicador i tolerància).',
      tools: ['Joc de Codi de Colors de Resistències (amb gràfics i taula interactiva)'],
      color: 'from-purple-600 to-indigo-600',
      border: 'border-purple-500/30',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      icon: Sliders,
    },
    {
      num: 5,
      targetId: 'b5-laboratori-multimetre' as ModuleId,
      time: '50 minuts',
      title: 'Bloc 5: Tasca Final: Laboratori amb Multímetre',
      tagline: 'Mesures de voltatge, resistència i càlculs de laboratori',
      description:
        'L\'avaluació pràctica: maneja un multímetre digital interactiu, mesura resistències reals, avalua caigudes de tensió en circuits sèrie i calcula incògnites amb la Llei d\'Ohm.',
      tools: ['Simulador Virtual de Multímetre Digital', 'Bancs de Circuits Reals', 'Quadern de Pràctiques i Informe Final'],
      color: 'from-orange-600 to-red-600',
      border: 'border-orange-500/30',
      badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      icon: FileCheck2,
      isFinalTask: true,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 border border-slate-700/80 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles size={14} /> Càpsula Seqüencial de 3 Hores (180 min)
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Aprendre Electricitat Bàsica <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400">
              De l'Àtom al Multímetre
            </span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">
            Aquesta càpsula és <strong>estrictament seqüencial</strong>: has de superar i completar cada bloc per desbloquejar el següent, fins a arribar a la <strong>tasca final de mesura i càlculs amb el multímetre digital</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {isRegistered ? (
              <button
                onClick={() => onSelectModule(getStartButtonTarget())}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-amber-500/20 flex items-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <span>
                  {highestUnlocked === 1 ? 'Comença pel Bloc 1 (Conductors)' : `Continua al Bloc ${highestUnlocked}`}
                </span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <div className="px-5 py-3 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-amber-300 text-xs font-bold flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-400 shrink-0" />
                <span>Identifica't al formulari inferior per començar la càpsula.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mandatory Student Registration Form with Immediate Autosave */}
      <div
        id="student-registration"
        className={`rounded-3xl p-6 md:p-8 border shadow-xl transition-all duration-300 ${
          isRegistered
            ? 'bg-slate-800/80 border-slate-700'
            : 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border-amber-500 ring-2 ring-amber-500/50'
        }`}
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-1">
              <Award className="text-amber-400" size={24} />
              <h3 className="text-xl font-black text-white">
                Identificació de l'Alumne/a (Obligatòria)
              </h3>
              {!isRegistered && (
                <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/40 px-2 py-0.5 rounded-full font-bold uppercase">
                  Pendent
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Per fer la càpsula és imprescindible indicar el teu nom, cognoms i grup classe (1r, 2n o 3r d'ESO, línia A o B). S'activa l'<strong>autosave automàtic</strong> de totes les teves respostes i progrés.
            </p>
          </div>

          {/* Form with inputs */}
          <div className="w-full lg:w-auto flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Name input */}
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Nom i Cognoms: <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Escriu el teu nom i cognoms..."
                  value={nameInput}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-amber-500 outline-none w-full sm:w-72"
                  required
                />
              </div>

              {/* Class Group Selector Buttons */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Grup Classe: <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {CLASS_GROUPS.map((grp) => {
                    const isSelected = groupInput === grp;
                    return (
                      <button
                        key={grp}
                        type="button"
                        onClick={() => handleGroupSelect(grp)}
                        className={`px-3 py-2 rounded-xl text-xs font-black transition border ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md transform scale-105'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {grp}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Autosave status pill */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Autosave actiu al navegador (no perdràs res si recarregues la pàgina)
              </span>
              {saveStatus && (
                <span className="text-emerald-400 font-bold flex items-center gap-1 animate-fade-in">
                  <CheckCircle2 size={14} /> {saveStatus}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Sequential 3-Hour Itinerary */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              ITINERARI SEQÜENCIAL D'APRENENTATGE
            </span>
            <h2 className="text-3xl font-black text-white">Els 5 Blocs Didàctics</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Supera cada bloc per desbloquejar el següent pas a pas.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 block">Progrés Seqüencial</span>
            <span className="text-lg font-black text-amber-400">
              {completedBlocks.length} de 5 Blocs completats ({Math.round((completedBlocks.length / 5) * 100)}%)
            </span>
          </div>
        </div>

        {/* Block Cards List */}
        <div className="grid grid-cols-1 gap-5">
          {blocks.map((block) => {
            const Icon = block.icon;
            const isCompleted = completedBlocks.includes(block.num);
            const isUnlocked = isRegistered && unlockedBlocks.includes(block.num);
            const isCurrent = isUnlocked && !isCompleted && (block.num === 1 || completedBlocks.includes(block.num - 1));

            return (
              <div
                key={block.num}
                className={`relative overflow-hidden rounded-3xl border p-6 md:p-8 shadow-xl transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ${
                  isUnlocked
                    ? `bg-slate-800/90 ${block.border} hover:border-amber-500/50 hover:bg-slate-800`
                    : 'bg-slate-950/60 border-slate-800/80 opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Block Number & Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0 transition ${
                      isUnlocked
                        ? `bg-gradient-to-tr ${block.color}`
                        : 'bg-slate-800 text-slate-600'
                    }`}
                  >
                    {isUnlocked ? <Icon size={28} /> : <Lock size={26} className="text-slate-500" />}
                  </div>

                  {/* Info */}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${isUnlocked ? block.badgeBg : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
                        BLOC {block.num} • {block.time}
                      </span>
                      {block.isFinalTask && (
                        <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                          TASCA FINAL D'AVALUACIÓ
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 size={14} /> Completat
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1 animate-pulse">
                          ● Bloc Actual
                        </span>
                      )}
                      {!isUnlocked && (
                        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                          <Lock size={12} /> Bloquejat (cal completar el Bloc {block.num - 1})
                        </span>
                      )}
                    </div>
                    <h3 className={`text-xl font-black ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                      {block.title}
                    </h3>
                    <p className={`text-xs font-semibold ${isUnlocked ? 'text-amber-300/90' : 'text-slate-500'}`}>
                      {block.tagline}
                    </p>
                    <p className={`text-xs leading-relaxed max-w-2xl pt-1 ${isUnlocked ? 'text-slate-300' : 'text-slate-500'}`}>
                      {block.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {block.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-slate-900/80 text-slate-400 px-2 py-0.5 rounded-md border border-slate-700/60 font-mono"
                        >
                          🕹️ {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <div className="w-full lg:w-auto shrink-0 flex lg:flex-col justify-end">
                  {isUnlocked ? (
                    <button
                      onClick={() => onSelectModule(block.targetId)}
                      className={`w-full lg:w-auto px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                        isCurrent
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                          : isCompleted
                          ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                          : 'bg-slate-700 hover:bg-slate-600 text-white'
                      }`}
                    >
                      <span>{isCompleted ? `Repassar Bloc ${block.num}` : `Entrar al Bloc ${block.num}`}</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full lg:w-auto px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed"
                    >
                      <Lock size={14} />
                      <span>Bloquejat</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
