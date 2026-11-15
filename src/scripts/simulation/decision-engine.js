/**
 * Voyager 1 — Engineering Decision Engine
 * 
 * Recreates 4 pivotal historical dilemmas faced by JPL engineers
 * between 1972 and 1977 during the Mariner Jupiter/Saturn project.
 * 
 * Evaluates submitted decisions using transparent physical rules,
 * explains technical consequences, and records outcomes in central state.
 */

export const ENGINEERING_DECISIONS = [
  {
    id: "dec-mass-power",
    title: "Trade-Off 01 // Electrical Power vs Science Payload Mass",
    historicalDilemma: "In 1974, structural analysis revealed that the Titan IIIE-Centaur rocket stack had a hard payload limit of 815 kg. Planetary scientists requested additional instruments, but the three MHW-RTGs already weighed 116.7 kg.",
    choices: [
      {
        id: "choice-a",
        label: "Eliminate one RTG (reducing power to ~315W) to add a 35 kg heavy cosmic-ray mass spectrometer.",
        passed: false,
        consequences: "INSUFFICIENT POWER: A 315W power supply would deplete below minimum transmitter threshold before reaching Saturn in 1980, crippling deep-space communication.",
        historicalResolution: "NASA rejected this choice. Three RTGs were mandatory to sustain 474W at launch and guarantee mission operations beyond Saturn into interstellar space."
      },
      {
        id: "choice-b",
        label: "Retain all three MHW-RTGs (474W) and rigorously lighten instrument structural housings using beryllium and magnesium alloys to meet the 815 kg cap.",
        passed: true,
        consequences: "OPTIMAL HISTORICAL DECISION: Preserved all 11 scientific instruments while maintaining 474W launch power and remaining within the 815 kg total wet mass budget.",
        historicalResolution: "This was NASA/JPL's exact decision. Engineers redesigned instrument brackets in lightweight beryllium, keeping all 3 RTGs and launching at exactly 815 kg."
      },
      {
        id: "choice-c",
        label: "Replace RTGs entirely with 50 square meters of lightweight solar panels.",
        passed: false,
        consequences: "FATAL DESIGN FLAW: At Jupiter (5.2 AU) solar irradiance is 1/27th of Earth; at Saturn (9.5 AU) it is 1/90th. Solar panels in 1977 could not produce enough electrical power to operate.",
        historicalResolution: "Solar power was scientifically ruled out in 1972. Outer solar system exploration required nuclear RTG power."
      }
    ]
  },
  {
    id: "dec-radiation-hardening",
    title: "Trade-Off 02 // Radiation Hardening for the Jovian Gauntlet",
    historicalDilemma: "In late 1973, Pioneer 10 flew through Jupiter's radiation belts and measured electron radiation 1,000 times deadlier than predicted. Voyager 1's semiconductors risked immediate dielectric breakdown and memory wipeout.",
    choices: [
      {
        id: "choice-a",
        label: "Reroute Voyager 1's trajectory to pass 2 million kilometers further from Jupiter, avoiding the inner radiation belts entirely.",
        passed: false,
        consequences: "MISSION FAILURE (TRAJECTORY MISALIGNMENT): Bypassing Jupiter at excessive distance eliminates the gravitational assist required to sling the spacecraft to Saturn.",
        historicalResolution: "NASA rejected widening the flyby distance because close proximity was gravitationally indispensable for reaching Saturn and Titan."
      },
      {
        id: "choice-b",
        label: "Add 200 kg of heavy solid lead vault plating around all electronics bays.",
        passed: false,
        consequences: "LAUNCH ABORT (OVERWEIGHT): Adding 200 kg exceeded the 815 kg launch vehicle capacity by 24%, preventing the rocket from achieving Earth escape velocity.",
        historicalResolution: "Physical shielding mass had to be strictly limited to preserve the mass budget."
      },
      {
        id: "choice-c",
        label: "Implement a hybrid strategy: Replace commercial semiconductors with radiation-hardened custom chips, add localized tantalum foil shields, and redesign circuits with noise-filtering bypass capacitors.",
        passed: true,
        consequences: "HISTORICAL SUCCESS: Voyager 1 survived 1,000 times higher radiation doses than originally specified, passing through Jupiter's flux tube with zero unrecoverable computer faults.",
        historicalResolution: "This was JPL's brilliant solution. The electronic redesign cost $7 million in 1974 but allowed Voyager 1 to fly deep into Io's plasma torus and survive."
      }
    ]
  },
  {
    id: "dec-telecom-band",
    title: "Trade-Off 03 // Telemetry Downlink Frequency Architecture",
    historicalDilemma: "Pioneer 10 and 11 relied solely on S-band radio (2.3 GHz), which limited downlink speeds to a sluggish 1,024 bits per second at Jupiter and returned only coarse imagery.",
    choices: [
      {
        id: "choice-a",
        label: "Stick exclusively with proven S-band (2.3 GHz) hardware to minimize design risk and development cost.",
        passed: false,
        consequences: "SEVERE SCIENCE BOTTLENECK: At 1 kbps, a single Vidicon picture would take over an hour to transmit, preventing dynamic movie sequences of Jovian atmospheric vortices.",
        historicalResolution: "JPL rejected an S-band-only architecture as insufficient for outer planet imaging requirements."
      },
      {
        id: "choice-b",
        label: "Implement dual S-band and experimental X-band (8.4 GHz) microwave links with a high-precision 3.7-meter composite Cassegrain reflector.",
        passed: true,
        consequences: "HISTORICAL BREAKTHROUGH: Enabled 115,200 bps data rate at Jupiter and ~44.8 kbps at Saturn, allowing 67,000 high-resolution photos and real-time scientific telemetry.",
        historicalResolution: "JPL adopted the dual-band architecture. The 8.4 GHz link became the gold standard for all subsequent deep-space planetary missions."
      },
      {
        id: "choice-c",
        label: "Equip Voyager with an optical laser communication transmitter instead of radio dishes.",
        passed: false,
        consequences: "TECHNOLOGICALLY INFEASIBLE (1977): Deep-space laser communications technology did not exist in the 1970s; pointing jitter and cloud attenuation would cause total signal loss.",
        historicalResolution: "Deep-space laser communication was decades away from operational readiness."
      }
    ]
  },
  {
    id: "dec-attitude-control",
    title: "Trade-Off 04 // Attitude Reference: Star Tracker vs Mechanical Gyros",
    historicalDilemma: "Maintaining the 3.7-meter high-gain antenna pointed precisely within 0.1° of Earth over years of silent cruising required a drift-free celestial attitude reference.",
    choices: [
      {
        id: "choice-a",
        label: "Rely exclusively on mechanical spinning-mass gyroscopes for attitude determination across the multi-decade flight.",
        passed: false,
        consequences: "TELEMETRY LOSS (GYRO DRIFT): Mechanical gyroscopes undergo bearing wear and drift within hundreds of hours, eventually breaking antenna lock with Earth.",
        historicalResolution: "Gyros were kept for transient maneuvers and launch staging, but continuous cruise required celestial star trackers."
      },
      {
        id: "choice-b",
        label: "Use an electro-optical Canopus Star Tracker and Sun sensor array as the primary attitude lock, keeping gyros powered down during cruise to preserve lifetime.",
        passed: true,
        consequences: "HISTORICAL PERFECTION: Kept the high-gain dish locked on Earth with minimal hydrazine expenditure, preserving mechanical gyros for critical planetary encounters.",
        historicalResolution: "This was JPL's strategy. By locking onto the bright southern star Canopus and the Sun, Voyager maintained pinpoint pointing while resting its gyros."
      },
      {
        id: "choice-c",
        label: "Design Voyager to spin continuously like Pioneer 10 (spin-stabilization) rather than maintaining 3-axis pointing.",
        passed: false,
        consequences: "MISSION CRIPPLED: Spin stabilization prevented the installation of an articulated high-magnification science scan platform and blurred long-exposure Vidicon images.",
        historicalResolution: "JPL insisted on 3-axis stabilization precisely so that cameras could remain steadily pointed at distant moons and atmospheric storms."
      }
    ]
  }
];

