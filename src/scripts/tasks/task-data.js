/**
 * Voyager 1 — Structured Engineering Tasks Database
 *
 * Sourced strictly from NASA SP-445, JPL Voyager Technical Specifications,
 * and historical mission logs from 1972-1977.
 *
 * Each task has authentic verification rules, educational technical feedback,
 * dependencies, and historical explanations.
 * Correct answers are rigorously balanced across A, B, C, and D (3 each).
 */

export const ENGINEERING_TASKS = [
  // =========================================================================
  // SYSTEMS INTEGRATION & STRUCTURE TASKS
  // =========================================================================
  {
    id: "task-sys-01",
    roleId: "systems-integration",
    stage: 1,
    title: "Spacecraft Mass Budget Allocation & Fuel Fraction",
    difficulty: "Journeyman",
    dependencies: [],
    context: "At launch on September 5, 1977, Voyager 1 had a total wet launch mass of 815 kg. The spacecraft carried 105 kg of hydrazine propellant inside a spherical titanium tank.",
    question: "Calculate the dry mass of Voyager 1 and determine the propellant mass fraction (percentage of launch mass dedicated to fuel).",
    type: "choice",
    options: [
      { id: "opt-a", label: "Dry Mass: 710 kg, Fuel Fraction: ~12.9%" },
      { id: "opt-b", label: "Dry Mass: 685 kg, Fuel Fraction: ~16.0%" },
      { id: "opt-c", label: "Dry Mass: 750 kg, Fuel Fraction: ~8.0%" },
      { id: "opt-d", label: "Dry Mass: 710 kg, Fuel Fraction: ~14.8%" }
    ],
    correctAnswerId: "opt-a",
    hint: "Dry mass = Total wet mass (815 kg) minus hydrazine fuel (105 kg). Fuel fraction = (105 kg / 815 kg) * 100%.",
    explanation: "815 kg - 105 kg = 710 kg dry mass. Fuel fraction = 105 / 815 ≈ 12.88%, which rounds to ~12.9%. This lightweight structural allocation was mandatory to achieve escape velocity on the Titan IIIE/Centaur rocket.",
    remediation: {
      targetCompId: "comp-tank",
      targetCompName: "Titanium Hydrazine Tank",
      guidance: "Review the mass budget and dry mass breakdown of Voyager 1 in the Hydrazine Tank dossier (815 kg total - 105 kg fuel = 710 kg dry mass)."
    },
    unlocks: ["task-sys-02"]
  },
  {
    id: "task-sys-02",
    roleId: "systems-integration",
    stage: 1,
    title: "Spacecraft Bus Structural Ring Geometry",
    difficulty: "Journeyman",
    dependencies: ["task-sys-01"],
    context: "The central spacecraft bus structure engineered in JPL Building 179 forms the load path between the launch vehicle adapter and the 3.7-meter high-gain antenna.",
    question: "Why did JPL structural designers select a 10-sided decagonal framework instead of a conventional cylindrical or rectangular fuselage?",
    type: "choice",
    options: [
      { id: "opt-a", label: "A decagonal frame was chosen exclusively to reduce aerodynamic drag inside the payload fairing during atmospheric ascent." },
      { id: "opt-b", label: "The 10-sided shape was mandated by the diameter of the Titan IIIE rocket stage interface ring." },
      { id: "opt-c", label: "A decagonal geometry provides 10 planar equipment bays with direct external thermal radiator louvers while maximizing torsional stiffness under launch vibration." },
      { id: "opt-d", label: "It was selected to house 10 identical hydrazine fuel tanks radially around the perimeter." }
    ],
    correctAnswerId: "opt-c",
    hint: "Think about modular electronics access, radiative thermal heat rejection to deep space, and structural rigidity.",
    explanation: "The 10-sided decagonal frame (1.78 meters across flats) allowed 10 standardized modular bays with variable bimetallic thermal louvers on the perimeter to vent heat directly into space while providing superior torsional rigidity during Titan IIIE staging.",
    remediation: {
      targetCompId: "comp-bus",
      targetCompName: "10-Sided Bus Structure",
      guidance: "Inspect the 10-sided decagonal equipment ring dossier to see how it houses 10 standardized equipment bays and thermal louvers."
    },
    unlocks: ["task-sys-03"]
  },
  {
    id: "task-sys-03",
    roleId: "systems-integration",
    stage: 2,
    title: "Boom Kinematics & Deployable Center-of-Mass Balance",
    difficulty: "Lead Engineer",
    dependencies: ["task-sys-02"],
    context: "Voyager 1 features two massive asymmetric deployable structures: a 13-meter Astromast magnetometer boom and a 3.7-meter truss carrying three nuclear RTGs.",
    question: "How did flight dynamicists maintain spacecraft center-of-mass alignment with thruster thrust vectors after deployable appendages locked into flight configuration?",
    type: "choice",
    options: [
      { id: "opt-a", label: "Engineers pumped liquid mercury counterweights between hollow structural struts after boom deployment." },
      { id: "opt-b", label: "The heavy RTG power canisters (~39 kg each) on a shorter 3.7m boom were deployed symmetrically opposite the lightweight 13m Astromast boom and science scan platform, balancing the center-of-mass over the central thruster gimbal axis." },
      { id: "opt-c", label: "Deployable booms were locked at 90-degree right angles with active mechanical gyroscopes shifting the physical chassis." },
      { id: "opt-d", label: "The high-gain antenna dish was mechanically shifted on linear rails to compensate for boom deployment." }
    ],
    correctAnswerId: "opt-b",
    hint: "Moment arm equation: Mass_1 * Length_1 ≈ Mass_2 * Length_2. The RTGs are heavy but on a short boom; the Astromast is light but very long.",
    explanation: "Mechanical leverage balancing: The three heavy RTGs (~116.7 kg total) at 3.7 meters produced a torque moment that counterbalanced the lightweight 5.6 kg Astromast at 13 meters and the 43 kg science scan platform on the opposite side, keeping the spacecraft center of mass aligned within millimeters of the thruster cluster vector.",
    remediation: {
      targetCompId: "comp-scan-platform",
      targetCompName: "Science Scan Platform",
      guidance: "Examine the Science Scan Platform and boom leverage mechanics: the heavy RTGs counterbalance the long Astromast boom."
    },
    unlocks: ["task-thp-02"]
  },

  // =========================================================================
  // TELECOMMUNICATIONS & COMPUTING TASKS
  // =========================================================================
  {
    id: "task-tel-01",
    roleId: "telecom-avionics",
    stage: 1,
    title: "One-Way Light-Time Telemetry Latency Calculation",
    difficulty: "Novice",
    dependencies: [],
    context: "Radio communications travel at the speed of light in vacuum (c ≈ 299,792.458 km/s). When Voyager 1 reaches a distance of 173.1 Astronomical Units (AU), ground controllers must calculate one-way light time.",
    question: "Given that 1 AU = 149,597,870.7 km, what is the approximate one-way radio latency when Voyager 1 is at 173.1 AU?",
    type: "choice",
    options: [
      { id: "opt-a", label: "Approximately 12 hours (43,200 seconds)" },
      { id: "opt-b", label: "Approximately 36 hours (129,600 seconds)" },
      { id: "opt-c", label: "Approximately 48 hours (172,800 seconds)" },
      { id: "opt-d", label: "Approximately 24 hours (86,393 seconds)" }
    ],
    correctAnswerId: "opt-d",
    hint: "Total distance in km = 173.1 * 149,597,870.7 km. Latency = Distance / 299,792.458 km/s. Convert seconds to hours (divide by 3600).",
    explanation: "173.1 AU * 149,597,870.7 km/AU ≈ 2.5895 * 10^10 km. Dividing by 299,792.458 km/s gives ~86,378 seconds, which is ~23.99 hours (effectively 24 hours, or One Light-Day). Ground commands take a full day to reach the spacecraft and another full day for confirmation.",
    remediation: {
      targetCompId: "comp-hga",
      targetCompName: "3.7m High-Gain Antenna",
      guidance: "Review the radio signal light-time latency equation (t = d/c) in the High-Gain Antenna dossier. 173.1 AU corresponds to 24.0 hours (One Light-Day)."
    },
    unlocks: ["task-tel-02"]
  },
  {
    id: "task-tel-02",
    roleId: "telecom-avionics",
    stage: 2,
    title: "Dual Frequency S-Band & X-Band Downlink Architecture",
    difficulty: "Journeyman",
    dependencies: ["task-tel-01"],
    context: "Voyager 1's 3.7-meter Cassegrain reflector simultaneously broadcasts in S-band (2.3 GHz) and experimental X-band (8.4 GHz) via traveling-wave tube amplifiers.",
    question: "What primary operational engineering advantage did adding the 8.4 GHz X-band link provide over legacy S-band-only outer planet missions like Pioneer 10?",
    type: "choice",
    options: [
      { id: "opt-a", label: "S-band radio waves cannot penetrate planetary ring particles or Jovian radiation belts." },
      { id: "opt-b", label: "X-band's higher frequency produces a tighter beam width with over 10 times higher data rate capability (~115.2 kbps vs ~40 bps), enabling high-resolution digital image transmission from Saturn." },
      { id: "opt-c", label: "X-band required zero electrical power from the onboard RTG power bus." },
      { id: "opt-d", label: "NASA's Deep Space Network in 1977 had decommissioned all S-band ground receivers." }
    ],
    correctAnswerId: "opt-b",
    hint: "Antenna gain and bandwidth scale with frequency squared. Higher frequency allows narrow beam concentration and dramatically higher bitrates.",
    explanation: "By transitioning telemetry downlink to 8.4 GHz (X-band), Voyager achieved 115,200 bits per second at Jupiter and 44,800 bps at Saturn, allowing return of tens of thousands of television frames and real-time scientific telemetry that an S-band link could never accommodate.",
    remediation: {
      targetCompId: "comp-hga",
      targetCompName: "3.7m High-Gain Antenna",
      guidance: "Review the dual-frequency telecommunication section in the High-Gain Antenna dossier: X-band produces tighter beam focus and ~10x higher data rate."
    },
    unlocks: ["task-tel-03"]
  },
  {
    id: "task-tel-03",
    roleId: "telecom-avionics",
    stage: 3,
    title: "Plated-Wire Magnetic Memory & CCS Fault-Tolerance",
    difficulty: "Lead Engineer",
    dependencies: ["task-tel-02"],
    context: "The Computer Command Subsystem (CCS) was built with dual-redundant 4,096-word memory units using magnetic plated-wire cores rather than semiconductor dynamic RAM.",
    question: "Why did JPL avionics engineers reject commercial semiconductor RAM chips in 1975 in favor of magnetic plated-wire memory for the primary flight computer?",
    type: "choice",
    options: [
      { id: "opt-a", label: "Semiconductor RAM chips were classified military secrets and unavailable to NASA." },
      { id: "opt-b", label: "Plated-wire memory was five times faster than silicon semiconductors in 1977." },
      { id: "opt-c", label: "Plated-wire memory is non-volatile (retains data without electrical power) and highly resistant to ionizing radiation and single-event upsets in Jupiter's radiation belts." },
      { id: "opt-d", label: "Plated-wire memory doubled as structural reinforcement for electronics bay doors." }
    ],
    correctAnswerId: "opt-c",
    hint: "Consider what happens during power dips and when high-energy charged particles traverse electronic circuits in Jupiter's radiation belt.",
    explanation: "Magnetic plated-wire memory stores bits as physical magnetic domain orientations in beryllium-copper wires plated with permalloy. It is inherently non-volatile (surviving sudden power undervoltage) and immune to radiation-induced memory bitflips that would corrupt volatile semiconductor RAM.",
    remediation: {
      targetCompId: "comp-ccs",
      targetCompName: "Computer Command Subsystem",
      guidance: "Inspect the Computer Command Subsystem dossier to learn why radiation-hard non-volatile magnetic plated-wire memory was selected."
    },
    unlocks: ["task-sci-02"]
  },

  // =========================================================================
  // THERMAL & PROPULSION TASKS
  // =========================================================================
  {
    id: "task-thp-01",
    roleId: "thermal-propulsion",
    stage: 1,
    title: "Catalytic Hydrazine Thruster Specific Impulse Calculation",
    difficulty: "Journeyman",
    dependencies: [],
    context: "Voyager 1 utilizes monopropellant liquid hydrazine (N2H4) passed over Shell 405 iridium-impregnated alumina catalyst beds inside 16 microthrusters.",
    question: "What physical reaction occurs inside the catalyst chamber to generate thrust without requiring an external oxidizer or electrical ignition spark?",
    type: "choice",
    options: [
      { id: "opt-a", label: "Exothermic spontaneous decomposition of liquid N2H4 into hot nitrogen (N2), hydrogen (H2), and ammonia (NH3) gases at ~800°C." },
      { id: "opt-b", label: "Combustion of hydrazine with liquid oxygen pumped from a cryogenic tank." },
      { id: "opt-c", label: "Ionization of hydrazine plasma accelerated by magnetic Lorentz coils." },
      { id: "opt-d", label: "Nuclear thermal heating of hydrazine passed directly through the RTG core." }
    ],
    correctAnswerId: "opt-a",
    hint: "Monopropellant systems rely on catalytic dissociation, not combustion with an oxidizer.",
    explanation: "Monopropellant hydrazine dissociates spontaneously when contacting iridium catalyst beds: 3 N2H4 → 4 NH3 + N2, followed by ammonia cracking (2 NH3 → N2 + 3 H2). This highly exothermic gas expansion generates an Isp of ~230 seconds with zero ignition mechanisms required.",
    remediation: {
      targetCompId: "comp-thrusters",
      targetCompName: "Attitude Propulsion Thrusters",
      guidance: "Review catalytic hydrazine decomposition in the Attitude Thrusters dossier: monopropellant N2H4 decomposes over Shell 405 iridium catalyst into hot gas."
    },
    unlocks: ["task-thp-02"]
  },
  {
    id: "task-thp-02",
    roleId: "thermal-propulsion",
    stage: 2,
    title: "25-Foot Space Simulator Thermal-Vacuum Qualification",
    difficulty: "Journeyman",
    dependencies: ["task-thp-01"],
    context: "In December 1976, the Voyager Proof Test Model (PTM) was sealed inside the 25-Foot Space Simulator chamber at JPL Pasadena to verify thermal control systems.",
    question: "How did test engineers simulate the extreme contrast between outer-planet deep freeze and direct solar thermal radiation inside the vacuum chamber?",
    type: "choice",
    options: [
      { id: "opt-a", label: "Infrared quartz heat lamps were cycled on and off with cold argon gas pumped through the chamber." },
      { id: "opt-b", label: "The chamber was submerged in a cryogenic refrigeration pool with incandescent spotlight banks." },
      { id: "opt-c", label: "Giant parabolic mirrors concentrated Pasadena ambient sunlight into an evacuated steel bell." },
      { id: "opt-d", label: "Xenon arc lamp collimators projected simulated solar rays from above while liquid-nitrogen cooled walls (-196°C) surrounded the probe inside a 10^-6 torr vacuum." }
    ],
    correctAnswerId: "opt-d",
    hint: "Liquid nitrogen (LN2) produces deep space cold backgrounds, while high-intensity xenon arc lamps replicate the solar spectrum.",
    explanation: "The 25-Foot Space Simulator chamber at JPL utilized an optical array of high-intensity xenon lamps through a collimating mirror to simulate solar irradiance, while liquid nitrogen shrouds cooled to 77 Kelvin (-196°C) absorbed radiated heat in high vacuum (10^-6 torr).",
    remediation: {
      targetCompId: "comp-bus",
      targetCompName: "Spacecraft Bus Thermal Control",
      guidance: "Examine the 25-Foot Space Simulator testing notes: high-intensity xenon arc lamps simulated the sun, while liquid nitrogen shrouds (-196°C) simulated deep space."
    },
    unlocks: ["task-thp-03"]
  },
  {
    id: "task-thp-03",
    roleId: "thermal-propulsion",
    stage: 3,
    title: "Radioisotope Decay & Electrical Power Degradation Curve",
    difficulty: "Lead Engineer",
    dependencies: ["task-thp-02"],
    context: "At launch, the 3 MHW-RTGs produced 474 Watts of electrical power. Plutonium-238 alpha decay has a half-life of 87.7 years, but the electrical power output declines faster than radioisotope half-life alone.",
    question: "Why does RTG electrical power decay at approximately 4 Watts per year (~1.4% annually) when nuclear half-life alone would only predict ~0.79% annual loss?",
    type: "choice",
    options: [
      { id: "opt-a", label: "Helium gas created by alpha decay escapes through microscopic seams, cooling the plutonium spheres." },
      { id: "opt-b", label: "In addition to fuel decay, the silicon-germanium (SiGe) thermocouples undergo thermal and radiation degradation over time, decreasing thermal-to-electric conversion efficiency." },
      { id: "opt-c", label: "The fiberglass RTG boom slowly expands in deep space, distancing the generators from the spacecraft bus." },
      { id: "opt-d", label: "Spacecraft electrical cables oxidize in the interstellar vacuum, increasing resistance." }
    ],
    correctAnswerId: "opt-b",
    hint: "Thermocouple junctions are solid-state materials subject to thermal sublimation, dopant precipitation, and radiation lattice damage over decades.",
    explanation: "Total RTG degradation is a product of two factors: (1) Nuclear decay of Pu-238 heat source (~0.79%/year), and (2) Silicon-Germanium thermocouple junction aging (~0.6-0.8%/year) caused by silicon sublimation and dopant precipitation at 1,000°C, summing to ~1.4% total annual power loss.",
    remediation: {
      targetCompId: "comp-rtg",
      targetCompName: "Radioisotope Thermoelectric Generators",
      guidance: "Check the RTG power degradation curve: Silicon-Germanium thermocouple junction aging contributes ~0.6-0.8%/year alongside Pu-238 alpha decay (~0.79%/year)."
    },
    unlocks: ["task-sci-01"]
  },

  // =========================================================================
  // SCIENCE INSTRUMENTATION & CALIBRATION TASKS
  // =========================================================================
  {
    id: "task-sci-01",
    roleId: "science-payload",
    stage: 1,
    title: "Astromast Magnetic Cleanliness & Sensor Isolation",
    difficulty: "Journeyman",
    dependencies: [],
    context: "Voyager 1's Triaxial Fluxgate Magnetometers (MAG) measure extremely faint interplanetary magnetic fields on the order of 0.1 to 5.0 nanoTesla (nT).",
    question: "Why was the Low-Field Magnetometer (LFM) mounted at the very tip of a deployable 13-meter Astromast boom rather than directly on the spacecraft bus?",
    type: "choice",
    options: [
      { id: "opt-a", label: "To place the magnetometer closer to the solar wind plasma stream outside the bow shock." },
      { id: "opt-b", label: "To allow the boom to serve as a high-frequency radio dipole reception antenna." },
      { id: "opt-c", label: "To isolate the magnetic sensors from magnetic fields generated by the spacecraft's electrical bus, RTG currents, and thruster solenoids according to the 1/r^3 dipole falloff law." },
      { id: "opt-d", label: "To prevent the magnetometer's permanent magnets from interfering with the Vidicon TV cameras." }
    ],
    correctAnswerId: "opt-c",
    hint: "Magnetic dipole fields generated by spacecraft electronics decrease with the cube of distance: B(r) ∝ 1/r^3.",
    explanation: "By deploying the LFM sensor 13 meters away, spacecraft-generated magnetic interference from bus power wiring and RTGs drops by a factor of 13^3 ≈ 2,197 times. The dual-magnetometer technique (High-Field inboard at 5.6m, Low-Field outboard at 13m) allowed mathematical subtraction of residual spacecraft fields.",
    remediation: {
      targetCompId: "comp-astromast",
      targetCompName: "13m Astromast Magnetometer Boom",
      guidance: "Review magnetic cleanliness and sensor isolation: magnetic fields drop with the cube of distance (1/r^3), isolating the sensor from bus electrical currents."
    },
    unlocks: ["task-sci-02"]
  },
  {
    id: "task-sci-02",
    roleId: "science-payload",
    stage: 2,
    title: "Golden Record Uranium-238 Radiometric Clock Calibration",
    difficulty: "Journeyman",
    dependencies: ["task-sci-01"],
    context: "Mounted on Bay 4 of the bus is the Golden Record. Its gold-anodized aluminum cover features an electroplated ultra-pure sample of Uranium-238.",
    question: "How can an extraterrestrial civilization that recovers Voyager 1 millions of years in the future deduce when the spacecraft was constructed and launched?",
    type: "choice",
    options: [
      { id: "opt-a", label: "The uranium decays with a rhythmic gamma pulse that triggers the phonograph cartridge mechanism." },
      { id: "opt-b", label: "The uranium acts as a phosphor, glowing faintly in deep space to illuminate the cover engravings." },
      { id: "opt-c", label: "It was intended to power an emergency transponder beacon after the RTGs depleted." },
      { id: "opt-d", label: "By measuring the remaining ratio of parent Uranium-238 to daughter decay products (such as Lead-206), finders can compute how many billions of years have elapsed since launch." }
    ],
    correctAnswerId: "opt-d",
    hint: "Radiometric dating uses the half-life of radioactive decay: N(t) = N_0 * (1/2)^(t / t_half).",
    explanation: "Uranium-238 decays with a half-life of 4.468 billion years into Lead-206. By measuring the isotopic abundance of decay daughter products relative to parent U-238 in the pure electroplated sample, extraterrestrial scientists can calculate the elapsed time since launch with high precision.",
    remediation: {
      targetCompId: "comp-golden-record",
      targetCompName: "The Golden Record Cover",
      guidance: "Review the Uranium-238 radioactive clock section: measuring the ratio of parent U-238 (half-life 4.468 Gyr) to daughter lead isotopes dates the mission."
    },
    unlocks: ["task-sci-03"]
  },
  {
    id: "task-sci-03",
    roleId: "science-payload",
    stage: 3,
    title: "Vidicon Imaging Science Subsystem (ISS) Optical Filter Wheel",
    difficulty: "Lead Engineer",
    dependencies: ["task-sci-02"],
    context: "Voyager 1's Narrow-Angle Camera utilizes an 800x800 pixel selenium-sulfur vidicon television tube that records only monochrome light intensity values.",
    question: "How did imaging scientists generate high-resolution full-color portraits of Jupiter's Great Red Spot and Io's volcanic plumes using a strictly black-and-white vidicon tube?",
    type: "choice",
    options: [
      { id: "opt-a", label: "Three sequential monochrome exposures were taken through Blue, Green, and Orange/Clear optical filters, then recombined on Earth using digital image processing." },
      { id: "opt-b", label: "The Vidicon sensor used an internal color Bayer filter mosaic similar to modern digital camera sensors." },
      { id: "opt-c", label: "Color was hand-painted onto monochrome prints by NASA artists using spectrophotometer readings." },
      { id: "opt-d", label: "A color prism split the incoming light into three separate miniature Vidicon camera tubes." }
    ],
    correctAnswerId: "opt-a",
    hint: "Trichromatic color synthesis: taking separate exposures through color bandpass filters on a rotating wheel.",
    explanation: "The ISS camera possessed an 8-position filter wheel. By acquiring three successive monochrome frames through Blue, Green, and Orange filters, digitizing the signals, and recombining them through color channels in JPL's Image Processing Laboratory (IPL), true and false-color composites were generated.",
    remediation: {
      targetCompId: "comp-vidicon",
      targetCompName: "Narrow-Angle Vidicon Camera",
      guidance: "Examine the Vidicon filter wheel mechanism: full-color images were produced by combining 3 monochrome frames taken through Blue, Green, and Orange filters."
    },
    unlocks: []
  }
];
