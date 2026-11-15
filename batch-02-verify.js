import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { STAGE_3D_TARGETS, AssemblyWorkflowEngine } from './src/scripts/simulation/assembly-workflow.js';
import { DecisionEngine, ENGINEERING_DECISIONS } from './src/scripts/simulation/decision-engine.js';
import { DataLabEngine } from './src/scripts/labs/data-lab.js';
import { REAL_TRAJECTORY_EPHEMERIS } from './src/scripts/labs/historical-data.js';
import { CODING_CHALLENGES } from './src/scripts/labs/code-lab.js';
import { AiMlSimulationEngine } from './src/scripts/labs/aiml-lab.js';
import { MissionReportEngine } from './src/scripts/completion/mission-report.js';
import { ENGINEERING_TASKS } from './src/scripts/tasks/task-data.js';
import { TaskEngine } from './src/scripts/tasks/task-engine.js';
import { ABOUT_DATA } from './src/scripts/story/about-data.js';

const htmlContent = readFileSync('index.html', 'utf-8');
const exploreCss = readFileSync('src/styles/explore.css', 'utf-8');
const starsJs = readFileSync('src/scripts/three/stars.js', 'utf-8');
const buildScreenJs = readFileSync('src/scripts/ui/build-screen.js', 'utf-8');
const exploreScreenJs = readFileSync('src/scripts/ui/explore-screen.js', 'utf-8');
const goldenRecordJs = readFileSync('src/scripts/ui/golden-record-explorer.js', 'utf-8');
const routerJs = readFileSync('src/scripts/ui/router.js', 'utf-8');
const spacecraftExplorerJs = readFileSync('src/scripts/ui/spacecraft-explorer.js', 'utf-8');
const aboutScreenJs = readFileSync('src/scripts/ui/about-screen.js', 'utf-8');

console.log('=== BATCH 02 & UI CORRECTIONS VERIFICATION TEST SUITE ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failCount++;
  }
}

// -------------------------------------------------------------
// UI-01 & UI-02: JPL Archive & Dossier Labels Removal
// -------------------------------------------------------------
console.log('--- UI-01 & UI-02: JPL Archive & Dossier Labels Removal ---');
assert(!htmlContent.includes('JPL ARCHIVE // MISSION COMMENCEMENT'), 'Hero section does not have JPL ARCHIVE // MISSION COMMENCEMENT');
assert(!htmlContent.includes('JPL ARCHIVE // SPACECRAFT FABRICATION'), 'Section 02 does not have JPL ARCHIVE // SPACECRAFT FABRICATION');
assert(!htmlContent.includes('JPL ARCHIVE // HISTORICAL RESEARCH HUB'), 'Section 03 does not have JPL ARCHIVE // HISTORICAL RESEARCH HUB');
assert(!htmlContent.includes('JPL ARCHIVE // MISSION RETROSPECTIVE'), 'Section 04 does not have JPL ARCHIVE // MISSION RETROSPECTIVE');
assert(!htmlContent.includes('STUDENT MISSION EXPLORATION DOSSIER'), 'Section 03 does not have STUDENT MISSION EXPLORATION DOSSIER');
assert(htmlContent.includes('<span>1972–1977 MISSION INCEPTION</span>'), 'Hero badge cleanly labeled 1972–1977 MISSION INCEPTION');

// -------------------------------------------------------------
// UI-04: Official NASA/JPL Repository Reference Replacement
// -------------------------------------------------------------
console.log('\n--- UI-04: Spacecraft Visualizer NASA Repository Reference ---');
assert(!spacecraftExplorerJs.includes('OFFICIAL NASA/JPL REPOSITORY REFERENCE'), 'Replaced OFFICIAL NASA/JPL REPOSITORY REFERENCE');
assert(!spacecraftExplorerJs.includes('NASA NSSDCA CATALOG RECORD'), 'NASA NSSDCA Catalog Record removed per UI Correction 25');

