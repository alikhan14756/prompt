import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import type {
  AnatomicalStructure,
  ClinicalPosture,
  HomeostaticState,
  NamingMode,
  OrganSystemId
} from '../types/anatomy';
import { CLINICAL_POSTURES_DATA } from '../data/anatomyOntology';

interface ThreeCanvasProps {
  structures: AnatomicalStructure[];
  selectedStructure: AnatomicalStructure | null;
  onSelectStructure: (s: AnatomicalStructure | null) => void;
  activeSystems: Record<OrganSystemId, boolean>;
  systemOpacities: Record<OrganSystemId, number>;
  namingMode: NamingMode;
  explosionFactor: number;
  clippingPlane: 'none' | 'sagittal' | 'coronal' | 'transverse';
  clippingOffset: number;
  clinicalPosture: ClinicalPosture;
  homeostasis: HomeostaticState;
  timeScale: number;
  onUpdateLabels: (pins: Array<{
    id: string;
    structure: AnatomicalStructure;
    x: number;
    y: number;
    distance: number;
    visible: boolean;
  }>) => void;
  onKinematicTick: (metrics: {
    cardiacPhase: number;
    respiratoryPhase: number;
    ecgValue: number;
    bpValue: number;
    gfrLive: number;
  }) => void;
}

interface RealModelConfig {
  id: string;
  system: OrganSystemId;
  url: string;
  defaultColor: number;
  roughness: number;
  isTransparent?: boolean;
  baseOpacity?: number;
  explodeVector: [number, number, number];
}

