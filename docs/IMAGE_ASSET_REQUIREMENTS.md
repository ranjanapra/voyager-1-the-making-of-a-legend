# IMAGE ASSET REQUIREMENTS & INVENTORY SPECIFICATION
**Project:** VOYAGER 1 — THE MAKING OF A LEGEND  
**Workspace:** `C:\Users\asus\Downloads\beyond dark`  
**Execution Cycle:** Master Implementation Prompt 03 (Batch 03 of 04 Complete)  
**Date:** November 15, 2026  

---

## 1. Asset Directory Standard

All digital image assets for Voyager 1 are located in:
`C:\Users\asus\Downloads\beyond dark\public\assets\images\`

Referenced in code via absolute web paths:
`/assets/images/<filename>`

---

## 2. Core Page Visual Assets Inventory

| Asset Filename | Format | Purpose & Page Location | Historical / Scientific Attribution | Status |
| :--- | :--- | :--- | :--- | :--- |
| `Anime Voyager Mission Poster.png` | PNG | **Page 2 & Page 3 (Sections 02 & 03) Candidate Invitation & Explore Hero:** Represents the human invitation narrative ("Can I be a part of this?") and mission exploration call. Framed with subtle black backing and 8px padding; strictly styled with `object-fit: contain;` to ensure 100% of right-hand side specs, artwork, and typography remain uncropped. | NASA JPL Candidate Visual Art / Educational Outreach | **ACTIVE & INTEGRATED** |
| `Voyager 1_ A Journey Beyond Stars.png` | PNG | **Student Mission Educational Archive:** Portrait of the student guide in interstellar space pointing to Voyager 1. Preserved in repository for educational dossiers. | Voyager Educational Outreach / Historical Research Guide | **PRESENT BUT NOT INTEGRATED** |
| `voyager-gold-record-front.jpg.jpeg` | JPEG | **Homepage Hero & Explore Hub:** Continuous rotating 16⅔ RPM Golden Record visual below the one light-day milestone. | NASA JPL / Carl Sagan Committee / Smithsonian | **ACTIVE & INTEGRATED** |
| `voyager-gold-record-cover.jpg.jpeg` | JPEG | **Golden Record Explorer (Tab 02):** Protective aluminum cover displaying 7 subtle 14px hotspot pins (pulsar clock, hydrogen line, stylus instructions). | NASA / JPL-Caltech (Catalog PIA21740) | **ACTIVE & INTEGRATED** |
| `pia21740-golden-record-installation.jpg` | JPEG | **Golden Record Explorer & Assembly Workflow:** Mounting of the record onto Bay 4 of the Voyager 1 bus at KSC SAEF II in Summer 1977. | NASA / JPL-Caltech / Kennedy Space Center | **ACTIVE & INTEGRATED** |
| `voyager1-jpl-pia17046.jpg` | JPEG | **Homepage Fallback & Hardware Dossier:** High-fidelity rendering of Voyager 1 in deep space; fallback when WebGL fails. | NASA / JPL-Caltech (Catalog PIA17046) | **ACTIVE & INTEGRATED** |
| `pia17046_annotated.jpg` | JPEG | **Spacecraft Visualizer (Tab 01):** 12-hotspot annotated physical schematic. | NASA / JPL (Catalog PIA17046) | **ACTIVE & INTEGRATED** |
| `spacecraft-profile.jpg.jpeg` | JPEG | **Stage 02 Assembly:** 3.7m High-Gain Antenna & Cassegrain dish cutaway. | NASA / JPL (Catalog P-18882) | **ACTIVE & INTEGRATED** |
| `Voyager Test Model Configuration.jpeg`| JPEG | **Stage 01 Assembly & SAF 179:** Decagonal bus airframe and propellant tank integration. | NASA / JPL SAF Building 179 Archives | **ACTIVE & INTEGRATED** |
| `Voyager’s Launch Vehicle Adapter.jpeg` | JPEG | **Stage 06 Assembly:** Star-37E kick motor and Centaur payload adapter ring. | NASA / General Dynamics / Cape Canaveral LC-41 | **ACTIVE & INTEGRATED** |
| `pia21734.jpg` | JPEG | **Build With Us Testing Showcase:** Proof Test Model inside JPL 25-Foot Space Simulator (Dec 3, 1976). | NASA / JPL-Caltech (Catalog PIA21734) | **ACTIVE & INTEGRATED** |
| `voyager7.gif` | GIF | **Build With Us Cleanroom Gallery:** Spacecraft Assembly Facility (SAF) cleanroom operations. | NASA / JPL Archives | **ACTIVE & INTEGRATED** |
| `pale-blue-dot-pia00452.png` | PNG | **Section 04 About Us / Reflection:** Authentic high-resolution scan of historic Earth portrait (PIA00452). Enlarged 220x160px container with centered interactive modal lightbox (`#pbd-lightbox-modal`). | NASA / JPL-Caltech (Catalog PIA00452) | **ACTIVE & INTEGRATED** |

*(Clarification: Per UI Correction 24, `Anime Voyager Mission Poster.png` is active on Landing Page 3 with `object-fit: contain` and zero cropping of right-hand text. `Voyager 1_ A Journey Beyond Stars.png` is preserved in the repository as student mission archive.)*

---

## 3. Styling & Presentation Rules

1. **Aspect Ratio & Distortion Prevention:**
   - Always use `object-fit: contain;` or `object-fit: cover;` with explicit dimensions.
   - Do not stretch, squash, or apply asymmetrical transforms.

2. **Frame Styling Standards:**
   - **Page 2 (Girl photo):** Single outer golden border `1px solid rgba(245, 158, 11, 0.55);` with `padding: 8px; background: rgba(6, 10, 18, 0.96);`. No duplicate borders or corner brackets.
   - **Page 3 (Girl mission poster):** Outer golden border `.explore-poster-frame` (`1px solid rgba(245, 158, 11, 0.45);`) with `padding: 8px; border-radius: 6px; background: #000000;` and inner image (`border-radius: 4px; max-height: 660px; object-fit: contain;`). Completely reveals the full artwork, text, specs, and button on the right-hand side. Height aligns seamlessly with `.explore-content-col`.
   - **About Us (Pale Blue Dot):** Framed at `220x160px` with cyan border (`1.5px solid rgba(56, 189, 248, 0.6)`), dark background (`#020409`), and badge `NASA VOYAGER 1 // PIA00452`. Clicking opens centered viewport modal lightbox (`#pbd-lightbox-modal`) with Escape key, touch, and backdrop dismissal. Zero stock photo placeholders.
   - **Golden Record Hotspots:** 14px subtle vibrant blue pins (`#38bdf8`, active `#0284c7`) with white contrast border and cyan pulsing rings (`@keyframes hotspotPulse`). Zero bulky numbers inside the dots.

3. **Accessibility:**
   - Every `<img>` tag must have an authentic, descriptive `alt` attribute citing the subject matter and NASA catalog identifier.
   - Below-the-fold images must specify `loading="lazy"` and `decoding="async"` for optimal page load speed.
