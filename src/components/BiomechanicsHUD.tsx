import React, { useEffect, useRef } from 'react';
import {
  Activity,
  Heart,
  Droplets,
  RotateCcw,
  Scissors,
  UserCheck
} from 'lucide-react';
import type { ClinicalPosture, HomeostaticState } from '../types/anatomy';

interface BiomechanicsHUDProps {
  isOpen: boolean;
  onClose: () => void;
  homeostasis: HomeostaticState;
  onUpdateHomeostasis: (key: keyof HomeostaticState, value: number) => void;
  onResetHomeostasis: () => void;
  clippingPlane: 'none' | 'sagittal' | 'coronal' | 'transverse';
  onSetClippingPlane: (plane: 'none' | 'sagittal' | 'coronal' | 'transverse') => void;
  clippingOffset: number;
  onSetClippingOffset: (offset: number) => void;
  clinicalPosture: ClinicalPosture;
  onSetClinicalPosture: (p: ClinicalPosture) => void;
  kinematicMetrics: {
    cardiacPhase: number;
    respiratoryPhase: number;
    ecgValue: number;
    bpValue: number;
    gfrLive: number;
  };
}

export const BiomechanicsHUD: React.FC<BiomechanicsHUDProps> = ({
  isOpen,
  onClose,
  homeostasis,
  onUpdateHomeostasis,
  onResetHomeostasis,
  clippingPlane,
  onSetClippingPlane,
  clippingOffset,
  onSetClippingOffset,
  clinicalPosture,
  onSetClinicalPosture,
  kinematicMetrics,
}) => {
  const ecgCanvasRef = useRef<HTMLCanvasElement>(null);
  const ecgHistoryRef = useRef<number[]>([]);

  // Draw continuous scrolling ECG strip
  useEffect(() => {
    const canvas = ecgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Push new point
    ecgHistoryRef.current.push(kinematicMetrics.ecgValue);
    if (ecgHistoryRef.current.length > canvas.width) {
      ecgHistoryRef.current.shift();
    }

    // Render ECG sweep
    ctx.fillStyle = '#050a14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    ctx.strokeStyle = '#0f243a';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 15) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 15) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // ECG Signal line
    ctx.beginPath();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 6;

    const midY = canvas.height / 2;
    ecgHistoryRef.current.forEach((val, i) => {
      const y = midY - val * 24;
      if (i === 0) ctx.moveTo(i, y);
      else ctx.lineTo(i, y);
    });
    ctx.stroke();
    ctx.shadowBlur = 0;
  }, [kinematicMetrics.ecgValue]);

  if (!isOpen) return null;

  return (
    <aside className="absolute top-14 right-4 z-20 w-84 max-h-[calc(100vh-5rem)] bg-slate-950/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-xs select-none">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Telemetry & Homeostasis Matrix</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-white p-1 rounded-md text-sm"
        >
          ✕
        </button>
      </div>

      <div className="p-3.5 space-y-4 overflow-y-auto max-h-[calc(100vh-10rem)]">
        {/* Real-Time Live Lead II ECG Strip */}
        <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 animate-pulse text-red-500" />
              <span>LEAD II ECG / WIGGERS CYCLE</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {kinematicMetrics.bpValue.toFixed(0)} mmHg
            </span>
          </div>
          <canvas
            ref={ecgCanvasRef}
            width={280}
            height={60}
            className="w-full rounded border border-slate-800 bg-[#050a14]"
          />
          <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 font-mono">
            <span>P-Wave: Atrial Systole</span>
            <span className="text-emerald-300">QRS: Ventricular Depol</span>
            <span>T: Repol</span>
          </div>
        </div>

        {/* Real-time Physiological Live Indicators */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-slate-900/80 border border-slate-800 p-2 rounded-xl">
            <div className="text-[10px] text-slate-400">Glomerular Filtration</div>
            <div className="font-mono text-sm font-bold text-amber-400 mt-0.5">
              {kinematicMetrics.gfrLive.toFixed(0)} mL/min
            </div>
            <div className="text-[9px] text-slate-500">180 L/day Ultrafiltrate</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-2 rounded-xl">
            <div className="text-[10px] text-slate-400">Thoracic Boyle Press</div>
            <div className="font-mono text-sm font-bold text-cyan-400 mt-0.5">
              {kinematicMetrics.respiratoryPhase < 0.5 ? '759 mmHg (-1)' : '761 mmHg (+1)'}
            </div>
            <div className="text-[9px] text-slate-500">
              {kinematicMetrics.respiratoryPhase < 0.5 ? 'Active Inspiration' : 'Elastic Recoil'}
            </div>
          </div>
        </div>

        {/* 6-Axis Master Homeostasis Control Matrix */}
        <div className="space-y-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-[11px] flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              <span>Master Homeostasis Feedback</span>
            </span>
            <button
              onClick={onResetHomeostasis}
              className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700"
              title="Reset to 36.8°C, 93 mmHg, pH 7.4"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* 1. Core Temperature */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-300">Core Temp (36.8°C Setpoint)</span>
              <span className={`font-mono font-bold ${
                homeostasis.coreTemperature > 37.8 ? 'text-red-400' : homeostasis.coreTemperature < 36.1 ? 'text-blue-400' : 'text-emerald-400'
              }`}>
                {homeostasis.coreTemperature.toFixed(1)} °C
              </span>
            </div>
            <input
              type="range"
              min="34.0"
              max="41.0"
              step="0.1"
              value={homeostasis.coreTemperature}
              onChange={(e) => onUpdateHomeostasis('coreTemperature', parseFloat(e.target.value))}
              className="w-full accent-sky-400 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
            <div className="text-[9px] text-slate-500 flex justify-between mt-0.5">
              <span>Shivering / Shunt</span>
              <span>Vasodilation / Sweat</span>
            </div>
          </div>

          {/* 2. Mean Arterial Pressure (MAP) */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-300">Mean Arterial Press (MAP)</span>
              <span className={`font-mono font-bold ${
                homeostasis.meanArterialPressure > 110 ? 'text-red-400' : homeostasis.meanArterialPressure < 80 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {homeostasis.meanArterialPressure.toFixed(0)} mmHg
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="160"
              step="1"
              value={homeostasis.meanArterialPressure}
              onChange={(e) => onUpdateHomeostasis('meanArterialPressure', parseFloat(e.target.value))}
              className="w-full accent-sky-400 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
            <div className="text-[9px] text-slate-500 flex justify-between mt-0.5">
              <span>RAAS / ADH Retention</span>
              <span>Vagal Slow / ANP Loss</span>
            </div>
          </div>

          {/* 3. Arterial Blood pH */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-300">Arterial pH (7.40 Setpoint)</span>
              <span className={`font-mono font-bold ${
                homeostasis.arterialPh < 7.35 ? 'text-rose-400' : homeostasis.arterialPh > 7.45 ? 'text-cyan-400' : 'text-emerald-400'
              }`}>
                {homeostasis.arterialPh.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="7.10"
              max="7.60"
              step="0.01"
              value={homeostasis.arterialPh}
              onChange={(e) => onUpdateHomeostasis('arterialPh', parseFloat(e.target.value))}
              className="w-full accent-sky-400 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
            <div className="text-[9px] text-slate-500 flex justify-between mt-0.5">
              <span>Acidosis (Hyperventilate)</span>
              <span>Alkalosis (Hypoventilate)</span>
            </div>
          </div>

          {/* 4. Blood Glucose */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-300">Blood Glucose (Fasting 90)</span>
              <span className="font-mono text-purple-400 font-bold">
                {homeostasis.bloodGlucose.toFixed(0)} mg/dL
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="240"
              step="2"
              value={homeostasis.bloodGlucose}
              onChange={(e) => onUpdateHomeostasis('bloodGlucose', parseFloat(e.target.value))}
              className="w-full accent-purple-400 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
            <div className="text-[9px] text-slate-500 flex justify-between mt-0.5">
              <span>Glucagon Release (&lt;70)</span>
              <span>Insulin GLUT4 (&gt;110)</span>
            </div>
          </div>
        </div>

        {/* 3-Axis GPU Clipping Planes */}
        <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 font-bold text-white mb-2">
            <Scissors className="w-3.5 h-3.5 text-sky-400" />
            <span>3-Axis GPU Clipping Slices</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            {(['none', 'sagittal', 'coronal', 'transverse'] as const).map(plane => (
              <button
                key={plane}
                onClick={() => onSetClippingPlane(plane)}
                className={`py-1 rounded text-[10px] font-mono capitalize transition-all ${
                  clippingPlane === plane
                    ? 'bg-sky-500 text-white font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {plane}
              </button>
            ))}
          </div>

          {clippingPlane !== 'none' && (
            <div>
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>Cutting Depth Offset</span>
                <span className="font-mono">{clippingOffset.toFixed(2)}m</span>
              </div>
              <input
                type="range"
                min="-0.8"
                max="0.8"
                step="0.02"
                value={clippingOffset}
                onChange={(e) => onSetClippingOffset(parseFloat(e.target.value))}
                className="w-full accent-sky-400 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* 6 Named Clinical Postures */}
        <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 font-bold text-white mb-2">
            <UserCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Clinical Postures & Orientations</span>
          </div>
          <select
            value={clinicalPosture}
            onChange={(e) => onSetClinicalPosture(e.target.value as ClinicalPosture)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none cursor-pointer"
          >
            <option value="anatomical">Standard Anatomical Position (Erect)</option>
            <option value="supine">Supine Position (Horizontal Dorsal)</option>
            <option value="prone">Prone Position (Horizontal Ventral)</option>
            <option value="lateral-right">Right Lateral Recumbent</option>
            <option value="fowlers">Fowler's Position (Semi-sitting 45°)</option>
            <option value="trendelenburg">Trendelenburg (-15° Pelvic Elevation)</option>
          </select>
        </div>
      </div>
    </aside>
  );
};
