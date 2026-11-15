/**
 * Voyager 1 — Educational AI/ML Telemetry Anomaly Detection Simulation
 * 
 * MANDATORY EDUCATIONAL DISCLAIMER:
 * "HYPOTHETICAL MODERN EDUCATIONAL SIMULATION — VOYAGER 1 USED HARDWIRED LOGIC
 * AND 4KB PLATED-WIRE MEMORY IN 1977, NOT MODERN MACHINE LEARNING"
 */

export const TELEMETRY_SAMPLES = [
  { id: "T-01", time: "00:00", busTempC: 18.2, rtgAmps: 15.8, agcSignalDbm: -142.1, isTrueAnomaly: false, event: "Nominal cruise" },
  { id: "T-02", time: "00:15", busTempC: 18.4, rtgAmps: 15.8, agcSignalDbm: -142.3, isTrueAnomaly: false, event: "Nominal cruise" },
  { id: "T-03", time: "00:30", busTempC: 18.3, rtgAmps: 15.7, agcSignalDbm: -142.0, isTrueAnomaly: false, event: "Nominal cruise" },
  { id: "T-04", time: "00:45", busTempC: 38.9, rtgAmps: 18.6, agcSignalDbm: -158.4, isTrueAnomaly: true, event: "Jovian Inner Flux Radiation Spike" },
  { id: "T-05", time: "01:00", busTempC: 18.5, rtgAmps: 15.8, agcSignalDbm: -142.2, isTrueAnomaly: false, event: "Post-event recovery" },
  { id: "T-06", time: "01:15", busTempC: 18.3, rtgAmps: 15.7, agcSignalDbm: -142.4, isTrueAnomaly: false, event: "Nominal cruise" },
  { id: "T-07", time: "01:30", busTempC: -4.2, rtgAmps: 15.8, agcSignalDbm: -142.1, isTrueAnomaly: true, event: "Thermal Louver Stuck Open (Cryo Drop)" },
  { id: "T-08", time: "01:45", busTempC: 18.1, rtgAmps: 15.8, agcSignalDbm: -142.0, isTrueAnomaly: false, event: "Louver heater command" },
  { id: "T-09", time: "02:00", busTempC: 18.2, rtgAmps: 15.7, agcSignalDbm: -142.2, isTrueAnomaly: false, event: "Nominal cruise" },
  { id: "T-10", time: "02:15", busTempC: 18.4, rtgAmps: 11.2, agcSignalDbm: -142.3, isTrueAnomaly: true, event: "RTG Bus Subsystem Under-voltage Surge" },
  { id: "T-11", time: "02:30", busTempC: 18.3, rtgAmps: 15.8, agcSignalDbm: -142.1, isTrueAnomaly: false, event: "Autonomous shunt regulator trip" },
  { id: "T-12", time: "02:45", busTempC: 18.2, rtgAmps: 15.8, agcSignalDbm: -142.0, isTrueAnomaly: false, event: "Nominal cruise" },
  { id: "T-13", time: "03:00", busTempC: 18.5, rtgAmps: 15.8, agcSignalDbm: -142.2, isTrueAnomaly: false, event: "Nominal cruise" },
  { id: "T-14", time: "03:15", busTempC: 18.3, rtgAmps: 15.7, agcSignalDbm: -172.9, isTrueAnomaly: true, event: "Canopus Star Tracker Loss of Lock" },
  { id: "T-15", time: "03:30", busTempC: 18.4, rtgAmps: 15.8, agcSignalDbm: -142.1, isTrueAnomaly: false, event: "Celestial re-acquisition" },
  { id: "T-16", time: "03:45", busTempC: 18.3, rtgAmps: 15.7, agcSignalDbm: -142.3, isTrueAnomaly: false, event: "Nominal cruise" }
];

