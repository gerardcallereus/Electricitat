import React, { useState, useEffect } from 'react';
import { ModuleId, CLASS_GROUPS, ClassGroup } from './types';
import { HeaderNav } from './components/HeaderNav';
import { Dashboard } from './components/Dashboard';
import { Bloc1View } from './modules/b1_conductors/Bloc1View';
import { Bloc2View } from './modules/b2_simbologia/Bloc2View';
import { Bloc3View } from './modules/b3_llei_dohm/Bloc3View';
import { Bloc4View } from './modules/b4_codi_colors/Bloc4View';
import { MultimeterLabApp } from './modules/b5_multimetre/MultimeterLabApp';
import { User, X, CheckCircle2, Lock, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('electricitat_student_name') || '';
  });
  const [studentGroup, setStudentGroup] = useState<string>(() => {
    return localStorage.getItem('electricitat_student_group') || '';
  });
  const [completedBlocks, setCompletedBlocks] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('electricitat_completed_blocks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const isRegistered = studentName.trim().length >= 3 && studentGroup.trim().length > 0;

  // Compute unlocked blocks sequentially: Bloc 1 is always unlocked if registered,
  // then block N+1 is unlocked only if block N is in completedBlocks.
  const unlockedBlocks = React.useMemo(() => {
    if (!isRegistered) return [];
    const unlocked = [1];
    if (completedBlocks.includes(1)) unlocked.push(2);
    if (completedBlocks.includes(2)) unlocked.push(3);
    if (completedBlocks.includes(3)) unlocked.push(4);
    if (completedBlocks.includes(4)) unlocked.push(5);
    return unlocked;
  }, [isRegistered, completedBlocks]);

  const [currentModule, setCurrentModule] = useState<ModuleId>(() => {
    const saved = localStorage.getItem('electricitat_current_module') as ModuleId | null;
    return saved || 'dashboard';
  });

  const [showStudentModal, setShowStudentModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<string>(studentName);
  const [modalGroup, setModalGroup] = useState<string>(studentGroup);

  // Autosave student info
  const handleSaveStudentInfo = (name: string, group: string) => {
    setStudentName(name);
    setStudentGroup(group);
    localStorage.setItem('electricitat_student_name', name);
    localStorage.setItem('electricitat_student_group', group);
  };

  // Autosave current module on change
  const handleSelectModule = (id: ModuleId) => {
    // If attempting to enter a block
    let targetBlocNum = 0;
    if (id.startsWith('b1')) targetBlocNum = 1;
    else if (id.startsWith('b2')) targetBlocNum = 2;
    else if (id.startsWith('b3')) targetBlocNum = 3;
    else if (id.startsWith('b4')) targetBlocNum = 4;
    else if (id.startsWith('b5')) targetBlocNum = 5;

    if (targetBlocNum > 0) {
      if (!isRegistered) {
        setShowStudentModal(true);
        return;
      }
      if (!unlockedBlocks.includes(targetBlocNum)) {
        alert(`🔒 El Bloc ${targetBlocNum} està bloquejat! Has de completar el Bloc ${targetBlocNum - 1} primer.`);
        return;
      }
    }

    setCurrentModule(id);
    localStorage.setItem('electricitat_current_module', id);
  };

  const handleModalSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalName.trim().length < 3 || !modalGroup) {
      alert('Si us plau, introdueix el teu nom, cognoms i selecciona el teu grup classe (1r, 2n o 3r A/B).');
      return;
    }
    handleSaveStudentInfo(modalName, modalGroup);
    setShowStudentModal(false);
  };

  const markBlockCompleted = (blocNum: number) => {
    if (!completedBlocks.includes(blocNum)) {
      const updated = [...completedBlocks, blocNum];
      setCompletedBlocks(updated);
      localStorage.setItem('electricitat_completed_blocks', JSON.stringify(updated));
    }
  };

  // If page loaded on a locked block without permission, reset to dashboard
  useEffect(() => {
    if (currentModule !== 'dashboard') {
      let blocNum = 0;
      if (currentModule.startsWith('b1')) blocNum = 1;
      else if (currentModule.startsWith('b2')) blocNum = 2;
      else if (currentModule.startsWith('b3')) blocNum = 3;
      else if (currentModule.startsWith('b4')) blocNum = 4;
      else if (currentModule.startsWith('b5')) blocNum = 5;

      if (!isRegistered || !unlockedBlocks.includes(blocNum)) {
        setCurrentModule('dashboard');
        localStorage.setItem('electricitat_current_module', 'dashboard');
      }
    }
  }, [isRegistered, unlockedBlocks, currentModule]);

  // Auto-scroll to top when switching modules
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentModule]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Header Navigation */}
      <HeaderNav
        currentModule={currentModule}
        onSelectModule={handleSelectModule}
        studentName={studentName}
        studentGroup={studentGroup}
        onEditStudent={() => {
          setModalName(studentName);
          setModalGroup(studentGroup);
          setShowStudentModal(true);
        }}
        completedBlocks={completedBlocks}
        unlockedBlocks={unlockedBlocks}
        isRegistered={isRegistered}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        {currentModule === 'dashboard' && (
          <Dashboard
            onSelectModule={handleSelectModule}
            studentName={studentName}
            studentGroup={studentGroup}
            onSaveStudentInfo={handleSaveStudentInfo}
            completedBlocks={completedBlocks}
            unlockedBlocks={unlockedBlocks}
          />
        )}

        {(currentModule === 'b1-conductors' || currentModule === 'b1-transformacions') && (
          <Bloc1View
            onComplete={() => markBlockCompleted(1)}
            onNext={() => {
              markBlockCompleted(1);
              handleSelectModule('b2-simbologia');
            }}
          />
        )}

        {(currentModule === 'b2-simbologia' || currentModule === 'b2-circuits') && (
          <Bloc2View
            onComplete={() => markBlockCompleted(2)}
            onNext={() => {
              markBlockCompleted(2);
              handleSelectModule('b3-llei-dohm');
            }}
          />
        )}

        {(currentModule === 'b3-llei-dohm' || currentModule === 'b3-unitats') && (
          <Bloc3View
            onComplete={() => markBlockCompleted(3)}
            onNext={() => {
              markBlockCompleted(3);
              handleSelectModule('b4-codi-colors');
            }}
          />
        )}

        {currentModule === 'b4-codi-colors' && (
          <Bloc4View
            onComplete={() => markBlockCompleted(4)}
            onNext={() => {
              markBlockCompleted(4);
              handleSelectModule('b5-laboratori-multimetre');
            }}
          />
        )}

        {currentModule === 'b5-laboratori-multimetre' && (
          <MultimeterLabApp
            studentName={studentName}
            studentGroup={studentGroup}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>
            ⚡ <strong>Càpsula Didàctica d'Electricitat (3 Hores)</strong> • Seqüència d'aprenentatge guiada amb autosave.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => handleSelectModule('dashboard')}
              className="text-slate-400 hover:text-white transition"
            >
              Panell d'Inici & Itinerari
            </button>
            <button
              onClick={() => {
                if (confirm('Vols reiniciar el progrés desat de tots els blocs? Aquesta acció tornarà a bloquejar els blocs avançats.')) {
                  setCompletedBlocks([]);
                  localStorage.removeItem('electricitat_completed_blocks');
                  setCurrentModule('dashboard');
                  localStorage.setItem('electricitat_current_module', 'dashboard');
                }
              }}
              className="text-slate-500 hover:text-red-400 transition"
            >
              Reiniciar Progrés
            </button>
          </div>
        </div>
      </footer>

      {/* Mandatory Student Identification Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-3xl p-6 md:p-8 max-w-lg w-full border-2 border-amber-500 shadow-2xl relative text-white animate-fade-in">
            {isRegistered && (
              <button
                onClick={() => setShowStudentModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center shadow-lg">
                <User size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black">Dades de l'Alumne/a</h3>
                <p className="text-xs text-amber-300">
                  {isRegistered ? 'Modifica les teves dades' : 'Pas obligatori per començar la càpsula'}
                </p>
              </div>
            </div>

            <form onSubmit={handleModalSave} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Nom i Cognoms: <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={modalName}
                  onChange={(e) => setModalName(e.target.value)}
                  placeholder="Ex: Gerard Calle Reus"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Grup Classe: <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {CLASS_GROUPS.map((grp) => (
                    <button
                      key={grp}
                      type="button"
                      onClick={() => setModalGroup(grp)}
                      className={`py-2 rounded-xl text-xs font-black transition border ${
                        modalGroup === grp
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                          : 'bg-slate-900 hover:bg-slate-700 text-slate-300 border-slate-700'
                      }`}
                    >
                      {grp}
                    </button>
                  ))}
                </div>
                {!modalGroup && (
                  <span className="text-[11px] text-amber-400 mt-1 block">
                    Selecciona el teu curs i grup (1r A, 1r B, 2n A, 2n B, 3r A o 3r B)
                  </span>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-700">
                {isRegistered && (
                  <button
                    type="button"
                    onClick={() => setShowStudentModal(false)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white"
                  >
                    Cancel·lar
                  </button>
                )}
                <button
                  type="submit"
                  disabled={modalName.trim().length < 3 || !modalGroup}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                    modalName.trim().length >= 3 && modalGroup
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg cursor-pointer'
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 size={16} />
                  <span>Desar i Continuar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
