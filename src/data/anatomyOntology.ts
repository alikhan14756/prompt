import type { AnatomicalStructure, OrganSystemId } from '../types/anatomy';

export const ORGAN_SYSTEM_INFO: Record<OrganSystemId, { name: string; color: string; badge: string; description: string }> = {
  skeletal: {
    name: 'Skeletal & Articular',
    color: '#e2e8f0',
    badge: '206 Bones',
    description: 'Bony architecture, articulating joints, ligaments, foramen landmarks, and micro-osteon remodeling.'
  },
  muscular: {
    name: 'Muscular System',
    color: '#ef4444',
    badge: '650+ Muscles',
    description: 'Agonist/antagonist mechanics, cross-bridge sliding filaments, torque vectors, and tendon insertions.'
  },
  nervous: {
    name: 'Nervous & Senses',
    color: '#38bdf8',
    badge: 'CNS / PNS / 12 Nerves',
    description: 'Cerebral cortex, sensory homunculus, saltatory action potentials, reflex arcs, and special sense organs.'
  },
  cardiovascular: {
    name: 'Cardiovascular System',
    color: '#dc2626',
    badge: 'Heart & Hemodynamics',
    description: '4-chamber cardiac cycle, Wiggers pressure loops, cardiac conduction system, and systemic vascular tree.'
  },
  respiratory: {
    name: 'Respiratory System',
    color: '#06b6d4',
    badge: 'Airways & Alveoli',
    description: 'Boyle’s law thoracic ventilation, diaphragmatic excursion, phonation, and alveolar-capillary gas diffusion.'
  },
  digestive: {
    name: 'Digestive & Hepatobiliary',
    color: '#f59e0b',
    badge: 'GI Tract & Enzymes',
    description: 'Primary peristaltic propulsion, 3-layer gastric churning, biliary excretion, and villous enterocyte absorption.'
  },
  urinary: {
    name: 'Urinary & Renal',
    color: '#eab308',
    badge: '1M Nephrons & GFR',
    description: 'Glomerular ultrafiltration, countercurrent medullary gradient, RAAS hormonal tuning, and ureteric micturition.'
  },
  endocrine: {
    name: 'Endocrine System',
    color: '#a855f7',
    badge: 'Glands & Hormones',
    description: 'Hypothalamic-pituitary axis, thyroid metabolic rate, adrenal steroid zones, and islet blood glucose loops.'
  },
  lymphatic: {
    name: 'Lymphatic & Immune',
    color: '#10b981',
    badge: 'Nodes & Defense',
    description: 'Interstitial fluid drainage, thoracic duct, splenic lymphoid filtration, and macrophage/leukocyte diapedesis.'
  },
  integumentary: {
    name: 'Integumentary System',
    color: '#fb923c',
    badge: 'Skin Strata & Sensory',
    description: '5 epidermal strata, dermal papillae, cutaneous mechanoreceptors, thermoregulatory sweating, and UV-D3 synthesis.'
  },
  reproductive: {
    name: 'Reproductive System',
    color: '#ec4899',
    badge: 'Gametogenesis & Cycle',
    description: 'Spermatogenesis/temperature regulation, 28-day ovarian/uterine cycle, fertilization, and oxytocin delivery loop.'
  }
};

