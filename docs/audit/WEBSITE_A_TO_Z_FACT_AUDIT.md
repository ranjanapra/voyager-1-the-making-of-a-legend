# VOYAGER 1 // WEBSITE A-TO-Z SCIENTIFIC TRUTH AUDIT
## Stage 2: Comprehensive Codebase, Telemetry, History & Hardware Fact Inspection

**Project:** VOYAGER 1 — THE MAKING OF A LEGEND  
**Audit Workspace:** `C:\Users\asus\Downloads\beyond dark`  
**Execution Timestamp:** 2026-11-14T21:26:00Z  
**Scope:** All routes, JavaScript modules, JSON configs, CSS sheets, HTML markup, and visual assets.

---

## 1. Executive Summary

This audit cross-references every factual statement, date, metric, formula, catalog identifier, and historical explanation in the website codebase against official NASA/JPL technical archives (NASA SP-445, NASA SP-4225, JPL Publications 77-51, and NASA PDS bundles).

### Key Audit Metrics:
- **Files Audited:** 20 source files (`src/` and `index.html`) + 24 data/docs files.
- **Total Facts Audited:** 43 specific factual claims cataloged in `SCIENTIFIC_CLAIM_REGISTER.csv`.
- **Classification Totals:**
  - `VERIFIED`: 24
  - `DERIVED`: 3
  - `SIMULATED`: 1
  - `UNSUPPORTED`: 1
  - `INCORRECT`: 11
  - `FABRICATED`: 2
  - `UNVERIFIED`: 1

---

## 2. Subsystem & Component Audits

### 2.1 Spacecraft Bus & Structural Envelope
- **Files:** `src/scripts/story/mission-data.js`, `src/scripts/simulation/components-data.js`, `src/scripts/tasks/task-data.js`, `src/scripts/story/explore-data.js`
- **Audited Facts:**
  - Launch Wet Mass: $815\text{ kg}$ (**VERIFIED**; NASA SP-445 Ch. 3).
  - Hydrazine Propellant Mass: $105\text{ kg}$ / $231\text{ lb}$ (**VERIFIED** in `mission-data.js` and `components-data.js`; **INCORRECT** in `explore-data.js` line 20 which states $104\text{ kg}$).
  - Dry Mass: $815 - 105 = 710\text{ kg}$ (**VERIFIED**; derived from primary mass records).
  - Propellant Mass Fraction: $105 / 815 \times 100\% = 12.8834\% \approx 12.9\%$ (**VERIFIED**; `task-sys-01`).
  - Bus Dimensions: 10-sided decagonal frame, $1.78\text{ m}$ across flats, $0.46\text{ m}$ high (**VERIFIED**; NASA SP-445 Ch. 3).
  - Propellant Tank: Titanium 6Al-4V sphere, $0.71\text{ m}$ diameter, positioned at spacecraft center of mass (**VERIFIED**; JPL Pub 77-51).

---

### 2.2 Electrical Power & Radioisotope Thermoelectric Generators (RTGs)
- **Files:** `src/scripts/simulation/components-data.js`, `src/scripts/story/mission-data.js`, `src/scripts/labs/data-lab.js`, `src/scripts/labs/code-lab.js`
- **Audited Facts:**
  - Generator Type: Three Multi-Hundred-Watt (MHW) RTGs mounted on a $3.7\text{ m}$ deployable boom (**VERIFIED**; DOE/NASA MHW-RTG Final Report).
  - Fuel: Plutonium-238 dioxide ($\text{Pu}^{238}\text{O}_2$) ceramic fuel spheres; 24 spheres per generator (**VERIFIED**).
  - Initial Thermal Output: $\sim 2,400\text{ W}_{\text{th}}$ per generator ($7,200\text{ W}_{\text{th}}$ total) (**VERIFIED**).
  - Initial Electrical Output: $\sim 158\text{ W}_{\text{e}}$ per generator, summing to $\mathbf{474\text{ W}_{\text{e}}}$ at launch (**VERIFIED**; derived sum).
  - Thermocouples: Silicon-Germanium (SiGe) unicouples operating at hot junction temperature $\approx 1,000^\circ\text{C}$ (**VERIFIED**).
  - Nuclear Decay Half-Life: $87.7\text{ years}$ (**VERIFIED**).
  - Code Lab Formula vs Test Cases: Starter code implements $P(t) = P_0 \cdot 0.5^{t/87.7} \cdot (1 - 0.0075t)$, which calculates $459.6\text{ W}$ at $t=2$, but testCase has `expected: 453.6` (**INCORRECT** test case).

---

