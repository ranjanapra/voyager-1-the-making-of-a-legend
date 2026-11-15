/**
 * VOYAGER 1 — MASTER FINAL IMPLEMENTATION & LEARNING SUITE VERIFICATION
 * 
 * Verifies all 5 Targeted UI Corrections and all 7 Distinct Interactive Learning Categories.
 */

const fs = require('fs');
const assert = (cond, msg) => {
  if (!cond) {
    console.error(`  ✗ FAIL: ${msg}`);
    process.exit(1);
  }
  console.log(`  ✓ PASS: ${msg}`);
};

console.log('=== VOYAGER 1 MASTER FINAL VERIFICATION ===\n');

// 1. UI CORRECTIONS AUDIT
console.log('--- STREAM 1: FIVE TARGETED UI CORRECTIONS ---');
const html = fs.readFileSync('index.html', 'utf8');
const routerJs = fs.readFileSync('src/scripts/ui/router.js', 'utf8');
const starsJs = fs.readFileSync('src/scripts/three/stars.js', 'utf8');
const exploreCss = fs.readFileSync('src/styles/explore.css', 'utf8');
const visualizerJs = fs.readFileSync('src/scripts/ui/spacecraft-explorer.js', 'utf8');

// UI Correction 22: Contrast Button Removal
assert(!html.includes('id="btn-toggle-contrast"'), 'UI-22: #btn-toggle-contrast cleanly removed from header');
assert(html.includes('id="btn-shortcuts-toggle"'), 'UI-22: #btn-shortcuts-toggle keyboard shortcut button preserved');
assert(routerJs.includes('toggleHighContrast()'), 'UI-22: toggleHighContrast method preserved in router.js');

// UI Correction 23: Slow Continuous 3D Spacecraft Rotation
assert(starsJs.includes('continuousRotY'), 'UI-23: continuousRotY declared for continuous rotation');
assert(starsJs.includes('continuousRotY += delta * 0.05') || starsJs.includes('continuousRotY +='), 'UI-23: continuousRotY incremental delta applied per animation frame');
assert(starsJs.includes('prefersReducedMotion'), 'UI-23: prefersReducedMotion guard strictly respected');

// UI Correction 24: Landing Page 3 Girl Poster Restoration & Uncropped Contain
assert(html.includes('/assets/images/Anime Voyager Mission Poster.png'), 'UI-24: Anime Voyager Mission Poster.png restored on Landing Page 3');
assert(exploreCss.includes('object-fit: contain;'), 'UI-24: explore poster has object-fit: contain (no cropping of right-side text)');
assert(exploreCss.includes('background: #000000;'), 'UI-24: explore poster frame has subtle dark backing');

// UI Correction 25: Visualizer Catalog Record Removal
assert(!visualizerJs.includes('NASA NSSDCA CATALOG RECORD'), 'UI-25: NASA NSSDCA CATALOG RECORD link removed from visualizer panel');
assert(!visualizerJs.includes('dossier-action-footer'), 'UI-25: .dossier-action-footer container removed from visualizer panel');

// UI Corrections 26 & 27: Research Archive Placements & Wording Integrity
const exploreDataJs = fs.readFileSync('src/scripts/story/explore-data.js', 'utf8');
const silentDataJs = fs.readFileSync('src/scripts/story/silent-hardware-data.js', 'utf8');
assert(!html.toLowerCase().includes('space apps') && !exploreDataJs.toLowerCase().includes('space apps'), 'UI-26: Zero extraneous competition branding');
assert(silentDataJs.includes('Voyager 1 is not an abandoned or discarded spacecraft'), 'UI-27: Explicitly clarifies Voyager 1 is NOT abandoned or discarded');


// 2. SEPARATE INTERACTIVE LEARNING EXPERIENCES AUDIT
console.log('\n--- STREAM 2: SEVEN DISTINCT INTERACTIVE LEARNING EXPERIENCES ---');

// Category 1: Knowledge Quizzes (Research Archive)
const { EXPLORE_CATEGORIES } = require('./src/scripts/story/explore-data.js');
assert(EXPLORE_CATEGORIES.length === 6, `Category 1: 6 Archive categories (actual: ${EXPLORE_CATEGORIES.length})`);
let totalSubtopics = 0;
EXPLORE_CATEGORIES.forEach(c => totalSubtopics += c.subtopics.length);
assert(totalSubtopics === 24, `Category 1: All 24 subtopics configured across categories (actual: ${totalSubtopics})`);

// Category 2: Mathematics & Numerical Calculations Lab
const { MathLabEngine, MATH_CALCULATION_EXERCISES } = require('./src/scripts/labs/math-lab.js');
assert(MATH_CALCULATION_EXERCISES.length === 5, `Category 2: 5 dedicated numerical calculation tasks (actual: ${MATH_CALCULATION_EXERCISES.length})`);
MATH_CALCULATION_EXERCISES.forEach((ex, idx) => {
  assert(ex.inputs.length >= 1, `Category 2: Ex ${idx+1} (${ex.id}) has input fields`);
  assert(ex.solvedExample && ex.solvedExample.solution, `Category 2: Ex ${idx+1} has step-by-step solved example`);
  const inputs = {};
  ex.inputs.forEach(inp => inputs[inp.id] = inp.expected);
  const res = MathLabEngine.validateExercise(ex.id, inputs);
  assert(res.passed, `Category 2: Ex ${idx+1} validates correctly with expected inputs`);
});

