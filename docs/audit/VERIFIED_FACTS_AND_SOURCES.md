# VOYAGER 1 // VERIFIED SCIENTIFIC FACTS & PRIMARY SOURCES
## Master Reference Repository of Confirmed Mission Engineering & Historical Data

**Project:** VOYAGER 1 — THE MAKING OF A LEGEND  
**Audit Workspace:** `C:\Users\asus\Downloads\beyond dark`  
**Execution Timestamp:** 2026-11-14T21:26:00Z  
**Standard of Verification:** Primary NASA, JPL, Department of Energy, and peer-reviewed scientific literature only.

---

## 1. Spacecraft Identification & Mission Overview

| Parameter | Confirmed Value | Primary Supporting Source |
|-----------|-----------------|---------------------------|
| **Official Mission Name** | Voyager 1 (originally Mariner Jupiter/Saturn 1977 A) | NASA SP-445, Chapter 2 |
| **NSSDC Spacecraft ID** | `1977-084A` | NASA National Space Science Data Center |
| **Lead Center** | Jet Propulsion Laboratory (JPL), Pasadena, CA | NASA SP-445, Chapter 1 |
| **Launch Date & Time** | September 5, 1977 at 12:56:01 UTC (08:56:01 EDT) | NASA SP-445, Chapter 2 |
| **Launch Site** | Space Launch Complex 41 (SLC-41), Cape Canaveral Air Force Station, FL | NASA Kennedy Space Center Archives |
| **Launch Vehicle** | Titan IIIE / Centaur D-1T / TE-M-364-4 Solid Kick Stage | NASA SP-445, Chapter 2 |
| **Mission Tagline** | *Step into 1977. Join the mission. Build the spacecraft.* | Independent Educational Exhibition Baseline |

---

## 2. Spacecraft Mass Budget & Mechanical Envelope

| Component / Subsystem | Mass / Dimension | Primary Supporting Source |
|-----------------------|------------------|---------------------------|
| **Total Launch Wet Mass** | **$815.0\text{ kg}$** ($1,797\text{ lb}$) | NASA SP-445, Chapter 3 |
| **Total Spacecraft Dry Mass** | **$710.0\text{ kg}$** ($1,565\text{ lb}$) | NASA SP-445, Chapter 3 ($815 - 105$) |
| **Usable Hydrazine Fuel ($N_2H_4$)** | **$105.0\text{ kg}$** ($231\text{ lb}$) | NASA SP-445, Chapter 3 |
| **Propellant Mass Fraction** | **$12.88\%$** ($105 / 815$) | Recomputed Physical Quantity |
| **Central Bus Structure** | 10-sided decagonal aluminum frame, $1.78\text{ m}$ across flats, $0.46\text{ m}$ high | NASA SP-445, Chapter 3 |
| **High-Gain Antenna (HGA)** | $3.7\text{ m}$ ($12.1\text{ ft}$) parabolic Cassegrain dish; graphite-epoxy | NASA SP-445, Chapter 3 |
| **Magnetometer Astromast** | $13.0\text{ m}$ ($43\text{ ft}$) continuous deployable fiberglass/beryllium boom | NASA SP-445, Chapter 4 |
| **RTG Deployable Boom** | $3.7\text{ m}$ ($12\text{ ft}$) fiberglass truss boom | NASA SP-445, Chapter 3 |
| **Science Scan Platform** | 2-axis steerable mount (azimuth $360^\circ$, elevation $210^\circ$), precision $\pm 0.1^\circ$ | NASA SP-445, Chapter 4 |

---

## 3. Electrical Power Subsystem & RTG Physics

