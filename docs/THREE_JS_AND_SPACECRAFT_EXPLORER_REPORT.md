# VOYAGER 1 — THREE.JS & SPACECRAFT EXPLORER TECHNICAL REPORT

**Project:** VOYAGER 1 — THE MAKING OF A LEGEND  
**Workspace:** `C:\Users\asus\Downloads\beyond dark`  
**Execution Timestamp:** 2026-11-15T00:52:00Z  
**Subsystems:** WebGL Three.js 3D Engine (`stars.js`), Spacecraft Hotspot Explorer (`spacecraft-explorer.js`)  
**Status:** **100% OPERATIONAL & VERIFIED**  

---

## 1. THREE.JS 3D SPACECRAFT ENGINE

### 1.1 Architecture & Canvas Configuration
- **Canvas Element:** `#bg-canvas` fixed in background with `z-index: 0`, pointer events routed selectively.
- **Deep Space Backdrop:** Hardcoded `#020409` cosmic background initialized synchronously in `<head>` to prevent white-screen flashes.
- **Procedural Starfield:** Dual-layer starfield generated via Three.js `Points` and custom geometry with realistic stellar magnitudes and parallax drift.

### 1.2 Model Loading & Scene Graph Attachment
- **Scene Graph Attachment:** Line 470 in `src/scripts/three/stars.js` executes `spacecraftGroup.add(voyagerModel)` immediately after centering the bounding box:
  ```javascript
  const box = new THREE.Box3().setFromObject(voyagerModel);
  const center = box.getCenter(new THREE.Vector3());
  voyagerModel.position.sub(center);
  spacecraftGroup.add(voyagerModel);
  ```
- **Delayed Fallback Hiding:** The fallback image container does NOT receive the `.model-loaded` class until the model is attached and the first frame renders, preventing blank canvas flashes.

### 1.3 Local Draco WASM Decoder Integration
- **Draco Configuration:** `DRACOLoader` is configured to fetch local WASM binaries from `/draco/` (`draco_decoder.wasm`, `draco_wasm_wrapper.js`) without external CDN dependencies.
- **Fallback Chain:**
  1. Primary: `/assets/models/voyager-probe-b.glb` (Draco-compressed NASA 3D asset)
  2. Secondary: `/assets/models/voyager-vtad.glb` (Alternative mesh)
  3. Tertiary: `/assets/images/spacecraft-profile.jpg.jpeg` (Authentic binary fallback)

### 1.4 Scale, Camera Framing & PBR Lighting
- **Scale:** Spacecraft bounding box normalized to a heroic 440-unit scale.
- **Camera:** Perspective camera at FOV 45°, positioned at `(0, 80, 520)` with focal center on the bus.
- **Lighting Rig:**
  - Key Light: Directional warm sunlight ($5500\text{ K}$, intensity 2.4) angled along the departure vector.
  - Fill Light: Directional amber bounce ($3200\text{ K}$, intensity 0.8) illuminating the RTG boom.
  - Rim Light: Cool cyan deep-space kicker ($8500\text{ K}$, intensity 1.2) defining the dish contour.
  - Ambient Baseline: Subtle omnidirectional ambient light (intensity 0.35) preventing total shadow blackouts.

### 1.5 User-Controlled Manual Rotation Interaction
- **Pointer Event Handlers:** Wired to `#spacecraft-render-frame` via `pointerdown`, `pointermove`, `pointerup`.
- **Damping & Inertia:** Smooth spherical quaternion orbit with 0.94 damping factor.
- **Mobile Touch Preservation:** Configured with `touch-action: pan-y` so horizontal swiping rotates the 3D spacecraft, while vertical scrolling effortlessly continues moving down the page.
- **Double-Click Reset:** Double-clicking or double-tapping the render frame smoothly returns the spacecraft to its default 1977 departure orientation.

---

## 2. INTERACTIVE SPACECRAFT HOTSPOT EXPLORER

### 2.1 Visual Schematic & Hotspot Layer
- **Diagram Asset:** High-resolution authentic diagram `/assets/images/spacecraft-profile.jpg.jpeg` rendered in `.diagram-canvas-box`.
- **Overlay Layer:** 12 pulsing hotspot pins positioned with exact percentage coordinates:
  1. HGA (x: 48%, y: 22%)
  2. LGA (x: 48%, y: 12%)
  3. RTG (x: 18%, y: 40%)
  4. MAG (x: 78%, y: 74%)
  5. PWS/PRA (x: 30%, y: 82%)
  6. Scan Platform (x: 75%, y: 35%)
  7. LECP (x: 65%, y: 48%)
  8. CRS (x: 68%, y: 42%)
  9. Golden Record (x: 38%, y: 62%)
  10. Decagonal Bus (x: 52%, y: 55%)
  11. RCS Thrusters (x: 42%, y: 70%)
  12. Canopus Star Tracker (x: 58%, y: 64%)

### 2.2 Layout & Responsive Presentation
- **Two-Column Desktop Architecture:**
  - `<LEFT: SPACECRAFT DIAGRAM + 12 PINS + DIRECTORY PILLS>`
  - `<RIGHT: DEEP SPECIFICATION DOSSIER TERMINAL>`
- **Non-Occlusion Guarantee:** The spacecraft diagram remains 100% visible on the left at all times. Selecting a hotspot modifies only the right-hand `.explorer-dossier-column`, preventing diagram occlusion or page reflow.
- **Mobile Responsiveness:** At $\le 900\text{px}$, the layout stacks with the diagram remaining sticky at the top and the dossier scrolling cleanly underneath as a dedicated lower drawer.

### 2.3 Dossier Content Structure
Each of the 12 component dossiers presents:
1. Status pill (e.g. `ACTIVE & NOMINAL`, `SILENT HARDWARE // INACTIVE SINCE 1980`)
2. Component title and physical subsystem tag
3. **What is it?** (Physical materials, dimensions, and construction)
4. **What does it do?** (Operational function, data rates, frequencies)
5. **Why is it important?** (Crucial role in planetary science or interstellar survival)
6. Detailed engineering specifications table
7. Direct link to official NASA NSSDCA / JPL documentation
