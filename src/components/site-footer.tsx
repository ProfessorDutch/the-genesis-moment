import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-[oklch(0.15_0.012_55)] px-5 py-14 text-[oklch(0.72_0.02_65)] md:px-8 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="font-serif text-2xl text-cream">The Genesis Moment</div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">
            A podcast about faith, family, belief, failure, becoming, and the moments that changed
            everything.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-ember">
            In service of The Mustard Seed.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.16em] text-cream/60">Listen</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/podcast" className="hover:text-ember">Podcast</Link></li>
            <li><Link to="/thoughtcasts" className="hover:text-ember">Thoughtcasts</Link></li>
            <li><Link to="/mustard-seed" className="hover:text-ember">The Mustard Seed</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.16em] text-cream/60">Be a guest</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/tell-your-story" className="hover:text-ember">Tell Your Story</Link></li>
            <li><Link to="/tell-your-story" className="hover:text-ember">Nominate Someone</Link></li>
            <li><a href="tel:+10000000000" className="hover:text-ember">Call to speak with us</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-cream/40 md:flex-row">
        <div>© {new Date().getFullYear()} The Genesis Moment</div>
        <div className="italic">"Ask, and it shall be given you." — Matthew 7:7</div>
      </div>
    </footer>
  );
}