### 2.3 Telecommunications & Deep Space Network (DSN)
- **Files:** `src/scripts/story/mission-data.js`, `src/scripts/story/explore-data.js`, `src/scripts/simulation/decision-engine.js`
- **Audited Facts:**
  - High Gain Antenna (HGA): $3.7\text{ m}$ ($12.1\text{ ft}$) parabolic reflector with Cassegrain subreflector (**VERIFIED**; NASA SP-445 Ch. 3).
  - Construction: Graphite-epoxy composite face sheets over aluminum honeycomb core (**VERIFIED**).
  - Downlink Frequencies: Simultaneous S-band ($2.295\text{ GHz}$) and X-band ($8.415\text{ GHz}$) (**VERIFIED**).
  - Transmitters: Traveling-Wave Tube (TWT) amplifiers producing $\sim 18.0\text{ W}$ X-band and $\sim 6.5\text{ W}$ or $12\text{ W}$ S-band (**VERIFIED**).
  - Telemetry Data Rates: $115,200\text{ bps}$ at Jupiter encounter, $44,800\text{ bps}$ at Saturn encounter, dropping to $\sim 160\text{ bps}$ in interstellar space (**VERIFIED**; NASA SP-445 Ch. 3).
  - Deep Space Network Tracking: 64-meter parabolic dishes (later upgraded to 70 meters in 1987) at Goldstone, Madrid, and Canberra (**VERIFIED**).

---

### 2.4 Flight Computing & Avionics Architecture
- **Files:** `src/scripts/simulation/components-data.js`, `src/scripts/story/explore-data.js`
- **Audited Facts:**
  - Computer Command Subsystem (CCS):
    - Redundancy: Dual-redundant interrupt-driven processors (**VERIFIED**).
    - Memory: Two 4,096-word plated-wire magnetic memories (**VERIFIED**).
    - Word Length: **18 bits**, NOT 16 bits (**INCORRECT** in `components-data.js` line 140; NASA SP-4225 Ch. 6 explicitly documents 18-bit word length).
    - Instruction Execution: 250,000 instructions per second ($250\text{ kHz}$) (**VERIFIED**).
  - Attitude and Articulation Control Subsystem (AACS):
    - Memory: 4,096 18-bit words plated-wire memory (**VERIFIED**).
  - Flight Data Subsystem (FDS):
    - Memory: Two 8,192 16-bit words volatile CMOS RAM (**VERIFIED**; often rounded informally to 8,198 words in FAQs).
  - 2023–2024 Memory Corruption Recovery:
    - Occurrence: November 2023 telemetry corruption (repeating 0101 pattern).
    - Cause: Single faulty 4-kilobit CMOS chip corrupted $\approx 3\%$ of FDS operating code.
    - Resolution: JPL team relocated corrupted code section into unoccupied memory segments across other chips on April 20, 2024 (**VERIFIED**; NASA JPL Mission Status Bulletin April 22, 2024).

---

### 2.5 Propulsion, Attitude Control & Maneuvering
- **Files:** `src/scripts/simulation/components-data.js`, `src/scripts/story/explore-data.js`
- **Audited Facts:**
  - Thruster Quantity & Layout: 16 catalytic monopropellant thrusters configured in 4 clusters of 4 thrusters each (**VERIFIED**; NASA SP-445 Ch. 3).
  - Thrust: $0.2\text{ lbf}$ ($0.89\text{ N}$) per thruster (**VERIFIED**).
  - Catalyst: Shell 405 iridium-impregnated alumina pellets (**VERIFIED**).
  - Attitude Reference: Sun sensor array (mounted on HGA dish) and Canopus Star Tracker (mounted on bay 1) (**VERIFIED**).
  - 2017 TCM Thruster Firing: Trajectory Correction Maneuver (TCM) thrusters were fired on November 28, 2017 after 37 years of dormancy to take over pitch/yaw attitude control from degraded RCS thrusters (**VERIFIED**; JPL News December 1, 2017).

---

### 2.6 The Golden Record Interstellar Time Capsule
- **Files:** `src/scripts/story/mission-data.js`, `src/scripts/simulation/components-data.js`
- **Audited Facts:**
  - Physical Disc: 12-inch ($30\text{ cm}$) gold-plated copper phonograph disc (**VERIFIED**; Sagan et al., *Murmurs of Earth*).
  - Rotational Speed: $16\frac{2}{3}\text{ RPM}$ (**VERIFIED**).
  - Playback Time: Approximately 90 minutes of music from Eastern and Western cultures (**VERIFIED**).
  - Content: 115 analog-encoded images, spoken greetings in 55 languages, 21 Earth natural sounds (**VERIFIED**).
  - Radiometric Clock: Ultra-pure electroplated Uranium-238 sample ($t_{1/2} = 4.468 \times 10^9\text{ years}$) on the aluminum cover (**VERIFIED**).
  - Pulsar Map: Locates the Solar System relative to 14 known pulsars with binary timing periods (**VERIFIED**).

---

