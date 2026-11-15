/**
 * Voyager 1 — Dedicated Graph Plotting & Data Interpretation Laboratory
 * 
 * Strict Engineering Standards:
 * - Interactive graphing tool supporting Line, Bar, Scatter, and Time-series plots
 * - User selection of dataset, chart type, X/Y axes, and units
 * - Dynamic SVG graph rendering with labeled axes, grid lines, and interactive points
 * - Structured graph-reading and data-interpretation analytical tasks
 * - Instant technical validation with scientific feedback
 */

export const GRAPH_DATASETS = [
  {
    id: "ds-trajectory",
    name: "Voyager 1 Radial Trajectory (1977–2026)",
    description: "Historical heliocentric distance measurements from NASA GSFC ephemeris.",
    xVar: "Time (Years)",
    xUnit: "yr",
    yVar: "Radial Distance from Sun",
    yUnit: "AU",
    points: [
      { x: 1977, y: 1.01, label: "Launch (1977)" },
      { x: 1979, y: 5.20, label: "Jupiter Encounter (1979)" },
      { x: 1980, y: 9.54, label: "Saturn Encounter (1980)" },
      { x: 1985, y: 24.2, label: "Interplanetary Cruise (1985)" },
      { x: 1990, y: 40.5, label: "Family Portrait / Pale Blue Dot (1990)" },
      { x: 2000, y: 77.2, label: "Outer Heliosphere (2000)" },
      { x: 2004, y: 94.0, label: "Termination Shock Crossing (2004)" },
      { x: 2012, y: 121.7, label: "Heliopause Interstellar Crossing (2012)" },
      { x: 2020, y: 149.2, label: "Interstellar Space (2020)" },
      { x: 2026, y: 165.4, label: "Present Day Epoch (2026)" }
    ]
  },
  {
    id: "ds-rtg-power",
    name: "RTG Electrical Output Decay (1977–2030)",
    description: "Combined plutonium-238 alpha decay and thermocouple degradation curve.",
    xVar: "Mission Elapsed Time",
    xUnit: "years",
    yVar: "Total Bus Electrical Power",
    yUnit: "Watts",
    points: [
      { x: 0, y: 474.2, label: "Launch Baseline (t = 0 yr)" },
      { x: 2, y: 460.1, label: "Jupiter Encounter (t = 2 yr)" },
      { x: 3, y: 451.8, label: "Saturn Encounter (t = 3 yr)" },
      { x: 10, y: 418.5, label: "Uranus/Neptune Era (t = 10 yr)" },
      { x: 13, y: 388.2, label: "Cameras Powered Down (t = 13 yr)" },
      { x: 23, y: 334.6, label: "Instrument Heater Load Shedding (t = 23 yr)" },
      { x: 35, y: 279.4, label: "Heliopause Boundary (t = 35 yr)" },
      { x: 43, y: 246.8, label: "Single Thruster Branch Switch (t = 43 yr)" },
      { x: 49, y: 224.5, label: "Present Interstellar Baseline (t = 49 yr)" },
      { x: 53, y: 205.0, label: "Estimated Minimum Telemetry Floor (t = 53 yr)" }
    ]
  },
  {
    id: "ds-solar-wind",
    name: "Solar Wind Ion Density vs Distance (1–50 AU)",
    description: "MIT Plasma Science (PLS) observations of expanding heliospheric solar wind.",
    xVar: "Radial Distance",
    xUnit: "AU",
    yVar: "Proton Density",
    yUnit: "protons/cm³",
    points: [
      { x: 1.0, y: 7.20, label: "Earth Orbit (1.0 AU)" },
      { x: 2.0, y: 1.82, label: "Mars Orbit (1.5–2.0 AU)" },
      { x: 5.2, y: 0.28, label: "Jupiter Orbit (5.2 AU)" },
      { x: 9.5, y: 0.08, label: "Saturn Orbit (9.5 AU)" },
      { x: 15.0, y: 0.032, label: "Deep Interplanetary (15 AU)" },
      { x: 20.0, y: 0.018, label: "Deep Interplanetary (20 AU)" },
      { x: 30.0, y: 0.008, label: "Kuiper Belt Region (30 AU)" },
      { x: 40.0, y: 0.004, label: "Neptune Orbital Distance (40 AU)" }
    ]
  },
  {
    id: "ds-gravity-assist",
    name: "Planetary Flyby Deflection Angle vs Heliocentric Speed Boost",
    description: "Hyperbolic orbital impulse mechanics for Jupiter flyby at orbital speed 13.06 km/s.",
    xVar: "Flyby Deflection Angle",
    xUnit: "degrees",
    yVar: "Heliocentric Velocity Boost (Δv)",
    yUnit: "km/s",
    points: [
      { x: 10, y: 2.27, label: "10° Glancing Trajectory" },
      { x: 20, y: 4.54, label: "20° Shallow Deflection" },
      { x: 30, y: 6.76, label: "30° Moderate Deflection" },
      { x: 45, y: 9.99, label: "45° Voyager 1 Jupiter Flyby Baseline" },
      { x: 60, y: 13.06, label: "60° Steep Hyperbolic Swing" },
      { x: 75, y: 15.89, label: "75° Deep Gravity Well Deflection" },
      { x: 90, y: 18.47, label: "90° Orthogonal Planetary Turn" }
    ]
  }
];

