# POSM Website — Image & Content Replacement Guide

This file documents every placeholder in the website that needs to be
replaced with real content before the site goes live.

---

## 🖼️ IMAGES TO REPLACE

### Hero Background
- **File:** `assets/images/hero_bg.png`
- **Usage:** Homepage hero section background
- **Recommended:** Wide panoramic lab photo (2560×1440px min), dark enough
  for white text overlay. Or use a moody abstract optics photo.

### Section Images
| File | Used on | Recommended Content |
|------|---------|---------------------|
| `assets/images/optics_section.png` | Homepage S1, Research, Updates | Optics table, laser beams, mirrors |
| `assets/images/vacuum_chamber.png` | Homepage S2, Research | UHV chamber, flanges, viewports |
| `assets/images/rf_electronics.png` | Homepage S3, Research, Updates | PCB, oscilloscope, RF components |
| `assets/images/laser_optics.png`   | Research tabs, Updates | Laser beam paths, optical components |
| `assets/images/photonics_abstract.png` | Research tabs | Fiber, photonic chip, waveguide |

### Team Photos
- **Group photo:** `assets/images/group_photo.jpg`
  - Usage: team.html hero banner
  - Recommended: 2400×900px, team in lab or uniform setting, dark background
- **Headshots:** `assets/images/headshots/firstname-lastname.jpg`
  - Usage: member cards on team.html
  - Recommended: square crop, 400×400px min, consistent lighting
  - In the `<img>` tag of each member card, set `src="assets/images/headshots/firstname-lastname.jpg"`

### Faculty Advisor
- **File:** `assets/images/headshots/alexander-mcleod.jpg`
- **Usage:** advisor card on team.html
- Replace the `<div>` with initials "AM" with an actual `<img>` tag

### Sponsor Logos
- **Directory:** `assets/images/sponsors/`
- **Format:** PNG with transparent background, white/light version preferred
  (dark site background)
- **Usage:** sponsors-current.html grid
- **To add:** Create a new `<a>` + `<img>` block and replace the placeholder `<div>`

### Update Post Images
- **Directory:** `assets/images/updates/`
- **Format:** 16:9 aspect ratio, any size ≥ 800×450px
- **Usage:** news-updates.html article cards

---

## ✉️ CONTACT INFO TO REPLACE

In `contact.html`:
- `president@posm.umn.edu` → real president email
- `vp@posm.umn.edu` → real VP email
- `mcleod@umn.edu` → Prof. McLeod's real UMN email address
- `[ Building Name ], Room [ XXX ]` → actual lab room

---

## 👤 TEAM MEMBERS TO ADD

In `team.html`, each member card looks like this:
```html
<div class="member-card">
  <div class="member-avatar">
    <img src="assets/images/headshots/firstname-lastname.jpg" alt="Member Name" />
  </div>
  <div class="member-info">
    <div class="member-name">First Last</div>
    <div class="member-role">Role Title</div>
    <div class="member-detail">Major · Year<br />1–2 sentence bio.</div>
  </div>
</div>
```
Copy a block, fill in the data, place in the `#team-grid` div.

---

## 📰 ADDING NEWS UPDATES

In `news-updates.html`, each post is an `<article class="card">` block.
Copy an existing block, paste at the top of the list, and fill in:
- `id="update-month-year"` (for anchor links)
- Date label
- Title and text content
- Image src
- Tags (discipline labels)

---

## 📄 ADDING PUBLICATIONS

In `news-publications.html`, each pub is an `<article class="pub-card">` block.
Set the `pub-status` class to one of:
- `in-prep` — grey pill
- `preprint` — cyan pill
- `published` — purple pill

Fill in: title, authors, journal/venue, year, abstract, and link (DOI or arXiv).

---

## 🏷️ SPONSORS TO ADD

In `sponsors-current.html`, replace each placeholder `<div>` in the grid with:
```html
<a href="https://company-website.com" target="_blank" rel="noopener"
   style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);
          aspect-ratio:3/2;display:flex;align-items:center;justify-content:center;padding:2rem">
  <img src="assets/images/sponsors/company-name.png" alt="Company Name"
       style="max-width:160px;max-height:60px;object-fit:contain;filter:brightness(0) invert(1);opacity:0.7" />
</a>
```
The `filter: brightness(0) invert(1)` makes logos white on dark background.

---

## 📋 FORM BACKEND

The contact form in `contact.html` is HTML-only. To make it functional:
1. **Formspree** (simplest): set `action="https://formspree.io/f/YOUR_ID"` and `method="POST"`
2. **Netlify Forms**: add `data-netlify="true"` attribute to `<form>`
3. **Custom backend**: point action to your API endpoint

---

## 🔍 SEO / METADATA

Each page has a `<title>` and `<meta name="description">`. Update these
with your actual page descriptions once content is finalized.

For production, also add:
- Favicon: `assets/images/favicon.png` or `.ico`
- Open Graph image: `assets/images/og_image.jpg` (1200×630px)
- Link tags in `<head>`: `<link rel="icon" href="assets/images/favicon.png">`
