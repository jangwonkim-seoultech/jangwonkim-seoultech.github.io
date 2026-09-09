# RLC Lab Website

Static website for the Robot Learning and Control Lab at SeoulTech. The site is built with Next.js, TypeScript, plain CSS, and JSON content. Production does not require a database, CMS, authentication service, or application server.

## Admin GUI

For routine content and image maintenance on Windows, double-click:

```text
..\admin\run_admin.bat
```

The Admin edits the JSON content and image assets used by the public site. See `../manual.md` for the full operating guide.

## Local Development

From this `source` directory, run:

```sh
npm.cmd run dev
```

Open the local address printed in the terminal, usually `http://127.0.0.1:3000/`. If dependencies are missing, run `npm.cmd install` once and then start the dev server again.

## Content Locations

- `config/site.json`: lab identity, contact, address, logo, home, and display settings
- `config/copy.json`: navigation, page headings, interface copy, and SEO copy
- `content/people/`: professor, members, and alumni
- `content/publications/`: publications
- `content/news/`: news
- `content/gallery/`: gallery items
- `content/research/`: research areas
- `public/images/`: local images
- `public/media/`: local videos

## Checks And Build

```sh
npm run validate
npm run typecheck
npm run build
```

`npm run build` creates the static website in `out/`.

## GitHub Pages

The workflow at `.github/workflows/deploy-pages.yml` builds and deploys the site. In GitHub, set Settings > Pages > Source to GitHub Actions, then push to `main`.
