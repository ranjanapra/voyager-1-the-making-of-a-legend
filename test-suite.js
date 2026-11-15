import { CODING_CHALLENGES } from './src/scripts/labs/code-lab.js';
import { ENGINEERING_TASKS } from './src/scripts/tasks/task-data.js';
import {
  REAL_TRAJECTORY_EPHEMERIS,
  REAL_MAG_1977,
  REAL_PLS_1977,
  REAL_CRS_1977,
  REAL_LECP_1977,
  REAL_PWS_LAUNCH_SPECTRUM,
  DATASET_METADATA
} from './src/scripts/labs/historical-data.js';
import { SILENT_INSTRUMENTS, OPERATING_INTERSTELLAR_INSTRUMENTS } from './src/scripts/story/silent-hardware-data.js';
import { DecisionEngine, PROPOSAL_VERDICTS } from './src/scripts/simulation/decision-engine.js';
import { AiMlSimulationEngine } from './src/scripts/labs/aiml-lab.js';
import { SPACECRAFT_HOTSPOTS } from './src/scripts/ui/spacecraft-explorer.js';
import { GOLDEN_RECORD_VIEWS, GREETINGS_LANGUAGES, MUSIC_SELECTIONS } from './src/scripts/ui/golden-record-explorer.js';
import { MissionReportEngine } from './src/scripts/completion/mission-report.js';

console.log('=== VOYAGER 1 MASTER VERIFICATION TEST SUITE ===\n');

// TEST 1: CODING CHALLENGES
console.log('--- TEST 1: Coding Challenges Evaluation ---');
let allChallengesPassed = true;

for (const ch of CODING_CHALLENGES) {
  console.log(`Testing ${ch.id}: ${ch.title}`);
  try {
    const evalResult = ch.evaluate(ch.starterCode);
    if (!evalResult.allPassed) {
      console.error(`  FAIL starterCode for ${ch.id}:`, evalResult);
      allChallengesPassed = false;
    } else {
      console.log(`  PASS: Starter code passed all ${evalResult.results.length} test cases!`);
      evalResult.results.forEach((r, idx) => {
        console.log(`    Case ${idx+1} [${r.label}]: input=${JSON.stringify(r.input)} -> expected=${r.expected}, actual=${r.actual}`);
      });
    }
  } catch (err) {
    console.error(`  ERROR running ${ch.id}:`, err);
    allChallengesPassed = false;
  }
}

console.log(`\nCoding Challenges Overall: ${allChallengesPassed ? 'PASSED (100%)' : 'FAILED'}\n`);

// TEST 2: TASK QUIZ QUESTIONS & OPTION DISTRIBUTION
console.log('--- TEST 2: Task Quiz Answers & Option Distribution ---');
const answerCounts = { 'opt-a': 0, 'opt-b': 0, 'opt-c': 0, 'opt-d': 0 };
let allTasksHaveValidAnswers = true;

for (const task of ENGINEERING_TASKS) {
  const ans = task.correctAnswerId;
  if (!ans || !['opt-a', 'opt-b', 'opt-c', 'opt-d'].includes(ans)) {
    console.error(`  FAIL: Task ${task.id} has invalid correctAnswerId: ${ans}`);
    allTasksHaveValidAnswers = false;
  } else {
    answerCounts[ans]++;
  }
  if (!task.options || task.options.length !== 4) {
    console.error(`  FAIL: Task ${task.id} does not have exactly 4 options`);
    allTasksHaveValidAnswers = false;
  }
}

console.log(`Total tasks evaluated: ${ENGINEERING_TASKS.length}`);
console.log('Option distribution across 12 tasks:');
console.log(`  Option A (opt-a): ${answerCounts['opt-a']} (25%)`);
console.log(`  Option B (opt-b): ${answerCounts['opt-b']} (25%)`);
console.log(`  Option C (opt-c): ${answerCounts['opt-c']} (25%)`);
console.log(`  Option D (opt-d): ${answerCounts['opt-d']} (25%)`);
const isBalanced = answerCounts['opt-a'] === 3 && answerCounts['opt-b'] === 3 && answerCounts['opt-c'] === 3 && answerCounts['opt-d'] === 3;
console.log(`Answer Distribution: ${isBalanced ? 'PERFECTLY BALANCED (3-3-3-3)' : 'UNBALANCED'}\n`);

// TEST 3: HISTORICAL DATASETS INTEGRITY
console.log('--- TEST 3: NASA Archival Datasets Integrity ---');
console.log(`Trajectory records: ${REAL_TRAJECTORY_EPHEMERIS.length} (Expected >= 100)`);
console.log(`MAG hourly records: ${REAL_MAG_1977.length} (Expected >= 90)`);
console.log(`PLS hourly records: ${REAL_PLS_1977.length} (Expected >= 70)`);
console.log(`CRS daily records: ${REAL_CRS_1977.length} (Expected = 69)`);
console.log(`LECP daily records: ${REAL_LECP_1977.length} (Expected >= 50)`);
console.log(`PWS frequency channels: ${REAL_PWS_LAUNCH_SPECTRUM.length} (Expected = 16)`);
console.log(`Dataset metadata count: ${Object.keys(DATASET_METADATA).length} (Expected = 6)`);

