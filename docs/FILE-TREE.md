# File tree and ownership

The public site has one responsibility per area. Do not edit generated folders such as `out/`, `.next/`, or `tsconfig.tsbuildinfo`.

```text
rlc_site/
├── config/
│   ├── site.json                    Lab identity, contact data, image settings
│   └── navigation.json              Header labels, order, and public paths
├── content/                         Public content; one JSON file per record
│   ├── gallery/                     Gallery image metadata
│   ├── news/                        News posts
│   ├── people/                      Professor, Members, and Alumni records
│   ├── publications/                Publications
│   └── research/                    Research topics and media galleries
├── public/images/
│   ├── brand/                       Blue, black, and Home hero brand assets
│   ├── gallery/                     Gallery images
│   ├── people/                      Portraits and placeholders
│   └── research/                    Research images
├── src/
│   ├── app/
│   │   ├── [[...slug]]/page.tsx     Static route dispatcher
│   │   ├── globals.css              Site styles
│   │   ├── layout.tsx               Shared document, Header, Footer
│   │   ├── robots.ts                Crawler rules
│   │   └── sitemap.ts               Sitemap from shared routes
│   ├── components/
│   │   ├── people/                  Professor and people-list components
│   │   ├── header.tsx, footer.tsx   Shared chrome
│   │   ├── join-banner.tsx          Research-page Join banner
│   │   ├── *-page.tsx               One component per public page
│   │   └── ui.tsx                   Links, headings, and icons
│   └── lib/
│       ├── content.ts               JSON collection readers and sort order
│       ├── routes.ts                Shared static route list
│       ├── schemas.ts               TypeScript content types
│       ├── i18n.ts                  Copy and URL helpers
│       └── seo.ts                   Metadata and structured data
├── docs/
│   ├── MAINTENANCE.md               Routine editing guide
│   ├── FILE-TREE.md                 This ownership map
│   ├── SOURCES.md                   Asset and factual-source notes
│   └── templates/                   Copyable JSON records
└── scripts/
    ├── validate-content.mjs         Lightweight JSON/content checks before build
    └── serve.mjs                    Serves the exported static site locally
```

Routine content changes belong in `config/`, `content/`, or `public/images/`. Page behavior belongs in `src/components/`; only route registration belongs in `src/app/[[...slug]]/page.tsx` and `src/lib/routes.ts`.