// -------------------------------------------------------------
// UI-05: About Us Team Members Count
// -------------------------------------------------------------
console.log('\n--- UI-05: About Us Team Members ---');
assert(ABOUT_DATA.teamMembers.length === 2, `About Us teamMembers contains exactly 2 members (actual: ${ABOUT_DATA.teamMembers.length})`);
assert(ABOUT_DATA.teamMembers[0].id === 'member-1', 'Team member 1 correctly assigned');
assert(ABOUT_DATA.teamMembers[1].id === 'member-2', 'Team member 2 correctly assigned');

// -------------------------------------------------------------
// UI-06: About Us Earth Image Authentic Awaiting / Verified Scan Handling
// -------------------------------------------------------------
console.log('\n--- UI-06: About Us Earth Image Authentic Handling ---');
assert(aboutScreenJs.includes('AWAITING USER-PROVIDED IMAGE') || aboutScreenJs.includes('NASA VOYAGER 1 // PIA00452'), 'Earth image container has authentic NASA PIA00452 badge');
assert(!aboutScreenJs.includes('images.unsplash.com'), 'No unsplash placeholder spoofing for Pale Blue Dot');
assert(aboutScreenJs.includes('PIA00452'), 'Accurate NASA PIA00452 citation preserved');

// -------------------------------------------------------------
// UI-07, UI-08, UI-09: Page 3 Image Frame & Heading Styling
// -------------------------------------------------------------
console.log('\n--- UI-07, UI-08, UI-09: Page 3 Image Frame & Heading ---');
assert(exploreCss.includes('padding: 8px;'), '.explore-boy-frame has 8px padding');
assert(exploreCss.includes('border: 1px solid rgba(245, 158, 11, 0.45);') || exploreCss.includes('border: 1px solid rgba(245, 158, 11, 0.55);'), '.explore-boy-frame has single golden border');
assert(!exploreCss.includes('.explore-boy-frame::before'), 'Corner bracket pseudo-elements removed from .explore-boy-frame (no double borders)');
assert(exploreCss.includes('white-space: nowrap;'), '.explore-main-title has white-space: nowrap on desktop');

// -------------------------------------------------------------
// WP-11: Assembly Stage 3D Interactive Hotspots
// -------------------------------------------------------------
console.log('\n--- WP-11: Assembly Stage 3D Interactive Hotspots ---');
const stageKeys = Object.keys(STAGE_3D_TARGETS);
assert(stageKeys.length === 6, `All 6 assembly stages mapped in STAGE_3D_TARGETS (actual: ${stageKeys.length})`);
let allStagesValid = true;
for (let i = 1; i <= 6; i++) {
  const target = AssemblyWorkflowEngine.getStage3DTarget(i);
  if (!target || !target.componentName || target.camZ === undefined || !target.hotspotTag) {
    allStagesValid = false;
  }
}
assert(allStagesValid, 'Every assembly stage has valid componentName, camZ, and hotspotTag');
assert(starsJs.includes('highlightAssemblyStage'), 'stars.js exports highlightAssemblyStage');
assert(starsJs.includes('resetAssemblyHighlight'), 'stars.js exports resetAssemblyHighlight');
assert(starsJs.includes('stageHighlightLight'), 'stars.js creates stageHighlightLight');
assert(buildScreenJs.includes('INSPECT 3D SUBSYSTEM'), 'build-screen.js renders INSPECT 3D SUBSYSTEM button on stages');
assert(buildScreenJs.includes("__assemblyKeyHandlerAttached"), 'Keyboard shortcut handling exists for stages 1-6');

