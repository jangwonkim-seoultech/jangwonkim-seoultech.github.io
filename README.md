# RLC Lab. website

Static website for the Robot Learning and Control Lab. at SeoulTech. Built with Next.js, TypeScript, plain CSS, and JSON content. Production requires no database, CMS, authentication service, or application server.

## Admin GUI

For routine content and image maintenance on Windows, double-click:

```text
..\admin\run_admin.bat
```

The Admin edits the same JSON files used by the site. There is **one copy field per item**; there is no KO/EN split. See `../manual.md` for the full guide.

## Local development

On Windows PowerShell or Command Prompt, from the `source` directory run:

```sh
npm.cmd run dev
```

Then open the **Local** address printed in the terminal. It is usually `http://127.0.0.1:3000/`, but Next.js may use `http://127.0.0.1:3001/` (or another free port) if 3000 is already in use.

If dependencies are missing, run `npm.cmd install` once and then run `npm.cmd run dev` again.

## Content locations

- `config/site.json` — lab/contact/location/site settings
- `config/copy.json` — navigation, page headings, interface copy, SEO copy
- `content/people/` — professor, members, alumni
- `content/publications/` — publications
- `content/news/` — news
- `content/gallery/` — gallery
- `content/research/` — research areas
- `public/images/` — local images

## Checks and build

```sh
npm run validate
npm run typecheck
npm run build
```

`npm run build` creates the static website in `out/`.

## GitHub Pages

A workflow is included at `.github/workflows/deploy-pages.yml`. Set **Settings → Pages → Source** to **GitHub Actions**, then push to `main`. The workflow builds and deploys the static site automatically.