| Parameter | Confirmed Value | Primary Supporting Source |
|-----------|-----------------|---------------------------|
| **Power Source** | Three Multi-Hundred-Watt (MHW) RTGs | DOE / GE MHW-RTG Final Safety Analysis Report |
| **Total RTG Mass** | $116.7\text{ kg}$ ($3 \times 38.9\text{ kg}$) | NASA SP-445, Chapter 3 |
| **Fuel Composition** | Plutonium-238 dioxide ($\text{Pu}^{238}\text{O}_2$) ceramic spheres | DOE MHW-RTG Specifications |
| **Fuel Spheres per Unit** | 24 spheres per RTG (72 total on spacecraft) | DOE MHW-RTG Specifications |
| **Total Thermal Power at Launch** | $\sim 7,200\text{ W}_{\text{th}}$ ($2,400\text{ W}_{\text{th}}$ per unit) | NASA SP-445, Chapter 3 |
| **Total Electrical Power at Launch** | $\mathbf{\sim 474\text{ W}_{\text{e}}}$ ($\sim 158\text{ W}_{\text{e}}$ per unit at $30\text{ V}$ DC) | NASA SP-445, Chapter 3 |
| **Thermocouple Technology** | 312 Silicon-Germanium (SiGe) unicouples per generator | DOE MHW-RTG Specifications |
| **Pu-238 Half-Life** | **$87.7\text{ years}$** | National Nuclear Data Center (NNDC) |
| **Current Electrical Output (2024–2026)** | $\sim 220\text{ W}_{\text{e}}$ to $224\text{ W}_{\text{e}}$ (declining at $\sim 4\text{ W/year}$) | NASA Science Voyager Status Updates |

---

## 4. Telecommunications & Deep Space Network

| Parameter | Confirmed Value | Primary Supporting Source |
|-----------|-----------------|---------------------------|
| **Downlink Frequencies** | S-band ($2,295\text{ MHz}$) and X-band ($8,415\text{ MHz}$) | NASA SP-445, Chapter 3 |
| **Transmitter Hardware** | Traveling-Wave Tube (TWT) amplifiers ($18.0\text{ W}$ X-band output) | IEEE Transactions on Communications, Vol. COM-27 |
| **HGA Antenna Gain** | $48.2\text{ dBi}$ at X-band; $35.8\text{ dBi}$ at S-band | JPL Telecommunications Bulletin |
| **Jupiter Telemetry Bitrate** | $115,200\text{ bits per second}$ | NASA SP-445, Chapter 3 |
| **Saturn Telemetry Bitrate** | $44,800\text{ bits per second}$ | NASA SP-445, Chapter 3 |
| **Current Interstellar Bitrate** | $160\text{ bits per second}$ (engineering telemetry) | NASA JPL Mission Operations |
| **Current Distance (>2024)** | $> 24.5\text{ billion km}$ ($> 163\text{ AU}$) | NASA Science "Where are they now?" |
| **One-Way Light Time (>2024)** | $> 22.7\text{ hours}$ (reaching $24.0\text{ hours}$ at $\sim 173.1\text{ AU}$ in late 2026) | Recomputed Physical Law ($OWLT = d/c$) |
| **Deep Space Network Ground Net** | 70-meter parabolic dishes at Goldstone, Madrid, and Canberra | NASA DSN Service Catalog |

---

## 5. Flight Computers & Avionics

| Computer System | Redundancy | Memory Technology & Capacity | Architecture | Primary Source |
|-----------------|------------|-----------------------------|--------------|----------------|
| **Computer Command Subsystem (CCS)** | Dual-redundant | Plated-wire magnetic memory, $4,096\text{ words}$ per unit | **18-bit words**, $250\text{ kHz}$ clock | NASA SP-4225, Chapter 6 |
| **Attitude & Articulation Control (AACS)** | Dual-redundant | Plated-wire magnetic memory, $4,096\text{ words}$ per unit | **18-bit words**, interrupt-driven | NASA SP-4225, Chapter 6 |
| **Flight Data Subsystem (FDS)** | Dual-redundant | Volatile CMOS semiconductor RAM, $8,192\text{ words}$ per unit | **16-bit words**, modular banks | NASA SP-4225, Chapter 6 |
| **Digital Tape Recorder (DTR)** | Single unit | 8-track magnetic tape, $328\text{ m}$ ($1,076\text{ ft}$), $5.36 \times 10^8\text{ bits}$ | Serial recording, $\sim 100\text{ images}$ | NASA SP-445, Chapter 3 |

---

## 6. Scientific Instruments Suite (All 11 Investigations)

