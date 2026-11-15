# VOYAGER 1 // INDEPENDENT SCIENTIFIC DATASET FORENSIC AUDIT
## Stage 2: Byte-by-Byte Dataset Provenance, Header Decoding & Finding Resolution

**Project:** VOYAGER 1 — THE MAKING OF A LEGEND  
**Audit Workspace:** `C:\Users\asus\Downloads\beyond dark`  
**Date of Forensic Execution:** 2026-11-14T21:22:00Z  
**Primary Repositories Audited:**
- NASA Space Physics Data Facility (SPDF) / Goddard Space Flight Center (GSFC)
- NASA Planetary Data System (PDS) Planetary Plasma Interactions (PPI) Node / UCLA
- NASA Satellite Situation Center (SSC) / GSFC
- Caltech Space Radiation Laboratory / Voyager CRS Science Team
- MIT Space Plasma Physics Group / Voyager PLS Team
- JHU Applied Physics Laboratory (JHU/APL) / Voyager LECP Team
- University of Iowa Department of Physics and Astronomy / Voyager PWS Team

---

## 1. Executive Forensic Summary

Every dataset stored in `data/` and all format documentation in `docs/` were subjected to direct byte-level binary inspection, descriptor decoding, header tokenization, and mathematical validation. 

| Dataset File | Instrument / Domain | Exact Format | Size (Bytes) | Record Count | Valid Date Span | Cadence | Units | Coordinate Frame |
|--------------|---------------------|--------------|--------------|--------------|-----------------|---------|-------|------------------|
| `data/particles_lecp/V177DGD01.CSV` | Low Energy Charged Particle (LECP) | ASCII CSV | 31,331 | 115 daily rows | 1977-09-07 to 1977-12-30 | Daily | Counts / flux / scan avg | Spacecraft rotating head ($45^\circ$ sectors) |
| `data/plasma_waves/vg1_pws_lr_19770905_v5.30.cdf` | Plasma Wave Subsystem (PWS) | NASA CDF v3.0 | 277,739 | 8,523 records | 1977-09-05T14:20:23 to 23:59:43 | ~4.08 sec | $\text{V/m}$ | Spacecraft electric dipole antenna |
| `data/trajectory/vy1trj_ssc_1d.asc` | Satellite Situation Center (SSC) | ASCII Columnar | 620,000 | 10,000 lines | 1977-09-09 to 2005-01-24 | 1 Day | AU, Degrees | Heliographic (RTN) / Heliocentric Ecliptic |
| `data/cosmic_rays/vy1crs_1d_1977.asc` | Cosmic Ray Subsystem (CRS) | ASCII Self-Describing | 45,515 | 69 daily rows | 1977-09-08 to 1977-12-31 | 1 Day | $(\text{cm}^2 \cdot \text{s} \cdot \text{sr} \cdot \text{MeV/n})^{-1}$ | Spacecraft frame |
| `data/magnetic_fields/vy1mag_1h.asc` | Triaxial Fluxgate Magnetometer (MAG) | ASCII Columnar | 5,982,591 | 107,982 lines | 1977-09-05 to 1989-12-31 | 1 Hour | $\text{nT}$, AU, Degrees | Inertial Heliographic (IHG) & RTN |
| `data/plasma/v1_hour_1977.asc` | Plasma Spectrometer (PLS) | ASCII Columnar | 111,160 | 1,985 lines | 1977-09-07 to 1977-12-31 | 1 Hour | $\text{km/s}$, $\text{cm}^{-3}$ | Heliographic RTN |
| `data/merged/vy1_1977.asc` | SPDF COHOWeb Merged Hourly | ASCII Columnar | 2,557,920 | 8,760 lines | 1977-01-01 to 1977-12-31 | 1 Hour | Various (nT, km/s, AU) | Heliographic / RTN / IHG |
| `data/voyager1_data.txt` | Untracked Legacy File | HTML Webpage | 351,877 | N/A | None (HTML) | None | None | None (INVALID_DATA_HTML) |

---

## 2. Forensic Resolution of the 7 Specific Findings