const REAL_MODELS: RealModelConfig[] = [
  {
    id: 'int-body-surface',
    system: 'integumentary',
    url: '/models/body_surface.glb',
    defaultColor: 0x38bdf8,
    roughness: 0.2,
    isTransparent: true,
    baseOpacity: 0.12,
    explodeVector: [0, 0, 0.4],
  },
  {
    id: 'skl-skull-cranium',
    system: 'skeletal',
    url: '/models/skeletal_cranium.glb',
    defaultColor: 0xf1f5f9,
    roughness: 0.55,
    explodeVector: [0, 0.4, 0],
  },
  {
    id: 'skl-thoracic-skeleton',
    system: 'skeletal',
    url: '/models/skeletal_thorax.glb',
    defaultColor: 0xe2e8f0,
    roughness: 0.55,
    explodeVector: [0, 0, 0.3],
  },
  {
    id: 'skl-vertebrae',
    system: 'skeletal',
    url: '/models/skeletal_vertebrae.glb',
    defaultColor: 0xcbd5e1,
    roughness: 0.6,
    explodeVector: [0, 0, -0.25],
  },
  {
    id: 'skl-upper-limbs',
    system: 'skeletal',
    url: '/models/skeletal_upper_limb.glb',
    defaultColor: 0xe2e8f0,
    roughness: 0.55,
    explodeVector: [0.35, 0, 0],
  },
  {
    id: 'skl-pelvis-lower',
    system: 'skeletal',
    url: '/models/skeletal_lower_limb.glb',
    defaultColor: 0xf8fafc,
    roughness: 0.55,
    explodeVector: [0, -0.3, 0],
  },
  {
    id: 'nrv-brain-cortex',
    system: 'nervous',
    url: '/models/brain.glb',
    defaultColor: 0x38bdf8,
    roughness: 0.45,
    explodeVector: [0, 0.35, 0.15],
  },
  {
    id: 'crd-aorta',
    system: 'cardiovascular',
    url: '/models/cardiovascular_arteries.glb',
    defaultColor: 0xef4444,
    roughness: 0.3,
    explodeVector: [0, 0.1, 0.25],
  },
  {
    id: 'crd-veins-systemic',
    system: 'cardiovascular',
    url: '/models/cardiovascular_veins.glb',
    defaultColor: 0x2563eb,
    roughness: 0.3,
    explodeVector: [-0.15, 0.05, 0.15],
  },
  {
    id: 'rsp-lungs',
    system: 'respiratory',
    url: '/models/respiratory_endocrine.glb',
    defaultColor: 0x06b6d4,
    roughness: 0.45,
    isTransparent: true,
    baseOpacity: 0.85,
    explodeVector: [0.2, 0.1, 0.2],
  },
  {
    id: 'dig-liver-lobule',
    system: 'digestive',
    url: '/models/digestive_system.glb',
    defaultColor: 0xd97706,
    roughness: 0.5,
    explodeVector: [0, -0.1, 0.3],
  },
  {
    id: 'urn-kidneys',
    system: 'urinary',
    url: '/models/urinary_system.glb',
    defaultColor: 0xca8a04,
    roughness: 0.45,
    explodeVector: [0, -0.15, -0.2],
  }
];

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  structures,
  selectedStructure,
  onSelectStructure,
  activeSystems,
  systemOpacities,
  namingMode,
  explosionFactor,
  clippingPlane,
  clippingOffset,
  clinicalPosture,
  homeostasis,
  timeScale,
  onUpdateLabels,
  onKinematicTick,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const meshesMapRef = useRef<Map<string, THREE.Object3D>>(new Map());
  const bodyRootRef = useRef<THREE.Group | null>(null);
  const bloodParticlesRef = useRef<THREE.Points | null>(null);
  const nerveParticlesRef = useRef<THREE.Points | null>(null);
  const hormoneParticlesRef = useRef<THREE.Points | null>(null);

  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);

  // Smooth camera animation targets
  const cameraTargetPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.15, 2.8));
  const cameraLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.95, 0));
  const isCameraAnimating = useRef<boolean>(false);

  // Clipping planes
  const clipPlanesRef = useRef<{
    sagittal: THREE.Plane;
    coronal: THREE.Plane;
    transverse: THREE.Plane;
  }>({
    sagittal: new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
    coronal: new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    transverse: new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
  });

  const propsRef = useRef({
    structures,
    selectedStructure,
    activeSystems,
    systemOpacities,
    namingMode,
    explosionFactor,
    clippingPlane,
    clippingOffset,
    homeostasis,
    timeScale,
    onUpdateLabels,
    onKinematicTick,
  });

  useEffect(() => {
    propsRef.current = {
      structures,
      selectedStructure,
      activeSystems,
      systemOpacities,
      namingMode,
      explosionFactor,
      clippingPlane,
      clippingOffset,
      homeostasis,
      timeScale,
      onUpdateLabels,
      onKinematicTick,
    };
  });

  // Initialize Three.js Scene and Load Real GLTF Models
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth || window.innerWidth || 800;
    const height = container.clientHeight || window.innerHeight || 600;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06080e);
    sceneRef.current = scene;

    // Subtle atmospheric depth fog
    scene.fog = new THREE.FogExp2(0x06080e, 0.035);

    // Camera with 0.01 near plane for close micro-inspection
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.01, 1000);
    camera.position.set(0, 1.15, 2.8);
    cameraRef.current = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.localClippingEnabled = true;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 0.95, 0); // Focus at anatomical center of body
    controls.maxDistance = 15;
    controls.minDistance = 0.05;
    controls.zoomSpeed = 1.3;
    controls.rotateSpeed = 0.85;
    controlsRef.current = controls;

    // Comprehensive Surgical Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0e7ff, 1.0);
    fillLight.position.set(-4, 4, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x0284c7, 2.2, 30);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    const floorLight = new THREE.DirectionalLight(0x1e293b, 0.5);
    floorLight.position.set(0, -3, 2);
    scene.add(floorLight);

    // Floor Pedestal Grid
    const gridHelper = new THREE.GridHelper(10, 40, 0x0284c7, 0x1e293b);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Body Root Group
    const bodyRoot = new THREE.Group();
    bodyRoot.position.set(0, 0, 0);
    scene.add(bodyRoot);
    bodyRootRef.current = bodyRoot;

    // Particle Streams
    const bloodPoints = createBloodStreamParticles();
    bodyRoot.add(bloodPoints);
    bloodParticlesRef.current = bloodPoints;

    const nervePoints = createNerveImpulseParticles();
    bodyRoot.add(nervePoints);
    nerveParticlesRef.current = nervePoints;

    const hormonePoints = createHormoneParticles();
    bodyRoot.add(hormonePoints);
    hormoneParticlesRef.current = hormonePoints;

    // Load Real Medical 3D Models
    const gltfLoader = new GLTFLoader();
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);

    let loadedCount = 0;
    REAL_MODELS.forEach((cfg) => {
      gltfLoader.load(
        cfg.url,
        (gltf) => {
          const model = gltf.scene;
          model.userData.structureId = cfg.id;
          model.userData.system = cfg.system;
          model.userData.explodeVector = cfg.explodeVector;

          // Apply authentic biological materials
          model.traverse((child) => {
            const mesh = child as THREE.Mesh;
            if (mesh.isMesh) {
              mesh.userData.structureId = cfg.id;
              if (cfg.isTransparent) {
                mesh.material = new THREE.MeshPhysicalMaterial({
                  color: cfg.defaultColor,
                  transparent: true,
                  opacity: cfg.baseOpacity ?? 0.15,
                  roughness: cfg.roughness,
                  metalness: 0.1,
                  transmission: 0.8,
                  side: THREE.DoubleSide,
                  depthWrite: false,
                });
              } else {
                mesh.material = new THREE.MeshStandardMaterial({
                  color: cfg.defaultColor,
                  roughness: cfg.roughness,
                  metalness: 0.05,
                  side: THREE.DoubleSide,
                });
              }
            }
          });

          bodyRoot.add(model);
          meshesMapRef.current.set(cfg.id, model);

          loadedCount++;
          setLoadProgress(Math.round((loadedCount / REAL_MODELS.length) * 100));
          if (loadedCount === REAL_MODELS.length) {
            setModelsLoaded(true);
          }
        },
        undefined,
        (err) => {
          console.warn('Could not load mesh:', cfg.url, err);
        }
      );
    });

    // Handle Resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      if (w === 0 || h === 0) return;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Raycaster for structure interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes: THREE.Object3D[] = [];
      meshesMapRef.current.forEach((mesh) => {
        if (mesh.visible) meshes.push(mesh);
      });

      const intersects = raycaster.intersectObjects(meshes, true);
      if (intersects.length > 0) {
        let topObj = intersects[0].object;
        while (topObj.parent && topObj.parent !== bodyRoot && !topObj.userData.structureId) {
          topObj = topObj.parent;
        }
        const sId = topObj.userData.structureId;
        if (sId) {
          const match = propsRef.current.structures.find((s) => s.id === sId);
          if (match) {
            onSelectStructure(match);
          }
        }
      }
    };
    renderer.domElement.addEventListener('click', handlePointerDown);

    // Double-click to smoothly zoom directly into any real 3D anatomical organ
    const handleDoubleClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes: THREE.Object3D[] = [];
      meshesMapRef.current.forEach((mesh) => {
        if (mesh.visible) meshes.push(mesh);
      });

      const intersects = raycaster.intersectObjects(meshes, true);
      if (intersects.length > 0) {
        const point = intersects[0].point;
        cameraLookAt.current.copy(point);
        cameraTargetPos.current.set(point.x + 0.1, point.y + 0.05, point.z + 0.4);
        isCameraAnimating.current = true;
      }
    };
    renderer.domElement.addEventListener('dblclick', handleDoubleClick);

    // High precision timer
    const startTime = performance.now();
    let animId: number;
    let lastTickTime = 0;
    let lastLabelTime = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;
      const { timeScale, homeostasis } = propsRef.current;

      // Smooth camera interpolation for cinematic zoom-in effect
      if (isCameraAnimating.current) {
        camera.position.lerp(cameraTargetPos.current, 0.06);
        controls.target.lerp(cameraLookAt.current, 0.06);
        if (camera.position.distanceTo(cameraTargetPos.current) < 0.01) {
          isCameraAnimating.current = false;
        }
      }

      controls.update();

      // Kinematic calculations
      const baseHr = 75;
      const tempFactor = 1 + (homeostasis.coreTemperature - 36.8) * 0.08;
      const baroFactor = 1 - (homeostasis.meanArterialPressure - 93) * 0.005;
      const liveHr = Math.max(40, Math.min(180, baseHr * tempFactor * baroFactor));
      const cardiacFreq = (liveHr / 60) * timeScale;
      const cardiacPhase = (elapsedTime * cardiacFreq) % 1;

      const baseResp = 15;
      const acidVentFactor = 1 + Math.max(0, 7.4 - homeostasis.arterialPh) * 4.0;
      const liveResp = Math.max(8, Math.min(45, baseResp * acidVentFactor));
      const respFreq = (liveResp / 60) * timeScale;
      const respiratoryPhase = (elapsedTime * respFreq) % 1;

      let ecg = 0;
      if (cardiacPhase < 0.15) {
        ecg = Math.sin((cardiacPhase / 0.15) * Math.PI) * 0.2;
      } else if (cardiacPhase > 0.2 && cardiacPhase < 0.24) {
        ecg = -0.15 * Math.sin(((cardiacPhase - 0.2) / 0.04) * Math.PI);
      } else if (cardiacPhase >= 0.24 && cardiacPhase < 0.32) {
        ecg = 1.0 * Math.sin(((cardiacPhase - 0.24) / 0.08) * Math.PI);
      } else if (cardiacPhase >= 0.32 && cardiacPhase < 0.36) {
        ecg = -0.3 * Math.sin(((cardiacPhase - 0.32) / 0.04) * Math.PI);
      } else if (cardiacPhase > 0.5 && cardiacPhase < 0.72) {
        ecg = 0.35 * Math.sin(((cardiacPhase - 0.5) / 0.22) * Math.PI);
      }

      const liveGfr = Math.max(20, Math.min(160, 125 * (homeostasis.meanArterialPressure / 93)));

      if (elapsedTime - lastTickTime > 0.1) {
        lastTickTime = elapsedTime;
        propsRef.current.onKinematicTick({
          cardiacPhase,
          respiratoryPhase,
          ecgValue: ecg,
          bpValue: homeostasis.meanArterialPressure + (ecg > 0.5 ? 25 : -10),
          gfrLive: liveGfr,
        });
      }

      // Animate Real Biological Meshes (Opacity, Explosion, Kinematic Deformation)
      animateRealMeshes(
        meshesMapRef.current,
        propsRef.current,
        cardiacPhase,
        respiratoryPhase
      );

      // Animate particle streams
      animateParticles(
        bloodParticlesRef.current,
        nerveParticlesRef.current,
        hormoneParticlesRef.current,
        elapsedTime,
        timeScale
      );

      if (elapsedTime - lastLabelTime > 0.05) {
        lastLabelTime = elapsedTime;
        projectLeaderLines(camera, renderer.domElement, propsRef.current);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('click', handlePointerDown);
      renderer.domElement.removeEventListener('dblclick', handleDoubleClick);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Clipping Planes
  useEffect(() => {
    if (!rendererRef.current) return;
    const planes = clipPlanesRef.current;
    if (clippingPlane === 'sagittal') {
      planes.sagittal.constant = clippingOffset;
      rendererRef.current.clippingPlanes = [planes.sagittal];
    } else if (clippingPlane === 'coronal') {
      planes.coronal.constant = clippingOffset + 0.05;
      rendererRef.current.clippingPlanes = [planes.coronal];
    } else if (clippingPlane === 'transverse') {
      planes.transverse.constant = clippingOffset + 0.95;
      rendererRef.current.clippingPlanes = [planes.transverse];
    } else {
      rendererRef.current.clippingPlanes = [];
    }
  }, [clippingPlane, clippingOffset]);

  // Update Clinical Posture
  useEffect(() => {
    if (!bodyRootRef.current) return;
    const postureData = CLINICAL_POSTURES_DATA[clinicalPosture] || CLINICAL_POSTURES_DATA.anatomical;
    const targetGroup = bodyRootRef.current;

    targetGroup.rotation.set(...postureData.rotation);
    targetGroup.position.set(...postureData.position);
  }, [clinicalPosture]);

  // Smooth cinematic fly-to when an anatomical structure is selected or searched
  useEffect(() => {
    if (!selectedStructure) return;
    const [tx, ty, tz] = selectedStructure.position;
    cameraLookAt.current.set(tx, ty, tz);
    cameraTargetPos.current.set(tx + 0.12, ty + 0.05, tz + 0.45);
    isCameraAnimating.current = true;
  }, [selectedStructure]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Dedicated Three.js canvas container - Pure imperative DOM */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Loading Progress Overlay */}
      {!modelsLoaded && (
        <div className="absolute inset-0 z-40 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center gap-3 select-none">
          <div className="w-12 h-12 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
          <div className="text-sm font-bold text-white font-mono tracking-wider">
            STREAMING CLINICAL 3D ANATOMY ATLAS ({loadProgress}%)
          </div>
          <div className="text-xs text-sky-400 font-mono">
            BodyParts3D Medical Geometry Engine • Terminologia Anatomica
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== REAL MESHES ANIMATION & HIGHLIGHT ====================
function animateRealMeshes(
  meshesMap: Map<string, THREE.Object3D>,
  props: {
    selectedStructure: AnatomicalStructure | null;
    activeSystems: Record<OrganSystemId, boolean>;
    systemOpacities: Record<OrganSystemId, number>;
    explosionFactor: number;
  },
  cardiacPhase: number,
  respiratoryPhase: number
) {
  const { selectedStructure, activeSystems, systemOpacities, explosionFactor } = props;

  const cardiacPulse = 1 + (cardiacPhase < 0.3 ? 0.04 * Math.sin((cardiacPhase / 0.3) * Math.PI) : -0.02);
  const respExpansion = 1 + 0.05 * Math.sin(respiratoryPhase * Math.PI * 2);

  REAL_MODELS.forEach((cfg) => {
    const model = meshesMap.get(cfg.id);
    if (!model) return;

    const isSystemActive = activeSystems[cfg.system];
    model.visible = isSystemActive;
    if (!isSystemActive) return;

    const sysOpacity = systemOpacities[cfg.system] ?? 1.0;
    const isSelected = selectedStructure && selectedStructure.id === cfg.id;

    model.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        const mat = mesh.material as any;
        if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
          if (cfg.isTransparent) {
            mat.opacity = (cfg.baseOpacity ?? 0.15) * sysOpacity;
          } else {
            mat.transparent = sysOpacity < 0.99;
            mat.opacity = sysOpacity;
          }

          if (isSelected) {
            mat.emissive.set(0x38bdf8);
            mat.emissiveIntensity = 0.8;
          } else {
            mat.emissive.set(0x000000);
            mat.emissiveIntensity = 0;
          }
        }
      }
    });

    // Explosion Translation along anatomical vectors
    if (cfg.explodeVector) {
      const [ex, ey, ez] = cfg.explodeVector;
      model.position.set(
        ex * explosionFactor * 0.7,
        ey * explosionFactor * 0.7,
        ez * explosionFactor * 0.7
      );
    }

    // Kinematic deformation for cardiovascular system
    if (cfg.id.startsWith('crd')) {
      model.scale.set(cardiacPulse, cardiacPulse, cardiacPulse);
    }

    // Kinematic deformation for respiratory system
    if (cfg.id.startsWith('rsp')) {
      model.scale.set(respExpansion, respExpansion, respExpansion);
    }
  });
}

