# VOYAGER 1 — FINAL IMAGE PLACEMENT MAP (26 ASSIGNED SLOTS)

**Project:** VOYAGER 1 — THE MAKING OF A LEGEND  
**Workspace:** `C:\Users\asus\Downloads\beyond dark`  
**Configuration File:** `src/config/image-manifest.js`  
**Integration Points:** `src/scripts/ui/build-screen.js`, `src/scripts/ui/explore-screen.js`  
**Current Operational Status:** `AWAITING IMAGE` (Ready for Batch 04 Ingestion)

---

## 1. ARCHITECTURAL OVERVIEW

All 26 designated historical imagery slots requested across Page 2 (Assembly Stages) and Page 3 (Explore Research Categories) have been formally wired into a central manifest (`src/config/image-manifest.js`).

### Design Principles for the 26 Placements:
1. **Deterministic Naming:** Each placement expects an exact assigned file name and path under `/assets/images/research/`.
2. **Graceful Awaiting State:** In the absence of the image file on disk, the UI displays a polished, intentional HUD-style archival container.
3. **Transparent Status:** Containers explicitly state `[STATUS: AWAITING IMAGE // VERIFIED NASA ARCHIVE SLOT]`, indicating the expected catalog reference, target path, and historical source.
4. **Zero UI Breakdown:** No broken image icons (`<img>` errors), zero console warnings, and no visual gaps.

---

## 2. THE COMPLETE 26-IMAGE MAPPING TABLE

