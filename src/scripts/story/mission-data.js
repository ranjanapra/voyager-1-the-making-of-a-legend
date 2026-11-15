/**
 * Voyager 1 — Historical Engineering Specifications & Chronology (1972–1977)
 * Source References: NASA SP-445 (Voyager 1 & 2 Mission to the Outer Planets),
 * JPL Technical Reports, NASA History Division.
 * 
 * All data represents verified historical and mechanical records.
 * Non-official archival simulation for educational exhibition purposes.
 */

export const MISSION_METADATA = {
  projectTitle: "VOYAGER 1 — THE MAKING OF A LEGEND",
  tagline: "Step into 1977. Join the mission. Build the spacecraft.",
  classification: "HISTORICAL EDUCATIONAL SIMULATION",
  disclaimer: "Non-commercial educational archive. Not an official NASA or JPL website.",
  historicalTimeline: "1972 – 1977 (R&D, Design & Assembly Phase)",
  launchDate: "September 5, 1977",
  launchSite: "Space Launch Complex 41, Cape Canaveral Air Force Station, Florida",
  launchVehicle: "Titan IIIE / Centaur D-1T",
  facility: "Spacecraft Assembly Facility (Building 179), Jet Propulsion Laboratory, Pasadena, CA"
};

// Compact Telemetry Metrics for the Visual Home Screen
export const SPACECRAFT_SPECS = [
  {
    id: "mass",
    label: "MASS // LAUNCH",
    value: "815 kg",
    subtext: "Including hydrazine",
    detail: "Spacecraft launch mass of 815 kg, including propellant (hydrazine) for attitude-control thrusters."
  },
  {
    id: "antenna",
    label: "ANTENNA // HGA",
    value: "3.7 meters",
    subtext: "12-foot reflector",
    detail: "The 3.7-meter high-gain antenna was used for communication between the spacecraft and Earth."
  },
  {
    id: "power",
    label: "POWER // 3 RTGs",
    value: "~474 Watts",
    subtext: "MHW generators",
    detail: "Three Multi-Hundred-Watt Radioisotope Thermoelectric Generators provided approximately 474 Watts of electrical power at launch."
  },
  {
    id: "payload",
    label: "PAYLOAD // RECORD",
    value: "12-inch Disc",
    subtext: "Gold-plated copper",
    detail: "12-inch gold-plated copper phonograph record carrying sounds and imagery from Earth, protected by an aluminum cover."
  }
];

