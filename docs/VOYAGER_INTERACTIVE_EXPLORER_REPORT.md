# VOYAGER 1: INTERACTIVE SPACECRAFT EXPLORER TECHNICAL REPORT
## "VISUALIZE VOYAGER 1" — Hardware Architecture & Interactive System

**Module:** `src/scripts/ui/spacecraft-explorer.js`  
**Styles:** `src/styles/explore.css`  
**Mount Point:** Page 3 // Explore Hub (`#explore-pane-spacecraft`)  
**Tagline:** *Explore the spacecraft. Discover the technology. Understand the mission.*  
**Primary Visual Asset:** `public/assets/images/spacecraft-profile.jpg.jpeg` (NASA/JPL Line Drawing P-18882)

---

## 1. ARCHITECTURAL OVERVIEW

The **Visualize Voyager 1** explorer provides an interactive, non-destructive, two-column visual hardware exploration system:
- **Left Column:** High-contrast diagram viewport with 12 pulsing, interactive hotspot pins placed at verified physical coordinates over the spacecraft schematic. Below the diagram, a numbered directory bar allows instant selection by component name.
- **Right Column:** Dedicated CRT terminal dossier displaying real-time subsystem metadata, operational status, What is it?, What does it do?, Why is it critical?, engineering metrics table, and an official NASA NSSDCA / JPL repository link.
- **Single Active Selection:** Selecting a pin instantaneously updates the right terminal panel without flickering or shifting the viewport.
- **Preservation Rule:** The spacecraft image is **never hidden, replaced, or covered** by modals or popups.

---

## 2. THE 12 VERIFIED NASA HARDWARE HOTSPOTS

| # | Hotspot Name | Schematic Coordinates | Subsystem Role | Operational Status | Key Engineering Metric | Official NASA Citation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | **High-Gain Antenna (HGA)** | `X: 48%, Y: 22%` | Primary Deep Space Comms | Active (>166 AU) | 3.66 m graphite-epoxy reflector, S/X-band, ±0.05° pointing | [NASA NSSDCA 1977-084A](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1977-084A) |
| **02** | **Low-Gain Antenna (LGA)** | `X: 48%, Y: 12%` | Emergency Uplink Reserve | Standby Reserve | Omnidirectional feed horn assembly, broad hemispherical pattern | JPL Voyager Functional Description |
| **03** | **Radioisotope Thermoelectric Generators (RTGs)** | `X: 18%, Y: 40%` | Nuclear Electrical Power | Active (~220 W) | 3 MHW-RTGs, 7,200 W thermal launch, 312 SiGe thermocouples | [NASA Science Voyager Power](https://science.nasa.gov/mission/voyager/voyager-power-and-energy/) |
| **04** | **Magnetometer Boom (MAG)** | `X: 78%, Y: 74%` | Interstellar Magnetic Fields | Active | 13.0 m deployable fiberglass Astromast, dual triaxial fluxgates | [NASA GSFC OMNIWeb MAG](https://omniweb.gsfc.nasa.gov/coho/form/voyager1.html) |
| **05** | **Plasma Wave Subsystem (PWS)** | `X: 28%, Y: 68%` | Plasma Wave Resonances | Active | Dual 10 m beryllium-copper V-dipole, 10 Hz to 56 kHz (16 ch) | [NASA PDS Voyager PWS](https://pds.nasa.gov/ds-view/pds/viewBundle.jsp?identifier=urn%3Anasa%3Apds%3Avoyager1.pws.sa&version=2.0) |
| **06** | **Science Scan Platform** | `X: 75%, Y: 44%` | Steerable Optical Platform | Deactivated (1990) | 2-axis articulation (Az 360°, El 210°), carried ISS, IRIS, UVS | JPL ISS Operations Summary |
| **07** | **Cosmic Ray Subsystem (CRS)** | `X: 66%, Y: 48%` | High-Energy Particle Telescopes | Active | Silicon surface barrier detectors, 0.5 to 500 MeV/nuc | [NASA GSFC CRS Investigation](https://voyager.gsfc.nasa.gov/crs.html) |
| **08** | **Low Energy Charged Particle (LECP)** | `X: 60%, Y: 53%` | Stepper Particle Spectrometer | Active | 8-sector Geneva stepper, Sector 1 RTG shadow shield | [JHU/APL LECP Manual](https://voyager.jpl.nasa.gov/mission/spacecraft/instruments/lecp/) |
| **09** | **Plasma Spectrometer (PLS)** | `X: 32%, Y: 55%` | Thermal Plasma Ion Sensor | Silent (since 1980) | 4 modulated Faraday cups, 10 eV to 6 keV ion collection | MIT PLS Investigation |
| **10** | **Attitude Control Thrusters (RCS/TCM)** | `X: 42%, Y: 62%` | 3-Axis Attitude Stabilization | Active (Backup TCM) | 16 Aerojet MR-103 catalytic hydrazine engines (0.9 N / 0.2 lbf) | [JPL News 37-Yr Thruster Test](https://www.jpl.nasa.gov/news/voyager-1-fires-up-thrusters-after-37-years) |
| **11** | **Decagonal Mission Bus** | `X: 47%, Y: 50%` | Central Avionics Chassis | Active | 10-bay 6061-T6 aluminum prism, 4KB plated-wire memory | JPL Spacecraft Reference Design |
| **12** | **The Golden Record** | `X: 52%, Y: 58%` | Interstellar Cultural Message | Passive (Eternal) | 12-inch gold-plated copper disc on Bay 4, ²³⁸U clock spot | [NASA JPL Golden Record](https://voyager.jpl.nasa.gov/golden-record/) |

---

## 3. INTERACTIVE BEHAVIOR & RESPONSIVENESS

- **Pointer Interaction:** Clicking any pin triggers an active pulse glow (`#38bdf8`) and highlights the corresponding directory pill below.
- **Accessibility:** Full keyboard tab index (`tabindex="0"`), keyboard activation (`Enter` / `Space`), and descriptive `aria-label` tags for screen readers.
- **Mobile Adaptability:** On screens below 992px, the stage grid seamlessly transitions to a stacked single-column layout, ensuring pins scale proportionally over the diagram.
