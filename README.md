# Abhishek S Valsan, portfolio

Portfolio of Abhishek S Valsan, digital marketer for Meta Ads, SEO and short form video.

**Live site:** https://abhisheksvalsanportfolio.netlify.app/

## Structure

```
index.html          Home page: hero, benefits, process, case studies, showreel, experience, FAQ, contact
privacy.html        Privacy page
terms.html          Terms page
404.html            Branded not found page (Netlify serves it automatically)
favicon.svg         Site icon
assets/css/site.css Design system and all styles
assets/js/site.js   Behaviour, plus the case study (CASES) and video (VIDEOS) content
assets/fonts/       Geist (self hosted) and a trimmed Phosphor icon font
assets/og.png       Social sharing image
img/                Case study screenshots
media/              Videos, posters and playlist thumbnails
```

Static site, no build step. Open `index.html` in a browser to preview.

## Editing

- **Case study popups:** edit the `CASES` object in `assets/js/site.js`.
- **Videos:** add `media/<key>.mp4`, `media/<key>.jpg` and `media/<key>-thumb.jpg`, then add an entry to `VIDEOS` in `assets/js/site.js`.
- **New icons:** the icon font is trimmed to the icons in use. Add the icon's class to `site.css` and re-subset `Phosphor.woff2` from `@phosphor-icons/web`.

## Design rules

Built to a fixed visual system: Geist only, Tailwind type scale with named text styles (`heading-1`, `body-3`, `caption-2` and so on), spacing tokens from 2px to 96px, Tailwind radii, flat dark backgrounds, Phosphor icons, and one motion curve, `cubic-bezier(0.22,1,0.36,1)`.

## Deploying

Netlify publishes the `main` branch automatically on every push.
