# VOYAGER 1: THE MAKING OF A LEGEND
## Register of Scientific & Technical Corrections Applied

**Project:** VOYAGER 1 — THE MAKING OF A LEGEND  
**Audit Reference:** Stage 2 Independent Scientific Forensic Audit  
**Date Applied:** November 14, 2026  
**Auditor / Engineer:** Senior Spacecraft Systems Researcher & Frontend Software QA Engineer  

---

### 1. Summary of Corrections Applied

A rigorous scientific review of all application code, simulation models, and educational content identified 8 categories of technical discrepancies. Every discrepancy has been rectified and validated against primary NASA/JPL mission publications and historical documentation.

```
+----------------------------------------------------------------------------------------------------+
|                                SUMMARY OF SCIENTIFIC CORRECTIONS                                   |
+----------------------------------------------------------------------------------------------------+
| ID     | Field / Component          | Previous Error              | Corrected Scientific Fact      |
+--------+----------------------------+-----------------------------+--------------------------------+
| COR-01 | RTG Decay Formula & Tests  | Failed starter code         | P(t) = 474*(0.5)^(t/87.7)*...  |
| COR-02 | Task Quiz Answer Keys      | 100% Option A (12/12)       | Balanced: A(3), B(3), C(3), D(3)|
| COR-03 | CCS Memory Word Length     | 16-bit words (misleading)   | 18-bit words (FDS kept 16-bit) |
| COR-04 | Hydrazine Propellant Mass  | Ambiguous / rounded values  | Exactly 105 kg (231 lb)        |
| COR-05 | Spacecraft Bus Geometry    | Toroidal fuselage           | 10-Sided Decahedral Ring Bus   |
| COR-06 | PWS Measurement Units      | V^2/(m^2*Hz)                | Volts per meter (V/m)          |
| COR-07 | LECP Viewing Architecture  | Undefined angular sectors   | 8 angular sectors (RS01 blocked)|
| COR-08 | Trajectory Cruise Epoch    | Claimed launch tracking     | Computed ephemeris from Day 252|
| COR-09 | Corrupted Fallback JPEG    | HTML error page (\x3c\x21)  | Authentic 3.54 MB binary JPEG  |
| COR-10 | Quarantined Legacy Data    | HTML error page in data/    | Tagged INVALID_DATA_HTML       |
+----------------------------------------------------------------------------------------------------+
```

---

### 2. Detailed Technical Breakdown

#### COR-01: Code Lab RTG Formula & Test Cases
- **File:** `src/scripts/labs/code-lab.js`
- **Initial State:** Starter code returned values that failed internal unit tests because the test cases expected $453.6\text{ W}$ at $t=2$ and $262.9\text{ W}$ at $t=35$, which contradicted the stated formula.
- **Correction Applied:**
  The mathematical decay model incorporates both isotopic decay of Pu-238 ($t_{1/2} = 87.7$ years) and silicon-germanium thermocouple junction degradation ($0.75\%$ per year):
  $$P(t) = P_0 \cdot \left(\frac{1}{2}\right)^{t / 87.7} \cdot (1 - 0.0075 \cdot t)$$
  Test cases were aligned with exact mathematical evaluations:
  - $t=0$: $474.0\text{ W}$ (Launch baseline)
  - $t=2$: $459.6\text{ W}$ (Jupiter flyby epoch)
  - $t=3$: $452.5\text{ W}$ (Saturn flyby epoch)
  - $t=35$: $265.1\text{ W}$ (Heliopause crossing epoch)
- **Verification:** Automated evaluation in `test-suite.js` passes 4/4 test cases with $\pm 0.05\text{ W}$ tolerance.

#### COR-02: Task Quiz Option Balancing
- **File:** `src/scripts/tasks/task-data.js`
- **Initial State:** All 12 tasks had `correctAnswerId: 'opt-a'`, introducing an extreme bias.
- **Correction Applied:** Question answer options were redistributed so correct answers are balanced evenly:
  - Option A: 3 tasks (`task-sys-01`, `task-tel-02`, `task-thp-03`)
  - Option B: 3 tasks (`task-sys-03`, `task-tel-03`, `task-sci-02`)
  - Option C: 3 tasks (`task-sys-02`, `task-thp-01`, `task-sci-03`)
  - Option D: 3 tasks (`task-tel-01`, `task-thp-02`, `task-sci-01`)
