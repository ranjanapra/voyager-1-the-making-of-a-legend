import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { HISTORICAL_CHRONOLOGY, SUBSYSTEM_DOSSIER } from './src/scripts/story/mission-data.js';
import { SILENT_INSTRUMENTS, OPERATING_INTERSTELLAR_INSTRUMENTS, CHALLENGE_ALIGNMENT_INFO } from './src/scripts/story/silent-hardware-data.js';
import { ENGINEERING_ROLES } from './src/scripts/tasks/roles-data.js';
import { ASSEMBLY_STAGES } from './src/scripts/simulation/assembly-workflow.js';

const htmlContent = readFileSync('index.html', 'utf-8');
const entryCss = readFileSync('src/styles/entry.css', 'utf-8');
const exploreCss = readFileSync('src/styles/explore.css', 'utf-8');
const invitationCss = readFileSync('src/styles/invitation.css', 'utf-8');
const starsJs = readFileSync('src/scripts/three/stars.js', 'utf-8');

console.log('=== BATCH 01 VERIFICATION TEST SUITE ===\n');

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
// WP-01: Silent Hardware Archive Navigation & Content
// -------------------------------------------------------------
console.log('--- WP-01: Silent Hardware Archive ---');
assert(!htmlContent.includes('id="section-silent-archive"'), 'Silent Hardware Archive removed from homepage scrolling sections');
assert(htmlContent.includes('id="tab-btn-silent-archive"'), 'Silent Hardware Archive dedicated tab button present in Explore Hub');
assert(htmlContent.includes('id="explore-pane-silent-archive"'), 'Dedicated container explore-pane-silent-archive exists');
assert(SILENT_INSTRUMENTS.length === 7, `7 Silent Instruments defined (actual: ${SILENT_INSTRUMENTS.length})`);
assert(OPERATING_INTERSTELLAR_INSTRUMENTS.length === 4, `4 Operating Instruments defined (actual: ${OPERATING_INTERSTELLAR_INSTRUMENTS.length})`);
assert(OPERATING_INTERSTELLAR_INSTRUMENTS[3].acronym === 'PWS', 'Plasma Wave Subsystem (PWS) is final 11th instrument');
assert(CHALLENGE_ALIGNMENT_INFO.distinction.includes('not an abandoned'), 'Crucial scientific distinction present');

// -------------------------------------------------------------
// WP-02: Page 3 Explore Introduction Clean-up
// -------------------------------------------------------------
console.log('\n--- WP-02: Page 3 Explore Introduction ---');
assert(htmlContent.includes('Anime Voyager Mission Poster.png'), 'Girl poster restored on Page 3 accurately per UI Correction 24');
assert(htmlContent.includes('<span>HISTORICAL RESOURCE HUB</span>'), 'Badge updated to HISTORICAL RESOURCE HUB');
assert(!htmlContent.includes('JPL ARCHIVE // HISTORICAL RESEARCH HUB'), 'No JPL Archive label in Section 03 header');
assert(!htmlContent.includes('VOYAGER 1 // STUDENT MISSION EXPLORATION DOSSIER'), 'Unwanted boy badge caption removed');
assert(!htmlContent.includes('class="explore-chapters-summary"'), 'Summary chapters preview boxes removed from Section 03');
assert(htmlContent.includes('id="btn-start-explore"'), 'Primary LET\'S EXPLORE button preserved');

// -------------------------------------------------------------
// WP-03: Explore Hub Category Numbering
// -------------------------------------------------------------
console.log('\n--- WP-03: Explore Hub Category Numbering ---');
assert(htmlContent.includes('<span>01 VISUALIZE VOYAGER 1</span>'), 'Tab 1 numbered 01');
assert(htmlContent.includes('<span>02 THE GOLDEN RECORD</span>'), 'Tab 2 numbered 02');
assert(htmlContent.includes('<span>03 RESEARCH ARCHIVE</span>'), 'Tab 3 numbered 03');
assert(htmlContent.includes('<span>04 THE SILENT HARDWARE ARCHIVE</span>'), 'Tab 4 numbered 04');
assert(!htmlContent.includes('<span>0. VISUALIZE'), 'No 0. index');

