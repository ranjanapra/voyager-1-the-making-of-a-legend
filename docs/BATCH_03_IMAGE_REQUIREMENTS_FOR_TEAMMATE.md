# VOYAGER 1 — IMAGE ASSET SPECIFICATIONS FOR TEAMMATES & COLLABORATORS
**Milestone:** Batch 03 Gap-Closure / Batch 04 Handoff  
**Workspace:** `C:\Users\asus\Downloads\beyond dark`  
**Current Status:** ALL CORE IMAGE ASSETS FUNCTIONAL & INTEGRATED (0 Broken Links)

---

## 1. PURPOSE OF THIS SPECIFICATION

Every image slot on the Voyager 1 platform is currently populated with an authentic historical NASA asset, and all 4 test suites pass ($268/268$ assertions).

This document serves as an exact reference guide for teammates, designers, or archival researchers who wish to provide optional ultra-high-resolution scans (e.g. 4K uncompressed TIFF/PNG) or supplemental photography during **Batch 04 (Production & Visual Polish)**.

Dropping replacement files into the specified paths with the exact filenames listed below will automatically update the website without requiring any code edits or architectural refactoring.

---

## 2. ASSET SPECIFICATIONS & DROP-IN SLOTS

### Asset 01: The Pale Blue Dot Archival Photograph
- **Target File Path:** `public/assets/images/story/pale-blue-dot-pia00452.png`
- **Current Operational File:** Converted authentic NASA scan ($453 \times 614$, $409,366\text{ bytes}$, PNG).
- **Target Format:** PNG or JPEG
- **Recommended Resolution:** $\ge 1200 \times 1600\text{ px}$ (Original aspect ratio $\approx 3:4$)
- **Visual Subject:** Narrow-Angle Camera frame taken February 14, 1990, showing Earth as a 0.12-pixel pale blue crescent suspended in a beam of scattered sunlight as part of the Solar System Family Portrait.
- **NASA Catalog Citation:** NASA/JPL-Caltech Catalog PIA00452.
- **Display Location:** Section 04 About Us framed perspective container ($220 \times 160\text{ px}$) and centered interactive viewport modal lightbox (`#pbd-lightbox-modal`).

### Asset 02: Voyager 1 Student Mission Guide Portrait
- **Target File Path:** `public/assets/images/Voyager 1_ A Journey Beyond Stars.png`
- **Current Operational File:** $1536 \times 1024\text{ px}$ PNG ($2.23\text{ MB}$).
- **Target Format:** PNG or WebP
- **Recommended Resolution:** $1536 \times 1024\text{ px}$ (Aspect ratio $3:2$)
- **Visual Subject:** Student mission guide holding mission binder, pointing toward Voyager 1 navigating through deep interstellar space.
- **Display Location:** Section 03 Explore Hero left column frame (`.explore-boy-frame`, $520\text{px}\text{--}680\text{px}$ height).

### Asset 03: The Golden Record Engraved Protective Cover
- **Target File Path:** `public/assets/images/voyager-record-cover-446eb9.jpg.jpeg`
- **Current Operational File:** $2389 \times 2389\text{ px}$ JPEG ($726\text{ KB}$).
- **Target Format:** JPEG or PNG
- **Recommended Resolution:** $\ge 2000 \times 2000\text{ px}$ (Square $1:1$ aspect ratio)
- **Visual Subject:** Gold-anodized aluminum cover plate engraved with the 14-pulsar galactic map, binary playback instructions, and hydrogen atom hyperfine transition benchmark.
- **NASA Catalog Citation:** NASA Photojournal PIA00146.
- **Display Location:** Interactive Golden Record Explorer (Cover View) with 7 vibrant blue hotspot pins.

### Asset 04: The Golden Phonograph Disc (Front Face)
- **Target File Path:** `public/assets/images/voyager-gold-record-front.jpg.jpeg`
- **Current Operational File:** $1975 \times 1971\text{ px}$ JPEG ($827\text{ KB}$).
- **Target Format:** JPEG or PNG
- **Recommended Resolution:** $\ge 2000 \times 2000\text{ px}$ (Square $1:1$ aspect ratio)
- **Visual Subject:** Gold-plated copper 12-inch phonograph record showing physical sound grooves, center label, and lead-in matrix.
- **NASA Catalog Citation:** NASA Photojournal PIA00146.
- **Display Location:** Interactive Golden Record Explorer (Disc View).

### Asset 05: 1977 JPL Cleanroom Mounting of Golden Record
- **Target File Path:** `public/assets/images/pia21740-golden-record-installation.jpg`
- **Current Operational File:** $2256 \times 1792\text{ px}$ JPEG ($1.38\text{ MB}$, converted from NASA master TIFF `PIA21740.tif`).
- **Target Format:** JPEG or WebP
- **Recommended Resolution:** $2256 \times 1792\text{ px}$ (Aspect ratio $5:4$)
- **Visual Subject:** Jet Propulsion Laboratory technicians in white cleanroom garments mounting the Golden Record cover to Voyager 1 in 1977 prior to transport to Cape Canaveral.
- **NASA Catalog Citation:** NASA Photojournal PIA21740.
- **Display Location:** Interactive Golden Record Explorer (Cleanroom Installation View) and Build Stage 05.

### Asset 06: JPL 25-Foot Space Simulator Thermal-Vacuum Test
- **Target File Path:** `public/assets/images/pia21734.jpg`
- **Current Operational File:** $2290 \times 2186\text{ px}$ JPEG ($1.42\text{ MB}$).
- **Target Format:** JPEG or WebP
- **Recommended Resolution:** $2290 \times 2186\text{ px}$
- **Visual Subject:** The Voyager Proof Test Model (PTM) suspended inside the 25-Foot Space Simulator chamber at JPL Pasadena on December 3, 1976, undergoing solar simulation and thermal-vacuum qualification.
- **NASA Catalog Citation:** NASA Photojournal PIA21734.
- **Display Location:** Build Experience Testing Panel and Environmental Qualification dossier.

### Asset 07: Titan IIIE-Centaur Shroud Hoist
- **Target File Path:** `public/assets/images/pia.jpg.jpeg`
- **Current Operational File:** $1760 \times 2227\text{ px}$ JPEG ($628\text{ KB}$).
- **Target Format:** JPEG or WebP
- **Recommended Resolution:** $1760 \times 2227\text{ px}$
- **Visual Subject:** Titan IIIE/Centaur payload fairing containing Voyager being hoisted at Launch Complex 41, Cape Canaveral, Florida (August 1977).
- **NASA Catalog Citation:** NASA KSC / JPL KSC-77PC-0294.
- **Display Location:** Explore Subtopic 03.01 (Launch Vehicle Shroud).

---

## 3. ASSET DELIVERY & DROP-IN INSTRUCTIONS

1. Place image files directly into `public/assets/images/` or `public/assets/images/story/`.
2. Maintain exact filenames and file extensions.
3. Ensure images are pre-oriented right-side up.
4. Run `node batch-03-verify.js` to automatically verify image dimensions, existence, and layout styling.
