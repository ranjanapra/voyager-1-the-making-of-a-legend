/**
 * Voyager 1 — Educational Data Laboratory Engine
 * 
 * Sourced for educational simulation.
 * 
 * MANDATORY COMPLIANCE LABEL:
 * "SIMULATED EDUCATIONAL DATA — NOT ACTUAL VOYAGER 1 TELEMETRY"
 */

export const SIMULATED_TELEMETRY_DATASET = [
  { id: "REC-1977-01", year: 1977, distanceAu: 1.0, distanceKm: "1.496e8", latencyHours: 0.14, rtgPowerWatts: 474.2, magneticFieldnT: 5.4, plasmaDensity: 7.2, subsystem: "cruise" },
  { id: "REC-1979-01", year: 1979, distanceAu: 5.2, distanceKm: "7.779e8", latencyHours: 0.72, rtgPowerWatts: 460.1, magneticFieldnT: 1.1, plasmaDensity: 0.28, subsystem: "jupiter-encounter" },
  { id: "REC-1980-01", year: 1980, distanceAu: 9.5, distanceKm: "1.421e9", latencyHours: 1.32, rtgPowerWatts: 451.8, magneticFieldnT: 0.52, plasmaDensity: 0.08, subsystem: "saturn-encounter" },
  { id: "REC-1985-01", year: 1985, distanceAu: 24.2, distanceKm: "3.620e9", latencyHours: 3.35, rtgPowerWatts: 418.5, magneticFieldnT: 0.21, plasmaDensity: 0.012, subsystem: "cruise" },
  { id: "REC-1990-01", year: 1990, distanceAu: 40.5, distanceKm: "6.059e9", latencyHours: 5.61, rtgPowerWatts: 388.2, magneticFieldnT: 0.12, plasmaDensity: 0.005, subsystem: "pale-blue-dot" },
  { id: "REC-2000-01", year: 2000, distanceAu: 77.2, distanceKm: "1.155e10", latencyHours: 10.70, rtgPowerWatts: 334.6, magneticFieldnT: 0.08, plasmaDensity: 0.002, subsystem: "heliosphere" },
  { id: "REC-2012-01", year: 2012, distanceAu: 121.7, distanceKm: "1.821e10", latencyHours: 16.87, rtgPowerWatts: 279.4, magneticFieldnT: 0.48, plasmaDensity: 0.080, subsystem: "heliopause-crossing" },
  { id: "REC-2020-01", year: 2020, distanceAu: 149.2, distanceKm: "2.232e10", latencyHours: 20.68, rtgPowerWatts: 246.8, magneticFieldnT: 0.51, plasmaDensity: 0.095, subsystem: "interstellar" },
  { id: "REC-2026-01", year: 2026, distanceAu: 173.1, distanceKm: "2.590e10", latencyHours: 24.00, rtgPowerWatts: 224.5, magneticFieldnT: 0.53, plasmaDensity: 0.102, subsystem: "one-light-day" }
];

export class DataLabEngine {
  static getDataset(filterSubsystem = 'all') {
    if (filterSubsystem === 'all') return [...SIMULATED_TELEMETRY_DATASET];
    return SIMULATED_TELEMETRY_DATASET.filter(d => d.subsystem === filterSubsystem);
  }