export const ANATOMICAL_STRUCTURES: AnatomicalStructure[] = [
  // =================== CARDIOVASCULAR ===================
  {
    id: 'crd-heart-lv',
    name: 'Left Ventricle',
    latinName: 'Ventriculus sinister',
    taId: 'A12.1.01.008',
    system: 'cardiovascular',
    subsystem: 'Cardiac Chambers',
    lod: 1,
    position: [0.03, 1.25, 0.09],
    meshType: 'ventricle',
    color: '#b91c1c',
    description: 'Thickest muscular chamber (8-12 mm myocardium). Generates peak systolic pressures of ~120 mmHg to perfuse the systemic circulation.',
    actionBadge: 'Isovolumetric Contraction -> Systolic Ejection',
    actionPhases: ['Isovolumetric Contraction (80 mmHg)', 'Rapid Ejection (120 mmHg)', 'Reduced Ejection', 'Isovolumetric Relaxation'],
    clinicalSignificance: 'Subject to concentric hypertrophy in hypertension and ischemic necrosis in myocardial infarction.',
    audioPronunciationText: 'Ventriculus sinister',
    examQuestion: {
      question: 'Why is the Left Ventricle wall approximately 3x thicker than the Right Ventricle?',
      options: ['Must pump against higher systemic vascular resistance (80-120 mmHg)', 'Stores more blood volume', 'Contains more pacemaker cells', 'Protects coronary arteries from compression'],
      correctIndex: 0,
      explanation: 'The systemic circuit has much higher peripheral vascular resistance than the low-pressure pulmonary circuit (~25/10 mmHg).'
    }
  },
  {
    id: 'crd-aorta',
    name: 'Ascending Aorta & Arch',
    latinName: 'Aorta ascendens et Arcus aortae',
    taId: 'A12.2.01.001',
    system: 'cardiovascular',
    subsystem: 'Great Arteries',
    lod: 1,
    position: [0.01, 1.34, 0.07],
    meshType: 'vessel',
    color: '#e11d48',
    description: 'Elastic conduit artery with Windkessel compliance buffering pulsatile stroke volume into steady laminar systemic flow. Branches into brachiocephalic, carotid, and subclavian arteries.',
    actionBadge: 'Windkessel Elastic Recoil (120/80 mmHg)',
    actionPhases: ['Systolic Expansion', 'Elastic Recoil Diastolic Perfusion', 'Coronary Filling'],
    clinicalSignificance: 'Aortic dissection and Thoracic Aortic Aneurysms (TAA) pose catastrophic rupture risks.',
    audioPronunciationText: 'Aorta ascendens et Arcus aortae'
  },
  {
    id: 'crd-veins-systemic',
    name: 'Superior & Inferior Vena Cava',
    latinName: 'Vena cava superior et inferior',
    taId: 'A12.3.01.001',
    system: 'cardiovascular',
    subsystem: 'Great Veins',
    lod: 1,
    position: [-0.03, 1.28, 0.06],
    meshType: 'vessel',
    color: '#2563eb',
    description: 'Primary conduits of deoxygenated blood returning from the upper and lower body to the right atrium of the heart.',
    actionBadge: 'Venous Return & CVP Homeostasis',
    actionPhases: ['Diastolic Sucking Pressure', 'Thoracic Pump Augmented Return', 'Atrial Inflow'],
    clinicalSignificance: 'Superior Vena Cava (SVC) Syndrome results from mediastinal malignancy compressing the SVC, causing facial plethoric edema.',
    audioPronunciationText: 'Vena cava superior'
  },

  // =================== RESPIRATORY ===================
  {
    id: 'rsp-lungs',
    name: 'Lungs & Alveoli (Left & Right)',
    latinName: 'Pulmones',
    taId: 'A06.5.01.001',
    system: 'respiratory',
    subsystem: 'Pulmonary Parenchyma',
    lod: 1,
    position: [0.12, 1.25, 0.06],
    meshType: 'lung',
    color: '#06b6d4',
    description: 'Bilateral respiratory organs housing 300 million alveoli for passive O2 and CO2 diffusion across the respiratory membrane.',
    actionBadge: 'Boyle’s Law Ventilation & Alveolar Diffusion',
    actionPhases: ['Inspiration (759 mmHg pull)', 'O2 Gradient Uptake (104 -> 40 mmHg)', 'CO2 Excretion', 'Elastic Expiration'],
    clinicalSignificance: 'Acute Respiratory Distress Syndrome (ARDS) causes diffuse alveolar damage, pulmonary edema, and refractory hypoxemia.',
    audioPronunciationText: 'Pulmones'
  },
  {
    id: 'rsp-larynx-trachea',
    name: 'Trachea & Laryngeal Cartilages',
    latinName: 'Trachea et Cartilagines laryngis',
    taId: 'A06.2.01.001',
    system: 'respiratory',
    subsystem: 'Airways',
    lod: 1,
    position: [0.00, 1.42, 0.05],
    meshType: 'airway',
    color: '#22d3ee',
    description: 'Cartilaginous airway consisting of thyroid and cricoid cartilages leading into C-shaped hyaline cartilage rings of the trachea and carina.',
    actionBadge: 'Phonatory Vibration & Mucociliary Escalator',
    actionPhases: ['Vocal Fold Phonation', 'Airway Patency Maintenance', 'Ciliary Mucus Transport'],
    clinicalSignificance: 'Endotracheal intubation past the vocal cords maintains airway patency in critical respiratory failure.',
    audioPronunciationText: 'Trachea'
  },

  // =================== DIGESTIVE & HEPATOBILIARY ===================
  {
    id: 'dig-liver-lobule',
    name: 'Liver (Right & Left Lobes)',
    latinName: 'Hepar',
    taId: 'A05.8.01.001',
    system: 'digestive',
    subsystem: 'Hepatobiliary',
    lod: 1,
    position: [-0.09, 1.16, 0.08],
    meshType: 'organ',
    color: '#b45309',
    description: 'Largest internal organ (1.5 kg). Hexagonal hepatic lobules with central veins, hepatocyte plates, Kupffer cells, and portal triads.',
    actionBadge: 'First-Pass Portal Clearance & Bile Synthesis',
    actionPhases: ['Kupffer Cell Macrophage Filtration', 'Hepatocyte Glycogen & Albumin Synthesis', 'Canalicular Bile Excretion'],
    clinicalSignificance: 'Cirrhosis causes portal hypertension, splenomegaly, and life-threatening bleeding from esophageal varices.',
    audioPronunciationText: 'Hepar'
  },
  {
    id: 'dig-stomach',
    name: 'Stomach (Fundus, Body & Antrum)',
    latinName: 'Gaster (Ventriculus)',
    taId: 'A05.5.01.001',
    system: 'digestive',
    subsystem: 'Upper GI Tract',
    lod: 1,
    position: [0.08, 1.15, 0.08],
    meshType: 'organ',
    color: '#f59e0b',
    description: 'J-shaped hollow muscular organ with 3 smooth muscle layers. Secretes HCl (pH 1.5-2.0) and pepsinogen for gastric churning into chyme.',
    actionBadge: '3-Layer Gastric Churning & Retropulsion',
    actionPhases: ['Fundic Receptive Relaxation', 'Peristaltic Antral Grinding (3 cycles/min)', 'Pyloric 3 mL Bolus Squirting'],
    clinicalSignificance: 'Helicobacter pylori infection breaks mucosal barrier, predisposing to peptic ulcer disease.',
    audioPronunciationText: 'Gaster'
  },
  {
    id: 'dig-intestines',
    name: 'Intestines (Small Intestine & Colon)',
    latinName: 'Intestinum tenue et Intestinum crassum',
    taId: 'A05.6.01.001',
    system: 'digestive',
    subsystem: 'Lower GI Tract',
    lod: 1,
    position: [0.00, 1.02, 0.08],
    meshType: 'organ',
    color: '#d97706',
    description: 'Convoluted absorptive small intestine loops surrounded by the framed large intestine with haustra, teniae coli, and vermiform appendix.',
    actionBadge: 'Segmentation Churning & Water Reabsorption',
    actionPhases: ['Stationary Segmentation Mixing', 'Enterocyte Nutrient Uptake', 'Haustral Electrolyte Conservation'],
    clinicalSignificance: 'Acute appendicitis presents with migratory periumbilical pain localizing to McBurney point in the right lower quadrant.',
    audioPronunciationText: 'Intestinum'
  },

  // =================== URINARY & RENAL ===================
  {
    id: 'urn-kidneys',
    name: 'Kidneys & Adrenal Glands (Bilateral)',
    latinName: 'Renes et Glandulae suprarenales',
    taId: 'A08.1.01.001',
    system: 'urinary',
    subsystem: 'Renal System',
    lod: 1,
    position: [-0.07, 1.08, 0.02],
    meshType: 'organ',
    color: '#ca8a04',
    description: 'Retroperitoneal bean-shaped organs filtering 1.2 L/min of blood. Capped by adrenal glands regulating cortisol and aldosterone.',
    actionBadge: 'Glomerular Ultrafiltration (GFR 125 mL/min)',
    actionPhases: ['Podocyte High-Pressure Filtration', 'Henle Countercurrent Gradient (1200 mOsm/kg)', 'Ureteric Jet Inflow'],
    clinicalSignificance: 'Renal artery stenosis triggers excessive renin release, driving refractory renovascular hypertension.',
    audioPronunciationText: 'Renes'
  },
  {
    id: 'urn-bladder',
    name: 'Urinary Bladder & Pelvic Reservoirs',
    latinName: 'Vesica urinaria',
    taId: 'A08.2.01.001',
    system: 'urinary',
    subsystem: 'Urinary Reservoir',
    lod: 1,
    position: [0.00, 0.82, 0.08],
    meshType: 'organ',
    color: '#eab308',
    description: 'Hollow muscular distensible reservoir lined with transitional epithelium (urothelium). Detrusor muscle contracts during micturition.',
    actionBadge: 'Micturition Reflex & Urothelial Distension',
    actionPhases: ['Ureteric Filling', 'Bladder Wall Stretch Afferents', 'Detrusor Contraction'],
    clinicalSignificance: 'Benign Prostatic Hyperplasia (BPH) compresses prostatic urethra in elderly men, producing urinary hesitancy.',
    audioPronunciationText: 'Vesica urinaria'
  },

  // =================== NERVOUS SYSTEM ===================
  {
    id: 'nrv-brain-cortex',
    name: 'Brain (Cerebrum & Cerebellum)',
    latinName: 'Encephalon (Cerebrum et Cerebellum)',
    taId: 'A14.1.00.001',
    system: 'nervous',
    subsystem: 'Central Nervous System',
    lod: 1,
    position: [0.00, 1.62, 0.04],
    meshType: 'brain',
    color: '#38bdf8',
    description: 'Cerebral hemispheres with convoluted gyri and sulci, basal ganglia, brainstem, and posterior cerebellum coordinating precision movement.',
    actionBadge: 'Cortical Homunculus Pyramidal Firing',
    actionPhases: ['Sensory Signal Arrival', 'Inter-cortical Association', 'Corticospinal Motor Impulse'],
    clinicalSignificance: 'Middle Cerebral Artery (MCA) ischemic stroke produces contralateral hemiplegia and facial droop.',
    audioPronunciationText: 'Encephalon'
  },

  // =================== SKELETAL SYSTEM ===================
  {
    id: 'skl-skull-cranium',
    name: 'Cranium & Facial Bones',
    latinName: 'Cranium: Calvaria et Ossa faciei',
    taId: 'A02.1.00.001',
    system: 'skeletal',
    subsystem: 'Axial Skeleton',
    lod: 1,
    position: [0.00, 1.60, 0.05],
    meshType: 'bone',
    color: '#f1f5f9',
    description: 'Complete skull assembly comprising neurocranium (braincase) and viscerocranium (facial bones, orbits, zygomatic arches, and mandible).',
    actionBadge: 'Cranial Vault Impact Shielding & Foramen Clearance',
    actionPhases: ['Suture Biomechanic Force Dispersion', 'TMJ Mastication Articulation', 'Cranial Nerve Foramina Protection'],
    clinicalSignificance: 'Basilar skull fracture signs include Battle sign (mastoid ecchymosis), raccoon eyes, and CSF rhinorrhea.',
    audioPronunciationText: 'Cranium'
  },
  {
    id: 'skl-thoracic-skeleton',
    name: 'Thoracic Cage (Ribs & Sternum)',
    latinName: 'Cavea thoracis et Sternum',
    taId: 'A02.3.01.001',
    system: 'skeletal',
    subsystem: 'Thorax',
    lod: 1,
    position: [0.00, 1.26, 0.10],
    meshType: 'bone',
    color: '#e2e8f0',
    description: '12 pairs of anatomically curved ribs articulating with thoracic vertebrae posteriorly and the manubrium/sternal body anteriorly.',
    actionBadge: 'Bucket-Handle & Pump-Handle Inhalation Motion',
    actionPhases: ['Inspiratory Transverse Elevation', 'Pump-Handle AP Expansion', 'Expiratory Elastic Sinking'],
    clinicalSignificance: 'Flail chest occurs when 3+ contiguous ribs are fractured in 2+ places, producing paradoxical respiratory chest movement.',
    audioPronunciationText: 'Cavea thoracis'
  },
  {
    id: 'skl-vertebrae',
    name: 'Vertebral Column (C1-C7, T1-T12, L1-L5, Sacrum)',
    latinName: 'Columna vertebralis',
    taId: 'A02.2.00.001',
    system: 'skeletal',
    subsystem: 'Spine',
    lod: 1,
    position: [0.00, 1.20, 0.01],
    meshType: 'bone',
    color: '#cbd5e1',
    description: 'Curved spinal column providing axial support and protecting the spinal cord within the vertebral canal.',
    actionBadge: 'Axial Load Transmission & Disc Shock Absorption',
    actionPhases: ['Cervical Lordosis Flexibility', 'Thoracic Kyphosis Stability', 'Lumbar Lordosis Weight Bearing'],
    clinicalSignificance: 'Herniated nucleus pulposus in L4-L5 or L5-S1 compresses spinal nerve roots, producing classic sciatica radiating pain.',
    audioPronunciationText: 'Columna vertebralis'
  },
  {
    id: 'skl-pelvis-lower',
    name: 'Pelvis, Femurs & Lower Extremities',
    latinName: 'Pelvis et Skeleton membri inferioris',
    taId: 'A02.5.01.001',
    system: 'skeletal',
    subsystem: 'Lower Limb Skeleton',
    lod: 1,
    position: [0.00, 0.78, 0.06],
    meshType: 'bone',
    color: '#f8fafc',
    description: 'Pelvic girdle, femoral heads and shafts, patella kneecaps, tibia shinbones, fibulas, and foot tarsals/metatarsals.',
    actionBadge: 'Bipedal Gait Load Transmission (3x Body Weight)',
    actionPhases: ['Heel Strike Compression', 'Mid-Stance Abductor Torque', 'Toe-Off Flexion Drive'],
    clinicalSignificance: 'Subcapital femoral neck fractures jeopardize the retinacular branches of medial circumflex femoral artery, causing avascular necrosis.',
    audioPronunciationText: 'Skeleton membri inferioris'
  },
  {
    id: 'skl-upper-limbs',
    name: 'Pectoral Girdle & Upper Extremities',
    latinName: 'Cingulum pectorale et Skeleton membri superioris',
    taId: 'A02.4.01.001',
    system: 'skeletal',
    subsystem: 'Upper Limb Skeleton',
    lod: 1,
    position: [0.28, 1.10, 0.04],
    meshType: 'bone',
    color: '#e2e8f0',
    description: 'Clavicles, scapular shoulder blades, humerus, radius, ulna, carpal bones, and articulating hand phalanges.',
    actionBadge: 'Prehensile Kinematics & Glenohumeral Circumduction',
    actionPhases: ['Scapulohumeral Rhythm (2:1 ratio)', 'Radioulnar Pronation/Supination', 'Opposable Thumb Grasp'],
    clinicalSignificance: 'Colles fracture of the distal radius produces classic "dinner fork" wrist deformity after falling onto outstretched hand.',
    audioPronunciationText: 'Skeleton membri superioris'
  },

  // =================== INTEGUMENTARY ===================
  {
    id: 'int-body-surface',
    name: 'Integumentary Surface & Body Contours',
    latinName: 'Integumentum commune (Cutis)',
    taId: 'A16.0.00.001',
    system: 'integumentary',
    subsystem: 'Body Surface',
    lod: 0,
    position: [0.00, 0.88, 0.16],
    meshType: 'skin',
    color: '#38bdf8',
    description: 'Realistic human anatomical surface contours (facial features, neck, chest, abdomen, limbs, and extremities) with cutaneous thermoregulatory and tactile receptors.',
    actionBadge: 'Thermoregulation & Sensory Tactile Shielding',
    actionPhases: ['Cutaneous Thermoreceptor Sensing', 'Eccrine Evaporative Cooling', 'Desquamation Barrier Defense'],
    clinicalSignificance: 'The "Rule of Nines" rapidly estimates body surface area burned in thermal injuries.',
    audioPronunciationText: 'Integumentum commune'
  }
];

