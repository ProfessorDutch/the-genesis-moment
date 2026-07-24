import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Share2 } from "lucide-react";
import { episodes, getEpisode, thoughtcasts } from "@/lib/content";

export const Route = createFileRoute("/podcast/$slug")({
  loader: ({ params }) => {
    const ep = getEpisode(params.slug);
    if (!ep) throw notFound();
    return ep;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Episode not found" }, { name: "robots", content: "noindex" }],
      };
    }
    return {
      meta: [
        { title: `${loaderData.title} — The Genesis Moment` },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/podcast/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/podcast/${params.slug}` }],
    };
  },
  component: EpisodePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="font-serif text-4xl">Episode not found</h1>
      <Link to="/podcast" className="mt-6 inline-block text-ember">← Back to all episodes</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="font-serif text-3xl">Something went wrong</h1>
      <p className="mt-3 text-ink/70">{error.message}</p>
      <button onClick={reset} className="mt-6 bg-ember px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white">Try again</button>
    </div>
  ),
});

function EpisodePage() {
  const ep = Route.useLoaderData();
  const related = (ep.relatedThoughtcasts ?? [])
    .map((s: string) => thoughtcasts.find((t) => t.slug === s))
    .filter(Boolean) as typeof thoughtcasts;
  const otherEpisodes = episodes.filter((e) => e.slug !== ep.slug).slice(0, 3);

  return (
    <article>
      <section className="bg-cream px-5 pt-10 pb-14 md:px-8 md:pt-16 md:pb-20">
        <div className="mx-auto max-w-4xl">
          <Link to="/podcast" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember">
            <ArrowLeft size={14} /> All episodes
          </Link>
          <div className="mt-10 text-[11px] font-bold uppercase tracking-[0.18em] text-ember">
            Episode {String(ep.number).padStart(2, "0")} · {ep.duration}
          </div>
          <h1 className="mt-4 font-serif font-bold leading-[0.96] tracking-[-0.04em] text-[clamp(2.5rem,7vw,5rem)]">
            {ep.title}
          </h1>
          <div className="mt-6 text-sm uppercase tracking-[0.14em] text-ink/60">
            {ep.guest} · {ep.role}
          </div>
        </div>
      </section>

      <section className="bg-paper px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="aspect-video w-full bg-ink">
            {ep.youtubeId ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${ep.youtubeId}`}
                title={ep.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : null}
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <div className="space-y-5 text-lg leading-relaxed text-ink/85">
              <p>{ep.description}</p>
              <p className="font-serif text-2xl leading-snug tracking-[-0.02em] text-ink">
                "The hero is who they became. The story is who they were before anyone knew that
                was possible."
              </p>
            </div>
            <aside className="border border-line bg-cream p-6">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-ink/60">
                In this episode
              </div>
              <ul className="mt-4 space-y-3 text-sm text-ink/80">
                {ep.tags.map((tag: string) => (
                  <li key={tag} className="border-b border-line pb-3 last:border-b-0">
                    {tag}
                  </li>
                ))}
              </ul>
              {ep.website && (
                <a
                  href={ep.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 block text-xs font-bold uppercase tracking-[0.14em] text-ember"
                >
                  Visit {ep.guest}'s business →
                </a>
              )}
              <button
                type="button"
                className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ink/70 hover:text-ember"
                onClick={() => {
                  if (typeof navigator !== "undefined" && "share" in navigator) {
                    navigator.share({ title: ep.title, url: window.location.href }).catch(() => {});
                  }
                }}
              >
                <Share2 size={14} /> Share this episode
              </button>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-cream px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="section-label mb-6">Related Thoughtcasts</div>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((t) => (
                <Link
                  key={t.slug}
                  to="/thoughtcasts/$slug"
                  params={{ slug: t.slug }}
                  className="border border-line bg-paper p-6 hover:border-ember"
                >
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ember">
                    {t.topic} · {t.duration}
                  </div>
                  <div className="mt-3 font-serif text-2xl leading-tight tracking-[-0.02em]">
                    {t.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-paper px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="section-label mb-6">More episodes</div>
          <ul className="divide-y divide-line border-y border-line">
            {otherEpisodes.map((e) => (
              <li key={e.slug}>
                <Link
                  to="/podcast/$slug"
                  params={{ slug: e.slug }}
                  className="grid gap-3 py-6 md:grid-cols-[60px_1fr_auto] md:items-center md:gap-8"
                >
                  <div className="font-serif text-2xl text-ember">
                    {String(e.number).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="font-serif text-xl leading-tight md:text-2xl">{e.title}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em] text-ink/60">
                      {e.guest}
                    </div>
                  </div>
                  <div className="text-xs uppercase tracking-[0.14em] text-ink/50">
                    {e.duration}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}