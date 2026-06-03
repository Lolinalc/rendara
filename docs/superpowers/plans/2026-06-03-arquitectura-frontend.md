# Arquitectura Frontend Modular — Rendara Website

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extraer el `index.html` monolítico (~2000 líneas) en una arquitectura modular de CSS y JS vanilla sin herramientas de build, manteniendo el diseño visual idéntico.

**Architecture:** CSS organizado en `css/` con un entry point `main.css` que usa `@import`; JS separado en módulos ES nativos bajo `js/modules/` inicializados desde `js/main.js`; `index.html` limpio sin ningún `<style>` ni `<script>` inline.

**Tech Stack:** HTML5, CSS3 (custom properties, `@import`), JavaScript ES Modules nativos (sin bundler)

---

## Mapa de archivos

| Acción | Archivo |
|--------|---------|
| Crear | `css/main.css` |
| Crear | `css/base/tokens.css` |
| Crear | `css/base/reset.css` |
| Crear | `css/base/globals.css` |
| Crear | `css/components/buttons.css` |
| Crear | `css/components/tag.css` |
| Crear | `css/components/section-header.css` |
| Crear | `css/layout/nav.css` |
| Crear | `css/layout/footer.css` |
| Crear | `css/sections/hero.css` |
| Crear | `css/sections/about.css` |
| Crear | `css/sections/servicios.css` |
| Crear | `css/sections/proceso.css` |
| Crear | `css/sections/beneficios.css` |
| Crear | `css/sections/faq.css` |
| Crear | `css/sections/contacto.css` |
| Crear | `css/animations/fade-up.css` |
| Crear | `css/responsive.css` |
| Crear | `js/main.js` |
| Crear | `js/modules/nav.js` |
| Crear | `js/modules/faq.js` |
| Crear | `js/modules/animations.js` |
| Reescribir | `index.html` |
| Eliminar | `blocks/`, `pages/`, `script.js`, `vendor/` |

---

## Task 1: CSS base — tokens, reset, globals

**Files:**
- Create: `css/base/tokens.css`
- Create: `css/base/reset.css`
- Create: `css/base/globals.css`

- [ ] **Step 1: Crear directorios CSS**

```bash
mkdir -p css/base css/components css/layout css/sections css/animations
```

- [ ] **Step 2: Crear `css/base/tokens.css`**

```css
:root {
  --navy: #1e3269;
  --navy-mid: #eef1f8;
  --navy-card: #ffffff;
  --gold: #e8a820;
  --gold-light: #f5c040;
  --gold-dim: rgba(232, 168, 32, 0.12);
  --white: #1e3269;
  --white-60: #4a5a7a;
  --white-30: rgba(30, 50, 105, 0.08);
  --border: rgba(30, 50, 105, 0.13);
  --radius: 16px;
  --radius-sm: 10px;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --font-serif: "Playfair Display", Georgia, serif;
  --font-sans: "DM Sans", system-ui, sans-serif;
}
```

- [ ] **Step 3: Crear `css/base/reset.css`**

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

- [ ] **Step 4: Crear `css/base/globals.css`**

```css
html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

body {
  background: #ffffff;
  color: var(--white);
  font-family: var(--font-sans);
  font-weight: 400;
  line-height: 1.65;
  overflow-x: hidden;
}

img {
  display: block;
  max-width: 100%;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

strong {
  color: var(--white);
  font-weight: 600;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.mt-1   { margin-top: 1rem; }
.mt-1-5 { margin-top: 1.5rem; }
.mt-2   { margin-top: 2rem; }
.mt-2-5 { margin-top: 2.5rem; }
.mt-3   { margin-top: 3rem; }
.text-center { text-align: center; }
.text-fine {
  font-size: 0.78rem;
  letter-spacing: 0.04em;
}
```

- [ ] **Step 5: Commit**

```bash
git add css/base/
git commit -m "feat: add CSS base layer (tokens, reset, globals)"
```

---

## Task 2: CSS components — buttons, tag, section-header

**Files:**
- Create: `css/components/buttons.css`
- Create: `css/components/tag.css`
- Create: `css/components/section-header.css`

