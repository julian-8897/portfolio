import { Link, useLocation } from "wouter";
import { Logo } from "./logo";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [loc] = useLocation();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [loc]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent",
      )}
      data-testid="nav-header"
    >
      <nav className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          data-testid="link-home-logo"
        >
          <Logo className="w-7 h-7 text-foreground transition-transform group-hover:rotate-3" />
          <span className="display-font text-base font-semibold tracking-tight">
            Julian Chan
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = l.href === "/" ? loc === "/" : loc.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative px-3 py-2 text-sm rounded-md transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                data-testid={`link-nav-${l.label.toLowerCase()}`}
              >
                {l.label}
                {active && (
                  <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-primary" />
                )}
              </Link>
            );
          })}
          <button
            onClick={toggle}
            className="ml-2 inline-flex items-center justify-center w-9 h-9 rounded-md border border-border hover:bg-muted transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-border"
            aria-label="Toggle theme"
            data-testid="button-theme-toggle-mobile"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-border"
            aria-label="Toggle menu"
            data-testid="button-menu-toggle"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="md:hidden border-t border-border bg-background"
          data-testid="nav-mobile"
        >
          <div className="px-6 py-3 flex flex-col gap-1">
            {links.map((l) => {
              const active = l.href === "/" ? loc === "/" : loc.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md",
                    active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                  data-testid={`link-nav-mobile-${l.label.toLowerCase()}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
