/**
 * Voyager 1 — 1977 JPL Flight Project Engineering Roles
 * Sourced from historical records of the JPL Mariner Jupiter/Saturn 1977 project.
 */

export const ENGINEERING_ROLES = [
  {
    id: "systems-integration",
    title: "Systems Integration & Structure Lead",
    division: "Division 35 // Spacecraft Structure & Mechanisms",
    facility: "JPL SAF Bldg 179 &bull; Pasadena, CA",
    badgeCode: "SYS-MJS77",
    tagline: "Guardian of the 815 kg Mass Budget and 10-Sided Airframe",
    description: "Responsible for total spacecraft structural integrity, airframe stress tolerance under 10G launch loads, mass budget optimization, and pyrotechnic boom deployment kinematics.",
    topics: [
      {
        title: "Spacecraft Mass Budget & Wet/Dry Ratio",
        summary: "Strict tracking of the 815 kg total launch mass threshold, including 105 kg monopropellant hydrazine and 710 kg dry airframe."
      },
      {
        title: "10-Sided Decagonal Bus Airframe Architecture",
        summary: "Engineering the 10 standardized equipment bays with perimeter bimetallic thermal louvers and high torsional rigidity for Titan IIIE staging."
      },
      {
        title: "Appendage Kinematics & Deployable Center-of-Mass Balancing",
        summary: "Leverage balancing between the heavy 3.7m RTG boom and the lightweight 13m Astromast boom across the central thruster gimbal axis."
      }
    ],
    responsibilities: [
      "Maintain strict total spacecraft mass within 815 kg launch threshold.",
      "Integrate the 10-sided aluminium-magnesium decagonal core and central propellant tank.",
      "Verify structural safety margins and vibration harmonics for Titan IIIE launch acoustics.",
      "Coordinate mechanical interfaces with science instrument scan platforms and RTG booms."
    ],
    learningObjectives: [
      "Understand spacecraft structural mass trade-offs in deep-space probe design.",
      "Analyze structural load distribution during transonic launch phases.",
      "Model center-of-gravity stabilization for 3-axis attitude control."
    ],
    assignedActivities: [
      {
        taskId: "task-sys-01",
        step: 1,
        title: "Mass Budget Allocation & Fuel Fraction",
        componentId: "comp-tank",
        description: "Calculate dry mass and propellant mass fraction to verify Titan IIIE escape velocity capability."
      },
      {
        taskId: "task-sys-02",
        step: 2,
        title: "Decagonal Core Airframe Geometry & Louver Integration",
        componentId: "comp-bus",
        description: "Verify bay placement and radiator louver heat dissipation across 10 modular compartments."
      },
      {
        taskId: "task-sys-03",
        step: 3,
        title: "Deployable Boom Moment-Arm Center-of-Mass Balance",
        componentId: "comp-scan-platform",
        description: "Model torque leverage between the 3.7m RTG boom and 13m Astromast to prevent thruster misalignment."
      }
    ],
    assignedTaskIds: ["task-sys-01", "task-sys-02", "task-sys-03"]
  },
  {
    id: "telecom-avionics",
    title: "Telecommunications & Avionics Specialist",
    division: "Division 33 // Telecommunications & Flight Computing",
    facility: "JPL SAF Bldg 179 &bull; Pasadena, CA",
    badgeCode: "TEL-MJS77",
    tagline: "Architect of the Deep Space Microwave Link & 4KB Memory",
    description: "Responsible for the 3.7-meter high-gain Cassegrain antenna alignment, dual S/X-band microwave transmitters, and redundant Computer Command Subsystems (CCS).",
    topics: [
      {
        title: "Interstellar Radio Latency & Deep Space Network Geometry",
        summary: "Calculating one-way and round-trip light time across 24+ billion kilometers at speed of light in vacuum (c ≈ 299,792 km/s)."
      },
      {
        title: "3.7-Meter Parabolic High-Gain Antenna & Dual S/X-Band Links",
        summary: "Precision alignment of the Cassegrain subreflector and utilizing 8.4 GHz X-band for 115.2 kbps outer-planet digital imagery."
      },
      {
        title: "Computer Command Subsystem (CCS) & Plated-Wire Magnetic Memory",
        summary: "Dual-redundant 4,096-word memory units immune to Jupiter radiation bitflips and power dropouts."
      }
    ],
    responsibilities: [
      "Calculate microwave link margin across 24+ billion kilometers to NASA Deep Space Network.",
      "Calibrate the 3.7-meter parabolic dish Cassegrain subreflector and feed horn.",
      "Program flight sequence instructions into the 4,096-word plated-wire memory banks.",
      "Verify dual-frequency S-band (2.3 GHz) and X-band (8.4 GHz) downlinks."
    ],
    learningObjectives: [
      "Calculate radio signal inverse-square path attenuation over astronomical distances.",
      "Understand fault-tolerant computing architectures using dual-redundant voting logic.",
      "Analyze Doppler frequency shift and light-time delay in planetary flybys."
    ],
    assignedActivities: [
      {
        taskId: "task-tel-01",
        step: 1,
        title: "One-Way Light-Time Telemetry Latency Calculation",
        componentId: "comp-hga",
        description: "Calculate radio latency to compute exact communication delay when reaching 173.1 AU."
      },
      {
        taskId: "task-tel-02",
        step: 2,
        title: "Dual Frequency S-Band & X-Band Downlink Architecture",
        componentId: "comp-hga",
        description: "Compare S-band vs X-band frequency gain and bandwidth for Saturn image transmission."
      },
      {
        taskId: "task-tel-03",
        step: 3,
        title: "Plated-Wire Magnetic Memory & CCS Fault-Tolerance",
        componentId: "comp-ccs",
        description: "Verify non-volatile magnetic domain retention under intense Jovian ionizing radiation."
      }
    ],
    assignedTaskIds: ["task-tel-01", "task-tel-02", "task-tel-03"]
  },
  {
    id: "thermal-propulsion",
    title: "Propulsion & Thermal Vacuum Engineer",
    division: "Division 38 // Propulsion & Environmental Qualification",
    facility: "JPL 25-Foot Space Simulator &bull; Pasadena, CA",
    badgeCode: "THP-MJS77",
    tagline: "Master of Cryogenic Interstellar Cold and Catalytic Hydrazine",
    description: "Responsible for the catalytic monopropellant hydrazine attitude thruster subsystem, thermal louvers, and qualifying flight hardware in the 25-Foot Space Simulator chamber.",
    topics: [
      {
        title: "Catalytic Monopropellant Hydrazine Thrusters (Shell 405)",
        summary: "Spontaneous exothermic dissociation of N2H4 over iridium beds generating ~230 seconds of specific impulse without electrical sparks."
      },
      {
        title: "JPL 25-Foot Space Simulator Chamber Thermal-Vacuum Bake-Out",
        summary: "Exposing the Proof Test Model to 10^-6 torr hard vacuum, liquid nitrogen cold (-196°C), and xenon solar radiation lamps."
      },
      {
        title: "Radioisotope Decay & Silicon-Germanium Thermocouple Degradation",
        summary: "Analyzing the 4 Watts/year power decay from Pu-238 alpha decay combined with thermocouple silicon sublimation."
      }
    ],
    responsibilities: [
      "Calculate monopropellant hydrazine velocity increments (Delta-V) for trajectory correction maneuvers.",
      "Regulate thermal gradients between +100°C (direct solar radiation) and -180°C (planetary shadow).",
      "Monitor thermal vacuum bake-out at 10^-6 torr in the 25-Foot Space Simulator.",
      "Ensure nuclear heat decay from MHW-RTGs does not overheat delicate electronics bays."
    ],
    learningObjectives: [
      "Apply the Tsiolkovsky rocket equation to calculate hydrazine propellant consumption.",
      "Model radiative heat transfer with thermal blankets and louvers in hard vacuum.",
      "Analyze catalytic decomposition of hydrazine over Shell 405 iridium-alumina beds."
    ],
    assignedActivities: [
      {
        taskId: "task-thp-01",
        step: 1,
        title: "Catalytic Hydrazine Thruster Specific Impulse Calculation",
        componentId: "comp-thrusters",
        description: "Analyze spontaneous dissociation of liquid N2H4 over iridium catalyst beds."
      },
      {
        taskId: "task-thp-02",
        step: 2,
        title: "25-Foot Space Simulator Thermal-Vacuum Qualification",
        componentId: "comp-bus",
        description: "Verify thermal blanket and radiator louver performance under hard vacuum and LN2 shrouds."
      },
      {
        taskId: "task-thp-03",
        step: 3,
        title: "Radioisotope Decay & Electrical Power Degradation Curve",
        componentId: "comp-rtg",
        description: "Calculate multi-decade RTG power degradation from Pu-238 decay and SiGe thermocouple aging."
      }
    ],
    assignedTaskIds: ["task-thp-01", "task-thp-02", "task-thp-03"]
  },
  {
    id: "science-payload",
    title: "Science Instruments & Reconnaissance Lead",
    division: "Division 32 // Science Payload & Planetary Observations",
    facility: "JPL SAF Bldg 179 &bull; Pasadena, CA",
    badgeCode: "SCI-MJS77",
    tagline: "Steward of the Golden Record and 11 Scientific Instruments",
    description: "Responsible for the two-axis scan platform, imaging science subsystem (ISS), magnetometer boom isolation, and precision calibration of the Golden Record clock.",
    topics: [
      {
        title: "Deployable 13-Meter Astromast Boom & Magnetic Isolation",
        summary: "Mounting the Low-Field Magnetometer 13m away to drop spacecraft magnetic interference by 13^3 ≈ 2,197 times."
      },
      {
        title: "The Golden Record & Uranium-238 Radiometric Clock",
        summary: "Calibrating the pure electroplated U-238 sample with a 4.468 billion year half-life to date the spacecraft for alien finders."
      },
      {
        title: "Vidicon Television Tube & Trichromatic Optical Filter Wheel",
        summary: "Sequencing Blue, Green, and Orange exposures through an 8-position filter wheel to synthesize full-color planetary portraits."
      }
    ],
    responsibilities: [
      "Calibrate the 13-meter deployable Astromast boom to isolate sensitive magnetometers from spacecraft magnetic fields.",
      "Configure exposure and filter wheels for the Narrow-Angle and Wide-Angle Vidicon cameras.",
      "Inspect the electroplated Uranium-238 protective shield for the Golden Record.",
      "Synchronize infrared spectrometer (IRIS) and ultraviolet spectrometer (UVS) observation sequences."
    ],
    learningObjectives: [
      "Understand planetary reconnaissance instrumentation trade-offs.",
      "Analyze magnetic cleanliness requirements for triaxial fluxgate sensors.",
      "Examine radiometric half-life dating principles behind the Golden Record clock."
    ],
    assignedActivities: [
      {
        taskId: "task-sci-01",
        step: 1,
        title: "Astromast Magnetic Cleanliness & Sensor Isolation",
        componentId: "comp-astromast",
        description: "Apply the 1/r^3 magnetic dipole falloff law to isolate fluxgate magnetometers from bus currents."
      },
      {
        taskId: "task-sci-02",
        step: 2,
        title: "Golden Record Uranium-238 Radiometric Clock Calibration",
        componentId: "comp-golden-record",
        description: "Verify parent-to-daughter U-238 to Pb-206 isotope decay ratios for interstellar dating."
      },
      {
        taskId: "task-sci-03",
        step: 3,
        title: "Vidicon Imaging Science Subsystem (ISS) Optical Filter Wheel",
        componentId: "comp-vidicon",
        description: "Reconstruct multi-spectral Jupiter and Saturn images from monochrome Vidicon exposures."
      }
    ],
    assignedTaskIds: ["task-sci-01", "task-sci-02", "task-sci-03"]
  }
];
