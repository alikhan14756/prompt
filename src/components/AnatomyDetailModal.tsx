import React from 'react';
import {
  Volume2,
  Activity,
  AlertTriangle,
  Compass,
  X
} from 'lucide-react';
import type { AnatomicalStructure } from '../types/anatomy';
import { speakTaxonomy } from '../utils/speech';

interface AnatomyDetailModalProps {
  structure: AnatomicalStructure | null;
  onClose: () => void;
  onFocusStructure: (s: AnatomicalStructure) => void;
}

export const AnatomyDetailModal: React.FC<AnatomyDetailModalProps> = ({
  structure,
  onClose,
  onFocusStructure,
}) => {
  if (!structure) return null;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-11/12 max-w-xl bg-slate-950/95 border border-sky-500/40 rounded-2xl shadow-2xl backdrop-blur-2xl p-4 text-xs select-none">
      {/* Header Bar */}
      <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-sky-400 font-mono tracking-wider uppercase bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/50">
              {structure.system} {structure.subsystem ? `› ${structure.subsystem}` : ''}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              LOD {structure.lod}
            </span>
          </div>
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <span>{structure.name}</span>
            <button
              onClick={() => speakTaxonomy(structure.audioPronunciationText)}
              title="Play Latin Pronunciation"
              className="p-1 rounded bg-sky-900/40 hover:bg-sky-800 text-sky-300 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </h2>
          <p className="text-xs text-sky-300 font-serif italic mt-0.5">
            {structure.latinName}{' '}
            <span className="text-[10px] text-slate-400 font-mono not-italic ml-1">
              [TA ID: {structure.taId}]
            </span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-md text-sm hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Body */}
      <div className="mt-3 space-y-2.5 text-slate-300">
        <p className="leading-relaxed text-slate-200">
          {structure.description}
        </p>

        {/* Live Action Badge & Continuous Phases */}
        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] mb-1.5">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>LIVE KINEMATIC & FUNCTIONAL PHASES</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {structure.actionPhases.map((phase, idx) => (
              <span
                key={idx}
                className="bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono"
              >
                {phase}
              </span>
            ))}
          </div>
        </div>

        {/* Clinical Significance / Pathology Note */}
        <div className="bg-amber-950/20 border border-amber-800/40 p-2.5 rounded-xl flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-[11px] font-bold text-amber-300 mb-0.5">
              Clinical & Pathophysiological Correlation:
            </div>
            <div className="text-[11px] text-slate-300 leading-snug">
              {structure.clinicalSignificance}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[10px] text-slate-500 font-mono">
          Spatial Coords: [{structure.position.map(n => n.toFixed(2)).join(', ')}]
        </span>
        <button
          onClick={() => onFocusStructure(structure)}
          className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs px-3 py-1 rounded-lg transition-colors shadow-md shadow-sky-600/30"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Spotlight & Zoom 3D</span>
        </button>
      </div>
    </div>
  );
};