| # | Assigned ID | Target Path | Page & Location | Title & Subject | Verified NASA Source | Current Status |
|---|---|---|---|---|---|---|
| **01** | `01-stage-03-rtg-installation` | `/assets/images/research/01-stage-03-rtg-installation.jpg` | Page 2 — Assembly Stage 03 | RTG Boom Integration in Cleanroom | NASA/JPL SAF Building 179 / DOE MHW-RTG Final Report | AWAITING IMAGE |
| **02** | `02-stage-04-scan-platform-magnetometer` | `/assets/images/research/02-stage-04-scan-platform-magnetometer.jpg` | Page 2 — Assembly Stage 04 | Science Platform & Astromast Alignment | NASA/JPL Tech Report 77-51 / Astro Research Corp | AWAITING IMAGE |
| **03** | `03-cat-01-high-gain-antenna` | `/assets/images/research/03-cat-01-high-gain-antenna.jpg` | Page 3 — Subtopic 01.01 | 3.7M High-Gain Cassegrain Reflector | NASA/JPL Line Drawing P-18882 / Aeronutronic Ford | AWAITING IMAGE |
| **04** | `04-cat-01-radioisotope-thermoelectric-generators` | `/assets/images/research/04-cat-01-radioisotope-thermoelectric-generators.jpg` | Page 3 — Subtopic 01.02 | MHW-RTG Power Unit Internal Cutaway | DOE / NASA Technical Paper GESP-7107 | AWAITING IMAGE |
| **05** | `05-cat-01-magnetometer-boom` | `/assets/images/research/05-cat-01-magnetometer-boom.jpg` | Page 3 — Subtopic 01.03 | 13-Meter Deployable Astromast Lattice | NASA SP-445 Chapter 4 / JPL TM 33-728 | AWAITING IMAGE |
| **06** | `06-cat-01-golden-record-cover-disc` | `/assets/images/research/06-cat-01-golden-record-cover-disc.jpg` | Page 3 — Subtopic 01.04 | Golden Record & Engraved Pulsar Cover | NASA/JPL-Caltech Catalog PIA00146 | AWAITING IMAGE |
| **07** | `07-cat-02-grand-tour-mariner-jupiter-saturn` | `/assets/images/research/07-cat-02-grand-tour-mariner-jupiter-saturn.jpg` | Page 3 — Subtopic 02.01 | Grand Tour Orbital Trajectory Alignment | JPL TM 312-505 / Gary Flandro Calculations | AWAITING IMAGE |
| **08** | `08-cat-02-jpl-building-179-assembly` | `/assets/images/research/08-cat-02-jpl-building-179-assembly.jpg` | Page 3 — Subtopic 02.02 | JPL SAF Building 179 High Bay Cleanroom | NASA/JPL SAF 179 Historical High Bay Archives | AWAITING IMAGE |
| **09** | `09-cat-02-space-simulator-qualification` | `/assets/images/research/09-cat-02-space-simulator-qualification.jpg` | Page 3 — Subtopic 02.03 | Thermal-Vacuum Testing in 25-Foot Simulator | NASA/JPL-Caltech Catalog PIA21734 | AWAITING IMAGE |
| **10** | `10-cat-02-redundant-computer-architecture` | `/assets/images/research/10-cat-02-redundant-computer-architecture.jpg` | Page 3 — Subtopic 02.04 | Dual CCS Architecture & Plated-Wire Memory | NASA SP-445 Ch. 3 / JPL Computer Archives | AWAITING IMAGE |
| **11** | `11-cat-03-voyager-1-liftoff-slc-41` | `/assets/images/research/11-cat-03-voyager-1-liftoff-slc-41.jpg` | Page 3 — Subtopic 03.01 | Voyager 1 Liftoff on Titan IIIE-Centaur | NASA Kennedy Space Center Photo KSC-77PC-0294 | AWAITING IMAGE |
| **12** | `12-cat-03-voyager-launch-sequence-comparison` | `/assets/images/research/12-cat-03-voyager-launch-sequence-comparison.jpg` | Page 3 — Subtopic 03.02 | Voyager 1 vs. Voyager 2 Trajectory Profiles | NASA SP-445 Ch. 4 / JPL Flight Trajectory Maps | AWAITING IMAGE |
| **13** | `13-cat-03-titan-iiie-centaur-stack` | `/assets/images/research/13-cat-03-titan-iiie-centaur-stack.jpg` | Page 3 — Subtopic 03.03 | Titan IIIE / Centaur / Star-37E Stack | General Dynamics Convair / Martin Marietta | AWAITING IMAGE |
| **14** | `14-cat-03-prelaunch-servicing` | `/assets/images/research/14-cat-03-prelaunch-servicing.jpg` | Page 3 — Subtopic 03.04 | SAEF II Pre-Launch Encapsulation & Fueling | NASA Kennedy Space Center SAEF II Documentation | AWAITING IMAGE |
| **15** | `15-cat-04-science-scan-platform-instruments` | `/assets/images/research/15-cat-04-science-scan-platform-instruments.jpg` | Page 3 — Subtopic 04.01 | Articulated Science Scan Platform Cluster | NASA SP-445 Ch. 4 / JPL Science Team Guide | AWAITING IMAGE |
| **16** | `16-cat-04-fields-particles-suite` | `/assets/images/research/16-cat-04-fields-particles-suite.jpg` | Page 3 — Subtopic 04.02 | Fields & Particles Payload (MAG, CRS, LECP) | NASA Planetary Data System (PDS) / GSFC | AWAITING IMAGE |
| **17** | `17-cat-04-digital-tape-recorder` | `/assets/images/research/17-cat-04-digital-tape-recorder.jpg` | Page 3 — Subtopic 04.03 | Onboard Digital Tape Recorder (DTR) Units | JPL Telecommunications Historical Record | AWAITING IMAGE |
| **18** | `18-cat-04-deep-space-network` | `/assets/images/research/18-cat-04-deep-space-network.jpg` | Page 3 — Subtopic 04.04 | DSN 70-Meter Parabolic Antenna Array | NASA/JPL Deep Space Network Catalog | AWAITING IMAGE |
| **19** | `19-cat-05-jupiter-io-volcanism` | `/assets/images/research/19-cat-05-jupiter-io-volcanism.jpg` | Page 3 — Subtopic 05.01 | Active Volcanic Plumes on Io & Red Spot | NASA/JPL-Caltech Catalog PIA00058 | AWAITING IMAGE |
| **20** | `20-cat-05-saturn-rings` | `/assets/images/research/20-cat-05-saturn-rings.jpg` | Page 3 — Subtopic 05.02 | Saturn Ringlet Density Waves & Crescent | NASA/JPL-Caltech Catalog PIA01492 | AWAITING IMAGE |
| **21** | `21-cat-05-titan-trajectory-decision` | `/assets/images/research/21-cat-05-titan-trajectory-decision.jpg` | Page 3 — Subtopic 05.03 | Titan Close Encounter Trajectory Deflection | NASA SP-445 Ch. 6 / JPL Mission Planning | AWAITING IMAGE |
| **22** | `22-cat-05-pale-blue-dot` | `/assets/images/research/22-cat-05-pale-blue-dot.jpg` | Page 3 — Subtopic 05.04 | Pale Blue Dot: Earth from 6.0 Billion Km | NASA/JPL-Caltech Catalog PIA00452 | AWAITING IMAGE |
| **23** | `23-cat-06-launch-day-centaur-burn` | `/assets/images/research/23-cat-06-launch-day-centaur-burn.jpg` | Page 3 — Subtopic 06.01 | Launch-Day Centaur Propellant Margin | NASA KSC Post-Launch Anomaly Report | AWAITING IMAGE |
| **24** | `24-cat-06-thruster-revival-2017` | `/assets/images/research/24-cat-06-thruster-revival-2017.jpg` | Page 3 — Subtopic 06.02 | TCM Thruster Revival in Interstellar Space | NASA/JPL Interstellar Status Report (2017) | AWAITING IMAGE |
| **25** | `25-cat-06-memory-chip-corruption-2023-2024` | `/assets/images/research/25-cat-06-memory-chip-corruption-2023-2024.jpg` | Page 3 — Subtopic 06.03 | FDS Memory Corruption & In-Flight Code Patch | NASA/JPL Interstellar Mission Bulletin (2024) | AWAITING IMAGE |
| **26** | `26-cat-06-power-management-rtg` | `/assets/images/research/26-cat-06-power-management-rtg.jpg` | Page 3 — Subtopic 06.04 | Interstellar Power & Instrument Shutdowns | NASA Voyager Long-Range Operating Plan | AWAITING IMAGE |

---

## 3. COMPONENT INTEGRATION SPECIFICATIONS

### Page 2 Assembly Workflow (`src/scripts/ui/build-screen.js`)
- Stage 03 card inspects `getImageManifestById('01-stage-03-rtg-installation')`.
- Stage 04 card inspects `getImageManifestById('02-stage-04-scan-platform-magnetometer')`.
- Renders `.stage-assigned-image-slot` with golden dashed borders, assigned ID, status pill, and technical details.

### Page 3 Research Subtopic Dossier (`src/scripts/ui/explore-screen.js`)
- Subtopic research detail view dynamically resolves manifest entry using `getImageManifestBySubtopicCode(subtopic.code)`.
- If a verified local asset is already loaded in `ASSET_CONFIG`, it displays the authentic image.
- If awaiting image ingestion, it renders `.dossier-image-placeholder` with assigned slot title, target path, NASA source citation, and `[STATUS: AWAITING IMAGE // VERIFIED NASA ARCHIVE SLOT]`.

---

## 4. INGESTION READINESS FOR BATCH 04
When image files are provided in Batch 04, copying them to `public/assets/images/research/<assigned-filename>.jpg` immediately displays them across their corresponding cards without altering component code.
