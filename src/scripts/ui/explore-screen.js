import { EXPLORE_CATEGORIES } from '../story/explore-data.js';
import { ASSET_CONFIG, getAssetUrl } from '../../config/assets.js';
import { getImageManifestBySubtopicCode } from '../../config/image-manifest.js';
import { renderSpacecraftExplorer } from './spacecraft-explorer.js';
import { renderGoldenRecordExplorer } from './golden-record-explorer.js';
import { renderSilentArchiveInto } from './silent-archive-screen.js';
import { TaskEngine } from '../tasks/task-engine.js';
import { missionStore } from '../core/mission-state.js';
import { announceForScreenReader } from './router.js';

/**
 * Section 03 & Independent Full-Page Explore Voyager 1 Controller
 * 
 * 1. Main Website Section 03:
 *    - Introduction Screen with verified heliopause milestone.
 *    - Multi-entry buttons: Visualize Voyager 1, The Golden Record, Research Archives.
 * 
 * 2. Independent Full-Page Explore Hub (#view-page-explore):
 *    - Top-left ← BACK control returns to main website.
 *    - Master Tabs:
 *      1. "1. VISUALIZE VOYAGER 1" (12-hotspot interactive schematic)
 *      2. "2. THE GOLDEN RECORD" (3-view & 7-chapter interactive explorer)
 *      3. "3. RESEARCH ARCHIVES" (All 6 Categories in responsive grid)
 *    - Level 2: Subtopics for selected category.
 *    - Level 3: Dedicated detailed research dossier with verified technical specs & NASA imagery.
 *    - Independent vertical scrolling.
 */