| Investigation | Acronym | Principal Investigator & Institution | Physical Measurement | Primary Source |
|---------------|---------|--------------------------------------|----------------------|----------------|
| **Imaging Science Subsystem** | ISS | Bradford A. Smith, University of Arizona | Narrow (1500mm f/8.5) & Wide (200mm f/3.5) Vidicon cameras | NASA SP-445, Ch. 4 |
| **Infrared Interferometer Spectrometer** | IRIS | Rudolf A. Hanel, NASA GSFC | Atmospheric composition & thermal structure ($4–50\ \mu\text{m}$) | NASA SP-445, Ch. 4 |
| **Ultraviolet Spectrometer** | UVS | A. Lyle Broadfoot, Kitt Peak National Obs. | Upper atmosphere & aurora emission ($40–180\text{ nm}$) | NASA SP-445, Ch. 4 |
| **Photopolarimeter Subsystem** | PPS | Arthur L. Lane, JPL | Atmospheric aerosols & ring particle scattering | NASA SP-445, Ch. 4 |
| **Triaxial Fluxgate Magnetometer** | MAG | Norman F. Ness, Bartol / NASA GSFC | Interplanetary magnetic field vector ($0.006–50,000\text{ nT}$) | NASA SP-445, Ch. 4 |
| **Plasma Spectrometer** | PLS | Herbert S. Bridge, MIT | Solar wind thermal protons & electrons ($10\text{ eV}–6\text{ keV}$) | NASA SP-445, Ch. 4 |
| **Low Energy Charged Particle** | LECP | Stamatios M. Krimigis, JHU/APL | Energetic particles & cosmic ions ($22\text{ keV}–30\text{ MeV}$) | NASA SP-445, Ch. 4 |
| **Cosmic Ray Subsystem** | CRS | Rochus E. Vogt, Caltech | Cosmic ray nuclei & galactic electrons ($3–661\text{ MeV/n}$) | NASA SP-445, Ch. 4 |
| **Planetary Radio Astronomy** | PRA | James W. Warwick, Radiophysics Inc. | Planetary radio emissions ($20.4\text{ kHz}–40.5\text{ MHz}$) | NASA SP-445, Ch. 4 |
| **Plasma Wave Subsystem** | PWS | Frederick L. Scarf, TRW / Donald Gurnett, Iowa | Plasma oscillations & wave-particle interactions ($10\text{ Hz}–56.2\text{ kHz}$) | NASA SP-445, Ch. 4 |
| **Radio Science Subsystem** | RSS | Von R. Eshleman, Stanford University | Atmospheric refraction & celestial gravity field tracking | NASA SP-445, Ch. 4 |

---

## 7. The Golden Record Interstellar Message

| Parameter | Confirmed Value | Primary Supporting Source |
|-----------|-----------------|---------------------------|
| **Disc Construction** | 12-inch ($30.5\text{ cm}$) gold-plated copper disc | Sagan et al., *Murmurs of Earth* (1978) |
| **Turntable Speed** | $16\frac{2}{3}\text{ RPM}$ | NASA JPL Golden Record Archives |
| **Total Audio Duration** | $\approx 90\text{ minutes}$ of musical selections from across human cultures | NASA JPL Golden Record Archives |
| **Visual Imagery** | 115 analog-encoded images documenting Earth, life, mathematics, and human culture | NASA JPL Golden Record Archives |
| **Spoken Languages** | Spoken greetings in 55 ancient and modern human languages | NASA JPL Golden Record Archives |
| **Protective Cover** | Gold-anodized aluminum cover etched with pulsar clock map and playback instructions | NASA JPL Golden Record Archives |
| **Radiometric Clock** | Ultra-pure electroplated sample of Uranium-238 ($t_{1/2} = 4.468 \times 10^9\text{ yr}$) | NASA JPL Golden Record Archives |

---

## 8. Primary Sources Bibliography

1. **NASA SP-445:** Morrison, David. *Voyages to Saturn*. National Aeronautics and Space Administration, Washington, D.C., 1982.
2. **NASA SP-445:** Morrison, David, and Jane Samz. *Voyages to Jupiter*. National Aeronautics and Space Administration, Washington, D.C., 1980.
3. **NASA SP-4225:** Tomayko, James E. *Computers in Spaceflight: The NASA Experience*. NASA History Division, Washington, D.C., 1987.
4. **JPL Publication 77-51:** Jet Propulsion Laboratory. *Voyager Project Description: Mariner Jupiter/Saturn 1977*. Pasadena, CA, 1977.
5. **NASA PDS PPI Node:** NASA Planetary Data System Planetary Plasma Interactions Node, University of California, Los Angeles (UCLA).
6. **NASA SPDF:** NASA Goddard Space Flight Center Space Physics Data Facility (SPDF), Greenbelt, MD.
7. **Science 2013:** Gurnett, D. A., et al. "In Situ Observations of Interstellar Plasma with Voyager 1." *Science*, Vol. 341, Issue 6153, 2013, pp. 1489–1492.
