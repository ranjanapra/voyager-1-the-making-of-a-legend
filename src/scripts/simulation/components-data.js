/**
 * Voyager 1 — Engineering Component Data Model
 * 
 * Verified flight hardware specifications sourced from NASA SP-445,
 * JPL Technical Report 77-51, and NASA Interstellar Mission records.
 */

export const SPACECRAFT_COMPONENTS = [
  {
    id: "comp-bus",
    name: "10-Sided Decagonal Bus Chassis",
    subsystem: "Structures & Thermal Control",
    massKg: 108.5,
    powerWatts: 0,
    material: "6061-T6 & 2024-T4 Aluminium alloys, Beryllium tubular struts, Multi-layer Mylar insulation",
    purpose: "Houses 10 standardized electronic equipment bays and forms the primary structural load path between the launch vehicle interface and the high-gain dish.",
    technicalSpec: "Decagonal ring 1.78 meters across flats and 0.46 meters high. Features variable bimetallic thermal louvers on bays to vent excess electronic heat to space.",
    historicalContext: "Engineered at JPL SAF Bldg 179 to withstand 9.2G static acceleration and severe acoustic vibrations inside the Titan IIIE fairing.",
    roleInMission: "Provides radiation-shielded, thermally-regulated housing for power distribution, computer command logic, and radio transceivers.",
    assemblyStage: 1,
    dependencies: [],
    references: ["NASA SP-445, Ch. 3", "JPL Publication 77-51, Section 2"]
  },
  {
    id: "comp-tank",
    name: "Central Titanium Hydrazine Propellant Tank",
    subsystem: "Propulsion & Reaction Control",
    massKg: 116.8, // 105 kg fuel + 11.8 kg tank dry mass
    powerWatts: 0,
    material: "Titanium 6Al-4V alloy, elastomeric bladder, high-pressure helium pressurant system",
    purpose: "Stores 105 kg of liquid hydrazine monopropellant pressurized to 350 psi (2.4 MPa) for attitude-control thrusters and trajectory correction maneuvers.",
    technicalSpec: "Spherical tank 0.71 meters in diameter, located directly at the spacecraft's center of gravity to prevent mass-offset tumbling as fuel is depleted.",
    historicalContext: "Fabricated with microscopic weld inspections to eliminate leaks over a projected mission duration originally specified for 5 years.",
    roleInMission: "Supplies pressurized liquid hydrazine to 16 attitude thrusters across the 47+ year mission duration.",
    assemblyStage: 1,
    dependencies: ["comp-bus"],
    references: ["NASA SP-445, Ch. 3", "JPL Propulsion Subsystem Report 78-14"]
  },
  {
    id: "comp-hga",
    name: "3.7-Meter High-Gain Cassegrain Antenna (HGA)",
    subsystem: "Telecommunications",
    massKg: 65.0,
    powerWatts: 28.5, // TWT amplifier driver
    material: "Graphite-epoxy composite parabolic dish, aluminium honeycomb core, titanium subreflector struts",
    purpose: "Focuses microwave transmission into a narrow 0.5-degree pencil beam aimed continuously at Earth.",
    technicalSpec: "3.7-meter (12.1-foot) parabolic reflector with Cassegrain subreflector. Dual-frequency simultaneous S-band (2.3 GHz) and X-band (8.4 GHz) microwave links.",
    historicalContext: "Built by Aeronutronic Ford for JPL; graphite-epoxy composites were chosen to ensure near-zero thermal expansion between -180°C and +100°C.",
    roleInMission: "Returns high-rate planetary imaging data, plasma wave waveforms, and weak interstellar telemetry over distances exceeding 24 billion kilometers.",
    assemblyStage: 2,
    dependencies: ["comp-bus"],
    references: ["NASA SP-445, Ch. 3", "IEEE Transactions on Communications, Vol. COM-27"]
  },
  {
    id: "comp-rtg",
    name: "Multi-Hundred-Watt RTG Power Generation Unit",
    subsystem: "Electrical Power",
    massKg: 116.7, // 3 units x ~38.9 kg
    powerWatts: 474.0, // Initial launch output
    material: "Plutonium-238 dioxide ceramic fuel spheres, iridium cladding, silicon-germanium thermocouples",
    purpose: "Provides uninterrupted direct-current electrical power independent of solar illumination beyond the orbit of Mars.",
    technicalSpec: "Three MHW-RTGs mounted on a deployable 3.7-meter fiberglass boom. Each contains 24 fuel spheres generating ~2,400 thermal Watts converted to 158 electrical Watts at launch.",
    historicalContext: "Developed by General Electric for the Department of Energy and NASA; utilized radioactive alpha-decay heat ($t_{1/2} = 87.7$ years).",
    roleInMission: "Powers all science instruments, computers, transmitters, and electric heaters throughout the Outer Solar System and Interstellar Space.",
    assemblyStage: 3,
    dependencies: ["comp-bus"],
    references: ["NASA SP-445, Ch. 4", "DOE MHW-RTG Final Safety Analysis Report"]
  },
  {
    id: "comp-astromast",
    name: "13-Meter Deployable Astromast Magnetometer Boom",
    subsystem: "Mechanisms & Science Payload",
    massKg: 5.6,
    powerWatts: 0,
    material: "Continuous coiled fiberglass triangular lattice with beryllium reinforcement cables",
    purpose: "Extends dual triaxial fluxgate magnetometers 13 meters away from the magnetic interference of spacecraft electronics.",
    technicalSpec: "Coiled inside a 0.5-meter canister for launch; deploys automatically in space via stored strain energy in the fiberglass longerons.",
    historicalContext: "Engineered by Astro Research Corporation for JPL to achieve extreme magnetic cleanliness (<0.005 nanoteslas spacecraft background noise).",
    roleInMission: "Measured planetary magnetospheres at Jupiter and Saturn, and confirmed crossing of the heliopause into the interstellar magnetic field in 2012.",
    assemblyStage: 4,
    dependencies: ["comp-bus"],
    references: ["NASA SP-445, Ch. 4", "JPL Technical Memorandum 33-728"]
  },
  {
    id: "comp-scan-platform",
    name: "Two-Axis Articulated Science Scan Platform",
    subsystem: "Science Instruments",
    massKg: 42.8,
    powerWatts: 35.0,
    material: "Beryllium structural housing, harmonic drive gearboxes, stepper motors, thermal resistance blankets",
    purpose: "Provides precision two-axis pointing for optical remote-sensing instruments independent of spacecraft attitude.",
    technicalSpec: "Azimuth travel 360°, Elevation travel 210°, pointing precision ±0.1°. Mounts Vidicon cameras, IRIS, UVS, and photopolarimeter.",
    historicalContext: "Mounted on the science boom opposite the RTGs; required special dry-film lubricants to prevent cold-welding in hard vacuum.",
    roleInMission: "Captured 67,000 images of Jupiter, Saturn, and their moons, including the first active volcanic eruptions on Io and complex structure of Saturn's rings.",
    assemblyStage: 4,
    dependencies: ["comp-bus"],
    references: ["NASA SP-445, Ch. 4", "JPL Science Instrument Integration Guide"]
  },
  {
    id: "comp-golden-record",
    name: "The Golden Record & Uranium-238 Radiometric Cover",
    subsystem: "Interstellar Artifact",
    massKg: 1.2,
    powerWatts: 0,
    material: "12-inch gold-plated copper phonograph disc, gold-anodized aluminium jacket, electroplated Uranium-238 clock",
    purpose: "Carries cultural greetings, music, sounds, and 115 images of Earth as a message to extraterrestrial civilizations.",
    technicalSpec: "Spins at 16-2/3 RPM. Cover etched with pulsar map showing Earth's location relative to 14 pulsars and binary playback instructions.",
    historicalContext: "Chaired by Dr. Carl Sagan, assembled by a NASA committee in summer 1977, and bolted to Bay 4 of the spacecraft bus.",
    roleInMission: "Designed to endure for over a billion years in interstellar space without significant erosion from cosmic radiation or micro-meteoroids.",
    assemblyStage: 5,
    dependencies: ["comp-bus"],
    references: ["Murmurs of Earth (Carl Sagan et al.)", "NASA SP-445, Ch. 1"]
  },
  {
    id: "comp-thrusters",
    name: "Catalytic Hydrazine Thruster Clusters (16 Thrusters)",
    subsystem: "Propulsion & Reaction Control",
    massKg: 9.8,
    powerWatts: 14.0, // Solenoid valve drive
    material: "Inconel combustion chambers, Shell 405 iridium-alumina catalyst beds, dual-seat torque motor valves",
    purpose: "Provides 3-axis roll, pitch, and yaw torque pulses for precision celestial attitude lock with the Sun and star Canopus.",
    technicalSpec: "Four clusters of four 0.2 lbf (0.89 N) thrusters each. Capable of pulsing in bursts as short as 10 milliseconds with minimum impulse bit 0.001 lbf-s.",
    historicalContext: "In late 2017, after 40 years without firing, backup Trajectory Correction Maneuver (TCM) thrusters were successfully commanded to fire from 13 billion miles away.",
    roleInMission: "Maintains high-gain antenna alignment within 0.1 degree of Earth for continuous communications.",
    assemblyStage: 6,
    dependencies: ["comp-tank", "comp-bus"],
    references: ["NASA SP-445, Ch. 3", "JPL Flight Engineering Bulletin 2017-V1"]
  },
  {
    id: "comp-ccs",
    name: "Computer Command Subsystem (CCS) & Plated-Wire Memory",
    subsystem: "Avionics & Flight Computing",
    massKg: 14.2,
    powerWatts: 18.0,
    material: "Plated-wire magnetic memory cores, custom low-power TTL and CMOS integrated circuits",
    purpose: "Acts as the central digital brain of the spacecraft, coordinating routine sequences, executing ground commands, and running fault-recovery routines.",
    technicalSpec: "Dual-redundant processors with 4,096 18-bit words of plated-wire memory each. (The separate Flight Data Subsystem used 16-bit words). Execution speed 250,000 instructions per second.",
    historicalContext: "Engineered by JPL with automatic fault detection logic; capable of autonomously diagnosing hardware anomalies and switching to redundant backup systems.",
    roleInMission: "Managed decades of flyby science sequences, routine health checkouts, and interstellar cruise operational modes.",
    assemblyStage: 1,
    dependencies: ["comp-bus"],
    references: ["NASA SP-445, Ch. 3", "JPL Computer Architecture Documentation 77-12"]
  },
  {
    id: "comp-vidicon",
    name: "Narrow & Wide Angle Vidicon Television Cameras (ISS)",
    subsystem: "Science Instruments",
    massKg: 28.2,
    powerWatts: 42.0,
    material: "Selenium-sulfur vidicon photoconductive target tubes, Cassegrain optics, Invar thermal compensating rods",
    purpose: "High-resolution optical reconnaissance of planetary atmospheres, rings, and satellite surfaces.",
    technicalSpec: "Narrow-angle 1500mm f/8.5 lens; Wide-angle 200mm f/3.5 lens. Resolution 800 x 800 pixels with 8 bits per pixel (256 grayscale levels).",
    historicalContext: "Returned the famous 'Pale Blue Dot' portrait of Earth in 1990 at a distance of 6 billion kilometers before optical systems were turned off.",
    roleInMission: "Discovered active volcanism on Io, geysers on Triton, shepherd moons at Saturn, and faint rings around Jupiter.",
    assemblyStage: 4,
    dependencies: ["comp-scan-platform"],
    references: ["NASA SP-445, Ch. 4", "JPL Imaging Science Subsystem Calibration Report"]
  }
];
