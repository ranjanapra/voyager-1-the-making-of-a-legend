# VOYAGER 1 // SHA-256 RECALCULATION & CRYPTOGRAPHIC PROVENANCE REPORT

**Project:** VOYAGER 1 — THE MAKING OF A LEGEND  
**Audit Stage:** Stage 2 Independent Scientific Forensic Audit  
**Audit Timestamp:** 2026-11-14T21:20:00Z  
**Workspace:** `C:\Users\asus\Downloads\beyond dark`  
**Execution Environment:** Python 3.14.5 / Windows x64  
**Manifest Reference:** `data/SOURCE_MANIFEST.json` & `docs/SOURCE_MANIFEST.md`

---

## 1. Executive Summary

A complete, byte-by-byte SHA-256 recalculation was performed across every file residing within `data/` and `docs/`. 

- **Total Files Inspected on Disk:** 24 files (excluding audit outputs)
- **Files Tracked in `SOURCE_MANIFEST.json`:** 21 files
- **Files Untracked in Manifest:** 3 files (`data/SOURCE_MANIFEST.json`, `docs/SOURCE_MANIFEST.md`, `data/voyager1_data.txt`)
- **Manifest Hash Match Rate:** **100.0%** (21 out of 21 tracked files match their recorded SHA-256 hash byte-for-byte).
- **Corrupted / Truncated Downloads:** 0 among the 21 manifest items.
- **Untracked / Invalid Assets Identified:** 1 file (`data/voyager1_data.txt`, 351,877 bytes) contains raw HTML from `nasa.gov` rather than scientific data.

> [!IMPORTANT]
> **Cryptographic Authenticity vs Scientific Provenance:**
> A cryptographic hash match (SHA-256) proves only that the file currently on disk is identical to the file hashed when the manifest was generated. It does **not** prove that the content is scientifically authentic, correctly attributed to Voyager 1, or uncorrupted at the source server. Provenance, instrument calibration, coordinate systems, and record validity must be audited independently (see `DATASET_FORENSIC_AUDIT.md`).

---

## 2. Complete File-by-File Recalculation Register

The table below lists every file in `docs/` and `data/`, its size in bytes, its recalculated SHA-256 hash, its status in `SOURCE_MANIFEST.json`, and the comparison result.