// ==================== PARTICLE SYSTEMS ====================
function createBloodStreamParticles(): THREE.Points {
  const count = 500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const arterialColor = new THREE.Color(0xef4444);
  const venousColor = new THREE.Color(0x2563eb);

  for (let i = 0; i < count; i++) {
    const isArterial = i % 2 === 0;
    const t = (i / count) * Math.PI * 2;
    positions[i * 3] = Math.sin(t) * 0.18;
    positions[i * 3 + 1] = 1.05 + Math.cos(t) * 0.55;
    positions[i * 3 + 2] = 0.05 + (Math.random() - 0.5) * 0.12;

    const col = isArterial ? arterialColor : venousColor;
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.018,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geo, mat);
}

function createNerveImpulseParticles(): THREE.Points {
  const count = 250;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const cyan = new THREE.Color(0x38bdf8);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.08;
    positions[i * 3 + 1] = 1.65 - (i / count) * 1.4;
    positions[i * 3 + 2] = 0.01 + (Math.random() - 0.5) * 0.04;

    colors[i * 3] = cyan.r;
    colors[i * 3 + 1] = cyan.g;
    colors[i * 3 + 2] = cyan.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.016,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geo, mat);
}

function createHormoneParticles(): THREE.Points {
  const count = 180;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const purple = new THREE.Color(0xa855f7);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.28;
    positions[i * 3 + 1] = 0.8 + Math.random() * 0.9;
    positions[i * 3 + 2] = 0.05 + (Math.random() - 0.5) * 0.16;

    colors[i * 3] = purple.r;
    colors[i * 3 + 1] = purple.g;
    colors[i * 3 + 2] = purple.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.015,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geo, mat);
}