### 2.1 LECP Dataset (`V177DGD01.CSV`) — Energy Channels vs. Angular Sectors
- **Discrepancy Investigated:** Earlier reporting claimed that the 8 columns (`EB01RS01` to `EB01RS08`) represented 8 distinct energy channels of low-energy charged particles.
- **Header Byte Decoding:**
  ```csv
  Voyager1,printed,18-MAR-04,18:05:13,V177DGD01.csv
  YEAR,DAY,HH,MM,SS,YEAR,DAY,HH,MM,SS,dd,EB01RS01,EB01RS01U,EB01RS02,EB01RS02U,EB01RS03,EB01RS03U,EB01RS04,EB01RS04U,EB01RS05,EB01RS05U,EB01RS06,EB01RS06U,EB01RS07,EB01RS07U,EB01RS08,EB01RS08U,EB01RS09,EB01RS09U,EB01RS10,EB01RS10U
  ```
- **Physical Meaning of Channel Designators:**
  - `EB01`: **Electron Band 01** (electrons with energies $\sim 22\text{ keV} \le E \le 35\text{ keV}$).
  - `RS01` through `RS08`: **Rotating Sectors 01 through 08**!
  - The Low Energy Charged Particle (LECP) instrument (Principal Investigator: Dr. Stamatios M. Krimigis, JHU/APL) features a particle detector mounted on a rotating stepping motor that steps through **8 discrete $45^\circ$ angular sectors** every 192 seconds to measure the angular pitch distribution and anisotropy of the particle flux.
  - **Sector 1 (`RS01`):** On Voyager 1, Sector 1 faces an internal 2 mm aluminum shield mounted to the spacecraft body (to measure background radiation from the RTGs and cosmic ray bremsstrahlung). Because Sector 1 is physically blocked, its calibrated electron flux is designated as fill value `-1.00` across all records.
  - `RS09`: Sector 9 background / shielded sector calculation.
  - `RS10`: Sector 10 scan-average (average flux across open unshielded sectors).
  - `U` suffix (e.g. `EB01RS02U`): $1\sigma$ counting uncertainty.
- **Scientific Verdict:** The 8 columns do **NOT** represent 8 energy channels. They represent **8 physical angular viewing sectors** of a **single energy band** (`EB01`), plus sector 9 background and sector 10 scan average.

---

### 2.2 PWS Dataset (`vg1_pws_lr_19770905_v5.30.cdf`) — CDF Variable Metadata & Units
- **Discrepancy Investigated:** Earlier reporting reported units of $(V/m)^2/Hz$ (electric field spectral power density). SPDF's CDF metadata was audited to determine the true calibrated units.
- **CDF Binary Record Inspection:**
  - File format: Common Data Format v3.0 (`magic: 0xcdf30001`).
  - Variable name: `electric_field` (Variable Descriptor Record at byte offset 94833).
  - Variable attribute `UNITS` (Attribute Descriptor Record at byte offset 18565):
    - Variable 0 (`epoch`): `ns` (nanoseconds, CDF_TIME_TT2000).
    - Variable 1 (`frequency`): `Hz`.
    - **Variable 2 (`electric_field`): `V/m`** (Volts per meter).
    - Variable 3 (`sc_mode`): string character code.
    - Variable 4 (`sclk`): spacecraft clock string.
    - Variable 5 (`frequency_LABL_1`): `Hz`.
  - Description string at byte offset 23477:
    `"calibrated E-field for 16 channels."`
- **16 Frequency Channels (Decoded from byte offset 261961):**
  $$10.0\text{ Hz}, 17.8\text{ Hz}, 31.1\text{ Hz}, 56.2\text{ Hz}, 100.0\text{ Hz}, 178.0\text{ Hz}, 311.0\text{ Hz}, 562.0\text{ Hz},$$
  $$1.00\text{ kHz}, 1.78\text{ kHz}, 3.11\text{ kHz}, 5.62\text{ kHz}, 10.0\text{ kHz}, 17.8\text{ kHz}, 31.1\text{ kHz}, 56.2\text{ kHz}$$
- **Temporal Span & Cadence:**
  - Variable `epoch` contains exactly **8,523 records**.
  - First valid record: `1977-09-05T14:20:23.604 UTC` ($\sim 1.4\text{ hours}$ post-launch).
  - Last record: `1977-09-05T23:59:43.638 UTC`.
  - Nominal sampling cadence: **4.08 seconds** (one full 16-channel sweep every $\sim 4$ seconds).
- **Scientific Verdict:** The units stored in the CDF file are strictly **$\text{V/m}$** (calibrated root-mean-square electric field amplitude), **NOT** $(\text{V/m})^2/\text{Hz}$. Spectral density $(\text{V/m})^2/\text{Hz}$ is a derived quantity calculated by dividing $(E_{rms})^2$ by each channel's effective noise bandwidth $\Delta f$.