export const CLINICAL_POSTURES_DATA: Record<string, { name: string; rotation: [number, number, number]; position: [number, number, number]; description: string }> = {
  anatomical: {
    name: 'Standard Anatomical Position',
    rotation: [0, 0, 0],
    position: [0, -0.87, 0],
    description: 'Standing upright, face forward, arms at sides, palms facing anteriorly, feet flat pointing forward.'
  },
  supine: {
    name: 'Supine Position',
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, -0.87],
    description: 'Lying horizontally on the back, face up. Standard surgical and examination orientation.'
  },
  prone: {
    name: 'Prone Position',
    rotation: [Math.PI / 2, Math.PI, 0],
    position: [0, 0, 0.87],
    description: 'Lying horizontally on the abdomen, face down. Used in spine surgery and ARDS prone ventilation.'
  },
  'lateral-right': {
    name: 'Right Lateral Recumbent',
    rotation: [-Math.PI / 2, 0, -Math.PI / 2],
    position: [0.87, 0, 0],
    description: 'Lying on the right side. Prevents aspiration and improves hemodynamic return in pregnancy.'
  },
  fowlers: {
    name: 'Fowler’s Position (45°)',
    rotation: [-Math.PI / 4, 0, 0],
    position: [0, -0.45, -0.45],
    description: 'Semi-upright sitting position at 45 to 60 degrees. Promotes chest expansion and diaphragmatic descent.'
  },
  trendelenburg: {
    name: 'Trendelenburg Position (-15°)',
    rotation: [-Math.PI / 2 + 0.26, 0, 0],
    position: [0, 0.22, -0.87],
    description: 'Supine on surface tilted with pelvis and lower extremities elevated above head level. Used in shock and central line placement.'
  }
};