export const GRAPH_INTERPRETATION_TASKS = [
  {
    id: "gtask-01",
    datasetId: "ds-trajectory",
    title: "Task 01 // Trajectory Slope & Interstellar Radial Velocity",
    prompt: "Examine the radial distance curve from 1980 to 2026. The trajectory exhibits a virtually constant linear slope after the Saturn encounter. Calculate the approximate annual radial velocity $\\Delta d / \\Delta t$ in AU per year during this interstellar cruise phase.",
    hint: "Pick two distant points on the line: (1980, 9.5 AU) and (2020, 149.2 AU). Compute: (149.2 - 9.5) / (2020 - 1980) = 139.7 / 40.",
    options: [
      { id: "A", text: "Approx. 1.25 AU/year (too slow, corresponds to an inner system asteroid)" },
      { id: "B", text: "Approx. 3.50 to 3.60 AU/year (approx. 17 km/s relative to the Sun)", isCorrect: true },
      { id: "C", text: "Approx. 8.20 AU/year (would exceed solar system parabolic escape by 3x)" },
      { id: "D", text: "0 AU/year (stationary epoch)" }
    ],
    explanation: "Correct! Between 1980 (9.54 AU) and 2020 (149.2 AU), Voyager 1 covered ~139.7 AU in 40 years, yielding ~3.5 AU/year. Since 1 AU/yr ≈ 4.74 km/s, 3.5 AU/yr corresponds to ~16.6–17.0 km/s heliocentric escape velocity."
  },
  {
    id: "gtask-02",
    datasetId: "ds-rtg-power",
    title: "Task 02 // Power Loss Rate & Mission Operational Limits",
    prompt: "Inspect the RTG electrical power decay curve. Between Launch (t = 0 yr, 474 W) and Present Epoch (t = 49 yr, ~224 W), what has been the average electrical power degradation rate, and why has NASA turned off instruments?",
    hint: "Total loss = 474 W - 224 W = 250 W over 49 years. 250 / 49 ≈ 5.1 W/yr.",
    options: [
      { id: "A", text: "Power has dropped by ~5.1 Watts per year due to combined Pu-238 decay and thermocouple resistance aging, requiring dormant instrument shutdowns to protect communications.", isCorrect: true },
      { id: "B", text: "Power increased steadily as the spacecraft absorbed cosmic microwave background radiation." },
      { id: "C", text: "Power dropped to 0 Watts immediately upon leaving Jupiter's magnetic field." },
      { id: "D", text: "Power degradation was exactly 0.1 W per year, indicating thermocouples do not degrade in vacuum." }
    ],
    explanation: "Correct! The combined rate of isotopic decay (~3.8 W/yr) plus thermocouple bi-metallic resistance degradation (~1.3 W/yr) produces ~5.1 W/yr total power drop. This necessitated switching off non-essential instruments (ISS cameras in 1990, ultraviolet spectrometers, etc.) to keep transmitters operational."
  },
  {
    id: "gtask-03",
    datasetId: "ds-solar-wind",
    title: "Task 03 // Plasma Density Decay Geometry",
    prompt: "Compare the solar wind density at 1.0 AU (7.2 protons/cm³) to that at 5.2 AU (0.28 protons/cm³). What mathematical law explains why the density curve drops precipitously before flattening out?",
    hint: "Check ratio: 7.2 / (5.2)² = 7.2 / 27.04 ≈ 0.27 protons/cm³.",
    options: [
      { id: "A", text: "Linear decay: n(r) = n₀ - k·r" },
      { id: "B", text: "Inverse-square decay: n(r) ∝ 1/r² due to spherical geometric expansion into 3D space.", isCorrect: true },
      { id: "C", text: "Exponential surge: density increases as solar gravity weakens" },
      { id: "D", text: "Constant uniform density maintained by interstellar back-pressure" }
    ],
    explanation: "Correct! Because the solar wind expands radially in all directions from the Sun, the surface area of the expansion sphere grows as 4πr². By conservation of particle flux, the number density must decrease as 1/r²."
  },
  {
    id: "gtask-04",
    datasetId: "ds-gravity-assist",
    title: "Task 04 // Gravity Assist Velocity Boost vs Deflection",
    prompt: "In the gravity-assist chart, Voyager 1 achieved a deflection angle of approximately 45° at Jupiter. What was the resulting velocity increment $\\Delta v$ imparted to the spacecraft in the heliocentric frame?",
    hint: "Look at the data point for 45°: Δv = 2 · v_planet · sin(45° / 2) = 2 · 13.06 · sin(22.5°) ≈ 9.99 km/s.",
    options: [
      { id: "A", text: "Approx. 1.5 km/s" },
      { id: "B", text: "Approx. 10.0 km/s (without burning any onboard propellant)", isCorrect: true },
      { id: "C", text: "Approx. 50.0 km/s" },
      { id: "D", text: "Negative 10 km/s (spacecraft decelerated into orbit)" }
    ],
    explanation: "Correct! By flying behind Jupiter's orbital path, Voyager 1 was pulled along Jupiter's orbital vector, deflecting by 45° and gaining ~10.0 km/s of heliocentric velocity—shortening the transit to Saturn by several years without chemical propellant consumption."
  }
];

