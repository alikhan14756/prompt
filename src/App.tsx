import { useState, useMemo } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { SpatialLabelOverlay } from './components/SpatialLabelOverlay';
import type { LabelPinItem } from './components/SpatialLabelOverlay';
import { HeaderNav } from './components/HeaderNav';
import { SystemDrawer } from './components/SystemDrawer';
import { BiomechanicsHUD } from './components/BiomechanicsHUD';
import { AnatomyDetailModal } from './components/AnatomyDetailModal';
import { OSCEQuizController } from './components/OSCEQuizController';
import type {
  AnatomicalStructure,
  ClinicalPosture,
  HomeostaticState,
  NamingMode,
  OrganSystemId
} from './types/anatomy';
import { ANATOMICAL_STRUCTURES } from './data/anatomyOntology';
import {
  Rotate3d,
  Activity,
  Plus,
  Minus,
  RotateCcw,
  Sparkles,
  MousePointerClick
} from 'lucide-react';

export function App() {
  const [structures] = useState<AnatomicalStructure[]>(ANATOMICAL_STRUCTURES);

  const [activeSystems, setActiveSystems] = useState<Record<OrganSystemId, boolean>>({
    skeletal: true,
    muscular: true,
    nervous: true,
    cardiovascular: true,
    respiratory: true,
    digestive: true,
    urinary: true,
    endocrine: true,
    lymphatic: true,
    integumentary: true,
    reproductive: true,
  });

  const [systemOpacities, setSystemOpacities] = useState<Record<OrganSystemId, number>>({
    skeletal: 0.95,
    muscular: 0.9,
    nervous: 1.0,
    cardiovascular: 1.0,
    respiratory: 0.85,
    digestive: 0.9,
    urinary: 0.95,
    endocrine: 1.0,
    lymphatic: 0.9,
    integumentary: 0.12, // Translucent holographic skin so all internal organs glow through
    reproductive: 0.9,
  });

  const [selectedStructure, setSelectedStructure] = useState<AnatomicalStructure | null>(null);
  const [namingMode, setNamingMode] = useState<NamingMode>('auto-lod');
  const [explosionFactor, setExplosionFactor] = useState<number>(0);
  const [clippingPlane, setClippingPlane] = useState<'none' | 'sagittal' | 'coronal' | 'transverse'>('none');
  const [clippingOffset, setClippingOffset] = useState<number>(0);
  const [clinicalPosture, setClinicalPosture] = useState<ClinicalPosture>('anatomical');
  const [timeScale, setTimeScale] = useState<number>(1.0);

  const [isSystemDrawerOpen, setIsSystemDrawerOpen] = useState<boolean>(false);
  const [isBiomechanicsOpen, setIsBiomechanicsOpen] = useState<boolean>(false);

  const [homeostasis, setHomeostasis] = useState<HomeostaticState>({
    coreTemperature: 36.8,
    meanArterialPressure: 93,
    arterialPh: 7.40,
    bloodGlucose: 90,
    plasmaOsmolarity: 290,
    positiveFeedbackOxytocin: 0,
    positiveFeedbackClotting: 0,
  });

  const [kinematicMetrics, setKinematicMetrics] = useState({
    cardiacPhase: 0,
    respiratoryPhase: 0,
    ecgValue: 0,
    bpValue: 93,
    gfrLive: 125,
  });

  const [projectedPins, setProjectedPins] = useState<LabelPinItem[]>([]);
  const [examAnswers, setExamAnswers] = useState<Record<string, boolean>>({});

  const handleToggleSystem = (sysId: OrganSystemId) => {
    setActiveSystems(prev => ({ ...prev, [sysId]: !prev[sysId] }));
  };

  const handleSetAllSystems = (active: boolean) => {
    const next: Record<OrganSystemId, boolean> = { ...activeSystems };
    (Object.keys(next) as OrganSystemId[]).forEach(k => {
      next[k] = active;
    });
    setActiveSystems(next);
  };

  const handleChangeOpacity = (sysId: OrganSystemId, opacity: number) => {
    setSystemOpacities(prev => ({ ...prev, [sysId]: opacity }));
  };

  const handleUpdateHomeostasis = (key: keyof HomeostaticState, value: number) => {
    setHomeostasis(prev => ({ ...prev, [key]: value }));
  };

  const handleResetHomeostasis = () => {
    setHomeostasis({
      coreTemperature: 36.8,
      meanArterialPressure: 93,
      arterialPh: 7.40,
      bloodGlucose: 90,
      plasmaOsmolarity: 290,
      positiveFeedbackOxytocin: 0,
      positiveFeedbackClotting: 0,
    });
  };

  const handleSetNamingMode = (mode: NamingMode) => {
    setNamingMode(mode);
    if (mode === 'exploded') {
      setExplosionFactor(0.85);
    } else if (explosionFactor > 0) {
      setExplosionFactor(0);
    }
  };

  const handleAnswerExam = (structureId: string, answer: string) => {
    const struct = structures.find(s => s.id === structureId);
    if (!struct) return;

    let isCorrect = false;
    if (struct.examQuestion) {
      const correctOption = struct.examQuestion.options[struct.examQuestion.correctIndex];
      isCorrect = answer === correctOption;
    } else {
      isCorrect = answer.toLowerCase().trim() === struct.name.toLowerCase().trim();
    }

    if (isCorrect) {
      setExamAnswers(prev => ({ ...prev, [structureId]: true }));
    }
  };

  // Preset region view jumps
  const handleJumpToRegion = (region: 'body' | 'brain' | 'heart' | 'abdomen' | 'kidney') => {
    if (region === 'body') {
      setSelectedStructure(null);
    } else if (region === 'brain') {
      const target = structures.find(s => s.id === 'nrv-cerebrum-cortex');
      if (target) setSelectedStructure(target);
    } else if (region === 'heart') {
      const target = structures.find(s => s.id === 'crd-heart-lv');
      if (target) setSelectedStructure(target);
    } else if (region === 'abdomen') {
      const target = structures.find(s => s.id === 'dig-stomach');
      if (target) setSelectedStructure(target);
    } else if (region === 'kidney') {
      const target = structures.find(s => s.id === 'urn-kidney-macro');
      if (target) setSelectedStructure(target);
    }
  };

  const examScore = useMemo(() => {
    return Object.values(examAnswers).filter(Boolean).length;
  }, [examAnswers]);

  return (
    <div className="relative w-screen h-screen bg-[#05070b] overflow-hidden select-none font-sans">
      {/* 3D WebGL Canvas Layer - Full Viewport */}
      <div className="absolute inset-0 z-0">
        <ThreeCanvas
          structures={structures}
          selectedStructure={selectedStructure}
          onSelectStructure={setSelectedStructure}
          activeSystems={activeSystems}
          systemOpacities={systemOpacities}
          namingMode={namingMode}
          explosionFactor={explosionFactor}
          clippingPlane={clippingPlane}
          clippingOffset={clippingOffset}
          clinicalPosture={clinicalPosture}
          homeostasis={homeostasis}
          timeScale={timeScale}
          onUpdateLabels={setProjectedPins}
          onKinematicTick={setKinematicMetrics}
        />
      </div>

      {/* Dynamic 3D Spatial SVG Leader-Line & Card Overlay Layer */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <SpatialLabelOverlay
          pins={projectedPins}
          selectedStructure={selectedStructure}
          onSelectStructure={setSelectedStructure}
          namingMode={namingMode}
          examAnswers={examAnswers}
          onAnswerExam={handleAnswerExam}
        />
      </div>

      {/* Top Application Header Navigation & Search */}
      <HeaderNav
        structures={structures}
        selectedStructure={selectedStructure}
        onSelectStructure={setSelectedStructure}
        namingMode={namingMode}
        onSetNamingMode={handleSetNamingMode}
        timeScale={timeScale}
        onSetTimeScale={setTimeScale}
        onToggleSystemDrawer={() => setIsSystemDrawerOpen(!isSystemDrawerOpen)}
        onToggleBiomechanicsHUD={() => setIsBiomechanicsOpen(!isBiomechanicsOpen)}
        isSystemDrawerOpen={isSystemDrawerOpen}
        isBiomechanicsOpen={isBiomechanicsOpen}
      />

      {/* Anatomical Region Quick-Jump Navigator */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-1.5 bg-slate-950/80 border border-slate-800/80 px-2.5 py-1 rounded-full backdrop-blur-xl shadow-xl">
        <span className="text-[10px] text-sky-400 font-mono uppercase tracking-wider mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          Focus:
        </span>
        <button
          onClick={() => handleJumpToRegion('body')}
          className="px-2.5 py-0.5 rounded-full text-[11px] text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          Full Body
        </button>
        <button
          onClick={() => handleJumpToRegion('brain')}
          className="px-2.5 py-0.5 rounded-full text-[11px] text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          Brain & Cranium
        </button>
        <button
          onClick={() => handleJumpToRegion('heart')}
          className="px-2.5 py-0.5 rounded-full text-[11px] text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          Thorax & Heart
        </button>
        <button
          onClick={() => handleJumpToRegion('abdomen')}
          className="px-2.5 py-0.5 rounded-full text-[11px] text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          Abdomen & GI
        </button>
        <button
          onClick={() => handleJumpToRegion('kidney')}
          className="px-2.5 py-0.5 rounded-full text-[11px] text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          Renal & Pelvis
        </button>
      </div>

      {/* Mode 5: OSCE Quiz Controller Banner */}
      <OSCEQuizController
        isActive={namingMode === 'osce'}
        score={examScore}
        totalQuestions={structures.filter(s => s.examQuestion).length || 6}
        onResetQuiz={() => setExamAnswers({})}
        onExitExamMode={() => setNamingMode('auto-lod')}
      />

      {/* Mode 3: Physio Flows Active Banner */}
      {namingMode === 'flow' && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 bg-slate-900/90 border border-sky-500/60 rounded-full px-4 py-1.5 flex items-center gap-2 text-xs text-sky-200 shadow-xl backdrop-blur-md">
          <Activity className="w-4 h-4 text-emerald-400 animate-spin" />
          <span>Active Flow Vectors: Oxygenated HbO2 vs HbCO2, Axonal Potentials, RAAS Hormone Stream</span>
        </div>
      )}

      {/* Left System Drawer (11 Systems & Opacities) */}
      <SystemDrawer
        isOpen={isSystemDrawerOpen}
        onClose={() => setIsSystemDrawerOpen(false)}
        activeSystems={activeSystems}
        onToggleSystem={handleToggleSystem}
        onSetAllSystems={handleSetAllSystems}
        systemOpacities={systemOpacities}
        onChangeOpacity={handleChangeOpacity}
        explosionFactor={explosionFactor}
        onChangeExplosionFactor={setExplosionFactor}
      />

      {/* Right Biomechanics & Master Homeostasis Matrix HUD */}
      <BiomechanicsHUD
        isOpen={isBiomechanicsOpen}
        onClose={() => setIsBiomechanicsOpen(false)}
        homeostasis={homeostasis}
        onUpdateHomeostasis={handleUpdateHomeostasis}
        onResetHomeostasis={handleResetHomeostasis}
        clippingPlane={clippingPlane}
        onSetClippingPlane={setClippingPlane}
        clippingOffset={clippingOffset}
        onSetClippingOffset={setClippingOffset}
        clinicalPosture={clinicalPosture}
        onSetClinicalPosture={setClinicalPosture}
        kinematicMetrics={kinematicMetrics}
      />

      {/* Bottom Anatomical Detail Modal */}
      <AnatomyDetailModal
        structure={selectedStructure}
        onClose={() => setSelectedStructure(null)}
        onFocusStructure={(s) => setSelectedStructure(s)}
      />

      {/* Floating Zoom & Camera Reset Toolbar */}
      <div className="absolute right-4 bottom-4 z-20 flex flex-col items-center gap-1.5 bg-slate-950/85 border border-slate-800/80 p-1.5 rounded-2xl backdrop-blur-xl shadow-2xl">
        <button
          onClick={() => {
            // Trigger zoom in via keyboard event simulation or dispatch
            const canvas = document.querySelector('canvas');
            if (canvas) {
              canvas.dispatchEvent(new WheelEvent('wheel', { deltaY: -200 }));
            }
          }}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            const canvas = document.querySelector('canvas');
            if (canvas) {
              canvas.dispatchEvent(new WheelEvent('wheel', { deltaY: 200 }));
            }
          }}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="w-5 h-[1px] bg-slate-800 my-0.5" />
        <button
          onClick={() => handleJumpToRegion('body')}
          className="p-2 text-slate-300 hover:text-sky-300 hover:bg-slate-800/80 rounded-xl transition-colors"
          title="Reset Camera View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Floating 3D Navigation Guide & Double-Click Hint */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1 text-[11px] text-slate-400 font-mono bg-slate-950/80 border border-slate-800/80 px-3 py-2 rounded-xl backdrop-blur-md shadow-lg pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-slate-300">
            <Rotate3d className="w-3.5 h-3.5 text-sky-400" />
            <span>Left Drag: Orbit</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1 text-slate-300">
            <span>Scroll: Zoom</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1 text-slate-300">
            <span>Right Drag: Pan</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sky-400/90 text-[10px] mt-0.5">
          <MousePointerClick className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>Double-click any organ to zoom smoothly right into it!</span>
        </div>
      </div>
    </div>
  );
}

export default App;
