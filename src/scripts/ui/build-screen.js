/**
 * Voyager 1 — Build Experience Screen Controller
 * 
 * Manages the interactive educational simulation inside #view-page-build:
 * - Sub-Navigation tabs & deep hash routes
 * - Mission Control Dashboard (Role selection, real-time progress telemetry)
 * - Task Engine (Interactive choice submission & rule-based validation)
 * - Spacecraft Component Research & Selector
 * - 6-Stage Sequential Assembly Workflow
 * - Engineering Decision Chamber (Historical trade-offs & consequences)
 * - Scientific Laboratories (Data Lab, Coding Challenges, AI/ML Simulation)
 * - Mission Completion Evaluation & Flight Readiness Certificate Generator
 */

import { missionStore } from '../core/mission-state.js';
import { ENGINEERING_ROLES } from '../tasks/roles-data.js';
import { TaskEngine } from '../tasks/task-engine.js';
import { SPACECRAFT_COMPONENTS } from '../simulation/components-data.js';
import { ASSEMBLY_STAGES } from '../simulation/assembly-workflow.js';
import { ENGINEERING_DECISIONS, DecisionEngine } from '../simulation/decision-engine.js';
import { DataLabEngine } from '../labs/data-lab.js';
import {
  REAL_TRAJECTORY_EPHEMERIS,
  REAL_MAG_1977,
  REAL_PLS_1977,
  REAL_CRS_1977,
  REAL_LECP_1977,
  REAL_PWS_LAUNCH_SPECTRUM,
  DATASET_METADATA
} from '../labs/historical-data.js';
import { CODING_CHALLENGES } from '../labs/code-lab.js';
import { AiMlSimulationEngine } from '../labs/aiml-lab.js';
import { MathLabEngine } from '../labs/math-lab.js';
import { GraphLabEngine } from '../labs/graph-lab.js';
import { MissionReportEngine } from '../completion/mission-report.js';
import { getImageManifestById } from '../../config/image-manifest.js';
import { UnlockEngine } from '../core/unlock-engine.js';
import { announceForScreenReader } from './router.js';

export const LAUNCH_EVENTS = [
  {
    step: 1,
    time: "T-00:00:00",
    name: "LIFTOFF // TITAN IIIE STAGE 0 IGNITION",
    facility: "Cape Canaveral Air Force Station &bull; Launch Complex 41 (LC-41)",
    date: "September 5, 1977 &bull; 12:56:01 UTC",
    altitudeKm: 0,
    velocityKmh: 0,
    accelG: "1.2 G",
    thrustLbf: "2,400,000 lbs (10.7 MN)",
    status: "LIFTOFF COMMENCED",
    summary: "Twin United Technologies 5-segment solid rocket boosters (Stage 0) ignite simultaneously, lifting the 633-metric-ton Titan IIIE-Centaur stack off Pad 41.",
    technicalDetail: "Because the core Titan liquid stage is ignited in-flight at altitude, initial liftoff thrust is provided entirely by the two 120-inch solid rocket motors, producing 2.4 million pounds of thrust.",
    milestone: "Mission Elapsed Time begins. Titan acoustic vibrations exceed 145 dB."
  },
  {
    step: 2,
    time: "T+00:02:04",
    name: "STAGE 0 SOLID BOOSTER BURNOUT & JETTISON",
    facility: "Transonic Ascent &bull; Atlantic Ocean Corridor",
    date: "September 5, 1977 &bull; 12:58:05 UTC",
    altitudeKm: 48,
    velocityKmh: 6300,
    accelG: "2.8 G",
    thrustLbf: "915,000 lbs (Core Stage 1)",
    status: "SRB JETTISON CONFIRMED",
    summary: "Solid rocket motor chambers depressurize. 8 pyrotechnic staging squibs fire, and staging thrusters push the empty booster casings away from the core stack.",
    technicalDetail: "Aerojet LR87-AJ-11 twin liquid propellant engines burning Aerozine 50 and nitrogen tetroxide (N2O4) ignite 12 seconds prior to booster burnout for seamless thrust continuity.",
    milestone: "Booster separation clean. Dynamic pressure (Max-Q) successfully cleared."
  },
  {
    step: 3,
    time: "T+00:04:38",
    name: "STAGE 1 SEPARATION & STAGE 2 IGNITION",
    facility: "Upper Stratosphere &bull; Exo-Atmospheric Interface",
    date: "September 5, 1977 &bull; 13:00:39 UTC",
    altitudeKm: 130,
    velocityKmh: 14800,
    accelG: "1.9 G",
    thrustLbf: "100,000 lbs (Stage 2 LR91)",
    status: "STAGE 2 CORE BURN",
    summary: "Stage 1 shuts down and separates. The single Aerojet LR91-AJ-11 liquid upper stage engine ignites to accelerate the stack toward orbital velocity.",
    technicalDetail: "LR91 provides 100,000 lbs of vacuum thrust, burning for 209 seconds to raise the stack to orbital injection altitude.",
    milestone: "Exo-atmospheric flight envelope achieved. Aerodynamic atmospheric drag decreases to zero."
  },
  {
    step: 4,
    time: "T+00:04:55",
    name: "TITAN IIIE CENTAUR SHROUD (FAIRING) JETTISON",
    facility: "Exo-Atmosphere &bull; Altitude 165 km",
    date: "September 5, 1977 &bull; 13:00:56 UTC",
    altitudeKm: 165,
    velocityKmh: 18500,
    accelG: "2.1 G",
    thrustLbf: "100,000 lbs",
    status: "FAIRING SEPARATED",
    summary: "The 4.27-meter diameter Centaur payload fairing pyrotechnically unzips along its longitudinal seams and splits into two halves, jettisoning into space.",
    technicalDetail: "Voyager 1's 3.7-meter High-Gain Antenna, stowed RTG booms, and folded 13-meter Astromast magnetometer boom are exposed directly to the vacuum of space for the first time.",
    milestone: "Payload fairing clear. Zero structural damage to High-Gain Antenna parabolic dish."
  },
  {
    step: 5,
    time: "T+00:05:25",
    name: "CENTAUR D-1T UPPER STAGE FIRST BURN // PARKING ORBIT",
    facility: "Low Earth Orbit (LEO) Insertion",
    date: "September 5, 1977 &bull; 13:01:26 UTC",
    altitudeKm: 167,
    velocityKmh: 28100,
    accelG: "1.4 G",
    thrustLbf: "30,000 lbs (Dual RL-10A-3-3)",
    status: "LEO PARKING ORBIT INSERTION",
    summary: "Dual Pratt & Whitney RL-10 cryogenic liquid hydrogen / liquid oxygen (LH2/LOX) engines ignite for their first burn, inserting Voyager 1 into a 167-km circular parking orbit.",
    technicalDetail: "Specific impulse of RL-10 reaches a phenomenal 444 seconds. Centaur coasts silently across the North Atlantic and Mediterranean while tracking stations calculate second-burn ignition vectors.",
    milestone: "Spacecraft safely in Earth parking orbit. Telemetry verified nominal by Bermuda Tracking Station."
  },
  {
    step: 6,
    time: "T+00:54:12",
    name: "CENTAUR SECOND BURN & STAR-37E SOLID KICK MOTOR",
    facility: "Trans-Jupiter Injection &bull; Indian Ocean Corridor",
    date: "September 5, 1977 &bull; 13:50:13 UTC",
    altitudeKm: 250,
    velocityKmh: 36000,
    accelG: "3.6 G",
    thrustLbf: "15,000 lbs (Star-37E Kick Motor)",
    status: "HYPERBOLIC ESCAPE VELOCITY ACHIEVED",
    summary: "Over the Indian Ocean, Centaur reignites its RL-10 engines for Trans-Jupiter Injection, followed by ignition of the Thiokol TE-M-364-4 (Star-37E) solid rocket propulsion stage.",
    technicalDetail: "The combined burns impart a characteristic energy (C3) of 105.5 km²/s², hurling Voyager 1 onto an asymptotic escape trajectory directly toward Jupiter.",
    milestone: "Hyperbolic Earth Escape achieved! Voyager 1 is moving at over 36,000 km/h (10 km/s)."
  },
  {
    step: 7,
    time: "T+01:05:00",
    name: "SPACECRAFT SEPARATION FROM LAUNCH VEHICLE ADAPTER",
    facility: "Deep Space Departure &bull; Trans-Jupiter Trajectory",
    date: "September 5, 1977 &bull; 14:01:01 UTC",
    altitudeKm: 1200,
    velocityKmh: 36200,
    accelG: "0.0 G (Free Fall)",
    thrustLbf: "0.2 lbf (Hydrazine RCS)",
    status: "SPACECRAFT SEPARATED // AUTONOMOUS FLIGHT",
    summary: "Pyrotechnic marman clamp ring releases the spacecraft from the conical Launch Vehicle Adapter. Separation springs impart a 1.0 m/s separation velocity.",
    technicalDetail: "Voyager 1's Computer Command Subsystem (CCS) wakes from launch mode. Catalytic monopropellant hydrazine thrusters pulse autonomously to nullify tip-off angular rates.",
    milestone: "Voyager 1 is now a free-flying independent spacecraft. Launch vehicle mission complete."
  },
  {
    step: 8,
    time: "T+01:15:00",
    name: "BOOM DEPLOYMENTS & FIRST DSN TELEMETRY ACQUISITION",
    facility: "NASA Deep Space Network DSS-14 Goldstone &bull; Mojave Desert, CA",
    date: "September 5, 1977 &bull; 14:11:01 UTC",
    altitudeKm: 2400,
    velocityKmh: 36400,
    accelG: "0.0 G",
    thrustLbf: "16x Catalytic Thrusters",
    status: "MISSION SUCCESS // CRUISE TO JUPITER",
    summary: "Pyrotechnic latches fire sequentially: the 3 MHW-RTGs swing out on their nuclear boom; the 13-meter Astromast magnetometer boom uncoils into the vacuum; and the 2-axis scan platform unlatches.",
    technicalDetail: "The 3.7-meter High-Gain Antenna establishes radio lock with the 64-meter parabolic dish at Goldstone DSS-14. First S-band engineering telemetry confirms all 10 bays healthy.",
    milestone: "The Journey to the Outer Planets begins. Next major encounter: Jupiter, March 5, 1979."
  }
];

