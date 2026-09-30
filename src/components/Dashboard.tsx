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
  AlertCircle,
  Lightbulb,
  Cpu
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

  useEffect(() => {
    setNameInput(studentName);
  }, [studentName]);

  useEffect(() => {
    setGroupInput(studentGroup);
  }, [studentGroup]);

  const handleNameChange = (val: string) => {
    setNameInput(val);
    onSaveStudentInfo(val, groupInput);
    triggerAutoSaveIndicator();
  };

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
    if (highestUnlocked === 1) return 'b1-que-es-electricitat';
    if (highestUnlocked === 2) return 'b2-transformacions';
    if (highestUnlocked === 3) return 'b3-simbologia-circuits';
    if (highestUnlocked === 4) return 'b4-llei-dohm';
    if (highestUnlocked === 5) return 'b5-codi-colors';
    return 'b6-multimetre';
  };

  const blocks = [
    {
      num: 1,
      targetId: 'b1-que-es-electricitat' as ModuleId,
      time: '25 minuts',
      title: 'Bloc 1: Què és l\'Electricitat? Conductors i Aïllants',
      description:
        'L\'àtom, els electrons lliures i el corrent elèctric. Experimenta quins materials permeten tancar un circuit amb el simulador ElectroConnecta.',
      badge: 'Teoria Fonamental + Simulador',
      icon: Zap,
    },
    {
      num: 2,
      targetId: 'b2-transformacions' as ModuleId,
      time: '25 minuts',
      title: 'Bloc 2: Les Transformacions de l\'Energia Elèctrica',
      description:
        'Com convertim l\'electricitat en llum, calor (efecte Joule), moviment (motors) i so. Joc interactiu de preguntes i targetes ElectroTransforma.',
      badge: 'Joc Interactiu',
      icon: Lightbulb,
    },
    {
      num: 3,
      targetId: 'b3-simbologia-circuits' as ModuleId,
      time: '30 minuts',
      title: 'Bloc 3: Simbologia Normalitzada i Circuits (Sèrie / Paral·lel)',
      description:
        'Llegeix esquemes normalitzats de circuits i descobreix el funcionament dels components en sèrie i en paral·lel amb Circuit Màgic.',
      badge: 'Biblioteca + Simulador',
      icon: Layers,
    },
    {
      num: 4,
      targetId: 'b4-llei-dohm' as ModuleId,
      time: '35 minuts',
      title: 'Bloc 4: Les Magnituds Elèctriques i la Llei d\'Ohm',
      description:
        'Voltatge (V), Intensitat (I) i Resistència (R). Conversió de prefixos (mA, kΩ) i simulador visual de la Llei d\'Ohm (V = I · R).',
      badge: 'Conversor + Simulador Matemàtic',
      icon: Gauge,
    },
    {
      num: 5,
      targetId: 'b5-codi-colors' as ModuleId,
      time: '25 minuts',
      title: 'Bloc 5: La Resistència com a Component i Codi de Colors',
      description:
        'Com protegeixen les resistències els components sensibles. Desxifra els 4 anells de color abans d\'entrar al laboratori.',
      badge: 'Pràctica de Càlcul',
      icon: Sliders,
    },
    {
      num: 6,
      targetId: 'b6-multimetre' as ModuleId,
      time: '40 minuts',
      title: 'Bloc 6: Tasca Final: Laboratori Virtual amb Multímetre',
      description:
        'L\'avaluació pràctica: utilitza el tester per mesurar resistències i caigudes de tensió reals, resol el repte de la Llei d\'Ohm i genera el teu informe.',
      badge: 'Avaluació de Laboratori',
      icon: FileCheck2,
      isFinal: true,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 text-stone-800">
      {/* Friendly Hero Banner */}
      <div className="bg-white rounded-3xl p-8 md:p-10 border border-stone-200/90 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wide">
            <Sparkles size={14} className="text-amber-600" /> Càpsula Formativa de 3 Hores
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
            Aprendre Electricitat Bàsica <br />
            <span className="text-amber-700">De l'Àtom al Multímetre</span>
          </h1>
          <p className="text-stone-600 text-sm md:text-base leading-relaxed">
            Una seqüència didàctica estructurada per a l'alumnat de secundària i cicles formatius. Supera cadascun dels blocs pas a pas fins a completar la pràctica final amb el multímetre digital.
          </p>

          <div className="pt-2">
            {isRegistered ? (
              <button
                onClick={() => onSelectModule(getStartButtonTarget())}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-sm flex items-center gap-2 transition"
              >
                <span>
                  {highestUnlocked === 1 ? 'Començar el Bloc 1: Què és l\'electricitat?' : `Continuar al Bloc ${highestUnlocked}`}
                </span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs font-medium">
                <AlertCircle size={16} className="text-amber-600 shrink-0" />
                <span>Indica el teu nom i grup classe al formulari de sota per començar.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mandatory Student Identification Card */}
      <div
        className={`rounded-3xl p-6 md:p-8 border shadow-sm transition-all ${
          isRegistered
            ? 'bg-white border-stone-200'
            : 'bg-amber-50/50 border-2 border-amber-400'
        }`}
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="max-w-md space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-sm">
                <Award size={18} />
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Identificació de l'Alumne/a
              </h3>
              {!isRegistered && (
                <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase">
                  Obligatori
                </span>
              )}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Necessitem el teu nom i grup per desar el teu progrés i generar l'informe final del multímetre.
            </p>
          </div>

          {/* Form fields */}
          <div className="w-full lg:w-auto flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Nom i Cognoms <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Gerard Calle Reus"
                  value={nameInput}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none w-full sm:w-64"
                  required
                />
              </div>

              {/* Class group */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                  Grup Classe <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {CLASS_GROUPS.map((grp) => {
                    const isSelected = groupInput === grp;
                    return (
                      <button
                        key={grp}
                        type="button"
                        onClick={() => handleGroupSelect(grp)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition border ${
                          isSelected
                            ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
                        }`}
                      >
                        {grp}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Autosave status indicator */}
            <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
              <span className="flex items-center gap-1.5 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Autosave actiu: no perdràs les teves respostes si tanques la pestanya.
              </span>
              {saveStatus && (
                <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 size={13} /> {saveStatus}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sequential Blocks Roadmap */}
      <div className="space-y-4">
        <div className="flex justify-between items-end border-b border-stone-200 pb-3">
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
              Itinerari Seqüencial
            </span>
            <h2 className="text-2xl font-bold text-stone-900">Els 6 Blocs d'Aprenentatge</h2>
          </div>
          <div className="text-right text-xs text-stone-500">
            <span>Completats: </span>
            <strong className="text-stone-900">{completedBlocks.length} de 6</strong>
          </div>
        </div>

        {/* List of cards */}
        <div className="space-y-3">
          {blocks.map((block) => {
            const Icon = block.icon;
            const isCompleted = completedBlocks.includes(block.num);
            const isUnlocked = isRegistered && unlockedBlocks.includes(block.num);
            const isCurrent = isUnlocked && !isCompleted && (block.num === 1 || completedBlocks.includes(block.num - 1));

            return (
              <div
                key={block.num}
                className={`rounded-2xl p-5 md:p-6 border transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isUnlocked
                    ? 'bg-white border-stone-200 hover:border-stone-300 shadow-sm'
                    : 'bg-stone-100/60 border-stone-200/60 opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 ${
                      isUnlocked
                        ? isCurrent
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-stone-100 text-stone-700'
                        : 'bg-stone-200 text-stone-400'
                    }`}
                  >
                    {isUnlocked ? <Icon size={22} /> : <Lock size={20} />}
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                        {block.time}
                      </span>
                      <span className="text-[10px] font-medium bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full border border-stone-200">
                        {block.badge}
                      </span>
                      {isCompleted && (
                        <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 size={13} /> Completat
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1">
                          ● Següent
                        </span>
                      )}
                    </div>
                    <h3 className={`text-base font-bold ${isUnlocked ? 'text-stone-900' : 'text-stone-500'}`}>
                      {block.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
                      {block.description}
                    </p>
                  </div>
                </div>

                {/* Button */}
                <div className="shrink-0 w-full md:w-auto">
                  {isUnlocked ? (
                    <button
                      onClick={() => onSelectModule(block.targetId)}
                      className={`w-full md:w-auto px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                        isCurrent
                          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                      }`}
                    >
                      <span>{isCompleted ? 'Repassar' : 'Començar'}</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <div className="w-full md:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-stone-400 bg-stone-100 border border-stone-200 flex items-center justify-center gap-1.5 cursor-not-allowed">
                      <Lock size={12} />
                      <span>Bloquejat</span>
                    </div>
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