- [ ] **Step 1: Crear `css/components/buttons.css`**

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--gold);
  color: var(--navy);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.85rem 2rem;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  transition:
    background 0.25s var(--ease),
    transform 0.2s var(--ease),
    box-shadow 0.25s;
}
.btn-primary:hover {
  background: var(--gold-light);
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(201, 169, 110, 0.35);
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: transparent;
  color: var(--white);
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.85rem 2rem;
  border-radius: 100px;
  border: 1px solid var(--border);
  cursor: pointer;
  transition:
    border-color 0.25s,
    color 0.25s,
    background 0.25s;
}
.btn-outline:hover {
  border-color: var(--gold);
  color: var(--gold);
  background: var(--gold-dim);
}

.arrow-icon {
  width: 18px;
  height: 18px;
  border: 1.5px solid currentColor;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  flex-shrink: 0;
  transition: transform 0.25s var(--ease);
}
a:hover .arrow-icon,
button:hover .arrow-icon {
  transform: rotate(45deg);
}
```

- [ ] **Step 2: Crear `css/components/tag.css`**

```css
.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 0.35rem 0.9rem;
  margin-bottom: 1.25rem;
}
.tag::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gold);
}
```

- [ ] **Step 3: Crear `css/components/section-header.css`**

```css
.section-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--white);
}

.section-subtitle {
  font-size: 1rem;
  color: var(--white-60);
  max-width: 540px;
  line-height: 1.7;
}
```

- [ ] **Step 4: Commit**

```bash
git add css/components/
git commit -m "feat: add CSS components (buttons, tag, section-header)"
```

---

## Task 3: CSS layout — nav y footer

**Files:**
- Create: `css/layout/nav.css`
- Create: `css/layout/footer.css`

- [ ] **Step 1: Crear `css/layout/nav.css`**

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition:
    background 0.35s,
    backdrop-filter 0.35s,
    box-shadow 0.35s;
}
.nav.scrolled {
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 1px 0 var(--border);
}
.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
.nav__logo img {
  height: 36px;
  width: auto;
}
.nav__links {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.nav__links a {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--white-60);
  letter-spacing: 0.02em;
  transition: color 0.2s;
  position: relative;
}
.nav__links a::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--gold);
  transition: width 0.3s var(--ease);
}
.nav__links a:hover {
  color: var(--white);
}
.nav__links a:hover::after {
  width: 100%;
}
.nav__cta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 0.5rem;
  background: none;
  border: none;
}
.nav__hamburger span {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--navy);
  transition:
    transform 0.3s var(--ease),
    opacity 0.3s;
}
.nav__hamburger.open span:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}
.nav__hamburger.open span:nth-child(2) {
  opacity: 0;
}
.nav__hamburger.open span:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

.nav__mobile {
  display: none;
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  z-index: 999;
}
.nav__mobile.open {
  display: flex;
}
.nav__mobile a {
  font-family: var(--font-serif);
  font-size: 2rem;
  color: var(--white);
  transition: color 0.2s;
}
.nav__mobile a:hover {
  color: var(--gold);
}
```

- [ ] **Step 2: Crear `css/layout/footer.css`**

```css
footer {
  padding: 4rem 0 2rem;
  border-top: 1px solid var(--border);
  background: var(--navy);
}
.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 3rem;
}
.footer__logo img {
  height: 32px;
}
.footer__nav {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
.footer__nav a {
  font-size: 0.825rem;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s;
}
.footer__nav a:hover {
  color: var(--gold);
}
footer .btn-outline {
  color: rgba(255, 255, 255, 0.7);
  border-color: rgba(255, 255, 255, 0.2);
  font-size: 0.825rem;
  padding: 0.65rem 1.5rem;
}
footer .btn-outline:hover {
  color: var(--gold);
  border-color: var(--gold);
  background: rgba(232, 168, 32, 0.1);
}
.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.footer__copy {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.45);
}
.footer__location {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.45);
}
```

- [ ] **Step 3: Commit**

```bash
git add css/layout/
git commit -m "feat: add CSS layout (nav, footer)"
```

---

## Task 4: CSS sections — hero y about

**Files:**
- Create: `css/sections/hero.css`
- Create: `css/sections/about.css`

- [ ] **Step 1: Crear `css/sections/hero.css`**