export function initBuildScreen(scrollController) {
  const container = document.getElementById('view-page-build');
  if (!container) return;

  window.__missionStore = missionStore;

  let activeTab = 'dashboard';
  let activeLab = 'data'; // 'data' | 'math' | 'graph' | 'code' | 'aiml'
  let activeChallengeId = 'challenge-latency';
  let activeMathExerciseId = 'math-ex-latency';
  let activeGraphDatasetId = 'ds-trajectory';
  let activeGraphType = 'line'; // 'line' | 'bar' | 'scatter' | 'time-series'
  let selectedGraphTaskAnswer = {};
  let selectedTaskAnswer = {};
  let activeProposalReview = null;
  let editingProposal = null;
  let currentLaunchStep = 0;
  let activeDataLabMode = 'real'; // 'real' | 'simulated'
  let activeRealDatasetKey = 'trajectory'; // 'trajectory' | 'mag' | 'pls' | 'crs' | 'lecp' | 'pws'
  let realDatasetPage = 0;
  const REAL_PAGE_SIZE = 15;
  let trajectoryScrubIndex = 0;
  let trajectoryStartYear = 1977;
  let trajectoryEndYear = 2005;
  let codeLabHintsRevealed = {};
  let enableAiMlNoise = false;

  // Find or mount the subnav bar and content slots
  let subnavBar = container.querySelector('.build-subnav-bar');
  let dynamicContainer = container.querySelector('#build-dynamic-content');

  if (!dynamicContainer) {
    // Inject the subnav and dynamic container right after the hero deck
    const heroDeck = container.querySelector('.build-hero-deck');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <!-- Sub-Navigation Strip -->
      <nav class="build-subnav-bar" role="tablist" aria-label="Build Experience Sections">
        <button class="subnav-tab-btn active" data-tab="dashboard" type="button" role="tab">
          <span>01 // MISSION DASHBOARD</span>
        </button>
        <button class="subnav-tab-btn" data-tab="tasks" type="button" role="tab">
          <span>02 // ASSIGNED TASKS</span>
          <span class="tab-badge" id="badge-tasks-count">0/3</span>
        </button>
        <button class="subnav-tab-btn" data-tab="assembly" type="button" role="tab">
          <span>03 // SPACECRAFT ASSEMBLY</span>
          <span class="tab-badge" id="badge-assembly-count">0/6</span>
        </button>
        <button class="subnav-tab-btn" data-tab="components" type="button" role="tab">
          <span>04 // COMPONENT RESEARCH</span>
        </button>
        <button class="subnav-tab-btn" data-tab="decisions" type="button" role="tab">
          <span>05 // TRADE-OFF DECISIONS</span>
          <span class="tab-badge" id="badge-decisions-count">0/4</span>
        </button>
        <button class="subnav-tab-btn" data-tab="labs" type="button" role="tab">
          <span>06 // SCIENTIFIC LABS</span>
          <span class="tab-badge" id="badge-labs-status">5 LABS</span>
        </button>
        <button class="subnav-tab-btn" data-tab="completion" type="button" role="tab">
          <span>07 // FLIGHT READINESS</span>
          <span class="tab-badge" id="badge-completion-status">INCOMPLETE</span>
        </button>
        <button class="subnav-tab-btn" data-tab="launch" type="button" role="tab">
          <span>08 // LAUNCH SEQUENCE</span>
          <span class="tab-badge" id="badge-launch-status">T-0</span>
        </button>
      </nav>

      <!-- Dynamic Content View Holder -->
      <div id="build-dynamic-content" class="build-dynamic-content"></div>
    `;

    if (heroDeck && heroDeck.nextSibling) {
      heroDeck.parentNode.insertBefore(wrapper, heroDeck.nextSibling);
    } else {
      container.appendChild(wrapper);
    }

    subnavBar = container.querySelector('.build-subnav-bar');
    dynamicContainer = container.querySelector('#build-dynamic-content');
  }

  // -------------------------------------------------------------------------
  // Sub-Navigation Tab Switching
  // -------------------------------------------------------------------------
  function switchTab(tabKey) {
    activeTab = tabKey;
    container.querySelectorAll('.subnav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabKey);
    });
    renderCurrentTab();

    const tabLabels = {
      'dashboard': 'Build Workspace: Mission Control Dashboard',
      'tasks': 'Build Workspace: Engineering Tasks & Quizzes',
      'assembly': 'Build Workspace: 6-Stage Spacecraft Assembly Flow',
      'components': 'Build Workspace: Subsystem Components Dossier',
      'decisions': 'Build Workspace: Historical Decision Chamber',
      'labs': 'Build Workspace: Scientific Laboratories',
      'completion': 'Build Workspace: Flight Qualification & Certificate'
    };
    if (tabLabels[tabKey]) {
      announceForScreenReader(tabLabels[tabKey]);
    }
  }
  window.__switchBuildTab = switchTab;

  if (subnavBar) {
    subnavBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.subnav-tab-btn');
      if (btn) {
        const tab = btn.getAttribute('data-tab');
        switchTab(tab);
      }
    });
  }

  // -------------------------------------------------------------------------
  // Reactive Render Dispatcher
  // -------------------------------------------------------------------------
  function renderCurrentTab() {
    if (!dynamicContainer) return;
    const state = missionStore.getState();

    // Update Tab Badges
    const badgeTasks = container.querySelector('#badge-tasks-count');
    if (badgeTasks) {
      badgeTasks.textContent = `${(state.completedTasks || []).length}/${(state.assignedTasks || []).length}`;
    }

    const badgeAssembly = container.querySelector('#badge-assembly-count');
    if (badgeAssembly) {
      const assembledCount = Object.values(state.assemblyStages || {}).filter(Boolean).length;
      badgeAssembly.textContent = `${assembledCount}/6`;
    }

    const badgeDecisions = container.querySelector('#badge-decisions-count');
    if (badgeDecisions) {
      const decCount = Object.keys(state.decisions || {}).length;
      badgeDecisions.textContent = `${decCount}/4`;
    }

    const badgeComp = container.querySelector('#badge-completion-status');
    if (badgeComp) {
      badgeComp.textContent = state.missionStatus === 'completed' ? 'CERTIFIED' : `${state.overallProgress}%`;
    }

    switch (activeTab) {
      case 'dashboard':
        renderDashboard(state);
        break;
      case 'tasks':
        renderTasks(state);
        break;
      case 'assembly':
        renderAssembly(state);
        break;
      case 'components':
        renderComponents(state);
        break;
      case 'decisions':
        renderDecisions(state);
        break;
      case 'labs':
        renderLabs(state);
        break;
      case 'completion':
        renderCompletion(state);
        break;
      case 'launch':
        renderLaunchSequence(state);
        break;
      default:
        renderDashboard(state);
    }
  }

  // -------------------------------------------------------------------------
  // 1. DASHBOARD VIEW (Role Selection, Telemetry Meters, Reset)
  // -------------------------------------------------------------------------
  function renderDashboard(state) {
    const currentRole = ENGINEERING_ROLES.find(r => r.id === state.selectedRole) || null;
    const breakdown = state.progressBreakdown || {};

    dynamicContainer.innerHTML = `
      <div class="dashboard-grid">
        <!-- Left: Telemetry & Status -->
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <h3 class="dashboard-card-title">
              <span class="phase-led" aria-hidden="true"></span>
              <span>MISSION CONTROL TELEMETRY &bull; STATUS REPORT</span>
            </h3>
            <span class="page-meta-badge">
              <span class="badge-led"></span>
              CANDIDATE: ${state.candidateId}
            </span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 0.5rem;">
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: #fbbf24;">OVERALL FLIGHT QUALIFICATION</span>
            <span style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: #ffffff;">${state.overallProgress}%</span>
          </div>
          <div class="progress-telemetry-bar">
            <div class="progress-fill" style="width: ${state.overallProgress}%;"></div>
          </div>

          <!-- 4 Progress Categories -->
          <div class="progress-metrics-row">
            <div class="metric-pill">
              <div class="metric-pill-label">Tasks (35%)</div>
              <div class="metric-pill-val">${breakdown.tasks?.score || 0} pts</div>
              <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.2rem;">${(state.completedTasks || []).length}/${(state.assignedTasks || []).length} Verified</div>
            </div>
            <div class="metric-pill">
              <div class="metric-pill-label">Assembly (30%)</div>
              <div class="metric-pill-val">${breakdown.assembly?.score || 0} pts</div>
              <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.2rem;">${breakdown.assembly?.stagesCompleted || 0}/6 Stages</div>
            </div>
            <div class="metric-pill">
              <div class="metric-pill-label">Decisions (15%)</div>
              <div class="metric-pill-val">${breakdown.decisions?.score || 0} pts</div>
              <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.2rem;">${breakdown.decisions?.decisionsCount || 0}/4 Resolved</div>
            </div>
            <div class="metric-pill">
              <div class="metric-pill-label">Labs (20%)</div>
              <div class="metric-pill-val">${breakdown.labs?.score || 0} pts</div>
              <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.2rem;">${breakdown.labs?.labCount || 0}/3 Completed</div>
            </div>
          </div>

          <!-- Active Role Display -->
          <div style="margin-top: 2rem; padding: 1.25rem; background: rgba(8, 12, 22, 0.7); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
              <span style="font-family: var(--font-mono); font-size: 0.725rem; color: #f59e0b; font-weight: 700;">ASSIGNED ENGINEERING ROLE:</span>
              <span class="role-badge">${currentRole ? currentRole.badgeCode : 'UNASSIGNED'}</span>
            </div>
            <div style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: #ffffff;">
              ${currentRole ? currentRole.title : 'No Role Selected — Please Choose Below'}
            </div>
            ${currentRole ? `
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; margin-top: 0.35rem;">
                ${currentRole.division} &bull; ${currentRole.facility}
              </div>
              <div style="font-size: 0.8rem; font-style: italic; color: #94a3b8; margin-top: 0.25rem;">
                "${currentRole.tagline}"
              </div>
            ` : ''}
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.5;">
              ${currentRole ? currentRole.description : 'Select one of the four verified 1977 JPL engineering roles below to receive your personalized task assignments.'}
            </p>

            ${currentRole ? `
              <!-- All 4 Responsibilities -->
              <div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px solid rgba(245, 158, 11, 0.15);">
                <div style="font-family: var(--font-mono); font-size: 0.725rem; color: #f59e0b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.4rem;">
                  Core Flight Responsibilities [4 of 4]:
                </div>
                <ul style="padding-left: 1.25rem; margin: 0; font-size: 0.8rem; color: #cbd5e1; line-height: 1.6;">
                  ${currentRole.responsibilities.map(r => `<li>${r}</li>`).join('')}
                </ul>
              </div>

              <!-- All 3 Learning Objectives -->
              <div style="margin-top: 0.85rem; padding-top: 0.85rem; border-top: 1px solid rgba(56, 189, 248, 0.15);">
                <div style="font-family: var(--font-mono); font-size: 0.725rem; color: #38bdf8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.4rem;">
                  Key Engineering Learning Objectives [3 of 3]:
                </div>
                <ul style="padding-left: 1.25rem; margin: 0; font-size: 0.8rem; color: #e0f2fe; line-height: 1.6;">
                  ${currentRole.learningObjectives.map(o => `<li>${o}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>

          <!-- Quick Navigation Actions -->
          <div style="display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;">
            <button id="btn-quick-to-tasks" class="btn-assemble-stage" type="button">
              GO TO ASSIGNED TASKS &rarr;
            </button>
            <button id="btn-quick-to-assembly" class="btn-assemble-stage" style="background: rgba(14, 18, 30, 0.85); color: #fbbf24;" type="button">
              ASSEMBLY WORKSHOP &rarr;
            </button>
          </div>
        </div>

        <!-- Right: Reset & Quick Mission Directives -->
        <div class="dashboard-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="dashboard-card-header">
              <h3 class="dashboard-card-title">
                <span class="spec-led"></span>
                <span>MISSION PROTOCOLS</span>
              </h3>
            </div>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.825rem; color: var(--text-secondary); line-height: 1.8;">
              <li><strong style="color: #fbbf24;">1.</strong> Select an Engineering Role.</li>
              <li><strong style="color: #fbbf24;">2.</strong> Validate all role-specific engineering tasks.</li>
              <li><strong style="color: #fbbf24;">3.</strong> Execute the 6-stage sequential assembly.</li>
              <li><strong style="color: #fbbf24;">4.</strong> Resolve all 4 historical trade-off dilemmas.</li>
              <li><strong style="color: #fbbf24;">5.</strong> Conduct scientific analysis in the Labs.</li>
              <li><strong style="color: #fbbf24;">6.</strong> Receive Titan IIIE Flight Readiness Certification.</li>
            </ul>
          </div>

          <div style="margin-top: 2rem; padding-top: 1.25rem; border-top: 1px dashed rgba(245, 158, 11, 0.25);">
            <div style="font-family: var(--font-mono); font-size: 0.725rem; color: #94a3b8; margin-bottom: 0.5rem;">SESSION PERSISTENCE:</div>
            <div style="font-size: 0.775rem; color: #cbd5e1; margin-bottom: 1rem;">Progress automatically saved to browser storage.</div>
            <button id="btn-reset-mission" type="button" style="padding: 0.6rem 1rem; font-family: var(--font-mono); font-size: 0.75rem; background: rgba(239, 68, 68, 0.12); border: 1px solid #ef4444; color: #fca5a5; border-radius: 3px; cursor: pointer;">
              [RESET ALL SAVED PROGRESS]
            </button>
          </div>
        </div>
      </div>

      <!-- Role Assignment Confirmation Banner (Active when a role is selected) -->
      ${currentRole ? `
        <div id="role-confirmation-banner" style="margin-top: 2rem; padding: 1.75rem; background: radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.15) 0%, rgba(8, 12, 22, 0.95) 100%); border: 1px solid rgba(16, 185, 129, 0.45); border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.5rem;">
                <span class="phase-led" style="background: #10b981; box-shadow: 0 0 8px #10b981;"></span>
                <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #10b981; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">
                  ROLE ASSIGNMENT CONFIRMED // ACTIVE JPL FLIGHT BADGE: ${currentRole.badgeCode}
                </span>
              </div>
              <h3 style="font-family: var(--font-heading); font-size: 1.35rem; color: #ffffff; margin: 0 0 0.4rem 0; font-weight: 700;">
                ${currentRole.title}
              </h3>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; margin-bottom: 0.75rem;">
                ${currentRole.division} &bull; ${currentRole.facility}
              </div>
              <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.55; margin: 0 0 1rem 0; max-width: 720px;">
                ${currentRole.description}
              </p>
              
              <!-- Assigned Topics Preview -->
              <div style="margin-top: 0.75rem;">
                <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #f59e0b; font-weight: 700; text-transform: uppercase; margin-bottom: 0.4rem;">
                  ASSIGNED TOPICS FOR THIS ROLE:
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                  ${(currentRole.topics || []).map(t => `
                    <span style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); padding: 0.3rem 0.6rem; border-radius: 3px; font-family: var(--font-mono); font-size: 0.72rem; color: #fef08a;">
                      &bull; ${t.title}
                    </span>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Action Buttons for Selected Role -->
            <div style="display: flex; flex-direction: column; gap: 0.75rem; min-width: 240px;">
              <button id="btn-open-role-workspace" class="btn-assemble-stage" type="button" style="padding: 0.85rem 1.25rem; font-size: 0.85rem; background: #10b981; border-color: #10b981; color: #020409; font-weight: 700;">
                OPEN DEDICATED WORKSPACE &rarr;
              </button>
              <button id="btn-change-role" type="button" style="padding: 0.55rem 1rem; font-family: var(--font-mono); font-size: 0.72rem; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.2); color: #cbd5e1; border-radius: 3px; cursor: pointer;">
                &larr; Choose a Different Role
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Role Selection Section -->
      <div class="build-section-heading" style="margin-top: 2.5rem;">
        <span class="phase-led"></span>
        <h3 class="build-section-title">CHOOSE YOUR 1977 JPL ENGINEERING ROLE</h3>
        <span class="build-section-meta">[4 AUTHENTIC SAF BLDG 179 DIVISIONS]</span>
      </div>

      <div class="roles-grid">
        ${ENGINEERING_ROLES.map(role => `
          <div class="role-card ${state.selectedRole === role.id ? 'selected' : ''}" data-role-id="${role.id}">
            <div>
              <div class="role-header">
                <span class="role-badge">${role.badgeCode}</span>
                ${state.selectedRole === role.id ? '<span style="color: #10b981; font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700;">ACTIVE ASSIGNMENT</span>' : ''}
              </div>
              <h4 class="role-title">${role.title}</h4>
              <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #fbbf24; margin-bottom: 0.75rem;">${role.division}</div>
              <p class="role-desc">${role.description}</p>
              
              <!-- Assigned Topics (Priority Requirement) -->
              <div style="margin: 0.75rem 0; padding-top: 0.5rem; border-top: 1px dashed rgba(245, 158, 11, 0.25);">
                <div style="font-family: var(--font-mono); font-size: 0.6875rem; color: #f59e0b; font-weight: 700; text-transform: uppercase;">Assigned Topics [3]:</div>
                <ul style="padding-left: 1.2rem; margin: 0.4rem 0; font-size: 0.75rem; color: #fef08a; line-height: 1.5;">
                  ${(role.topics || []).map(t => `<li><strong>${t.title}</strong></li>`).join('')}
                </ul>
              </div>

              <!-- All 3 Learning Objectives -->
              <div style="margin: 0.75rem 0; padding-top: 0.5rem; border-top: 1px dashed rgba(56, 189, 248, 0.2);">
                <div style="font-family: var(--font-mono); font-size: 0.6875rem; color: #38bdf8; font-weight: 700; text-transform: uppercase;">Learning Objectives [3 of 3]:</div>
                <ul style="padding-left: 1.2rem; margin: 0.4rem 0; font-size: 0.75rem; color: #bae6fd; line-height: 1.5;">
                  ${role.learningObjectives.map(o => `<li>${o}</li>`).join('')}
                </ul>
              </div>

              <!-- Assigned Activities Preview -->
              <div style="margin: 0.75rem 0; padding-top: 0.5rem; border-top: 1px dashed rgba(16, 185, 129, 0.2);">
                <div style="font-family: var(--font-mono); font-size: 0.6875rem; color: #10b981; font-weight: 700; text-transform: uppercase;">Assigned Activities [3]:</div>
                <ul style="padding-left: 1.2rem; margin: 0.4rem 0; font-size: 0.75rem; color: #cbd5e1; line-height: 1.45;">
                  ${(role.assignedActivities || []).map(a => `<li>Act 0${a.step}: ${a.title}</li>`).join('')}
                </ul>
              </div>
            </div>

            <button class="btn-assemble-stage btn-select-role-card" data-role-id="${role.id}" type="button" style="width: 100%; margin-top: 1rem; ${state.selectedRole === role.id ? 'background: #10b981; border-color: #10b981; color: #020409;' : ''}">
              ${state.selectedRole === role.id ? 'ASSIGNMENT CONFIRMED &bull; OPEN WORKSPACE &rarr;' : 'SELECT THIS ROLE &rarr;'}
            </button>
          </div>
        `).join('')}
      </div>
    `;

    // Attach role click handlers
    dynamicContainer.querySelectorAll('.role-card, .btn-select-role-card').forEach(elem => {
      elem.addEventListener('click', (e) => {
        const roleId = elem.getAttribute('data-role-id');
        if (roleId) {
          missionStore.selectRole(roleId);
          // If already selected or button clicked, open dedicated workspace
          switchTab('tasks');
        }
      });
    });

    // Confirmation banner buttons
    dynamicContainer.querySelector('#btn-open-role-workspace')?.addEventListener('click', () => switchTab('tasks'));
    dynamicContainer.querySelector('#btn-change-role')?.addEventListener('click', () => {
      missionStore.selectRole(null);
    });

    // Quick nav buttons
    dynamicContainer.querySelector('#btn-quick-to-tasks')?.addEventListener('click', () => switchTab('tasks'));
    dynamicContainer.querySelector('#btn-quick-to-assembly')?.addEventListener('click', () => switchTab('assembly'));

    // Reset button with confirmation
    dynamicContainer.querySelector('#btn-reset-mission')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all mission progress, task validations, and assembly records? This action cannot be undone.')) {
        missionStore.resetMission();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 2. TASKS VIEW: DEDICATED ROLE WORKSPACE (7-Step Learning Sequence & Role-Specific Quizzes)
  // -------------------------------------------------------------------------
  function renderTasks(state) {
    if (!state.selectedRole) {
      dynamicContainer.innerHTML = `
        <div class="dashboard-card" style="text-align: center; padding: 3rem;">
          <h3 class="dashboard-card-title" style="justify-content: center; margin-bottom: 1rem;">NO ENGINEERING ROLE SELECTED</h3>
          <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto 1.5rem auto;">
            You must choose an Engineering Role in Mission Control before your dedicated flight hardware workspace and activities can be opened.
          </p>
          <button id="btn-go-to-role-select" class="btn-assemble-stage" type="button">
            GO TO ROLE SELECTION &rarr;
          </button>
        </div>
      `;
      dynamicContainer.querySelector('#btn-go-to-role-select')?.addEventListener('click', () => switchTab('dashboard'));
      return;
    }

    const role = ENGINEERING_ROLES.find(r => r.id === state.selectedRole);
    const tasks = TaskEngine.getTasksByRole(state.selectedRole);
    const completedTasks = state.completedTasks || [];
    const completedRoleTasks = tasks.filter(t => completedTasks.includes(t.id));
    const completionPercent = tasks.length > 0 ? Math.round((completedRoleTasks.length / tasks.length) * 100) : 0;

    const TASK_TO_COMPONENT_MAP = {
      'task-sys-01': 'comp-tank',
      'task-sys-02': 'comp-bus',
      'task-sys-03': 'comp-scan-platform',
      'task-tel-01': 'comp-hga',
      'task-tel-02': 'comp-hga',
      'task-tel-03': 'comp-ccs',
      'task-thp-01': 'comp-thrusters',
      'task-thp-02': 'comp-bus',
      'task-thp-03': 'comp-rtg',
      'task-sci-01': 'comp-astromast',
      'task-sci-02': 'comp-golden-record',
      'task-sci-03': 'comp-vidicon'
    };

    dynamicContainer.innerHTML = `
      <!-- Role Workspace Top Navigation & Header Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem; padding-bottom: 1.25rem; border-bottom: 1px solid rgba(245, 158, 11, 0.25);">
        <button id="btn-back-to-roles" class="btn-assemble-stage" type="button" style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.25); color: #f8fafc; font-size: 0.775rem;">
          <span aria-hidden="true">&larr;</span>
          <span>BACK TO ROLES</span>
        </button>
        <div style="display: flex; align-items: center; gap: 0.6rem; font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24;">
          <span class="phase-led" style="background: #10b981; box-shadow: 0 0 8px #10b981;"></span>
          <span>ACTIVE WORKSPACE // ${role ? role.badgeCode : state.selectedRole.toUpperCase()}</span>
        </div>
      </div>

      <!-- Dedicated Role Dossier Card -->
      ${role ? `
        <div style="background: radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.12) 0%, rgba(8, 12, 22, 0.95) 100%); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 6px; padding: 2rem; margin-bottom: 2.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1.5rem;">
            <div style="max-width: 780px;">
              <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.5rem;">
                <span class="role-badge" style="background: #10b981; color: #020409;">${role.badgeCode}</span>
                <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #6ee7b7; font-weight: 700;">
                  ${role.division}
                </span>
              </div>
              <h2 style="font-family: var(--font-heading); font-size: clamp(1.4rem, 2.5vw, 1.85rem); color: #ffffff; margin: 0 0 0.5rem 0; font-weight: 800;">
                ${role.title}
              </h2>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; margin-bottom: 0.85rem;">
                ${role.facility} &bull; <em>${role.tagline}</em>
              </div>
              <p style="font-size: 0.9rem; color: #cbd5e1; line-height: 1.6; margin: 0 0 1.25rem 0;">
                ${role.description}
              </p>

              <!-- Learning Objectives -->
              <div style="background: rgba(14, 18, 30, 0.75); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 4px; padding: 1rem; margin-bottom: 1rem;">
                <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #38bdf8; font-weight: 700; text-transform: uppercase; margin-bottom: 0.4rem;">
                  LEARNING OBJECTIVES [3 OF 3]:
                </div>
                <ul style="padding-left: 1.2rem; margin: 0; font-size: 0.8rem; color: #bae6fd; line-height: 1.55;">
                  ${role.learningObjectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
              </div>

              <!-- Assigned Topics -->
              <div>
                <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #f59e0b; font-weight: 700; text-transform: uppercase; margin-bottom: 0.4rem;">
                  ASSIGNED TECHNICAL TOPICS [3 OF 3]:
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem;">
                  ${(role.topics || []).map(topic => `
                    <div style="background: rgba(245, 158, 11, 0.08); border-left: 3px solid #f59e0b; padding: 0.6rem 0.85rem; border-radius: 2px;">
                      <div style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24; font-weight: 700; margin-bottom: 0.2rem;">
                        ${topic.title}
                      </div>
                      <div style="font-size: 0.75rem; color: #cbd5e1; line-height: 1.45;">
                        ${topic.summary}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Role Progress Metric Card -->
            <div style="background: rgba(14, 18, 30, 0.9); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 4px; padding: 1.5rem; min-width: 240px; text-align: center;">
              <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem;">
                ROLE CERTIFICATION STATUS
              </div>
              <div style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 800; color: ${completionPercent === 100 ? '#10b981' : '#fbbf24'}; margin-bottom: 0.5rem;">
                ${completionPercent}%
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #cbd5e1; margin-bottom: 1rem;">
                ${completedRoleTasks.length} OF ${tasks.length} ACTIVITIES VALIDATED
              </div>
              <div style="width: 100%; height: 6px; background: rgba(255, 255, 255, 0.1); border-radius: 3px; overflow: hidden; margin-bottom: 1rem;">
                <div style="width: ${completionPercent}%; height: 100%; background: linear-gradient(90deg, #f59e0b, #10b981); transition: width 0.4s ease;"></div>
              </div>
              <span style="display: inline-block; padding: 0.3rem 0.75rem; border-radius: 3px; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; background: ${completionPercent === 100 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'}; color: ${completionPercent === 100 ? '#6ee7b7' : '#fbbf24'}; border: 1px solid ${completionPercent === 100 ? '#10b981' : '#f59e0b'};">
                ${completionPercent === 100 ? '&check; FULLY VALIDATED & CERTIFIED' : 'IN PROGRESS &bull; SOLVE ACTIVITIES'}
              </span>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 7-Step Sequence Activities Header -->
      <div class="build-section-heading">
        <span class="phase-led"></span>
        <h3 class="build-section-title">ROLE ACTIVITIES &amp; 7-STEP LEARNING WORKFLOW</h3>
        <span class="build-section-meta">[${completedRoleTasks.length} OF ${tasks.length} COMPLETED]</span>
      </div>

      <p style="font-size: 0.925rem; color: var(--text-secondary); margin-bottom: 2rem;">
        Each flight activity follows the authentic JPL engineering sequence: <strong>Understand &rarr; Learn &rarr; Perform &rarr; Validate &rarr; Quiz &rarr; Feedback &rarr; Progress</strong>. Submissions are rigorously evaluated against historical physics and mission logs.
      </p>

      <!-- Activities List (7-Step Learning Engine) -->
      <div class="tasks-list">
        ${tasks.map((task, idx) => {
          const isCompleted = completedTasks.includes(task.id);
          const unlockCheck = UnlockEngine.isTaskUnlocked(task, state);
          const submission = state.taskSubmissions[task.id];
          const selectedChoice = selectedTaskAnswer[task.id] || (submission ? submission.answer : null);
          const targetCompId = TASK_TO_COMPONENT_MAP[task.id] || 'comp-bus';

          return `
            <article class="task-item-card ${isCompleted ? 'completed' : ''} ${!unlockCheck.unlocked ? 'locked' : ''}" data-task-id="${task.id}" style="margin-bottom: 2rem;">
              <!-- Header with Activity Step & Status -->
              <div class="task-header" style="padding-bottom: 0.75rem; border-bottom: 1px solid rgba(245, 158, 11, 0.25);">
                <div>
                  <span class="stage-number-badge" style="margin-right: 0.5rem; background: ${isCompleted ? '#10b981' : '#f59e0b'}; color: #020409;">
                    ACTIVITY 0${idx + 1}
                  </span>
                  <span style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24; font-weight: 700;">
                    DIFFICULTY: ${task.difficulty.toUpperCase()}
                  </span>
                </div>
                ${isCompleted ? `
                  <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #10b981; font-weight: 700; display: inline-flex; align-items: center; gap: 0.3rem;">
                    &check; STEP 7 // VALIDATED &amp; RECORDED
                  </span>
                ` : (!unlockCheck.unlocked ? `
                  <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #ef4444;">
                    [LOCKED: ${unlockCheck.reason}]
                  </span>
                ` : `
                  <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #f59e0b;">
                    STEP 3 // PENDING SUBMISSION
                  </span>
                `)}
              </div>

              <!-- Component Research Link -->
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0; padding: 0.6rem 0.85rem; background: rgba(14, 18, 30, 0.6); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 4px;">
                <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #cbd5e1;">
                  REQUIRED SUBSYSTEM TO RESEARCH: <strong>${targetCompId.toUpperCase()}</strong>
                </span>
                <button class="btn-jump-to-comp" data-comp-id="${targetCompId}" type="button" style="padding: 0.35rem 0.75rem; font-family: var(--font-mono); font-size: 0.72rem; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); color: #fbbf24; border-radius: 3px; cursor: pointer;">
                  RESEARCH IN COMPONENT DOSSIER &rarr;
                </button>
              </div>

              <h4 class="task-title" style="margin-top: 0.5rem; font-size: 1.15rem;">
                ${task.title}
              </h4>

              <!-- 7-STEP SEQUENCE BREAKDOWN -->
              <div class="seven-step-sequence-box" style="margin-top: 1rem;">
                <!-- Step 1: Understand -->
                <div style="margin-bottom: 0.85rem; background: rgba(8, 12, 22, 0.75); border-left: 3px solid #38bdf8; padding: 0.75rem 1rem;">
                  <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #38bdf8; font-weight: 700; margin-bottom: 0.25rem;">
                    STEP 1 — UNDERSTAND (MISSION OBJECTIVE &amp; CONSTRAINTS):
                  </div>
                  <div style="font-size: 0.85rem; color: #f8fafc; line-height: 1.55;">
                    ${task.context}
                  </div>
                </div>

                <!-- Step 2: Learn -->
                <div style="margin-bottom: 1.25rem; background: rgba(8, 12, 22, 0.75); border-left: 3px solid #fbbf24; padding: 0.75rem 1rem;">
                  <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #fbbf24; font-weight: 700; margin-bottom: 0.25rem;">
                    STEP 2 — LEARN (TECHNICAL CONTEXT &amp; FORMULAS):
                  </div>
                  <div style="font-size: 0.825rem; color: #cbd5e1; line-height: 1.55;">
                    Historical engineering reference: <em>${task.hint}</em>. Sourced directly from NASA SP-445 and JPL Mariner Jupiter/Saturn 1977 technical directives.
                  </div>
                </div>

                ${unlockCheck.unlocked ? `
                  <!-- Step 3: Perform (Interactive Question & Options) -->
                  <div style="margin-bottom: 1rem;">
                    <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #f59e0b; font-weight: 700; margin-bottom: 0.5rem;">
                      STEP 3 — PERFORM (TECHNICAL CHALLENGE):
                    </div>
                    <div class="task-question" style="font-size: 0.95rem; font-weight: 600; color: #ffffff; margin-bottom: 1rem;">
                      &bull; ${task.question}
                    </div>

                    <!-- Step 5: Quiz Assessment (Selectable Options) -->
                    <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8; font-weight: 700; margin-bottom: 0.4rem;">
                      STEP 5 — QUIZ ASSESSMENT (SELECT YOUR SOLUTION):
                    </div>
                    <div class="task-options-grid">
                      ${task.options.map(opt => `
                        <button class="task-option-btn ${selectedChoice === opt.id ? 'selected' : ''}" data-task-id="${task.id}" data-opt-id="${opt.id}" type="button">
                          <span class="btn-led" style="${selectedChoice === opt.id ? 'background: #fbbf24; box-shadow: 0 0 8px #fbbf24;' : ''}"></span>
                          <span>${opt.label}</span>
                        </button>
                      `).join('')}
                    </div>

                    <!-- Step 4: Validate Action Button -->
                    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-top: 1rem;">
                      <button class="btn-submit-task btn-assemble-stage" data-task-id="${task.id}" type="button" ${!selectedChoice ? 'disabled' : ''} style="background: ${isCompleted ? '#10b981' : 'linear-gradient(180deg, #d97706 0%, #b45309 100%)'}; border-color: ${isCompleted ? '#10b981' : '#fbbf24'};">
                        STEP 4 // ${isCompleted ? 'RE-VALIDATE CALCULATION' : 'SUBMIT CALCULATION FOR VALIDATION'}
                      </button>
                    </div>

                    <!-- Step 6: Feedback & Explanation Box -->
                    ${submission ? `
                      <div class="task-feedback-box ${submission.passed ? 'success' : 'error'}" style="margin-top: 1.25rem;">
                        <div style="font-weight: 700; font-family: var(--font-mono); margin-bottom: 0.35rem; font-size: 0.85rem;">
                          STEP 6 — EVALUATION FEEDBACK: ${submission.feedback}
                        </div>
                        <div style="font-size: 0.85rem; line-height: 1.55;">
                          ${submission.explanation}
                        </div>
                        ${!submission.passed && submission.remediation ? `
                          <div class="task-remediation-box" style="margin-top: 0.75rem; padding: 0.65rem 0.85rem; background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 4px;">
                            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #fca5a5; font-weight: 700;">
                              RECOMMENDED ARCHIVAL REVIEW:
                            </span>
                            <div style="font-size: 0.8rem; color: #fecaca; margin: 0.25rem 0 0.5rem 0; line-height: 1.45;">
                              ${submission.remediation.guidance}
                            </div>
                            <button type="button" class="btn-jump-to-comp" data-comp-id="${submission.remediation.targetCompId}" style="padding: 0.3rem 0.65rem; font-family: var(--font-mono); font-size: 0.7rem; background: rgba(245, 158, 11, 0.2); border: 1px solid #fbbf24; color: #fbbf24; border-radius: 3px; cursor: pointer;">
                              EXAMINE ${submission.remediation.targetCompName.toUpperCase()} DOSSIER &rarr;
                            </button>
                          </div>
                        ` : ''}
                      </div>
                    ` : ''}

                    <!-- Step 7: Progress Award Status -->
                    ${isCompleted ? `
                      <div style="margin-top: 1rem; padding: 0.75rem 1rem; background: rgba(16, 185, 129, 0.12); border: 1px solid #10b981; border-radius: 4px; display: flex; align-items: center; gap: 0.75rem;">
                        <span style="font-size: 1.2rem; color: #10b981;">&check;</span>
                        <div style="font-family: var(--font-mono); font-size: 0.775rem; color: #6ee7b7;">
                          <strong>STEP 7 — PROGRESS CONFIRMED:</strong> Activity 0${idx + 1} passed and permanently recorded in flight dossier.
                        </div>
                      </div>
                    ` : ''}
                  </div>
                ` : `
                  <!-- Locked Prerequisite Box -->
                  <div style="padding: 1.25rem; background: rgba(0, 0, 0, 0.45); border: 1px dashed rgba(245, 158, 11, 0.3); border-radius: 4px; font-family: var(--font-mono); font-size: 0.8rem; color: #a8a29e;">
                    Prerequisite Condition: ${unlockCheck.reason}
                  </div>
                `}
              </div>
            </article>
          `;
        }).join('')}
      </div>

      <!-- Bottom Navigation Button -->
      <div style="display: flex; justify-content: center; margin-top: 2rem; margin-bottom: 3rem;">
        <button id="btn-bottom-back-to-roles" class="btn-assemble-stage" type="button" style="padding: 0.85rem 1.75rem; font-size: 0.85rem;">
          &larr; RETURN TO ROLE SELECTION
        </button>
      </div>
    `;

    // Back to roles listeners
    dynamicContainer.querySelectorAll('#btn-back-to-roles, #btn-bottom-back-to-roles').forEach(btn => {
      btn.addEventListener('click', () => switchTab('dashboard'));
    });

    // Option selection listeners
    dynamicContainer.querySelectorAll('.task-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const taskId = btn.getAttribute('data-task-id');
        const optId = btn.getAttribute('data-opt-id');
        selectedTaskAnswer[taskId] = optId;
        renderTasks(missionStore.getState());
      });
    });

    // Submit calculation listeners
    dynamicContainer.querySelectorAll('.btn-submit-task').forEach(btn => {
      btn.addEventListener('click', () => {
        const taskId = btn.getAttribute('data-task-id');
        const choice = selectedTaskAnswer[taskId];
        if (choice) {
          missionStore.submitTask(taskId, choice);
          renderTasks(missionStore.getState());
        }
      });
    });

    // Jump to component 2-column view
    dynamicContainer.querySelectorAll('.btn-jump-to-comp').forEach(btn => {
      btn.addEventListener('click', () => {
        const compId = btn.getAttribute('data-comp-id');
        missionStore.selectComponent(compId);
        switchTab('components');
        window.scrollTo({ top: 180, behavior: 'smooth' });
      });
    });
  }

  // -------------------------------------------------------------------------
  // 3. ASSEMBLY VIEW (6-Stage Sequential Assembly Workflow)
  // -------------------------------------------------------------------------
  function renderAssembly(state) {
    dynamicContainer.innerHTML = `
      <div class="build-section-heading">
        <span class="phase-led"></span>
        <h3 class="build-section-title">SPACECRAFT ASSEMBLY WORKFLOW // JPL SAF BLDG 179</h3>
        <span class="build-section-meta">[SEQUENTIAL INTEGRATION &bull; 6 STAGES]</span>
      </div>

      <div class="assembly-workflow-controls">
        <div>
          <span style="font-family: var(--font-mono); font-size: 0.725rem; color: #f59e0b; font-weight: 700;">CURRENT ASSEMBLY MILESTONE:</span>
          <div style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: #ffffff;">
            Stage 0${state.currentAssemblyStage} of 6 — ${ASSEMBLY_STAGES[state.currentAssemblyStage - 1]?.title || 'Complete'}
          </div>
        </div>
        <div style="display: flex; gap: 0.75rem; align-items: center;">
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #94a3b8;">Assembly Progress:</span>
          <span style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 800; color: #fbbf24;">
            ${Math.round((Object.values(state.assemblyStages || {}).filter(Boolean).length / 6) * 100)}%
          </span>
        </div>
      </div>

      <div class="assembly-stages-grid">
        ${ASSEMBLY_STAGES.map(stage => {
          const isDone = !!state.assemblyStages[`stage${stage.stageNum}`];
          const unlock = UnlockEngine.isAssemblyStageUnlocked(stage.stageNum, state);
          const components = SPACECRAFT_COMPONENTS.filter(c => stage.componentIds.includes(c.id));

          const stageImageManifest = stage.stageNum === 3 
            ? getImageManifestById('01-stage-03-rtg-installation')
            : (stage.stageNum === 4 ? getImageManifestById('02-stage-04-scan-platform-magnetometer') : null);

          return `
            <article class="assembly-stage-card" style="${isDone ? 'border-color: #10b981; border-left: 4px solid #10b981;' : (!unlock.unlocked ? 'opacity: 0.6;' : '')}">
              <div>
                <div class="stage-card-header">
                  <span class="stage-number-badge">STAGE 0${stage.stageNum}</span>
                  ${isDone ? '<span style="font-family: var(--font-mono); font-size: 0.725rem; color: #10b981; font-weight: 700;">&check; ASSEMBLED &amp; QUALIFIED</span>' : (unlock.unlocked ? '<span style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24;">READY FOR INTEGRATION</span>' : '<span style="font-family: var(--font-mono); font-size: 0.725rem; color: #ef4444;">LOCKED</span>')}
                </div>

                <h4 class="stage-card-title">${stage.title}</h4>
                <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #fbbf24; margin-bottom: 0.5rem;">${stage.facility}</div>
                <p class="stage-card-desc">${stage.summary}</p>

                <div class="stage-spec-box">
                  <div class="stage-spec-label">INTEGRATED FLIGHT COMPONENTS:</div>
                  <div class="stage-spec-val">
                    ${components.map(c => `&bull; <strong>${c.name}</strong> (${c.massKg} kg)`).join('<br>')}
                  </div>
                </div>

                <div class="stage-spec-box" style="margin-top: 0.5rem;">
                  <div class="stage-spec-label">JPL TESTING &amp; QUALIFICATION PROTOCOL:</div>
                  <div class="stage-spec-val">${stage.testingProtocol}</div>
                </div>

                ${stageImageManifest ? `
                  <div class="stage-assigned-image-slot" style="margin-top: 0.75rem; border: 1px dashed rgba(245, 158, 11, 0.4); border-radius: 4px; padding: 0.65rem 0.85rem; background: rgba(8, 12, 22, 0.65);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; gap: 0.5rem;">
                      <span style="font-family: var(--font-mono); font-size: 0.65rem; color: #fbbf24; font-weight: 700;">ASSIGNED ARCHIVE IMAGE // ${stageImageManifest.id}</span>
                      <span style="font-family: var(--font-mono); font-size: 0.625rem; color: #f59e0b; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); padding: 1px 6px; border-radius: 2px;">${stageImageManifest.status}</span>
                    </div>
                    <div style="font-size: 0.75rem; color: #cbd5e1; line-height: 1.4;">
                      <strong>${stageImageManifest.title}:</strong> ${stageImageManifest.description}
                    </div>
                    <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #94a3b8; margin-top: 0.3rem;">
                      Target: <code>${stageImageManifest.expectedPath}</code> &bull; Source: ${stageImageManifest.nasaSource}
                    </div>
                  </div>
                ` : ''}
              </div>

              <div style="margin-top: 1.25rem;">
                <button class="btn-inspect-3d font-mono" data-stage="${stage.stageNum}" type="button" style="width: 100%; margin-bottom: 0.5rem; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.35); color: #fbbf24; padding: 0.45rem 0.75rem; font-size: 0.725rem; border-radius: 3px; cursor: pointer; transition: all 0.2s ease;">
                  &#x25C9; INSPECT 3D SUBSYSTEM &bull; STAGE 0${stage.stageNum}
                </button>
                ${isDone ? `
                  <div style="padding: 0.65rem 1rem; background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 3px; font-family: var(--font-mono); font-size: 0.75rem; color: #a7f3d0; text-align: center;">
                    &check; Hardware Certified for Launch Integration
                  </div>
                ` : `
                  <button class="btn-assemble-stage btn-trigger-assembly" data-stage="${stage.stageNum}" type="button" style="width: 100%;" ${!unlock.unlocked ? 'disabled' : ''}>
                    ${unlock.unlocked ? `EXECUTE STAGE 0${stage.stageNum} ASSEMBLY &rarr;` : `LOCKED: ${unlock.reason}`}
                  </button>
                `}
              </div>
            </article>
          `;
        }).join('')}
      </div>
    `;

    // 3D Subsystem Inspection Listeners (WP-11)
    dynamicContainer.querySelectorAll('.btn-inspect-3d').forEach(btn => {
      btn.addEventListener('click', () => {
        const stageNum = Number(btn.getAttribute('data-stage'));
        let highlightSuccess = false;
        if (window.__starsEngine && typeof window.__starsEngine.highlightAssemblyStage === 'function') {
          highlightSuccess = window.__starsEngine.highlightAssemblyStage(stageNum);
        }

        // Visual feedback on card
        dynamicContainer.querySelectorAll('.assembly-stage-card').forEach(c => c.classList.remove('highlight-active'));
        btn.closest('.assembly-stage-card')?.classList.add('highlight-active');

        // Play feedback tone
        audio.playChirp(840, 0.08);

        // Safe fallback indicator if 3D model is disabled/loading
        if (!highlightSuccess) {
          console.log(`[Assembly 3D] Focusing Stage 0${stageNum} hardware specification (2D Fallback active).`);
        }
      });
    });

    // Assembly execute listeners
    dynamicContainer.querySelectorAll('.btn-trigger-assembly').forEach(btn => {
      btn.addEventListener('click', () => {
        const stageNum = Number(btn.getAttribute('data-stage'));
        const result = missionStore.assembleStage(stageNum);
        if (!result.success) {
          alert(`Assembly Error: ${result.reason}`);
        }
        renderAssembly(missionStore.getState());
      });
    });

    // Keyboard support: 1-6 inspects stages 1-6 when viewing assembly
    if (!window.__assemblyKeyHandlerAttached) {
      window.__assemblyKeyHandlerAttached = true;
      window.addEventListener('keydown', (e) => {
        const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable;
        if (isTyping) return;
        if (activeSubroute === 'assembly') {
          const num = parseInt(e.key, 10);
          if (num >= 1 && num <= 6) {
            const btn = dynamicContainer.querySelector(`.btn-inspect-3d[data-stage="${num}"]`);
            if (btn) {
              btn.click();
              e.preventDefault();
            }
          }
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // 4. COMPONENTS VIEW (Interactive Selector & Deep Research Dossier)
  // Page 2 Layout: <LEFT: TEXT/CONTENT + QUIZ> | <RIGHT: RELEVANT IMAGE>
  // Flow: Study Topic -> Explanation/Research -> Related Quiz -> Next Topic
  // -------------------------------------------------------------------------
  const COMPONENT_TASK_MAP = {
    'comp-bus': 'task-sys-02',
    'comp-tank': 'task-sys-01',
    'comp-hga': 'task-tel-02',
    'comp-rtg': 'task-thp-03',
    'comp-astromast': 'task-sci-01',
    'comp-scan-platform': 'task-sys-03',
    'comp-golden-record': 'task-sci-02',
    'comp-thrusters': 'task-thp-01',
    'comp-ccs': 'task-tel-03',
    'comp-vidicon': 'task-sci-03'
  };

  const COMPONENT_ASSETS = {
    'comp-bus': {
      url: '/assets/images/Voyager Test Model Configuration.jpeg',
      caption: 'Voyager Proof Test Model (PTM) 10-sided decagonal airframe in SAF 179 cleanroom high bay without thermal blankets',
      credit: 'NASA/JPL Spacecraft Assembly Facility (SAF 179)'
    },
    'comp-tank': {
      url: '/assets/images/Voyager Test Model Configuration.jpeg',
      caption: 'Proof Test Model central structural ring and 0.71m spherical titanium hydrazine propellant tank mounting bay',
      credit: 'NASA/JPL SAF 179 Archives'
    },
    'comp-hga': {
      url: '/assets/images/spacecraft-profile.jpg.jpeg',
      caption: '3.7-Meter High-Gain Cassegrain Antenna (HGA) graphite-epoxy reflector & titanium subreflector struts',
      credit: 'NASA/JPL Technical Archives P-18882'
    },
    'comp-rtg': {
      url: '/assets/images/Voyager Spacecraft Testing at JPL.jpg.jpeg',
      caption: 'Voyager RTG thermal qualification and power system checkout inside the 25-Foot Space Simulator (PIA21734)',
      credit: 'NASA/JPL-Caltech Catalog PIA21734'
    },
    'comp-astromast': {
      url: '/assets/images/spacecraft-profile.jpg.jpeg',
      caption: '13-Meter Deployable Astromast Magnetometer Boom extended from spacecraft bus',
      credit: 'NASA/JPL Technical Archives'
    },
    'comp-scan-platform': {
      url: '/assets/images/spacecraft-profile.jpg.jpeg',
      caption: 'Articulated 2-Axis Science Scan Platform mounting optical instruments (Vidicon ISS, IRIS, UVS)',
      credit: 'NASA/JPL Technical Archives'
    },
    'comp-golden-record': {
      url: '/assets/images/pia21740-golden-record-installation.jpg',
      caption: 'NASA JPL technicians mounting the Golden Record and protective uranium-238 cover to Bay 4 of Voyager 1 (1977)',
      credit: 'NASA/JPL-Caltech Catalog PIA21740'
    },
    'comp-thrusters': {
      url: '/assets/images/Voyager\u2019s Launch Vehicle Adapter.jpeg',
      caption: 'Launch Vehicle Adapter interface and attitude-control hydrazine thruster cluster mounting positions',
      credit: 'NASA/JPL / General Dynamics Convair'
    },
    'comp-ccs': {
      url: '/assets/images/Voyager Digital Recorder.jpeg',
      caption: 'Voyager Digital Tape Recorder (DTR) & Computer Command Subsystem (CCS) flight avionics module',
      credit: 'NASA/JPL Subsystem Hardware Archive'
    },
    'comp-vidicon': {
      url: '/assets/images/pia00058-jupiter-red-spot.jpg',
      caption: 'Jupiter Great Red Spot captured by Voyager 1 Narrow-Angle Vidicon Camera with color filter composite',
      credit: 'NASA/JPL-Caltech Catalog PIA00058'
    }
  };

  function renderComponents(state) {
    const selectedComp = SPACECRAFT_COMPONENTS.find(c => c.id === state.selectedComponentId) || SPACECRAFT_COMPONENTS[0];
    const taskId = COMPONENT_TASK_MAP[selectedComp.id];
    const matchingTask = taskId ? TaskEngine.getTaskById(taskId) : null;
    const isCompleted = matchingTask ? (state.completedTasks || []).includes(matchingTask.id) : false;
    const submission = matchingTask ? state.taskSubmissions[matchingTask.id] : null;
    const selectedChoice = matchingTask ? (selectedTaskAnswer[matchingTask.id] || (submission ? submission.answer : null)) : null;
    const imgData = COMPONENT_ASSETS[selectedComp.id] || {
      url: '/assets/images/spacecraft-profile.jpg.jpeg',
      caption: `${selectedComp.name} flight configuration`,
      credit: 'NASA/JPL Archives'
    };

    dynamicContainer.innerHTML = `
      <div class="build-section-heading">
        <span class="phase-led"></span>
        <h3 class="build-section-title">FLIGHT HARDWARE COMPONENT RESEARCH</h3>
        <span class="build-section-meta">[VERIFIED NASA SP-445 SPECIFICATIONS]</span>
      </div>

      <div class="page2-component-wrapper">
        <!-- Subsystem Selector Nav Strip -->
        <div class="page2-subsystem-nav" role="tablist" aria-label="Select Flight Hardware Component">
          ${SPACECRAFT_COMPONENTS.map(comp => {
            const tId = COMPONENT_TASK_MAP[comp.id];
            const isDone = tId && (state.completedTasks || []).includes(tId);
            return `
              <button class="page2-subsystem-pill ${comp.id === selectedComp.id ? 'active' : ''}" data-comp-id="${comp.id}" type="button" role="tab" aria-selected="${comp.id === selectedComp.id}">
                <span class="phase-led" style="${isDone ? 'background: #10b981; box-shadow: 0 0 6px #10b981;' : ''}"></span>
                <span>${comp.name}</span>
                ${isDone ? '<span style="color: #10b981; font-weight: 800; margin-left: 0.25rem;">&check;</span>' : `<span style="font-size: 0.7rem; color: #f59e0b; margin-left: 0.25rem;">${comp.massKg} kg</span>`}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Page 2 Two-Column Stage: <LEFT: TEXT/CONTENT + QUIZ> | <RIGHT: RELEVANT IMAGE> -->
        <div class="page2-two-column-stage">
          <!-- LEFT: TEXT/CONTENT + QUIZ -->
          <div class="page2-content-col">
            <div class="dossier-badge">
              <span class="badge-dot"></span>
              SUBSYSTEM // ${selectedComp.subsystem.toUpperCase()} &bull; STAGE 0${selectedComp.assemblyStage}
            </div>
            <h2 class="dossier-title">${selectedComp.name}</h2>

            <div class="dossier-spec-grid">
              <div class="dossier-spec-item">
                <div class="dossier-spec-label">Flight Component Mass:</div>
                <div class="dossier-spec-val"><strong>${selectedComp.massKg} kg</strong> (~${(selectedComp.massKg * 2.20462).toFixed(1)} lbs)</div>
              </div>
              <div class="dossier-spec-item">
                <div class="dossier-spec-label">Electrical Power Draw:</div>
                <div class="dossier-spec-val"><strong>${selectedComp.powerWatts} Watts</strong> DC</div>
              </div>
            </div>

            <div class="dossier-section-title">&bull; Verified Aerospace Materials:</div>
            <p class="dossier-p">${selectedComp.material}</p>

            <div class="dossier-section-title">&bull; Engineering Purpose &amp; Function:</div>
            <p class="dossier-p">${selectedComp.purpose}</p>

            <div class="dossier-section-title">&bull; Technical Mechanical Specification:</div>
            <p class="dossier-p">${selectedComp.technicalSpec}</p>

            <div class="dossier-section-title">&bull; 1977 Historical Engineering Context:</div>
            <p class="dossier-p">${selectedComp.historicalContext}</p>

            <div class="dossier-section-title">&bull; Role in Voyager 1 Deep-Space Mission:</div>
            <p class="dossier-p">${selectedComp.roleInMission}</p>

            <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed rgba(245, 158, 11, 0.25); font-family: var(--font-mono); font-size: 0.725rem; color: #a8a29e;">
              <strong style="color: #fbbf24;">Archival Documentation References:</strong> ${selectedComp.references.join('; ')}
            </div>

            <!-- INLINE TOPIC QUIZ (Directly following study topic & explanation!) -->
            ${matchingTask ? `
              <div class="inline-topic-quiz-card" data-task-id="${matchingTask.id}">
                <div class="inline-quiz-badge-strip">
                  <div class="inline-quiz-label">
                    <span class="phase-led"></span>
                    <span>TOPIC COMPREHENSION QUIZ // ${matchingTask.title}</span>
                  </div>
                  <span class="inline-quiz-status ${isCompleted ? 'passed' : 'pending'}">
                    ${isCompleted ? '&check; VERIFIED PASSED' : 'PENDING EVALUATION'}
                  </span>
                </div>

                <p class="inline-quiz-context">${matchingTask.context}</p>
                <div class="inline-quiz-question">&bull; ${matchingTask.question}</div>

                <div class="task-options-grid">
                  ${matchingTask.options.map(opt => `
                    <button class="task-option-btn btn-comp-task-opt ${selectedChoice === opt.id ? 'selected' : ''}" data-task-id="${matchingTask.id}" data-opt-id="${opt.id}" type="button">
                      <span class="btn-led" style="${selectedChoice === opt.id ? 'background: #fbbf24;' : ''}"></span>
                      <span>${opt.label}</span>
                    </button>
                  `).join('')}
                </div>

                <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-top: 1.25rem;">
                  <button class="btn-submit-comp-task btn-assemble-stage" data-task-id="${matchingTask.id}" type="button" ${!selectedChoice ? 'disabled' : ''}>
                    SUBMIT CALCULATION FOR VALIDATION
                  </button>
                  <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #94a3b8;">[Hint: ${matchingTask.hint}]</span>
                </div>

                ${submission ? `
                  <div class="task-feedback-box ${submission.passed ? 'success' : 'error'}" style="margin-top: 1.25rem;">
                    <div style="font-weight: 700; font-family: var(--font-mono); margin-bottom: 0.25rem;">
                      ${submission.feedback}
                    </div>
                    <div>${submission.explanation}</div>
                    ${!submission.passed && submission.remediation ? `
                      <div class="task-remediation-box" style="margin-top: 0.75rem; padding: 0.65rem 0.85rem; background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 4px;">
                        <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #fca5a5; font-weight: 700;">
                          RECOMMENDED ARCHIVAL REVIEW:
                        </span>
                        <div style="font-size: 0.8rem; color: #fecaca; margin: 0.25rem 0; line-height: 1.45;">
                          ${submission.remediation.guidance}
                        </div>
                      </div>
                    ` : ''}
                  </div>
                ` : ''}

                ${isCompleted ? `
                  <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed rgba(16, 185, 129, 0.3); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <span style="font-family: var(--font-mono); font-size: 0.8rem; color: #10b981; font-weight: 700;">
                      &check; Subsystem validated. Mission telemetry synchronized.
                    </span>
                    <button class="btn-next-comp btn-assemble-stage" data-current-id="${selectedComp.id}" type="button">
                      CONTINUE TO NEXT COMPONENT &rarr;
                    </button>
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>

          <!-- RIGHT: RELEVANT IMAGE -->
          <div class="page2-image-col">
            <div class="page2-image-frame">
              <img src="${imgData.url}" alt="${selectedComp.name}" class="page2-slot-img" />
              <div class="page2-image-caption">
                <strong style="color: #fbbf24;">${selectedComp.name}:</strong> ${imgData.caption} &bull; ${imgData.credit}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Component picker listeners (top pills)
    dynamicContainer.querySelectorAll('.page2-subsystem-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const compId = btn.getAttribute('data-comp-id');
        missionStore.selectComponent(compId);
        renderComponents(missionStore.getState());
      });
    });

    // Inline task option selection
    dynamicContainer.querySelectorAll('.btn-comp-task-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const taskId = btn.getAttribute('data-task-id');
        const optId = btn.getAttribute('data-opt-id');
        selectedTaskAnswer[taskId] = optId;
        renderComponents(missionStore.getState());
      });
    });

    // Inline task submission
    dynamicContainer.querySelectorAll('.btn-submit-comp-task').forEach(btn => {
      btn.addEventListener('click', () => {
        const taskId = btn.getAttribute('data-task-id');
        const choice = selectedTaskAnswer[taskId];
        if (choice) {
          missionStore.submitTask(taskId, choice);
          renderComponents(missionStore.getState());
        }
      });
    });

    // Advance to next component
    dynamicContainer.querySelectorAll('.btn-next-comp').forEach(btn => {
      btn.addEventListener('click', () => {
        const currentId = btn.getAttribute('data-current-id');
        const curIdx = SPACECRAFT_COMPONENTS.findIndex(c => c.id === currentId);
        const nextIdx = (curIdx + 1) % SPACECRAFT_COMPONENTS.length;
        const nextComp = SPACECRAFT_COMPONENTS[nextIdx];
        missionStore.selectComponent(nextComp.id);
        renderComponents(missionStore.getState());
        window.scrollTo({ top: 180, behavior: 'smooth' });
      });
    });
  }

  // -------------------------------------------------------------------------
  // 5. DECISIONS VIEW (4 Historical Trade-Off Dilemmas)
  // -------------------------------------------------------------------------
  function renderDecisions(state) {
    const decisionsState = state.decisions || {};

    dynamicContainer.innerHTML = `
      <div class="build-section-heading">
        <span class="phase-led"></span>
        <h3 class="build-section-title">ENGINEERING TRADE-OFF DECISION CHAMBER</h3>
        <span class="build-section-meta">[4 CRITICAL 1972–1977 JPL DILEMMAS]</span>
      </div>

      <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 2rem;">
        During the development of Voyager 1, JPL engineers faced severe physical and budgetary dilemmas. Choose how you would resolve each trade-off. Decisions are evaluated against historical consequences and mission survival rules.
      </p>

      <div class="decisions-grid">
        ${ENGINEERING_DECISIONS.map(dec => {
          const resolved = decisionsState[dec.id];

          return `
            <article class="decision-card ${resolved ? 'resolved' : ''}">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <span class="role-badge">DILEMMA RECORD</span>
                  ${resolved ? `<span style="font-family: var(--font-mono); font-size: 0.725rem; color: ${resolved.passed ? '#10b981' : '#ef4444'}; font-weight: 700;">${resolved.passed ? '&check; OPTIMAL RESOLUTION' : '! SUB-OPTIMAL CHOICE'}</span>` : '<span style="font-family: var(--font-mono); font-size: 0.725rem; color: #f59e0b;">UNRESOLVED</span>'}
                </div>

                <h4 style="font-family: var(--font-heading); font-size: 1.15rem; color: #ffffff; margin-bottom: 0.75rem;">${dec.title}</h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
                  ${dec.historicalDilemma}
                </p>

                <!-- WP-12: Decision Chamber Trajectory Graphing -->
                ${DecisionEngine.generateDilemmaChartSvg(dec.id, resolved ? resolved.choiceId : null)}

                <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.25rem;">
                  ${dec.choices.map(choice => `
                    <button class="task-option-btn btn-decision-choice ${resolved && resolved.choiceId === choice.id ? 'selected' : ''}" data-dec-id="${dec.id}" data-choice-id="${choice.id}" type="button">
                      <span class="btn-led" style="${resolved && resolved.choiceId === choice.id ? 'background: #fbbf24;' : ''}"></span>
                      <span style="font-size: 0.8rem; line-height: 1.4;">${choice.label}</span>
                    </button>
                  `).join('')}
                </div>
              </div>

              ${resolved ? `
                <div class="task-feedback-box ${resolved.passed ? 'success' : 'error'}">
                  <div style="font-weight: 700; font-family: var(--font-mono); margin-bottom: 0.25rem;">
                    CONSEQUENCE EVALUATION:
                  </div>
                  <div>${resolved.consequences}</div>
                  <div style="margin-top: 0.5rem; font-size: 0.775rem; color: #cbd5e1;">
                    <strong style="color: #fbbf24;">NASA 1977 Historical Resolution:</strong> ${resolved.historicalContext}
                  </div>
                </div>
              ` : ''}
            </article>
          `;
        }).join('')}
      </div>

      <!-- Free-Form Engineering Proposal Experience (Priority 4) -->
      <div class="build-section-heading" style="margin-top: 3.5rem;">
        <span class="phase-led"></span>
        <h3 class="build-section-title">PROPOSE YOUR OWN ENGINEERING SOLUTION // SAF BLDG 179 DESIGN REVIEW</h3>
        <span class="build-section-meta">[INDEPENDENT PROPOSAL &bull; 6-VECTOR PHYSICS EVALUATION]</span>
      </div>

      <!-- Mandatory Disclaimer Banner -->
      <div class="banner-disclaimer" style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.4); padding: 0.75rem 1rem; border-radius: 4px; font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; margin-bottom: 1.5rem; text-align: center;">
        EDUCATIONAL ENGINEERING EVALUATION — NOT AN ACTUAL NASA DESIGN REVIEW
      </div>

      <div style="background: rgba(14, 18, 30, 0.75); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 6px; padding: 1.75rem; margin-bottom: 2rem;">
        <p style="font-size: 0.875rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 1.5rem;">
          Step into the shoes of a JPL Project Systems Engineer in 1974–1977. Submit an architectural design change or modification for any Voyager 1 subsystem. Your proposal will be evaluated against real 1977 physical constraint vectors (Mass Budget, RTG Power, Cryogenic Thermal, Jovian Radiation Belts, Monopropellant Hydrazine, and DSN Microwave Link).
        </p>

        <form id="proposal-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
            <div>
              <label for="proposal-subsystem" style="display: block; font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; font-weight: 700; margin-bottom: 0.4rem; text-transform: uppercase;">
                Target Flight Subsystem:
              </label>
              <select id="proposal-subsystem" style="width: 100%; padding: 0.65rem 0.85rem; background: rgba(8, 12, 22, 0.9); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px; color: #ffffff; font-family: var(--font-mono); font-size: 0.8rem;">
                <option value="structure" ${editingProposal?.subsystem === 'structure' ? 'selected' : ''}>Structure &amp; Airframe (Division 35 // 10-Sided Bus)</option>
                <option value="power" ${editingProposal?.subsystem === 'power' ? 'selected' : ''}>Power Subsystem (Division 38 // 3x MHW-RTGs)</option>
                <option value="telecom" ${editingProposal?.subsystem === 'telecom' ? 'selected' : ''}>Telecommunications (Division 33 // 3.7m HGA &amp; S/X-Band)</option>
                <option value="computing" ${editingProposal?.subsystem === 'computing' ? 'selected' : ''}>Flight Computing (Division 33 // CCS &amp; 4KB Plated Wire)</option>
                <option value="thermal" ${editingProposal?.subsystem === 'thermal' ? 'selected' : ''}>Thermal Control (Division 38 // Louvers &amp; Blankets)</option>
                <option value="propulsion" ${editingProposal?.subsystem === 'propulsion' ? 'selected' : ''}>Propulsion (Division 38 // Catalytic Hydrazine Thrusters)</option>
                <option value="science" ${editingProposal?.subsystem === 'science' ? 'selected' : ''}>Science Payload (Division 32 // Scan Platform &amp; Boom)</option>
                <option value="aacs" ${editingProposal?.subsystem === 'aacs' ? 'selected' : ''}>Attitude Control (AACS // Canopus Star Tracker &amp; Sun Sensor)</option>
              </select>
            </div>

            <div>
              <label for="proposal-title" style="display: block; font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; font-weight: 700; margin-bottom: 0.4rem; text-transform: uppercase;">
                Engineering Change Request (ECR) Title:
              </label>
              <input id="proposal-title" type="text" value="${editingProposal ? editingProposal.title.replace(/"/g, '&quot;') : ''}" placeholder="e.g., Titanium Fastener Replacement with Beryllium Alloy" style="width: 100%; padding: 0.65rem 0.85rem; background: rgba(8, 12, 22, 0.9); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px; color: #ffffff; font-family: inherit; font-size: 0.85rem;" required />
            </div>
          </div>

          <div>
            <label for="proposal-desc" style="display: block; font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; font-weight: 700; margin-bottom: 0.4rem; text-transform: uppercase;">
              Proposed Engineering Design &amp; Materials Specification:
            </label>
            <textarea id="proposal-desc" rows="3" placeholder="Describe the proposed mechanical, electrical, or software changes, materials used, and hardware architecture..." style="width: 100%; padding: 0.65rem 0.85rem; background: rgba(8, 12, 22, 0.9); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px; color: #ffffff; font-family: inherit; font-size: 0.85rem; resize: vertical;" required>${editingProposal ? editingProposal.proposalText : ''}</textarea>
          </div>

          <div>
            <label for="proposal-justification" style="display: block; font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; font-weight: 700; margin-bottom: 0.4rem; text-transform: uppercase;">
              Physics Justification &amp; Trade-Off Rationale:
            </label>
            <textarea id="proposal-justification" rows="2" placeholder="Explain the scientific advantage, how mass/power margins are maintained, and how outer planet environments are survived..." style="width: 100%; padding: 0.65rem 0.85rem; background: rgba(8, 12, 22, 0.9); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px; color: #ffffff; font-family: inherit; font-size: 0.85rem; resize: vertical;" required>${editingProposal ? editingProposal.justification : ''}</textarea>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <div>
              <label for="proposal-mass" style="display: block; font-family: var(--font-mono); font-size: 0.725rem; color: #94a3b8; margin-bottom: 0.3rem;">
                Estimated Mass Impact (+/- kg):
              </label>
              <input id="proposal-mass" type="number" step="0.5" value="${editingProposal ? editingProposal.massDeltaKg || 0 : 0}" style="width: 100%; padding: 0.5rem 0.75rem; background: rgba(8, 12, 22, 0.9); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 4px; color: #ffffff; font-family: var(--font-mono); font-size: 0.8rem;" />
            </div>

            <div>
              <label for="proposal-power" style="display: block; font-family: var(--font-mono); font-size: 0.725rem; color: #94a3b8; margin-bottom: 0.3rem;">
                Estimated Power Impact (+/- Watts):
              </label>
              <input id="proposal-power" type="number" step="1" value="${editingProposal ? editingProposal.powerDeltaWatts || 0 : 0}" style="width: 100%; padding: 0.5rem 0.75rem; background: rgba(8, 12, 22, 0.9); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 4px; color: #ffffff; font-family: var(--font-mono); font-size: 0.8rem;" />
            </div>
          </div>

          <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-top: 0.5rem;">
            <button id="btn-submit-proposal" type="submit" class="btn-assemble-stage" style="padding: 0.75rem 1.5rem; font-size: 0.8rem;">
              ${editingProposal ? 'UPDATE &amp; RE-EVALUATE PROPOSAL &rarr;' : 'SUBMIT PROPOSAL FOR 1977 JPL DESIGN REVIEW &rarr;'}
            </button>
            <button id="btn-clear-proposal" type="button" style="padding: 0.75rem 1rem; background: transparent; border: 1px solid rgba(148, 163, 184, 0.3); color: #94a3b8; font-family: var(--font-mono); font-size: 0.75rem; border-radius: 4px; cursor: pointer;">
              CLEAR FORM
            </button>
          </div>
        </form>

        <!-- Dynamic Live Evaluation Result Card -->
        ${activeProposalReview ? `
          <div id="proposal-evaluation-container" style="margin-top: 2rem; padding: 1.5rem; background: rgba(8, 12, 22, 0.95); border: 2px solid ${activeProposalReview.badgeColor}; border-radius: 6px; box-shadow: 0 0 20px rgba(0,0,0,0.5);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
              <span style="font-family: var(--font-mono); font-size: 0.725rem; color: #94a3b8;">JPL SYSTEMS REVIEW BOARD VERDICT:</span>
              <span style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 800; color: ${activeProposalReview.badgeColor}; padding: 0.25rem 0.75rem; background: rgba(0,0,0,0.4); border: 1px solid ${activeProposalReview.badgeColor}; border-radius: 3px;">
                ${activeProposalReview.verdict}
              </span>
            </div>

            <h4 style="font-family: var(--font-heading); font-size: 1.2rem; color: #ffffff; margin: 0 0 0.5rem 0;">${activeProposalReview.title || 'Engineering Proposal'}</h4>
            <p style="font-size: 0.875rem; color: #e2e8f0; line-height: 1.5; margin-bottom: 1.25rem;">
              ${activeProposalReview.summary}
            </p>

            <!-- 6-Vector Analysis Grid -->
            <div style="margin: 1.25rem 0;">
              <div style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem;">
                6-Vector Physics &amp; Engineering Constraints Analysis:
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.65rem;">
                ${(activeProposalReview.vectors || []).map(v => `
                  <div style="padding: 0.75rem; background: rgba(14, 18, 30, 0.9); border: 1px solid ${v.status === 'pass' ? '#10b981' : (v.status === 'warn' ? '#f59e0b' : '#ef4444')}; border-radius: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                      <span style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700; color: #ffffff;">${v.name}</span>
                      <span style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; color: ${v.status === 'pass' ? '#10b981' : (v.status === 'warn' ? '#f59e0b' : '#ef4444')};">
                        ${v.status === 'pass' ? '&check; PASSED' : (v.status === 'warn' ? '! CAUTION' : '&cross; VIOLATION')}
                      </span>
                    </div>
                    <div style="font-size: 0.75rem; color: #94a3b8; line-height: 1.4;">${v.detail}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Advantages & Risks -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="padding: 0.75rem 1rem; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 4px;">
                <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #10b981; font-weight: 700; margin-bottom: 0.4rem;">IDENTIFIED ADVANTAGES:</div>
                <ul style="padding-left: 1.2rem; margin: 0; font-size: 0.775rem; color: #cbd5e1; line-height: 1.5;">
                  ${(activeProposalReview.advantages || []).map(a => `<li>${a}</li>`).join('')}
                </ul>
              </div>

              <div style="padding: 0.75rem 1rem; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 4px;">
                <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #ef4444; font-weight: 700; margin-bottom: 0.4rem;">IDENTIFIED RISKS &amp; BOTTLENECKS:</div>
                <ul style="padding-left: 1.2rem; margin: 0; font-size: 0.775rem; color: #cbd5e1; line-height: 1.5;">
                  ${(activeProposalReview.risks || []).map(r => `<li>${r}</li>`).join('')}
                </ul>
              </div>
            </div>

            <!-- Historical Resolution & Revision Guidance -->
            <div style="margin-top: 1rem; padding: 0.85rem 1rem; background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 4px;">
              <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #fbbf24; font-weight: 700; margin-bottom: 0.3rem;">1977 HISTORICAL CONTEXT:</div>
              <div style="font-size: 0.775rem; color: #e2e8f0; line-height: 1.5; margin-bottom: 0.6rem;">${activeProposalReview.historicalResolution}</div>

              <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #38bdf8; font-weight: 700; margin-bottom: 0.3rem;">ACTIONABLE REVISION ADVICE:</div>
              <div style="font-size: 0.775rem; color: #e2e8f0; line-height: 1.5;">${activeProposalReview.revisionAdvice}</div>
            </div>

            <!-- Revision Button -->
            <div style="margin-top: 1.25rem; display: flex; gap: 0.75rem;">
              <button id="btn-revise-proposal" type="button" class="btn-assemble-stage" style="padding: 0.5rem 1rem; font-size: 0.75rem; background: rgba(56, 189, 248, 0.2); border-color: #38bdf8; color: #38bdf8;">
                &larr; REVISE THIS PROPOSAL IN FORM
              </button>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Saved Proposals History -->
      ${(state.customProposals && state.customProposals.length > 0) ? `
        <div style="margin-top: 2rem;">
          <div class="build-section-heading">
            <span class="phase-led"></span>
            <h4 class="build-section-title">SAVED ENGINEERING PROPOSALS LOG</h4>
            <span class="build-section-meta">[${state.customProposals.length} EVALUATED PROPOSALS]</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${state.customProposals.map(p => `
              <div style="padding: 1rem; background: rgba(8, 12, 22, 0.8); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 4px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                    <span style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; color: ${p.badgeColor}; padding: 0.15rem 0.5rem; background: rgba(0,0,0,0.5); border: 1px solid ${p.badgeColor}; border-radius: 2px;">
                      ${p.verdict}
                    </span>
                    <span style="font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8;">${new Date(p.createdAt || Date.now()).toLocaleTimeString()}</span>
                  </div>
                  <strong style="color: #ffffff; font-size: 0.9rem;">${p.title}</strong>
                  <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.2rem;">${p.proposalText.slice(0, 110)}...</div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                  <button class="btn-load-proposal" data-prop-id="${p.id}" type="button" style="padding: 0.4rem 0.75rem; font-family: var(--font-mono); font-size: 0.72rem; background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; color: #fbbf24; border-radius: 3px; cursor: pointer;">
                    VIEW / REVISE
                  </button>
                  <button class="btn-delete-proposal" data-prop-id="${p.id}" type="button" style="padding: 0.4rem 0.6rem; font-family: var(--font-mono); font-size: 0.72rem; background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; color: #fca5a5; border-radius: 3px; cursor: pointer;">
                    DELETE
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;

    // Proposal form submission listener
    const proposalForm = dynamicContainer.querySelector('#proposal-form');
    proposalForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const subsystem = dynamicContainer.querySelector('#proposal-subsystem')?.value || 'general';
      const title = dynamicContainer.querySelector('#proposal-title')?.value || '';
      const proposalText = dynamicContainer.querySelector('#proposal-desc')?.value || '';
      const justification = dynamicContainer.querySelector('#proposal-justification')?.value || '';
      const massDeltaKg = parseFloat(dynamicContainer.querySelector('#proposal-mass')?.value || 0);
      const powerDeltaWatts = parseFloat(dynamicContainer.querySelector('#proposal-power')?.value || 0);

      const evaluation = DecisionEngine.evaluateCustomProposal({
        subsystem,
        title,
        proposalText,
        justification,
        massDeltaKg,
        powerDeltaWatts
      });

      const proposalRecord = {
        id: editingProposal ? editingProposal.id : 'prop-' + Date.now(),
        subsystem,
        title,
        proposalText,
        justification,
        massDeltaKg,
        powerDeltaWatts,
        ...evaluation
      };

      missionStore.saveCustomProposal(proposalRecord);
      activeProposalReview = proposalRecord;
      editingProposal = null;
      renderDecisions(missionStore.getState());
    });

    // Clear proposal form listener
    dynamicContainer.querySelector('#btn-clear-proposal')?.addEventListener('click', () => {
      editingProposal = null;
      activeProposalReview = null;
      renderDecisions(missionStore.getState());
    });

    // Revise proposal listener
    dynamicContainer.querySelector('#btn-revise-proposal')?.addEventListener('click', () => {
      if (activeProposalReview) {
        editingProposal = activeProposalReview;
        renderDecisions(missionStore.getState());
        dynamicContainer.querySelector('#proposal-desc')?.focus();
      }
    });

    // Load saved proposal listener
    dynamicContainer.querySelectorAll('.btn-load-proposal').forEach(btn => {
      btn.addEventListener('click', () => {
        const propId = btn.getAttribute('data-prop-id');
        const prop = (state.customProposals || []).find(p => p.id === propId);
        if (prop) {
          editingProposal = prop;
          activeProposalReview = prop;
          renderDecisions(missionStore.getState());
        }
      });
    });

    // Delete saved proposal listener
    dynamicContainer.querySelectorAll('.btn-delete-proposal').forEach(btn => {
      btn.addEventListener('click', () => {
        const propId = btn.getAttribute('data-prop-id');
        missionStore.deleteCustomProposal(propId);
        if (activeProposalReview && activeProposalReview.id === propId) {
          activeProposalReview = null;
        }
        if (editingProposal && editingProposal.id === propId) {
          editingProposal = null;
        }
        renderDecisions(missionStore.getState());
      });
    });

    // Decision choice listeners
    dynamicContainer.querySelectorAll('.btn-decision-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        const decId = btn.getAttribute('data-dec-id');
        const choiceId = btn.getAttribute('data-choice-id');
        const evaluation = DecisionEngine.evaluateChoice(decId, choiceId);
        if (evaluation.success) {
          missionStore.submitDecision(decId, choiceId, {
            passed: evaluation.passed,
            title: evaluation.title,
            consequences: evaluation.consequences,
            historicalContext: evaluation.historicalResolution
          });
          renderDecisions(missionStore.getState());
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 6. LABORATORIES VIEW (Data Lab, Math Lab, Graph Lab, Coding Challenges, AI/ML Simulation)
  // -------------------------------------------------------------------------
  function renderLabs(state) {
    dynamicContainer.innerHTML = `
      <div class="build-section-heading">
        <span class="phase-led"></span>
        <h3 class="build-section-title">SCIENTIFIC &amp; COMPUTING LABORATORIES</h3>
        <span class="build-section-meta">[TELEMETRY &bull; CALCULATIONS &bull; GRAPHS &bull; CODE &bull; AI/ML]</span>
      </div>

      <!-- Lab Sub-Tabs -->
      <div style="display: flex; gap: 0.5rem; margin-bottom: 1.75rem; flex-wrap: wrap;">
        <button class="subnav-tab-btn btn-lab-tab ${activeLab === 'data' ? 'active' : ''}" data-lab="data" type="button">
          DATA ANALYTICS LAB
        </button>
        <button class="subnav-tab-btn btn-lab-tab ${activeLab === 'math' ? 'active' : ''}" data-lab="math" type="button">
          NUMERICAL CALCULATIONS LAB
        </button>
        <button class="subnav-tab-btn btn-lab-tab ${activeLab === 'graph' ? 'active' : ''}" data-lab="graph" type="button">
          GRAPH PLOTTING &amp; INTERPRETATION
        </button>
        <button class="subnav-tab-btn btn-lab-tab ${activeLab === 'code' ? 'active' : ''}" data-lab="code" type="button">
          MISSION CODING LAB
        </button>
        <button class="subnav-tab-btn btn-lab-tab ${activeLab === 'aiml' ? 'active' : ''}" data-lab="aiml" type="button">
          AI/ML ANOMALY SIMULATION
        </button>
      </div>

      <div id="lab-inner-view"></div>
    `;

    // Lab sub-tab listeners
    dynamicContainer.querySelectorAll('.btn-lab-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeLab = btn.getAttribute('data-lab');
        renderLabs(missionStore.getState());
      });
    });

    const labInner = dynamicContainer.querySelector('#lab-inner-view');
    if (!labInner) return;

    if (activeLab === 'data') {
      renderDataLabInner(labInner, state);
    } else if (activeLab === 'math') {
      renderMathLabInner(labInner, state);
    } else if (activeLab === 'graph') {
      renderGraphLabInner(labInner, state);
    } else if (activeLab === 'code') {
      renderCodeLabInner(labInner, state);
    } else if (activeLab === 'aiml') {
      renderAiMlLabInner(labInner, state);
    }
  }

  // 6A. DATA LAB INNER (DUAL MODE: REAL NASA ARCHIVE & EDUCATIONAL TELEMETRY SIMULATOR)
  function renderDataLabInner(containerEl, state) {
    const isRealMode = (activeDataLabMode === 'real');

    function getActiveRealDataset() {
      switch (activeRealDatasetKey) {
        case 'trajectory': return REAL_TRAJECTORY_EPHEMERIS;
        case 'mag': return REAL_MAG_1977;
        case 'pls': return REAL_PLS_1977;
        case 'crs': return REAL_CRS_1977;
        case 'lecp': return REAL_LECP_1977;
        case 'pws': return REAL_PWS_LAUNCH_SPECTRUM;
        default: return REAL_TRAJECTORY_EPHEMERIS;
      }
    }

    function renderRealDataSvgChart(key, data, scrubIdx = 0, currentPoint = null) {
      if (!data || data.length === 0) return '';
      const w = 620;
      const h = 130;
      const padL = 45;
      const padR = 20;
      const padT = 20;
      const padB = 25;
      const plotW = w - padL - padR;
      const plotH = h - padT - padB;

      if (key === 'trajectory') {
        const maxDist = 95.0;
        const totalPts = Math.max(1, data.length);
        const safeScrubIdx = Math.min(Math.max(0, scrubIdx || 0), totalPts - 1);
        const points = data.map((d, i) => {
          const x = padL + (i / Math.max(1, totalPts - 1)) * plotW;
          const y = padT + plotH - ((d.distanceAu || 1) / maxDist) * plotH;
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        }).join(' ');

        const scrubRecord = data[safeScrubIdx] || data[0] || {};
        const scrubX = (padL + (safeScrubIdx / Math.max(1, totalPts - 1)) * plotW).toFixed(1);
        const scrubY = (padT + plotH - ((scrubRecord.distanceAu || 1) / maxDist) * plotH).toFixed(1);
        const pointInfo = currentPoint || DataLabEngine.calculateTrajectoryPoint(scrubRecord) || {};

        return `
          <div class="real-chart-container" style="background: rgba(4, 7, 14, 0.95); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 4px; padding: 1rem 1.25rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
              <span style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24; font-weight: 700;">
                OBSERVED TRAJECTORY // RADIAL DISTANCE FROM SUN (AU) [${data[0]?.year || 1977}–${data[data.length - 1]?.year || 2005}]
              </span>
              <span style="font-family: var(--font-mono); font-size: 0.675rem; color: #38bdf8;">
                ${data[0]?.distanceAu || 1.01} AU &rarr; ${data[data.length - 1]?.distanceAu || 94.6} AU (${data.length} Observations)
              </span>
            </div>

            <!-- SVG Trend Curve with Scrubbed Indicator -->
            <svg viewBox="0 0 ${w} ${h}" style="width: 100%; height: auto; display: block;" aria-label="Trajectory distance curve with interactive scrub indicator">
              <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="rgba(255,255,255,0.15)" />
              <line x1="${padL}" y1="${padT + plotH}" x2="${w - padR}" y2="${padT + plotH}" stroke="rgba(255,255,255,0.15)" />
              <line x1="${padL}" y1="${padT + plotH/2}" x2="${w - padR}" y2="${padT + plotH/2}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3,3" />
              <text x="${padL - 6}" y="${padT + 4}" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="end">95 AU</text>
              <text x="${padL - 6}" y="${padT + plotH/2 + 3}" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="end">47 AU</text>
              <text x="${padL - 6}" y="${padT + plotH}" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="end">0 AU</text>
              <text x="${padL}" y="${h - 6}" fill="#94a3b8" font-size="9" font-family="monospace">${data[0]?.year || 1977} (Day ${data[0]?.day || 252})</text>
              <text x="${w - padR}" y="${h - 6}" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="end">${data[data.length - 1]?.year || 2005} (Day ${data[data.length - 1]?.day || 24})</text>
              
              <!-- Trajectory Polyline -->
              <polyline fill="none" stroke="#f59e0b" stroke-width="2" points="${points}" />
              <circle cx="${padL}" cy="${(padT + plotH - ((data[0]?.distanceAu || 1.01)/maxDist)*plotH).toFixed(1)}" r="3" fill="#fbbf24" />
              <circle cx="${w - padR}" cy="${(padT + plotH - ((data[data.length - 1]?.distanceAu || 94.6)/maxDist)*plotH).toFixed(1)}" r="3" fill="#10b981" />

              <!-- Synchronized Scrub Point Guideline & Target Circle -->
              <line x1="${scrubX}" y1="${padT}" x2="${scrubX}" y2="${padT + plotH}" stroke="#38bdf8" stroke-dasharray="2,2" stroke-width="1.5" />
              <circle cx="${scrubX}" cy="${scrubY}" r="7" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity="0.8" />
              <circle cx="${scrubX}" cy="${scrubY}" r="4" fill="#fbbf24" stroke="#ffffff" stroke-width="1.5" />
            </svg>

            <!-- WP-13: Interactive Timeline Scrubber Slider -->
            <div style="margin-top: 1rem; padding: 0.75rem 1rem; background: rgba(0, 0, 0, 0.45); border-radius: 4px; border: 1px solid rgba(245, 158, 11, 0.2);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; flex-wrap: wrap; gap: 0.4rem;">
                <label for="trajectory-scrubber-slider" style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24; font-weight: 700;">
                  FLIGHT TIMELINE SCRUBBER [OBSERVATION ${safeScrubIdx + 1} OF ${data.length}]:
                </label>
                <span style="font-family: var(--font-mono); font-size: 0.675rem; color: #94a3b8;">
                  DRAG TO SCRUB HISTORICAL TELEMETRY
                </span>
              </div>
              <input type="range" id="trajectory-scrubber-slider" min="0" max="${Math.max(0, data.length - 1)}" value="${safeScrubIdx}" style="width: 100%; accent-color: #f59e0b; cursor: pointer;" aria-label="Trajectory timeline scrubber">
              <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.65rem; color: #94a3b8; margin-top: 0.25rem;">
                <span>${data[0]?.year} (Day ${data[0]?.day})</span>
                <span style="color: #38bdf8; font-weight: 700;">SCRUBBED: Year ${pointInfo.year || scrubRecord.year} (Day ${pointInfo.day || scrubRecord.day})</span>
                <span>${data[data.length - 1]?.year} (Day ${data[data.length - 1]?.day})</span>
              </div>
            </div>

            <!-- WP-13: Start and End Year Date Boundary Filter Bar -->
            <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; margin-top: 0.75rem; padding: 0.6rem 0.85rem; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px;">
              <span style="font-family: var(--font-mono); font-size: 0.7rem; color: #fbbf24; font-weight: 700;">FILTER BY YEAR (1977–2005):</span>
              <label style="font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8; display: inline-flex; align-items: center; gap: 0.35rem;">
                FROM: <input type="number" id="input-traj-start-year" min="1977" max="2005" value="${trajectoryStartYear}" style="width: 65px; background: rgba(0,0,0,0.6); border: 1px solid rgba(245,158,11,0.4); color: #fff; padding: 2px 5px; font-family: monospace; font-size: 0.75rem; border-radius: 2px;">
              </label>
              <label style="font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8; display: inline-flex; align-items: center; gap: 0.35rem;">
                TO: <input type="number" id="input-traj-end-year" min="1977" max="2005" value="${trajectoryEndYear}" style="width: 65px; background: rgba(0,0,0,0.6); border: 1px solid rgba(245,158,11,0.4); color: #fff; padding: 2px 5px; font-family: monospace; font-size: 0.75rem; border-radius: 2px;">
              </label>
              <button id="btn-apply-traj-filter" type="button" class="subnav-tab-btn" style="padding: 0.3rem 0.65rem; font-size: 0.7rem; background: rgba(245,158,11,0.15); border-color: #fbbf24; color: #fbbf24;">APPLY FILTER</button>
              <button id="btn-reset-traj-filter" type="button" class="subnav-tab-btn" style="padding: 0.3rem 0.65rem; font-size: 0.7rem; opacity: 0.8;">RESET (1977–2005)</button>
              <span id="traj-filter-error" style="color: #ef4444; font-family: var(--font-mono); font-size: 0.7rem; display: none;"></span>
            </div>

            <!-- WP-13: Synchronized Live Telemetry Readout Card -->
            <div class="trajectory-telemetry-readout" style="background: rgba(8, 14, 28, 0.95); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 4px; padding: 0.85rem 1rem; margin-top: 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(245, 158, 11, 0.2); padding-bottom: 0.4rem; margin-bottom: 0.65rem; flex-wrap: wrap; gap: 0.5rem;">
                <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; font-weight: 700; display: flex; align-items: center; gap: 0.5rem;">
                  <span class="phase-led" style="background: #38bdf8; box-shadow: 0 0 6px #38bdf8;"></span>
                  <span>SYNCHRONIZED TELEMETRY READOUT // DAY ${pointInfo.day || scrubRecord.day}, YEAR ${pointInfo.year || scrubRecord.year}</span>
                </div>
                <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #a78bfa; background: rgba(167, 139, 250, 0.15); border: 1px solid rgba(167, 139, 250, 0.3); border-radius: 3px; padding: 2px 8px;">
                  ${pointInfo.milestone || 'Interplanetary Deep Space'}
                </div>
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.75rem;">
                <div class="metric-pill">
                  <div class="metric-pill-label">Radial Distance (AU)</div>
                  <div class="metric-pill-val" style="color: #fbbf24; font-size: 1rem;">${pointInfo.distanceAu || scrubRecord.distanceAu} AU</div>
                </div>
                <div class="metric-pill">
                  <div class="metric-pill-label">Distance (Kilometers)</div>
                  <div class="metric-pill-val" style="color: #38bdf8; font-size: 0.85rem;">${pointInfo.distanceKm || '1.51e+8'} km</div>
                </div>
                <div class="metric-pill">
                  <div class="metric-pill-label">Radio Latency (OWLT)</div>
                  <div class="metric-pill-val" style="color: #34d399; font-size: 1rem;">${pointInfo.latencyFormatted || '0h 8m'}</div>
                </div>
                <div class="metric-pill">
                  <div class="metric-pill-label">Heliographic Lat / Lon</div>
                  <div class="metric-pill-val" style="color: #e2e8f0; font-size: 0.85rem;">${pointInfo.latDeg ?? scrubRecord.latDeg}° / ${pointInfo.lonDeg ?? scrubRecord.lonDeg}°</div>
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (key === 'mag') {
        const points = data.slice(0, 80).map((d, i) => {
          const x = padL + (i / 79) * plotW;
          const val = Math.min(d.f1 || d.f2 || 0, 20);
          const y = padT + plotH - (val / 20) * plotH;
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        }).join(' ');

        return `
          <div class="real-chart-container" style="background: rgba(4, 7, 14, 0.95); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px; padding: 0.75rem 1rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <span style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24; font-weight: 700;">MAG HOURLY IMF MAGNITUDE |B| (nT) [SEPTEMBER 1977]</span>
              <span style="font-family: var(--font-mono); font-size: 0.675rem; color: #94a3b8;">Mean: ~7.2 nT &bull; Cadence: 1 Hour</span>
            </div>
            <svg viewBox="0 0 ${w} ${h}" style="width: 100%; height: auto; display: block;" aria-label="Magnetic field plot">
              <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="rgba(255,255,255,0.15)" />
              <line x1="${padL}" y1="${padT + plotH}" x2="${w - padR}" y2="${padT + plotH}" stroke="rgba(255,255,255,0.15)" />
              <text x="${padL - 6}" y="${padT + 4}" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="end">20 nT</text>
              <text x="${padL - 6}" y="${padT + plotH}" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="end">0 nT</text>
              <text x="${padL}" y="${h - 6}" fill="#94a3b8" font-size="9" font-family="monospace">Day 248 (Launch)</text>
              <text x="${w - padR}" y="${h - 6}" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="end">Day 251</text>
              <polyline fill="none" stroke="#38bdf8" stroke-width="1.5" points="${points}" />
            </svg>
          </div>
        `;
      } else if (key === 'pls') {
        const points = data.slice(0, 80).map((d, i) => {
          const x = padL + (i / 79) * plotW;
          const v = Math.min(Math.max((d.protonSpeed || 400) - 250, 0) / 400, 1);
          const y = padT + plotH - v * plotH;
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        }).join(' ');

        return `
          <div class="real-chart-container" style="background: rgba(4, 7, 14, 0.95); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px; padding: 0.75rem 1rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <span style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24; font-weight: 700;">PLS HOURLY SOLAR WIND PROTON SPEED Vp (km/s) [1977]</span>
              <span style="font-family: var(--font-mono); font-size: 0.675rem; color: #94a3b8;">Range: 300 to 650 km/s</span>
            </div>
            <svg viewBox="0 0 ${w} ${h}" style="width: 100%; height: auto; display: block;" aria-label="Solar wind speed plot">
              <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="rgba(255,255,255,0.15)" />
              <line x1="${padL}" y1="${padT + plotH}" x2="${w - padR}" y2="${padT + plotH}" stroke="rgba(255,255,255,0.15)" />
              <text x="${padL - 6}" y="${padT + 4}" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="end">650</text>
              <text x="${padL - 6}" y="${padT + plotH}" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="end">250</text>
              <polyline fill="none" stroke="#34d399" stroke-width="1.5" points="${points}" />
            </svg>
          </div>
        `;
      } else if (key === 'lecp') {
        const sample = data[0] || {};
        const rs01Val = sample.eb01_rs01_shield ?? sample.rs01 ?? -1.0;
        const sectors = [
          { name: 'RS01 (Shielded)', val: rs01Val, fill: '#ef4444', blocked: true },
          { name: 'RS02', val: sample.eb01_rs02 ?? sample.rs02, fill: '#f59e0b' },
          { name: 'RS03', val: sample.eb01_rs03 ?? sample.rs03, fill: '#f59e0b' },
          { name: 'RS04', val: sample.eb01_rs04 ?? sample.rs04, fill: '#f59e0b' },
          { name: 'RS05', val: sample.eb01_rs05 ?? sample.rs05, fill: '#f59e0b' },
          { name: 'RS06', val: sample.eb01_rs06 ?? sample.rs06, fill: '#f59e0b' },
          { name: 'RS07', val: sample.eb01_rs07 ?? sample.rs07, fill: '#f59e0b' },
          { name: 'RS08', val: sample.eb01_rs08 ?? sample.rs08, fill: '#f59e0b' }
        ];
        const barW = (plotW / sectors.length) * 0.7;
        const maxVal = Math.max(...sectors.map(s => s.blocked ? 0 : (s.val || 1)), 5);

        return `
          <div class="real-chart-container" style="background: rgba(4, 7, 14, 0.95); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px; padding: 0.75rem 1rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <span style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24; font-weight: 700;">LECP EB01 (22–35 keV) 8 ANGULAR VIEWING SECTORS [AUTHENTIC ANISOTROPY]</span>
              <span style="font-family: var(--font-mono); font-size: 0.675rem; color: #ef4444;">Sector 1 = Blocked by RTG Shield (-1.00 Fill)</span>
            </div>
            <svg viewBox="0 0 ${w} ${h}" style="width: 100%; height: auto; display: block;" aria-label="LECP sector rates">
              <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="rgba(255,255,255,0.15)" />
              <line x1="${padL}" y1="${padT + plotH}" x2="${w - padR}" y2="${padT + plotH}" stroke="rgba(255,255,255,0.15)" />
              ${sectors.map((s, idx) => {
                const cx = padL + (idx + 0.5) * (plotW / sectors.length);
                if (s.blocked) {
                  return `
                    <rect x="${cx - barW/2}" y="${padT + plotH - 12}" width="${barW}" height="12" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" stroke-dasharray="2,2" />
                    <text x="${cx}" y="${padT + plotH + 15}" fill="#ef4444" font-size="8" font-family="monospace" text-anchor="middle">RS01 [BLKD]</text>
                  `;
                }
                const bH = ((s.val || 0) / maxVal) * plotH;
                const bY = padT + plotH - bH;
                return `
                  <rect x="${cx - barW/2}" y="${bY}" width="${barW}" height="${bH}" fill="${s.fill}" />
                  <text x="${cx}" y="${padT + plotH + 15}" fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="middle">RS0${idx+1}</text>
                  <text x="${cx}" y="${bY - 4}" fill="#fbbf24" font-size="8" font-family="monospace" text-anchor="middle">${s.val}</text>
                `;
              }).join('')}
            </svg>
          </div>
        `;
      } else if (key === 'pws') {
        const barW = (plotW / data.length) * 0.75;
        const maxVal = Math.max(...data.map(d => (d.eFieldV_m ?? d.electricFieldVPerM ?? 0.001)), 0.005);

        return `
          <div class="real-chart-container" style="background: rgba(4, 7, 14, 0.95); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px; padding: 0.75rem 1rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <span style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24; font-weight: 700;">PWS 16-CHANNEL SPECTRUM ANALYZER ELECTRIC FIELD (V/m) [10.0 Hz to 56.2 kHz]</span>
              <span style="font-family: var(--font-mono); font-size: 0.675rem; color: #38bdf8;">Calibrated Volts per meter (V/m)</span>
            </div>
            <svg viewBox="0 0 ${w} ${h}" style="width: 100%; height: auto; display: block;" aria-label="PWS 16 channel spectrum">
              <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="rgba(255,255,255,0.15)" />
              <line x1="${padL}" y1="${padT + plotH}" x2="${w - padR}" y2="${padT + plotH}" stroke="rgba(255,255,255,0.15)" />
              ${data.map((d, idx) => {
                const cx = padL + (idx + 0.5) * (plotW / data.length);
                const fieldVal = d.eFieldV_m ?? d.electricFieldVPerM ?? 0;
                const freqVal = d.freqHz ?? d.frequencyHz ?? 0;
                const bH = Math.max(((fieldVal) / maxVal) * plotH, 2);
                const bY = padT + plotH - bH;
                const freqLabel = freqVal >= 1000 ? `${(freqVal/1000).toFixed(1)}k` : `${freqVal}`;
                return `
                  <rect x="${cx - barW/2}" y="${bY}" width="${barW}" height="${bH}" fill="#38bdf8" />
                  <text x="${cx}" y="${padT + plotH + 15}" fill="#94a3b8" font-size="7.5" font-family="monospace" text-anchor="middle">${freqLabel}</text>
                `;
              }).join('')}
            </svg>
          </div>
        `;
      } else if (key === 'crs') {
        const sample = data[0] || {};
        const channels = Object.keys(sample).filter(k => k.startsWith('H_') || k.startsWith('He_')).slice(0, 14);
        const barW = (plotW / (channels.length || 1)) * 0.7;

        return `
          <div class="real-chart-container" style="background: rgba(4, 7, 14, 0.95); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px; padding: 0.75rem 1rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <span style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24; font-weight: 700;">CRS 31-CHANNEL COSMIC RAY SUBSYSTEM PARTICLE SPECTRUM</span>
              <span style="font-family: var(--font-mono); font-size: 0.675rem; color: #a78bfa;">Units: Particles / (cm^2 * s * sr * MeV/n)</span>
            </div>
            <svg viewBox="0 0 ${w} ${h}" style="width: 100%; height: auto; display: block;" aria-label="CRS spectrum">
              <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="rgba(255,255,255,0.15)" />
              <line x1="${padL}" y1="${padT + plotH}" x2="${w - padR}" y2="${padT + plotH}" stroke="rgba(255,255,255,0.15)" />
              ${channels.map((ch, idx) => {
                const cx = padL + (idx + 0.5) * (plotW / channels.length);
                const val = sample[ch] || 0.1;
                const bH = Math.min(Math.max((val / 20) * plotH, 4), plotH);
                const bY = padT + plotH - bH;
                return `
                  <rect x="${cx - barW/2}" y="${bY}" width="${barW}" height="${bH}" fill="#a78bfa" />
                  <text x="${cx}" y="${padT + plotH + 15}" fill="#94a3b8" font-size="7" font-family="monospace" text-anchor="middle">${ch.replace('_', ' ')}</text>
                `;
              }).join('')}
            </svg>
          </div>
        `;
      }
      return '';
    }

    if (isRealMode) {
      const meta = DATASET_METADATA[activeRealDatasetKey] || DATASET_METADATA.trajectory;
      let fullDataset = getActiveRealDataset();
      let scrubbedPoint = null;
      if (activeRealDatasetKey === 'trajectory') {
        fullDataset = DataLabEngine.filterTrajectoryByYear(REAL_TRAJECTORY_EPHEMERIS, trajectoryStartYear, trajectoryEndYear);
        if (fullDataset.length === 0) fullDataset = REAL_TRAJECTORY_EPHEMERIS;
        trajectoryScrubIndex = Math.min(Math.max(0, trajectoryScrubIndex), fullDataset.length - 1);
        scrubbedPoint = DataLabEngine.calculateTrajectoryPoint(fullDataset[trajectoryScrubIndex]);
      }
      const totalRecords = fullDataset.length;
      const maxPage = Math.max(0, Math.ceil(totalRecords / REAL_PAGE_SIZE) - 1);
      const currentPage = Math.min(realDatasetPage, maxPage);
      const pageRecords = fullDataset.slice(currentPage * REAL_PAGE_SIZE, (currentPage + 1) * REAL_PAGE_SIZE);

      containerEl.innerHTML = `
        <div class="lab-container">
          <!-- Primary Data Lab Mode Selector -->
          <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(245, 158, 11, 0.25); padding-bottom: 1rem;">
            <button class="subnav-tab-btn btn-datalab-mode ${activeDataLabMode === 'real' ? 'active' : ''}" data-mode="real" type="button" style="font-weight: 700; color: #fbbf24;">
              &starf; NASA ARCHIVAL OBSERVATORY (REAL DATA)
            </button>
            <button class="subnav-tab-btn btn-datalab-mode ${activeDataLabMode === 'simulated' ? 'active' : ''}" data-mode="simulated" type="button">
              &bull; EDUCATIONAL TELEMETRY SIMULATOR (MODEL)
            </button>
          </div>

          <!-- Official NASA Archive Verification Notice -->
          <div class="mandatory-notice-banner" style="background: rgba(16, 185, 129, 0.12); border-color: rgba(16, 185, 129, 0.5); color: #6ee7b7;">
            <span class="phase-led" style="background: #10b981; box-shadow: 0 0 8px #10b981;"></span>
            <span>OFFICIAL NASA ARCHIVES // AUTHENTIC VOYAGER 1 OBSERVATIONS (1977–2005)</span>
          </div>

          <!-- Dataset Selection Tabs -->
          <div style="display: flex; gap: 0.5rem; align-items: center; margin: 1.25rem 0; flex-wrap: wrap;">
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24;">SELECT DATASET:</span>
            ${[
              { key: 'trajectory', label: '01 // TRAJECTORY EPHEMERIS' },
              { key: 'mag', label: '02 // MAG FIELD (1977)' },
              { key: 'pls', label: '03 // PLS SOLAR WIND (1977)' },
              { key: 'crs', label: '04 // CRS COSMIC RAYS (1977)' },
              { key: 'lecp', label: '05 // LECP PARTICLES (1977)' },
              { key: 'pws', label: '06 // PWS PLASMA WAVES (1977)' }
            ].map(ds => `
              <button class="subnav-tab-btn btn-real-dataset ${activeRealDatasetKey === ds.key ? 'active' : ''}" data-ds="${ds.key}" type="button" style="padding: 0.4rem 0.8rem; font-size: 0.7rem;">
                ${ds.label}
              </button>
            `).join('')}
          </div>

          <!-- Dataset Metadata Card -->
          <div style="background: rgba(8, 12, 22, 0.95); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 4px; padding: 1.25rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
              <div>
                <span class="stage-component-tag" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border-color: rgba(56, 189, 248, 0.4);">${meta.instrument}</span>
                <h4 style="font-family: var(--font-heading); font-size: 1.2rem; color: #ffffff; margin: 0.4rem 0 0.2rem 0;">
                  ${meta.name}
                </h4>
                <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24;">
                  Principal Investigator: ${meta.pi}
                </div>
              </div>
              <a href="${meta.sourceUrl}" target="_blank" rel="noopener noreferrer" style="font-family: var(--font-mono); font-size: 0.725rem; color: #38bdf8; text-decoration: none; padding: 0.35rem 0.75rem; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 3px; display: inline-flex; align-items: center; gap: 0.35rem;">
                <span>NASA SPDF / PDS SOURCE</span> &UpperRightArrow;
              </a>
            </div>

            <div class="progress-metrics-row" style="margin: 0.75rem 0;">
              <div class="metric-pill">
                <div class="metric-pill-label">Temporal Coverage</div>
                <div class="metric-pill-val" style="font-size: 0.8rem;">${meta.coverage}</div>
              </div>
              <div class="metric-pill">
                <div class="metric-pill-label">Measured Units</div>
                <div class="metric-pill-val" style="font-size: 0.8rem; color: #38bdf8;">${meta.units}</div>
              </div>
            </div>

            <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5; margin-top: 0.5rem; background: rgba(4, 7, 14, 0.6); padding: 0.6rem 0.8rem; border-left: 2px solid #f59e0b;">
              <strong>Archival Calibration &amp; Processing Notes:</strong> ${meta.processingNotes}
            </div>
          </div>

          <!-- Dynamic SVG Trend Visualization -->
          ${renderRealDataSvgChart(activeRealDatasetKey, fullDataset, trajectoryScrubIndex, scrubbedPoint)}

          <!-- Real Historical Records Table -->
          <div class="data-table-wrapper" style="margin-bottom: 1rem;">
            <table class="telemetry-table">
              <thead>
                ${activeRealDatasetKey === 'trajectory' ? `
                  <tr>
                    <th>#</th>
                    <th>YEAR</th>
                    <th>DAY (DOY)</th>
                    <th>RADIAL DISTANCE (AU)</th>
                    <th>LATITUDE (DEG)</th>
                    <th>LONGITUDE (DEG)</th>
                  </tr>
                ` : activeRealDatasetKey === 'mag' ? `
                  <tr>
                    <th>#</th>
                    <th>YEAR</th>
                    <th>DOY : HR</th>
                    <th>F1 MAGNITUDE (nT)</th>
                    <th>F2 MODULUS (nT)</th>
                    <th>BR (nT)</th>
                    <th>BT (nT)</th>
                    <th>BN (nT)</th>
                  </tr>
                ` : activeRealDatasetKey === 'pls' ? `
                  <tr>
                    <th>#</th>
                    <th>YEAR</th>
                    <th>DOY : HR</th>
                    <th>PROTON SPEED (km/s)</th>
                    <th>ION DENSITY (cm^-3)</th>
                    <th>THERMAL SPEED (km/s)</th>
                  </tr>
                ` : activeRealDatasetKey === 'crs' ? `
                  <tr>
                    <th>#</th>
                    <th>YEAR</th>
                    <th>DOY</th>
                    <th>H 3.0-5.1 MeV</th>
                    <th>H 30-56 MeV</th>
                    <th>He 3.0-5.1 MeV</th>
                    <th>He 30-56 MeV</th>
                  </tr>
                ` : activeRealDatasetKey === 'lecp' ? `
                  <tr>
                    <th>#</th>
                    <th>YEAR</th>
                    <th>DOY</th>
                    <th>RS01 (BLOCKED)</th>
                    <th>RS02</th>
                    <th>RS03</th>
                    <th>RS04</th>
                    <th>RS05</th>
                    <th>RS06</th>
                    <th>RS07</th>
                    <th>RS08</th>
                  </tr>
                ` : `
                  <tr>
                    <th>CHANNEL #</th>
                    <th>CENTER FREQUENCY (Hz)</th>
                    <th>CALIBRATED ELECTRIC FIELD (V/m)</th>
                    <th>SPECTRAL BAND</th>
                  </tr>
                `}
              </thead>
              <tbody>
                ${pageRecords.map((r, idx) => {
                  const globalIdx = currentPage * REAL_PAGE_SIZE + idx + 1;
                  if (activeRealDatasetKey === 'trajectory') {
                    return `
                      <tr>
                        <td><strong>${globalIdx}</strong></td>
                        <td>${r.year}</td>
                        <td>${r.day}</td>
                        <td style="color: #fbbf24; font-weight: 700;">${r.distanceAu} AU</td>
                        <td>${r.latDeg}&deg;</td>
                        <td>${r.lonDeg}&deg;</td>
                      </tr>
                    `;
                  } else if (activeRealDatasetKey === 'mag') {
                    return `
                      <tr>
                        <td><strong>${globalIdx}</strong></td>
                        <td>${r.year}</td>
                        <td>Day ${r.day} : ${r.hour}h</td>
                        <td style="color: #38bdf8; font-weight: 700;">${r.f1} nT</td>
                        <td>${r.f2} nT</td>
                        <td>${r.br} nT</td>
                        <td>${r.bt} nT</td>
                        <td>${r.bn} nT</td>
                      </tr>
                    `;
                  } else if (activeRealDatasetKey === 'pls') {
                    return `
                      <tr>
                        <td><strong>${globalIdx}</strong></td>
                        <td>${r.year}</td>
                        <td>Day ${r.day} : ${r.hour}h</td>
                        <td style="color: #34d399; font-weight: 700;">${r.protonSpeed} km/s</td>
                        <td>${r.protonDensity} cm^-3</td>
                        <td>${r.protonThermalSpeed} km/s</td>
                      </tr>
                    `;
                  } else if (activeRealDatasetKey === 'crs') {
                    return `
                      <tr>
                        <td><strong>${globalIdx}</strong></td>
                        <td>${r.year}</td>
                        <td>Day ${r.day}</td>
                        <td style="color: #a78bfa;">${r.H_3_0_to_5_1 || '-'}</td>
                        <td>${r.H_30_to_56 || '-'}</td>
                        <td style="color: #a78bfa;">${r.He_3_0_to_5_1 || '-'}</td>
                        <td>${r.He_30_to_56 || '-'}</td>
                      </tr>
                    `;
                  } else if (activeRealDatasetKey === 'lecp') {
                    const rs01 = r.eb01_rs01_shield ?? r.rs01 ?? -1.0;
                    const rs02 = r.eb01_rs02 ?? r.rs02 ?? 0;
                    const rs03 = r.eb01_rs03 ?? r.rs03 ?? 0;
                    const rs04 = r.eb01_rs04 ?? r.rs04 ?? 0;
                    const rs05 = r.eb01_rs05 ?? r.rs05 ?? 0;
                    const rs06 = r.eb01_rs06 ?? r.rs06 ?? 0;
                    const rs07 = r.eb01_rs07 ?? r.rs07 ?? 0;
                    const rs08 = r.eb01_rs08 ?? r.rs08 ?? 0;
                    return `
                      <tr>
                        <td><strong>${globalIdx}</strong></td>
                        <td>${r.year || 1977}</td>
                        <td>Day ${r.day}</td>
                        <td style="color: #ef4444; font-family: monospace;">${rs01} (Fill)</td>
                        <td style="color: #fbbf24;">${rs02}</td>
                        <td>${rs03}</td>
                        <td>${rs04}</td>
                        <td>${rs05}</td>
                        <td>${rs06}</td>
                        <td>${rs07}</td>
                        <td>${rs08}</td>
                      </tr>
                    `;
                  } else {
                    const freqVal = r.freqHz ?? r.frequencyHz ?? 0;
                    const fieldVal = r.eFieldV_m ?? r.electricFieldVPerM ?? 0;
                    return `
                      <tr>
                        <td><strong>CH ${r.channel}</strong></td>
                        <td style="color: #fbbf24;">${freqVal >= 1000 ? (freqVal / 1000).toFixed(1) + ' kHz' : freqVal + ' Hz'}</td>
                        <td style="color: #38bdf8; font-family: monospace; font-weight: 700;">${fieldVal} V/m</td>
                        <td>${freqVal < 1000 ? 'Low Audio VLF' : freqVal < 20000 ? 'Audible Plasma Wave' : 'Ultrasonic Hectometric'}</td>
                      </tr>
                    `;
                  }
                }).join('')}
              </tbody>
            </table>
          </div>

          <!-- Pagination Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #94a3b8;">
              Showing records ${currentPage * REAL_PAGE_SIZE + 1}–${Math.min((currentPage + 1) * REAL_PAGE_SIZE, totalRecords)} of ${totalRecords}
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button id="btn-real-prev-page" class="subnav-tab-btn" type="button" ${currentPage === 0 ? 'disabled style="opacity: 0.4;"' : ''}>
                &larr; PREVIOUS
              </button>
              <button id="btn-real-next-page" class="subnav-tab-btn" type="button" ${currentPage >= maxPage ? 'disabled style="opacity: 0.4;"' : ''}>
                NEXT &rarr;
              </button>
            </div>
          </div>

          <!-- Archival Verification & Export Row -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; padding-top: 1rem; border-top: 1px solid rgba(245, 158, 11, 0.2);">
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <button id="btn-export-real-csv" class="subnav-tab-btn" type="button" style="background: rgba(56, 189, 248, 0.15); border-color: rgba(56, 189, 248, 0.4); color: #38bdf8;">
                &darr; EXPORT AUTHENTIC NASA CSV (${activeRealDatasetKey.toUpperCase()})
              </button>
              <button id="btn-validate-real-lab" class="btn-assemble-stage" type="button">
                VERIFY ARCHIVAL OBSERVATIONS &amp; RECORD LAB SCORE &rarr;
              </button>
            </div>
            ${state.dataLab?.completed ? '<span style="font-family: var(--font-mono); font-size: 0.75rem; color: #10b981; font-weight: 700;">&check; DATA LAB COMPLETED &amp; LOGGED</span>' : ''}
          </div>
        </div>
      `;

      // Event Listeners for Real Data Mode
      containerEl.querySelectorAll('.btn-datalab-mode').forEach(btn => {
        btn.addEventListener('click', () => {
          activeDataLabMode = btn.getAttribute('data-mode');
          renderDataLabInner(containerEl, state);
        });
      });

      containerEl.querySelectorAll('.btn-real-dataset').forEach(btn => {
        btn.addEventListener('click', () => {
          activeRealDatasetKey = btn.getAttribute('data-ds');
          realDatasetPage = 0;
          renderDataLabInner(containerEl, state);
        });
      });

      containerEl.querySelector('#btn-real-prev-page')?.addEventListener('click', () => {
        if (realDatasetPage > 0) {
          realDatasetPage--;
          renderDataLabInner(containerEl, state);
        }
      });

      containerEl.querySelector('#btn-real-next-page')?.addEventListener('click', () => {
        if (realDatasetPage < maxPage) {
          realDatasetPage++;
          renderDataLabInner(containerEl, state);
        }
      });

      containerEl.querySelector('#btn-export-real-csv')?.addEventListener('click', () => {
        const dataset = getActiveRealDataset();
        let csvContent = '';
        if (activeRealDatasetKey === 'trajectory') {
          csvContent = 'Year,Day,Distance_AU,Heliographic_Lat_Deg,Heliographic_Lon_Deg\n' +
            dataset.map(r => `${r.year},${r.day},${r.distanceAu},${r.latDeg},${r.lonDeg}`).join('\n');
        } else if (activeRealDatasetKey === 'mag') {
          csvContent = 'Year,Day,Hour,F1_nT,F2_nT,BR_nT,BT_nT,BN_nT\n' +
            dataset.map(r => `${r.year},${r.day},${r.hour},${r.f1},${r.f2},${r.br},${r.bt},${r.bn}`).join('\n');
        } else if (activeRealDatasetKey === 'pls') {
          csvContent = 'Year,Day,Hour,ProtonSpeed_km_s,ProtonDensity_cm3,ProtonThermalSpeed_km_s\n' +
            dataset.map(r => `${r.year},${r.day},${r.hour},${r.protonSpeed},${r.protonDensity},${r.protonThermalSpeed}`).join('\n');
        } else if (activeRealDatasetKey === 'crs') {
          const keys = Object.keys(dataset[0] || {});
          csvContent = keys.join(',') + '\n' +
            dataset.map(r => keys.map(k => r[k]).join(',')).join('\n');
        } else if (activeRealDatasetKey === 'lecp') {
          csvContent = 'Year,Day,RS01_Blocked,RS02,RS03,RS04,RS05,RS06,RS07,RS08,RS09,RS10\n' +
            dataset.map(r => `${r.year || 1977},${r.day},${r.eb01_rs01_shield ?? r.rs01 ?? -1.0},${r.eb01_rs02 ?? r.rs02},${r.eb01_rs03 ?? r.rs03},${r.eb01_rs04 ?? r.rs04},${r.eb01_rs05 ?? r.rs05},${r.eb01_rs06 ?? r.rs06},${r.eb01_rs07 ?? r.rs07},${r.eb01_rs08 ?? r.rs08},${(r.eb01_rs09 ?? r.rs09) || ''},${(r.eb01_rs10_avg ?? r.rs10) || ''}`).join('\n');
        } else if (activeRealDatasetKey === 'pws') {
          csvContent = 'Channel,Frequency_Hz,ElectricField_V_per_m\n' +
            dataset.map(r => `${r.channel},${r.freqHz ?? r.frequencyHz},${r.eFieldV_m ?? r.electricFieldVPerM}`).join('\n');
        }

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `voyager1_${activeRealDatasetKey}_authentic_nasa_dataset.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });

      containerEl.querySelector('#btn-validate-real-lab')?.addEventListener('click', () => {
        const metaObj = DATASET_METADATA[activeRealDatasetKey];
        missionStore.recordDataLabResult({
          sourceDataset: metaObj.name,
          instrument: metaObj.instrument,
          power: { avg: 450, annualLossPct: 0.75 },
          maxDistanceAu: 94.6,
          latency: { max: 13.1 },
          physicalConclusions: [
            `Verified authentic NASA historical observations from ${metaObj.name}.`,
            `Instrument: ${metaObj.instrument} (P.I. ${metaObj.pi}).`,
            `Physical units: ${metaObj.units}. Source: ${metaObj.sourceUrl}.`,
            `Processing notes: ${metaObj.processingNotes}`
          ]
        });
        renderDataLabInner(containerEl, missionStore.getState());
      });

      // WP-13: Trajectory scrubber slider listener
      containerEl.querySelector('#trajectory-scrubber-slider')?.addEventListener('input', (e) => {
        trajectoryScrubIndex = parseInt(e.target.value, 10);
        renderDataLabInner(containerEl, state);
      });

      // WP-13: Trajectory start & end year filter buttons
      containerEl.querySelector('#btn-apply-traj-filter')?.addEventListener('click', () => {
        const s = parseInt(containerEl.querySelector('#input-traj-start-year')?.value, 10);
        const e = parseInt(containerEl.querySelector('#input-traj-end-year')?.value, 10);
        const errEl = containerEl.querySelector('#traj-filter-error');
        if (isNaN(s) || isNaN(e) || s < 1977 || e > 2005 || s > e) {
          if (errEl) {
            errEl.textContent = 'Invalid boundary: Enter years between 1977 and 2005 (Start ≤ End).';
            errEl.style.display = 'inline';
          }
          return;
        }
        trajectoryStartYear = s;
        trajectoryEndYear = e;
        trajectoryScrubIndex = 0;
        realDatasetPage = 0;
        renderDataLabInner(containerEl, state);
      });

      containerEl.querySelector('#btn-reset-traj-filter')?.addEventListener('click', () => {
        trajectoryStartYear = 1977;
        trajectoryEndYear = 2005;
        trajectoryScrubIndex = 0;
        realDatasetPage = 0;
        renderDataLabInner(containerEl, state);
      });

    } else {
      // SIMULATED TELEMETRY MODE
      const filter = state.dataLab?.filterSubsystem || 'all';
      const records = DataLabEngine.getDataset(filter);
      const stats = state.dataLab?.calculatedStats || DataLabEngine.calculateStatistics(records);

      containerEl.innerHTML = `
        <div class="lab-container">
          <!-- Primary Data Lab Mode Selector -->
          <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(245, 158, 11, 0.25); padding-bottom: 1rem;">
            <button class="subnav-tab-btn btn-datalab-mode ${activeDataLabMode === 'real' ? 'active' : ''}" data-mode="real" type="button">
              &starf; NASA ARCHIVAL OBSERVATORY (REAL DATA)
            </button>
            <button class="subnav-tab-btn btn-datalab-mode ${activeDataLabMode === 'simulated' ? 'active' : ''}" data-mode="simulated" type="button" style="font-weight: 700; color: #fbbf24;">
              &bull; EDUCATIONAL TELEMETRY SIMULATOR (MODEL)
            </button>
          </div>

          <div class="mandatory-notice-banner">
            <span class="phase-led"></span>
            <span>SIMULATED EDUCATIONAL DATA — NOT ACTUAL VOYAGER 1 TELEMETRY</span>
          </div>

          <h4 style="font-family: var(--font-heading); font-size: 1.4rem; color: #ffffff; margin-bottom: 0.5rem;">
            Deep-Space Telemetry Inspection &amp; Power Decay Modeling
          </h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
            Examine the educational trajectory records below. Filter records across specific mission phases and compute mathematical statistics to model RTG power decay and signal latency.
          </p>

          <!-- Filters -->
          <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 1rem; flex-wrap: wrap;">
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24;">FILTER BY PHASE:</span>
            ${['all', 'cruise', 'jupiter-encounter', 'saturn-encounter', 'heliopause-crossing', 'interstellar'].map(f => `
              <button class="subnav-tab-btn btn-filter-telemetry ${filter === f ? 'active' : ''}" data-filter="${f}" type="button" style="padding: 0.4rem 0.8rem; font-size: 0.7rem;">
                ${f.toUpperCase()}
              </button>
            `).join('')}
          </div>

          <!-- Telemetry Data Table -->
          <div class="data-table-wrapper">
            <table class="telemetry-table">
              <thead>
                <tr>
                  <th>RECORD ID</th>
                  <th>YEAR</th>
                  <th>DISTANCE (AU)</th>
                  <th>ONE-WAY TIME (HRS)</th>
                  <th>RTG POWER (W)</th>
                  <th>MAGNETIC (nT)</th>
                  <th>PLASMA (cm^-3)</th>
                  <th>PHASE</th>
                </tr>
              </thead>
              <tbody>
                ${records.map(r => `
                  <tr>
                    <td><strong>${r.id}</strong></td>
                    <td>${r.year}</td>
                    <td>${r.distanceAu} AU</td>
                    <td>${r.latencyHours} hrs</td>
                    <td style="color: #fbbf24;">${r.rtgPowerWatts} W</td>
                    <td>${r.magneticFieldnT} nT</td>
                    <td>${r.plasmaDensity}</td>
                    <td>${r.subsystem}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Statistics Output -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin: 1.5rem 0; flex-wrap: wrap; gap: 1rem;">
            <button id="btn-calc-stats" class="btn-assemble-stage" type="button">
              EXECUTE STATISTICAL ANALYSIS &amp; COMPLETE LAB &rarr;
            </button>
            ${state.dataLab?.completed ? '<span style="font-family: var(--font-mono); font-size: 0.75rem; color: #10b981; font-weight: 700;">&check; DATA LAB COMPLETED &amp; LOGGED</span>' : ''}
          </div>

          ${stats ? `
            <div style="background: rgba(8, 12, 22, 0.85); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 4px; padding: 1.5rem; margin-top: 1rem;">
              <div style="font-family: var(--font-heading); font-size: 1.1rem; color: #fbbf24; margin-bottom: 1rem;">
                STATISTICAL ANALYSIS RESULTS:
              </div>
              <div class="progress-metrics-row" style="margin-bottom: 1.25rem;">
                <div class="metric-pill">
                  <div class="metric-pill-label">Avg RTG Power</div>
                  <div class="metric-pill-val">${stats.power.avg} W</div>
                </div>
                <div class="metric-pill">
                  <div class="metric-pill-label">Annual Power Loss</div>
                  <div class="metric-pill-val">${stats.power.annualLossPct}% / yr</div>
                </div>
                <div class="metric-pill">
                  <div class="metric-pill-label">Max Distance</div>
                  <div class="metric-pill-val">${stats.maxDistanceAu} AU</div>
                </div>
                <div class="metric-pill">
                  <div class="metric-pill-label">Max Latency</div>
                  <div class="metric-pill-val">${stats.latency.max} hrs</div>
                </div>
              </div>

              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">
                PHYSICAL CONCLUSIONS:
              </div>
              <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: #cbd5e1; line-height: 1.6;">
                ${stats.physicalConclusions.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- HANDS-ON SCIENTIFIC DATA EXERCISES (GENUINE USER PROBLEM SOLVING) -->
          <div class="data-lab-exercises-deck" style="margin-top: 2rem; background: rgba(6, 10, 22, 0.95); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 4px; padding: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid rgba(245, 158, 11, 0.2); padding-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <div style="font-family: var(--font-heading); font-size: 1.15rem; color: #fbbf24;">
                HANDS-ON SCIENTIFIC DATA EXERCISES // REAL FLIGHT TELEMETRY
              </div>
              <div class="font-mono" style="font-size: 0.75rem; color: #94a3b8;">
                SOLVED: <span id="exercises-solved-count" style="color: #10b981; font-weight: 700;">${(state.dataLab?.exercises?.ex1 ? 1 : 0) + (state.dataLab?.exercises?.ex2 ? 1 : 0) + (state.dataLab?.exercises?.ex3 ? 1 : 0)}</span> / 3
              </div>
            </div>

            <!-- Exercise 1 -->
            <div class="exercise-card" style="background: rgba(0,0,0,0.4); border: 1px solid ${state.dataLab?.exercises?.ex1 ? '#10b981' : 'rgba(245,158,11,0.2)'}; border-radius: 4px; padding: 1.25rem; margin-bottom: 1.25rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span class="font-mono" style="font-size: 0.75rem; font-weight: 700; color: #fbbf24;">EXERCISE 01 // TRAJECTORY OUTWARD VELOCITY (&Delta;r / &Delta;t)</span>
                <span class="font-mono" style="font-size: 0.75rem; color: ${state.dataLab?.exercises?.ex1 ? '#10b981' : '#f59e0b'};">${state.dataLab?.exercises?.ex1 ? '&check; VERIFIED' : 'PENDING'}</span>
              </div>
              <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 1rem;">
                In August 2012, Voyager 1 crossed the heliopause at <strong>121.7 AU</strong>. By November 2026, it reaches <strong>173.1 AU</strong> over &Delta;t = <strong>14.25 years</strong>. Calculate outward velocity in <strong>AU/yr</strong> (&Delta;r / &Delta;t) and convert to <strong>km/s</strong> (1 AU/yr &approx; 4.74 km/s).
              </p>
              <div style="display: flex; gap: 1rem; align-items: flex-end; flex-wrap: wrap;">
                <div>
                  <label class="font-mono" style="font-size: 0.7rem; color: var(--text-dim); display: block; margin-bottom: 0.25rem;">SPEED (AU/yr):</label>
                  <input type="number" step="0.01" id="input-speed-au" placeholder="e.g. 3.61" value="${state.dataLab?.exercises?.ex1_au || ''}" style="padding: 0.4rem 0.6rem; font-family: var(--font-mono); font-size: 0.85rem; background: #030712; border: 1px solid rgba(245,158,11,0.3); color: #ffffff; border-radius: 3px; width: 120px;" ${state.dataLab?.exercises?.ex1 ? 'disabled' : ''} />
                </div>
                <div>
                  <label class="font-mono" style="font-size: 0.7rem; color: var(--text-dim); display: block; margin-bottom: 0.25rem;">SPEED (km/s):</label>
                  <input type="number" step="0.1" id="input-speed-kms" placeholder="e.g. 17.1" value="${state.dataLab?.exercises?.ex1_kms || ''}" style="padding: 0.4rem 0.6rem; font-family: var(--font-mono); font-size: 0.85rem; background: #030712; border: 1px solid rgba(245,158,11,0.3); color: #ffffff; border-radius: 3px; width: 120px;" ${state.dataLab?.exercises?.ex1 ? 'disabled' : ''} />
                </div>
                <button type="button" id="btn-verify-ex1" class="btn-assemble-stage" style="padding: 0.45rem 1rem; font-size: 0.75rem;" ${state.dataLab?.exercises?.ex1 ? 'disabled' : ''}>
                  ${state.dataLab?.exercises?.ex1 ? '&check; SOLVED' : 'VERIFY CALCULATION &rarr;'}
                </button>
              </div>
              <div id="ex1-feedback" class="font-mono" style="margin-top: 0.5rem; font-size: 0.75rem; color: ${state.dataLab?.exercises?.ex1 ? '#10b981' : '#f59e0b'};">
                ${state.dataLab?.exercises?.ex1 ? '&check; Verified: 51.4 AU / 14.25 yr = 3.61 AU/yr &approx; 17.1 km/s.' : ''}
              </div>
            </div>

            <!-- Exercise 2 -->
            <div class="exercise-card" style="background: rgba(0,0,0,0.4); border: 1px solid ${state.dataLab?.exercises?.ex2 ? '#10b981' : 'rgba(245,158,11,0.2)'}; border-radius: 4px; padding: 1.25rem; margin-bottom: 1.25rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span class="font-mono" style="font-size: 0.75rem; font-weight: 700; color: #fbbf24;">EXERCISE 02 // PARKER SPIRAL FALLOFF &amp; INTERSTELLAR COMPRESSION</span>
                <span class="font-mono" style="font-size: 0.75rem; color: ${state.dataLab?.exercises?.ex2 ? '#10b981' : '#f59e0b'};">${state.dataLab?.exercises?.ex2 ? '&check; VERIFIED' : 'PENDING'}</span>
              </div>
              <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 1rem;">
                Solar wind magnetic field scales as B(r) &approx; B&sub0; / r. With B&sub0; = <strong>5.0 nT</strong> at 1 AU, predict B at <strong>100 AU</strong>. Then compare with the MAG instrument's pristine interstellar field of <strong>0.50 nT</strong> to calculate the compression ratio (B_ISM / B_SW).
              </p>
              <div style="display: flex; gap: 1rem; align-items: flex-end; flex-wrap: wrap;">
                <div>
                  <label class="font-mono" style="font-size: 0.7rem; color: var(--text-dim); display: block; margin-bottom: 0.25rem;">FIELD AT 100 AU (nT):</label>
                  <input type="number" step="0.005" id="input-b-helios" placeholder="e.g. 0.05" value="${state.dataLab?.exercises?.ex2_field || ''}" style="padding: 0.4rem 0.6rem; font-family: var(--font-mono); font-size: 0.85rem; background: #030712; border: 1px solid rgba(245,158,11,0.3); color: #ffffff; border-radius: 3px; width: 120px;" ${state.dataLab?.exercises?.ex2 ? 'disabled' : ''} />
                </div>
                <div>
                  <label class="font-mono" style="font-size: 0.7rem; color: var(--text-dim); display: block; margin-bottom: 0.25rem;">RATIO (B_ISM / B_SW):</label>
                  <input type="number" step="0.1" id="input-b-ratio" placeholder="e.g. 10.0" value="${state.dataLab?.exercises?.ex2_ratio || ''}" style="padding: 0.4rem 0.6rem; font-family: var(--font-mono); font-size: 0.85rem; background: #030712; border: 1px solid rgba(245,158,11,0.3); color: #ffffff; border-radius: 3px; width: 120px;" ${state.dataLab?.exercises?.ex2 ? 'disabled' : ''} />
                </div>
                <button type="button" id="btn-verify-ex2" class="btn-assemble-stage" style="padding: 0.45rem 1rem; font-size: 0.75rem;" ${state.dataLab?.exercises?.ex2 ? 'disabled' : ''}>
                  ${state.dataLab?.exercises?.ex2 ? '&check; SOLVED' : 'VERIFY CALCULATION &rarr;'}
                </button>
              </div>
              <div id="ex2-feedback" class="font-mono" style="margin-top: 0.5rem; font-size: 0.75rem; color: ${state.dataLab?.exercises?.ex2 ? '#10b981' : '#f59e0b'};">
                ${state.dataLab?.exercises?.ex2 ? '&check; Verified: 5.0 nT / 100 = 0.05 nT; Compression ratio = 10.0x.' : ''}
              </div>
            </div>

            <!-- Exercise 3 -->
            <div class="exercise-card" style="background: rgba(0,0,0,0.4); border: 1px solid ${state.dataLab?.exercises?.ex3 ? '#10b981' : 'rgba(245,158,11,0.2)'}; border-radius: 4px; padding: 1.25rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span class="font-mono" style="font-size: 0.75rem; font-weight: 700; color: #fbbf24;">EXERCISE 03 // LECP SECTOR 1 SHADOW SHIELD &amp; FLUX CALIBRATION</span>
                <span class="font-mono" style="font-size: 0.75rem; color: ${state.dataLab?.exercises?.ex3 ? '#10b981' : '#f59e0b'};">${state.dataLab?.exercises?.ex3 ? '&check; VERIFIED' : 'PENDING'}</span>
              </div>
              <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 0.75rem;">
                In NASA file <code>V177DGD01.CSV</code>, 57 of 58 records in Sector 1 show <code>-1.00</code>. Why? And if gross proton flux in Sector 2 is <strong>2.45</strong> and background noise is <strong>0.15</strong>, what is net calibrated flux?
              </p>
              <div style="margin-bottom: 0.75rem;">
                <label class="font-mono" style="font-size: 0.7rem; color: var(--text-dim); display: block; margin-bottom: 0.35rem;">ENGINEERING CAUSE FOR -1.00 FILL VALUE:</label>
                <select id="select-shield-reason" style="padding: 0.4rem 0.6rem; font-family: var(--font-mono); font-size: 0.8rem; background: #030712; border: 1px solid rgba(245,158,11,0.3); color: #ffffff; border-radius: 3px; width: 100%; max-width: 480px;" ${state.dataLab?.exercises?.ex3 ? 'disabled' : ''}>
                  <option value="">-- Select verified engineering cause --</option>
                  <option value="broken">Broken Geneva stepper motor mechanism</option>
                  <option value="shield" ${state.dataLab?.exercises?.ex3 ? 'selected' : ''}>Sector 1 is blocked by the RTG shadow shield (background zero-point)</option>
                  <option value="memory">Flight Data Subsystem 4KB memory parity error</option>
                </select>
              </div>
              <div style="display: flex; gap: 1rem; align-items: flex-end; flex-wrap: wrap;">
                <div>
                  <label class="font-mono" style="font-size: 0.7rem; color: var(--text-dim); display: block; margin-bottom: 0.25rem;">NET CALIBRATED FLUX (2.45 - 0.15):</label>
                  <input type="number" step="0.05" id="input-net-flux" placeholder="e.g. 2.30" value="${state.dataLab?.exercises?.ex3_flux || ''}" style="padding: 0.4rem 0.6rem; font-family: var(--font-mono); font-size: 0.85rem; background: #030712; border: 1px solid rgba(245,158,11,0.3); color: #ffffff; border-radius: 3px; width: 120px;" ${state.dataLab?.exercises?.ex3 ? 'disabled' : ''} />
                </div>
                <button type="button" id="btn-verify-ex3" class="btn-assemble-stage" style="padding: 0.45rem 1rem; font-size: 0.75rem;" ${state.dataLab?.exercises?.ex3 ? 'disabled' : ''}>
                  ${state.dataLab?.exercises?.ex3 ? '&check; SOLVED' : 'VERIFY CALCULATION &rarr;'}
                </button>
              </div>
              <div id="ex3-feedback" class="font-mono" style="margin-top: 0.5rem; font-size: 0.75rem; color: ${state.dataLab?.exercises?.ex3 ? '#10b981' : '#f59e0b'};">
                ${state.dataLab?.exercises?.ex3 ? '&check; Verified: Sector 1 is blocked by RTG shield; Net calibrated flux = 2.30.' : ''}
              </div>
            </div>
          </div>
        </div>
      `;

      // Mode Switcher listeners
      containerEl.querySelectorAll('.btn-datalab-mode').forEach(btn => {
        btn.addEventListener('click', () => {
          activeDataLabMode = btn.getAttribute('data-mode');
          renderDataLabInner(containerEl, state);
        });
      });

      // Filter listeners
      containerEl.querySelectorAll('.btn-filter-telemetry').forEach(btn => {
        btn.addEventListener('click', () => {
          const f = btn.getAttribute('data-filter');
          const st = missionStore.getState();
          st.dataLab.filterSubsystem = f;
          renderDataLabInner(containerEl, st);
        });
      });

      // Calc stats listener
      containerEl.querySelector('#btn-calc-stats')?.addEventListener('click', () => {
        const calculated = DataLabEngine.calculateStatistics(records);
        missionStore.recordDataLabResult(calculated);
        renderDataLabInner(containerEl, missionStore.getState());
      });

      // WP-13: Trajectory scrubber slider listener
      containerEl.querySelector('#trajectory-scrubber-slider')?.addEventListener('input', (e) => {
        trajectoryScrubIndex = parseInt(e.target.value, 10);
        renderDataLabInner(containerEl, state);
      });

      // WP-13: Trajectory start & end year filter buttons
      containerEl.querySelector('#btn-apply-traj-filter')?.addEventListener('click', () => {
        const s = parseInt(containerEl.querySelector('#input-traj-start-year')?.value, 10);
        const e = parseInt(containerEl.querySelector('#input-traj-end-year')?.value, 10);
        const errEl = containerEl.querySelector('#traj-filter-error');
        if (isNaN(s) || isNaN(e) || s < 1977 || e > 2005 || s > e) {
          if (errEl) {
            errEl.textContent = 'Invalid boundary: Enter years between 1977 and 2005 (Start ≤ End).';
            errEl.style.display = 'inline';
          }
          return;
        }
        trajectoryStartYear = s;
        trajectoryEndYear = e;
        trajectoryScrubIndex = 0;
        realDatasetPage = 0;
        renderDataLabInner(containerEl, state);
      });

      containerEl.querySelector('#btn-reset-traj-filter')?.addEventListener('click', () => {
        trajectoryStartYear = 1977;
        trajectoryEndYear = 2005;
        trajectoryScrubIndex = 0;
        realDatasetPage = 0;
        renderDataLabInner(containerEl, state);
      });

      // Hands-on Exercise 1 Listener
      containerEl.querySelector('#btn-verify-ex1')?.addEventListener('click', () => {
        const au = parseFloat(containerEl.querySelector('#input-speed-au')?.value);
        const kms = parseFloat(containerEl.querySelector('#input-speed-kms')?.value);
        const feedback = containerEl.querySelector('#ex1-feedback');
        if (au >= 3.4 && au <= 3.8 && kms >= 16.0 && kms <= 18.0) {
          const st = missionStore.getState();
          st.dataLab = st.dataLab || {};
          st.dataLab.exercises = st.dataLab.exercises || {};
          st.dataLab.exercises.ex1 = true;
          st.dataLab.exercises.ex1_au = au;
          st.dataLab.exercises.ex1_kms = kms;
          missionStore.notify();
          renderDataLabInner(containerEl, missionStore.getState());
        } else {
          if (feedback) {
            feedback.textContent = 'Guidance: Use (173.1 - 121.7) / 14.25 ≈ 3.61 AU/yr, then multiply by 4.74 ≈ 17.1 km/s.';
            feedback.style.color = '#ef4444';
          }
        }
      });

      // Hands-on Exercise 2 Listener
      containerEl.querySelector('#btn-verify-ex2')?.addEventListener('click', () => {
        const fld = parseFloat(containerEl.querySelector('#input-b-helios')?.value);
        const rat = parseFloat(containerEl.querySelector('#input-b-ratio')?.value);
        const feedback = containerEl.querySelector('#ex2-feedback');
        if (fld >= 0.04 && fld <= 0.06 && rat >= 9.0 && rat <= 11.0) {
          const st = missionStore.getState();
          st.dataLab = st.dataLab || {};
          st.dataLab.exercises = st.dataLab.exercises || {};
          st.dataLab.exercises.ex2 = true;
          st.dataLab.exercises.ex2_field = fld;
          st.dataLab.exercises.ex2_ratio = rat;
          missionStore.notify();
          renderDataLabInner(containerEl, missionStore.getState());
        } else {
          if (feedback) {
            feedback.textContent = 'Guidance: B(100 AU) = 5.0 / 100 = 0.05 nT; Compression = 0.50 / 0.05 = 10.0x.';
            feedback.style.color = '#ef4444';
          }
        }
      });

      // Hands-on Exercise 3 Listener
      containerEl.querySelector('#btn-verify-ex3')?.addEventListener('click', () => {
        const reason = containerEl.querySelector('#select-shield-reason')?.value;
        const flux = parseFloat(containerEl.querySelector('#input-net-flux')?.value);
        const feedback = containerEl.querySelector('#ex3-feedback');
        if (reason === 'shield' && flux >= 2.2 && flux <= 2.4) {
          const st = missionStore.getState();
          st.dataLab = st.dataLab || {};
          st.dataLab.exercises = st.dataLab.exercises || {};
          st.dataLab.exercises.ex3 = true;
          st.dataLab.exercises.ex3_flux = flux;
          missionStore.notify();
          renderDataLabInner(containerEl, missionStore.getState());
        } else {
          if (feedback) {
            feedback.textContent = 'Guidance: Sector 1 is blocked by RTG shadow shield; Net flux = 2.45 - 0.15 = 2.30.';
            feedback.style.color = '#ef4444';
          }
        }
      });
    }
  }

  // 6B. CODING LAB INNER
  function renderCodeLabInner(containerEl, state) {
    const challenge = CODING_CHALLENGES.find(c => c.id === activeChallengeId) || CODING_CHALLENGES[0];
    const savedCode = state.codeChallenges[challenge.id]?.code || challenge.starterCode;
    const testResult = state.codeChallenges[challenge.id];
    const hints = challenge.hints || [];
    const revealedCount = codeLabHintsRevealed[challenge.id] || 0;

    containerEl.innerHTML = `
      <div class="lab-container">
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
          ${CODING_CHALLENGES.map(ch => `
            <button class="subnav-tab-btn btn-challenge-select ${ch.id === challenge.id ? 'active' : ''}" data-ch-id="${ch.id}" type="button">
              ${ch.title}
            </button>
          `).join('')}
        </div>

        <h4 style="font-family: var(--font-heading); font-size: 1.3rem; color: #ffffff; margin-bottom: 0.5rem;">
          ${challenge.title}
        </h4>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
          ${challenge.description}
        </p>
        <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; margin-bottom: 1rem;">
          Given Constants: ${challenge.constantsGiven}
        </div>

        <!-- WP-14: Progressive Hints Section -->
        <div class="code-hints-section" style="margin: 1.25rem 0; padding: 1rem 1.25rem; background: rgba(8, 14, 28, 0.85); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="phase-led" style="background: #fbbf24; box-shadow: 0 0 6px #fbbf24;"></span>
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; font-weight: 700;">
                PROGRESSIVE ALGORITHM HINTS [${revealedCount} OF ${hints.length} UNLOCKED]
              </span>
            </div>
            ${revealedCount < hints.length ? `
              <button id="btn-request-hint" type="button" class="subnav-tab-btn" style="padding: 0.35rem 0.75rem; font-size: 0.7rem; background: rgba(245, 158, 11, 0.15); border-color: #fbbf24; color: #fbbf24;">
                REQUEST HINT (LEVEL ${revealedCount + 1}/${hints.length}) &rarr;
              </button>
            ` : `
              <span style="font-family: var(--font-mono); font-size: 0.7rem; color: #10b981; font-weight: 700;">&check; ALL HINTS UNLOCKED</span>
            `}
          </div>

          ${revealedCount === 0 ? `
            <div style="font-size: 0.8rem; color: #94a3b8; font-style: italic;">
              Need guidance? Click "Request Hint" to progressively unlock physical formulas, unit conversions, and syntax skeletons without giving away the full solution.
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.6rem;">
              ${hints.slice(0, revealedCount).map((h) => `
                <div style="padding: 0.6rem 0.85rem; background: rgba(0, 0, 0, 0.5); border-left: 3px solid #fbbf24; border-radius: 2px;">
                  <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #fbbf24; font-weight: 700; margin-bottom: 0.2rem;">
                    LEVEL ${h.level} // ${h.title.toUpperCase()}:
                  </div>
                  <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5; white-space: pre-line;">
                    ${h.text}
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- Safe Code Editor Sandbox -->
        <div class="code-editor-frame">
          <div class="code-editor-header">
            <span>JAVASCRIPT ALGORITHM RUNNER</span>
            <span>FUNCTION: ${challenge.functionSignature}</span>
          </div>
          <textarea id="code-input" class="code-textarea" spellcheck="false">${savedCode}</textarea>
        </div>

        <div style="display: flex; gap: 1rem; align-items: center; margin: 1rem 0; flex-wrap: wrap;">
          <button id="btn-run-code" class="btn-assemble-stage" type="button">
            EXECUTE TEST CASES &rarr;
          </button>
          <button id="btn-reset-code" type="button" style="padding: 0.6rem 1rem; font-family: var(--font-mono); font-size: 0.75rem; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); color: #fbbf24; border-radius: 3px; cursor: pointer;">
            RESET TO STARTER CODE
          </button>
        </div>

        <!-- Test Case Results -->
        ${testResult ? `
          <div style="background: rgba(8, 12, 22, 0.9); border: 1px solid ${testResult.allPassed ? '#10b981' : '#ef4444'}; border-radius: 4px; padding: 1.5rem; margin-top: 1rem;">
            <div style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: ${testResult.allPassed ? '#10b981' : '#ef4444'}; margin-bottom: 0.75rem;">
              ${testResult.allPassed ? 'ALL TEST CASES PASSED // ALGORITHM VERIFIED' : 'TEST FAILURES DETECTED'}
            </div>
            ${testResult.error ? `<div style="color: #ef4444; font-family: var(--font-mono); font-size: 0.8rem; margin-bottom: 0.75rem;">Error: ${testResult.error}</div>` : ''}
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              ${(testResult.results || []).map(r => `
                <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.75rem; padding: 0.4rem 0.6rem; background: rgba(0, 0, 0, 0.4); border-radius: 2px;">
                  <span>${r.label} &bull; Input: [${r.input}]</span>
                  <span>Expected: ${r.expected} | Got: ${r.actual} &bull; <strong style="color: ${r.passed ? '#10b981' : '#ef4444'};">${r.passed ? 'PASS' : 'FAIL'}</strong></span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // WP-14: Request hint button listener
    containerEl.querySelector('#btn-request-hint')?.addEventListener('click', () => {
      codeLabHintsRevealed[challenge.id] = (codeLabHintsRevealed[challenge.id] || 0) + 1;
      renderCodeLabInner(containerEl, state);
    });

    // Challenge selector listeners
    containerEl.querySelectorAll('.btn-challenge-select').forEach(btn => {
      btn.addEventListener('click', () => {
        activeChallengeId = btn.getAttribute('data-ch-id');
        renderCodeLabInner(containerEl, missionStore.getState());
      });
    });

    // Run code listener
    containerEl.querySelector('#btn-run-code')?.addEventListener('click', () => {
      const textarea = containerEl.querySelector('#code-input');
      const code = textarea ? textarea.value : '';
      const evalRes = challenge.evaluate(code);
      missionStore.recordCodeChallenge(challenge.id, {
        code,
        passed: evalRes.allPassed,
        results: evalRes.results,
        error: evalRes.error
      });
      renderCodeLabInner(containerEl, missionStore.getState());
    });

    // Reset code listener
    containerEl.querySelector('#btn-reset-code')?.addEventListener('click', () => {
      const textarea = containerEl.querySelector('#code-input');
      if (textarea) textarea.value = challenge.starterCode;
    });
  }

  // 6C. AI/ML LAB INNER
  function renderAiMlLabInner(containerEl, state) {
    const threshold = state.aiMlSimulation?.threshold || 2.2;
    const simResult = AiMlSimulationEngine.runDetector(threshold, enableAiMlNoise);

    containerEl.innerHTML = `
      <div class="lab-container">
        <div class="mandatory-notice-banner">
          <span class="phase-led"></span>
          <span>HYPOTHETICAL MODERN EDUCATIONAL SIMULATION — VOYAGER 1 USED HARDWIRED LOGIC AND 4KB PLATED-WIRE MEMORY IN 1977, NOT MODERN MACHINE LEARNING</span>
        </div>

        <h4 style="font-family: var(--font-heading); font-size: 1.4rem; color: #ffffff; margin-bottom: 0.5rem;">
          Deep-Space Telemetry Anomaly Detection (Statistical Z-Score Classifier)
        </h4>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
          Explore how modern machine learning anomaly detection works compared to 1977 spacecraft computers. Adjust the standard deviation anomaly threshold ($\sigma$) and evaluate classification accuracy against ground-truth radiation spikes and sensor losses.
        </p>

        <!-- WP-15: Sensor Noise Generator Control Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(8, 12, 22, 0.7); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 4px; padding: 0.75rem 1rem; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; font-weight: 700;">
              SIMULATED SENSOR NOISE INJECTION:
            </span>
            <div style="font-size: 0.75rem; color: #94a3b8;">
              Adds reproducible Gaussian fluctuations (&plusmn;1.5&deg;C temp, &plusmn;0.3A RTG, &plusmn;2.0 dBm AGC) to demonstrate false alarm impact.
            </div>
          </div>
          <button id="btn-toggle-aiml-noise" type="button" class="subnav-tab-btn" style="padding: 0.4rem 0.85rem; font-size: 0.75rem; font-weight: 700; background: ${enableAiMlNoise ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.15)'}; border-color: ${enableAiMlNoise ? '#ef4444' : '#10b981'}; color: ${enableAiMlNoise ? '#fca5a5' : '#6ee7b7'};">
            SIMULATED NOISE: [${enableAiMlNoise ? 'ON (ACTIVE)' : 'OFF (NOMINAL)'}]
          </button>
        </div>

        <!-- Threshold Slider Control -->
        <div style="background: rgba(8, 12, 22, 0.85); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span style="font-family: var(--font-mono); font-size: 0.85rem; color: #fbbf24; font-weight: 700;">
              CLASSIFIER ANOMALY THRESHOLD: ${threshold} &sigma;
            </span>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #94a3b8;">Range: 1.5&sigma; (Sensitive) to 3.5&sigma; (Strict)</span>
          </div>
          <input id="slider-threshold" type="range" min="1.5" max="3.5" step="0.1" value="${threshold}" style="width: 100%; accent-color: #fbbf24; cursor: pointer;" />
          <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.7rem; color: #a8a29e; margin-top: 0.4rem;">
            <span>1.5&sigma; (More False Alarms)</span>
            <span>2.2&sigma; (Optimal Baseline)</span>
            <span>3.5&sigma; (Missed Anomalies)</span>
          </div>
        </div>

        <button id="btn-run-aiml" class="btn-assemble-stage" type="button" style="margin-bottom: 1.5rem;">
          TRAIN / CALIBRATE CLASSIFIER &amp; LOG SIMULATION &rarr;
        </button>

        <!-- Confusion Matrix & Metrics Display -->
        <div class="progress-metrics-row" style="margin-bottom: 1.5rem;">
          <div class="metric-pill">
            <div class="metric-pill-label">Model Accuracy</div>
            <div class="metric-pill-val">${simResult.metrics.accuracy}%</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-label">Precision</div>
            <div class="metric-pill-val">${simResult.metrics.precision}%</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-label">Recall</div>
            <div class="metric-pill-val">${simResult.metrics.recall}%</div>
          </div>
          <div class="metric-pill">
            <div class="metric-pill-label">F1 Score</div>
            <div class="metric-pill-val">${simResult.metrics.f1Score}%</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(8, 12, 22, 0.75); border: 1px solid rgba(245, 158, 11, 0.2); padding: 1rem; border-radius: 4px;">
            <div style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24; margin-bottom: 0.5rem; font-weight: 700;">
              CONFUSION MATRIX:
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.6; color: #cbd5e1;">
              &bull; True Positives (Detected Anomaly): <strong>${simResult.confusionMatrix.tp}</strong><br>
              &bull; False Positives (False Alarm): <strong>${simResult.confusionMatrix.fp}</strong><br>
              &bull; True Negatives (Correct Nominal): <strong>${simResult.confusionMatrix.tn}</strong><br>
              &bull; False Negatives (Missed Threat): <strong>${simResult.confusionMatrix.fn}</strong>
            </div>
          </div>

          <div style="background: rgba(8, 12, 22, 0.75); border: 1px solid rgba(245, 158, 11, 0.2); padding: 1rem; border-radius: 4px;">
            <div style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24; margin-bottom: 0.5rem; font-weight: 700;">
              1977 HISTORICAL CONTRAST:
            </div>
            <p style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5;">
              ${simResult.historicalComparison}
            </p>
          </div>
        </div>

        <!-- Telemetry Stream Frame Inspection Table -->
        <div style="background: rgba(8, 12, 22, 0.85); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 4px; padding: 1.25rem; margin-bottom: 1.5rem;">
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; font-weight: 700; margin-bottom: 0.75rem;">
            LIVE TELEMETRY STREAM FRAMES // STATISTICAL Z-SCORE CLASSIFICATION TABLE:
          </div>
          <div style="max-height: 260px; overflow-y: auto; overflow-x: auto;">
            <table class="data-lab-table" style="font-size: 0.725rem;">
              <thead>
                <tr>
                  <th>Frame ID</th>
                  <th>Timestamp</th>
                  <th>Bus Temp (°C)</th>
                  <th>RTG Amps</th>
                  <th>AGC (dBm)</th>
                  <th>Max Z-Score</th>
                  <th>Ground Truth</th>
                  <th>Model Status</th>
                </tr>
              </thead>
              <tbody>
                ${simResult.evaluatedSamples.map(s => `
                  <tr style="${s.isDetectedAnomaly ? 'background: rgba(245, 158, 11, 0.08);' : ''}">
                    <td class="font-mono">${s.id}</td>
                    <td class="font-mono">${s.time}</td>
                    <td>${s.busTempC}°C ${s.noisy ? '<span style="color: #fbbf24; font-size: 0.65rem;">[NOISE]</span>' : ''}</td>
                    <td>${s.rtgAmps} A</td>
                    <td>${s.agcSignalDbm} dBm</td>
                    <td class="font-mono" style="font-weight: 700; color: ${s.maxZ >= threshold ? '#f59e0b' : '#94a3b8'};">${s.maxZ}&sigma;</td>
                    <td>${s.isTrueAnomaly ? '<span style="color: #ef4444; font-weight: 700;">ANOMALY</span>' : '<span style="color: #10b981;">NOMINAL</span>'}</td>
                    <td>
                      ${s.isDetectedAnomaly 
                        ? (s.isTrueAnomaly ? '<span style="color: #10b981; font-weight: 700;">&check; TRUE POSITIVE</span>' : '<span style="color: #f59e0b; font-weight: 700;">&excl; FALSE ALARM</span>')
                        : (s.isTrueAnomaly ? '<span style="color: #ef4444; font-weight: 700;">&cross; MISSED THREAT</span>' : '<span style="color: #38bdf8;">&check; TRUE NOMINAL</span>')}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Historical Challenge Question -->
        <div style="background: rgba(8, 12, 22, 0.95); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 4px; padding: 1.25rem;">
          <div style="font-family: var(--font-heading); font-size: 1rem; color: #fbbf24; margin-bottom: 0.5rem;">
            HISTORICAL ENGINEERING CHALLENGE // 1977 AVIONICS
          </div>
          <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 0.75rem;">
            Why did JPL systems engineers in 1977 rely on triple-redundant majority voting logic and hardcoded analog comparators rather than modern statistical classifiers on the spacecraft?
          </p>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.8rem; color: #e2e8f0;">
            <label style="display: flex; align-items: flex-start; gap: 0.5rem; cursor: pointer;">
              <input type="radio" name="aiml-quiz" value="wrong1" style="margin-top: 3px;" />
              <span>Deep neural networks were banned by NASA procurement regulations.</span>
            </label>
            <label style="display: flex; align-items: flex-start; gap: 0.5rem; cursor: pointer;">
              <input type="radio" name="aiml-quiz" value="correct" style="margin-top: 3px;" />
              <span>Voyager 1's CCS computers had only 4,096 18-bit words of memory and 0.08 MIPS clock speed, making floating-point statistics impossible on board; hardwired majority voting and ground DSN analysis provided guaranteed deterministic fault recovery.</span>
            </label>
            <label style="display: flex; align-items: flex-start; gap: 0.5rem; cursor: pointer;">
              <input type="radio" name="aiml-quiz" value="wrong2" style="margin-top: 3px;" />
              <span>The spacecraft had no analog-to-digital converters on board.</span>
            </label>
          </div>
          <div id="aiml-quiz-feedback" class="font-mono" style="margin-top: 0.75rem; font-size: 0.75rem;"></div>
        </div>
      </div>
    `;

    // Threshold slider change
    const slider = containerEl.querySelector('#slider-threshold');
    if (slider) {
      slider.addEventListener('input', (e) => {
        const val = Number(e.target.value);
        const res = AiMlSimulationEngine.runDetector(val);
        missionStore.recordAiMlResult({
          threshold: val,
          results: res
        });
        renderAiMlLabInner(containerEl, missionStore.getState());
      });
    }

    // WP-15: Toggle noise listener
    containerEl.querySelector('#btn-toggle-aiml-noise')?.addEventListener('click', () => {
      enableAiMlNoise = !enableAiMlNoise;
      renderAiMlLabInner(containerEl, state);
    });

    // Run ML button
    containerEl.querySelector('#btn-run-aiml')?.addEventListener('click', () => {
      const val = slider ? Number(slider.value) : 2.2;
      const res = AiMlSimulationEngine.runDetector(val, enableAiMlNoise);
      missionStore.recordAiMlResult({
        threshold: val,
        results: res,
        trained: true
      });
      renderAiMlLabInner(containerEl, missionStore.getState());
    });

    // Quiz radio buttons listener
    containerEl.querySelectorAll('input[name="aiml-quiz"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const feedback = containerEl.querySelector('#aiml-quiz-feedback');
        if (e.target.value === 'correct') {
          if (feedback) {
            feedback.innerHTML = '<span style="color: #10b981; font-weight: 700;">&check; CORRECT! Deterministic hardware reliability and radiation-hardened 4KB plated-wire memory were the gold standard of 1977 aerospace engineering.</span>';
          }
        } else {
          if (feedback) {
            feedback.innerHTML = '<span style="color: #ef4444;">&cross; Incorrect. Consider the hardware constraints: 4KB of memory, 0.08 MIPS CPU, and extreme radiation tolerance.</span>';
          }
        }
      });
    });
  }

  // 6D. NUMERICAL CALCULATIONS LAB INNER
  function renderMathLabInner(containerEl, state) {
    const exercises = MathLabEngine.getExercises();
    const currentEx = MathLabEngine.getExerciseById(activeMathExerciseId) || exercises[0];
    const savedResult = state.mathLab?.exercises?.[currentEx.id];

    containerEl.innerHTML = `
      <div class="lab-container">
        <div class="mandatory-notice-banner">
          <span class="phase-led"></span>
          <span>DEDICATED MATHEMATICS &amp; NUMERICAL CALCULATIONS LAB &bull; STRICT ENGINEERING TOLERANCES (&plusmn;1%–&plusmn;2%) &bull; AUTHENTIC EQUATIONS</span>
        </div>

        <h4 style="font-family: var(--font-heading); font-size: 1.35rem; color: #ffffff; margin-bottom: 0.5rem;">
          Spacecraft Physics &amp; Flight Mechanics Calculations
        </h4>
        <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
          Solve authentic mission flight dynamics, telecommunications latency, nuclear thermodynamics, and magnetospheric calculations using numerical input fields. Review the physical formulas, constants, and worked examples before calculating your solutions.
        </p>

        <!-- Exercise Sub-tab Selector -->
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
          ${exercises.map(ex => {
            const isSolved = Boolean(state.mathLab?.exercises?.[ex.id]?.passed);
            const isActive = ex.id === currentEx.id;
            return `
              <button class="subnav-tab-btn btn-math-ex ${isActive ? 'active' : ''}" data-ex-id="${ex.id}" type="button" style="font-size: 0.75rem; display: inline-flex; align-items: center; gap: 6px;">
                <span>${ex.title.split('//')[0].trim()}</span>
                <span style="color: ${isSolved ? '#10b981' : '#f59e0b'}; font-weight: 700;">${isSolved ? '&check;' : '&bull;'}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Exercise Detail Card -->
        <div class="exercise-card" style="background: rgba(8, 12, 22, 0.85); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 6px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; font-weight: 700; letter-spacing: 0.05em;">
              [${currentEx.domain.toUpperCase()}]
            </span>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: ${savedResult?.passed ? '#10b981' : '#94a3b8'};">
              STATUS: ${savedResult?.passed ? '✓ VERIFIED ACCURATE' : 'PENDING CALCULATION'}
            </span>
          </div>

          <h5 style="font-family: var(--font-heading); font-size: 1.15rem; color: #ffffff; margin-bottom: 0.75rem;">
            ${currentEx.title}
          </h5>

          <p style="font-size: 0.875rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 1rem;">
            ${currentEx.context}
          </p>

          <!-- Constants & Formula Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
            <div style="background: rgba(0, 0, 0, 0.45); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 4px; padding: 0.85rem;">
              <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #38bdf8; font-weight: 700; margin-bottom: 0.4rem;">
                GIVEN PHYSICAL CONSTANTS
              </div>
              ${currentEx.constants.map(c => `
                <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #e2e8f0; display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                  <span style="color: #94a3b8;">${c.name}:</span>
                  <span style="font-weight: 700;">${c.value}</span>
                </div>
              `).join('')}
            </div>

            <div style="background: rgba(0, 0, 0, 0.45); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 4px; padding: 0.85rem;">
              <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #38bdf8; font-weight: 700; margin-bottom: 0.4rem;">
                GOVERNING PHYSICAL FORMULA
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.8rem; color: #fbbf24; line-height: 1.5;">
                ${currentEx.formula}
              </div>
            </div>
          </div>

          <!-- Solved Example Box -->
          <div style="background: rgba(245, 158, 11, 0.06); border-left: 3px solid #f59e0b; padding: 0.85rem 1rem; border-radius: 0 4px 4px 0; margin-bottom: 1.25rem;">
            <div style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24; font-weight: 700; margin-bottom: 0.35rem;">
              WORKED ENGINEERING DERIVATION EXAMPLE:
            </div>
            <div style="font-size: 0.8rem; color: #e2e8f0; margin-bottom: 0.4rem;">
              <strong>Problem:</strong> ${currentEx.solvedExample.problem}
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.725rem; color: #cbd5e1; line-height: 1.5;">
              <div>&bull; Step 1: ${currentEx.solvedExample.step1}</div>
              <div>&bull; Step 2: ${currentEx.solvedExample.step2}</div>
              ${currentEx.solvedExample.step3 ? `<div>&bull; Step 3: ${currentEx.solvedExample.step3}</div>` : ''}
              <div style="color: #10b981; font-weight: 700; margin-top: 0.3rem;">&rarr; Solved: ${currentEx.solvedExample.solution}</div>
            </div>
          </div>

          <!-- Active Calculation Problem & Numerical Inputs -->
          <div style="background: rgba(14, 20, 34, 0.9); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px; padding: 1.25rem;">
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">
              MISSION TASK // ENTER NUMERICAL CALCULATION:
            </div>
            <p style="font-size: 0.875rem; color: #ffffff; line-height: 1.5; margin-bottom: 1rem;">
              ${currentEx.taskProblem}
            </p>

            <form id="form-math-calc" style="display: flex; flex-direction: column; gap: 0.75rem;">
              ${currentEx.inputs.map(inp => {
                const prevVal = savedResult?.inputs?.[inp.id] ?? '';
                return `
                  <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                    <label for="${inp.id}" style="font-family: var(--font-mono); font-size: 0.75rem; color: #cbd5e1; min-width: 240px;">
                      ${inp.label}:
                    </label>
                    <div style="display: inline-flex; align-items: center; gap: 0.5rem;">
                      <input 
                        type="number" 
                        step="any" 
                        id="${inp.id}" 
                        name="${inp.id}" 
                        value="${prevVal}" 
                        placeholder="${inp.placeholder}" 
                        style="padding: 0.45rem 0.75rem; font-family: var(--font-mono); font-size: 0.85rem; background: #000000; border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 3px; color: #fbbf24; width: 140px;" 
                        required 
                      />
                      <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #94a3b8;">
                        [${inp.unit}]
                      </span>
                    </div>
                  </div>
                `;
              }).join('')}

              <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.75rem; flex-wrap: wrap;">
                <button type="submit" id="btn-submit-math-calc" class="btn-assemble-stage" style="padding: 0.5rem 1.25rem; font-size: 0.8rem;">
                  ${savedResult?.passed ? '✓ RE-VERIFY CALCULATION' : 'VERIFY NUMERICAL CALCULATION →'}
                </button>
                <div id="math-calc-feedback" style="font-family: var(--font-mono); font-size: 0.775rem; line-height: 1.4;">
                  ${savedResult?.passed ? `<span style="color: #10b981; font-weight: 700;">✓ Previously Verified &amp; Saved.</span>` : ''}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    // Sub-tab exercise switching
    containerEl.querySelectorAll('.btn-math-ex').forEach(btn => {
      btn.addEventListener('click', () => {
        activeMathExerciseId = btn.getAttribute('data-ex-id');
        renderMathLabInner(containerEl, missionStore.getState());
      });
    });

    // Form submission
    const form = containerEl.querySelector('#form-math-calc');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const vals = {};
        for (const [k, v] of formData.entries()) {
          vals[k] = v;
        }

        const validation = MathLabEngine.validateExercise(currentEx.id, vals);
        const feedbackEl = containerEl.querySelector('#math-calc-feedback');

        if (validation.passed) {
          missionStore.recordMathExercise(currentEx.id, {
            passed: true,
            inputs: vals
          });
          if (feedbackEl) {
            feedbackEl.innerHTML = `<span style="color: #10b981; font-weight: 700;">${validation.message}</span>`;
          }
          renderMathLabInner(containerEl, missionStore.getState());
        } else {
          if (feedbackEl) {
            feedbackEl.innerHTML = `<span style="color: #f87171;">${validation.message}</span>`;
          }
        }
      });
    }
  }

  // 6E. GRAPH PLOTTING & DATA INTERPRETATION LAB INNER
  function renderGraphLabInner(containerEl, state) {
    const datasets = GraphLabEngine.getDatasets();
    const currentDataset = GraphLabEngine.getDatasetById(activeGraphDatasetId) || datasets[0];
    const tasks = GraphLabEngine.getInterpretationTasks();
    const currentTask = tasks.find(t => t.datasetId === currentDataset.id) || tasks[0];
    const savedTaskResult = state.graphLab?.tasks?.[currentTask.id];

    const graphSvg = GraphLabEngine.renderSvgGraph(currentDataset.id, activeGraphType, 720, 320);

    containerEl.innerHTML = `
      <div class="lab-container">
        <div class="mandatory-notice-banner">
          <span class="phase-led"></span>
          <span>INTERACTIVE GRAPH PLOTTING &amp; DATA INTERPRETATION LAB &bull; LINE &bull; BAR &bull; SCATTER &bull; TIME-SERIES</span>
        </div>

        <h4 style="font-family: var(--font-heading); font-size: 1.35rem; color: #ffffff; margin-bottom: 0.5rem;">
          Mission Telemetry Graphing &amp; Trend Interpretation
        </h4>
        <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
          Select authentic mission datasets, toggle between chart visualization styles (Line, Bar, Scatter, Time-Series), inspect physical units, and answer rigorous trend interpretation challenges.
        </p>

        <!-- Dataset Selection Control Bar -->
        <div style="background: rgba(8, 12, 22, 0.7); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 4px; padding: 0.85rem 1rem; margin-bottom: 1.25rem;">
          <div style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">
            STEP 1: SELECT TELEMETRY DATASET
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${datasets.map(d => `
              <button class="subnav-tab-btn btn-graph-ds ${d.id === currentDataset.id ? 'active' : ''}" data-ds-id="${d.id}" type="button" style="font-size: 0.75rem;">
                ${d.name}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Graph Type Selector & Dynamic SVG Container -->
        <div style="background: rgba(8, 12, 22, 0.9); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 6px; padding: 1.25rem; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.8rem; color: #fbbf24; font-weight: 700;">
                ${currentDataset.name}
              </span>
              <div style="font-size: 0.75rem; color: #94a3b8;">
                ${currentDataset.description}
              </div>
            </div>

            <!-- Chart Type Toggle Buttons -->
            <div style="display: inline-flex; gap: 0.35rem; background: rgba(0,0,0,0.4); padding: 4px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1);">
              ${['line', 'bar', 'scatter', 'time-series'].map(t => `
                <button class="subnav-tab-btn btn-graph-type ${activeGraphType === t ? 'active' : ''}" data-type="${t}" type="button" style="padding: 3px 8px; font-size: 0.7rem; text-transform: uppercase;">
                  ${t}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Rendered SVG Plot -->
          <div style="width: 100%; overflow-x: auto;">
            ${graphSvg}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8; flex-wrap: wrap; gap: 0.5rem;">
            <span>X-AXIS: ${currentDataset.xVar} [${currentDataset.xUnit}]</span>
            <span>Y-AXIS: ${currentDataset.yVar} [${currentDataset.yUnit}]</span>
            <span>OBSERVATION POINTS: ${currentDataset.points.length}</span>
          </div>
        </div>

        <!-- Structured Interpretation Task Card -->
        <div style="background: rgba(14, 20, 34, 0.9); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 6px; padding: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; font-weight: 700;">
              STEP 2: SCIENTIFIC DATA INTERPRETATION
            </span>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: ${savedTaskResult?.passed ? '#10b981' : '#94a3b8'};">
              STATUS: ${savedTaskResult?.passed ? '✓ INTERPRETATION VERIFIED' : 'PENDING'}
            </span>
          </div>

          <h5 style="font-family: var(--font-heading); font-size: 1.1rem; color: #ffffff; margin-bottom: 0.5rem;">
            ${currentTask.title}
          </h5>

          <p style="font-size: 0.875rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 1rem;">
            ${currentTask.prompt}
          </p>

          <div style="background: rgba(245, 158, 11, 0.08); border-left: 3px solid #f59e0b; padding: 0.6rem 0.85rem; font-size: 0.75rem; color: #fbbf24; font-family: var(--font-mono); margin-bottom: 1rem;">
            <strong>GUIDANCE HINT:</strong> ${currentTask.hint}
          </div>

          <!-- Options -->
          <form id="form-graph-task" style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1rem;">
            ${currentTask.options.map(opt => {
              const isChecked = selectedGraphTaskAnswer[currentTask.id] === opt.id || savedTaskResult?.choiceId === opt.id;
              return `
                <label style="display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.65rem 0.85rem; background: rgba(0, 0, 0, 0.4); border: 1px solid ${isChecked ? 'rgba(245, 158, 11, 0.6)' : 'rgba(255, 255, 255, 0.1)'}; border-radius: 4px; cursor: pointer;">
                  <input type="radio" name="graph-opt" value="${opt.id}" ${isChecked ? 'checked' : ''} style="margin-top: 3px; accent-color: #fbbf24;" />
                  <span style="font-size: 0.85rem; color: #e2e8f0; line-height: 1.5;">
                    <strong style="color: #fbbf24; font-family: var(--font-mono);">${opt.id})</strong> ${opt.text}
                  </span>
                </label>
              `;
            }).join('')}

            <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.75rem; flex-wrap: wrap;">
              <button type="submit" class="btn-assemble-stage" style="padding: 0.5rem 1.25rem; font-size: 0.8rem;">
                ${savedTaskResult?.passed ? '✓ RE-VERIFY INTERPRETATION' : 'VERIFY GRAPH INTERPRETATION →'}
              </button>
              <div id="graph-task-feedback" style="font-family: var(--font-mono); font-size: 0.775rem; line-height: 1.4;">
                ${savedTaskResult?.passed ? `<span style="color: #10b981; font-weight: 700;">✓ Previously Verified: ${currentTask.explanation}</span>` : ''}
              </div>
            </div>
          </form>
        </div>
      </div>
    `;

    // Dataset selector buttons
    containerEl.querySelectorAll('.btn-graph-ds').forEach(btn => {
      btn.addEventListener('click', () => {
        activeGraphDatasetId = btn.getAttribute('data-ds-id');
        renderGraphLabInner(containerEl, missionStore.getState());
      });
    });

    // Chart type buttons
    containerEl.querySelectorAll('.btn-graph-type').forEach(btn => {
      btn.addEventListener('click', () => {
        activeGraphType = btn.getAttribute('data-type');
        renderGraphLabInner(containerEl, missionStore.getState());
      });
    });

    // Form submission
    const taskForm = containerEl.querySelector('#form-graph-task');
    if (taskForm) {
      taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selected = containerEl.querySelector('input[name="graph-opt"]:checked')?.value;
        const feedbackEl = containerEl.querySelector('#graph-task-feedback');
        if (!selected) {
          if (feedbackEl) feedbackEl.innerHTML = '<span style="color: #f87171;">Please select an interpretation option.</span>';
          return;
        }

        selectedGraphTaskAnswer[currentTask.id] = selected;
        const optObj = currentTask.options.find(o => o.id === selected);
        if (optObj && optObj.isCorrect) {
          missionStore.recordGraphTask(currentTask.id, {
            passed: true,
            choiceId: selected
          });
          if (feedbackEl) {
            feedbackEl.innerHTML = `<span style="color: #10b981; font-weight: 700;">✓ Correct! ${currentTask.explanation}</span>`;
          }
          renderGraphLabInner(containerEl, missionStore.getState());
        } else {
          if (feedbackEl) {
            feedbackEl.innerHTML = '<span style="color: #f87171;">Incorrect interpretation. Re-read the hint and inspect the curve slope/units carefully.</span>';
          }
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // 7. COMPLETION VIEW (Flight Readiness Review, Certificate, Downloads)
  // -------------------------------------------------------------------------
  function renderCompletion(state) {
    const report = MissionReportEngine.generateReport(state);

    dynamicContainer.innerHTML = `
      <div class="build-section-heading">
        <span class="phase-led"></span>
        <h3 class="build-section-title">FLIGHT READINESS REVIEW &amp; MISSION COMPLETION</h3>
        <span class="build-section-meta">[JPL SAF 179 FINAL ACCEPTANCE]</span>
      </div>

      <!-- Eligibility Checklist -->
      <div class="dashboard-card" style="margin-bottom: 2rem;">
        <div class="dashboard-card-header">
          <h4 class="dashboard-card-title">
            <span class="phase-led"></span>
            <span>MANDATORY FLIGHT READINESS CRITERIA CHECKLIST</span>
          </h4>
          <span style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: ${report.isEligible ? '#10b981' : '#f59e0b'};">
            ${report.isEligible ? 'ALL CRITERIA SATISFIED' : 'PENDING REQUIREMENTS'}
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${report.criteriaChecks.map(check => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 1rem; background: rgba(8, 12, 22, 0.7); border: 1px solid ${check.passed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}; border-radius: 4px;">
              <div>
                <span style="font-weight: 700; color: #ffffff; font-size: 0.875rem;">${check.label}</span>
                <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #94a3b8; margin-top: 0.2rem;">${check.detail}</div>
              </div>
              <span style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: ${check.passed ? '#10b981' : '#ef4444'};">
                ${check.passed ? '&check; PASSED' : '! PENDING'}
              </span>
            </div>
          `).join('')}
        </div>
      </div>

      ${report.isEligible ? `
        <!-- Official Flight Readiness Certificate -->
        <div class="certificate-frame">
          <div class="certificate-seal">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>

          <div class="certificate-subtitle">JET PROPULSION LABORATORY &bull; SPACE FLIGHT OPERATIONS</div>
          <h3 class="certificate-title">FLIGHT READINESS CERTIFICATE</h3>
          <div style="font-family: var(--font-mono); font-size: 0.9rem; color: #fef08a; margin-bottom: 1.5rem;">
            VOYAGER 1 (MARINER JUPITER/SATURN 1977)
          </div>

          <p class="certificate-body">
            This document officially certifies that Candidate <strong>${report.candidateId}</strong> has successfully completed all flight qualification requirements as <strong>${report.roleTitle}</strong> inside the JPL Spacecraft Assembly Facility Building 179 in Pasadena, California.
          </p>

          <div class="certificate-details-grid">
            <div class="cert-detail-item">
              <div class="cert-label">Assigned Division:</div>
              <div class="cert-val">${report.division}</div>
            </div>
            <div class="cert-detail-item">
              <div class="cert-label">Spacecraft Wet Mass:</div>
              <div class="cert-val">815 kg (710 kg dry)</div>
            </div>
            <div class="cert-detail-item">
              <div class="cert-label">Assembly Status:</div>
              <div class="cert-val">6 of 6 Stages Qualified</div>
            </div>
            <div class="cert-detail-item">
              <div class="cert-label">Overall Mission Score:</div>
              <div class="cert-val" style="color: #10b981;">100% (Certified)</div>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-top: 1.5rem;">
            <button id="btn-download-svg-cert" class="btn-assemble-stage" type="button" style="background: linear-gradient(180deg, #d97706 0%, #b45309 100%);">
              DOWNLOAD VECTOR SVG CERTIFICATE &darr;
            </button>
            <button id="btn-print-cert" class="btn-assemble-stage" style="background: rgba(14, 18, 30, 0.85); color: #38bdf8; border-color: rgba(56, 189, 248, 0.4);" type="button">
              PRINT / PDF CERTIFICATE &#x1F5B6;
            </button>
            <button id="btn-download-txt" class="btn-assemble-stage" style="background: rgba(14, 18, 30, 0.85); color: #fbbf24;" type="button">
              DOWNLOAD REPORT (.TXT) &darr;
            </button>
            <button id="btn-download-json" class="btn-assemble-stage" style="background: rgba(14, 18, 30, 0.85); color: #cbd5e1;" type="button">
              EXPORT DOSSIER (.JSON) &darr;
            </button>
          </div>
        </div>
      ` : `
        <div style="text-align: center; padding: 2.5rem; background: rgba(14, 18, 30, 0.85); border: 1px dashed rgba(245, 158, 11, 0.3); border-radius: 6px;">
          <h4 style="font-family: var(--font-heading); font-size: 1.25rem; color: #ffffff; margin-bottom: 0.75rem;">
            CERTIFICATION PENDING
          </h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto 1.5rem auto;">
            Complete your assigned role tasks, all 6 spacecraft assembly stages, 4 trade-off decisions, and at least 1 laboratory module to earn your official 1977 JPL Flight Readiness Certificate.
          </p>
          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.25rem;">
            <button id="btn-download-svg-cert-interim" class="btn-assemble-stage" style="background: rgba(14, 18, 30, 0.85); border-color: #fbbf24; color: #fbbf24;" type="button">
              PREVIEW SVG CERTIFICATE &darr;
            </button>
            <button id="btn-download-txt-interim" class="btn-assemble-stage" style="background: rgba(14, 18, 30, 0.85); border-color: rgba(245, 158, 11, 0.4); color: #cbd5e1;" type="button">
              DOWNLOAD INTERIM REPORT (.TXT) &darr;
            </button>
            <button id="btn-download-json-interim" class="btn-assemble-stage" style="background: rgba(14, 18, 30, 0.85); border-color: rgba(56, 189, 248, 0.4); color: #38bdf8;" type="button">
              EXPORT INTERIM DOSSIER (.JSON) &darr;
            </button>
          </div>
          <button id="btn-return-to-dash" class="btn-assemble-stage" type="button">
            RETURN TO DASHBOARD &rarr;
          </button>
        </div>
      `}
    `;

    // WP-17: Certificate Download & Print Handlers
    dynamicContainer.querySelector('#btn-download-svg-cert')?.addEventListener('click', () => {
      MissionReportEngine.downloadCertificateSvg(missionStore.getState());
    });

    dynamicContainer.querySelector('#btn-print-cert')?.addEventListener('click', () => {
      MissionReportEngine.printCertificate(missionStore.getState());
    });

    dynamicContainer.querySelector('#btn-download-svg-cert-interim')?.addEventListener('click', () => {
      MissionReportEngine.downloadCertificateSvg(missionStore.getState());
    });

    // Download handlers (live state access)
    dynamicContainer.querySelector('#btn-download-txt')?.addEventListener('click', () => {
      MissionReportEngine.downloadReport(missionStore.getState(), 'txt');
    });

    dynamicContainer.querySelector('#btn-download-json')?.addEventListener('click', () => {
      MissionReportEngine.downloadReport(missionStore.getState(), 'json');
    });

    dynamicContainer.querySelector('#btn-download-txt-interim')?.addEventListener('click', () => {
      MissionReportEngine.downloadReport(missionStore.getState(), 'txt');
    });

    dynamicContainer.querySelector('#btn-download-json-interim')?.addEventListener('click', () => {
      MissionReportEngine.downloadReport(missionStore.getState(), 'json');
    });

    dynamicContainer.querySelector('#btn-return-to-dash')?.addEventListener('click', () => switchTab('dashboard'));
  }

  // -------------------------------------------------------------------------
  // 8. LAUNCH SEQUENCE VIEW (Titan IIIE-Centaur Flight Staging Simulation)
  // -------------------------------------------------------------------------
  function renderLaunchSequence(state) {
    const event = LAUNCH_EVENTS[currentLaunchStep] || LAUNCH_EVENTS[0];
    const isFirst = currentLaunchStep === 0;
    const isLast = currentLaunchStep === LAUNCH_EVENTS.length - 1;

    dynamicContainer.innerHTML = `
      <div class="build-section-heading">
        <span class="phase-led"></span>
        <h3 class="build-section-title">TITAN IIIE-CENTAUR LAUNCH &amp; STAGING SIMULATION</h3>
        <span class="build-section-meta">[EVENT 0${currentLaunchStep + 1} OF 08 &bull; MISSION ELAPSED TIME]</span>
      </div>

      <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 2rem;">
        On September 5, 1977, Voyager 1 launched aboard a Titan IIIE-Centaur rocket from Cape Canaveral LC-41. Step through each critical ascent and flight event to explore staging physics, pyrotechnic deployments, and orbital injection kinematics.
      </p>

      <!-- Launch Timeline Step Bar -->
      <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 1rem; margin-bottom: 2rem; scrollbar-width: thin;">
        ${LAUNCH_EVENTS.map((ev, idx) => `
          <button class="subnav-tab-btn btn-launch-step ${idx === currentLaunchStep ? 'active' : ''}" data-step-idx="${idx}" type="button" style="flex: 1; min-width: 140px; text-align: left; padding: 0.6rem 0.75rem;">
            <div style="font-size: 0.68rem; color: ${idx === currentLaunchStep ? '#fbbf24' : '#94a3b8'};">EVENT 0${ev.step} &bull; ${ev.time}</div>
            <div style="font-size: 0.75rem; font-weight: 700; white-space: normal; line-height: 1.2; margin-top: 0.2rem;">${ev.name.split('//')[0].trim()}</div>
          </button>
        `).join('')}
      </div>

      <!-- Real-Time Telemetry HUD -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        <div class="metric-pill" style="border-color: rgba(245, 158, 11, 0.4);">
          <div class="metric-pill-label">MISSION ELAPSED TIME (MET)</div>
          <div class="metric-pill-val" style="color: #fbbf24; font-family: var(--font-mono);">${event.time}</div>
          <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.2rem;">${event.date}</div>
        </div>

        <div class="metric-pill">
          <div class="metric-pill-label">ALTITUDE ABOVE SEA LEVEL</div>
          <div class="metric-pill-val">${event.altitudeKm.toLocaleString()} km</div>
          <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.2rem;">~${Math.round(event.altitudeKm * 0.621371).toLocaleString()} miles</div>
        </div>

        <div class="metric-pill">
          <div class="metric-pill-label">INERTIAL VELOCITY</div>
          <div class="metric-pill-val">${event.velocityKmh.toLocaleString()} km/h</div>
          <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.2rem;">~${(event.velocityKmh / 3600).toFixed(2)} km/s</div>
        </div>

        <div class="metric-pill">
          <div class="metric-pill-label">ACCELERATION / THRUST</div>
          <div class="metric-pill-val" style="color: #38bdf8;">${event.accelG}</div>
          <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.2rem;">${event.thrustLbf}</div>
        </div>
      </div>

      <!-- Active Stage Detailed Card -->
      <article class="dashboard-card" style="padding: 2rem; border-color: rgba(245, 158, 11, 0.35); background: radial-gradient(circle at 10% 20%, rgba(20, 26, 46, 0.9) 0%, rgba(8, 12, 22, 0.95) 100%);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem; border-bottom: 1px dashed rgba(245, 158, 11, 0.25); padding-bottom: 0.75rem;">
          <div>
            <span class="stage-number-badge">EVENT 0${event.step} OF 08</span>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; margin-left: 0.5rem;">${event.facility}</span>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: #10b981; padding: 0.2rem 0.6rem; background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 3px;">
            ${event.status}
          </div>
        </div>

        <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: #ffffff; margin-bottom: 0.75rem;">
          ${event.name}
        </h3>

        <p style="font-size: 0.95rem; color: #e2e8f0; line-height: 1.6; margin-bottom: 1.5rem;">
          ${event.summary}
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="padding: 1rem; background: rgba(8, 12, 22, 0.85); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 4px;">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #fbbf24; font-weight: 700; margin-bottom: 0.35rem; text-transform: uppercase;">AEROSPACE STAGING MECHANICS:</div>
            <div style="font-size: 0.825rem; color: #cbd5e1; line-height: 1.5;">${event.technicalDetail}</div>
          </div>

          <div style="padding: 1rem; background: rgba(8, 12, 22, 0.85); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 4px;">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #38bdf8; font-weight: 700; margin-bottom: 0.35rem; text-transform: uppercase;">MISSION MILESTONE VERIFICATION:</div>
            <div style="font-size: 0.825rem; color: #cbd5e1; line-height: 1.5;">${event.milestone}</div>
          </div>
        </div>

        <!-- Launch Navigation Controls -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px dashed rgba(245, 158, 11, 0.25);">
          <div style="display: flex; gap: 0.75rem;">
            <button id="btn-prev-event" class="btn-assemble-stage" type="button" style="padding: 0.6rem 1rem; font-size: 0.75rem; background: rgba(14, 18, 30, 0.85); border-color: rgba(245, 158, 11, 0.3);" ${isFirst ? 'disabled' : ''}>
              &larr; PREVIOUS EVENT
            </button>
            <button id="btn-next-event" class="btn-assemble-stage" type="button" style="padding: 0.6rem 1.25rem; font-size: 0.75rem;" ${isLast ? 'disabled' : ''}>
              NEXT FLIGHT EVENT &rarr;
            </button>
          </div>

          <div style="display: flex; gap: 0.75rem;">
            <button id="btn-reset-launch" type="button" style="padding: 0.6rem 0.85rem; font-family: var(--font-mono); font-size: 0.72rem; background: transparent; border: 1px solid rgba(148, 163, 184, 0.3); color: #94a3b8; border-radius: 4px; cursor: pointer;">
              RESET TO T-0
            </button>
            <button id="btn-launch-to-dash" type="button" style="padding: 0.6rem 0.85rem; font-family: var(--font-mono); font-size: 0.72rem; background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; color: #fbbf24; border-radius: 4px; cursor: pointer;">
              RETURN TO DASHBOARD &rarr;
            </button>
          </div>
        </div>
      </article>
    `;

    // Step button click listeners
    dynamicContainer.querySelectorAll('.btn-launch-step').forEach(btn => {
      btn.addEventListener('click', () => {
        const stepIdx = parseInt(btn.getAttribute('data-step-idx'), 10);
        if (!isNaN(stepIdx)) {
          currentLaunchStep = stepIdx;
          renderLaunchSequence(missionStore.getState());
        }
      });
    });

    dynamicContainer.querySelector('#btn-prev-event')?.addEventListener('click', () => {
      if (currentLaunchStep > 0) {
        currentLaunchStep--;
        renderLaunchSequence(missionStore.getState());
      }
    });

    dynamicContainer.querySelector('#btn-next-event')?.addEventListener('click', () => {
      if (currentLaunchStep < LAUNCH_EVENTS.length - 1) {
        currentLaunchStep++;
        renderLaunchSequence(missionStore.getState());
      }
    });

    dynamicContainer.querySelector('#btn-reset-launch')?.addEventListener('click', () => {
      currentLaunchStep = 0;
      renderLaunchSequence(missionStore.getState());
    });

    dynamicContainer.querySelector('#btn-launch-to-dash')?.addEventListener('click', () => {
      switchTab('dashboard');
    });
  }

  // Subscribe to central state changes for immediate UI synchronization
  missionStore.subscribe(() => {
    renderCurrentTab();
  });

  // Handle direct hash navigation to specific tabs (e.g. #dashboard, #assembly, #components, #decisions, #datalab, #codelab, #aimllab, #mission-report)
  function handleSubroute(hash) {
    const route = hash.replace('#', '').toLowerCase();
    if (['dashboard', 'tasks', 'assembly', 'components', 'decisions', 'labs', 'completion', 'launch'].includes(route)) {
      switchTab(route);
    } else if (route === 'datalab') {
      activeLab = 'data';
      switchTab('labs');
    } else if (route === 'codelab') {
      activeLab = 'code';
      switchTab('labs');
    } else if (route === 'aimllab') {
      activeLab = 'aiml';
      switchTab('labs');
    } else if (route === 'mission-report') {
      switchTab('completion');
    }
  }

  window.addEventListener('hashchange', () => {
    handleSubroute(window.location.hash);
  });

  handleSubroute(window.location.hash);
  renderCurrentTab();
}
