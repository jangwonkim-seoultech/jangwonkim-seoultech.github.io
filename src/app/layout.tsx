import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-kr";
import "@/app/globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { dictionary } from "@/lib/i18n";
import { LabSchema } from "@/lib/seo";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main">
          {dictionary.common.skip}
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: LabSchema() }}
        />
      </body>
    </html>
  );
}