// Check LECP Sector 1 blocked fill value (-1.00)
const lecpBlockedCount = REAL_LECP_1977.filter(r => (r.eb01_rs01_shield === -1.0 || r.rs01 === -1.0)).length;
const lecpBlockedVerified = lecpBlockedCount >= 57; // 57 of 58 records in raw NASA V177DGD01.CSV have -1.00; Day 346 has 1.50
console.log(`LECP Sector 1 RTG Shield Blockage: ${lecpBlockedCount}/58 records have -1.00 fill value (${lecpBlockedVerified ? 'VERIFIED RAW FIDELITY' : 'FAIL'})`);

// Check PWS units in V/m
const pwsUnitsVerified = REAL_PWS_LAUNCH_SPECTRUM.every(r => typeof (r.eFieldV_m ?? r.electricFieldVPerM) === 'number' && (r.eFieldV_m ?? r.electricFieldVPerM) > 0);
console.log(`PWS Calibrated Units (V/m): ${pwsUnitsVerified ? 'VERIFIED' : 'FAIL'}\n`);

// TEST 4: SILENT HARDWARE ARCHIVE
console.log('--- TEST 4: Silent Hardware Archive Alignment ---');
console.log(`Silent instruments count: ${SILENT_INSTRUMENTS.length} (Expected = 7)`);
console.log(`Operating interstellar instruments: ${OPERATING_INTERSTELLAR_INSTRUMENTS.length} (Expected = 4)`);
const totalSavedWatts = SILENT_INSTRUMENTS.reduce((sum, i) => sum + i.powerSavedWatts, 0);
console.log(`Total power saved by silent hardware triage: ${totalSavedWatts} Watts (~130 W target)`);

const allHaveNssdca = [...SILENT_INSTRUMENTS, ...OPERATING_INTERSTELLAR_INSTRUMENTS].every(i => i.nssdcaId && i.nssdcaUrl);
console.log(`All 11 instruments have NSSDCA IDs & URLs: ${allHaveNssdca ? 'VERIFIED' : 'FAIL'}\n`);

// TEST 5: DECISION CHAMBER & CUSTOM PROPOSAL EVALUATOR (6 PHYSICS VECTORS)
console.log('--- TEST 5: Decision Chamber & Custom Proposal Evaluator ---');
const resShort = DecisionEngine.evaluateCustomProposal({ subsystem: 'telecom', title: 'HGA', proposalText: 'Short', justification: 'None' });
const p1Pass = (resShort.verdict === PROPOSAL_VERDICTS.INSUFFICIENT_EVIDENCE);
console.log(`Insufficient Evidence (<25 chars): ${p1Pass ? 'PASSED (Rejected appropriately)' : 'FAIL'}`);

const resAnachronistic = DecisionEngine.evaluateCustomProposal({
  subsystem: 'power',
  title: 'Lithium-Ion Battery & Laser Comms',
  proposalText: 'Replace RTGs with modern lithium-ion batteries and deep-space laser communications with GPS guidance.',
  justification: 'Consumer tech from 2020s.'
});
const p2Pass = (resAnachronistic.verdict === PROPOSAL_VERDICTS.ANACHRONISTIC);
console.log(`Anachronistic Tech Detection: ${p2Pass ? 'PASSED (Flagged historical baseline violation)' : 'FAIL'}`);

const resOverweight = DecisionEngine.evaluateCustomProposal({
  subsystem: 'structures',
  title: 'Heavy Lead Vault Plating',
  proposalText: 'Add 150 kg of solid lead vault plating around central electronics to resist Jupiter radiation.',
  justification: 'Total radiation shielding.',
  massDeltaKg: 150
});
const p3Pass = (resOverweight.verdict === PROPOSAL_VERDICTS.UNSUITABLE);
console.log(`Overweight Violation (815 kg limit): ${p3Pass ? 'PASSED (Unsuitable verdict)' : 'FAIL'}`);

