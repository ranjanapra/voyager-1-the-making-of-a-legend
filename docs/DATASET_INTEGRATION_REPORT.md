# VOYAGER 1: THE MAKING OF A LEGEND
## NASA Archival Dataset Integration Report

**Project:** VOYAGER 1 — THE MAKING OF A LEGEND  
**Audit Stage:** Stage 2 Dataset Integration & Verification  
**Date:** November 14, 2026  
**Auditor / Engineer:** Senior Spacecraft Systems Researcher & Frontend Software QA Engineer  

---

### 1. Executive Summary

Six (6) authentic Voyager 1 historical scientific and orbital datasets have been extracted, validated, and integrated into the application's **Data Lab** inside `src/scripts/labs/historical-data.js`.

The implementation ensures 100% provenance traceability to official NASA repositories (SPDF, SSC, PDS, and MIT), preserves authentic measurement units and sensor geometry, and introduces an interactive dual-mode interface allowing users to toggle between **Authentic NASA Archival Data** and the **Educational Telemetry Simulator**.

---

### 2. Comprehensive Dataset Manifest & Verification Summary

```
+-------------------------------------------------------------------------------------------------------------------------+
|                                        OFFICIAL NASA ARCHIVAL DATASET REGISTER                                          |
+----+-------------+-------------------------+--------------------+------------------------+------------------+----------+
| #  | Subsystem   | Dataset Identifier      | Temporal Coverage  | Measurement Units      | P.I. / Institute | Records  |
+----+-------------+-------------------------+--------------------+------------------------+------------------+----------+
| 01 | Trajectory  | vy1trj_ssc_1d.asc       | 1977-09-09 to 2005 | Radial Distance (AU)   | Parthasarathy/GSFC| 101 samp |
| 02 | MAG         | vy1mag_1h.asc           | 1977-09-05 to 1989 | Field Magnitude (nT)   | Ness / Bartol    | 94 samp  |
| 03 | PLS         | v1_hour_1977.asc        | 1977-09-07 to 1977 | Speed (km/s), N (cm^-3)| Bridge / MIT     | 78 samp  |
| 04 | CRS         | vy1crs_1d_1977.asc      | 1977-09-08 to 1977 | Particles/(cm^2*s*sr)  | Vogt / Caltech   | 69 days  |
| 05 | LECP        | V177DGD01.CSV           | 1977-09-07 to 1977 | Counts / second / sec  | Krimigis / APL   | 58 days  |
| 06 | PWS         | vg1_pws_lr_19770905...  | 1977-09-05 launch  | Electric Field (V/m)   | Scarf & Gurnett  | 16 chan  |
+----+-------------+-------------------------+--------------------+------------------------+------------------+----------+
```

---

### 3. Deep Subsystem Descriptions & Calibration Notes

#### 01. Trajectory Cruise Ephemeris (`REAL_TRAJECTORY_EPHEMERIS`)
- **Primary Source:** NASA GSFC Satellite Situation Center (SSC) Orbit Service.
- **Source URL:** `https://spdf.gsfc.nasa.gov/pub/data/voyager/voyager1/trajectory/ssc/`
- **Coordinate System:** Heliographic inertial coordinates (Radial distance $R$ in AU, Heliographic latitude $\theta$, longitude $\phi$ in degrees).
- **Physical Range:** Begins on Day 252 (September 9, 1977) at $1.01\text{ AU}$ and extends continuously through 2005 past $94.6\text{ AU}$.
- **Calibration & Processing Note:** Computed numerical ephemeris utilizing the Goddard Trajectory Determination System (GTDS). Validated that it excludes near-Earth atmospheric ascent.

#### 02. Magnetic Field Hourly Interplanetary Observations (`REAL_MAG_1977`)
- **Primary Source:** NASA Space Physics Data Facility (SPDF).
- **Source URL:** `https://spdf.gsfc.nasa.gov/pub/data/voyager/voyager1/magnetic_fields/hourly/`
- **Instrument:** Dual Triaxial Fluxgate Magnetometers (MAG) mounted on a 13-meter deployable Astromast boom.
- **Physical Units:** nanoTesla ($\text{nT}$).
- **Measured Parameters:** $F_1$ (48-second field magnitude average), $F_2$ (vector modulus), and RTN components ($B_R, B_T, B_N$).
- **Processing Note:** Interplanetary magnetic field fluctuates between $3.0\text{ nT}$ and $18.5\text{ nT}$ in September 1977 cruise. Missing telemetry values designated as $0.00$.