```css
.hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: 72px;
  position: relative;
  overflow: hidden;
}
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}
.hero__bg::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(11, 15, 26, 0.82) 0%,
    rgba(11, 15, 26, 0.52) 45%,
    rgba(11, 15, 26, 0.88) 100%
  );
}
.hero__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 1;
}
.hero__orb--1 {
  width: 500px;
  height: 500px;
  background: rgba(201, 169, 110, 0.1);
  top: -100px;
  right: -100px;
}
.hero__orb--2 {
  width: 300px;
  height: 300px;
  background: rgba(201, 169, 110, 0.07);
  bottom: 120px;
  left: -80px;
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 5rem;
  width: 100%;
}
.hero__eyebrow {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 1.5rem;
}
.hero__title {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--white);
  max-width: 820px;
  margin-bottom: 1.75rem;
}
.hero__title em {
  font-style: italic;
  color: var(--gold);
}
.hero__desc {
  font-size: 1.05rem;
  color: var(--white-60);
  max-width: 500px;
  line-height: 1.75;
  margin-bottom: 2.5rem;
}
.hero__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero__stats {
  position: relative;
  z-index: 2;
  background: rgba(30, 50, 105, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(232, 168, 32, 0.25);
}
.hero__stats-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.stat-item {
  padding: 2rem 1.5rem;
  text-align: center;
  border-right: 1px solid rgba(232, 168, 32, 0.25);
}
.stat-item:last-child {
  border-right: none;
}
.stat-number {
  font-family: var(--font-serif);
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
  margin-bottom: 0.35rem;
}
.stat-label {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}
```

- [ ] **Step 2: Crear `css/sections/about.css`**

```css
.about {
  padding: 8rem 0;
  overflow: hidden;
}
.about__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}
.about__image-wrap {
  position: relative;
}
.about__image-main {
  border-radius: var(--radius);
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
}
.about__image-badge {
  position: absolute;
  bottom: 2rem;
  right: -2rem;
  background: var(--gold);
  color: var(--navy);
  border-radius: var(--radius-sm);
  padding: 1.25rem 1.5rem;
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1.3;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}
.about__image-badge span {
  display: block;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 0.2rem;
  opacity: 0.75;
}
.about__line {
  width: 48px;
  height: 2px;
  background: var(--gold);
  margin: 1.5rem 0;
}
.about__text {
  color: var(--white-60);
  line-height: 1.8;
}
.about__features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
}
.feature-chip {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.825rem;
  font-weight: 500;
  color: var(--white-60);
}
.feature-chip::before {
  content: "✓";
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--gold-dim);
  color: var(--gold);
  font-size: 0.65rem;
  font-weight: 700;
  flex-shrink: 0;
}
```

- [ ] **Step 3: Commit**

```bash
git add css/sections/hero.css css/sections/about.css
git commit -m "feat: add CSS sections hero and about"
```

---

## Task 5: CSS sections — servicios y proceso

**Files:**
- Create: `css/sections/servicios.css`
- Create: `css/sections/proceso.css`

- [ ] **Step 1: Crear `css/sections/servicios.css`**

```css
.servicios {
  padding: 8rem 0;
  background: var(--navy-mid);
}
.servicios__header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: end;
  margin-bottom: 4rem;
}
.servicios__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5px;
  background: var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}
.servicio-card {
  background: #ffffff;
  padding: 2.5rem 2rem;
  transition:
    background 0.3s,
    box-shadow 0.3s;
  position: relative;
  overflow: hidden;
}
.servicio-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--gold), transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease);
}
.servicio-card:hover {
  background: #f8f9fd;
  box-shadow: 0 8px 32px rgba(30, 50, 105, 0.08);
}
.servicio-card:hover::before {
  transform: scaleX(1);
}
.servicio-card__icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--gold-dim);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  transition: background 0.3s;
}
.servicio-card:hover .servicio-card__icon {
  background: rgba(201, 169, 110, 0.25);
}
.servicio-card__title {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 0.85rem;
}
.servicio-card__list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.servicio-card__list li {
  font-size: 0.85rem;
  color: var(--white-60);
  padding-left: 1rem;
  position: relative;
}
.servicio-card__list li::before {
  content: "—";
  position: absolute;
  left: 0;
  color: var(--gold);
  font-size: 0.7rem;
}
```

- [ ] **Step 2: Crear `css/sections/proceso.css`**

