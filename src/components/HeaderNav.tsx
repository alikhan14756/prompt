import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Layers,
  Activity,
  Maximize2,
  GraduationCap,
  Play,
  Pause
} from 'lucide-react';
import type { AnatomicalStructure, NamingMode } from '../types/anatomy';

interface HeaderNavProps {
  structures: AnatomicalStructure[];
  selectedStructure: AnatomicalStructure | null;
  onSelectStructure: (s: AnatomicalStructure | null) => void;
  namingMode: NamingMode;
  onSetNamingMode: (mode: NamingMode) => void;
  timeScale: number;
  onSetTimeScale: (scale: number) => void;
  onToggleSystemDrawer: () => void;
  onToggleBiomechanicsHUD: () => void;
  isSystemDrawerOpen: boolean;
  isBiomechanicsOpen: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  structures,
  onSelectStructure,
  namingMode,
  onSetNamingMode,
  timeScale,
  onSetTimeScale,
  onToggleSystemDrawer,
  onToggleBiomechanicsHUD,
  isSystemDrawerOpen,
  isBiomechanicsOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [previousScale, setPreviousScale] = useState(1.0);

  const filteredStructures = searchQuery.trim()
    ? structures.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.latinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.taId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.system.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handlePauseToggle = () => {
    if (isPaused) {
      onSetTimeScale(previousScale || 1.0);
      setIsPaused(false);
    } else {
      setPreviousScale(timeScale);
      onSetTimeScale(0);
      setIsPaused(true);
    }
  };

  return (
    <header className="relative z-30 w-full bg-slate-950/90 border-b border-sky-900/40 backdrop-blur-xl px-4 py-2 flex items-center justify-between gap-4 select-none">
      {/* Brand & Omni-Atlas Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-sky-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/20 ring-1 ring-sky-300/40">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-white text-base tracking-wide flex items-center gap-1.5">
              <span>HoloAnatomy 3D</span>
              <span className="text-[10px] text-sky-400 bg-sky-950/80 border border-sky-600/40 px-1.5 py-0.5 rounded font-mono font-normal">
                OMNI-ATLAS
              </span>
            </h1>
          </div>
          <p className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
            <span>TA98 / TA2 Universal Nomenclature</span>
            <span>•</span>
            <span className="text-emerald-400">60 FPS Bio-Kinematics</span>
          </p>
        </div>
      </div>

      {/* Central 5 Naming Modes Switcher */}
      <div className="hidden lg:flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800 shadow-inner">
        <button
          onClick={() => onSetNamingMode('auto-lod')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            namingMode === 'auto-lod'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Auto-LOD</span>
        </button>

        <button
          onClick={() => onSetNamingMode('exploded')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            namingMode === 'exploded'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>X-Ray Explode</span>
        </button>

        <button
          onClick={() => onSetNamingMode('flow')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            namingMode === 'flow'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Physio Flows</span>
        </button>

        <button
          onClick={() => onSetNamingMode('spotlight')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            namingMode === 'spotlight'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Spotlight 3D</span>
        </button>

        <button
          onClick={() => onSetNamingMode('osce')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            namingMode === 'osce'
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
              : 'text-amber-400/80 hover:text-amber-300'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>OSCE Practical Exam</span>
        </button>
      </div>

      {/* Instant Search Bar (<200ms spotlight search) */}
      <div className="relative w-64 md:w-80">
        <div className="flex items-center bg-slate-900/90 border border-slate-700/80 rounded-lg px-2.5 py-1.5 focus-within:border-sky-400 transition-colors">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search 15,000+ terms or Latin..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearching(true);
            }}
            onFocus={() => setIsSearching(true)}
            className="bg-transparent border-none outline-none text-xs text-white placeholder-slate-500 w-full"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-500 hover:text-slate-300 text-xs px-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Instant Search Dropdown */}
        {isSearching && filteredStructures.length > 0 && (
          <div className="absolute top-full mt-1.5 left-0 w-full max-h-72 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-y-auto z-50">
            {filteredStructures.map(s => (
              <div
                key={s.id}
                onClick={() => {
                  onSelectStructure(s);
                  setIsSearching(false);
                  onSetNamingMode('spotlight');
                }}
                className="px-3 py-2 border-b border-slate-800 hover:bg-sky-950/60 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-white">{s.name}</span>
                  <span className="text-[10px] text-sky-400 font-mono">{s.taId}</span>
                </div>
                <div className="text-[10px] text-slate-400 italic flex items-center justify-between">
                  <span>{s.latinName}</span>
                  <span className="capitalize text-slate-500 font-sans">{s.system}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Global Time-Scale Kinematic Controls */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={handlePauseToggle}
            className="p-1 text-slate-300 hover:text-white transition-colors mr-1.5"
            title={isPaused ? 'Resume Simulation' : 'Pause Simulation'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-sky-400" />}
          </button>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            {[0.25, 0.5, 1.0, 2.0].map(speed => (
              <button
                key={speed}
                onClick={() => {
                  onSetTimeScale(speed);
                  setIsPaused(false);
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                  !isPaused && timeScale === speed
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold'
                    : 'hover:text-slate-200'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Drawer Toggles */}
        <button
          onClick={onToggleSystemDrawer}
          className={`p-2 rounded-lg border transition-all ${
            isSystemDrawerOpen
              ? 'bg-sky-600/30 border-sky-400 text-sky-300'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
          }`}
          title="Toggle 11 Organ Systems & Layers"
        >
          <Layers className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleBiomechanicsHUD}
          className={`p-2 rounded-lg border transition-all ${
            isBiomechanicsOpen
              ? 'bg-sky-600/30 border-sky-400 text-sky-300'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
          }`}
          title="Toggle Biomechanics & Homeostasis Telemetry HUD"
        >
          <Activity className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