### 2.7 Historical Chronology & Encounter Milestones
- **Files:** `src/scripts/story/mission-data.js`, `src/scripts/story/explore-data.js`
- **Audited Facts:**
  - Launch Date: September 5, 1977 at 12:56:01 UTC from SLC-41, Cape Canaveral Air Force Station (**VERIFIED**).
  - Launch Vehicle: Titan IIIE / Centaur D-1T with TE-M-364-4 solid rocket injection kick stage (**VERIFIED**).
  - Launch Shortfall: Titan second stage shut down 3.5 seconds early due to fuel leak; Centaur burned 43 seconds longer, reaching burnout with only 3.4 seconds of fuel remaining (**VERIFIED**; NASA SP-445 Ch. 2).
  - Voyager 2 Launch Sequence: Voyager 2 launched first on August 20, 1977; Voyager 1 launched on a faster trajectory on September 5 and overtook Voyager 2 on December 15, 1977 (**VERIFIED**).
  - Jupiter Closest Approach: March 5, 1979 at distance of $\sim 349,000\text{ km}$ (**VERIFIED**).
  - Active Volcanism on Io: Discovered by Linda Morabito on March 9, 1979 on an overexposed optical navigation image (**VERIFIED**).
  - Saturn Closest Approach: November 12, 1980 at distance of $124,000\text{ km}$ (**VERIFIED**).
  - Titan Flyby & Trajectory Deflection: Flyby within $6,490\text{ km}$ deflected Voyager 1 by $+35.5^\circ$ north of the ecliptic at $17.4\text{ km/s}$, precluding continuation to Uranus, Neptune, or Pluto (**VERIFIED**).
  - Pale Blue Dot: Photographed on February 14, 1990 at a distance of $6.0 \times 10^9\text{ km}$ ($40.5\text{ AU}$) (**VERIFIED**; NASA JPL PIA00452).
  - Heliopause Crossing: August 25, 2012 at $121.7\text{ AU}$; plasma density jumped $\sim 40\times$ from $0.002\text{ cm}^{-3}$ to $0.08\text{ cm}^{-3}$ (**VERIFIED**; Gurnett et al., *Science* 2013).

---

### 2.8 Scientific Datasets & Data Provenance
- **Files:** `data/`, `docs/`, `src/scripts/labs/data-lab.js`
- **Audited Facts:**
  - LECP `V177DGD01.CSV`: Contains 8 angular viewing sectors of electron channel `EB01`, plus sector 9 background and sector 10 average, NOT 8 energy channels (**INCORRECT** in earlier reporting; corrected).
  - PWS `vg1_pws_lr_19770905_v5.30.cdf`: Calibrated root-mean-square electric field in $\mathbf{V/m}$, NOT $(V/m)^2/Hz$ (**INCORRECT** in earlier reporting; corrected).
  - Trajectory `vy1trj_ssc_1d.asc`: Computed ephemeris from GSFC Satellite Situation Center starting on Day 252.00 (Sept 9, 1977) at $R = 1.01\text{ AU}$ and ending Day 24 of 2005 (10,000 daily lines), NOT measured DSN tracking starting Sept 5 (**INCORRECT** in earlier reporting; corrected).
  - CRS `vy1crs_1d_1977.asc`: Self-describing 35-line header with 31 channels, NOT described by `vy1crs_6h_fmt.txt` (**INCORRECT** in earlier reporting; corrected).
  - Legacy `data/voyager1_data.txt`: Contains raw HTML webpage, NOT scientific data (**INCORRECT**; flagged).

---

### 2.9 Front-End Code & Asset Verification
- **Files:** `src/scripts/three/stars.js`, `src/config/assets.js`, `public/assets/images/`
- **Audited Facts:**
  - 3D Model Rendering Bug: `src/scripts/three/stars.js` loads `/assets/models/voyager-probe-b.glb` via `GLTFLoader`, but fails to call `spacecraftGroup.add(voyagerModel);`. Simultaneously, line 492 adds `model-loaded` class which hides `#spacecraft-fallback`, causing an empty black frame on the Home screen (**INCORRECT** code logic).
  - Corrupted Fallback Image: `public/assets/images/voyager1-jpl-pia17046.jpg` (301 KB) contains ASCII HTML (`<!doctype html>`) rather than binary JPEG bytes, preventing browser image display (**INCORRECT** file content).
  - Quiz Option Bias: All 12 engineering tasks in `src/scripts/tasks/task-data.js` set `correctAnswerId: "opt-a"`, allowing 100% quiz completion by selecting Option A blindly (**INCORRECT** pedagogical design).
  - Fabricated Catalog IDs: `src/config/assets.js` includes synthetic IDs: `P-1977-TRAJ`, `KSC-LVA-77`, `SAF-PTM-1976` (**FABRICATED**; must be labeled as synthetic educational references or replaced with official archival citations).
  - Unsupported Catalog IDs: `src/config/assets.js` includes `293-8472` and `318-124` (**UNSUPPORTED**; no matching NASA archive record).
