import React from 'react';
import {
  Layers,
  Eye,
  EyeOff,
  Sliders,
  CheckSquare,
  Square,
  Maximize2
} from 'lucide-react';
import type { OrganSystemId } from '../types/anatomy';
import { ORGAN_SYSTEM_INFO } from '../data/anatomyOntology';

interface SystemDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSystems: Record<OrganSystemId, boolean>;
  onToggleSystem: (sys: OrganSystemId) => void;
  onSetAllSystems: (active: boolean) => void;
  systemOpacities: Record<OrganSystemId, number>;
  onChangeOpacity: (sys: OrganSystemId, opacity: number) => void;
  explosionFactor: number;
  onChangeExplosionFactor: (f: number) => void;
}

export const SystemDrawer: React.FC<SystemDrawerProps> = ({
  isOpen,
  onClose,
  activeSystems,
  onToggleSystem,
  onSetAllSystems,
  systemOpacities,
  onChangeOpacity,
  explosionFactor,
  onChangeExplosionFactor,
}) => {
  if (!isOpen) return null;

  const systemList = Object.keys(ORGAN_SYSTEM_INFO) as OrganSystemId[];

  return (
    <aside className="absolute top-14 left-4 z-20 w-80 max-h-[calc(100vh-5rem)] bg-slate-950/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-xs select-none">
      {/* Drawer Header */}
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold">
          <Layers className="w-4 h-4 text-sky-400" />
          <span>11 Organ Systems & Layers</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-white p-1 rounded-md text-sm"
        >
          ✕
        </button>
      </div>

      {/* Global Quick Action Toggles */}
      <div className="px-3.5 py-2.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between">
        <button
          onClick={() => onSetAllSystems(true)}
          className="flex items-center gap-1.5 text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800/70 border border-slate-700/60"
        >
          <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>Show All</span>
        </button>
        <button
          onClick={() => onSetAllSystems(false)}
          className="flex items-center gap-1.5 text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800/70 border border-slate-700/60"
        >
          <Square className="w-3.5 h-3.5 text-rose-400" />
          <span>Hide All</span>
        </button>
      </div>

      {/* Mode 2: X-Ray All-Parts Explosion Slider */}
      <div className="p-3.5 border-b border-slate-800/80 bg-sky-950/20">
        <div className="flex items-center justify-between text-slate-300 font-semibold mb-1.5">
          <span className="flex items-center gap-1.5 text-sky-300">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>3D Spatial Explosion Factor</span>
          </span>
          <span className="font-mono text-[11px] text-sky-400">
            {(explosionFactor * 100).toFixed(0)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="0.05"
          value={explosionFactor}
          onChange={(e) => onChangeExplosionFactor(parseFloat(e.target.value))}
          className="w-full accent-sky-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>Collapsed (0%)</span>
          <span>Anatomical Dispersal (200%)</span>
        </div>
      </div>

      {/* 11 Systems List */}
      <div className="p-3 space-y-2.5 overflow-y-auto max-h-[calc(100vh-16rem)]">
        {systemList.map((sysId) => {
          const info = ORGAN_SYSTEM_INFO[sysId];
          const isActive = activeSystems[sysId];
          const opacity = systemOpacities[sysId] ?? 1.0;

          return (
            <div
              key={sysId}
              className={`p-2 rounded-xl border transition-all ${
                isActive
                  ? 'bg-slate-900/80 border-slate-700'
                  : 'bg-slate-950/40 border-slate-800/50 opacity-60'
              }`}
            >
              {/* Header: Name, Badge, Toggle */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleSystem(sysId)}
                    className="p-1 rounded text-slate-400 hover:text-white"
                  >
                    {isActive ? (
                      <Eye className="w-3.5 h-3.5 text-sky-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </button>
                  <div>
                    <span
                      style={{ color: info.color }}
                      className="font-bold text-xs block leading-tight"
                    >
                      {info.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {info.badge}
                    </span>
                  </div>
                </div>

                {/* Quick Isolate Button */}
                <button
                  onClick={() => {
                    systemList.forEach((s) => {
                      if (s === sysId) {
                        if (!activeSystems[s]) onToggleSystem(s);
                      } else {
                        if (activeSystems[s]) onToggleSystem(s);
                      }
                    });
                  }}
                  className="text-[10px] text-slate-400 hover:text-sky-300 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono"
                  title="Isolate this system"
                >
                  Isolate
                </button>
              </div>

              {/* Opacity Slider */}
              {isActive && (
                <div className="pt-1.5 border-t border-slate-800/60 flex items-center gap-2">
                  <Sliders className="w-3 h-3 text-slate-500 shrink-0" />
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={opacity}
                    onChange={(e) => onChangeOpacity(sysId, parseFloat(e.target.value))}
                    className="w-full accent-sky-400 bg-slate-800 h-1 rounded cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
                    {(opacity * 100).toFixed(0)}%
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
