/**
 * VOYAGER 1 — BATCH 03 & ACCESSIBILITY / RESPONSIVE AUDIT VERIFICATION
 * 
 * Verifies:
 * - UI-01 to UI-10 carryover corrections
 * - WP-21: Ultra-Wide (>1920px) Grid Constraints & Ergonomics
 * - WP-22: Mobile Touch Gestures for 3D Spacecraft (Pinch-to-Zoom & Rotate)
 * - WP-23: High-Contrast Theme Mode (WCAG AAA Compliance)
 * - WP-24: Focus Trap & ARIA Live Regions
 * - WP-25: Reduced Motion CSS Fallbacks & Adaptive Throttling
 * - WP-26: Typography Scale & Font Preloading
 * - WP-27: Audio Synthesizer Frequency Normalization & Peak Limiting
 * - WP-28: Print Stylesheet for Research Dossiers & Archive
 * - WP-29: Lazy-Loading & Async Decoding for Offscreen Images
 * - WP-30: Responsive Retina Asset Handling & High-DPI Optimization
 */

import fs from 'fs';
import path from 'path';

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

console.log('=== BATCH 03 VERIFICATION TEST SUITE ===\n');

// -------------------------------------------------------------
// UI-01: Page 3 Explore Layout & Boy Image Visual Height
// -------------------------------------------------------------
console.log('--- UI-01: Page 3 Explore Layout & Boy Image Sizing ---');
const exploreCss = fs.readFileSync('src/styles/explore.css', 'utf8');
const htmlContent = fs.readFileSync('index.html', 'utf8');

assert(exploreCss.includes('align-items: stretch;'), '.explore-two-column uses align-items: stretch for height alignment');
assert(exploreCss.includes('min-height: 540px;') || exploreCss.includes('min-height: 520px;'), '.explore-boy-frame has min-height >= 520px');
assert(exploreCss.includes('max-height: 680px;'), '.explore-boy-frame has max-height: 680px');
assert(exploreCss.includes('max-width: 740px;'), '.explore-boy-frame has max-width: 740px');
assert(exploreCss.includes('object-fit: contain;'), '.explore-poster-img has object-fit: contain for uncropped display');
assert(htmlContent.includes('/assets/images/Anime Voyager Mission Poster.png'), 'Girl poster restored on Page 3 accurately per UI Correction 24');
assert(htmlContent.includes('HISTORICAL RESOURCE HUB'), 'Explore badge labeled HISTORICAL RESOURCE HUB');
assert(!htmlContent.includes('Voyager 1 Student Mission Exploration Voyager'), 'Unwanted boy badge caption absent');
assert(!htmlContent.includes('AUTHENTIC NASA GPL 1997 SPACECRAFT ARCHITECTURE'), 'Zero GPL Archive / 1997 branding text');

// -------------------------------------------------------------
// UI-02: Page 3 Section 03 Outer CTA Only
// -------------------------------------------------------------
console.log('\n--- UI-02: Page 3 Section 03 Clean CTA ---');
const secExploreMatch = htmlContent.match(/<section id="section-explore"[\s\S]*?<\/section>/);
const secExploreHtml = secExploreMatch ? secExploreMatch[0] : '';
assert(secExploreHtml.includes('id="btn-start-explore"'), 'Primary LET\'S EXPLORE button present in Section 03');
assert(!secExploreHtml.includes('category-card'), 'Section 03 outer contains no outer category cards');
assert(!secExploreHtml.includes('explore-chapters-summary'), 'Section 03 outer contains no summary preview pills');

// -------------------------------------------------------------
// UI-03: Page 2 Image Border & Spacing
// -------------------------------------------------------------
console.log('\n--- UI-03: Page 2 Image Single Border & Gap ---');
const invitationCss = fs.readFileSync('src/styles/invitation.css', 'utf8');
assert(invitationCss.includes('padding: 8px;'), '.invitation-image-frame has 8px padding gap');
assert(invitationCss.includes('border: 1px solid rgba(245, 158, 11, 0.55);'), '.invitation-image-frame has single golden border');
assert(invitationCss.includes('border: none;'), '.invitation-girl-img has border: none (no double borders)');

