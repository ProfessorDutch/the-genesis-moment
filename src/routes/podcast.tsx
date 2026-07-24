import { createFileRoute, Link } from "@tanstack/react-router";
import { episodes } from "@/lib/content";

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: [
      { title: "Podcast — The Genesis Moment" },
      {
        name: "description",
        content:
          "Long-form conversations with faith-based business owners about who they were before the success was visible.",
      },
      { property: "og:title", content: "The Genesis Moment — Podcast" },
      {
        property: "og:description",
        content: "Real stories about faith, family, failure, and the people who believed first.",
      },
      { property: "og:url", content: "/podcast" },
    ],
    links: [{ rel: "canonical", href: "/podcast" }],
  }),
  component: PodcastIndex,
});

function PodcastIndex() {
  const [featured, ...rest] = episodes;
  return (
    <div>
      <section className="bg-cream px-5 pt-16 pb-14 md:px-8 md:pt-24 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="eyebrow mb-5">The Genesis Moment · Podcast</div>
          <h1 className="font-serif font-bold leading-[0.94] tracking-[-0.04em] text-[clamp(2.75rem,8vw,5.5rem)]">
            Who they were before <br className="hidden md:block" />
            anyone knew.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/75 md:text-xl">
            Real conversations with faith-based business owners, founders, fathers, husbands, and
            mentors. Not about how far they have come. About who they were while they were still
            becoming.
          </p>
        </div>
      </section>

      <section className="bg-paper px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/podcast/$slug"
            params={{ slug: featured.slug }}
            className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-14"
          >
            <div
              className="portrait-frame"
              style={
                featured.image
                  ? {
                      backgroundImage: `linear-gradient(180deg, transparent 45%, oklch(0.12 0.012 55 / 0.78)), url(${featured.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.20em] text-ember">
                Latest · Episode {String(featured.number).padStart(2, "0")}
              </div>
              <h2 className="mt-4 font-serif text-3xl leading-[1.05] tracking-[-0.03em] md:text-5xl">
                {featured.title}
              </h2>
              <div className="mt-3 text-sm uppercase tracking-[0.12em] text-ink/60">
                {featured.guest} · {featured.role}
              </div>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">{featured.excerpt}</p>
              <div className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-ember">
                Listen to episode →
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-cream px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="section-label mb-6">All episodes</div>
          <ul className="divide-y divide-line border-y border-line">
            {rest.map((ep) => (
              <li key={ep.slug}>
                <Link
                  to="/podcast/$slug"
                  params={{ slug: ep.slug }}
                  className="group grid gap-4 py-8 md:grid-cols-[80px_1fr_auto] md:items-center md:gap-8"
                >
                  <div className="font-serif text-3xl text-ember md:text-4xl">
                    {String(ep.number).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="font-serif text-2xl leading-tight tracking-[-0.02em] group-hover:text-ember md:text-3xl">
                      {ep.title}
                    </div>
                    <div className="mt-2 text-xs uppercase tracking-[0.14em] text-ink/60">
                      {ep.guest} · {ep.role}
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">
                      {ep.excerpt}
                    </p>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-ink/50">
                    {ep.duration}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}