// Rich Educational Chronology for Historical Briefing Modal (8 Authentic Milestones 1972–1977)
export const HISTORICAL_CHRONOLOGY = [
  {
    year: "1972",
    milestone: "Mission Authorization & Grand Tour Approval",
    event: "Mission Authorization & Grand Tour Approval",
    summary: "NASA formally approves the Mariner Jupiter/Saturn 1977 project (MJS 77) as a focused, cost-effective realization of the rare 175-year outer planetary alignment.",
    desc: "NASA formally approves the Mariner Jupiter/Saturn 1977 project (MJS 77) as a focused, cost-effective realization of the rare 175-year outer planetary alignment."
  },
  {
    year: "1974",
    milestone: "Decagonal Airframe & Propulsion Integration",
    event: "Decagonal Airframe & Propulsion Integration",
    summary: "JPL mechanical teams complete the 10-sided aluminium bus architecture, housing 10 electronics bays, thermal louvers, and the central spherical titanium hydrazine tank.",
    desc: "JPL mechanical teams complete the 10-sided aluminium bus architecture, housing 10 electronics bays, thermal louvers, and the central spherical titanium hydrazine tank."
  },
  {
    year: "1975",
    milestone: "Telecommunications & Power Fabrication",
    event: "Telecommunications & Power Fabrication",
    summary: "Fabrication of the 3.7-meter graphite-epoxy High-Gain Antenna and delivery of three Multi-Hundred-Watt Radioisotope Thermoelectric Generators (MHW-RTG).",
    desc: "Fabrication of the 3.7-meter graphite-epoxy High-Gain Antenna and delivery of three Multi-Hundred-Watt Radioisotope Thermoelectric Generators (MHW-RTG)."
  },
  {
    year: "1976",
    milestone: "Space Simulator Thermal-Vacuum Qualification",
    event: "Space Simulator Thermal-Vacuum Qualification",
    summary: "The Voyager Proof Test Model (PTM) undergoes rigorous 10⁻⁶ torr vacuum, liquid-nitrogen cold (-180°C), and solar simulation inside the JPL 25-Foot Space Simulator (PIA21734).",
    desc: "The Voyager Proof Test Model (PTM) undergoes rigorous 10⁻⁶ torr vacuum, liquid-nitrogen cold (-180°C), and solar simulation inside the JPL 25-Foot Space Simulator (PIA21734)."
  },
  {
    year: "March 1977",
    milestone: "Voyager Redesignation Announcement",
    event: "Voyager Redesignation Announcement",
    summary: "NASA officially replaces the Mariner Jupiter/Saturn 77 designation with 'Voyager', recognizing the mission's unprecedented potential for deep interstellar exploration.",
    desc: "NASA officially replaces the Mariner Jupiter/Saturn 77 designation with 'Voyager', recognizing the mission's unprecedented potential for deep interstellar exploration."
  },
  {
    year: "May–June 1977",
    milestone: "Golden Record Assembly & Cover Mounting",
    event: "Golden Record Assembly & Cover Mounting",
    summary: "The Sagan committee finishes curating 115 images, 55 greetings, sounds, and music. Technicians secure the gold-plated phonograph and uranium clock to Bay 4 (PIA21740).",
    desc: "The Sagan committee finishes curating 115 images, 55 greetings, sounds, and music. Technicians secure the gold-plated phonograph and uranium clock to Bay 4 (PIA21740)."
  },
  {
    year: "August 20, 1977",
    milestone: "Voyager 2 Launches on Titan IIIE-Centaur",
    event: "Voyager 2 Launches on Titan IIIE-Centaur",
    summary: "Voyager 2 lifts off from Launch Complex 41 at Cape Canaveral on a repeating Grand Tour path to Jupiter, Saturn, Uranus, and Neptune.",
    desc: "Voyager 2 lifts off from Launch Complex 41 at Cape Canaveral on a repeating Grand Tour path to Jupiter, Saturn, Uranus, and Neptune."
  },
  {
    year: "September 5, 1977",
    milestone: "Voyager 1 Launches on Titan IIIE-Centaur",
    event: "Voyager 1 Launches on Titan IIIE-Centaur",
    summary: "Voyager 1 launches from LC-41 on a faster hyperbolic trajectory, overtaking Voyager 2 en route to primary reconnaissance encounters with Jupiter and Titan.",
    desc: "Voyager 1 launches from LC-41 on a faster hyperbolic trajectory, overtaking Voyager 2 en route to primary reconnaissance encounters with Jupiter and Titan."
  }
];