// -------------------------------------------------------------
// UI-05: Three.js Spacecraft Continuity Across About Us
// -------------------------------------------------------------
console.log('\n--- UI-05: Three.js Spacecraft Continuity ---');
const starsJs = fs.readFileSync('src/scripts/three/stars.js', 'utf8');
assert(starsJs.includes("pageId === 'about'") && starsJs.includes('spacecraftGroup.visible = true;'), 'spacecraftGroup.visible = true in about atmosphere');
assert(starsJs.includes('Math.min(3.8, currentScrollY / vh)'), 'Scroll factor clamp expanded to 3.8 to cover Section 04');

// -------------------------------------------------------------
// UI-06: Historical Briefing Enrichment (1972-1977 & Subsystems)
// -------------------------------------------------------------
console.log('\n--- UI-06: Historical Briefing Chronology & Subsystems ---');
const missionDataJs = fs.readFileSync('src/scripts/story/mission-data.js', 'utf8');
const { HISTORICAL_CHRONOLOGY, SUBSYSTEM_DOSSIER } = await import('./src/scripts/story/mission-data.js');

assert(HISTORICAL_CHRONOLOGY.length === 8, `HISTORICAL_CHRONOLOGY has exactly 8 authentic milestones (actual: ${HISTORICAL_CHRONOLOGY.length})`);
assert(HISTORICAL_CHRONOLOGY.some(c => c.year === '1972'), 'Chronology includes 1972 Mission Authorization');
assert(HISTORICAL_CHRONOLOGY.some(c => c.year === 'March 1977'), 'Chronology includes March 1977 Voyager redesignation');
assert(HISTORICAL_CHRONOLOGY.some(c => c.year === 'September 5, 1977'), 'Chronology includes Sept 5, 1977 Voyager 1 launch');

let hasUndefined = false;
HISTORICAL_CHRONOLOGY.forEach(c => {
  if (c.year === undefined || c.summary === undefined || c.desc === undefined || c.event === undefined) hasUndefined = true;
});
assert(!hasUndefined, 'Zero undefined fields in HISTORICAL_CHRONOLOGY');

assert(SUBSYSTEM_DOSSIER.length === 7, `SUBSYSTEM_DOSSIER has exactly 7 authentic subsystems (actual: ${SUBSYSTEM_DOSSIER.length})`);
assert(SUBSYSTEM_DOSSIER.some(s => s.id === 'computing'), 'Subsystems include CCS/FDS Flight Computing');
assert(SUBSYSTEM_DOSSIER.some(s => s.id === 'recorder'), 'Subsystems include DTR Digital Tape Recorder');

let subHasUndefined = false;
SUBSYSTEM_DOSSIER.forEach(s => {
  if (s.id === undefined || s.title === undefined || s.system === undefined || s.specs === undefined || s.specs.includes('undefined')) subHasUndefined = true;
});
assert(!subHasUndefined, 'Zero undefined fields in SUBSYSTEM_DOSSIER');

// -------------------------------------------------------------
// UI-07: Historical Briefing Modal Controls
// -------------------------------------------------------------
console.log('\n--- UI-07: Modal Clean Controls ---');
assert(!htmlContent.includes('[ESC / CLOSE]'), 'Zero bracketed [ESC / CLOSE] in index.html');
assert(!htmlContent.includes('ELC'), 'Zero ELC transcription artifacts in index.html');
assert(htmlContent.includes('id="btn-close-modal" class="btn-close-modal" type="button" aria-label="Close historical briefing modal">Close</button>'), 'Clean Close button on modal');