export const PROPOSAL_VERDICTS = {
  FEASIBLE: "FEASIBLE — HISTORICALLY PLAUSIBLE",
  CONDITIONALLY_FEASIBLE: "CONDITIONALLY FEASIBLE — SIGNIFICANT TRADE-OFFS",
  UNSUITABLE: "UNSUITABLE — IDENTIFIED DESIGN CONSTRAINT",
  ANACHRONISTIC: "ANACHRONISTIC — NOT AVAILABLE IN THE 1977 BASELINE",
  INSUFFICIENT_EVIDENCE: "INSUFFICIENT EVIDENCE — MORE DATA REQUIRED"
};

export class DecisionEngine {
  static getDecisionById(id) {
    return ENGINEERING_DECISIONS.find(d => d.id === id) || null;
  }

  static evaluateChoice(decisionId, choiceId) {
    const dec = this.getDecisionById(decisionId);
    if (!dec) return { success: false, feedback: 'Dilemma not found' };

    const choice = dec.choices.find(c => c.id === choiceId);
    if (!choice) return { success: false, feedback: 'Invalid choice selected' };

    return {
      success: true,
      passed: choice.passed,
      title: dec.title,
      choiceLabel: choice.label,
      consequences: choice.consequences,
      historicalResolution: choice.historicalResolution
    };
  }

