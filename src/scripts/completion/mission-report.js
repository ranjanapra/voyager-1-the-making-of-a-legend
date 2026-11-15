/**
 * Voyager 1 — Mission Completion & Report Generation Engine
 * 
 * Verifies strict mission completion criteria.
 * Generates official JPL SAF 1977 Flight Readiness Record and downloadable reports.
 */

import { UnlockEngine } from '../core/unlock-engine.js';
import { ENGINEERING_ROLES } from '../tasks/roles-data.js';

export class MissionReportEngine {
  /**
   * Evaluate readiness and generate certificate data
   */
  static generateReport(state = {}) {
    const safeState = state || {};
    const eligibility = UnlockEngine.isMissionCompletionEligible(safeState);
    const role = ENGINEERING_ROLES.find(r => r.id === safeState.selectedRole) || null;

    const reportData = {
      isEligible: !!eligibility.eligible,
      criteriaChecks: eligibility.checks || [],
      candidateId: safeState.candidateId || 'MJS77-CANDIDATE-7701',
      roleTitle: role ? role.title : 'Unassigned Candidate',
      division: role ? role.division : 'General Engineering Archive',
      overallProgress: safeState.overallProgress || 0,
      breakdown: safeState.progressBreakdown || {},
      completedTasksCount: (safeState.completedTasks || []).length,
      assignedTasksCount: (safeState.assignedTasks || []).length,
      assemblyStagesCompleted: Object.values(safeState.assemblyStages || {}).filter(Boolean).length,
      decisionsCount: Object.keys(safeState.decisions || {}).length,
      completedAt: safeState.completedAt || new Date().toISOString(),
      flightReadinessStatus: eligibility.eligible ? "FLIGHT READY // CERTIFIED FOR TITAN IIIE LAUNCH" : "QUALIFICATION INCOMPLETE // PENDING VERIFICATIONS"
    };

    return reportData;
  }

  /**
   * Format plain text archival summary for download
   */
  static generateTextSummary(state = {}) {
    const safeState = state || {};
    const report = this.generateReport(safeState);
    const lines = [
      "================================================================================",
      "JET PROPULSION LABORATORY // SPACECRAFT ASSEMBLY FACILITY BLDG 179",
      "MARINER JUPITER/SATURN 1977 (VOYAGER 1) — FLIGHT READINESS DOSSIER",
      "================================================================================",
      `CANDIDATE ID:       ${report.candidateId}`,
      `ASSIGNED ROLE:      ${report.roleTitle}`,
      `DIVISION:           ${report.division}`,
      `QUALIFICATION DATE: ${new Date(report.completedAt).toUTCString()}`,
      `OVERALL SCORE:      ${report.overallProgress}%`,
      `FLIGHT STATUS:      ${report.flightReadinessStatus}`,
      "--------------------------------------------------------------------------------",
      "QUALIFICATION CHECKLIST BREAKDOWN:",
      ...(report.criteriaChecks || []).map(c => `  [${c.passed ? 'PASSED' : 'PENDING'}] ${c.label}: ${c.detail}`),
      "--------------------------------------------------------------------------------",
      "SPACECRAFT ASSEMBLY CONFIGURATION:",
      `  Assembly Stages Completed: ${report.assemblyStagesCompleted} of 6 Stages`,
      `  Total Wet Launch Mass:     815 kg (710 kg dry + 105 kg hydrazine)`,
      `  High-Gain Antenna:         3.7 m Parabolic Cassegrain (S/X-band)`,
      `  Electrical Power:          3 MHW-RTGs (~474 Watts launch output)`,
      `  Payload Artifact:          12-inch Gold-Plated Phonograph Record`,
      "--------------------------------------------------------------------------------",
      "HISTORICAL CERTIFICATION NOTE:",
      "This document certifies successful completion of simulated 1977 JPL flight",
      "engineering requirements under NASA SP-445 historical guidelines.",
      "================================================================================"
    ];
    return lines.join("\n");
  }

