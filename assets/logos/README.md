# Logos

The customer and partner tiles currently use clean text wordmarks so the site
looks complete out of the box. To replace any wordmark with an official logo
image, follow these steps.

## 1. Add the image file

Drop the logo into this folder, e.g.:

    assets/logos/kribb.svg
    assets/logos/korea-university.svg
    assets/logos/daesang.svg

SVG is preferred. PNG with a transparent background also works. Aim for a
height of roughly 80-120px; the CSS scales it down.

## 2. Replace the wordmark in the HTML

In `customers.html` (and the teaser block in `index.html`), find the tile:

    <div class="logo">
      <span class="mark">KRIBB</span>
      <span class="desc">Korea Research Institute of Bioscience & Biotechnology</span>
    </div>

Replace the text inside `.mark` with an `img`:

    <div class="logo">
      <span class="mark"><img src="assets/logos/kribb.svg" alt="KRIBB"></span>
      <span class="desc">Korea Research Institute of Bioscience & Biotechnology</span>
    </div>

That is the only change needed. The stylesheet already handles sizing and a
neutral grayscale treatment (`.logo .mark img`) so mixed logos look consistent
on the dark background. Remove the grayscale rule in `assets/css/style.css` if
you prefer full-color logos.

## Logo checklist

Customers:
- KRIBB
- Korea University
- Kyung Hee University
- Sejong University
- Daesang
- HLB Genex (Genofocus)
- Fermentec

Partners:
- Korea University Industry-Academic Cooperation Foundation
- Technology Commercialization Center
- CSBL

## Note on trademarks

Use only logo files you are authorized to display. Obtain official assets from
each organization's brand/press kit or with their permission.