```css
.proceso {
  padding: 8rem 0;
}
.proceso__header {
  text-align: center;
  margin-bottom: 5rem;
}
.proceso__header .section-subtitle {
  margin: 0 auto;
}
.proceso__steps {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}
.proceso-step {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 3rem 2.5rem;
  box-shadow: 0 4px 24px rgba(30, 50, 105, 0.07);
}
.proceso-step__num {
  font-family: var(--font-serif);
  font-size: 4rem;
  font-weight: 800;
  color: rgba(232, 168, 32, 0.25);
  line-height: 1;
  margin-bottom: 0.5rem;
  letter-spacing: -0.05em;
}
.proceso-step__title {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 0.75rem;
}
.proceso-step__text {
  font-size: 0.9rem;
  color: var(--white-60);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}
.proceso-step__logos {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.proceso-step__logo {
  height: 36px;
  width: auto;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.6;
  transition: opacity 0.2s;
}
.proceso-step__logo:hover {
  opacity: 1;
}
.proceso-step__logo--rendara {
  filter: none;
  opacity: 1;
  height: 28px;
}
.proceso-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
}
.proceso-arrow svg {
  width: 40px;
  opacity: 0.4;
}
```

- [ ] **Step 3: Commit**

```bash
git add css/sections/servicios.css css/sections/proceso.css
git commit -m "feat: add CSS sections servicios and proceso"
```

---

## Task 6: CSS sections — beneficios, faq y contacto

**Files:**
- Create: `css/sections/beneficios.css`
- Create: `css/sections/faq.css`
- Create: `css/sections/contacto.css`

- [ ] **Step 1: Crear `css/sections/beneficios.css`**

```css
.beneficios {
  padding: 8rem 0;
  background: var(--navy-mid);
}
.beneficios__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}
.beneficios__list {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.beneficio-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--border);
}
.beneficio-item:first-child {
  border-top: 1px solid var(--border);
}
.beneficio-item__num {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gold);
  opacity: 0.4;
  min-width: 2rem;
  line-height: 1;
  padding-top: 0.15rem;
}
.beneficio-item__title {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 0.35rem;
}
.beneficio-item__text {
  font-size: 0.875rem;
  color: var(--white-60);
  line-height: 1.7;
}

.beneficios__cta-box {
  background: var(--navy);
  border: 1px solid rgba(232, 168, 32, 0.2);
  border-radius: var(--radius);
  padding: 3rem;
  position: relative;
  overflow: hidden;
}
.beneficios__cta-box::before {
  content: "";
  position: absolute;
  top: -80px;
  right: -80px;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: rgba(232, 168, 32, 0.1);
  filter: blur(60px);
}
.beneficios__cta-box .section-title {
  color: #ffffff;
  font-size: 2rem;
  margin-bottom: 1rem;
  position: relative;
}
.beneficios__cta-box p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.75;
  margin-bottom: 1rem;
  position: relative;
}
.comision-pill {
  display: inline-block;
  background: var(--gold);
  color: var(--navy);
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 2.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-sm);
  margin-bottom: 1rem;
}
```

- [ ] **Step 2: Crear `css/sections/faq.css`**

```css
.faq {
  padding: 8rem 0;
}
.faq__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: start;
}
.faq__left {
  position: sticky;
  top: 100px;
}
.faq__list {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.faq-item {
  border-bottom: 1px solid var(--border);
}
.faq-item:first-child {
  border-top: 1px solid var(--border);
}
.faq-item__btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--white);
  transition: color 0.2s;
}
.faq-item__btn:hover {
  color: var(--gold);
}
.faq-item__icon {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border: 1px solid var(--border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  color: var(--gold);
  transition:
    transform 0.35s var(--ease),
    background 0.2s,
    border-color 0.2s;
}
.faq-item.open .faq-item__icon {
  transform: rotate(45deg);
  background: var(--gold);
  color: var(--navy);
  border-color: var(--gold);
}
.faq-item__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.45s var(--ease);
}
.faq-item.open .faq-item__answer {
  max-height: 400px;
}
.faq-item__answer-inner {
  padding-bottom: 1.5rem;
  font-size: 0.875rem;
  color: var(--white-60);
  line-height: 1.75;
}
.faq-item__answer-inner ul {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.faq-item__answer-inner li {
  padding-left: 1rem;
  position: relative;
}
.faq-item__answer-inner li::before {
  content: "—";
  position: absolute;
  left: 0;
  color: var(--gold);
  font-size: 0.7rem;
}
```

- [ ] **Step 3: Crear `css/sections/contacto.css`**

```css
.contacto {
  padding: 8rem 0 6rem;
  background: var(--navy-mid);
}
.contacto__inner {
  max-width: 700px;
  margin: 0 auto;
}
.contacto__info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
}
.contact-method {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
.contact-method__icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--gold-dim);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}
.contact-method__label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.25rem;
}
.contact-method__value {
  font-size: 0.95rem;
  color: var(--white);
  font-weight: 500;
}

.whatsapp-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  background: #25d366;
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.9rem 1.75rem;
  border-radius: 100px;
  transition:
    background 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}
.whatsapp-cta:hover {
  background: #1ebe5e;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(37, 211, 102, 0.3);
}
```

