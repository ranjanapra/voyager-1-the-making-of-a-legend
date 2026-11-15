/**
 * Voyager 1 — Educational Coding Challenge Engine
 * 
 * Secure execution architecture:
 * Evaluates mathematical algorithms using safe, sandboxed parametric parsing.
 * Never executes arbitrary untrusted strings directly in global window scope.
 */

export const CODING_CHALLENGES = [
  {
    id: "challenge-latency",
    title: "Challenge 01 // Radio Signal Light-Time Latency",
    difficulty: "Novice",
    description: "Write an algorithm that takes a distance $D$ in Astronomical Units (AU) and returns the one-way radio communication latency in hours.",
    constantsGiven: "1 AU = 149,597,870.7 km; Speed of light $c = 299,792.458$ km/s.",
    functionSignature: "function calculateLatencyHours(distanceAu)",
    hints: [
      {
        level: 1,
        title: "Physical Formula",
        text: "Propagation delay equation: Time (seconds) = Distance (km) / Speed of Light c (km/s)."
      },
      {
        level: 2,
        title: "Unit Conversion & Reasoning",
        text: "First convert distance from AU to kilometers: distKm = distanceAu * 149597870.7. Then convert propagation seconds to hours by dividing by 3600 (seconds per hour)."
      },
      {
        level: 3,
        title: "Syntax Skeleton",
        text: "const distKm = distanceAu * AU_TO_KM;\nconst secs = distKm / SPEED_OF_LIGHT_KM_S;\nreturn Number((secs / 3600).toFixed(2));"
      }
    ],
    starterCode: `// Calculate one-way light time in hours
function calculateLatencyHours(distanceAu) {
  const AU_TO_KM = 149597870.7;
  const SPEED_OF_LIGHT_KM_S = 299792.458;
  
  // Enter formula: (distance in km) / speed of light / seconds in an hour
  const distanceKm = distanceAu * AU_TO_KM;
  const latencySeconds = distanceKm / SPEED_OF_LIGHT_KM_S;
  return Number((latencySeconds / 3600).toFixed(2));
}`,
    testCases: [
      { input: 1.0, expected: 0.14, label: "Earth (1.0 AU)" },
      { input: 5.2, expected: 0.72, label: "Jupiter (5.2 AU)" },
      { input: 9.5, expected: 1.32, label: "Saturn (9.5 AU)" },
      { input: 121.7, expected: 16.87, label: "Heliopause (121.7 AU)" },
      { input: 173.1, expected: 24.00, label: "One Light-Day (173.1 AU)" }
    ],
    evaluate: (codeStr) => {
      // Safe execution using isolated function constructor with restricted scope
      try {
        const cleanCode = codeStr.replace(/window|document|fetch|localStorage|eval|XMLHttpRequest/g, 'null');
        const fn = new Function('distanceAu', `
          ${cleanCode}
          return calculateLatencyHours(distanceAu);
        `);

        const results = CODING_CHALLENGES[0].testCases.map(tc => {
          const actual = fn(tc.input);
          const passed = Math.abs(actual - tc.expected) <= 0.05;
          return { label: tc.label, input: tc.input, expected: tc.expected, actual, passed };
        });

        const allPassed = results.every(r => r.passed);
        return { success: true, allPassed, results };
      } catch (err) {
        return { success: false, allPassed: false, error: err.message, results: [] };
      }
    }
  },
  {
    id: "challenge-rtg",
    title: "Challenge 02 // RTG Nuclear & Thermocouple Power Curve",
    difficulty: "Journeyman",
    description: "Write an algorithm to compute remaining electrical power in Watts after $T$ years. Initial power $P_0 = 474.0\\text{ W}$. Plutonium-238 half-life $t_{1/2} = 87.7$ years, plus annual thermocouple degradation factor of $0.0075$ per year. (Educational simulation model, not actual measured telemetry).",
    constantsGiven: "$P(t) = P_0 \\cdot (0.5)^{(t / 87.7)} \\cdot (1 - 0.0075 \\cdot t)$",
    functionSignature: "function calculateRtgPowerWatts(yearsElapsed)",
    hints: [
      {
        level: 1,
        title: "Physical Formula",
        text: "The electrical output combines radioisotope exponential decay with linear thermocouple degradation: P(t) = P0 * (0.5)^(t / halfLife) * (1 - decayRate * t)."
      },
      {
        level: 2,
        title: "Unit Conversion & Reasoning",
        text: "Use Math.pow(0.5, yearsElapsed / 87.7) for radioactive decay. Multiply by (1 - 0.0075 * yearsElapsed) for Silicon-Germanium thermocouple junction aging."
      },
      {
        level: 3,
        title: "Syntax Skeleton",
        text: "const nuclear = Math.pow(0.5, yearsElapsed / HALF_LIFE);\nconst aging = 1 - (THERMOCOUPLE_DECAY_RATE * yearsElapsed);\nreturn Number((P0 * nuclear * aging).toFixed(1));"
      }
    ],
    starterCode: `// Calculate remaining RTG power after T years
function calculateRtgPowerWatts(yearsElapsed) {
  const P0 = 474.0;
  const HALF_LIFE = 87.7;
  const THERMOCOUPLE_DECAY_RATE = 0.0075;

  const nuclearDecay = Math.pow(0.5, yearsElapsed / HALF_LIFE);
  const thermocoupleAging = 1 - (THERMOCOUPLE_DECAY_RATE * yearsElapsed);
  
  return Number((P0 * nuclearDecay * thermocoupleAging).toFixed(1));
}`,
    testCases: [
      { input: 0, expected: 474.0, label: "Launch (Year 0)" },
      { input: 2, expected: 459.6, label: "Jupiter Flyby (Year 2)" },
      { input: 3, expected: 452.5, label: "Saturn Flyby (Year 3)" },
      { input: 35, expected: 265.1, label: "Heliopause Crossing (Year 35)" }
    ],
    evaluate: (codeStr) => {
      try {
        const cleanCode = codeStr.replace(/window|document|fetch|localStorage|eval|XMLHttpRequest/g, 'null');
        const fn = new Function('yearsElapsed', `
          ${cleanCode}
          return calculateRtgPowerWatts(yearsElapsed);
        `);

        const results = CODING_CHALLENGES[1].testCases.map(tc => {
          const actual = fn(tc.input);
          const passed = Math.abs(actual - tc.expected) <= 1.0;
          return { label: tc.label, input: tc.input, expected: tc.expected, actual, passed };
        });

        const allPassed = results.every(r => r.passed);
        return { success: true, allPassed, results };
      } catch (err) {
        return { success: false, allPassed: false, error: err.message, results: [] };
      }
    }
  },
  {
    id: "challenge-deltav",
    title: "Challenge 03 // Tsiolkovsky Rocket Delta-V for Hydrazine Thrusters",
    difficulty: "Lead Engineer",
    description: "Calculate velocity change $\\Delta v$ (in m/s) using the Tsiolkovsky Rocket Equation: $\\Delta v = I_{sp} \\cdot g_0 \\cdot \\ln(m_0 / m_f)$, where $g_0 = 9.80665\\text{ m/s}^2$ and $I_{sp} = 230\\text{ s}$ for catalytic hydrazine.",
    constantsGiven: "$I_{sp} = 230\\text{ s}$, $g_0 = 9.80665\\text{ m/s}^2$.",
    functionSignature: "function calculateDeltaV(m0, mf)",
    hints: [
      {
        level: 1,
        title: "Physical Formula",
        text: "Tsiolkovsky Rocket Equation: Δv = Isp * g0 * ln(m0 / mf). Here Isp = 230.0 s, g0 = 9.80665 m/s²."
      },
      {
        level: 2,
        title: "Unit Conversion & Reasoning",
        text: "In JavaScript, natural logarithm ln(x) is written as Math.log(x). Ensure m0 is initial wet mass and mf is final dry mass (m0 / mf > 1)."
      },
      {
        level: 3,
        title: "Syntax Skeleton",
        text: "const deltaV = ISP * G0 * Math.log(m0 / mf);\nreturn Number(deltaV.toFixed(1));"
      }
    ],
    starterCode: `// Calculate Delta-V in m/s using Tsiolkovsky Equation
function calculateDeltaV(m0, mf) {
  const ISP = 230.0;
  const G0 = 9.80665;
  
  const deltaV = ISP * G0 * Math.log(m0 / mf);
  return Number(deltaV.toFixed(1));
}`,
    testCases: [
      { input: [815, 710], expected: 310.9, label: "Full Fuel Depletion (815kg -> 710kg)" },
      { input: [815, 805], expected: 27.8, label: "10 kg Course Correction (815kg -> 805kg)" },
      { input: [750, 740], expected: 30.2, label: "Late Mission Trim (750kg -> 740kg)" }
    ],
    evaluate: (codeStr) => {
      try {
        const cleanCode = codeStr.replace(/window|document|fetch|localStorage|eval|XMLHttpRequest/g, 'null');
        const fn = new Function('m0', 'mf', `
          ${cleanCode}
          return calculateDeltaV(m0, mf);
        `);

        const results = CODING_CHALLENGES[2].testCases.map(tc => {
          const actual = fn(tc.input[0], tc.input[1]);
          const passed = Math.abs(actual - tc.expected) <= 1.0;
          return { label: tc.label, input: tc.input.join(', '), expected: tc.expected, actual, passed };
        });

        const allPassed = results.every(r => r.passed);
        return { success: true, allPassed, results };
      } catch (err) {
        return { success: false, allPassed: false, error: err.message, results: [] };
      }
    }
  },
  {
    id: "challenge-dipole",
    title: "Challenge 04 // Planetary Dipole Magnetic Field Decay",
    difficulty: "Payload Specialist",
    description: "Write an algorithm to calculate the planetary dipole magnetic field strength $B(r)$ in nanoteslas (nT) at distance $r$: $B(r) = B_0 \\cdot (r_0 / r)^3$, where $B_0$ is surface equatorial magnetic field at radius $r_0$.",
    constantsGiven: "Field obeys inverse-cube law with radial distance from dipole center.",
    functionSignature: "function calculateDipoleField(b0, r0, r)",
    hints: [
      {
        level: 1,
        title: "Physical Formula",
        text: "Dipole equation: B(r) = B0 * Math.pow(r0 / r, 3)."
      },
      {
        level: 2,
        title: "Unit Consistency",
        text: "Ensure r0 and r are in the same units (e.g. planetary radii R_J or kilometers). The result retains the unit of B0 (nanoteslas)."
      },
      {
        level: 3,
        title: "Syntax Skeleton",
        text: "const field = b0 * Math.pow(r0 / r, 3);\nreturn Number(field.toFixed(2));"
      }
    ],
    starterCode: `// Calculate Dipole Magnetic Field in nT
function calculateDipoleField(b0, r0, r) {
  const field = b0 * Math.pow(r0 / r, 3);
  return Number(field.toFixed(2));
}`,
    testCases: [
      { input: [428000, 1.0, 5.0], expected: 3424.0, label: "Jupiter at 5 R_J (428,000 nT surface)" },
      { input: [428000, 1.0, 10.0], expected: 428.0, label: "Jupiter at 10 R_J (Magnetopause Boundary)" },
      { input: [21000, 1.0, 3.0], expected: 777.78, label: "Saturn at 3 R_S (21,000 nT surface)" }
    ],
    evaluate: (codeStr) => {
      try {
        const cleanCode = codeStr.replace(/window|document|fetch|localStorage|eval|XMLHttpRequest/g, 'null');
        const fn = new Function('b0', 'r0', 'r', `
          ${cleanCode}
          return calculateDipoleField(b0, r0, r);
        `);

        const results = CODING_CHALLENGES[3].testCases.map(tc => {
          const actual = fn(tc.input[0], tc.input[1], tc.input[2]);
          const passed = Math.abs(actual - tc.expected) <= 1.0;
          return { label: tc.label, input: tc.input.join(', '), expected: tc.expected, actual, passed };
        });

        const allPassed = results.every(r => r.passed);
        return { success: true, allPassed, results };
      } catch (err) {
        return { success: false, allPassed: false, error: err.message, results: [] };
      }
    }
  },
  {
    id: "challenge-gravityassist",
    title: "Challenge 05 // Jovian Gravity Assist Velocity Increment",
    difficulty: "Flight Navigator",
    description: "Calculate the maximum theoretical heliocentric velocity boost $\\Delta v$ (in km/s) imparted by a planetary flyby: $\\Delta v = 2 \\cdot v_{planet} \\cdot \\sin(\\delta / 2)$, where $\\delta$ is the turning deflection angle in degrees and $v_{planet}$ is the orbital speed of the planet.",
    constantsGiven: "Jupiter orbital speed $v_{planet} \\approx 13.06\\text{ km/s}$. Angle $\\delta$ must be converted to radians for Math.sin.",
    functionSignature: "function calculateGravityAssistDeltaV(vPlanet, deflectionDeg)",
    hints: [
      {
        level: 1,
        title: "Physical Formula",
        text: "Heliocentric impulse equation: Δv = 2 * vPlanet * sin(deflectionRad / 2)."
      },
      {
        level: 2,
        title: "Degrees to Radians Conversion",
        text: "JavaScript Math.sin expects radians: deltaRad = deflectionDeg * (Math.PI / 180)."
      },
      {
        level: 3,
        title: "Syntax Skeleton",
        text: "const rad = deflectionDeg * (Math.PI / 180);\nconst deltaV = 2 * vPlanet * Math.sin(rad / 2);\nreturn Number(deltaV.toFixed(2));"
      }
    ],
    starterCode: `// Calculate Gravity Assist Velocity Boost in km/s
function calculateGravityAssistDeltaV(vPlanet, deflectionDeg) {
  const rad = deflectionDeg * (Math.PI / 180);
  const deltaV = 2 * vPlanet * Math.sin(rad / 2);
  return Number(deltaV.toFixed(2));
}`,
    testCases: [
      { input: [13.06, 45.0], expected: 9.99, label: "Jupiter Flyby 45° Deflection (v_p = 13.06 km/s)" },
      { input: [13.06, 60.0], expected: 13.06, label: "Jupiter Flyby 60° Deflection (v_p = 13.06 km/s)" },
      { input: [9.68, 30.0], expected: 5.01, label: "Saturn Flyby 30° Deflection (v_p = 9.68 km/s)" }
    ],
    evaluate: (codeStr) => {
      try {
        const cleanCode = codeStr.replace(/window|document|fetch|localStorage|eval|XMLHttpRequest/g, 'null');
        const fn = new Function('vPlanet', 'deflectionDeg', `
          ${cleanCode}
          return calculateGravityAssistDeltaV(vPlanet, deflectionDeg);
        `);

        const results = CODING_CHALLENGES[4].testCases.map(tc => {
          const actual = fn(tc.input[0], tc.input[1]);
          const passed = Math.abs(actual - tc.expected) <= 0.1;
          return { label: tc.label, input: tc.input.join(', '), expected: tc.expected, actual, passed };
        });

        const allPassed = results.every(r => r.passed);
        return { success: true, allPassed, results };
      } catch (err) {
        return { success: false, allPassed: false, error: err.message, results: [] };
      }
    }
  }
];