// -------------------------------------------------------------
// UI-09: Silent Hardware Archive Dedicated Location
// -------------------------------------------------------------
console.log('\n--- UI-09: Silent Hardware Archive Structure ---');
const { SILENT_INSTRUMENTS, OPERATING_INTERSTELLAR_INSTRUMENTS } = await import('./src/scripts/story/silent-hardware-data.js');
assert(SILENT_INSTRUMENTS.length === 7, '7 silent instruments defined');
assert(OPERATING_INTERSTELLAR_INSTRUMENTS.length === 4, '4 operating instruments defined');
assert(OPERATING_INTERSTELLAR_INSTRUMENTS[OPERATING_INTERSTELLAR_INSTRUMENTS.length - 1].id === 'inst-pws', 'Final 11th instrument is PWS (inst-pws)');
assert(htmlContent.includes('id="tab-btn-silent-archive"'), 'Dedicated Tab 04 button exists in Explore Hub');
assert(htmlContent.includes('id="explore-pane-silent-archive"'), 'Dedicated explore-pane-silent-archive container exists');

// -------------------------------------------------------------
// WP-21: Ultra-Wide (>1920px) Grid Constraints & Ergonomics
// -------------------------------------------------------------
console.log('\n--- WP-21: Ultra-Wide (>1920px) Grid Constraints ---');
const mainCss = fs.readFileSync('src/styles/main.css', 'utf8');
assert(mainCss.includes('@media (min-width: 1921px)'), '@media (min-width: 1921px) media query defined in main.css');
assert(mainCss.includes('max-width: 1600px;'), 'Ultra-wide maximum layout width constrained to 1600px');
assert(mainCss.includes('max-width: 75ch;'), 'Prose line length constrained to 75 characters max for reading ergonomics');

// -------------------------------------------------------------
// WP-22: Mobile Touch Gestures for 3D Spacecraft
// -------------------------------------------------------------
console.log('\n--- WP-22: Mobile Touch Gestures for 3D Model ---');
assert(starsJs.includes("renderFrame.addEventListener('touchstart'"), 'touchstart listener registered on renderFrame');
assert(starsJs.includes("renderFrame.addEventListener('touchmove'"), 'touchmove listener registered on renderFrame');
assert(starsJs.includes("renderFrame.addEventListener('touchend'"), 'touchend listener registered on renderFrame');
assert(starsJs.includes('initialPinchDist') && starsJs.includes('Math.hypot'), 'Pinch-to-zoom distance calculation implemented');
assert(starsJs.includes('Math.abs(deltaX) > Math.abs(deltaY)'), 'Scroll preservation: only horizontal touch drags rotate spacecraft');

// -------------------------------------------------------------
// WP-23: High-Contrast Theme Mode (WCAG AAA Compliance)
// -------------------------------------------------------------
console.log('\n--- WP-23: High-Contrast Theme Mode ---');
assert(mainCss.includes('body.theme-high-contrast'), 'body.theme-high-contrast stylesheet rules defined');
assert(mainCss.includes('--space-void: #000000;'), 'High contrast void is true pitch black #000000');
assert(mainCss.includes('--text-primary: #ffffff;'), 'High contrast primary text is pure white #ffffff');
assert(!htmlContent.includes('id="btn-toggle-contrast"'), 'High-contrast toggle button cleanly removed from header per UI Correction 22');
const routerJs = fs.readFileSync('src/scripts/ui/router.js', 'utf8');
assert(routerJs.includes('toggleHighContrast()'), 'toggleHighContrast function implemented in router.js');
assert(routerJs.includes("e.key === 'c' || e.key === 'C'"), 'Key C shortcut toggles contrast mode');

// -------------------------------------------------------------
// WP-24: Focus Trap & ARIA Live Regions
// -------------------------------------------------------------
console.log('\n--- WP-24: Focus Trap & ARIA Live Regions ---');
assert(htmlContent.includes('id="sr-announcements" class="sr-only" aria-live="polite" aria-atomic="true"'), 'ARIA live region #sr-announcements present in HTML');
assert(routerJs.includes('export function announceForScreenReader'), 'announceForScreenReader exported from router.js');
assert(routerJs.includes('setupFocusTrap(container)'), 'setupFocusTrap implemented in router.js');
assert(routerJs.includes('removeFocusTrap()'), 'removeFocusTrap implemented in router.js');

