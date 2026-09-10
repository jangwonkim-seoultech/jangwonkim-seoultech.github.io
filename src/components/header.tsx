"use client";

import { LabLogo } from "./lab-logo";

import { type MouseEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import navigation from "@config/navigation.json";
import site from "@config/site.json";
import { dictionary, href } from "@/lib/i18n";
import { assetPath, basePath } from "@/lib/paths";

export function Header() {
  const t = dictionary;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const normalizedPathname =
    basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))
      ? pathname.slice(basePath.length) || "/"
      : pathname;
  const suffix = normalizedPathname.replace(/^\/+|\/+$/g, "");

  function closeAndScrollTop(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    setOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (!header.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <header className="site-header" ref={header}>
      <div className="header-inner container">
        <Link
          href={href()}
          className="wordmark"
          aria-label={`${site.lab.shortName} ${t.nav.home}`}
        >
          <LabLogo variant="black" priority />
        </Link>
        <nav
          id="main-navigation"
          className={`main-nav ${open ? "is-open" : ""}`}
          aria-label={t.common.navigation}
        >
          {navigation.map((item) => {
            const activePath = ("activePath" in item && item.activePath) || item.path;
            const active = activePath
              ? suffix === activePath || suffix.startsWith(`${activePath}/`)
              : suffix === "";
            const submenu = "submenu" in item ? item.submenu : undefined;
            const label = ("label" in item && item.label) || t.nav[item.key as keyof typeof t.nav];
            return (
              <div className={`nav-item ${submenu ? "has-submenu" : ""}`} key={item.key}>
                {submenu ? (
                  <button
                    type="button"
                    className={`nav-parent-label ${active ? "active" : ""}`}
                    aria-label={`${label} menu`}
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    href={href(item.path)}
                    className={`${active ? "active " : ""}${item.position === "right" ? "nav-contact" : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={closeAndScrollTop}
                  >
                    {label}
                  </Link>
                )}
                {submenu && (
                  <div className="nav-submenu" aria-label={`${label} sections`}>
                    {submenu.map((entry) => (
                      <a
                        href={assetPath(href(entry.path))}
                        key={entry.path}
                        onClick={closeAndScrollTop}
                      >
                        {entry.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="header-controls">
          <button
            className={`menu-toggle ${open ? "is-open" : ""}`}
            ref={button}
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={open ? t.common.close : t.common.menu}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
