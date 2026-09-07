import type { ReactNode } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      className="arrow"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`text-link ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}
export function ExternalLink({
  href,
  children,
  t,
  className = "",
}: {
  href: string;
  children: ReactNode;
  t: Dictionary;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`external-link ${className}`}
    >
      {children}
      <Arrow diagonal />
      <span className="sr-only"> ({t.common.external})</span>
    </a>
  );
}
export function PageIntro({
  title,
}: {
  title: string;
}) {
  return (
    <section className="page-intro container">
      <div className="intro-columns">
        <h1>
          {title.split("\n").map((line, i) => (
            <span className="headline-line" key={i}>
              {line}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
export function SectionHeading({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
