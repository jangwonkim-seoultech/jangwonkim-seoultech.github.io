import { rootPath } from "@/lib/paths";
import "@/app/globals.css";

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>Page not found | RLC Lab.</title>
        <meta name="robots" content="noindex" />
      </head>
      <body>
        <main className="entry-page">
          <p className="eyebrow">RLC LAB. / 404</p>
          <h1>Page not found.</h1>
          <p>The page may have moved, or the address may be incorrect.</p>
          <nav>
            <a href={rootPath()}>Return home →</a>
          </nav>
        </main>
      </body>
    </html>
  );
}
