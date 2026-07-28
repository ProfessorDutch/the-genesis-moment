import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Play } from "lucide-react";
import { episodes as staticEpisodes } from "@/lib/content";
import { supabase } from "@/integrations/supabase/client";

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
  const { data: dbRows } = useQuery({
    queryKey: ["public", "episodes", "podcast"],
    queryFn: async () => {
      const { data } = await supabase
        .from("episodes")
        .select("slug, title, excerpt, duration, episode_number, image_url, guest_name_override, role_override, guests(name, role)")
        .eq("type", "podcast")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      return data ?? [];
    },
  });
  const episodes =
    dbRows && dbRows.length > 0
      ? dbRows.map((r, i) => ({
          slug: r.slug,
          number: r.episode_number ?? i + 1,
          guest: r.guest_name_override || r.guests?.name || "",
          role: r.role_override || r.guests?.role || "",
          title: r.title,
          excerpt: r.excerpt ?? "",
          duration: r.duration ?? "",
          image: r.image_url ?? undefined,
        }))
      : staticEpisodes;
  const [featured, ...rest] = episodes;
  return (
    <div>
      <section className="bg-cream px-5 pt-16 pb-14 md:px-8 md:pt-24 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 flex items-center gap-2 text-ember">
            <span className="eyebrow">The Genesis Moment · Podcast</span>
          </div>
          <h1 className="font-serif font-bold leading-[0.94] tracking-[-0.04em] text-[clamp(2.5rem,7vw,4.75rem)]">
            Who they were before <br className="hidden md:block" />
            anyone knew.
          </h1>
          <p className="drop-cap mt-8 max-w-2xl text-lg leading-relaxed text-ink/85 md:text-xl">
            Real conversations with faith-based business owners, founders, fathers, husbands, and
            mentors. Not about how far they have come. About who they were while they were still
            becoming.
          </p>
        </div>
      </section>

      <section className="bg-sand px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mono-tag mb-6 text-ember">Latest · Episode 01</div>
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
              <h2 className="font-serif text-3xl leading-[1.05] tracking-[-0.03em] md:text-5xl">
                {featured.title}
              </h2>
              <div className="mt-3 text-sm uppercase tracking-[0.12em] text-ink/60">
                {featured.guest} · {featured.role}
              </div>
              <p className="mt-5 text-lg leading-relaxed text-ink/85">{featured.excerpt}</p>
              <div className="mt-8 inline-flex items-center gap-2 bg-ink-deep px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-cream">
                <Play size={14} /> Listen to episode
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* EDITORIAL INDEX */}
      <section className="bg-cream px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between">
            <div className="section-label">The Index · All Episodes</div>
            <div className="mono-tag text-ink/50">{episodes.length} recorded</div>
          </div>
          <hr className="rule-ember" />
          <ul>
            {rest.map((ep) => (
              <li key={ep.slug} className="border-b border-line last:border-b-0">
                <Link
                  to="/podcast/$slug"
                  params={{ slug: ep.slug }}
                  className="group grid gap-4 py-10 md:grid-cols-[110px_1fr_auto] md:items-baseline md:gap-10"
                >
                  <div className="ep-num text-6xl md:text-7xl">
                    {String(ep.number).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="font-serif text-2xl leading-tight tracking-[-0.02em] group-hover:text-ember md:text-4xl">
                      {ep.title}
                    </div>
                    <div className="mt-3 mono-tag text-ink/55">
                      {ep.guest} — {ep.role}
                    </div>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/75">
                      {ep.excerpt}
                    </p>
                  </div>
                  <div className="mono-tag whitespace-nowrap text-ink/60 md:text-right">
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
