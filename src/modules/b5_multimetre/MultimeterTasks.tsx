import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Award, Printer, RotateCcw, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MultimeterTasksProps {
  studentName: string;
  studentGroup: string;
  onJumpToBoard: (board: 'resistors' | 'series' | 'ohm-challenge') => void;
}

interface QuestionState {
  answered: boolean;
  isCorrect: boolean;
  userAnswer: string;
}

export const MultimeterTasks: React.FC<MultimeterTasksProps> = ({
  studentName,
  studentGroup,
  onJumpToBoard
}) => {
  // Autosave persistence in localStorage
  const savedTasks = (() => {
    try {
      const raw = localStorage.getItem('electricitat_multimeter_tasks');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  // State for the 6 tasks
  const [q1, setQ1] = useState<string>(savedTasks?.q1 || '');
  const [q1Res, setQ1Res] = useState<QuestionState>(savedTasks?.q1Res || { answered: false, isCorrect: false, userAnswer: '' });

  const [q2, setQ2] = useState<string>(savedTasks?.q2 || '');
  const [q2Res, setQ2Res] = useState<QuestionState>(savedTasks?.q2Res || { answered: false, isCorrect: false, userAnswer: '' });

  const [q3, setQ3] = useState<string>(savedTasks?.q3 || '');
  const [q3Res, setQ3Res] = useState<QuestionState>(savedTasks?.q3Res || { answered: false, isCorrect: false, userAnswer: '' });

  const [q4V1, setQ4V1] = useState<string>(savedTasks?.q4V1 || '');
  const [q4V2, setQ4V2] = useState<string>(savedTasks?.q4V2 || '');
  const [q4Sum, setQ4Sum] = useState<string>(savedTasks?.q4Sum || '');
  const [q4Res, setQ4Res] = useState<QuestionState>(savedTasks?.q4Res || { answered: false, isCorrect: false, userAnswer: '' });

  const [q5, setQ5] = useState<string>(savedTasks?.q5 || '');
  const [q5Res, setQ5Res] = useState<QuestionState>(savedTasks?.q5Res || { answered: false, isCorrect: false, userAnswer: '' });

  const [q6, setQ6] = useState<string>(savedTasks?.q6 || '');
  const [q6Res, setQ6Res] = useState<QuestionState>(savedTasks?.q6Res || { answered: false, isCorrect: false, userAnswer: '' });

  // Autosave effect
  useEffect(() => {
    const dataToSave = {
      q1, q1Res,
      q2, q2Res,
      q3, q3Res,
      q4V1, q4V2, q4Sum, q4Res,
      q5, q5Res,
      q6, q6Res
    };
    localStorage.setItem('electricitat_multimeter_tasks', JSON.stringify(dataToSave));
  }, [q1, q1Res, q2, q2Res, q3, q3Res, q4V1, q4V2, q4Sum, q4Res, q5, q5Res, q6, q6Res]);

  // Evaluation functions
  const checkQ1 = () => {
    const val = parseFloat(q1.replace(',', '.'));
    // R1 is ~219 ohms (nominal 220, tolerance +-5%)
    const correct = !isNaN(val) && val >= 210 && val <= 230;
    setQ1Res({ answered: true, isCorrect: correct, userAnswer: q1 });
    if (correct) triggerConfetti();
  };

  const checkQ2 = () => {
    const correct = q2 === 'overload';
    setQ2Res({ answered: true, isCorrect: correct, userAnswer: q2 });
    if (correct) triggerConfetti();
  };

  const checkQ3 = () => {
    const val = parseFloat(q3.replace(',', '.'));
    // Battery is ~9.0V
    const correct = !isNaN(val) && val >= 8.8 && val <= 9.3;
    setQ3Res({ answered: true, isCorrect: correct, userAnswer: q3 });
    if (correct) triggerConfetti();
  };

  const checkQ4 = () => {
    const v1 = parseFloat(q4V1.replace(',', '.'));
    const v2 = parseFloat(q4V2.replace(',', '.'));
    const sum = parseFloat(q4Sum.replace(',', '.'));

    const v1Ok = !isNaN(v1) && v1 >= 2.1 && v1 <= 2.3; // 2.2V
    const v2Ok = !isNaN(v2) && v2 >= 6.7 && v2 <= 6.9; // 6.8V
    const sumOk = !isNaN(sum) && sum >= 8.9 && sum <= 9.1; // 9.0V

    const correct = v1Ok && v2Ok && sumOk;
    setQ4Res({ answered: true, isCorrect: correct, userAnswer: `V1: ${q4V1}V, V2: ${q4V2}V, Total: ${q4Sum}V` });
    if (correct) triggerConfetti();
  };

  const checkQ5 = () => {
    const val = parseFloat(q5.replace(',', '.'));
    // I = V/R = 2.2 / 220 = 0.01 A or 10 mA
    const correct = !isNaN(val) && (Math.abs(val - 10) < 1 || Math.abs(val - 0.01) < 0.002);
    setQ5Res({ answered: true, isCorrect: correct, userAnswer: q5 });
    if (correct) triggerConfetti();
  };

  const checkQ6 = () => {
    const val = parseFloat(q6.replace(',', '.'));
    // Rx = V / I = 12 / 0.040 = 300 ohms
    const correct = !isNaN(val) && val >= 290 && val <= 310;
    setQ6Res({ answered: true, isCorrect: correct, userAnswer: q6 });
    if (correct) triggerConfetti();
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const answeredList = [q1Res, q2Res, q3Res, q4Res, q5Res, q6Res];
  const totalCorrect = answeredList.filter(q => q.answered && q.isCorrect).length;
  const grade = ((totalCorrect / 6) * 10).toFixed(1);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl text-slate-800 print:shadow-none print:border-none print:p-0">
      {/* Official Printable Report Header (Print only) */}
      <div className="hidden print:block border-b-2 border-stone-800 pb-3 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-black text-stone-900 tracking-tight uppercase">
              Informe de Pràctiques: Laboratori d'Electricitat
            </h1>
            <p className="text-xs text-stone-600 mt-0.5">
              Departament de Tecnologia • Mesures i Càlculs amb Multímetre Digital
            </p>
          </div>
          <div className="text-right text-xs bg-stone-50 p-2.5 rounded-lg border border-stone-300 min-w-[200px]">
            <div><strong>Alumne/a:</strong> {studentName || 'Sense especificar'}</div>
            <div><strong>Grup:</strong> {studentGroup || 'General'}</div>
            <div className="font-bold text-stone-900 mt-1 border-t border-stone-200 pt-1">
              Qualificació: <span className="text-sm font-black text-amber-700">{grade}</span> / 10 ({totalCorrect} / 6 tasques)
            </div>
          </div>
        </div>
      </div>

      {/* Task Header (Interactive only) */}
      <div className="border-b border-slate-200 pb-5 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
            Bloc 7 de 7: Avaluació Pràctica Final
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            Quadern de Pràctiques: Mesures i Càlculs amb Multímetre
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Utilitza el multímetre virtual per prendre les lectures reals i realitzar els càlculs segons la Llei d'Ohm.
          </p>
        </div>

        {/* Student info badge */}
        <div className="bg-slate-100 p-3 rounded-2xl border border-slate-300 text-xs">
          <div><strong className="text-slate-900">Alumne/a:</strong> {studentName || 'Sense especificar'}</div>
          <div><strong className="text-slate-900">Grup:</strong> {studentGroup || 'General'}</div>
          <div className="mt-1 font-bold text-amber-700">
            Puntuació actual: <span className="text-base text-amber-900 font-extrabold">{totalCorrect} / 6</span> ({grade}/10)
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-6 print:space-y-3">
        {/* TASK 1 */}
        <div className={`p-5 rounded-2xl border-2 transition print:p-3 print:rounded-xl print:border print:border-stone-300 print:bg-white print:break-inside-avoid ${q1Res.answered ? (q1Res.isCorrect ? 'border-emerald-400 bg-emerald-50/50' : 'border-red-300 bg-red-50/50') : 'border-slate-200 bg-slate-50'}`}>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center print:bg-black">1</span>
              <h3 className="font-bold text-slate-900 text-base print:text-sm">
                Mesura de la Resistència R1 amb l'Ohímetre
              </h3>
            </div>
            <button
              onClick={() => onJumpToBoard('resistors')}
              className="text-xs text-amber-600 hover:text-amber-700 font-bold underline print:hidden"
            >
              Ves al Banc de Resistències
            </button>
          </div>
          <p className="text-sm text-slate-600 mb-3 print:text-xs print:mb-2">
            Connecta les dues puntes del multímetre als extrems de la <strong>Resistència R1</strong> (vermell-vermell-marró) i posa el selector en una escala adequada de resistència (com <strong>2kΩ</strong> o <strong>20kΩ</strong>). Quin valor en Ohms (Ω) marca?
          </p>

          <div className="flex flex-wrap items-center gap-3 print:gap-2">
            <input
              type="text"
              placeholder="Ex: 219"
              value={q1}
              onChange={(e) => setQ1(e.target.value)}
              className="px-4 py-2 border rounded-xl font-mono text-sm w-40 focus:ring-2 focus:ring-amber-500 outline-none print:hidden"
            />
            <span className="hidden print:inline-block font-mono font-bold text-xs bg-stone-100 px-2.5 py-1 rounded border border-stone-300">
              Resposta: {q1 ? `${q1} Ω` : 'Sense resposta'}
            </span>
            <span className="text-sm font-bold text-slate-700 print:hidden">Ω</span>
            <button
              onClick={checkQ1}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition print:hidden"
            >
              Comprova
            </button>
            {q1Res.answered && (
              <span className={`text-xs font-bold flex items-center gap-1 print:text-[11px] ${q1Res.isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
                {q1Res.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                {q1Res.isCorrect ? 'Correcte! R1 té un valor nominal de 220 Ω (amb tolerància).' : 'Revisa el valor: connecta vermella i negra als extrems de R1 i tria l\'escala de 2kΩ.'}
              </span>
            )}
          </div>
        </div>

        {/* TASK 2 */}
        <div className={`p-5 rounded-2xl border-2 transition print:p-3 print:rounded-xl print:border print:border-stone-300 print:bg-white print:break-inside-avoid ${q2Res.answered ? (q2Res.isCorrect ? 'border-emerald-400 bg-emerald-50/50' : 'border-red-300 bg-red-50/50') : 'border-slate-200 bg-slate-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center print:bg-black">2</span>
            <h3 className="font-bold text-slate-900 text-base print:text-sm">
              Interpretació de Sobrecàrrega d'Escala (Overload)
            </h3>
          </div>
          <p className="text-sm text-slate-600 mb-3 print:text-xs print:mb-2">
            Intenta mesurar la <strong>Resistència R2</strong> (1.000 Ω = 1 kΩ) col·locant el selector a l'escala de <strong>200Ω</strong>. Què passa a la pantalla del multímetre?
          </p>

          <div className="space-y-2 mb-3 text-sm print:space-y-1 print:text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="q2"
                value="zero"
                checked={q2 === 'zero'}
                onChange={() => setQ2('zero')}
                className="text-amber-600"
              />
              <span>Marca 0.0 Ω perquè és massa gran.</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-medium">
              <input
                type="radio"
                name="q2"
                value="overload"
                checked={q2 === 'overload'}
                onChange={() => setQ2('overload')}
                className="text-amber-600"
              />
              <span>Apareix <strong>"1 ."</strong> (fora de rang / sobrecàrrega), indicant que cal triar una escala superior (com 2kΩ).</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="q2"
                value="burnt"
                checked={q2 === 'burnt'}
                onChange={() => setQ2('burnt')}
                className="text-amber-600"
              />
              <span>Es crema el multímetre immediatament.</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={checkQ2}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition print:hidden"
            >
              Comprova
            </button>
            {q2Res.answered && (
              <span className={`text-xs font-bold flex items-center gap-1 print:text-[11px] ${q2Res.isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
                {q2Res.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                {q2Res.isCorrect ? 'Exacte! El símbol "1 ." en un tester digital significa que el valor supera l\'escala seleccionada.' : 'Incorrecte. Prova-ho tu mateix al multímetre posant el selector a 200Ω sobre R2.'}
              </span>
            )}
          </div>
        </div>

        {/* TASK 3 */}
        <div className={`p-5 rounded-2xl border-2 transition print:p-3 print:rounded-xl print:border print:border-stone-300 print:bg-white print:break-inside-avoid ${q3Res.answered ? (q3Res.isCorrect ? 'border-emerald-400 bg-emerald-50/50' : 'border-red-300 bg-red-50/50') : 'border-slate-200 bg-slate-50'}`}>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center print:bg-black">3</span>
              <h3 className="font-bold text-slate-900 text-base print:text-sm">
                Mesura de la Tensió de la Pila (Volts DC)
              </h3>
            </div>
            <button
              onClick={() => onJumpToBoard('series')}
              className="text-xs text-amber-600 hover:text-amber-700 font-bold underline print:hidden"
            >
              Ves al Circuit Sèrie 9V
            </button>
          </div>
          <p className="text-sm text-slate-600 mb-3 print:text-xs print:mb-2">
            Canvia el selector a <strong>DCV 20V</strong>. Connecta la punta vermella al <strong>Born (+)</strong> i la negra al <strong>Born (-)</strong> de la pila. Quin voltatge mesura el voltímetre?
          </p>

          <div className="flex flex-wrap items-center gap-3 print:gap-2">
            <input
              type="text"
              placeholder="Ex: 9.00"
              value={q3}
              onChange={(e) => setQ3(e.target.value)}
              className="px-4 py-2 border rounded-xl font-mono text-sm w-40 focus:ring-2 focus:ring-amber-500 outline-none print:hidden"
            />
            <span className="hidden print:inline-block font-mono font-bold text-xs bg-stone-100 px-2.5 py-1 rounded border border-stone-300">
              Resposta: {q3 ? `${q3} V` : 'Sense resposta'}
            </span>
            <span className="text-sm font-bold text-slate-700 print:hidden">V</span>
            <button
              onClick={checkQ3}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition print:hidden"
            >
              Comprova
            </button>
            {q3Res.answered && (
              <span className={`text-xs font-bold flex items-center gap-1 print:text-[11px] ${q3Res.isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
                {q3Res.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                {q3Res.isCorrect ? 'Molt bé! La pila proporciona una diferència de potencial de 9.0 V.' : 'Revisa la mesura: posa la punta vermella al + i negra al - amb escala 20V DCV.'}
              </span>
            )}
          </div>
        </div>

        {/* TASK 4 */}
        <div className={`p-5 rounded-2xl border-2 transition print:p-3 print:rounded-xl print:border print:border-stone-300 print:bg-white print:break-inside-avoid ${q4Res.answered ? (q4Res.isCorrect ? 'border-emerald-400 bg-emerald-50/50' : 'border-red-300 bg-red-50/50') : 'border-slate-200 bg-slate-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center print:bg-black">4</span>
            <h3 className="font-bold text-slate-900 text-base print:text-sm">
              Caiguda de Tensió en un Circuit Sèrie (Llei de Tensions)
            </h3>
          </div>
          <p className="text-sm text-slate-600 mb-3 print:text-xs print:mb-2">
            Amb l'interruptor tancat, mesura el voltatge als extrems de R1 (V1) i als extrems de R2 (V2). Després calcula la suma V1 + V2:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 print:gap-2 print:mb-2">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Tensió a R1 (V1):</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ex: 2.20"
                  value={q4V1}
                  onChange={(e) => setQ4V1(e.target.value)}
                  className="px-3 py-1.5 border rounded-lg font-mono text-sm w-full focus:ring-2 focus:ring-amber-500 outline-none print:hidden"
                />
                <span className="hidden print:inline-block font-mono font-bold text-xs bg-stone-100 px-2 py-0.5 rounded border border-stone-300 w-full">
                  {q4V1 ? `${q4V1} V` : '___ V'}
                </span>
                <span className="text-xs font-bold print:hidden">V</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Tensió a R2 (V2):</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ex: 6.80"
                  value={q4V2}
                  onChange={(e) => setQ4V2(e.target.value)}
                  className="px-3 py-1.5 border rounded-lg font-mono text-sm w-full focus:ring-2 focus:ring-amber-500 outline-none print:hidden"
                />
                <span className="hidden print:inline-block font-mono font-bold text-xs bg-stone-100 px-2 py-0.5 rounded border border-stone-300 w-full">
                  {q4V2 ? `${q4V2} V` : '___ V'}
                </span>
                <span className="text-xs font-bold print:hidden">V</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Suma Total (V1 + V2):</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ex: 9.00"
                  value={q4Sum}
                  onChange={(e) => setQ4Sum(e.target.value)}
                  className="px-3 py-1.5 border rounded-lg font-mono text-sm w-full focus:ring-2 focus:ring-amber-500 outline-none print:hidden"
                />
                <span className="hidden print:inline-block font-mono font-bold text-xs bg-stone-100 px-2 py-0.5 rounded border border-stone-300 w-full">
                  {q4Sum ? `${q4Sum} V` : '___ V'}
                </span>
                <span className="text-xs font-bold print:hidden">V</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={checkQ4}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition print:hidden"
            >
              Comprova les caigudes de tensió
            </button>
            {q4Res.answered && (
              <span className={`text-xs font-bold flex items-center gap-1 print:text-[11px] ${q4Res.isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
                {q4Res.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                {q4Res.isCorrect ? 'Fantàstic! En un circuit sèrie la tensió total és la suma de les caigudes de tensió parcials (2.2V + 6.8V = 9.0V).' : 'Revisa: V1 cau ~2.2V i V2 cau ~6.8V. La suma ha de donar 9.0V.'}
              </span>
            )}
          </div>
        </div>

        {/* TASK 5 */}
        <div className={`p-5 rounded-2xl border-2 transition print:p-3 print:rounded-xl print:border print:border-stone-300 print:bg-white print:break-inside-avoid ${q5Res.answered ? (q5Res.isCorrect ? 'border-emerald-400 bg-emerald-50/50' : 'border-red-300 bg-red-50/50') : 'border-slate-200 bg-slate-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center print:bg-black">5</span>
            <h3 className="font-bold text-slate-900 text-base print:text-sm">
              Càlcul d'Intensitat amb la Llei d'Ohm (I = V / R)
            </h3>
          </div>
          <p className="text-sm text-slate-600 mb-3 print:text-xs print:mb-2">
            Hem mesurat que la tensió que cau a R1 és <strong>V1 = 2,20 V</strong> i sabem que la resistència és <strong>R1 = 220 Ω</strong>. Aplica la fórmula de la Llei d'Ohm (<strong>I = V / R</strong>) per calcular quants <strong>mil·liamperes (mA)</strong> circulen pel circuit:
          </p>

          <div className="flex flex-wrap items-center gap-3 print:gap-2">
            <input
              type="text"
              placeholder="Ex: 10"
              value={q5}
              onChange={(e) => setQ5(e.target.value)}
              className="px-4 py-2 border rounded-xl font-mono text-sm w-40 focus:ring-2 focus:ring-amber-500 outline-none print:hidden"
            />
            <span className="hidden print:inline-block font-mono font-bold text-xs bg-stone-100 px-2.5 py-1 rounded border border-stone-300">
              Resposta: {q5 ? `${q5} mA` : 'Sense resposta'}
            </span>
            <span className="text-sm font-bold text-slate-700 print:hidden">mA</span>
            <button
              onClick={checkQ5}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition print:hidden"
            >
              Comprova Càlcul
            </button>
            {q5Res.answered && (
              <span className={`text-xs font-bold flex items-center gap-1 print:text-[11px] ${q5Res.isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
                {q5Res.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                {q5Res.isCorrect ? 'Excel·lent! 2.2V / 220Ω = 0.010 A = 10 mA.' : 'Pista: 2.2 / 220 = 0.01 A. Multiplica per 1000 per passar a mA (10 mA).'}
              </span>
            )}
          </div>
        </div>

        {/* TASK 6 */}
        <div className={`p-5 rounded-2xl border-2 transition print:p-3 print:rounded-xl print:border print:border-stone-300 print:bg-white print:break-inside-avoid ${q6Res.answered ? (q6Res.isCorrect ? 'border-emerald-400 bg-emerald-50/50' : 'border-red-300 bg-red-50/50') : 'border-slate-200 bg-slate-50'}`}>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center print:bg-black">6</span>
              <h3 className="font-bold text-slate-900 text-base print:text-sm">
                Repte de Laboratori: Deducció de la Resistència Incògnita Rx
              </h3>
            </div>
            <button
              onClick={() => onJumpToBoard('ohm-challenge')}
              className="text-xs text-amber-600 hover:text-amber-700 font-bold underline print:hidden"
            >
              Ves al Repte Llei d'Ohm
            </button>
          </div>
          <p className="text-sm text-slate-600 mb-3 print:text-xs print:mb-2">
            Ves al <strong>Banc 3 (Repte Llei d'Ohm)</strong>. Mesura amb el multímetre la tensió <strong>Vx</strong> a la resistència desconeguda Rx. L'amperímetre del banc indica que circulen <strong>I = 40 mA = 0,040 A</strong>. Aplica la Llei d'Ohm (<strong>R = V / I</strong>) i descobreix el valor de <strong>Rx</strong> en Ohms (Ω):
          </p>

          <div className="flex flex-wrap items-center gap-3 print:gap-2">
            <input
              type="text"
              placeholder="Ex: 300"
              value={q6}
              onChange={(e) => setQ6(e.target.value)}
              className="px-4 py-2 border rounded-xl font-mono text-sm w-40 focus:ring-2 focus:ring-amber-500 outline-none print:hidden"
            />
            <span className="hidden print:inline-block font-mono font-bold text-xs bg-stone-100 px-2.5 py-1 rounded border border-stone-300">
              Resposta: {q6 ? `${q6} Ω` : 'Sense resposta'}
            </span>
            <span className="text-sm font-bold text-slate-700 print:hidden">Ω</span>
            <button
              onClick={checkQ6}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition print:hidden"
            >
              Deduir Rx
            </button>
            {q6Res.answered && (
              <span className={`text-xs font-bold flex items-center gap-1 print:text-[11px] ${q6Res.isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
                {q6Res.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                {q6Res.isCorrect ? 'MOLT FELICITATS! Has deduït que Rx = 12V / 0.040A = 300 Ω!' : 'Pista: La tensió és 12V i el corrent 0.040A. Fes 12 / 0.040.'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Final Evaluation & Certificate */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200 print:mt-4 print:p-4 print:bg-stone-50 print:border-stone-300 print:rounded-xl print:break-inside-avoid">
        <div>
          <div className="flex items-center gap-2">
            <Award className="text-amber-600 print:text-black" size={28} />
            <h4 className="text-lg font-black text-slate-900 print:text-sm">Informe Final de la Tasca</h4>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Has completat les preguntes de laboratori. La teva qualificació final és de <strong>{grade} sobre 10</strong>.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg transition cursor-pointer print:hidden"
        >
          <Printer size={18} />
          Imprimir / Guardar en PDF
        </button>
      </div>

      {/* Signature space for print only */}
      <div className="hidden print:grid grid-cols-2 gap-8 mt-6 pt-4 border-t border-dashed border-stone-300 text-xs text-stone-600">
        <div>
          <p className="font-semibold text-stone-800">Signatura de l'Alumne/a:</p>
          <div className="h-12 border-b border-stone-400 mt-2"></div>
        </div>
        <div>
          <p className="font-semibold text-stone-800">Vist-i-plau del Professorat / Valoració:</p>
          <div className="h-12 border-b border-stone-400 mt-2"></div>
        </div>
      </div>
    </div>
  );
};