// -------------------------------------------------------------
// WP-12: Decision Chamber Trajectory Graphing
// -------------------------------------------------------------
console.log('\n--- WP-12: Decision Chamber Trajectory Graphing ---');
assert(ENGINEERING_DECISIONS.length === 4, `All 4 historical engineering dilemmas present (actual: ${ENGINEERING_DECISIONS.length})`);
let allDilemmaSvgsValid = true;
ENGINEERING_DECISIONS.forEach(d => {
  const svg = DecisionEngine.generateDilemmaChartSvg(d.id, null);
  if (!svg || !svg.includes('<svg') || !svg.includes('</svg>') || !svg.includes('aria-label')) {
    allDilemmaSvgsValid = false;
  }
});
assert(allDilemmaSvgsValid, 'DecisionEngine.generateDilemmaChartSvg renders valid SVG charts for all 4 dilemmas');
const sampleChoiceSvg = DecisionEngine.generateDilemmaChartSvg('dec-radiation-hardening', 'choice-a');
assert(sampleChoiceSvg.includes('Choice C') && sampleChoiceSvg.includes('Choice A'), 'SVG includes distinct legend for chosen alternative vs historical flight path');
assert(buildScreenJs.includes('generateDilemmaChartSvg'), 'Decision cards embed SVG trajectory charts in build-screen.js');

// -------------------------------------------------------------
// WP-13: Data Lab Telemetry Scrubbing Enhancements
// -------------------------------------------------------------
console.log('\n--- WP-13: Data Lab Telemetry Scrubbing Enhancements ---');
assert(REAL_TRAJECTORY_EPHEMERIS.length === 101, `REAL_TRAJECTORY_EPHEMERIS has exactly 101 historical samples (actual: ${REAL_TRAJECTORY_EPHEMERIS.length})`);
const filtered1980to1985 = DataLabEngine.filterTrajectoryByYear(REAL_TRAJECTORY_EPHEMERIS, 1980, 1985);
assert(filtered1980to1985.length > 0 && filtered1980to1985.every(p => p.year >= 1980 && p.year <= 1985), 'filterTrajectoryByYear correctly filters 1980 to 1985');
const firstPointCalc = DataLabEngine.calculateTrajectoryPoint(REAL_TRAJECTORY_EPHEMERIS[0]);
assert(firstPointCalc.distanceAu !== undefined && firstPointCalc.distanceKm !== undefined && firstPointCalc.latencyHours !== undefined, 'calculateTrajectoryPoint computes distance and OWLT latency');
assert(buildScreenJs.includes('trajectory-scrubber-slider'), 'Telemetry range slider scrubber present in build-screen.js');
assert(buildScreenJs.includes('input-traj-start-year') && buildScreenJs.includes('input-traj-end-year'), 'Year filter inputs present in build-screen.js');
assert(buildScreenJs.includes('Synchronized Scrub Point Guideline & Target Circle'), 'Interactive SVG scrubber guideline & target circle present');
assert(buildScreenJs.includes('SYNCHRONIZED TELEMETRY READOUT'), 'Live telemetry readout card present');

// -------------------------------------------------------------
// WP-14: Coding Challenges Progressive Hints
// -------------------------------------------------------------
console.log('\n--- WP-14: Coding Challenges Progressive Hints ---');
assert(CODING_CHALLENGES.length >= 3 && CODING_CHALLENGES.length <= 5, `CODING_CHALLENGES contains full challenge suite (actual: ${CODING_CHALLENGES.length})`);
let allHintsValid = true;
CODING_CHALLENGES.forEach(c => {
  if (!Array.isArray(c.hints) || c.hints.length !== 3) {
    allHintsValid = false;
  }
  c.hints.forEach((h, idx) => {
    if (h.level !== idx + 1 || !h.title || !h.text) {
      allHintsValid = false;
    }
  });
});
assert(allHintsValid, 'All 3 challenges contain 3 progressive hints with level, title, and text');
assert(buildScreenJs.includes('REQUEST HINT (LEVEL'), 'build-screen.js provides progressive hint request button');
assert(buildScreenJs.includes('btn-request-hint'), 'Request progressive hint button handler present');

