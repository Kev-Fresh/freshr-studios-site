# Freshr Studios — Project Brief for Claude Code

## Who We Are

**Freshr Studios** is Buffalo's Story Studio. We are a boutique video and photography production studio rooted in Buffalo, NY, built to capture authentic stories from the city and its diaspora. We document culture — events, people, places, moments — with intention and craft.

**Tagline:** Buffalo's Story Studio  
**Parent company:** Beam Innovations LLC (Freshr operates as a DBA)  
**Location:** Buffalo, NY  
**Primary camera:** Sony FX30 + Sigma 18-50mm  
**Post-production:** DaVinci Resolve

---

## Target Client

Buffalo expats, diaspora, and community-connected people and organizations who want their stories told with care. Clients who value craft over cheap, and authenticity over generic.

---

## Services (Four Offerings)

| Offering | Description |
|---|---|
| **First Frame** | Entry-level photography/video package. A clean, focused story told well. |
| **The Sit Down** | Interview/portrait format. One subject, one story, thoughtfully captured. |
| **The Deep Dive** | Full production. Extended coverage, multiple angles, editorial post. |
| **In The Moment** | Event coverage. Live, reactive, real-time storytelling. |

---

## Client Experience System — The Five Pillars

Every client interaction is guided by five pillars (use these to inform copy tone and flow):
1. **Clarity** — No confusion about what they're getting
2. **Craft** — Every frame is intentional
3. **Care** — We treat their story like it matters (because it does)
4. **Community** — Rooted in Buffalo, always
5. **Continuity** — The relationship doesn't end at delivery

---

## Brand Identity

### Logo
- **Primary logo:** `logo-light.svg` (navy wordmark + orange period) — use on white/light backgrounds
- **Dark mode logo:** `logo-dark.svg` (white wordmark + orange period) — use on dark backgrounds
- The orange period (`#fc9e4f`) **never changes color** in any context. It is the brand constant.
- Logo icon is a spotlight/film light pointing down-right with rays

### Colors
```css
--color-navy: #1b4965;          /* Primary brand color */
--color-orange: #fc9e4f;        /* Orange period — accent only, use sparingly */
--color-dark-bg: #0E0E0E;       /* Dark mode page background */
--color-light-bg: #ffffff;      /* Light mode page background */
--color-cream: #F5F0E8;         /* Warm off-white for section contrast */
--color-text-dark: #0E0E0E;     /* Body text on light */
--color-text-light: #F5F0E8;    /* Body text on dark */
--color-muted: #888680;         /* Secondary/caption text */
```

### Dark/Light Mode
The site **responds to the user's system `prefers-color-scheme` setting** automatically.
- Light mode: white/cream backgrounds, navy text, navy logo
- Dark mode: near-black backgrounds, off-white text, white logo
- The orange period accent is used in **both modes** — hover states, CTA buttons, dividers, active states
- Use CSS custom properties + `@media (prefers-color-scheme: dark)` for all theme switching

### Typography
- **Display/Headlines:** `Bebas Neue` or `Barlow Condensed` (700 weight) — large, condensed, editorial energy. Import from Google Fonts.
- **Body/UI:** `DM Sans` or `Syne` — clean, modern, not generic. Import from Google Fonts.
- Headlines should be **large and confident** — inspired by the Bangrain Surya and Vol. One Studios aesthetic
- Section titles feel like magazine headers: "The Work." / "The Process." / "The Stories."

### Visual Aesthetic
Drawn from these references:
- **Bangrain Surya** — massive condensed headlines, minimal nav, work displayed as a filmstrip
- **Vol. One Studios** — warm cream sections, photo collage grid, accordion service list, rotated vertical type
- **Hero Kit** — oversized type bleeding into photography, warm accent color blocking
- **Slavica Zlatar-Banika** — editorial section naming ("The Work.", "The Method."), confident voice
- **Decork** — photo/text split layouts, bold type paired with editorial photography

**Key aesthetic rules:**
- Large type first, photography second — let them coexist
- Generous whitespace OR controlled density — never timid middle ground
- Dark base sections contrasted with warm cream sections
- No gradients on UI elements (photography provides all the visual richness)
- Subtle grain texture overlay is acceptable on hero sections
- Horizontal filmstrip / scroll for work samples

