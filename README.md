# fablessBio website

Static website for fablessBio Inc. No build step, no framework. Plain HTML, CSS,
and a small amount of vanilla JavaScript, designed to deploy on GitHub Pages.

## Structure

    .
    ├── index.html          Home
    ├── science.html        Science (DNA / protein foundation models, DMBTL, GPU program)
    ├── about.html          About (the fabless model, affiliation)
    ├── customers.html      Customers & Partners
    ├── history.html        History / timeline
    ├── .nojekyll           Tells GitHub Pages to serve files as-is
    └── assets/
        ├── css/style.css   All styles + design tokens
        ├── js/main.js      Mobile nav, scroll reveal, sequence readout
        └── logos/          Logo swap instructions (see logos/README.md)

## Preview locally

From this folder:

    python3 -m http.server 8000

Then open http://localhost:8000

## Deploy to GitHub Pages

This repository targets the existing site at `https://fablessbio.github.io/`,
which is served from the `fablessbio/fablessbio.github.io` repository.

1. Copy every file in this folder into the root of that repository
   (including the hidden `.nojekyll` file).
2. Commit and push to the `main` branch.

       git add .
       git commit -m "Redesign fablessBio site"
       git push origin main

3. In the repository: Settings -> Pages -> Build and deployment ->
   Source: "Deploy from a branch", Branch: `main`, Folder: `/ (root)`.
4. The site publishes at https://fablessbio.github.io/ within a minute or two.

Because `fablessbio.github.io` is a user/organization Pages repo, the site is
served from the repository root at the apex path, so all the relative asset
links (`assets/...`) resolve correctly with no base-path changes.

The custom domains `fabless.bio` / `fablessbio.com` continue to redirect to the
GitHub Pages site; no change is needed unless you move the `CNAME` file.

## Editing content

- Text lives directly in the `.html` files. Each page repeats the same header
  and footer markup so a page can be edited in isolation.
- Colors, type, and spacing are controlled by CSS custom properties at the top
  of `assets/css/style.css` (the `:root` block).
- To add real customer/partner logos, see `assets/logos/README.md`.

## Notes

- Fonts (Space Grotesk, Inter, IBM Plex Mono) load from Google Fonts.
- The history timeline dates are program-level milestones; review and adjust
  them to match the company's records before publishing.
- No emojis are used anywhere in the codebase, per project convention.
