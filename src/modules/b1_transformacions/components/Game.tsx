import React, { useState, useEffect } from 'react';
import { getRandomQuestions } from '../services/questionService';
import { Question, GameState } from '../types';
import { CheckCircle, XCircle, RefreshCw, Trophy, ArrowRight, Loader2 } from 'lucide-react';

const Game: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    currentQuestionIndex: 0,
    isGameOver: false,
    streak: 0,
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    loadGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadGame = async () => {
    setLoading(true);
    setGameState({ score: 0, currentQuestionIndex: 0, isGameOver: false, streak: 0 });
    setSelectedOption(null);
    setIsCorrect(null);
    
    // Use the local service to get questions
    const qs = await getRandomQuestions(10);
    setQuestions(qs);
    setLoading(false);
  };

  const handleAnswer = (option: string) => {
    if (selectedOption) return; // Prevent double checking

    const currentQuestion = questions[gameState.currentQuestionIndex];
    const correct = option === currentQuestion.correctType;

    setSelectedOption(option);
    setIsCorrect(correct);

    if (correct) {
      setGameState(prev => ({
        ...prev,
        score: prev.score + 100 + (prev.streak * 10),
        streak: prev.streak + 1
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        streak: 0
      }));
    }
  };

  const nextQuestion = () => {
    if (gameState.currentQuestionIndex + 1 >= questions.length) {
      setGameState(prev => ({ ...prev, isGameOver: true }));
    } else {
      setGameState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
      setSelectedOption(null);
      setIsCorrect(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
        <p className="text-slate-600 font-medium">Preparant el qüestionari...</p>
      </div>
    );
  }

  if (gameState.isGameOver) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden text-center p-8 animate-fade-in mt-10">
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-100 p-4 rounded-full">
            <Trophy size={64} className="text-yellow-500" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Joc Acabat!</h2>
        <p className="text-slate-500 mb-6">Has demostrat ser un expert en energia.</p>
        
        <div className="bg-indigo-50 rounded-xl p-6 mb-8">
          <p className="text-sm text-indigo-600 uppercase tracking-wide font-bold">Puntuació Final</p>
          <p className="text-5xl font-black text-indigo-700">{gameState.score}</p>
        </div>

        <button 
          onClick={loadGame}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw size={20} /> Jugar de nou
        </button>
      </div>
    );
  }

  const currentQuestion = questions[gameState.currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto p-4 animate-fade-in">
      {/* Header Stat Bar */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase">Pregunta</span>
          <p className="text-xl font-bold text-slate-700">{gameState.currentQuestionIndex + 1} <span className="text-slate-400 text-sm">/ {questions.length}</span></p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-400 uppercase">Punts</span>
          <p className="text-xl font-bold text-indigo-600">{gameState.score}</p>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-200 mb-6 text-stone-800">
        <div className="flex flex-col md:flex-row bg-slate-900 text-white overflow-hidden">
          {/* Real Device Image */}
          {currentQuestion.imageUrl && (
            <div className="md:w-5/12 h-48 md:h-auto min-h-[190px] relative bg-stone-800 shrink-0 overflow-hidden">
              <img
                src={currentQuestion.imageUrl}
                alt={currentQuestion.objectName}
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:hidden" />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-amber-300 border border-white/10">
                Aparell Real
              </div>
            </div>
          )}

          {/* Device Name & Description */}
          <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              Pregunta d'observació
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mb-2 text-white">
              {currentQuestion.objectName}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {currentQuestion.description}
            </p>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <p className="text-stone-700 font-bold mb-4 text-sm sm:text-base flex items-center gap-2">
            <span>⚡</span>
            Quin tipus de transformació energètica realitza principalment?
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrectOption = option === currentQuestion.correctType;
              
              let btnClass = "p-4 rounded-2xl border-2 text-left font-semibold transition-all text-xs sm:text-sm ";
              
              if (selectedOption) {
                if (isSelected && isCorrectOption) {
                  btnClass += "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm";
                } else if (isSelected && !isCorrectOption) {
                  btnClass += "bg-red-50 border-red-500 text-red-800";
                } else if (!isSelected && isCorrectOption) {
                  btnClass += "bg-emerald-50 border-emerald-500 text-emerald-800 opacity-80";
                } else {
                  btnClass += "bg-stone-50 border-stone-200 text-stone-400 opacity-50";
                }
              } else {
                btnClass += "bg-white border-stone-200 hover:border-amber-400 hover:bg-amber-50/50 text-stone-700 hover:shadow-md cursor-pointer";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selectedOption}
                  className={btnClass}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Feedback Section */}
        {selectedOption && (
          <div className={`p-6 border-t ${isCorrect ? 'bg-emerald-50/80 border-emerald-100' : 'bg-red-50/80 border-red-100'} animate-fade-in`}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle className="text-emerald-600 shrink-0 mt-1" size={24} />
              ) : (
                <XCircle className="text-red-600 shrink-0 mt-1" size={24} />
              )}
              <div>
                <h4 className={`font-bold text-lg ${isCorrect ? 'text-emerald-900' : 'text-red-900'}`}>
                  {isCorrect ? 'Correcte! Molt ben observat!' : 'Incorrecte! Fixa\'t en el funcionament:'}
                </h4>
                <p className="text-stone-700 mt-1 mb-4 leading-relaxed text-sm">
                  {currentQuestion.explanation}
                </p>
                <button
                  onClick={nextQuestion}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white transition-transform active:scale-95 shadow-md cursor-pointer text-sm ${
                    isCorrect ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Següent pregunta <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;