---

## Site Architecture

### Pages
1. **Home (`/`)** — Hero with massive headline + photo, intro statement, services preview, work teaser, CTA
2. **Services (`/services`)** — Four offerings with accordion expand, pricing signal, CTA per service
3. **Work (`/work`)** — Portfolio grid/filmstrip — video embeds + photo stills from FX30 footage
4. **About (`/about`)** — Studio story, Buffalo roots, the Five Pillars, photographer/director bio
5. **Contact (`/contact`)** — Intake form wired to email (Formspree), Five Pillars experience starts here

### Navigation
- Minimal top nav: logo left, links right (Work / Services / About / Contact)
- Mobile: hamburger → full-screen overlay menu
- Nav background: transparent on hero, solid on scroll

### Footer
- Logo (white on dark footer)
- Tagline: "Buffalo's Story Studio"
- Links: Instagram, contact email
- Legal: "© Freshr Studios. A Beam Innovations LLC company."

---

## Tech Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Fonts:** Google Fonts (Bebas Neue / Barlow Condensed + DM Sans / Syne)
- **Form handling:** Formspree (no backend needed)
- **Analytics:** Plausible (privacy-first) or Google Analytics
- **Deployment:** Netlify or Vercel
- **Version control:** GitHub

---

## File Structure Conventions

```
/src
  /assets
    /logos
      logo-light.svg    ← navy wordmark, use on light backgrounds
      logo-dark.svg     ← white wordmark, use on dark backgrounds
    /images             ← photography and video stills
  /components
    Navbar.jsx
    Footer.jsx
    ServiceCard.jsx
    WorkItem.jsx
    ContactForm.jsx
  /pages
    Home.jsx
    Services.jsx
    Work.jsx
    About.jsx
    Contact.jsx
  /styles
    globals.css         ← CSS custom properties, theme variables
  App.jsx
  main.jsx
```

---

## Copy Voice & Tone

- **Confident, not arrogant.** We know what we do is good. We don't need to shout it.
- **Buffalo-rooted, not parochial.** We're from here, we rep here — but the work speaks beyond here.
- **Direct.** Short sentences. Active voice. "We capture stories." Not "We are dedicated to the art of visual storytelling."
- **Warm but not soft.** This is craft, not content. Story, not product.
- **Section titles use "The ___." pattern** — "The Work." / "The Process." / "The Stories." / "The Studio."

---

## Component Guidelines

### Hero Section
- Full-viewport height
- Massive condensed headline (100px+ on desktop) overlapping or bleeding into a full-bleed photo
- Subheading: "Buffalo's Story Studio" in smaller weight
- Single CTA button: "See the Work" — outlined style, orange on hover/active
- Photo: editorial, real — from actual Freshr shoots (skate party, events, portraits)

### Service Cards
- Vol. One Studios style: service name large on left, expand (+) on click for description
- Show offering name, one-line description, and a "Book this" CTA when expanded
- Subtle border separator between services

### Work Grid
- Horizontal filmstrip on desktop (overflow-x scroll)
- 2-col grid on mobile
- Items: thumbnail + project title + category tag (Video / Photo / Event)
- Hover: slight scale + orange border accent

### Contact Form
- Fields: Name, Email, Phone (optional), Service interest (dropdown: First Frame / The Sit Down / The Deep Dive / In The Moment), Message
- Submit button: "Start the Conversation" — dark bg, orange text on hover
- Wire to Formspree: replace `YOUR_FORM_ID` with actual Formspree endpoint

---

## Important Notes

- **NYS Publication requirement** for the LLC is outstanding — do not reference legal entity details on the site beyond "A Beam Innovations LLC company" in the footer
- **Interview workflow:** Interviewee does not wear a mic — boom/hot shoe mount only. Relevant for any behind-the-scenes copy.
- **No foam finger merchandise** — environmentally conscious product philosophy
- **The orange period is sacred.** Never change `#fc9e4f`. Never make it a different shape. It is always a period/dot.
- When in doubt on color: add orange sparingly. One orange element per section maximum.
- Photography > illustration. Always use real Freshr images when available.
