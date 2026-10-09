import React from 'react';
import { Game } from './components/Game';
import { Theory } from './components/Theory';
import { Sparkles, Gamepad2 } from 'lucide-react';

const ConductorsApp: React.FC = () => {
  return (
    <div className="w-full space-y-8 text-stone-800">
      {/* 1. Theory Section */}
      <div>
        <Theory />
      </div>

      {/* 2. Interactive Practice Section directly below */}
      <div className="space-y-4">
        <div className="border-t border-stone-200 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center">
              <Gamepad2 size={18} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-900">
                Simulador de Circuit: ElectroConnecta
              </h3>
              <p className="text-xs text-stone-500">
                Posa a prova el que acabes de llegir: connecta diferents materials per tancar el circuit i encendre la bombeta!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-4 md:p-6 shadow-xl border border-slate-800">
          <Game />
        </div>
      </div>
    </div>
  );
};

export default ConductorsApp;