export class AiMlSimulationEngine {
  /**
   * Run Z-score anomaly detector across dataset with variable threshold
   * @param {number} thresholdStdDev (e.g. 1.8 to 3.2)
   * @param {boolean} enableNoise (WP-15: simulated sensor telemetry noise)
   */
  static runDetector(thresholdStdDev = 2.2, enableNoise = false) {
    const samples = TELEMETRY_SAMPLES.map((s, idx) => {
      if (!enableNoise) {
        return {
          ...s,
          rawBusTempC: s.busTempC,
          rawRtgAmps: s.rtgAmps,
          rawAgcSignalDbm: s.agcSignalDbm,
          noisy: false
        };
      }
      // Reproducible pseudo-random noise (sin/cos hash)
      const noiseTemp = Math.sin((idx + 1) * 12.9898 + 78.233) * 1.5;
      const noiseAmps = Math.cos((idx + 1) * 43.1234 + 19.876) * 0.3;
      const noiseAgc = Math.sin((idx + 1) * 93.456 + 11.223) * 2.0;

      return {
        ...s,
        rawBusTempC: s.busTempC,
        rawRtgAmps: s.rtgAmps,
        rawAgcSignalDbm: s.agcSignalDbm,
        busTempC: +(s.busTempC + noiseTemp).toFixed(1),
        rtgAmps: +(s.rtgAmps + noiseAmps).toFixed(1),
        agcSignalDbm: +(s.agcSignalDbm + noiseAgc).toFixed(1),
        noisy: true
      };
    });

    const temps = samples.map(s => s.busTempC);
    const meanTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    const stdTemp = Math.sqrt(temps.map(x => Math.pow(x - meanTemp, 2)).reduce((a, b) => a + b) / temps.length);

    const amps = samples.map(s => s.rtgAmps);
    const meanAmps = amps.reduce((a, b) => a + b, 0) / amps.length;
    const stdAmps = Math.sqrt(amps.map(x => Math.pow(x - meanAmps, 2)).reduce((a, b) => a + b) / amps.length);

    const agcs = samples.map(s => s.agcSignalDbm);
    const meanAgc = agcs.reduce((a, b) => a + b, 0) / agcs.length;
    const stdAgc = Math.sqrt(agcs.map(x => Math.pow(x - meanAgc, 2)).reduce((a, b) => a + b) / agcs.length);

    let tp = 0; // True Positive
    let fp = 0; // False Positive
    let tn = 0; // True Negative
    let fn = 0; // False Negative

    const evaluatedSamples = samples.map(s => {
      const zTemp = Math.abs((s.busTempC - meanTemp) / (stdTemp || 1));
      const zAmps = Math.abs((s.rtgAmps - meanAmps) / (stdAmps || 1));
      const zAgc = Math.abs((s.agcSignalDbm - meanAgc) / (stdAgc || 1));

      const maxZ = Math.max(zTemp, zAmps, zAgc);
      const isDetectedAnomaly = maxZ >= thresholdStdDev;

      if (isDetectedAnomaly && s.isTrueAnomaly) tp++;
      else if (isDetectedAnomaly && !s.isTrueAnomaly) fp++;
      else if (!isDetectedAnomaly && !s.isTrueAnomaly) tn++;
      else if (!isDetectedAnomaly && s.isTrueAnomaly) fn++;

      return {
        ...s,
        maxZ: +maxZ.toFixed(2),
        isDetectedAnomaly,
        classificationCorrect: isDetectedAnomaly === s.isTrueAnomaly
      };
    });

    const total = samples.length;
    const accuracy = +(((tp + tn) / total) * 100).toFixed(1);
    const precision = (tp + fp) > 0 ? +((tp / (tp + fp)) * 100).toFixed(1) : 0;
    const recall = (tp + fn) > 0 ? +((tp / (tp + fn)) * 100).toFixed(1) : 0;
    const f1Score = (precision + recall) > 0 ? +(2 * (precision * recall) / (precision + recall)).toFixed(1) : 0;

    return {
      thresholdStdDev,
      isNoiseEnabled: enableNoise,
      confusionMatrix: { tp, fp, tn, fn },
      metrics: { accuracy, precision, recall, f1Score, totalSamples: total },
      evaluatedSamples,
      historicalComparison: "In 1977, JPL engineers achieved equivalent mission reliability without AI/ML by employing hardware majority-voting circuits (triple-redundant gates), hardcoded analog comparator registers in the Flight Data Subsystem (FDS), and 24/7 human telemetry monitoring via the Deep Space Network."
    };
  }
}