  /**
   * Calculate meaningful physical statistics from the telemetry records
   */
  static calculateStatistics(records) {
    if (!records || records.length === 0) return null;

    const powers = records.map(r => r.rtgPowerWatts);
    const latencies = records.map(r => r.latencyHours);
    const distances = records.map(r => r.distanceAu);
    const bFields = records.map(r => r.magneticFieldnT);

    const minPower = Math.min(...powers);
    const maxPower = Math.max(...powers);
    const avgPower = +(powers.reduce((a, b) => a + b, 0) / powers.length).toFixed(1);

    const minLatency = Math.min(...latencies);
    const maxLatency = Math.max(...latencies);
    const avgLatency = +(latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(2);

    // Calculate annual power loss rate between first and last record
    const firstRec = records[0];
    const lastRec = records[records.length - 1];
    const yearSpan = lastRec.year - firstRec.year;
    const powerDelta = firstRec.rtgPowerWatts - lastRec.rtgPowerWatts;
    const annualLossWatts = yearSpan > 0 ? +(powerDelta / yearSpan).toFixed(2) : 0;
    const annualLossPct = yearSpan > 0 ? +((powerDelta / firstRec.rtgPowerWatts / yearSpan) * 100).toFixed(2) : 0;

    // Detect Interstellar Plasma Density Jump
    const heliopauseRec = records.find(r => r.subsystem === 'heliopause-crossing');
    const plasmaJump = heliopauseRec ? 'Confirmed ~40x plasma density increase at 121.7 AU heliopause boundary.' : 'Not in filtered subset';

    return {
      recordCount: records.length,
      power: { min: minPower, max: maxPower, avg: avgPower, annualLossWatts, annualLossPct },
      latency: { min: minLatency, max: maxLatency, avg: avgLatency },
      maxDistanceAu: Math.max(...distances),
      plasmaJump,
      physicalConclusions: [
        `RTG Degradation: Power declines at ~${annualLossWatts} W/year (${annualLossPct}%/year), matching Plutonium-238 alpha decay ($t_{1/2} = 87.7$ yr) and SiGe thermocouple aging.`,
        `Microwave Latency: Telemetry latency scales linearly with distance ($t = d/c$), reaching exactly 24.0 hours (One Light-Day) at ~173.1 AU in November 2026.`,
        `Interstellar Crossing: Crossing the heliopause in 2012 saw an abrupt jump in plasma density from ~0.002 to ~0.080 cm^-3 and stable 0.5 nT interstellar magnetic field alignment.`
      ]
    };
  }

  /**
   * WP-13: Fine-grained date filtering for trajectory records
   * Validates boundary ranges and handles missing/empty filters gracefully.
   * Note: Authentic NASA GSFC SSC Ephemeris dataset covers 1977 (Launch) to 2005 (Termination Shock).
   */
  static filterTrajectoryByYear(dataset = [], startYear = 1977, endYear = 2005) {
    if (!Array.isArray(dataset)) return [];
    const sYr = Number(startYear) || 1977;
    const eYr = Number(endYear) || 2005;

    // Handle inverted ranges safely
    const actualStart = Math.min(sYr, eYr);
    const actualEnd = Math.max(sYr, eYr);

    return dataset.filter(r => r.year >= actualStart && r.year <= actualEnd);
  }

  /**
   * WP-13: Synchronize scrubbed index with physical metrics
   * Calculates distance in km and light-time radio latency from authentic AU data.
   */
  static calculateTrajectoryPoint(record) {
    if (!record) return null;
    const AU_KM = 149597870.7;
    const C_KM_S = 299792.458;

    const distAu = Number(record.distanceAu) || 1.0;
    const distKm = distAu * AU_KM;
    const latencySec = distKm / C_KM_S;
    const latencyHours = latencySec / 3600;
    const latencyHrsInt = Math.floor(latencyHours);
    const latencyMins = Math.round((latencyHours - latencyHrsInt) * 60);

    return {
      year: record.year,
      day: record.day,
      distanceAu: distAu,
      distanceKm: distKm.toExponential(4),
      latencyHours: +latencyHours.toFixed(2),
      latencyFormatted: `${latencyHrsInt}h ${latencyMins}m`,
      latDeg: record.latDeg,
      lonDeg: record.lonDeg,
      milestone: record.year === 1977 ? "Launch & Earth Departure" :
                 record.year === 1979 ? "Jupiter Planetary Encounter" :
                 record.year === 1980 ? "Saturn Planetary Encounter" :
                 record.year === 1990 ? "Pale Blue Dot Family Portrait" :
                 record.year >= 2004 ? "Termination Shock Crossing" : "Interplanetary Deep-Space Cruise"
    };
  }
}