  /**
   * Evaluates a user-submitted engineering proposal against authentic
   * 1977 JPL Voyager project physical and technological constraints.
   *
   * Analyzes 6 physical constraint vectors:
   * 1. Spacecraft Mass Budget (815 kg total wet mass launch limit)
   * 2. Electrical Power Budget & 1/r^2 solar drop (474W launch, 240W deep-space threshold)
   * 3. Thermal Vacuum Operating Envelope (-180°C outer space to +100°C 1 AU)
   * 4. Jovian Radiation Belts Hardening (>= 100 krad total ionizing dose)
   * 5. Catalytic Monopropellant Hydrazine Propulsion (Isp ~230s, 104 kg propellant)
   * 6. Microwave Telecommunication Link Margin (3.7m HGA dish, S/X-band, DSN 64m net)
   *
   * @param {Object} proposal
   * @param {string} proposal.subsystem
   * @param {string} proposal.title
   * @param {string} proposal.proposalText
   * @param {string} proposal.justification
   * @param {number} [proposal.massDeltaKg]
   * @param {number} [proposal.powerDeltaWatts]
   * @returns {Object} Rigorous evaluation verdict and vector breakdown
   */
  static evaluateCustomProposal({
    subsystem = "general",
    title = "",
    proposalText = "",
    justification = "",
    massDeltaKg = 0,
    powerDeltaWatts = 0
  }) {
    const cleanText = (proposalText + " " + justification + " " + title).toLowerCase();

    // 1. Minimum Evidence / Length Check
    if (proposalText.trim().length < 25 || title.trim().length < 4) {
      return {
        verdict: PROPOSAL_VERDICTS.INSUFFICIENT_EVIDENCE,
        badgeColor: "#94a3b8",
        summary: "The submitted proposal lacks sufficient engineering specification or physical detail for rigorous constraint analysis.",
        vectors: [
          { name: "Specification Completeness", status: "fail", detail: "Proposal text is too brief (< 25 characters). Detail the specific alloys, mechanisms, or circuits proposed." },
          { name: "Mass Budget (815 kg max)", status: "warn", detail: "Unspecified mass implications." },
          { name: "Power Envelope (470W baseline)", status: "warn", detail: "Unspecified electrical power demand." },
          { name: "Thermal Survival (-180°C to +100°C)", status: "warn", detail: "Unspecified thermal insulation or louvers." },
          { name: "Radiation Tolerance (100 krad)", status: "warn", detail: "Unspecified semiconductor hardening." },
          { name: "Deep Space Link Margin", status: "warn", detail: "Unspecified RF communications link architecture." }
        ],
        advantages: ["Initial concept logged in JPL design register."],
        risks: ["Cannot be flight-qualified without comprehensive engineering calculations."],
        historicalResolution: "In 1974, all Voyager subsystem proposals required detailed Engineering Change Requests (ECRs) with mass, thermal, and electrical power budgets submitted to Project Manager John Casani.",
        revisionAdvice: "Expand your description to specify exact materials, estimated mass changes, power draw, and how the subsystem withstands interplanetary space environments."
      };
    }

    // 2. Anachronism Detection (Technologies not available in August 1977)
    const anachronisms = [
      { pattern: /\b(lithium[- ]ion|li[- ]ion|lfp|nmc|solid[- ]state battery)\b/i, name: "Lithium-Ion Battery Chemistry", note: "Li-ion was first proposed in 1980 by Goodenough and commercialized in 1991. In 1977, space probes used Ni-Cd or non-rechargeable silver-zinc, but outer planet probes relied exclusively on nuclear RTGs." },
      { pattern: /\b(carbon nanotube|nanotubes|graphene|metamaterial)\b/i, name: "Carbon Nanotubes / Graphene", note: "Carbon nanotubes were discovered in 1991 and graphene in 2004. Voyager 1 structural members relied on titanium, beryllium, magnesium AZ31B, and 6061-T6 aluminum alloys." },
      { pattern: /\b(flash memory|ssd|solid state drive|micro[- ]?sd|nvme|thumb drive)\b/i, name: "Solid-State Flash Memory", note: "Flash memory was invented by Toshiba in 1984. Voyager 1 used 4,096-word magnetic plated-wire memory and an 8-track digital magnetic tape transport." },
      { pattern: /\b(microprocessor|intel 8086|pentium|arm processor|risc[- ]?v|64[- ]bit|core i\d|snapdragon)\b/i, name: "Modern High-Performance Microprocessor", note: "Modern 16/32/64-bit microprocessors did not exist or were not radiation-hardened in 1977. Voyager 1 used discrete TTL and custom low-power CMOS logic operating under 1 MHz." },
      { pattern: /\b(gps|global positioning system)\b/i, name: "GPS Satellite Navigation", note: "The GPS constellation did not become operational until the 1990s and is useless outside Earth orbit. Voyager navigated using optical star trackers (Canopus), Sun sensors, and radiometric DSN Doppler tracking." },
      { pattern: /\b(deep learning|neural network|machine learning|transformer|llm|chatgpt|artificial intelligence)\b/i, name: "Modern Artificial Intelligence / Deep Learning", note: "Modern AI models require billions of floating-point operations unavailable in 1977. Voyager relied on hard-coded sequential state machines in the Computer Command Subsystem (CCS)." },
      { pattern: /\b(laser communication|optical comms|fiber optic)\b/i, name: "Deep Space Laser Optical Communication", note: "Operational deep-space laser communications require sub-microradian pointing precision unachievable with 1970s technology. Voyager used S/X-band microwave links." }
    ];

    const detectedAnachronism = anachronisms.find(a => a.pattern.test(cleanText));
    if (detectedAnachronism) {
      return {
        verdict: PROPOSAL_VERDICTS.ANACHRONISTIC,
        badgeColor: "#ec4899",
        summary: `ANACHRONISM DETECTED: Proposal incorporates ${detectedAnachronism.name}, which was not available or flight-qualified in the August 1977 baseline.`,
        vectors: [
          { name: "Historical Baseline (1977)", status: "fail", detail: detectedAnachronism.note },
          { name: "Mass Budget (815 kg max)", status: "warn", detail: "Technology baseline incompatible with 1977 flight qualification." },
          { name: "Power Envelope (470W baseline)", status: "warn", detail: "Electrical specifications do not match 1970s RTG voltage rails." },
          { name: "Thermal Survival (-180°C to +100°C)", status: "warn", detail: "1970s thermal vacuum qualification chambers cannot qualify modern components." },
          { name: "Radiation Tolerance (100 krad)", status: "fail", detail: "Modern unshielded commercial electronics suffer immediate latch-up in Jupiter's radiation belts." },
          { name: "Deep Space Link Margin", status: "warn", detail: "Incompatible with 1977 DSN microwave architecture." }
        ],
        advantages: ["Concept reflects innovative modern aerospace engineering principles."],
        risks: ["Fatal timeline incompatibility: flight hardware must launch aboard Titan IIIE on August 20 / September 5, 1977."],
        historicalResolution: `In 1972–1977, JPL engineers strictly selected high-reliability parts from NASA's approved military/aerospace component list (MIL-STD-883 class S) to ensure decades-long survival in deep space.`,
        revisionAdvice: `Replace ${detectedAnachronism.name} with authentic 1977 aerospace solutions: beryllium structural alloys, plated-wire magnetic memory, MHW-RTGs, discrete TTL logic, and monopropellant catalytic hydrazine.`
      };
    }

    // 3. Six-Vector Physics Constraints Evaluation
    const massNum = Number(massDeltaKg) || 0;
    const powerNum = Number(powerDeltaWatts) || 0;

    const vectors = [];
    let fatalViolations = [];
    let tradeOffIssues = [];
    let advantages = [];

    // Vector 1: Mass Budget (815 kg total wet mass limit)
    if (massNum > 15 || /add 100 kg|add 200 kg|heavy lead|lead vault|steel airframe/i.test(cleanText)) {
      fatalViolations.push("MASS BUDGET EXCEEDED: The Titan IIIE-Centaur launch vehicle has a hard hyperbolic escape cutoff of 815 kg. Additional mass prevents achieving Jupiter transfer trajectory.");
      vectors.push({ name: "Mass Budget (815 kg limit)", status: "fail", detail: `Proposal adds +${massNum > 0 ? massNum : 50}+ kg, exceeding the strict 815 kg Titan IIIE-Centaur launch cutoff.` });
    } else if (massNum > 0) {
      tradeOffIssues.push(`Proposal consumes ${massNum} kg of structural mass reserve, requiring weight reductions from instrument brackets.`);
      vectors.push({ name: "Mass Budget (815 kg limit)", status: "warn", detail: `Consumes ${massNum} kg of mass margin; requires compensatory lightening of secondary structures.` });
    } else {
      advantages.push("Respects the strict 815 kg total wet mass envelope of the launch vehicle.");
      vectors.push({ name: "Mass Budget (815 kg limit)", status: "pass", detail: "Within the 815 kg total spacecraft wet mass margin." });
    }

    // Vector 2: Electrical Power & Inverse-Square Solar Drop
    const proposesSolar = /\b(solar panel|solar array|photovoltaic|sun power)\b/i.test(cleanText);
    const eliminatesRtg = /\b(eliminate rtg|remove rtg|replace rtg|no nuclear)\b/i.test(cleanText);

    if (proposesSolar || eliminatesRtg) {
      fatalViolations.push("FATAL POWER FLAW (INVERSE-SQUARE LAW): Solar irradiance drops with 1/r². At Jupiter (5.2 AU) solar flux is 1/27th of Earth (50 W/m²); at Saturn (9.5 AU) it is 1/90th (15 W/m²). Generating 400W at Saturn requires over 200 m² of solar panels, weighing over 400 kg.");
      vectors.push({ name: "Power Envelope (470W baseline)", status: "fail", detail: "Solar arrays cannot operate past Jupiter. Outer planet exploration requires radioisotope nuclear power." });
    } else if (powerNum < -100 || /reduce power|shut down transmitters/i.test(cleanText)) {
      tradeOffIssues.push("Severe power reduction will force premature shutdown of science instruments before reaching the heliopause.");
      vectors.push({ name: "Power Envelope (470W baseline)", status: "warn", detail: "Power margin is dangerously low for multi-instrument encounters." });
    } else {
      advantages.push("Maintains MHW-RTG nuclear power delivery (474W at launch, sustained decay to 240W in deep space).");
      vectors.push({ name: "Power Envelope (470W baseline)", status: "pass", detail: "Provides steady ~470W launch power unaffected by astronomical distance from the Sun." });
    }

    // Vector 3: Thermal Vacuum Operating Envelope (-180°C to +100°C)
    if (/unshielded|no louvers|no insulation|remove blanket/i.test(cleanText)) {
      fatalViolations.push("THERMAL FAILURE: In deep-space vacuum without multi-layer insulation and active louvers, fuel lines freeze at -180°C and electronics overheat under RTG nuclear radiation.");
      vectors.push({ name: "Thermal Survival (-180°C to +100°C)", status: "fail", detail: "Hydrazine lines will freeze solid (hydrazine freezing point is +2°C) without RHUs and blankets." });
    } else if (/beryllium|tantalum|mylar|kapton|louvers|heater unit|rhu/i.test(cleanText)) {
      advantages.push("Incorporates multi-layer aluminized Mylar/Kapton thermal blankets and active bimetallic louvers.");
      vectors.push({ name: "Thermal Survival (-180°C to +100°C)", status: "pass", detail: "Thermal louvers and Radioisotope Heater Units (RHUs) keep bays between 0°C and 40°C." });
    } else {
      vectors.push({ name: "Thermal Survival (-180°C to +100°C)", status: "pass", detail: "Assumes standard JPL thermal blanket and louver thermal management envelope." });
    }

    // Vector 4: Jovian Radiation Belts Hardening (>= 100 krad)
    if (/commercial chip|unshielded semiconductor|bypass radiation/i.test(cleanText)) {
      fatalViolations.push("RADIATION BREAKDOWN: Unshielded semiconductors will suffer catastrophic gate rupture in Jupiter's trapped electron/proton radiation belts (1,000x deadlier than anticipated in 1973).");
      vectors.push({ name: "Radiation Tolerance (100 krad)", status: "fail", detail: "Electronics will latch up during closest approach to Io and Jupiter." });
    } else if (/radiation hard|tantalum foil|noise filter|bypass capacitor|shielding/i.test(cleanText)) {
      advantages.push("Applies localized tantalum spot-shielding and radiation-hardened semiconductor circuits.");
      vectors.push({ name: "Radiation Tolerance (100 krad)", status: "pass", detail: "Exceeds 100 krad ionizing dose threshold for the Jovian radiation gauntlet." });
    } else {
      vectors.push({ name: "Radiation Tolerance (100 krad)", status: "pass", detail: "Compatible with JPL Division 33 radiation-hardened parts program." });
    }

    // Vector 5: Propulsion & Delta-V (Catalytic Hydrazine, Isp ~230s)
    if (/ion engine|nuclear thermal rocket|reach saturn directly without gravity/i.test(cleanText)) {
      fatalViolations.push("PROPULSION IMPOSSIBILITY: Achieving hyperbolic escape velocity without Jupiter/Saturn gravitational slingshots is physically impossible with 1977 rocket propulsion.");
      vectors.push({ name: "Propulsion & Delta-V (Isp ~230s)", status: "fail", detail: "Violates the Tsiolkovsky rocket equation for available 104 kg hydrazine fuel mass." });
    } else if (/hydrazine|monopropellant|shell 405|trajectory correction|tcm/i.test(cleanText)) {
      advantages.push("Uses flight-proven catalytic hydrazine decomposition over Shell 405 iridium catalyst beds.");
      vectors.push({ name: "Propulsion & Delta-V (Isp ~230s)", status: "pass", detail: "104 kg hydrazine supply yields ~190 m/s delta-V for precision trajectory correction maneuvers." });
    } else {
      vectors.push({ name: "Propulsion & Delta-V (Isp ~230s)", status: "pass", detail: "Operates within standard 16-thruster catalytic monopropellant hydrazine budget." });
    }

    // Vector 6: Telecommunications & Link Budget (3.7m HGA, S/X-Band, DSN 64m)
    if (/omnidirectional only|small antenna|no dish|vhf/i.test(cleanText)) {
      fatalViolations.push("COMMUNICATION LINK LOSS: Transmitting high-rate planetary imaging over billions of kilometers requires a large high-gain parabolic reflector; omni antennas fade into cosmic noise past 2 AU.");
      vectors.push({ name: "Deep Space Link Margin", status: "fail", detail: "Signal loss exceeds DSN 64-meter receiver threshold at Jupiter distance." });
    } else if (/x-band|cassegrain|3.7-meter|parabolic dish|dsn 64-meter|high-gain/i.test(cleanText)) {
      advantages.push("Utilizes high-efficiency 3.7-meter graphite-epoxy Cassegrain antenna with dual S/X-band downlinks.");
      vectors.push({ name: "Deep Space Link Margin", status: "pass", detail: "Maintains 115.2 kbps at Jupiter and telemetry link out past 24 billion kilometers." });
    } else {
      vectors.push({ name: "Deep Space Link Margin", status: "pass", detail: "Relies on standard 3.7m parabolic High-Gain Antenna microwave link to NASA DSN." });
    }

    // Determine Final Verdict
    if (fatalViolations.length > 0) {
      return {
        verdict: PROPOSAL_VERDICTS.UNSUITABLE,
        badgeColor: "#ef4444",
        summary: `PROPOSAL REJECTED: Violates ${fatalViolations.length} critical physical/engineering constraints of the Voyager 1 mission.`,
        vectors,
        advantages: advantages.length > 0 ? advantages : ["Identifies a bold theoretical design exploration."],
        risks: fatalViolations,
        historicalResolution: "In 1974–1977, JPL systems engineering under John Casani enforced zero tolerance for design options that compromised the 815 kg mass limit, nuclear RTG power, or radiation hardening.",
        revisionAdvice: `Address the identified physical bottlenecks: ${fatalViolations[0]} Re-balance your proposal to fit the 1977 Titan IIIE-Centaur and Jovian radiation environment.`
      };
    }

    if (tradeOffIssues.length > 0) {
      return {
        verdict: PROPOSAL_VERDICTS.CONDITIONALLY_FEASIBLE,
        badgeColor: "#f59e0b",
        summary: "PROPOSAL CONDITIONALLY FEASIBLE: Solvable within 1977 technology, but introduces notable operational trade-offs and risks.",
        vectors,
        advantages,
        risks: tradeOffIssues,
        historicalResolution: "JPL frequently reviewed borderline proposals during Critical Design Reviews (CDR), requiring trade-off studies before approval.",
        revisionAdvice: "Mitigate the identified trade-offs by showing how mass or power reserves can be recovered elsewhere in the spacecraft structure."
      };
    }

    return {
      verdict: PROPOSAL_VERDICTS.FEASIBLE,
      badgeColor: "#10b981",
      summary: "PROPOSAL APPROVED: Historically plausible, technically sound, and fully compliant with 1977 Voyager 1 physics and engineering constraints.",
      vectors,
      advantages,
      risks: ["Requires precision thermal and vibration testing in JPL SAF Bldg 179 before flight certification."],
      historicalResolution: "This proposal aligns closely with the actual architectural choices made by the JPL Mariner Jupiter/Saturn project team in 1974–1977.",
      revisionAdvice: "Your proposal is flight-ready! You can further refine it by experimenting with different subsystem balances or submitting another proposal."
    };
  }

