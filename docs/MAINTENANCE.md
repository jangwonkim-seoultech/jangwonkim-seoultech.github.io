# RLC Lab. maintenance guide

Routine updates are JSON-driven. All editable text uses a **single value**. There is no language-specific `en` / `ko` object in the content model.

| Update | File |
| --- | --- |
| Lab contact, address, logo, site URL | `config/site.json` |
| Page headings and interface text | `config/copy.json` |
| Professor profile | `content/people/pi.json` |
| Current members or alumni | `content/people/*.json` |
| Publications | `content/publications/*.json` |
| News | `content/news/*.json` |
| Gallery | `content/gallery/*.json` |
| Research areas | `content/research/*.json` |

## Recommended workflow

Use the Admin GUI for routine edits. It provides forms, image import/replacement, JSON backups, validation, typecheck, build, and cache cleanup. Direct JSON editing is still possible when needed.

## Home and Join settings

`config/site.json` controls the Home list limits and the Join page image. In Admin, use **Site settings → Display** to choose `3`, `5`, or `10` items for Latest Publications and Latest news. Use **Site settings → Join → Image** to replace the image shown beside the Join message.

## People

Copy `docs/templates/student.json` into `content/people/` or create a new record in Admin. `status: "current"` appears under Members and `status: "alumni"` under Alumni. `research` is a simple string array.

## Publications

Create one JSON file per publication. Supported `type` values are `journal`, `conference`, and `preprint`. Optional links are `paper`, `code`, `project`, and `video`. Set `draft: true` to hide a record.

## News

A news record needs an ID, date, category, title, body array, and draft flag. Images belong under `public/images/news/`. `imageAlt` is one plain string.

## Research

Research titles and media live in `content/research/`. Each media item contains one `src` and one `alt` string. The Admin **Choose media…** button accepts PNG/JPG/JPEG/GIF/WebP/SVG images and MP4 videos. Images/GIFs are copied to `public/images/research/`; MP4 files are copied to `public/media/research/`. Keep the three main IDs stable unless the page code is intentionally changed.

## Gallery

Add images under `public/images/gallery/` and create one JSON record per item. `title` and `alt` are plain strings.

## Check and publish

```sh
npm run validate
npm run typecheck
npm run build
```

After checking the generated site, use Admin's **Clean cache** if you want to remove local build/cache artifacts before archiving or committing. Git itself is protected by `.gitignore`.
