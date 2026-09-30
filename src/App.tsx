import React, { useState, useEffect } from 'react';
import { ModuleId } from './types';
import { HeaderNav } from './components/HeaderNav';
import { Dashboard } from './components/Dashboard';
import { Bloc1View } from './modules/b1_conductors/Bloc1View';
import { Bloc2View } from './modules/b2_simbologia/Bloc2View';
import { Bloc3View } from './modules/b3_llei_dohm/Bloc3View';
import { Bloc4View } from './modules/b4_codi_colors/Bloc4View';
import { MultimeterLabApp } from './modules/b5_multimetre/MultimeterLabApp';
import { User, X, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<ModuleId>('dashboard');
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
  const [showStudentModal, setShowStudentModal] = useState<boolean>(false);

  // Temporary inputs in modal
  const [modalName, setModalName] = useState<string>(studentName);
  const [modalGroup, setModalGroup] = useState<string>(studentGroup);

  const handleSaveStudentInfo = (name: string, group: string) => {
    setStudentName(name);
    setStudentGroup(group);
    localStorage.setItem('electricitat_student_name', name);
    localStorage.setItem('electricitat_student_group', group);
  };

  const handleModalSave = (e: React.FormEvent) => {
    e.preventDefault();
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

  // Auto-scroll to top when switching modules
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentModule]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Header Navigation */}
      <HeaderNav
        currentModule={currentModule}
        onSelectModule={setCurrentModule}
        studentName={studentName}
        studentGroup={studentGroup}
        onEditStudent={() => {
          setModalName(studentName);
          setModalGroup(studentGroup);
          setShowStudentModal(true);
        }}
        completedBlocks={completedBlocks}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        {currentModule === 'dashboard' && (
          <Dashboard
            onSelectModule={setCurrentModule}
            studentName={studentName}
            studentGroup={studentGroup}
            onSaveStudentInfo={handleSaveStudentInfo}
            completedBlocks={completedBlocks}
          />
        )}

        {(currentModule === 'b1-conductors' || currentModule === 'b1-transformacions') && (
          <Bloc1View
            onComplete={() => markBlockCompleted(1)}
            onNext={() => {
              markBlockCompleted(1);
              setCurrentModule('b2-simbologia');
            }}
          />
        )}

        {(currentModule === 'b2-simbologia' || currentModule === 'b2-circuits') && (
          <Bloc2View
            onComplete={() => markBlockCompleted(2)}
            onNext={() => {
              markBlockCompleted(2);
              setCurrentModule('b3-llei-dohm');
            }}
          />
        )}

        {(currentModule === 'b3-llei-dohm' || currentModule === 'b3-unitats') && (
          <Bloc3View
            onComplete={() => markBlockCompleted(3)}
            onNext={() => {
              markBlockCompleted(3);
              setCurrentModule('b4-codi-colors');
            }}
          />
        )}

        {currentModule === 'b4-codi-colors' && (
          <Bloc4View
            onComplete={() => markBlockCompleted(4)}
            onNext={() => {
              markBlockCompleted(4);
              setCurrentModule('b5-laboratori-multimetre');
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
            ⚡ <strong>Càpsula Didàctica d'Electricitat (3 Hores)</strong> • Creat per a l'ensenyament tecnològic interactiu.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentModule('dashboard')}
              className="text-slate-400 hover:text-white transition"
            >
              Ruta d'aprenentatge
            </button>
            <button
              onClick={() => {
                if (confirm('Vols reiniciar el progrés desat dels blocs?')) {
                  setCompletedBlocks([]);
                  localStorage.removeItem('electricitat_completed_blocks');
                }
              }}
              className="text-slate-500 hover:text-red-400 transition"
            >
              Reiniciar Progrés
            </button>
          </div>
        </div>
      </footer>

      {/* Student Profile Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-3xl p-6 md:p-8 max-w-md w-full border border-slate-700 shadow-2xl relative text-white">
            <button
              onClick={() => setShowStudentModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center">
                <User size={22} />
              </div>
              <div>
                <h3 className="text-xl font-black">Dades de l'Alumne/a</h3>
                <p className="text-xs text-slate-400">Personalitza el teu informe de qualificació</p>
              </div>
            </div>

            <form onSubmit={handleModalSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Nom i Cognoms:</label>
                <input
                  type="text"
                  value={modalName}
                  onChange={(e) => setModalName(e.target.value)}
                  placeholder="Ex: Maria Garcia Rovira"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Grup / Classe:</label>
                <input
                  type="text"
                  value={modalGroup}
                  onChange={(e) => setModalGroup(e.target.value)}
                  placeholder="Ex: 3r ESO B"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowStudentModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel·lar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition"
                >
                  Guardar Dades
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
