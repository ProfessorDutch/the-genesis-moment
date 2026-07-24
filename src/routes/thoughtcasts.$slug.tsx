import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getEpisode, getThoughtcast, thoughtcasts } from "@/lib/content";

export const Route = createFileRoute("/thoughtcasts/$slug")({
  loader: ({ params }) => {
    const t = getThoughtcast(params.slug);
    if (!t) throw notFound();
    return t;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Thoughtcast not found" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.title} — Thoughtcasts` },
        { name: "description", content: loaderData.thesis },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.thesis },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/thoughtcasts/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/thoughtcasts/${params.slug}` }],
    };
  },
  component: ThoughtcastPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="font-serif text-4xl">Thoughtcast not found</h1>
      <Link to="/thoughtcasts" className="mt-6 inline-block text-ember">← Back to Thoughtcasts</Link>
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

function ThoughtcastPage() {
  const t = Route.useLoaderData();
  const related = thoughtcasts.filter((x) => x.slug !== t.slug && x.topic === t.topic).slice(0, 3);
  const episode = t.relatedEpisode ? getEpisode(t.relatedEpisode) : undefined;

  return (
    <article>
      <section className="bg-cream px-5 pt-10 pb-14 md:px-8 md:pt-16 md:pb-20">
        <div className="mx-auto max-w-3xl">
          <Link to="/thoughtcasts" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ember">
            <ArrowLeft size={14} /> All Thoughtcasts
          </Link>
          <div className="mt-10 text-[11px] font-bold uppercase tracking-[0.18em] text-ember">
            {t.topic} · {t.duration}
          </div>
          <h1 className="mt-4 font-serif font-bold leading-[0.98] tracking-[-0.035em] text-[clamp(2.25rem,6vw,4.25rem)]">
            {t.title}
          </h1>
        </div>
      </section>

      <section className="bg-paper px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto aspect-[9/16] max-w-md bg-ink">
            {t.youtubeId ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${t.youtubeId}`}
                title={t.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : null}
          </div>
          <p className="mt-10 font-serif text-2xl leading-snug tracking-[-0.02em] text-ink md:text-3xl">
            "{t.thesis}"
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">{t.body}</p>

          {episode && (
            <Link
              to="/podcast/$slug"
              params={{ slug: episode.slug }}
              className="mt-12 block border border-line bg-cream p-6 hover:border-ember"
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ember">
                From the podcast
              </div>
              <div className="mt-2 font-serif text-2xl leading-tight tracking-[-0.02em]">
                {episode.title}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.14em] text-ink/60">
                {episode.guest} · {episode.role}
              </div>
            </Link>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-cream px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="section-label mb-6">More on {t.topic}</div>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/thoughtcasts/$slug"
                  params={{ slug: r.slug }}
                  className="border border-line bg-paper p-6 hover:border-ember"
                >
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ember">
                    {r.topic} · {r.duration}
                  </div>
                  <div className="mt-3 font-serif text-xl leading-tight tracking-[-0.02em]">
                    {r.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}