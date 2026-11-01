import React, { useState, useEffect } from 'react';
import { ModuleId } from './types';
import { HeaderNav } from './components/HeaderNav';
import { LoginScreen } from './components/LoginScreen';
import { Bloc1TheoryView } from './modules/b1_conductors/Bloc1TheoryView';
import { Bloc2ConductorsView } from './modules/b1_conductors/Bloc2ConductorsView';
import { Bloc3TransformationsView } from './modules/b1_transformacions/Bloc3TransformationsView';
import { Bloc4CircuitsView } from './modules/b2_simbologia/Bloc4CircuitsView';
import { Bloc5OhmView } from './modules/b3_llei_dohm/Bloc5OhmView';
import { Bloc6ResistorsView } from './modules/b4_codi_colors/Bloc6ResistorsView';
import { MultimeterLabApp } from './modules/b5_multimetre/MultimeterLabApp';

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

  // Sequential unlock computation (1 to 7)
  const unlockedBlocks = React.useMemo(() => {
    if (!isRegistered) return [];
    const unlocked = [1];
    if (completedBlocks.includes(1)) unlocked.push(2);
    if (completedBlocks.includes(2)) unlocked.push(3);
    if (completedBlocks.includes(3)) unlocked.push(4);
    if (completedBlocks.includes(4)) unlocked.push(5);
    if (completedBlocks.includes(5)) unlocked.push(6);
    if (completedBlocks.includes(6)) unlocked.push(7);
    return unlocked;
  }, [isRegistered, completedBlocks]);

  const [currentModule, setCurrentModule] = useState<ModuleId>(() => {
    const saved = localStorage.getItem('electricitat_current_module') as ModuleId | null;
    if (!saved || saved === 'dashboard') return 'b1-teoria-atom';
    return saved;
  });

  const [showStudentModal, setShowStudentModal] = useState<boolean>(false);

  const handleSaveStudentInfo = (name: string, group: string) => {
    setStudentName(name);
    setStudentGroup(group);
    localStorage.setItem('electricitat_student_name', name);
    localStorage.setItem('electricitat_student_group', group);
  };

  const handleSelectModule = (id: ModuleId) => {
    let targetBlocNum = 0;
    if (id === 'b1-teoria-atom') targetBlocNum = 1;
    else if (id === 'b2-simulador-conductors') targetBlocNum = 2;
    else if (id === 'b3-transformacions') targetBlocNum = 3;
    else if (id === 'b4-simbologia-circuits') targetBlocNum = 4;
    else if (id === 'b5-llei-dohm') targetBlocNum = 5;
    else if (id === 'b6-codi-colors') targetBlocNum = 6;
    else if (id === 'b7-multimetre') targetBlocNum = 7;

    if (targetBlocNum > 0) {
      if (!isRegistered) {
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

  const markBlockCompleted = (blocNum: number) => {
    if (!completedBlocks.includes(blocNum)) {
      const updated = [...completedBlocks, blocNum];
      setCompletedBlocks(updated);
      localStorage.setItem('electricitat_completed_blocks', JSON.stringify(updated));
    }
  };

  // If user is on a locked block, fall back to highest available or bloc 1
  useEffect(() => {
    if (isRegistered) {
      let blocNum = 1;
      if (currentModule === 'b1-teoria-atom') blocNum = 1;
      else if (currentModule === 'b2-simulador-conductors') blocNum = 2;
      else if (currentModule === 'b3-transformacions') blocNum = 3;
      else if (currentModule === 'b4-simbologia-circuits') blocNum = 4;
      else if (currentModule === 'b5-llei-dohm') blocNum = 5;
      else if (currentModule === 'b6-codi-colors') blocNum = 6;
      else if (currentModule === 'b7-multimetre') blocNum = 7;
      else blocNum = 1;

      if (!unlockedBlocks.includes(blocNum)) {
        // Fall back to highest unlocked block
        const highestUnlocked = Math.max(...unlockedBlocks, 1);
        const mapModule: Record<number, ModuleId> = {
          1: 'b1-teoria-atom',
          2: 'b2-simulador-conductors',
          3: 'b3-transformacions',
          4: 'b4-simbologia-circuits',
          5: 'b5-llei-dohm',
          6: 'b6-codi-colors',
          7: 'b7-multimetre',
        };
        const target = mapModule[highestUnlocked] || 'b1-teoria-atom';
        setCurrentModule(target);
        localStorage.setItem('electricitat_current_module', target);
      }
    }
  }, [isRegistered, unlockedBlocks, currentModule]);

  // Scroll to top when switching modules
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentModule]);

  // If student hasn't logged in, show the dedicated login screen
  if (!isRegistered) {
    return (
      <LoginScreen
        initialName={studentName}
        initialGroup={studentGroup}
        onLogin={(fullName, group) => {
          handleSaveStudentInfo(fullName, group);
          setCurrentModule('b1-teoria-atom');
          localStorage.setItem('electricitat_current_module', 'b1-teoria-atom');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-800 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-900">
      {/* Top Header Navigation */}
      <HeaderNav
        currentModule={currentModule}
        onSelectModule={handleSelectModule}
        studentName={studentName}
        studentGroup={studentGroup}
        onEditStudent={() => setShowStudentModal(true)}
        completedBlocks={completedBlocks}
        unlockedBlocks={unlockedBlocks}
        isRegistered={isRegistered}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {currentModule === 'b1-teoria-atom' && (
          <Bloc1TheoryView
            onComplete={() => markBlockCompleted(1)}
            onNext={() => {
              markBlockCompleted(1);
              handleSelectModule('b2-simulador-conductors');
            }}
          />
        )}

        {currentModule === 'b2-simulador-conductors' && (
          <Bloc2ConductorsView
            onComplete={() => markBlockCompleted(2)}
            onNext={() => {
              markBlockCompleted(2);
              handleSelectModule('b3-transformacions');
            }}
            onPrev={() => handleSelectModule('b1-teoria-atom')}
          />
        )}

        {currentModule === 'b3-transformacions' && (
          <Bloc3TransformationsView
            onComplete={() => markBlockCompleted(3)}
            onNext={() => {
              markBlockCompleted(3);
              handleSelectModule('b4-simbologia-circuits');
            }}
            onPrev={() => handleSelectModule('b2-simulador-conductors')}
          />
        )}

        {currentModule === 'b4-simbologia-circuits' && (
          <Bloc4CircuitsView
            onComplete={() => markBlockCompleted(4)}
            onNext={() => {
              markBlockCompleted(4);
              handleSelectModule('b5-llei-dohm');
            }}
            onPrev={() => handleSelectModule('b3-transformacions')}
          />
        )}

        {currentModule === 'b5-llei-dohm' && (
          <Bloc5OhmView
            onComplete={() => markBlockCompleted(5)}
            onNext={() => {
              markBlockCompleted(5);
              handleSelectModule('b6-codi-colors');
            }}
            onPrev={() => handleSelectModule('b4-simbologia-circuits')}
          />
        )}

        {currentModule === 'b6-codi-colors' && (
          <Bloc6ResistorsView
            onComplete={() => markBlockCompleted(6)}
            onNext={() => {
              markBlockCompleted(6);
              handleSelectModule('b7-multimetre');
            }}
            onPrev={() => handleSelectModule('b5-llei-dohm')}
          />
        )}

        {currentModule === 'b7-multimetre' && (
          <MultimeterLabApp
            studentName={studentName}
            studentGroup={studentGroup}
            onPrev={() => handleSelectModule('b6-codi-colors')}
          />
        )}
      </main>

      {/* Clean, light footer */}
      <footer className="bg-white border-t border-stone-200 py-4 text-center text-xs text-stone-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>
            ⚡ <strong>Càpsula Didàctica d'Electricitat</strong> • Guia d'aprenentatge seqüencial amb autosave.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowStudentModal(true)}
              className="text-stone-600 hover:text-stone-900 transition font-medium cursor-pointer"
            >
              Canviar d'Alumne/a ({studentName || 'Sense nom'})
            </button>
            <span className="text-stone-300">|</span>
            <button
              onClick={() => {
                if (confirm('Vols reiniciar el progrés desat de tots els blocs? Aquesta acció tornarà a bloquejar els blocs avançats.')) {
                  setCompletedBlocks([]);
                  localStorage.removeItem('electricitat_completed_blocks');
                  setCurrentModule('b1-teoria-atom');
                  localStorage.setItem('electricitat_current_module', 'b1-teoria-atom');
                }
              }}
              className="text-stone-400 hover:text-red-600 transition cursor-pointer"
            >
              Reiniciar Progrés
            </button>
          </div>
        </div>
      </footer>

      {/* Student Edit Modal */}
      {showStudentModal && (
        <LoginScreen
          isModal={true}
          initialName={studentName}
          initialGroup={studentGroup}
          onCancel={() => setShowStudentModal(false)}
          onLogin={(fullName, group) => {
            handleSaveStudentInfo(fullName, group);
            setShowStudentModal(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