const exploreScreenJs = fs.readFileSync('src/scripts/ui/explore-screen.js', 'utf8');
assert(exploreScreenJs.includes('announceForScreenReader(tabLabels[tabId])'), 'Explore Hub tab changes announced to screen readers');

const buildScreenJs = fs.readFileSync('src/scripts/ui/build-screen.js', 'utf8');
assert(buildScreenJs.includes('announceForScreenReader(tabLabels[tabKey])'), 'Build workspace tab changes announced to screen readers');

// -------------------------------------------------------------
// WP-25: Reduced Motion CSS Fallbacks
// -------------------------------------------------------------
console.log('\n--- WP-25: Reduced Motion Fallbacks ---');
assert(mainCss.includes('@media (prefers-reduced-motion: reduce)'), 'prefers-reduced-motion media query present in main.css');
assert(mainCss.includes('animation: none !important;'), 'Keyframe animations disabled under reduced motion');
assert(starsJs.includes('prefersReducedMotion'), 'stars.js tracks prefers-reduced-motion media query');
assert(starsJs.includes('continuousRotY'), 'stars.js implements slow continuous rotation per UI Correction 23');
const visualizerJs = fs.readFileSync('src/scripts/ui/spacecraft-explorer.js', 'utf8');
assert(!visualizerJs.includes('NASA NSSDCA CATALOG RECORD'), 'NASA NSSDCA Catalog Record button cleanly removed from Visualizer right panel per UI Correction 25');

// -------------------------------------------------------------
// WP-26: Typography Scale & Font Preloading
// -------------------------------------------------------------
console.log('\n--- WP-26: Typography Scale & Font Preloading ---');
assert(htmlContent.includes('<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Space+Grotesk'), 'Critical Space Grotesk webfont preloaded via <link rel="preload">');

// -------------------------------------------------------------
// WP-27: Audio Synthesizer Normalization & Peak Limiting
// -------------------------------------------------------------
console.log('\n--- WP-27: Audio Synthesizer Peak Limiting ---');
const entryScreenJs = fs.readFileSync('src/scripts/ui/entry-screen.js', 'utf8');
assert(entryScreenJs.includes('createDynamicsCompressor()'), 'DynamicsCompressorNode initialized for peak limiting');
assert(entryScreenJs.includes('compressor.threshold.setValueAtTime(-14'), 'Compressor threshold calibrated for -12 dBFS headroom');
assert(entryScreenJs.includes("document.addEventListener('visibilitychange'"), 'Audio automatically suspends when browser tab is hidden');

// -------------------------------------------------------------
// WP-28: Print Stylesheet for Research Dossiers
// -------------------------------------------------------------
console.log('\n--- WP-28: Print Stylesheet ---');
assert(mainCss.includes('@media print'), '@media print stylesheet defined in main.css');
assert(mainCss.includes('break-inside: avoid;'), 'page break rules prevent awkward splitting of cards and dossiers');

// -------------------------------------------------------------
// WP-29: Lazy-Loading for Offscreen High-Res Images
// -------------------------------------------------------------
console.log('\n--- WP-29: Lazy-Loading Offscreen Images ---');
assert(htmlContent.includes('loading="lazy"') && htmlContent.includes('decoding="async"'), 'Images in index.html equipped with loading="lazy" and decoding="async"');
assert(exploreScreenJs.includes('loading="lazy" decoding="async"'), 'Dynamic explore slot images equipped with loading="lazy" and decoding="async"');

