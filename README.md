# Abhishek S Valsan — Portfolio

Personal portfolio of Abhishek S Valsan, digital marketer working across Meta Ads, SEO, conversion rate optimisation and short-form video.

**Live site:** https://abhisheksvalsanportfolio.netlify.app/

## What's inside

- Case studies: Bang Bang Burger, Peely Digital Media, Aqiq Architecture, Himmath Gold, AIBI Campus, KasavuMaalika and Anad.ae
- Showreel with brand reels and AI ad films that play directly on the page
- Experience timeline, skills and contact details

## Project structure

```
index.html      The whole site: markup, styles and scripts in one file
img/            Case study screenshots
media/          Videos (.mp4), posters (.jpg) and playlist thumbnails (-thumb.jpg)
```

It is a static site with no build step. Open `index.html` in a browser to preview it locally.

## Editing

- **Videos:** add `media/<key>.mp4`, `media/<key>.jpg` and `media/<key>-thumb.jpg`, then add an entry to the `VIDEOS` list near the bottom of `index.html`.
- **Case studies:** the popup text lives in the `CASES` object near the bottom of `index.html`; the cards are in the `#work` section.

## Deploying

Any static host works. On Netlify, link this repository to the site with no build command and publish directory `/`; every push to `main` deploys automatically.