function animateParticles(
  blood: THREE.Points | null,
  nerves: THREE.Points | null,
  hormones: THREE.Points | null,
  elapsedTime: number,
  timeScale: number
) {
  const speed = elapsedTime * 1.5 * timeScale;

  if (blood) {
    const pos = blood.geometry.attributes.position.array as Float32Array;
    const count = pos.length / 3;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= 0.004 * timeScale;
      if (pos[i * 3 + 1] < 0.45) {
        pos[i * 3 + 1] = 1.6;
      }
    }
    blood.geometry.attributes.position.needsUpdate = true;
  }

  if (nerves) {
    const pos = nerves.geometry.attributes.position.array as Float32Array;
    const count = pos.length / 3;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= 0.012 * timeScale;
      if (pos[i * 3 + 1] < 0.3) {
        pos[i * 3 + 1] = 1.65;
      }
    }
    nerves.geometry.attributes.position.needsUpdate = true;
  }

  if (hormones) {
    hormones.rotation.y = speed * 0.2;
  }
}

// ==================== 3D TO 2D LEADER-LINE PROJECTION ====================
const tempVec = new THREE.Vector3();

function projectLeaderLines(
  camera: THREE.PerspectiveCamera,
  canvas: HTMLCanvasElement,
  props: {
    structures: AnatomicalStructure[];
    activeSystems: Record<OrganSystemId, boolean>;
    namingMode: NamingMode;
    onUpdateLabels: (pins: Array<{
      id: string;
      structure: AnatomicalStructure;
      x: number;
      y: number;
      distance: number;
      visible: boolean;
    }>) => void;
  }
) {
  const { structures, activeSystems, namingMode, onUpdateLabels } = props;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || window.innerWidth;
  const height = rect.height || window.innerHeight;

  const labels: Array<{
    id: string;
    structure: AnatomicalStructure;
    x: number;
    y: number;
    distance: number;
    visible: boolean;
  }> = [];

  const cameraDist = camera.position.length();
  let maxPins = 8;
  if (namingMode === 'exploded') maxPins = 18;
  else if (namingMode === 'osce') maxPins = 6;
  else if (cameraDist < 1.6) maxPins = 14;

  structures.forEach((structure) => {
    if (!activeSystems[structure.system]) return;

    tempVec.set(...structure.position);
    const distance = camera.position.distanceTo(tempVec);

    tempVec.project(camera);

    if (tempVec.z > 1.0) return;

    const screenX = ((tempVec.x + 1) / 2) * width;
    const screenY = ((-tempVec.y + 1) / 2) * height;

    const inBounds = screenX >= 20 && screenX <= width - 20 && screenY >= 20 && screenY <= height - 20;

    labels.push({
      id: structure.id,
      structure,
      x: screenX,
      y: screenY,
      distance,
      visible: inBounds,
    });
  });

  labels.sort((a, b) => a.distance - b.distance);
  const activePins = labels.slice(0, maxPins);

  onUpdateLabels(activePins);
}
