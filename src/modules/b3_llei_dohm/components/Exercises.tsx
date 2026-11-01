import React, { useState, useEffect, useCallback } from 'react';
import { Variable, Exercise } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';

const round = (num: number) => Math.round(num * 100) / 100;

const generateExercises = (): Exercise[] => {
  const exercises: Exercise[] = [];
  for (let i = 0; i < 5; i++) {
    const solveFor = Object.values(Variable)[i % 3];
    let voltage: number | null = null;
    let current: number | null = null;
    let resistance: number | null = null;

    // Generate clean integer or .5 values so calculations are friendly for ESO students
    const cleanCurrents = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6];
    const cleanResistances = [2, 4, 5, 6, 8, 10, 12, 15, 20, 25, 50, 100];
    const c = cleanCurrents[Math.floor(Math.random() * cleanCurrents.length)];
    const r = cleanResistances[Math.floor(Math.random() * cleanResistances.length)];
    const v = round(c * r);

    if (solveFor === Variable.Voltage) {
      current = c;
      resistance = r;
    } else if (solveFor === Variable.Current) {
      voltage = v;
      resistance = r;
    } else {
      voltage = v;
      current = c;
    }
    exercises.push({ id: i, voltage, current, resistance, solveFor });
  }
  return exercises;
};

const translateVariable = (variable: Variable): string => {
  switch (variable) {
    case Variable.Voltage:
      return 'Tensió (V)';
    case Variable.Current:
      return 'Intensitat de corrent (I)';
    case Variable.Resistance:
      return 'Resistència (R)';
    default:
      return '';
  }
};

interface ExercisesProps {
  onSuccess?: () => void;
}

export const Exercises: React.FC<ExercisesProps> = ({ onSuccess }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<
    Record<number, { correct: boolean; correctAnswer: number } | null>
  >({});

  const createNewExercises = useCallback(() => {
    setExercises(generateExercises());
    setUserAnswers({});
    setResults({});
  }, []);

  useEffect(() => {
    createNewExercises();
  }, [createNewExercises]);

  const handleAnswerChange = (id: number, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const checkAnswers = () => {
    const newResults: Record<number, { correct: boolean; correctAnswer: number }> = {};
    let correctCount = 0;

    exercises.forEach((ex) => {
      let correctAnswer = 0;
      if (ex.solveFor === Variable.Voltage) {
        correctAnswer = ex.current! * ex.resistance!;
      } else if (ex.solveFor === Variable.Current) {
        correctAnswer = ex.voltage! / ex.resistance!;
      } else {
        correctAnswer = ex.voltage! / ex.current!;
      }
      const userAnswer = parseFloat((userAnswers[ex.id] || '').replace(',', '.'));
      const roundedCorrect = round(correctAnswer);
      const isRight = !isNaN(userAnswer) && Math.abs(userAnswer - roundedCorrect) <= 0.05;
      if (isRight) correctCount++;

      newResults[ex.id] = {
        correct: isRight,
        correctAnswer: roundedCorrect,
      };
    });

    setResults(newResults);
    if (correctCount >= 3 && onSuccess) {
      onSuccess();
    }
  };

  const getUnit = (variable: Variable) => {
    if (variable === Variable.Voltage) return 'V';
    if (variable === Variable.Current) return 'A';
    return 'Ω';
  };

  const formatGivenVariables = (ex: Exercise) => {
    const parts: string[] = [];
    if (ex.voltage !== null) parts.push(`una tensió de ${ex.voltage} V`);
    if (ex.current !== null) parts.push(`un corrent de ${ex.current} A`);
    if (ex.resistance !== null) parts.push(`una resistència de ${ex.resistance} Ω`);
    return parts.join(' i ');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <p className="text-stone-600 text-sm">
          Calcula el valor que falta en cada circuit (mínim <strong>3 de 5 encerts</strong> per desbloquejar el següent bloc).
        </p>
        <button
          onClick={createNewExercises}
          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl border border-stone-200 transition cursor-pointer"
        >
          Nous Exercicis
        </button>
      </div>

      <div className="space-y-4">
        {exercises.map((ex, index) => (
          <div
            key={ex.id}
            className={`p-4 rounded-2xl border transition-all ${
              results[ex.id]
                ? results[ex.id]?.correct
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-red-50 border-red-300'
                : 'bg-stone-50/70 border-stone-200'
            }`}
          >
            <div className="grid md:grid-cols-4 gap-4 items-center">
              <p className="md:col-span-3 text-stone-700 text-sm">
                <strong>{index + 1}.</strong> Si un circuit té {formatGivenVariables(ex)}, quin és el valor de la{' '}
                <strong>{translateVariable(ex.solveFor)}</strong>?
              </p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Resposta"
                  value={userAnswers[ex.id] || ''}
                  onChange={(e) => handleAnswerChange(ex.id, e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-stone-900 placeholder-stone-400"
                />
                <span className="font-bold text-stone-700 text-sm">{getUnit(ex.solveFor)}</span>
                {results[ex.id] && (results[ex.id]?.correct ? <CheckCircleIcon /> : <XCircleIcon />)}
              </div>
            </div>
            {results[ex.id] && !results[ex.id]?.correct && (
              <p className="text-red-700 text-xs mt-2 font-medium">
                La resposta correcta és: <strong>{results[ex.id]?.correctAnswer} {getUnit(ex.solveFor)}</strong>
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={checkAnswers}
          className="px-8 py-3 bg-amber-500 text-white font-bold text-sm rounded-xl shadow-md hover:bg-amber-600 transition cursor-pointer"
        >
          Comprovar Respostes
        </button>
      </div>
    </div>
  );
};
