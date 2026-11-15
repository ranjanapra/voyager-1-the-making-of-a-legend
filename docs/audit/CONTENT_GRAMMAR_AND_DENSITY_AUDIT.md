# VOYAGER 1 // CONTENT, GRAMMAR, TERMINOLOGY & DENSITY AUDIT
## Stage 2: Linguistic Precision, Editorial Density & Scientific Communication Standards

**Project:** VOYAGER 1 — THE MAKING OF A LEGEND  
**Audit Workspace:** `C:\Users\asus\Downloads\beyond dark`  
**Execution Timestamp:** 2026-11-14T21:26:00Z  
**Focus:** Scientific terminology, grammatical accuracy, text density, cognitive load, and UX flow across normal pages, research views, and engineering labs.

---

## 1. Executive Summary

This editorial audit evaluated all user-facing copy across `index.html`, `src/scripts/story/`, `src/scripts/tasks/`, `src/scripts/simulation/`, `src/scripts/labs/`, and `src/scripts/ui/`.

### Key Editorial Findings:
1. **Terminology Rigor:**
   - Terminology across core engineering sections is predominantly high-fidelity (e.g. *Traveling-Wave Tube amplifiers*, *triaxial fluxgate magnetometer*, *Cassegrain feed geometry*, *Astromast triangular lattice*).
   - Occasional loose phrasing was identified: e.g., referring to the Computer Command Subsystem (CCS) word length as "16-bit words" instead of the authentic "18-bit words".
   - In `explore-data.js` overview, hydrazine propellant is stated as "104 kg", whereas the engineering baseline across all other files is "105 kg".
2. **Text Density & Information Hierarchy:**
   - **Home / Entry Screen:** Well-balanced. High-impact telemetry metrics (`815 kg`, `3.7 meters`, `~474 Watts`, `12-inch Disc`) with minimal clutter.
   - **Explore Voyager 1 Hub:** 3-level progressive disclosure (Categories $\to$ Subtopics $\to$ Detailed Dossiers). Text density is appropriate for research reading, but subtopic summary cards could benefit from tighter bullet formatting to prevent text fatigue on mobile displays.
   - **Build Experience & Labs:** Engineering instructions in the labs are concise, but Code Lab Challenge 2 creates frustration due to test case failure.
3. **Quiz Balance & Pedagogical Design:**
   - All 12 tasks in `task-data.js` have their correct answer set to `opt-a`. This creates a severe cognitive defect where users learn to click Option A repeatedly rather than engaging with the engineering problem.

---

## 2. Scientific Terminology & Linguistic Corrections

| File Path | Component / Line | Current Phrasing | Required Correction | Linguistic / Scientific Rationale |
|-----------|------------------|------------------|---------------------|-----------------------------------|
| `src/scripts/story/explore-data.js` | Line 20 (`overview`) | `104 kg of hydrazine propellant` | `105 kg of hydrazine propellant` | Consistency with NASA SP-445 (231 lbs = 104.78 kg $\approx 105$ kg) and internal agreement with `components-data.js` and `task-data.js`. |
| `src/scripts/simulation/components-data.js` | Line 140 (`comp-ccs`) | `Dual-redundant processors with 4,096 16-bit words of memory each` | `Dual-redundant processors with 4,096 18-bit words of plated-wire memory each` | The CCS and AACS processors operated on an 18-bit word architecture. Only the Flight Data Subsystem (FDS) used 16-bit words. |
| `src/scripts/story/mission-data.js` | Line 85 (`SUBSYSTEM_DOSSIER[0]`) | `10-Sided Toroidal Bus` | `10-Sided Decagonal Bus` | Topologically and mechanically, the bus frame is a hollow decagonal prism (10-sided polygon ring), not a continuous curved torus. |
| `src/scripts/tasks/task-data.js` | All 12 Tasks | `correctAnswerId: "opt-a"` | Distribute across options: A (3), B (3), C (3), D (3) | Eliminates positional guessing bias and reinforces genuine reading comprehension. |
| `src/config/assets.js` | Lines 137, 144 | `catalogId: "KSC-LVA-77"`, `catalogId: "P-1977-TRAJ"` | Label as `[Archival Reference]` or cite official NASA Photojournal numbers | Prevents visitors from mistaking internal synthetic asset keys for official NASA catalog designations. |

---

## 3. Editorial Density & User Experience Assessment

### 3.1 Normal Pages (Home, Invitation, About)
- **Design Objective:** One clear main idea, concise explanations, essential telemetry, relevant visual anchors, and clear call-to-action buttons.
- **Current State:**
  - *Home:* Highly effective visual anchor. Once the 3D model bug (`spacecraftGroup.add(voyagerModel)`) is corrected, the floating spacecraft provides immediate context.
  - *Invitation:* Clean two-column layout pairing the mission briefing with the recruitment poster. Clear action button (`LET'S TRY TO BUILD IT`).
  - *About Us:* Compact credits and provenance statement. Missing receding Earth image (`url: null`) needs resolution when asset is provided.

### 3.2 Explore Voyager 1 (Research Hub)
- **Design Objective:** Detailed scientific documentation without overwhelming initial browsing. Dedicated document-style dossier views with traceable NASA citations.
- **Current State:**
  - 6 categories with 4 subtopics each (24 subtopics total) provide comprehensive coverage of the mission's 1972–1977 engineering history and subsequent discoveries.
  - Subtopics have clear previews, material callouts, purpose descriptions, and bulleted facts.
  - Citation blocks cleanly link to NASA SP-445 chapters, JPL publications, and PDS bundles.
  - **Optimization Recommendation:** Maintain the full depth of text inside the detail modal, while keeping category overview cards limited to 2–3 sentences.

### 3.3 Engineering Labs (Data Lab, Code Lab, AI/ML Lab)
- **Design Objective:** Short instructions, core physical formulas, interactive parameter controls, immediate execution feedback, and historical comparisons.
- **Current State:**
  - *Data Lab:* Clean data table, statistical summaries, and explicit simulated educational data disclaimer.
  - *Code Lab:* Strong pedagogical design with sandbox evaluation. **Immediate fix required:** Align Challenge 2 test cases with the starter code formula.
  - *AI/ML Lab:* Excellent historical context explaining that 1977 Voyager utilized analog comparator circuits and majority voting rather than machine learning algorithms.

---

## 4. Typography, Grammar & Readability

- **Spelling:** 100% correct across all source files; no typographic misspellings detected in technical terms (*hydrazine*, *radioisotope*, *beryllium*, *cassegrain*, *vidicon*, *interferometer*, *heliopause*).
- **Punctuation:** Consistent use of em-dashes and standard mathematical delimiters.
- **Mathematical KaTeX Rendering:** LaTeX math syntax (e.g. `$P(t) = P_0 \cdot 0.5^{t/87.7}$`, `$OWLT = d/c$`) is well-formed and renders cleanly across educational dossiers.