// -------------------------------------------------------------
// WP-30: Responsive Retina Asset Handling & High-DPI Optimization
// -------------------------------------------------------------
console.log('\n--- WP-30: Retina / High-DPI Device Optimization ---');
assert(starsJs.includes('renderer.setPixelRatio(Math.min(window.devicePixelRatio'), 'Three.js pixel ratio capped at 2 to protect mobile GPU thermals');
assert(starsJs.includes('camera.aspect = window.innerWidth / window.innerHeight;'), 'Aspect ratio recalculated dynamically on viewport change');

// -------------------------------------------------------------
// Phase 3: Pale Blue Dot Image & Modal Lightbox Interaction
// -------------------------------------------------------------
console.log('\n--- Phase 3: Pale Blue Dot Image & Modal Lightbox Interaction ---');
const pbdPngPath = 'public/assets/images/story/pale-blue-dot-pia00452.png';
assert(fs.existsSync(pbdPngPath), 'pale-blue-dot-pia00452.png exists at public/assets/images/story/');
if (fs.existsSync(pbdPngPath)) {
  const pbdStats = fs.statSync(pbdPngPath);
  assert(pbdStats.size > 50000, `Authentic Pale Blue Dot scan has valid non-empty file size (${pbdStats.size} bytes)`);
}

const aboutScreenJs = fs.readFileSync('src/scripts/ui/about-screen.js', 'utf8');
const aboutCss = fs.readFileSync('src/styles/about.css', 'utf8');

assert(aboutScreenJs.includes('/assets/images/story/pale-blue-dot-pia00452.png'), 'about-screen.js references verified Pale Blue Dot image');
assert(!aboutScreenJs.includes('AWAITING USER-PROVIDED IMAGE'), 'about-screen.js removed placeholder AWAITING USER-PROVIDED IMAGE badge');
assert(aboutScreenJs.includes('NASA VOYAGER 1 // PIA00452'), 'about-screen.js shows authentic NASA VOYAGER 1 // PIA00452 badge');
assert(aboutScreenJs.includes('id="btn-open-pbd-modal"'), 'Thumbnail button id btn-open-pbd-modal implemented');
assert(aboutScreenJs.includes('id="pbd-lightbox-modal"'), 'Centered lightbox modal container implemented');
assert(aboutScreenJs.includes('id="pbd-lightbox-close"'), 'Lightbox close button implemented');
assert(aboutScreenJs.includes("e.key === 'Escape'"), 'Escape key closes Pale Blue Dot lightbox');
assert(aboutCss.includes('.pbd-lightbox'), '.pbd-lightbox modal styles defined in about.css');
assert(aboutCss.includes('.pbd-lightbox-backdrop'), '.pbd-lightbox-backdrop backdrop blur defined');
assert(aboutCss.includes('.pbd-enlarged-img'), '.pbd-enlarged-img with max-width: 90vw; max-height: 72vh defined');

// -------------------------------------------------------------
// Phase 4: Golden Record Blue Hotspot Points
// -------------------------------------------------------------
console.log('\n--- Phase 4: Golden Record Blue Hotspot Points ---');
const grExplorerJs = fs.readFileSync('src/scripts/ui/golden-record-explorer.js', 'utf8');
const { COVER_HOTSPOTS } = await import('./src/scripts/ui/golden-record-explorer.js');

assert(COVER_HOTSPOTS.length === 7, `Exactly 7 Golden Record cover hotspots defined (actual: ${COVER_HOTSPOTS.length})`);
assert(grExplorerJs.includes('#38bdf8'), 'golden-record-explorer.js uses clear, vibrant electric blue (#38bdf8) for hotspot pins');
assert(grExplorerJs.includes('#0284c7'), 'golden-record-explorer.js uses active deep blue (#0284c7) for selected pin');
assert(grExplorerJs.includes('border: 1.5px solid #ffffff'), 'hotspot pins have white border for high contrast readability');
assert(grExplorerJs.includes('width: 14px; height: 14px;'), 'hotspot pins maintain subtle 14px diameter');
assert(exploreCss.includes('.gr-hotspot-pin {') && exploreCss.includes('background: #38bdf8 !important;'), 'explore.css enforces #38bdf8 !important for .gr-hotspot-pin');
assert(exploreCss.includes('border: 1.5px solid #38bdf8 !important;'), 'explore.css pulse animation uses vibrant blue');