- **Verification:** Verified in `test-suite.js` (3-3-3-3 distribution, 25% each).

#### COR-03: Computer Command System (CCS) Memory Architecture
- **File:** `src/scripts/simulation/components-data.js`
- **Initial State:** CCS was described as having 4,096 16-bit words.
- **Correction Applied:** Line 140 updated to specify dual-redundant 4,096 18-bit words (keeping Flight Data Subsystem 16-bit memory distinguished).
- **Archival Reference:** IEEE Transactions on Aerospace and Electronic Systems, AES-16, No. 5 (1980).

#### COR-04: Hydrazine Propellant Mass
- **File:** `src/scripts/story/explore-data.js`, `src/scripts/tasks/task-data.js`
- **Initial State:** Inconsistent references to fuel mass across sections.
- **Correction Applied:** Standardized to 105 kg (231 lb) titanium propellant tank capacity, with 710 kg dry mass resulting in 815 kg total wet launch mass.
- **Archival Reference:** NASA SP-445 Chapter 3; JPL Technical Report 77-51.

#### COR-05: Spacecraft Bus Terminology
- **File:** `src/scripts/story/mission-data.js`, `index.html`
- **Initial State:** Referred to as a "toroidal" fuselage in several cards.
- **Correction Applied:** Standardized to "10-Sided Decahedral Spacecraft Bus Structure" with 10 electronics bays and titanium spherical fuel tank.

#### COR-06: Plasma Wave Subsystem (PWS) Calibrated Units
- **File:** `data/SOURCE_MANIFEST.json`, `src/scripts/labs/historical-data.js`
- **Initial State:** Stated as spectral power density $\text{V}^2/(\text{m}^2 \cdot \text{Hz})$.
- **Correction Applied:** Corrected to calibrated root-mean-square Electric Field in Volts per meter ($\text{V/m}$).
- **Archival Reference:** University of Iowa PWS CDF Dataset Description (`vg1_pws_lr_19770905_v5.30.cdf`).

#### COR-07: Low Energy Charged Particle (LECP) Detector Geometry
- **File:** `data/SOURCE_MANIFEST.json`, `src/scripts/labs/historical-data.js`
- **Initial State:** Missing angular sector viewing explanation.
- **Correction Applied:** Documented EB01 (22–35 keV electron channel) across eight $45^\circ$ angular viewing sectors (RS01 to RS08). Documented that Sector 1 is physically blocked by an internal RTG radiation shield on Voyager 1, resulting in the designated -1.00 fill value.

#### COR-08: Trajectory SSC Ephemeris Epoch
- **File:** `data/SOURCE_MANIFEST.json`, `src/scripts/labs/historical-data.js`
- **Initial State:** Described as launch ascent tracking.
- **Correction Applied:** Clarified that the SSC ephemeris is a numerically computed cruise trajectory initialized on Day 252 (September 9, 1977) post-Earth-escape injection, excluding Cape Canaveral atmospheric ascent.

#### COR-09: Authentic Binary JPEG Replacement (PIA17046)
- **File:** `public/assets/images/voyager1-jpl-pia17046.jpg`
- **Initial State:** Contained a 404 HTML wrapper (`<!doctype html>`).
- **Correction Applied:** Downloaded authentic 3.54 MB binary JPEG (`\xff\xd8\xff\xe0`) from NASA Images API (`https://images-assets.nasa.gov/image/PIA17046/PIA17046~orig.jpg`).

#### COR-10: Legacy Corrupted Data Quarantine
- **File:** `data/voyager1_data.txt`
- **Initial State:** Contained an HTML error page.
- **Correction Applied:** Quarantined by creating `data/voyager1_data.txt.STATUS.txt` officially classifying the file as `INVALID_DATA_HTML — EXCLUDED FROM SCIENTIFIC ANALYSIS`.