// Full Detailed Engineering Subsystem Dossier (7 Authentic Subsystems)
export const SUBSYSTEM_DOSSIER = [
  {
    id: "structure",
    title: "Decahedral Spacecraft Bus & Attitude Control",
    system: "Decahedral Spacecraft Bus & Attitude Control",
    tag: "BUS & ACS",
    summary: "The core spacecraft bus is a 10-sided decagonal frame containing 10 electronics bays with variable thermal louvers. A central spherical titanium propellant tank provided hydrazine to 16 catalytic thrusters for precision 3-axis attitude stabilization using Sun and Canopus celestial sensors.",
    description: "The core spacecraft bus is a 10-sided decagonal frame containing 10 electronics bays with variable thermal louvers. A central spherical titanium propellant tank provided hydrazine to 16 catalytic thrusters for precision 3-axis attitude stabilization using Sun and Canopus celestial sensors.",
    specs: "Titanium 6Al-4V Propellant Tank • 16 Hydrazine Thrusters • 10 Bays"
  },
  {
    id: "communications",
    title: "3.7-Meter High-Gain Cassegrain Antenna (HGA)",
    system: "3.7-Meter High-Gain Cassegrain Antenna (HGA)",
    tag: "TELECOMMUNICATIONS",
    summary: "A 3.7-meter (12-foot) diameter parabolic reflector designed to maintain reliable high-rate telemetry across billions of miles. Powered by traveling-wave tube amplifiers operating in S-band and X-band, communicating with NASA's Deep Space Network (DSN) tracking stations.",
    description: "A 3.7-meter (12-foot) diameter parabolic reflector designed to maintain reliable high-rate telemetry across billions of miles. Powered by traveling-wave tube amplifiers operating in S-band and X-band, communicating with NASA's Deep Space Network (DSN) tracking stations.",
    specs: "3.7-Meter Parabolic Cassegrain Dish • S-Band & X-Band TWTAs"
  },
  {
    id: "power",
    title: "Multi-Hundred-Watt Radioisotope Thermoelectric Generators",
    system: "Multi-Hundred-Watt Radioisotope Thermoelectric Generators",
    tag: "POWER / RTG",
    summary: "Three MHW-RTGs mounted on a deployable truss boom. Fueled by Plutonium-238 oxide, the radioactive decay generates heat converted directly into electricity via silicon-germanium thermocouples, producing ~474 Watts of continuous power at launch independently of sunlight.",
    description: "Three MHW-RTGs mounted on a deployable truss boom. Fueled by Plutonium-238 oxide, the radioactive decay generates heat converted directly into electricity via silicon-germanium thermocouples, producing ~474 Watts of continuous power at launch independently of sunlight.",
    specs: "3 MHW-RTGs • 24 Pu-238 Spheres Each • 474W Launch Output"
  },
  {
    id: "computing",
    title: "Computer Command (CCS) & Flight Data Subsystem (FDS)",
    system: "Computer Command (CCS) & Flight Data Subsystem (FDS)",
    tag: "FLIGHT COMPUTING",
    summary: "Dual-redundant onboard flight computers featuring 4,096-word plated-wire magnetic memory. The CCS managed autonomous sequence execution and fault protection, while the FDS formatted telemetry and instrument science streams with radiation-hardened logic.",
    description: "Dual-redundant onboard flight computers featuring 4,096-word plated-wire magnetic memory. The CCS managed autonomous sequence execution and fault protection, while the FDS formatted telemetry and instrument science streams with radiation-hardened logic.",
    specs: "Dual 4,096-Word Plated-Wire Memory • 18-Bit CCS Words • 16-Bit FDS Words"
  },
  {
    id: "recorder",
    title: "Digital Tape Recorder (DTR) High-Rate Storage",
    system: "Digital Tape Recorder (DTR) High-Rate Storage",
    tag: "DATA TRANSPORT",
    summary: "A magnetic 8-track digital tape transport providing 536 megabits (67 megabytes) of non-volatile buffer storage. The DTR captured high-rate science telemetry and Vidicon imaging lines during planetary flybys for subsequent downlink to Earth.",
    description: "A magnetic 8-track digital tape transport providing 536 megabits (67 megabytes) of non-volatile buffer storage. The DTR captured high-rate science telemetry and Vidicon imaging lines during planetary flybys for subsequent downlink to Earth.",
    specs: "8-Track Magnetic Tape • 536 Mbit Capacity • 115.2 kbps Playback Rate"
  },
  {
    id: "record",
    title: "The Golden Record Interstellar Time Capsule",
    system: "The Golden Record Interstellar Time Capsule",
    tag: "INTERSTELLAR ARTIFACT",
    summary: "A 12-inch gold-plated copper phonograph disc mounted to the spacecraft bus. Curated by a committee chaired by Carl Sagan, the record contains 115 analog images, spoken greetings in 55 ancient and modern languages, Earth natural sounds, and 90 minutes of international musical selections.",
    description: "A 12-inch gold-plated copper phonograph disc mounted to the spacecraft bus. Curated by a committee chaired by Carl Sagan, the record contains 115 analog images, spoken greetings in 55 ancient and modern languages, Earth natural sounds, and 90 minutes of international musical selections.",
    specs: "12-Inch Gold-Plated Copper Disc • 16⅔ RPM • Uranium-238 Clock"
  },
  {
    id: "science",
    title: "Science Instruments & Deployable Booms",
    system: "Science Instruments & Deployable Booms",
    tag: "PAYLOAD & BOOMS",
    summary: "Includes a 13-meter deployable fiberglass/beryllium boom isolating sensitive triaxial fluxgate magnetometers from spacecraft electromagnetic fields, plus a 2-axis steerable scan platform housing high-resolution television cameras, infrared radiometer, ultraviolet spectrometer, and cosmic ray detectors.",
    description: "Includes a 13-meter deployable fiberglass/beryllium boom isolating sensitive triaxial fluxgate magnetometers from spacecraft electromagnetic fields, plus a 2-axis steerable scan platform housing high-resolution television cameras, infrared radiometer, ultraviolet spectrometer, and cosmic ray detectors.",
    specs: "13m Deployable Astromast • 2-Axis Steerable Scan Platform"
  }
];