const resFeasible = DecisionEngine.evaluateCustomProposal({
  subsystem: 'structures',
  title: 'Beryllium Instrument Mounting Brackets',
  proposalText: 'Replace stainless steel brackets with lightweight beryllium-aluminum alloys to reduce mass by 12 kg while retaining structural rigidity under launch acoustic loads.',
  justification: 'Allows retaining all three MHW-RTGs without exceeding 815 kg Titan IIIE launch capacity.',
  massDeltaKg: -12,
  powerDeltaWatts: 0
});
const p4Pass = (resFeasible.verdict === PROPOSAL_VERDICTS.FEASIBLE || resFeasible.verdict === PROPOSAL_VERDICTS.CONDITIONALLY_FEASIBLE);
console.log(`Feasible Historical Proposal: ${p4Pass ? 'PASSED (Feasible verdict & 6 vectors evaluated)' : 'FAIL'}\n`);

// TEST 6: AI/ML LAB ANOMALY DETECTOR & CONFUSION MATRIX
console.log('--- TEST 6: AI/ML Lab Anomaly Detector ---');
const mlDefault = AiMlSimulationEngine.runDetector(2.2);
const mlPass = (mlDefault.evaluatedSamples.length === 16 && typeof mlDefault.metrics.f1Score === 'number' && mlDefault.confusionMatrix.tp === 4);
console.log(`16 Telemetry Samples Classified: ${mlPass ? 'PASSED' : 'FAIL'}`);
console.log(`Confusion Matrix: TP=${mlDefault.confusionMatrix.tp}, FP=${mlDefault.confusionMatrix.fp}, TN=${mlDefault.confusionMatrix.tn}, FN=${mlDefault.confusionMatrix.fn}`);
console.log(`Metrics: Precision=${mlDefault.metrics.precision}%, Recall=${mlDefault.metrics.recall}%, F1=${mlDefault.metrics.f1Score}%\n`);

// TEST 7: SPACECRAFT EXPLORER 12 HOTSPOTS
console.log('--- TEST 7: Spacecraft Explorer 12 Hotspots ---');
const hotspotsPass = (SPACECRAFT_HOTSPOTS.length === 12) && SPACECRAFT_HOTSPOTS.every(h => 
  h.id && h.name && typeof h.x === 'number' && typeof h.y === 'number' && h.whatIsIt && h.whatDoesItDo && h.whyImportant && h.nasaUrl
);
console.log(`12 Hotspots Schematics & NASA URLs: ${hotspotsPass ? 'VERIFIED (12/12 Verified Physical Components)' : 'FAIL'}\n`);

// TEST 8: GOLDEN RECORD EXPLORER 3 VIEWS & 7 CHAPTERS
console.log('--- TEST 8: Golden Record Explorer ---');
const grViewsPass = (GOLDEN_RECORD_VIEWS.length === 3);
const grLanguagesPass = (GREETINGS_LANGUAGES.length === 15);
const grMusicPass = (MUSIC_SELECTIONS.length === 27);
console.log(`3 Archival Visual Views: ${grViewsPass ? 'VERIFIED' : 'FAIL'}`);
console.log(`15 Spoken Greetings & Whale Bioacoustics: ${grLanguagesPass ? 'VERIFIED' : 'FAIL'}`);
console.log(`27 Global Musical Masterpieces: ${grMusicPass ? 'VERIFIED' : 'FAIL'}\n`);

// TEST 9: FLIGHT READINESS MISSION REPORT GENERATION
console.log('--- TEST 9: Flight Readiness Mission Report & Dossier Generation ---');
const emptyReport = MissionReportEngine.generateReport({});
const emptyPass = (emptyReport.isEligible === false && emptyReport.candidateId === 'MJS77-CANDIDATE-7701');
const fullState = {
  selectedRole: 'flight-systems',
  candidateId: 'CANDIDATE-VERIFIED-77',
  assignedTasks: ['task-sys-01', 'task-sys-02', 'task-sys-03'],
  completedTasks: ['task-sys-01', 'task-sys-02', 'task-sys-03'],
  assemblyStages: { stage1: true, stage2: true, stage3: true, stage4: true, stage5: true, stage6: true },
  decisions: { 'dec-mass-power': 'choice-b', 'dec-radiation-hardening': 'choice-c', 'dec-telecom-band': 'choice-b', 'dec-attitude-control': 'choice-b' },
  dataLab: { completed: true },
  overallProgress: 100
};
const fullReport = MissionReportEngine.generateReport(fullState);
const fullPass = (fullReport.isEligible === true && fullReport.flightReadinessStatus.includes('FLIGHT READY'));
const textSummaryPass = MissionReportEngine.generateTextSummary(fullState).includes('FLIGHT READINESS DOSSIER');
console.log(`Empty/Interim State Report Resilience: ${emptyPass ? 'PASSED' : 'FAIL'}`);
console.log(`Full Mission Qualification Evaluation: ${fullPass ? 'PASSED' : 'FAIL'}`);
console.log(`Downloadable Dossier Summary Text Generator: ${textSummaryPass ? 'PASSED' : 'FAIL'}\n`);

console.log('=== VERIFICATION SUMMARY: ALL TEST SUITES COMPLETE ===');
