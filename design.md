# 🌌 DESIGN SYSTEM README

**Project Codename:** *Trimurti UI*
**Theme:** Brahma (Create) · Vishnu (Sustain) · Mahesh (Transform/Destroy)

---

## 0. DESIGN PHILOSOPHY (NON-NEGOTIABLE)

> “Quiet confidence. Not noise.”

Inspired by modern AI-native products:

* Spacious layouts, strong hierarchy, minimal clutter ([Wispr Flow][1])
* Motion with restraint, not distraction ([Wispr Flow][1])
* Strong visual identity via typography + color commitment ([LinkedIn][2])

### Core Principles

* **Clarity > Decoration**
* **Consistency > Creativity**
* **System > Screens**
* **Emotion through spacing, not effects**

---

## 1. BRAND NARRATIVE (IMPORTANT FOR UI CONSISTENCY)

We are not a SaaS company.
We are a **cycle**:

| Concept   | Meaning        | Product Layer         |
| --------- | -------------- | --------------------- |
| 🟡 Brahma | Creation       | New ideas, innovation |
| 🔵 Vishnu | Preservation   | Scaling, maintaining  |
| 🔴 Mahesh | Transformation | Removing, optimizing  |

### UX Translation:

* Users should **feel progression**
* Every section should map to:

  * Create → Scale → Transform

---

## 2. VISUAL LANGUAGE

### 2.1 Layout System

**Rules:**

* Use **wide margins & whitespace** (critical) ([Wispr Flow][1])
* Prefer **2-column editorial layouts**
* Avoid dense dashboards

**Grid:**

```
Desktop: 12 column
Tablet: 8 column
Mobile: 4 column
```

**Spacing Scale:**

```
4 / 8 / 16 / 24 / 40 / 64 / 96
```

---

### 2.2 Component Philosophy

* Soft edges (no harsh boxes)
* Floating sections (not boxed grids)
* Sections should **breathe**

---

## 3. COLOR SYSTEM (DIVINE TRIAD)

### Base Theme

```
Background: #0B0F1A (deep cosmic dark)
Surface: #111827
Text: #F9FAFB
Muted: #9CA3AF
```

### Trimurti Accent Colors

| Role             | Color                 | Usage                  |
| ---------------- | --------------------- | ---------------------- |
| Brahma (Create)  | #F59E0B (gold/orange) | CTA, innovation        |
| Vishnu (Sustain) | #3B82F6 (blue)        | trust, system          |
| Mahesh (Destroy) | #EF4444 (red)         | alerts, transformation |

### Rules:

* Only **1 dominant accent per section**
* Never mix all 3 in same viewport
* Maintain **color discipline (Anthropic style)** ([LinkedIn][2])

---

## 4. TYPOGRAPHY SYSTEM

### Font Pairing (MANDATORY)

* **Display Font:** Serif (spiritual, timeless)
* **Body Font:** Clean sans-serif

Example:

```
Heading: Playfair Display / EB Garamond
Body: Inter / Figtree
```

### Scale

```
H1: 56–72px
H2: 40–48px
H3: 28–32px
Body: 16–18px
```

### Rules:

* Large headings = emotional weight
* Avoid too many font weights
* No random font mixing

---

## 5. MOTION & INTERACTIONS

Inspired by Wispr-level subtlety:

### Motion Rules:

* Use **slow fade (200–400ms)**
* Use **ease-out curves**
* Avoid bouncy animations

### Micro-interactions:

* Hover = slight lift (2–4px)
* Buttons = soft glow
* Scroll = progressive reveal

> Motion should feel like **breathing, not jumping**

---

## 6. SECTION DESIGN PATTERN

Every landing page should follow:

### 6.1 HERO (CREATE)

* Bold statement
* Minimal UI
* Emotional headline
* Soft gradient background

---

### 6.2 FEATURES (SUSTAIN)

* Structured grid
* Clear hierarchy
* Use icons + text

---

### 6.3 TRANSFORMATION (DESTROY)

* Show before/after
* Replace old → new
* Strong contrast section

---

### 6.4 CTA

* Single primary action
* Clean, distraction-free

---

## 7. UI COMPONENT RULES

### Buttons

* Rounded (8–12px)
* Primary = Accent color
* Secondary = outline

---

### Cards

* Soft shadow:

```
0 8px 30px rgba(0,0,0,0.3)
```

* Slight blur backgrounds (glass feel)

---

### Icons

* Outline style preferred
* Keep consistent stroke width

---

## 8. IMAGERY STYLE

Avoid:

* Generic SaaS dashboards

Use:

* Real-life contextual visuals
* Abstract gradients
* Symbolic representations (cosmic, flow, energy)

> “Less UI screenshots, more feeling” ([Wispr Flow][1])

---

## 9. CONSISTENCY SYSTEM (CRITICAL)

### Every screen must follow:

* Same spacing scale
* Same typography scale
* Same color rules
* Same motion timing

### If unsure:

👉 Remove elements, don’t add

---

## 10. ANTI-PATTERNS (DO NOT DO)

❌ Overuse gradients
❌ Too many colors
❌ Heavy shadows everywhere
❌ Random animations
❌ Crowded UI
❌ Generic SaaS templates

---

## 11. DESIGN CHECKLIST (FOR AGENT)

Before shipping any UI:

* [ ] Is whitespace sufficient?
* [ ] Is there ONE dominant color?
* [ ] Is hierarchy obvious in 3 seconds?
* [ ] Are animations subtle?
* [ ] Does it feel calm and premium?

---

## 12. FINAL DESIGN DIRECTION

This product should feel like:

* 🧘 Calm like meditation
* ⚡ Powerful like creation
* 🌌 Vast like the universe

NOT:

* ❌ Startup template
* ❌ Dashboard-heavy SaaS
* ❌ Overdesigned Dribbble shot

---

## 13. TL;DR FOR CODING AGENT

* Use **spacing + typography** as primary design tools
* Keep UI **minimal but expressive**
* Follow **Trimurti color logic per section**
* Maintain **strict consistency across all pages**
* Prefer **calm, editorial, premium feel**