| # | Local File Path | Size (Bytes) | Manifest Status | Recalculated SHA-256 Digest | Match? |
|---|-----------------|--------------|-----------------|-----------------------------|:------:|
| 1 | `data/cosmic_rays/vy1crs_1d_1977.asc` | 45,515 | Tracked | `60bfe98801f41da0fe8bcba148677c77c66cb1df797b5e40ee9e8310382878ce` | **MATCH** |
| 2 | `data/magnetic_fields/vy1mag_1h.asc` | 5,982,591 | Tracked | `e2a4df87ba5bf54a558a221f5796dfec63c784961d763784c66657c9ee3a7e4e` | **MATCH** |
| 3 | `data/merged/vy1_1977.asc` | 2,557,920 | Tracked | `57530e159a6d38e2d27453fcfeea8c53982bf7918d36fc3f1da5341cf60f4eb6` | **MATCH** |
| 4 | `data/particles_lecp/V177DGD01.CSV` | 31,331 | Tracked | `902eeec4244fe0bfecfc79869a8449c26ba33b664d9fc3a79d348a044db5551c` | **MATCH** |
| 5 | `data/plasma/v1_hour_1977.asc` | 111,160 | Tracked | `a9fe6cffca769a30ae850fcf05c6d36e2f1837267bfdbd2d6b38c359be26db72` | **MATCH** |
| 6 | `data/plasma_waves/vg1_pws_lr_19770905_v5.30.cdf` | 277,739 | Tracked | `7643b4269e8020a6532463e275fdf8b4618e7d4d7ebce58066bb738755018b34` | **MATCH** |
| 7 | `data/trajectory/vy1trj_ssc_1d.asc` | 620,000 | Tracked | `e97fa17eb04dc66bc905e32402dd1807d89635f79bf90d5ae5cba4cae090df49` | **MATCH** |
| 8 | `data/SOURCE_MANIFEST.json` | 13,675 | Manifest Source | `3d6ef4e09efbf907a3f4e2f38d3886561f00bf75faea0c43c22421c4371bb48e` | N/A (Self) |
| 9 | `data/voyager1_data.txt` | 351,877 | Untracked (Legacy) | `e1858c21a1154c1be485ec98d0ce91e77f0a8c2d28f0ee033bc699ebcb20a273` | N/A (Invalid HTML) |
| 10 | `docs/cosmic_rays/vy1crs_6h_fmt.txt` | 167,304 | Tracked | `141bfeaeef6e71954848d7be8a97c4e51111516f4d0bda14db570e3ae1eb64e7` | **MATCH** |
| 11 | `docs/cosmic_rays/vy1crs_dir.txt` | 2,041 | Tracked | `679093bf604c549646453147dc66661a34d0b5df9d0c6488d070b437299a936a` | **MATCH** |
| 12 | `docs/magnetic_fields/vy1mag_1h_fmt.txt` | 4,255 | Tracked | `83515b81a2e99d3aa45eb9ceef8a38ec49f0516ccfa3f06059d0fc4e99f57fae` | **MATCH** |
| 13 | `docs/magnetic_fields/vy1mag_dir.txt` | 1,636 | Tracked | `a5f223e7426b6f849c372f9d1502447d96b1b689a71463e26ea4ba66ee6c8cf9` | **MATCH** |
| 14 | `docs/magnetic_fields/vy1mag_nmc.txt` | 4,666 | Tracked | `300b95d5bf6cf659d43513a967c7e67140e4e69b0faee2e742e472cefcbf2cf8` | **MATCH** |
| 15 | `docs/merged/00readme_v1.txt` | 1,026 | Tracked | `34e0220c38fc034e321e16f73eaeb40984814e5f3aa341732a3fcdd78cf6dbef` | **MATCH** |
| 16 | `docs/mission/00readme.txt` | 3,968 | Tracked | `d76cc3bc2e0fa97f74e94b1a47e856f22a82031f373699d29250534844e566cd` | **MATCH** |
| 17 | `docs/mission/voyager1_update.txt` | 14,553 | Tracked | `87991128d923e4023b93fabeb1c8015e2e1b369260540a19c7ef65ff5a945fda` | **MATCH** |
| 18 | `docs/particles_lecp/vy1_particle_dir.txt` | 503 | Tracked | `a39031a293ec4377fb4268e3d640ff269dd518b53e3fa52a420966bc28ca366d` | **MATCH** |
| 19 | `docs/plasma/vy1pla_1h_fmt.txt` | 2,279 | Tracked | `4d2a13ee1b0fa658d3fe7cce0ef11855e9ba55d14df9ebfd1cbe04620583b484` | **MATCH** |
| 20 | `docs/plasma/vy1pla_dir.txt` | 2,184 | Tracked | `971b3e157d07c39050868f0cbdbf2e4a13c9e6ca35d46fcf64893798cf0df874` | **MATCH** |
| 21 | `docs/plasma/vy1pla_nmc.txt` | 5,625 | Tracked | `0cf9b897825a07dd311eece39f9b5a0fb70be31eb626b9195d8205f2fc4ba113` | **MATCH** |
| 22 | `docs/trajectory/vy1trj_dir.txt` | 653 | Tracked | `7a16315eeefef8c614532b6fb6e0266da5bf285f54316d97c31d167a1fb5fbf3` | **MATCH** |
| 23 | `docs/trajectory/vy1trj_ssc_fmt.txt` | 2,668 | Tracked | `1c8901eb20ee56d059ee2029bf3368291410d56b783f6f1406c117b8ce8a49c2` | **MATCH** |
| 24 | `docs/SOURCE_MANIFEST.md` | 17,819 | Manifest Doc | `d3305a415ff63fa0fa18bb64057db34e2f98642a8bdfd75e4e8ffdb68d40a322` | N/A (Doc) |

---

## 3. Discrepancy & Anomaly Analysis

### 3.1 Legacy Untracked File: `data/voyager1_data.txt`
- **Reported Size:** 351,877 bytes
- **SHA-256 Digest:** `e1858c21a1154c1be485ec98d0ce91e77f0a8c2d28f0ee033bc699ebcb20a273`
- **Forensic Inspection:** The first line reads `<!doctype html><html lang="en-US">...`.
- **Verdict:** This file was created during an earlier automated web retrieval where an HTTP client fetched a WordPress web portal page instead of an actual scientific data stream. It is **invalid** as scientific data.

### 3.2 Public Fallback Image Corrupted as HTML: `public/assets/images/voyager1-jpl-pia17046.jpg`
- **Reported Size:** 301,442 bytes
- **SHA-256 Digest:** `76b4ef84c4f346b38cfa8fb7e0e7a83d3408f615e45a274db453cf39f8249a40`
- **Forensic Inspection:** The byte stream starts with ASCII text `<!doctype html>`.
- **Verdict:** This file has a `.jpg` extension but contains raw HTML from NASA's web portal. When Three.js fails or when a browser renders this image, the decoding pipeline aborts, producing a broken image box. It must be replaced with the binary JPEG representation of PIA17046.

---

## 4. Hash Verification Methodology

The cryptographic hashes were calculated using Python's standard `hashlib.sha256()` reading binary chunks directly from disk:
```python
import hashlib

def get_sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest().lower()
```

Every manifest entry in `data/SOURCE_MANIFEST.json` was cross-referenced using strict lower-case hex comparison:
$$\text{Match} = (\text{Hash}_{\text{disk}} == \text{Hash}_{\text{manifest}})$$
Result: **21 / 21 matches verified.**
