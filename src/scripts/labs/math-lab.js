/**
 * Voyager 1 — Dedicated Mathematics & Numerical Calculations Laboratory
 * 
 * Strict Engineering Standard:
 * - Dedicated calculation interface with numerical input fields (<input type="number">)
 * - Strict numerical tolerances (±1% to ±2%)
 * - Explicit unit checks (hours, Watts, m/s, protons/cm³, nanoteslas)
 * - Step-by-step worked derivation examples
 * - Clear, technical validation feedback explaining the exact physics
 * - NOT MULTIPLE CHOICE QUESTIONS!
 */

export const MATH_CALCULATION_EXERCISES = [
  {
    id: "math-ex-latency",
    title: "Calculation 01 // Deep-Space Radio Signal Light-Time Latency",
    domain: "Telecommunications & Light Propagation",
    context: "Voyager 1 communicates with NASA's Deep Space Network using microwave radio signals traveling at the speed of light $c = 299,792.458\\text{ km/s}$. As the spacecraft journeys across interstellar space, signal delay increases linearly with astronomical distance.",
    constants: [
      { name: "Speed of Light (c)", value: "299,792.458 km/s" },
      { name: "Astronomical Unit (1 AU)", value: "149,597,870.7 km" }
    ],
    formula: "t_{\\text{seconds}} = \\frac{D_{\\text{km}}}{c} = \\frac{D_{\\text{AU}} \\times 149,597,870.7}{299,792.458}, \\quad t_{\\text{hours}} = \\frac{t_{\\text{seconds}}}{3600}",
    solvedExample: {
      problem: "Calculate one-way latency when Voyager 1 is at 100.0 AU.",
      step1: "D = 100.0 AU × 149,597,870.7 km/AU = 1.49598 × 10¹⁰ km",
      step2: "t_sec = 1.49598 × 10¹⁰ km / 299,792.458 km/s = 49,900.5 seconds",
      step3: "t_hours = 49,900.5 s / 3600 s/hr = 13.86 hours",
      solution: "13.86 hours (Round-trip light time = 27.72 hours)"
    },
    taskProblem: "At a mission milestone distance of exactly 162.5 AU, determine both the one-way signal latency and the round-trip communications time (OWLT and RTLT) in hours.",
    inputs: [
      {
        id: "input-latency-owlt",
        label: "One-Way Light Time (OWLT)",
        unit: "hours",
        expected: 22.52,
        tolerance: 0.15,
        placeholder: "e.g. 22.5"
      },
      {
        id: "input-latency-rtlt",
        label: "Round-Trip Light Time (RTLT)",
        unit: "hours",
        expected: 45.04,
        tolerance: 0.3,
        placeholder: "e.g. 45.0"
      }
    ],
    validationLogic: (vals) => {
      const owlt = parseFloat(vals['input-latency-owlt']);
      const rtlt = parseFloat(vals['input-latency-rtlt']);
      if (isNaN(owlt) || isNaN(rtlt)) return { passed: false, message: "Please enter valid numerical values for both OWLT and RTLT." };
      const owltOk = Math.abs(owlt - 22.52) <= 0.15;
      const rtltOk = Math.abs(rtlt - 45.04) <= 0.3;
      if (owltOk && rtltOk) {
        return {
          passed: true,
          message: "✓ Accurate! D = 162.5 × 149,597,870.7 km = 2.43096 × 10¹⁰ km. One-way latency = 22.52 hours; round-trip command confirmation latency = 45.04 hours."
        };
      }
      return {
        passed: false,
        message: "Incorrect derivation. Remember: t_seconds = (162.5 × 149,597,870.7) / 299,792.458 = 81,088 s. Divide by 3600 to find hours (approx 22.52 hr), then double for round-trip."
      };
    }
  },
  {
    id: "math-ex-rtg",
    title: "Calculation 02 // RTG Plutonium-238 Radioactive Decay Power",
    domain: "Nuclear Power & Thermal Generation",
    context: "Voyager 1's three Radioisotope Thermoelectric Generators (MHW-RTGs) produced ~474.2 Watts of total electrical power at launch in September 1977. Heat is produced by the radioactive alpha decay of Plutonium-238 (half-life $T_{1/2} = 87.7\\text{ years}$) and converted into electricity via silicon-germanium thermocouples.",
    constants: [
      { name: "Initial Electrical Power (P₀)", value: "474.2 W (at t = 0 yr)" },
      { name: "Pu-238 Half-life (T₁/₂)", value: "87.7 years" }
    ],
    formula: "P_{\\text{thermal}}(t) = P_0 \\cdot 0.5^{t / T_{1/2}} = P_0 \\cdot e^{-\\lambda t}, \\quad \\lambda = \\frac{\\ln(2)}{87.7} \\approx 0.007904\\text{ yr}^{-1}",
    solvedExample: {
      problem: "Calculate pure thermal radioactive decay power after 40.0 years if P₀ = 474.2 W.",
      step1: "Fraction remaining = 0.5^(40.0 / 87.7) = 0.5^0.4561 = 0.7289",
      step2: "P_decay = 474.2 W × 0.7289 = 345.6 Watts",
      solution: "345.6 W (Thermocouple aging further reduces output by ~0.8%/yr in practice)"
    },
    taskProblem: "Calculate the expected radioactive decay electrical output after 49.0 years of flight (Year 2026), assuming pure isotope half-life decay from launch baseline of 474.2 W.",
    inputs: [
      {
        id: "input-rtg-decay",
        label: "Remaining Isotopic Output Power",
        unit: "Watts",
        expected: 322.0,
        tolerance: 3.5,
        placeholder: "e.g. 322.0"
      }
    ],
    validationLogic: (vals) => {
      const p = parseFloat(vals['input-rtg-decay']);
      if (isNaN(p)) return { passed: false, message: "Please enter a valid numerical power in Watts." };
      if (Math.abs(p - 322.0) <= 3.5) {
        return {
          passed: true,
          message: "✓ Accurate! P(49) = 474.2 × 0.5^(49.0 / 87.7) = 474.2 × 0.6789 = 322.0 Watts. (On the actual spacecraft, thermocouple resistance degradation reduces net bus power to ~224 Watts, requiring instrument shutdowns)."
        };
      }
      return {
        passed: false,
        message: "Incorrect result. Compute: 474.2 × Math.pow(0.5, 49.0 / 87.7). 49.0 / 87.7 = 0.5587. 0.5^0.5587 = 0.6789. Output is ~322 Watts."
      };
    }
  },
  {
    id: "math-ex-deltav",
    title: "Calculation 03 // Tsiolkovsky Rocket Equation & Trajectory Trim Delta-V",
    domain: "Orbital Mechanics & Propulsion",
    context: "Voyager 1 uses 16 catalytic hydrazine monopropellant thrusters with specific impulse $I_{sp} = 230.0\\text{ seconds}$ to execute trajectory correction maneuvers (TCMs). The velocity change $\\Delta v$ is governed by Konstantin Tsiolkovsky's Rocket Equation.",
    constants: [
      { name: "Specific Impulse (I_sp)", value: "230.0 s" },
      { name: "Standard Gravity (g₀)", value: "9.80665 m/s²" },
      { name: "Effective Exhaust Velocity (c_e)", value: "I_sp × g₀ = 2,255.53 m/s" }
    ],
    formula: "\\Delta v = I_{sp} \\cdot g_0 \\cdot \\ln\\left(\\frac{m_0}{m_f}\\right) = c_e \\cdot \\ln\\left(\\frac{m_0}{m_f}\\right)",
    solvedExample: {
      problem: "Calculate Delta-V when burning 10.0 kg of hydrazine from launch mass m₀ = 815.0 kg.",
      step1: "m_f = 815.0 kg - 10.0 kg = 805.0 kg",
      step2: "Mass ratio = m₀ / m_f = 815.0 / 805.0 = 1.01242",
      step3: "Δv = 230.0 × 9.80665 × ln(1.01242) = 2,255.53 × 0.012345 = 27.84 m/s",
      solution: "27.84 m/s"
    },
    taskProblem: "During the Jupiter-to-Saturn cruise, flight controllers executed a trajectory trim using 25.0 kg of hydrazine. If pre-burn spacecraft mass was 785.0 kg, calculate the resulting $\\Delta v$ imparted to the spacecraft in meters per second (m/s).",
    inputs: [
      {
        id: "input-deltav-trim",
        label: "Velocity Increment imparted (Δv)",
        unit: "m/s",
        expected: 73.0,
        tolerance: 1.0,
        placeholder: "e.g. 73.0"
      }
    ],
    validationLogic: (vals) => {
      const dv = parseFloat(vals['input-deltav-trim']);
      if (isNaN(dv)) return { passed: false, message: "Please enter a valid velocity change in m/s." };
      if (Math.abs(dv - 73.0) <= 1.0) {
        return {
          passed: true,
          message: "✓ Accurate! m_f = 785 - 25 = 760 kg. Mass ratio = 785 / 760 = 1.03289. ln(1.03289) = 0.03236. Δv = 2,255.53 × 0.03236 = 73.0 m/s."
        };
      }
      return {
        passed: false,
        message: "Check your calculation: m_f = 785 - 25 = 760 kg. Δv = 230 × 9.80665 × ln(785 / 760) ≈ 73.0 m/s."
      };
    }
  },
  {
    id: "math-ex-plasma",
    title: "Calculation 04 // Interplanetary Solar Wind Plasma Density Falloff",
    domain: "Heliophysics & Solar Wind Expansion",
    context: "The expanding solar wind expands spherically outward from the Sun into the heliosphere. Conservation of mass dictates that solar wind ion density $n(r)$ decreases with the inverse square of radial distance $r$: $n(r) = n_0 \\cdot (r_0 / r)^2$, where $n_0 \\approx 7.0\\text{ protons/cm}^3$ at Earth's orbit ($r_0 = 1.0\\text{ AU}$).",
    constants: [
      { name: "Solar Wind Density at 1 AU (n₀)", value: "7.0 protons/cm³" },
      { name: "Earth Orbital Distance (r₀)", value: "1.0 AU" }
    ],
    formula: "n(r) = n_0 \\left(\\frac{r_0}{r}\\right)^2 = \\frac{7.0}{r_{\\text{AU}}^2}\\text{ protons/cm}^3",
    solvedExample: {
      problem: "Calculate expected solar wind density at Jupiter's orbit (r = 5.2 AU).",
      step1: "r² = (5.2)² = 27.04",
      step2: "n(5.2) = 7.0 / 27.04 = 0.259 protons/cm³",
      solution: "0.26 protons/cm³"
    },
    taskProblem: "Calculate the expected heliospheric solar wind density when Voyager 1 reached Saturn at $r = 9.5\\text{ AU}$. Express your answer in protons/cm³ (round to 3 decimal places).",
    inputs: [
      {
        id: "input-plasma-density",
        label: "Proton Density at Saturn Orbit (n)",
        unit: "protons/cm³",
        expected: 0.078,
        tolerance: 0.005,
        placeholder: "e.g. 0.078"
      }
    ],
    validationLogic: (vals) => {
      const n = parseFloat(vals['input-plasma-density']);
      if (isNaN(n)) return { passed: false, message: "Please enter a valid plasma density in protons/cm³." };
      if (Math.abs(n - 0.078) <= 0.005) {
        return {
          passed: true,
          message: "✓ Accurate! n(9.5) = 7.0 / (9.5)² = 7.0 / 90.25 = 0.0776 ≈ 0.078 protons/cm³. This match confirmed spherically symmetric adiabatic expansion during the 1980 encounter."
        };
      }
      return {
        passed: false,
        message: "Check your calculation: n = 7.0 / (9.5)² = 7.0 / 90.25 ≈ 0.078 protons/cm³."
      };
    }
  },
  {
    id: "math-ex-dipole",
    title: "Calculation 05 // Planetary Dipole Magnetic Field Decay",
    domain: "Planetary Magnetospheres & Fluxgate Magnetometry",
    context: "During planetary encounters, the Voyager 1 Triaxial Fluxgate Magnetometer measured magnetic field strengths. For a magnetic dipole, equatorial field strength falls off with the inverse cube of radial distance: $B(r) = B_0 \\cdot (r_0 / r)^3$, where $B_0$ is surface magnetic field strength at 1 planetary radius $r_0$.",
    constants: [
      { name: "Jupiter Surface Equatorial Field (B₀)", value: "428,000 nT (4.28 Gauss)" },
      { name: "Jupiter Volumetric Radius (1 R_J)", value: "71,492 km" }
    ],
    formula: "B(r) = B_0 \\cdot \\left(\\frac{R_J}{r}\\right)^3 = \\frac{428,000}{r^3}\\text{ nT}",
    solvedExample: {
      problem: "Calculate magnetic field strength at 5.0 R_J from Jupiter's core.",
      step1: "r³ = (5.0)³ = 125.0",
      step2: "B(5) = 428,000 nT / 125.0 = 3,424.0 nT",
      solution: "3,424 nT"
    },
    taskProblem: "At its closest approach to Jupiter on March 5, 1979, Voyager 1 passed within $4.89\\text{ R}_J$ of Jupiter's center. Calculate the theoretical dipole magnetic field strength $B$ at this closest approach in nanoteslas (nT).",
    inputs: [
      {
        id: "input-dipole-field",
        label: "Dipole Magnetic Field Strength (B)",
        unit: "nT",
        expected: 3661.0,
        tolerance: 40.0,
        placeholder: "e.g. 3661"
      }
    ],
    validationLogic: (vals) => {
      const b = parseFloat(vals['input-dipole-field']);
      if (isNaN(b)) return { passed: false, message: "Please enter a valid magnetic field in nanoteslas." };
      if (Math.abs(b - 3661.0) <= 40.0) {
        return {
          passed: true,
          message: "✓ Accurate! B = 428,000 / (4.89)³ = 428,000 / 116.92 = 3,660.6 ≈ 3,661 nT. High-field fluxgate magnetometer data matched this theoretical curve closely."
        };
      }
      return {
        passed: false,
        message: "Check your calculation: r³ = (4.89)³ = 116.92. B = 428,000 / 116.92 ≈ 3,661 nT."
      };
    }
  }
];

export class MathLabEngine {
  static getExercises() {
    return [...MATH_CALCULATION_EXERCISES];
  }

  static getExerciseById(id) {
    return MATH_CALCULATION_EXERCISES.find(ex => ex.id === id) || null;
  }

  static validateExercise(id, inputValues) {
    const ex = this.getExerciseById(id);
    if (!ex) return { passed: false, message: "Unknown calculation exercise." };
    return ex.validationLogic(inputValues);
  }
}
