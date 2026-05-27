# Freshr Studios — Website

Buffalo's Story Studio. Boutique video and photography production.

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 3** (with brand custom properties in `src/styles/globals.css`)
- **React Router v7**
- **Google Fonts** — Bebas Neue (display) + DM Sans (body)
- **Formspree** — contact form (replace `YOUR_FORM_ID` in `ContactForm.jsx`)

## Dev

```bash
npm run dev       # start dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

## File Structure

```
src/
  assets/
    logos/
      logo-light.svg   ← navy wordmark, use on light backgrounds
      logo-dark.svg    ← white wordmark, use on dark backgrounds
    images/            ← drop photography/video stills here
  components/
    Navbar.jsx
    Footer.jsx
    ServiceCard.jsx
    WorkItem.jsx
    ContactForm.jsx
  pages/
    Home.jsx
    Services.jsx
    Work.jsx
    About.jsx
    Contact.jsx
  styles/
    globals.css        ← CSS custom properties, Tailwind directives
  App.jsx
  main.jsx
```

## Brand

| Token | Value |
|---|---|
| Navy | `#1b4965` |
| Orange (sacred) | `#fc9e4f` |
| Dark bg | `#0E0E0E` |
| Cream | `#F5F0E8` |
| Muted | `#888680` |

The orange period **never** changes color or shape.

## Formspree Setup

1. Create a form at [formspree.io](https://formspree.io)
2. Replace `YOUR_FORM_ID` in `src/components/ContactForm.jsx` with your form ID

## Deploy

Drag the `dist/` folder to [Netlify Drop](https://app.netlify.com/drop), or connect the GitHub repo for continuous deployment.
