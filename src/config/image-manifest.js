/**
 * Voyager 1 — Master Future Image Manifest (26 Assigned Placements)
 * 
 * Central registry of all 26 historical NASA/JPL research imagery slots
 * designated across Page 2 (Assembly Stages) and Page 3 (Explore Research Categories).
 * 
 * Status for all 26 slots: "AWAITING IMAGE" (Batch 04 Future Asset Ingestion).
 * Components are wired to expect these exact file paths and display an elegant
 * "AWAITING IMAGE // VERIFIED NASA ARCHIVE SLOT" HUD state without console errors or broken images.
 */

export const FUTURE_IMAGE_MANIFEST = [
  // ==========================================================================
  // PAGE 2 — ASSEMBLY STAGES (2 SLOTS)
  // ==========================================================================
  {
    index: 1,
    id: "01-stage-03-rtg-installation",
    fileName: "01-stage-03-rtg-installation.jpg",
    page: "Page 2 — Spacecraft Assembly Facility",
    location: "Stage 03: RTG Installation & Power Generation",
    expectedPath: "/assets/images/research/01-stage-03-rtg-installation.jpg",
    title: "RTG Boom Integration in Cleanroom",
    description: "Installation and electrical testing of the three Multi-Hundred-Watt Radioisotope Thermoelectric Generators (MHW-RTG) onto the deployable fiberglass boom in JPL Building 179.",
    nasaSource: "NASA/JPL SAF Building 179 Archive / DOE MHW-RTG Final Safety Analysis",
    catalogRef: "JPL SAF-179-1977-RTG",
    status: "AWAITING IMAGE"
  },
  {
    index: 2,
    id: "02-stage-04-scan-platform-magnetometer",
    fileName: "02-stage-04-scan-platform-magnetometer.jpg",
    page: "Page 2 — Spacecraft Assembly Facility",
    location: "Stage 04: Science Scan Platform & Magnetometer Boom Integration",
    expectedPath: "/assets/images/research/02-stage-04-scan-platform-magnetometer.jpg",
    title: "Science Platform & Astromast Alignment",
    description: "Mechanical attachment and precision optical alignment of the two-axis articulated science scan platform and 13-meter deployable Astromast boom.",
    nasaSource: "NASA/JPL Technical Report 77-51 / Astro Research Corp Documentation",
    catalogRef: "JPL SAF-179-1977-PAYLOAD",
    status: "AWAITING IMAGE"
  },

  // ==========================================================================
  // PAGE 3 — CATEGORY 1: PARTS & MATERIALS (4 SLOTS)
  // ==========================================================================
  {
    index: 3,
    id: "03-cat-01-high-gain-antenna",
    fileName: "03-cat-01-high-gain-antenna.jpg",
    page: "Page 3 — Research Archives / Category 1",
    location: "Subtopic 01.01: 3.7-Meter High-Gain Antenna (HGA)",
    expectedPath: "/assets/images/research/03-cat-01-high-gain-antenna.jpg",
    title: "3.7-Meter High-Gain Cassegrain Reflector",
    description: "Graphite-epoxy composite parabolic reflector with aluminum honeycomb core and titanium Cassegrain subreflector struts for S/X-band deep space links.",
    nasaSource: "NASA/JPL Line Drawing P-18882 / Aeronutronic Ford Technical Specs",
    catalogRef: "NASA P-18882",
    status: "AWAITING IMAGE"
  },
  {
    index: 4,
    id: "04-cat-01-radioisotope-thermoelectric-generators",
    fileName: "04-cat-01-radioisotope-thermoelectric-generators.jpg",
    page: "Page 3 — Research Archives / Category 1",
    location: "Subtopic 01.02: Radioisotope Thermoelectric Generators (RTGs)",
    expectedPath: "/assets/images/research/04-cat-01-radioisotope-thermoelectric-generators.jpg",
    title: "MHW-RTG Power Generation Unit Cutaway",
    description: "Internal cutaway and flight assembly of the Plutonium-238 alpha decay thermoelectric generator units providing 474W electrical output at launch.",
    nasaSource: "Department of Energy / NASA Technical Paper GESP-7107",
    catalogRef: "DOE GESP-7107",
    status: "AWAITING IMAGE"
  },
  {
    index: 5,
    id: "05-cat-01-magnetometer-boom",
    fileName: "05-cat-01-magnetometer-boom.jpg",
    page: "Page 3 — Research Archives / Category 1",
    location: "Subtopic 01.03: 13-Meter Magnetometer Boom",
    expectedPath: "/assets/images/research/05-cat-01-magnetometer-boom.jpg",
    title: "13-Meter Deployable Astromast Lattice",
    description: "Coiled fiberglass-reinforced epoxy triangular lattice mast extending dual triaxial fluxgate magnetometers away from spacecraft electrical interference.",
    nasaSource: "NASA SP-445 Chapter 4 / JPL Technical Memorandum 33-728",
    catalogRef: "JPL TM-33-728",
    status: "AWAITING IMAGE"
  },
  {
    index: 6,
    id: "06-cat-01-golden-record-cover-disc",
    fileName: "06-cat-01-golden-record-cover-disc.jpg",
    page: "Page 3 — Research Archives / Category 1",
    location: "Subtopic 01.04: The Golden Record & Aluminum Cover",
    expectedPath: "/assets/images/research/06-cat-01-golden-record-cover-disc.jpg",
    title: "The Golden Record & Engraved Pulsar Cover",
    description: "Gold-plated copper phonograph record and electrochemically etched protective aluminum cover carrying humanity's greetings, music, and scientific diagrams.",
    nasaSource: "NASA/JPL-Caltech Catalog PIA00146 / Carl Sagan Collection",
    catalogRef: "PIA00146",
    status: "AWAITING IMAGE"
  },

  // ==========================================================================
  // PAGE 3 — CATEGORY 2: HOW IT WAS BUILT (4 SLOTS)
  // ==========================================================================
  {
    index: 7,
    id: "07-cat-02-grand-tour-mariner-jupiter-saturn",
    fileName: "07-cat-02-grand-tour-mariner-jupiter-saturn.jpg",
    page: "Page 3 — Research Archives / Category 2",
    location: "Subtopic 02.01: Grand Tour Concept & MJS-77 Program",
    expectedPath: "/assets/images/research/07-cat-02-grand-tour-mariner-jupiter-saturn.jpg",
    title: "Grand Tour Orbital Trajectory Alignment Map",
    description: "Gary Flandro orbital alignment calculations utilizing a rare 175-year planetary geometry to explore Jupiter and Saturn via successive gravity assists.",
    nasaSource: "JPL Technical Memorandum 312-505 / NASA SP-445 Chapter 2",
    catalogRef: "JPL TM-312-505",
    status: "AWAITING IMAGE"
  },
  {
    index: 8,
    id: "08-cat-02-jpl-building-179-assembly",
    fileName: "08-cat-02-jpl-building-179-assembly.jpg",
    page: "Page 3 — Research Archives / Category 2",
    location: "Subtopic 02.02: Cleanroom Fabrication in JPL SAF Building 179",
    expectedPath: "/assets/images/research/08-cat-02-jpl-building-179-assembly.jpg",
    title: "JPL SAF Building 179 High Bay Cleanroom",
    description: "Technicians and engineers assembling the 10-sided decagonal bus airframe under Class 100,000 cleanroom conditions in Pasadena, California.",
    nasaSource: "NASA/JPL Spacecraft Assembly Facility (SAF 179) Archives",
    catalogRef: "JPL SAF-179-HIST",
    status: "AWAITING IMAGE"
  },
  {
    index: 9,
    id: "09-cat-02-space-simulator-qualification",
    fileName: "09-cat-02-space-simulator-qualification.jpg",
    page: "Page 3 — Research Archives / Category 2",
    location: "Subtopic 02.03: 25-Foot Space Simulator Thermal-Vacuum Testing",
    expectedPath: "/assets/images/research/09-cat-02-space-simulator-qualification.jpg",
    title: "Thermal-Vacuum Testing in 25-Foot Simulator",
    description: "Voyager Proof Test Model (PTM) undergoing solar beam and cryo-shroud vacuum qualification to simulate interplanetary thermal extremes.",
    nasaSource: "NASA/JPL-Caltech Catalog PIA21734",
    catalogRef: "PIA21734",
    status: "AWAITING IMAGE"
  },
  {
    index: 10,
    id: "10-cat-02-redundant-computer-architecture",
    fileName: "10-cat-02-redundant-computer-architecture.jpg",
    page: "Page 3 — Research Archives / Category 2",
    location: "Subtopic 02.04: Dual-Redundant Computer Command Subsystem (CCS)",
    expectedPath: "/assets/images/research/10-cat-02-redundant-computer-architecture.jpg",
    title: "Dual CCS Computer Architecture & Plated-Wire Memory",
    description: "Custom discrete-component computer command subsystem (CCS, FDS, and AACS) featuring 4,096-word plated-wire non-volatile memory arrays.",
    nasaSource: "NASA SP-445 Chapter 3 / JPL Computer Hardware Engineering Archives",
    catalogRef: "JPL CCS-ENG-1977",
    status: "AWAITING IMAGE"
  },

  // ==========================================================================
  // PAGE 3 — CATEGORY 3: THE LAUNCH (4 SLOTS)
  // ==========================================================================
  {
    index: 11,
    id: "11-cat-03-voyager-1-liftoff-slc-41",
    fileName: "11-cat-03-voyager-1-liftoff-slc-41.jpg",
    page: "Page 3 — Research Archives / Category 3",
    location: "Subtopic 03.01: Liftoff from Space Launch Complex 41",
    expectedPath: "/assets/images/research/11-cat-03-voyager-1-liftoff-slc-41.jpg",
    title: "Voyager 1 Liftoff on Titan IIIE-Centaur",
    description: "Titan IIIE-Centaur launching Voyager 1 from Cape Canaveral Air Force Station Launch Complex 41 on September 5, 1977 at 12:56:01 UTC.",
    nasaSource: "NASA Kennedy Space Center Photo KSC-77PC-0294",
    catalogRef: "KSC-77PC-0294",
    status: "AWAITING IMAGE"
  },
  {
    index: 12,
    id: "12-cat-03-voyager-launch-sequence-comparison",
    fileName: "12-cat-03-voyager-launch-sequence-comparison.jpg",
    page: "Page 3 — Research Archives / Category 3",
    location: "Subtopic 03.02: Launch Sequence & Trajectory Comparison with Voyager 2",
    expectedPath: "/assets/images/research/12-cat-03-voyager-launch-sequence-comparison.jpg",
    title: "Voyager 1 vs. Voyager 2 Trajectory Profiles",
    description: "Orbital mechanics diagram illustrating how Voyager 1 departed 16 days after Voyager 2 on a faster, steeper trajectory to overtake its twin probe.",
    nasaSource: "NASA SP-445 Chapter 4 / JPL Flight Operations Trajectory Maps",
    catalogRef: "JPL TRAJ-MJS-COMP",
    status: "AWAITING IMAGE"
  },
  {
    index: 13,
    id: "13-cat-03-titan-iiie-centaur-stack",
    fileName: "13-cat-03-titan-iiie-centaur-stack.jpg",
    page: "Page 3 — Research Archives / Category 3",
    location: "Subtopic 03.03: Titan IIIE / Centaur D-1T / Star-37E Stack",
    expectedPath: "/assets/images/research/13-cat-03-titan-iiie-centaur-stack.jpg",
    title: "Titan IIIE / Centaur / Star-37E Stack Diagram",
    description: "Engineering cutaway drawing of the 160-foot launch vehicle stack: solid rocket boosters, liquid core stages, cryogenic Centaur, and solid kick motor.",
    nasaSource: "NASA General Dynamics Convair / Martin Marietta Launch Vehicle Handbook",
    catalogRef: "GD-CONVAIR-T3E",
    status: "AWAITING IMAGE"
  },
  {
    index: 14,
    id: "14-cat-03-prelaunch-servicing",
    fileName: "14-cat-03-prelaunch-servicing.jpg",
    page: "Page 3 — Research Archives / Category 3",
    location: "Subtopic 03.04: Pre-Launch Servicing in SAEF II High Bay",
    expectedPath: "/assets/images/research/14-cat-03-prelaunch-servicing.jpg",
    title: "SAEF II Pre-Launch Encapsulation & Hydrazine Loading",
    description: "Spacecraft servicing in Spacecraft Assembly and Encapsulation Facility II (SAEF II) at Kennedy Space Center, including high-pressure monopropellant loading.",
    nasaSource: "NASA Kennedy Space Center SAEF II Documentation",
    catalogRef: "KSC SAEF-II-77",
    status: "AWAITING IMAGE"
  },

  // ==========================================================================
  // PAGE 3 — CATEGORY 4: INSTRUMENTS & DATA (4 SLOTS)
  // ==========================================================================
  {
    index: 15,
    id: "15-cat-04-science-scan-platform-instruments",
    fileName: "15-cat-04-science-scan-platform-instruments.jpg",
    page: "Page 3 — Research Archives / Category 4",
    location: "Subtopic 04.01: Articulated Science Scan Platform Optical Suite",
    expectedPath: "/assets/images/research/15-cat-04-science-scan-platform-instruments.jpg",
    title: "Optical Remote-Sensing Scan Platform Cluster",
    description: "Instrument cluster comprising narrow and wide-angle Vidicon cameras (ISS), infrared interferometer (IRIS), ultraviolet spectrometer (UVS), and photopolarimeter (PPS).",
    nasaSource: "NASA SP-445 Chapter 4 / JPL Science Instrument Integration Guide",
    catalogRef: "JPL INST-SCAN-01",
    status: "AWAITING IMAGE"
  },
  {
    index: 16,
    id: "16-cat-04-fields-particles-suite",
    fileName: "16-cat-04-fields-particles-suite.jpg",
    page: "Page 3 — Research Archives / Category 4",
    location: "Subtopic 04.02: Non-Targeted Fields & Particles Payload",
    expectedPath: "/assets/images/research/16-cat-04-fields-particles-suite.jpg",
    title: "Interstellar Fields & Particles Sensor Suite",
    description: "Cosmic Ray Subsystem (CRS), Low-Energy Charged Particle (LECP), Plasma Spectrometer (PLS), and Plasma Wave Subsystem (PWS) detector antennas.",
    nasaSource: "NASA Planetary Data System (PDS) / Goddard Space Flight Center",
    catalogRef: "NASA GSFC-PDS-FP",
    status: "AWAITING IMAGE"
  },
  {
    index: 17,
    id: "17-cat-04-digital-tape-recorder",
    fileName: "17-cat-04-digital-tape-recorder.jpg",
    page: "Page 3 — Research Archives / Category 4",
    location: "Subtopic 04.03: Digital Tape Recorder (DTR) Buffer Memory",
    expectedPath: "/assets/images/research/17-cat-04-digital-tape-recorder.jpg",
    title: "Onboard Digital Tape Recorder (DTR) Mechanics",
    description: "Eight-track magnetic digital tape recorder capable of buffering 536 megabits (67 megabytes) of encounter imagery during planetary flybys.",
    nasaSource: "JPL Telecommunications & Data Acquisition Historical Record",
    catalogRef: "JPL DTR-HIST-01",
    status: "AWAITING IMAGE"
  },
  {
    index: 18,
    id: "18-cat-04-deep-space-network",
    fileName: "18-cat-04-deep-space-network.jpg",
    page: "Page 3 — Research Archives / Category 4",
    location: "Subtopic 04.04: NASA Deep Space Network Ground Stations",
    expectedPath: "/assets/images/research/18-cat-04-deep-space-network.jpg",
    title: "DSN 70-Meter Deep Space Parabolic Dish Antenna",
    description: "The Deep Space Network 70-meter antenna array tracking Voyager 1 carrier signals over 24 billion kilometers with cryogenically cooled maser preamplifiers.",
    nasaSource: "NASA/JPL Deep Space Network Catalog / Goldstone Communications Complex",
    catalogRef: "DSN-DSS-14-70M",
    status: "AWAITING IMAGE"
  },

  // ==========================================================================
  // PAGE 3 — CATEGORY 5: KEY DISCOVERIES (4 SLOTS)
  // ==========================================================================
  {
    index: 19,
    id: "19-cat-05-jupiter-io-volcanism",
    fileName: "19-cat-05-jupiter-io-volcanism.jpg",
    page: "Page 3 — Research Archives / Category 5",
    location: "Subtopic 05.01: Active Volcanism on Io & Jupiter Atmosphere",
    expectedPath: "/assets/images/research/19-cat-05-jupiter-io-volcanism.jpg",
    title: "Active Volcanic Plumes on Moon Io & Red Spot",
    description: "Discovery photograph showing active umbrella volcanic eruption plume on Io's limb and the complex turbulent storm structure of Jupiter's Great Red Spot.",
    nasaSource: "NASA/JPL-Caltech Catalog PIA00058 / Linda Morabito Discovery Frame",
    catalogRef: "PIA00058",
    status: "AWAITING IMAGE"
  },
  {
    index: 20,
    id: "20-cat-05-saturn-rings",
    fileName: "20-cat-05-saturn-rings.jpg",
    page: "Page 3 — Research Archives / Category 5",
    location: "Subtopic 05.02: Saturn's Rings, F-Ring Shepherds & Atmosphere",
    expectedPath: "/assets/images/research/20-cat-05-saturn-rings.jpg",
    title: "Saturn Ringlet Density Waves & Crescent Silhouette",
    description: "High-resolution narrow-angle imaging of thousands of individual ringlets, enigmatic radial spokes, and gravitational shepherd moons Prometheus and Pandora.",
    nasaSource: "NASA/JPL-Caltech Catalog PIA01492 / Saturn Encounter Archive",
    catalogRef: "PIA01492",
    status: "AWAITING IMAGE"
  },
  {
    index: 21,
    id: "21-cat-05-titan-trajectory-decision",
    fileName: "21-cat-05-titan-trajectory-decision.jpg",
    page: "Page 3 — Research Archives / Category 5",
    location: "Subtopic 05.03: The Titan Flyby Trajectory Trade-Off",
    expectedPath: "/assets/images/research/21-cat-05-titan-trajectory-decision.jpg",
    title: "Titan Close Encounter Trajectory Fork & Deflection",
    description: "The pivotal 1980 decision committing Voyager 1 to a close 6,490-km Titan flyby to probe its dense nitrogen atmosphere, deflecting it out of the ecliptic plane.",
    nasaSource: "NASA SP-445 Chapter 6 / JPL Flight Project Trajectory Calculations",
    catalogRef: "JPL TITAN-FORK-80",
    status: "AWAITING IMAGE"
  },
  {
    index: 22,
    id: "22-cat-05-pale-blue-dot",
    fileName: "22-cat-05-pale-blue-dot.jpg",
    page: "Page 3 — Research Archives / Category 5",
    location: "Subtopic 05.04: The Family Portrait & The Pale Blue Dot",
    expectedPath: "/assets/images/research/22-cat-05-pale-blue-dot.jpg",
    title: "The Pale Blue Dot: Earth from 6.0 Billion Kilometers",
    description: "Earth captured as a 0.12-pixel blue speck in a scattered ray of sunlight as Voyager 1 turned its camera back toward the Sun on February 14, 1990.",
    nasaSource: "NASA/JPL-Caltech Catalog PIA00452 / Solar System Family Portrait",
    catalogRef: "PIA00452",
    status: "AWAITING IMAGE"
  },

  // ==========================================================================
  // PAGE 3 — CATEGORY 6: ONGOING CHALLENGES (4 SLOTS)
  // ==========================================================================
  {
    index: 23,
    id: "23-cat-06-launch-day-centaur-burn",
    fileName: "23-cat-06-launch-day-centaur-burn.jpg",
    page: "Page 3 — Research Archives / Category 6",
    location: "Subtopic 06.01: Launch-Day Centaur Propellant Margin",
    expectedPath: "/assets/images/research/23-cat-06-launch-day-centaur-burn.jpg",
    title: "Launch-Day Centaur Burn & Fuel Margin Anomaly",
    description: "Centaur D-1T upper stage valve leak requiring engines to burn longer, shutting down with only 3.4 seconds of usable liquid propellant remaining.",
    nasaSource: "NASA KSC Post-Launch Anomaly Investigation / Convair Flight Data",
    catalogRef: "KSC CENTAUR-ANO-77",
    status: "AWAITING IMAGE"
  },
  {
    index: 24,
    id: "24-cat-06-thruster-revival-2017",
    fileName: "24-cat-06-thruster-revival-2017.jpg",
    page: "Page 3 — Research Archives / Category 6",
    location: "Subtopic 06.02: 37-Year Dormant TCM Thrusters Fired in Deep Space",
    expectedPath: "/assets/images/research/24-cat-06-thruster-revival-2017.jpg",
    title: "TCM Thruster Revival in Interstellar Space (2017)",
    description: "JPL propulsion engineers successfully test-firing Trajectory Correction Maneuver (TCM) thrusters after 37 years of dormancy to conserve attitude hydrazine.",
    nasaSource: "NASA/JPL Interstellar Mission Operations Report (November 2017)",
    catalogRef: "JPL V1-TCM-2017",
    status: "AWAITING IMAGE"
  },
  {
    index: 25,
    id: "25-cat-06-memory-chip-corruption-2023-2024",
    fileName: "25-cat-06-memory-chip-corruption-2023-2024.jpg",
    page: "Page 3 — Research Archives / Category 6",
    location: "Subtopic 06.03: FDS Memory Chip Failure & Remote Recovery",
    expectedPath: "/assets/images/research/25-cat-06-memory-chip-corruption-2023-2024.jpg",
    title: "FDS Memory Corruption & In-Flight Code Relocation",
    description: "Recovery of corrupted Flight Data System telemetry by transmitting remote software patches across 22.5 light-hours to relocate code around a failed 256-word chip.",
    nasaSource: "NASA/JPL Interstellar Mission Status Bulletin (April–May 2024)",
    catalogRef: "JPL FDS-RECOV-2024",
    status: "AWAITING IMAGE"
  },
  {
    index: 26,
    id: "26-cat-06-power-management-rtg",
    fileName: "26-cat-06-power-management-rtg.jpg",
    page: "Page 3 — Research Archives / Category 6",
    location: "Subtopic 06.04: Progressive Heater & Instrument Shutdowns",
    expectedPath: "/assets/images/research/26-cat-06-power-management-rtg.jpg",
    title: "Interstellar Power Management & Instrument Shutdowns",
    description: "Stepwise shutdown of instrument heaters and non-essential telemetry channels to maintain core operational capability as RTG power drops below 220 Watts.",
    nasaSource: "NASA Voyager Interstellar Mission Long-Range Operating Plan",
    catalogRef: "NASA VIM-PWR-2026",
    status: "AWAITING IMAGE"
  }
];

/**
 * Helper to retrieve image manifest item by assigned ID
 */
export function getImageManifestById(id) {
  return FUTURE_IMAGE_MANIFEST.find(item => item.id === id) || null;
}

/**
 * Helper to retrieve image manifest item by subtopic code (e.g. "01.01")
 */
export function getImageManifestBySubtopicCode(code) {
  return FUTURE_IMAGE_MANIFEST.find(item => item.location.includes(code)) || null;
}
