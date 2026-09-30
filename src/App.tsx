import React, { useState, useEffect } from 'react';
import { ModuleId, CLASS_GROUPS, ClassGroup } from './types';
import { HeaderNav } from './components/HeaderNav';
import { Dashboard } from './components/Dashboard';
import { Bloc1View } from './modules/b1_conductors/Bloc1View';
import { Bloc2TransformationsView } from './modules/b1_transformacions/Bloc2TransformationsView';
import { Bloc3CircuitsView } from './modules/b2_simbologia/Bloc3CircuitsView';
import { Bloc4OhmView } from './modules/b3_llei_dohm/Bloc4OhmView';
import { Bloc5ResistorsView } from './modules/b4_codi_colors/Bloc5ResistorsView';
import { MultimeterLabApp } from './modules/b5_multimetre/MultimeterLabApp';
import { User, X, CheckCircle2 } from 'lucide-react';

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

  // Sequential unlock computation (1 to 6)
  const unlockedBlocks = React.useMemo(() => {
    if (!isRegistered) return [];
    const unlocked = [1];
    if (completedBlocks.includes(1)) unlocked.push(2);
    if (completedBlocks.includes(2)) unlocked.push(3);
    if (completedBlocks.includes(3)) unlocked.push(4);
    if (completedBlocks.includes(4)) unlocked.push(5);
    if (completedBlocks.includes(5)) unlocked.push(6);
    return unlocked;
  }, [isRegistered, completedBlocks]);

  const [currentModule, setCurrentModule] = useState<ModuleId>(() => {
    const saved = localStorage.getItem('electricitat_current_module') as ModuleId | null;
    return saved || 'dashboard';
  });

  const [showStudentModal, setShowStudentModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<string>(studentName);
  const [modalGroup, setModalGroup] = useState<string>(studentGroup);

  const handleSaveStudentInfo = (name: string, group: string) => {
    setStudentName(name);
    setStudentGroup(group);
    localStorage.setItem('electricitat_student_name', name);
    localStorage.setItem('electricitat_student_group', group);
  };

  const handleSelectModule = (id: ModuleId) => {
    let targetBlocNum = 0;
    if (id === 'b1-que-es-electricitat') targetBlocNum = 1;
    else if (id === 'b2-transformacions') targetBlocNum = 2;
    else if (id === 'b3-simbologia-circuits') targetBlocNum = 3;
    else if (id === 'b4-llei-dohm') targetBlocNum = 4;
    else if (id === 'b5-codi-colors') targetBlocNum = 5;
    else if (id === 'b6-multimetre') targetBlocNum = 6;

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
      alert('Si us plau, introdueix el teu nom, cognoms i selecciona el teu grup classe.');
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

  // If user is on a locked block, fall back to dashboard
  useEffect(() => {
    if (currentModule !== 'dashboard') {
      let blocNum = 0;
      if (currentModule === 'b1-que-es-electricitat') blocNum = 1;
      else if (currentModule === 'b2-transformacions') blocNum = 2;
      else if (currentModule === 'b3-simbologia-circuits') blocNum = 3;
      else if (currentModule === 'b4-llei-dohm') blocNum = 4;
      else if (currentModule === 'b5-codi-colors') blocNum = 5;
      else if (currentModule === 'b6-multimetre') blocNum = 6;

      if (!isRegistered || !unlockedBlocks.includes(blocNum)) {
        setCurrentModule('dashboard');
        localStorage.setItem('electricitat_current_module', 'dashboard');
      }
    }
  }, [isRegistered, unlockedBlocks, currentModule]);

  // Scroll to top when switching modules
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentModule]);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-800 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-900">
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

        {currentModule === 'b1-que-es-electricitat' && (
          <Bloc1View
            onComplete={() => markBlockCompleted(1)}
            onNext={() => {
              markBlockCompleted(1);
              handleSelectModule('b2-transformacions');
            }}
            onBackToDashboard={() => handleSelectModule('dashboard')}
          />
        )}

        {currentModule === 'b2-transformacions' && (
          <Bloc2TransformationsView
            onComplete={() => markBlockCompleted(2)}
            onNext={() => {
              markBlockCompleted(2);
              handleSelectModule('b3-simbologia-circuits');
            }}
            onBackToDashboard={() => handleSelectModule('dashboard')}
          />
        )}

        {currentModule === 'b3-simbologia-circuits' && (
          <Bloc3CircuitsView
            onComplete={() => markBlockCompleted(3)}
            onNext={() => {
              markBlockCompleted(3);
              handleSelectModule('b4-llei-dohm');
            }}
            onBackToDashboard={() => handleSelectModule('dashboard')}
          />
        )}

        {currentModule === 'b4-llei-dohm' && (
          <Bloc4OhmView
            onComplete={() => markBlockCompleted(4)}
            onNext={() => {
              markBlockCompleted(4);
              handleSelectModule('b5-codi-colors');
            }}
            onBackToDashboard={() => handleSelectModule('dashboard')}
          />
        )}

        {currentModule === 'b5-codi-colors' && (
          <Bloc5ResistorsView
            onComplete={() => markBlockCompleted(5)}
            onNext={() => {
              markBlockCompleted(5);
              handleSelectModule('b6-multimetre');
            }}
            onBackToDashboard={() => handleSelectModule('dashboard')}
          />
        )}

        {currentModule === 'b6-multimetre' && (
          <MultimeterLabApp
            studentName={studentName}
            studentGroup={studentGroup}
            onBackToDashboard={() => handleSelectModule('dashboard')}
          />
        )}
      </main>

      {/* Clean, light footer */}
      <footer className="bg-white border-t border-stone-200 py-6 text-center text-xs text-stone-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>
            ⚡ <strong>Càpsula Didàctica d'Electricitat (3 Hores)</strong> • Guia d'aprenentatge seqüencial amb autosave.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => handleSelectModule('dashboard')}
              className="text-stone-600 hover:text-stone-900 transition font-medium"
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
              className="text-stone-400 hover:text-red-600 transition"
            >
              Reiniciar Progrés
            </button>
          </div>
        </div>
      </footer>

      {/* Student Identification Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border border-stone-200 shadow-2xl relative text-stone-800 animate-fade-in">
            {isRegistered && (
              <button
                onClick={() => setShowStudentModal(false)}
                className="absolute top-5 right-5 text-stone-400 hover:text-stone-600"
              >
                <X size={20} />
              </button>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white font-bold flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900">Dades de l'Alumne/a</h3>
                <p className="text-xs text-stone-500">
                  {isRegistered ? 'Modifica les teves dades' : 'Pas obligatori per començar la càpsula'}
                </p>
              </div>
            </div>

            <form onSubmit={handleModalSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Nom i Cognoms <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={modalName}
                  onChange={(e) => setModalName(e.target.value)}
                  placeholder="Ex: Gerard Calle Reus"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Grup Classe <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {CLASS_GROUPS.map((grp) => (
                    <button
                      key={grp}
                      type="button"
                      onClick={() => setModalGroup(grp)}
                      className={`py-2 rounded-xl text-xs font-bold transition border ${
                        modalGroup === grp
                          ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      {grp}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-stone-100">
                {isRegistered && (
                  <button
                    type="button"
                    onClick={() => setShowStudentModal(false)}
                    className="px-4 py-2 text-xs font-bold text-stone-500 hover:text-stone-700"
                  >
                    Cancel·lar
                  </button>
                )}
                <button
                  type="submit"
                  disabled={modalName.trim().length < 3 || !modalGroup}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    modalName.trim().length >= 3 && modalGroup
                      ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm cursor-pointer'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 size={15} />
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
