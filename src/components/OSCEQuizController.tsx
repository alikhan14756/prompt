import React from 'react';
import {
  GraduationCap,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OSCEQuizControllerProps {
  isActive: boolean;
  score: number;
  totalQuestions: number;
  onResetQuiz: () => void;
  onExitExamMode: () => void;
}

export const OSCEQuizController: React.FC<OSCEQuizControllerProps> = ({
  isActive,
  score,
  totalQuestions,
  onResetQuiz,
  onExitExamMode,
}) => {
  if (!isActive) return null;

  const isCompleted = score === totalQuestions && totalQuestions > 0;

  const handleCelebrate = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  if (isCompleted) {
    handleCelebrate();
  }

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-slate-950/95 border border-amber-500/50 rounded-2xl shadow-2xl backdrop-blur-2xl px-5 py-3 flex items-center gap-6 select-none">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-xs text-white uppercase tracking-wider">
              OSCE / Practical Medical Spotter Exam
            </h3>
            <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-1.5 py-0.5 rounded font-mono">
              Mode 5 Active
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Pin names are masked as [ ? ]. Click pins or solve cards in the 3D viewport.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 pl-4 border-l border-slate-800">
        <div className="text-center">
          <div className="text-[10px] text-slate-400 font-mono">Exam Score</div>
          <div className="text-sm font-mono font-bold text-amber-400">
            {score} / {totalQuestions}
          </div>
        </div>

        <button
          onClick={onResetQuiz}
          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Exam</span>
        </button>

        <button
          onClick={onExitExamMode}
          className="text-xs text-slate-400 hover:text-rose-400 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-rose-900/50 transition-colors"
        >
          Exit Mode
        </button>
      </div>
    </div>
  );
};