// -------------------------------------------------------------
// WP-04: Historical Briefing undefined Data Fix
// -------------------------------------------------------------
console.log('\n--- WP-04: Historical Briefing Data ---');
let chronologyHasUndefined = false;
HISTORICAL_CHRONOLOGY.forEach(item => {
  if (!item.year || !item.event || !item.desc || item.event === 'undefined' || item.desc === 'undefined') {
    chronologyHasUndefined = true;
  }
});
assert(!chronologyHasUndefined && HISTORICAL_CHRONOLOGY.length >= 5, 'Chronology 1972-1977 has zero undefined fields');

let dossierHasUndefined = false;
SUBSYSTEM_DOSSIER.forEach(item => {
  if (!item.system || !item.tag || !item.description || !item.specs || item.specs === 'undefined') {
    dossierHasUndefined = true;
  }
});
assert(!dossierHasUndefined && SUBSYSTEM_DOSSIER.length >= 5, 'Subsystem Dossier has zero undefined fields and verified baseline specs');

// -------------------------------------------------------------
// WP-05: Historical Briefing Controls & Modal Accessibility
// -------------------------------------------------------------
console.log('\n--- WP-05: Historical Briefing Controls ---');
assert(!htmlContent.includes('[ESC / CLOSE]'), 'Replaced [ESC / CLOSE] text');
assert(htmlContent.includes('>Close</button>'), 'Clean Close button rendered');
assert(!htmlContent.includes('[ESC / RETURN]'), 'Replaced [ESC / RETURN] text');
assert(entryCss.includes('visibility: hidden;'), '.modal-overlay has visibility: hidden when closed');
assert(entryCss.includes('visibility: visible;'), '.modal-overlay.active has visibility: visible');

// -------------------------------------------------------------
// WP-06: Homepage Spacecraft Caption Removal
// -------------------------------------------------------------
console.log('\n--- WP-06: Homepage Spacecraft Caption Removal ---');
assert(!htmlContent.includes('AUTHENTIC NASA/JPL 1977 SPACECRAFT ARCHITECTURE'), 'Unwanted spacecraft caption removed from hero visual');

// -------------------------------------------------------------
// WP-07: Homepage Three.js Model Full Scroll Continuity
// -------------------------------------------------------------
console.log('\n--- WP-07: Three.js Model Scroll Continuity ---');
const aboutVisibleMatch = starsJs.includes("else if (pageId === 'about') {\n        // Full scroll continuity: Voyager 1 model remains visible against deep interstellar cosmos\n        earthGroup.visible = true;\n        celestialGroup.visible = true;\n        spacecraftGroup.visible = true;");
assert(aboutVisibleMatch || starsJs.includes("spacecraftGroup.visible = true;\n        sunLight.color.set(0xffffff);\n        rimLight.color.set(0x60a5fa);"), 'Spacecraft group remains visible when pageId === about');

// -------------------------------------------------------------
// WP-08: Page 2 Image Border & Spacing
// -------------------------------------------------------------
console.log('\n--- WP-08: Page 2 Image Border & Spacing ---');
assert(invitationCss.includes('padding: 8px;'), 'Dark gap padding (8px) present on image frame');
assert(invitationCss.includes('border: 1px solid rgba(245, 158, 11, 0.55);'), 'Single golden border on outer frame');
assert(!invitationCss.includes('.invitation-image-frame::before'), 'Corner bracket pseudo-elements removed (no double borders)');

// -------------------------------------------------------------
// WP-09: Build With Us 4 Roles & Workflow
// -------------------------------------------------------------
console.log('\n--- WP-09: Build With Us Workflow ---');
assert(ENGINEERING_ROLES.length === 4, 'All 4 engineering roles configured');
assert(ENGINEERING_ROLES.some(r => r.id === 'science-payload'), 'Role 4 science-payload present and configured');

// -------------------------------------------------------------
// WP-10: Section 02 Stages Flow
// -------------------------------------------------------------
console.log('\n--- WP-10: Section 02 Stages Flow ---');
assert(ASSEMBLY_STAGES.length === 6, '6 sequential assembly stages verified');
assert(htmlContent.includes('BUILD WITH US — 1977 SPACECRAFT ASSEMBLY'), 'Section 02 title reflects authentic assembly focus');

console.log(`\n========================================`);
console.log(`RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`========================================`);

if (failCount > 0) process.exit(1);
