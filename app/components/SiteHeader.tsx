"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, navItems } from "../site";
import HomeHashLink from "./HomeHashLink";
import SiteLogo from "./SiteLogo";

type ThemeName = "light" | "dark";

function readTheme(): ThemeName {
  const value = document.documentElement.getAttribute("data-theme");
  return value === "light" ? "light" : "dark";
}

function subscribeTheme(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  window.addEventListener("storage", onStoreChange);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStoreChange);
  };
}

function ThemeToggle({
  theme,
  onToggle,
  labeled = false,
}: {
  theme: ThemeName;
  onToggle: () => void;
  labeled?: boolean;
}) {
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={`theme-toggle${labeled ? " theme-toggle-labeled" : ""}`}
      aria-pressed={theme === "dark"}
      aria-label={`Switch to ${next} theme`}
      onClick={onToggle}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {theme === "dark" ? (
          <svg viewBox="0 0 20 20" width="18" height="18" focusable="false">
            <path
              fill="currentColor"
              d="M10 3.2a.8.8 0 0 1 .8.8v1.2a.8.8 0 1 1-1.6 0V4a.8.8 0 0 1 .8-.8Zm0 10.4a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2ZM4 9.2H2.8a.8.8 0 1 0 0 1.6H4a.8.8 0 1 0 0-1.6Zm12.4 0H15.2a.8.8 0 1 0 0 1.6h1.2a.8.8 0 1 0 0-1.6ZM5.17 4.6a.8.8 0 0 1 1.13 0l.85.85a.8.8 0 1 1-1.13 1.13l-.85-.85a.8.8 0 0 1 0-1.13Zm7.68 7.68a.8.8 0 0 1 1.13 0l.85.85a.8.8 0 0 1-1.13 1.13l-.85-.85a.8.8 0 0 1 0-1.13ZM4.6 14.83a.8.8 0 0 1 1.13 0l.85-.85a.8.8 0 1 1 1.13 1.13l-.85.85a.8.8 0 0 1-1.13 0Zm9.08-9.08a.8.8 0 0 1 1.13 0l.85-.85a.8.8 0 0 1 1.13 1.13l-.85.85a.8.8 0 0 1-1.13 0ZM10 14.8a.8.8 0 0 1 .8.8v1.2a.8.8 0 1 1-1.6 0V15.6a.8.8 0 0 1 .8-.8Z"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" width="18" height="18" focusable="false">
            <path
              fill="currentColor"
              d="M8.2 3.1a.8.8 0 0 1 .1 1.12 6 6 0 1 0 7.48 7.48.8.8 0 0 1 1.3.86A7.6 7.6 0 1 1 7.08 3a.8.8 0 0 1 1.12.1Z"
            />
          </svg>
        )}
      </span>
      <span className={labeled ? undefined : "visually-hidden"}>
        {theme === "dark" ? "Dark" : "Light"}
      </span>
    </button>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "dark");
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const onChange = () => {
      if (media.matches) {
        setOpen(false);
      }
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const panel = panelRef.current;
    const getFocusable = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              "a[href], button:not([disabled])",
            ),
          )
        : [];

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panel) {
        return;
      }

      const items = getFocusable();
      if (items.length === 0) {
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("menu-open");
    getFocusable()[0]?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const applyTheme = (next: ThemeName) => {
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* private mode */
    }
  };

  const toggleTheme = () => applyTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="site-header">
      <nav className="topbar" aria-label="Primary">
        <Link className="brand-link" href="/" aria-label="Asif Ahmed, home">
          <SiteLogo />
        </Link>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <HomeHashLink id={item.id}>{item.label}</HomeHashLink>
            </li>
          ))}
        </ul>

        <ThemeToggle theme={theme} onToggle={toggleTheme} />

        <HomeHashLink className="nav-cta" id="contact">
          Contact Me
        </HomeHashLink>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls={menuId}
          aria-haspopup="dialog"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="visually-hidden">
            {open ? "Close menu" : "Open menu"}
          </span>
          <span className="menu-toggle-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>

      <div
        ref={panelRef}
        className={`mobile-nav${open ? " is-open" : ""}`}
        id={menuId}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${menuId}-title`}
      >
        <div className="mobile-nav-panel">
          <div className="mobile-nav-top">
            <p className="mobile-nav-label" id={`${menuId}-title`}>
              Navigate
            </p>
            <button type="button" className="menu-close" onClick={closeMenu}>
              Close
            </button>
          </div>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <HomeHashLink id={item.id} onClick={closeMenu}>
                  {item.label}
                </HomeHashLink>
              </li>
            ))}
            <li>
              <HomeHashLink className="mobile-nav-contact" id="contact" onClick={closeMenu}>
                Contact Me
              </HomeHashLink>
            </li>
          </ul>
          <div className="mobile-theme">
            <ThemeToggle theme={theme} onToggle={toggleTheme} labeled />
          </div>
        </div>
      </div>

      {open ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}
    </header>
  );
}