export function initExploreScreen(scrollController) {
  const btnStartExplore = document.getElementById('btn-start-explore');
  const btnExploreRecord = document.getElementById('btn-explore-record');
  const btnExploreArchives = document.getElementById('btn-explore-archives');

  const level1Container = document.getElementById('explore-level-1');
  const level2Container = document.getElementById('explore-level-2');
  const level3Container = document.getElementById('explore-level-3');

  const paneSpacecraft = document.getElementById('explore-pane-spacecraft');
  const paneGoldenRecord = document.getElementById('explore-pane-golden-record');
  const paneCategories = document.getElementById('explore-pane-categories');
  const paneSilentArchive = document.getElementById('explore-pane-silent-archive');
  const navTabs = document.querySelectorAll('.btn-explore-nav-tab');

  const categoryGrid = document.getElementById('category-cards-grid');
  const level2Content = document.getElementById('level-2-content');
  const level3Content = document.getElementById('level-3-content');

  let activeExploreTab = 'spacecraft';
  let currentCategory = null;
  let currentSubtopic = null;
  let selectedExploreQuizOption = {};

  const SUBTOPIC_TASK_MAP = {
    // 01. Spacecraft Parts & Construction
    'parts-hga': 'task-tel-02',
    'parts-rtg': 'task-thp-03',
    'parts-magboom': 'task-sci-01',
    'parts-record': 'task-sci-02',
    // 02. How It Was Built
    'built-origins': 'task-sys-01',
    'built-cleanroom': 'task-sys-02',
    'built-testing': 'task-thp-02',
    'built-computers': 'task-tel-03',
    // 03. Launch Preparation
    'launch-date': 'task-sys-01',
    'launch-timing': 'task-tel-01',
    'launch-vehicle': 'task-sys-01',
    'launch-fueling': 'task-thp-01',
    // 04. Science & Data Collection
    'data-platform': 'task-sys-03',
    'data-particles': 'task-sci-01',
    'data-recorder': 'task-tel-03',
    'data-dsn': 'task-tel-01',
    // 05. The Planetary Journey
    'journey-jupiter': 'task-sci-03',
    'journey-saturn': 'task-tel-02',
    'journey-titan': 'task-sci-03',
    'journey-palebluedot': 'task-sci-03',
    // 06. Technical Challenges & Solutions
    'challenge-launchburn': 'task-sys-01',
    'challenge-thrusters': 'task-thp-01',
    'challenge-memory': 'task-tel-03',
    'challenge-power': 'task-thp-03'
  };

  // Visual SVG Icons for Level 1 Categories
  const categoryIcons = {
    antenna: `
      <svg class="cat-icon-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path d="M6 34 C12 18 36 18 42 34" stroke-linecap="round"/>
        <line x1="24" y1="20" x2="24" y2="42" stroke-linecap="round"/>
        <circle cx="24" cy="14" r="3.5" fill="currentColor"/>
        <line x1="16" y1="42" x2="32" y2="42" stroke-linecap="round"/>
        <line x1="12" y1="36" x2="36" y2="36" stroke-linecap="round"/>
      </svg>
    `,
    cleanroom: `
      <svg class="cat-icon-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <rect x="8" y="10" width="32" height="28" rx="2"/>
        <circle cx="24" cy="22" r="6"/>
        <path d="M14 36 C14 30 18 28 24 28 C30 28 34 30 34 36" stroke-linecap="round"/>
        <line x1="8" y1="16" x2="40" y2="16"/>
      </svg>
    `,
    rocket: `
      <svg class="cat-icon-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path d="M24 6 C24 6 15 14 15 28 L33 28 C33 14 24 6 24 6 Z"/>
        <circle cx="24" cy="19" r="3"/>
        <path d="M15 28 L9 35 L15 34 Z"/>
        <path d="M33 28 L39 35 L33 34 Z"/>
        <path d="M20 34 L20 40 L24 43 L28 40 L28 34"/>
      </svg>
    `,
    instruments: `
      <svg class="cat-icon-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <circle cx="24" cy="24" r="14"/>
        <circle cx="24" cy="24" r="5"/>
        <line x1="24" y1="4" x2="24" y2="10"/>
        <line x1="24" y1="38" x2="24" y2="44"/>
        <line x1="4" y1="24" x2="10" y2="24"/>
        <line x1="38" y1="24" x2="44" y2="24"/>
      </svg>
    `,
    planets: `
      <svg class="cat-icon-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <circle cx="24" cy="24" r="11"/>
        <ellipse cx="24" cy="24" rx="20" ry="6" transform="rotate(-25 24 24)"/>
      </svg>
    `,
    wrench: `
      <svg class="cat-icon-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path d="M37 11 C34 8 29 8 26 11 L11 26 C8 29 8 34 11 37 C14 40 19 40 22 37 L37 22 C40 19 40 14 37 11 Z"/>
        <circle cx="34" cy="14" r="2.5"/>
        <line x1="18" y1="30" x2="24" y2="36" stroke-linecap="round"/>
      </svg>
    `
  };

  // --------------------------------------------------------------------------
  // Tab Switcher for Level 1 Views
  // --------------------------------------------------------------------------
  function switchExploreTab(tabId) {
    activeExploreTab = tabId;
    navTabs.forEach(tab => {
      const match = tab.getAttribute('data-explore-tab') === tabId;
      tab.classList.toggle('active', match);
      tab.setAttribute('aria-selected', match ? 'true' : 'false');
    });

    const tabLabels = {
      'spacecraft': 'Explore Tab 01: Visualize Voyager 1 Spacecraft',
      'golden-record': 'Explore Tab 02: The Golden Record Interstellar Time Capsule',
      'categories': 'Explore Tab 03: Research Archive (6 Categories)',
      'silent-archive': 'Explore Tab 04: The Silent Hardware Archive (11 Instruments)'
    };
    if (tabLabels[tabId]) {
      announceForScreenReader(tabLabels[tabId]);
    }

    if (paneSpacecraft) paneSpacecraft.style.display = tabId === 'spacecraft' ? 'block' : 'none';
    if (paneGoldenRecord) paneGoldenRecord.style.display = tabId === 'golden-record' ? 'block' : 'none';
    if (paneCategories) paneCategories.style.display = tabId === 'categories' ? 'block' : 'none';
    if (paneSilentArchive) paneSilentArchive.style.display = tabId === 'silent-archive' ? 'block' : 'none';

    if (tabId === 'spacecraft' && paneSpacecraft && !paneSpacecraft.dataset.rendered) {
      renderSpacecraftExplorer(paneSpacecraft);
      paneSpacecraft.dataset.rendered = 'true';
    } else if (tabId === 'golden-record' && paneGoldenRecord && !paneGoldenRecord.dataset.rendered) {
      renderGoldenRecordExplorer(paneGoldenRecord);
      paneGoldenRecord.dataset.rendered = 'true';
    } else if (tabId === 'categories') {
      renderLevel1();
    } else if (tabId === 'silent-archive' && paneSilentArchive && !paneSilentArchive.dataset.rendered) {
      renderSilentArchiveInto(paneSilentArchive);
      paneSilentArchive.dataset.rendered = 'true';
    }
  }

  window.__switchExploreTab = switchExploreTab;

  navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const tid = tab.getAttribute('data-explore-tab');
      if (tid) switchExploreTab(tid);
    });
  });

  // --------------------------------------------------------------------------
  // Single Primary Button on Section 03: "LET'S EXPLORE!"
  // --------------------------------------------------------------------------
  const openExploreHub = (targetTab = 'spacecraft') => {
    if (scrollController && typeof scrollController.openIndependentPage === 'function') {
      scrollController.openIndependentPage('explore-hub');
    } else {
      window.location.hash = '#explore-hub';
    }
    showLevel1(targetTab);
  };

  btnStartExplore?.addEventListener('click', (e) => {
    e.preventDefault();
    openExploreHub('spacecraft');
  });

  // --------------------------------------------------------------------------
  // LEVEL 1: Render All Six Categories
  // --------------------------------------------------------------------------
  function renderLevel1() {
    if (!categoryGrid) return;

    categoryGrid.innerHTML = EXPLORE_CATEGORIES.map((cat) => `
      <div class="category-card" data-category-id="${cat.id}" tabindex="0" role="button" aria-label="Explore ${cat.title}">
        <div class="card-visual-placeholder">
          <div class="visual-placeholder-inner">
            ${categoryIcons[cat.iconType] || categoryIcons.antenna}
          </div>
          <span class="category-index-badge">CATEGORY 0${cat.categoryNum}</span>
        </div>

        <div class="category-card-body">
          <h4 class="category-card-title">${cat.title}</h4>
          <div class="category-card-subtitle">${cat.shortSubtitle}</div>
          <p class="category-card-summary">${cat.summary}</p>
        </div>

        <div class="category-card-action">
          <span class="action-text">EXPLORE CATEGORY &bull; ${cat.subtopics.length} SUBTOPICS</span>
          <span class="action-arrow" aria-hidden="true">&rarr;</span>
        </div>
      </div>
    `).join('');

    // Attach click and keyboard handlers
    categoryGrid.querySelectorAll('.category-card').forEach((card) => {
      const openCategory = () => {
        const catId = card.getAttribute('data-category-id');
        const cat = EXPLORE_CATEGORIES.find(c => c.id === catId);
        if (cat) showLevel2(cat);
      };

      card.addEventListener('click', openCategory);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCategory();
        }
      });
    });
  }

  function showLevel1(targetTab = null) {
    currentCategory = null;
    currentSubtopic = null;
    if (level1Container) level1Container.classList.add('active');
    if (level2Container) level2Container.classList.remove('active');
    if (level3Container) level3Container.classList.remove('active');
    switchExploreTab(targetTab || activeExploreTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --------------------------------------------------------------------------
  // LEVEL 2: Show Selected Category & Its Subtopics ONLY
  // --------------------------------------------------------------------------
  function showLevel2(category) {
    currentCategory = category;

    // Switch views
    if (level1Container) level1Container.classList.remove('active');
    if (level2Container) level2Container.classList.add('active');
    if (level3Container) level3Container.classList.remove('active');

    if (level2Content) {
      level2Content.innerHTML = `
        <!-- Level 2 Navigation Bar & Breadcrumb -->
        <div class="level-nav-bar">
          <button class="btn-level-back btn-back-to-explorer" type="button" aria-label="Return to Category Overview">
            <span aria-hidden="true">&larr;</span>
            <span>BACK TO CATEGORIES</span>
          </button>
          <div class="level-breadcrumb" aria-label="Breadcrumb">
            <span class="crumb-link btn-back-to-explorer">CATEGORIES</span>
            <span class="crumb-sep">/</span>
            <span class="crumb-current">${category.title.toUpperCase()}</span>
          </div>
        </div>

        <!-- Category Overview Deck -->
        <div class="category-overview-deck">
          <div class="cat-deck-badge">
            <span class="phase-led" aria-hidden="true"></span>
            <span>CATEGORY 0${category.categoryNum} // VERIFIED ARCHIVAL RECORDS</span>
          </div>
          <h3 class="category-deck-title">${category.title}</h3>
          <div class="category-deck-subtitle">${category.shortSubtitle}</div>
          <p class="category-deck-overview">${category.overview}</p>
          <div class="category-select-prompt">[SELECT A SUBTOPIC CARD BELOW TO OPEN DETAILED RESEARCH DOSSIER]</div>
        </div>

        <!-- Subtopics Responsive Grid -->
        <div class="subtopic-cards-grid">
          ${category.subtopics.map(sub => {
            const manifestItem = getImageManifestBySubtopicCode(sub.code);
            const outerImageUrl = (manifestItem && manifestItem.url) ? manifestItem.url : (ASSET_CONFIG.explore[sub.imageSlotKey]?.url || null);
            const outerImageCaption = (manifestItem && manifestItem.title) ? manifestItem.title : sub.title;

            return `
              <div class="subtopic-card" data-subtopic-id="${sub.id}" tabindex="0" role="button" aria-label="Inspect ${sub.title}">
                <div class="subtopic-card-header">
                  <span class="subtopic-code">SUBTOPIC ${sub.code}</span>
                  <span class="phase-led" aria-hidden="true"></span>
                </div>

                <div class="subtopic-card-image-frame">
                  <img src="${getAssetUrl(outerImageUrl)}" alt="${outerImageCaption}" class="subtopic-card-img" loading="lazy" decoding="async" />
                </div>

                <div class="subtopic-card-body">
                  <h4 class="subtopic-card-title">${sub.title}</h4>
                  <div class="subtopic-focus-pill">${sub.shortSubtitle}</div>
                  <p class="subtopic-card-preview">${sub.preview}</p>
                </div>

                <div class="subtopic-card-action">
                  <span class="action-text">INSPECT RESEARCH DOSSIER</span>
                  <span class="action-arrow" aria-hidden="true">&rarr;</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Level 2 Bottom Return Action -->
        <div class="level-bottom-action-bar">
          <button class="btn-level-back btn-back-to-explorer" type="button" aria-label="Return to Category Overview">
            <span aria-hidden="true">&larr;</span>
            <span>BACK TO CATEGORIES</span>
          </button>
        </div>
      `;

      // Attach Level 2 back handlers
      level2Content.querySelectorAll('.btn-back-to-explorer').forEach((btn) => {
        btn.addEventListener('click', () => showLevel1('categories'));
      });

      // Attach subtopic click handlers
      level2Content.querySelectorAll('.subtopic-card').forEach((card) => {
        const openSubtopic = () => {
          const subId = card.getAttribute('data-subtopic-id');
          const sub = category.subtopics.find(s => s.id === subId);
          if (sub) showLevel3(sub);
        };

        card.addEventListener('click', openSubtopic);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openSubtopic();
          }
        });
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --------------------------------------------------------------------------
  // LEVEL 3: Show Dedicated Subtopic Detailed Research View
  // Page 3 Layout: <LEFT: RELEVANT IMAGE> | <RIGHT: TEXT/CONTENT + QUIZ>
  // Flow: Study Topic -> Explanation/Research -> Practical Activity -> Related Quiz -> Next Topic
  // --------------------------------------------------------------------------
  function showLevel3(subtopic) {
    currentSubtopic = subtopic;

    // Switch views
    if (level1Container) level1Container.classList.remove('active');
    if (level2Container) level2Container.classList.remove('active');
    if (level3Container) level3Container.classList.add('active');

    const imgAsset = ASSET_CONFIG.explore[subtopic.imageSlotKey] || {};
    const manifestItem = getImageManifestBySubtopicCode(subtopic.code);
    const effectiveImageUrl = (manifestItem && manifestItem.url) ? manifestItem.url : (imgAsset ? imgAsset.url : null);
    const effectiveCaption = (manifestItem && manifestItem.title) ? manifestItem.title : subtopic.imageSlotLabel;
    const effectiveDesc = (manifestItem && manifestItem.description) ? manifestItem.description : (imgAsset.caption || subtopic.catalogRef);
    const effectiveCredit = (manifestItem && manifestItem.nasaSource) ? manifestItem.nasaSource : (imgAsset.credit || 'NASA/JPL Archives');
    const taskId = SUBTOPIC_TASK_MAP[subtopic.id];
    const matchingTask = taskId ? TaskEngine.getTaskById(taskId) : null;
    const missionState = missionStore.getState();
    const isCompleted = matchingTask ? (missionState.completedTasks || []).includes(matchingTask.id) : false;
    const submission = matchingTask ? missionState.taskSubmissions[matchingTask.id] : null;
    const selectedChoice = matchingTask ? (selectedExploreQuizOption[matchingTask.id] || (submission ? submission.answer : null)) : null;

    // Find next subtopic in current category for sequential progression
    let nextSubtopic = null;
    if (currentCategory && currentCategory.subtopics) {
      const curIdx = currentCategory.subtopics.findIndex(s => s.id === subtopic.id);
      if (curIdx >= 0 && curIdx < currentCategory.subtopics.length - 1) {
        nextSubtopic = currentCategory.subtopics[curIdx + 1];
      }
    }

    if (level3Content) {
      level3Content.innerHTML = `
        <!-- Level 3 Navigation Bar & Breadcrumb -->
        <div class="level-nav-bar">
          <div class="nav-button-group">
            <button class="btn-level-back btn-back-to-category" type="button" aria-label="Return to Subtopics">
              <span aria-hidden="true">&larr;</span>
              <span>BACK TO ${currentCategory.title.toUpperCase()}</span>
            </button>
            <button class="btn-level-secondary btn-back-to-explorer" type="button" aria-label="Return to Categories">
              <span>ALL CATEGORIES</span>
            </button>
          </div>

          <div class="level-breadcrumb" aria-label="Breadcrumb">
            <span class="crumb-link btn-back-to-explorer">CATEGORIES</span>
            <span class="crumb-sep">/</span>
            <span class="crumb-link btn-back-to-category">${currentCategory.title.toUpperCase()}</span>
            <span class="crumb-sep">/</span>
            <span class="crumb-current">${subtopic.title.toUpperCase()}</span>
          </div>
        </div>

        <!-- Detail Research Dossier Container -->
        <article class="detail-research-panel" aria-labelledby="dossier-title">
          <!-- Page 3 Two-Column Stage: <LEFT: RELEVANT IMAGE> | <RIGHT: TEXT/CONTENT> -->
          <div class="page3-two-column-stage">
            <!-- LEFT COLUMN: RELEVANT IMAGE -->
            <div class="page3-image-col">
              <div class="page3-image-frame">
                ${effectiveImageUrl ? `
                  <img src="${getAssetUrl(effectiveImageUrl)}" alt="${effectiveCaption}" class="page3-slot-img" loading="lazy" decoding="async" />
                  <div class="page3-image-caption">
                    <strong style="color: #fbbf24;">${effectiveCaption}:</strong> ${effectiveDesc} &bull; <span style="color: #94a3b8;">${effectiveCredit}</span>
                  </div>
                ` : `
                  <div class="dossier-image-placeholder">
                    <div class="placeholder-hud-grid" aria-hidden="true"></div>
                    <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #fbbf24; letter-spacing: 0.1em; margin-bottom: 0.5rem; text-transform: uppercase;">
                      ASSIGNED IMAGE SLOT // ${manifestItem ? manifestItem.id : subtopic.code}
                    </div>
                    <div class="placeholder-caption-title">${manifestItem ? manifestItem.title : subtopic.imageSlotLabel}</div>
                    <div class="placeholder-subtext" style="color: #f59e0b; font-weight: 700; margin: 0.5rem 0;">
                      [STATUS: AWAITING IMAGE // VERIFIED NASA ARCHIVE SLOT]
                    </div>
                    <p style="font-size: 0.75rem; color: #94a3b8; max-width: 380px; line-height: 1.4; margin: 0 auto 0.5rem auto;">
                      ${manifestItem ? manifestItem.description : 'Expected archival imagery designated for future verification.'}
                    </p>
                    <div class="placeholder-credit">Target: <code>${manifestItem ? (manifestItem.expectedPath || manifestItem.fileName) : subtopic.catalogRef}</code> &bull; Source: ${manifestItem ? manifestItem.nasaSource : 'NASA/JPL Documentation'}</div>
                  </div>
                `}
              </div>
            </div>

            <!-- RIGHT COLUMN: TEXT/CONTENT + ACTIVITY + QUIZ -->
            <div class="page3-content-col">
              <header class="dossier-header-deck">
                <div class="dossier-meta-row">
                  <span class="dossier-code-badge">SUBTOPIC ${subtopic.code} // NASA/JPL DOCUMENTED ARCHIVE</span>
                  <span class="dossier-catalog-ref">CATALOG REF: ${subtopic.catalogRef}</span>
                </div>
                <h3 id="dossier-title" class="dossier-main-title">${subtopic.title}</h3>
                <div class="dossier-subtitle">${subtopic.shortSubtitle}</div>
              </header>

              <!-- Materials & Purpose Technical Callouts -->
              <div class="dossier-callout-grid">
                <div class="dossier-callout-card">
                  <span class="callout-label">ENGINEERING MATERIALS:</span>
                  <p class="callout-body">${subtopic.material}</p>
                </div>
                <div class="dossier-callout-card">
                  <span class="callout-label">SUBSYSTEM PURPOSE:</span>
                  <p class="callout-body">${subtopic.purpose}</p>
                </div>
              </div>

              <!-- Verified Facts & Explanations -->
              <div class="dossier-facts-section">
                <h4 class="facts-section-heading">VERIFIED FACTS &amp; HISTORICAL EXPLANATIONS</h4>
                <ul class="dossier-facts-list">
                  ${subtopic.facts.map(fact => `
                    <li class="fact-item">
                      <span class="fact-tick" aria-hidden="true">&gt;</span>
                      <span>${fact}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <!-- Interactive Learning Activities (Priority 5) -->
              ${renderSubtopicInteractiveActivity(subtopic)}

              <!-- Related Topic Quiz (Directly follows study topic & activity!) -->
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
                      <button class="task-option-btn btn-explore-quiz-opt ${selectedChoice === opt.id ? 'selected' : ''}" data-task-id="${matchingTask.id}" data-opt-id="${opt.id}" type="button">
                        <span class="btn-led" style="${selectedChoice === opt.id ? 'background: #fbbf24;' : ''}"></span>
                        <span>${opt.label}</span>
                      </button>
                    `).join('')}
                  </div>

                  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-top: 1.25rem;">
                    <button class="btn-submit-explore-task btn-assemble-stage" data-task-id="${matchingTask.id}" type="button" ${!selectedChoice ? 'disabled' : ''}>
                      SUBMIT ANSWER FOR VERIFICATION
                    </button>
                    <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #94a3b8;">[Hint: ${matchingTask.hint}]</span>
                  </div>

                  ${submission ? `
                    <div class="task-feedback-box ${submission.passed ? 'success' : 'error'}" style="margin-top: 1.25rem;">
                      <div style="font-weight: 700; font-family: var(--font-mono); margin-bottom: 0.25rem;">
                        ${submission.feedback}
                      </div>
                      <div>${submission.explanation}</div>
                    </div>
                  ` : ''}

                  ${isCompleted ? `
                    <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed rgba(16, 185, 129, 0.3); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                      <span style="font-family: var(--font-mono); font-size: 0.8rem; color: #10b981; font-weight: 700;">
                        &check; Topic mastered. Telemetry updated.
                      </span>
                      ${nextSubtopic ? `
                        <button class="btn-next-subtopic btn-assemble-stage" data-next-id="${nextSubtopic.id}" type="button">
                          NEXT TOPIC: ${nextSubtopic.title.toUpperCase()} &rarr;
                        </button>
                      ` : `
                        <button class="btn-back-to-category btn-assemble-stage" type="button">
                          CATEGORY COMPLETED // BACK TO SUBTOPICS &rarr;
                        </button>
                      `}
                    </div>
                  ` : ''}
                </div>
              ` : ''}

              <!-- Official NASA/JPL Archival Citations -->
              <footer class="dossier-sources-deck">
                <div class="sources-title">OFFICIAL ARCHIVAL SOURCES &amp; CITATIONS</div>
                <div class="sources-grid">
                  ${subtopic.sources.map(src => `
                    <div class="source-card">
                      <span class="source-bullet" aria-hidden="true">&bull;</span>
                      <div class="source-details">
                        <strong class="source-name">${src.name}</strong>
                        <span class="source-desc">${src.desc}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </footer>
            </div>
          </div>

          <!-- Bottom Return Navigation -->
          <div class="level-bottom-action-bar">
            <button class="btn-level-back btn-back-to-category" type="button" aria-label="Return to Subtopics">
              <span aria-hidden="true">&larr;</span>
              <span>BACK TO ${currentCategory.title.toUpperCase()}</span>
            </button>
            <button class="btn-level-secondary btn-back-to-explorer" type="button" aria-label="Return to Categories">
              <span>ALL CATEGORIES</span>
            </button>
          </div>
        </article>
      `;

      // Attach Level 3 back handlers
      level3Content.querySelectorAll('.btn-back-to-category').forEach((btn) => {
        btn.addEventListener('click', () => showLevel2(currentCategory));
      });

      level3Content.querySelectorAll('.btn-back-to-explorer').forEach((btn) => {
        btn.addEventListener('click', () => showLevel1('categories'));
      });

      // Attach Inline Quiz Option Handlers
      level3Content.querySelectorAll('.btn-explore-quiz-opt').forEach((btn) => {
        btn.addEventListener('click', () => {
          const tId = btn.getAttribute('data-task-id');
          const optId = btn.getAttribute('data-opt-id');
          selectedExploreQuizOption[tId] = optId;
          showLevel3(currentSubtopic);
        });
      });

      // Attach Inline Quiz Submission Handlers
      level3Content.querySelectorAll('.btn-submit-explore-task').forEach((btn) => {
        btn.addEventListener('click', () => {
          const tId = btn.getAttribute('data-task-id');
          const choice = selectedExploreQuizOption[tId];
          if (choice) {
            missionStore.submitTask(tId, choice);
            showLevel3(currentSubtopic);
          }
        });
      });

      // Attach Next Subtopic Handler
      level3Content.querySelectorAll('.btn-next-subtopic').forEach((btn) => {
        btn.addEventListener('click', () => {
          const nextId = btn.getAttribute('data-next-id');
          const nextSub = currentCategory.subtopics.find(s => s.id === nextId);
          if (nextSub) {
            showLevel3(nextSub);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
      });

      // Attach Interactive Activity Handlers
      attachSubtopicInteractiveHandlers(subtopic, level3Content);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE LEARNING ACTIVITIES (Priority 5)
  // --------------------------------------------------------------------------
  function renderSubtopicInteractiveActivity(subtopic) {
    if (subtopic.id === 'parts-hga') {
      return `
        <!-- Activity 1: Antenna Signal Attenuation & Link Budget Calculator -->
        <section class="dossier-activity-card" style="margin: 2rem 0; padding: 1.75rem; background: radial-gradient(circle at 10% 20%, rgba(20, 26, 46, 0.9) 0%, rgba(8, 12, 22, 0.95) 100%); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="phase-led"></span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #fbbf24; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">INTERACTIVE RESEARCH LAB // SUBTOPIC 01.01</span>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #38bdf8; background: rgba(56, 189, 248, 0.15); border: 1px solid #38bdf8; padding: 0.2rem 0.5rem; border-radius: 3px;">
              MICROWAVE LINK BUDGET
            </span>
          </div>

          <h4 style="font-family: var(--font-heading); font-size: 1.25rem; color: #ffffff; margin: 0 0 0.5rem 0;">
            Antenna Signal Attenuation &amp; One-Way Light Time Calculator
          </h4>
          <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5; margin-bottom: 1.5rem;">
            Explore the inverse-square law of radio wave propagation. Adjust Voyager 1's distance from Earth to compute free-space path loss (FSPL), light travel time delay, and the maximum achievable telemetry bit rate to NASA's Deep Space Network.
          </p>

          <!-- Distance Slider -->
          <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <label for="slider-distance" style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; font-weight: 700;">
                VOYAGER 1 DISTANCE FROM EARTH (ASTRONOMICAL UNITS):
              </label>
              <span id="display-dist-au" style="font-family: var(--font-mono); font-size: 1.1rem; font-weight: 800; color: #ffffff;">165.0 AU</span>
            </div>
            <input id="slider-distance" type="range" min="1" max="175" step="0.5" value="165" style="width: 100%; accent-color: #fbbf24; cursor: pointer;" />
            <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8; margin-top: 0.25rem;">
              <span>1 AU (Earth)</span>
              <span>5.2 AU (Jupiter)</span>
              <span>9.5 AU (Saturn)</span>
              <span>121.6 AU (Heliopause)</span>
              <span>175 AU (Deep Space)</span>
            </div>
          </div>

          <!-- Quick Jump Buttons -->
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
            <button class="btn-dist-preset" data-au="1.0" type="button" style="padding: 0.35rem 0.65rem; font-family: var(--font-mono); font-size: 0.7rem; background: rgba(14, 18, 30, 0.8); border: 1px solid rgba(245, 158, 11, 0.25); color: #cbd5e1; border-radius: 3px; cursor: pointer;">Earth (1 AU)</button>
            <button class="btn-dist-preset" data-au="5.2" type="button" style="padding: 0.35rem 0.65rem; font-family: var(--font-mono); font-size: 0.7rem; background: rgba(14, 18, 30, 0.8); border: 1px solid rgba(245, 158, 11, 0.25); color: #cbd5e1; border-radius: 3px; cursor: pointer;">Jupiter (5.2 AU)</button>
            <button class="btn-dist-preset" data-au="9.5" type="button" style="padding: 0.35rem 0.65rem; font-family: var(--font-mono); font-size: 0.7rem; background: rgba(14, 18, 30, 0.8); border: 1px solid rgba(245, 158, 11, 0.25); color: #cbd5e1; border-radius: 3px; cursor: pointer;">Saturn (9.5 AU)</button>
            <button class="btn-dist-preset" data-au="121.6" type="button" style="padding: 0.35rem 0.65rem; font-family: var(--font-mono); font-size: 0.7rem; background: rgba(14, 18, 30, 0.8); border: 1px solid rgba(245, 158, 11, 0.25); color: #cbd5e1; border-radius: 3px; cursor: pointer;">Heliopause (121.6 AU)</button>
            <button class="btn-dist-preset" data-au="165.0" type="button" style="padding: 0.35rem 0.65rem; font-family: var(--font-mono); font-size: 0.7rem; background: rgba(245, 158, 11, 0.2); border: 1px solid #fbbf24; color: #fbbf24; border-radius: 3px; cursor: pointer;">Present Day (165 AU)</button>
          </div>

          <!-- Dynamic Output Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-bottom: 1.25rem;">
            <div style="padding: 0.85rem; background: rgba(8, 12, 22, 0.8); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 4px;">
              <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8; text-transform: uppercase;">ONE-WAY LIGHT TIME</div>
              <div id="val-owlt" style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 800; color: #38bdf8; margin: 0.2rem 0;">22h 51m 40s</div>
              <div id="val-rtlt" style="font-size: 0.72rem; color: #94a3b8;">Round-Trip: 45h 43m 20s</div>
            </div>

            <div style="padding: 0.85rem; background: rgba(8, 12, 22, 0.8); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 4px;">
              <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8; text-transform: uppercase;">PHYSICAL DISTANCE</div>
              <div id="val-dist-km" style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 800; color: #fbbf24; margin: 0.2rem 0;">24.68 Billion km</div>
              <div id="val-dist-mi" style="font-size: 0.72rem; color: #94a3b8;">~15.34 Billion Miles</div>
            </div>

            <div style="padding: 0.85rem; background: rgba(8, 12, 22, 0.8); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 4px;">
              <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8; text-transform: uppercase;">SIGNAL ATTENUATION (FSPL)</div>
              <div id="val-fspl" style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 800; color: #f87171; margin: 0.2rem 0;">-44.3 dB vs 1 AU</div>
              <div id="val-loss-ratio" style="font-size: 0.72rem; color: #94a3b8;">Power factor: 1 / 27,225</div>
            </div>

            <div style="padding: 0.85rem; background: rgba(8, 12, 22, 0.8); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 4px;">
              <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8; text-transform: uppercase;">MAX DOWNLINK BIT RATE</div>
              <div id="val-bitrate" style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 800; color: #10b981; margin: 0.2rem 0;">160 bps</div>
              <div id="val-dsn-req" style="font-size: 0.72rem; color: #94a3b8;">DSN 70m Dish Required</div>
            </div>
          </div>

          <!-- Scientific Explanation Callout -->
          <div style="padding: 0.85rem 1rem; background: rgba(14, 18, 30, 0.7); border: 1px dashed rgba(245, 158, 11, 0.25); border-radius: 4px; font-size: 0.8rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 2rem;">
            <strong style="color: #fbbf24;">The Physics of Inverse-Square Attenuation ($1/r^2$):</strong> As radio microwaves spread spherically across space, power density decreases quadratically with distance. At 165 AU, Voyager 1's 23-Watt microwave transmitter arrives at Earth with an imperceptible power of approximately $10^{-18}$ Watts (one attowatt), requiring cryogenic liquid-helium-cooled ruby maser amplifiers on 70-meter DSN antennas.
          </div>

          <!-- WP-19: Deep Space Network Signal & Handover Simulator -->
          <div style="border-top: 1px solid rgba(56, 189, 248, 0.3); padding-top: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="phase-led" style="background: #38bdf8; box-shadow: 0 0 8px #38bdf8;"></span>
                <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #38bdf8; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">NASA DEEP SPACE NETWORK // 24-HOUR ROTATION &amp; SIGNAL SIMULATOR</span>
              </div>
              <span style="font-family: var(--font-mono); font-size: 0.7rem; color: #10b981; background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; padding: 0.2rem 0.5rem; border-radius: 3px;">
                3-STATION CONTINUOUS TRACKING
              </span>
            </div>

            <h5 style="font-family: var(--font-heading); font-size: 1.15rem; color: #ffffff; margin: 0 0 0.4rem 0;">
              Earth Rotation Handover &amp; Dish Pointing Alignment
            </h5>
            <p style="font-size: 0.825rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 1.25rem;">
              Because Earth rotates beneath deep-space probes, NASA maintains three 70-meter antenna complexes spaced ~120 degrees apart: <strong>Goldstone (California, DSS-14)</strong>, <strong>Madrid (Spain, DSS-63)</strong>, and <strong>Canberra (Australia, DSS-43)</strong>. Continuous telemetry reception requires seamless 8-hour handover passes and micro-radian dish pointing precision.
            </p>

            <!-- Earth Rotation 24-Hour Slider -->
            <div style="margin-bottom: 1.25rem; background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 4px; padding: 1rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
                <label for="slider-dsn-utc" style="font-family: var(--font-mono); font-size: 0.75rem; color: #38bdf8; font-weight: 700;">
                  EARTH ROTATION // UTC MISSION CLOCK:
                </label>
                <span id="display-dsn-utc" style="font-family: var(--font-mono); font-size: 1rem; font-weight: 800; color: #ffffff;">08:00 UTC</span>
              </div>
              <input id="slider-dsn-utc" type="range" min="0" max="24" step="0.5" value="8" style="width: 100%; accent-color: #38bdf8; cursor: pointer;" aria-label="UTC Earth rotation clock" />
              <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.675rem; color: #94a3b8; margin-top: 0.35rem;">
                <span>00:00 UTC (Goldstone View)</span>
                <span>08:00 UTC (Canberra View)</span>
                <span>16:00 UTC (Madrid View)</span>
                <span>24:00 UTC</span>
              </div>
            </div>

            <!-- Station Status Cards -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-bottom: 1.25rem;">
              <div id="card-dsn-goldstone" class="dsn-station-card" style="padding: 0.85rem; background: rgba(8, 14, 26, 0.9); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                  <span style="font-family: var(--font-mono); font-size: 0.7rem; color: #fbbf24; font-weight: 700;">GOLDSTONE DSS-14</span>
                  <span id="badge-goldstone" style="font-family: var(--font-mono); font-size: 0.65rem; padding: 2px 5px; border-radius: 2px; background: rgba(148, 163, 184, 0.2); color: #94a3b8;">BELOW HORIZON</span>
                </div>
                <div style="font-size: 0.75rem; color: #94a3b8;">Mojave Desert, California (35.4° N)</div>
                <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #cbd5e1; margin-top: 0.4rem;">Dish: 70m Cassegrain Parabola</div>
              </div>

              <div id="card-dsn-canberra" class="dsn-station-card" style="padding: 0.85rem; background: rgba(8, 14, 26, 0.9); border: 1px solid rgba(16, 185, 129, 0.6); border-radius: 4px; box-shadow: 0 0 10px rgba(16, 185, 129, 0.2);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                  <span style="font-family: var(--font-mono); font-size: 0.7rem; color: #10b981; font-weight: 700;">CANBERRA DSS-43</span>
                  <span id="badge-canberra" style="font-family: var(--font-mono); font-size: 0.65rem; padding: 2px 5px; border-radius: 2px; background: rgba(16, 185, 129, 0.2); color: #6ee7b7; font-weight: 700;">IN TRACK (PRIME)</span>
                </div>
                <div style="font-size: 0.75rem; color: #94a3b8;">Tidbinbilla, Australia (35.4° S)</div>
                <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #cbd5e1; margin-top: 0.4rem;">Dish: 70m Ultra-Sensitive S/X Feed</div>
              </div>

              <div id="card-dsn-madrid" class="dsn-station-card" style="padding: 0.85rem; background: rgba(8, 14, 26, 0.9); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                  <span style="font-family: var(--font-mono); font-size: 0.7rem; color: #fbbf24; font-weight: 700;">MADRID DSS-63</span>
                  <span id="badge-madrid" style="font-family: var(--font-mono); font-size: 0.65rem; padding: 2px 5px; border-radius: 2px; background: rgba(148, 163, 184, 0.2); color: #94a3b8;">BELOW HORIZON</span>
                </div>
                <div style="font-size: 0.75rem; color: #94a3b8;">Robledo de Chavela, Spain (40.4° N)</div>
                <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #cbd5e1; margin-top: 0.4rem;">Dish: 70m Low-Noise Maser Receiver</div>
              </div>
            </div>

            <!-- Dish Pointing & Signal Lock Terminal -->
            <div style="background: rgba(4, 7, 14, 0.95); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 4px; padding: 1.25rem; margin-bottom: 1.25rem;">
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #38bdf8; font-weight: 700; margin-bottom: 0.75rem;">
                DISH AZIMUTH &amp; ELEVATION POINTING ALIGNMENT:
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                <div>
                  <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.72rem; color: #cbd5e1; margin-bottom: 0.25rem;">
                    <span>ANTENNA AZIMUTH (0°–360°):</span>
                    <span id="val-azimuth" style="color: #fbbf24; font-weight: 700;">215°</span>
                  </div>
                  <input id="slider-azimuth" type="range" min="0" max="360" step="1" value="215" style="width: 100%; accent-color: #fbbf24; cursor: pointer;" aria-label="Antenna Azimuth angle">
                </div>
                <div>
                  <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.72rem; color: #cbd5e1; margin-bottom: 0.25rem;">
                    <span>ANTENNA ELEVATION (10°–88°):</span>
                    <span id="val-elevation" style="color: #38bdf8; font-weight: 700;">48°</span>
                  </div>
                  <input id="slider-elevation" type="range" min="10" max="88" step="1" value="48" style="width: 100%; accent-color: #38bdf8; cursor: pointer;" aria-label="Antenna Elevation angle">
                </div>
              </div>

              <!-- Signal Lock Meter -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem; background: rgba(0,0,0,0.5); padding: 0.75rem; border-radius: 4px;">
                <div class="metric-pill">
                  <div class="metric-pill-label">Carrier Lock</div>
                  <div id="meter-carrier-lock" class="metric-pill-val" style="color: #10b981; font-size: 0.95rem;">LOCKED</div>
                </div>
                <div class="metric-pill">
                  <div class="metric-pill-label">Signal-to-Noise (SNR)</div>
                  <div id="meter-snr" class="metric-pill-val" style="color: #38bdf8; font-size: 0.95rem;">+14.8 dB</div>
                </div>
                <div class="metric-pill">
                  <div class="metric-pill-label">Telemetry Subcarrier</div>
                  <div id="meter-telemetry-sync" class="metric-pill-val" style="color: #10b981; font-size: 0.95rem;">SYNCED (160 bps)</div>
                </div>
                <div class="metric-pill">
                  <div class="metric-pill-label">Cryo Maser Temp</div>
                  <div class="metric-pill-val" style="color: #a78bfa; font-size: 0.95rem;">4.2 K (-269°C)</div>
                </div>
              </div>
            </div>

            <!-- Educational Disclaimer Banner -->
            <div style="padding: 0.75rem 1rem; background: rgba(14, 18, 30, 0.75); border-left: 3px solid #38bdf8; font-size: 0.775rem; color: #94a3b8; line-height: 1.5;">
              <strong style="color: #38bdf8;">EDUCATIONAL SIMULATION NOTICE:</strong> This interactive simulator demonstrates the geometry of 3-complex Earth rotation handovers and inverse-square radio attenuation. It simulates antenna pointing parameters and telemetry acquisition for educational purposes and is not directly wired to live real-time DSN operations.
            </div>
          </div>
        </section>
      `;
    }

    if (subtopic.id === 'journey-titan') {
      return `
        <!-- Activity 2: Titan Trajectory Dilemma -->
        <section class="dossier-activity-card" style="margin: 2rem 0; padding: 1.75rem; background: radial-gradient(circle at 10% 20%, rgba(20, 26, 46, 0.9) 0%, rgba(8, 12, 22, 0.95) 100%); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="phase-led"></span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #fbbf24; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">INTERACTIVE RESEARCH LAB // SUBTOPIC 05.03</span>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #f59e0b; background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; padding: 0.2rem 0.5rem; border-radius: 3px;">
              HISTORICAL ORBITAL MECHANICS TRADE-OFF
            </span>
          </div>

          <h4 style="font-family: var(--font-heading); font-size: 1.25rem; color: #ffffff; margin: 0 0 0.5rem 0;">
            The Titan Trajectory Dilemma: Titan Close Encounter vs Pluto Grand Tour
          </h4>
          <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5; margin-bottom: 1.5rem;">
            In November 1980, NASA and JPL engineers had to make an irrevocable flight path selection. Prioritizing a close flyby of Titan's mysterious dense atmosphere would gravitationally whip Voyager 1 out of the ecliptic plane, permanently foreclosing visits to Uranus, Neptune, and Pluto.
          </p>

          <!-- Interactive Choice Buttons -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
            <button id="btn-choice-titan-close" type="button" class="btn-titan-tradeoff active" style="padding: 1.25rem; text-align: left; background: rgba(14, 18, 30, 0.9); border: 2px solid #10b981; border-radius: 6px; cursor: pointer; transition: all 0.2s;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #10b981; font-weight: 700;">OPTION A [THE HISTORICAL CHOICE]</span>
                <span class="badge-titan-status" style="font-family: var(--font-mono); font-size: 0.7rem; color: #10b981; font-weight: 700;">&check; EXECUTED BY NASA</span>
              </div>
              <h5 style="color: #ffffff; font-size: 1.05rem; margin: 0 0 0.5rem 0;">Close Titan Encounter (6,900 km Altitude)</h5>
              <p style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5; margin: 0;">
                Fly deep into Titan's atmosphere shadow. Measure atmospheric temperature, surface pressure, and nitrogen/methane composition.
              </p>
            </button>

            <button id="btn-choice-titan-pluto" type="button" class="btn-titan-tradeoff" style="padding: 1.25rem; text-align: left; background: rgba(8, 12, 22, 0.7); border: 2px solid rgba(245, 158, 11, 0.25); border-radius: 6px; cursor: pointer; transition: all 0.2s;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; font-weight: 700;">OPTION B [THE ALTERNATE PATH]</span>
                <span class="badge-titan-status" style="font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8;">REJECTED IN 1980</span>
              </div>
              <h5 style="color: #ffffff; font-size: 1.05rem; margin: 0 0 0.5rem 0;">Pluto Grand Tour Trajectory</h5>
              <p style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5; margin: 0;">
                Bypass Titan at a wide distance (350,000 km). Preserve orbital velocity in the ecliptic plane to reach Pluto in 1986.
              </p>
            </button>
          </div>

          <!-- Dynamic Trade-off Analysis Box -->
          <div id="titan-analysis-box" style="padding: 1.25rem; background: rgba(8, 12, 22, 0.85); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 4px; margin-bottom: 1.25rem;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
              <div>
                <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8; text-transform: uppercase;">POST-SATURN TRAJECTORY INCLINATION:</div>
                <div id="titan-inclination" style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 800; color: #f59e0b; margin-top: 0.2rem;">+35.5° North (Out of Ecliptic)</div>
                <div id="titan-inclination-sub" style="font-size: 0.72rem; color: #94a3b8; margin-top: 0.2rem;">Planetary flybys permanently ended.</div>
              </div>

              <div>
                <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8; text-transform: uppercase;">SCIENTIFIC RECONNAISSANCE RETURN:</div>
                <div id="titan-science-return" style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 800; color: #10b981; margin-top: 0.2rem;">1.5 atm Dense Atmosphere Discovered</div>
                <div id="titan-science-sub" style="font-size: 0.72rem; color: #94a3b8; margin-top: 0.2rem;">Confirmed nitrogen atmosphere &amp; hydrocarbon lakes.</div>
              </div>

              <div>
                <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8; text-transform: uppercase;">MISSION TRADEOFF SACRIFICE:</div>
                <div id="titan-sacrifice" style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 800; color: #ef4444; margin-top: 0.2rem;">Foreclosed Pluto Reconnaissance</div>
                <div id="titan-sacrifice-sub" style="font-size: 0.72rem; color: #94a3b8; margin-top: 0.2rem;">Pluto exploration deferred until New Horizons (2015).</div>
              </div>
            </div>

            <div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px dashed rgba(245, 158, 11, 0.25); font-size: 0.8rem; color: #e2e8f0; line-height: 1.5;">
              <strong style="color: #fbbf24;">Archival Historical Resolution:</strong> <span id="titan-historical-text">JPL Project Scientist Dr. Edward Stone and the Voyager Science Steering Group deemed Titan's prebiotic atmosphere the highest-priority target in the outer solar system. Because Voyager 2 was following 9 months behind as backup to explore Uranus and Neptune, Voyager 1 was deliberately committed to the Titan sacrifice.</span>
            </div>
          </div>
        </section>
      `;
    }

    if (subtopic.id === 'challenge-memory') {
      return `
        <!-- Activity 3: 2023-2024 FDS Memory Reallocation Puzzle -->
        <section class="dossier-activity-card" style="margin: 2rem 0; padding: 1.75rem; background: radial-gradient(circle at 10% 20%, rgba(20, 26, 46, 0.9) 0%, rgba(8, 12, 22, 0.95) 100%); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="phase-led"></span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #fbbf24; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">INTERACTIVE RESEARCH LAB // SUBTOPIC 06.03</span>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #10b981; background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; padding: 0.2rem 0.5rem; border-radius: 3px;">
              2024 DEEP SPACE COMPUTER RESCUE
            </span>
          </div>

          <h4 style="font-family: var(--font-heading); font-size: 1.25rem; color: #ffffff; margin: 0 0 0.5rem 0;">
            The 2023–2024 Flight Data System (FDS) Memory Reallocation Puzzle
          </h4>
          <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5; margin-bottom: 1.5rem;">
            In November 2023, Voyager 1's Flight Data System (FDS) failed, spewing corrupted repeating 1s and 0s. In April 2024, JPL engineers identified a defective 512-word memory chip in Block 4. With no single free 512-word block available, they divided the telemetry code across separate unused memory fragments. Can you reconstruct the historical memory patch?
          </p>

          <!-- 8-Block Memory Array -->
          <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; font-weight: 700; text-transform: uppercase;">FDS 8-BLOCK CORE MEMORY BUS (4,096 WORDS TOTAL):</span>
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #94a3b8;">REQUIRED CAPACITY: 512 WORDS</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.5rem;">
              <div style="padding: 0.65rem; background: rgba(14, 18, 30, 0.8); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 4px; text-align: center;">
                <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #94a3b8;">BLOCK 0</div>
                <div style="font-size: 0.7rem; color: #cbd5e1; margin: 0.2rem 0;">Executive Loop</div>
                <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #f59e0b;">[IN USE]</div>
              </div>

              <div style="padding: 0.65rem; background: rgba(14, 18, 30, 0.8); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 4px; text-align: center;">
                <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #94a3b8;">BLOCK 1</div>
                <div style="font-size: 0.7rem; color: #cbd5e1; margin: 0.2rem 0;">Science Interface</div>
                <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #f59e0b;">[IN USE]</div>
              </div>

              <label class="memory-sector-block" style="display: block; padding: 0.65rem; background: rgba(8, 12, 22, 0.9); border: 1px solid #38bdf8; border-radius: 4px; text-align: center; cursor: pointer;">
                <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #38bdf8;">BLOCK 2 (ALPHA)</div>
                <div style="font-size: 0.7rem; color: #ffffff; margin: 0.2rem 0;">Free: 192 Words</div>
                <input type="checkbox" class="chk-mem-sector" data-words="192" data-name="Block 2 (Alpha)" style="cursor: pointer;" />
              </label>

              <div style="padding: 0.65rem; background: rgba(14, 18, 30, 0.8); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 4px; text-align: center;">
                <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #94a3b8;">BLOCK 3</div>
                <div style="font-size: 0.7rem; color: #cbd5e1; margin: 0.2rem 0;">Attitude Driver</div>
                <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #f59e0b;">[IN USE]</div>
              </div>

              <div style="padding: 0.65rem; background: rgba(239, 68, 68, 0.15); border: 2px solid #ef4444; border-radius: 4px; text-align: center;">
                <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #f87171;">BLOCK 4</div>
                <div style="font-size: 0.7rem; color: #fca5a5; margin: 0.2rem 0; font-weight: 700;">FAULT 0xFF</div>
                <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #ef4444; font-weight: 700;">[CORRUPTED]</div>
              </div>

              <div style="padding: 0.65rem; background: rgba(14, 18, 30, 0.8); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 4px; text-align: center;">
                <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #94a3b8;">BLOCK 5</div>
                <div style="font-size: 0.7rem; color: #cbd5e1; margin: 0.2rem 0;">DSN Buffers</div>
                <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #f59e0b;">[IN USE]</div>
              </div>

              <label class="memory-sector-block" style="display: block; padding: 0.65rem; background: rgba(8, 12, 22, 0.9); border: 1px solid #38bdf8; border-radius: 4px; text-align: center; cursor: pointer;">
                <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #38bdf8;">BLOCK 6 (BETA)</div>
                <div style="font-size: 0.7rem; color: #ffffff; margin: 0.2rem 0;">Free: 256 Words</div>
                <input type="checkbox" class="chk-mem-sector" data-words="256" data-name="Block 6 (Beta)" style="cursor: pointer;" />
              </label>

              <label class="memory-sector-block" style="display: block; padding: 0.65rem; background: rgba(8, 12, 22, 0.9); border: 1px solid #38bdf8; border-radius: 4px; text-align: center; cursor: pointer;">
                <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #38bdf8;">BLOCK 7 (GAMMA)</div>
                <div style="font-size: 0.7rem; color: #ffffff; margin: 0.2rem 0;">Free: 128 Words</div>
                <input type="checkbox" class="chk-mem-sector" data-words="128" data-name="Block 7 (Gamma)" style="cursor: pointer;" />
              </label>
            </div>
          </div>

          <!-- Capacity Bar & Transmit Button -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #cbd5e1;">ALLOCATED MEMORY: </span>
              <span id="mem-allocated-val" style="font-family: var(--font-mono); font-size: 1rem; font-weight: 800; color: #f59e0b;">0 / 512 Words</span>
              <span id="mem-capacity-status" style="font-family: var(--font-mono); font-size: 0.72rem; color: #ef4444; margin-left: 0.5rem;">[INSUFFICIENT SPACE]</span>
            </div>

            <button id="btn-transmit-patch" type="button" class="btn-assemble-stage" style="padding: 0.65rem 1.25rem; font-size: 0.75rem;" disabled>
              TRANSMIT MEMORY PATCH VIA DSN (45-HR ROUND-TRIP) &rarr;
            </button>
          </div>

          <!-- Uplink & Telemetry Restore Screen -->
          <div id="memory-restore-screen" style="display: none; padding: 1.25rem; background: rgba(8, 12, 22, 0.95); border: 1px solid #10b981; border-radius: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #10b981; font-weight: 700;">&check; DSN COMM LINK SYNCHRONIZED &bull; APRIL 20, 2024 SUCCESS</span>
              <span style="font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8;">DSN DSS-63 MADRID</span>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: #38bdf8; line-height: 1.6; margin-bottom: 0.5rem;">
              &gt; Telemetry formatting package relocated to Blocks 2, 6, and 7 (576 words capacity allocated).<br>
              &gt; FDS pointers updated across all memory registers.<br>
              &gt; DECODED FRAME: [VOLTS: 29.8V | RTG: 224W | AACS SUN: NOMINAL | MAG: 0.05 nT | HEALTH: 100% NOMINAL]
            </div>
            <div style="font-size: 0.75rem; color: #cbd5e1; line-height: 1.4;">
              <strong style="color: #fbbf24;">NASA JPL Press Release (April 22, 2024):</strong> Voyager 1 has resumed returning readable health and status data for the first time in 5 months. The spacecraft is in good health and continues its historic interstellar flight outside the heliosphere.
            </div>
          </div>
        </section>
      `;
    }

    return '';
  }

  function attachSubtopicInteractiveHandlers(subtopic, container) {
    if (subtopic.id === 'parts-hga') {
      const slider = container.querySelector('#slider-distance');
      const dispAu = container.querySelector('#display-dist-au');
      const valOwlt = container.querySelector('#val-owlt');
      const valRtlt = container.querySelector('#val-rtlt');
      const valDistKm = container.querySelector('#val-dist-km');
      const valDistMi = container.querySelector('#val-dist-mi');
      const valFspl = container.querySelector('#val-fspl');
      const valLossRatio = container.querySelector('#val-loss-ratio');
      const valBitrate = container.querySelector('#val-bitrate');
      const valDsnReq = container.querySelector('#val-dsn-req');

      const updateCalculations = (au) => {
        const d = parseFloat(au);
        if (dispAu) dispAu.textContent = `${d.toFixed(1)} AU`;

        // Physical distance
        const km = d * 149597870.7;
        const mi = d * 92955807.3;
        if (valDistKm) valDistKm.textContent = `${(km / 1e9).toFixed(2)} Billion km`;
        if (valDistMi) valDistMi.textContent = `~${(mi / 1e9).toFixed(2)} Billion Miles`;

        // Light time
        const owltSec = km / 299792.458;
        const rtltSec = owltSec * 2;
        const formatSec = (s) => {
          const hrs = Math.floor(s / 3600);
          const mins = Math.floor((s % 3600) / 60);
          const secs = Math.round(s % 60);
          return `${hrs}h ${mins}m ${secs}s`;
        };
        if (valOwlt) valOwlt.textContent = formatSec(owltSec);
        if (valRtlt) valRtlt.textContent = `Round-Trip: ${formatSec(rtltSec)}`;

        // FSPL loss relative to 1 AU
        const deltaDb = 20 * Math.log10(d);
        if (valFspl) valFspl.textContent = `-${deltaDb.toFixed(1)} dB vs 1 AU`;
        const ratio = Math.round(d * d);
        if (valLossRatio) valLossRatio.textContent = `Power factor: 1 / ${ratio.toLocaleString()}`;

        // Bit rate calculation
        let bitrate = 115200;
        if (d > 5.2) {
          bitrate = Math.max(40, Math.round(115200 * Math.pow(5.2 / d, 2)));
        }
        if (valBitrate) {
          valBitrate.textContent = bitrate >= 1000 ? `${(bitrate / 1000).toFixed(1)} kbps` : `${bitrate} bps`;
        }
        if (valDsnReq) {
          valDsnReq.textContent = d > 10 ? 'DSN 70m Dish + Maser Amplifier' : 'DSN 34m High-Efficiency Dish';
        }
      };

      slider?.addEventListener('input', (e) => {
        updateCalculations(e.target.value);
      });

      container.querySelectorAll('.btn-dist-preset').forEach(btn => {
        btn.addEventListener('click', () => {
          const au = btn.getAttribute('data-au');
          if (slider) slider.value = au;
          updateCalculations(au);
          container.querySelectorAll('.btn-dist-preset').forEach(b => {
            b.style.background = 'rgba(14, 18, 30, 0.8)';
            b.style.borderColor = 'rgba(245, 158, 11, 0.25)';
            b.style.color = '#cbd5e1';
          });
          btn.style.background = 'rgba(245, 158, 11, 0.2)';
          btn.style.borderColor = '#fbbf24';
          btn.style.color = '#fbbf24';
        });
      });

      // Initial calculation
      updateCalculations(slider ? slider.value : 165);

      // WP-19: Deep Space Network Handover & Pointing Listeners
      const sliderUtc = container.querySelector('#slider-dsn-utc');
      const dispUtc = container.querySelector('#display-dsn-utc');
      const badgeGoldstone = container.querySelector('#badge-goldstone');
      const badgeCanberra = container.querySelector('#badge-canberra');
      const badgeMadrid = container.querySelector('#badge-madrid');
      const cardGoldstone = container.querySelector('#card-dsn-goldstone');
      const cardCanberra = container.querySelector('#card-dsn-canberra');
      const cardMadrid = container.querySelector('#card-dsn-madrid');

      const sliderAz = container.querySelector('#slider-azimuth');
      const sliderEl = container.querySelector('#slider-elevation');
      const valAz = container.querySelector('#val-azimuth');
      const valEl = container.querySelector('#val-elevation');
      const meterCarrier = container.querySelector('#meter-carrier-lock');
      const meterSnr = container.querySelector('#meter-snr');
      const meterSync = container.querySelector('#meter-telemetry-sync');

      const updateDsnStations = () => {
        const utcHour = parseFloat(sliderUtc?.value || 8);
        const hourFmt = Math.floor(utcHour).toString().padStart(2, '0');
        const minFmt = (utcHour % 1 !== 0) ? '30' : '00';
        if (dispUtc) dispUtc.textContent = `${hourFmt}:${minFmt} UTC`;

        const resetCard = (card, badge) => {
          if (!card || !badge) return;
          card.style.border = '1px solid rgba(245, 158, 11, 0.3)';
          card.style.boxShadow = 'none';
          badge.textContent = 'BELOW HORIZON';
          badge.style.background = 'rgba(148, 163, 184, 0.15)';
          badge.style.color = '#94a3b8';
        };

        const setPrime = (card, badge, name) => {
          if (!card || !badge) return;
          card.style.border = '1px solid rgba(16, 185, 129, 0.8)';
          card.style.boxShadow = '0 0 12px rgba(16, 185, 129, 0.25)';
          badge.textContent = 'IN TRACK (PRIME)';
          badge.style.background = 'rgba(16, 185, 129, 0.2)';
          badge.style.color = '#6ee7b7';
          badge.style.fontWeight = '700';
        };

        resetCard(cardGoldstone, badgeGoldstone);
        resetCard(cardCanberra, badgeCanberra);
        resetCard(cardMadrid, badgeMadrid);

        if (utcHour >= 0 && utcHour < 8) {
          setPrime(cardGoldstone, badgeGoldstone, 'Goldstone');
        } else if (utcHour >= 8 && utcHour < 16) {
          setPrime(cardCanberra, badgeCanberra, 'Canberra');
        } else {
          setPrime(cardMadrid, badgeMadrid, 'Madrid');
        }
      };

      const updateDishPointing = () => {
        const az = parseFloat(sliderAz?.value || 215);
        const el = parseFloat(sliderEl?.value || 48);
        if (valAz) valAz.textContent = `${az}°`;
        if (valEl) valEl.textContent = `${el}°`;

        // Nominal target: Azimuth ~215°, Elevation ~48°
        const azErr = Math.abs(az - 215);
        const elErr = Math.abs(el - 48);
        const totalErr = Math.sqrt(azErr * azErr + elErr * elErr);

        if (totalErr <= 20) {
          const snrVal = (15.5 - (totalErr / 20) * 5).toFixed(1);
          if (meterCarrier) {
            meterCarrier.textContent = 'LOCKED';
            meterCarrier.style.color = '#10b981';
          }
          if (meterSnr) {
            meterSnr.textContent = `+${snrVal} dB`;
            meterSnr.style.color = '#38bdf8';
          }
          if (meterSync) {
            meterSync.textContent = 'SYNCED (160 bps)';
            meterSync.style.color = '#10b981';
          }
        } else {
          if (meterCarrier) {
            meterCarrier.textContent = 'SEARCHING...';
            meterCarrier.style.color = '#ef4444';
          }
          if (meterSnr) {
            meterSnr.textContent = `-4.2 dB`;
            meterSnr.style.color = '#ef4444';
          }
          if (meterSync) {
            meterSync.textContent = 'UNLOCKED';
            meterSync.style.color = '#ef4444';
          }
        }
      };

      sliderUtc?.addEventListener('input', updateDsnStations);
      sliderAz?.addEventListener('input', updateDishPointing);
      sliderEl?.addEventListener('input', updateDishPointing);

      updateDsnStations();
      updateDishPointing();
    }

    if (subtopic.id === 'journey-titan') {
      const btnTitan = container.querySelector('#btn-choice-titan-close');
      const btnPluto = container.querySelector('#btn-choice-titan-pluto');
      const inclination = container.querySelector('#titan-inclination');
      const inclinationSub = container.querySelector('#titan-inclination-sub');
      const scienceReturn = container.querySelector('#titan-science-return');
      const scienceSub = container.querySelector('#titan-science-sub');
      const sacrifice = container.querySelector('#titan-sacrifice');
      const sacrificeSub = container.querySelector('#titan-sacrifice-sub');
      const historicalText = container.querySelector('#titan-historical-text');
      const box = container.querySelector('#titan-analysis-box');

      btnTitan?.addEventListener('click', () => {
        btnTitan.style.border = '2px solid #10b981';
        btnTitan.style.background = 'rgba(14, 18, 30, 0.9)';
        btnPluto.style.border = '2px solid rgba(245, 158, 11, 0.25)';
        btnPluto.style.background = 'rgba(8, 12, 22, 0.7)';
        if (box) box.style.borderColor = 'rgba(16, 185, 129, 0.4)';

        if (inclination) inclination.textContent = '+35.5° North (Out of Ecliptic)';
        if (inclinationSub) inclinationSub.textContent = 'Planetary flybys permanently ended.';
        if (scienceReturn) scienceReturn.textContent = '1.5 atm Dense Atmosphere Discovered';
        if (scienceSub) scienceSub.textContent = 'Confirmed nitrogen atmosphere & hydrocarbon lakes.';
        if (sacrifice) sacrifice.textContent = 'Foreclosed Pluto Reconnaissance';
        if (sacrificeSub) sacrificeSub.textContent = 'Pluto exploration deferred until New Horizons (2015).';
        if (historicalText) historicalText.textContent = "JPL Project Scientist Dr. Edward Stone and the Voyager Science Steering Group deemed Titan's prebiotic atmosphere the highest-priority target in the outer solar system. Because Voyager 2 was following 9 months behind as backup to explore Uranus and Neptune, Voyager 1 was deliberately committed to the Titan sacrifice.";
      });

      btnPluto?.addEventListener('click', () => {
        btnPluto.style.border = '2px solid #38bdf8';
        btnPluto.style.background = 'rgba(14, 18, 30, 0.9)';
        btnTitan.style.border = '2px solid rgba(245, 158, 11, 0.25)';
        btnTitan.style.background = 'rgba(8, 12, 22, 0.7)';
        if (box) box.style.borderColor = 'rgba(56, 189, 248, 0.4)';

        if (inclination) inclination.textContent = '0.0° (Remains in Ecliptic Plane)';
        if (inclinationSub) inclinationSub.textContent = 'Preserves trajectory alignment to Pluto.';
        if (scienceReturn) scienceReturn.textContent = 'First Close Pluto Flyby (1986)';
        if (scienceSub) scienceSub.textContent = 'Would have imaged Pluto and Charon 30 years before New Horizons.';
        if (sacrifice) sacrifice.textContent = 'Titan Remains an Unsolved Mystery';
        if (sacrificeSub) sacrificeSub.textContent = 'Titan only observed from 350,000 km away as a featureless orange blur.';
        if (historicalText) historicalText.textContent = "While a 1986 Pluto flyby was tantalizing, scientists agreed that Titan's atmosphere was too scientifically urgent to bypass. NASA confirmed that leaving the solar system's only thick-atmosphere moon unstudied was scientifically unacceptable.";
      });
    }

    if (subtopic.id === 'challenge-memory') {
      const checkboxes = container.querySelectorAll('.chk-mem-sector');
      const allocatedVal = container.querySelector('#mem-allocated-val');
      const statusText = container.querySelector('#mem-capacity-status');
      const btnTransmit = container.querySelector('#btn-transmit-patch');
      const restoreScreen = container.querySelector('#memory-restore-screen');

      const checkCapacity = () => {
        let totalWords = 0;
        checkboxes.forEach(chk => {
          if (chk.checked) totalWords += parseInt(chk.getAttribute('data-words'), 10);
        });

        if (allocatedVal) allocatedVal.textContent = `${totalWords} / 512 Words`;

        if (totalWords >= 512) {
          if (statusText) {
            statusText.textContent = `[CAPACITY SATISFIED (+${totalWords - 512} words margin)]`;
            statusText.style.color = '#10b981';
          }
          if (btnTransmit) btnTransmit.removeAttribute('disabled');
        } else {
          if (statusText) {
            statusText.textContent = `[INSUFFICIENT SPACE (${512 - totalWords} words needed)]`;
            statusText.style.color = '#ef4444';
          }
          if (btnTransmit) btnTransmit.setAttribute('disabled', 'true');
        }
      };

      checkboxes.forEach(chk => {
        chk.addEventListener('change', checkCapacity);
      });

      btnTransmit?.addEventListener('click', () => {
        btnTransmit.textContent = 'TRANSMITTING VIA DSN DSS-63... (SIMULATING 45-HR ROUND-TRIP)';
        btnTransmit.setAttribute('disabled', 'true');
        setTimeout(() => {
          btnTransmit.textContent = 'TRANSMISSION COMPLETE & VERIFIED';
          if (restoreScreen) {
            restoreScreen.style.display = 'block';
            restoreScreen.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 800);
      });
    }
  }

  // Initial setup: render Level 1 with Spacecraft Explorer active
  switchExploreTab('spacecraft');
}