- [ ] **Step 4: Commit**

```bash
git add css/sections/beneficios.css css/sections/faq.css css/sections/contacto.css
git commit -m "feat: add CSS sections beneficios, faq, contacto"
```

---

## Task 7: CSS animations y responsive

**Files:**
- Create: `css/animations/fade-up.css`
- Create: `css/responsive.css`

- [ ] **Step 1: Crear `css/animations/fade-up.css`**

```css
.fade-up {
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity 0.7s var(--ease),
    transform 0.7s var(--ease);
}
.fade-up.visible {
  opacity: 1;
  transform: none;
}
.fade-up.delay-1 { transition-delay: 0.12s; }
.fade-up.delay-2 { transition-delay: 0.24s; }
.fade-up.delay-3 { transition-delay: 0.36s; }
```

- [ ] **Step 2: Crear `css/responsive.css`**

```css
@media (max-width: 1024px) {
  .about__inner,
  .beneficios__inner,
  .faq__inner {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .about__image-badge {
    right: 1rem;
  }
  .servicios__header {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .servicios__grid {
    grid-template-columns: 1fr;
  }
  .proceso__steps {
    grid-template-columns: 1fr;
  }
  .proceso-arrow {
    transform: rotate(90deg);
    padding: 1.5rem 0;
  }
  .faq__left {
    position: static;
  }
  .hero__stats-inner {
    grid-template-columns: repeat(2, 1fr);
  }
  .stat-item:nth-child(2) {
    border-right: none;
  }
}

@media (max-width: 768px) {
  .nav__links,
  .nav__cta .btn-primary {
    display: none;
  }
  .nav__hamburger {
    display: flex;
  }
  .hero__title {
    font-size: clamp(2.5rem, 8vw, 3.5rem);
  }
  .about__features {
    grid-template-columns: 1fr;
  }
  .footer__inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1.25rem;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add css/animations/ css/responsive.css
git commit -m "feat: add CSS animations and responsive breakpoints"
```

---

## Task 8: CSS entry point — main.css

**Files:**
- Create: `css/main.css`

- [ ] **Step 1: Crear `css/main.css`**

```css
@import url("base/tokens.css");
@import url("base/reset.css");
@import url("base/globals.css");
@import url("components/buttons.css");
@import url("components/tag.css");
@import url("components/section-header.css");
@import url("layout/nav.css");
@import url("layout/footer.css");
@import url("sections/hero.css");
@import url("sections/about.css");
@import url("sections/servicios.css");
@import url("sections/proceso.css");
@import url("sections/beneficios.css");
@import url("sections/faq.css");
@import url("sections/contacto.css");
@import url("animations/fade-up.css");
@import url("responsive.css");
```

- [ ] **Step 2: Commit**

```bash
git add css/main.css
git commit -m "feat: add CSS entry point main.css"
```

---

## Task 9: JavaScript modules

**Files:**
- Create: `js/modules/nav.js`
- Create: `js/modules/faq.js`
- Create: `js/modules/animations.js`

- [ ] **Step 1: Crear directorio JS**

```bash
mkdir -p js/modules
```

- [ ] **Step 2: Crear `js/modules/nav.js`**

```js
export function init() {
  const nav = document.querySelector(".nav");

  window.addEventListener(
    "scroll",
    () => { nav.classList.toggle("scrolled", window.scrollY > 20); },
    { passive: true }
  );
  nav.classList.toggle("scrolled", window.scrollY > 20);

  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}
```

- [ ] **Step 3: Crear `js/modules/faq.js`**

```js
export function init() {
  document.querySelectorAll(".faq-item__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item").forEach((i) => {
        i.classList.remove("open");
        i.querySelector(".faq-item__btn").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}
```

- [ ] **Step 4: Crear `js/modules/animations.js`**

```js
export function init() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
}
```

- [ ] **Step 5: Commit**

```bash
git add js/modules/
git commit -m "feat: add JS modules (nav, faq, animations)"
```

---

## Task 10: JavaScript entry point — main.js

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Crear `js/main.js`**

```js
import { init as initNav } from "./modules/nav.js";
import { init as initFaq } from "./modules/faq.js";
import { init as initAnimations } from "./modules/animations.js";

initNav();
initFaq();
initAnimations();
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat: add JS entry point main.js"
```

