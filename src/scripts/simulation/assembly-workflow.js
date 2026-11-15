/**
 * Voyager 1 — Educational Spacecraft Assembly Workflow Engine
 * 
 * Reconstructs the 6-stage assembly and qualification sequence
 * conducted at the JPL Spacecraft Assembly Facility (SAF) Bldg 179 in Pasadena, CA.
 * 
 * Enforces sequential dependencies and component clearances.
 * Connects directly to central mission state and progress calculation.
 */

import { SPACECRAFT_COMPONENTS } from './components-data.js';

export const ASSEMBLY_STAGES = [
  {
    stageNum: 1,
    id: "stage1",
    title: "Core Airframe & Propellant Tank Integration",
    facility: "JPL SAF Bldg 179 // High Bay Cleanroom",
    componentIds: ["comp-bus", "comp-tank", "comp-ccs"],
    summary: "Erect the 10-sided decagonal aluminium-magnesium chassis and secure the central spherical titanium hydrazine fuel tank at the geometric center of gravity.",
    requirements: "Requires selected Engineering Role clearance.",
    deliverable: "Qualified core structural bus with 10 equipment bays and internal plumbing manifolds.",
    testingProtocol: "High-pressure hydrostatic helium leak check at 350 psi (2.4 MPa)."
  },
  {
    stageNum: 2,
    id: "stage2",
    title: "3.7-Meter High-Gain Cassegrain Dish Alignment",
    facility: "JPL SAF Bldg 179 // Optical Bench Alignment Bay",
    componentIds: ["comp-hga"],
    summary: "Crane-lift and mate the 3.7-meter graphite-epoxy parabolic reflector above the central bus. Optically align the Cassegrain sub-reflector and dual S/X-band feed horn.",
    requirements: "Requires completed Stage 01 core airframe integration.",
    deliverable: "Microwave reflector assembly with pointing concentricity within 0.05 degrees.",
    testingProtocol: "RF anechoic chamber microwave pattern verification at 2.3 GHz and 8.4 GHz."
  },
  {
    stageNum: 3,
    id: "stage3",
    title: "Radioisotope Thermoelectric Generator (RTG) Boom Installation",
    facility: "JPL SAF Bldg 179 // Nuclear Fuel Quarantine Cell",
    componentIds: ["comp-rtg"],
    summary: "Mount the 3.7-meter deployable fiberglass boom carrying three MHW-RTGs. Connect high-reliability DC power harnesses and thermal protection blankets.",
    requirements: "Requires completed Stage 02 and at least 1 validated Engineering Task.",
    deliverable: "474-Watt continuous nuclear-electric power subsystem with passive cooling radiators.",
    testingProtocol: "Thermal gradient and DC bus load transient qualification."
  },
  {
    stageNum: 4,
    id: "stage4",
    title: "Astromast Magnetometer Boom & Science Scan Platform",
    facility: "JPL SAF Bldg 179 // Articulation Mechanics Bay",
    componentIds: ["comp-astromast", "comp-scan-platform", "comp-vidicon"],
    summary: "Integrate the two-axis articulating science scan platform housing the dual Vidicon cameras and spectrometers. Mount the 13-meter deployable Astromast boom canister.",
    requirements: "Requires completed Stage 03 power subsystem installation.",
    deliverable: "Fully articulated remote-sensing platform and isolated magnetic sensor boom.",
    testingProtocol: "Multi-axis articulation motor torque tests and dry lubricant vacuum qualification."
  },
  {
    stageNum: 5,
    id: "stage5",
    title: "The Golden Record & Uranium-238 Protective Shield Mounting",
    facility: "JPL SAF Bldg 179 // Precision Clean Bench",
    componentIds: ["comp-golden-record"],
    summary: "Bolt the 12-inch gold-plated copper phonograph record to Bay 4 of the bus chassis. Secure the electroplated Uranium-238 protective aluminium cover and needle cartridge.",
    requirements: "Requires completed Stage 04 science platform and at least 1 resolved Trade-Off Decision.",
    deliverable: "Interstellar cultural payload verified for multi-billion-year deep-space survivability.",
    testingProtocol: "Acoustic vibration resonance qualification to 145 dB."
  },
  {
    stageNum: 6,
    id: "stage6",
    title: "Attitude Thruster Pods & 25-Foot Space Simulator Chamber Qualification",
    facility: "JPL 25-Foot Space Simulator Vacuum Chamber",
    componentIds: ["comp-thrusters"],
    summary: "Install sixteen 0.2 lbf catalytic hydrazine thrusters across 4 peripheral clusters. Transfer the complete flight spacecraft to the 25-Foot Space Simulator for thermal vacuum qualification.",
    requirements: "Requires completed Stage 05 Golden Record mounting.",
    deliverable: "Fully integrated, flight-qualified Voyager 1 spacecraft ready for transport to Cape Canaveral.",
    testingProtocol: "Simulated solar irradiation with xenon arc lamps and cryogenic walls at -196°C in 10^-6 torr vacuum (Verified NASA PIA21734)."
  }
];

