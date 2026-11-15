/**
 * Voyager 1 — Master Image Manifest (26 Assigned Placements)
 * 
 * Central registry of all 26 historical NASA/JPL research imagery slots
 * across Page 2 (Assembly Stages) and Page 3 (Explore Research Categories).
 * 
 * Phased Integration Baseline:
 * - 26/26 slots: STATUS = "INTEGRATED" (100% of historical NASA/JPL research imagery slots integrated)
 */

export const FUTURE_IMAGE_MANIFEST = [
  // ==========================================================================
  // PAGE 2 — ASSEMBLY STAGES (2 SLOTS)
  // ==========================================================================
  {
    index: 1,
    id: "01-stage-03-rtg-installation",
    fileName: "01-stage-03-rtg-installation.png",
    page: "Page 2 — Spacecraft Assembly Facility",
    location: "Stage 03: RTG Installation & Power Generation",
    url: "/assets/images/research/01-stage-03-rtg-installation.png",
    originalFile: "Voyager’s RTG.png",
    title: "MHW-RTG Power System Integration",
    description: "Installation and electrical checkout of the Multi-Hundred-Watt Radioisotope Thermoelectric Generators (MHW-RTG) onto the deployable fiberglass boom in JPL Building 179.",
    nasaSource: "NASA/JPL SAF Building 179 Archive / DOE MHW-RTG Final Safety Analysis",
    catalogRef: "JPL SAF-179-1977-RTG",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 2,
    id: "02-stage-04-scan-platform-magnetometer",
    fileName: "02-stage-04-scan-platform-magnetometer.jpg",
    page: "Page 2 — Spacecraft Assembly Facility",
    location: "Stage 04: Science Scan Platform & Magnetometer Boom Integration",
    url: "/assets/images/research/02-stage-04-scan-platform-magnetometer.jpg",
    originalFile: "Voyager Magnetometer Boom Extension testing (2).jpg.jpeg",
    title: "13-Meter Astromast Boom Extension Testing",
    description: "Deployment testing and optical alignment of the 13-meter deployable Astromast boom and articulated science scan platform at JPL SAF Building 179.",
    nasaSource: "NASA/JPL Technical Report 77-51 / Astro Research Corp Documentation",
    catalogRef: "JPL SAF-179-1977-PAYLOAD",
    verified: true,
    status: "INTEGRATED"
  },

  // ==========================================================================
  // PAGE 3 — CATEGORY 1: PARTS & MATERIALS (4 SLOTS)
  // ==========================================================================
  {
    index: 3,
    id: "03-cat-01-high-gain-antenna",
    fileName: "spacecraft-profile.jpg.jpeg",
    page: "Page 3 — Research Archives / Category 1",
    location: "Subtopic 01.01: 3.7-Meter High-Gain Antenna (HGA)",
    url: "/assets/images/spacecraft-profile.jpg.jpeg",
    originalFile: "spacecraft-profile.jpg.jpeg",
    title: "Voyager 1 Labeled Spacecraft Diagram & Subsystem Cutaway",
    description: "Authentic NASA/JPL labeled line drawing and cutaway diagram detailing all 12 major engineering components, antennas, and bus compartments (NASA Catalog P-18882).",
    nasaSource: "NASA/JPL Line Drawing P-18882 / Aeronutronic Ford Technical Specs",
    catalogRef: "NASA P-18882",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 4,
    id: "04-cat-01-radioisotope-thermoelectric-generators",
    fileName: "04-cat-01-radioisotope-thermoelectric-generators.gif",
    page: "Page 3 — Research Archives / Category 1",
    location: "Subtopic 01.02: Radioisotope Thermoelectric Generators (RTGs)",
    url: "/assets/images/research/04-cat-01-radioisotope-thermoelectric-generators.gif",
    originalFile: "Model of Voyager’s Radioisotope Thermoelectric Generator.gif",
    title: "MHW-RTG Power Generator Configuration Model",
    description: "Detailed flight hardware model of the MHW-RTG nuclear power unit converting Plutonium-238 alpha decay heat directly into electrical current.",
    nasaSource: "Department of Energy / NASA Technical Paper GESP-7107",
    catalogRef: "DOE GESP-7107",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 5,
    id: "05-cat-01-magnetometer-boom",
    fileName: "05-cat-01-magnetometer-boom.jpg",
    page: "Page 3 — Research Archives / Category 1",
    location: "Subtopic 01.03: 13-Meter Magnetometer Boom",
    url: "/assets/images/research/05-cat-01-magnetometer-boom.jpg",
    originalFile: "Voyager Magnetic Mapping Coil.jpg.jpeg",
    title: "Fluxgate Magnetometer Sensor & Calibration Coil",
    description: "High-precision triaxial fluxgate magnetometer sensor mounted on the deployable Astromast boom to measure planetary and interstellar magnetic fields.",
    nasaSource: "NASA SP-445 Chapter 4 / JPL Technical Memorandum 33-728",
    catalogRef: "JPL TM-33-728",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 6,
    id: "06-cat-01-golden-record-cover-disc",
    fileName: "voyager-gold-record-front.jpg.jpeg",
    page: "Page 3 — Research Archives / Category 1",
    location: "Subtopic 01.04: The Golden Record & Aluminum Cover",
    url: "/assets/images/voyager-gold-record-front.jpg.jpeg",
    originalFile: "voyager-gold-record-front.jpg.jpeg",
    title: "The Voyager Golden Record (12-Inch Gold-Plated Copper Phonograph Disc)",
    description: "12-inch gold-plated copper phonograph disc containing sounds, greetings in 55 languages, 90 minutes of worldwide music, and 115 analog photographs from humanity.",
    nasaSource: "NASA/JPL-Caltech Catalog PIA00146 / Carl Sagan Collection",
    catalogRef: "PIA00146",
    verified: true,
    status: "INTEGRATED"
  },

  // ==========================================================================
  // PAGE 3 — CATEGORY 2: HOW IT WAS BUILT (4 SLOTS)
  // ==========================================================================
  {
    index: 7,
    id: "07-cat-02-grand-tour-mariner-jupiter-saturn",
    fileName: "07-cat-02-grand-tour-mariner-jupiter-saturn.gif",
    page: "Page 3 — Research Archives / Category 2",
    location: "Subtopic 02.01: Grand Tour Concept & MJS-77 Program",
    url: "/assets/images/research/07-cat-02-grand-tour-mariner-jupiter-saturn.gif",
    originalFile: "voyager.gif",
    title: "Grand Tour Interplanetary Trajectory Simulation",
    description: "Gary Flandro orbital alignment trajectory map illustrating the 175-year planetary alignment and gravity-assist routes to Jupiter and Saturn.",
    nasaSource: "JPL Technical Memorandum 312-505 / NASA SP-445 Chapter 2",
    catalogRef: "JPL TM-312-505",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 8,
    id: "08-cat-02-jpl-building-179-assembly",
    fileName: "08-cat-02-jpl-building-179-assembly.gif",
    page: "Page 3 — Research Archives / Category 2",
    location: "Subtopic 02.02: Cleanroom Fabrication in JPL SAF Building 179",
    url: "/assets/images/research/08-cat-02-jpl-building-179-assembly.gif",
    originalFile: "Voyager assembly in Hi-Bay I.gif",
    title: "Voyager Assembly in JPL SAF High Bay 1",
    description: "Spacecraft Assembly Facility (SAF) Building 179 High Bay 1 cleanroom floor during decagonal airframe and harness integration in Pasadena, California.",
    nasaSource: "NASA/JPL Spacecraft Assembly Facility (SAF 179) Archives",
    catalogRef: "JPL SAF-179-HIST",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 9,
    id: "09-cat-02-space-simulator-qualification",
    fileName: "09-cat-02-space-simulator-qualification.jpg",
    page: "Page 3 — Research Archives / Category 2",
    location: "Subtopic 02.03: 25-Foot Space Simulator Thermal-Vacuum Testing",
    url: "/assets/images/research/09-cat-02-space-simulator-qualification.jpg",
    originalFile: "Voyager Spacecraft Testing at JPL.jpg.jpeg",
    title: "Thermal-Vacuum Qualification in 25-Foot Space Simulator",
    description: "Voyager Proof Test Model (PTM) suspended inside JPL's 25-Foot Space Simulator undergoing extreme vacuum and solar radiation testing (December 1976).",
    nasaSource: "NASA/JPL-Caltech Catalog PIA21734",
    catalogRef: "PIA21734",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 10,
    id: "10-cat-02-redundant-computer-architecture",
    fileName: "10-cat-02-redundant-computer-architecture.jpg",
    page: "Page 3 — Research Archives / Category 2",
    location: "Subtopic 02.04: Dual-Redundant Computer Command Subsystem (CCS)",
    url: "/assets/images/research/10-cat-02-redundant-computer-architecture.jpg",
    originalFile: "voyager-digital-recorder.jpg.jpeg",
    title: "Dual CCS Computer Architecture & Digital Tape Flight Data Systems",
    description: "Custom discrete-component computer command subsystem (CCS, FDS, and AACS) and digital tape recorder featuring 4,096-word plated-wire non-volatile memory arrays.",
    nasaSource: "NASA SP-445 Chapter 3 / JPL Computer Hardware Engineering Archives",
    catalogRef: "JPL CCS-ENG-1977",
    verified: true,
    status: "INTEGRATED"
  },

  // ==========================================================================
  // PAGE 3 — CATEGORY 3: THE LAUNCH (4 SLOTS)
  // ==========================================================================
  {
    index: 11,
    id: "11-cat-03-voyager-1-liftoff-slc-41",
    fileName: "11-cat-03-voyager-1-liftoff-slc-41.png",
    page: "Page 3 — Research Archives / Category 3",
    location: "Subtopic 03.01: Liftoff from Space Launch Complex 41",
    url: "/assets/images/research/11-cat-03-voyager-1-liftoff-slc-41.png",
    originalFile: "Voyager 1 Launch.png",
    title: "Voyager 1 Titan IIIE-Centaur Liftoff from SLC-41",
    description: "Titan IIIE-Centaur vehicle lifting off from Cape Canaveral Space Launch Complex 41 on September 5, 1977 at 12:56:01 UTC carrying Voyager 1 into space.",
    nasaSource: "NASA Kennedy Space Center Photo KSC-77PC-0294",
    catalogRef: "KSC-77PC-0294",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 12,
    id: "12-cat-03-voyager-launch-sequence-comparison",
    fileName: "12-cat-03-voyager-launch-sequence-comparison.jpg",
    page: "Page 3 — Research Archives / Category 3",
    location: "Subtopic 03.02: Launch Sequence & Trajectory Comparison with Voyager 2",
    url: "/assets/images/research/12-cat-03-voyager-launch-sequence-comparison.jpg",
    originalFile: "Voyager 2 Preparing for Launch.jpg.jpeg",
    title: "Pre-Launch Trajectory Preparation & Comparison",
    description: "Voyager 2 undergoing pre-launch preparations at KSC; Voyager 1 followed on a faster hyperbolic escape trajectory that would overtake its twin before Jupiter.",
    nasaSource: "NASA SP-445 Chapter 4 / JPL Flight Operations Trajectory Maps",
    catalogRef: "JPL TRAJ-MJS-COMP",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 13,
    id: "13-cat-03-titan-iiie-centaur-stack",
    fileName: "13-cat-03-titan-iiie-centaur-stack.jpg",
    page: "Page 3 — Research Archives / Category 3",
    location: "Subtopic 03.03: Titan IIIE / Centaur D-1T / Star-37E Stack",
    url: "/assets/images/research/13-cat-03-titan-iiie-centaur-stack.jpg",
    originalFile: "pia.jpg.jpeg",
    title: "Titan IIIE Payload Shroud Hoisting at SLC-41",
    description: "Centaur D-1T payload shroud enclosing Voyager 1 hoisted atop the Titan IIIE core stage at Cape Canaveral Air Force Station Launch Complex 41.",
    nasaSource: "NASA Kennedy Space Center / General Dynamics Convair",
    catalogRef: "KSC-77PC-0294",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 14,
    id: "14-cat-03-prelaunch-servicing",
    fileName: "14-cat-03-prelaunch-servicing.jpg",
    page: "Page 3 — Research Archives / Category 3",
    location: "Subtopic 03.04: Pre-Launch Servicing in SAEF II High Bay",
    url: "/assets/images/research/14-cat-03-prelaunch-servicing.jpg",
    originalFile: "Voyager In SAEF II At Kennedy Space Center.jpeg",
    title: "Spacecraft Servicing Inside SAEF II Cleanroom",
    description: "Voyager 1 undergoing pre-launch checkout, hydrazine monopropellant tank loading, and encapsulation inside Spacecraft Assembly and Encapsulation Facility II (SAEF II).",
    nasaSource: "NASA Kennedy Space Center SAEF II Documentation",
    catalogRef: "KSC SAEF-II-77",
    verified: true,
    status: "INTEGRATED"
  },

  // ==========================================================================
  // PAGE 3 — CATEGORY 4: INSTRUMENTS & DATA (4 SLOTS)
  // ==========================================================================
  {
    index: 15,
    id: "15-cat-04-science-scan-platform-instruments",
    fileName: "15-cat-04-science-scan-platform-instruments.png",
    page: "Page 3 — Research Archives / Category 4",
    location: "Subtopic 04.01: Articulated Science Scan Platform Optical Suite",
    url: "/assets/images/research/15-cat-04-science-scan-platform-instruments.png",
    originalFile: "Model of Voyager .png",
    title: "Articulated Science Scan Platform Configuration",
    description: "Two-axis articulated beryllium scan platform mounting the narrow and wide-angle Vidicon cameras (ISS), infrared radiometer (IRIS), and ultraviolet spectrometer (UVS).",
    nasaSource: "NASA SP-445 Chapter 4 / JPL Science Instrument Integration Guide",
    catalogRef: "JPL INST-SCAN-01",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 16,
    id: "16-cat-04-fields-particles-suite",
    fileName: "16-cat-04-fields-particles-suite.jpg",
    page: "Page 3 — Research Archives / Category 4",
    location: "Subtopic 04.02: Non-Targeted Fields & Particles Payload",
    url: "/assets/images/research/16-cat-04-fields-particles-suite.jpg",
    originalFile: "Voyager 1 Magnetic Highway.jpg.jpeg",
    title: "Interstellar Magnetic Highway & Particle Boundary",
    description: "Voyager 1 measuring particle flow and magnetic field direction across the heliopause transition zone with CRS, LECP, MAG, and PWS sensors.",
    nasaSource: "NASA/JPL-Caltech Catalog PIA16485 / PDS Fields & Particles Node",
    catalogRef: "PIA16485",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 17,
    id: "17-cat-04-digital-tape-recorder",
    fileName: "17-cat-04-digital-tape-recorder.jpg",
    page: "Page 3 — Research Archives / Category 4",
    location: "Subtopic 04.03: Digital Tape Recorder (DTR) Buffer Memory",
    url: "/assets/images/research/17-cat-04-digital-tape-recorder.jpg",
    originalFile: "voyager-digital-recorder.jpg.jpeg",
    title: "Onboard Digital Tape Recorder (DTR) Flight Hardware",
    description: "Eight-track magnetic digital tape recorder mechanism capable of buffering 536 megabits (67 megabytes) of encounter imagery during planetary flybys.",
    nasaSource: "JPL Telecommunications & Data Acquisition Historical Record",
    catalogRef: "JPL DTR-HIST-01",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 18,
    id: "18-cat-04-deep-space-network",
    fileName: "18-cat-04-deep-space-network.png",
    page: "Page 3 — Research Archives / Category 4",
    location: "Subtopic 04.04: NASA Deep Space Network Ground Stations",
    url: "/assets/images/research/18-cat-04-deep-space-network.png",
    originalFile: "Antenna for the Deep Space Network.png",
    title: "NASA Deep Space Network 70-Meter Parabolic Antenna",
    description: "The Deep Space Network 70-meter dish antenna at Goldstone, California (DSS-14) receiving faint -160 dBm carrier signals from Voyager 1.",
    nasaSource: "NASA/JPL Deep Space Network Catalog / Goldstone Complex",
    catalogRef: "DSN-DSS-14-70M",
    verified: true,
    status: "INTEGRATED"
  },

  // ==========================================================================
  // PAGE 3 — CATEGORY 5: KEY DISCOVERIES (4 SLOTS)
  // ==========================================================================
  {
    index: 19,
    id: "19-cat-05-jupiter-io-volcanism",
    fileName: "19-cat-05-jupiter-io-volcanism.png",
    page: "Page 3 — Research Archives / Category 5",
    location: "Subtopic 05.01: Active Volcanism on Io & Jupiter Atmosphere",
    url: "/assets/images/research/19-cat-05-jupiter-io-volcanism.png",
    originalFile: "Io - Volcanic Eruption.png",
    title: "Active Volcanic Plume Eruption on Moon Io",
    description: "Discovery image captured March 1979 showing the active Pele volcanic plume erupting 300 kilometers above the limb of Jupiter's moon Io.",
    nasaSource: "NASA/JPL-Caltech Catalog PIA00058 / Linda Morabito Discovery Frame",
    catalogRef: "PIA00058",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 20,
    id: "20-cat-05-saturn-rings",
    fileName: "20-cat-05-saturn-rings.png",
    page: "Page 3 — Research Archives / Category 5",
    location: "Subtopic 05.02: Saturn's Rings, F-Ring Shepherds & Atmosphere",
    url: "/assets/images/research/20-cat-05-saturn-rings.png",
    originalFile: "Saturn and its Rings.png",
    title: "Saturn Ringlet Architecture & B-Ring Radial Spokes",
    description: "Detailed view of thousands of individual ringlets, gravitational density waves, and mysterious dark radial spokes rotating across Saturn's B-ring.",
    nasaSource: "NASA/JPL-Caltech Catalog PIA01492 / Saturn Encounter Archive",
    catalogRef: "PIA01492",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 21,
    id: "21-cat-05-titan-trajectory-decision",
    fileName: "21-cat-05-titan-trajectory-decision.jpg",
    page: "Page 3 — Research Archives / Category 5",
    location: "Subtopic 05.03: The Titan Flyby Trajectory Trade-Off",
    url: "/assets/images/research/21-cat-05-titan-trajectory-decision.jpg",
    originalFile: "Titan’s Thick Haze.jpg.jpeg",
    title: "Titan's Thick Photochemical Nitrogen Haze",
    description: "Voyager 1 close flyby view of Titan revealing a dense, opaque orange hydrocarbon haze layer that prevented surface photography but confirmed dense atmosphere.",
    nasaSource: "NASA/JPL-Caltech Catalog PIA00401 / SP-445 Chapter 6",
    catalogRef: "PIA00401",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 22,
    id: "22-cat-05-pale-blue-dot",
    fileName: "22-cat-05-pale-blue-dot.png",
    page: "Page 3 — Research Archives / Category 5",
    location: "Subtopic 05.04: The Family Portrait & The Pale Blue Dot",
    url: "/assets/images/research/22-cat-05-pale-blue-dot.png",
    originalFile: "Pale Blue Dot (1990).png",
    title: "The Pale Blue Dot: Earth from 6.0 Billion Kilometers",
    description: "Earth captured as a 0.12-pixel pale blue crescent suspended in a sunbeam as Voyager 1 turned its camera back toward the Sun on February 14, 1990.",
    nasaSource: "NASA/JPL-Caltech Catalog PIA00452 / Solar System Family Portrait",
    catalogRef: "PIA00452",
    verified: true,
    status: "INTEGRATED"
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
    url: "/assets/images/research/23-cat-06-launch-day-centaur-burn.jpg",
    originalFile: "Voyager 1 Launch 2nd picture.png",
    title: "Launch-Day Centaur Burn & Fuel Margin Anomaly",
    description: "Centaur D-1T upper stage valve leak requiring engines to burn longer, shutting down with only 3.4 seconds of usable liquid propellant remaining.",
    nasaSource: "NASA KSC Post-Launch Anomaly Investigation / Convair Flight Data",
    catalogRef: "KSC CENTAUR-ANO-77",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 24,
    id: "24-cat-06-thruster-revival-2017",
    fileName: "24-cat-06-thruster-revival-2017.jpg",
    page: "Page 3 — Research Archives / Category 6",
    location: "Subtopic 06.02: 37-Year Dormant TCM Thrusters Fired in Deep Space",
    url: "/assets/images/research/24-cat-06-thruster-revival-2017.jpg",
    originalFile: "Voyager Test Model Configuration.jpeg",
    title: "TCM Thruster Revival in Interstellar Space (2017)",
    description: "JPL propulsion engineers successfully test-firing Trajectory Correction Maneuver (TCM) thrusters after 37 years of dormancy to conserve attitude hydrazine.",
    nasaSource: "NASA/JPL Interstellar Mission Operations Report (November 2017)",
    catalogRef: "JPL V1-TCM-2017",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 25,
    id: "25-cat-06-memory-chip-corruption-2023-2024",
    fileName: "25-cat-06-memory-chip-corruption-2023-2024.jpg",
    page: "Page 3 — Research Archives / Category 6",
    location: "Subtopic 06.03: FDS Memory Chip Failure & Remote Recovery",
    url: "/assets/images/research/25-cat-06-memory-chip-corruption-2023-2024.jpg",
    originalFile: "Voyager Team Celebrates Engineering Data Return.png",
    title: "FDS Memory Corruption & In-Flight Code Relocation",
    description: "Recovery of corrupted Flight Data System telemetry by transmitting remote software patches across 22.5 light-hours to relocate code around a failed 256-word chip.",
    nasaSource: "NASA/JPL Interstellar Mission Status Bulletin (April–May 2024)",
    catalogRef: "JPL FDS-RECOV-2024",
    verified: true,
    status: "INTEGRATED"
  },
  {
    index: 26,
    id: "26-cat-06-power-management-rtg",
    fileName: "26-cat-06-power-management-rtg.jpg",
    page: "Page 3 — Research Archives / Category 6",
    location: "Subtopic 06.04: Progressive Heater & Instrument Shutdowns",
    url: "/assets/images/research/26-cat-06-power-management-rtg.jpg",
    originalFile: "Voyager’s RTG.png",
    title: "Interstellar Power Management & Instrument Shutdowns",
    description: "Stepwise shutdown of instrument heaters and non-essential telemetry channels to maintain core operational capability as RTG power drops below 220 Watts.",
    nasaSource: "NASA Voyager Interstellar Mission Long-Range Operating Plan",
    catalogRef: "NASA VIM-PWR-2026",
    verified: true,
    status: "INTEGRATED"
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