---

## Task 11: Reescribir index.html

**Files:**
- Modify: `index.html`

Este task reescribe el `index.html` para:
1. Eliminar el bloque `<style>` completo (~1300 líneas)
2. Eliminar el bloque `<script>` inline (~65 líneas)
3. Agregar `<link rel="stylesheet" href="/css/main.css">` en el `<head>`
4. Agregar `<script type="module" src="/js/main.js"></script>` antes del cierre de `</body>`
5. Reemplazar los 8 atributos `style="..."` con clases utilitarias

- [ ] **Step 1: Reemplazar el bloque `<style>` por el `<link>` a main.css**

Eliminar todo el bloque que empieza con `<style>` (línea 132) y termina con `</style>` (línea 1304), y reemplazarlo con:

```html
    <link rel="stylesheet" href="/css/main.css" />
```

Esta línea va inmediatamente después de las etiquetas `<link>` de Google Fonts.

- [ ] **Step 2: Reemplazar el bloque `<script>` inline por el módulo externo**

Eliminar el bloque completo:
```html
    <script>
      // Nav scroll blur
      ...
    </script>
```

Y reemplazarlo (antes del cierre de `</body>`) con:

```html
    <script type="module" src="/js/main.js"></script>
```

- [ ] **Step 3: Reemplazar inline styles con clases utilitarias**

Aplicar estos 8 cambios en el HTML:

| Antes | Después |
|-------|---------|
| `<p class="about__text" style="margin-top: 1rem">` | `<p class="about__text mt-1">` |
| `<p class="section-subtitle" style="margin-top: 1rem">` (en `#proceso`) | `<p class="section-subtitle mt-1">` |
| `<div style="margin-top: 2.5rem" class="beneficios__list">` | `<div class="beneficios__list mt-2-5">` |
| `<p style="font-size: 0.78rem; letter-spacing: 0.04em">` | `<p class="text-fine">` |
| `<a href="#contacto" class="btn-primary" style="margin-top: 1.5rem; display: inline-flex">` | `<a href="#contacto" class="btn-primary mt-1-5">` |
| `<a href="#contacto" class="btn-outline" style="margin-top: 2rem">` (en FAQ) | `<a href="#contacto" class="btn-outline mt-2">` |
| `<p class="section-subtitle" style="margin-top: 1rem">` (en `#contacto`) | `<p class="section-subtitle mt-1">` |
| `<div style="text-align: center; margin-top: 3rem">` | `<div class="text-center mt-3">` |

Nota: El `<a class="btn-outline" style="font-size: 0.825rem; padding: 0.65rem 1.5rem">` del footer ya está cubierto por `footer .btn-outline` en `css/layout/footer.css` — eliminar el `style=""` directamente.

- [ ] **Step 4: Verificar en browser**

Abrir `index.html` en el browser (o servir con `python3 -m http.server 8080` desde la carpeta `RendaraWebsite/`).

Verificar:
- [ ] El sitio carga con el mismo aspecto visual que el original
- [ ] El nav se vuelve blanco al hacer scroll
- [ ] El menú hamburger funciona en mobile (o reduciendo el browser a <768px)
- [ ] El FAQ accordion abre y cierra correctamente
- [ ] Las animaciones fade-up se disparan al hacer scroll
- [ ] No hay errores en la consola del browser (F12 → Console)

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: rewrite index.html — clean HTML, external CSS and JS modules"
```

---

## Task 12: Eliminar archivos obsoletos

**Files:**
- Delete: `blocks/`
- Delete: `pages/`
- Delete: `script.js`
- Delete: `vendor/`

- [ ] **Step 1: Verificar que el sitio funciona sin los archivos obsoletos**

Los archivos obsoletos ya no están referenciados en el nuevo `index.html`. Confirmar que ningún `<link>` o `<script>` en el HTML apunte a estas carpetas antes de borrarlas.

```bash
grep -r "blocks\|pages\|script\.js\|vendor" index.html
```

Resultado esperado: sin output (ninguna referencia).

- [ ] **Step 2: Eliminar archivos obsoletos**

```bash
rm -rf blocks/ pages/ script.js vendor/
```

- [ ] **Step 3: Verificar en browser una vez más**

```bash
python3 -m http.server 8080
```

Abrir `http://localhost:8080` y confirmar que el sitio carga correctamente y sin errores en consola.

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "chore: remove legacy CSS, vendor, and unused script.js"
```