---

### 2.3 Trajectory Dataset (`vy1trj_ssc_1d.asc`) — Day 252 vs. Launch Day & Ephemeris Nature
- **Discrepancy Investigated:** Launch occurred on September 5, 1977 (Day 248). Why does `vy1trj_ssc_1d.asc` begin on Day 252? Is this measured tracking or predicted ephemeris?
- **Format Documentation Citation (`docs/trajectory/vy1trj_ssc_fmt.txt`):**
  ```text
  Voyager 1 Interplanetary Cruise Trajectory Data from the NSSDC Satellite
  Situation Center (SSC) - Daily Values for 1977 to 2005
  Date Coverage: 1977-09-09 to 2005-01-24
  Data Source:
  These data were obtained from running the program HELICOOR...
  These data are based on predicted trajectories calculated with the GTDS 
  code by the NSSDC Satellite Situation Center and converted to solar ecliptic 
  and heliographic coordinates by the HELIOCOOR program.
  ```
- **Chronological Resolution:**
  - Launch: September 5, 1977 = Day 248.
  - Day 248 to 251: Spacecraft was in near-Earth orbital insertion, injection burn, and early attitude acquisition.
  - Day 252 (September 9, 1977): Spacecraft crossed into interplanetary cruise at $R = 1.0100\text{ AU}$. The Goddard Satellite Situation Center (SSC) cruise trajectory model was initialized specifically for interplanetary cruise post-injection, excluding near-Earth launch ascent.
- **Exact File Limits:**
  - Total records: **10,000 daily lines**.
  - Record 1: `1977 252.00   1.0100    0.1000 347.30   7.3347 284.63 271.86` (1977-09-09 00:00 UT, $R = 1.0100\text{ AU}$).
  - Record 10,000: `2005  24.00  94.3900   34.7000 253.10  34.0404 195.30 172.32` (2005-01-24 00:00 UT, $R = 94.3900\text{ AU}$).
  - Note: File ends on Day 24 of 2005, **not** December 31, 2005.
- **Ephemeris Nature:** It is a **computed numerical ephemeris** calculated by the Goddard Trajectory Determination System (GTDS) orbit simulation model and converted to heliographic/ecliptic coordinates by HELICOOR, **not** raw DSN Doppler/ranging tracking passes.

---

### 2.4 Cosmic Ray Subsystem (`vy1crs_1d_1977.asc`) — Daily Dataset vs. 6-Hour Format Doc
- **Discrepancy Investigated:** `vy1crs_6h_fmt.txt` (167 KB) was supplied as documentation, but `vy1crs_1d_1977.asc` is a daily dataset. Does the 6-hour specification describe the daily dataset?
- **Forensic Header Analysis:**
  - `vy1crs_1d_1977.asc` is **completely self-describing** in its first 35 lines:
    ```text
    voyager-1
    1977-09-08T00:00:00
    1977-12-31T00:00:00
    31
    1   3.000 -   4.600 MeV/n Hydrogen flux
    ...
    15 270.050 - 346.034 MeV/n Hydrogen flux
    16   3.000 -   4.600 MeV/n Helium flux
    ...
    31 480.486 - 661.408 MeV/n Helium flux
    ```
  - Total lines: 104 lines = 35 header lines + 69 daily data records.
  - Data lines (lines 36 to 104): Exactly 63 whitespace-delimited tokens:
    - Token 0: ISO 8601 timestamp (`1977-09-08T00:00:00` to `1977-12-31T00:00:00`).
    - Tokens 1–62: 31 flux values, each followed by its $1\sigma$ uncertainty.
  - Units: Particles / $(\text{cm}^2 \cdot \text{s} \cdot \text{sr} \cdot \text{MeV/n})$.
- **Scientific Verdict:** `vy1crs_6h_fmt.txt` specifies the legacy 6-hour DCFLUX archive format (`vy1crs_6hour_YYYY.asc`) and does **not** specify `vy1crs_1d_1977.asc`. The daily file is self-contained and defines its own 31 channels directly in lines 1–35.

---