export const STAGE_3D_TARGETS = {
  1: {
    stageNum: 1,
    componentName: "Core Airframe & Propellant Tank",
    focusDescription: "Decagonal structural ring (1.78m) and central spherical titanium hydrazine fuel tank (105 kg fuel capacity).",
    hotspotTag: "STAGE 01 // BUS & TANK",
    technicalRef: "NASA SP-445 Ch. 3 • JPL SAF Bldg 179",
    rotX: 0.15,
    rotY: -0.4,
    camZ: 680,
    lightColor: "#f59e0b"
  },
  2: {
    stageNum: 2,
    componentName: "3.7-Meter High-Gain Cassegrain Dish",
    focusDescription: "Graphite-epoxy composite parabolic reflector dish with Cassegrain subreflector and dual S/X-band feed horns.",
    hotspotTag: "STAGE 02 // HGA CASSEGRAIN",
    technicalRef: "IEEE COM-27 • Aeronutronic Ford / JPL",
    rotX: -0.45,
    rotY: -0.6,
    camZ: 660,
    lightColor: "#38bdf8"
  },
  3: {
    stageNum: 3,
    componentName: "Multi-Hundred-Watt RTG Power Unit",
    focusDescription: "Deployable 3.7m boom supporting three MHW-RTGs powered by 24 Plutonium-238 oxide fuel spheres each (~474W at launch).",
    hotspotTag: "STAGE 03 // NUCLEAR POWER",
    technicalRef: "DOE / GE MHW-RTG Final Safety Report",
    rotX: 0.1,
    rotY: 0.85,
    camZ: 700,
    lightColor: "#fbbf24"
  },
  4: {
    stageNum: 4,
    componentName: "Astromast Magnetometer Boom & Scan Platform",
    focusDescription: "13-meter continuous coiled fiberglass Astromast boom isolating magnetometers, plus 2-axis articulated optical scan platform.",
    hotspotTag: "STAGE 04 // BOOMS & OPTICS",
    technicalRef: "Astro Research Corp • JPL TM 33-728",
    rotX: 0.25,
    rotY: -1.45,
    camZ: 700,
    lightColor: "#a78bfa"
  },
  5: {
    stageNum: 5,
    componentName: "The Golden Record & Uranium Shield",
    focusDescription: "12-inch gold-plated copper phonograph disc bolted to Bay 4, protected by aluminum cover with electroplated Uranium-238 clock.",
    hotspotTag: "STAGE 05 // GOLDEN RECORD",
    technicalRef: "Sagan Committee • NASA Catalog PIA21740",
    rotX: 0.05,
    rotY: 0.35,
    camZ: 650,
    lightColor: "#f59e0b"
  },
  6: {
    stageNum: 6,
    componentName: "Attitude Thruster Pods & Thermal Chamber",
    focusDescription: "Sixteen catalytic hydrazine thrusters (0.2 lbf each) across 4 corner clusters, qualified inside the 25-Foot Space Simulator.",
    hotspotTag: "STAGE 06 // THRUSTERS & QUALIFICATION",
    technicalRef: "NASA PIA21734 • JPL 25-Foot Space Simulator",
    rotX: 0.22,
    rotY: -0.68,
    camZ: 750,
    lightColor: "#10b981"
  }
};

export class AssemblyWorkflowEngine {
  static getStageByNum(num) {
    return ASSEMBLY_STAGES.find(s => s.stageNum === Number(num)) || null;
  }

  static getStageComponents(stageNum) {
    const stage = this.getStageByNum(stageNum);
    if (!stage) return [];
    return SPACECRAFT_COMPONENTS.filter(c => stage.componentIds.includes(c.id));
  }

  static getStage3DTarget(stageNum) {
    return STAGE_3D_TARGETS[Number(stageNum)] || STAGE_3D_TARGETS[1];
  }
}
