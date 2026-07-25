import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SeedMark } from "./seed-mark";

const nav = [
  { to: "/podcast", label: "Podcast" },
  { to: "/thoughtcasts", label: "Thoughtcasts" },
  { to: "/mustard-seed", label: "The Mustard Seed" },
  { to: "/tell-your-story", label: "Tell Your Story" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/85 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:h-20 md:grid-cols-[auto_1fr_auto] md:px-8">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex min-w-0 items-center gap-2.5 text-ink"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center text-ember">
            <SeedMark size={22} />
          </span>
          <span className="truncate font-serif text-lg font-bold tracking-tight md:text-xl">
            The Genesis Moment
          </span>
        </Link>
        <nav className="hidden justify-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/70 transition-colors hover:text-ember"
              activeProps={{ className: "text-ember" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/tell-your-story"
          className="hidden shrink-0 items-center gap-2 border border-ember px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ember transition-colors hover:bg-ember hover:text-white md:inline-flex"
        >
          Nominate
        </Link>
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
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/tell-your-story"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center gap-2 border border-ember px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-ember"
            >
              Nominate someone
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