// -------------------------------------------------------------
// WP-15: AI/ML Lab Telemetry Noise Generator
// -------------------------------------------------------------
console.log('\n--- WP-15: AI/ML Lab Telemetry Noise Generator ---');
const cleanRun = AiMlSimulationEngine.runDetector(2.2, false);
const noisyRun = AiMlSimulationEngine.runDetector(2.2, true);
assert(cleanRun.evaluatedSamples.length === 16, 'Evaluated stream has 16 telemetry samples');
assert(cleanRun.evaluatedSamples.every(s => s.noisy === false), 'Clean run has zero noisy samples');
assert(noisyRun.evaluatedSamples.some(s => s.noisy === true), 'Noise-injected run tags samples with noisy: true');
assert(noisyRun.metrics.totalSamples === 16, 'Confusion matrix evaluates all 16 samples');
assert(buildScreenJs.includes('btn-toggle-aiml-noise'), 'Noise toggle button present in build-screen.js');
assert(buildScreenJs.includes('SIMULATED NOISE:'), 'Visual status indicator for noise toggle present');

// -------------------------------------------------------------
// WP-16 & UI-03: Golden Record Audio Player Buffer State & Hotspots
// -------------------------------------------------------------
console.log('\n--- WP-16 & UI-03: Golden Record Audio Player Buffer State & Hotspots ---');
assert(goldenRecordJs.includes('COVER_HOTSPOTS = ['), 'COVER_HOTSPOTS array defined in golden-record-explorer.js');
assert(goldenRecordJs.includes('14-Pulsar Galactic Triangulation Map'), 'Pulsar map hotspot defined');
assert(goldenRecordJs.includes('Hyperfine Hydrogen Transition'), 'Hydrogen transition hotspot defined');
assert(goldenRecordJs.includes("activeAudioState = 'buffering'"), 'activeAudioState buffering tracked');
assert(goldenRecordJs.includes('[BUFFERING AUDIO Grooves...]'), 'Loading audio buffer indicator rendered');
assert(exploreCss.includes('.gr-hotspot-pin'), '.gr-hotspot-pin styles defined in explore.css');
assert(goldenRecordJs.includes('width: 14px;') && goldenRecordJs.includes('height: 14px;'), 'Hotspot dots styled small (14px diameter) per UI-03');
assert(!goldenRecordJs.includes('counter(hotspot)') && !goldenRecordJs.includes('14-Pulsar</span>'), 'No bulky numbering inside hotspot dots');
assert(exploreCss.includes('@keyframes hotspotPulse'), 'Pulse ring animation defined');

// -------------------------------------------------------------
// WP-17: Mission Certificate Export
// -------------------------------------------------------------
console.log('\n--- WP-17: Mission Certificate Export ---');
const mockState = {
  selectedRole: 'systems-integration',
  completedTasks: ['task-sys-01', 'task-sys-02'],
  decisions: { 'dec-mass-power': 'choice-b' },
  assemblyStages: { 'stage-1': true, 'stage-2': true },
  candidateId: 'JPL-ENG-7701'
};
const certSvg = MissionReportEngine.generateCertificateSvg(mockState);
assert(certSvg.includes('<svg') && certSvg.includes('</svg>'), 'generateCertificateSvg returns valid SVG document');
assert(certSvg.includes('width="1000"') && certSvg.includes('height="700"'), 'Certificate has 1000x700 standalone dimensions');
assert(certSvg.includes('SPACECRAFT ASSEMBLY FACILITY BLDG 179'), 'Certificate contains JPL SAF BLDG 179 seal');
assert(certSvg.includes('SYSTEMS INTEGRATION & STRUCTURE LEAD'), 'Certificate reflects active role title');
assert(typeof MissionReportEngine.downloadCertificateSvg === 'function', 'downloadCertificateSvg function exists');
assert(typeof MissionReportEngine.printCertificate === 'function', 'printCertificate function exists');
assert(buildScreenJs.includes('DOWNLOAD VECTOR SVG CERTIFICATE'), 'Download SVG button present in build-screen.js');
assert(buildScreenJs.includes('PRINT / PDF CERTIFICATE'), 'Print / PDF button present in build-screen.js');