  /**
   * WP-12: Generate SVG Trajectory & Physics Comparison Chart
   * for each of the 4 historical engineering dilemmas.
   *
   * @param {string} decisionId
   * @param {string|null} selectedChoiceId
   * @returns {string} SVG HTML markup
   */
  static generateDilemmaChartSvg(decisionId, selectedChoiceId = null) {
    const w = 560;
    const h = 180;
    const padL = 50;
    const padR = 25;
    const padT = 24;
    const padB = 32;
    const pW = w - padL - padR;
    const pH = h - padT - padB;

    if (decisionId === 'dec-mass-power') {
      // Trade-Off 01: Power (Watts) vs Mission Elapsed Time / Milestones
      // Choice A: 2 RTGs (315W -> 180W at Saturn 1980)
      // Choice B (Historical): 3 RTGs (474W -> 450W Saturn -> 270W 2012 -> 220W 2026)
      // Choice C: Solar Panels (collapses to 0W past Jupiter)
      const pathB = `M ${padL} ${padT + pH * (1 - 474/500)} Q ${padL + pW*0.25} ${padT + pH * (1 - 450/500)}, ${padL + pW*0.5} ${padT + pH * (1 - 380/500)} T ${padL + pW} ${padT + pH * (1 - 220/500)}`;
      const pathA = `M ${padL} ${padT + pH * (1 - 315/500)} Q ${padL + pW*0.15} ${padT + pH * (1 - 290/500)}, ${padL + pW*0.25} ${padT + pH * (1 - 180/500)} L ${padL + pW*0.35} ${padT + pH}`;
      const pathC = `M ${padL} ${padT + pH * (1 - 400/500)} C ${padL + pW*0.05} ${padT + pH * (1 - 250/500)}, ${padL + pW*0.1} ${padT + pH * (1 - 50/500)}, ${padL + pW*0.2} ${padT + pH}`;
      const y200W = padT + pH * (1 - 200/500);

      const isA = selectedChoiceId === 'choice-a';
      const isB = selectedChoiceId === 'choice-b';
      const isC = selectedChoiceId === 'choice-c';

      return `
        <div class="dilemma-chart-wrapper" style="background: rgba(4, 7, 14, 0.95); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 4px; padding: 0.85rem; margin: 1rem 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; font-family: var(--font-mono); font-size: 0.72rem;">
            <span style="color: #fbbf24; font-weight: 700;">TRAJECTORY POWER DEGRADATION MODEL // ELECTRICAL OUTPUT (W) VS TIME</span>
            <span style="color: #94a3b8;">1977 LAUNCH &rarr; 2026 INTERSTELLAR</span>
          </div>
          <svg viewBox="0 0 ${w} ${h}" style="width: 100%; height: auto; display: block;" aria-label="Power vs Time Chart">
            <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + pH}" stroke="rgba(255,255,255,0.2)" />
            <line x1="${padL}" y1="${padT + pH}" x2="${w - padR}" y2="${padT + pH}" stroke="rgba(255,255,255,0.2)" />
            
            <!-- 200W Critical Threshold Line -->
            <line x1="${padL}" y1="${y200W}" x2="${w - padR}" y2="${y200W}" stroke="#ef4444" stroke-dasharray="4,4" stroke-width="1.2" opacity="0.8" />
            <text x="${w - padR - 5}" y="${y200W - 4}" fill="#ef4444" font-size="8" font-family="monospace" text-anchor="end">200W Transmitter Threshold</text>

            <!-- Ticks & Grid -->
            <text x="${padL - 6}" y="${padT + 4}" fill="#94a3b8" font-size="8.5" font-family="monospace" text-anchor="end">500W</text>
            <text x="${padL - 6}" y="${y200W + 3}" fill="#ef4444" font-size="8.5" font-family="monospace" text-anchor="end">200W</text>
            <text x="${padL - 6}" y="${padT + pH}" fill="#94a3b8" font-size="8.5" font-family="monospace" text-anchor="end">0W</text>

            <text x="${padL}" y="${h - 8}" fill="#94a3b8" font-size="8.5" font-family="monospace">1977 (Launch)</text>
            <text x="${padL + pW*0.2}" y="${h - 8}" fill="#94a3b8" font-size="8.5" font-family="monospace">1979 (Jup)</text>
            <text x="${padL + pW*0.35}" y="${h - 8}" fill="#94a3b8" font-size="8.5" font-family="monospace">1980 (Sat)</text>
            <text x="${padL + pW*0.75}" y="${h - 8}" fill="#94a3b8" font-size="8.5" font-family="monospace">2012 (Heliopause)</text>
            <text x="${w - padR}" y="${h - 8}" fill="#94a3b8" font-size="8.5" font-family="monospace" text-anchor="end">2026+</text>

            <!-- Curves -->
            <path d="${pathA}" fill="none" stroke="#f87171" stroke-width="${isA ? 3 : 1.8}" stroke-dasharray="3,3" opacity="${isA || !selectedChoiceId ? 1 : 0.4}" />
            <path d="${pathC}" fill="none" stroke="#fb923c" stroke-width="${isC ? 3 : 1.8}" stroke-dasharray="2,2" opacity="${isC || !selectedChoiceId ? 1 : 0.4}" />
            <path d="${pathB}" fill="none" stroke="#10b981" stroke-width="${isB ? 3.5 : 2.5}" opacity="${isB || !selectedChoiceId ? 1 : 0.5}" />

            <!-- End Dots -->
            <circle cx="${padL + pW}" cy="${padT + pH * (1 - 220/500)}" r="${isB ? 5 : 3.5}" fill="#10b981" />
            <circle cx="${padL + pW*0.35}" cy="${padT + pH}" r="${isA ? 5 : 3.5}" fill="#f87171" />
            <circle cx="${padL + pW*0.2}" cy="${padT + pH}" r="${isC ? 5 : 3.5}" fill="#fb923c" />
          </svg>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 0.5rem; font-family: var(--font-mono); font-size: 0.7rem;">
            <span style="color: #10b981; font-weight: ${isB ? 700 : 400};">&#x25AC; Choice B [Historical 3 RTGs: 474W &rarr; Interstellar Cruise]</span>
            <span style="color: #f87171; font-weight: ${isA ? 700 : 400};">&#x2504; Choice A [2 RTGs: Depleted at Saturn 1980]</span>
            <span style="color: #fb923c; font-weight: ${isC ? 700 : 400};">&#x2508; Choice C [Solar: Collapses past Mars]</span>
          </div>
        </div>
      `;
    }

    if (decisionId === 'dec-radiation-hardening') {
      // Trade-Off 02: Jovian Radiation Gauntlet & Trajectory Boost
      // Choice A: Wide Bypass (Misses Saturn assist)
      // Choice B: 200kg Lead (Overweight stack stalls in Earth parking orbit)
      // Choice C (Historical): 348,000 km close gravity assist (+15.7 km/s to Saturn)
      const isA = selectedChoiceId === 'choice-a';
      const isB = selectedChoiceId === 'choice-b';
      const isC = selectedChoiceId === 'choice-c';

      // Jupiter at (x: 220, y: 90)
      const jx = 220;
      const jy = 90;

      return `
        <div class="dilemma-chart-wrapper" style="background: rgba(4, 7, 14, 0.95); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 4px; padding: 0.85rem; margin: 1rem 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; font-family: var(--font-mono); font-size: 0.72rem;">
            <span style="color: #fbbf24; font-weight: 700;">ORBITAL SLINGSHOT TRAJECTORY // JUPITER GRAVITY ASSIST VECTOR</span>
            <span style="color: #94a3b8;">HISTORICAL SIMULATION</span>
          </div>
          <svg viewBox="0 0 ${w} ${h}" style="width: 100%; height: auto; display: block;" aria-label="Orbital Slingshot Diagram">
            <!-- Background Radiation Belt Hazard Zone -->
            <ellipse cx="${jx}" cy="${jy}" rx="70" ry="45" fill="rgba(239, 68, 68, 0.12)" stroke="rgba(239, 68, 68, 0.3)" stroke-dasharray="2,2" />
            <text x="${jx}" y="${jy - 50}" fill="#ef4444" font-size="7.5" font-family="monospace" text-anchor="middle">Jovian Intense Radiation Belts (1000x lethal flux)</text>

            <!-- Jupiter Planet Disc -->
            <circle cx="${jx}" cy="${jy}" r="18" fill="#d97706" />
            <circle cx="${jx}" cy="${jy}" r="18" fill="none" stroke="#fbbf24" stroke-width="1" />
            <text x="${jx}" y="${jy + 4}" fill="#020409" font-size="8" font-family="monospace" font-weight="bold" text-anchor="middle">JUPITER</text>

            <!-- Earth Origin -->
            <circle cx="${padL + 20}" cy="${jy + 35}" r="8" fill="#38bdf8" />
            <text x="${padL + 20}" y="${jy + 55}" fill="#38bdf8" font-size="8" font-family="monospace" text-anchor="middle">Earth (1977)</text>

            <!-- Choice B: Stalled at Earth -->
            <ellipse cx="${padL + 20}" cy="${jy + 35}" rx="16" ry="12" fill="none" stroke="#f87171" stroke-dasharray="2,2" stroke-width="${isB ? 2.5 : 1.2}" opacity="${isB || !selectedChoiceId ? 1 : 0.3}" />
            <text x="${padL + 20}" y="${jy + 16}" fill="#f87171" font-size="7" font-family="monospace" text-anchor="middle">Choice B: 200kg Lead (LEO stall)</text>

            <!-- Choice A: Wide Bypass (Misses Saturn slingshot) -->
            <path d="M ${padL + 30} ${jy + 30} C ${padL + 120} ${jy + 10}, ${jx} ${jy - 75}, ${w - padR} ${jy - 80}" fill="none" stroke="#f87171" stroke-width="${isA ? 3 : 1.5}" stroke-dasharray="4,4" opacity="${isA || !selectedChoiceId ? 1 : 0.4}" />
            <text x="${w - padR - 5}" y="${jy - 68}" fill="#f87171" font-size="8" font-family="monospace" text-anchor="end">Choice A: Wide Bypass (Misses Saturn Transfer)</text>

            <!-- Choice C (Historical): Close Slingshot -->
            <path d="M ${padL + 30} ${jy + 30} C ${padL + 130} ${jy + 30}, ${jx - 25} ${jy + 30}, ${jx} ${jy + 22} C ${jx + 25} ${jy + 14}, ${jx + 60} ${jy - 30}, ${w - padR} ${jy - 10}" fill="none" stroke="#10b981" stroke-width="${isC ? 3.5 : 2.5}" opacity="${isC || !selectedChoiceId ? 1 : 0.5}" />
            <text x="${w - padR - 5}" y="${jy - 16}" fill="#10b981" font-size="8.5" font-family="monospace" font-weight="bold" text-anchor="end">&check; Choice C: Slingshot Hyperbolic Arc &rarr; Saturn (Nov 1980)</text>
          </svg>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 0.5rem; font-family: var(--font-mono); font-size: 0.7rem;">
            <span style="color: #10b981; font-weight: ${isC ? 700 : 400};">&#x25AC; Choice C [Historical: Hybrid rad-hard chips + 348,000 km assist]</span>
            <span style="color: #f87171; font-weight: ${isA ? 700 : 400};">&#x2504; Choice A [Wide 2M km bypass: fails gravity assist]</span>
            <span style="color: #f87171; font-weight: ${isB ? 700 : 400};">&#x2508; Choice B [200kg lead: exceeds launch rocket capacity]</span>
          </div>
        </div>
      `;
    }

    if (decisionId === 'dec-telecom-band') {
      // Trade-Off 03: Telemetry Downlink Frequency Architecture (kbps vs Distance)
      // Choice A: S-band only (1 kbps Jup, 40 bps Sat)
      // Choice B (Historical): Dual S/X-band (115.2 kbps Jup, 44.8 kbps Sat, 160 bps interstellar)
      // Choice C: Laser comms (0 bps)
      const isA = selectedChoiceId === 'choice-a';
      const isB = selectedChoiceId === 'choice-b';
      const isC = selectedChoiceId === 'choice-c';

      // Y-scale: 10 bps to 150,000 bps log scale
      const y115k = padT + pH * (1 - Math.log10(115200/10) / Math.log10(150000/10));
      const y44k = padT + pH * (1 - Math.log10(44800/10) / Math.log10(150000/10));
      const y1k = padT + pH * (1 - Math.log10(1024/10) / Math.log10(150000/10));
      const y160 = padT + pH * (1 - Math.log10(160/10) / Math.log10(150000/10));

      const pathB = `M ${padL} ${padT} L ${padL + pW*0.2} ${y115k} L ${padL + pW*0.35} ${y44k} L ${padL + pW} ${y160}`;
      const pathA = `M ${padL} ${padT + pH * 0.4} L ${padL + pW*0.2} ${y1k} L ${padL + pW*0.35} ${padT + pH * 0.85} L ${padL + pW*0.5} ${padT + pH}`;

      return `
        <div class="dilemma-chart-wrapper" style="background: rgba(4, 7, 14, 0.95); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 4px; padding: 0.85rem; margin: 1rem 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; font-family: var(--font-mono); font-size: 0.72rem;">
            <span style="color: #fbbf24; font-weight: 700;">TELEMETRY BITRATE ARCHITECTURE // DOWNLINK BANDWIDTH VS DISTANCE</span>
            <span style="color: #94a3b8;">S-BAND (2.3 GHz) VS X-BAND (8.4 GHz)</span>
          </div>
          <svg viewBox="0 0 ${w} ${h}" style="width: 100%; height: auto; display: block;" aria-label="Telecom Downlink Chart">
            <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + pH}" stroke="rgba(255,255,255,0.2)" />
            <line x1="${padL}" y1="${padT + pH}" x2="${w - padR}" y2="${padT + pH}" stroke="rgba(255,255,255,0.2)" />

            <!-- Y Axis Labels -->
            <text x="${padL - 6}" y="${padT + 4}" fill="#94a3b8" font-size="8.5" font-family="monospace" text-anchor="end">150 kbps</text>
            <text x="${padL - 6}" y="${y1k + 3}" fill="#94a3b8" font-size="8.5" font-family="monospace" text-anchor="end">1 kbps</text>
            <text x="${padL - 6}" y="${padT + pH}" fill="#94a3b8" font-size="8.5" font-family="monospace" text-anchor="end">10 bps</text>

            <!-- X Axis Labels -->
            <text x="${padL}" y="${h - 8}" fill="#94a3b8" font-size="8.5" font-family="monospace">1 AU (Launch)</text>
            <text x="${padL + pW*0.2}" y="${h - 8}" fill="#94a3b8" font-size="8.5" font-family="monospace">5.2 AU (Jup)</text>
            <text x="${padL + pW*0.35}" y="${h - 8}" fill="#94a3b8" font-size="8.5" font-family="monospace">9.5 AU (Sat)</text>
            <text x="${w - padR}" y="${h - 8}" fill="#94a3b8" font-size="8.5" font-family="monospace" text-anchor="end">165 AU (Interstellar)</text>

            <!-- Paths -->
            <path d="${pathA}" fill="none" stroke="#f87171" stroke-width="${isA ? 3 : 1.8}" stroke-dasharray="3,3" opacity="${isA || !selectedChoiceId ? 1 : 0.4}" />
            <path d="${pathB}" fill="none" stroke="#10b981" stroke-width="${isB ? 3.5 : 2.5}" opacity="${isB || !selectedChoiceId ? 1 : 0.5}" />

            <!-- Choice C line at 0 -->
            <line x1="${padL}" y1="${padT + pH}" x2="${w - padR}" y2="${padT + pH}" stroke="#fb923c" stroke-width="${isC ? 3 : 1.5}" stroke-dasharray="2,2" opacity="${isC || !selectedChoiceId ? 1 : 0.4}" />

            <!-- High-resolution Vidicon photo marker -->
            <circle cx="${padL + pW*0.2}" cy="${y115k}" r="${isB ? 5 : 3.5}" fill="#10b981" />
            <text x="${padL + pW*0.2 + 8}" y="${y115k + 3}" fill="#10b981" font-size="8" font-family="monospace">115.2 kbps (Real-Time TV Frames)</text>

            <circle cx="${padL + pW*0.2}" cy="${y1k}" r="${isA ? 5 : 3.5}" fill="#f87171" />
            <text x="${padL + pW*0.2 + 8}" y="${y1k + 3}" fill="#f87171" font-size="8" font-family="monospace">1.0 kbps (1 hr/picture bottleneck)</text>
          </svg>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 0.5rem; font-family: var(--font-mono); font-size: 0.7rem;">
            <span style="color: #10b981; font-weight: ${isB ? 700 : 400};">&#x25AC; Choice B [Historical Dual S/X-Band: 115.2 kbps &bull; 67,000 photos]</span>
            <span style="color: #f87171; font-weight: ${isA ? 700 : 400};">&#x2504; Choice A [S-Band Only: Severe 1 kbps bottleneck]</span>
            <span style="color: #fb923c; font-weight: ${isC ? 700 : 400};">&#x2508; Choice C [Laser: Infeasible in 1977]</span>
          </div>
        </div>
      `;
    }

    if (decisionId === 'dec-attitude-control') {
      // Trade-Off 04: Attitude Reference: Star Tracker vs Gyroscopes
      // Choice A: Gyros only (drift 0.05°/hr -> breaks 0.5° 3dB limit in 10h)
      // Choice B (Historical): Canopus Star Tracker + Sun Sensor (bounded within ±0.05° indefinitely)
      // Choice C: Spin-stabilization (constant scan wobble)
      const isA = selectedChoiceId === 'choice-a';
      const isB = selectedChoiceId === 'choice-b';
      const isC = selectedChoiceId === 'choice-c';

      const yLimit = padT + pH * (1 - 0.5 / 1.0);
      const pathA = `M ${padL} ${padT + pH} L ${padL + pW*0.21} ${yLimit} L ${padL + pW*0.42} ${padT}`;
      
      // Bounded limit cycle around 0.05°
      let pathB = `M ${padL} ${padT + pH * 0.95}`;
      for (let i = 1; i <= 20; i++) {
        const x = padL + (i / 20) * pW;
        const y = padT + pH * 0.95 + (i % 2 === 0 ? -4 : 4);
        pathB += ` L ${x} ${y}`;
      }

      return `
        <div class="dilemma-chart-wrapper" style="background: rgba(4, 7, 14, 0.95); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 4px; padding: 0.85rem; margin: 1rem 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; font-family: var(--font-mono); font-size: 0.72rem;">
            <span style="color: #fbbf24; font-weight: 700;">ANTENNA CELESTIAL POINTING STABILITY // DRIFT ANGLE (DEG) VS TIME</span>
            <span style="color: #94a3b8;">EARTH MICROWAVE LOCK RETENTION</span>
          </div>
          <svg viewBox="0 0 ${w} ${h}" style="width: 100%; height: auto; display: block;" aria-label="Attitude Drift Chart">
            <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + pH}" stroke="rgba(255,255,255,0.2)" />
            <line x1="${padL}" y1="${padT + pH}" x2="${w - padR}" y2="${padT + pH}" stroke="rgba(255,255,255,0.2)" />

            <!-- 0.5° 3dB Beamwidth Limit -->
            <line x1="${padL}" y1="${yLimit}" x2="${w - padR}" y2="${yLimit}" stroke="#ef4444" stroke-dasharray="4,4" stroke-width="1.2" />
            <text x="${w - padR - 5}" y="${yLimit - 4}" fill="#ef4444" font-size="8" font-family="monospace" text-anchor="end">0.5&deg; Antenna 3dB Beamwidth Limit</text>

            <!-- Ticks -->
            <text x="${padL - 6}" y="${padT + 4}" fill="#94a3b8" font-size="8.5" font-family="monospace" text-anchor="end">1.0&deg;</text>
            <text x="${padL - 6}" y="${yLimit + 3}" fill="#ef4444" font-size="8.5" font-family="monospace" text-anchor="end">0.5&deg;</text>
            <text x="${padL - 6}" y="${padT + pH}" fill="#94a3b8" font-size="8.5" font-family="monospace" text-anchor="end">0.0&deg;</text>

            <text x="${padL}" y="${h - 8}" fill="#94a3b8" font-size="8.5" font-family="monospace">0h</text>
            <text x="${padL + pW*0.21}" y="${h - 8}" fill="#ef4444" font-size="8.5" font-family="monospace">10h (Loss of Lock)</text>
            <text x="${padL + pW*0.5}" y="${h - 8}" fill="#94a3b8" font-size="8.5" font-family="monospace">24h</text>
            <text x="${w - padR}" y="${h - 8}" fill="#94a3b8" font-size="8.5" font-family="monospace" text-anchor="end">48h+</text>

            <!-- Curves -->
            <path d="${pathA}" fill="none" stroke="#f87171" stroke-width="${isA ? 3 : 1.8}" stroke-dasharray="3,3" opacity="${isA || !selectedChoiceId ? 1 : 0.4}" />
            <path d="${pathB}" fill="none" stroke="#10b981" stroke-width="${isB ? 3.5 : 2.5}" opacity="${isB || !selectedChoiceId ? 1 : 0.5}" />

            <!-- Points -->
            <circle cx="${padL + pW*0.21}" cy="${yLimit}" r="${isA ? 5 : 3.5}" fill="#f87171" />
            <circle cx="${w - padR}" cy="${padT + pH * 0.95}" r="${isB ? 5 : 3.5}" fill="#10b981" />
          </svg>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 0.5rem; font-family: var(--font-mono); font-size: 0.7rem;">
            <span style="color: #10b981; font-weight: ${isB ? 700 : 400};">&#x25AC; Choice B [Historical: Canopus Star Tracker + Sun Sensor &bull; Unbroken lock]</span>
            <span style="color: #f87171; font-weight: ${isA ? 700 : 400};">&#x2504; Choice A [Gyros Only: Drifts off Earth lock in 10 hours]</span>
            <span style="color: #fb923c; font-weight: ${isC ? 700 : 400};">&#x2508; Choice C [Spin-stabilization: Blurs Vidicon cameras]</span>
          </div>
        </div>
      `;
    }

    return '';
  }
}
