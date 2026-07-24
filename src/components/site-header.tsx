import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/podcast", label: "Podcast" },
  { to: "/thoughtcasts", label: "Thoughtcasts" },
  { to: "/mustard-seed", label: "The Mustard Seed" },
  { to: "/tell-your-story", label: "Tell Your Story" },
  { to: "/tell-your-story", label: "Nominate" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-serif text-lg font-bold tracking-tight text-ink md:text-xl"
        >
          The Genesis Moment
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink/70 transition-colors hover:text-ember"
              activeProps={{ className: "text-ember" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-line/70 bg-cream md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink/80"
                activeProps={{ className: "text-ember" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}