// -------------------------------------------------------------
// WP-18: Quiz Feedback Remediation Links
// -------------------------------------------------------------
console.log('\n--- WP-18: Quiz Feedback Remediation Links ---');
let allTasksHaveRemediation = true;
ENGINEERING_TASKS.forEach(t => {
  if (!t.remediation || !t.remediation.targetCompId || !t.remediation.targetCompName || !t.remediation.guidance) {
    allTasksHaveRemediation = false;
  }
});
assert(allTasksHaveRemediation && ENGINEERING_TASKS.length === 12, 'All 12 tasks have remediation metadata with targetCompId, targetCompName, and guidance');
const incorrectEval = TaskEngine.evaluateSubmission('task-sys-01', 'opt-b');
assert(incorrectEval.passed === false && incorrectEval.remediation !== null, 'Incorrect task submission returns remediation object');
assert(incorrectEval.remediation.targetCompId === 'comp-tank', 'Remediation links to correct subsystem component ID (comp-tank)');
assert(buildScreenJs.includes('btn-jump-to-comp'), 'build-screen.js renders remediation review button');
assert(buildScreenJs.includes('RECOMMENDED ARCHIVAL REVIEW:'), 'Remediation button clearly labeled with target subsystem');

// -------------------------------------------------------------
// WP-19: Deep Space Network Signal Simulator
// -------------------------------------------------------------
console.log('\n--- WP-19: Deep Space Network Signal Simulator ---');
assert(exploreScreenJs.includes('NASA DEEP SPACE NETWORK // 24-HOUR ROTATION'), 'DSN simulator title rendered');
assert(exploreScreenJs.includes('GOLDSTONE DSS-14') && exploreScreenJs.includes('MADRID DSS-63') && exploreScreenJs.includes('CANBERRA DSS-43'), 'All 3 70m DSN complexes modeled');
assert(exploreScreenJs.includes('slider-dsn-utc'), '24-hour Earth rotation slider present');
assert(exploreScreenJs.includes('slider-azimuth') && exploreScreenJs.includes('slider-elevation'), 'Azimuth and Elevation alignment sliders present');
assert(exploreScreenJs.includes('Carrier Lock') && exploreScreenJs.includes('Signal-to-Noise (SNR)'), 'DSN signal lock metrics present');
assert(exploreScreenJs.includes('EDUCATIONAL SIMULATION NOTICE'), 'Educational simulation notice explicitly displayed');

// -------------------------------------------------------------
// WP-20: Keyboard Shortcut Cheat Sheet
// -------------------------------------------------------------
console.log('\n--- WP-20: Keyboard Shortcut Cheat Sheet ---');
assert(routerJs.includes('setupKeyboardShortcuts'), 'setupKeyboardShortcuts implemented in router.js');
assert(routerJs.includes('keyboard-shortcuts-modal'), 'Cheat sheet modal created in router.js');
assert(routerJs.includes("tag === 'input' || tag === 'textarea' || tag === 'select'"), 'Keyboard listener guards against active form input typing');
assert(routerJs.includes("e.key === '?'"), 'Shortcut ? opens Cheat Sheet');
assert(routerJs.includes("e.key === 'b' || e.key === 'B'"), 'Shortcut B navigates to Build');
assert(routerJs.includes("e.key === 'e' || e.key === 'E'"), 'Shortcut E navigates to Explore');
assert(!htmlContent.includes('id="btn-shortcuts-toggle"'), 'Keys section cleanly removed from header per Phase 3A');

console.log(`\n========================================`);
console.log(`BATCH 02 RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`========================================`);

if (failCount > 0) process.exit(1);
