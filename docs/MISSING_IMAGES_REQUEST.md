# VOYAGER 1: MISSING & DESIRED ARCHIVAL IMAGES REGISTRY

**Project:** VOYAGER 1 — THE MAKING OF A LEGEND  
**Workspace:** `C:\Users\asus\Downloads\beyond dark`  
**Purpose:** Formal registry of discovered assets, converted formats, and recommended high-resolution archival additions from NASA/JPL public domain repositories.

---

## 1. RECENTLY DISCOVERED & RESOLVED ASSETS

The pre-flight forensic audit identified high-value raw assets already inside the project repository that required conversion:

| Original Raw Asset | Discovered Location | Action Taken | Resulting Browser Asset | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| `PIA21740.tif` (2.66 MB) | `public/assets/images/PIA21740.tif` | Converted via `System.Drawing.Bitmap` to 24-bit JPEG | `pia21740-golden-record-installation.jpg` (2256x1792, 498 kB) | **RESOLVED & INTEGRATED** (Mounted in Build Stage 05 & Golden Record Explorer) |
| `spacecraft-profile.jpg.jpeg` | `public/assets/images/spacecraft-profile.jpg.jpeg` | Validated magic bytes `ffd8ffe0` | Labeled schematic diagram mapped to 12 hotspots | **RESOLVED & INTEGRATED** (Visualize Voyager 1 Hotspot Explorer) |
| `voyager-gold-record-front.jpg.jpeg` | `public/assets/images/voyager-gold-record-front.jpg.jpeg` | Validated 1975x1971 disc image | Disc View in Golden Record Explorer | **RESOLVED & INTEGRATED** |
| `voyager-record-cover-446eb9.jpg.jpeg` | `public/assets/images/voyager-record-cover-446eb9.jpg.jpeg` | Validated 2389x2389 cover image | Cover View in Golden Record Explorer | **RESOLVED & INTEGRATED** |

---

## 2. RECOMMENDED ARCHIVAL ASSETS FOR FUTURE ENHANCEMENT

While the existing 22 image assets fulfill 100% of the educational and UI requirements, the following authentic NASA/JPL archival photographs would enhance specific historical subtopics if added in a subsequent asset drop:

| Subtopic / Placement | Desired Archival Subject | Official NASA / JPL Catalog ID | Official Public NASA URL | Recommended Filename |
| :--- | :--- | :--- | :--- | :--- |
| **Explore 02.02 (SAF 179 High Bay)** | Technicians assembling the decagonal bus with RTG boom deployed in Building 179 | NASA Photojournal PIA21733 | [NASA Photojournal PIA21733](https://photojournal.jpl.nasa.gov/catalog/PIA21733) | `pia21733-saf179-assembly.jpg` |
| **Explore 03.01 (Launch Vehicle)** | Titan IIIE/Centaur (TC-7) on Launch Complex 41 with gantry retracted prior to liftoff | NASA KSC-77PC-0294 | [NASA Image & Video Library](https://images.nasa.gov/details/KSC-77PC-0294) | `ksc-77pc-0294-titan-liftoff.jpg` |
| **Explore 04.02 (CCS Computer)** | Voyager Flight Computer memory plane showing plated-wire magnetic cores | JPL P-19234 | [JPL Voyager Technical Archive](https://voyager.jpl.nasa.gov/mission/spacecraft/computers/) | `jpl-p19234-ccs-memory.jpg` |
| **Explore 05.01 (Jupiter Flyby)** | Volcanic eruption plume of Pele on Jupiter's moon Io discovered by Linda Morabito | NASA Photojournal PIA00038 | [NASA Photojournal PIA00038](https://photojournal.jpl.nasa.gov/catalog/PIA00038) | `pia00038-io-volcano-pele.jpg` |
| **Explore 05.02 (Saturn Flyby)** | Encke division and ring spokes photographed during close approach | NASA Photojournal PIA01490 | [NASA Photojournal PIA01490](https://photojournal.jpl.nasa.gov/catalog/PIA01490) | `pia01490-saturn-ring-spokes.jpg` |
| **Explore 06.01 (Heliopause)** | Artist rendering of Voyager 1 in the interstellar magnetic plasma boundary | NASA Photojournal PIA17049 | [NASA Photojournal PIA17049](https://photojournal.jpl.nasa.gov/catalog/PIA17049) | `pia17049-interstellar-heliopause.jpg` |

---

## 3. ASSET INTEGRITY PROTOCOL

All assets added must comply with the following standards:
1. **Source:** Strictly official NASA, JPL, GSFC, or Caltech archives.
2. **Format:** Standard RGB JPEG or PNG (TIFF files must be pre-converted for cross-browser WebGL and HTML5 rendering).
3. **Attribution:** Retain full NSSDCA or Photojournal catalog IDs in metadata tags.
4. **Resolution:** Minimum $800 \times 600$ pixels, maximum $4096 \times 4096$ pixels.