  /**
   * WP-17: Generate vector-crisp standalone SVG Mission Certificate
   */
  static generateCertificateSvg(state = {}) {
    const report = this.generateReport(state);
    const dateStr = new Date(report.completedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const statusColor = report.isEligible ? '#10b981' : '#f59e0b';
    const statusText = report.isEligible
      ? 'FLIGHT READY // CERTIFIED FOR TITAN IIIE LAUNCH'
      : 'CANDIDATE QUALIFICATION RECORD // IN PROGRESS';

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#040711" />
      <stop offset="50%" stop-color="#080e1e" />
      <stop offset="100%" stop-color="#020408" />
    </linearGradient>
    <linearGradient id="goldBorder" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="50%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <radialGradient id="sealGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(245, 158, 11, 0.25)" />
      <stop offset="70%" stop-color="rgba(245, 158, 11, 0.08)" />
      <stop offset="100%" stop-color="rgba(0, 0, 0, 0)" />
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1000" height="700" fill="url(#bgGrad)" />

  <!-- Outer Double Gold Border -->
  <rect x="24" y="24" width="952" height="652" fill="none" stroke="url(#goldBorder)" stroke-width="2" />
  <rect x="32" y="32" width="936" height="636" fill="none" stroke="rgba(245, 158, 11, 0.35)" stroke-width="1" />
  <rect x="36" y="36" width="928" height="628" fill="none" stroke="rgba(245, 158, 11, 0.15)" stroke-width="1" stroke-dasharray="6,4" />

  <!-- Corner Tech Brackets -->
  <path d="M 24 60 L 24 24 L 60 24" fill="none" stroke="#fbbf24" stroke-width="3" />
  <path d="M 976 60 L 976 24 L 940 24" fill="none" stroke="#fbbf24" stroke-width="3" />
  <path d="M 24 640 L 24 676 L 60 676" fill="none" stroke="#fbbf24" stroke-width="3" />
  <path d="M 976 640 L 976 676 L 940 676" fill="none" stroke="#fbbf24" stroke-width="3" />

  <!-- Header Classification -->
  <text x="500" y="75" fill="#f59e0b" font-family="'Courier New', monospace" font-size="12" font-weight="700" letter-spacing="4" text-anchor="middle">
    NATIONAL AERONAUTICS AND SPACE ADMINISTRATION // JET PROPULSION LABORATORY
  </text>
  <text x="500" y="95" fill="#94a3b8" font-family="'Courier New', monospace" font-size="10" letter-spacing="3" text-anchor="middle">
    SPACECRAFT ASSEMBLY FACILITY BLDG 179 &bull; PASADENA, CALIFORNIA &bull; 1977
  </text>

  <!-- Main Certificate Title -->
  <text x="500" y="145" fill="#ffffff" font-family="'Georgia', serif" font-size="30" font-weight="700" letter-spacing="2" text-anchor="middle">
    FLIGHT READINESS CERTIFICATE
  </text>
  <text x="500" y="172" fill="#fbbf24" font-family="'Courier New', monospace" font-size="14" font-weight="700" letter-spacing="3" text-anchor="middle">
    PROJECT VOYAGER 1 &bull; MARINER JUPITER/SATURN 1977 (MJS77)
  </text>

  <line x1="180" y1="190" x2="820" y2="190" stroke="rgba(245, 158, 11, 0.4)" stroke-width="1" />

  <!-- Recipient Introductory Text -->
  <text x="500" y="225" fill="#cbd5e1" font-family="'Georgia', serif" font-size="14" font-style="italic" text-anchor="middle">
    This official JPL engineering qualification dossier is awarded to:
  </text>

  <!-- Candidate Identity -->
  <text x="500" y="265" fill="#ffffff" font-family="'Courier New', monospace" font-size="24" font-weight="800" letter-spacing="2" text-anchor="middle">
    ${report.candidateId}
  </text>
  <text x="500" y="295" fill="#38bdf8" font-family="'Courier New', monospace" font-size="15" font-weight="700" letter-spacing="2" text-anchor="middle">
    ASSIGNED ROLE: ${report.roleTitle.toUpperCase()}
  </text>
  <text x="500" y="318" fill="#94a3b8" font-family="'Courier New', monospace" font-size="12" letter-spacing="1" text-anchor="middle">
    DIVISION: ${report.division.toUpperCase()}
  </text>

  <!-- Metrics Grid -->
  <g transform="translate(140, 350)">
    <!-- Metric 1: Tasks -->
    <rect x="0" y="0" width="165" height="70" rx="4" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(245, 158, 11, 0.25)" />
    <text x="82" y="25" fill="#94a3b8" font-family="'Courier New', monospace" font-size="10" text-anchor="middle">TASKS VALIDATED</text>
    <text x="82" y="55" fill="#fbbf24" font-family="'Courier New', monospace" font-size="20" font-weight="700" text-anchor="middle">
      ${report.completedTasksCount} / 12
    </text>

    <!-- Metric 2: Assembly -->
    <rect x="185" y="0" width="165" height="70" rx="4" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(245, 158, 11, 0.25)" />
    <text x="267" y="25" fill="#94a3b8" font-family="'Courier New', monospace" font-size="10" text-anchor="middle">ASSEMBLY STAGES</text>
    <text x="267" y="55" fill="#38bdf8" font-family="'Courier New', monospace" font-size="20" font-weight="700" text-anchor="middle">
      ${report.assemblyStagesCompleted} / 6 STAGES
    </text>

    <!-- Metric 3: Decisions -->
    <rect x="370" y="0" width="165" height="70" rx="4" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(245, 158, 11, 0.25)" />
    <text x="452" y="25" fill="#94a3b8" font-family="'Courier New', monospace" font-size="10" text-anchor="middle">TRADE DECISIONS</text>
    <text x="452" y="55" fill="#a78bfa" font-family="'Courier New', monospace" font-size="20" font-weight="700" text-anchor="middle">
      ${report.decisionsCount} / 4 LOGGED
    </text>

    <!-- Metric 4: Total Progress -->
    <rect x="555" y="0" width="165" height="70" rx="4" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(245, 158, 11, 0.25)" />
    <text x="637" y="25" fill="#94a3b8" font-family="'Courier New', monospace" font-size="10" text-anchor="middle">OVERALL SCORE</text>
    <text x="637" y="55" fill="#10b981" font-family="'Courier New', monospace" font-size="20" font-weight="700" text-anchor="middle">
      ${report.overallProgress}%
    </text>
  </g>

  <!-- Flight Status Callout Banner -->
  <g transform="translate(180, 450)">
    <rect x="0" y="0" width="640" height="46" rx="4" fill="rgba(0, 0, 0, 0.5)" stroke="${statusColor}" stroke-width="1.5" />
    <circle cx="30" cy="23" r="6" fill="${statusColor}" />
    <text x="50" y="28" fill="${statusColor}" font-family="'Courier New', monospace" font-size="12" font-weight="700" letter-spacing="1">
      STATUS: ${statusText}
    </text>
  </g>

  <!-- Archival Description Paragraph -->
  <text x="500" y="525" fill="#94a3b8" font-family="'Georgia', serif" font-size="11.5" text-anchor="middle">
    For demonstrated proficiency in Flight Hardware Assembly, Thermal &amp; Telecommunication Architecture,
  </text>
  <text x="500" y="543" fill="#94a3b8" font-family="'Georgia', serif" font-size="11.5" text-anchor="middle">
    and Trajectory Navigation supporting the exploration of Jupiter, Saturn, and the Interstellar Medium.
  </text>

  <!-- JPL SAF Official Circular Seal -->
  <g transform="translate(180, 580)">
    <circle cx="50" cy="40" r="35" fill="url(#sealGrad)" stroke="#f59e0b" stroke-width="1.5" />
    <circle cx="50" cy="40" r="28" fill="none" stroke="#fbbf24" stroke-width="0.75" stroke-dasharray="3,2" />
    <text x="50" y="36" fill="#fbbf24" font-family="'Courier New', monospace" font-size="8" font-weight="700" text-anchor="middle">NASA JPL</text>
    <text x="50" y="47" fill="#fbbf24" font-family="'Courier New', monospace" font-size="8" font-weight="700" text-anchor="middle">SAF 179</text>
    <text x="100" y="35" fill="#cbd5e1" font-family="'Courier New', monospace" font-size="10" font-weight="700">DATE CERTIFIED: ${dateStr.toUpperCase()}</text>
    <text x="100" y="50" fill="#64748b" font-family="'Courier New', monospace" font-size="9">AUTHORIZATION: NASA SP-445 FLIGHT GUIDELINES</text>
  </g>

  <!-- Flight Director Signature Box -->
  <g transform="translate(620, 580)">
    <line x1="0" y1="45" x2="200" y2="45" stroke="#f59e0b" stroke-width="1" />
    <text x="100" y="35" fill="#f8fafc" font-family="'Brush Script MT', 'cursive', 'Georgia', serif" font-size="18" text-anchor="middle">John R. Casani</text>
    <text x="100" y="58" fill="#cbd5e1" font-family="'Courier New', monospace" font-size="9" text-anchor="middle">VOYAGER PROJECT MANAGER // JPL 1977</text>
  </g>
</svg>`;
  }

  /**
   * WP-17: Download standalone vector SVG certificate
   */
  static downloadCertificateSvg(state = {}) {
    const svgStr = this.generateCertificateSvg(state);
    const candidateId = state?.candidateId || 'MJS77-CANDIDATE-7701';
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Voyager1-JPL-Flight-Certificate-${candidateId}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * WP-17: Print / PDF Certificate via browser print dialog
   */
  static printCertificate(state = {}) {
    const svgStr = this.generateCertificateSvg(state);
    const printWindow = window.open('', '_blank', 'width=1050,height=750');
    if (!printWindow) {
      alert('Popup blocker prevented print window from opening. Please allow popups or download SVG directly.');
      return;
    }
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Voyager 1 JPL Flight Certificate Print</title>
          <style>
            @page { size: landscape; margin: 0; }
            body { margin: 0; padding: 0; background: #000; display: flex; align-items: center; justify-content: center; height: 100vh; }
            svg { width: 100vw; height: 100vh; max-width: 100%; max-height: 100%; display: block; }
          </style>
        </head>
        <body>
          ${svgStr}
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  /**
   * Trigger browser file download
   */
  static downloadReport(state = {}, format = 'txt') {
    const safeState = state || {};
    let content, mimeType, extension;

    if (format === 'json') {
      content = JSON.stringify(this.generateReport(safeState), null, 2);
      mimeType = 'application/json';
      extension = 'json';
    } else {
      content = this.generateTextSummary(safeState);
      mimeType = 'text/plain';
      extension = 'txt';
    }

    const candidateId = safeState.candidateId || 'MJS77-CANDIDATE-7701';
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Voyager1-JPL-Flight-Dossier-${candidateId}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
