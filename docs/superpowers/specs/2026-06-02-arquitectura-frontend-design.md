# Arquitectura Frontend Modular — Rendara Website

**Fecha:** 2026-06-02  
**Estado:** Aprobado  
**Alcance:** Refactor completo de `index.html` monolítico a arquitectura modular vanilla

---

## Contexto

El sitio actual tiene ~2000 líneas en un solo `index.html` con CSS (~1300 líneas en `<style>`), HTML y JS mezclados. Existen archivos CSS en `blocks/` y `pages/` de un diseño anterior incompatible (diferentes fuentes, colores, selectores). El `script.js` tiene selectores que no corresponden al HTML actual.

**Objetivo:** separar responsabilidades en archivos dedicados, sin introducir build tools, usando vanilla HTML + CSS `@import` + ES Modules nativos.

---

## Arquitectura

### Estructura de carpetas

```
RendaraWebsite/
├── index.html
├── css/
│   ├── main.css                ← entrada única, solo @import
│   ├── base/
│   │   ├── tokens.css          ← CSS custom properties
│   │   ├── reset.css           ← box-sizing, resets elementales
│   │   └── globals.css         ← html, body, img, a, ul, .container
│   ├── components/
│   │   ├── buttons.css         ← .btn-primary, .btn-outline, .arrow-icon
│   │   ├── tag.css             ← .tag
│   │   └── section-header.css  ← .section-title, .section-subtitle
│   ├── layout/
│   │   ├── nav.css             ← .nav, hamburger, mobile menu
│   │   └── footer.css
│   ├── sections/
│   │   ├── hero.css
│   │   ├── about.css
│   │   ├── servicios.css
│   │   ├── proceso.css
│   │   ├── beneficios.css
│   │   ├── faq.css
│   │   └── contacto.css
│   ├── animations/
│   │   └── fade-up.css
│   └── responsive.css          ← media queries al final (sobreescritura)
├── js/
│   ├── main.js                 ← inicializa módulos
│   └── modules/
│       ├── nav.js              ← scroll blur + hamburger
│       ├── faq.js              ← accordion
│       └── animations.js       ← IntersectionObserver fade-up
└── images/                     ← sin cambios
```

---

## CSS

- **Un solo `<link href="/css/main.css">`** en el `<head>` del HTML.
- `main.css` usa `@import` para cargar todos los archivos en orden de cascada:
  1. base/tokens.css
  2. base/reset.css
  3. base/globals.css
  4. components/buttons.css
  5. components/tag.css
  6. components/section-header.css
  7. layout/nav.css
  8. layout/footer.css
  9. sections/hero.css
  10. sections/about.css
  11. sections/servicios.css
  12. sections/proceso.css
  13. sections/beneficios.css
  14. sections/faq.css
  15. sections/contacto.css
  16. animations/fade-up.css
  17. responsive.css
- Cada archivo tiene una sola responsabilidad; no hay estilos cruzados entre archivos.
- Los `responsive.css` (media queries) van al final para sobreescribir correctamente.

### Inline styles a eliminar del HTML

Hay 6 instancias de `style="..."` en el HTML actual que se convierten a clases utilitarias:
- `style="margin-top: 1rem"` → `.mt-1`
- `style="margin-top: 1.5rem; display: inline-flex"` → `.mt-1-5` (el `display` ya lo tiene `.btn-primary`)
- `style="margin-top: 2rem"` → `.mt-2`
- `style="margin-top: 2.5rem"` → `.mt-2-5` (aplicado via clase en el elemento padre)
- `style="font-size: 0.78rem; letter-spacing: 0.04em"` → `.text-fine`
- `style="text-align: center; margin-top: 3rem"` → `.text-center.mt-3`

Las clases utilitarias van en `css/base/globals.css`.

---

## JavaScript

- **`<script type="module" src="/js/main.js">`** al final del `<body>`.
- ES Modules nativos — sin bundler, compatible con todos los browsers modernos.
- Cada módulo exporta una función `init()`.
- `main.js` importa e inicializa todos los módulos.

### Módulos

| Archivo | Responsabilidad |
|---|---|
| `modules/nav.js` | Scroll → clase `.scrolled` en nav; toggle hamburger + menú móvil; cierre al hacer click en link |
| `modules/faq.js` | Accordion: open/close items, manejo de `aria-expanded` |
| `modules/animations.js` | `IntersectionObserver` que añade `.visible` a elementos `.fade-up` |

---

## HTML

- `index.html` limpio: solo estructura semántica HTML5.
- Sin ningún `<style>` ni bloque `<script>` inline.
- El JSON-LD (Schema.org) permanece en `<head>` — es el estándar SEO, no tiene alternativa válida para externalizarlo.
- Los meta tags Open Graph, Twitter Cards y SEO primario permanecen en `<head>`.
- Fuentes de Google Fonts se cargan con `<link>` en `<head>` (ya existente, sin cambios).

---

## Archivos que se eliminan

| Archivo/Carpeta | Razón |
|---|---|
| `blocks/` | Diseño anterior incompatible (Poppins, otros colores, selectores distintos) |
| `pages/index.css` | Reemplazado por `css/main.css` |
| `script.js` | Selectores incorrectos; reemplazado por `js/modules/` |
| `vendor/` | `normalize.css` reemplazado por `css/base/reset.css`; fuentes ya se cargan desde Google Fonts |

---

## Restricciones y no-objetivos

- No se introduce build tool (Vite, Parcel, Webpack).
- No se cambia el diseño visual: colores, fuentes, layout y animaciones son idénticos al `index.html` actual.
- No se agrega TypeScript ni SCSS.
- No se crean páginas adicionales (sitio de una sola página).