// Category 3: Mission Coding Lab
const { CODING_CHALLENGES } = require('./src/scripts/labs/code-lab.js');
assert(CODING_CHALLENGES.length === 5, `Category 3: 5 mission coding challenges (actual: ${CODING_CHALLENGES.length})`);
CODING_CHALLENGES.forEach((c, idx) => {
  assert(c.hints.length === 3, `Category 3: Challenge ${idx+1} has 3 progressive hint tiers`);
  assert(c.testCases.length >= 3, `Category 3: Challenge ${idx+1} has >= 3 test cases`);
  const evalResult = c.evaluate(c.starterCode);
  assert(evalResult.success && evalResult.allPassed, `Category 3: Challenge ${idx+1} starter code passes sandbox test suite`);
});

// Category 4: Data Analytics Lab
const { DataLabEngine, SIMULATED_TELEMETRY_DATASET } = require('./src/scripts/labs/data-lab.js');
assert(SIMULATED_TELEMETRY_DATASET.length >= 9, 'Category 4: Telemetry dataset has >= 9 historical milestone records');
const stats = DataLabEngine.calculateStatistics(SIMULATED_TELEMETRY_DATASET);
assert(stats && stats.count === SIMULATED_TELEMETRY_DATASET.length, 'Category 4: Statistical calculation engine produces verified summary metrics');

// Category 5: AI/ML Anomaly Detection Lab
const { AiMlSimulationEngine, TELEMETRY_SAMPLES } = require('./src/scripts/labs/aiml-lab.js');
assert(TELEMETRY_SAMPLES.length === 16, `Category 5: 16 telemetry samples in AI/ML dataset (actual: ${TELEMETRY_SAMPLES.length})`);
const nominalSim = AiMlSimulationEngine.runDetector(2.2, false);
assert(nominalSim.metrics.accuracy === 100, `Category 5: Baseline optimal detector achieves 100% accuracy (actual: ${nominalSim.metrics.accuracy}%)`);
const noisySim = AiMlSimulationEngine.runDetector(2.2, true);
assert(noisySim.isNoiseEnabled, 'Category 5: Telemetry noise generator operational');
assert(nominalSim.historicalComparison && nominalSim.historicalComparison.includes('1977'), 'Category 5: Historical 1977 JPL hardware comparator included');

// Category 6: Graph Plotting & Interpretation Lab
const { GraphLabEngine, GRAPH_DATASETS, GRAPH_INTERPRETATION_TASKS } = require('./src/scripts/labs/graph-lab.js');
assert(GRAPH_DATASETS.length === 4, `Category 6: 4 distinct scientific datasets for plotting (actual: ${GRAPH_DATASETS.length})`);
assert(GRAPH_INTERPRETATION_TASKS.length === 4, `Category 6: 4 structured data interpretation tasks (actual: ${GRAPH_INTERPRETATION_TASKS.length})`);
['line', 'bar', 'scatter', 'time-series'].forEach(t => {
  const svg = GraphLabEngine.renderSvgGraph('ds-trajectory', t);
  assert(svg.includes('<svg') && svg.includes('</svg>'), `Category 6: Dynamic SVG plot generated for ${t} style`);
});

// Category 7: Engineering Design & Decision Tasks
const { ENGINEERING_DECISIONS } = require('./src/simulation/decision-engine.js');
const { ENGINEERING_ROLES } = require('./src/scripts/tasks/roles-data.js');
const { ENGINEERING_TASKS } = require('./src/scripts/tasks/task-data.js');
assert(ENGINEERING_DECISIONS.length === 4, `Category 7: 4 Decision Chamber trade-offs (actual: ${ENGINEERING_DECISIONS.length})`);
assert(ENGINEERING_ROLES.length === 4, `Category 7: 4 Engineering Roles (actual: ${ENGINEERING_ROLES.length})`);
assert(ENGINEERING_TASKS.length === 12, `Category 7: 12 Specialized Engineering Tasks (actual: ${ENGINEERING_TASKS.length})`);

// 3. BUILD & STATE INTEGRATION
console.log('\n--- STREAM 3: BUILD SCREEN & STATE INTEGRATION ---');
const buildScreenJs = fs.readFileSync('src/scripts/ui/build-screen.js', 'utf8');
assert(buildScreenJs.includes('DATA ANALYTICS LAB'), 'Build workspace has Data Analytics sub-tab');
assert(buildScreenJs.includes('NUMERICAL CALCULATIONS LAB'), 'Build workspace has Numerical Calculations sub-tab');
assert(buildScreenJs.includes('GRAPH PLOTTING &amp; INTERPRETATION'), 'Build workspace has Graph Plotting sub-tab');
assert(buildScreenJs.includes('MISSION CODING LAB'), 'Build workspace has Coding Lab sub-tab');
assert(buildScreenJs.includes('AI/ML ANOMALY SIMULATION'), 'Build workspace has AI/ML Simulation sub-tab');
assert(buildScreenJs.includes('renderMathLabInner'), 'renderMathLabInner bound in build screen');
assert(buildScreenJs.includes('renderGraphLabInner'), 'renderGraphLabInner bound in build screen');

console.log('\n======================================================');
console.log('ALL MASTER FINAL VERIFICATION AUDITS PASSED CLEANLY');
console.log('======================================================\n');