export class GraphLabEngine {
  static getDatasets() {
    return [...GRAPH_DATASETS];
  }

  static getDatasetById(id) {
    return GRAPH_DATASETS.find(d => d.id === id) || GRAPH_DATASETS[0];
  }

  static getInterpretationTasks() {
    return [...GRAPH_INTERPRETATION_TASKS];
  }

  /**
   * Render dynamic SVG graph based on chosen dataset and visual style
   * @param {string} datasetId
   * @param {string} chartType - 'line' | 'bar' | 'scatter' | 'time-series'
   * @param {number} width
   * @param {number} height
   */
  static renderSvgGraph(datasetId, chartType = 'line', width = 640, height = 320) {
    const ds = this.getDatasetById(datasetId);
    const pts = ds.points;
    const padL = 65;
    const padR = 25;
    const padT = 30;
    const padB = 45;
    const plotW = width - padL - padR;
    const plotH = height - padT - padB;

    const minX = Math.min(...pts.map(p => p.x));
    const maxX = Math.max(...pts.map(p => p.x));
    const minY = 0;
    const maxY = Math.max(...pts.map(p => p.y)) * 1.15;

    const scaleX = (x) => padL + ((x - minX) / (maxX - minX || 1)) * plotW;
    const scaleY = (y) => padT + plotH - ((y - minY) / (maxY - minY || 1)) * plotH;

    // Grid lines
    let gridLinesSvg = '';
    for (let i = 0; i <= 4; i++) {
      const yVal = minY + (maxY - minY) * (i / 4);
      const yPos = scaleY(yVal);
      gridLinesSvg += `
        <line x1="${padL}" y1="${yPos}" x2="${padL + plotW}" y2="${yPos}" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3,3" />
        <text x="${padL - 8}" y="${yPos + 3}" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="end">${yVal >= 10 ? yVal.toFixed(0) : yVal.toFixed(2)}</text>
      `;
    }

    // X-axis ticks
    let xTicksSvg = '';
    const xStep = Math.max(1, Math.floor(pts.length / 5));
    pts.forEach((p, idx) => {
      if (idx % xStep === 0 || idx === pts.length - 1) {
        const xPos = scaleX(p.x);
        xTicksSvg += `
          <line x1="${xPos}" y1="${padT + plotH}" x2="${xPos}" y2="${padT + plotH + 5}" stroke="rgba(255,255,255,0.2)" />
          <text x="${xPos}" y="${padT + plotH + 16}" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="middle">${p.x}</text>
        `;
      }
    });

    // Content based on chartType
    let plotContentSvg = '';

    if (chartType === 'line' || chartType === 'time-series') {
      const polyPoints = pts.map(p => `${scaleX(p.x).toFixed(1)},${scaleY(p.y).toFixed(1)}`).join(' ');
      plotContentSvg += `
        <polyline fill="none" stroke="#f59e0b" stroke-width="2.5" points="${polyPoints}" stroke-linejoin="round" stroke-linecap="round" />
        ${pts.map(p => `
          <circle cx="${scaleX(p.x).toFixed(1)}" cy="${scaleY(p.y).toFixed(1)}" r="4" fill="#fbbf24" stroke="#000" stroke-width="1.5">
            <title>${p.label}: ${p.x} ${ds.xUnit} → ${p.y} ${ds.yUnit}</title>
          </circle>
        `).join('')}
      `;
    } else if (chartType === 'scatter') {
      plotContentSvg += pts.map(p => `
        <circle cx="${scaleX(p.x).toFixed(1)}" cy="${scaleY(p.y).toFixed(1)}" r="6" fill="rgba(56, 189, 248, 0.8)" stroke="#38bdf8" stroke-width="1.5">
          <title>${p.label}: ${p.x} ${ds.xUnit} → ${p.y} ${ds.yUnit}</title>
        </circle>
      `).join('');
    } else if (chartType === 'bar') {
      const barW = Math.max(8, (plotW / pts.length) * 0.55);
      plotContentSvg += pts.map(p => {
        const bx = scaleX(p.x) - barW / 2;
        const by = scaleY(p.y);
        const bh = (padT + plotH) - by;
        return `
          <rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" fill="rgba(245, 158, 11, 0.75)" stroke="#fbbf24" rx="2">
            <title>${p.label}: ${p.x} ${ds.xUnit} → ${p.y} ${ds.yUnit}</title>
          </rect>
        `;
      }).join('');
    }

    return `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; background: rgba(8, 12, 22, 0.75); border-radius: 6px; border: 1px solid rgba(245, 158, 11, 0.25);" role="img" aria-label="${ds.name}">
        <!-- Axes -->
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
        <line x1="${padL}" y1="${padT + plotH}" x2="${padL + plotW}" y2="${padT + plotH}" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />

        <!-- Grid Lines & Ticks -->
        ${gridLinesSvg}
        ${xTicksSvg}

        <!-- Axis Labels -->
        <text x="${padL + plotW / 2}" y="${height - 6}" fill="#fbbf24" font-size="10" font-family="monospace" text-anchor="middle" font-weight="700">
          ${ds.xVar} [${ds.xUnit}]
        </text>
        <text x="14" y="${padT + plotH / 2}" fill="#fbbf24" font-size="10" font-family="monospace" text-anchor="middle" font-weight="700" transform="rotate(-90 14 ${padT + plotH / 2})">
          ${ds.yVar} [${ds.yUnit}]
        </text>

        <!-- Plot Data Elements -->
        ${plotContentSvg}
      </svg>
    `;
  }
}