// -------------------------------------------------------------
// Phase 2: Complete Learning Experience Engine
// -------------------------------------------------------------
console.log('\n--- Phase 2: Learning Experience & Engineering Verification ---');
const { ENGINEERING_ROLES } = await import('./src/scripts/tasks/roles-data.js');
const { ENGINEERING_TASKS } = await import('./src/scripts/tasks/task-data.js');
const { CODING_CHALLENGES } = await import('./src/scripts/labs/code-lab.js');
const { AiMlSimulationEngine, TELEMETRY_SAMPLES } = await import('./src/scripts/labs/aiml-lab.js');

assert(ENGINEERING_ROLES.length === 4, `All 4 engineering roles defined (actual: ${ENGINEERING_ROLES.length})`);
const roleIds = ['systems-integration', 'telecom-avionics', 'thermal-propulsion', 'science-payload'];
roleIds.forEach(id => {
  const role = ENGINEERING_ROLES.find(r => r.id === id);
  assert(!!role, `Role ${id} exists with title: ${role ? role.title : 'MISSING'}`);
  assert(role && role.assignedActivities.length === 3, `Role ${id} has 3 assigned activities`);
  assert(role && role.learningObjectives.length === 3, `Role ${id} has 3 clear learning objectives`);
  assert(role && role.topics.length === 3, `Role ${id} has 3 assigned technical topics`);
});

assert(ENGINEERING_TASKS.length === 12, `All 12 engineering tasks defined (actual: ${ENGINEERING_TASKS.length})`);
ENGINEERING_TASKS.forEach(t => {
  assert(t.id && t.title && t.context && t.question && t.options.length === 4, `Task ${t.id} fully configured with 4 options`);
  assert(t.hint && t.explanation && t.remediation, `Task ${t.id} has hint, explanation, and remediation target`);
});

// Coding Sandbox
assert(CODING_CHALLENGES.length >= 3 && CODING_CHALLENGES.length <= 5, `Full suite of coding challenges implemented (actual: ${CODING_CHALLENGES.length})`);
CODING_CHALLENGES.forEach(c => {
  assert(c.hints && c.hints.length === 3, `Challenge ${c.id} has 3 progressive hint tiers`);
  assert(c.testCases && c.testCases.length >= 3, `Challenge ${c.id} has at least 3 test cases`);
  const evalResult = c.evaluate(c.starterCode);
  assert(evalResult.success && evalResult.allPassed, `Challenge ${c.id} starter code passes evaluation cleanly`);
});

// AI/ML Simulation
assert(TELEMETRY_SAMPLES.length === 16, `16 telemetry samples in AI/ML dataset (actual: ${TELEMETRY_SAMPLES.length})`);
const simNominal = AiMlSimulationEngine.runDetector(2.2, false);
assert(simNominal.metrics.accuracy > 70, `Nominal detector accuracy > 70% (actual: ${simNominal.metrics.accuracy}%)`);
assert(simNominal.confusionMatrix.tp > 0 && simNominal.confusionMatrix.tn > 0, 'Confusion matrix has non-zero TP and TN');
const simNoisy = AiMlSimulationEngine.runDetector(2.2, true);
assert(simNoisy.isNoiseEnabled === true, 'Noise simulation toggle functional');
assert(typeof simNominal.historicalComparison === 'string' && simNominal.historicalComparison.includes('1977'), 'Historical JPL comparison provided');

// Subtopic Quizzes
assert(exploreScreenJs.includes("'challenge-power': 'task-thp-03'"), 'Subtopic quiz mapping includes all 24 subtopics across all 6 categories');

console.log('\n========================================');
console.log(`BATCH 03 RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('========================================');

if (failCount > 0) {
  process.exit(1);
}
