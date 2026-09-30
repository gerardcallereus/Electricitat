import React, { useState } from 'react';
import { ModuleId } from '../types';
import {
  Zap,
  Clock,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Award,
  Layers,
  Gauge,
  Sliders,
  Sparkles,
  HelpCircle,
  FileCheck2,
  Cpu
} from 'lucide-react';

interface DashboardProps {
  onSelectModule: (id: ModuleId) => void;
  studentName: string;
  studentGroup: string;
  onSaveStudentInfo: (name: string, group: string) => void;
  completedBlocks: number[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  onSelectModule,
  studentName,
  studentGroup,
  onSaveStudentInfo,
  completedBlocks,
}) => {
  const [nameInput, setNameInput] = useState(studentName);
  const [groupInput, setGroupInput] = useState(studentGroup);
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveStudentInfo(nameInput, groupInput);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2500);
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
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 border border-slate-700/80 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles size={14} /> Càpsula Formativa Autònoma
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Aprendre Electricitat Bàsica <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400">
              De l'Àtom al Multímetre
            </span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8">
            Una seqüència interactiva de <strong>3 hores (180 minuts)</strong> dissenyada per a l'alumnat de secundària i cicles formatius. Combina teoria conceptual, simuladors de circuits i una <strong>tasca final de mesura i càlculs amb multímetre digital</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onSelectModule('b1-conductors')}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-amber-500/20 flex items-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <span>Comença la Càpsula (Bloc 1)</span>
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onSelectModule('b5-laboratori-multimetre')}
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold rounded-2xl flex items-center gap-2 transition"
            >
              <span>Ves directament al Multímetre</span>
              <FileCheck2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Student Registration Form */}
      <div className="bg-slate-800/80 backdrop-blur rounded-3xl p-6 md:p-8 border border-slate-700 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Award className="text-amber-400" size={24} />
              Identificació de l'Alumne/a per a l'Avaluació
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Aquestes dades apareixeran al full d'informe de qualificació final generat pel <strong>Bloc 5 (Multímetre)</strong> per lliurar al professorat.
            </p>
          </div>

          <form onSubmit={handleSave} className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Nom i Cognoms"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-amber-500 outline-none w-full sm:w-64"
              required
            />
            <input
              type="text"
              placeholder="Grup (Ex: 3r ESO A)"
              value={groupInput}
              onChange={(e) => setGroupInput(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-amber-500 outline-none w-full sm:w-40"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition"
            >
              Desar
            </button>
          </form>
        </div>
        {savedBanner && (
          <div className="mt-3 text-xs text-emerald-400 font-bold flex items-center gap-1.5 animate-fade-in">
            <CheckCircle2 size={16} /> Dades desades correctament!
          </div>
        )}
      </div>

      {/* Progress & 3-Hour Itinerary */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              ITINERARI PEDAGÒGIC
            </span>
            <h2 className="text-3xl font-black text-white">Els 5 Blocs Didàctics</h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Progrés Total</span>
            <span className="text-lg font-black text-amber-400">
              {completedBlocks.length} de 5 Blocs completats
            </span>
          </div>
        </div>

        {/* Block Cards List */}
        <div className="grid grid-cols-1 gap-5">
          {blocks.map((block) => {
            const Icon = block.icon;
            const isCompleted = completedBlocks.includes(block.num);

            return (
              <div
                key={block.num}
                className={`relative overflow-hidden rounded-3xl bg-slate-800/90 border ${block.border} p-6 md:p-8 shadow-xl transition-all duration-300 hover:border-amber-500/50 hover:bg-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 group`}
              >
                <div className="flex items-start gap-4">
                  {/* Block Number & Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${block.color} flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0 group-hover:scale-105 transition`}
                  >
                    <Icon size={28} />
                  </div>

                  {/* Info */}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${block.badgeBg}`}>
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
                    </div>
                    <h3 className="text-xl font-black text-white">{block.title}</h3>
                    <p className="text-xs font-semibold text-amber-300/90">{block.tagline}</p>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-2xl pt-1">
                      {block.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {block.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-slate-900/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/60 font-mono"
                        >
                          🕹️ {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <div className="w-full lg:w-auto shrink-0 flex lg:flex-col justify-end">
                  <button
                    onClick={() => onSelectModule(block.targetId)}
                    className={`w-full lg:w-auto px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                      block.isFinalTask
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    <span>Entrar al Bloc {block.num}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Curriculum Competencies Footer */}
      <div className="bg-slate-950/60 p-6 rounded-3xl border border-slate-800 text-xs text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="font-bold text-slate-200">Competències Clau del Currículum:</span>
          <p className="mt-1">
            Anàlisi de circuits elèctrics bàsics, càlcul de magnituds mitjançant la Llei d'Ohm, ús segur i eficaç d'instruments de mesura elèctrica (multímetre) i interpretació de codis normalitzats.
          </p>
        </div>
        <div className="shrink-0 text-slate-500 font-mono">
          Durada Recomanada: 180 min (3h)
        </div>
      </div>
    </div>
  );
};
