import React, { useMemo } from 'react';
import { Volume2, HelpCircle, CheckCircle } from 'lucide-react';
import type { AnatomicalStructure, NamingMode } from '../types/anatomy';
import { speakTaxonomy } from '../utils/speech';

export interface LabelPinItem {
  id: string;
  structure: AnatomicalStructure;
  x: number;
  y: number;
  distance: number;
  visible: boolean;
}

interface SpatialLabelOverlayProps {
  pins: LabelPinItem[];
  selectedStructure: AnatomicalStructure | null;
  onSelectStructure: (s: AnatomicalStructure) => void;
  namingMode: NamingMode;
  examAnswers: Record<string, boolean>; // structureId -> answered
  onAnswerExam: (structureId: string, answer: string) => void;
}

export const SpatialLabelOverlay: React.FC<SpatialLabelOverlayProps> = ({
  pins,
  selectedStructure,
  onSelectStructure,
  namingMode,
  examAnswers,
  onAnswerExam,
}) => {
  // Screen-space radial layout algorithm to prevent overlapping cards
  const positionedPins = useMemo(() => {
    if (!pins || pins.length === 0) return [];

    const width = window.innerWidth;
    const height = window.innerHeight;
    const cx = width / 2;
    const cy = height / 2;

    return pins.map((pin) => {
      // Calculate angle from center of viewport
      const dx = pin.x - cx;
      const dy = pin.y - cy;
      const angle = Math.atan2(dy, dx);

      // Offset distance for the callout card (140px radial push)
      const offsetDist = 130;
      let cardX = pin.x + Math.cos(angle) * offsetDist;
      let cardY = pin.y + Math.sin(angle) * offsetDist;

      // Keep within screen margins
      cardX = Math.max(160, Math.min(width - 240, cardX));
      cardY = Math.max(100, Math.min(height - 120, cardY));

      return {
        ...pin,
        cardX,
        cardY,
      };
    });
  }, [pins]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* SVG Leader Lines Canvas */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {positionedPins.map(pin => {
          if (!pin.visible) return null;
          const isSelected = selectedStructure?.id === pin.id;
          const strokeColor = isSelected ? '#38bdf8' : '#0284c7';

          // Elbow joint for surgical CAD aesthetics
          const midX = (pin.x + pin.cardX) / 2;

          return (
            <g key={`line-${pin.id}`}>
              {/* Leader-line path with elbow */}
              <path
                d={`M ${pin.x} ${pin.y} L ${midX} ${pin.y} L ${pin.cardX} ${pin.cardY}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={isSelected ? '2' : '1.2'}
                strokeDasharray={isSelected ? 'none' : '3, 2'}
                opacity={0.85}
                filter="url(#glow)"
              />
              {/* Anchor Pin Ring at 3D Vertex */}
              <circle
                cx={pin.x}
                cy={pin.y}
                r="4"
                fill="#38bdf8"
                stroke="#0f172a"
                strokeWidth="1.5"
              />
              {/* Callout Card Anchor Ring */}
              <circle
                cx={pin.cardX}
                cy={pin.cardY}
                r="2.5"
                fill="#38bdf8"
              />
            </g>
          );
        })}
      </svg>

      {/* 2D Projected Dynamic Callout Cards */}
      {positionedPins.map(pin => {
        if (!pin.visible) return null;
        const isSelected = selectedStructure?.id === pin.id;
        const isAnswered = examAnswers[pin.id];
        const isOsceMode = namingMode === 'osce';

        return (
          <div
            key={`card-${pin.id}`}
            style={{
              transform: `translate(${pin.cardX}px, ${pin.cardY}px) translate(-50%, -50%)`,
            }}
            className={`absolute pointer-events-auto transition-all duration-200 select-none ${
              isSelected ? 'scale-105 z-30' : 'z-20 hover:scale-102'
            }`}
          >
            <div
              onClick={() => onSelectStructure(pin.structure)}
              className={`rounded-lg px-3 py-2 text-xs shadow-2xl backdrop-blur-md border cursor-pointer max-w-xs ${
                isSelected
                  ? 'bg-slate-900/95 border-sky-400 text-sky-100 shadow-sky-500/30'
                  : 'bg-slate-950/85 border-slate-700/80 text-slate-200 hover:border-sky-500/50'
              }`}
            >
              {/* Breadcrumb Hierarchy */}
              <div className="flex items-center justify-between text-[10px] text-sky-400 font-mono tracking-wider uppercase mb-1">
                <span>{pin.structure.system} {pin.structure.subsystem ? `› ${pin.structure.subsystem}` : ''}</span>
                <span className="text-slate-400 bg-slate-800/80 px-1 py-0.5 rounded text-[9px]">LOD {pin.structure.lod}</span>
              </div>

              {/* OSCE Practical Spotter Mode vs Normal Display */}
              {isOsceMode && !isAnswered ? (
                <div className="py-1">
                  <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
                    <HelpCircle className="w-4 h-4 animate-bounce" />
                    <span>Identification [ ? ]</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mb-2">
                    {pin.structure.examQuestion?.question || 'Identify this highlighted anatomical structure:'}
                  </div>
                  {pin.structure.examQuestion ? (
                    <div className="flex flex-col gap-1">
                      {pin.structure.examQuestion.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            onAnswerExam(pin.id, opt);
                          }}
                          className="text-left px-2 py-1 bg-slate-800/90 hover:bg-sky-600/80 rounded border border-slate-700 text-[10px] text-white transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAnswerExam(pin.id, pin.structure.name);
                      }}
                      className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-500/40 rounded text-[10px] w-full"
                    >
                      Reveal Structure Name
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {/* Standard Display: English & Latin Name */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-white leading-tight">
                        {pin.structure.name}
                      </h4>
                      <p className="text-[11px] text-sky-300 italic font-serif flex items-center gap-1 mt-0.5">
                        <span>{pin.structure.latinName}</span>
                        <span className="text-[9px] text-slate-400 font-mono not-italic">
                          [{pin.structure.taId}]
                        </span>
                      </p>
                    </div>

                    {/* Audio Pronunciation Button */}
                    <button
                      title="Audio Pronunciation (Latin TA98)"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakTaxonomy(pin.structure.audioPronunciationText);
                      }}
                      className="p-1 text-slate-400 hover:text-sky-300 hover:bg-sky-950/60 rounded transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Live Dynamic Action Badge */}
                  <div className="mt-1.5 pt-1.5 border-t border-slate-800 flex items-center justify-between gap-1">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-1.5 py-0.5 rounded truncate max-w-[200px]">
                      ● {pin.structure.actionBadge}
                    </span>
                    {isOsceMode && isAnswered && (
                      <span className="text-[10px] text-green-400 flex items-center gap-0.5">
                        <CheckCircle className="w-3 h-3" /> Solved
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
