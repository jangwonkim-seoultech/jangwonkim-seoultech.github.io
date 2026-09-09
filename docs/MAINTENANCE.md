# RLC Lab Maintenance Guide

Routine updates are JSON-driven. Use the Admin GUI first; direct file edits are for cases not covered by the forms.

| Update | File |
| --- | --- |
| Lab identity, contact, address, logo, home, and display settings | `config/site.json` |
| Page headings, navigation text, UI copy, and SEO copy | `config/copy.json` |
| Professor profile | `content/people/pi.json` |
| Current members and alumni | `content/people/*.json` |
| Publications | `content/publications/*.json` |
| News | `content/news/*.json` |
| Gallery | `content/gallery/*.json` |
| Research areas | `content/research/*.json` |

## Recommended Workflow

Use the Admin GUI for routine edits. It provides content forms, image import/replacement, JSON backups, validation, typecheck, build, and cache cleanup.

Before publishing, run:

```sh
npm run validate
npm run typecheck
npm run build
```

## Contact And Address

`config/site.json` keeps the office display and the English address separate:

- `location.office`: the CONTACT office label, for example `Unit 213, Mugung Hall (무궁관 213호)`
- `location.building`: the English building name used in the address, for example `Mugung Hall`
- `location.street`, `location.city`, and `location.country`: the rest of the English address
- `location.koreanAddress`: the Korean address shown in the footer

Do not add `(무궁관)` to `location.building` unless the English address should also include it.

## People

Create people records in Admin. `status: "current"` appears under Members and `status: "alumni"` appears under Alumni. `research` is a simple string array.

## Publications

Create one JSON file per publication. `year` is required and stored as `YYYY-MM`. Supported `type` values are `journal`, `conference`, and `preprint`. Optional links are `paper`, `code`, `project`, and `video`. `thumbnail` is optional; omit it to keep the text-only layout. Set `draft: true` to hide a record.

## News

A news record needs an ID, `YYYY-MM-DD` date, category, title, body array, and draft flag. Images belong under `public/images/news/`.

## Research

Create one JSON file per research area. Each record needs an ID, display order, title, description, and at least one media item. Research media can be PNG, JPG, JPEG, GIF, WebP, SVG, or MP4 under `public/images/research/` or `public/media/research/`.

## Gallery

Add images under `public/images/gallery/` and create one JSON record per item. Gallery dates are required as `YYYY-MM-DD` and render like News dates.
