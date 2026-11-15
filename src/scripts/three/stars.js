import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

/**
 * Procedural Milky Way, Layered Starfields, Cursor Parallax,
 * and Official NASA Voyager 1 Spacecraft Integration.
 * 
 * Features:
 * - Ultra-deep midnight cosmic void background (#020409).
 * - Multi-layer starfields with independent depth and parallax responsiveness.
 * - Subtle, realistic Milky Way galactic band with soft blue/violet cosmic dust.
 * - Distant, faint celestial silhouette (crescent planet in upper periphery).
 * - Official NASA Voyager 1 3D Spacecraft model on the right hero column.
 * - Gentle floating oscillation & subtle damped cursor deflection.
 * - Single WebGL context & single render loop for maximum performance.
 * - Full support for prefers-reduced-motion and fallback handling.
 */

export function initStarfield(canvasId = 'bg-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.warn(`[Three.js] Canvas #${canvasId} not found.`);
    return null;
  }

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scene Setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020409, 0.0006);

  const camera = new THREE.PerspectiveCamera(
    52,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  );
  camera.position.z = 750;

  // WebGL Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Groups for Independent Parallax Layers
  const deepFieldGroup = new THREE.Group();   // Zero cursor response, slow ambient drift
  const galaxyGroup = new THREE.Group();      // Milky Way dust & galactic core, minimal parallax
  const midgroundGroup = new THREE.Group();   // Gentle parallax
  const foregroundGroup = new THREE.Group();  // Nearby stars, subtle responsive parallax
  const celestialGroup = new THREE.Group();   // Distant planet silhouette
  const meteorGroup = new THREE.Group();      // Dedicated Meteor / Shooting-Star System
  const blackHoleGroup = new THREE.Group();   // Dedicated Black Hole with Rotating Accretion Ring
  const spacecraftGroup = new THREE.Group();  // Voyager 1 Spacecraft 3D model

  scene.add(deepFieldGroup);
  scene.add(galaxyGroup);
  scene.add(midgroundGroup);
  scene.add(foregroundGroup);
  scene.add(celestialGroup);
  scene.add(meteorGroup);
  scene.add(blackHoleGroup);
  scene.add(spacecraftGroup);

  // Group for Page 04 — Receding Earth (Pale Blue Dot Perspective)
  const earthGroup = new THREE.Group();
  earthGroup.visible = false;
  scene.add(earthGroup);

  // Distant Small Earth Crescent Canvas
  const earthCanvas = document.createElement('canvas');
  earthCanvas.width = 64;
  earthCanvas.height = 64;
  const eCtx = earthCanvas.getContext('2d');
  eCtx.clearRect(0, 0, 64, 64);
  
  // Dark side of Earth
  eCtx.beginPath();
  eCtx.arc(32, 32, 20, 0, Math.PI * 2);
  eCtx.fillStyle = 'rgba(8, 18, 38, 0.95)';
  eCtx.fill();

  // Delicate blue-white crescent atmospheric rim
  eCtx.beginPath();
  eCtx.arc(32, 32, 20, -Math.PI * 0.45, Math.PI * 0.25);
  eCtx.lineWidth = 2.4;
  eCtx.strokeStyle = 'rgba(147, 197, 253, 0.9)';
  eCtx.stroke();

  // Subtle outer atmospheric glow
  const earthGrad = eCtx.createRadialGradient(42, 22, 2, 32, 32, 24);
  earthGrad.addColorStop(0, 'rgba(186, 230, 253, 0.6)');
  earthGrad.addColorStop(0.35, 'rgba(56, 189, 248, 0.25)');
  earthGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  eCtx.fillStyle = earthGrad;
  eCtx.fillRect(0, 0, 64, 64);

  const earthTexture = new THREE.CanvasTexture(earthCanvas);
  const earthMaterial = new THREE.SpriteMaterial({
    map: earthTexture,
    transparent: true,
    opacity: 0.85,
    depthWrite: false
  });
  const earthSprite = new THREE.Sprite(earthMaterial);
  // Placed very small and distant in deep space
  earthSprite.position.set(-280, 150, -420);
  earthSprite.scale.set(48, 48, 1);
  earthGroup.add(earthSprite);

  // --------------------------------------------------------------------------
  // LIGHTING FOR 3D VOYAGER 1 SPACECRAFT
  // --------------------------------------------------------------------------
  // Key Sunlight (harsh deep-space sunlight illuminating HGA and bus)
  const sunLight = new THREE.DirectionalLight(0xfff7ed, 3.2);
  sunLight.position.set(-320, 380, 520);
  scene.add(sunLight);

  // Deep Space Rim Light (warm golden rim light on spacecraft edge)
  const rimLight = new THREE.DirectionalLight(0xf59e0b, 2.4);
  rimLight.position.set(450, -220, -180);
  scene.add(rimLight);

  // Secondary Starlight Fill (illuminates bus bays and Golden Record side)
  const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
  fillLight.position.set(220, 320, -250);
  scene.add(fillLight);

  // Balanced ambient fill (prevents pure black shadows on unlit spacecraft facets)
  const ambientLight = new THREE.AmbientLight(0x1c2738, 1.5);
  scene.add(ambientLight);

  // Helper: Create Soft Radial Sprite Texture
  function createSoftParticleTexture(size = 64, innerColor = 'rgba(255,255,255,1)', midColor = 'rgba(200,225,255,0.4)', outerColor = 'rgba(0,0,0,0)') {
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d');
    const center = size / 2;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, innerColor);
    gradient.addColorStop(0.25, midColor);
    gradient.addColorStop(0.7, 'rgba(30,50,90,0.08)');
    gradient.addColorStop(1, outerColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }

  // Helper: Create Ultra-Soft Nebula Cloud Texture
  function createNebulaTexture() {
    const c = document.createElement('canvas');
    c.width = 128;
    c.height = 128;
    const ctx = c.getContext('2d');
    const center = 64;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, 64);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(0.35, 'rgba(180, 205, 255, 0.35)');
    gradient.addColorStop(0.65, 'rgba(100, 130, 210, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }

  const starTexture = createSoftParticleTexture(48);
  const glowStarTexture = createSoftParticleTexture(64, 'rgba(255,255,255,1)', 'rgba(220,240,255,0.7)', 'rgba(0,0,0,0)');
  const nebulaTexture = createNebulaTexture();

  // --------------------------------------------------------------------------
  // 1. DEEP FIELD STARS (Faint background, 1,500 stars, zero cursor displacement)
  // --------------------------------------------------------------------------
  const deepCount = 1500;
  const deepPositions = new Float32Array(deepCount * 3);
  const deepColors = new Float32Array(deepCount * 3);

  const deepPalette = [
    new THREE.Color(0xdce7ff),
    new THREE.Color(0xffffff),
    new THREE.Color(0xb0c4de),
    new THREE.Color(0xc4b5fd),
    new THREE.Color(0xfef3c7)
  ];

  for (let i = 0; i < deepCount; i++) {
    const i3 = i * 3;
    const radius = 600 + Math.random() * 1200;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    deepPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    deepPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    deepPositions[i3 + 2] = radius * Math.cos(phi) - 200;

    const col = deepPalette[Math.floor(Math.random() * deepPalette.length)];
    const dimFactor = 0.58 + Math.random() * 0.42;
    deepColors[i3] = col.r * dimFactor;
    deepColors[i3 + 1] = col.g * dimFactor;
    deepColors[i3 + 2] = col.b * dimFactor;
  }

  const deepGeometry = new THREE.BufferGeometry();
  deepGeometry.setAttribute('position', new THREE.BufferAttribute(deepPositions, 3));
  deepGeometry.setAttribute('color', new THREE.BufferAttribute(deepColors, 3));

  const deepMaterial = new THREE.PointsMaterial({
    size: 2.6,
    vertexColors: true,
    map: starTexture,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const deepStars = new THREE.Points(deepGeometry, deepMaterial);
  deepFieldGroup.add(deepStars);

  // --------------------------------------------------------------------------
  // 2. MILKY WAY GALACTIC BAND & SUBTLE NEBULA CLOUDS
  // --------------------------------------------------------------------------
  const mwStarCount = 900;
  const mwPositions = new Float32Array(mwStarCount * 3);
  const mwColors = new Float32Array(mwStarCount * 3);

  const mwPalette = [
    new THREE.Color(0x93c5fd), // soft icy blue
    new THREE.Color(0xa78bfa), // gentle violet
    new THREE.Color(0xc4b5fd), // lavender
    new THREE.Color(0xe0e7ff), // pale starlight
    new THREE.Color(0x67e8f9)  // faint cyan starlight
  ];

  const angle = 0.55;
  for (let i = 0; i < mwStarCount; i++) {
    const i3 = i * 3;
    const t = (Math.random() - 0.5) * 1600;
    const spread = (Math.random() + Math.random() + Math.random() - 1.5) * 260;
    const depth = (Math.random() - 0.5) * 500 - 150;

    const rawX = t * Math.cos(angle) - spread * Math.sin(angle);
    const rawY = t * Math.sin(angle) + spread * Math.cos(angle);

    // Keep central text region clear
    const distFromCenter = Math.sqrt(rawX * rawX + rawY * rawY);
    const offset = distFromCenter < 220 ? (Math.random() > 0.5 ? 160 : -160) : 0;

    mwPositions[i3] = rawX + (Math.abs(rawX) > 10 ? offset : 0);
    mwPositions[i3 + 1] = rawY;
    mwPositions[i3 + 2] = depth;

    const col = mwPalette[Math.floor(Math.random() * mwPalette.length)];
    const brightness = 0.55 + Math.random() * 0.45;
    mwColors[i3] = col.r * brightness;
    mwColors[i3 + 1] = col.g * brightness;
    mwColors[i3 + 2] = col.b * brightness;
  }

  const mwGeometry = new THREE.BufferGeometry();
  mwGeometry.setAttribute('position', new THREE.BufferAttribute(mwPositions, 3));
  mwGeometry.setAttribute('color', new THREE.BufferAttribute(mwColors, 3));

  const mwMaterial = new THREE.PointsMaterial({
    size: 2.6,
    vertexColors: true,
    map: starTexture,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const mwStars = new THREE.Points(mwGeometry, mwMaterial);
  galaxyGroup.add(mwStars);

  // Soft Nebula Dust Clouds
  const cloudCount = 70;
  const cloudPositions = new Float32Array(cloudCount * 3);
  const cloudColors = new Float32Array(cloudCount * 3);

  const nebulaTones = [
    new THREE.Color(0x1e295d), // midnight navy
    new THREE.Color(0x281c52), // faint violet
    new THREE.Color(0x192742), // cobalt haze
    new THREE.Color(0x31245c), // ethereal muted purple
    new THREE.Color(0x0e2f44)  // deep space cyan
  ];

  for (let c = 0; c < cloudCount; c++) {
    const c3 = c * 3;
    const t = (Math.random() - 0.5) * 1400;
    const spread = (Math.random() + Math.random() - 1) * 320;

    const rawX = t * Math.cos(angle) - spread * Math.sin(angle);
    const rawY = t * Math.sin(angle) + spread * Math.cos(angle);

    cloudPositions[c3] = rawX;
    cloudPositions[c3 + 1] = rawY;
    cloudPositions[c3 + 2] = (Math.random() - 0.5) * 400 - 200;

    const tone = nebulaTones[Math.floor(Math.random() * nebulaTones.length)];
    cloudColors[c3] = tone.r;
    cloudColors[c3 + 1] = tone.g;
    cloudColors[c3 + 2] = tone.b;
  }

  const cloudGeometry = new THREE.BufferGeometry();
  cloudGeometry.setAttribute('position', new THREE.BufferAttribute(cloudPositions, 3));
  cloudGeometry.setAttribute('color', new THREE.BufferAttribute(cloudColors, 3));

  const cloudMaterial = new THREE.PointsMaterial({
    size: 110,
    vertexColors: true,
    map: nebulaTexture,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const nebulaClouds = new THREE.Points(cloudGeometry, cloudMaterial);
  galaxyGroup.add(nebulaClouds);

  // --------------------------------------------------------------------------
  // 3. MIDGROUND & FOREGROUND STARS
  // --------------------------------------------------------------------------
  const midCount = 600;
  const midPositions = new Float32Array(midCount * 3);
  const midColors = new Float32Array(midCount * 3);

  for (let m = 0; m < midCount; m++) {
    const m3 = m * 3;
    midPositions[m3] = (Math.random() - 0.5) * 1600;
    midPositions[m3 + 1] = (Math.random() - 0.5) * 1100;
    midPositions[m3 + 2] = (Math.random() - 0.5) * 600;

    const col = deepPalette[Math.floor(Math.random() * deepPalette.length)];
    const b = 0.68 + Math.random() * 0.32;
    midColors[m3] = col.r * b;
    midColors[m3 + 1] = col.g * b;
    midColors[m3 + 2] = col.b * b;
  }

  const midGeometry = new THREE.BufferGeometry();
  midGeometry.setAttribute('position', new THREE.BufferAttribute(midPositions, 3));
  midGeometry.setAttribute('color', new THREE.BufferAttribute(midColors, 3));

  const midMaterial = new THREE.PointsMaterial({
    size: 3.2,
    vertexColors: true,
    map: starTexture,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const midStars = new THREE.Points(midGeometry, midMaterial);
  midgroundGroup.add(midStars);

  const foreCount = 80;
  const forePositions = new Float32Array(foreCount * 3);
  const foreColors = new Float32Array(foreCount * 3);
  const forePalette = [
    new THREE.Color(0xffffff),
    new THREE.Color(0xbfdbfe),
    new THREE.Color(0xfef08a),
    new THREE.Color(0xa7f3d0)
  ];

  for (let f = 0; f < foreCount; f++) {
    const f3 = f * 3;
    forePositions[f3] = (Math.random() - 0.5) * 1500;
    forePositions[f3 + 1] = (Math.random() - 0.5) * 950;
    forePositions[f3 + 2] = 200 + (Math.random() - 0.5) * 350;

    const col = forePalette[Math.floor(Math.random() * forePalette.length)];
    foreColors[f3] = col.r;
    foreColors[f3 + 1] = col.g;
    foreColors[f3 + 2] = col.b;
  }

  const foreGeometry = new THREE.BufferGeometry();
  foreGeometry.setAttribute('position', new THREE.BufferAttribute(forePositions, 3));
  foreGeometry.setAttribute('color', new THREE.BufferAttribute(foreColors, 3));

  const foreMaterial = new THREE.PointsMaterial({
    size: 4.5,
    vertexColors: true,
    map: glowStarTexture,
    transparent: true,
    opacity: 0.98,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const foreStars = new THREE.Points(foreGeometry, foreMaterial);
  foregroundGroup.add(foreStars);

  // --------------------------------------------------------------------------
  // 4. DISTANT CELESTIAL SILHOUETTE (Upper Periphery)
  // --------------------------------------------------------------------------
  const planetCanvas = document.createElement('canvas');
  planetCanvas.width = 128;
  planetCanvas.height = 128;
  const pCtx = planetCanvas.getContext('2d');
  pCtx.clearRect(0, 0, 128, 128);

  pCtx.beginPath();
  pCtx.arc(64, 64, 48, 0, Math.PI * 2);
  pCtx.fillStyle = 'rgba(7, 10, 18, 0.92)';
  pCtx.fill();

  pCtx.save();
  pCtx.beginPath();
  pCtx.arc(64, 64, 48, 0, Math.PI * 2);
  pCtx.clip();
  const crescentGrad = pCtx.createRadialGradient(88, 40, 6, 64, 64, 48);
  crescentGrad.addColorStop(0, 'rgba(235, 225, 200, 0.45)');
  crescentGrad.addColorStop(0.35, 'rgba(140, 175, 220, 0.22)');
  crescentGrad.addColorStop(0.7, 'rgba(50, 70, 120, 0.08)');
  crescentGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  pCtx.fillStyle = crescentGrad;
  pCtx.fillRect(0, 0, 128, 128);
  pCtx.restore();

  pCtx.beginPath();
  pCtx.arc(64, 64, 49, -Math.PI * 0.45, Math.PI * 0.25);
  pCtx.lineWidth = 1.8;
  pCtx.strokeStyle = 'rgba(210, 230, 255, 0.35)';
  pCtx.stroke();

  const planetTexture = new THREE.CanvasTexture(planetCanvas);
  const planetMaterial = new THREE.SpriteMaterial({
    map: planetTexture,
    transparent: true,
    opacity: 0.65,
    depthWrite: false
  });

  const planetSprite = new THREE.Sprite(planetMaterial);
  planetSprite.position.set(480, 270, -250);
  planetSprite.scale.set(130, 130, 1);
  celestialGroup.add(planetSprite);

  // --------------------------------------------------------------------------
  // 4B. METEOR / SHOOTING-STAR SYSTEM (Single Active Meteor, Every 30-60s)
  // --------------------------------------------------------------------------
  // Exactly ONE meteor at a time. Behind page content and spacecraft.
  // Random directions: left-to-right, right-to-left, diagonal.
  const meteorGeom = new THREE.BufferGeometry();
  const meteorPositions = new Float32Array(6); // 2 vertices: head and tail
  meteorGeom.setAttribute('position', new THREE.BufferAttribute(meteorPositions, 3));

  const meteorLineMat = new THREE.LineBasicMaterial({
    color: 0xbae6fd,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const meteorLine = new THREE.Line(meteorGeom, meteorLineMat);
  meteorGroup.add(meteorLine);

  const meteorHeadMat = new THREE.SpriteMaterial({
    map: glowStarTexture,
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const meteorHeadSprite = new THREE.Sprite(meteorHeadMat);
  meteorHeadSprite.scale.set(16, 16, 1);
  meteorGroup.add(meteorHeadSprite);

  let meteorActive = false;
  let meteorStartTime = 0;
  let meteorDuration = 1.4;
  let nextMeteorSpawn = 20 + Math.random() * 25; // First meteor arrives within 20-45s
  const meteorStart = new THREE.Vector3();
  const meteorEnd = new THREE.Vector3();
  const meteorCurrentHead = new THREE.Vector3();
  const meteorCurrentTail = new THREE.Vector3();

  // --------------------------------------------------------------------------
  // 4C. BLACK HOLE WITH ROTATING ACCRETION RING (2 min ON, 5 min OFF Cycle)
  // --------------------------------------------------------------------------
  // Small, visually distinct, safe visual distance from Voyager 1 & Milky Way.
  // Positioned slightly to the right of Milky Way and lower: (560, -160, -320).
  // Total cycle: 7 minutes (420s). Exactly 2 min visible, 5 min hidden.
  // Global timer uses Date.now() so page navigation does not reset it.
  function createAccretionTexture() {
    const c = document.createElement('canvas');
    c.width = 128;
    c.height = 128;
    const ctx = c.getContext('2d');
    const center = 64;
    const grad = ctx.createRadialGradient(center, center, 22, center, center, 64);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    grad.addColorStop(0.25, 'rgba(251, 191, 36, 0.85)');
    grad.addColorStop(0.6, 'rgba(245, 158, 11, 0.45)');
    grad.addColorStop(0.88, 'rgba(180, 83, 9, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }

  const accretionTexture = createAccretionTexture();
  const ringGeom = new THREE.RingGeometry(16, 42, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    map: accretionTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const accretionRing = new THREE.Mesh(ringGeom, ringMat);

  const horizonGeom = new THREE.SphereGeometry(14, 32, 32);
  const horizonMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    depthWrite: true
  });
  const eventHorizon = new THREE.Mesh(horizonGeom, horizonMat);

  blackHoleGroup.position.set(560, -160, -320);
  blackHoleGroup.rotation.x = 0.65;
  blackHoleGroup.rotation.y = -0.35;
  blackHoleGroup.add(eventHorizon);
  blackHoleGroup.add(accretionRing);
  blackHoleGroup.visible = false;

  // Position Milky Way primarily on the RIGHT side of the viewport
  galaxyGroup.position.set(360, 20, -320);

  // --------------------------------------------------------------------------
  // 5. OFFICIAL NASA VOYAGER 1 3D SPACECRAFT INTEGRATION
  // --------------------------------------------------------------------------
  let voyagerModel = null;
  let baseVoyagerScale = 1;
  let targetVoyagerX = 200;
  let targetVoyagerY = 12; // Adjusted slightly upward for optimal framing
  let targetVoyagerZ = 180;
  let baseVoyagerRotX = 0.22;
  let baseVoyagerRotY = -0.68;
  let baseVoyagerRotZ = 0.10;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);
  const modelUrl = '/assets/models/voyager-probe-b.glb';

  function setupModel(gltf, sourceName) {
    // Prevent duplicate attachment if called twice
    if (voyagerModel) {
      spacecraftGroup.remove(voyagerModel);
    }
    voyagerModel = gltf.scene;

    // Compute bounding box and center model geometry
    const box = new THREE.Box3().setFromObject(voyagerModel);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    voyagerModel.position.sub(center); // center at (0, 0, 0) inside its group

    // Attach the loaded model to the spacecraftGroup
    spacecraftGroup.add(voyagerModel);

    // Normalize scale: target longest dimension ~440 units in world space for heroic presence
    const maxDim = Math.max(size.x, size.y, size.z);
    baseVoyagerScale = (440 / (maxDim || 35));
    spacecraftGroup.scale.setScalar(baseVoyagerScale);

    // Enhance materials for deep-space PBR realism
    voyagerModel.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.roughness = Math.max(0.35, child.material.roughness || 0.4);
        child.material.metalness = Math.min(0.85, (child.material.metalness || 0.2) + 0.1);
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });

    // Set initial orientation
    spacecraftGroup.rotation.set(baseVoyagerRotX, baseVoyagerRotY, baseVoyagerRotZ);
    spacecraftGroup.position.set(targetVoyagerX, targetVoyagerY, targetVoyagerZ);

    // Successfully loaded: notify UI to hide fallback image
    const renderFrame = document.getElementById('spacecraft-render-frame');
    if (renderFrame) {
      renderFrame.classList.add('model-loaded');
    }

    console.log(`[Three.js] Official NASA Voyager 1 3D model (${sourceName}) loaded successfully.`);
  }

  gltfLoader.load(
    modelUrl,
    (gltf) => {
      setupModel(gltf, 'voyager-probe-b');
    },
    undefined,
    (error) => {
      console.warn('[Three.js] Probe-B load error, attempting standard uncompressed VTAD asset...', error);
      // Fallback to standard uncompressed Voyager model
      gltfLoader.load(
        '/assets/models/voyager-vtad.glb',
        (fallbackGltf) => {
          setupModel(fallbackGltf, 'voyager-vtad');
        },
        undefined,
        (secondError) => {
          console.warn('[Three.js] All 3D model loads failed. Preserving fallback visual.', secondError);
          const fallbackImg = document.getElementById('spacecraft-fallback');
          if (fallbackImg) fallbackImg.style.display = 'block';
          const loader = document.getElementById('spacecraft-loader');
          if (loader) loader.style.display = 'none';
        }
      );
    }
  );

  // --------------------------------------------------------------------------
  // 6. CURSOR PARALLAX, SCROLL TRACKING & DAMPING LOGIC
  // --------------------------------------------------------------------------
  let normMouseX = 0;
  let normMouseY = 0;
  let targetParallaxX = 0;
  let targetParallaxY = 0;
  let currentScrollY = 0;
  let targetScrollY = 0;

  const onMouseMove = (e) => {
    if (prefersReducedMotion) return;
    normMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    normMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  const onScroll = () => {
    targetScrollY = window.scrollY || window.pageYOffset || 0;
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });

  // Responsive Placement on Window Resize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Responsive Spacecraft & Celestial Layout
    const width = window.innerWidth;
    if (width < 768) {
      // Mobile: Spacecraft positioned beneath content in the lower center
      targetVoyagerX = 0;
      targetVoyagerY = -160;
      targetVoyagerZ = 160;
      if (voyagerModel) spacecraftGroup.scale.setScalar(baseVoyagerScale * 0.68);
      planetSprite.position.set(220, 260, -300);
      planetSprite.scale.set(85, 85, 1);
    } else if (width < 1100) {
      // Tablet: Moderate offset to the right (shifted left from edge)
      targetVoyagerX = 135;
      targetVoyagerY = -8;
      targetVoyagerZ = 210;
      if (voyagerModel) spacecraftGroup.scale.setScalar(baseVoyagerScale * 0.82);
      planetSprite.position.set(380, 260, -260);
      planetSprite.scale.set(110, 110, 1);
    } else {
      // Desktop: Shifted leftward away from the screen right edge, slightly elevated
      targetVoyagerX = Math.min(250, 175 + (width - 1100) * 0.08);
      targetVoyagerY = 12;
      targetVoyagerZ = 245;
      if (voyagerModel) spacecraftGroup.scale.setScalar(baseVoyagerScale);
      planetSprite.position.set(480, 270, -250);
      planetSprite.scale.set(130, 130, 1);
    }

    if (!prefersReducedMotion) {
      spacecraftGroup.position.x = targetVoyagerX;
      spacecraftGroup.position.z = targetVoyagerZ;
    }
  };

  window.addEventListener('resize', onResize);
  onResize(); // Initial responsive setup

  // --------------------------------------------------------------------------
  // MANUAL 3D SPACECRAFT ROTATION (DRAG & TOUCH)
  // --------------------------------------------------------------------------
  let manualRotX = 0;
  let manualRotY = 0;
  let isDragging = false;
  let prevPointerX = 0;
  let prevPointerY = 0;

  const renderFrame = document.getElementById('spacecraft-render-frame');
  const hintBadge = document.getElementById('model-rotate-hint');

  const resetManualRotation = () => {
    manualRotX = 0;
    manualRotY = 0;
  };

  if (hintBadge) {
    hintBadge.addEventListener('click', (e) => {
      e.stopPropagation();
      resetManualRotation();
    });
  }

  if (renderFrame) {
    renderFrame.style.cursor = 'grab';
    renderFrame.style.pointerEvents = 'auto';

    renderFrame.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return; // Handled by touch events for fine pinch/scroll control
      if (e.button !== undefined && e.button !== 0) return;
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      renderFrame.style.cursor = 'grabbing';
      try { renderFrame.setPointerCapture(e.pointerId); } catch (err) {}
    });

    renderFrame.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      if (!isDragging) return;
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      manualRotY += deltaX * 0.009;
      manualRotX += deltaY * 0.009;
      // Clamp elevation pitch so the spacecraft doesn't invert
      manualRotX = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, manualRotX));
    });

    const stopDrag = (e) => {
      if (isDragging) {
        isDragging = false;
        renderFrame.style.cursor = 'grab';
        try { if (e && e.pointerId) renderFrame.releasePointerCapture(e.pointerId); } catch (err) {}
      }
    };

    renderFrame.addEventListener('pointerup', stopDrag);
    renderFrame.addEventListener('pointercancel', stopDrag);
    renderFrame.addEventListener('dblclick', resetManualRotation);

    // WP-22: Mobile Touch Gestures (Pinch-to-Zoom & Horizontal Rotation with Scroll Preservation)
    let initialPinchDist = null;
    let initialPinchScale = baseVoyagerScale;

    renderFrame.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDist = Math.hypot(dx, dy);
        initialPinchScale = voyagerModel ? spacecraftGroup.scale.x : baseVoyagerScale;
      } else if (e.touches.length === 1) {
        prevPointerX = e.touches[0].clientX;
        prevPointerY = e.touches[0].clientY;
        isDragging = true;
      }
    }, { passive: true });

    renderFrame.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && initialPinchDist) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDist = Math.hypot(dx, dy);
        const factor = currentDist / initialPinchDist;
        const newScale = Math.max(baseVoyagerScale * 0.45, Math.min(baseVoyagerScale * 2.2, initialPinchScale * factor));
        if (voyagerModel) {
          spacecraftGroup.scale.setScalar(newScale);
        }
        if (e.cancelable) e.preventDefault();
      } else if (e.touches.length === 1 && isDragging) {
        const curX = e.touches[0].clientX;
        const curY = e.touches[0].clientY;
        const deltaX = curX - prevPointerX;
        const deltaY = curY - prevPointerY;
        prevPointerX = curX;
        prevPointerY = curY;

        // If predominantly horizontal, rotate spacecraft and prevent accidental page bounce
        if (Math.abs(deltaX) > Math.abs(deltaY) * 0.7) {
          manualRotY += deltaX * 0.009;
          manualRotX += deltaY * 0.009;
          manualRotX = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, manualRotX));
          if (e.cancelable) e.preventDefault();
        }
      }
    }, { passive: false });

    renderFrame.addEventListener('touchend', (e) => {
      if (e.touches.length < 2) initialPinchDist = null;
      if (e.touches.length === 0) isDragging = false;
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // 6B. ASSEMBLY WORKFLOW 3D COMPONENT HIGHLIGHT ENGINE (WP-11)
  // --------------------------------------------------------------------------
  let activeStageHighlight = null;
  let stageTargetRotX = 0;
  let stageTargetRotY = 0;
  let stageTargetCamZ = 750;
  const baseCamZ = 750;
  const stageHighlightLight = new THREE.PointLight(0xf59e0b, 0, 900);
  scene.add(stageHighlightLight);

  // --------------------------------------------------------------------------
  // 7. ANIMATION LOOP
  // --------------------------------------------------------------------------
  let animationId = null;
  const clock = new THREE.Clock();
  let continuousRotY = 0;

  function animate() {
    animationId = requestAnimationFrame(animate);

    if (!prefersReducedMotion) {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // UI Correction 23: Slow, continuous rotation around spacecraft's vertical axis (gently rotating in space)
      continuousRotY += delta * 0.05;

      // Smooth Stage 3D Camera / Hotspot transition interpolation
      if (activeStageHighlight !== null) {
        manualRotX += (stageTargetRotX - manualRotX) * 0.08;
        manualRotY += (stageTargetRotY - manualRotY) * 0.08;
        camera.position.z += (stageTargetCamZ - camera.position.z) * 0.08;
      } else {
        camera.position.z += (baseCamZ - camera.position.z) * 0.05;
      }

      // Subtle Star Twinkling Across Independent Depths
      deepMaterial.opacity = 0.84 + Math.sin(time * 1.5) * 0.08;
      midMaterial.opacity = 0.88 + Math.cos(time * 2.0) * 0.08;
      foreMaterial.opacity = 0.92 + Math.sin(time * 2.7) * 0.06;

      // Ambient cosmic drift & slow floating Milky Way movement on right side
      deepFieldGroup.rotation.y += delta * 0.002;
      galaxyGroup.rotation.z += delta * 0.0012;

      // ----------------------------------------------------------------------
      // METEOR / SHOOTING-STAR RUNTIME SYSTEM (One at a time, 30-60s interval)
      // ----------------------------------------------------------------------
      if (!meteorActive && time >= nextMeteorSpawn) {
        meteorActive = true;
        meteorStartTime = time;
        meteorDuration = 1.2 + Math.random() * 0.6; // 1.2s to 1.8s smooth streak duration

        // Randomized direction & entry points across upper/side deep space
        const zCoord = -140 - Math.random() * 80;
        const fromLeft = Math.random() > 0.5;
        const startX = fromLeft ? (-600 - Math.random() * 150) : (600 + Math.random() * 150);
        const startY = 220 + Math.random() * 180;
        const endX = fromLeft ? (350 + Math.random() * 300) : (-350 - Math.random() * 300);
        const endY = -120 - Math.random() * 220;

        meteorStart.set(startX, startY, zCoord);
        meteorEnd.set(endX, endY, zCoord);
      }

      if (meteorActive) {
        const elapsed = time - meteorStartTime;
        const progress = elapsed / meteorDuration;

        if (progress >= 1.0) {
          meteorActive = false;
          meteorLineMat.opacity = 0;
          meteorHeadMat.opacity = 0;
          // Spawn next meteor strictly 30 to 60 seconds from now
          nextMeteorSpawn = time + 30 + Math.random() * 30;
        } else {
          // Natural fade envelope (smooth bell curve)
          const alpha = Math.sin(progress * Math.PI);
          meteorLineMat.opacity = Math.min(0.9, alpha * 1.3);
          meteorHeadMat.opacity = Math.min(1.0, alpha * 1.6);

          // Head travels from start to end; tail lags slightly behind
          const headProgress = progress;
          const tailProgress = Math.max(0, progress - 0.25);

          meteorCurrentHead.lerpVectors(meteorStart, meteorEnd, headProgress);
          meteorCurrentTail.lerpVectors(meteorStart, meteorEnd, tailProgress);

          const posAttr = meteorGeom.attributes.position;
          posAttr.setXYZ(0, meteorCurrentHead.x, meteorCurrentHead.y, meteorCurrentHead.z);
          posAttr.setXYZ(1, meteorCurrentTail.x, meteorCurrentTail.y, meteorCurrentTail.z);
          posAttr.needsUpdate = true;

          meteorHeadSprite.position.copy(meteorCurrentHead);
        }
      }

      // ----------------------------------------------------------------------
      // BLACK HOLE SYSTEM (2 min ON, 5 min OFF Wall-Clock Synchronized Cycle)
      // ----------------------------------------------------------------------
      // Total cycle: 420 seconds (7 minutes). 0..120s = VISIBLE, 120..420s = HIDDEN.
      const bhCycleSec = (Date.now() / 1000) % 420;
      if (bhCycleSec < 120) {
        blackHoleGroup.visible = true;
        // Smooth 4s fade in and 4s fade out at cycle boundaries
        let bhAlpha = 1.0;
        if (bhCycleSec < 4) {
          bhAlpha = bhCycleSec / 4;
        } else if (bhCycleSec > 116) {
          bhAlpha = (120 - bhCycleSec) / 4;
        }
        ringMat.opacity = 0.85 * bhAlpha;

        // Gentle, non-flashing accretion rotation
        accretionRing.rotation.z += delta * 0.35;
      } else {
        blackHoleGroup.visible = false;
        ringMat.opacity = 0;
      }

      // Damped Cursor Parallax Easing
      targetParallaxX += (normMouseX - targetParallaxX) * 0.035;
      targetParallaxY += (normMouseY - targetParallaxY) * 0.035;

      // Smooth scroll tracking across all 4 main sections (Home, Invitation, Explore, About)
      currentScrollY += (targetScrollY - currentScrollY) * 0.05;
      const vh = window.innerHeight || 800;
      const scrollFactor = Math.min(3.8, currentScrollY / vh);

      // Background Starfield & Deep Object Parallax
      // Milky Way placed on the right side with slow ambient float
      galaxyGroup.position.x = 360 + targetParallaxX * 8 + Math.cos(time * 0.18) * 6;
      galaxyGroup.position.y = 20 + targetParallaxY * 5 + Math.sin(time * 0.22) * 8;

      blackHoleGroup.position.x = 560 + targetParallaxX * 7;
      blackHoleGroup.position.y = -160 + targetParallaxY * 4;

      midgroundGroup.position.x = targetParallaxX * 16;
      midgroundGroup.position.y = targetParallaxY * 11;

      foregroundGroup.position.x = targetParallaxX * 36;
      foregroundGroup.position.y = targetParallaxY * 24;

      celestialGroup.position.x = targetParallaxX * 6;
      celestialGroup.position.y = targetParallaxY * 4;

      // Gentle Spacecraft Floating Harmonic Motion, Manual Rotation, and Scroll Parallax
      if (voyagerModel) {
        // Vertical scroll parallax (gently shifts and banks as you enter Section 02)
        const scrollOffsetY = -scrollFactor * 90;
        const scrollOffsetZ = -scrollFactor * 45;
        const scrollRotY = scrollFactor * 0.18;

        spacecraftGroup.position.y = targetVoyagerY + Math.sin(time * 0.55) * 7 + scrollOffsetY;
        spacecraftGroup.position.x = targetVoyagerX + Math.cos(time * 0.4) * 4;
        spacecraftGroup.position.z = targetVoyagerZ + scrollOffsetZ;

        // UI Correction 23: Continuous gentle rotation around Y axis combined with manual drag and scroll parallax
        spacecraftGroup.rotation.y = baseVoyagerRotY + continuousRotY + manualRotY + targetParallaxX * 0.09 + scrollRotY;
        spacecraftGroup.rotation.x = baseVoyagerRotX + manualRotX + Math.cos(time * 0.42) * 0.03 - targetParallaxY * 0.06;
        spacecraftGroup.rotation.z = baseVoyagerRotZ + Math.sin(time * 0.3) * 0.02;
      }

      // Camera easing with subtle scroll tilt
      camera.position.x = targetParallaxX * 10;
      camera.position.y = targetParallaxY * 7 - scrollFactor * 80;
      camera.lookAt(0, -scrollFactor * 80, 0);
    } else {
      // prefers-reduced-motion: clean static positioning with manual rotation support
      if (voyagerModel) {
        spacecraftGroup.position.set(targetVoyagerX, targetVoyagerY, targetVoyagerZ);
        spacecraftGroup.rotation.set(baseVoyagerRotX + manualRotX, baseVoyagerRotY + manualRotY, baseVoyagerRotZ);
      }
    }

    renderer.render(scene, camera);
  }

  animate();

  return {
    setPageAtmosphere(pageId) {
      if (pageId === 'home') {
        earthGroup.visible = false;
        celestialGroup.visible = true;
        spacecraftGroup.visible = true;
        sunLight.color.set(0xffffff);
        rimLight.color.set(0xfbbf24);
        scene.fog.color.set(0x020409);
        scene.fog.density = 0.0006;
      } else if (pageId === 'invitation') {
        earthGroup.visible = false;
        celestialGroup.visible = false;
        spacecraftGroup.visible = true;
        // Warm golden/amber illumination for the invitation environment
        sunLight.color.set(0xffedd5);
        rimLight.color.set(0xf59e0b);
        scene.fog.color.set(0x0a0705);
        scene.fog.density = 0.00075;
      } else if (pageId === 'explore') {
        earthGroup.visible = false;
        celestialGroup.visible = true;
        spacecraftGroup.visible = true;
        // Warm golden rim light across deep interstellar space
        sunLight.color.set(0xffffff);
        rimLight.color.set(0xf59e0b);
        scene.fog.color.set(0x030612);
        scene.fog.density = 0.00055;
      } else if (pageId === 'about') {
        // Full scroll continuity: Voyager 1 model remains visible against deep interstellar cosmos
        earthGroup.visible = true;
        celestialGroup.visible = true;
        spacecraftGroup.visible = true;
        sunLight.color.set(0xffffff);
        rimLight.color.set(0x60a5fa);
        scene.fog.color.set(0x010307);
        scene.fog.density = 0.0005;
      }
    },
    highlightAssemblyStage(stageNum) {
      const targets = {
        1: { rotX: 0.15, rotY: -0.4, camZ: 670, lightColor: 0xf59e0b, pos: [0, 0, 50] },
        2: { rotX: -0.45, rotY: -0.6, camZ: 650, lightColor: 0x38bdf8, pos: [0, 90, 0] },
        3: { rotX: 0.1, rotY: 0.85, camZ: 690, lightColor: 0xfbbf24, pos: [-120, 20, 0] },
        4: { rotX: 0.25, rotY: -1.45, camZ: 690, lightColor: 0xa78bfa, pos: [130, 40, 20] },
        5: { rotX: 0.05, rotY: 0.35, camZ: 640, lightColor: 0xf59e0b, pos: [-30, -20, 60] },
        6: { rotX: 0.22, rotY: -0.68, camZ: 750, lightColor: 0x10b981, pos: [0, 0, 0] }
      };
      const t = targets[Number(stageNum)];
      if (!t) return false;
      activeStageHighlight = Number(stageNum);
      stageTargetRotX = t.rotX;
      stageTargetRotY = t.rotY;
      stageTargetCamZ = t.camZ;
      stageHighlightLight.color.set(t.lightColor);
      stageHighlightLight.position.set(t.pos[0] + targetVoyagerX, t.pos[1] + targetVoyagerY, t.pos[2] + targetVoyagerZ);
      stageHighlightLight.intensity = 2.5;
      return true;
    },
    resetAssemblyHighlight() {
      activeStageHighlight = null;
      stageTargetCamZ = baseCamZ;
      stageHighlightLight.intensity = 0;
      resetManualRotation();
    },
    destroy() {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      deepGeometry.dispose();
      deepMaterial.dispose();
      mwGeometry.dispose();
      mwMaterial.dispose();
      cloudGeometry.dispose();
      cloudMaterial.dispose();
      midGeometry.dispose();
      midMaterial.dispose();
      foreGeometry.dispose();
      foreMaterial.dispose();

      starTexture.dispose();
      glowStarTexture.dispose();
      nebulaTexture.dispose();
      planetTexture.dispose();
      planetMaterial.dispose();
      meteorGeom.dispose();
      meteorLineMat.dispose();
      meteorHeadMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      horizonGeom.dispose();
      horizonMat.dispose();
      accretionTexture.dispose();

      if (voyagerModel) {
        voyagerModel.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else if (child.material) {
              child.material.dispose();
            }
          }
        });
      }

      renderer.dispose();
    }
  };
}
