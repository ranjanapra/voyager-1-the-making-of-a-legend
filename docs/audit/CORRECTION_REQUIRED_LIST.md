# VOYAGER 1 // CORRECTION REQUIRED LIST
## Stage 2: Actionable Technical, Scientific & Codebase Corrections

**Project:** VOYAGER 1 — THE MAKING OF A LEGEND  
**Audit Workspace:** `C:\Users\asus\Downloads\beyond dark`  
**Execution Timestamp:** 2026-11-14T21:26:00Z  
**Implementation Constraint Notice:** Per strict instructions, **no website source code has been altered during this audit**. This list defines the exact, verified modifications required for subsequent implementation.

---

## 1. Summary of Required Corrections

| Fix ID | Category | Severity | Target File | Line(s) | Description |
|--------|----------|:--------:|-------------|---------|-------------|
| **FIX-01** | Front-End 3D Engine | **CRITICAL** | `src/scripts/three/stars.js` | 468–474 | Missing `spacecraftGroup.add(voyagerModel);` causes invisible 3D model. |
| **FIX-02** | Visual Assets | **CRITICAL** | `public/assets/images/voyager1-jpl-pia17046.jpg` | Whole File | Replace corrupted HTML webpage with authentic binary JPEG file. |
| **FIX-03** | Code Lab Math | **HIGH** | `src/scripts/labs/code-lab.js` | 94–99 | Align Challenge 2 unit test expectations ($459.6\text{ W}$, $452.5\text{ W}$, $265.1\text{ W}$) with formula. |
| **FIX-04** | Pedagogical UX | **HIGH** | `src/scripts/tasks/task-data.js` | Multiple | Rebalance task options so correct answers are not 100% Option A. |
| **FIX-05** | Hardware Accuracy | **MEDIUM** | `src/scripts/simulation/components-data.js` | 140 | Correct CCS word length from `16-bit words` to `18-bit words`. |
| **FIX-06** | Editorial Consistency | **LOW** | `src/scripts/story/explore-data.js` | 20 | Update `104 kg of hydrazine` to `105 kg of hydrazine`. |
| **FIX-07** | Editorial Precision | **LOW** | `src/scripts/story/mission-data.js` | 85 | Update `10-Sided Toroidal Bus` to `10-Sided Decagonal Bus`. |
| **FIX-08** | Provenance Documentation | **MEDIUM** | `docs/SOURCE_MANIFEST.md` | LECP Section | Correct LECP column definition from energy channels to 8 angular viewing sectors. |
| **FIX-09** | Provenance Documentation | **MEDIUM** | `docs/SOURCE_MANIFEST.md` | PWS Section | Correct PWS units from $(V/m)^2/Hz$ to calibrated electric field $\text{V/m}$. |
| **FIX-10** | Provenance Documentation | **MEDIUM** | `docs/SOURCE_MANIFEST.md` | Trajectory Section | Note that trajectory starts Day 252 (Sept 9, 1977) at 1.01 AU, calculated by SSC GTDS ephemeris. |
| **FIX-11** | Dataset Quarantine | **LOW** | `data/voyager1_data.txt` | Whole File | Quarantine or mark legacy HTML file as `INVALID_DATA_HTML`. |
| **FIX-12** | Catalog Designators | **LOW** | `src/config/assets.js` | 137, 144 | Replace synthetic IDs (`P-1977-TRAJ`, `KSC-LVA-77`) with archival descriptions. |

---

## 2. Detailed Technical Action Items

### FIX-01 // Three.js Spacecraft Scene Graph Attachment
- **File:** `src/scripts/three/stars.js`
- **Location:** Inside `gltfLoader.load(modelUrl, (gltf) => { ... })` around line 469.
- **Problem:** `voyagerModel` is loaded, scaled, and its material properties traversed, but it is never added to `spacecraftGroup`. At line 492, `renderFrame.classList.add('model-loaded')` executes, hiding the fallback image. Because the 3D model is never added to the scene, the canvas remains empty.
- **Required Edit:**
  ```javascript
  // After centering geometry:
  voyagerModel.position.sub(center);
  spacecraftGroup.add(voyagerModel); // <-- ADD THIS LINE
  ```

---

### FIX-02 // Replace Corrupted Fallback Image `voyager1-jpl-pia17046.jpg`
- **File:** `public/assets/images/voyager1-jpl-pia17046.jpg`
- **Problem:** The file on disk contains 301,442 bytes of HTML source code (`<!doctype html>...`). Any browser attempting to render this as an `<img>` fails with an image decoding error.
- **Required Action:** Download the actual binary JPEG file for NASA Photojournal Catalog PIA17046 or point the fallback URL in `src/config/assets.js` to the valid existing asset `/assets/images/spacecraft-profile.jpg.jpeg`.

---

### FIX-03 // Realign Code Lab Challenge 2 Test Cases
- **File:** `src/scripts/labs/code-lab.js`
- **Location:** Lines 94–99 (`CODING_CHALLENGES[1].testCases`)
- **Problem:** The starter code computes:
  $$P(t) = 474.0 \cdot (0.5)^{t / 87.7} \cdot (1 - 0.0075 \cdot t)$$
  The current test cases have expected values of $453.6\text{ W}$ at $t=2$, $443.6\text{ W}$ at $t=3$, and $260.6\text{ W}$ at $t=35$. Because the formula produces $459.6\text{ W}$, $452.5\text{ W}$, and $265.1\text{ W}$, the starter code fails its own tests.
- **Required Edit:**
  ```javascript
  testCases: [
    { input: 0, expected: 474.0, label: "Launch (Year 0)" },
    { input: 2, expected: 459.6, label: "Jupiter Flyby (Year 2)" },
    { input: 3, expected: 452.5, label: "Saturn Flyby (Year 3)" },
    { input: 35, expected: 265.1, label: "Heliopause Crossing (Year 35)" }
  ],
  ```

---

### FIX-04 // Rebalance Engineering Task Multiple-Choice Options
- **File:** `src/scripts/tasks/task-data.js`
- **Location:** All 12 tasks in `ENGINEERING_TASKS`
- **Problem:** Every single task currently specifies `correctAnswerId: "opt-a"`.
- **Required Edit:** Shuffle option arrays and update `correctAnswerId` across tasks to provide a balanced distribution (3 Option A, 3 Option B, 3 Option C, 3 Option D).

---

### FIX-05 // Correct Computer Command Subsystem (CCS) Word Architecture
- **File:** `src/scripts/simulation/components-data.js`
- **Location:** Line 140 (`comp-ccs`)
- **Problem:** Text reads "Dual-redundant processors with 4,096 16-bit words of memory each."
- **Required Edit:** Change `16-bit words` to `18-bit words`.
  NASA SP-4225 (*Computers in Spaceflight: The NASA Experience*, Chapter 6) explicitly details that CCS and AACS used 18-bit words, while FDS used 16-bit words.

---

### FIX-06 & FIX-07 // Editorial Number & Topology Harmonization
- **File 1:** `src/scripts/story/explore-data.js` line 20: Change `104 kg of hydrazine propellant` to `105 kg of hydrazine propellant`.
- **File 2:** `src/scripts/story/mission-data.js` line 85: Change `10-Sided Toroidal Bus` to `10-Sided Decagonal Bus`.
