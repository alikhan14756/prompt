export type OrganSystemId =
  | 'skeletal'
  | 'muscular'
  | 'nervous'
  | 'cardiovascular'
  | 'respiratory'
  | 'digestive'
  | 'urinary'
  | 'endocrine'
  | 'lymphatic'
  | 'integumentary'
  | 'reproductive';

export type SpecialSenseId = 'eye' | 'ear' | 'olfaction' | 'gustation';

export type NamingMode =
  | 'auto-lod'     // Mode 1: Auto-LOD Full Nomenclature
  | 'exploded'     // Mode 2: X-Ray All-Parts Explosion & Name Matrix
  | 'flow'         // Mode 3: Live Physiological Process & Flow Naming
  | 'spotlight'    // Mode 4: Instant Search-to-3D Spotlight & Breadcrumbs
  | 'osce';        // Mode 5: Blank-Pin Active Recall & Practical Exam Mode

export type ClinicalPosture =
  | 'anatomical'
  | 'supine'
  | 'prone'
  | 'lateral-right'
  | 'lateral-left'
  | 'fowlers'
  | 'trendelenburg'
  | 'lithotomy';

export interface AnatomicalStructure {
  id: string;
  name: string;
  latinName: string;
  taId: string; // Terminologia Anatomica ID, e.g. A12.1.04.003
  system: OrganSystemId;
  subsystem?: string;
  lod: 0 | 1 | 2 | 3 | 4; // 0=Macro/whole-body to 4=Cellular/molecular
  position: [number, number, number]; // 3D world coordinate
  meshType: string;
  color: string;
  description: string;
  actionBadge: string;
  actionPhases: string[];
  clinicalSignificance: string;
  audioPronunciationText: string;
  biomechanicalRole?: 'agonist' | 'antagonist' | 'synergist' | 'fixator';
  examQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface HomeostaticState {
  coreTemperature: number; // 36.8 °C (setpoint)
  meanArterialPressure: number; // 93 mmHg (120/80)
  arterialPh: number; // 7.40
  bloodGlucose: number; // 90 mg/dL
  plasmaOsmolarity: number; // 290 mOsm/kg
  positiveFeedbackOxytocin: number; // 0-100%
  positiveFeedbackClotting: number; // 0-100%
}

export interface PhysiologicalKinematics {
  heartRateBpm: number;
  respirationRateRpm: number;
  timeScale: number; // 0.1x to 2.0x
  cardiacCyclePhase: number; // 0.0 - 1.0 (Wiggers cycle)
  respiratoryCyclePhase: number; // 0.0 - 1.0 (Inspiration/Expiration)
  peristalsisPhase: number; // 0.0 - 1.0
  actionPotentialMv: number; // -70mV to +30mV
  gfrRateMlMin: number; // 125 mL/min
}

export interface ScreenLabelPin {
  id: string;
  structure: AnatomicalStructure;
  screenX: number;
  screenY: number;
  targetX: number;
  targetY: number;
  visible: boolean;
  distance: number;
}
