# Spider-Verse Explorer

An animated, responsive React experience for exploring Spider-People across the multiverse. Built with Vite, React Router, Framer Motion, Canvas 2D and Lucide icons.

## Features

- Animated landing page with a mouse/scroll-responsive Canvas web graphic.
- Spider-Society gallery with 26 character profiles and alternate-universe variants.
- Individual detail routes for every character.
- Filter by universe and variant type, sort alphabetically or by recently added, and search by name, identity, universe, powers or profile text. Filters are stored in URL query parameters (`universe`, `type`, `sort`, `q`).
- Multiverse portal transition when opening a character.
- Scroll reveal, hover tilt, responsive layouts and reduced-motion support.
- Vercel and Netlify SPA rewrite configuration included.

Open the local URL shown by Vite.
live demo-http://localhost:5173/gallery

## Deploy

### Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Keep the framework preset as **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy. `vercel.json` includes the SPA rewrite for nested routes.

### Netlify

1. Push this folder to a GitHub repository and import it in Netlify (or drag the `dist` folder after building).
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. `netlify.toml` includes the SPA rewrite for nested routes.

## Character data and image credits

The directory combines Spider-People and alternate-universe variants from Marvel stories and Spider-Verse references. Character profiles, image URLs, image framing and credit notes are stored with each entry in `src/data/spiders.json`. The character cards use actual comic artwork, official character art, film stills or production-design images rather than generated silhouette placeholders.

Some image files are served by their original publishers, artists or reference sites, so an internet connection is required and an external host may change or restrict an image URL. If a host blocks an image, that card keeps its themed background rather than substituting a generic Spider silhouette.

Comic artwork, production designs and character names remain the property of their respective rights holders and creators. This is a non-commercial student/fan project, not affiliated with Marvel, Disney, Sony, Fandom or Comic Vine.

## Project structure

```text
src/
  components/
    CharacterCard.jsx
    Footer.jsx
    Navbar.jsx
    PortalTransition.jsx
    SpiderWebCanvas.jsx
  data/
    spiders.json
  pages/
    Gallery.jsx
    Home.jsx
    SpiderDetail.jsx
  App.jsx
  index.css
  main.jsx
public/
  favicon.svg
```
