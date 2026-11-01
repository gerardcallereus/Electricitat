import React, { useState } from 'react';
import { Zap, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { CLASS_GROUPS } from '../types';

interface LoginScreenProps {
  initialName?: string;
  initialGroup?: string;
  onLogin: (fullName: string, group: string) => void;
  onCancel?: () => void;
  isModal?: boolean;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  initialName = '',
  initialGroup = '',
  onLogin,
  onCancel,
  isModal = false,
}) => {
  // Parse initialName into firstName and lastName if possible
  const parts = initialName.trim().split(' ');
  const defaultFirst = parts[0] || '';
  const defaultLast = parts.slice(1).join(' ') || '';

  const [firstName, setFirstName] = useState(defaultFirst);
  const [lastName, setLastName] = useState(defaultLast);
  const [group, setGroup] = useState(initialGroup || '1r A');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFirst = firstName.trim();
    const cleanLast = lastName.trim();

    if (!cleanFirst) {
      setError('Si us plau, introdueix el teu nom.');
      return;
    }
    if (!cleanLast) {
      setError('Si us plau, introdueix els teus cognoms.');
      return;
    }
    if (!group) {
      setError('Si us plau, selecciona el teu grup classe.');
      return;
    }

    const fullName = `${cleanFirst} ${cleanLast}`;
    onLogin(fullName, group);
  };

  const cardContent = (
    <div className="w-full max-w-md bg-white border border-stone-200 shadow-2xl rounded-3xl p-6 sm:p-8 text-stone-800 animate-fade-in max-h-[92vh] overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-amber-500 text-white font-bold flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Zap size={30} className="fill-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
          IDENTIFICACIÓ DE L'ALUMNE/A
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
          Càpsula d'Electricitat · Tecnologia
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Nom */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Nom de l'alumne/a: <span className="text-amber-600">*</span>
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Ex: Maria"
            required
            autoComplete="given-name"
            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        {/* Cognoms */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Cognoms: <span className="text-amber-600">*</span>
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Ex: Garcia Puig"
            required
            autoComplete="family-name"
            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        {/* Grup Dropdown - Very space-efficient for Chromebooks */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Grup: <span className="text-amber-600">*</span>
          </label>
          <select
            value={group}
            onChange={(e) => {
              setGroup(e.target.value);
              if (error) setError(null);
            }}
            required
            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition cursor-pointer"
          >
            {CLASS_GROUPS.map((grp) => (
              <option key={grp} value={grp}>
                Grup {grp}
              </option>
            ))}
            <option value="Altre grup">Altre grup</option>
          </select>
        </div>

        {/* Instructions / Info Box */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-950 leading-relaxed font-medium">
          ℹ️ Aquestes dades s'utilitzaran per desar el teu progrés automàticament i generar el teu <strong>informe oficial de pràctiques</strong> al laboratori del multímetre.
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-3">
          {isModal && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 transition"
            >
              Cancel·lar
            </button>
          )}

          <button
            type="submit"
            className="flex-1 py-3 px-5 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-bold rounded-xl text-sm shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>{isModal ? 'Actualitzar Dades' : 'Començar Càpsula'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
        {cardContent}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-3 sm:p-4 font-sans selection:bg-amber-200 selection:text-stone-900">
      {cardContent}
    </div>
  );
};
