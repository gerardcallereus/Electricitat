import React from 'react';
import { Zap, Shield } from 'lucide-react';

export const Theory: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center border-b pb-4">
        Què és la Conductivitat Elèctrica?
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 text-white rounded-lg">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-blue-800">Materials Conductors</h3>
          </div>
          <p className="text-slate-700 leading-relaxed">
            Són materials que <strong>deixen passar</strong> el corrent elèctric fàcilment a través d'ells. 
            Això passa perquè els seus àtoms tenen electrons lliures que es poden moure.
          </p>
          <ul className="mt-4 space-y-2 text-sm font-semibold text-blue-700">
            <li className="flex items-center gap-2">🔹 La majoria de metalls (Coure, Ferro, Or)</li>
            <li className="flex items-center gap-2">🔹 L'aigua amb sal</li>
            <li className="flex items-center gap-2">🔹 El grafit (mines de llapis)</li>
          </ul>
        </div>

        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-500 text-white rounded-lg">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold text-red-800">Materials Aïllants</h3>
          </div>
          <p className="text-slate-700 leading-relaxed">
            Són materials que <strong>NO deixen passar</strong> el corrent elèctric. 
            Els electrons estan fortament units als àtoms i no es poden moure. S'utilitzen per protegir-nos de l'electricitat.
          </p>
          <ul className="mt-4 space-y-2 text-sm font-semibold text-red-700">
            <li className="flex items-center gap-2">🔸 Plàstic i Goma</li>
            <li className="flex items-center gap-2">🔸 Fusta seca</li>
            <li className="flex items-center gap-2">🔸 Vidre i Ceràmica</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