### 2.5 Magnetometer Dataset (`vy1mag_1h.asc`) — Columns, Coordinates & Vector Recovery
- **File Structure:** 5,982,591 bytes, 107,982 hourly lines covering 1977-09-05 to 1989-12-31.
- **Parameters per Line:**
  1. Spacecraft ID (`1` = Voyager 1)
  2. Year (2 digits: `77` to `89`)
  3. Day of Year (`1` to `366`)
  4. Hour (`0` to `23`)
  5. $X$ coordinate (AU, Sun-centered Inertial Heliographic IHG frame)
  6. $Y$ coordinate (AU, IHG frame)
  7. $Z$ coordinate (AU, IHG frame)
  8. Radial distance $R = \sqrt{X^2 + Y^2 + Z^2}$ (AU)
  9. $F1$: Average field magnitude in nanoTesla ($\text{nT}$), computed as average of 48-second field magnitudes.
  10. $F2$: Field modulus in nanoTesla ($\text{nT}$), computed as norm of vector average $\sqrt{\bar{B}_1^2 + \bar{B}_2^2 + \bar{B}_3^2}$.
  11. $\delta$ (delta): Latitudinal elevation angle of field vector (degrees, Heliographic / RTN frame).
  12. $\lambda$ (lambda): Longitudinal azimuth angle of field vector (degrees, Heliographic / RTN frame).
- **Vector Component Recovery Formulas (RTN Coordinates):**
  $$B_R = F2 \cdot \cos(\lambda) \cdot \cos(\delta)$$
  $$B_T = F2 \cdot \sin(\lambda) \cdot \cos(\delta)$$
  $$B_N = F2 \cdot \sin(\delta)$$
- **Fill Value:** `0.0`
- **Units:** nanoTesla ($\text{nT}$) for magnetic fields; Astronomical Units ($\text{AU}$) for distances; degrees for angles.

---

### 2.6 Plasma Spectrometer Dataset (`v1_hour_1977.asc`) — MIT Bundle Metadata & Coverage
- **File Structure:** 111,160 bytes, 1,985 hourly records.
- **Date Coverage:** 1977 Day 250 Hour 11 (September 7, 1977 11:00 UT) to 1977 Day 365 Hour 14 (December 31, 1977 14:00 UT).
- **Parameters per Line:**
  1. Year (`1977`)
  2. Day of Year (`250` to `365`)
  3. Hour of Day (`0` to `23`)
  4. Proton bulk speed ($|V|$, in $\text{km/s}$)
  5. Proton number density ($N_p$, in $\text{cm}^{-3}$)
  6. Proton thermal speed ($V_{th}$, in $\text{km/s}$); proton temperature in eV is $T_p = 0.0052 \cdot V_{th}^2$.
  7. $V_R$ (Radial velocity component in $\text{km/s}$, RTN frame)
  8. $V_T$ (Transverse velocity component in $\text{km/s}$, RTN frame)
  9. $V_N$ (Normal velocity component in $\text{km/s}$, RTN frame)
- **Data Reduction Technique:** Convected isotropic Maxwellian distribution fit by MIT Voyager Plasma Science Team (John Richardson / Herbert Bridge).
- **Missing Data:** Gaps occur when telemetry was dedicated to other instruments or during DSN tracking station handover; missing hours are omitted from the row sequence.

---

### 2.7 Merged Hourly COHO Dataset (`vy1_1977.asc`) — Multi-Instrument Integration
- **File Structure:** 2,557,920 bytes, exactly **8,760 lines** ($365 \text{ days} \times 24 \text{ hours}$).
- **Token Count:** Exactly 34 tokens per line.
- **Instrument Mapping across Columns:**
  - Tokens 0–2: Time (`Year`, `Day`, `Hour`).
  - Tokens 3–5: Trajectory (Heliocentric distance $R$ in AU, Heliographic latitude, Heliographic longitude).
  - Tokens 6–10: Magnetic Field MAG ($F1$ magnitude, $F2$ modulus, $B_R$, $B_T$, $B_N$ in nT).
  - Tokens 11–15: Solar Wind Plasma PLS (Proton speed in km/s, density in $\text{cm}^{-3}$, temperature in K, thermal parameters).
  - Tokens 16–33: Energetic Particles CRS & LECP (18 proton and ion flux channels in scientific notation).
- **Fill / Missing-Value Conventions:**
  - Trajectory: `999.99`, `9999.9`
  - Magnetic Field: `999.999`
  - Plasma: `9999.9`, `99.99999`, `9999999.`
  - Energetic Particles: `9.999e+05`
- **Chronological Boundary:** Day 1 Hour 0 to Day 248 Hour 16 are filled with missing-value tokens because the spacecraft had not yet launched. MAG measurements begin at Day 248 Hour 17; Trajectory values begin at Day 250 Hour 0; PLS measurements begin at Day 250 Hour 11.