#### 03. MIT Solar Wind Plasma Observations (`REAL_PLS_1977`)
- **Primary Source:** MIT Voyager Plasma Science Team.
- **Source URL:** `https://spdf.gsfc.nasa.gov/pub/data/voyager/voyager1/plasma/hour/`
- **Instrument:** Plasma Science Experiment (Faraday Cup Detector).
- **Physical Units:** Bulk proton velocity $V_p$ ($\text{km/s}$), ion number density $N_p$ ($\text{cm}^{-3}$), and thermal speed $W_p$ ($\text{km/s}$).
- **Processing Note:** Derived from non-linear Maxwellian fitting to proton current spectra. Errors in bulk velocity $<0.5\%$; errors in density $<5\%$.

#### 04. Cosmic Ray Subsystem Particle Fluxes (`REAL_CRS_1977`)
- **Primary Source:** Caltech / NASA Goddard Space Flight Center.
- **Source URL:** `https://spdf.gsfc.nasa.gov/pub/data/voyager/voyager1/cosmic_rays/ascii/daily/`
- **Instrument:** High Energy Telescope (HET) & Low Energy Telescope (LET).
- **Physical Units:** $\text{Particles} / (\text{cm}^2 \cdot \text{s} \cdot \text{sr} \cdot \text{MeV/n})$.
- **Structure:** 31 discrete energy bins (15 Hydrogen channels from 3.0 to 346 MeV/n; 16 Helium channels from 3.0 to 661 MeV/n).

#### 05. Low Energy Charged Particle Angular Sectors (`REAL_LECP_1977`)
- **Primary Source:** Johns Hopkins University Applied Physics Laboratory (JHU/APL) / NASA PDS.
- **Source URL:** `https://pds-ppi.igpp.ucla.edu/mission/Voyager%201/V1/LECP`
- **Instrument:** Low Energy Charged Particle Stepping Detector (EB01 Electron Band: 22–35 keV).
- **Physical Units:** Counts per second ($\text{s}^{-1}$).
- **Sensor Geometry Verification:** Detector steps through eight $45^\circ$ angular sectors (RS01 through RS08). Sector 1 is blocked by an internal RTG radiation shield on Voyager 1, resulting in an authentic $-1.00$ fill value across 57 of the 58 days. Sector RS10 provides the unshielded sector average.

#### 06. Plasma Wave Subsystem 16-Channel Spectrum Analyzer (`REAL_PWS_LAUNCH_SPECTRUM`)
- **Primary Source:** University of Iowa / NASA SPDF.
- **Source URL:** `https://spdf.gsfc.nasa.gov/pub/data/voyager/voyager1/plasma_waves/low_rate/cdf/1977/`
- **Instrument:** Dual 10-meter dipole antennas and 16-channel spectrum analyzer.
- **Physical Units:** Calibrated root-mean-square Electric Field in Volts per meter ($\text{V/m}$).
- **Frequency Coverage:** 16 logarithmic frequency channels: 10.0 Hz, 17.8 Hz, 31.1 Hz, 56.2 Hz, 100 Hz, 178 Hz, 311 Hz, 562 Hz, 1.00 kHz, 1.78 kHz, 3.11 kHz, 5.62 kHz, 10.0 kHz, 17.8 kHz, 31.1 kHz, and 56.2 kHz.
- **Processing Note:** Recorded on launch day September 5, 1977, measuring intense magnetospheric plasma wave activity during initial Earth-departure transit.

---

### 4. Interactive Data Lab Capabilities

1. **Dual-Mode Architecture:** A top-level tab switcher toggles between `NASA ARCHIVAL OBSERVATORY (REAL DATA)` and `EDUCATIONAL TELEMETRY SIMULATOR (MODEL)`.
2. **Metadata Inspector Card:** Shows the complete instrument name, P.I., institution, date range, units, official clickable NASA repository link, and calibration notes.
3. **Responsive SVG Trend Visualizer:** Dynamically plots measured data:
   - Trajectory distance curve ($1.01\text{ AU} \rightarrow 94.6\text{ AU}$).
   - MAG IMF magnitude line plot ($0 \rightarrow 20\text{ nT}$).
   - PLS solar wind velocity profile ($250 \rightarrow 650\text{ km/s}$).
   - LECP 8-sector bar chart highlighting Sector 1 blockage.
   - PWS 16-channel logarithmic frequency spectrum ($10\text{ Hz} \rightarrow 56.2\text{ kHz}$).
4. **Data Pagination & Slicing:** Responsive table rendering 15 records per page with next/prev navigation.
5. **CSV Export Engine:** Generates instant CSV file downloads formatted directly from the active real dataset (`voyager1_<dataset>_authentic_nasa_dataset.csv`).
6. **Educational Gamification Sync:** Clicking "Verify Archival Observations" logs physical conclusions into `missionStore`, crediting the user toward their 100% mission qualification score.
